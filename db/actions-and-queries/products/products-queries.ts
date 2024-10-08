import { Category } from '@/db/models/category-model';
import { Product } from '@/db/models/product-model';
import { dbConnect } from '@/db/service/mongo';

import { Types } from 'mongoose';

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

    // Find products associated with the category
    const products = await Product.find({
      category: category._id,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate('category');

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error(
      'Error fetching products by category: ' + (error as Error).message
    );
  }
};

// Get the first 8 products (new arrivals, only those that are not deleted)
export const getNewArrivalProducts = async () => {
  await dbConnect();

  try {
    const newArrivals = await Product.find({
      isDeleted: false,
      isAvailable: true,
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('category');

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
    const products = await Product.find(conditions)
      .sort(sortCondition)
      .skip(skip)
      .limit(Number(limit))
      .populate('category');

    // Get the total count for pagination
    const totalProducts = await Product.countDocuments(conditions);

    return {
      products: JSON.parse(JSON.stringify(products)),
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
