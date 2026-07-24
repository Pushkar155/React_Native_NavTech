import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Card } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../store/cartSlice";
import { useAppDispatch } from "../hooks/redux";
import { CartItem } from "../types/cart";

const CARD_WIDTH = (Dimensions.get("window").width - 48) / 2;

type ShoeCardProps = {
  shoe: {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity?: number;
  };
  cartItem?: CartItem;
};

export function ShoeCard({ shoe, cartItem }: ShoeCardProps) {
  const dispatch = useAppDispatch();
  // const inCart = getCartItem (shoe.id);
  return (
    <Card
      className="overflow-hidden rounded-2xl bg-white"
      style={{
        width: CARD_WIDTH,
      }}
      // pressStyle={{ scale: 0.97 }}
      // elevate
      // bordered
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/shoe/[id]",
            params: {
              id: shoe.id,
            },
          })
        }
      >
        <View className="relative">
          <Image
            source={shoe.imageUrl}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 16,
            }}
            contentFit="cover"
            // className="rounded-2xl"
          />

          {/* <View className="absolute right-3 top-3 rounded-full bg-white p-2">
          <Ionicons name="heart-outline" size={18} color="#111827" />
        </View> */}
        </View>
      </Pressable>

      <View className="p-3">
        <Text
          className="text-base font-semibold text-gray-900"
          numberOfLines={1}
        >
          {shoe.name}
        </Text>

        {/* <Text className="mt-1 text-sm text-gray-500" numberOfLines={1}>
          {shoe.brand}
        </Text> */}
        <Text className="mt-2 text-xs text-gray-500">
          ⭐ 4.8 (425) • 600 reviews
        </Text>

        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-[#6C4DFF]">
            ₹ {shoe.price}
          </Text>

          {/* <Pressable
            onPress={() =>
              router.push({
                pathname: "/shoe/[id]",
                params: {
                  id: shoe.id,
                },
              })
            }
          >
            <View className="rounded-md bg-[#6C4DFF] px-4 py-2">
              <Text className=" text-white text-base font-semibold">Cart</Text>
            </View>
          </Pressable> */}

          {cartItem ? (
            <View className="flex-row items-center rounded-lg bg-[#6C4DFF]">
              <Pressable
                onPress={() => dispatch(decreaseQuantity(shoe.id))}
                className="h-8 w-8 items-center justify-center"
              >
                <Ionicons name="remove" size={14} color="white" />
              </Pressable>

              <Text className="w-8 text-sm text-center font-bold text-white">
                {cartItem.quantity}
              </Text>

              <Pressable
                onPress={() => dispatch(increaseQuantity(shoe.id))}
                className="h-8 w-8 items-center justify-center"
                disabled={(shoe.quantity ?? 0) <= cartItem.quantity}
              >
                <Ionicons name="add" size={14} color="white" />
              </Pressable>
            </View>
          ) : shoe.quantity && shoe.quantity > 0 ? (
            <Pressable onPress={() => dispatch(addToCart(shoe))}>
              <View className="rounded-md bg-[#6C4DFF] px-4 py-2">
                <Text className="font-semibold text-sm text-white">Add</Text>
              </View>
            </Pressable>
          ) : (
            <Text className="text-red-600 text-xs font-bold px-4 py-2 bg-red-100 rounded-full">
              Out Of Stock
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}
