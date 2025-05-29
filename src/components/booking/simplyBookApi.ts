import axios from 'axios';

interface SimplyBookConfig {
  companyLogin: string;
  apiKey: string;
  apiUrl?: string;
}

interface AuthToken {
  token: string;
  company: string;
  login: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  currency: string;
  description?: string;
}

interface Provider {
  id: string;
  name: string;
  email: string;
  description?: string;
}

interface Booking {
  id: string;
  serviceId: string;
  providerId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDateTime: string;
  endDateTime: string;
  status: string;
  additionalFields?: Record<string, any>;
}

class SimplyBookAPI {
  private config: SimplyBookConfig;
  private authToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(config: SimplyBookConfig) {
    this.config = {
      ...config,
      apiUrl: config.apiUrl || 'https://user-api.simplybook.me'
    };
  }

  // Authentication
  private async authenticate(): Promise<void> {
    try {
      const response = await axios.post(`${this.config.apiUrl}/login`, {
        company: this.config.companyLogin,
        login: 'admin', // or specific user login
        password: this.config.apiKey
      });

      this.authToken = response.data.token;
      // Token typically expires in 1 hour
      this.tokenExpiry = new Date(Date.now() + 3600000);
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with SimplyBook.me');
    }
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.authToken || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      await this.authenticate();
    }
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any): Promise<any> {
    await this.ensureAuthenticated();

    try {
      const response = await axios({
        method,
        url: `${this.config.apiUrl}${endpoint}`,
        headers: {
          'X-Company-Login': this.config.companyLogin,
          'X-Token': this.authToken,
          'Content-Type': 'application/json'
        },
        data
      });

      return response.data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    const services = await this.makeRequest('/admin/services');
    return services.map((service: any) => ({
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: service.price,
      currency: service.currency,
      description: service.description
    }));
  }

  // Providers (Engineers/Rooms)
  async getProviders(serviceId?: string): Promise<Provider[]> {
    const endpoint = serviceId 
      ? `/admin/services/${serviceId}/providers`
      : '/admin/providers';
    
    const providers = await this.makeRequest(endpoint);
    return providers.map((provider: any) => ({
      id: provider.id,
      name: provider.name,
      email: provider.email,
      description: provider.description
    }));
  }

  // Available time slots
  async getAvailableSlots(
    serviceId: string,
    providerId: string,
    date: string
  ): Promise<TimeSlot[]> {
    const slots = await this.makeRequest(
      `/admin/schedule/free-time/${serviceId}/${providerId}/${date}`
    );
    
    return slots.map((slot: any) => ({
      time: slot,
      available: true
    }));
  }

  // Get monthly availability
  async getMonthlyAvailability(
    serviceId: string,
    providerId: string,
    year: number,
    month: number
  ): Promise<Record<string, boolean>> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    const availability = await this.makeRequest(
      `/admin/schedule/daily-available/${serviceId}/${providerId}/${startDate}/${endDate}`
    );
    
    return availability;
  }

  // Create booking
  async createBooking(bookingData: {
    serviceId: string;
    providerId: string;
    dateTime: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    additionalFields?: Record<string, any>;
  }): Promise<Booking> {
    const booking = await this.makeRequest('/admin/bookings', 'POST', {
      service_id: bookingData.serviceId,
      provider_id: bookingData.providerId,
      datetime: bookingData.dateTime,
      client: {
        name: bookingData.clientName,
        email: bookingData.clientEmail,
        phone: bookingData.clientPhone
      },
      additional_fields: bookingData.additionalFields
    });

    return {
      id: booking.id,
      serviceId: booking.service_id,
      providerId: booking.provider_id,
      clientName: booking.client.name,
      clientEmail: booking.client.email,
      clientPhone: booking.client.phone,
      startDateTime: booking.start_datetime,
      endDateTime: booking.end_datetime,
      status: booking.status,
      additionalFields: booking.additional_fields
    };
  }

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<void> {
    await this.makeRequest(`/admin/bookings/${bookingId}`, 'DELETE');
  }

  // Get booking details
  async getBooking(bookingId: string): Promise<Booking> {
    const booking = await this.makeRequest(`/admin/bookings/${bookingId}`);
    
    return {
      id: booking.id,
      serviceId: booking.service_id,
      providerId: booking.provider_id,
      clientName: booking.client.name,
      clientEmail: booking.client.email,
      clientPhone: booking.client.phone,
      startDateTime: booking.start_datetime,
      endDateTime: booking.end_datetime,
      status: booking.status,
      additionalFields: booking.additional_fields
    };
  }
}

// Export configured instance
export const simplyBookApi = new SimplyBookAPI({
  companyLogin: process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY_LOGIN!,
  apiKey: process.env.SIMPLYBOOK_API_KEY!
});

// Export types
export type { 
  Service, 
  Provider, 
  TimeSlot, 
  Booking,
  SimplyBookConfig 
};