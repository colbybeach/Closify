import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../../pages/HomePage";
import SettingsPage from "../../pages/SettingsPage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPage from "../../pages/AddPage";
import ClothingEditPage from "../../pages/ClothingEditPage";


export default function Router() {
  const Tab = createBottomTabNavigator();

  const HomeStack = createNativeStackNavigator();


  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomePage} />
        <HomeStack.Screen name="Edit" component={ClothingEditPage} />
        <HomeStack.Screen name="Add" component={AddPage} />
      </HomeStack.Navigator>
    );
  }
 
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>       
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
