
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Clock, Calendar, Users, UtensilsCrossed } from 'lucide-react';
import ContactCTA from '@/components/home/ContactCTA';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('reserve') === 'true' ? 'reservation' : 'contact';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { toast } = useToast();
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Reservation form state
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    occasion: '',
    specialRequests: ''
  });
  
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Contact form submitted:', contactForm);
    
    toast({
      title: "Message Sent!",
      description: "We have received your message and will get back to you soon.",
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the reservation data to a server
    console.log('Reservation form submitted:', reservationForm);
    
    toast({
      title: "Reservation Request Sent!",
      description: "We will confirm your reservation shortly via email or phone.",
    });
    
    // Reset form
    setReservationForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      occasion: '',
      specialRequests: ''
    });
  };
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
            alt="Restaurant Contact" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-500/90 text-white font-medium text-sm mb-4">
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions, feedback, or want to make a reservation? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info & Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">
                How to Reach Us
              </h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid gap-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-restaurant-100 p-3 rounded-full mr-4">
                      <Phone size={20} className="text-restaurant-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-gray-700 mb-1">(123) 456-7890</p>
                      <p className="text-gray-600 text-sm">For reservations and inquiries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-restaurant-100 p-3 rounded-full mr-4">
                      <Mail size={20} className="text-restaurant-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-gray-700 mb-1">info@swastikrestaurant.com</p>
                      <p className="text-gray-600 text-sm">We'll respond as soon as possible</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-restaurant-100 p-3 rounded-full mr-4">
                      <Clock size={20} className="text-restaurant-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                      <p className="text-gray-700">Monday - Friday: 11:00 AM - 10:00 PM</p>
                      <p className="text-gray-700">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.0066351845964!3d40.74123337932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1627955624861!5m2!1sen!2sus" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Restaurant Location"
                ></iframe>
              </div>
            </div>
            
            {/* Tabs for Contact and Reservation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Tabs 
                defaultValue={activeTab} 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="reservation">Make a Reservation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact">
                  <h3 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h3>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        type="text" 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <Textarea 
                        id="message" 
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-restaurant-500 hover:bg-restaurant-600 text-white">
                      Send Message
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="reservation">
                  <h3 className="text-2xl font-serif font-bold mb-6">Reserve a Table</h3>
                  
                  <form onSubmit={handleReservationSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="res-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input 
                        id="res-name" 
                        type="text" 
                        value={reservationForm.name}
                        onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="res-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="res-email" 
                          type="email" 
                          value={reservationForm.email}
                          onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="res-phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input 
                          id="res-phone" 
                          type="tel" 
                          value={reservationForm.phone}
                          onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="res-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input 
                            id="res-date" 
                            type="date" 
                            className="pl-10"
                            value={reservationForm.date}
                            onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="res-time" className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input 
                            id="res-time" 
                            type="time" 
                            className="pl-10"
                            value={reservationForm.time}
                            onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="res-guests" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Guests
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input 
                            id="res-guests" 
                            type="number" 
                            className="pl-10"
                            min="1"
                            value={reservationForm.guests}
                            onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="res-occasion" className="block text-sm font-medium text-gray-700 mb-1">
                          Occasion (Optional)
                        </label>
                        <div className="relative">
                          <UtensilsCrossed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input 
                            id="res-occasion" 
                            type="text" 
                            className="pl-10"
                            placeholder="Birthday, Anniversary, etc."
                            value={reservationForm.occasion}
                            onChange={(e) => setReservationForm({ ...reservationForm, occasion: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="res-requests" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests (Optional)
                      </label>
                      <Textarea 
                        id="res-requests" 
                        rows={3}
                        placeholder="Dietary restrictions, seating preferences, etc."
                        value={reservationForm.specialRequests}
                        onChange={(e) => setReservationForm({ ...reservationForm, specialRequests: e.target.value })}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-restaurant-500 hover:bg-restaurant-600 text-white">
                      Request Reservation
                    </Button>
                    
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Note: This is a reservation request. We will contact you to confirm availability.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      <ContactCTA />
      
      <Footer />
    </>
  );
};

export default Contact;
