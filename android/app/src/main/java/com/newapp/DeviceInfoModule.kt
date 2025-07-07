package com.newapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "DeviceInfo"
    }

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val deviceInfo = mapOf("device" to android.os.Build.MODEL, "OS" to android.os.Build.VERSION.RELEASE)
            promise.resolve(deviceInfo)
        } catch (e: Exception) {
            promise.reject("Error", e.localizedMessage)
        }
    }
}

