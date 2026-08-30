import { useState } from "react"
import type { SyntheticEvent } from "react"

type ChatProps = {
    onAssistantResponse: (message: string) => Promise<void>;
}

export function Chat({ onAssistantResponse }: ChatProps) {
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

    const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
        })
    });

    const data = await res.json();

    setResponse(data.message);
    setMessage("")

    await onAssistantResponse(data.message)
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write a message..."
                />
            
                <button type="submit">Send</button>
            
            </form>
            <div>
                <p>VocalSilence assistant response:</p>
                {response && <p>{response}</p>} 
            </div>
        </div>
    )

}