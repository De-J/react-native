import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { HistoryProvider } from "./contexts/historyContext";
import { VideoProvider } from "./contexts/videoContext";
import Dashboard from "./screens/dashboard";
import Insights from "./screens/insights";
import History from "./screens/history";

const getFonts = () => Font.loadAsync({
  "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
  "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  "sf-pro-disp": require("./assets/fonts/SFProDisplay-Regular.ttf")
});

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <HistoryProvider>
        <VideoProvider>
          <NavigationContainer>
            <Layout />
          </NavigationContainer>
        </VideoProvider>
      </HistoryProvider>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn} />
    )
  }
}

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Insights" component={Insights} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  )
}

function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

export default App;