import React from "react";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { getClothing } from "../api";
import { ClothingItem } from "../types";
import { Button, Card, FAB, Searchbar, Text } from "react-native-paper";
import ClothingCard from "../components/ClothingCard";

export default function HomePage() {
  const { data: clothingData } = useQuery({
    queryKey: ["clothingQuery"],
    queryFn: getClothing,
  });

  return (
    <View>
      <ScrollView>
        <View className="mt-5">
          <Searchbar placeholder="Search" onChangeText={() => {}} value="" />
        </View>
        <View className="flex flex-row flex-wrap justify-around items-center gap-y-5 h-screen">
          {clothingData?.map((item: ClothingItem, index: number) => (
            <ClothingCard
              name={item.name}
              location={item.location}
              type={item.type}
              image={item.image}
              clean={item.clean}
            />
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
