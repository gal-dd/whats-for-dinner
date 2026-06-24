# Whats For Dinner

A TypeScript Expo app using Expo Router. It currently contains a simple home screen and a ready-to-grow project structure.

## Requirements

- Node.js 20 or newer
- Expo Go on a physical device, or an Android/iOS simulator

## Setup

```bash
npm install
```

## Run

Start the Expo development server:

```bash
npx expo start
```

Then scan the QR code with Expo Go, or press `a` for Android, `i` for iOS, or `w` for web.

## Project structure

```text
app/          Expo Router routes and layouts
components/   Reusable UI components
data/         Static data and fixtures
services/     External integrations and persistence helpers
store/        Zustand state stores
types/        Shared TypeScript types
assets/       Images and other bundled assets
```

## Included libraries

- Expo Router
- React Native Gesture Handler
- React Native Reanimated
- Zustand
- AsyncStorage
- expo-haptics
