// 'use client';

// import { useState } from 'react';
// import HeaderFilter from './HeaderFilter';
// import SideFilter from './SideFilter';

// export default function MainFilter({
//   type,
// }: {
//   type: 'headerFilter' | 'sideFilter';
// }) {
//   const [filter, setFilter] = useState({
//     categories: ['development'],
//     price: ['free'],
//     sort: '',
//     color: [''],
//   });

//   //   apply checkbox filter
//   const applyArrayFilter = ({ type, value }) => {
//     const isFilterApplied = filter[type].includes(value);

//     if (isFilterApplied) {
//       setFilter((prev) => ({
//         ...prev,
//         [type]: prev[type].filter((v) => v !== value),
//       }));
//     } else {
//       setFilter((prev) => ({
//         ...prev,
//         [type]: [...prev[type], value],
//       }));
//     }
//   };

//   return (
//     <>
//       {type === 'headerFilter' ? (
//         <HeaderFilter filter={filter} applyArrayFilter={applyArrayFilter} />
//       ) : (
//         <SideFilter filter={filter} applyArrayFilter={applyArrayFilter} />
//       )}
//     </>
//   );
// }
