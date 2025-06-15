import React, { useState } from 'react'
import { User, Lock, Mail, Eye, EyeOff, Leaf, MapPin, Calendar, Package } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  // Mock user data for demonstration
  const mockUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "March 2024",
    purchases: [
      {
        id: 1,
        product: "EcoBook Pro 15",
        date: "2024-05-15",
        price: 1299,
        treePlanted: {
          location: "Amazon Rainforest, Brazil",
          coordinates: "-3.4653, -62.2159",
          plantedDate: "2024-05-20",
          species: "Brazil Nut Tree"
        }
      },
      {
        id: 2,
        product: "ThinkGreen X1 Carbon",
        date: "2024-03-10",
        price: 899,
        treePlanted: {
          location: "Sahara Desert Edge, Morocco",
          coordinates: "31.7917, -7.0926",
          plantedDate: "2024-03-15",
          species: "Argan Tree"
        }
      }
    ],
    totalTreesPlanted: 2,
    totalCO2Saved: 600,
    totalSpent: 2198
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock authentication - in real app, this would call an API
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFormData({ email: '', password: '', name: '' })
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-background pt-16">
        {/* Dashboard Header */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {mockUserData.name}!</h1>
                <p className="text-xl opacity-90">Track your environmental impact and purchase history</p>
              </div>
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-accent/30 rounded-2xl">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{mockUserData.totalTreesPlanted}</div>
                <div className="text-muted-foreground">Trees Planted</div>
              </div>
              
              <div className="text-center p-6 bg-accent/30 rounded-2xl">
                <div className="text-3xl font-bold text-primary mb-2">{mockUserData.totalCO2Saved}kg</div>
                <div className="text-muted-foreground">CO₂ Saved</div>
              </div>
              
              <div className="text-center p-6 bg-accent/30 rounded-2xl">
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{mockUserData.purchases.length}</div>
                <div className="text-muted-foreground">Purchases</div>
              </div>
              
              <div className="text-center p-6 bg-accent/30 rounded-2xl">
                <div className="text-3xl font-bold text-primary mb-2">₹{(mockUserData.totalSpent * 83).toLocaleString()}</div>
                <div className="text-muted-foreground">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Your Purchase History</h2>
            
            <div className="space-y-6">
              {mockUserData.purchases.map(purchase => (
                <div key={purchase.id} className="bg-white p-6 rounded-2xl shadow-sm border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Purchase Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{purchase.product}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Purchased on {new Date(purchase.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">₹{(purchase.price * 83).toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Tree Planting Info */}
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Leaf className="h-5 w-5 mr-2" />
                        Your Tree Planted
                      </h4>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{purchase.treePlanted.location}</div>
                            <div className="text-xs opacity-75">{purchase.treePlanted.coordinates}</div>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Species:</span> {purchase.treePlanted.species}
                        </div>
                        <div>
                          <span className="font-medium">Planted:</span> {new Date(purchase.treePlanted.plantedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      >
                        View on Map
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environmental Impact Summary */}
        <div className="bg-accent/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your Environmental Impact</h2>
              <p className="text-xl text-muted-foreground">
                Thank you for contributing to a greener future!
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌳</div>
                  <h3 className="text-xl font-semibold mb-2">Trees Growing</h3>
                  <p className="text-muted-foreground">
                    Your {mockUserData.totalTreesPlanted} trees will absorb approximately{' '}
                    <span className="font-semibold text-primary">
                      {(mockUserData.totalTreesPlanted * 22).toLocaleString()}kg of CO₂
                    </span>{' '}
                    over their lifetime.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">♻️</div>
                  <h3 className="text-xl font-semibold mb-2">E-Waste Reduced</h3>
                  <p className="text-muted-foreground">
                    By choosing refurbished laptops, you've prevented{' '}
                    <span className="font-semibold text-primary">{mockUserData.totalCO2Saved}kg of CO₂</span>{' '}
                    emissions and reduced electronic waste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? 'Welcome back' : 'Join AKKSS Tech'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isLogin 
                ? 'Sign in to track your environmental impact' 
                : 'Create an account to start making a difference'
              }
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full py-3 text-lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </form>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo:</strong> Use any email and password to sign in and explore the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

