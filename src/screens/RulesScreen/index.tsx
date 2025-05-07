import "./rules.css";
import { Card, Group, Text, Badge } from "@mantine/core";
import { useStores } from "../../logic/Providers/StoreProviders";

const groceries = [
    {
    value: 'Batting',
    rules: [
      { rule: 'Run', points: 1 },
      { rule: 'Boundary', points: 4 },
      { rule: 'Six', points: 6 },
      {rule : "Thiry plus", points: 25},
      { rule: 'Half-century', points: 50 },
      { rule: 'Century', points: 75 },
    ],
    },
    {
      value: 'Bowling',
      rules: [
        { rule: 'Wicket', points: 25 },
        { rule: 'Maiden Over', points: 10 },
        { rule: 'Hat-trick', points: 50 },
        { rule: 'Five-wicket haul', points: 100 },
      ],
    },
    {
      value: 'Fielding',
      rules: [
        { rule: 'Catch', points: 10 },
        { rule: 'Run-out', points: 15 },
        { rule: 'Stumping', points: 20 },
      ],
    },
  ];

const RulesScreen = () => {
  const { appStore } = useStores();
  return (
    <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)', padding: '32px 0' }}>
      <div className="rules-container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 ' }}>
        <h1 style={{ color: '#00e599', textAlign: 'center', fontWeight: 700, fontSize: 24, marginBottom: 32, letterSpacing: 1 }}> Rules</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: 28,
            justifyContent: 'center',
            alignItems: 'stretch',
            margin: '0 auto',
            maxWidth: 900,
          }}
        >
          {groceries.map((item) => (
            <Card
              key={item.value}
              shadow="md"
              padding="lg"
              radius="md"
              style={{
                background: 'rgba(24,28,35,0.93)',
                border: '1.5px solid #00e59944',
                boxShadow: '0 2px 16px 0 #00e59922',
                color: '#fff',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Text fw={700} style={{ color: '#00e599', fontSize: 22, marginBottom: 16, letterSpacing: 1 }}>{item.value}</Text>
              <div style={{ width: '100%' }}>
                {item.rules.map((rule, idx) => (
                  <Group key={idx} style={{ marginBottom: 10, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#b0b8c1', fontWeight: 500 }}>{rule.rule}</Text>
                    <Badge
                      style={{
                        background: 'rgba(0,229,153,0.10)',
                        color: '#00e599',
                        border: '1.5px solid #00e599',
                        fontWeight: 400,
                        fontSize: 11,
                        borderRadius: 8,
                        padding: '4px 12px',
                        letterSpacing: 1,
                      }}
                    >
                      {rule.points} pts
                    </Badge>
                  </Group>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RulesScreen;