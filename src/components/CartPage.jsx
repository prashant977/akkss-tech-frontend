import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  CreditCard,
  Truck,
  Shield,
  Leaf,
  CheckCircle,
  X
} from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Mock cart data for demonstration
  useEffect(() => {
    setCartItems([
      {
        id: 1,
        product: {
          id: 1,
          name: 'Dell Latitude 5520 Business Laptop',
          price: 157617,
          image_url: '/src/assets/laptop-new-1.png',
          stock_quantity: 15,
          trees_planted: 1,
          co2_saved: 0.3
        },
        quantity: 1,
        total: 157617
      },
      {
        id: 2,
        product: {
          id: 2,
          name: 'HP EliteBook 840 G8 Refurbished',
          price: 107817,
          image_url: '/src/assets/laptop-refurb-1.png',
          stock_quantity: 8,
          trees_planted: 1,
          co2_saved: 0.3
        },
        quantity: 2,
        total: 215634
      }
    ]);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total: item.product.price * newQuantity
            }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  const getTotalTrees = () => {
    return cartItems.reduce((total, item) => total + (item.product.trees_planted * item.quantity), 0);
  };

  const getTotalCO2Saved = () => {
    return cartItems.reduce((total, item) => total + (item.product.co2_saved * item.quantity), 0);
  };

  const CartItem = ({ item }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={item.product.image_url} 
            alt={item.product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzMkg1NlY0OEgyNFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
            }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            Stock: {item.product.stock_quantity} available
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-bold text-primary">
              ₹{item.product.price.toLocaleString()}
            </span>
            <div className="flex items-center text-sm text-green-600">
              <Leaf className="h-4 w-4 mr-1" />
              {item.product.trees_planted} tree • {item.product.co2_saved}t CO₂
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={item.quantity >= item.product.stock_quantity}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ₹{item.total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  const CheckoutModal = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      shipping: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
      },
      payment: {
        method: 'razorpay'
      }
    });

    const handleInputChange = (section, field, value) => {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    };

    const handlePlaceOrder = () => {
      // In real implementation, this would call the backend API
      alert('Order placed successfully! You will be redirected to payment.');
      setShowCheckout(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Checkout</h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
                }`}>
                  {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className="font-medium">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
                }`}>
                  {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
                </div>
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.firstName}
                      onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.lastName}
                      onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.shipping.email}
                      onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.shipping.phone}
                      onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    value={formData.shipping.address}
                    onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <select
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.pincode}
                      onChange={(e) => handleInputChange('shipping', 'pincode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  >
                    Continue to Payment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="razorpay"
                        name="payment"
                        value="razorpay"
                        checked={formData.payment.method === 'razorpay'}
                        onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="razorpay" className="flex items-center space-x-3 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Razorpay</p>
                          <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking, Wallets</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        checked={formData.payment.method === 'cod'}
                        onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer">
                        <Truck className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{getTotalAmount().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{getTotalAmount().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center text-green-800">
                      <Leaf className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        Environmental Impact: {getTotalTrees()} trees planted, {getTotalCO2Saved().toFixed(1)}t CO₂ saved
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some laptops to your cart to get started!</p>
            <button
              onClick={() => window.location.href = '/store'}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{getTotalAmount().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{getTotalAmount().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  Environmental Impact
                </h3>
                <div className="space-y-1 text-sm text-green-700">
                  <p>🌳 {getTotalTrees()} trees will be planted</p>
                  <p>🌍 {getTotalCO2Saved().toFixed(1)}t CO₂ will be saved</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-medium"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && <CheckoutModal />}
    </div>
  );
};

export default CartPage;

