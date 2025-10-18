import { Link } from 'react-router-dom'

const CaregiverCard = ({ caregiver }) => {
  return (
    <div className="card p-6">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <img
          src={caregiver.profilePhoto || 'https://via.placeholder.com/100'}
          alt={caregiver.fullName}
          className="w-20 h-20 rounded-full object-cover"
        />
        
        <div className="flex-1">
          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{caregiver.fullName}</h3>
              <p className="text-sm text-gray-600">{caregiver.experience} years experience</p>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="font-semibold text-gray-900">{caregiver.rating || 0}</span>
              <span className="text-gray-500">({caregiver.reviewCount || 0} reviews)</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{caregiver.address?.city}, {caregiver.address?.state}</span>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-4">
            {caregiver.specializations?.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Bio Preview */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">{caregiver.bio}</p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600">₹{caregiver.hourlyRate}</span>
              <span className="text-gray-500 text-sm">/hour</span>
            </div>
            <Link
              to={`/caregiver/${caregiver._id}`}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Profile
            </Link>
          </div>

          {/* Verification Badge */}
          {caregiver.verificationStatus === 'verified' && (
            <div className="mt-3 flex items-center text-green-600">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Verified Documents</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CaregiverCard