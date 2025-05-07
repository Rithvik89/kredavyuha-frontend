import { Badge, Card, Text} from "@mantine/core"
export const Summary = ({ invested, returns, balance }: { invested: string|number, returns: string|number, balance: number }) => {
    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '1rem 0', 
            borderTop: '1px solid #232834', 
            background: '#181c23', 
            borderRadius: '8px', 
            width: '100%', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            border: '1px solid #00e59922'
        }}>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'left' }}>
                    <Text fw={500} size="md" style={{ color: '#b0b8c1' }}>Invested:</Text>
                    <Text fw={600} size="md" style={{ color: 'white' }}>
                        ₹{invested}
                    </Text>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <Text fw={500} size="md" style={{ color: '#b0b8c1' }}>Returns:</Text>
                    <Text fw={600} size="md" style={{ color: Number(returns) >= 0 ? '#00e599' : '#ff4d4f' }}>₹{returns}</Text>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <Text fw={500} size="md" style={{ color: '#b0b8c1' }}>Balance:</Text>
                    <Text fw={600} size="md" style={{ color: 'white' }}>
                        ₹{balance}
                    </Text>
                </div>
            </div>
        </div>
    )
}