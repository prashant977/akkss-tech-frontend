import React, { useState, useEffect } from 'react'
import { Search, Filter, ShoppingCart, Leaf, Star, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import laptopNew1 from '../assets/laptop-new-1.png'
import laptopRefurb1 from '../assets/laptop-refurb-1.png'
import laptopGaming from '../assets/laptop-gaming.png'

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "EcoBook Pro 15",
    category: "new",
    type: "business",
    price: 1299,
    originalPrice: null,
    image: laptopNew1,
    rating: 4.8,
    reviews: 124,
    specs: {
      processor: "Intel Core i7-12700H",
      memory: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6\" FHD IPS",
      graphics: "Intel Iris Xe"
    },
    treesPlanted: 1,
    co2Saved: 0,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "ThinkGreen X1 Carbon",
    category: "refurbished",
    type: "business",
    price: 899,
    originalPrice: 1499,
    image: laptopRefurb1,
    rating: 4.6,
    reviews: 89,
    specs: {
      processor: "Intel Core i5-10210U",
      memory: "8GB DDR4",
      storage: "256GB SSD",
      display: "14\" FHD IPS",
      graphics: "Intel UHD"
    },
    treesPlanted: 1,
    co2Saved: 300,
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "GreenForce Gaming",
    category: "new",
    type: "gaming",
    price: 1899,
    originalPrice: null,
    image: laptopGaming,
    rating: 4.9,
    reviews: 67,
    specs: {
      processor: "AMD Ryzen 7 6800H",
      memory: "32GB DDR5",
      storage: "1TB SSD",
      display: "15.6\" QHD 165Hz",
      graphics: "RTX 4060"
    },
    treesPlanted: 1,
    co2Saved: 0,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "EcoBook Air 13",
    category: "new",
    type: "ultrabook",
    price: 999,
    originalPrice: null,
    image: laptopNew1,
    rating: 4.7,
    reviews: 156,
    specs: {
      processor: "Intel Core i5-1235U",
      memory: "8GB DDR4",
      storage: "256GB SSD",
      display: "13.3\" FHD IPS",
      graphics: "Intel Iris Xe"
    },
    treesPlanted: 1,
    co2Saved: 0,
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Renewed WorkStation",
    category: "refurbished",
    type: "workstation",
    price: 1299,
    originalPrice: 2199,
    image: laptopRefurb1,
    rating: 4.5,
    reviews: 43,
    specs: {
      processor: "Intel Xeon E-2276M",
      memory: "32GB DDR4",
      storage: "512GB SSD",
      display: "15.6\" 4K IPS",
      graphics: "Quadro RTX 3000"
    },
    treesPlanted: 1,
    co2Saved: 450,
    inStock: false,
    featured: false
  },
  {
    id: 6,
    name: "Student EcoBook",
    category: "refurbished",
    type: "budget",
    price: 499,
    originalPrice: 799,
    image: laptopRefurb1,
    rating: 4.3,
    reviews: 201,
    specs: {
      processor: "Intel Core i3-8145U",
      memory: "8GB DDR4",
      storage: "128GB SSD",
      display: "14\" HD",
      graphics: "Intel UHD 620"
    },
    treesPlanted: 1,
    co2Saved: 200,
    inStock: true,
    featured: false
  }
]

const StorePage = () => {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 2500])
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState([])

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.specs.processor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesType = selectedType === 'all' || product.type === selectedType
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesType && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'featured':
        default:
          return b.featured - a.featured || b.rating - a.rating
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedType, priceRange, sortBy])

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.category === 'refurbished' && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              Refurbished
            </span>
          )}
          {!product.inStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
          {product.featured && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Environmental Impact */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
          <div className="flex items-center gap-1 text-primary">
            <Leaf className="h-3 w-3" />
            <span className="font-medium">1 Tree Planted</span>
          </div>
          {product.co2Saved > 0 && (
            <div className="text-green-600 font-medium">
              {product.co2Saved}kg CO₂ Saved
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="mb-4 space-y-1 text-sm text-muted-foreground">
          <div>{product.specs.processor}</div>
          <div>{product.specs.memory} • {product.specs.storage}</div>
          <div>{product.specs.display}</div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{(product.price * 83).toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{(product.originalPrice * 83).toLocaleString()}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-sm font-medium text-green-600">
              Save ₹{((product.originalPrice - product.price) * 83).toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full" 
          disabled={!product.inStock}
          onClick={() => {
            // Add to cart functionality
            alert(`Added ${product.name} to cart!`);
            // In real implementation, this would call an API or update global state
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sustainable Laptop Store</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Choose from our collection of new and refurbished laptops. Every purchase plants a tree and supports environmental sustainability.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">All Categories</option>
                <option value="new">New</option>
                <option value="refurbished">Refurbished</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">All Types</option>
                <option value="business">Business</option>
                <option value="gaming">Gaming</option>
                <option value="ultrabook">Ultrabook</option>
                <option value="workstation">Workstation</option>
                <option value="budget">Budget</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {filteredProducts.length} Products Found
            </h2>
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="bg-accent/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Environmental Impact</h2>
            <p className="text-xl text-muted-foreground">
              Every laptop purchase contributes to a greener future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredProducts.length}
              </div>
              <div className="text-muted-foreground">Trees Will Be Planted</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredProducts.reduce((sum, p) => sum + p.co2Saved, 0)}kg
              </div>
              <div className="text-muted-foreground">CO₂ Emissions Saved</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-2">
                ₹{(filteredProducts.filter(p => p.originalPrice).reduce((sum, p) => sum + (p.originalPrice - p.price), 0) * 83).toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Savings Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorePage

