import BookingForm from '../components/booking/BookingForm';

// Builder.io compatible BookPage component
const BookPage = () => {
  return (
    <div data-builder-component="book-page">
      <div className="bg-black py-20" data-builder-block="page-header">
        <div className="container-custom">
          <h1 className="text-white text-center">Book Studio</h1>
        </div>
      </div>
      
      <BookingForm data-builder-block="booking-form" />
      
      <section className="section-padding bg-secondary relative" data-builder-block="dry-hire-info">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-10 parallax"
          style={{ backgroundImage: "url('/images/team.jpg')" }}
          data-builder-block="background"
        ></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-builder-block="dry-hire-details">
              <h2 className="text-white mb-6">Studio Dry Hire</h2>
              <p className="text-gray-400 mb-4">
                Take full control of your session with our dry hire option. Get access to our premium facilities and equipment without engineer support—perfect for experienced producers and artists who know exactly what they want.
              </p>
              <h3 className="text-white text-xl font-bold mt-6 mb-3">What's Included:</h3>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Full access to our main control room and recording booth</li>
                <li>• Use of our microphone collection, preamps, and outboard gear</li>
                <li>• Pro Tools or Logic Pro X workstation</li>
                <li>• Monitoring system with Yamaha HS8s and Focal monitors</li>
                <li>• Basic technical support if needed</li>
              </ul>
              <a href="/book" className="cta-button shadow-white-md">Book Dry Hire</a>
            </div>
            
            <div data-builder-block="pricing-details">
              <h3 className="text-white text-xl font-bold mb-4">Dry Hire Rates</h3>
              <div className="space-y-4 mb-6">
                <div className="border-b border-border pb-4">
                  <p className="text-white font-bold">£20/hour</p>
                  <p className="text-gray-500">Minimum 2-hour booking</p>
                </div>
                <div className="border-b border-border pb-4">
                  <p className="text-white font-bold">£170 for full day</p>
                  <p className="text-gray-500">10 hours</p>
                </div>
                <div>
                  <p className="text-white font-bold">£600 for weekly hire</p>
                  <p className="text-gray-500">40 hours</p>
                </div>
              </div>
              
              <h3 className="text-white text-xl font-bold mt-8 mb-3">Important Notes:</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• A brief studio orientation is provided at the start of your first session</li>
                <li>• Equipment must be returned to original settings after use</li>
                <li>• Additional charges may apply for specialised equipment requests</li>
                <li>• 50% deposit required to secure booking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;
