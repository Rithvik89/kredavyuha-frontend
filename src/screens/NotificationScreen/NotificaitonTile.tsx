import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import styled from "styled-components";
import { MNotification } from "../../logic/Model/MNotifications";

const SNotificationTile = styled.div<{ bgcolor: string; hovercolor: string; $unread: boolean }>`
    min-height: 70px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    justify-content: flex-start;
    border-bottom: 1px solid #232834;
    cursor: pointer;
    background: ${(p) => p.bgcolor};
    border-radius: 10px;
    margin: 0 5px 10px 12px;
    box-shadow: 0 2px 8px 0 #00e59911;
    transition: background 0.18s;
    position: relative;
    :hover {
        background: ${(p) => p.hovercolor};
    }
    &::before {
        content: '';
        display: ${(p) => (p.$unread ? 'block' : 'none')};
        position: absolute;
        left: 0;
        top: 16px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00e599;
        box-shadow: 0 0 8px #00e59988;
    }
`;

function NotificationTile(props: MNotification) {
  // Use emerald for unseen, dark for read
  const isUnseen = props.status === "Unseen";
  const bg = isUnseen ? 'rgba(0,229,153,0.10)' : 'rgba(24,28,35,0.85)';
  const hover = isUnseen ? 'rgba(0,229,153,0.18)' : 'rgba(32,35,42,0.92)';

  return (
    <SNotificationTile
      bgcolor={bg}
      hovercolor={hover}
      $unread={isUnseen}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <div className="flex h-[48px] w-[48px] items-center justify-center p-2" style={{ minWidth: 48 }}>
          <GrTransaction style={{ color: '#00e599', fontSize: 22 }} />
        </div>
        <div style={{ flex: 1, color: '#b0b8c1', fontSize: 15, fontWeight: isUnseen ? 600 : 400, wordBreak: 'break-word' }}>
          {props.description}
        </div>
        <Text size={"xs"} style={{ color: '#b0b8c1', fontWeight: 500, minWidth: 70, textAlign: 'right' }}>
          {(() => {
            const seconds = Math.floor((new Date().getTime() - new Date(props.created_at).getTime()) / 1000);
            if (seconds < 60) return `${seconds} sec ago`;
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes} min ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours} hr ago`;
            const days = Math.floor(hours / 24);
            return `${days} days ago`;
          })()}
        </Text>
      </div>
    </SNotificationTile>
  );
}

export default NotificationTile;