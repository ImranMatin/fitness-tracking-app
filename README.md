# 🏋️‍♂️ Fitness Tracker App (Android Optimized)

A modern, cross-platform fitness tracking solution featuring a Next.js web dashboard and a React Native mobile application. This project is specifically designed with an **Android-first approach**, utilizing Material Design principles and optimized performance for Android devices.

## 🏗️ System Architecture

Below is the serverless flow of the application:

```mermaid
graph TD
    A[Web & Android App] -->|HTTPS Requests| B[Serverless API / Functions]
    B -->|Auth| C{Auth Provider}
    B -->|Read/Write| D[(Database)]
    C -->|Verified| B

---

## ✨ Features

* **Secure Authentication**: Full Sign-up and Sign-in flow for personalized data.
* **Workout Logging**: A specialized green-themed form (`#16A085`) to log exercises, sets, and reps easily.
* **Progress History**: View and manage your complete workout history in a clean, scrollable list.
* **Android-Specific UI**: 
    * **Material Design**: Uses Android-style cards and elevation.
    * **Typography**: Font rendering optimized for Android system scales.
    * **Native Feel**: Uses native elevation for shadows rather than CSS-only shadows.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Web Frontend** | React / Next.js |
| **Mobile App** | React Native / Expo |
| **Styling** | Material Design / Tailwind CSS (Web) |
| **Backend/API** | Node.js / [Insert DB here, e.g., Supabase/Prisma] |
| **Design** | Android Primary Green (`#16A085`) |

---

## 📂 Project Structure

```text
├── apps/
│   ├── web/                # Next.js web application
│   └── mobile/             # React Native (Expo) Android application
├── components/             # Shared UI components (Material Design)
├── lib/                    # Shared logic, API helpers, and types
├── .env.example            # Template for environment variables
└── package.json            # Project dependencies

```
---

## ⚙️ Environment Variables

To run this project, you will need to add the following variables to your .env file in the root or respective app folders:

```
| Variable,             |     Description                             | Default/Example                        |
| NEXT_PUBLIC_API_URL   |     API endpoint for the Web app            | http://localhost:3000                  |
| EXPO_PUBLIC_API_URL   |     API endpoint for Mobile (use Local IP)  | http://192.168.1.X:3000                |
| DATABASE_URL          |     Connection string for your database     | postgresql:////user:pass@host...       |
```
---

## 🏃 Getting Started
```
1. Prerequisites
Install Node.js

Install the Expo Go app on your Android device from the Play Store.

2. Run the Web App
Bash

# Navigate to the web directory
cd apps/web

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:3000 to view the dashboard.

3. Run the Mobile App (Android)
Bash

# Navigate to the mobile directory
cd apps/mobile

# Start Expo
npx expo start
Scan the QR code in your terminal using the Expo Go app.

Ensure your Android device and PC are on the same Wi-Fi network.
```
---

## 📱 Android Optimizations

This app avoids generic cross-platform styling in favor of a native Android look:

Elevation: Uses the elevation prop for Android to create depth.

Ripple Effects: Material Design touch feedback on buttons.

Typography: Optimized for Roboto and standard Android font weights.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

---

## 🤝 Troubleshooting

If the mobile app won't load:

Check that your EXPO_PUBLIC_API_URL uses your computer's IP address.

Ensure your firewall isn't blocking port 8081 or 3000.

If you see a "Network Request Failed," verify the server is running on your PC.


---

