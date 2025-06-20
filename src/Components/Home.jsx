import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';

function Home(props) {
  return (
    <main className="relative w-full h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e3e1db]">
      <div className="absolute top-0 h-[130px] w-full bg-primary shadow-md" />
      <div className="h-screen absolute w-full p-6 pb-0 flex items-center justify-center">
        <div className="flex h-full w-full max-w-8xl shadow-2xl bg-[#eff2f5] rounded-2xl border border-[#e3e1db] overflow-hidden">
          <ChatPanel />
          <ChatWindow />
        </div>
      </div>
    </main>
  )
}

export default Home