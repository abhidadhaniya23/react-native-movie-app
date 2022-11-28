import "expo-dev-client";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";

// import screens
import GetStarted from "./screens/GetStarted";
import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import SearchMovies from "./screens/SearchMovies";
import UserContext from "./context/UserContext";
import { useState } from "react";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000f1f",
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000f1f" />
      <UserContext.Provider value={{ user, setUser }}>
        <NativeBaseProvider>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forRevealFromBottomAndroid,
              }}
              initialRouteName="GetStarted"
            >
              <Stack.Screen name="GetStarted" component={GetStarted} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="MovieDetails" component={MovieDetails} />
              <Stack.Screen name="SearchMovies" component={SearchMovies} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </UserContext.Provider>
    </>
  );
}
