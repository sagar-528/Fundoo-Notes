package com.registration;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class PushNotificationEventService extends HeadlessJsTaskService {
   
    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "PushNotifications",
                extras != null ? Arguments.fromBundle(extras) : null,
                5000,
                true);
    }
    
}