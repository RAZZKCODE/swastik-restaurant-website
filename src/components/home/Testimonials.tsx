
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Food Enthusiast",
    quote: "The butter chicken at Swastik is the best I've ever had! The flavors are rich and authentic, and the service is always excellent.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Regular Customer",
    quote: "We celebrate all our family occasions at Swastik. The atmosphere is so welcoming, and the food never disappoints. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Food Blogger",
    quote: "Swastik Family Restaurant offers an authentic dining experience with impeccable attention to detail. The vegetable biryani is a must-try!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 testimonial-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Don't just take our word for it. Here's what our valued customers have to say about their dining experience at Swastik.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
