
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Restaurant Interior" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-restaurant-100 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-spice-100 rounded-full -z-10"></div>
          </div>
          
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              A Tradition of Flavor Since 1995
            </h2>
            <p className="text-gray-700 mb-6">
              Swastik Family Restaurant began with a simple vision: to create a place where families could gather and enjoy authentic, home-style cooking in a warm, welcoming atmosphere. For over 25 years, we've been serving our community with recipes passed down through generations.
            </p>
            <p className="text-gray-700 mb-8">
              Every dish at Swastik is prepared with the finest ingredients and cooked with love, just like you would find in a family home. Our commitment to quality and tradition is what sets us apart.
            </p>
            <Button asChild className="bg-restaurant-500 hover:bg-restaurant-600 text-white">
              <Link to="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
