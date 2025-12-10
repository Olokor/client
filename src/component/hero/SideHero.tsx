import React, { useState, useEffect } from 'react';

interface Slide {
  image: string;
  quote: string;
  author: string;
}

// Hero Component with sliding images and quotes
export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const slides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela"
    },
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quote: "The beautiful thing about learning is that nobody can take it away from you.",
      author: "B.B. King"
    },
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quote: "Education is not preparation for life; education is life itself.",
      author: "John Dewey"
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full overflow-hidden rounded-r-1xl">
      {/* Background slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-transparent" />
        </div>
      ))}
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between p-12">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
          </div>
          <span className="text-white text-xl font-bold">OEDUS</span>
        </div>

        {/* Quote section */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed">
              "{slides[currentSlide].quote}"
            </blockquote>
            <cite className="text-lg text-blue-200 font-medium">
              — {slides[currentSlide].author}
            </cite>
          </div>
          
          {/* Slide indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-between text-white/60">
          <span className="text-sm">Welcome to the future of education</span>
          <div className="flex space-x-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};