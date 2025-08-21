import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, FileText, Shield, Heart, CheckCircle } from 'lucide-react';

const TrustElements: React.FC = () => {
  const trustStats = [
    {
      icon: Star,
      value: '4.9',
      label: 'Ratings',
      description: 'Based on 10,000+ reviews',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Users,
      value: '501k+',
      label: 'Community',
      description: 'Happy travelers worldwide',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FileText,
      value: '500+',
      label: 'Itineraries',
      description: 'Carefully crafted experiences',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Verified',
      description: 'Stays & secure transport',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const safetyFeatures = [
    {
      icon: CheckCircle,
      title: 'Curated Luxury',
      description: 'Handpicked stays verified by our travel experts',
    },
    {
      icon: Users,
      title: 'White-Glove Service',
      description: '24/7 personalized travel assistance',
    },
    {
      icon: Shield,
      title: 'Exclusive Access',
      description: 'Access to private villas and exclusive locations',
    },
    {
      icon: Heart,
      title: 'Stories, Not Packages',
      description: 'Creating memorable experiences, not just trips',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Trust Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Couples Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of discerning travelers and experience luxury travel with our curated services.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {stat.value}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Safety Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Just Merit?
            </h3>
            <p className="text-lg text-gray-600">
              Luxury, comfort, and personalized service are our hallmarks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* No Cost EMI Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white"
          >
            <h4 className="text-2xl font-bold mb-2">💳 No Cost EMI Available</h4>
            <p className="text-green-100">
              Book your dream trip now and pay later with 0% interest EMI options
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;