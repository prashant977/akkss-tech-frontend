import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Leaf, Laptop, MapPin, ShoppingCart, User, Menu, X } from 'lucide-react'
import heroLaptop from './assets/hero-laptop.png'
import treeIcon from './assets/tree-icon.png'
import akkssLogo from './assets/akkss-logo-cropped.png'
import ImpactMap from './components/ImpactMap.jsx'
import DynamicImpactMap from './components/DynamicImpactMap.jsx'
import StorePage from './components/StorePage.jsx'
import LoginPage from './components/LoginPage.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import CartPage from './components/CartPage.jsx'
import './App.css'

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={akkssLogo} alt="AKKSS Tech" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/impact" 
              className={`transition-colors ${isActive('/impact') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Impact Map
            </Link>
            <Link 
              to="/store" 
              className={`transition-colors ${isActive('/store') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Store
            </Link>
            <Link 
              to="/cart" 
              className={`transition-colors ${isActive('/cart') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'} flex items-center`}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Cart
            </Link>
            <Link 
              to="/login" 
              className={`transition-colors ${isActive('/login') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-border">
              <Link to="/" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/impact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Impact Map</Link>
              <Link to="/store" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Store</Link>
              <Link to="/cart" className="block px-3 py-2 text-foreground hover:text-primary transition-colors flex items-center">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Cart
              </Link>
              <Link to="/login" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Sustainable
                  <span className="text-primary block">Technology</span>
                  for a Greener Future
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Every laptop you buy plants a tree. Join our mission to reduce e-waste and create a sustainable digital world.
                </p>
              </div>

              {/* Tree Planting Stats */}
              <div className="flex items-center space-x-6 p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
                <div className="floating-element">
                  <img src={treeIcon} alt="Tree" className="h-12 w-12 tree-animation" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">12,847</div>
                  <div className="text-sm text-muted-foreground">Trees Planted</div>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div>
                  <div className="text-2xl font-bold text-primary">8,234</div>
                  <div className="text-sm text-muted-foreground">Laptops Sold</div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/store?category=new">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Laptop className="mr-2 h-5 w-5" />
                    I want to buy new
                  </Button>
                </Link>
                <Link to="/store?category=refurbished">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Leaf className="mr-2 h-5 w-5" />
                    I want to buy refurbished
                  </Button>
                </Link>
              </div>

              {/* Environmental Impact */}
              <div className="text-sm text-muted-foreground">
                <p>🌱 By choosing refurbished, you save <span className="font-semibold text-primary">300kg CO₂</span> per laptop</p>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="floating-element">
                <img 
                  src={heroLaptop} 
                  alt="Sustainable Laptop" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg floating-element">
                <Leaf className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg floating-element" style={{animationDelay: '2s'}}>
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AKKSS Tech?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just selling laptops - we're building a sustainable future, one device at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-accent/50 hover:bg-accent transition-colors duration-300">
              <div className="bg-primary text-primary-foreground p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">One Laptop, One Tree</h3>
              <p className="text-muted-foreground">
                For every laptop purchased, we plant a tree in partnership with global reforestation organizations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-accent/50 hover:bg-accent transition-colors duration-300">
              <div className="bg-primary text-primary-foreground p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Your Impact</h3>
              <p className="text-muted-foreground">
                See exactly where your tree was planted and track the environmental impact of your purchase.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-accent/50 hover:bg-accent transition-colors duration-300">
              <div className="bg-primary text-primary-foreground p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Laptop className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All our laptops, new and refurbished, come with comprehensive warranties and quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Store Page Placeholder
const StorePageWrapper = () => {
  return <StorePage />
}

// Login Page Placeholder
const LoginPageWrapper = () => {
  return <LoginPage />
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AKKSS Tech</span>
            </div>
            <p className="text-sm opacity-80">
              Sustainable technology for a greener future. Every purchase makes a difference.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/store?category=new" className="hover:text-primary transition-colors">New Laptops</Link></li>
              <li><Link to="/store?category=refurbished" className="hover:text-primary transition-colors">Refurbished Laptops</Link></li>
              <li><Link to="/store?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Impact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/impact" className="hover:text-primary transition-colors">Tree Planting</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Carbon Footprint</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Sustainability Report</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 AKKSS Tech. All rights reserved. Building a sustainable future, one laptop at a time.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impact" element={<DynamicImpactMap />} />
          <Route path="/store" element={<StorePageWrapper />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

