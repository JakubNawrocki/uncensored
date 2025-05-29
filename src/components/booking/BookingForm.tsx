import { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    hours: '2',
    service: 'dry-hire',
    message: '',
    'bot-field': ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot spam trap
    if (formData['bot-field']) return;

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'booking', ...formData })
      });
      setFormSubmitted(true);
    } catch (err) {
      alert('There was a problem with your submission.');
    }
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
            <h2 className="text-white mb-4">Book Your Studio Session</h2>
            <p className="text-gray-400">
              Fill out the form below to request a booking. We'll get back to you within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-secondary p-8 rounded-lg text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white text-2xl mb-4">Booking Request Received!</h3>
              <p className="text-gray-300 mb-6">
                Thanks for your booking request. We'll be in touch within 24 hours.
              </p>
              <button onClick={() => setFormSubmitted(false)} className="cta-button">
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              name="booking"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="bg-secondary p-8 rounded-lg"
            >
              <input type="hidden" name="form-name" value="booking" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" />
                </div>

                <div>
                  <label htmlFor="service" className="block text-white mb-2">Service Type</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} required className="form-input">
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-white mb-2">Preferred Date</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="form-input" />
                </div>

                <div>
                  <label htmlFor="time" className="block text-white mb-2">Preferred Time</label>
                  <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="form-input" />
                </div>

                <div>
                  <label htmlFor="hours" className="block text-white mb-2">Session Length</label>
                  <select id="hours" name="hours" value={formData.hours} onChange={handleChange} required className="form-input">
                    {hours.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-white mb-2">Additional Information</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="form-input" />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="cta-button">Submit Booking Request</button>
              </div>
            </form>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-2">For urgent bookings, contact us directly:</p>
            <a href="tel:+4407985121414" className="text-primary hover:text-white">+44 07985 121414</a>
            <span className="text-gray-600 mx-2">|</span>
            <a href="mailto:info@uncensoredstudios.co.uk" className="text-primary hover:text-white">bookings@uncensoredstudios.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
