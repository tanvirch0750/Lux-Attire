# Clothing Marketplace Project - README

## Project Overview

Luxe Attire - This Clothing Marketplace project is a full-featured e-commerce platform designed to offer users a seamless shopping experience. The project leverages Next.js (v14), MongoDB for the backend, Redux for state management, and Stripe for payments. The platform includes key features such as product management, order tracking, payment handling, user authentication, and an administrative dashboard.

## Live Demo

[Click here to view the live demo](https://luxe-attire.vercel.app/)

### Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Usage](#usage)
4. [Admin Dashboard](#admin-dashboard)
5. [Error Handling](#error-handling)
6. [SEO](#seo)
7. [Additional Features](#additional-features)

## Features

### 1. UI/UX Enhancements

- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Intuitive Navigation**: Simplified navigation with a clear layout for enhanced user experience.
- **Improved Visuals**: Polished UI components that are visually appealing and easy to interact with.
- **Cart Persistence**: Cart items persist across sessions using `Redux Persist`, ensuring users don't lose their selection.

### 2. Authentication & Authorization

- **User Registration & Login**: Secure registration and login with email and password credentials and google login.
- **Protected Routes**: Pages like `My Orders` and the `Admin Dashboard` are accessible only after user authentication.

### 3. Product Management

- **Product Listing**: Products are categorized (`/kids-wear`, `/traditional-clothing`, `/menswear`) for easy browsing.
- **Add to Cart**: Users can add products to their cart from both the product listing and the product detail pages.
- **Product Reviews**: Registered users can provide reviews for products, visible below the product details.

### 4. Cart and Checkout

- **Cart Management**: Items can be added to the cart, and Redux Persist is used to retain cart state across page reloads.
- **Checkout Page**: Users can review their cart items before proceeding to payment. Only Cash on Delivery is available by default, but Stripe payment is implemented as an additional option.
- **Total Price Calculation**: Includes the price of products and a delivery charge of 15 Taka.

### 5. Order Management & Tracking

- **Order Status Tracking**: Users can view their pending and delivered orders on the `My Orders` page.
- **Admin Order Management**: Admins can change order statuses from "Pending" to "Delivered" on the `Admin Dashboard`.
- **Order Confirmation Emails**: Automated emails are sent to users upon order confirmation.

### 6. Payment Integration

- **Stripe Payment**: Stripe is integrated as a payment gateway for secure and fast payment processing.
- **Cash on Delivery**: Available as a default payment option on the checkout page.

### 7. Admin Dashboard

- **Product Management**: Admins can add, edit, and delete products via a dedicated dashboard.
- **Order Management**: Admins can update order statuses and view order statistics.
- **User Management**: Admins can manage user accounts, viewing their details and managing roles if needed.
- **Sales Stats**: A comprehensive overview of total sales, product statistics, and other key metrics.

### 8. Error Handling

- **Next.js Error Handling**: Enhanced error handling with custom informative error messages. Graceful fallbacks are implemented to ensure users have a smooth experience, even in cases of unexpected errors.

### 9. SEO Optimization

- **Dynamic Meta Tags**: Static and dynamic meta tags are used to optimize search engine visibility.
- **Product Name in Browser Tab**: The product name dynamically appears in the browser tab when viewing a product detail page, improving SEO and user experience.
- **Next.js Metadata API**: Used for SEO optimization with support for dynamic page content.

### 10. Optional Features Implemented

- **Server Actions**: Used for posting product reviews and other server-side actions for improved performance.
- **Email Notifications**: Order confirmation emails are automatically sent to users upon successful checkout.
- **Order Status Tracking**: Users can track the status of their orders through a simple order tracking system.

## Technologies Used

- **Frontend**: Next.js (v14), Tailwind CSS
- **Backend**: Node.js, MongoDB, NextAuth for authentication
- **State Management**: Redux, Redux Persist
- **Payments**: Stripe API for payment handling
- **Email Service**: Resend (for order confirmation emails)

## Usage

### User Role

1. **Browse Products**: Navigate through the product categories like `Menswear`, `Kids Wear`, etc.
2. **Add to Cart**: Add items to the cart, with cart data persisting across sessions.
3. **Checkout**: Proceed to checkout, where users can choose to pay via Stripe or Cash on Delivery.
4. **Order Tracking**: View and track pending and delivered orders on the `My Orders` page.
5. **Product Reviews**: Submit reviews for products on the product detail page.

### Admin Role

1. **Product Management**: Add, edit, or delete products via the admin dashboard.
2. **Order Management**: Manage orders, updating statuses from "Pending" to "Delivered".
3. **Sales Overview**: View sales and user statistics in the dashboard.

## Error Handling

- **Next.js Error Boundaries**: Handles unexpected issues gracefully, displaying informative error messages without breaking the user experience.

## SEO

- **Dynamic Meta Tags**: Implemented across product pages for enhanced search engine visibility.
- **Next.js Metadata API**: Used for setting up SEO-friendly metadata dynamically.

## Additional Features

- **Email Confirmation**: Automated order confirmation sent to users upon placing an order.
- **Server Actions**: Server-side actions used for posting reviews and handling various interactions efficiently.

## Conclusion

This Clothing Marketplace project is a robust, scalable platform with user-friendly features and comprehensive functionality for both shoppers and admins. The combination of modern UI/UX, seamless checkout, and powerful admin tools make it a standout solution for e-commerce in the clothing domain.
