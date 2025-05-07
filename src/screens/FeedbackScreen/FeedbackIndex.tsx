import {
    Card,
    Button,
    Textarea,
    useMantineTheme,
    Title,
    FileInput,
    Text
  } from "@mantine/core";
  import { showNotification } from "@mantine/notifications";
  import { useState } from "react";
  import { Image } from "react-feather";
  import styled from "styled-components";
import { useStores } from "../../logic/Providers/StoreProviders";
  
  const SFeedback = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #20232a 60%, #181c23 100%);
    padding: 32px 0;
  `;
  
  function FeedbackIndex() {
    const mantineTheme = useMantineTheme();
    const [feedback, setFeedback] = useState<{
      content: string;
      image: File | null;
    }>({
      content: "",
      image: null
    });
  
    const [loading, setLoading] = useState(false);
    const store = useStores();
  
    return (
      <SFeedback>
        <Card
          shadow="lg"
          style={{
            border: "1.5px solid #00e59944",
            background: 'rgba(24,28,35,0.93)',
            borderRadius: 16,
            boxShadow: '0 2px 16px 0 #00e59922',
            maxWidth: 420,
            width: '100%',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="relative flex flex-col items-center"
        >
          <Title order={3} size={"md"} style={{ color: '#00e599', fontWeight: 700, letterSpacing: 1, marginBottom: 8, textAlign: 'center' }}>
            Help Us Become Better
          </Title>
          <Text style={{ color: '#b0b8c1', fontSize: 16, textAlign: 'center', marginBottom: 18 }}>
            What did you like most about our service? What areas do you think we can improve on for your next visit?
          </Text>
          <Textarea
            className="mt-2 w-full text-xl"
            value={feedback.content}
            onChange={(e) => {
              setFeedback((p) => {
                return { ...p, content: e.target.value };
              });
            }}
            placeholder="Every suggestion helps us deliver better."
            autosize
            minRows={8}
            maxRows={15}
            styles={{
              input: {
                background: '#181c23',
                color: '#fff',
                border: '1.5px solid #232834',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 16,
              },
              placeholder: { color: '#b0b8c1', opacity: 1 },
            }}
          />
          {/* <FileInput
            className="mt-1 w-full"
            value={feedback.image}
            accept="image/png,image/jpeg"
  
            onChange={(file) => {
              if (file)
                setFeedback((p) => {
                  return { ...p, image: file };
                });
            }}
            icon={<Image size={14} />}
          /> */}
          <Button
            loading={loading}
            disabled={feedback.content === "" && feedback.image === undefined}
            variant="outline"
            className="mt-4 w-full"
            style={{
              color: '#00e599',
              border: '1.5px solid #00e599',
              fontWeight: 600,
              borderRadius: 8,
              letterSpacing: 1,
              boxShadow: '0 2px 8px 0 #00e59933',
              padding: '8px 24px',
              fontSize: 17,
              marginTop: 18,
              background: 'transparent',
              transition: 'background 0.2s',
            }}
          >
            Send Feedback
          </Button>
        </Card>
      </SFeedback>
    );
  }
  
  export default FeedbackIndex;