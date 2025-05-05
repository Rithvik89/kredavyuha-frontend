import { ActionIcon, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Home, User, PlusSquare, Globe } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../logic/Providers/StoreProviders";
import { GoTrophy } from "react-icons/go";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import styled from "styled-components";

const SBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 50;
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #102a2e 60%, #101624 100%);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 229, 153, 0.18);
  box-shadow: 0 -2px 16px 0 rgba(0,229,153,0.08);
`;

const SActionIconWrapper = styled.div<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'rgba(0, 229, 153, 0.08)' : 'transparent')};
  border-radius: 12px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover svg {
    color: #00e599 !important;
  }
`;

function BottomBar() {
  const mantineTheme = useMantineTheme();
  const stores = useStores();
  const navigate = useNavigate();
  const location = window.location.pathname;

  return (
    <Observer>
      {() => {
        const { appStore, notificationStore } = stores;
        return (
          <SBottomBar>
            <SActionIconWrapper $active={location === "/leagues"}>
              <ActionIcon variant="transparent" onClick={() => {navigate("/leagues")}}>
                <GoTrophy size={22} color={location === "/leagues" ? "#00e599" : "#e0f7fa"} />
              </ActionIcon>
            </SActionIconWrapper>
            <SActionIconWrapper $active={location === "/portfolios"}>
              <ActionIcon variant="transparent" onClick={() => {navigate("/portfolios")}}>
                <HiOutlineBanknotes size={22} color={location === "/portfolios" ? "#00e599" : "#e0f7fa"} />
              </ActionIcon>
            </SActionIconWrapper>
            <SActionIconWrapper $active={location === "/leagues/create"}>
              <ActionIcon variant="transparent" onClick={() => {navigate("/leagues/create")}}>
                <IoAddCircleOutline size={28} color={location === "/leagues/create" ? "#00e599" : "#e0f7fa"} />
              </ActionIcon>
            </SActionIconWrapper>
            <SActionIconWrapper $active={location === "/notifications"}>
              <ActionIcon variant="transparent" onClick={() => {navigate("/notifications")}}>
                <div className="relative">
                  <IoIosNotificationsOutline size={24} color={location === "/notifications" ? "#00e599" : "#e0f7fa"} />
                  {notificationStore.unseenCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {notificationStore.unseenCount}
                    </span>
                  )}
                </div>
              </ActionIcon>
            </SActionIconWrapper>
            <SActionIconWrapper $active={location === "/profile"}>
              <ActionIcon variant="transparent" onClick={() => {navigate("/profile")}}>
                <User size={22} color={location === "/profile" ? "#00e599" : "#e0f7fa"} />
              </ActionIcon>
            </SActionIconWrapper>
          </SBottomBar>
        );
      }}
    </Observer>
  );
}

export default BottomBar;