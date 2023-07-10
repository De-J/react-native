import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"

// screens
import Dashboard from "../screens/dashboard"
import Insights from "../screens/insights"

const screens = {
  Dashboard: {
    screen: Dashboard
  },
  Insights: {
    screen: Insights
  }
}

const dashStack = createStackNavigator(screens);

export default createAppContainer(dashStack);