import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { getClothing } from "../api";
import { ClothingItem } from "../types";
import { Button, Card, FAB, Searchbar, Text } from "react-native-paper";
import ClothingCard from "../components/ClothingCard";
import {
  NavigationAction,
  NavigationState,
  useNavigation,
} from "@react-navigation/native";

export default function HomePage({ navigation }: { navigation: any }) {
  const { data: clothingData } = useQuery({
    queryKey: ["clothingQuery"],
    queryFn: getClothing,
  });

  const [searchField, setSearchValue] = useState("");

  const filteredClothingData = clothingData?.filter((item: ClothingItem) =>
    item.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <View>
      <ScrollView>
        <View className="my-5 mx-5">
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => {
              setSearchValue(text);
            }}
            value={searchField}
          />
        </View>
        <View className="flex flex-row flex-wrap w-screen items-center justify-around h-screen gap-y-5">
          {filteredClothingData?.map((item: ClothingItem, index: number) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Edit", {
                  name: item.name,
                  location: item.location,
                  type: item.type,
                  image: item.image,
                  clean: item.clean,
                });
              }}
            >
              <ClothingCard
                key={index}
                name={item.name}
                location={item.location}
                type={item.type}
                image={item.image}
                clean={item.clean}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("Add")
        }}
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
