// src/components/CardLayout.tsx
import React, { useState } from 'react';
import { Card, Text, Image, Group, Badge, Button, Avatar, Modal, Stack } from '@mantine/core';
import { FaArrowTrendUp, FaArrowTrendDown,  } from "react-icons/fa6";
import { PiHourglassLow } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { NumberInput } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

interface CardProps {
    player_id: string;
    player_name: string;
    team : string;
    profile_pic: string;
    base_price: number;
    cur_price: number;
    last_change: string;
    shares: number;
  }

export const CardLayout: React.FC<CardProps> = ({ player_id, player_name, base_price,cur_price, team, last_change,profile_pic,shares}) => {
    
    const {tradeStore} = useStores();
    const league_id:string =  tradeStore.league_id || '';
    const navigate = useNavigate();


    const teamNameUpperCase:string = team.toUpperCase()
    const playerNameWithoutSpace = player_name ? player_name.replace(/ /g, "_") : '';
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const getRandomLetters = () => {
        return randomLetters.charAt(Math.floor(Math.random() * randomLetters.length)) + 
               randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
    };
 
   
    return (
        <div >
            <div>
            <Card 
                shadow="sm" 
                padding="sm" 
                radius="md" 
                withBorder 
                style={{ 
                    height: '180px',
                    background: '#181c23',
                    border: '1px solid #00e59922',
                    color: '#fff'
                }} 
                onClick={() => {
                    navigate(`/trade/graph?player_id=${player_id}&league_id=${league_id}&match_id=${tradeStore.match_id}`);
                }}
            >
               
                <Stack justify="center" align="center" mt="md" mb="xs">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00e59922 0%, #00e59944 100%)',
                        border: '1px solid #00e59933',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00e599',
                        fontSize: '18px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}
                    >
                      {/* {playerNameWithoutSpace ? playerNameWithoutSpace.slice(0, 2) : getRandomLetters()} */}
                    </div>
                    <Text fw={500} style={{ color: '#fff' }}>{player_name}</Text>
                </Stack>

                <Text size="sm" style={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#b0b8c1'
                }}>
                    <strong style={{ color: '#00e599' }}>₹{cur_price}</strong>
                    <div style={{ marginLeft: '5px' }}>
                        {
                        base_price < cur_price ? (
                            <FaArrowTrendUp style={{ color: '#00e599' }} />
                        ) : base_price > cur_price ? (
                            <FaArrowTrendDown style={{ color: '#ff4d4f' }} />
                        ) : (
                            <PiHourglassLow style={{ color: '#b0b8c1' }} />
                        )
                        }
                    </div>
                    <Text size="xs" style={{ 
                        marginLeft: '20px', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        color: '#b0b8c1'
                    }}>{shares} shares</Text>
                </Text>
                <div style={{ display: "flex" }}>
                </div>
            </Card>
            </div>
        </div>
    );
};

export default CardLayout;