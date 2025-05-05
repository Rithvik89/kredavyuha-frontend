import React from 'react';
import { Box, Burger, Drawer, Text, Group, Stack, useMantineTheme } from '@mantine/core';
import { observer, Observer } from 'mobx-react-lite';
import NavBarMobile from '../../NavbarMobile';
import { IoLogOutOutline } from "react-icons/io5";
import { useStores } from '../../../logic/Providers/StoreProviders';
import { motion } from 'framer-motion';

export const TopBarMobile: React.FC = observer(() => {
    const mantineTheme = useMantineTheme();
    const {authStore, appStore} = useStores();

    const handleLogout = async () => {
      await authStore.logout();
    };

    return (
      <Observer>
        {() => {
          return (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                background: 'linear-gradient(135deg, #102a2e 60%, #101624 100%)',
                backdropFilter: 'blur(10px)',
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "100",
                right: "0",
                height: "60px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "absolute",
                  left: "16px",
                  padding: "8px",
                  borderRadius: "8px",
                  background: appStore.isNavBarOpened ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                <Burger
                  opened={appStore.isNavBarOpened}
                  color={"#00e599"}
                  size="sm"
                  style={{
                    display: 'block'
                  }}
                  onClick={() => appStore.setIsNavBarOpened(!appStore.isNavBarOpened)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Text 
                  fw={700} 
                  size="lg" 
                  px={16} 
                  style={{ 
                    color: 'white',
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                    textShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  Krida Vyuha
                </Text>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "absolute",
                  right: "16px",
                  padding: "8px",
                  borderRadius: "8px",
                  background: 'transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                <IoLogOutOutline 
                  color='#00e599' 
                  size={22} 
                  onClick={handleLogout}
                />
              </motion.div>

              {appStore.isNavBarOpened && (
                <NavBarMobile
                  setIsNavBarOpened={(x: boolean) => appStore.setIsNavBarOpened(x)}
                />
              )}
            </motion.div>
          );
        }}
      </Observer>
    );
  });