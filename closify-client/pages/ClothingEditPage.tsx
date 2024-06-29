import { Image, Pressable, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ClothingEditPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { name, location, clean, type, image } = route.params;
  return (
    <View className="flex flex-col mx-5 my-5 gap-y-5">
        
        <Pressable className="w-full h-1/3" onPress={() => {
            console.log("Hello!")
        }}>
        <Image source={{uri: image}} className="w-full h-full"/>
        </Pressable>
        <TextInput value={name} />
        <TextInput value={location} />
        <TextInput value={clean ? "Clean" : "Dirty"} />
        <TextInput value={type} />
        
        <View className="flex flex-row items-center justify-around w-screen">
        <Button mode={"elevated"} onPress={() => {
              navigation.goBack()
            }}>Save Item</Button>
            <Button mode={"elevated"} onPress={() => {navigation.goBack()}}>Cancel</Button>
        </View>

    </View>
  );
}
