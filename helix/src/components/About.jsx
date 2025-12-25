import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    let titleSplit, line1Split, line2Split, line3Split;

    // ✅ TEXT ANIMATIONS - Wait for fonts
    document.fonts.ready.then(() => {
      titleSplit = new SplitText(titleRef.current, { type: 'lines' });
      line1Split = new SplitText(line1Ref.current, { type: 'words' });
      line2Split = new SplitText(line2Ref.current, { type: 'words' });
      line3Split = new SplitText(line3Ref.current, { type: 'words' });

      gsap.from(titleSplit.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(line1Split.words, {
        yPercent: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line1Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(line2Split.words, {
        yPercent: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line2Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(line3Split.words, {
        yPercent: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line3Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // ✅ CARDS ANIMATION - With proper initial state
    const cards = cardsContainerRef.current?.querySelectorAll('.tilt-card');
    if (cards && cards.length > 0) {
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        rotateX: -15,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (titleSplit) titleSplit.revert();
      if (line1Split) line1Split.revert();
      if (line2Split) line2Split.revert();
      if (line3Split) line3Split.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-16 px-4 md:px-6 bg-[#0f1538] flex flex-col items-start min-h-screen"
    >
      {/* Intro Content - Mobile Optimized */}
      <div className="relative z-10 w-full max-w-4xl ml-2 md:ml-8 mb-12 md:mb-20">
        <h2
          ref={titleRef}
          className="font-druk text-xs md:text-lg font-bold text-blue-400 mb-6 md:mb-8 tracking-wide"
        >
          How it differs
        </h2>
        
        <div className="space-y-4 md:space-y-6">
          {/* ✅ Mobile: Allow wrap, Desktop: No wrap */}
          <p 
            ref={line1Ref} 
            className="font-italy text-[28px] md:text-[45px] hero-text-tertiary leading-[1.2] md:leading-[1.1] whitespace-normal md:whitespace-nowrap"
          >
            Helix doesn't just build websites.
          </p>
          
          <p 
            ref={line2Ref} 
            className="font-domaine text-[28px] md:text-[45px] hero-text-primary leading-[1.2] md:leading-[1.1] whitespace-normal md:whitespace-nowrap"
          >
            We craft futuristic, motion-driven experiences
          </p>
          
          <p 
            ref={line3Ref} 
            className="font-italy text-base md:text-lg text-[#a1a1aa] italic leading-relaxed"
          >
            where information is not told — it's visualized.
          </p>
        </div>
      </div>

      {/* 3D Tilt Cards Section - Mobile Optimized */}
      <div ref={cardsContainerRef} className="w-full max-w-7xl mx-auto px-2 md:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <TiltCard 
            title="Creative Websites"
            description="We design visually engaging websites that go beyond static layouts. Every element is crafted with motion, balance, and clarity to create an experience that feels modern, intuitive, and memorable."
          />
          <TiltCard 
            title="Unique Landing Pages"
            description="We build custom landing pages that elevate a brand's online presence. Each page is designed to highlight the identity of the business, attract attention, and convert visitors through thoughtful layout and motion."
          />
          <TiltCard 
            title="Low Cost, High Quality"
            description="We focus on delivering premium design and performance without unnecessary complexity. By streamlining our process, we provide high-quality results at a cost that remains accessible for growing businesses."
          />
          <TiltCard 
            title="Customer-Friendly Approach"
            description="We work closely with clients at every stage, keeping communication clear and collaborative. Our process is transparent, flexible, and focused on delivering solutions that truly meet the client's needs."
          />
        </div>
      </div>
    </section>
  );
};

// 3D Tilt Card Component - Mobile Enhanced
const TiltCard = ({ title, description }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return; // Disable tilt on mobile
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
    gsap.to(cardRef.current, {
      scale: 1.05,
      z: 50,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // Touch handlers for mobile
  const handleTouchStart = () => {
    if (!isMobile) return;
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="tilt-card relative bg-gradient-to-br from-[#1a235c]/40 to-[#0a0e27]/60 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10 cursor-pointer transition-all duration-300 min-h-[280px] md:min-h-0"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Depth layer (Z-axis illusion) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl md:rounded-2xl blur-xl opacity-0 transition-opacity duration-300"
        style={{
          transform: 'translateZ(-50px)',
          opacity: isHovered ? 0.6 : 0,
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-druk text-lg md:text-2xl text-white mb-3 md:mb-4 tracking-wide">
          {title}
        </h3>
        <p className="font-italy text-sm md:text-base text-[#d4d4d8] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Shine effect on hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 rounded-xl md:rounded-2xl pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  );
};

export default About;
