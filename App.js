import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Dashboard from "./screens/dashboard";
import Insights from "./screens/insights";
import History from "./screens/history";

const getFonts = () => Font.loadAsync({
  "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
  "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  "sf-pro-disp": require("./assets/fonts/SFProDisplay-Regular.ttf")
});

function Tabs() {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const Stack = createNativeStackNavigator();

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Insights" component={Insights} />
        </Stack.Navigator>
      </NavigationContainer>
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

export default App;