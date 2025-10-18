import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Thank you for contacting us! We will get back to you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 
            4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 
            11.042 0 005.516 5.516l1.13-2.257a1 1 0 
            011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 
            2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: '+91 93985 25854',
      link: 'tel:+919398525854'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 
            0L21 8M5 19h14a2 2 0 002-2V7a2 
            2 0 00-2-2H5a2 2 0 00-2 
            2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'machireddyswathi90@gmail.com',
      link: 'mailto:machireddyswathi90@gmail.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 
            20.9a1.998 1.998 0 01-2.827 
            0l-4.244-4.243a8 8 0 
            1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 
            3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      content: 'Vijayawada, Andhra Pradesh, India',
      link: null
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 
            11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Working Hours',
      content: 'Mon - Sun: 24/7 Support',
      link: null
    }
  ]

  const faqs = [
    {
      question: 'How are caregivers verified?',
      answer:
        'All caregivers undergo thorough background checks including Aadhaar and PAN verification, professional reference checks, and skill assessments.'
    },
    {
      question: 'What is the cost of hiring a caregiver?',
      answer:
        'Costs vary based on experience, specialization, and care requirements. Rates typically range from ₹250-500 per hour. You can see exact rates on each caregiver\'s profile.'
    },
    {
      question: 'Can I interview caregivers before hiring?',
      answer:
        'Absolutely! We encourage families to meet and interview caregivers before making a decision. You can contact caregivers directly through our platform.'
    },
    {
      question: 'What if I\'m not satisfied with a caregiver?',
      answer:
        'We offer full support if you need to change caregivers. Contact our support team and we\'ll help you find a better match at no additional cost.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-4 -mt-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                {info.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.link ? (
                <a href={info.link} className="text-gray-600 hover:text-primary-600">
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600">{info.content}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      {/* (your form + map + FAQ remain unchanged below) */}
    </div>
  )
}

export default Contact
