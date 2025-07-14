import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Settings, LogOut, Users, FileText, ChevronDown } from 'lucide-react';
import { useAuthCart } from '../../../context/AuthCartContext';
import Sidebar from 'pages/admin/sidebar/Sidebar';
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const { logout } = useAuthCart();
  const navigate = useNavigate();
  const [products] = useState([
    {
      id: 1,
      nameProduct: 'Laptop Dell',
      category: 'Electronics',
      price: 15000000,
      discount: 10,
      sold: 50,
      totalQuantity: 100,
      status: 'Active'
    },
    {
      id: 2,
      nameProduct: 'Smartphone Samsung',
      category: 'Electronics',
      price: 8000000,
      discount: 5,
      sold: 30,
      totalQuantity: 80,
      status: 'Active'
    },
    {
      id: 3,
      nameProduct: 'Headphones Sony',
      category: 'Accessories',
      price: 2000000,
      discount: 15,
      sold: 20,
      totalQuantity: 60,
      status: 'Inactive'
    },
    {
      id: 4,
      nameProduct: 'Mouse Logitech',
      category: 'Accessories',
      price: 500000,
      discount: 0,
      sold: 15,
      totalQuantity: 40,
      status: 'Active'
    },
    {
      id: 5,
      nameProduct: 'Keyboard Razer',
      category: 'Accessories',
      price: 1200000,
      discount: 8,
      sold: 25,
      totalQuantity: 70,
      status: 'Active'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center justify-center w-20 px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center justify-center w-20 px-3 py-1 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-full">
          Inactive
        </span>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Product Management</h1>
            </div>
            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Johndoe</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Products Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                onClick={() => navigate('/manager-page/add-product')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-4">
                <button className="text-red-500 font-medium border-b-2 border-red-500 pb-2">
                  All (165)
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (VND)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khuyến mãi (%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã bán</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng số lượng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modify</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.nameProduct}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toLocaleString()} VND</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.discount}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sold}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.totalQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
              <span className="text-sm text-gray-500">1 Page</span>
              <div className="flex items-center space-x-1">
                <button 
                  className="w-8 h-8 text-gray-300 rounded flex items-center justify-center text-sm font-medium cursor-not-allowed"
                  disabled
                >
                  ←
                </button>
                <button className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center text-sm font-medium">
                  1
                </button>
                <button 
                  className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded flex items-center justify-center text-sm font-medium"
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button 
                  className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded flex items-center justify-center text-sm font-medium"
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <button 
                  className="w-8 h-8 text-gray-500 hover:bg-gray-100 rounded flex items-center justify-center text-sm font-medium"
                  onClick={() => setCurrentPage(2)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManagement;