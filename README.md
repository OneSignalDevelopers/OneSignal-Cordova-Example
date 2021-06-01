### OneSignal Cordova Example
An example Cordova app with the OneSignal plugin intergated showing how to use each of its functions.

#### Trying the Example Out!
1. To build the example first run `cordova platform add android` and/or `cordova platform add ios`.
2. Open `www\js\index.js` and replace `"8d5e7b7f-9b51-476e-93f9-2edb0d332e4a"` with your OneSignal App Id.
3. Build and run the app on your device with `cordova run android` or `cordova run ios`.

#### Installing in Your Own Project
To add the OneSignal to your Cordova project run the following.
`cordova plugin add onesignal-cordova-plugin --save`

See the [OneSignal Cordova SDK Setup Guide](https://documentation.onesignal.com/docs/cordova-sdk-setup) for the full installation guide.

## Step Cordova 2.x to 3.0.0 Upgrade Guide

**Skip this step if you are already in version 3.0.0 or grather

Take a look to our [OneSignal Cordova SDK documentation](https://documentation.onesignal.com/docs/step-by-step-cordova-2x-to-300-upgrade-guide) to learn more about the Cordova 2.x to 3.0.0 upgrade.

1. Open your main file (e.g: index.js)
2. Replace the following

```javascript
// OneSignal Initialization
 var iosSettings = {};
iosSettings["kOSSettingsKeyAutoPrompt"] = false;
iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
               
window.plugins.OneSignal
  .startInit("YOUR_ONESIGNAL_APP_ID")
  .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
  .iOSSettings(iosSettings)
  .endInit();
```
With the new initialization:
```javascript
//OneSignal Initialization
window.plugins.OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");
```

## Initialize OneSignal in Cordova Application
```javascript
window.plugins.OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");
```
**This sample code is only implented to work with Cordova-Android.**
***Take a look to our [OneSignal Cordova SDK documentation](https://documentation.onesignal.com/docs/step-by-step-cordova-2x-to-300-upgrade-guide) to learn more about the iOS setup***

#### Using Ionic instead?
* [OneSignal Ionic Example](https://github.com/OneSignal/OneSignal-Ionic-Example)
* [OneSignal Ionic SDK Setup Guide](https://documentation.onesignal.com/docs/ionic-sdk-setup)
