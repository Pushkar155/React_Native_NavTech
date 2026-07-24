import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../src/store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import { Toast } from "tamagui";
import { addOrder } from "@/src/store/orderSlice";
import { showMessage } from "react-native-flash-message";

export default function CartScreen() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const total = Math.floor(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F6F8FC] px-6">
        <Ionicons name="cart-outline" size={90} color="#C7CBD6" />

        <Text className="mt-5 text-2xl font-bold">Your Cart is Empty</Text>

        <Text className="mt-2 text-center text-gray-500">
          Looks like you haven't added anything yet.
        </Text>

        <Pressable
          onPress={() => router.replace("/home")}
          className="mt-8 rounded-full bg-[#6C4DFF] px-8 py-4"
        >
          <Text className="font-semibold text-white">Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  const handleCheckout = () => {
    if (items.length === 0) return;

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    dispatch(
      addOrder({
        id: Date.now().toString(),
        items,
        total,
        createdAt: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Pending",
      }),
    );

    dispatch(clearCart());

    showMessage({
      message: "Order Placed 🎉",
      description: `Your order has been placed successfully.`,
      type: "success",
      hideStatusBar: true,
    });

    // Toast("Order Placed 🎉", {
    //   description: "Your order has been placed successfully.",
    // });

    router.replace("/orders");
  };

  return (
    <View className="flex-1 bg-[#F6F8FC]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="mb-4 flex-row rounded-3xl bg-white p-3"
          >
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
                  width: 100,
                  height: 100,
                  borderRadius: 18,
                }}
              />
            </Pressable>

            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold" numberOfLines={1}>
                {item.name}
              </Text>

              <Text className="mt-2 text-xl font-bold text-[#6C4DFF]">
                ₹ {Math.floor(item.price * item.quantity)}
              </Text>

              <View className="mt-4 flex-row items-center justify-between">
                <View className="flex-row items-center rounded-xl bg-[#6C4DFF]">
                  <Pressable
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                    className="h-10 w-10 items-center justify-center"
                  >
                    <Ionicons name="remove" size={18} color="white" />
                  </Pressable>

                  <Text className="w-8 text-center font-bold text-white">
                    {item.quantity}
                  </Text>

                  <Pressable
                    onPress={() => dispatch(increaseQuantity(item.id))}
                    className="h-10 w-10 items-center justify-center"
                  >
                    <Ionicons name="add" size={18} color="white" />
                  </Pressable>
                </View>

                <Pressable onPress={() => dispatch(removeFromCart(item.id))}>
                  <Ionicons name="trash-outline" size={24} color="#EF4444" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="rounded-t-4xl bg-white p-6">
        <View className="flex-row justify-between">
          <Text className="text-lg text-gray-500">Total</Text>

          <Text className="text-2xl font-bold">₹ {total}</Text>
        </View>

        <Pressable
          onPress={handleCheckout}
          className="mt-6 rounded-2xl bg-[#6C4DFF] py-4 flex flex-row justify-center items-center gap-2"
        >
          <Ionicons name="card" color={"white"} size={22} />
          <Text className="text-center text-lg font-bold text-white">
            Proceed to Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
