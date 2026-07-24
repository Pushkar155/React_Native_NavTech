import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import CommonSelect from "../../CommonSelect";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema/schema";

export interface ProductForm {
  id?: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock?: boolean;
}

interface ProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct?: ProductForm | null;
  onSave: (product: ProductForm) => void;
}

const initialState: ProductForm = {
  name: "",
  brand: "",
  description: "",
  price: 0,
  quantity: 0,
  imageUrl: "",
  inStock: true,
};

export default function AddOrEditProductModal({
  open,
  onOpenChange,
  editingProduct,
  onSave,
}: ProductSheetProps) {
  //   const [product, setProduct] = useState<ProductForm>(initialState);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: initialState,
  });

  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset(initialState);
    }
  }, [editingProduct, open]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("imageUrl", result.assets[0].uri, {
        shouldValidate: true,
      });
    }
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View
          className="rounded-t-3xl bg-white px-5 pt-5 border border-b-0 border-gray-200"
          style={{ maxHeight: "90%" }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </Text>

              <Pressable onPress={() => onOpenChange(false)}>
                <Ionicons name="close" size={28} />
              </Pressable>
            </View>

            {/* Image */}

            <Pressable onPress={pickImage} className="mb-6 items-center">
              {imageUrl ? (
                <Image
                  source={imageUrl}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 20,
                  }}
                />
              ) : (
                <View className="h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100">
                  <Ionicons name="camera" size={36} color="#6C4DFF" />
                  <Text className="mt-2 text-gray-500">Upload Image</Text>
                </View>
              )}

              {errors.imageUrl && (
                <Text className="mt-2 text-red-500">
                  {errors.imageUrl.message}
                </Text>
              )}
            </Pressable>

            {/* Name */}

            <Text className="mb-2 font-semibold">Product Name</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Nike Air Max"
                    className="rounded-xl border border-gray-300 px-4 py-3 mb-4"
                  />

                  {errors.name && (
                    <Text className="mt-1 text-red-500">
                      {errors.name.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Brand */}

            <Text className="mb-2 font-semibold">Brand</Text>

            {/* <TextInput
              value={product.brand}
              onChangeText={(brand) => setProduct({ ...product, brand })}
              placeholder="Nike"
              className="mb-4 rounded-xl border border-gray-300 px-4 py-3"
            /> */}

            <Controller
              control={control}
              name="brand"
              render={({ field: { value, onChange } }) => (
                <>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    className="rounded-xl border pl-4 border-gray-300 px-4 py-3 mb-4"
                  />

                  {errors.brand && (
                    <Text className="text-red-500">{errors.brand.message}</Text>
                  )}
                </>
              )}
            />

            {/* Description */}

            <Text className="mb-2 font-semibold">Description</Text>

            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    className="rounded-xl border pl-4 border-gray-300 px-4 py-3 mb-4"
                  />

                  {errors.description && (
                    <Text className="text-red-500">
                      {errors.description.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Price */}
            <View className="flex flex-row justify-between items-center gap-2 mb-4">
              <View className="w-1/3">
                <Text className="mb-2 font-semibold">Price</Text>

                <Controller
                  control={control}
                  name="price"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        keyboardType="numeric"
                        value={String(value)}
                        onChangeText={(text) => onChange(Number(text))}
                        className="rounded-xl border pl-4 border-gray-300 px-4 py-3"
                      />

                      {errors.price && (
                        <Text className="text-red-500">
                          {errors.price.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              <View className="w-1/3">
                {/* Quantity */}

                <Text className="mb-2 font-semibold">Quantity</Text>

                <Controller
                  control={control}
                  name="quantity"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        keyboardType="numeric"
                        value={String(value)}
                        onChangeText={(text) => onChange(Number(text))}
                        className="rounded-xl border pl-4 border-gray-300 px-4 py-3"
                      />

                      {errors.quantity && (
                        <Text className="text-red-500">
                          {errors.quantity.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>
            </View>

            {/* Buttons */}

            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 rounded-xl bg-gray-200 py-4"
                onPress={() => onOpenChange(false)}
              >
                <Text className="text-center font-semibold">Cancel</Text>
              </Pressable>

              <Pressable
                className="flex-1 rounded-xl bg-[#6C4DFF] py-4"
                onPress={handleSubmit((data) => {
                  onSave({
                    ...data,
                    id: editingProduct?.id ?? Date.now().toString(),
                    inStock: data.quantity > 0,
                  });

                  onOpenChange(false);
                })}
              >
                <Text className="text-center font-semibold text-white">
                  {editingProduct ? "Update" : "Add Product"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
