import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaEnvelope, FaLink } from 'react-icons/fa';
import mobileImage from '../assets/mobile.png';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const phoneRef = useRef(null);
  const instagramRef = useRef(null);
  const gmailRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    // ✅ SET INITIAL HIDDEN STATE FIRST
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 30,
    });

    gsap.set(phoneRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.set([instagramRef.current, gmailRef.current, linkRef.current], {
      opacity: 0,
      scale: 0,
      y: 20,
    });

    const ctx = gsap.context(() => {
      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Phone rise animation
      gsap.to(phoneRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: phoneRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Icons stagger animation
      const iconsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: phoneRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      iconsTimeline
        .to(
          instagramRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
          0.6
        )
        .to(
          gmailRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
          0.9
        )
        .to(
          linkRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
          1.2
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-6 min-h-screen flex flex-col"
    >
      {/* Title */}
      <div className="w-full max-w-7xl ml-2 md:ml-8 mb-12 md:mb-16">
        <h2
          ref={titleRef}
          className="font-druk text-lg md:text-2xl font-bold text-[#1e40af] tracking-wide"
        >
          Call to Action
        </h2>
      </div>

      {/* Phone Container - Centered */}
      <div className="w-full flex items-center justify-center flex-1">
        {/* Phone with Icons Inside */}
        <div ref={phoneRef} className="relative">
          {/* Mobile Phone Image */}
          <img
            src={mobileImage}
            alt="Mobile Phone"
            className="w-80 h-auto md:w-[500px] lg:w-[600px] object-contain"
          />

          {/* Icons Container */}
          <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 flex flex-col space-y-3 md:space-y-4 w-[55%] md:w-[50%]">
            {/* Instagram Icon + ID */}
            <a
              href="https://instagram.com/helix.studios"
              target="_blank"
              rel="noopener noreferrer"
              ref={instagramRef}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-md px-2 py-2 md:px-3 md:py-2.5 border border-white/20 hover:border-pink-500/60 transition-all duration-300 group"
            >
              <FaInstagram className="text-pink-500 text-base md:text-xl group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-white text-[10px] md:text-xs font-medium truncate">helix.studios</span>
            </a>

            {/* Gmail Icon + Email */}
            <a
              href="mailto:helixstudios5@gmail.com"
              ref={gmailRef}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md rounded-md px-2 py-2 md:px-3 md:py-2.5 border border-white/20 hover:border-red-500/60 transition-all duration-300 group"
            >
              <FaEnvelope className="text-red-500 text-base md:text-xl group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-white text-[10px] md:text-xs font-medium truncate">helixstudios5@gmail.com</span>
            </a>

            {/* Link Icon + Website */}
            <a
              href="#"
              ref={linkRef}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-md px-2 py-2 md:px-3 md:py-2.5 border border-white/20 hover:border-blue-500/60 transition-all duration-300 group"
            >
              <FaLink className="text-blue-400 text-base md:text-xl group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-white text-[10px] md:text-xs font-medium truncate">helix.studios</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
