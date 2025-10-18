import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from "../../utils/api";


const RegisterCaregiver = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaarNumber: '',
    panNumber: '',
    experience: '',
    education: '',
    specializations: [],
    languages: [],
    availability: '',
    hourlyRate: '',
    bio: '',
    certifications: '',
    references: '',
    password: '',
    profilePhoto: null,
    aadhaarCard: null,
    panCard: null,
    certificates: null
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const totalSteps = 4

  const specializations = [
    'Elderly Care',
    'Dementia Care',
    'Post-Surgery Care',
    'Mobility Assistance',
    'Medication Management',
    'Companionship',
    'Personal Care',
    'Meal Preparation'
  ]

  const languages = ['Hindi', 'English', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'specializations' || name === 'languages') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      
      // Append basic fields
      data.append('fullName', formData.fullName)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('dateOfBirth', formData.dateOfBirth)
      data.append('gender', formData.gender)
      data.append('password', formData.password)
      
      // Append address
      data.append('address', formData.address)
      data.append('city', formData.city)
      data.append('state', formData.state)
      data.append('pincode', formData.pincode)
      
      // Append documents
      data.append('aadhaarNumber', formData.aadhaarNumber)
      data.append('panNumber', formData.panNumber)
      
      // Append professional details
      data.append('experience', formData.experience)
      data.append('education', formData.education)
      data.append('availability', formData.availability)
      data.append('hourlyRate', formData.hourlyRate)
      data.append('bio', formData.bio)
      
      // Append arrays as JSON strings
      data.append('specializations', JSON.stringify(formData.specializations))
      data.append('languages', JSON.stringify(formData.languages))
      
      // Append optional fields
      if (formData.certifications) data.append('certifications', formData.certifications)
      if (formData.references) data.append('references', formData.references)
      
      // Append files
      if (formData.profilePhoto) data.append('profilePhoto', formData.profilePhoto)
      if (formData.aadhaarCard) data.append('aadhaarCard', formData.aadhaarCard)
      if (formData.panCard) data.append('panCard', formData.panCard)
      if (formData.certificates) data.append('certificates', formData.certificates)

      console.log('Submitting registration...')

     const response = await axios.post(`${API_URL}/auth/register/caregiver`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


      console.log('Registration response:', response.data)

      alert(response.data.message || 'Registration submitted successfully! We will verify your documents and contact you soon.')
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } catch (err) {
      console.error('Registration error:', err)
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.'
      setError(errorMessage)
      alert('Error: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    // Validate current step before moving to next
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth || 
          !formData.gender || !formData.address || !formData.city || !formData.state || 
          !formData.pincode || !formData.password) {
        alert('Please fill all required fields in Personal Information')
        return
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address')
        return
      }
      // Validate phone
      if (formData.phone.length !== 10) {
        alert('Please enter a valid 10-digit phone number')
        return
      }
      // Validate pincode
      if (formData.pincode.length !== 6) {
        alert('Please enter a valid 6-digit pincode')
        return
      }
      // Validate password
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long')
        return
      }
    }
    
    if (currentStep === 2) {
      if (!formData.experience || !formData.education || !formData.availability || 
          !formData.hourlyRate || !formData.bio || formData.specializations.length === 0 || 
          formData.languages.length === 0) {
        alert('Please fill all required fields in Professional Details')
        return
      }
      if (formData.bio.length < 50) {
        alert('Bio must be at least 50 characters long')
        return
      }
    }
    
    if (currentStep === 3) {
      if (!formData.aadhaarNumber || !formData.panNumber || !formData.aadhaarCard || !formData.panCard) {
        alert('Please provide Aadhaar number, PAN number and upload both documents')
        return
      }
      // Validate Aadhaar number (12 digits)
      if (formData.aadhaarNumber.length !== 12 || !/^\d+$/.test(formData.aadhaarNumber)) {
        alert('Please enter a valid 12-digit Aadhaar number')
        return
      }
      // Validate PAN number (10 characters - 5 letters, 4 digits, 1 letter)
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      if (!panRegex.test(formData.panNumber.toUpperCase())) {
        alert('Please enter a valid PAN number (e.g., ABCDE1234F)')
        return
      }
    }
    
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Become a Caregiver</h1>
          <p className="text-gray-600">Join our community of trusted caregivers and make a difference</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < totalSteps && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Personal Info</span>
            <span>Professional Details</span>
            <span>Documents</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
              <p className="font-semibold">Registration Error:</p>
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-blue-700">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-3"></div>
                <p>Submitting your application... Please wait.</p>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    minLength="6"
                    placeholder="Create a password (min 6 characters)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input-field"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highest Education *</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Certified Nursing Assistant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="live-in">Live-in</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (₹) *</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="input-field"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Specializations * (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializations.map((spec) => (
                    <label key={spec} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="specializations"
                        value={spec}
                        checked={formData.specializations.includes(spec)}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Languages * (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang) => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="languages"
                        value={lang}
                        checked={formData.languages.includes(lang)}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio / About Yourself *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input-field"
                  rows="5"
                  placeholder="Tell us about your experience, approach to caregiving, and what makes you special..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications (comma separated)</label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., First Aid, CPR, Dementia Care Specialist"
                />
              </div>
            </div>
          )}

          {/* Step 3: Document Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Verification</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <svg className="w-6 h-6 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-yellow-800">Document Verification Required</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      For security purposes, we require Aadhaar and PAN card verification. This helps families trust caregivers and ensures platform safety. All documents are encrypted and kept confidential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength="14"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your 12-digit Aadhaar number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="ABCDE1234F"
                    maxLength="10"
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your 10-character PAN number</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Aadhaar Card *</label>
                  <input
                    type="file"
                    name="aadhaarCard"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="input-field"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload clear photo/PDF (front & back)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload PAN Card *</label>
                  <input
                    type="file"
                    name="panCard"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="input-field"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload clear photo/PDF</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Certificates (Optional)</label>
                <input
                  type="file"
                  name="certificates"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="input-field"
                  multiple
                />
                <p className="text-xs text-gray-500 mt-1">Upload any relevant certifications or training documents</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">References</label>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  placeholder="Provide contact details of 2-3 professional references (name, relation, phone number)"
                ></textarea>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <svg className="w-6 h-6 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-800">Why do we need these documents?</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      Identity verification protects both caregivers and families. It helps prevent fraud, ensures accountability, and builds trust in our community. Your documents are securely encrypted and used only for verification purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                    <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                    <div><span className="text-gray-600">Gender:</span> <span className="font-medium">{formData.gender}</span></div>
                    <div className="col-span-2"><span className="text-gray-600">Address:</span> <span className="font-medium">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</span></div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-3">Professional Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Experience:</span> <span className="font-medium">{formData.experience} years</span></div>
                    <div><span className="text-gray-600">Education:</span> <span className="font-medium">{formData.education}</span></div>
                    <div><span className="text-gray-600">Hourly Rate:</span> <span className="font-medium">₹{formData.hourlyRate}</span></div>
                    <div><span className="text-gray-600">Availability:</span> <span className="font-medium">{formData.availability}</span></div>
                    <div className="col-span-2"><span className="text-gray-600">Specializations:</span> <span className="font-medium">{formData.specializations.join(', ')}</span></div>
                    <div className="col-span-2"><span className="text-gray-600">Languages:</span> <span className="font-medium">{formData.languages.join(', ')}</span></div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-3">Documents</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-600">Aadhaar Number:</span> <span className="font-medium">{formData.aadhaarNumber}</span></div>
                    <div><span className="text-gray-600">PAN Number:</span> <span className="font-medium">{formData.panNumber}</span></div>
                    <div><span className="text-gray-600">Aadhaar Card:</span> <span className="font-medium">{formData.aadhaarCard ? 'Uploaded' : 'Not uploaded'}</span></div>
                    <div><span className="text-gray-600">PAN Card:</span> <span className="font-medium">{formData.panCard ? 'Uploaded' : 'Not uploaded'}</span></div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <svg className="w-6 h-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-green-800">Almost Done!</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Please review all information carefully. Once submitted, our team will verify your documents within 2-3 business days and activate your profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-primary-600 rounded" />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>. I confirm that all information provided is accurate and I consent to background verification checks.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto btn-primary"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterCaregiver