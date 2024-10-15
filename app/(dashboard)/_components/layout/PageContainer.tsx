'use client';

import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScrollable(window.innerWidth >= 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)] w-full">
          <div className="min-w-full p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="min-w-full p-4 md:px-8 overflow-x-auto h-full">
          {children}
        </div>
      )}
    </>
  );
}

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ScrollArea } from '@/components/ui/scroll-area';

// export default function PageContainer({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [scrollable, setScrollable] = useState(false);

//   // Update scrollable state based on window size
//   useEffect(() => {
//     const handleResize = () => {
//       setScrollable(window.innerWidth >= 768); // Assuming 768px is your medium breakpoint
//     };

//     // Initial check
//     handleResize();

//     // Add event listener for window resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <>
//       {scrollable ? (
//         <ScrollArea className="h-[calc(100dvh-52px)]">
//           <div className="h-full p-4 md:px-8">{children}</div>
//         </ScrollArea>
//       ) : (
//         <div className="h-full p-4 md:px-8">{children}</div>
//       )}
//     </>
//   );
// }
