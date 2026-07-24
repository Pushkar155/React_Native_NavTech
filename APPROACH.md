# 📘 Project Approach

## Overview

This project is a React Native Shoe Store application built using **Expo**, **TypeScript**, **Redux Toolkit**, and **Expo Router**.

The primary objective was to develop a responsive mobile application that demonstrates modern React Native development practices while fulfilling all the assignment requirements.

The application consists of two separate modules:

- **User Module**
- **Admin Module**

The User module focuses on product browsing, shopping cart management, and order placement, while the Admin module manages products and customer orders.

---

# 🏗 Architecture

The application follows a modular folder structure to keep the codebase scalable and maintainable.

```
app
src
 ├── components
 ├── admin
 ├── constants
 ├── hooks
 ├── store
 ├── types
 └── utils
```

Each folder has a dedicated responsibility, making the project easier to understand and extend.

---

# 📦 State Management

Global application state is managed using **Redux Toolkit**.

The state is divided into three slices:

- Shoe Slice
- Cart Slice
- Order Slice

Redux Toolkit provides predictable state management while keeping reducer logic concise.

---

# 💾 Local Data Persistence

The application uses **Redux Persist** together with **AsyncStorage**.

The following data is persisted locally:

- Products
- Cart
- Orders

This allows the application to restore user data even after restarting the app.

---

# 📷 Image Upload

Product images are selected using **Expo Image Picker**.

Workflow:

1. Admin selects an image from the device gallery.
2. Expo Image Picker returns a local image URI.
3. The image URI is stored in Redux.
4. Redux Persist saves the data into AsyncStorage.
5. Images are rendered using Expo Image.

No backend or cloud storage is required for this assignment.

---

# ✅ Form Validation

The Add/Edit Product form uses **Zod** for schema validation.

Validation includes:

- Product Name
- Brand
- Description
- Price
- Quantity
- Product Image
- Available Sizes

This ensures consistent and type-safe validation before saving products.

---

# 👤 User Flow

1. Browse all available shoes.
2. Open product details.
3. Select an available shoe size.
4. Add products to the shopping cart.
5. Increase or decrease quantities.
6. Checkout (without payment integration).
7. View previous orders.

---

# 🛠 Admin Flow

1. View all products.
2. Add new products.
3. Edit existing products.
4. Delete products.
5. Manage stock quantity.
6. View all customer orders.
7. Update order status between **Pending** and **Delivered**.

---

# 🎨 UI & Design

The application is designed with responsiveness and usability in mind.

UI components include:

- NativeWind
- Tamagui Card & Buttons
- React Native Reanimated Carousel
- Flash Messages
- Expo Image

The goal was to create a clean and modern shopping experience.

---

# 💡 Development Decisions

Some important design decisions made during development include:

- Functional Components throughout the application
- TypeScript for better type safety
- Redux Toolkit for predictable state management
- Redux Persist for local storage
- Reusable UI components
- Zod validation for forms
- Modular folder structure
- Responsive layouts

---

# ⚠ Challenges Faced

During development, several challenges were encountered:

- Designing separate Admin and User workflows.
- Managing persistent local application state.
- Implementing local image upload without a backend.
- Building reusable UI components.
- Implementing form validation using Zod.
- Creating responsive layouts for different screen sizes.

These challenges were addressed using modern React Native libraries while keeping the codebase clean and maintainable.

---

# ✅ Conclusion

The application satisfies the assignment requirements while demonstrating modern React Native development practices.

The focus throughout development was on:

- Clean Architecture
- Maintainable Code
- Reusable Components
- Responsive UI
- Scalable State Management
- Good Developer Experience
