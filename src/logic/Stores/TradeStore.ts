import { makeAutoObservable, toJS } from "mobx";
import {  MTradeEntity } from "../Model/MTrade";
import { TradeRepo } from "../Repo/TradeRepo";
import { MTimeSeries } from "../Model/MTimeSeries";
import { useWebSocket } from "../../hooks/useWebSocket";

export class TradeStore{
    token : string = "";
    entities: MTradeEntity[]| null  = null;
    tradeRepo: TradeRepo;
    match_id: string  = '';
    league_id: string = '';
    points: MTimeSeries[] = [];
    isLoading: boolean = false; 
    messages: string = '';
    tab: number = 1;
    txns: number = 0;

    constructor(tradeRepo: TradeRepo) {
        makeAutoObservable(this);
        this.token = window.localStorage.getItem("token") || "";
        this.tradeRepo = tradeRepo;
    }


    async getEntities(league_id: string) {
        this.isLoading = true;
        const trades = await this.tradeRepo.getEntities(this.token, league_id);
        this.setEntities(trades);
        const transactions = await this.tradeRepo.getTransactions(this.token, league_id);
        console.log("Transactions", transactions);
        this.txns = transactions;
        this.isLoading = false;
     
    }

    async buyEntity(entity_id: string, shares: number) {
        const message : string = await this.tradeRepo.tranEntity(this.token, entity_id, shares, this.league_id || "", "buy");  
        console.log(message);   
        this.getEntities(this.league_id || ""); 
        // update balance here ...
        this.setMessages(message);
    }

    async sellEntity(entity_id: string, shares: number) {
        const message : string = await this.tradeRepo.tranEntity(this.token, entity_id, shares, this.league_id || "", "sell");
        this.setMessages(message);
        this.getEntities(this.league_id || "");
    }


    //TODO:  As this is being called from PlayerGraph screen we should use the league id coming from the search params. 
    async getPlayerGraph(player_id: string, league_id: string) {
        this.setLoading(true)
        console.log(player_id, this.league_id);
        const player: string[]=await this.tradeRepo.getPlayerGraph(this.token, player_id, league_id);
        console.log("Player", player);
        if (player.length === 0) {
            return;
        }
        if (Array.isArray(player)) {
            const formattedData = player.map((item: string) => {
                const [timestamp, points] = item.split(',');
                return {
                    time: new Date(timestamp),
                    value: parseFloat(points),
                };
            });
            console.log(formattedData);
            this.setPoints(formattedData);
        } else {
            console.error("Expected player to be an array, but got:", player);
        }
        console.log(toJS(this.getPoints()));
        
        //TODO: This is taking more time.... FIX this 
        const trades = await this.tradeRepo.getEntities(this.token, league_id);
        this.setEntities(trades);
        const transactions = await this.tradeRepo.getTransactions(this.token, league_id);
        console.log("Transactions", transactions);
        this.txns = transactions;

        this.setLoading(false)
    }

    async getOnlyPlayerGraphWithOutEntitiesUpdate(player_id: string, league_id: string){
        const player: string[]=await this.tradeRepo.getPlayerGraph(this.token, player_id, league_id);
        if (player.length === 0) {
            return;
        }
        if (Array.isArray(player)) {
            const formattedData = player.map((item: string) => {
                const [timestamp, points] = item.split(',');
                return {
                    time: new Date(timestamp),
                    value: parseFloat(points),
                };
            });
            this.setPoints(formattedData);
        } else {
            console.error("Expected player to be an array, but got:", player);
        }
    }


    
    setToken(token: string) {
        this.token = token;
    }

    setEntities(entities: MTradeEntity[]) {
        this.entities = entities;
    }

    setMatchId(match_id: string) {
        this.match_id = match_id;
    }

    setLeagueId(league_id: string) { 
        this.league_id = league_id;
    }

    setPoints(points: MTimeSeries[]) {
        this.points = points;
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    setMessages(message: string) {
        this.messages = message;
    }

    setTab(tab: number) {
        this.tab = tab;
    }
    

    getPoints() {
        return this.points;
    }

    getTxns() {
        return this.txns;
    }

}