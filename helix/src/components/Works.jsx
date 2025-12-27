import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const sectionRef = useRef(null);
  const subheadingRef = useRef(null);
  const mainTextRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    // ✅ SET INITIAL HIDDEN STATE FIRST (like Workflow.jsx)
    gsap.set([subheadingRef.current, mainTextRef.current], {
      opacity: 0,
      y: 20,
    });

    gsap.set(iconRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.5,
    });

    // ✅ Then create animations
    const ctx = gsap.context(() => {
      // Subheading animation
      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Main text animation
      gsap.to(mainTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mainTextRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Icon animation
      gsap.to(iconRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: iconRef.current,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 px-4 md:px-6 flex flex-col items-center justify-center"
    >
      {/* Subheading */}
      <div className="w-full text-center mb-6 md:mb-8">
        <h2
          ref={subheadingRef}
          className="font-druk text-sm md:text-xl font-bold text-blue-400 tracking-wide"
        >
          Our Works
        </h2>
      </div>

      {/* Main Text */}
      <div className="w-full max-w-4xl text-center mb-6">
        <h3
          ref={mainTextRef}
          className="font-domaine text-[28px] md:text-[45px] text-white leading-[1.2] md:leading-[1.1] whitespace-normal md:whitespace-nowrap"
        >
          Your Project, Our First Story
        </h3>
      </div>

      {/* Icon */}
      <div ref={iconRef} className="mt-4">
        <svg
          className="w-20 h-20 md:w-24 md:h-24 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.13 22.19l-.93-3.44a8.5 8.5 0 01-6.59-6.59L2.17 11.23a1 1 0 01.32-1.41L7 7.16a13.94 13.94 0 0110.13-2.65 1 1 0 01.83.83A13.94 13.94 0 0115.31 15.47l-2.66 4.51a1 1 0 01-1.41.32zM8.5 10.5a2 2 0 104 0 2 2 0 00-4 0zM2 17l3 3M7 13l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Works;
