import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  MapPin,
  Leaf,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // In real implementation, these would be API calls
    setStats({
      total_products: 156,
      total_orders: 89,
      total_users: 234,
      total_revenue: 2847650,
      environmental_impact: {
        total_trees: 20186,
        total_co2_saved: 6055.8
      }
    });

    setProducts([
      {
        id: 1,
        name: 'Dell Latitude 5520 Business Laptop',
        price: 157617,
        category: 'Business',
        stock_quantity: 15,
        is_featured: true,
        is_active: true
      },
      {
        id: 2,
        name: 'HP EliteBook 840 G8 Refurbished',
        price: 107817,
        category: 'Refurbished',
        stock_quantity: 8,
        is_featured: false,
        is_active: true
      }
    ]);

    setOrders([
      {
        id: 1,
        order_number: 'AKKSS20241215ABC123',
        user_name: 'Rajesh Kumar',
        total_amount: 157617,
        status: 'confirmed',
        created_at: '2024-12-15T10:30:00'
      },
      {
        id: 2,
        order_number: 'AKKSS20241215DEF456',
        user_name: 'Priya Sharma',
        total_amount: 107817,
        status: 'pending',
        created_at: '2024-12-15T09:15:00'
      }
    ]);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      description: '',
      price: '',
      original_price: '',
      category: 'New',
      type: 'Business',
      brand: '',
      model: '',
      stock_quantity: '',
      is_featured: false,
      trees_planted: 1,
      co2_saved: 0.3
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Business">Business</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trees Planted per Purchase
                </label>
                <input
                  type="number"
                  value={formData.trees_planted}
                  onChange={(e) => setFormData({...formData, trees_planted: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                Featured Product
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                {product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.total_products}
          icon={Package}
          color="text-blue-600"
        />
        <StatCard
          title="Total Orders"
          value={stats.total_orders}
          icon={ShoppingCart}
          color="text-green-600"
        />
        <StatCard
          title="Total Users"
          value={stats.total_users}
          icon={Users}
          color="text-purple-600"
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.total_revenue?.toLocaleString()}`}
          icon={DollarSign}
          color="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Leaf className="h-5 w-5 text-green-600 mr-2" />
            Environmental Impact
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trees Planted</span>
              <span className="text-2xl font-bold text-green-600">
                {stats.environmental_impact?.total_trees?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CO₂ Saved</span>
              <span className="text-2xl font-bold text-green-600">
                {stats.environmental_impact?.total_co2_saved?.toLocaleString()}t
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-sm">{order.order_number}</p>
                  <p className="text-xs text-gray-500">{order.user_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">₹{order.total_amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSaveProduct = (productData) => {
      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? {...productData, id: editingProduct.id} : p));
      } else {
        setProducts([...products, {...productData, id: Date.now()}]);
      }
      setShowForm(false);
      setEditingProduct(null);
    };

    const handleDeleteProduct = (productId) => {
      if (confirm('Are you sure you want to delete this product?')) {
        setProducts(products.filter(p => p.id !== productId));
      }
    };

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Product Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.category === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">₹{product.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`${product.stock_quantity > 10 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(true);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    );
  };

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Order Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.order_number}</td>
                  <td className="py-3 px-4">{order.user_name}</td>
                  <td className="py-3 px-4 font-medium">₹{order.total_amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        setOrders(orders.map(o => 
                          o.id === order.id ? {...o, status: e.target.value} : o
                        ));
                      }}
                      className={`px-2 py-1 rounded-full text-xs border-0 ${
                        order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLocations = () => {
    const [showLocationForm, setShowLocationForm] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);

    const mockLocations = [
      { id: 1, name: 'Maharashtra', city: 'Mumbai', trees_planted: 3245, laptops_sold: 1876, co2_saved: 973.5 },
      { id: 2, name: 'Karnataka', city: 'Bangalore', trees_planted: 2891, laptops_sold: 1654, co2_saved: 867.3 },
      { id: 3, name: 'Tamil Nadu', city: 'Chennai', trees_planted: 2156, laptops_sold: 1234, co2_saved: 647.1 }
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Location Management</h2>
          <button
            onClick={() => setShowLocationForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Add Location
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">State</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">City</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trees Planted</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Laptops Sold</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">CO₂ Saved (t)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLocations.map((location) => (
                  <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{location.name}</td>
                    <td className="py-3 px-4">{location.city}</td>
                    <td className="py-3 px-4 text-green-600 font-medium">{location.trees_planted.toLocaleString()}</td>
                    <td className="py-3 px-4">{location.laptops_sold.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-600 font-medium">{location.co2_saved}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'locations', label: 'Locations', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-bold text-gray-900">AKKSS Tech Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'locations' && renderLocations()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

