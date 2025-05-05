import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../logic/Providers/StoreProviders';

const data = ['Portfolio', 'Trade', 'Standings'];

export function Slider() {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState(1);
    const navigate = useNavigate();
    const tradeStore = useStores().tradeStore;

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
        controlsRefs[index] = node;
        setControlsRefs(controlsRefs);
    };

    const controls = (
        <>
            <UnstyledButton
                key="Portfolio"
                className={classes.control}
                ref={setControlRef(0)}
                onClick={() => {
                    setActive(0);
                    tradeStore.setTab(0);
                }}
                mod={{ active: active === 0 }}
                style={{
                    color: active === 0 ? '#00e599' : '#b0b8c1',
                    background: active === 0 ? '#232834' : 'transparent',
                    border: '1px solid #00e59922',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transition: 'all 0.2s ease'
                }}
            >
                <span className={classes.controlLabel}>Portfolio</span>
            </UnstyledButton>
            <UnstyledButton
                key="Trade"
                className={classes.control}
                ref={setControlRef(1)}
                onClick={() => {
                    setActive(1)
                    tradeStore.setTab(1);
                }}
                mod={{ active: active === 1 }}
                style={{
                    color: active === 1 ? '#00e599' : '#b0b8c1',
                    background: active === 1 ? '#232834' : 'transparent',
                    border: '1px solid #00e59922',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transition: 'all 0.2s ease'
                }}
            >
                <span className={classes.controlLabel}>Trade</span>
            </UnstyledButton>
            <UnstyledButton
                key="Standings"
                className={classes.control}
                ref={setControlRef(2)}
                onClick={() => {
                    setActive(2)
                    tradeStore.setTab(2);
                }}
                mod={{ active: active === 2 }}
                style={{
                    color: active === 2 ? '#00e599' : '#b0b8c1',
                    background: active === 2 ? '#232834' : 'transparent',
                    border: '1px solid #00e59922',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transition: 'all 0.2s ease'
                }}
            >
                <span className={classes.controlLabel}>Standings</span>
            </UnstyledButton>
        </>
    );

    return (
        <div 
            className={classes.root} 
            ref={setRootRef}
            style={{
                background: '#181c23',
                border: '1px solid #00e59922',
                borderRadius: '12px',
                padding: '4px'
            }}
        >
            {controls}
            <FloatingIndicator
                target={controlsRefs[active]}
                parent={rootRef}
                className={classes.indicator}
                style={{
                    background: '#00e59922',
                    border: '1px solid #00e59944',
                    borderRadius: '8px'
                }}
            />
        </div>
    );
}

