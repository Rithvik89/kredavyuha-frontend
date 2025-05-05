import { motion } from "framer-motion";
import { Button, Card, Loader, Text } from "@mantine/core";
import { LeagueCards } from "./LeagueCard";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../logic/Providers/StoreProviders";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const LeaguesScreen = observer(() => {
    const { leagueStore, appStore } = useStores();
    const navigate = useNavigate();

    useEffect(() => {
        leagueStore.getLeagues();
    }, []);

    if (leagueStore.isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="lg" color="emerald" />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#181c23', position: 'relative', zIndex: 1, overflow: 'hidden' }} className="p-4 md:p-8">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="w-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
                            Come Join the fun!
                        </h1>
                    </div>
                </div>
            </motion.div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leagueStore.leagues.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <Text size="xl" c="dimmed">
                            No active rooms found. Create one to get started!
                        </Text>
                    </div>
                ) : (
                    leagueStore.leagues.map((league, index) => (
                        <motion.div
                            key={league.league_id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <LeagueCards data={league} />
                        </motion.div>
                    ))
                )}
            </div>
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
