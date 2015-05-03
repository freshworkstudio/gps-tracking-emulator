GPS EMULATOR
====================

This [meteor](http://www.meteor.com) app let you emulate some gps tracking devices so you can test. 

DEMO HERE: [gps-tracking-emulator.meteor.com](http://gps-tracking-emulator.meteor.com/)

### Installation
Before you can run the app, you have to [install meteor](https://www.meteor.com/install).
``` bash
cd /yout/projects/folder
git clone https://github.com/freshworkstudio/gps-tracking-emulator
cd gps-tracking-emulator
meteor
```

And yep, that's all!

### Supported gps models
- TK103

##### How to add more?
Check the lib/adapters folder for an example. 
The Emulator object has an array containing the available adapters. You can call the addModel('gps-model',myNewAdapter) before you call init() to make your new adapter. Also you have to manually add the new adapter to the select box in device-form.html

#### Stay tuned - Contributions
We are adding support for multiple devices and protocols.
We highly appreciate your contributions to the project. 
Please, just throw me an email at gonzalo@freshworkstudio.com if you have questions/suggestions.