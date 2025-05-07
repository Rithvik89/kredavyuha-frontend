import { Card, Group, Badge, Button, Text, HoverCard } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { MLeague } from "../../logic/Model/MLeague";
import { BsTrophy } from "react-icons/bs";

interface LeagueCardsProps {
    data: MLeague;
}

export const MyLeagueCards: React.FC<LeagueCardsProps> = (props: LeagueCardsProps) => {
    const { league_id, entry_fee, league_status, capacity, team_a, team_b, registered, match_id } = props.data;

    const navigate = useNavigate();
    
   
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            className='mb-5'
            withBorder
            onClick={() => {navigate(`/trade?leagueId=${league_id}&matchId=${match_id}`)}}
            style={{
                background: 'rgba(24,28,35,0.88)',
                border: '1.5px solid #00e59944',
                boxShadow: '0 1px 16px 0 #00e59922',
                color: '#fff',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
            }}
        >
            <Group justify="space-between">
                <Text fw={700} style={{ color: '#00e599', fontStyle: 'italic', textShadow: '0 0 5px #00e59944, 0 0 10px #181c23 , 0 0 15px #00e59922' }}>
                    T20  IPL'25
                </Text>
                <HoverCard width={280} shadow="md" styles={{
                    dropdown: {
                        background: '#181c23',
                        border: '1px solid #232834',
                        color: '#fff',
                    }
                }}>
                    <HoverCard.Target>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#00e599' }}>
                        <BsTrophy style={{ color: '#00e599' }} />
                        <p style={{ marginLeft: '5px', fontSize: '12px', fontWeight: 'bold', color: '#00e599' }}>30%</p>
                    </div>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                    <Text size="sm" style={{ color: '#b0b8c1' }}>
                        Top 30% of the participants will win the prize money
                    </Text>
                    </HoverCard.Dropdown>
            </HoverCard>
            </Group>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} style={{ color: '#fff' }}>{team_a} <span style={{ color: '#00e599' }}>vs</span> {team_b}</Text>
                {/* <Badge style={{
                    background: 'rgba(0,229,153,0.08)',
                    color: '#00e599',
                    border: '1.5px solid #00e599',
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    fontSize: 12,
                    borderRadius: 8,
                    padding: '4px 12px',
                }}>{league_status}</Badge> */}
            </Group>
            {/* <Group mt="md" style={{ flexDirection: 'row' }}>
                <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginLeft: 'auto', color: '#b0b8c1' }}>
                    <strong style={{ color: '#00e599' }}>Entry Fee: {entry_fee}</strong>
                </Text>
                <Text size="sm" style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', color: '#b0b8c1' }}>
                    <strong style={{ color: '#00e599' }}>Registered: {registered}/{capacity}</strong>
                </Text>
            </Group> */}
        </Card>
    );
}