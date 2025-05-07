import React, { useEffect } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import FeedbackIndex from "./FeedbackIndex";
import { observer } from "mobx-react-lite";

const FeedBackScreenIndex = observer(() => {
  const { appStore } = useStores();

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <FeedbackIndex />
      {appStore.isNavBarOpened && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
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

export default FeedBackScreenIndex;