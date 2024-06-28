import { View, Text, Image } from "react-native";
import Pill from "./Pill";

interface ClothingCardProps {
  name: string;
  location: string;
  clean: boolean;
  type: string;
  image: string;
}

export default function ClothingCard({
  name,
  location,
  clean,
  type,
  image,
}: ClothingCardProps) {
  function capitalizeFirstLetter(string: string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }

  function convertType(type: string) {
    return capitalizeFirstLetter(type.replace("-", " "));
  }

  return (
    <View
      className={
        "flex flex-col gap-y-2 items-center text-white bg-white rounded-xl shadow-lg w-52 h-52 shadow-xl "
      }
    >
    <Image source={{ uri: image }} className="w-52 h-24 rounded-t-xl" />
      <Text className="text-lg font-bold text-blue-500">{name}</Text>
      <Text>{convertType(type)}</Text>

      <View className="flex flex-row justify-around w-40">
        <Pill text={clean ? "Clean" : "Dirty"} color={clean ? "blue" : "red"} />
        <Pill text={location} color={location == "Moms" ? "blue" : "green"} />
      </View>
    </View>
  );
}
