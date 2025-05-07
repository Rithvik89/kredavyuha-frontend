import React, { useEffect, useState } from 'react';
import { Card, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';

import { Modal } from '@mantine/core';

const AUTH_INITIAL = 0;
const CHECKING_AUTH = 1;
const CHECKED_AUTH_LOGGED_IN = 2;


const LoginScreen: React.FC = observer(() => {
    const [opened, setOpened] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { authStore,appStore } = useStores();
    const navigate = useNavigate();

    const [authStage, setAuthStage] = useState(CHECKING_AUTH);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token: string = await authStore.isLoggedIn();
            if (token !== "") {
                setAuthStage(CHECKED_AUTH_LOGGED_IN);
            } else {
                setAuthStage(AUTH_INITIAL);
            }
        };
        checkLoginStatus();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await authStore.login(username, password);
        navigate('/leagues');
    };

    if (authStage === CHECKED_AUTH_LOGGED_IN) {
        navigate("/leagues");
    }

    if (authStage === CHECKING_AUTH) {
        return <Spinner />;
    }

    return (
        <Modal 
            opened={opened} 
            onClose={() => {
                setOpened(false)
                appStore.isModalOpened = false
            }} 
            title="Login"
            styles={{
                title: { color: '#00ffa3', fontWeight: 600 },
                content: { background: '#050a14' },
                header: { background: '#050a14' },
                body: { background: '#050a14' }
            }}
        >
            <Card 
                shadow="sm" 
                padding="lg"
                style={{
                    background: 'rgba(13, 21, 34, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 255, 163, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 163, 0.15)',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                        required
                        styles={{
                            label: { color: '#00ffa3', marginBottom: 8, fontWeight: 500 },
                            input: { 
                                background: '#050a14',
                                border: '1px solid rgba(0, 255, 163, 0.3)',
                                color: '#fff',
                                '&::placeholder': { color: '#7a8599' },
                                '&:focus': {
                                    borderColor: '#00ffa3',
                                    boxShadow: '0 0 10px rgba(0, 255, 163, 0.2)'
                                }
                            }
                        }}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        required
                        mt="md"
                        styles={{
                            label: { color: '#00ffa3', marginBottom: 8, fontWeight: 500 },
                            input: { 
                                background: '#050a14',
                                border: '1px solid rgba(0, 255, 163, 0.3)',
                                color: '#fff',
                                '&::placeholder': { color: '#7a8599' },
                                '&:focus': {
                                    borderColor: '#00ffa3',
                                    boxShadow: '0 0 10px rgba(0, 255, 163, 0.2)'
                                }
                            },
                            innerInput: { 
                                color: '#fff',
                                '&::placeholder': { color: '#7a8599' }
                            },
                            visibilityToggle: { color: '#7a8599' }
                        }}
                    />
                    <Button 
                        type="submit" 
                        fullWidth 
                        mt="xl"
                        style={{
                            background: '#00ffa3',
                            color: '#050a14',
                            fontWeight: 600,
                            '&:hover': {
                                background: '#33ffb3',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 0 20px rgba(0, 255, 163, 0.3)'
                            }
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </Modal>
    );
});


export default LoginScreen;