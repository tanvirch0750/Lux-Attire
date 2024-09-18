import { CurrencyIcon, GlobeIcon } from 'lucide-react';

const category = [
  { id: 1, label: "Women's Collection", value: 'women-collection' },
  { id: 3, label: 'Active Wear', value: 'active-wear' },
  { id: 4, label: 'Kids Wear', value: 'kids-wear' },
  { id: 5, label: 'Traditional Clothing', value: 'traditional-clothing' },
  { id: 6, label: "Men's Wear", value: 'men-wear' },
  { id: 7, label: 'Accessories', value: 'accessories' },
];

export const product = {
  productId: 123,
  name: 'Basic Tee',
  price: 35,
  isAvailable: true,
  categoryId: 1,
  images: [
    {
      id: 1,
      imageSrc:
        'https://img.freepik.com/free-photo/smiling-young-pretty-woman-looking-front-pointing-herself-isolated-olive-green-wall_141793-110044.jpg?t=st=1726479366~exp=1726482966~hmac=0720269003d5321a171dd67c349ee87bed0cc0a34acdc27d46fa2f2d291dacdf&w=740',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        'https://img.freepik.com/free-photo/smiling-young-pretty-caucasian-woman-keeping-hand-waist_141793-117952.jpg?t=st=1726479402~exp=1726483002~hmac=2502b75a3d0e850511af46df3c1a0dcf37dc96b1caa82e654c5a1e1cbdb04395&w=740',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        'https://img.freepik.com/free-photo/young-pretty-woman-looking-up-isolated-olive-green-wall-with-copy-space_141793-109791.jpg?t=st=1726479431~exp=1726483031~hmac=e6234e32bd1cd1bc9d521d8abcf0add1c5d9c578e3755287c9c46d977b82157e&w=740',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    {
      name: 'Heather Grey',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
    },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
      <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
      <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
    `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};
export const policies = [
  {
    name: 'International delivery',
    icon: GlobeIcon,
    description: 'Get your order in 2 days',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyIcon,
    description: "Don't look at other tees",
  },
];
export const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
          <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
          <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
        `,
      author: 'Risako M',
      date: 'May 16, 2021',
      datetime: '2021-01-06',
    },
    // More reviews...
  ],
};
export const relatedProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '35 €',
    color: 'Aspen White',
  },
  // More products...
];
