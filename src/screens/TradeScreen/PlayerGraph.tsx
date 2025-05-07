import { LineChart } from '@mantine/charts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';
import { Avatar, Badge, Button, Group, Modal, NumberInput, Stack, Text, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MTradeEntity } from '../../logic/Model/MTrade';
import { useWebSocket } from '../../hooks/useWebSocket';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const handleWSMessage = (messages : any, entities: MTradeEntity[]| null) => {
    const updatedPlayers: MTradeEntity[] = (entities || []).map((player) => {
        // get whether the message is about performancefactor or corefactor
        if(messages[0].is_perf) {
            const perfFactor:number  = messages[0].perf_details.perf_factor[player.player_id];

            if (perfFactor) {
                // new price
                console.log("Performance factor: " ,perfFactor)
                const lastPrice = player.cur_price;
                return {
                    ...player,
                    cur_price: lastPrice + (perfFactor),
                };
            }
            return player;
            
        } else {
            const  coreFactor:string  = messages[0].core_details.core_factor[player.player_id];
            const coreFactorParsed = parseFloat(coreFactor).toFixed(2);
            const coreFactorRounded = parseFloat(coreFactorParsed)
            
            if (coreFactor) {
               
                return {
                    ...player,
                    cur_price: coreFactorRounded
                };
            }
            return player;
        }
        
    });


    return updatedPlayers;
}

