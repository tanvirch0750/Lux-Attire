import { Category } from '@/db/models/category-model';
import { Product } from '@/db/models/product-model';
import { Review } from '@/db/models/review-model';
import { dbConnect } from '@/db/service/mongo';

import mongoose, { Types } from 'mongoose';

// Get all products (only those that are not deleted)
export const getAllProducts = async () => {
  await dbConnect();

  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate('category');

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get products by category-value (only those that are not deleted)
export const getProductsByCategoryValue = async (categoryValue: string) => {
  await dbConnect();

  try {
    // Find the category by its value
    const category = await Category.findOne({
      value: categoryValue,
      isDeleted: false,
    });

    // If the category is not found, return an empty array or handle as needed
    if (!category) {
      throw new Error('Category not found');
    }

    // Find products associated with the category and aggregate reviews
    const products = await Product.aggregate([
      {
        $match: {
          category: category._id,
          isDeleted: false,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'reviews', // The collection name for the 'Review' model
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $avg: '$reviews.rating' },
              else: 0, // Default to 0 if there are no reviews
            },
          },
          totalReviews: { $size: '$reviews' }, // Count the number of reviews
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          colors: 1,
          sizes: 1,
          images: 1,
          category: 1,
          isAvailable: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          averageRating: 1,
          totalReviews: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error(
      'Error fetching products by category: ' + (error as Error).message
    );
  }
};

// Get the first 8 products (new arrivals, only those that are not deleted) along with their average ratings
export const getNewArrivalProducts = async () => {
  await dbConnect();

  try {
    const newArrivals = await Product.aggregate([
      {
        $match: {
          isDeleted: false,
          isAvailable: true,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 8,
      },
      {
        $lookup: {
          from: 'reviews', // The collection name for the 'Review' model
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $avg: '$reviews.rating' },
              else: 0, // Default to 0 if there are no reviews
            },
          },
          totalReviews: { $size: '$reviews' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          colors: 1,
          sizes: 1,
          images: 1,
          category: 1,
          isAvailable: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          averageRating: 1,
          totalReviews: 1,
          offers: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(newArrivals));
  } catch (error) {
    throw new Error('Error fetching new arrivals: ' + (error as Error).message);
  }
};

// Get all available products (only those that are not deleted)
export const getAllAvailableProducts = async () => {
  await dbConnect();

  try {
    const products = await Product.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('category');

    // await new Promise((res: any) => setTimeout(res, 3000));

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get all available products with pagination, search, and filtering
// In your products-queries.ts file

export const getAllAvailableProductsWithQuery = async (query: any) => {
  await dbConnect();

  const {
    search = '',
    sort = 'price-desc',
    colors = [],
    priceRanges = [],
    categories = [],
    page = 1,
    limit = 12, // Changed to 12 for better grid layout
  } = query;

  // Define the query conditions
  const conditions: any = { isDeleted: false };

  // Handle search
  if (search) {
    conditions.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter by colors
  if (colors.length > 0) {
    conditions['colors.name'] = {
      $in: colors.map((color: string) => new RegExp(color, 'i')),
    };
  }

  // Filter by price ranges
  if (priceRanges.length > 0) {
    const priceConditions: any[] = [];

    priceRanges.forEach((range: string) => {
      if (range === 'under-100') {
        priceConditions.push({ price: { $lt: 100 } });
      } else if (range === '100-200') {
        priceConditions.push({ price: { $gte: 100, $lte: 200 } });
      } else if (range === '201-300') {
        priceConditions.push({ price: { $gte: 201, $lte: 300 } });
      } else if (range === 'above-300') {
        priceConditions.push({ price: { $gt: 300 } });
      }
    });

    if (conditions.$or) {
      conditions.$and = [{ $or: conditions.$or }, { $or: priceConditions }];
      delete conditions.$or;
    } else {
      conditions.$or = priceConditions;
    }
  }

  // Filter by categories
  if (categories.length > 0) {
    const categoryIds = await Category.find({
      value: { $in: categories },
    }).select('_id');
    conditions.category = { $in: categoryIds.map((cat: any) => cat._id) };
  }

  // Sorting
  let sortCondition: any = {};
  if (sort === 'price-asc') {
    sortCondition = { price: 1 };
  } else if (sort === 'price-desc') {
    sortCondition = { price: -1 };
  }

  // Pagination logic
  const skip = (Number(page) - 1) * Number(limit);

  try {
    // Fetch products first
    const products = await Product.find(conditions)
      .sort(sortCondition)
      .skip(skip)
      .limit(Number(limit))
      .populate('category');

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(conditions);

    // Get product IDs
    const productIds = products.map((product) => product._id);

    // Calculate average rating for each product
    const reviews = await Review.aggregate([
      {
        $match: {
          product: { $in: productIds },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Create a map of product IDs and their average ratings
    const reviewMap: Record<
      string,
      { averageRating: number; totalReviews: number }
    > = {};
    reviews.forEach((review) => {
      reviewMap[review._id] = {
        averageRating: review.averageRating || 0,
        totalReviews: review.totalReviews || 0,
      };
    });

    // Add averageRating and totalReviews to each product
    const productsWithRatings = products.map((product) => ({
      ...product.toObject(),
      averageRating: reviewMap[product._id]?.averageRating || 0,
      totalReviews: reviewMap[product._id]?.totalReviews || 0,
    }));

    return {
      products: JSON.parse(JSON.stringify(productsWithRatings)),
      totalProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
      currentPage: Number(page),
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get a product by ID (only if not deleted)
export const getProductById = async (productId: Types.ObjectId | string) => {
  await dbConnect();

  try {
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

// Get related products (same category, exclude current product)
export const getRelatedProducts = async (
  productId: Types.ObjectId | string
) => {
  await dbConnect();

  try {
    // First, fetch the product to get its category
    const currentProduct = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).populate('category');

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    // Fetch related products from the same category, excluding the current product
    const relatedProducts = await Product.find({
      category: currentProduct.category._id,
      _id: { $ne: productId },
      isDeleted: false,
      isAvailable: true,
    })
      .limit(4)
      .populate('category');

    return JSON.parse(JSON.stringify(relatedProducts));
  } catch (error) {
    throw new Error('Unable to fetch related products');
  }
};

export const getProductByIdAdmin = async (
  productId: Types.ObjectId | string
) => {
  await dbConnect();

  try {
    const product = await Product.findOne({
      _id: productId,
    }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw new Error('Error fetching product: ' + (error as Error).message);
  }
};

export const getProductsWithDiscountOffers = async () => {
  await dbConnect();

  try {
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0];

    // Find products that have an active discount offer
    const products = await Product.aggregate([
      {
        $match: {
          isDeleted: false,
          offers: {
            $elemMatch: {
              offerType: 'discount',
              isActive: true,
              validUntil: { $gt: currentDate },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $avg: '$reviews.rating' },
              else: 0,
            },
          },
          totalReviews: { $size: '$reviews' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          colors: 1,
          sizes: 1,
          images: 1,
          category: 1,
          isAvailable: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          offers: 1,
          averageRating: 1,
          totalReviews: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error(
      'Error fetching products with discount offers: ' +
        (error as Error).message
    );
  }
};

export const getProductsWithFreeShippingOffers = async () => {
  await dbConnect();

  try {
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0];

    // Find products that have an active free shipping offer
    const products = await Product.aggregate([
      {
        $match: {
          isDeleted: false,
          offers: {
            $elemMatch: {
              offerType: 'freeShipping',
              isActive: true,
              validUntil: { $gt: currentDate },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $avg: '$reviews.rating' },
              else: 0,
            },
          },
          totalReviews: { $size: '$reviews' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          colors: 1,
          sizes: 1,
          images: 1,
          category: 1,
          isAvailable: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
          offers: 1,
          averageRating: 1,
          totalReviews: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error(
      'Error fetching products with free shipping offers: ' +
        (error as Error).message
    );
  }
};

export async function getProductDetailsWithSales(productId: string) {
  const productObjectId = new mongoose.Types.ObjectId(productId);

  const [product] = await Product.aggregate([
    { $match: { _id: productObjectId } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryDetails',
      },
    },
    { $unwind: '$categoryDetails' },
    {
      $lookup: {
        from: 'orders',
        let: { productId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$$productId', '$orderItems.productId'] },
            },
          },
          { $unwind: '$orderItems' },
          {
            $match: {
              $expr: { $eq: ['$orderItems.productId', '$$productId'] },
            },
          },
          {
            $group: {
              _id: { color: '$orderItems.color', size: '$orderItems.size' },
              totalQuantity: { $sum: '$orderItems.quantity' },
              totalRevenue: { $sum: '$orderItems.totalPrice' },
            },
          },
          {
            $project: {
              _id: 0,
              color: '$_id.color',
              size: '$_id.size',
              totalQuantity: 1,
              totalRevenue: 1,
            },
          },
        ],
        as: 'salesData',
      },
    },
    {
      $addFields: {
        totalQuantitySold: { $sum: '$salesData.totalQuantity' },
        totalRevenueGenerated: { $sum: '$salesData.totalRevenue' },
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        isAvailable: 1,
        images: 1,
        colors: 1,
        sizes: 1,
        description: 1,
        details: 1,
        categoryDetails: { label: 1, value: 1 },
        salesData: 1,
        totalQuantitySold: 1,
        totalRevenueGenerated: 1,
      },
    },
  ]);

  return JSON.parse(JSON.stringify(product));
}

// const product = {
//   _id: '650a7b1e123abc45de678901',
//   name: "Men's T-Shirt",
//   price: 29.99,
//   isAvailable: true,
//   images: [
//     {
//       id: 'img123',
//       imageSrc: 'https://example.com/images/tshirt.jpg',
//       imageAlt: "Men's T-Shirt in blue",
//       color: '#0000FF',
//       primary: true,
//     },
//     {
//       id: 'img124',
//       imageSrc: 'https://example.com/images/tshirt_red.jpg',
//       imageAlt: "Men's T-Shirt in red",
//       color: '#FF0000',
//       primary: false,
//     },
//   ],
//   colors: [
//     {
//       name: 'Blue',
//       bgColor: '#0000FF',
//       selectedColor: '#0000FF',
//       sizeStocks: [
//         { size: 'S', inStock: true, stockQuantity: 30 },
//         { size: 'M', inStock: true, stockQuantity: 50 },
//         { size: 'L', inStock: false, stockQuantity: 0 },
//       ],
//     },
//     {
//       name: 'Red',
//       bgColor: '#FF0000',
//       selectedColor: '#FF0000',
//       sizeStocks: [
//         { size: 'S', inStock: true, stockQuantity: 20 },
//         { size: 'M', inStock: false, stockQuantity: 0 },
//         { size: 'L', inStock: true, stockQuantity: 10 },
//       ],
//     },
//   ],
//   sizes: [
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: false },
//     { name: 'L', inStock: true },
//   ],
//   description: 'A comfortable and stylish T-shirt for men.',
//   details: ['100% cotton', 'Machine washable', 'Available in multiple colors'],
//   categoryDetails: {
//     name: "Men's Wear",
//   },
//   salesData: [
//     {
//       color: 'Blue',
//       size: 'S',
//       totalQuantity: 150,
//       totalRevenue: 4498.5,
//     },
//     {
//       color: 'Blue',
//       size: 'M',
//       totalQuantity: 200,
//       totalRevenue: 5998.0,
//     },
//     {
//       color: 'Red',
//       size: 'S',
//       totalQuantity: 100,
//       totalRevenue: 2999.0,
//     },
//     {
//       color: 'Red',
//       size: 'L',
//       totalQuantity: 50,
//       totalRevenue: 1499.5,
//     },
//   ],
//   totalQuantitySold: 500,
//   totalRevenueGenerated: 14995.0,
// };
