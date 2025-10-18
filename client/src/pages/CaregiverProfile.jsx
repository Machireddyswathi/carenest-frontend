import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const CaregiverProfile = () => {
  const { id } = useParams()
  
  // Sample data (replace with API call)
  const caregiver = {
    id: 1,
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    experience: 5,
    rating: 4.8,
    reviews: 42,
    location: 'Mumbai, Maharashtra',
    specializations: ['Elderly Care', 'Dementia Care', 'Medication Management'],
    bio: 'I am a dedicated and compassionate caregiver with 5 years of experience in providing personalized care to seniors. My approach focuses on maintaining dignity, independence, and quality of life for those I care for. I have specialized training in dementia care and understand the unique challenges families face.',
    hourlyRate: 300,
    verified: true,
    languages: ['Hindi', 'English', 'Marathi'],
    availability: 'Full-time',
    education: 'Certified Nursing Assistant (CNA)',
    certifications: ['First Aid & CPR', 'Dementia Care Specialist', 'Medication Management'],
    services: [
      'Personal Care & Hygiene',
      'Medication Reminders',
      'Meal Preparation',
      'Light Housekeeping',
      'Companionship',
      'Transportation',
      'Dementia Care',
      'Mobility Assistance'
    ]
  }

  const reviewsData = [
    {
      id: 1,
      author: 'Amit Gupta',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Priya has been taking care of my mother for the past 6 months. She is professional, caring, and always goes the extra mile. My mother feels comfortable and happy with her.'
    },
    {
      id: 2,
      author: 'Neha Verma',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent caregiver! Very patient with my father who has dementia. Highly recommended!'
    },
    {
      id: 3,
      author: 'Rahul Joshi',
      rating: 4,
      date: '2 months ago',
      comment: 'Very reliable and trustworthy. Good communication with family members about daily activities.'
    }
  ]

  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/caregivers" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Caregivers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="card p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-1">{caregiver.name}</h1>
                      <p className="text-gray-600">{caregiver.education}</p>
                    </div>
                    {caregiver.verified && (
                      <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="ml-1 font-semibold">{caregiver.rating}</span>
                      <span className="ml-1 text-gray-500">({caregiver.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {caregiver.experience} years experience
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {caregiver.location}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {caregiver.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{caregiver.bio}</p>
            </div>

            {/* Services Offered */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {caregiver.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>
              <div className="space-y-2">
                {caregiver.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews ({caregiver.reviews})</h2>
              <div className="space-y-6">
                {reviewsData.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.author}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Pricing Card */}
              <div className="card p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-primary-600">₹{caregiver.hourlyRate}</div>
                  <div className="text-gray-600">per hour</div>
                </div>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full btn-primary mb-3"
                >
                  Contact Caregiver
                </button>
                <button className="w-full btn-secondary">
                  Save Profile
                </button>
              </div>

              {/* Quick Info Card */}
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Languages</div>
                    <div className="font-medium text-gray-900">{caregiver.languages.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Availability</div>
                    <div className="font-medium text-gray-900">{caregiver.availability}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Experience</div>
                    <div className="font-medium text-gray-900">{caregiver.experience} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Response Time</div>
                    <div className="font-medium text-gray-900">Within 2 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Contact {caregiver.name}</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input type="text" className="input-field" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="input-field" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="input-field" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea className="input-field" rows="4" placeholder="Tell us about your care needs..."></textarea>
              </div>
              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CaregiverProfile