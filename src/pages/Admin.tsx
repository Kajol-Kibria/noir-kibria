import { useState } from 'react';
import { useStore, useAuth } from '../context/AppContext';
import { Plus, Edit2, Trash2, Box, ShoppingCart } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleEdit = (product: any) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      colors: [],
      sizes: [],
      stock: ''
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      colors: typeof formData.colors === 'string' ? formData.colors.split(',').map((c: string) => c.trim()) : formData.colors,
      sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map((s: string) => s.trim()) : formData.sizes,
    };

    if (data.id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
    setIsEditing(false);
    setFormData(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-black text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h1 className="text-4xl font-bold tracking-tighter uppercase text-center mb-2">Admin Dashboard</h1>
           <p className="text-gray-400 text-center uppercase tracking-widest text-sm">NOIR Administration Panel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-12 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-8 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
              activeTab === 'products'
                ? 'border-b-4 border-black text-black bg-white shadow-sm'
                : 'text-gray-500 hover:text-black hover:bg-white'
            }`}
          >
            <Box className="w-4 h-4" /> Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 px-8 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'border-b-4 border-black text-black bg-white shadow-sm'
                : 'text-gray-500 hover:text-black hover:bg-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> Orders
          </button>
        </div>

        {/* Content */}
        {activeTab === 'products' ? (
          <div>
            {!isEditing ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tighter uppercase">Inventory Management</h2>
                  <button
                    onClick={handleAddNew}
                    className="flex items-center bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </button>
                </div>
                <div className="bg-white shadow-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-12 flex-shrink-0 bg-gray-100">
                                <img className="h-16 w-12 object-cover" src={product.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold bg-gray-100 text-gray-800 uppercase tracking-widest">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold uppercase tracking-widest ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {product.stock} left
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-gray-500 hover:text-black mr-4 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="bg-white shadow-2xl p-8 md:p-12">
                <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8 border-b-2 border-black pb-4 inline-block">
                  {formData.id ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                      <input
                        required
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock</label>
                      <input
                        required
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                      <input
                        required
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Colors (comma separated)</label>
                      <input
                        required
                        type="text"
                        value={Array.isArray(formData.colors) ? formData.colors.join(', ') : formData.colors}
                        onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sizes (comma separated)</label>
                      <input
                        required
                        type="text"
                        value={Array.isArray(formData.sizes) ? formData.sizes.join(', ') : formData.sizes}
                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-4 border-2 border-black text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8">Order Tracking</h2>
            <div className="bg-white shadow-xl overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="border-b-2 border-gray-200 py-1 bg-transparent text-xs font-bold uppercase tracking-widest text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}