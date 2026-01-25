import React, { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Virtual Closet",
    role: "",
    year: "",
    description: "Coming Soon!",
    color: "from-rose-900 to-orange-900",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    link: ""
  },
  /*
  {
    id: 2,
    title: "Draft RAG",
    role: "Full Stack Developer",
    year: "2023",
    description: "Built an end-to-end platform serving millions of users with seamless performance.",
    color: "from-rose-900 to-orange-900",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
  },
  */
  {
    id: 3,
    title: "HackRPI",
    role: "Vice President & Director of Finance",
    year: "2022-2025",
    description: "Organized one of the largest hackathons in the Capital Region, fostering innovation and collaboration.",
    color: "from-violet-900 to-indigo-900",
    image: "/logo_gray.png",
    link: "https://2024.hackrpi.com"
  }
];

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const start = windowHeight;
      const end = -elementHeight;
      const current = rect.top;
      const rawProgress = 1 - (current - end) / (start - end);
      
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
  
  return progress;
}

function ProjectSection({ project, index }) {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  
  const opacity = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 pointer-events-none`}
        style={{ opacity: opacity * 0.15 }}
      />
      
      <div
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
        style={{ opacity }}
      >
        <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-widest uppercase text-zinc-300">
              {project.role}
            </p>
            <p className="text-zinc-500 text-sm">{project.year}</p>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            {project.title}
          </h2>
          
          <p className="text-xl text-zinc-400 leading-relaxed max-w-md">
            {project.description}
          </p>
          
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${project.color} text-white font-medium transition-all hover:scale-105 hover:shadow-lg`}>
              See More
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
        
        <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
          <div 
            className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
            style={{
              transform: `rotate(${(progress - 0.5) * 5}deg)`,
            }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 pointer-events-none`} />
          </div>
          
          <div 
            className={`absolute -z-10 w-72 h-72 rounded-full bg-gradient-to-br ${project.color} blur-3xl opacity-30`}
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${0.5 + progress * 0.5})`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const opacity = Math.max(0, 1 - scrollY / 400);
  const translateY = scrollY * 0.3;
  
  return (
    <section id="home" ref={heroRef} className="min-h-screen relative overflow-hidden bg-zinc-950">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img 
          src="/home-bg.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Content - centered text */}
      <div 
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div className="text-center mt-0 md:mt-50 lg:mt-70 bg-white/5  rounded-2xl p-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Hello!
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl max-w-2xl mx-auto">
            I'm Adwait, a CS master's student at the University of Southern California specializing in data science, with experience in retrieval-augmented generation systems, machine learning models, and production-grade data pipelines.         
         </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-400">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-zinc-500 flex justify-center pt-2">
            <div className="w-1 h-2 bg-zinc-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactRef = useRef(null);
  const progress = useScrollProgress(contactRef);
  
  const opacity = progress < 0.3 ? progress / 0.3 : 1;
  const translateY = (1 - Math.min(progress * 1.5, 1)) * 50;
  
  return (
    <section id="contact" ref={contactRef} className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full blur-3xl" />
      </div>
      
      <div 
        className="relative z-10 text-center px-6"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          About Me
        </h2>
        <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">
          I’m deeply enthusiastic about data science and have a constant desire to learn and explore. With a strong foundation in CS and math, I’ve applied that curiosity across projects ranging from improving production data pipelines and ETL workflows to building data analysis tools for ice hockey and evaluating LLMs for bias. Before coming to USC, I graduated from Rensselaer Polytechnic Institute in 2025 with a Bachelor's in Computer Science and Mathematics with minors in Data Science and Economics. 
        </p>
        
        <a 
          href="mailto:anaware21@gmail.com" 
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-zinc-900 font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20"
        >
          Get in touch
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        
        <div className="flex justify-center gap-6 mt-16">
          <a href="https://www.linkedin.com/in/adwaitnaware/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">
            LinkedIn
          </a>
          <a href="https://github.com/anaware21" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">
            GitHub
          </a>
          <a href="https://www.instagram.com/adwaitnaware/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">
            Instagram
          </a>
          <a href="https://beliapp.co/app/adwaitnaware" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">
            Beli
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="bg-zinc-950">
      {/* Fixed navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="flex items-center gap-8">
            <a href="#home" className="text-sm text-white hover:opacity-70 transition-opacity">
              Home
            </a>
            <a href="#projects" className="text-sm text-white hover:opacity-70 transition-opacity">
              Projects
            </a>
            <a href="#contact" className="text-sm text-white hover:opacity-70 transition-opacity">
              Contact
            </a>
            <a href="https://drive.google.com/file/d/1Xwm1BxEBXCbUK5q3UHz2t70jrKczDgvz/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:opacity-70 transition-opacity">
              Resume
            </a>
          </div>
        </div>
      </nav>
      
      <HeroSection />

      <ContactSection />

      {/* Projects */}
      <div id="projects" className="bg-zinc-950">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}