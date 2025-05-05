import { Accordion, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import { Summary } from "../PortfolioScreen/Summary";
import { PortfolioCard } from "../PortfolioScreen/PortfolioCard";
import { useNavigate } from "react-router-dom";
import { MActivePorfolios } from "../../logic/Model/MPortfolio";
import { observer } from "mobx-react-lite";



export const ActivePortoflioScreen: React.FC = observer(() => {
    
   const {portfolioStore, appStore} = useStores()
   const navigate = useNavigate();
   const searchParams = new URLSearchParams(location.search);

    var items: JSX.Element[] = [];

    
    useEffect(()=>{
        portfolioStore.getActivePortfolio()
    },[])

    if(!portfolioStore.isLoading){

    items = portfolioStore.activePortfolios?.map((portfolio) => (
        
        <Accordion.Item key={portfolio.league_id} value={portfolio.league_id}>
            <Accordion.Control>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
            <span>{portfolio.league_id}</span>
            <Text style={{ fontSize: '13px', color: '#ff6347', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', textAlign: 'center' }}>Ends in: 120min</Text>
        </div></Accordion.Control>
          <Accordion.Panel>
            <div style={{ textAlign: 'center' }}>
          <div className="container p-4 ">
            {portfolio?.portfolio.players ? (
                    <div >
                        <div style={{ marginBottom: '5px' }} onClick={()=> navigate(`/trade?leagueId=${portfolio.league_id}&matchId=${portfolio.match_id}`)}>
                               <Summary invested={portfolio?.portfolio.players.reduce((sum, player) => sum + player.shares * player.avg_price, 0).toFixed(2) || 0}
                                returns={portfolio?.portfolio.players.reduce((sum, player) => sum + player.cur_price * player.shares - player.shares * player.avg_price, 0).toFixed(2) || 0}
                                balance={portfolio?.portfolio.balance ?? 0}
                                />
                         </div>
                        {portfolio.portfolio.players
                            .filter(player => player.shares > 0)
                            .map(player => (
                                <div onClick={()=> navigate(`/trade/graph?player_id=${player.player_id}&league_id=${portfolio.league_id}&match_id=${portfolio.match_id}`)}>
                                    <PortfolioCard key={player.player_id} player={player} />
                                </div>
                            ))}
                    </div>

            ) : (
                <p>No Stocks :(</p>
            )}
           
           
        </div>
          </div>
          </Accordion.Panel>
        </Accordion.Item>
      ));
    }

      console.log(items.length)
      
        return (
            portfolioStore.isLoading ? (
                <section
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Loader size={"sm"} />
                </section>
            ) : 
         (<div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
             <Text style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>Active Portfolios</Text>
          <Accordion defaultValue={items.length > 0 ? items[0].key : undefined}>
            {items}
          </Accordion>
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
        )
)});