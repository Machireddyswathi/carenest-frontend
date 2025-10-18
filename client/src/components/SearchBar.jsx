import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [specialization, setSpecialization] = useState('')

  const specializations = [
    'All Specializations',
    'Elderly Care',
    'Dementia Care',
    'Post-Surgery Care',
    'Mobility Assistance',
    'Medication Management',
    'Companionship',
    'Personal Care',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ searchTerm, location, specialization })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Name or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Location Input */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="City or area..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Specialization Dropdown */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="input-field"
            >
              {specializations.map((spec, index) => (
                <option key={index} value={spec === 'All Specializations' ? '' : spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar