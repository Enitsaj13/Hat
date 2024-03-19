# HAT V2 React-Native Project

This project uses *expo fully-managed workflow*. This is to enable easy management of dependencies to avoid app vulnerabilities.

## Installation steps:

### For android:

1. Install **chocolatey** package manager in Windows/**Homebrew** for MacOS/Use built-in package manager of your linux distro.
2. Recommended: Install **Volta** node manager using the corresponding package manager of your OS.
3. Install an LTS version of **Node** using Volta. Refer to Volta documentation on how to do so. Tested against Node **v18**.
4. Install **Git**
5. Recommended: Install **SDKMan** using the corresponding package manager of your OS.
6. Install **JDK 17** using *SDKMan*. Refer to SDKMan documentation on how to install JDK 17. Any "flavor" of JDK will do (temurin, correto etc)
7. Download and install **Android Studio**. Follow the installation wizard and at least install the latest android SDK version
8. Optional: Create an AVD where to run this project. For laptops with lower specs, Opt to running it in an actual android device.
   * Recommended: Ensure that your machine has proper CPU that supports virtualization. Install **Google HAXM** for much better emulator performance!
9. Go to the project folder and execute `npm run prebuild`
10. Afterwards, execute `npm run android`

### For iOS:

1. As recommended above, install **Homebrew** in MacOS
2. Install the software specified above using _Homebrew_
3. Install **watchman** using Homebrew
4. Download **XCode** from Mac App store. Follow the promps to ensure you have a working setup including the simulators.
5. run `npm run prebuild` if you haven't done it yet
   * To run the app using your local personal account, ensure to delete the **Push notification capability** in *Signing and Capabilities tab*, since push notification requires an actual developer account
6. run `npm run ios`

### Additional setup:

1. Install **Snyk** in local to enable pushing to central git repo. Use the corresponding package manager of your OS. Follow the installation prompts for it to setup the correct API key.

## Production build:

This project uses **local EAS** to build the project. Details TODO
