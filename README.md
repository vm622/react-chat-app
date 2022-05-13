# React Chat App
MERN messenger with rooms

### Install dependencies

```
# Backend dependencies
cd server
npm install
```

```
# Frontend Web dependencies
cd web-client
npm install
```

```
# Frontend Desktop dependencies
cd desktop-client
npm install
```

```
# Frontend Mobile dependencies
cd mobile-client
npm install
```

### Run Server

```
cd server
node server.js
```

### Run Web Client

```
cd web-client
npm start
```

### Run Desktop Client

```
# Run Application server
cd desktop-client
npm start
```

```
# Run Electron desktop app
cd desktop-client
npm run electron
```

```
# Build Electron desktop app for Windows x64
npm install -g electron-packager
cd desktop-client
electron-packager . electron-chat-app --overwrite --asar=true --platform=win32 --arch=x64 --prune=true --out=release-builds
```

### Run Mobile Client

```
# Run Application server
cd mobile-client
npm start
```

```
# Build Android app
cd desktop-client
npm install -g @ionic/cli
npm install -g @capacitor/cli
npm run build
ionic cap add android
cd android
Create file local.properties with Android SDK path (file content: sdk.dir=/home/"username"/Android/Sdk)
./gradlew assembleDebug
APK installation file is available at /mobile-client/android/app/build/outputs/apk/debug/
```
