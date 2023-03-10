import React , {useEffect, useRef}from 'react'
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput.js';
import { useCollection, useDocument } from "react-firebase-hooks/firestore"
import { db } from '../firebase';
import {collection, doc} from 'firebase/firestore'
import Message from './Message';
import { orderBy } from 'firebase/firestore';
import { query } from 'firebase/firestore';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId));
    const [roomMessages, loading] = useCollection(roomId && query(collection(db,"rooms", roomId, "messages"),orderBy('timestamp','asc')));


    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
      }, [roomId, loading]);

  return (
    <ChatContainer>
        {roomDetails && roomMessages && (
            <>
            <Header>    
                <HeaderLeft>
                    <h4><strong>{roomDetails?.data().name}</strong></h4>
                    <StarBorderIcon></StarBorderIcon>
                </HeaderLeft>
                <HeaderRight>
                <p>
                    <InfoOutlinedIcon></InfoOutlinedIcon>Details
                </p>
                </HeaderRight>
            </Header>
            <ChatMessages>
                {roomMessages?.docs.map(doc => {
                    const {message, timestamp, user, userImage} = doc.data()
    
                    return (
                    <Message 
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    />
                    )
                })}
                <ChatBottom ref={chatRef}/>
            </ChatMessages>
            <ChatInput 
            chatRef={chatRef}
            ChannelName={roomDetails?.data().name} channelId={roomId}/>
            </>
        )}
        
    </ChatContainer>
  )
}
export default Chat

const ChatBottom = styled.div`
    margin-bottom: 200px;
`;


const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    margin-top: 55px;
    overflow: scroll;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    >h4 {
    display: flex;
    text-transform: lowercase;
    }
    > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div``;