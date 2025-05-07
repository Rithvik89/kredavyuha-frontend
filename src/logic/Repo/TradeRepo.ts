import { useWebSocket } from "../../hooks/useWebSocket";
import { MTradeEntity } from "../Model/MTrade";
import { AuthHeaders, Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class TradeRepo {
    baseUrl: string;
    rq: Request;
    constructor(baseUrl: string, rq: Request) {
      this.rq = rq;
      this.baseUrl = baseUrl;
    }

    async getEntities(token: string, league_id: string) : Promise<MTradeEntity[]> {
        try {
          console.log('Fetching entities for league:', league_id);
          const res = await this.rq.Get(`${this.baseUrl}?league_id=${league_id}`, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          console.log('API Response body:', body);
          const entities = body.data as MTradeEntity[];
          console.log('Parsed entities:', entities);
          return entities;
        } catch (err: any) {
            console.log('Error fetching entities:', err);
          throw ThrowFor(err, {
            404: "No such entities exist.",
          });
        }
      }

      async getTransactions(token: string, league_id: string): Promise<number> {
        try {
          const res = await this.rq.Get(`${this.baseUrl}/txns?league_id=${league_id}`, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          return body.data as number;
        } catch (err: any) {
          throw ThrowFor(err, {
            404: "No such entity exists.",
          });
        }
      }

      async tranEntity(token: string, player_id: string, shares: number,league_id: string, tran_type: string): Promise<string> {
        try {
          const res = await this.rq.Post(`${this.baseUrl}/transaction?league_id=${league_id}&player_id=${player_id}&transaction_type=${tran_type}`, {
            shares
          }, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          console.log(body.data.message);
          return body.data.message;
        } catch (err: any) {
          console.log(err.error);
          return err.error;
        }
      }

      async getPlayerGraph(token: string, player_id: string, league_id: string): Promise<string[]> {
        try {
          const res = await this.rq.Get(`${this.baseUrl}/points?player_id=${player_id}&league_id=${league_id}`, AuthHeaders(token));
          const { body } = await CheckResponse(res);
          return body.data.data as string[];
        } catch (err: any) {
          throw ThrowFor(err, {
            404: "No such entity exists.",
          });
        }
      }
      
}