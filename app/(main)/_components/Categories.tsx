import Link from 'next/link';

export default function CategoryCards() {
  const categories = [
    {
      href: '/products/womens-collection',
      imageUrl:
        'https://img.freepik.com/free-photo/front-view-beautiful-woman-with-copy-space_23-2148342437.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid',
      title: 'Womens Collection',
      subtitle: 'explore',
      hashtag: '#NEWYEAR2024',
      className: 'col-span-12 md:col-span-6',
      textPosition: 'right',
    },
    {
      href: '/products/activewear',
      imageUrl:
        'https://img.freepik.com/free-photo/stylish-girl-plaid-coat-posing-orange-wall_197531-23797.jpg?t=st=1726331866~exp=1726335466~hmac=0f76551b400a3020c498b95a7a464c7372d790d5b70320ac1c5e1704ba9a55b3&w=740',
      title: 'Activewear',
      subtitle: '#New',
      className: 'col-span-12 md:col-span-3',
      textPosition: 'top-right',
    },
    {
      href: '/products/kids-wear',
      imageUrl:
        'https://img.freepik.com/free-photo/suspicious-kid-yellow-sweater-short-haired-preteen-girl_197531-14380.jpg?t=st=1726332114~exp=1726335714~hmac=67d232d509d5f4b4dbe7f2e067bd417eba839a80f124e3644adfa2ea2ba98176&w=740',
      title: 'Kids Wear',
      subtitle: '#Dress',
      hashtag: 'exclusive',
      className: 'col-span-12 md:col-span-3',
      textPosition: 'bottom-right',
    },
    {
      href: '/products/accessories',
      imageUrl:
        'https://img.freepik.com/free-photo/man-shoes-with-glasses-paper-mustache-table_23-2148080119.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid',
      title: 'Accessories',
      subtitle: '#Accessories',
      hashtag: '25%',
      className: 'col-span-12 md:col-span-3',
      textPosition: 'top-left',
    },
    {
      href: '/products/traditional-clothing',
      imageUrl:
        'https://img.freepik.com/free-photo/portrait-curly-haired-young-man-with-copy-space_23-2148892101.jpg?t=st=1726332299~exp=1726335899~hmac=4589618fe564b323693da5df0299667280100fd2a41d1c1aebbe2d9836a88c3e&w=740',
      title: 'Traditional Clothing',
      subtitle: 'explore',
      hashtag: '#NEWYEAR2024',
      className: 'col-span-12 md:col-span-3',
      textPosition: 'center',
    },
    {
      href: '/products/mens-collection',
      imageUrl:
        'https://img.freepik.com/free-photo/image-tourist-checking-out-something-cool-takeoff-sunglasses-say-wow-looking-aside-impressed_1258-159739.jpg?t=st=1726333836~exp=1726337436~hmac=7b9aa4c9c9c17426878c4f56baa707650fade6b13a6280f11de1d2fc810b7b47&w=996',
      title: 'Menswear',
      subtitle: 'explore',
      hashtag: 'Mega Sale',
      className: 'col-span-12 md:col-span-6',
      textPosition: 'right',
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 mb-2 mx-auto p-6 mt-6">
      {categories.map((category, index) => (
        <Link
          href={category.href}
          className={`${category.className} flash-effect`}
          key={index}
        >
          <div
            className="bg-orange-400 relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-[300px]"
            style={{ backgroundImage: `url(${category.imageUrl})` }}
          >
            {/* Text alignment logic */}
            <div
              className={`absolute ${
                category.textPosition === 'right'
                  ? 'right-0 mr-6 text-right'
                  : category.textPosition === 'top-right'
                  ? 'top-0 right-0 mt-3 mr-3 text-right'
                  : category.textPosition === 'bottom-right'
                  ? 'bottom-0 right-0 mb-6 mr-6 text-right'
                  : category.textPosition === 'top-left'
                  ? 'top-0 left-0 mt-6 ml-6 text-left'
                  : 'bottom-6 text-right'
              }`}
            >
              <p className="uppercase text-sm mb-1 text-white">
                {category.subtitle}
              </p>
              <h2 className="text-3xl font-bold text-white">
                {category.title}
              </h2>
              <p className="text-sm mt-2 text-white">{category.hashtag}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
