import React from 'react';
import { motion } from "framer-motion";
import { Card, Text, Group, Badge, Button, Stack, HoverCard, Drawer, Divider, Tooltip } from '@mantine/core';
import { MLeague } from '../../logic/Model/MLeague';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';
import { BsTrophy } from "react-icons/bs";
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle } from '@tabler/icons-react';

interface LeagueCardsProps {
    data: MLeague;
}

export const LeagueCards: React.FC<LeagueCardsProps> = ({ data }) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, match_id, is_registered } = data;
    const [opened, { open, close }] = useDisclosure(false);
    const { leagueStore } = useStores();
    const navigate = useNavigate();

    const prizeDistribution = [14, 10, 7, 5, 5, 5, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    const totalPrize = entry_fee * capacity;
    const prizeList = prizeDistribution.map(percentage => (totalPrize * percentage) / 100);

    return (
        <motion.div
            whileHover={{ scale: 1.025, boxShadow: '0 4px 32px 0 #00e59922' }}
            transition={{ duration: 0.18 }}
            style={{ marginBottom: 24 }}
        >
            <Card
                padding="lg"
                radius="lg"
                style={{
                    background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)',
                    border: '1.5px solid #00e599',
                    boxShadow: '0 2px 16px 0 #00e59922',
                    color: '#fff',
                    minWidth: 0,
                    position: 'relative',
                }}
            >
                {/* Top-right ribbon */}
                {(league_status === 'not started' || league_status === 'close' || (registered >= capacity && league_status === 'open')) && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: -30,
                    zIndex: 2,
                    width: 100,
                    transform: 'rotate(45deg)',
                    pointerEvents: 'none',
                  }}>
                    {league_status === 'not started' && (
                      <span style={{
                        display: 'block',
                        background: 'transparent',
                        color: '#ffe066',
                        fontWeight: 500,
                        fontSize: 9,
                        padding: '4px 0',
                        boxShadow: 'none',
                        border: '1.5px solid #ffe066',
                        letterSpacing: 1,
                        textAlign: 'center',
                        borderRadius: 4,
                      }}>Hold On</span>
                    )}
                    {league_status === 'close' && (
                      <span style={{
                        display: 'block',
                        background: 'transparent',
                        color: '#ff4d4f',
                        fontWeight: 500,
                        fontSize: 9,
                        padding: '4px 0',
                        boxShadow: 'none',
                        border: '1.5px solid #ff4d4f',
                        letterSpacing: 1,
                        textAlign: 'center',
                        borderRadius: 4,
                      }}>Finished</span>
                    )}
                    {registered >= capacity && league_status === 'open' && (
                      <span style={{
                        display: 'block',
                        background: 'transparent',
                        color: '#b0b8c1',
                        fontWeight: 700,
                        fontSize: 11,
                        padding: '4px 0',
                        boxShadow: 'none',
                        border: '1.5px solid #b0b8c1',
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        borderRadius: 4,
                      }}>House Full</span>
                    )}
                  </div>
                )}

                {/* Header */}
                <Group justify="space-between" align="center" mb="xs" wrap="nowrap">
                    <Text fw={700} size="lg" style={{ color: '#fff', letterSpacing: 0.5, flex: 1 }}>
                        {team_a} <span style={{ color: '#00e599' }}>vs</span> {team_b}
                    </Text>
                </Group>

                {/* Prize Pool */}
                <Group mb="xs" align="center" style={{ background: '#232834', borderRadius: 10, padding: '10px 14px' }}>
                    <BsTrophy className="text-[#00e599]" size={20} />
                    <Text size="md" fw={600} style={{ color: '#00e599', letterSpacing: 0.2 }}>
                        Prize Pool: ₹{totalPrize}
                    </Text>
                    <Button
                        size="xs"
                        variant="subtle"
                        color="teal"
                        style={{ marginLeft: 'auto', fontWeight: 500 }}
                        onClick={open}
                    >
                        View Split
                    </Button>
                </Group>

                {/* Prize Distribution Drawer */}
                <Drawer
                    opened={opened}
                    onClose={close}
                    title="Prize Pool Distribution"
                    position="bottom"
                    size="70%"
                    styles={{
                        header: {
                            background: '#181c23',
                            color: '#fff',
                            borderBottom: '1px solid #232834'
                        },
                        body: {
                            background: '#181c23',
                            color: '#fff',
                            padding: '20px'
                        }
                    }}
                >
                    <Stack gap="xs">
                        <Group justify="space-between" mb="md" style={{ borderBottom: '1px solid #232834', paddingBottom: 10 }}>
                            <Text fw={600} size="sm" style={{ color: '#b0b8c1' }}>Rank</Text>
                            <Text fw={600} size="sm" style={{ color: '#b0b8c1' }}>Prize Amount</Text>
                        </Group>
                        {prizeList.map((prize, index) => (
                            <Group key={index} justify="space-between" style={{ 
                                padding: '8px 0',
                                borderBottom: index < prizeList.length - 1 ? '1px solid #232834' : 'none'
                            }}>
                                <Text size="sm" style={{ color: '#fff' }}>Rank {index + 1}</Text>
                                <Text size="sm" style={{ color: '#00e599', fontWeight: 600 }}>₹{prize.toFixed(2)}</Text>
                            </Group>
                        ))}
                    </Stack>
                </Drawer>

                <Divider my="sm" color="#232834" />

                {/* Stats */}
                <Group mb="md" align="center" style={{ color: '#b0b8c1', fontWeight: 500, fontSize: 15 }}>
                    <Text size="sm">Entry Fee: <span style={{ color: '#00e599', fontWeight: 600 }}>₹{entry_fee}</span></Text>
                    <Text size="sm">Players: <span style={{ color: '#00e599', fontWeight: 600 }}>{registered}</span>/{capacity}</Text>
                </Group>

                {/* Actions */}
                <div style={{ marginTop: 12 }}>
                  {league_status === 'open' && is_registered && (
                    <Button
                      fullWidth
                      radius="xl"
                      size="sm"
                      variant="outline"
                      color="teal"
                      onClick={() => navigate(`/trade?leagueId=${league_id}&matchId=${match_id}`)}
                      style={{ fontWeight: 600, fontSize: 14, letterSpacing: 0.1, border: '2px solid #00e599', color: '#00e599', padding: '8px 0' }}
                    >
                      Enter Room
                    </Button>
                  )}
                  {league_status === 'open' && !is_registered && (
                    <Button
                      fullWidth
                      radius="xl"
                      size="sm"
                      variant="outline"
                      color="teal"
                      disabled
                      style={{ fontWeight: 600, fontSize: 14, letterSpacing: 0.1, border: '2px solid #00e599', color: '#00e599', padding: '8px 0', background: 'rgba(0,229,153,0.08)' }}
                    >
                      Register
                    </Button>
                  )}
                </div>
            </Card>
        </motion.div>
    );
};