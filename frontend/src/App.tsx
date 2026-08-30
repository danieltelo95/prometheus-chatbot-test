import './App.css'
import { Avatar } from './avatarFunction'
import { Chat } from './chat'
import type { AvatarHandle } from "./avatarFunction"
import { useRef } from 'react'

function App() {

  const avatarRef = useRef<AvatarHandle>(null);

  const handleAssistantResponse = async (message: string) => {
    await avatarRef.current?.speak(message);
  }
  return (
    <>
      <Avatar ref={avatarRef} />
      <Chat 
        onAssistantResponse={handleAssistantResponse}
      />
    </>
  )
}

export default App
