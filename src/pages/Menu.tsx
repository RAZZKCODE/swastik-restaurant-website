
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample menu data
const menuData = {
  appetizers: [
    {
      id: 1,
      name: "Samosas",
      description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney.",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled to perfection with vegetables.",
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1250&q=80",
      vegetarian: true,
      spicy: true
    },
    {
      id: 3,
      name: "Chicken Pakora",
      description: "Tender chicken pieces coated in a spiced chickpea batter and deep-fried.",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      vegetarian: false,
      spicy: true
    },
    {
      id: 4,
      name: "Vegetable Spring Rolls",
      description: "Crispy rolls filled with mixed vegetables and spices, served with sweet chili sauce.",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    }
  ],
  mainCourse: [
    {
      id: 5,
      name: "Butter Chicken",
      description: "Tender chicken in a rich, creamy tomato sauce with butter and aromatic spices.",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: false,
      spicy: false
    },
    {
      id: 6,
      name: "Vegetable Curry",
      description: "Mixed seasonal vegetables cooked in a flavorful curry sauce.",
      price: "$11.99",
      image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      vegetarian: true,
      spicy: true
    },
    {
      id: 7,
      name: "Lamb Rogan Josh",
      description: "Tender lamb pieces slow-cooked in a rich, aromatic sauce with Kashmiri spices.",
      price: "$16.99",
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      vegetarian: false,
      spicy: true
    },
    {
      id: 8,
      name: "Palak Paneer",
      description: "Cottage cheese cubes in a creamy spinach sauce, flavored with mild spices.",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80",
      vegetarian: true,
      spicy: false
    }
  ],
  riceDishes: [
    {
      id: 9,
      name: "Vegetable Biryani",
      description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: true
    },
    {
      id: 10,
      name: "Chicken Biryani",
      description: "Basmati rice layered with tender chicken pieces and cooked with saffron and spices.",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: false,
      spicy: true
    },
    {
      id: 11,
      name: "Jeera Rice",
      description: "Basmati rice flavored with cumin seeds and mild spices.",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1596797038530-2c107aa8e1fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
      vegetarian: true,
      spicy: false
    }
  ],
  desserts: [
    {
      id: 12,
      name: "Gulab Jamun",
      description: "Soft milk solids balls soaked in a sweet, aromatic sugar syrup.",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1609016806241-7de72fc82a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    },
    {
      id: 13,
      name: "Mango Kulfi",
      description: "Traditional Indian ice cream flavored with ripe mangoes and cardamom.",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1626082936010-1acfee1cfb4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    },
    {
      id: 14,
      name: "Rasmalai",
      description: "Soft cottage cheese dumplings soaked in sweetened, thickened milk flavored with cardamom.",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1594149435668-7d35c8ebc139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
      vegetarian: true,
      spicy: false
    }
  ],
  beverages: [
    {
      id: 15,
      name: "Mango Lassi",
      description: "Refreshing yogurt drink blended with ripe mangoes and a hint of cardamom.",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1557705226-73128527e114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    },
    {
      id: 16,
      name: "Masala Chai",
      description: "Traditional Indian spiced tea with milk.",
      price: "$3.99",
      image: "https://images.unsplash.com/photo-1601050690293-71f0baba89cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      vegetarian: true,
      spicy: false
    },
    {
      id: 17,
      name: "Fresh Lime Soda",
      description: "Refreshing lime juice with soda water, served sweet or salted as per preference.",
      price: "$3.99",
      image: "https://images.unsplash.com/photo-1558383817-256508bdf49f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      vegetarian: true,
      spicy: false
    }
  ]
};

const MenuItem = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="md:w-2/3 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold">{item.name}</h3>
          <span className="text-lg font-bold text-spice-600">{item.price}</span>
        </div>
        <div className="flex space-x-2 my-2">
          {item.vegetarian && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Vegetarian
            </span>
          )}
          {item.spicy && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Spicy
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-2">{item.description}</p>
      </div>
    </div>
  );
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant Food" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-500/90 text-white font-medium text-sm mb-4">
              Our Menu
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Explore Our Culinary Delights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover a thoughtfully crafted menu featuring authentic recipes prepared with the finest ingredients and traditional cooking methods.
            </p>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <section className="py-16 md:py-24 menu-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="appetizers" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid md:grid-cols-5 grid-cols-2 md:grid-rows-1 grid-rows-3 gap-2">
                <TabsTrigger value="appetizers" onClick={() => setSelectedCategory("appetizers")}>Appetizers</TabsTrigger>
                <TabsTrigger value="mainCourse" onClick={() => setSelectedCategory("mainCourse")}>Main Course</TabsTrigger>
                <TabsTrigger value="riceDishes" onClick={() => setSelectedCategory("riceDishes")}>Rice Dishes</TabsTrigger>
                <TabsTrigger value="desserts" onClick={() => setSelectedCategory("desserts")}>Desserts</TabsTrigger>
                <TabsTrigger value="beverages" onClick={() => setSelectedCategory("beverages")}>Beverages</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="appetizers" className="space-y-6">
              {menuData.appetizers.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </TabsContent>
            
            <TabsContent value="mainCourse" className="space-y-6">
              {menuData.mainCourse.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </TabsContent>
            
            <TabsContent value="riceDishes" className="space-y-6">
              {menuData.riceDishes.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </TabsContent>
            
            <TabsContent value="desserts" className="space-y-6">
              {menuData.desserts.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </TabsContent>
            
            <TabsContent value="beverages" className="space-y-6">
              {menuData.beverages.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Daily Specials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
              Special Offers
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Today's Specials
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              Our chef prepares special dishes daily, using seasonal ingredients to create unique and flavorful offerings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1611489142329-016a15c7c5fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Special Thali" 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold">Family Special Thali</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-restaurant-100 text-restaurant-800">
                    Monday-Thursday
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  A complete meal with assorted appetizers, bread, rice, curry, dal, raita, and dessert. Perfect for sharing family-style.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-spice-600">$24.99 per person</span>
                  <span className="text-sm text-green-600 font-medium">15% Off for Family of 4+</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1236&q=80" 
                  alt="Lunch Special" 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-serif font-bold">Lunch Express Menu</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-restaurant-100 text-restaurant-800">
                    Monday-Friday, 11:30 AM - 2:30 PM
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  A quick and satisfying lunch option that includes your choice of curry, rice, naan, and a side salad. Served with complimentary masala chai.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-spice-600">$15.99 per person</span>
                  <span className="text-sm text-green-600 font-medium">Free Dessert with Business Card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Menu;
