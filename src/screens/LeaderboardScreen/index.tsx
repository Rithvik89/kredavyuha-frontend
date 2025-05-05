import { Table, Text } from '@mantine/core';
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
      return <Spinner/>
  }
  const rows = leaderboardStore.leaderboard ? leaderboardStore.leaderboard.map((element, index) => (
    <Table.Tr key={index + 1}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.user_name}</Table.Td>
      <Table.Td>{element.points}</Table.Td>
    </Table.Tr>
  )) : null;

  const ths = (
    <Table.Tr>
     <Table.Th>Rank</Table.Th>
      <Table.Th>User</Table.Th>
      <Table.Th>Points</Table.Th>
    </Table.Tr>
  );

    return (
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          
            <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            </Table>
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