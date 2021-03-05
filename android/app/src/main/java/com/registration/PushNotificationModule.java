package com.registration;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PushNotificationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    PushNotificationModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "PushNotifications";
    }

    @ReactMethod
    public void startService() {
        // Starting the heartbeat service
        this.reactContext.startService(new Intent(this.reactContext, PushNotificationService.class));
    }
}