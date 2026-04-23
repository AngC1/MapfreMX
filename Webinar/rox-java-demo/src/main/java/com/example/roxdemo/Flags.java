package com.example.roxdemo;

import io.rollout.flags.RoxFlag;

public class Flags {
    public RoxFlag enableTutorial = RoxFlag.createBooleanFlag("enableTutorial", false);
}
