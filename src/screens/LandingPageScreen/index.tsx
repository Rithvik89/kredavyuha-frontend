import { motion } from "framer-motion";
import { Button, Text } from "@mantine/core"
import LoginScreen from "../LoginScreen"
import { useState, useEffect } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import { observer } from "mobx-react-lite";
import { FaTrophy, FaChartLine, FaUsers } from "react-icons/fa";

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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={fullScreenStyle}>
      {/* Main container with background */}
      <div
        className="w-full min-h-full flex flex-col justify-start md:justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')",
          paddingTop: isMobile ? '2rem' : '0',
          minHeight: '100vh'
        }}
      >
        {/* Content Container */}
        <div className="w-full max-w-6xl mx-auto px-5 md:px-8 py-4 md:py-8 flex flex-col items-center">
          {/* Main Title */}
          <motion.div 
            className="mb-8 md:mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-3 md:mb-4 tracking-tight">
              {caption}
            </h1>
            <motion.p 
              className="text-lg md:text-2xl text-gray-300 font-light px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Where Strategy Meets Cricket
            </motion.p>
          </motion.div>

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
              description="Compete in real-time matches with cricket enthusiasts worldwide"
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Strategic Trading"
              description="Make data-driven decisions as the game unfolds"
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Community"
              description="Join a growing community of strategic cricket fans"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className="text-center max-w-2xl mb-8 md:mb-12 px-3 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-base md:text-xl text-gray-300 leading-relaxed">
              Experience cricket like never before. Use your knowledge and intuition
              to trade players, make strategic decisions, and compete for rewards in real-time.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8 md:mb-0" // Added bottom margin for mobile
          >
            <Button
              onClick={() => (appStore.isModalOpened = true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg px-8 md:px-12 py-3 md:py-4 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg"
              size={isMobile ? "md" : "xl"}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Login Modal */}
      {appStore.isModalOpened && (
        <div className="relative z-[60]"> {/* Ensure modal appears above the landing page */}
          <LoginScreen />
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
  );
});

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-700"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ 
      scale: 1.02,
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }}
    transition={{ duration: 0.2 }}
  >
    <div className="text-emerald-400 text-2xl md:text-3xl mb-3 md:mb-4">
      {icon}
    </div>
    <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
      {title}
    </h3>
    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default LandingPageScreen;