import { styled } from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MNotification } from "../../logic/Model/MNotifications";
import NotificationTile from "./NotificaitonTile";
import { Spinner } from "../../components/Spinner";

const SNotificationIndex = styled.section`

  width: 100vw;
  max-width: 600px;
  margin: 10px auto;
  background: linear-gradient(135deg, #20232a 60%, #181c23 100%);
  border-radius: 18px;
  box-shadow: 0 2px 24px 0 #00e59922;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;


const NotificaitonScreen = observer(() => {

    const {notificationStore} = useStores();

    useEffect(()=>{
      const fetchData = async () => {
        await notificationStore.getNotifications()
    };
    fetchData();
    }, [])

    useEffect(()=>{
      notificationStore.updateStatus();
    },[])

    const notifications: MNotification[] = notificationStore.notifications || []

    if (notificationStore.isLoading === true) {
      return (
          <Spinner/>
      );
  }
  else {
  return (
    
    <SNotificationIndex>
        {notifications.length === 0 ? (
        <b className="flex h-[140px] w-full items-center justify-center text-center" style={{ color: '#b0b8c1', fontWeight: 500 }}>
            You're all caught up. No Notifications.
          </b>
        ):(
           notifications.map((notification,idx)=>(
                <NotificationTile key={idx} {...notification}/>
           ))
        )}
    </SNotificationIndex>
  );
}
});

export default NotificaitonScreen