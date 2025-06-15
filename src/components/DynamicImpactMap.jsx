import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from '@/components/ui/button.jsx'
import { MapPin, Filter, Leaf, Zap } from 'lucide-react'

// Fix for default markers in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Indian states data with coordinates and environmental impact
const indianStatesData = [
  {
    id: 1,
    name: "Maharashtra",
    region: "Western India",
    coordinates: [19.7515, 75.7139],
    treesPlanted: 3245,
    laptopsSold: 2156,
    co2Saved: 972.5,
    city: "Mumbai"
  },
  {
    id: 2,
    name: "Karnataka",
    region: "Southern India", 
    coordinates: [15.3173, 75.7139],
    treesPlanted: 2876,
    laptopsSold: 1923,
    co2Saved: 863.2,
    city: "Bangalore"
  },
  {
    id: 3,
    name: "Tamil Nadu",
    region: "Southern India",
    coordinates: [11.1271, 78.6569],
    treesPlanted: 2134,
    laptopsSold: 1456,
    co2Saved: 641.1,
    city: "Chennai"
  },
  {
    id: 4,
    name: "Delhi",
    region: "Northern India",
    coordinates: [28.7041, 77.1025],
    treesPlanted: 1987,
    laptopsSold: 1324,
    co2Saved: 596.1,
    city: "New Delhi"
  },
  {
    id: 5,
    name: "Gujarat",
    region: "Western India",
    coordinates: [23.0225, 72.5714],
    treesPlanted: 1654,
    laptopsSold: 1102,
    co2Saved: 496.2,
    city: "Ahmedabad"
  },
  {
    id: 6,
    name: "Rajasthan",
    region: "Northern India",
    coordinates: [27.0238, 74.2179],
    treesPlanted: 1432,
    laptopsSold: 954,
    co2Saved: 429.6,
    city: "Jaipur"
  },
  {
    id: 7,
    name: "Uttar Pradesh",
    region: "Northern India",
    coordinates: [26.8467, 80.9462],
    treesPlanted: 2987,
    laptopsSold: 1991,
    co2Saved: 896.1,
    city: "Lucknow"
  },
  {
    id: 8,
    name: "West Bengal",
    region: "Eastern India",
    coordinates: [22.9868, 87.8550],
    treesPlanted: 1876,
    laptopsSold: 1251,
    co2Saved: 563.4,
    city: "Kolkata"
  },
  {
    id: 9,
    name: "Telangana",
    region: "Southern India",
    coordinates: [18.1124, 79.0193],
    treesPlanted: 1543,
    laptopsSold: 1029,
    co2Saved: 463.2,
    city: "Hyderabad"
  },
  {
    id: 10,
    name: "Punjab",
    region: "Northern India",
    coordinates: [31.1471, 75.3412],
    treesPlanted: 1234,
    laptopsSold: 823,
    co2Saved: 370.6,
    city: "Chandigarh"
  },
  {
    id: 11,
    name: "Haryana",
    region: "Northern India",
    coordinates: [29.0588, 76.0856],
    treesPlanted: 987,
    laptopsSold: 658,
    co2Saved: 296.1,
    city: "Gurugram"
  },
  {
    id: 12,
    name: "Kerala",
    region: "Southern India",
    coordinates: [10.8505, 76.2711],
    treesPlanted: 1321,
    laptopsSold: 881,
    co2Saved: 396.6,
    city: "Kochi"
  }
]

const DynamicImpactMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [mapData, setMapData] = useState(indianStatesData)
  const [loading, setLoading] = useState(false)

  // Filter regions
  const regions = ['all', 'Northern India', 'Southern India', 'Western India', 'Eastern India']

  // Filter data based on selected region
  const filteredData = selectedRegion === 'all' 
    ? mapData 
    : mapData.filter(location => location.region === selectedRegion)

  // Calculate totals
  const totals = filteredData.reduce((acc, location) => ({
    trees: acc.trees + location.treesPlanted,
    laptops: acc.laptops + location.laptopsSold,
    co2: acc.co2 + location.co2Saved
  }), { trees: 0, laptops: 0, co2: 0 })

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Create map instance
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 256,
      zoomOffset: 0
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers when data changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    filteredData.forEach(location => {
      // Create custom icon based on impact
      const iconSize = Math.min(40, Math.max(20, location.treesPlanted / 100))
      
      const customIcon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border: 3px solid white;
            border-radius: 50%;
            width: ${iconSize}px;
            height: ${iconSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            color: white;
            font-weight: bold;
            font-size: ${Math.max(8, iconSize/4)}px;
          ">
            🌱
          </div>
        `,
        className: 'custom-marker',
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize/2, iconSize/2]
      })

      const marker = L.marker(location.coordinates, { icon: customIcon })
        .bindPopup(`
          <div style="font-family: system-ui; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">
              ${location.name}
            </h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
              ${location.city}, ${location.region}
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 8px 0;">
              <div style="text-align: center; padding: 8px; background: #f0fdf4; border-radius: 6px;">
                <div style="font-size: 18px; font-weight: bold; color: #16a34a;">
                  ${location.treesPlanted.toLocaleString()}
                </div>
                <div style="font-size: 10px; color: #6b7280;">Trees Planted</div>
              </div>
              <div style="text-align: center; padding: 8px; background: #eff6ff; border-radius: 6px;">
                <div style="font-size: 18px; font-weight: bold; color: #2563eb;">
                  ${location.laptopsSold.toLocaleString()}
                </div>
                <div style="font-size: 10px; color: #6b7280;">Laptops Sold</div>
              </div>
            </div>
            <div style="text-align: center; padding: 8px; background: #fefce8; border-radius: 6px; margin-top: 8px;">
              <div style="font-size: 16px; font-weight: bold; color: #ca8a04;">
                ${location.co2Saved.toFixed(1)}t CO₂
              </div>
              <div style="font-size: 10px; color: #6b7280;">Carbon Saved</div>
            </div>
          </div>
        `)
        .addTo(mapInstanceRef.current)

      markersRef.current.push(marker)
    })

    // Fit map to show all markers if there are any
    if (filteredData.length > 0) {
      const group = new L.featureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }
  }, [filteredData])

  // Simulate data refresh from backend
  const refreshData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add some random variation to simulate real data updates
    const updatedData = indianStatesData.map(location => ({
      ...location,
      treesPlanted: location.treesPlanted + Math.floor(Math.random() * 10),
      laptopsSold: location.laptopsSold + Math.floor(Math.random() * 5),
      co2Saved: location.co2Saved + Math.random() * 2
    }))
    
    setMapData(updatedData)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Environmental Impact Map</h1>
            <p className="text-xl opacity-90 mb-6">
              Track our tree planting initiatives and environmental impact across India
            </p>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">{totals.trees.toLocaleString()}</span>
                </div>
                <p className="text-sm opacity-80">Trees Planted</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">{totals.laptops.toLocaleString()}</span>
                </div>
                <p className="text-sm opacity-80">Laptops Sold</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 mr-2" />
                  <span className="text-3xl font-bold">{totals.co2.toFixed(1)}t</span>
                </div>
                <p className="text-sm opacity-80">CO₂ Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          
          <Button 
            onClick={refreshData} 
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            ref={mapRef} 
            className="w-full h-[600px]"
            style={{ background: '#f8f9fa' }}
          />
        </div>

        {/* Map Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Map Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">🌱</div>
              <span className="text-sm">Tree planting locations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <span className="text-sm">High impact (2000+ trees)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Medium impact (1000-2000 trees)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm">Growing impact (&lt;1000 trees)</span>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(location => (
            <div key={location.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{location.name}</h3>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {location.region}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{location.city}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trees Planted</span>
                  <span className="font-semibold text-green-600">{location.treesPlanted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Laptops Sold</span>
                  <span className="font-semibold text-blue-600">{location.laptopsSold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CO₂ Saved</span>
                  <span className="font-semibold text-yellow-600">{location.co2Saved.toFixed(1)}t</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DynamicImpactMap

