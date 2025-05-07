import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Fieldset, TextInput,Text, Card } from '@mantine/core';
import { useStores } from '../../logic/Providers/StoreProviders';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Spinner } from '../../components/Spinner';

export function CreateLeagueScreen() {
  const [matchId, setMatchId] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [capacity, setCapacity] = useState('');

  const { leagueStore, appStore } = useStores();
  

  const SubmitLeague= async()=>{
    try {
      await leagueStore.createLeague(matchId, Number(entryFee), Number(capacity));
  
      notifications.show({
        title: "Success",
        message: "League Created Successfully",
        color: "green",
      });
  
      // Reset form fields
      setCapacity('');
      setEntryFee('');
      setMatchId('');
  
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create league",
        color: "red",
      });
    }
  }

  if (leagueStore.isLoading === true) {
    return (
        <Spinner/>
    );
}

  return (
    
    <div style={{
      // height: 'calc(100vh - 64px-70px)',
      // background: 'linear-gradient(135deg, #20232a 60%, #181c23 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    }}>
  
      <div style={{
        color: '#b0b8c1',
        fontSize: 15,
        fontWeight: 400,
        textAlign: 'center',
        marginBottom: 28,
        maxWidth: 380,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Create a new fantasy league pod. Set your match, entry fee, and capacity to get started.
      </div>
      <style>{`.mantine-TextInput-input::placeholder { color: #b0b8c1 !important; opacity: 1; }`}</style>
      
      <form
        onSubmit={(e) => { e.preventDefault(); SubmitLeague(); }}
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'rgba(24,28,35,0.93)',
          borderRadius: 16,
          border: '1.5px solid #00e59933',
          boxShadow: '0 2px 16px 0 #00e59911',
          padding: '28px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <TextInput
          label={<span style={{ color: '#00e599', fontWeight: 600 }}>Match ID</span>}
          placeholder="1359507"
          value={matchId}
          onChange={(event) => setMatchId(event.currentTarget.value)}
          styles={{
            input: {
              background: '#181c23',
              color: '#fff',
              border: '1.5px solid #232834',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 16,
            },
            label: { color: '#00e599' },
          }}
        />
        <TextInput
          label={<span style={{ color: '#00e599', fontWeight: 600 }}>Entry Fee</span>}
          placeholder="100"
          value={entryFee}
          type="number"
          onChange={(event) => setEntryFee((event.currentTarget.value))}
          styles={{
            input: {
              background: '#181c23',
              color: '#fff',
              border: '1.5px solid #232834',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 16,
            },
            label: { color: '#00e599' },
          }}
        />
        <TextInput
          label={<span style={{ color: '#00e599', fontWeight: 600 }}>Capacity</span>}
          placeholder="100"
          value={capacity}
          type="number"
          onChange={(event) => setCapacity((event.currentTarget.value))}
          styles={{
            input: {
              background: '#181c23',
              color: '#fff',
              border: '1.5px solid #232834',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 16,
            },
            label: { color: '#00e599' },
          }}
        />
        <TextInput
          label={<span style={{ color: '#00e599', fontWeight: 600 }}>Contest Type</span>}
          placeholder='Classic'
          value="Classic"
          disabled
          styles={{
            input: {
              background: '#232834',
              color: '#b0b8c1',
              border: '1.5px solid #232834',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 16,
            },
            label: { color: '#00e599' },
          }}
        />
        <Button
          type="submit"
          variant="outline"
          size="md"
          style={{
            // background: 'linear-gradient(90deg, #00e599 0%, #00b383 100%)',
            color: '#fff',
            fontWeight: 500,
            borderRadius: 8,
            letterSpacing: 1,
            boxShadow: '0 2px 8px 0 #00e59933',
            border: 'none',
            padding: '8px 24px',
            fontSize: 17,
            transition: 'background 0.2s',
            marginTop: 8,
          }}
        >
          Create League
        </Button>
      </form>
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
}