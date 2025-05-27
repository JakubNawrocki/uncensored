import { useState } from 'react';

// Builder.io compatible component structure
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    hours: '2',
    service: 'dry-hire',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };
  
  const services = [
    { id: 'dry-hire', name: 'Dry Hire (Studio Only)' },
    { id: 'engineer', name: 'Studio with Engineer' },
    { id: 'producer', name: 'Full Production' },
    { id: 'mixing', name: 'Mixing & Mastering' }
  ];
  
  const hours = [
    { value: '2', label: '2 hours (minimum)' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '6', label: '6 hours' },
    { value: '8', label: '8 hours (full day)' }
  ];

  return (
    <section className="section-padding bg-black" data-builder-component="booking-form">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12" data-builder-block="header">
            <h2 className="text-white mb-4" data-builder-text="title">Book Your Studio Session</h2>
            <p className="text-gray-400" data-builder-text="subtitle">
              Fill out the form below to request a booking. We'll get back to you within 24 hours to confirm availability.
            </p>
          </div>
          
          {formSubmitted ? (
            <div className="bg-secondary p-8 rounded-lg shadow-white-md text-center" data-builder-block="success-message">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white text-2xl mb-4">Booking Request Received!</h3>
              <p className="text-gray-300 mb-6">
                Thanks for your booking request. We'll be in touch within 24 hours to confirm your session details and finalize your booking.
              </p>
              <button 
                onClick={() => setFormSubmitted(false)} 
                className="cta-button"
                data-builder-button="reset"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="bg-secondary p-8 rounded-lg shadow-white-md"
              data-builder-block="booking-form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div data-builder-block="form-field">
                  <label htmlFor="name" className="block text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-input="name"
                  />
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-input="email"
                  />
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-input="phone"
                  />
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="service" className="block text-white mb-2">Service Type</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-select="service"
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="date" className="block text-white mb-2">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-input="date"
                  />
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="time" className="block text-white mb-2">Preferred Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-input="time"
                  />
                </div>
                
                <div data-builder-block="form-field">
                  <label htmlFor="hours" className="block text-white mb-2">Session Length</label>
                  <select
                    id="hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    required
                    className="form-input"
                    data-builder-select="hours"
                  >
                    {hours.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6" data-builder-block="form-field">
                <label htmlFor="message" className="block text-white mb-2">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input"
                  placeholder="Tell us about your project, specific equipment needs, or any questions you have."
                  data-builder-textarea="message"
                ></textarea>
              </div>
              
              <div className="flex justify-center" data-builder-block="submit-button">
                <button type="submit" className="cta-button shadow-white-md" data-builder-button="submit">
                  Submit Booking Request
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-12 text-center" data-builder-block="contact-info">
            <p className="text-gray-400 mb-2">
              For urgent bookings or inquiries, contact us directly:
            </p>
            <a href="tel:+442012345678" className="text-primary hover:text-white transition-colors">
              +44 20 1234 5678
            </a>
            <span className="text-gray-600 mx-2">|</span>
            <a href="mailto:bookings@uncensoredstudios.com" className="text-primary hover:text-white transition-colors">
              bookings@uncensoredstudios.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
