import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from "../screens/dashboard"
import History from "../screens/history"

const screens = {
    Dashboard: {
        screen: Dashboard
    },
    History: {
        screen: History
    }
}

const Tab = createBottomTabNavigator();


