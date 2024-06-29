import { Text } from "react-native";

interface PillProps {
  text: string;
  color: string;
}

export default function Pill({ text, color }: PillProps) {
  return (
    <Text className={`bg-${color} p-1 color-white rounded-xl `}>
      {text}
    </Text>
  );
}
