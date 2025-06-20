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
        <MessageSquareText className="w-28 h-28 text-gray-400 opacity-60" strokeWidth={1.2} />
        <p className='text-gray-400 text-2xl font-bold text-center opacity-80'>Select a chat <br /> to start messaging</p>
      </section>
    )
  }
  
  return (
    <section className="bg-gradient-to-br from-[#f7fafc] to-[#e3e1db] w-[70%] h-full flex flex-col gap-4 items-center justify-center">
      <div className='h-full w-full flex flex-col rounded-2xl rounded-tl-none shadow-xl overflow-hidden relative'>
        {/* Header */}
        <div className='bg-[#cdd0d2] py-4 px-8 flex items-center gap-4 border-b shadow-sm z-10'>
            <img src={secondUser?.photoURL||"./default_profile.png"}
              alt="Profile"
              className="w-[48px] h-[48px] rounded-full object-cover border-2 border-primary shadow"
            />
            <div>
            <h3 className="font-semibold text-lg text-primaryDense">{secondUser?.name}</h3>
            {
              secondUser?.last_seen && (
                <p className='text-xs text-neutral-500'>
                  Last seen {secondUser?.last_seen}
                </p>
              )
            }
            </div>
        </div>
        {/* Messages */}
        <div className="flex flex-grow flex-col gap-3 p-6 overflow-y-auto relative z-10" style={{ backgroundImage: "url('/assets/BG.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          {messageList.map((msg, index) => {
            const isSent = msg.sender === userData.user_id;
            return (
              <div
                key={index}
                data-sender={isSent}
                className={`
                  ${isSent
                    ? 'max-w-[60%] min-w-[80px] break-words p-2 mb-2 ml-auto bg-gradient-to-br from-primary to-primaryDense text-white rounded-2xl rounded-br-md shadow-lg hover:scale-[1.03] hover:shadow-xl'
                    : 'max-w-[40%] min-w-[80px] break-words py-2 px-4 mb-2 bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-md hover:scale-[1.03] border border-primary/10'}
                  group relative`
                }
              >
                <div className="whitespace-pre-line text-base font-medium">{msg?.message}</div>
                <p
                  className={`text-xs mt-2 text-end select-none transition
                    ${isSent ? 'text-white/70 group-hover:text-white/90' : 'text-gray-400 group-hover:text-primary'}`}
                >
                  {msg?.time}
                </p>
              </div>
            );
          })}
        </div>
        {/* Input */}
        <div className='bg-background py-4 px-8 shadow flex items-center gap-5 border-t z-10'>
          <button className="p-2 rounded-full hover:bg-primary/10 transition">
            <PlusIcon className="w-6 h-6 text-primary" />
          </button>
          <input type="text" placeholder="Type a message..." className="w-full py-3 px-5 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary text-base shadow-inner transition" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ handleSendMessage(); } }}/>
          <button onClick={handleSendMessage} className="p-2 rounded-full bg-primary hover:bg-primaryDense transition shadow text-white">
            <SendIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatWindow