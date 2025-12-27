import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import workflowImage from '../assets/workflow.png';

gsap.registerPlugin(ScrollTrigger);

const Workflow = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // ✅ FIXED: Ensure title is visible by default
    gsap.set(titleRef.current, {
      opacity: 1,
      y: 0,
    });

    // Optional fade-in animation (only if you scroll back up)
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // ✅ SET INITIAL STATE - Full screen
    gsap.set(imageRef.current, {
      width: '100vw',
      height: 'auto',
      maxWidth: 'none',
    });

    // ✅ SLOW scroll animation to larger card size
    gsap.to(imageRef.current, {
      width: '720px',
      height: '460px',
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 70%',
        end: 'top 10%',
        scrub: 3,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-5 pb-16 md:pb-24 px-0 min-h-screen flex flex-col"
    >
      {/* Title - Always visible, no animation blocking */}
      <div className="w-full max-w-7xl ml-2 md:ml-8 mb-8 md:mb-12 px-4 md:px-6">
        <h2
          ref={titleRef}
          className="font-druk text-sm md:text-xl font-bold text-blue-400 mb-6 md:mb-8 tracking-wide"
        >
          Our Workflow
        </h2>
      </div>

      {/* Workflow Image - Scaling Animation */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <img
          ref={imageRef}
          src={workflowImage}
          alt="Our Workflow at HELIX"
          className="object-cover rounded-none md:rounded-xl"
        />
      </div>
    </section>
  );
};

export default Workflow;
