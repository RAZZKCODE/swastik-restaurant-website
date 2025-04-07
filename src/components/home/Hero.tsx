
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight">
            Delicious Food & Memorable Experiences
          </h1>
          <p className="mt-6 text-xl text-white/90">
            Experience the authentic flavors and warm hospitality at Swastik Family Restaurant. Where every meal brings families together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-restaurant-500 hover:bg-restaurant-600 text-white font-medium">
              <Link to="/menu">
                Explore Our Menu
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link to="/contact?reserve=true">
                Reserve a Table
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
