import { TradeScreen } from "./Trade";
import { useStores } from "../../logic/Providers/StoreProviders";
import { PortfolioScreen } from "../PortfolioScreen";
import { Slider } from "./Slider";
import { GrTransaction } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import LeaderBoardScreen from "../LeaderboardScreen";
import { HoverCard } from "@mantine/core";
import { BsTrophy } from "react-icons/bs";
import { Text } from "@mantine/core";

export const Complete = observer(() => {
    const { tradeStore, appStore } = useStores();
    const txns = tradeStore.txns;

    return (
        <div className="flex flex-col items-center" style={{ 
            position: 'relative', 
            zIndex: 1, 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)'
        }}>
            <div className="fixed w-full flex justify-center items-center mt-4 z-10"
                style={{ 
                    width: '100vw', 
                    padding: '0 24px',
                    boxSizing: 'border-box' 
                }}
            >
                <Slider />
                {/* <div className="flex flex-row items-center space-x-0.5" style={{ marginLeft: '10px'}}>
                    <HoverCard width={200} shadow="md" styles={{
                        dropdown: {
                            background: '#181c23',
                            border: '1px solid #232834',
                            color: '#fff'
                        }
                    }}>
                        <HoverCard.Target>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#232834',
                                padding: '8px 18px',
                                borderRadius: '8px',
                                border: '1px solid #00e59922',
                                minWidth: '30px',
                                height: '36px',
                                boxSizing: 'border-box',
                                gap: '8px'
                            }}>
                                <GrTransaction style={{ color: '#00e599', fontSize: '18px' }} />
                                <p style={{ 
                                    margin: 0, 
                                    fontSize: '13px', 
                                    fontWeight: 'bold',
                                    color: '#00e599',
                                    lineHeight: 1
                                }}>{txns}</p>
                            </div>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text size="sm" style={{ color: '#b0b8c1' }}>
                                {txns} transactions left
                            </Text>
                        </HoverCard.Dropdown>
                    </HoverCard> */}
                {/* </div> */}
            </div>
       
            <div className="w-full mt-2" style={{ 
                overflowY: 'auto', 
                height: 'calc(100vh - 100px)', 
                paddingTop: '60px',
                background: 'transparent'
            }}>
                { tradeStore.tab == 0 && <PortfolioScreen/> }
                { tradeStore.tab == 1 && <TradeScreen/> }
                { tradeStore.tab == 2 && <LeaderBoardScreen/>}
            </div>
            {appStore.isNavBarOpened && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9998,
                    background: 'rgba(10, 15, 26, 0.75)',
                    backdropFilter: 'blur(10px)',
                    pointerEvents: 'auto',
                    transition: 'all 0.3s',
                }} />
            )}
        </div>
    );
});
