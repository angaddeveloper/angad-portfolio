import { motion } from 'motion/react';
import { Atom, Wind, Flame, Layout, FileCode, Layers, Code, Github, Monitor, Globe } from 'lucide-react';
import FadeIn from './FadeIn';

export default function SkillsSection() {
  const skills = [
    { name: 'HTML5', desc: 'Semantic layouts, SEO foundations & structured content', icon: FileCode },
    { name: 'CSS3', desc: 'Responsive selectors, variables, page layouts & fluid math', icon: Layers },
    { name: 'JavaScript', desc: 'Async promise queues, DOM controls & ES6 patterns', icon: Code },
    { name: 'React', desc: 'Component workflows, custom states & modular hooks', icon: Atom },
    { name: 'Tailwind CSS', desc: 'Atomic design lines, grid system & fluid layouts', icon: Wind },
    { name: 'Firebase', desc: 'Auth, cloud triggers, Firestore database & real-time listeners', icon: Flame },
    { name: 'GitHub', desc: 'Branch actions, team review, version control & actions', icon: Github },
    { name: 'Responsive Design', desc: 'Cross-viewport perfection for mobile, tablet & desktop', icon: Monitor },
    { name: 'UI Design', desc: 'Visual spacing, cohesive typography, branding & wireframes', icon: Layout },
    { name: 'Netlify Deployment', desc: 'Fast, secure builds, global edge CDN & domain setup', icon: Globe },
  ];

  return (
    <section 
      id="skills" 
      className="py-14 md:py-20 relative bg-[#0A0118]"
    >
      {/* Dynamic Keyframes for Light Sweep on Cards */}
      <style>{`
        @keyframes skillsweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50%, 100% { transform: translateX(150%) skewX(-15deg); }
        }
        .group:hover .group-hover\\:animate-skillsweep {
          animation: skillsweep 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      {/* Glow trails */}
      <div className="absolute top-[40%] right-0 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-96 h-96 bg-[#2563EB]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main content wrapper */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Header styling as requested */}
        <div className="flex flex-col items-center mb-10">
          <FadeIn delay={0.1}>
            <span className="text-[10px] md:text-xs tracking-[0.3em] font-semibold text-[#C9A8FF] uppercase">
              CAPABILITIES
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2} className="mt-2.5">
            <h2 className="text-3xl md:text-5xl font-black hero-heading tracking-tight uppercase">
              Skills
            </h2>
          </FadeIn>
        </div>

        {/* 5-col layout grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <FadeIn 
                key={skill.name} 
                delay={index * 0.08}
                className="h-full"
              >
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  className="glass-card p-6 rounded-2xl flex flex-col justify-between text-left group h-full border border-purple-500/15 hover:border-purple-400/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] cursor-default relative overflow-hidden transition-all duration-300 shadow-xl"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Subtle inner grid lines card glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/[0.015] to-purple-500/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                  
                  {/* Light Sweep Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-skillsweep pointer-events-none bg-gradient-to-r from-transparent via-purple-400/10 to-transparent skew-x-[-15deg] z-0" />

                  <div className="flex flex-col gap-5 relative z-10">
                    {/* Icon container with pulsing ring on hover */}
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#C9A8FF] group-hover:text-white group-hover:border-purple-400 group-hover:bg-[#8B5CF6]/15 transition-all duration-300 relative overflow-visible">
                      <div className="absolute inset-0 rounded-xl border border-purple-400/0 group-hover:border-purple-400/35 group-hover:scale-125 transition-all duration-500 pointer-events-none animate-pulse" />
                      <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    </div>

                    {/* Meta stack */}
                    <div>
                      <h3 className="text-white font-extrabold text-lg tracking-wide uppercase">
                        {skill.name}
                      </h3>
                      <p className="text-[#D7E2EA]/60 text-xs mt-1.5 leading-relaxed font-light">
                        {skill.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner designer line element */}
                  <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-gradient-to-r from-transparent to-[#8B5CF6]/40 group-hover:to-[#8B5CF6] transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 h-8 w-[2px] bg-gradient-to-b from-transparent to-[#8B5CF6]/40 group-hover:to-[#8B5CF6] transition-all duration-300" />
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
