package com.registration.services;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;

public class PushNotificationService extends Service {

 private Handler handler = new Handler();
 
 private Runnable runnableCode = new Runnable() {
   
   @Override
   public void run() {
     // context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("Heartbeat",null);
     Context context = getApplicationContext();
     Intent myIntent = new Intent(context, PushNotificationHandlerService.class);
     context.startService(myIntent);
     HeadlessJsTaskService.acquireWakeLockNow(context);
     handler.postDelayed(this, 2000);
   }
   
 };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

} 