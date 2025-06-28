import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [reference, setReference] = useState('');

  const orders = [
    {
      id: '#12345',
      image: '/api/placeholder/80/80',
      title: 'Bird Food, Premium Quality, 100% Natural Ingredients, No Artificial Additives, 1kg',
      quantity: 1
    },
    {
      id: '#54321',
      image: '/api/placeholder/80/80',
      title: 'Bird Cage, Large Size, Durable Metal Construction, Easy to Clean, Includes Perches and Feeders',
      quantity: 4
    },
    {
      id: '#24680',
      image: '/api/placeholder/80/80',
      title: 'Bird Seeds, Mixed Variety, High Nutritional Value, Suitable for All Bird Species, 500g',
      quantity: 1
    },
    {
      id: '#08642',
      image: '/api/placeholder/80/80',
      title: 'Bird Stand, Adjustable Height, Sturdy Base, Ideal for Indoor and Outdoor Use, Easy to Assemble',
      quantity: 1
    }
  ];

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setStatus('');
    setReference('');
  };

  const handleSearch = () => {
    console.log('Searching with filters:', { fromDate, toDate, status, reference });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Order History</h1>

      {/* Filter Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Please select...</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference</label>
            <div className="relative">
              <select
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">#</option>
                <option value="25200">25200</option>
                <option value="25201">25201</option>
                <option value="25202">25202</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
          <button
            onClick={handleSearch}
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">IMG</span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 mb-2 leading-relaxed">
                  {order.title}
                </h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>Order: <span className="font-medium">{order.id}</span></div>
                  <div>Qty: <span className="font-medium">{order.quantity}</span></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex md:ml-auto gap-2">
                <Link to={`/order-details/${order.id}`}>
                  <button className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm whitespace-nowrap">
                    Order Details
                  </button>
                </Link>
                {/* <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm whitespace-nowrap">
                  Re - Order
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
