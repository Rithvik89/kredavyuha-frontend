import { Table, Text, Card, Title } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

export const LeaderBoardScreen = observer(() => {
  const {leaderboardStore, appStore} = useStores()
  const [searchParams] = useSearchParams();
  const leagueId:string = searchParams.get('leagueId') || ''; 
  const matchId:string = searchParams.get('matchId') || '';

  useEffect(() => {
    const fetchLeaderboard = async () => {
        await leaderboardStore.getLeaderboard(leagueId);
        leaderboardStore.setLeagueId(leagueId);
        leaderboardStore.setMatchId(matchId);
    }
    fetchLeaderboard();
  },[]);

  if (leaderboardStore.isLoading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: 'transparent'
        }}>
          <Spinner/>
        </div>
      );
  }

  const rows = leaderboardStore.leaderboard ? leaderboardStore.leaderboard.map((element, index) => (
    <Table.Tr key={index + 1} style={{ 
      background: index === 0 ? 'rgba(0,229,153,0.08)' : 'transparent',
      borderBottom: '1px solid #232834'
    }}>
      <Table.Td style={{ color: '#fff', fontWeight: index === 0 ? 700 : 500 }}>{index + 1}</Table.Td>
      <Table.Td style={{ color: '#fff' }}>{element.user_name}</Table.Td>
      <Table.Td style={{ 
        color: index === 0 ? '#00e599' : '#fff',
        fontWeight: index === 0 ? 700 : 500
      }}>₹{element.points}</Table.Td>
    </Table.Tr>
  )) : null;

  const ths = (
    <Table.Tr style={{ borderBottom: '2px solid #232834' }}>
      <Table.Th style={{ color: '#b0b8c1', fontWeight: 600 }}>Rank</Table.Th>
      <Table.Th style={{ color: '#b0b8c1', fontWeight: 600 }}>User</Table.Th>
      <Table.Th style={{ color: '#b0b8c1', fontWeight: 600 }}>Points</Table.Th>
    </Table.Tr>
  );

  return (
    <div style={{ 
      position: 'relative', 
      zIndex: 1, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)',
      padding: '20px'
    }}>
      <Card style={{
        background: 'rgba(24,28,35,0.93)',
        borderRadius: 14,
        border: '1.5px solid #00e59933',
        boxShadow: '0 2px 12px 0 #00e59911',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <Title order={2} style={{ 
          color: '#fff', 
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: 0.5
        }}>
          Leaderboard
        </Title>
        <Table 
          striped 
          highlightOnHover 
          withColumnBorders
          style={{
            '--mantine-color-table-border': '#232834',
            '--mantine-color-table-striped': 'rgba(35,40,52,0.3)',
            '--mantine-color-table-hover': 'rgba(0,229,153,0.08)',
          }}
        >
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
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
});

export default LeaderBoardScreen