import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TestFunc from "./TestFunc";

export default function TabBar() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TestFunc} />
      <Tab.Screen name="Settings" component={TestFunc} />
    </Tab.Navigator>
  );
}
