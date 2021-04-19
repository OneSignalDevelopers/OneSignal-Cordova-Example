/**
 * Modified MIT License
 *
 * Copyright 2017 OneSignal
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * 1. The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * 2. All copies of substantial portions of the Software may only be used in connection
 * with services provided by OneSignal.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 

var addedObservers = false;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        //Remove this method to stop OneSignal Debugging
        window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});

        var notificationOpenedCallback = function(jsonData) {
            var notificationData = JSON.stringify(jsonData)
            console.log('notificationOpenedCallback: ' + notificationData);
            var notificationID = jsonData.notification.notificationId;
            console.log('notificationID: ' + notificationID);
            alert("Notification opened: \n" + JSON.stringify(jsonData));
        };

        var iamClickCallback = function(jsonData) {
            var iamClickAction = JSON.stringify(jsonData)
            console.log('iamClickCallback: ' + iamClickAction);
            alert("IAM click action: \n" + iamClickAction);
        };

        window.plugins.OneSignal.setAppId("77e32082-ea27-42e3-a898-c72e141824ef")
               
        window.plugins.OneSignal.handleNotificationWillShowInForeground(function(notificationReceivedEvent) {
            console.log('Calling completeNotification with: ' + JSON.stringify(notificationReceivedEvent));
            console.log('Calling completeNotification notification with: ' + JSON.stringify(notificationReceivedEvent.notification));
            
            notificationReceivedEvent.complete(notificationReceivedEvent.notification);
        });

        window.plugins.OneSignal.handleNotificationOpened(notificationOpenedCallback);
        window.plugins.OneSignal.handleInAppMessageClicked(iamClickCallback);

        window.plugins.OneSignal.disablePush(false);
        // window.plugins.OneSignal.pauseInAppMessages(true);

        if (addedObservers == false) {
            addedObservers = true;

            window.plugins.OneSignal.addEmailSubscriptionObserver(function(stateChanges) {
                console.log("Email subscription state changed: \n" + JSON.stringify(stateChanges, null, 2));
            });

            window.plugins.OneSignal.addSubscriptionObserver(function(stateChanges) {
                console.log("Push subscription state changed: " + JSON.stringify(stateChanges, null, 2));
            });

            window.plugins.OneSignal.addPermissionObserver(function(stateChanges) {
                console.log("Push permission state changed: " + JSON.stringify(stateChanges, null, 2));
            });
        }
        // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. 
        // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
        window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
            console.log("User accepted notifications: " + accepted);
        });

        window.plugins.OneSignal.provideUserConsent(true);
        window.plugins.OneSignal.userProvidedPrivacyConsent(function(stateChanges) {
            console.log("userProvidedPrivacyConsent: " + JSON.stringify(stateChanges));
        });

        // Android methods
        // window.plugins.OneSignal.removeNotification(100);
        // window.plugins.OneSignal.removeGroupedNotifications("test_group");
        //window.plugins.OneSignal.clearOneSignalNotifications();
    }
};

function triggerOutcome() {
    window.plugins.OneSignal.sendOutcomeWithValue("cordova", 10, function () {
        console.log("outcomes sent log");
    });

    window.plugins.OneSignal.sendOutcome("cordova_outcome", function () {
        console.log("outcomes sent log");
    });
    
    window.plugins.OneSignal.sendUniqueOutcome("cordova_unique_outcome2", function () {
        console.log("outcomes sent log");
    });
    window.plugins.OneSignal.sendUniqueOutcome("cordova_unique_outcome2", function () {
        console.log("outcomes sent log");
    });
    // window.plugins.OneSignal.removeTriggerForKey("birthday");
    // window.plugins.OneSignal.getTriggerValueForKey("birthday", function(values) {
    //     alert('getTriggerValueForKey Received: ' + JSON.stringify(values));
    // });
}

function triggerIAM() {
    console.log("Triggering any active IAM with Trigger value birthday is true");
    window.plugins.OneSignal.addTrigger("birthday", "true");
}

function getIds() {
    window.plugins.OneSignal.getDeviceState(function(stateChanges) {
        alert('getDeviceState Received: ' + JSON.stringify(stateChanges));
        console.log('OneSignal getDeviceState: ' + JSON.stringify(stateChanges));
    });

    // window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
    //     document.getElementById("OneSignalUserId").innerHTML = "UserId: " + status.subscriptionStatus.userId;
    //     document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + status.subscriptionStatus.pushToken;
    //     console.log('Player ID: ' + status.subscriptionStatus.userId);
    //     alert('Player ID: ' + status.subscriptionStatus.userId + "\npushToken = " + status.subscriptionStatus.pushToken);
    // });
}

function sendTags() {
    window.plugins.OneSignal.sendTags({PhoneGapKey: "PhoneGapValue", key2: "value2"});
    alert("Tags Sent");
}

function getTags() {
    window.plugins.OneSignal.getTags(function(tags) {
        alert('Tags Received: ' + JSON.stringify(tags));
    });
}

function deleteTags() {
    window.plugins.OneSignal.deleteTags(["PhoneGapKey", "key2"]);
    alert("Tags deleted");
}

function promptLocation() {
    window.plugins.OneSignal.setLocationShared(true);
    window.plugins.OneSignal.promptLocation();
    window.plugins.OneSignal.isLocationShared(function(shared) {
        alert('isLocationShared: ' + JSON.stringify(shared));
    });
    // iOS - add CoreLocation.framework and add to plist: NSLocationUsageDescription and NSLocationWhenInUseUsageDescription
    // android - add one of the following Android Permissions:
    // <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    // <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    // Add under build.gradle dependencies
    // implementation 'com.google.android.gms:play-services-location:[17.0.0, 17.99.99]'
}

function postNotification() {
    window.plugins.OneSignal.getIds(function(ids) {
        var notificationObj = { contents: {en: "message body"},
        data: {"foo": "bar"},
                          include_player_ids: [ids.userId]};
        window.plugins.OneSignal.postNotification(notificationObj,
            function(successResponse) {
                console.log("Notification Post Success:", successResponse);
            },
            function (failedResponse) {
                console.log("Notification Post Failed: ", failedResponse);
                alert("Notification Post Failed:\n" + JSON.stringify(failedResponse, null, 2));
            }
        );
    });
}

function setEmail() {
    console.log("Setting email: " + document.getElementById("email").value);
    window.plugins.OneSignal.setEmail(document.getElementById("email").value, function() {
        console.log("Successfully set email");
    }, function(error) {
        alert("Encountered an error setting email: \n" + JSON.stringify(error, null, 2));
    });
}

function logoutEmail() {
    console.log("Logging out of email");
    window.plugins.OneSignal.logoutEmail(function(successResponse) {
        console.log("Successfully logged out of email");
    }, function(error) {
        alert("Failed to log out of email with error: \n" + JSON.stringify(error, null, 2));
    });
}

function setExternalId() {
   let externalId = document.getElementById("externalId").value;
   console.log("Setting external ID to " + externalId);

   window.plugins.OneSignal.setExternalUserId(externalId);
}

function removeExternalId() {
   console.log("Removing external ID");

   window.plugins.OneSignal.removeExternalUserId();
}

app.initialize();
