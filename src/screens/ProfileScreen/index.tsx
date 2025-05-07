import React from 'react';
import { Avatar, Text, Stack, Box, Title, Card, List, ThemeIcon, Loader } from '@mantine/core';
import axios from 'axios';
import { IconCircleCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { Spinner } from '../../components/Spinner';
import { observer } from 'mobx-react-lite';
import { ProfileTabs } from './Tabs';

const getInitials = (name: string | undefined) => {
  if (!name) return '';
  return name.substring(0, 2).toUpperCase();
};


export const UserProfile: React.FC = observer(() => {

  const {profileStore, appStore} = useStores();

  useEffect(() => {
    const fetchProfile = async () => {
        await profileStore.getProfile()
    }
    fetchProfile();
  }, []);

  if (profileStore.isLoading === true) {
    return <Spinner/>
  } else {
    return (
      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, #20232a 60%, #181c23)'}}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{
          width: '100%',
          background: 'rgba(24,28,35,0.88)',
          border: '0px solid #00e59944',
          boxShadow: '0 4px 32px 0 #00e59922',
          color: '#ffff',
        }}>
            <Stack gap={8} align="center">
            <Avatar size={64} radius="xl" style={{ background: 'linear-gradient(135deg, #00e599 60%, #181c23 100%)', color: '#fff', fontWeight: 700, fontSize: 28 }}>
              {getInitials(profileStore.user?.profile?.user_name)}
            </Avatar>
            <Title order={3} style={{ color: '#00e599', fontWeight: 500, letterSpacing: 1 }}>{profileStore.user?.profile?.user_name}</Title>
            <Text style={{ color: '#b0b8c1', fontSize: 16 }}>{profileStore.user?.profile?.mail_id}</Text>
            </Stack>

            <Box
            mt="xl"
            p="md"
            style={{
              background: 'rgba(32,35,42,0.92)',
              borderRadius: '12px',
              textAlign: 'center',
              marginTop: 24,
              border: '1.5px solid #00e59922',
              boxShadow: '0 2px 12px 0 #00e59911',
            }}
            >
            <Text size="lg" fw={500} style={{ color: '#00e599', fontSize: 22 }}>
              Credits: {profileStore.user?.profile?.credits}
            </Text>
            <Text size="md" fw={500} style={{ color: '#b0b8c1', fontSize: 17 }}>
              Rating: { profileStore.user?.profile?.rating }
            </Text>
            </Box>
            <div style={{ marginTop: '28px' }}>
            <ProfileTabs />
            </div>
        </Card>
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
  }





});

export default UserProfile;