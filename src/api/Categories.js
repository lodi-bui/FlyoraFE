
const mockCategories = [
  { id: '1', slug: '1', name: 'Food', image: '../category-pics/food.jpg' },
  { id: '2', slug: '2', name: 'Toy', image: '../category-pics/toys.jpg' },
  { id: '3', slug: '3', name: 'Furniture', image: '../category-pics/furniture.jpg' },
];

export async function getCategories() {
  return new Promise(resolve => setTimeout(() => resolve(mockCategories), 300));
}

// Nếu dùng API thật, bỏ comment dưới đây và sửa endpoint cho phù hợp
// export async function getCategories() {
//   const response = await axios.get('/api/categories');
//   return response.data;
// }