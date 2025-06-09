import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// -------- ICS Calendar Integration --------
const CALENDAR_ICS_URL =
  'https://calendar.google.com/calendar/ical/c_d645542bb4834c2f491ebae4ab0fcd5f17e67b8c85af201a2348c09c248a6353%40group.calendar.google.com/public/basic.ics';

function parseICS(icsText: string) {
  const events: { date: string; startHour: string }[] = [];
  const lines = icsText.split(/\r?\n/);
  let currentEvent: any = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') currentEvent = {};
    if (line.startsWith('DTSTART')) {
      const match = line.match(/DTSTART.*:(\d{8})T(\d{2})/);
      if (match) {
        const [_, yyyymmdd, hour] = match;
        const date = `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
        currentEvent.date = date;
        currentEvent.startHour = `${parseInt(hour, 10)}:00`;
      }
    }
    if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.date && currentEvent.startHour) {
        events.push({ date: currentEvent.date, startHour: currentEvent.startHour });
      }
      currentEvent = null;
    }
  }
  return events;
}

// -------- End ICS Section --------

interface TimeSlot {
  time: string;
  duration: number;
  available: boolean;
  price: number;
}

interface DayAvailability {
  date: string;
  slots: TimeSlot[];
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  hours: string;
  message: string;
  date?: string;
  time?: string;
  referralSource: string;
  referenceCode?: string;
}

interface Service {
  id: string;
  name: string;
  basePrice: number;
  perTrack?: boolean;
}

const fetchAvailability = async (month: Date): Promise<DayAvailability[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  const slots: DayAvailability[] = [];
  const year = month.getFullYear();
  const monthNum = month.getMonth();

  for (let day = 1; day <= new Date(year, monthNum + 1, 0).getDate(); day++) {
    const date = new Date(year, monthNum, day);
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Weekdays only
      const daySlots: TimeSlot[] = [];
      for (let hour = 9; hour <= 21; hour++) {
        if (Math.random() > 0.3) {
          daySlots.push({
            time: `${hour}:00`,
            duration: 1,
            available: true,
            price: hour >= 18 ? 25 : 20
          });
        }
      }
      if (daySlots.length > 0) {
        slots.push({ date: date.toISOString().split('T')[0], slots: daySlots });
      }
    }
  }

  return slots;
};

const EnhancedBookingForm: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'dry-hire',
    hours: '2',
    message: '',
    referralSource: ''
  });

  // --- Google Calendar bookings ---
  const [bookedSlots, setBookedSlots] = useState<{ date: string; startHour: string }[]>([]);

  useEffect(() => {
    fetch(CALENDAR_ICS_URL)
      .then(res => res.text())
      .then(parseICS)
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]));
  }, []);
  // -------------------------------

  const services: Service[] = [
    { id: 'dry-hire', name: 'Dry Hire (Studio Only)', basePrice: 20 },
    { id: 'recording', name: 'Recording Hire (with Engineer)', basePrice: 40 },
    { id: 'dj-practice', name: 'DJ Practice', basePrice: 20 },
    { id: 'mixing', name: 'Mixing Service', basePrice: 100, perTrack: true },
    { id: 'mastering', name: 'Mastering Service', basePrice: 50, perTrack: true },
    { id: 'mix-master', name: 'Mix & Master Bundle', basePrice: 140, perTrack: true }
  ];

  const hourOptions = [
    { value: '2', label: '2 hours (minimum)' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '5', label: '5 hours' },
    { value: '6', label: '6 hours' },
    { value: '8', label: '8 hours (full day)' }
  ];

  useEffect(() => {
    loadAvailability(currentMonth);
  }, [currentMonth]);

  const loadAvailability = async (month: Date) => {
    setLoading(true);
    try {
      const data = await fetchAvailability(month);
      setAvailability(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setFormData(prev => ({
      ...prev,
      date: selectedDate!,
      time: slot.time,
      hours: slot.duration.toString()
    }));
    setShowCalendar(false);
  };

  const calculatePrice = (): number | null => {
    const service = services.find(s => s.id === formData.service);
    if (!service) return null;

    if (service.perTrack) {
      return service.basePrice;
    }

    const hours = parseInt(formData.hours);
    let hourlyRate = service.basePrice;

    if (service.id === 'recording') {
      if (hours >= 8) return 220;
      if (hours >= 4 && hours <= 7) hourlyRate = 35;
    } else if (service.id === 'dry-hire' || service.id === 'dj-practice') {
      if (hours >= 8) return 150;
    }

    return hourlyRate * hours;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert('Please select a date and time slot');
      return;
    }

    if (!formData.referralSource) {
      alert('Please tell us how you found us');
      return;
    }

    if (formData.referralSource === 'reference-code' && !formData.referenceCode) {
      alert('Please enter your reference code');
      return;
    }

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getAvailabilityForDate = (dateStr: string) => {
    return availability.find(a => a.date === dateStr);
  };

  if (formSubmitted) {
    return (
      <div className="bg-secondary p-8 rounded-lg text-center max-w-3xl mx-auto mt-6 mb-6">
        <div className="text-5xl mb-4">🎤</div>
        <h3 className="text-white text-2xl mb-4">Booking Request Received!</h3>
        <p className="text-gray-300 mb-6">
          Thanks for booking studio time at Uncensored Studios. We'll confirm your slot within 24 hours.
        </p>
        <button 
          onClick={() => {
            setFormSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: 'dry-hire',
              hours: '2',
              message: '',
              referralSource: ''
            });
            setSelectedDate(null);
            setSelectedSlot(null);
          }} 
          className="cta-button"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  const price = calculatePrice();

  return (
    <div className="max-w-5xl mx-auto mt-2 mb-6">
      {/* Selected Time Display */}
      {formData.date && formData.time && !showCalendar && (
        <div className="bg-secondary rounded-lg p-4 mb-6 shadow-white-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Selected Session:</p>
              <p className="text-white font-bold">
                {new Date(formData.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })} at {formData.time}
              </p>
              {price && (
                <p className="text-primary font-bold mt-1">
                  Total: £{price} {services.find(s => s.id === formData.service)?.perTrack ? 'per track' : ''}
                </p>
              )}
            </div>
            <button
              onClick={() => setShowCalendar(true)}
              className="text-primary hover:text-primary/90 text-sm font-bold"
            >
              CHANGE
            </button>
          </div>
        </div>
      )}

      {/* Calendar Toggle Button */}
      {!showCalendar && (!formData.date || !formData.time) && (
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full bg-secondary rounded-lg p-8 mb-6 hover:shadow-white-md transition-all shadow-white-sm"
        >
          <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-white font-bold">SELECT DATE & TIME</p>
          <p className="text-gray-400 text-sm mt-1">View available studio slots</p>
        </button>
      )}

      {/* Calendar View */}
      {showCalendar && (
        <div className="bg-secondary rounded-lg p-6 mb-6 shadow-white-md">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-black rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold">
                  {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }).toUpperCase()}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-black rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
                      const days = [];
                      for (let i = 0; i < startingDayOfWeek; i++) {
                        days.push(<div key={`empty-${i}`} />);
                      }
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const dateStr = date.toISOString().split('T')[0];
                        const dayAvailability = getAvailabilityForDate(dateStr);
                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                        const isSelected = selectedDate === dateStr;
                        const hasSlots = dayAvailability && dayAvailability.slots.length > 0;

                        // Also check if all slots are booked
                        let allBooked = false;
                        if (dayAvailability && dayAvailability.slots.length > 0) {
                          const freeSlots = dayAvailability.slots.filter(slot =>
                            !bookedSlots.some(b => b.date === dateStr && b.startHour === slot.time)
                          );
                          allBooked = freeSlots.length === 0;
                        }

                        days.push(
                          <button
                            key={day}
                            onClick={() => !isPast && hasSlots && !allBooked && handleDateSelect(dateStr)}
                            disabled={isPast || !hasSlots || allBooked}
                            className={`
                              aspect-square rounded text-sm transition-all
                              ${isPast ? 'opacity-30 cursor-not-allowed' : ''}
                              ${hasSlots && !isPast && !allBooked ? 'hover:bg-primary/20 cursor-pointer' : ''}
                              ${isSelected ? 'bg-primary text-white' : ''}
                              ${(!hasSlots || allBooked) && !isPast ? 'text-gray-600' : ''}
                            `}
                          >
                            {day}
                            {hasSlots && !isPast && !allBooked && (
                              <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1"></div>
                            )}
                          </button>
                        );
                      }
                      return days;
                    })()}
                  </div>
                </>
              )}
            </div>

            {/* Time Slots */}
            <div>
              {selectedDate ? (() => {
                const slotsForDate = getAvailabilityForDate(selectedDate)?.slots || [];
                const freeSlots = slotsForDate.filter(slot =>
                  !bookedSlots.some(
                    b => b.date === selectedDate && b.startHour === slot.time
                  )
                );

                return freeSlots.length > 0 ? (
                  <>
                    <h4 className="font-bold mb-3">
                      AVAILABLE SLOTS FOR {new Date(selectedDate).toLocaleDateString('en-GB', {
                        month: 'short',
                        day: 'numeric'
                      }).toUpperCase()}
                    </h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto p-2">
                      {freeSlots.map((slot: TimeSlot, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSlotSelect(slot)}
                          className="w-full p-3 bg-black hover:bg-primary/10 rounded-lg text-left transition-all flex items-center justify-between group card-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-bold">{slot.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">£{slot.price}/hr</span>
                            <Check className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No available slots for this date</p>
                  </div>
                );
              })() : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Select a date to view time slots</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-secondary p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Service Type</label>
            <select 
              value={formData.service} 
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              className="form-input"
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>

          {!services.find(s => s.id === formData.service)?.perTrack && (
            <div>
              <label className="block text-white mb-2">Session Length</label>
              <select 
                value={formData.hours} 
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                className="form-input"
              >
                {hourOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-white mb-2">Where did you find us? *</label>
            <select 
              value={formData.referralSource} 
              onChange={(e) => setFormData(prev => ({ ...prev, referralSource: e.target.value, referenceCode: '' }))}
              required
              className="form-input"
            >
              <option value="">Select an option</option>
              <option value="advertisement">Advertisement</option>
              <option value="google-search">Google search</option>
              <option value="social-media">Social media</option>
              <option value="reference-code">Reference code</option>
            </select>
          </div>

          {formData.referralSource === 'reference-code' && (
            <div>
              <label className="block text-white mb-2">Reference Code *</label>
              <input
                type="text"
                value={formData.referenceCode || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, referenceCode: e.target.value.toUpperCase() }))}
                required
                className="form-input"
                placeholder="Enter your reference code"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Project Details</label>
          <textarea 
            value={formData.message} 
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={4} 
            className="form-input"
            placeholder="Tell us about your project..."
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="cta-button">
            CONFIRM BOOKING REQUEST
          </button>
        </div>
        
        {/* Price Display */}
        {price && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">Estimated Total:</p>
            <p className="text-primary text-2xl font-bold">
              £{price} {services.find(s => s.id === formData.service)?.perTrack ? 'per track' : ''}
            </p>
            {formData.service === 'recording' && parseInt(formData.hours) >= 4 && parseInt(formData.hours) < 8 && (
              <p className="text-green-500 text-sm mt-1">Discounted rate applied!</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default EnhancedBookingForm;
