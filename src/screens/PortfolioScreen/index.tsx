import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { PortfolioCard } from './PortfolioCard';
import { Spinner } from '../../components/Spinner';
import { MTradeEntity } from '../../logic/Model/MTrade';
import { MdRocketLaunch } from "react-icons/md";


import { observer } from 'mobx-react-lite';
import { Notify } from '../../components/Notify';
import { Summary } from './Summary';
import { useWebSocket } from '../../hooks/useWebSocket';
import { MPortfolio, MStocks } from '../../logic/Model/MPortfolio';

const handleWSMessage = (messages : any, entities: MPortfolio| null) => {
    
    const updatedPlayers: MStocks[] = (entities?.players || []).map((player) => {
        // get whether the message is about performancefactor or corefactor
        if(messages[0].is_perf) {
            const perfFactor:number  = messages[0].perf_details.perf_factor[player.player_id];

            if (perfFactor) {
                // new price
                const lastPrice = player.cur_price;
                return {
                    ...player,
                    cur_price: lastPrice + (perfFactor),
                };
            }
            return player;
            
        } else {
            const  coreFactor:string  = messages[0].core_details.core_factor[player.player_id];
            const coreFactorParsed = parseFloat(coreFactor).toFixed(2);
            const coreFactorRounded = parseFloat(coreFactorParsed)
            
            if (coreFactor) {
               
                return {
                    ...player,
                    cur_price: coreFactorRounded
                };
            }
            return player;
        }
        
    });

    return updatedPlayers

}

export const PortfolioScreen: React.FC = observer(() => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const leagueId = searchParams.get('leagueId') || '';
    const matchId:string = searchParams.get('matchId') || '';
    const {portfolioStore, appStore} = useStores();   
    const {portfolio} = portfolioStore;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolio = async () => {
           await portfolioStore.getPortfolio(leagueId);
        };

        fetchPortfolio();
    }, []);


    const WS_URL = import.meta.env.VITE_WS_URL;

    const { isConnected, messages, sendMessage } = useWebSocket({
        url:  WS_URL+'/ws?league_id=' + leagueId + '&match_id=' + matchId,
    });

    useEffect(() => {
        if (messages.length > 0) {
            const updatedStocks = handleWSMessage(messages, portfolioStore.portfolio);
            portfolioStore.setUpdatedPlayersInPortfolio(updatedStocks);
        }
    }, [messages]);


   if (portfolioStore.isLoading === true) {
        return <Spinner/>;
    }else {

    const invested = portfolio?.players.reduce((sum, player) => sum + player.shares * player.avg_price, 0).toFixed(2) || 0;
    const returns = portfolio?.players.reduce((sum, player) => sum + player.cur_price * player.shares - player.shares * player.avg_price, 0).toFixed(2) || 0;
    const balance = portfolio?.balance ?? 0;


    return (
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
            <div className="container p-4 ">
                {portfolio?.players ? (
                        <div >
                            <div style={{ marginBottom: '5px' }}>
                                   <Summary invested={invested} returns={returns} balance={balance}/>
                             </div>
                            {portfolio.players
                                .filter(player => player.shares > 0)
                                .map(player => (
                                    <div onClick={()=> navigate(`/trade/graph?player_id=${player.player_id}&league_id=${leagueId}&match_id=${matchId}`)}>
                                        <PortfolioCard key={player.player_id} player={player} />
                                    </div>
                                ))}
                        </div>

                ) : (
                    <p>No Stocks :(</p>
                )}
               
               
            </div>
            {appStore.isNavBarOpened && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9998,
                    background: 'rgba(10, 15, 26, 0.55)',
                    backdropFilter: 'blur(10px)',
                    pointerEvents: 'auto',
                    transition: 'all 0.3s',
                }} />
            )}
        </div>
    );
    }

});