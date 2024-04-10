"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState<string[]>([]);

  const socket = io("http://localhost:8080");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("messageFromServer", (data) => {
      console.log(data);
      setMessage((oldArray) => [...oldArray, data.data]);
    });

    socket.io.on("reconnect", (data) => {
      console.log("reconnect event");
      console.log(data);
    });
  }, []);

  const onChangeHandler = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input type="text" onChange={onChangeHandler} value={input} />
      <button
        onClick={() => {
          console.log("here");
          socket.emit("messageFromClient", { data: input });
        }}>
        Submit
      </button>
      {messages.map((item, index) => {
        return <h5 key={`${index}`}>{item}</h5>;
      })}
    </div>
  );
}
