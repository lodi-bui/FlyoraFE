import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Settings, LogOut, Users, FileText, ChevronDown } from 'lucide-react';
import { useAuthCart } from '../../../context/AuthCartContext';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const { logout } = useAuthCart();
  const navigate = useNavigate();
  const [users] = useState([
    {
      id: 1,
      username: 'User1',
      email: 'User1@gmail.com',
      phone: '0903829011',
      address: '123 Hung Vuong, Q3, HCM',
      role: 'Customer',
      status: 'Active'
    },
    {
      id: 2,
      username: 'User1',
      email: 'User1@gmail.com',
      phone: '0903829011',
      address: '123 Hung Vuong, Q3, HCM',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 3,
      username: 'User1',
      email: 'User1@gmail.com',
      phone: '0903829011',
      address: '123 Hung Vuong, Q3, HCM',
      role: 'Sale Staff',
      status: 'Inactive'
    },
    {
      id: 4,
      username: 'User1',
      email: 'User1@gmail.com',
      phone: '0903829011',
      address: '123 Hung Vuong, Q3, HCM',
      role: 'Shop Owner',
      status: 'Active'
    },
    {
      id: 5,
      username: 'User1',
      email: 'User1@gmail.com',
      phone: '0903829011',
      address: '123 Hung Vuong, Q3, HCM',
      role: 'Customer',
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
      <div className="w-64 bg-green-600 text-white">
        {/* Logo */}
        <div className="flex items-center p-6 border-b border-green-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold">Flyora</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className="px-4 mb-2">
            <span className="text-sm font-medium text-green-200">Main</span>
          </div>
          <ul className="space-y-2 px-4">
            <li>
              <a href="/admin-page/users" className="flex items-center px-4 py-3 bg-green-500 rounded-lg">
                <Users className="w-5 h-5 mr-3" />
                <span className="font-medium">Users</span>
              </a>
            </li>
            <li>
              <a href="/admin-page/contents" className="flex items-center px-4 py-3 text-green-100 hover:bg-green-500 rounded-lg transition-colors">
                <FileText className="w-5 h-5 mr-3" />
                <span>Contents</span>
              </a>
            </li>
            <li>
              <a href="/admin-page/settings" className="flex items-center px-4 py-3 text-green-100 hover:bg-green-500 rounded-lg transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                <span>Manage System</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  toast.success("Đăng xuất thành công!");
                  navigate("/");
                }}
                className="w-full text-left flex items-center px-4 py-3 text-red-200 hover:bg-green-500 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
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
            {/* Users Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modify</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
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

export default UserManagement;