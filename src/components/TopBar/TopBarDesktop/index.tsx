import React from 'react';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { styled } from 'styled-components';
import { useStores } from '../../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STopBarContainer = styled(motion.div)`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  height: 60px;
  width: 100%;
  z-index: 100;
`;

const STopBar = styled(motion.a)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 0 10px;
  color: #9CA3AF;
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    color: #10B981;
    background: rgba(16, 185, 129, 0.1);
  }

  &.active {
    color: #10B981;
    background: rgba(16, 185, 129, 0.2);
  }
`;

const TopBarDesktop: React.FC = () => {
  const mantineTheme = useMantineTheme();
  const appStore = useStores().appStore;
  const navigate = useNavigate();

  return (
    <STopBarContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="h-2 w-[33.33%]"></div>
      <motion.div 
        className="flex h-2 w-[33.33%] items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Text 
          fw={700} 
          size="lg" 
          px={16}
          style={{ 
            color: '#10B981',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            textShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
          }}
        >
          Kridavyuha
        </Text>
      </motion.div>
      <div
        style={{
          minWidth: '33.33%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <STopBar 
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text size="sm">Home</Text>
        </STopBar>
        <STopBar 
          onClick={() => navigate('/leagues')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text size="sm">Leagues</Text>
        </STopBar>
        <STopBar 
          onClick={() => navigate('/portfolios')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text size="sm">Portfolio</Text>
        </STopBar>
        <STopBar 
          onClick={() => navigate('/profile')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text size="sm">Profiles</Text>
        </STopBar>
      </div>
    </STopBarContainer>
  );
};

export default TopBarDesktop;
