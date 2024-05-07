import {io} from "socket.io-client";

const chatSocket = io("http://192.168.0.11:18085", {
    autoConnect: false
});
export default chatSocket;