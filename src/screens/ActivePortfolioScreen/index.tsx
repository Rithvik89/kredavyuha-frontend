import { Loader, Text, Card } from "@mantine/core";
import { useEffect, useCallback, useRef, useState } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import { Summary } from "../PortfolioScreen/Summary";
import { PortfolioCard } from "../PortfolioScreen/PortfolioCard";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import useEmblaCarousel from 'embla-carousel-react';

export const ActivePortoflioScreen: React.FC = observer(() => {
   const {portfolioStore, appStore} = useStores()
   const navigate = useNavigate();
   const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', skipSnaps: false, containScroll: 'trimSnaps' });
   const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(()=>{
        portfolioStore.getActivePortfolio()
    },[])

    // Carousel selection handler
    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);
    useEffect(() => {
      if (!emblaApi) return;
      emblaApi.on('select', onSelect);
      onSelect();
    }, [emblaApi, onSelect]);

    const items = !portfolioStore.isLoading && portfolioStore.activePortfolios?.map((portfolio) => (
      <div
        key={portfolio.league_id}
        className="embla__slide"
        style={{
          minWidth: 320,
          maxWidth: 420,
          margin: '0 16px',
          flex: '0 0 80%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            background: 'rgba(24,28,35,0.93)',
            borderRadius: 14,
            border: '1.5px solid #00e59933',
            boxShadow: '0 2px 12px 0 #00e59911',
            color: '#fff',
            padding: '18px 14px',
            width: '100%',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s',
          }}
          onClick={() => navigate(`/trade?leagueId=${portfolio.league_id}&matchId=${portfolio.match_id}`)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>CSK vs KKR</span>
            {/* <Text style={{ fontSize: '13px', color: '#ff6347', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', textAlign: 'center' }}>Ends in: 120min</Text> */}
          </div>
          <div style={{ marginBottom: 10,marginTop:5 }}>
            <Summary
              invested={portfolio?.portfolio.players.reduce((sum, player) => sum + player.shares * player.avg_price, 0).toFixed(2) || 0}
              returns={portfolio?.portfolio.players.reduce((sum, player) => sum + player.cur_price * player.shares - player.shares * player.avg_price, 0).toFixed(2) || 0}
              balance={portfolio?.portfolio.balance ?? 0}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {portfolio.portfolio.players && portfolio.portfolio.players.filter(player => player.shares > 0).length > 0 ? (
              portfolio.portfolio.players
                .filter(player => player.shares > 0)
                .map(player => (
                  <div key={player.player_id} onClick={e => { e.stopPropagation(); navigate(`/trade/graph?player_id=${player.player_id}&league_id=${portfolio.league_id}&match_id=${portfolio.match_id}`); }}>
                    <PortfolioCard player={player} />
                  </div>
                ))
            ) : (
              <Text style={{ color: '#b0b8c1', textAlign: 'center', marginTop: 8 }}>No Stocks :(</Text>
            )}
          </div>
        </Card>
      </div>
    ));

    return (
      portfolioStore.isLoading ? (
        <section
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)',
          }}
        >
          <Loader size={"sm"} />
        </section>
      ) : (
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)', padding: '18px 0' }}>
          <Text style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold', color: 'white', fontSize: 22, letterSpacing: 1 }}>Active Portfolios</Text>
          <div className="embla" ref={emblaRef} style={{ overflow: 'hidden', width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <div className="embla__container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: '100%' }}>
              {items && items.length > 0 ? items : <Text style={{ color: '#b0b8c1', textAlign: 'center', marginTop: 32 }}>No Active Portfolios</Text>}
            </div>
          </div>
          {/* Dots navigation */}
          {items && items.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: selectedIndex === idx ? '#00e599' : '#232834',
                    border: 'none',
                    boxShadow: selectedIndex === idx ? '0 0 8px #00e59988' : 'none',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}
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
    );
});