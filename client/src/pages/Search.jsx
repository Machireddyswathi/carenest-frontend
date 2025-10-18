import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CaregiverCard from '../components/CaregiverCard'
import { API_URL } from '../utils/api'; 
function Search() {
  const [caregivers, setCaregivers] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Fetch all caregivers on mount
    const fetchCaregivers = async () => {
      try {
        const res = await axios.get(`${API_URL}/caregivers`);
        setCaregivers(res.data)
      } catch (err) {
        console.error('Error fetching caregivers:', err)
      }
    }
    fetchCaregivers()
  }, [])

  const filtered = caregivers.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Find a Caregiver</h1>

      <input
        type="text"
        placeholder="Search caregivers by name or skill..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => (
            <CaregiverCard key={c._id} caregiver={c} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No caregivers found.</p>
      )}
    </div>
  )
}

export default Search
