import React, { useState } from 'react'
import { MapPin, Filter, Leaf, Laptop, TrendingUp } from 'lucide-react'

// Indian states data with coordinates and environmental impact
const indianStatesData = [
  {
    id: 1,
    name: "Maharashtra",
    city: "Mumbai",
    lat: 19.7515,
    lng: 75.7139,
    treesPlanted: 2847,
    laptopsSold: 2156,
    co2Saved: 647.1,
    region: "Western India"
  },
  {
    id: 2,
    name: "Karnataka",
    city: "Bangalore",
    lat: 15.3173,
    lng: 75.7139,
    treesPlanted: 2234,
    laptopsSold: 1987,
    co2Saved: 596.1,
    region: "Southern India"
  },
  {
    id: 3,
    name: "Tamil Nadu",
    city: "Chennai",
    lat: 11.1271,
    lng: 78.6569,
    treesPlanted: 1876,
    laptopsSold: 1654,
    co2Saved: 496.2,
    region: "Southern India"
  },
  {
    id: 4,
    name: "Gujarat",
    city: "Ahmedabad",
    lat: 22.2587,
    lng: 71.1924,
    treesPlanted: 1543,
    laptopsSold: 1398,
    co2Saved: 419.4,
    region: "Western India"
  },
  {
    id: 5,
    name: "Rajasthan",
    city: "Jaipur",
    lat: 27.0238,
    lng: 74.2179,
    treesPlanted: 1234,
    laptopsSold: 1087,
    co2Saved: 326.1,
    region: "Northern India"
  },
  {
    id: 6,
    name: "Uttar Pradesh",
    city: "Lucknow",
    lat: 26.8467,
    lng: 80.9462,
    treesPlanted: 1987,
    laptopsSold: 1765,
    co2Saved: 529.5,
    region: "Northern India"
  },
  {
    id: 7,
    name: "West Bengal",
    city: "Kolkata",
    lat: 22.9868,
    lng: 87.8550,
    treesPlanted: 1456,
    laptopsSold: 1298,
    co2Saved: 389.4,
    region: "Eastern India"
  },
  {
    id: 8,
    name: "Madhya Pradesh",
    city: "Bhopal",
    lat: 22.9734,
    lng: 78.6569,
    treesPlanted: 1123,
    laptopsSold: 987,
    co2Saved: 296.1,
    region: "Central India"
  },
  {
    id: 9,
    name: "Telangana",
    city: "Hyderabad",
    lat: 18.1124,
    lng: 79.0193,
    treesPlanted: 1678,
    laptopsSold: 1456,
    co2Saved: 436.8,
    region: "Southern India"
  },
  {
    id: 10,
    name: "Kerala",
    city: "Kochi",
    lat: 10.8505,
    lng: 76.2711,
    treesPlanted: 987,
    laptopsSold: 876,
    co2Saved: 262.8,
    region: "Southern India"
  },
  {
    id: 11,
    name: "Punjab",
    city: "Chandigarh",
    lat: 31.1471,
    lng: 75.3412,
    treesPlanted: 876,
    laptopsSold: 765,
    co2Saved: 229.5,
    region: "Northern India"
  },
  {
    id: 12,
    name: "Delhi",
    city: "New Delhi",
    lat: 28.7041,
    lng: 77.1025,
    treesPlanted: 2345,
    laptopsSold: 2098,
    co2Saved: 629.4,
    region: "Northern India"
  }
]

const ImpactMap = () => {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState(null)

  const regions = [
    'all',
    'Northern India',
    'Southern India', 
    'Western India',
    'Eastern India',
    'Central India'
  ]

  const filteredLocations = selectedRegion === 'all' 
    ? indianStatesData 
    : indianStatesData.filter(location => location.region === selectedRegion)

  const totalStats = filteredLocations.reduce((acc, location) => ({
    trees: acc.trees + location.treesPlanted,
    laptops: acc.laptops + location.laptopsSold,
    co2: acc.co2 + location.co2Saved
  }), { trees: 0, laptops: 0, co2: 0 })

  // Calculate map bounds for India
  const mapBounds = {
    north: 37,
    south: 6,
    east: 97,
    west: 68
  }

  // Convert lat/lng to pixel coordinates for the map
  const getPixelPosition = (lat, lng) => {
    const mapWidth = 800
    const mapHeight = 600
    
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * mapWidth
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * mapHeight
    
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Environmental Impact Map</h1>
          <p className="text-xl opacity-90">
            Track our reforestation efforts and environmental impact across India
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-accent/30 rounded-2xl">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {totalStats.trees.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Trees Planted in India</div>
            </div>
            
            <div className="text-center p-6 bg-accent/30 rounded-2xl">
              <Laptop className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {totalStats.laptops.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Laptops Sold</div>
            </div>
            
            <div className="text-center p-6 bg-accent/30 rounded-2xl">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">
                {totalStats.co2.toFixed(1)}t
              </div>
              <div className="text-muted-foreground">CO₂ Emissions Saved</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Region
                    </label>
                    <select 
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>
                          {region === 'all' ? 'All Regions' : region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active States:</span>
                      <span className="font-medium">{filteredLocations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trees This Month:</span>
                      <span className="font-medium text-primary">+{Math.floor(totalStats.trees * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth Rate:</span>
                      <span className="font-medium text-green-600">+12.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold text-foreground flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-primary" />
                    India Impact Visualization
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Click on any state to see detailed impact data
                  </p>
                </div>
                
                {/* Google Maps-style Map Container */}
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-96 md:h-[600px] overflow-hidden">
                  {/* Map Background - India outline */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100">
                    {/* Simulated India map background */}
                    <svg 
                      viewBox="0 0 800 600" 
                      className="w-full h-full opacity-20"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                    >
                      {/* Simplified India outline */}
                      <path 
                        d="M200 100 L600 120 L650 200 L620 350 L580 450 L500 500 L400 480 L300 450 L250 400 L200 350 L180 250 Z" 
                        fill="rgba(34, 197, 94, 0.1)" 
                        stroke="rgba(34, 197, 94, 0.3)" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* State Markers */}
                  {filteredLocations.map(location => {
                    const position = getPixelPosition(location.lat, location.lng)
                    const isSelected = selectedLocation?.id === location.id
                    
                    return (
                      <div
                        key={location.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                          isSelected ? 'z-20 scale-125' : 'z-10'
                        }`}
                        style={{ 
                          left: `${(position.x / 800) * 100}%`, 
                          top: `${(position.y / 600) * 100}%` 
                        }}
                        onClick={() => setSelectedLocation(location)}
                      >
                        {/* Pin Shadow */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
                        
                        {/* Pin */}
                        <div className={`relative w-8 h-8 rounded-full border-3 border-white shadow-lg transition-all duration-300 ${
                          isSelected 
                            ? 'bg-red-500 animate-bounce' 
                            : 'bg-primary hover:bg-primary/80'
                        }`}>
                          <div className="absolute inset-1 rounded-full bg-white/30"></div>
                          <Leaf className="absolute inset-1 text-white" size={16} />
                        </div>
                        
                        {/* Pin Stem */}
                        <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-3 ${
                          isSelected ? 'bg-red-500' : 'bg-primary'
                        } rounded-b-full`}></div>

                        {/* Tooltip */}
                        {isSelected && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl border min-w-64 z-30">
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t rotate-45"></div>
                            <h4 className="font-semibold text-foreground mb-2">{location.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{location.city}, {location.region}</p>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Trees Planted:</span>
                                <span className="font-medium text-primary">{location.treesPlanted.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Laptops Sold:</span>
                                <span className="font-medium">{location.laptopsSold.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">CO₂ Saved:</span>
                                <span className="font-medium text-green-600">{location.co2Saved}t</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Map Controls (Google Maps style) */}
                  <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border">
                    <div className="p-2 space-y-1">
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600 font-bold">+</button>
                      <div className="border-t border-gray-200"></div>
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600 font-bold">−</button>
                    </div>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                    <h5 className="font-semibold text-sm text-foreground mb-2">Legend</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Active State</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-muted-foreground">Selected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImpactMap

