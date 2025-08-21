import React from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/home/HeroSlider';
import FeaturedTrips from '../components/home/FeaturedTrips';
import TripCategories from '../components/home/TripCategories';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';


import PageTransition from '../components/ui/PageTransition';
import FAQSection from '../components/home/FAQSection';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import TrustElements from '../components/home/TrustElements';
import ExploreDestinations from '../components/home/ExploreDestinations';


const Home: React.FC = () => {
  return (
    <PageTransition>
      <div>
        <HeroSlider />
        
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <TripCategories />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TrustElements />
        </motion.section>

        

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-gray-50"
        >
          <FeaturedTrips />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ExploreDestinations />
        </motion.section>

        

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <Testimonials />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FAQSection />
        </motion.section>

        

        <Newsletter />
        <WhatsAppButton />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Home;