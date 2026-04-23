package com.example.roxdemo;

import io.rollout.rox.server.Rox;
import java.util.concurrent.ExecutionException;

public class Main {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        // Initialize Flags container class
        Flags flags = new Flags();

        // Register the flags container under a namespace
        Rox.register("default", flags);

        // Setup connection with the feature management environment key
        Rox.setup("13abf4cc-8d19-430a-aa7e-23ab6a6ea06e").get();

        // Prints the value of the boolean enableTutorial flag
        System.out.printf("enableTutorial value is %s", flags.enableTutorial.isEnabled() ? "true" : "false");
    }
}
