import './playbook.css';
import { useStores } from "../../logic/Providers/StoreProviders";
import { observer } from "mobx-react-lite";

const Playbook = observer(() => {
    const { appStore } = useStores();
    return (
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)' }}>
            <div className="container">
                {/* <h1><strong>Kridavyuha Contest Playbook</strong></h1> */}
                <h2><u>Joining a Contest</u></h2>
                <ul>
                    <li><strong>Add Credits:</strong> Ensure you have enough credits in your Kridavyuha wallet.</li>
                    <li><strong>Find Live Contests:</strong> Browse the list of live contests and select the one you want to join.</li>
                    <li><strong>Register:</strong> Sign up for the contest before it enters the 'Open' state.</li>
                    <li><strong>Entry Window:</strong> Contests enter the 'Open' state 30 minutes before the match starts. This is your window to join.</li>
                    <li><strong>Trading Portfolio:</strong> Once registered, you receive 10,000 game points in your portfolio to trade players.</li>
                </ul>
                <h2><u>How a Contest Works</u></h2>
                <p>Every player in the contest has a <strong>base price</strong>, which fluctuates based on two factors:</p>
                <ol>
                    <li><strong>Performance Factor:</strong> Player's in-game performance impacts their price according to predefined rules.</li>
                    <li><strong>Purchase Rate Factor:</strong> Determined in the backend based on user sentiment.</li>
                </ol>
                <h3><u>Performance Factor</u></h3>
                <ul>
                    <li>Directly related to player stats (e.g., runs scored, wickets taken, strike rate, etc.).</li>
                    <li>Real-time updates ensure price reflects current match performance.</li>
                </ul>
                <h3><u>Purchase Rate Factor</u></h3>
                <ul>
                    <li>Kridavyuha batches transactions per player in a contest within small time intervals.</li>
                    <li>Net shares purchased per batch influence the player's price.</li>
                    <li>Ensures market sentiment affects pricing independently of in-game events.</li>
                </ul>
                <h3><u>Transaction Limits and Fees</u></h3>
                <ul>
                    <li>There are only a limited number of transactions that a user can perform in a match.</li>
                    <li>Every transaction is associated with a transaction fee, which will be displayed during the transaction process.</li>
                </ul>
                <h2><u>Key Rules to Remember</u></h2>
                <ul>
                    <li>Prices change dynamically, so act strategically.</li>
                    <li>Game points are limited; use them wisely for maximum returns.</li>
                    <li>Real-time updates allow for trading decisions based on both match performance and market trends.</li>
                </ul>
                <p>Stay engaged, analyze the market, and make your moves wisely to maximize your contest earnings!</p>
            </div>
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

export default Playbook;
