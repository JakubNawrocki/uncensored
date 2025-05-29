// components/EnhancedBookingForm.tsx
import { useState, useEffect } from 'react';
import { simplyBookApi, Service, Provider, TimeSlot } from '../booking/simplyBookApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface BookingFormData {
  service: string;
  provider: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  duration: string;
}

const EnhancedBookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    provider: '',
    date: new Date(),
    time: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    duration: '2'
  });

  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [monthlyAvailability, setMonthlyAvailability] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Load services on mount
  useEffect(() => {
    loadServices();
  }, []);

  // Load providers when service changes
  useEffect(() => {
    if (formData.service) {
      loadProviders(formData.service);
    }
  }, [formData.service]);

  // Load availability when provider and date change
  useEffect(() => {
    if (formData.service && formData.provider && formData.date) {
      loadTimeSlots();
      loadMonthlyAvailability();
    }
  }, [formData.service, formData.provider, formData.date]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const servicesData = await simplyBookApi.getServices();
      setServices(servicesData);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProviders = async (serviceId: string) => {
    try {
      setLoading(true);
      const providersData = await simplyBookApi.getProviders(serviceId);
      setProviders(providersData);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTimeSlots = async () => {
    try {
      setLoading(true);
      const dateStr = formData.date.toISOString().split('T')[0];
      const slots = await simplyBookApi.getAvailableSlots(
        formData.service,
        formData.provider,
        dateStr
      );
      setTimeSlots(slots);
    } catch (err) {
      setError('Failed to load time slots');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMonthlyAvailability = async () => {
    try {
      const year = formData.date.getFullYear();
      const month = formData.date.getMonth() + 1;
      const availability = await simplyBookApi.getMonthlyAvailability(
        formData.service,
        formData.provider,
        year,
        month
      );
      setMonthlyAvailability(availability);
    } catch (err) {
      console.error('Failed to load monthly availability', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date) => {
    setFormData(prev => ({ ...prev, date, time: '' }));
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    return monthlyAvailability[dateStr] === false;
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    if (monthlyAvailability[dateStr] === false) return 'unavailable-date';
    if (monthlyAvailability[dateStr] === true) return 'available-date';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const dateTime = `${formData.date.toISOString().split('T')[0]} ${formData.time}`;
      
      const booking = await simplyBookApi.createBooking({
        serviceId: formData.service,
        providerId: formData.provider,
        dateTime,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        additionalFields: {
          message: formData.message,
          duration: formData.duration
        }
      });

      setBookingDetails(booking);
      setBookingConfirmed(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.service && formData.provider) {
      setStep(2);
    } else if (step === 2 && formData.date && formData.time) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (bookingConfirmed && bookingDetails) {
    return (
      <div className="bg-secondary p-8 rounded-lg shadow-white-md text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-white text-3xl mb-4">Booking Confirmed!</h3>
        <div className="text-gray-300 space-y-2 mb-6">
          <p>Booking ID: <span className="text-white font-mono">{bookingDetails.id}</span></p>
          <p>Date: <span className="text-white">{new Date(bookingDetails.startDateTime).toLocaleDateString()}</span></p>
          <p>Time: <span className="text-white">{new Date(bookingDetails.startDateTime).toLocaleTimeString()}</span></p>
        </div>
        <p className="text-gray-400 mb-6">
          A confirmation email has been sent to {bookingDetails.clientEmail}
        </p>
        <button 
          onClick={() => {
            setBookingConfirmed(false);
            setBookingDetails(null);
            setFormData({
              service: '',
              provider: '',
              date: new Date(),
              time: '',
              name: '',
              email: '',
              phone: '',
              message: '',
              duration: '2'
            });
            setStep(1);
          }} 
          className="cta-button"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Book Your Studio Session</h2>
            <p className="text-gray-400">
              Real-time availability • Instant confirmation • Secure booking
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num ? 'bg-primary text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-20 h-1 ${step > num ? 'bg-primary' : 'bg-gray-700'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded-lg shadow-white-md">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded mb-6">
                {error}
              </div>
            )}

            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl mb-6">Step 1: Choose Your Service</h3>
                
                <div>
                  <label className="block text-white mb-2">Service Type</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - £{service.price} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Studio Room / Engineer</label>
                  <select
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={!formData.service}
                  >
                    <option value="">Select room/engineer</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Session Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="2">2 hours (minimum)</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours (full day)</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.service || !formData.provider}
                    className="cta-button"
                  >
                    Next: Choose Date & Time
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl mb-6">Step 2: Select Date & Time</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-white mb-2">Select Date</label>
                    <div className="calendar-wrapper">
                      <Calendar
                        onChange={handleDateChange}
                        value={formData.date}
                        minDate={new Date()}
                        tileDisabled={tileDisabled}
                        tileClassName={tileClassName}
                        className="studio-calendar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Available Time Slots</label>
                    {loading ? (
                      <div className="text-gray-400">Loading available times...</div>
                    ) : timeSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, time: slot.time }))}
                            className={`p-3 rounded transition-all ${
                              formData.time === slot.time
                                ? 'bg-primary text-white shadow-white-sm'
                                : 'bg-black text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400">No available slots for this date</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.date || !formData.time}
                    className="cta-button"
                  >
                    Next: Your Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-white text-xl mb-6">Step 3: Your Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input"
                    placeholder="Tell us about your project, specific equipment needs, or any questions"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-black p-6 rounded-lg">
                  <h4 className="text-white mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-gray-400">
                    <p>Service: <span className="text-white">
                      {services.find(s => s.id === formData.service)?.name}
                    </span></p>
                    <p>Room/Engineer: <span className="text-white">
                      {providers.find(p => p.id === formData.provider)?.name}
                    </span></p>
                    <p>Date: <span className="text-white">
                      {formData.date.toLocaleDateString()}
                    </span></p>
                    <p>Time: <span className="text-white">{formData.time}</span></p>
                    <p>Duration: <span className="text-white">{formData.duration} hours</span></p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="cta-button shadow-white-md"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .calendar-wrapper :global(.react-calendar) {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 20px;
          width: 100%;
        }

        .calendar-wrapper :global(.react-calendar__tile) {
          background: #0a0a0a;
          color: #666;
          border: 1px solid transparent;
          height: 50px;
          transition: all 0.2s;
        }

        .calendar-wrapper :global(.react-calendar__tile:hover) {
          background: #222;
          color: white;
        }

        .calendar-wrapper :global(.react-calendar__tile--active) {
          background: #ff0066 !important;
          color: white !important;
        }

        .calendar-wrapper :global(.react-calendar__tile.available-date) {
          color: #00ff00;
          font-weight: bold;
        }

        .calendar-wrapper :global(.react-calendar__tile.unavailable-date) {
          color: #444;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .calendar-wrapper :global(.react-calendar__navigation button) {
          color: white;
          background: #1a1a1a;
          font-size: 18px;
        }

        .calendar-wrapper :global(.react-calendar__navigation button:hover) {
          background: #333;
        }
      `}</style>
    </section>
  );
};

export default EnhancedBookingForm;