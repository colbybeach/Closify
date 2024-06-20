import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import { getClothing } from '../api';
import { ClothingItem } from '../types';

export default function TestFunc() {
  const {data: clothingData} =useQuery({
    queryKey: ["clothingQuery"],
    queryFn: getClothing
  });

  console.log(clothingData)


  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {clothingData?.map((item: ClothingItem, index: number) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{item.name}</Text>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{item.type}</Text>
            <Text style={styles.label}>Image:</Text>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.image,
              }}
            />            
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{item.location}</Text>
            <Text style={styles.label}>Clean:</Text>
            <Text style={styles.value}>{item.clean ? "Yes" : "No"}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginBottom: 5,
  },
});