const PlayerGraph = observer(() => {
    const [searchParams] = useSearchParams();
    const { tradeStore, portfolioStore, appStore } = useStores();
    const [opened, setOpened] = useState(false);

    const [transactShares, setTransactShares] = useState<number>(0);
    const [shares, setShares] = useState<number>(0)

    var player : MTradeEntity | null ;

    const league_id = searchParams.get('league_id') || '';
    const match_id = searchParams.get('match_id') || '';
    const player_id = searchParams.get('player_id') || '';

    tradeStore.setLeagueId(league_id);
    tradeStore.setMatchId(match_id);

    
    useEffect(() => {
        const fetchData = async () => {
            await portfolioStore.getPortfolio(league_id);  
            // number of shares should be updated when reopend.
            // write a different enpoint which just serves shares of the current player u hold.
            // or fcking get it from the above loaded portfolio
            portfolioStore.portfolio?.players.forEach((player)=>{
                if(player.player_id === player_id){
                    setShares(player.shares)
                }
            })
        }; 
        fetchData();
    }, [opened]);

    useEffect(() => {
        const fetchData = async () => {
            await tradeStore.getPlayerGraph(player_id, league_id);    
        }; 
        fetchData();
    }, []);

   

    const WS_URL = import.meta.env.VITE_WS_URL;

    const { isConnected, messages, sendMessage } = useWebSocket({
        url:  WS_URL+'/ws?league_id=' + league_id + '&match_id=' + match_id,
    });

    useEffect(() => {
        if (messages.length > 0) {
            const updatedPlayers = handleWSMessage(messages, tradeStore.entities);
            tradeStore.setEntities(updatedPlayers);
            tradeStore.getOnlyPlayerGraphWithOutEntitiesUpdate(player_id,league_id)
        }
    }, [messages]);

    if (tradeStore.isLoading){
        return <Spinner/>
    }

    player = tradeStore.entities?.find(p => p.player_id === player_id) || null;

    const data = tradeStore.getPoints()

    const series = [{
        name: 'Stock Value',
        data: data.map(item => ({ x: item.time, y: item.value })) // Keep x as original Date object
    }];  
    
    // Select key timestamps dynamically to avoid clutter
    const keyTimestamps = data.map((point, index) => {
        if (
            index === 0 || 
            index === data.length - 1 || 
            index % Math.ceil(data.length / 5) === 0
        ) {
            return new Date(point.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
        return null;
    }).filter((item) => item !== null); // Remove null values
        
    const options: ApexOptions = {
        chart: {
            type: "line",
            zoom: { type: "x", enabled: true, autoScaleYaxis: true },
            toolbar: { show: false },
        },
        stroke: {
            width: 1.5, // Decrease line thickness
        },
        markers: {
            size: keyTimestamps.length === 1 ? 6 : 0, // Larger dot if only one point
           
        },
        xaxis: {
            labels: {
                show: false
            },
            type: "category", // Use "category" for non-uniform spacing
            categories: keyTimestamps.length > 0 ? keyTimestamps : ["No Data"], // Provide filtered key timestamps
        },
        yaxis: {
            labels: {
                show: true, // Keep Y-axis labels
            },
        },
        dataLabels: {
            textAnchor: 'end',
            enabled: false, // Hide values on graph points
        },
    };
    


    return (
        <div style={{ 
            margin: '30px 10px 10px',
            background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)',
            marginTop: '50px'
        }}>
            <Card style={{
                background: 'rgba(24,28,35,0.93)',
                borderRadius: 14,
                border: '1.5px solid #00e59933',
                boxShadow: '0 2px 12px 0 #00e59911',
                marginBottom: '20px',
                width: '100%'
            }}>
                <Group mt="md" mb="xs" style={{paddingTop:'18px',paddingBottom:'30px'}}>
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
                        {player?.player_name?.slice(0, 2) || 'NA'}
                    </div>
                    <Stack ml={15}>
                        <Text fw={500} style={{ color: '#fff' }}>{player?.player_name}</Text> 
                        <Badge style={{ 
                            background: '#232834',
                            color: '#00e599',
                            border: '1px solid #00e59922'
                        }}>{player?.team}</Badge>
                    </Stack>
                    <Stack ml="auto" gap={2}>
                        <Text size="sm" style={{ color: '#b0b8c1' }} ml="auto" fw={700}>₹{player?.cur_price}</Text>
                        <Text size="sm" style={{ 
                            color: ((player?.cur_price || 0) - (player?.base_price ?? 0)) >= 0 ? '#00e599' : '#ff4d4f'
                        }}>
                            {((player?.cur_price || 0) - (player?.base_price ?? 0)) >= 0 ? '+' : ''}
                            {((player?.cur_price || 0) - (player?.base_price ?? 0)).toFixed(2)} 
                            ({((((player?.cur_price || 0) - (player?.base_price ?? 0)) / (player?.base_price ?? 1)) * 100).toFixed(2)}%)
                        </Text>
                    </Stack>
                </Group>

                <div style={{ 
                    background: 'rgba(24,28,35,0.93)',
                    borderRadius: 14,
                    border: '1px solid #232834',
                    width: '100%',
                    minHeight: '330px'
                }}>
                    <ReactApexChart 
                        options={{
                            ...options,
                            chart: {
                                ...options.chart,
                                background: 'transparent',
                                foreColor: '#b0b8c1',
                                width: '100%',
                                height: '100%',
                                animations: {
                                    enabled: true,
                                    speed: 800,
                                    animateGradually: {
                                        enabled: true,
                                        delay: 150
                                    },
                                    dynamicAnimation: {
                                        enabled: true,
                                        speed: 350
                                    }
                                }
                            },
                            grid: {
                                borderColor: '#232834',
                                strokeDashArray: 4,
                                xaxis: {
                                    lines: {
                                        show: true
                                    }
                                },
                                yaxis: {
                                    lines: {
                                        show: true
                                    }
                                }
                            },
                            tooltip: {
                                theme: 'dark',
                                x: {
                                    format: 'HH:mm:ss'
                                },
                                y: {
                                    formatter: (value) => `₹${value.toFixed(2)}`
                                }
                            },
                            stroke: {
                                curve: 'smooth',
                                width: 2
                            },
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    shadeIntensity: 1,
                                    opacityFrom: 0.7,
                                    opacityTo: 0.2,
                                    stops: [0, 90, 100]
                                }
                            }
                        }} 
                        series={series} 
                        type="area" 
                        height={300}
                        width="100%"
                    />
                </div>      

                <Button 
                    fullWidth 
                    mt="md" 
                    radius="md" 
                    onClick={() => setOpened(true)}
                    style={{
                        background: 'linear-gradient(135deg, #00e59922 0%, #00e59944 100%)',
                        border: '1px solid #00e59933',
                        color: '#00e599',
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #00e59933 0%, #00e59955 100%)',
                        }
                    }}
                >
                    Trade
                </Button>
            </Card>

            <Modal 
                opened={opened} 
                onClose={() => setOpened(false)} 
                title="Buy or Sell" 
                centered
                styles={{
                    title: { color: '#fff' },
                    header: { background: '#181c23', borderBottom: '1px solid #232834' },
                    body: { background: '#181c23', color: '#fff' },
                    content: { background: '#181c23' }
                }}
            >
                <Text style={{ color: '#b0b8c1' }}>Do you want to Buy or Sell your items?</Text>

                <NumberInput
                    value={transactShares}
                    onChange={(value) => setTransactShares(Math.max(0, value as number))}
                    label={`Holds ${shares?? 0} unit of this player`}
                    style={{ padding: '10px' }}
                    min={1}
                    styles={{
                        label: { color: '#b0b8c1' },
                        input: { 
                            background: '#232834',
                            border: '1px solid #232834',
                            color: '#fff',
                            '&:focus': {
                                borderColor: '#00e599'
                            }
                        }
                    }}
                />
                <Group justify="space-between" mt="md">
                    <Button
                        onClick={async () => {
                            if (player) {
                                await tradeStore.buyEntity(player.player_id, transactShares);
                                setTransactShares(0);
                                setOpened(false);
                                notifications.show({
                                    message: tradeStore.messages,
                                });
                            } else {
                                notifications.show({
                                    message: 'Player not found',
                                    color: 'red',
                                });
                            }
                        }}
                        disabled={
                            tradeStore.getTxns() === 0 ||
                            transactShares * (player?.cur_price ?? 0) >
                                (portfolioStore.portfolio?.balance ?? 0)
                        }
                        style={{
                            background: 'linear-gradient(135deg, #00e59922 0%, #00e59944 100%)',
                            border: '1px solid #00e59933',
                            color: '#00e599',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00e59933 0%, #00e59955 100%)',
                            }
                        }}
                    >
                        Buy
                    </Button>
                    <Stack gap={2}>
                        <Text fw={500} style={{ color: '#b0b8c1' }}>Balance: ₹{portfolioStore.portfolio?.balance}</Text>
                        <Text fw={500} style={{ color: '#b0b8c1' }}>
                            Market @: ₹{(transactShares * (player?.cur_price ?? 0)).toFixed(1)}
                        </Text>
                    </Stack>
                    <Button
                        onClick={async () => {
                            if (player) {
                                await tradeStore.sellEntity(player.player_id, transactShares);
                                setTransactShares(0);
                                setOpened(false);
                                notifications.show({
                                    message: tradeStore.messages,
                                });
                            } else {
                                notifications.show({
                                    message: 'Player not found',
                                    color: 'red',
                                });
                            }
                        }}
                        disabled={
                            (shares ?? 0) === 0 || transactShares > (shares ?? 0)
                        }
                        style={{
                            background: 'linear-gradient(135deg, #00e59922 0%, #00e59944 100%)',
                            border: '1px solid #00e59933',
                            color: '#00e599',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00e59933 0%, #00e59955 100%)',
                            }
                        }}
                    >
                        Sell
                    </Button>
                </Group>
            </Modal>
            
        </div>
    );
});

export { PlayerGraph };