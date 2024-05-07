"use client"

import React, {useEffect, useState} from 'react';
import chatSocket from "@/app/socket";

export default function Home() {
    const [input, setInput] = useState("");
    const [messages, setMessage] = useState<string[]>([]);

    let onConnect = () => {
        console.log("connected:" + chatSocket.id);
    };
    let onDisconnect = () => {
        console.log("disconnected");
    };

    let onMessageEvent = (data: string) => {
        setMessage([...messages, data]);
    };
    chatSocket.on("connect", onConnect);
    chatSocket.on("disconnect", onDisconnect);
    chatSocket.on("messageFromServer", onMessageEvent);
    useEffect(() => {
        chatSocket.connect();
    }, []);
    const onChangeHandler = (event: any) => {
        setInput(event.target.value);
    };

    const onClickHandler = () => {
        console.log("here" + input);
        chatSocket.emit("send_message", {chatMessage: input, id: chatSocket.id, timestamp: Date.now()});
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <input type="text" onChange={onChangeHandler} value={input}/>
            <button onClick={onClickHandler}>Submit {messages.length}</button>
            {messages.map((item, index) => {
                return <h5 key={`${index}`}>{item}</h5>;
            })}
        </div>
    );
}