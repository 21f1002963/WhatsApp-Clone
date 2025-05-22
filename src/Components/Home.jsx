import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';

function Home(props) {
  return (
    <main className="relative w-full h-screen bg-[#E3E1DB]">
      <div className="absolute top-0 h-[130px] w-full bg-primary">
      </div>
      <div className="h-screen absolute w-full p-5 pb-0">
      <div className="flex h-full shadow-md bg-[#eff2f5]">
        <ChatPanel></ChatPanel>
        <ChatWindow></ChatWindow>
      </div>  
      </div>
    </main>

  )
}

export default Home