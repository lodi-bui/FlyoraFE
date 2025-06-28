import React from 'react';

const OrderDetails = () => {
  const orderData = {
    orderNumber: '#46528952',
    thankYouMessage: 'Thank you for shopping with us!',
    orderInfo: {
      orderDate: 'Jun 21, 2025',
      deliveryDate: 'Jun 22, 2025',
      status: 'Processing',
      paymentStatus: 'Paid',
      paymentMethod: 'Cash on Delivery'
    },
    customer: {
      name: 'NTrang',
      email: 'ntrang21102005@gmail.com',
      phone: '+84 3367 8915'
    },
    address: {
      shipping: '12 Hoàng Hoa Thám, Q.3, TP.HCM',
      billing: 'Same'
    },
    items: [
      {
        id: 1,
        name: 'Smart Watch',
        quantity: 1,
        price: 140.00,
        image: '/api/placeholder/80/80'
      },
      {
        id: 2,
        name: 'iPhone 15',
        quantity: 1,
        price: 1550.26,
        image: '/api/placeholder/80/80'
      }
    ],
    pricing: {
      subtotal: 1690.26,
      shippingCharge: 60.00,
      taxes: 80.00,
      discount: 0.00,
      total: 1830.26
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Details</h1>
        <div className="text-sm text-gray-600">Order Number: {orderData.orderNumber}</div>
        <div className="text-sm text-green-600">{orderData.thankYouMessage}</div>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Order Info</h3>
          {Object.entries(orderData.orderInfo).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm py-1">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="font-medium text-gray-900">{value}</span>
            </div>
          ))}
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Customer</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Name:</span> <span className="text-gray-900 font-medium">{orderData.customer.name}</span></p>
            <p><span className="text-gray-600">Email:</span> <span className="text-gray-900 font-medium">{orderData.customer.email}</span></p>
            <p><span className="text-gray-600">Phone:</span> <span className="text-gray-900 font-medium">{orderData.customer.phone}</span></p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-4">Address</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Shipping:</span> <span className="text-gray-900 font-medium">{orderData.address.shipping}</span></p>
            <p><span className="text-gray-600">Billing:</span> <span className="text-gray-900 font-medium">{orderData.address.billing}</span></p>
          </div>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="space-y-4 mb-10">
        {orderData.items.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center text-white text-xs">
                IMG
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="text-base md:text-lg font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">${orderData.pricing.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900 font-medium">${orderData.pricing.shippingCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="text-gray-900 font-medium">${orderData.pricing.taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-gray-900 font-medium">${orderData.pricing.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-3 font-semibold text-base">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900 text-lg font-bold">${orderData.pricing.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
