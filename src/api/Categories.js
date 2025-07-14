
const mockCategories = [
  { id: '1', slug: '1', name: 'Food', image: "https://i.postimg.cc/g2Dc3Jd5/food.jpg" },
  { id: '2', slug: '2', name: 'Toy', image: "https://i.postimg.cc/5NJMpVPM/toys.webp" },
  { id: '3', slug: '3', name: 'Furniture', image: "https://i.postimg.cc/d0fY9ZfW/furniture.jpg" },
];

export async function getCategories() {
  return new Promise(resolve => setTimeout(() => resolve(mockCategories), 300));
}

// Nếu dùng API thật, bỏ comment dưới đây và sửa endpoint cho phù hợp
// export async function getCategories() {
//   const response = await axios.get('/api/categories');
//   return response.data;
// }