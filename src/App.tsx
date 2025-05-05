import React, { useEffect } from 'react';
import { TradeScreen } from './screens/TradeScreen/Trade';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LeaguesScreen } from './screens/LeaguesScreen';
import UserProfile from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { PlayerGraph } from './screens/TradeScreen/PlayerGraph';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { useStores } from './logic/Providers/StoreProviders';
import { Observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import { WIPScreen } from './screens/WIPScreen';
import { ProtectedRoutes } from './ProtectedRoute';
import { Complete } from './screens/TradeScreen';
import LeaderBoardScreen from './screens/LeaderboardScreen';
import { CreateLeagueScreen } from './screens/CreateLeagueScreen';
import PlayBookScreen from './screens/PlayBookScreen';
import RulesScreen from './screens/RulesScreen';
import NotificaitonScreen from './screens/NotificationScreen';
import { LandingPageScreen } from './screens/LandingPageScreen';
import FeedBackScreenIndex from './screens/FeedbackScreen';
import { ActivePortoflioScreen } from './screens/ActivePortfolioScreen';


const SApp = styled.section`
  width: 100%;
  max-width: 600px;
  overflow: auto;
  padding-bottom: 64px;
  background: #181c23;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const App: React.FC = () => {
  const store = useStores();

  function handleScreenWidthChanges() {
    store.appStore.setDeviceWidth(window.innerWidth);
    if (window.innerWidth <= 700) {
      store.appStore.setIsPhone(true);
    } else if (window.innerWidth <= 1250) {
      store.appStore.setIsTablet(true);
    } else {
      store.appStore.setIsDesktop(true);
    }
  }

  useEffect(() => {
    handleScreenWidthChanges();
    window.addEventListener('resize', handleScreenWidthChanges);
  }, []);

  return (
    <Observer>
      {() => {
        const { appStore } = store;
        appStore.Me()
        return (
          <Router>
            {/* {appStore.isDesktop && <RightFooterIndex/>} */}
            
            <SApp
              style={{
                marginBottom: `${appStore.isPhone ? "70px" : "0px"}`
              }}
              className={!appStore.isPhone ? "mx-3 " : ""}
            >
            
            {appStore.isLoggedIn &&<TopBar/>}
            {appStore.isLoggedIn && appStore.isPhone && <BottomBar />}
                <Routes>
                
                 <Route path="/" element={<LandingPageScreen />} />

                  <Route element={<ProtectedRoutes />}>
                  
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/trade" element={<Complete />} />
                  <Route path="/trade/graph" element={<PlayerGraph />} />
                  <Route path="/leagues" element={<LeaguesScreen />} />
                  <Route path="/leagues/create" element={<CreateLeagueScreen />} />
                  <Route path="/portfolio" element={<PortfolioScreen />} />
                  <Route path="/notifications" element={<NotificaitonScreen />} />
                  <Route path="/portfolios" element={<ActivePortoflioScreen/>} />
                  <Route path="/leaderboard" element={<LeaderBoardScreen />} />
                  <Route path="/rules" element={<RulesScreen />} />
                  <Route path="/playbook" element={<PlayBookScreen />} />
                  <Route path="/feedback" element={<FeedBackScreenIndex />} />
                  <Route path="/settings" element={<WIPScreen />} />
                  
                  </Route>
                </Routes>
            </SApp>
            {/* {!appStore.isPhone && <LeftFooterIndex />} */}
          </Router>
        );
      }}
    </Observer>
  );
};

export default App;
