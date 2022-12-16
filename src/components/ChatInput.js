import React, { useRef,useState } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth,db } from '../firebase';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ChannelName,channelId,chatRef}) {
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);
    const sendMessage = e => {
        e.preventDefault(); //Prevents refresh
        const message = {
            message: input,
            timestamp: serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        }

        if(!channelId) {
            return false;
        }
        //addDoc(collection(db,'posts'), post)
        addDoc(collection(db,"rooms", channelId, "messages"), message);

        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        })
        setInput('');
    }
  return (
    <ChatInputContainer>
        <form>
            <input value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder={(ChannelName ? `Message #${ChannelName}` : 'Select a channel')}/>
            <Button variant="contained" type='submit' onClick={sendMessage}>
                SEND
            </Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;
    
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        position: fixed;
        bottom: 40px;
        right: 60px;
    }
`;