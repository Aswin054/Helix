import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import videoSource from '../assets/source.mp4';

gsap.registerPlugin(SplitText);

const Hero = () => {
  const helixWrapperRef = useRef(null);
  const helixRef = useRef(null);
  const subheadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const scrollTextRef = useRef(null);

  useEffect(() => {
    let helixChars, subheadingChars, paragraphWords;

    // ✅ WAIT FOR FONTS BEFORE SPLITTEXT (Fixes warnings)
    document.fonts.ready.then(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // MASKED SPLIT REVEAL FOR HELIX
      helixChars = new SplitText(helixRef.current, { type: 'chars' });

      // Start with wrapper clipped + chars offset
      gsap.set(helixWrapperRef.current, {
        overflow: 'hidden',
        clipPath: 'inset(0 100% 0 0)',
      });

      gsap.set(helixChars.chars, {
        opacity: 0,
        yPercent: 110,
      });

      // Reveal mask + bring chars up
      tl.to(helixWrapperRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.to(
        helixChars.chars,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // BUILT TO MOVE
      subheadingChars = new SplitText(subheadingRef.current, { type: 'chars' });
      tl.from(
        subheadingChars.chars,
        {
          opacity: 0,
          y: 8,
          scale: 0.9,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        },
        '+=0.2'
      );

      // Paragraph
      paragraphWords = new SplitText(paragraphRef.current, { type: 'words' });
      tl.from(
        paragraphWords.words,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power2.out',
        },
        '+=0.3'
      );

      // Infinite horizontal scrolling (no font dependency)
      const scrollContainer = scrollTextRef.current;
      const scrollWidth = scrollContainer.scrollWidth / 2;
      gsap.to(scrollContainer, {
        x: -scrollWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % scrollWidth),
        },
      });
    });

    // Cleanup
    return () => {
      if (helixChars) helixChars.revert();
      if (subheadingChars) subheadingChars.revert();
      if (paragraphWords) paragraphWords.revert();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* HELIX Heading - Greek Style with MASK */}
          <div ref={helixWrapperRef} className="inline-block">
            <h1
              ref={helixRef}
              className="greek-heading hero-text-primary text-8xl md:text-9xl font-bold mb-6"
              style={{
                letterSpacing: '0.2em',
                lineHeight: '0.9',
                fontVariant: 'small-caps',
              }}
            >
              HELIX
            </h1>
          </div>

          {/* Built to Move Subheading */}
          <h2
            ref={subheadingRef}
            className="font-druk text-2xl md:text-3xl hero-text-secondary mb-8 tracking-widest"
          >
            BUILT TO MOVE
          </h2>

          {/* Description Paragraph */}
          <p
            ref={paragraphRef}
            className="font-italy text-lg md:text-xl hero-text-tertiary max-w-2xl text-center leading-relaxed"
          >
            Motion-driven digital experiences that turn scrolling into storytelling.
          </p>
        </div>
      </section>

      {/* Auto-Scrolling Horizontal Text */}
      <section className="relative bg-[#0a0e27] py-8 overflow-hidden">
        <div
          ref={scrollTextRef}
          className="flex whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="font-druk text-4xl md:text-6xl text-white/20 mx-12">
                Visual Flow
              </span>
              <span className="text-white/20 text-4xl mx-12">-</span>
              <span className="font-druk text-4xl md:text-6xl text-white/20 mx-12">
                Motion Design
              </span>
              <span className="text-white/20 text-4xl mx-12">-</span>
              <span className="font-druk text-4xl md:text-6xl text-white/20 mx-12">
                Digital Rhythm
              </span>
              <span className="text-white/20 text-4xl mx-12">-</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
