
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserRound, Utensils, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-500/90 text-white font-medium text-sm mb-4">
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Our Story & Our Mission
            </h1>
            <p className="text-xl text-white/90">
              Learn about the passion and history behind Swastik Family Restaurant, and the values that drive us every day.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
                Our Beginning
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                A Family Tradition Since 1995
              </h2>
              <p className="text-gray-700 mb-4">
                Swastik Family Restaurant was founded by the Sharma family in 1995, with a dream to bring authentic home-style cooking to our community. What began as a small 10-table restaurant has grown into a beloved dining destination, but our commitment to quality and family values has never wavered.
              </p>
              <p className="text-gray-700 mb-4">
                Our recipes have been passed down through generations, and we take pride in preparing each dish with the same care and attention to detail as we would for our own family gatherings. The name "Swastik" was chosen as a symbol of good fortune, prosperity, and well-being—values we wish for all our customers.
              </p>
              <p className="text-gray-700">
                Through the years, we've expanded our menu and our space, but we've maintained the warm, welcoming atmosphere that makes everyone feel like part of our extended family.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Restaurant History" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-restaurant-100 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-spice-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              What Drives Us
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              At Swastik Family Restaurant, we're guided by a set of core values that influence everything we do, from our food preparation to our customer service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-restaurant-100 text-restaurant-600 mb-4">
                <Utensils size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Quality</h3>
              <p className="text-gray-700">
                We use only the freshest ingredients and authentic spices to create dishes that delight the palate and nourish the body.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-restaurant-100 text-restaurant-600 mb-4">
                <UserRound size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Family</h3>
              <p className="text-gray-700">
                We treat each customer as part of our extended family, creating a warm and inclusive atmosphere for all.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-restaurant-100 text-restaurant-600 mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Passion</h3>
              <p className="text-gray-700">
                Our love for food and hospitality drives us to create memorable dining experiences that go beyond just a meal.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-restaurant-100 text-restaurant-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Tradition</h3>
              <p className="text-gray-700">
                We honor culinary traditions while embracing innovation, ensuring that every dish tells a story.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
              Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Meet the Family
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              The heart and soul of Swastik Restaurant is our dedicated team who work tirelessly to bring you exceptional food and service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Raj Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-1">Raj Sharma</h3>
              <p className="text-restaurant-600 mb-4">Founder & Head Chef</p>
              <p className="text-gray-700">
                With over 30 years of culinary experience, Raj brings his passion for traditional cooking to every dish that leaves our kitchen.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80" 
                  alt="Priya Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-1">Priya Sharma</h3>
              <p className="text-restaurant-600 mb-4">Manager & Hostess</p>
              <p className="text-gray-700">
                Priya ensures that every guest receives a warm welcome and exceptional service throughout their dining experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1574966739987-66dffee4d734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Arjun Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold mb-1">Arjun Sharma</h3>
              <p className="text-restaurant-600 mb-4">Executive Chef</p>
              <p className="text-gray-700">
                Trained in culinary arts, Arjun combines traditional techniques with contemporary presentation to create our signature dishes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
