import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "tamagui";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useAppSelector } from "../../src/hooks/redux";

export default function OrdersScreen() {
  const orders = useAppSelector((state) => state.orders.items);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F6F8FC] px-6">
        <Ionicons name="cube-outline" size={90} color="#C7CBD6" />

        <Text className="mt-5 text-2xl font-bold">No Orders Yet</Text>

        <Text className="mt-2 text-center text-gray-500">
          Your purchased shoes will appear here.
        </Text>

        <Pressable
          onPress={() => router.replace("/home")}
          className="mt-8 rounded-full bg-[#6C4DFF] px-8 py-4"
        >
          <Text className="font-semibold text-white">Start Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#F6F8FC]"
      contentContainerStyle={{
        paddingStart: 16,
        paddingBlock: 16,
        paddingEnd: 16,
        paddingBlockEnd: 16,
        // padding: 16,
        // paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {orders.map((order) => {
        const expanded = expandedOrder === order.id;

        return (
          <View key={order.id} className="mb-4 rounded-3xl bg-white p-5">
            <Pressable
              onPress={() => setExpandedOrder(expanded ? null : order.id)}
            >
              {/* Header */}

              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="text-lg font-bold">Order #{order.id}</Text>

                  <Text className="mt-1 text-gray-500">{order.createdAt}</Text>
                </View>

                <View
                  className={`rounded-full px-3 py-1 ${
                    order.status === "Delivered"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Summary */}

              <View className="mt-5 flex-row items-center justify-between">
                <View className="rounded-full bg-[#EEE8FF] px-4 py-2">
                  <Text className="font-semibold text-[#6C4DFF]">
                    {order.items.length} Shoes
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Text className="mr-3 text-xl font-bold">
                    ₹ {Math.floor(order.total)}
                  </Text>

                  <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={22}
                  />
                </View>
              </View>
            </Pressable>

            {/* Expanded Content */}

            {expanded && (
              <View className="mt-5 border-t border-gray-200 pt-4">
                {order.items.map((item) => (
                  <View key={item.id} className="mb-4 flex-row items-center">
                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: "/shoe/[id]",
                          params: {
                            id: item.id,
                          },
                        })
                      }
                    >
                      <Image
                        source={item.imageUrl}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 16,
                        }}
                        contentFit="cover"
                      />
                    </Pressable>

                    <View className="ml-4 flex-1">
                      <Text
                        className="text-base font-semibold"
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>

                      <Text className="mt-1 text-gray-500">
                        Quantity : {item.quantity}
                      </Text>

                      <Text className="mt-1 text-[#6C4DFF] font-semibold">
                        ₹ {item.price} each
                      </Text>
                    </View>

                    <Text className="font-bold">
                      ₹ {item.price * item.quantity}
                    </Text>
                  </View>
                ))}

                <View className="my-2 h-px bg-gray-200" />

                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold">Total</Text>

                  <Text className="text-xl font-bold text-[#6C4DFF]">
                    ₹ {Math.floor(order.total)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
