import { Accordion } from "@mantine/core";
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
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>
      <div style={{ textAlign: 'center' }}>
        {item.rules.map((rule, index) => (
        <p key={index}>
          <strong>{rule.rule}:</strong> {rule.points} points
        </p>
        ))}
      </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));
  
  return (
    <Accordion defaultValue="Batting">
      {items}
    </Accordion>
  );
};

export default RulesScreen;