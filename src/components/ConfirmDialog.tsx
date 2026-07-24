import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#EF4444",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 items-center justify-center  px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <View className="w-full max-w-sm rounded-3xl bg-white p-6">
          <View className="mb-5 self-center rounded-full bg-red-100 p-4">
            <Ionicons name="trash-outline" size={30} color="#EF4444" />
          </View>

          <Text className="text-center text-2xl font-bold">{title}</Text>

          <Text className="mt-3 text-center leading-6 text-gray-500"></Text>

          <View className="mt-8 flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 rounded-2xl bg-gray-100 py-4"
            >
              <Text className="text-center font-semibold">{cancelText}</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              onPress={onConfirm}
              style={{ backgroundColor: confirmColor }}
              className="flex-1 rounded-2xl py-4"
            >
              <Text className="text-center font-semibold text-white">
                {loading ? "Please wait..." : confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
