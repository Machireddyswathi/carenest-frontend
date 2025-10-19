import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../utils/api";

const RegisterSenior = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    guardianName: '',
    email: '',
    phone: '',
    relationship: '',
    seniorName: '',
    seniorAge: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    careType: '',
    medicalConditions: '',
    specialNeeds: '',
    preferredGender: '',
    startDate: '',
    budget: '',
    additionalInfo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSend = {
        ...formData,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      };

      const response = await axios.post(`${API_URL}/auth/register/senior`, dataToSend);

      if (response.data.success) {
        setShowSuccess(true);

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/login'); // ✅ Correct React Router navigation
        }, 3000);
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
          {showSuccess && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50">
            <h3 className="text-xl font-bold">✅ Registration Successful!</h3>
            <p>Your profile is under review. You'll be notified within 24-48 hours.</p>
            <p className="text-sm mt-2">Redirecting to login...</p>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Care for Your Loved One</h1>
          <p className="text-gray-600">Tell us about your care needs and we'll help you find the perfect caregiver</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Your Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Full Name *</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship to Senior *</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Relationship</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="relative">Other Relative</option>
                  <option value="self">Self</option>
                </select>
              </div>
            </div>
          </div>

          {/* Senior Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Senior Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senior's Name *</label>
                <input
                  type="text"
                  name="seniorName"
                  value={formData.seniorName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="seniorAge"
                  value={formData.seniorAge}
                  onChange={handleChange}
                  className="input-field"
                  min="50"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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

          {/* Care Requirements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Care Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Care Needed *</label>
                <select
                  name="careType"
                  value={formData.careType}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Care Type</option>
                  <option value="full-time">Full-time Care</option>
                  <option value="part-time">Part-time Care</option>
                  <option value="live-in">Live-in Care</option>
                  <option value="respite">Respite Care</option>
                  <option value="overnight">Overnight Care</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Caregiver Gender</label>
                <select
                  name="preferredGender"
                  value={formData.preferredGender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">No Preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹ per hour) *</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  placeholder="e.g., 300"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions *</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="Please list any medical conditions, allergies, or medications..."
                required
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Requirements</label>
              <textarea
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                className="input-field"
                rows="3"
                placeholder="Mobility assistance, dementia care, dietary restrictions, etc..."
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="input-field"
                rows="4"
                placeholder="Any other information that would help us find the right caregiver..."
              >              </textarea>
            </div>
          </div>

          {/* Password Field */}
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

          {/* Terms and Submit */}
          <div className="pt-6 border-t">
            <div className="flex items-start space-x-3 mb-6">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 text-primary-600 rounded" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>. I understand that all caregivers are verified with Aadhaar and PAN for security purposes.
              </label>
            </div>

            <button type="submit" className="w-full btn-primary text-lg" disabled={loading}>
              {loading ? 'Submitting...' : 'Find Caregivers'}
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Verified Caregivers</h3>
            <p className="text-sm text-gray-600">All caregivers undergo thorough background checks</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-gray-600">Get matched with caregivers within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Our team is always here to help you</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterSenior