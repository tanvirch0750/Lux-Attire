import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SizeDescriptionProps {
  sizes: Array<{
    size: string;
    stock: number;
    isAvailable: boolean;
    sizeMetric: {
      chest: number;
      waist: number;
      length: number;
      sleeve_length: number;
    };
    _id: string;
  }>;
}

export function SizeDescription({ sizes }: SizeDescriptionProps) {
  // Get dynamic metric keys from the sizeMetric object
  const metricKeys = sizes.length > 0 ? Object.keys(sizes[0].sizeMetric) : [];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-sm font-medium text-slate-600 hover:text-slate-500">
          See sizing chart
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="max-w-4xl mx-auto p-4">
              <h2 className="text-2xl text-brand font-bold text-center mb-2">
                Size Chart
              </h2>
              <p className="text-center mb-6">
                All measurements are in inches.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-2 border border-gray-300">Size</th>

                      {metricKeys.map((key) => (
                        <th
                          key={key}
                          className="px-4 py-2 border border-gray-300"
                        >
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).replace('_', ' ')}{' '}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-300 font-medium">
                          {size.size}
                        </td>

                        {metricKeys.map((key) => (
                          <td
                            key={key}
                            className="px-4 py-2 border border-gray-300"
                          >
                            {/* @ts-ignore */}
                            {size.sizeMetric[key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-brand hover:bg-brand/90">
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
