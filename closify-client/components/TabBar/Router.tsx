import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../../pages/HomePage";
import AddPage from "../../pages/AddPage";
import SettingsPage from "../../pages/SettingsPage";
import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { StatusBar, StyleSheet } from "react-native";

export default function Router() {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'home', title: 'Home', focusedIcon: 'home'},
      { key: 'settings', title: 'Settings', focusedIcon: 'account-settings' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      home: HomePage,
      settings: SettingsPage,

    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.container}
      />
    );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop:StatusBar.currentHeight
  },
})