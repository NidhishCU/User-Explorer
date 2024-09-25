/**
 * The app navigator (formerly "AppNavigator") is used for the primary
 * navigation flows of your app.
 */

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import Users from "app/screens/Users"
import Posts from "app/screens/Posts"
import { Image } from "react-native"

// Define the type for your navigation routes
export type AppStackParamList = {
  Users: undefined
  Posts: { userId: number } // Assuming you'll pass a userId to fetch posts for a particular user
}

function Header(){
  return(<Image
    source={require('../../assets/images/Header.png')}
    style={{width:150,height:40,justifyContent:'center'}}
    />)
}

// Create the stack navigator
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle:{
        backgroundColor:'black'
      },
      headerTintColor:'#fff',
    }} // Header of the app
      initialRouteName="Users" // Start from Users screen
      
    >
      <Stack.Screen name="Users" component={Users} options={{headerTitle:(props)=><Header/>}} />
      <Stack.Screen name="Posts" component={Posts} options={{headerTitle:(props)=><Header/>}} />
    </Stack.Navigator>
  )
})

export const AppNavigator = observer(function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
})
