import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as SplashScreen from 'expo-splash-screen' // Splash screen control
import { AppNavigator } from "./navigators" // Import your navigator that includes Users screen
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary" // For catching app errors
import Config from "./config" // App config

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

function App() {
  const [appReady, setAppReady] = useState(false) // State to track app readiness

  // useEffect to hide the splash screen after 1 second and show the main app
  useEffect(() => {
    const prepareApp = async () => {
      // Simulate some startup tasks (like loading data)
      await new Promise(resolve => setTimeout(resolve, 1000)) // 1-second delay

      // Once the app is ready, hide the splash screen
      await SplashScreen.hideAsync()

      // Mark the app as ready
      setAppReady(true)
    }

    prepareApp() // Call the async function
  }, [])

  if (!appReady) {
    // While the app is not ready, show nothing (since the splash screen is shown)
    return null
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        {/* Load the main app navigator which has the Users component */}
        <AppNavigator />
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
