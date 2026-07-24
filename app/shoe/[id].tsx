import { router, Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../src/store/cartSlice";
import { formatCurrency } from "../../src/utils/currency";
import { showMessage } from "react-native-flash-message";

export default function ShoeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const shoe = useAppSelector((state) =>
    state.shoes.items.find((item) => item.id === id),
  );

  const cart = useAppSelector((state) => state.cart.items);

  // const getCartItem = (id: string) => {
  //   return cart.find((item) => item.id === id);
  // };

  const cartItem = useMemo(() => {
    return cart.find((item) => item.id === id);
  }, [cart, id]);

  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState(41);

  if (!shoe) return <Text>Shoe not found.</Text>;

  const sizes = [36, 37, 38, 39, 40, 41, 42];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}

        <View className="relative">
          <Image
            source={shoe.imageUrl}
            style={{
              width: "100%",
              height: 360,
            }}
            contentFit="cover"
          />

          <Pressable
            onPress={() => router.push("/home")}
            className="absolute left-4 top-4 h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name="chevron-back" size={22} />
          </Pressable>

          {/* <Pressable className="absolute right-5 top-14 h-11 w-11 items-center justify-center rounded-full bg-white">
            <Ionicons name="ellipsis-horizontal" size={20} />
          </Pressable> */}
        </View>

        {/* DETAILS */}

        <View className="-mt-6 rounded-t-[30px] bg-white px-5 pt-5 pb-8">
          {/* Gallery */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Image
                key={item}
                source={shoe.imageUrl}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 12,
                  marginRight: 10,
                }}
              />
            ))}
          </ScrollView>

          {/* Name */}

          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold">{shoe.name}</Text>

              <Text className="mt-2 text-gray-500">
                ⭐ 4.8 (425) • 600 reviews
              </Text>
            </View>

            {/* <Ionicons name="heart" color="#6C4DFF" size={26} /> */}
          </View>

          {/* Price */}

          <View className="mt-5 flex-row items-center">
            <Text className="text-4xl font-bold">₹ {shoe.price}</Text>

            <Text className="ml-3 text-lg text-gray-400 line-through">
              ₹ {shoe.price + 100}
            </Text>
          </View>

          {/* Sizes */}

          <View className="mt-7 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Select Size</Text>

            <Text className="text-[#6C4DFF]">Size</Text>
          </View>

          <View className="mt-4 flex-row justify-between">
            {sizes.map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`h-12 w-12 items-center justify-center rounded-xl border ${
                  selectedSize === size
                    ? "border-[#6C4DFF] bg-[#6C4DFF]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Text
                  className={
                    selectedSize === size
                      ? "font-semibold text-white"
                      : "text-gray-700"
                  }
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Buttons */}

          <View className="mt-8 flex-row justify-between">
            {cartItem ? (
              <View className=" w-full mt-0 flex-row items-center justify-between gap-3">
                {/* Added to Cart Badge */}
                <View className="flex-1 flex-row items-center justify-center rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                  <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <Ionicons name="checkmark" size={18} color="white" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-md font-semibold text-green-800">
                      Added to Cart
                    </Text>
                  </View>
                </View>

                {/* Quantity Selector */}
                <View className="flex-row items-center rounded-2xl bg-[#6C4DFF] px-1">
                  <Pressable
                    onPress={() => dispatch(decreaseQuantity(shoe.id))}
                    className="h-14 w-12 items-center justify-center"
                  >
                    <Ionicons name="remove" size={22} color="white" />
                  </Pressable>

                  <Text className="min-w-9 text-center text-lg font-bold text-white">
                    {cartItem.quantity}
                  </Text>

                  <Pressable
                    onPress={() => dispatch(increaseQuantity(shoe.id))}
                    className="h-14 w-12 items-center justify-center"
                  >
                    <Ionicons name="add" size={22} color="white" />
                  </Pressable>
                </View>
              </View>
            ) : shoe?.quantity && shoe.quantity > 0 ? (
              <Pressable
                onPress={() => {
                  dispatch(addToCart(shoe));

                  showMessage({
                    message: "Product Added",
                    description: `${shoe.name} added successfully`,
                    type: "success",
                    hideStatusBar: true,
                  });
                }}
                className="mx-3 flex-1 h-14 w-14 flex-row items-center justify-center rounded-2xl bg-[#6C4DFF]"
              >
                <Ionicons name="cart-outline" size={22} color={"white"} />

                <Text className="ml-2 text-base text-white font-semibold">
                  Add to Cart
                </Text>
              </Pressable>
            ) : (
              <View className="w-full flex-row items-center justify-center rounded-2xl bg-red-100 py-4">
                <Ionicons name="alert-circle" size={20} color="#DC2626" />

                <Text className="ml-2 text-lg font-bold text-red-600">
                  Out of Stock
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
