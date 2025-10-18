import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import CaregiverCard from '../components/CaregiverCard'
import { API_URL } from "../../utils/api";

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState([])
  const [filteredCaregivers, setFilteredCaregivers] = useState([])
  const [sortBy, setSortBy] = useState('rating')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await axios.get(`${API_URL}/caregivers`);
        
        if (response.data.data && response.data.data.length > 0) {
          setCaregivers(response.data.data)
          setFilteredCaregivers(response.data.data)
        } else {
          // No caregivers found
          setCaregivers([])
          setFilteredCaregivers([])
        }
      } catch (err) {
        console.error('Error fetching caregivers:', err)
        setError('Unable to load caregivers. Please try again later.')
        setCaregivers([])
        setFilteredCaregivers([])
      } finally {
        setLoading(false)
      }
    }

    fetchCaregivers()
  }, [])

  const handleSearch = (filters) => {
    let results = caregivers

    if (filters.searchTerm) {
      results = results.filter(caregiver =>
        caregiver.fullName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        caregiver.bio.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    if (filters.location) {
      results = results.filter(caregiver =>
        caregiver.address.city.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.specialization) {
      results = results.filter(caregiver =>
        caregiver.specializations.includes(filters.specialization)
      )
    }

    setFilteredCaregivers(results)
  }

  const handleSort = (value) => {
    setSortBy(value)
    let sorted = [...filteredCaregivers]

    switch(value) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'experience':
        sorted.sort((a, b) => b.experience - a.experience)
        break
      case 'price-low':
        sorted.sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case 'price-high':
        sorted.sort((a, b) => b.hourlyRate - a.hourlyRate)
        break
      default:
        break
    }

    setFilteredCaregivers(sorted)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading caregivers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Caregiver</h1>
          <p className="text-primary-100 text-lg">Browse through our verified caregivers and find the right match for your needs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredCaregivers.length} Caregivers Available
            </h2>
            <p className="text-gray-600">All caregivers are verified with Aadhaar and PAN</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <label className="text-sm font-medium text-gray-700 mr-3">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Caregiver Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCaregivers.length > 0 ? (
            filteredCaregivers.map((caregiver) => (
              <CaregiverCard key={caregiver.id} caregiver={caregiver} />
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No caregivers found</h3>
              <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CaregiverList