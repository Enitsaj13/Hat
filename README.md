# HAT V2 React-Native Project

This project uses *expo fully-managed workflow*. This is to enable easy management of dependencies to avoid app
vulnerabilities.

## Installation steps:

### For android:

1. Install **chocolatey** package manager in Windows/**Homebrew** for MacOS/Use built-in package manager of your linux
   distro.
2. Recommended: Install **Volta** node manager using the corresponding package manager of your OS.
3. Install an LTS version of **Node** using Volta. Refer to Volta documentation on how to do so. Tested against Node *
   *v18**.
4. Install **Git**
5. Recommended: Install **SDKMan** using the corresponding package manager of your OS.
6. Install **JDK 17** using *SDKMan*. Refer to SDKMan documentation on how to install JDK 17. Any "flavor" of JDK will
   do (temurin, correto etc)
7. Download and install **Android Studio**. Follow the installation wizard and at least install the latest android SDK
   version
8. Optional: Create an AVD where to run this project. For laptops with lower specs, Opt to running it in an actual
   android device.
   * Recommended: Ensure that your machine has proper CPU that supports virtualization. Install **Google HAXM** for
     much better emulator performance!
9. Go to the project folder and execute `npm run prebuild`
10. Afterwards, execute `npm run android`

### For iOS:

1. As recommended above, install **Homebrew** in MacOS
2. Install the software specified above using _Homebrew_
3. Install **watchman** using Homebrew
4. Download **XCode** from Mac App store. Follow the promps to ensure you have a working setup including the simulators.
5. run `npm run prebuild` if you haven't done it yet
   * To run the app using your local personal account, ensure to delete the **Push notification capability** in
     *Signing and Capabilities tab*, since push notification requires an actual developer account
6. run `npm run ios`

### Additional setup:

1. Install **Snyk** in local to enable pushing to central git repo. Use the corresponding package manager of your OS.
   Follow the installation prompts for it to setup the correct API key.

## Non-prod build:

This project uses **local EAS** to build the project.

### Pre-requisite

1. In _.env_ or _.env.qas_ file, change the url to the correct value. note that the `/api` should always be the suffix
2. Run `npm run prebuild:clean` to ensure that the expo configurations are reflected to the app

### Android build

1. Execute `npm run build:android:dev` / `npm run build:android:qas` command. This will generate an apk file in the root folder.
2. Use the generated APK file for internal testing.

### iOS build

1. Execute `npm run build:ios:dev` / `npm run build:ios:qas` command. It will ask you to login your apple account via CLI. follow the instructions in there. It will generate an IPA file in the root folder
2. If the CLI is complaining about the package name, change the app package to something different. Look for **ph.rocketspin.hat** in app.json and then change it to **ph.rocketspin.hat2**
3. Use the IPA file for internal testing using Testflight etc.

## Production build:

This project uses **local EAS** to build the project.

### Pre-requisite

1. In _.env.prod_ file, change the url to the correct value. note that the `/api` should always be the suffix
2. Change the app package to the correct value. Look for **ph.rocketspin.hat** in app.json and then change it
3. Increment the **buildNumber** for iOS and **versionCode** for android in app.json as well on every app store update
   of the app
4. Update both version fields in app.json and package.json to the intended version that will be publicly viewable in
   respective app stores of each platform
5. Run `npm run prebuild:clean` to ensure that the expo configurations are reflected to the app
6. Install the latest EAS CLI by running `npm install -g eas-cli`.
7. Log in to your Expo account by running the command `eas login`.
8. After logging in, go to the Projects tab and click the "+ Create a Project" button.
9. Enter 'Hat' as the display name, then click Create.
10. After the project is created, run the command that appears on the screen in the terminal: `eas init --id "example"`.

### Android build

1. If not yet done. [Generate a production keystore file](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key). You are free to ignore the other instructions in this page.
2. Create a copy of credentials.json file in the root folder of this project. There is a _credentials.json.example_ file
   that you can use.
3. Execute `npm run build:android:prod` command. This will generate an aab file in the root folder.
4. Upload this file to Google Playstore using Play Console website. Follow the instructions on the said website on how
   to do so.

### iOS build

1. Execute `npm run build:ios:prod` command. It will ask you to login your apple account via CLI. follow the
   instructions in there. It will generate an IPA file in the root folder
2. Upload the said IPA file to App store using App store connect. Follow the instructions on the said website on how to
   do so.

## Production build:

This project uses **local EAS** to build the project.

### Pre-requisite

1. In _env.prod_ file, change the url to the correct value. note that the `/api` should always be the suffix
2. Change the app package to the correct value. Look for **ph.rocketspin.hat** in app.json and then change it
3. Increment the **buildNumber** for iOS and **versionCode** for android in app.json as well on every app store update
   of the app
4. Update both version fields in app.json and package.json to the intended version that will be publicly viewable in
   respective app stores of each platform
5. Run `npm run prebuild:clean` to ensure that the expo configurations are reflected to the app
6. Install the latest EAS CLI by running `npm install -g eas-cli`.
7. Log in to your Expo account by running the command `eas login`.
8. After logging in, go to the Projects tab and click the "+ Create a Project" button.
9. Enter 'Hat' as the display name, then click Create.
10. After the project is created, run the command that appears on the screen in the terminal: `eas init --id "example"`.

### Android build

1. If not yet done. [Generate a production keystore file](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key). You are free to ignore the other instructions in this page.
2. Create a copy of credentials.json file in the root folder of this project. There is a _credentials.json.example_ file
   that you can use.
3. Execute `npm run build:android:prod` command. This will generate an aab file in the root folder.
4. Upload this file to Google Playstore using Play Console website. Follow the instructions on the said website on how
   to do so.

### iOS build

1. Execute `npm run build:ios:prod` command. It will ask you to login your apple account via CLI. follow the
   instructions in there. It will generate an IPA file in the root folder
2. Upload the said IPA file to App store using App store connect. Follow the instructions on the said website on how to
   do so.

## Production build:

This project uses **local EAS** to build the project.

### Pre-requisite

1. In _env.prod_ file, change the url to the correct value. note that the `/api` should always be the suffix
2. Change the app package to the correct value. Look for **ph.rocketspin.hat** in app.json and then change it
3. Increment the **buildNumber** for iOS and **versionCode** for android in app.json as well on every app store update
   of the app
4. Update both version fields in app.json and package.json to the intended version that will be publicly viewable in
   respective app stores of each platform
5. Run `npm run prebuild:clean` to ensure that the expo configurations are reflected to the app

### Android build

1. If not yet done. [Generate a production keystore file](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key). You are free to ignore the other instructions in this page.
2. Create a copy of credentials.json file in the root folder of this project. There is a _credentials.json.example_ file
   that you can use.
3. Execute `npm run build:android:prod` command. This will generate an aab file in the root folder.
4. Upload this file to Google Playstore using Play Console website. Follow the instructions on the said website on how
   to do so.

### iOS build

1. Execute `npm run build:ios:prod` command. It will ask you to login your apple account via CLI. follow the
   instructions in there. It will generate an IPA file in the root folder
2. Upload the said IPA file to App store using App store connect. Follow the instructions on the said website on how to
   do so.

