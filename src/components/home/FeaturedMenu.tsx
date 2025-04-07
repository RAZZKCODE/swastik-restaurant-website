
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and aromatic spices.",
    price: "$14.99",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: "$12.99",
    category: "Rice Dishes",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with chutney.",
    price: "$10.99",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection with vegetables.",
    price: "$13.99",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1250&q=80"
  }
];

const FeaturedMenu = () => {
  return (
    <section className="py-16 md:py-24 menu-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
            Our Specialties
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Featured Dishes
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Discover our chef's selection of signature dishes, made with the finest ingredients and crafted with care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-restaurant-500 mb-1">{item.category}</div>
                <h3 className="text-lg font-serif font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-spice-600 font-bold">{item.price}</span>
                  <Link 
                    to="/menu" 
                    className="text-restaurant-600 hover:text-restaurant-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-restaurant-500 hover:bg-restaurant-600 text-white">
            <Link to="/menu">
              View Full Menu
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
