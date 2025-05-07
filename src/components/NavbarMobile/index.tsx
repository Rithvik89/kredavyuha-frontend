import { Badge, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import {
  Award,
  Settings,
  Edit,
  Anchor,
  ShoppingCart,
  Home,
  Users
} from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
import NavbarMobileItem from "./NavbarMobileItem";
import { TfiBook } from "react-icons/tfi";
import { BiTennisBall } from "react-icons/bi";
import { motion } from "framer-motion";

const SNavBarMobile = styled.div`
  background: linear-gradient(135deg, #102a2e 60%, #101624 100%);
  backdrop-filter: blur(12px);
  position: fixed;
  top: 60px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 1.5rem 1.5rem 1.5rem;
  margin-top: 0;
  /* border-top: 1px solid rgba(0, 229, 153, 0.18); */
  box-shadow: 0 4px 24px 0 rgba(0,229,153,0.08);

  & > *:first-child {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
`;

const SMobileBar = styled(motion.a)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 100%;
  margin: 0.5rem 0;
  color:rgb(251, 251, 251);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-family: 'Inter', 'Roboto', Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  font-size: 1.08rem;
  
  &:hover {
    background: rgba(0, 229, 153, 0.10);
    color: #00e599;
    box-shadow: 0 0 8px 2px #00e59944;
  }

  &.active {
    background: rgba(0, 229, 153, 0.18);
    color: #00e599;
    box-shadow: 0 0 12px 3px #00e59966;
  }
`;

interface INavBarMobile {
  setIsNavBarOpened: (e: boolean) => void;
}

function NavBarMobile({ setIsNavBarOpened }: INavBarMobile) {
  const stores = useStores();
  const mantineTheme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { appStore } = stores;

  const isActive = (path: string) => location.pathname === path;

  return (
    <Observer>
      {() => {
        return (
          <SNavBarMobile>              
            <SMobileBar 
              onClick={() => {
                navigate("/leagues");
                setIsNavBarOpened(false);
              }}
              className={isActive("/leagues") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Game Rooms" 
                icon={<Award className="text-[#00e599]" />} 
              />
            </SMobileBar>

            <SMobileBar 
              onClick={() => {
                navigate("/portfolio");
                setIsNavBarOpened(false);
              }}
              className={isActive("/portfolio") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Portfolio" 
                icon={<ShoppingCart className="text-[#00e599]" />} 
              />
            </SMobileBar>

            <SMobileBar 
              onClick={() => {
                navigate("/playbook");
                setIsNavBarOpened(false);
              }}
              className={isActive("/playbook") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Play Book" 
                icon={<BiTennisBall className="text-[#00e599]" />} 
              />
            </SMobileBar>
            
            <SMobileBar 
              onClick={() => {
                navigate("/rules");
                setIsNavBarOpened(false);
              }}
              className={isActive("/rules") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Rules" 
                icon={<Anchor className="text-[#00e599]" />}
              />
            </SMobileBar>

            <SMobileBar 
              onClick={() => {
                navigate("/feedback");
                setIsNavBarOpened(false);
              }}
              className={isActive("/feedback") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Feedback" 
                icon={<Edit className="text-[#00e599]" />} 
              />
            </SMobileBar>

            <SMobileBar 
              onClick={() => {
                navigate("/settings");
                setIsNavBarOpened(false);
              }}
              className={isActive("/settings") ? "active" : ""}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavbarMobileItem 
                title="Settings" 
                icon={<Settings className="text-[#00e599]" />} 
              />
            </SMobileBar>
          </SNavBarMobile>
        );
      }}
    </Observer>
  );
}

export default NavBarMobile;