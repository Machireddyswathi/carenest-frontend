import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Verified Caregivers',
      description: 'All caregivers undergo thorough background checks including Aadhaar and PAN verification for your peace of mind.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock assistance available to help you find the perfect caregiver match whenever you need it.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Personalized Matching',
      description: 'Find the perfect caregiver based on specific needs, location, experience, and specialization.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees. Compare rates and choose what fits your budget.'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up as a family member or senior looking for care services.'
    },
    {
      number: '02',
      title: 'Browse Caregivers',
      description: 'Search through our verified caregiver profiles and read reviews.'
    },
    {
      number: '03',
      title: 'Connect & Schedule',
      description: 'Reach out to caregivers and schedule care according to your needs.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Compassionate Care for Your <span className="text-primary-600">Loved Ones</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with verified, experienced caregivers who provide professional and compassionate care for seniors in the comfort of their homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/caregivers" className="btn-primary text-center">
                  Find a Caregiver
                </Link>
                <Link to="/register-caregiver" className="btn-secondary text-center">
                  Become a Caregiver
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-gray-600">Verified Caregivers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">1000+</div>
                  <div className="text-gray-600">Happy Families</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">4.8/5</div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600"
                alt="Caregiver with senior"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CareNest?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a safe, reliable platform to connect families with qualified caregivers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Getting started is simple and straightforward</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card p-8 text-center">
                  <div className="text-6xl font-bold text-primary-100 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust CareNest to find compassionate, reliable care for their loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register-senior" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Find Care Now
            </Link>
            <Link to="/register-caregiver" className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors">
              Become a Caregiver
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home