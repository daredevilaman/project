import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import TrustElements from '../components/home/TrustElements';
import ExploreDestinations from '../components/home/ExploreDestinations';



const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What kind of trips does Pampered offer?",
      answer: "Pampered offers a wide variety of trips including international destinations, domestic adventures, weekend getaways, corporate trips, and specialized experiences. We cater to all types of travelers - from solo adventurers to families and corporate groups."
    },
    {
      question: "Is it good for solo travelers?",
      answer: "Absolutely! We have a 'Solo is Safe' program with age group-based matching and vibe check systems. Our community of 501k+ travelers includes many solo adventurers, and we ensure safe, verified accommodations and trained guides for all our trips."
    },
    {
      question: "What's included in the packages?",
      answer: "Our packages typically include accommodation, transportation, guided tours, some meals, and all mentioned activities. We provide detailed itineraries with clear inclusions and exclusions for each trip. Most packages also include travel insurance and 24/7 support."
    },
    {
      question: "How can I book a trip?",
      answer: "Booking is simple! Browse our trips, select your preferred package, choose your dates, and complete the booking process online. We offer multiple payment options including No Cost EMI. You'll receive instant confirmation and detailed trip information."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation policies depending on the trip and booking time. Generally, you can cancel up to 30 days before departure for a full refund, and up to 15 days for a partial refund. Emergency cancellations are handled case by case."
    },
    {
      question: "Do you provide travel insurance?",
      answer: "Yes, comprehensive travel insurance is included in most of our packages. This covers medical emergencies, trip cancellations, lost baggage, and other unforeseen circumstances. We also offer additional coverage options for adventure activities."
    },
    {
      question: "Are your accommodations verified?",
      answer: "Yes, all our stays are personally verified by our team. We ensure they meet our quality standards for safety, cleanliness, and comfort. We also have trained local captains and secure transportation for all our trips."
    },
    {
      question: "Can I customize my trip?",
      answer: "Absolutely! We offer customizable packages where you can modify itineraries, upgrade accommodations, add activities, or extend your stay. Our travel experts will work with you to create your perfect trip within your budget."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🧠 Frequently Asked Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about booking and traveling with Pampered.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our travel experts are here to help you plan the perfect trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918287636079"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200 font-semibold"
              >
                WhatsApp Us: +91 8287636079
              </a>
              <a
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;