import axios from 'axios';


// Temporary mock data for preview. Uncomment to use mock instead of real API:
const mockCategories = [
  { id: 'food',      slug: 'food',      name: 'Food',      productCount: 64, image: '/images/categories/food.jpg' },
  { id: 'furniture', slug: 'furniture', name: 'Furniture', productCount: 22, image: '/images/categories/furniture.jpg' },
  { id: 'toys',      slug: 'toys',      name: 'Toys',      productCount: 16, image: '/images/categories/toys.jpg' },
];
export async function getCategories() {
  return new Promise(resolve => setTimeout(() => resolve(mockCategories), 300));
}


// export async function getCategories() {
//   // TODO: Replace '/api/categories' with your actual endpoint
//   const response = await axios.get('/api/categories');
//   return response.data;
// }