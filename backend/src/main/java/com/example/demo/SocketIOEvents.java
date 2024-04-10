package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;

@Component
public class SocketIOEvents {
    private final SocketIOServer server;

    @Autowired
    public SocketIOEvents(SocketIOServer server) {
        this.server = server;
    }

    public void init() {
        server.addConnectListener(client -> {
            System.out.println("Client connected: " + client.getSessionId());
            server.getBroadcastOperations().sendEvent("messageFromServer", "Client connected: " + client.getSessionId());
        });

        server.addDisconnectListener(client -> {
            System.out.println("Client disconnected: " + client.getSessionId());
        });

        

        server.addEventListener("messageFromClient", String.class, (client, data, ackSender) -> {
            System.out.println("Received message: " + data);
            server.getBroadcastOperations().sendEvent("messageFromServer", data);
        });
    }
}
