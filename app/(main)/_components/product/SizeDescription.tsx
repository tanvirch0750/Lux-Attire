import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const sizes = [
  {
    size: 'XS',
    chest: '32"–34" (81–86 cm)',
    waist: '26"–28" (66–71 cm)',
    length: '27" (69 cm)',
  },
  {
    size: 'S',
    chest: '35"–37" (89–94 cm)',
    waist: '29"–31" (74–79 cm)',
    length: '28" (71 cm)',
  },
  {
    size: 'M',
    chest: '38"–40" (96–102 cm)',
    waist: '32"–34" (81–86 cm)',
    length: '29" (74 cm)',
  },
  {
    size: 'L',
    chest: '41"–43" (104–109 cm)',
    waist: '35"–37" (89–94 cm)',
    length: '30" (76 cm)',
  },
  {
    size: 'XL',
    chest: '44"–46" (112–117 cm)',
    waist: '38"–40" (97–102 cm)',
    length: '31" (79 cm)',
  },
  {
    size: 'XXL',
    chest: '47"–49" (119–124 cm)',
    waist: '41"–43" (104–109 cm)',
    length: '32" (81 cm)',
  },
  {
    size: 'XXXL',
    chest: '50"–52" (127–132 cm)',
    waist: '44"–46" (112–117 cm)',
    length: '33" (84 cm)',
  },
];

export function SizeDescription() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-sm font-medium text-slate-600 hover:text-slate-500">
          See sizing chart
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="max-w-4xl mx-auto p-4">
              <h2 className="text-2xl text-brand font-bold text-center mb-6">
                Shirt Size Chart
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-2 border border-gray-300">Size</th>
                      <th className="px-4 py-2 border border-gray-300">
                        Chest
                      </th>
                      <th className="px-4 py-2 border border-gray-300">
                        Waist
                      </th>
                      <th className="px-4 py-2 border border-gray-300">
                        Length
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size.size} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-300 font-medium">
                          {size.size}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {size.chest}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {size.waist}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {size.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className=" bg-brand hover:bg-brand/90">
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
