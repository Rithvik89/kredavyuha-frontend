import React from "react";
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { MyLeagueCards } from "./MyLeagueCards";
import { MyLeagues } from "./MyLeagues";

// Add a style tag to override Mantine Tabs indicator and borders
const emeraldTabsIndicatorStyle = `
.mantine-Tabs-list {
  border-bottom: none !important;
}
.mantine-Tabs-tab {
  border-bottom: none !important;
}
.mantine-Tabs-indicator {
  display: none !important;
  background: transparent !important;
  border: none !important;
}
`;

export const ProfileTabs: React.FC = () => {
    return (
        <>
        <style>{emeraldTabsIndicatorStyle}</style>
        <Tabs defaultValue="leagues"
            styles={{
                root: {
                    background: 'rgba(24,28,35,0.85)',
                    borderRadius: 14,
                    boxShadow: '0 2px 16px 0 #00e59922',
                    padding: '0 0 12px 0',
                    border: 'none',
                },
                list: {
                    background: 'rgba(32,35,42,0.92)',
                    borderRadius: 10,
                    // border: '1.5px solid #00e59944',
                    boxShadow: '0 2px 8px 0 #00e59911',
                    margin: '0 12px',
                    padding: '4px 0',
                    display: 'flex',
                    justifyContent: 'space-around',
                    borderBottom: 'none',
                },
                tab: (theme: any, params: Record<string, any>, ctx: any) => ({
                    color: params['data-active'] ? '#00e599' : '#b0b8c1',
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 8,
                    padding: '8px 18px',
                    transition: 'all 0.2s',
                    background: params['data-active'] ? 'rgba(0,229,153,0.08)' : 'transparent',
                    border: params['data-active'] ? '1.5px solid #00e599' : 'none',
                    boxShadow: params['data-active'] ? '0 2px 8px 0 #00e59922' : 'none',
                }),
                panel: {
                    background: 'rgba(24,28,35,0.92)',
                    borderRadius: 10,
                    border: 'none',
                    margin: '20px',
                    padding: '18px 12px',
                    color: '#b0b8c1',
                    boxShadow: 'none',
                },
            }}
        >
        <Tabs.List>
          <Tabs.Tab value="leagues" leftSection={<IconPhoto size={16} color="#00e599" />}>
            Leagues
          </Tabs.Tab>
          <Tabs.Tab value="stats" leftSection={<IconMessageCircle size={16} color="#00e599" />}>
            Stats
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={16} color="#00e599" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="leagues">
          <MyLeagues/>
        </Tabs.Panel>
  
        <Tabs.Panel value="stats">
          Stats tab content
        </Tabs.Panel>
  
        <Tabs.Panel value="settings">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
      </>
    )
}