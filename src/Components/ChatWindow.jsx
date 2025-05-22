import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import { useAuth } from './AuthContext';

function ChatWindow() {
    const { userData } = useAuth();
    const params = useParams();
    const ID = params?.ID;
    const [message, setMessage] = React.useState("");
    const [secondUser, setSecondUser] = React.useState(null);
    const [messageList, setMessageList] = React.useState([]);
    const chatID = 
    userData.user_id > ID ? 
    `${userData.user_id}-${ID}` : 
    `${ID}-${userData.user_id}`;

    const handleSendMessage = async () => {
      if(message){
        const date = new Date();

        const timeStamp = date.toLocaleTimeString("en-US",{
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      
      
        if(messageList?.length === 0) {
          await setDoc(doc(db, "user-chats", chatID), {
          chatID: chatID,
          messages: [{
            message: message,
            time: timeStamp,
            sender: userData.user_id,
            receiver: ID
          }]
        });
        } else {
          await updateDoc(doc(db, "user-chats", chatID), {
          chatID: chatID,
          messages: arrayUnion({
            message: message,
            time: timeStamp,
            sender: userData.user_id,
            receiver: ID
          }),
          });
        }
        setMessage("");
      }
    }

  useEffect(() => {
    const fetchSecondUser = async () => {
      const userRef = doc(db, "users", ID);
      const docSnap = await getDoc(userRef);

      if(docSnap.exists()){
        setSecondUser(docSnap.data());
      }
    }
    
    fetchSecondUser();

    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatID), (doc) => {
      setMessageList(doc.data()?.messages || []);
    });

    return () => {
      msgUnsubscribe();
    }
  }, [ID]);

  if(!ID){
    return (
      <section className="bg-background w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText className="w-28 h-28 text-gray-500"
        strokeWidth={1.2}>
        </MessageSquareText>
  
        <p className='text-gray-500 text-xl font-bold text-center'>Select a chat 
          <br />
          to start messaging</p>
  
      </section>
    )
  }
  
  return (
    <section className="bg-background w-[70%] h-full flex flex-col gap-4 items-center justify-center">
      <div className='h-full w-full flex flex-col bg-chat-bg'>
        <div className='bg-[#cdd0d2] py-2 px-4 border-r flex items-center  gap-3'>
            <img src={secondUser?.photoURL||"./default_profile.png"}
              alt="Profile"
              className="w-[50px] h-[50px] rounded-full object-cover"
            ></img>
            <div>
            <h3>{secondUser?.name}</h3>
            {
              secondUser?.last_seen && (
                <p className='text-xs text-neutral-500'>
                  Last seen {secondUser?.last_seen}
                </p>
              )
            }
            </div>

        </div>

        <div className="flex flex-grow flex-col gap-4 p-6 overflow-y-auto">
          {messageList.map((msg, index) => (
            <div key={index} 
            data-sender={msg?.sender === userData.user_id} 
            className={`bg-primary-light w-fit rounded-md p-2 shadow-sm  max-w-[400px] break-words ${msg.sender === userData.user_id ? 'ml-auto' : ''} data-[sender == true]:bg-primary-light`}>
              <div>
                {msg?.message}
              </div>
              <p className='text-xs text-neutral-500 text-end'>
                {msg?.time}
              </p>
            </div>
          ))} 
        </div>

        <div className='bg-background py-3 px-6 shadow flex items-center gap-6'>
          <PlusIcon></PlusIcon>
          <input type="text" placeholder="Type a message..." className="w-full py-2 px-4 rounded focus:outline-red"
          value={message}
          onChange={(e) => 
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSendMessage();
            }
          }}/>
          <button onClick={handleSendMessage}>
            <SendIcon></SendIcon>
          </button>
        </div>
      </div>
    </section>

  )
}

export default ChatWindow