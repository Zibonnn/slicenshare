"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SignupModal from "./SignupModal";

// Basic/Advanced Card Component
const BasicAdvancedCard = ({ plan, index, hoveredIndex, setHoveredIndex, handleGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuresPerSlide = 3;
  const totalSlides = Math.ceil(plan.features.length / featuresPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentFeatures = () => {
    const start = currentSlide * featuresPerSlide;
    return plan.features.slice(start, start + featuresPerSlide);
  };

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden flex flex-col"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        height: '540px'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Group 1: Top Section - Height fits content */}
      <div 
        className="w-full flex flex-col justify-center items-center py-8 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/How_It_Works_SNS/${plan.type === 'basic' ? '1' : '3'}.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="text-center space-y-4 w-full relative z-10">
          <h3 className="h4-alt gradient-text-primary" style={{ textAlign: 'center' }}>
            {plan.name}
          </h3>
          <div className="flex items-baseline justify-center space-x-2">
            <span className="h2 text-white text-center">{plan.price}</span>
            {plan.period && <span className="caption-1 text-white-56 text-center">{plan.period}</span>}
          </div>
          <p className="body-s text-white-56 text-center" style={{ textAlign: 'center' }}>{plan.description}</p>
          <h4 className="caption-1 text-red-500 text-center" style={{ textAlign: 'center' }}>{plan.subtitle}</h4>
        </div>
      </div>

      {/* Group 2: Bullet Points and Controls - Combined with card background */}
      <div className="flex-1 w-full flex flex-col" style={{ backgroundColor: 'var(--card-bg)' }}>
        {/* Bullet Points */}
        <div className="flex-1 w-full px-6 pt-6 overflow-hidden">
        <motion.ul 
          className="space-y-4 h-full flex flex-col justify-start"
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {getCurrentFeatures().map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <span className="caption-1 text-white-56 leading-relaxed flex-1">{feature}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Group 3: Slider Controls and CTA - Always at bottom */}
      <div className="w-full p-6 space-y-4">
        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 bg-secondary-cta/80 hover:bg-secondary-cta rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                    i === currentSlide ? 'bg-red-500' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-8 h-8 bg-secondary-cta/80 hover:bg-secondary-cta rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Button */}
        <motion.button
          onClick={() => handleGetStarted(plan.name)}
          className="w-full py-4 px-6 rounded-full subhead text-white btn-secondary cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{plan.buttonText}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Standard Highlight Card Component
const StandardCard = ({ plan, index, hoveredIndex, setHoveredIndex, handleGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(0);
  const animationRef = useRef();
  const featuresPerSlide = 3;
  const totalSlides = Math.ceil(plan.features.length / featuresPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setUserInteracted(true);
    setIsAutoSliding(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setUserInteracted(true);
    setIsAutoSliding(false);
  };

  const getCurrentFeatures = () => {
    const start = currentSlide * featuresPerSlide;
    return plan.features.slice(start, start + featuresPerSlide);
  };

  // Traveling gradient animation
  useEffect(() => {
    const animate = () => {
      setGradientAngle(prev => (prev + 0.2) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || userInteracted || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding, userInteracted, totalSlides]);

      return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden flex flex-col relative"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        height: '568px',
        border: '2px solid transparent',
        background: `
          linear-gradient(${gradientAngle}deg, 
            var(--sns-purple) 0%, 
            var(--sns-purple) 25%, 
            var(--sns-red) 50%, 
            var(--sns-red) 75%, 
            var(--sns-purple) 100%
          ) border-box,
          var(--card-bg) padding-box
        `
      }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Group 1: Top Section - Height fits content */}
      <div 
        className="w-full flex flex-col justify-center items-center py-8 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url('/How_It_Works_SNS/2.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/84"></div>
        
        {/* Popular Badge */}
        <div className="text-center w-full relative z-10" style={{ marginBottom: '8px' }}>
          <span className="caption-1 text-white text-center">Most Popular</span>
        </div>

        {/* Plan Details */}
        <div className="text-center space-y-4 w-full relative z-10">
          <h3 className="h4-alt gradient-text-primary" style={{ textAlign: 'center' }}>
            {plan.name}
          </h3>
          <div className="flex items-baseline justify-center space-x-2">
            <span className="h2 text-white text-center">{plan.price}</span>
            {plan.period && (
              <span className="caption-1 text-white-56 text-center">{plan.period}</span>
            )}
          </div>
          <p className="body-s text-white-56 text-center" style={{ textAlign: 'center' }}>{plan.description}</p>
          <h4 className="caption-1 text-red-500 text-center" style={{ textAlign: 'center' }}>{plan.subtitle}</h4>
        </div>
      </div>

      {/* Group 2: Bullet Points and Controls - Combined with card background */}
      <div className="flex-1 w-full flex flex-col" style={{ backgroundColor: 'var(--card-bg)' }}>
        {/* Bullet Points */}
        <div className="flex-1 w-full px-6 pt-6 overflow-hidden">
        <motion.ul 
          className="space-y-4 h-full flex flex-col justify-start"
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {getCurrentFeatures().map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <span className="caption-1 text-white-56 leading-relaxed flex-1">{feature}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Group 3: Slider Controls and CTA - Always at bottom */}
      <div className="w-full p-6 space-y-4">
        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 bg-secondary-cta/80 hover:bg-secondary-cta rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    setUserInteracted(true);
                    setIsAutoSliding(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                    i === currentSlide ? 'bg-red-500' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-8 h-8 bg-secondary-cta/80 hover:bg-secondary-cta rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Button */}
        <motion.button
          onClick={() => handleGetStarted(plan.name)}
          className="w-full py-4 px-6 rounded-full subhead text-white btn-primary cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{plan.buttonText}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingPlans() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleGetStarted = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const plans = [
    {
      name: "BASIC",
      price: "Free",
      period: "per person",
      subtitle: "🎮 Slice N Share – Free Tier Benefits",
      description: "Your journey from Noob to Pro starts here 💥",
      features: [
        "Global Gamer Profile on Slice N Share – Get seen. Be known. Build your legacy.",
        "Access to Free Training Resources – Learn smarter with SnS AI tools.",
        "Monthly Gamer Meetups – Connect, grow, and stay inspired.",
        "Discount on 20 Lifestyle Apps",
        "Mental Health Support*",
        "Exclusive Networking Opportunities – Engage with top players, mentors & scouts.",
        "Limited Chance to Be Scouted by Sponsors – We refer rising talents based on potential.",
        "Limited Community Support & Feedback – Level up with like-minded gamers.",
        "Entry in Tournaments with Prize Pools – Compete based on available slots.",
        "Earn from Limited Scrims – Play. Improve. Get rewarded.",
        "Limited Opportunities for Brand Collaboration – Show your value, attract attention.",
        "Noob to Pro Pathway – You grow, we guide.",
      ],
      buttonText: "Get Started",
      popular: false,
      type: "basic",
      topHeight: "h-40 sm:h-44 md:h-48",
    },
    {
      name: "STANDARD",
      price: "1000 BDT",
      period: "per person monthly",
      subtitle: "🔥 Slice N Share Elite Gamer Benefits 🔥",
      description: "Unleash your potential. Dominate globally.",
      features: [
        "Monthly Salary Based on Performance – Play hard, get rewarded.",
        "Personalized Gamer Profile on Slice N Share Platform",
        "Bootcamp once in 4 months",
        "Content Creation Support & Guidelines",
        "Mental Health Support from Specialized Doctors",
        "Priority Entry in Monthly Tournaments – Win up to 10x your subscription.",
        "Unlimited Scrims Earning Priority – Compete & earn with top squads.",
        "Priority Access to Sponsorship Deals – Get noticed by global brands.",
        "Regular in-person coaching from Pro Players – Improve with 1:1 mentorship.",
        "Multiple Brand Collaborations – Land national & international deals.",
        "Support for International Tournaments – Flights & hotels, we've got you covered.",
        "Priority Selection in Slice N Share Esports Teams – Be the face of our roster.",
        "Exclusive Slice N Share Branding – Get noticed across platforms.",
        "AI Tools for Gamers – Access cutting-edge tools to level up your grind.",
        "Device Support on Demand – Need a better PC, phone, or gear? We'll back you.",
        "Discounts at 100+ Lifestyle Brands – In Bangladesh and worldwide.",
      ],
      buttonText: "Get Started",
      popular: true,
      type: "standard",
      topHeight: "h-56 sm:h-64 md:h-72",
    },
    {
      name: "ADVANCED",
      price: "4500 BDT",
      period: "Monthly (6 People)",
      subtitle: "🔥 Unlimited Benefits – Based on Potential & Availability",
      description: "With all the premium features",
      features: [
        "Global Gamer Profile on Slice N Share",
        "Content Creation Support (YouTube, TikTok, Insta, FB, etc.)",
        "Access to Slice N Share HQ for Bootcamps & Practice – Train in a professional environment whenever needed.",
        "Mental Health Support with Doctors (Priority++)",
        "Device Support on Demand (Gaming PC, Mobile, Accessories) – No tech barrier – we'll upgrade your gear.",
        "Entry in Ranked Monthly Tournaments (Up to 10x Subscription Rewards) – Compete in high-stakes brackets monthly.",
        "Unlimited Scrim Earning Opportunities with Ranked Gamers",
        "Unlimited Sponsorship Matchmaking (Local + Global)",
        "1:1 Coaching & Elite Mentorship by Pro Players – Sharpen your game with expert guidance.",
        "Full Support for International Tournaments (Flight + Hotel) – Play worldwide with no financial barrier.",
        "Priority Recruitment to Slice N Share Esports Team – Be part of Bangladesh's next global esports icons.",
        "Unlimited Specialized Slice N Share Branding",
        "Unlimited Global Media Features – Get featured, get noticed – globally.",
        "Access to AI-Powered Training & Performance Tools (SnS) – Train smarter with custom tools built for competitive players.",
        "🛍 500+ Discounts on Global & Local Lifestyle Brands",
      ],
      buttonText: "Get Started",
      popular: false,
      type: "advanced",
      topHeight: "h-40 sm:h-44 md:h-48",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--black)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="h4-alt mb-2">CHOOSE YOUR PLAN</h2>
            <p className="callout gradient-text-primary">
              No gatekeeping. Your skills, our platform.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {plans.map((plan, index) => (
            <div key={plan.name}>
              {plan.type === "standard" ? (
                <StandardCard
                  plan={plan}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  handleGetStarted={handleGetStarted}
                />
              ) : (
                <BasicAdvancedCard
                  plan={plan}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  handleGetStarted={handleGetStarted}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <SignupModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPlan={selectedPlan}
      />
    </section>
  );
}
