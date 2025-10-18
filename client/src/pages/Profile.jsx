import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/api'; 
function Profile() {
  const { id } = useParams()
  const [caregiver, setCaregiver] = useState(null)

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        const res = await axios.get(`${API_URL}/caregivers/${id}`);
        setCaregiver(res.data)
      } catch (err) {
        console.error('Error fetching caregiver profile:', err)
      }
    }
    fetchCaregiver()
  }, [id])

  if (!caregiver) return <p className="text-center mt-16">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow mt-8">
      <div className="flex flex-col items-center">
        <img
          src={caregiver.photo || '/default-avatar.png'}
          alt={caregiver.name}
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold mb-2">{caregiver.name}</h1>
        <p className="text-gray-600 mb-4">{caregiver.qualifications}</p>
        <p className="text-gray-700 mb-2"><strong>Availability:</strong> {caregiver.availability}</p>
        <p className="text-gray-700 mb-4"><strong>Hourly Rate:</strong> ${caregiver.hourlyRate}</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default Profile
