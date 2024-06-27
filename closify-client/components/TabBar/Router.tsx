import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../../pages/HomePage";
import AddPage from "../../pages/AddPage";
import SettingsPage from "../../pages/SettingsPage";

export default function Router() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>       
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
