import { Modal, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface SelectOption {
  label: string;
  value: string;
}

interface CommonSelectProps {
  label?: string;
  value: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function CommonSelect({
  label,
  value,
  placeholder = "Select",
  options,
  onChange,
}: CommonSelectProps) {
  const [visible, setVisible] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      {label && <Text className="mb-2 font-semibold">{label}</Text>}

      <Pressable
        onPress={() => setVisible(true)}
        className="mb-4 flex-row items-center justify-between rounded-xl border border-gray-300 px-4 py-4"
      >
        <Text>{selected?.label ?? placeholder}</Text>

        <Ionicons name="chevron-down" size={18} />
      </Pressable>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          className="flex-1 justify-end bg-black/40"
          onPress={() => setVisible(false)}
        >
          <View className="rounded-t-3xl bg-white p-5">
            {options.map((item) => (
              <Pressable
                key={item.value}
                className="py-4"
                onPress={() => {
                  onChange(item.value);
                  setVisible(false);
                }}
              >
                <Text className="text-lg">{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
