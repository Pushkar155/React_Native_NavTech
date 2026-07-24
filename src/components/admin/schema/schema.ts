import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  brand: z.string().min(2, "Please select a brand"),
  description: z.string(),
  price: z.number().positive("Price must be greater than 0"),

  quantity: z.number().min(0, "Quantity cannot be negative"),

  imageUrl: z.string().min(1, "Please upload an image"),
});

export type ProductForm = z.infer<typeof productSchema>;
