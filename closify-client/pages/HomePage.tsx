import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { getClothing } from '../api';
import { ClothingItem } from '../types';
import { Button, Card, Text } from 'react-native-paper';

export default function HomePage() {
  const {data: clothingData} =useQuery({
    queryKey: ["clothingQuery"],
    queryFn: getClothing
  });

  console.log(clothingData)


  return (
    <ScrollView>
      <View >
        <StatusBar style="auto" />
        {clothingData?.map((item: ClothingItem, index: number) => (

            <Card style={styles.container}>
                <Card.Title title={item.name} subtitle={item.type}/>
                <Card.Content>
                    <Text variant="bodyMedium">
                        {item.location} 
                    </Text>
                    <Text variant='bodyMedium'>
                        {item.clean ? "Clean" : "Dirty"}
                    </Text>
                </Card.Content>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
                </Card.Actions>


            </Card>
           
                    ))}

        
        
      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20
}
});
