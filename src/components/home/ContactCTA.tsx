
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContactCTA = () => {
  return (
    <section className="bg-restaurant-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Experience Our Delicious Food?
          </h2>
          <p className="max-w-2xl mx-auto text-white/90 mb-8">
            Book a table now or order online for takeout. We look forward to serving you and your family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-restaurant-700 hover:bg-gray-100">
              <Link to="/contact?reserve=true">
                Reserve a Table
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
