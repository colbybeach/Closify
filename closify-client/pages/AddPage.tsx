import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ClothingEditPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [location, setLocation] = useState("")
  const [clean, setClean] = useState("")
  const [image, setImage] = useState("")


  return (
    <View className="flex flex-col mx-5 my-5 gap-y-5">
        
        
        <TextInput value={""} placeholder="Name" onChangeText={(value) => {setName(value)}}/>
        <TextInput value={""} placeholder="Type" onChangeText={(value) => {setType(value)}}/>
        <TextInput value={""} placeholder="Location" onChangeText={(value) => {setLocation(value)}}/>
        <TextInput value={""} placeholder="Clean" onChangeText={(value) => {setClean(value)}}/>

        <Button mode={"outlined"}>Add Image</Button>
        
        <View className="flex flex-row items-center justify-around w-screen">
            <Button mode={"elevated"} onPress={() => {
              navigation.goBack()
            }}>Save New Item</Button>
            <Button mode={"elevated"} onPress={() => {navigation.goBack()}}>Cancel</Button>
        </View>

    </View>
  );
}
