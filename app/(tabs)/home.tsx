import { FlatList, Pressable } from "react-native";
import { Link } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

import { ShoeCard } from "../../src/components/ShoeCard";
// import { HomeHeader } from "../../src/components/HomeHeader";
import { useAppSelector } from "../../src/hooks/redux";
import { Dimensions, Text, View } from "react-native";
// import { Text, View } from "tamagui";
import { Image } from "expo-image";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get("window").width;
const banners = [
  {
    id: "2",
    title: "Nike Air",
    subtitle: "New arrivals just landed",
    image:
      "https://i.pinimg.com/736x/1b/44/2c/1b442c9dcc3b22b36141f438155bf8f1.jpg",
    textShow: false,
  },
  {
    id: "3",
    title: "Running Shoes",
    subtitle: "Built for everyday comfort",
    image:
      "https://i.pinimg.com/736x/e1/8b/1e/e18b1e45c01138387a3bd4e4ef840f47.jpg",
    textShow: false,
  },
  {
    id: "1",
    title: "Summer Collection",
    subtitle: "Up to 50% OFF",
    image:
      "https://i.pinimg.com/1200x/62/69/c7/6269c7e571ea668deedcea5343ef4c18.jpg",
    textShow: false,
  },
  {
    id: "4",
    title: "Running Shoes",
    subtitle: "Built for everyday comfort",
    image:
      "https://i.pinimg.com/1200x/da/00/f6/da00f60bc1fa85b60e5d1f5edb5869bb.jpg",
    textShow: false,
  },
];

function HomeHeader() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View className="mb-6">
      <Carousel
        loop
        autoPlay
        width={width - 32}
        height={200}
        autoPlayInterval={3500}
        scrollAnimationDuration={800}
        onSnapToItem={setActiveIndex}
        data={banners}
        renderItem={({ item }) => (
          <View className="overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 200,
              }}
              contentFit="cover"
              transition={300}
            />

            {/* Gradient */}
            {item?.textShow && (
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  justifyContent: "flex-end",
                  padding: 24,
                }}
              >
                {/* Tag */}

                <Text className="text-[34px] font-black leading-9 text-white">
                  {item.title}
                </Text>

                <Text className="mt-2 text-base text-gray-200">
                  {item.subtitle}
                </Text>

                <Pressable className="mt-6 self-start rounded-full bg-white/90 px-6 py-3">
                  <Text className="font-bold text-black">Shop Now →</Text>
                </Pressable>
              </LinearGradient>
            )}
          </View>
        )}
      />
      <View className="mt-4 flex-row justify-center">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`mx-1 h-2 rounded-full ${
              activeIndex === index ? "w-2 bg-black" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
export default function HomeScreen() {
  const shoes = useAppSelector((state) => state.shoes.items);
  const cart = useAppSelector((state) => state.cart.items);

  const getCartItem = (id: string) => {
    return cart.find((item) => item.id === id);
  };

  return (
    <FlatList
      data={shoes}
      numColumns={2}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 10,
      }}
      ListHeaderComponent={<HomeHeader />}
      renderItem={({ item }) => (
        // <Link
        //   href={{
        //     pathname: "/shoe/[id]",
        //     params: { id: item.id },
        //   }}
        //   asChild
        // >
        //   <Pressable>
        //     <ShoeCard shoe={item} />
        //   </Pressable>
        // </Link>
        <ShoeCard shoe={item} cartItem={getCartItem(item.id)} />
      )}
      // ListEmptyComponent={<EmptyShoes />}
      showsVerticalScrollIndicator={false}
    />
  );
}
