
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from 'lucide-react';

// Sample gallery data
const galleryData = {
  food: [
    {
      id: 1,
      title: "Butter Chicken",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Vegetable Biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Masala Dosa",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Paneer Tikka",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1250&q=80"
    },
    {
      id: 5,
      title: "Samosas",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      title: "Gulab Jamun",
      image: "https://images.unsplash.com/photo-1609016806241-7de72fc82a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ],
  restaurant: [
    {
      id: 7,
      title: "Restaurant Interior",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 8,
      title: "Dining Area",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 9,
      title: "Private Dining Room",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1547&q=80"
    },
    {
      id: 10,
      title: "Outdoor Seating",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 11,
      title: "Bar Area",
      image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    },
    {
      id: 12,
      title: "Chef's Table",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ],
  events: [
    {
      id: 13,
      title: "Family Celebration",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 14,
      title: "Corporate Event",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    },
    {
      id: 15,
      title: "Birthday Party",
      image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 16,
      title: "Wedding Reception",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ]
};

const GalleryItem = ({ item, onClick }: { item: any; onClick: () => void }) => {
  return (
    <div 
      className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
          <div className="text-white text-center opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            <h3 className="text-xl font-serif font-bold">{item.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | { title: string; image: string }>(null);
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant Food" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-500/90 text-white font-medium text-sm mb-4">
              Our Gallery
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              A Visual Feast
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore our restaurant through images showcasing our delicious food, inviting ambiance, and memorable events.
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="food" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-3 gap-4">
                <TabsTrigger value="food">Food & Dishes</TabsTrigger>
                <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="food">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.food.map((item) => (
                  <GalleryItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => setSelectedImage({ title: item.title, image: item.image })}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="restaurant">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.restaurant.map((item) => (
                  <GalleryItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => setSelectedImage({ title: item.title, image: item.image })}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryData.events.map((item) => (
                  <GalleryItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => setSelectedImage({ title: item.title, image: item.image })}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-restaurant-100 text-restaurant-700 font-medium text-sm mb-4">
              Virtual Tour
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Experience Our Restaurant
            </h2>
            <p className="max-w-2xl mx-auto text-gray-700">
              Take a virtual tour of our restaurant and get a glimpse of the ambiance and experience we offer.
            </p>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=eO3fBHu8Y4QBHN-a" 
              title="Restaurant Tour" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-4xl p-0 gap-0">
          <div className="relative">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedImage?.image} 
              alt={selectedImage?.title} 
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <h3 className="text-xl font-serif font-bold">{selectedImage?.title}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default Gallery;
