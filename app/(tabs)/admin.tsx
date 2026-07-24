import { useState } from "react";
import { Alert, Pressable, Text, View, ScrollView } from "react-native";
// import { ScrollView } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import { deleteShoe, updateShoe, addShoe } from "../../src/store/shoeSlice";
import { updateOrderStatus } from "../../src/store/orderSlice";
import { Shoe } from "@/src/types/shoe";
import ConfirmDialog from "@/src/components/ConfirmDialog";
import AddOrEditProductModal from "../../src/components/admin/modals/AddOrEditProductModal";

export default function AdminScreen() {
  const dispatch = useAppDispatch();

  const shoes = useAppSelector((state) => state.shoes.items);
  const orders = useAppSelector((state) => state.orders.items);

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const inventoryCount = shoes.length;
  const orderCount = orders.length;

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  return (
    <>
      <ScrollView
        className="flex-1 bg-[#F6F8FC]"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <Text className="text-3xl font-bold">Admin Dashboard</Text>

        <Text className="mt-1 text-gray-500">Manage products and orders</Text>

        {/* Dashboard */}

        <View className="mt-6 flex-row gap-4">
          <View className="flex-1 rounded-3xl bg-white p-5">
            <Ionicons name="cube" color="#6C4DFF" size={28} />

            <Text className="mt-3 text-3xl font-bold">{inventoryCount}</Text>

            <Text className="text-gray-500">Products</Text>
          </View>

          <View className="flex-1 rounded-3xl bg-white p-5">
            <Ionicons name="receipt" color="#22C55E" size={28} />

            <Text className="mt-3 text-3xl font-bold">{orderCount}</Text>

            <Text className="text-gray-500">Orders</Text>
          </View>
        </View>

        {/* Products */}

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Products</Text>

          <Pressable
            onPress={() => {
              setEditingProduct(null);
              setOpen(true);
            }}
            className="rounded-full bg-[#6C4DFF] px-5 py-3"
          >
            <Text className="font-semibold text-white">+ Add Product</Text>
          </Pressable>
        </View>

        {/* Product List */}

        {shoes.map((shoe) => (
          <View
            key={shoe.id}
            className="mt-4 flex-row rounded-3xl bg-white p-4"
          >
            <Image
              source={shoe.imageUrl}
              style={{
                width: 90,
                height: 90,
                borderRadius: 18,
              }}
            />

            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold" numberOfLines={1}>
                {shoe.name}
              </Text>

              <Text className="mt-1 text-[#6C4DFF] font-bold">
                ₹ {shoe.price}
              </Text>

              <Text className="mt-1 text-gray-500">
                Quantity : {shoe.quantity}
              </Text>

              <View className="mt-2 flex-row items-center">
                <View
                  className={`rounded-full px-3 py-1 ₹ ${
                    shoe.inStock ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <Text
                    className={shoe.inStock ? "text-green-700" : "text-red-700"}
                  >
                    {shoe.inStock ? "In Stock" : "Out of Stock"}
                  </Text>
                </View>
              </View>
            </View>

            <View className="justify-between">
              <Pressable
                onPress={() => {
                  setEditingProduct(shoe);
                  setOpen(true);
                }}
              >
                <Ionicons name="create-outline" size={24} />
              </Pressable>

              <Pressable onPress={() => handleDelete(shoe.id)}>
                <Ionicons name="trash-outline" color="#EF4444" size={24} />
              </Pressable>
            </View>
          </View>
        ))}

        {/* Orders */}

        <Text className="mt-10 text-2xl font-bold">Orders</Text>

        {orders.map((order) => {
          const expanded = expandedOrder === order.id;

          return (
            <View key={order.id} className="mt-4 rounded-3xl bg-white p-5">
              <Pressable
                onPress={() => setExpandedOrder(expanded ? null : order.id)}
              >
                {/* Header */}

                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-lg font-bold">Order #{order.id}</Text>

                    <Text className="mt-1 text-gray-500">
                      {order.createdAt}
                    </Text>
                  </View>

                  <View
                    className={`rounded-full flex justify-center items-center py-1 px-6 ${
                      order.status === "Delivered"
                        ? "bg-green-100 "
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
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}
                      Items
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

              {/* Expanded */}

              {expanded && (
                <View className="mt-5 border-t border-gray-200 pt-4">
                  {order.items.map((item) => (
                    <View key={item.id} className="mb-4 flex-row items-center">
                      <Image
                        source={item.imageUrl}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                        }}
                        contentFit="cover"
                      />

                      <View className="ml-4 flex-1">
                        <Text
                          numberOfLines={1}
                          className="text-base font-semibold"
                        >
                          {item.name}
                        </Text>

                        <Text className="mt-1 text-gray-500">
                          Qty: {item.quantity}
                        </Text>

                        <Text className="mt-1 font-medium text-[#6C4DFF]">
                          ₹ {item.price} each
                        </Text>
                      </View>

                      <Text className="font-bold">
                        ₹ {item.price * item.quantity}
                      </Text>
                    </View>
                  ))}

                  <View className="my-4 h-px bg-gray-200" />

                  {/* Status Buttons */}

                  <View className="flex-row gap-3">
                    <Pressable
                      onPress={() =>
                        dispatch(
                          updateOrderStatus({
                            id: order.id,
                            status: "Pending",
                          }),
                        )
                      }
                      className={`flex-1 rounded-xl py-3  ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-center font-semibold ${
                          order.status === "Pending"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        <Ionicons name="timer" size={18} /> Pending
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        dispatch(
                          updateOrderStatus({
                            id: order.id,
                            status: "Delivered",
                          }),
                        )
                      }
                      className={`flex-1 rounded-xl py-3 ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-center flex justify-center items-center font-semibold ${
                          order.status === "Delivered"
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        <Ionicons name="checkmark-circle" size={18} /> Delivered
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <AddOrEditProductModal
        open={open}
        onOpenChange={setOpen}
        editingProduct={editingProduct}
        onSave={(product) => {
          const shoe: Shoe = {
            id: product.id ?? Date.now().toString(),
            name: product.name,
            brand: product.brand,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: product.quantity,
            inStock: product.inStock,
          };

          if (editingProduct) {
            dispatch(updateShoe(shoe));
          } else {
            dispatch(addShoe(shoe));
          }
        }}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Product"
        description="This action cannot be undone. Are you sure you want to delete this product?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (!selectedId) return;

          dispatch(deleteShoe(selectedId));

          setDeleteOpen(false);
          setSelectedId(null);
        }}
      />
    </>
  );
}
