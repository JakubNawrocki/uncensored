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
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/.netlify/functions/sendBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (err) {
      alert('Submission failed. Please check your internet connection.');
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
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
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
            <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {['name', 'email', 'phone', 'date', 'time'].map(field => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-white mb-2 capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'date' || field === 'time' ? field : field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="service" className="block text-white mb-2">Service Type</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} required className="form-input">
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
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
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
