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
# Run React components
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
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=x64 --prune=true --out=release-builds
```
