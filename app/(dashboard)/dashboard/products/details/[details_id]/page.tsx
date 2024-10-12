import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import ProductStats from '../../_components/product-stats/ProductStats';
import { getProductDetailsWithSales } from '@/db/actions-and-queries/products/products-queries';

const demoproduct = {
  _id: '650a7b1e123abc45de678901',
  name: "Men's T-Shirt",
  price: 29.99,
  isAvailable: true,
  images: [
    {
      id: 'img123',
      imageSrc:
        'https://img.freepik.com/free-photo/side-view-hands-painting-t-shirt_23-2150572788.jpg?uid=R15161155&ga=GA1.1.1101573227.1727353633&semt=ais_hybrid-rr-similar',
      imageAlt: "Men's T-Shirt in blue",
      color: '#0000FF',
      primary: true,
    },
    {
      id: 'img124',
      imageSrc:
        'https://img.freepik.com/free-photo/view-hawaiian-shirt-with-floral-print_23-2149366086.jpg?uid=R15161155&ga=GA1.1.1101573227.1727353633&semt=ais_hybrid-rr-similar',
      imageAlt: "Men's T-Shirt in red",
      color: '#FF0000',
      primary: false,
    },
  ],
  colors: [
    {
      name: 'Blue',
      bgColor: '#0000FF',
      selectedColor: '#0000FF',
      sizeStocks: [
        { size: 'S', inStock: true, stockQuantity: 30 },
        { size: 'M', inStock: true, stockQuantity: 50 },
        { size: 'L', inStock: false, stockQuantity: 0 },
      ],
    },
    {
      name: 'Red',
      bgColor: '#FF0000',
      selectedColor: '#FF0000',
      sizeStocks: [
        { size: 'S', inStock: true, stockQuantity: 20 },
        { size: 'M', inStock: false, stockQuantity: 0 },
        { size: 'L', inStock: true, stockQuantity: 10 },
      ],
    },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: false },
    { name: 'L', inStock: true },
  ],
  description: 'A comfortable and stylish T-shirt for men.',
  details: ['100% cotton', 'Machine washable', 'Available in multiple colors'],
  categoryDetails: {
    name: "Men's Wear",
    value: 'mens-wear',
  },
  salesData: [
    {
      color: 'Blue',
      size: 'S',
      totalQuantity: 150,
      totalRevenue: 4498.5,
    },
    {
      color: 'Blue',
      size: 'M',
      totalQuantity: 200,
      totalRevenue: 5998.0,
    },
    {
      color: 'Red',
      size: 'S',
      totalQuantity: 100,
      totalRevenue: 2999.0,
    },
    {
      color: 'Red',
      size: 'L',
      totalQuantity: 50,
      totalRevenue: 1499.5,
    },
  ],
  totalQuantitySold: 500,
  totalRevenueGenerated: 14995.0,
};

export default async function ProductDetailPage({
  params,
}: {
  params: { details_id: string };
}) {
  console.log('params', params);

  const product = await getProductDetailsWithSales(params?.details_id);

  console.log('details product', product);

  return (
    <PageContainer>
      <ProductStats product={product} />
    </PageContainer>
  );
}

