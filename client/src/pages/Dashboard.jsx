import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import { API_URL } from "../utils/api"; 
import { API_URL } from "../../utils/api";

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      const storedUserType = localStorage.getItem('userType')
      
      if (!token) {
        alert('Please login to access dashboard')
        navigate('/login')
        return
      }

      setUserType(storedUserType)

     try {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

        const user = response.data.user
        
        setUserData({
          name: user.fullName || user.guardianName,
          email: user.email,
          totalBookings: user.totalBookings || 0,
          totalHours: user.totalHoursWorked || 0,
          earnings: (user.totalHoursWorked || 0) * (user.hourlyRate || 0),
          rating: user.rating || 0,
          reviews: user.reviewCount || 0
        })
      } catch (error) {
        console.error('Error:', error)
        if (error.response?.status === 401) {
          localStorage.clear()
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  // Button handlers
  const handleLogout = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear()
      navigate('/login')
    }
  }

  const handleFindCaregivers = (e) => {
    e.preventDefault()
    navigate('/caregivers')
  }

  const handleEditProfile = (e) => {
    e.preventDefault()
    navigate('/register-caregiver')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load dashboard</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-600">
              {userType === 'caregiver' ? 'Manage your profile and bookings' : 'Find and book caregivers'}
            </p>
          </div>
          <div className="flex gap-3">
            {userType === 'family' && (
              <button 
                onClick={handleFindCaregivers}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
              >
                Find Caregivers
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <h3 className="text-gray-600 font-medium mb-2">Total Bookings</h3>
            <div className="text-3xl font-bold text-gray-900">{userData.totalBookings}</div>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-600 font-medium mb-2">Hours Worked</h3>
            <div className="text-3xl font-bold text-gray-900">{userData.totalHours}</div>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-600 font-medium mb-2">Total Earnings</h3>
            <div className="text-3xl font-bold text-gray-900">₹{userData.earnings}</div>
          </div>
          <div className="card p-6">
            <h3 className="text-gray-600 font-medium mb-2">Rating</h3>
            <div className="text-3xl font-bold text-gray-900">{userData.rating}/5</div>
            <p className="text-sm text-gray-600 mt-1">{userData.reviews} reviews</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button 
                onClick={() => handleTabChange('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview' 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => handleTabChange('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'bookings' 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Bookings
              </button>
              <button 
                onClick={() => handleTabChange('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'earnings' 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Earnings
              </button>
              <button 
                onClick={() => handleTabChange('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'settings' 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {userType === 'family' ? (
                <div className="space-y-6">
                  <div className="card p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Find Perfect Care for Your Loved Ones
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Browse verified caregivers and book the best match
                    </p>
                    <button 
                      onClick={handleFindCaregivers}
                      className="btn-primary text-lg px-8 py-4 inline-flex items-center"
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse Caregivers
                    </button>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">Your Bookings</h3>
                    <p className="text-gray-600 mb-4">You haven't booked any caregivers yet.</p>
                    <button 
                      onClick={handleFindCaregivers}
                      className="btn-primary"
                    >
                      Book Your First Caregiver
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Bookings</h2>
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600">No upcoming bookings</p>
                        <p className="text-sm text-gray-500 mt-2">Bookings from families will appear here</p>
                      </div>
                    </div>
                    <div className="card p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
                      <div className="text-center py-8">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <p className="text-gray-600">No reviews yet</p>
                        <p className="text-sm text-gray-500 mt-2">Complete bookings to receive reviews</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="card p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button 
                          onClick={handleEditProfile}
                          className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-left flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Profile
                        </button>
                        <button 
                          onClick={() => handleTabChange('earnings')}
                          className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          View Earnings
                        </button>
                        <button 
                          onClick={() => handleTabChange('settings')}
                          className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Bookings</h2>
              {userType === 'family' ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-6">No bookings yet. Start by finding a caregiver.</p>
                  <button 
                    onClick={handleFindCaregivers}
                    className="btn-primary inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Caregivers
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No bookings yet. Families will book you soon!</p>
                </div>
              )}
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Earnings & Payouts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-sm text-green-600 font-medium mb-2">Total Earned</h3>
                  <p className="text-3xl font-bold text-green-700">₹{userData.earnings}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-sm text-blue-600 font-medium mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-blue-700">₹0</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-sm text-purple-600 font-medium mb-2">Pending</h3>
                  <p className="text-3xl font-bold text-purple-700">₹0</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
              <div className="space-y-4">
                <button 
                  onClick={handleEditProfile}
                  className="w-full text-left px-6 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <h3 className="font-semibold text-red-600 mb-1">Logout</h3>
                  <p className="text-sm text-red-500">Sign out of your account</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard