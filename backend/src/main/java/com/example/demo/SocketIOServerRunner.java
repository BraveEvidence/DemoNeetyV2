package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SocketIOServerRunner implements CommandLineRunner {

    private final SocketIOEvents socketIOEvents;

    @Autowired
    public SocketIOServerRunner(SocketIOEvents socketIOEvents) {
        this.socketIOEvents = socketIOEvents;
    }

    @Override
    public void run(String... args) {
        socketIOEvents.init();
    }
}