const pData = {
  _id: '6703e6433b6526fa83a2920c',
  name: 'Classic Fit Polo Shirt',
  price: 80,
  isAvailable: true,
  images: [
    {
      id: '1',
      imageSrc:
        'http://res.cloudinary.com/dzmz0pfgq/image/upload/v1728308567/ujwiyujxdftkxbojqx48.jpg',
      imageAlt: 'Classic Fit Polo Shirt',
      color: '#000080',
      primary: false,
      _id: '67098ca7194f4643119841d5',
    },
    {
      id: '2',
      imageSrc:
        'http://res.cloudinary.com/dzmz0pfgq/image/upload/v1728308605/zzcnk53doxpyhiezjxen.jpg',
      imageAlt: 'Classic Fit Polo Shirt',
      color: '#FFFFFF',
      primary: true,
      _id: '67098ca7194f4643119841d6',
    },
    {
      id: '3',
      imageSrc:
        'http://res.cloudinary.com/dzmz0pfgq/image/upload/v1728308638/cprqjeczw6x6sxc94yil.jpg',
      imageAlt: 'Classic Fit Polo Shirt',
      color: '#000000',
      primary: false,
      _id: '67098ca7194f4643119841d7',
    },
  ],
  colors: [
    {
      name: 'Blue',
      bgColor: '#000080',
      selectedColor: '#1C1C1C',
      sizeStocks: [
        {
          size: 'XS',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841d9',
        },
        {
          size: 'S',
          stock: 80,
          isAvailable: true,
          _id: '67098ca7194f4643119841da',
        },
        {
          size: 'M',
          stock: 90,
          isAvailable: true,
          _id: '67098ca7194f4643119841db',
        },
        {
          size: 'L',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841dc',
        },
        {
          size: 'XL',
          stock: 60,
          isAvailable: true,
          _id: '67098ca7194f4643119841dd',
        },
        {
          size: 'XXL',
          stock: 40,
          isAvailable: true,
          _id: '67098ca7194f4643119841de',
        },
        {
          size: 'XXXL',
          stock: 40,
          isAvailable: true,
          _id: '67098ca7194f4643119841df',
        },
      ],
      _id: '67098ca7194f4643119841d8',
    },
    {
      name: 'White',
      bgColor: '#FFFFFF',
      selectedColor: '#1C1C1C',
      sizeStocks: [
        {
          size: 'XS',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841e1',
        },
        {
          size: 'S',
          stock: 60,
          isAvailable: true,
          _id: '67098ca7194f4643119841e2',
        },
        {
          size: 'M',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841e3',
        },
        {
          size: 'L',
          stock: 50,
          isAvailable: true,
          _id: '67098ca7194f4643119841e4',
        },
        {
          size: 'XL',
          stock: 60,
          isAvailable: true,
          _id: '67098ca7194f4643119841e5',
        },
        {
          size: 'XXL',
          stock: 70,
          isAvailable: false,
          _id: '67098ca7194f4643119841e6',
        },
        {
          size: 'XXXL',
          stock: 0,
          isAvailable: false,
          _id: '67098ca7194f4643119841e7',
        },
      ],
      _id: '67098ca7194f4643119841e0',
    },
    {
      name: 'Black',
      bgColor: '#000000',
      selectedColor: '#1C1C1C',
      sizeStocks: [
        {
          size: 'XS',
          stock: 80,
          isAvailable: true,
          _id: '67098ca7194f4643119841e9',
        },
        {
          size: 'S',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841ea',
        },
        {
          size: 'M',
          stock: 50,
          isAvailable: true,
          _id: '67098ca7194f4643119841eb',
        },
        {
          size: 'L',
          stock: 60,
          isAvailable: true,
          _id: '67098ca7194f4643119841ec',
        },
        {
          size: 'XL',
          stock: 40,
          isAvailable: true,
          _id: '67098ca7194f4643119841ed',
        },
        {
          size: 'XXL',
          stock: 70,
          isAvailable: true,
          _id: '67098ca7194f4643119841ee',
        },
        {
          size: 'XXXL',
          stock: 80,
          isAvailable: false,
          _id: '67098ca7194f4643119841ef',
        },
      ],
      _id: '67098ca7194f4643119841e8',
    },
  ],
  sizes: [
    {
      name: 'XS',
      inStock: true,
      _id: '67098ca7194f4643119841f0',
    },
    {
      name: 'S',
      inStock: true,
      _id: '67098ca7194f4643119841f1',
    },
    {
      name: 'M',
      inStock: true,
      _id: '67098ca7194f4643119841f2',
    },
    {
      name: 'L',
      inStock: true,
      _id: '67098ca7194f4643119841f3',
    },
    {
      name: 'XL',
      inStock: true,
      _id: '67098ca7194f4643119841f4',
    },
    {
      name: 'XXL',
      inStock: true,
      _id: '67098ca7194f4643119841f5',
    },
    {
      name: 'XXXL',
      inStock: true,
      _id: '67098ca7194f4643119841f6',
    },
  ],
  description:
    'This classic fit polo shirt is a versatile piece that can easily transition from a casual outing to a semi-formal event. Made from soft cotton fabric, it provides comfort throughout the day while maintaining a polished look. Available in navy, black, and white, it pairs well with jeans, chinos, or shorts, making it a must-have for any man’s wardrobe.',
  details: [
    'Material: 100% Cotton',
    'Short sleeves',
    'Collared neck',
    'Machine washable',
  ],
  categoryDetails: {
    value: 'mens-collection',
  },
  salesData: [
    {
      totalQuantity: 1,
      totalRevenue: 80,
      color: 'White',
      size: 'L',
    },
    {
      totalQuantity: 1,
      totalRevenue: 80,
      color: 'White',
      size: 'XL',
    },
  ],
  totalQuantitySold: 2,
  totalRevenueGenerated: 160,
};
