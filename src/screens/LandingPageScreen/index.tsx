import { motion } from "framer-motion";
import { Button, Text } from "@mantine/core"
import LoginScreen from "../LoginScreen"
import { useState, useEffect } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import { observer } from "mobx-react-lite";
import { FaTrophy, FaChartLine, FaUsers } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const emerald = "#00ffa3";
const emeraldLight = "#33ffb3";
const emeraldDark = "#00cc82";
const dark = "#050a14";
const darkSecondary = "#0d1522";
const textSecondary = "#7a8599";

// Custom styles to override parent container constraints
const fullScreenStyle = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 50, // Reduced from 999 to avoid conflicts with modal
  overflow: 'auto', // Enable scrolling on mobile
};

export const LandingPageScreen: React.FC = observer(() => {
  const { appStore } = useStores();
  const caption = "KridaVyuha";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  // Handle window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: dark,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Top Nav */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '20px 18px' : '32px 48px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          background: 'rgba(5, 10, 20, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 255, 163, 0.15)',
          boxShadow: '0 0 20px rgba(0, 255, 163, 0.05)',
        }}
      >
        <span style={{ 
          color: 'white',
          fontWeight: 700, 
          fontSize: isMobile ? 18 : 24, 
          letterSpacing: 1,
          textShadow: '0 0 20px rgba(0, 255, 163, 0.5)'
        }}>KridaVyuha</span>
        <Button
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
            color: dark,
            fontWeight: 600,
            borderRadius: 8,
            letterSpacing: 1,
            padding: isMobile ? '8px 18px' : '12px 32px',
            fontSize: isMobile ? 14 : 18,
            boxShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #d8d8d8 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 0 30px rgba(0, 255, 163, 0.4)',
            }
          }}
          size={isMobile ? 's' : 'lg'}
          onClick={() => (appStore.isModalOpened = true)}
        >
          Get Started
        </Button>
      </div>

      {/* Hero Section */}
      <div style={{
        width: '100vw',
        marginTop: isMobile ? 40 : 88,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: isMobile ? 10 : 18,
        paddingBottom: isMobile ? 40 : 80,
        background: dark,
        zIndex: 2,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            zIndex: 2,
            width: '100%',
            margin: '0 auto',
            maxWidth: isMobile ? 340 : 'none',
          }}
        >
          <div style={{
            background: 'rgba(13, 21, 34, 0.8)',
            display: 'inline-block',
            borderRadius: 16,
            padding: isMobile ? '4px 12px' : '6px 22px',
            color: emerald,
            fontSize: isMobile ? 13 : 16,
            marginBottom: isMobile ? 12 : 22,
            letterSpacing: 1,
            border: '1px solid rgba(0, 255, 163, 0.3)',
            boxShadow: '0 0 20px rgba(0, 255, 163, 0.2)',
          }}>
            The Future of Fantasy Cricket
          </div>
          <h1 style={{
            fontSize: isMobile ? 38 : 72,
            fontWeight: 800,
            color: emerald,
            letterSpacing: 1.5,
            lineHeight: 1.08,
            margin: isMobile ? '14px 0 14px 0' : '28px 0 28px 0',
            textShadow: '0 0 32px rgba(0, 255, 163, 0.3), 0 0 8px rgba(0, 255, 163, 0.2)',
            width: '100%',
          }}>
            {caption}
          </h1>
          <p style={{
            color: textSecondary,
            fontSize: isMobile ? 16 : 28,
            fontWeight: 400,
            marginBottom: isMobile ? 24 : 40,
            textShadow: '0 0 8px rgba(5, 10, 20, 0.8)',
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Where Strategy Meets Cricket
          </p>
        </motion.div>
        {/* Curved Emerald Highlight */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100vw',
          height: isMobile ? 80 : 220,
          background: `radial-gradient(ellipse at center, ${emerald} 0%, ${dark} 80%)`,
          filter: 'blur(24px)',
          zIndex: 1,
          opacity: 0.3,
        }} />
      </div>
      {/* Main Content */}
      <div
        className="w-full max-w-6xl mx-auto px-5 md:px-8 py-4 md:py-8 flex flex-col items-center"
        style={{ background: 'transparent', marginTop: isMobile ? 0 : -40 }}
      >
        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8 md:mb-12 px-2 md:px-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <FeatureCard
            icon={<FaTrophy />}
            title="Live Contests"
            description="Compete in real-time matches along side cricket enthusiasts worldwide"
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Strategic Trading"
            description="Make data-driven decisions as the game unfolds"
          />
          <FeatureCard
            icon={<FaUsers />}
            title="Pods"
            description="Create your own pods and invite friends to join"
          />
        </motion.div>
        {/* Description */}
        <motion.div
          className="text-center max-w-2xl mb-8 md:mb-12 px-3 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-base md:text-xl leading-relaxed" style={{ color: textSecondary }}>
            Experience cricket like never before. Use your knowledge and intuition
            to trade players, make strategic decisions, and compete for rewards in real-time.
          </p>
        </motion.div>
      </div>
      {/* Login Modal */}
      {appStore.isModalOpened && (
        <div className="relative z-[60]">
          <LoginScreen />
        </div>
      )}
    </div>
  );
});

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    className="backdrop-blur-md rounded-lg p-6 md:p-8 border"
    style={{
      background: 'rgba(13, 21, 34, 0.8)',
      border: '1.5px solid rgba(0, 255, 163, 0.3)',
      boxShadow: '0 0 20px rgba(0, 255, 163, 0.15)',
      color: '#fff',
      minHeight: 180,
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ 
      scale: 1.06,
      rotate: -2,
      boxShadow: '0 0 30px rgba(0, 255, 163, 0.25)',
      borderColor: emerald,
      backgroundColor: 'rgba(0, 255, 163, 0.05)'
    }}
    transition={{ duration: 0.22 }}
  >
    <motion.div
      className="mb-3 md:mb-4"
      style={{ color: emerald, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      animate={{
        scale: [1, 1.13, 1],
        filter: [
          'drop-shadow(0 0 0px rgba(0, 255, 163, 0.5))',
          'drop-shadow(0 0 8px rgba(0, 255, 163, 0.8))',
          'drop-shadow(0 0 0px rgba(0, 255, 163, 0.5))'
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 1.6,
        ease: 'easeInOut',
      }}
    >
      {icon}
    </motion.div>
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: emerald, textAlign: 'center' }}>
      {title}
    </h3>
    <p className="text-xs md:text-sm leading-relaxed" style={{ color: textSecondary, textAlign: 'center' }}>
      {description}
    </p>
    {/* Neon border effect */}
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        border: '2.5px solid rgba(0, 255, 163, 0.3)',
        boxShadow: '0 0 0px rgba(0, 255, 163, 0.3)',
        opacity: 0,
        zIndex: 2,
      }}
      whileHover={{
        opacity: 1,
        boxShadow: '0 0 32px 8px rgba(0, 255, 163, 0.25)',
        borderColor: emerald,
      }}
      transition={{ duration: 0.22 }}
    />
  </motion.div>
);

export default LandingPageScreen;