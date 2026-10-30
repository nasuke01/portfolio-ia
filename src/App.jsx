import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download, X, Briefcase, GraduationCap, Mail, Moon, Sun } from 'lucide-react';

// --- ANIMATIONS ---
const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

// --- NAVBAR ---
function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path ? "text-primary-purple font-bold" : "text-gray-600 dark:text-gray-300 hover:text-primary-purple dark:hover:text-primary-purple";

  return (
    <nav className="p-6 border-b border-gray-200 dark:border-gray-800/50 backdrop-blur-md sticky top-0 z-40 bg-white/70 dark:bg-[#0a0514]/70 transition-colors duration-500">
      <div className="flex justify-between items-center">
        
        {/* 1. Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/photo_profil.jpeg" 
            alt="Logo Massina" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-purple shadow-sm"
          />
          <span className="text-2xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">
            Massina <span className="text-primary-purple">Diao</span>
          </span>
        </Link>
        
        {/* 2. Menu Ordinateur */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium items-center">
          <li><Link to="/" className={`transition ${isActive('/')}`}>Accueil</Link></li>
          <li><Link to="/projets" className={`transition ${isActive('/projets')}`}>Projets</Link></li>
          <li><Link to="/experiences" className={`transition ${isActive('/experiences')}`}>Expériences</Link></li>
          <li><Link to="/competences" className={`transition ${isActive('/competences')}`}>Compétences</Link></li>
          <li><Link to="/a-propos" className={`transition ${isActive('/a-propos')}`}>À propos</Link></li>
          <li><Link to="/contact" className={`transition ${isActive('/contact')}`}>Contact</Link></li>
          <li>
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>

        {/* 3. Boutons Mobile (Hamburger + Thème) */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-600 dark:text-gray-300">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white focus:outline-none p-1">
            {isOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Menu Déroulant Mobile */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-2 text-base font-medium border-t border-gray-200 dark:border-gray-800 pt-4">
          <li><Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Accueil</Link></li>
          <li><Link to="/projets" className={isActive('/projets')} onClick={() => setIsOpen(false)}>Projets</Link></li>
          <li><Link to="/experiences" className={isActive('/experiences')} onClick={() => setIsOpen(false)}>Expériences</Link></li>
          <li><Link to="/competences" className={isActive('/competences')} onClick={() => setIsOpen(false)}>Compétences</Link></li>
          <li><Link to="/a-propos" className={isActive('/a-propos')} onClick={() => setIsOpen(false)}>À propos</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}

// --- SOUS-COMPOSANT : CARTE DE PROJET ---
function ProjectCard({ projet, onOpen }) {
  return (
    <div className="bg-white dark:bg-gray-900/40 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary-purple/50 dark:hover:border-primary-purple/50 transition-all duration-300 flex flex-col h-full group shadow-xl">
      <div className="h-52 bg-gray-200 dark:bg-gray-900 relative overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => onOpen(projet)}>
        <img src={projet.image} alt={projet.titre} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition duration-700" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x400/1e1a3a/8b5cf6?text=Projet"; }} />
      </div>
      <div className="p-6 flex flex-col flex-grow z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {projet.badges.map((b, i) => <span key={i} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-700/30">{b}</span>)}
        </div>
        <h3 className="text-xl font-serif font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-purple transition cursor-pointer" onClick={() => onOpen(projet)}>{projet.titre}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{projet.desc_courte}</p>
        <div className="flex justify-between items-center pt-5 border-t border-gray-200 dark:border-gray-800 mt-auto">
          <div className="text-xs text-gray-500 font-mono font-medium">{projet.technos.slice(0, 3).join(" • ")}</div>
          <button onClick={() => onOpen(projet)} className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-purple dark:hover:text-primary-purple transition flex items-center gap-1">Détails <ArrowUpRight size={16}/></button>
        </div>
      </div>
    </div>
  );
}

// --- PAGE D'ACCUEIL ---
function Home({ projets, technologies, onOpenProject }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <main className="flex flex-col-reverse md:flex-row items-center justify-between p-10 md:p-20 max-w-7xl mx-auto gap-12 relative z-10">
        <motion.div className="md:w-1/2 space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white dark:bg-gray-900/50 border border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
             <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>
             Recherche de stage (Avril 2027)
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-serif font-extrabold leading-tight text-gray-900 dark:text-white">
            Bienvenue, je me nomme <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-primary-purple">
              Elhadji Massina Diao
            </span>
          </motion.h1>
          
          <motion.h2 variants={fadeIn} className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Je suis <span className="bg-primary-purple text-white px-3 py-1 rounded-md ml-1 shadow-md">Développeur IA & Data</span>
          </motion.h2>
          
          <motion.p variants={fadeIn} className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
            Actuellement en <strong className="text-gray-900 dark:text-gray-200">Master 1 Intelligence Artificielle</strong>. Du développement logiciel performant à l'analyse avancée des données, mon objectif est de concevoir des applications intelligentes complètes, de la base de données jusqu'à l'interface finale.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
            <Link to="/projets" className="bg-primary-purple hover:bg-purple-600 px-6 py-3 rounded-lg font-bold transition text-white shadow-lg shadow-purple-500/30">Voir mes projets</Link>
            <Link to="/contact" className="bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700 hover:border-primary-purple dark:hover:border-primary-purple text-gray-900 dark:text-white px-6 py-3 rounded-lg font-bold transition shadow-sm">Me contacter</Link>
            <a href="/CV_Massina_DIAO_Stage_IA.pdf" download className="bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700 hover:border-primary-purple dark:hover:border-primary-purple text-gray-900 dark:text-white px-4 py-3 rounded-lg font-bold transition flex items-center gap-2 shadow-sm"><Download size={20}/> CV</a>
          </motion.div>
        </motion.div>

        <motion.div className="md:w-1/2 flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-white dark:border-primary-purple/30 overflow-hidden shadow-2xl dark:shadow-[0_0_60px_rgba(139,92,246,0.3)]">
            <img src="/photo_profil.jpeg" alt="Elhadji Massina Diao" className="w-full h-full object-cover hover:scale-105 transition duration-700" onError={(e) => e.target.src = "https://via.placeholder.com/400"} />
          </div>
        </motion.div>
      </main>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-6xl mx-auto px-6 pb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800/50 rounded-3xl p-10 shadow-xl">
          <motion.div variants={fadeIn} className="text-center">
            <p className="text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-primary-purple mb-2">12+</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Projets réalisés</p>
          </motion.div>
          <motion.div variants={fadeIn} className="text-center">
            <p className="text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-primary-purple mb-2">4+</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Années d'études</p>
          </motion.div>
          <motion.div variants={fadeIn} className="text-center">
            <p className="text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-primary-purple mb-2">15+</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Technologies</p>
          </motion.div>
          <motion.div variants={fadeIn} className="text-center">
            <p className="text-4xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-primary-purple mb-2">4</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Expériences Pro</p>
          </motion.div>
        </div>
      </motion.section>

      <section className="border-y border-gray-200 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/20 py-6 overflow-hidden relative z-10 backdrop-blur-sm">
        <div className="flex animate-marquee gap-4 w-max px-4">
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <span key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl text-sm font-medium shadow-sm">{tech}</span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div><h2 className="text-4xl font-serif font-extrabold mb-2 text-gray-900 dark:text-white">Projets phares</h2><p className="text-gray-600 dark:text-gray-400">Une sélection de mes réalisations récentes.</p></div>
          <Link to="/projets" className="text-primary-purple hover:text-purple-700 dark:hover:text-white font-semibold transition">Tout voir →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projets.slice(0, 3).map((projet, index) => (
            <ProjectCard key={index} projet={projet} onOpen={onOpenProject} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// --- PAGE PROJETS ---
function ProjectsPage({ projets, onOpenProject }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-6 py-20 min-h-screen relative z-10">
      <h1 className="text-5xl font-serif font-extrabold mb-4 text-gray-900 dark:text-white">Tous mes projets</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl">Découvrez l'ensemble de mes réalisations, du développement système bas niveau aux interfaces web modernes et à l'analyse de données.</p>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={staggerContainer}>
        {projets.map((projet, index) => (
          <motion.div key={index} variants={fadeIn}><ProjectCard projet={projet} onOpen={onOpenProject} /></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// --- PAGE EXPÉRIENCES ---
function ExperiencePage() {
  const experiences = [
    { titre: "Développeur Full-Stack (Stagiaire)", lieu: "DEFAR SCI, Dakar (À distance)", date: "Mai - Juil. 2026", desc: "Conception et développement d'AssoWeb, une plateforme dédiée à une association. Mise en place d'un espace centralisé pour le partage d'opportunités de stages, de projets et l'entraide communautaire.", technos: ["React", "Node.js", "Express", "MongoDB"] },
    { titre: "Développeur Full-Stack (Stagiaire)", lieu: "DEFAR SCI, Dakar (Présentiel, Temps plein)", date: "Mai - Juil. 2025", desc: "Développement complet d'une plateforme de soutien scolaire en ligne (e-learning). Création d'espaces dédiés pour élèves, professeurs et parents, intégrant la gestion des cours, un système de quiz interactifs et un forum d'échange.", technos: ["Laravel", "PHP", "MySQL", "Bootstrap"] },
    { titre: "Développeur Full-Stack (Stagiaire)", lieu: "DEFAR SCI, Dakar (Présentiel, Temps plein)", date: "Mai - Juil. 2024", desc: "Création de la plateforme MagEvents pour la gestion complète d'événements. Implémentation des modules de création d'événements, gestion des inscriptions, billetterie, et mise en place de tableaux de bord de suivi pour les organisateurs.", technos: ["Node.js", "Express", "React", "MongoDB"] },
    { titre: "Technicien de Maintenance (Stagiaire)", lieu: "ARC Informatique", date: "Sept. - Oct. 2023", desc: "Diagnostic des pannes matérielles, maintenance logicielle et réseau, support direct aux utilisateurs pour garantir la continuité des services.", technos: ["Maintenance", "Réseau", "Support IT"] }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-6 py-20 min-h-screen relative z-10">
      <h1 className="text-5xl font-serif font-extrabold mb-4 text-gray-900 dark:text-white">Expériences Professionnelles</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-16">Mes immersions en entreprise et les projets concrets qui y ont été réalisés.</p>
      
      <div className="relative border-l-2 border-gray-300 dark:border-gray-800 ml-4 md:ml-10 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="relative pl-8 md:pl-12">
            <div className="absolute -left-[21px] top-1 bg-white dark:bg-[#0a0514] border-4 border-primary-purple p-2 rounded-full">
              <Briefcase size={16} className="text-primary-purple dark:text-light-purple" />
            </div>
            <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-primary-purple/50 transition shadow-xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">{exp.titre}</h3>
                <span className="text-sm font-medium text-purple-700 dark:text-primary-purple bg-purple-100 dark:bg-purple-900/20 px-3 py-1 rounded-full mt-2 md:mt-0">{exp.date}</span>
              </div>
              <p className="text-primary-purple font-medium text-sm mb-4">{exp.lieu}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{exp.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {exp.technos.map((t, i) => <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- PAGE COMPÉTENCES ---
function SkillsPage({ langages, categories }) {
  const [activeLang, setActiveLang] = useState(langages[0]);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (activeLang.niveau / 100) * circumference;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-6 py-20 min-h-screen relative z-10">
      <h1 className="text-5xl font-serif font-extrabold mb-12 text-gray-900 dark:text-white">Compétences</h1>
      
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Langages les plus utilisés</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">Répartition par maîtrise et usage dans mes projets.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="relative flex items-center justify-center">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="16" fill="transparent" className="text-gray-200 dark:text-gray-800/50" />
              <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className={`${activeLang.colorStroke} transition-all duration-700 ease-out`} />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-extrabold ${activeLang.colorText} transition-colors duration-300`}>{activeLang.niveau}%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activeLang.nom}</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-2">
            {langages.map((lang, idx) => (
              <div key={idx} onMouseEnter={() => setActiveLang(lang)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${activeLang.nom === lang.nom ? 'bg-gray-100 dark:bg-gray-800/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'}`}>
                <div className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${lang.colorBg}`}></span>
                  <span className={`font-semibold ${activeLang.nom === lang.nom ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{lang.nom}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-gray-500 text-sm hidden sm:block">{lang.desc}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-medium w-8 text-right">{lang.niveau}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        {categories.map((cat, idx) => (
          <motion.div key={idx} variants={fadeIn} className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <h3 className="text-xl font-serif font-bold mb-8 text-gray-900 dark:text-white">{cat.categorie}</h3>
            <div className="space-y-6">
              {cat.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.nom}</span>
                    <span className="text-gray-500">{skill.niveau}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: skill.niveau }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }} className={`${cat.barColor} h-full rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// --- PAGE À PROPOS ---
function AboutPage() {
  const parcours = [
    { date: "2026 - 2027", titre: "Master 1 Intelligence Artificielle", lieu: "Université Clermont Auvergne - ISIMA  (France)" },
    { date: "2025 - 2026", titre: "Licence 3 MIASHS", lieu: "Université Toulouse II Jean-Jaurès (France)" },
    { date: "2022 - 2025", titre: "Licence Génie Logiciel et Systèmes d'Information", lieu: "École Supérieure Polytechnique de Dakar (Sénégal)" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-6 py-20 min-h-screen relative z-10">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-serif font-extrabold text-gray-900 dark:text-white">À propos de moi</h1>
        <a href="/CV_Massina_DIAO_Stage_IA.pdf" download className="hidden md:flex bg-primary-purple hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition items-center gap-2 shadow-lg">
          <Download size={20} /> Télécharger mon CV
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <motion.div variants={fadeIn} className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <h3 className="text-2xl font-serif font-bold mb-4 text-primary-purple">L'origine d'une passion</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Issu d'une famille où l'étude des sciences est une véritable tradition, j'ai grandi avec un esprit fortement analytique. Très jeune, j'étais fasciné par le fonctionnement de la technologie : j'explorais sans cesse les réglages et les systèmes des téléphones pour comprendre "ce qu'il y avait sous le capot".
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Cette curiosité naturelle pour tout ce qui touche à l'informatique m'a naturellement orienté vers des études scientifiques. La combinaison des mathématiques et du code est devenue mon outil pour bâtir des solutions réelles.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-[#1a103c] p-8 rounded-3xl border border-purple-100 dark:border-purple-900/50 shadow-xl">
            <h3 className="text-2xl font-serif font-bold mb-4 text-purple-600 dark:text-light-purple">Au-delà du code</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Je suis un grand passionné de sport. Qu'il s'agisse de <strong>Football</strong>, de <strong>Basketball</strong>, ou des sports automobiles comme la <strong>Formule 1</strong>, j'y retrouve des valeurs qui s'appliquent au développement logiciel : l'esprit d'équipe, la stratégie, la précision millimétrée et la recherche constante de performance.
            </p>
          </motion.div>
        </div>

        <div>
          <h3 className="text-3xl font-serif font-extrabold mb-8 text-gray-900 dark:text-white">Parcours Académique</h3>
          <div className="relative border-l-2 border-gray-300 dark:border-gray-800 ml-4 space-y-10">
            {parcours.map((item, index) => (
              <motion.div key={index} variants={fadeIn} className="relative pl-8">
                <div className="absolute -left-[21px] top-1 bg-white dark:bg-[#0a0514] border-4 border-primary-purple p-2 rounded-full">
                  <GraduationCap size={16} className="text-primary-purple dark:text-light-purple" />
                </div>
                <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
                  <span className="text-sm font-bold text-primary-purple block mb-2">{item.date}</span>
                  <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-1">{item.titre}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.lieu}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="md:hidden mt-10 w-full bg-primary-purple hover:bg-purple-600 text-white px-6 py-4 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg">
            <Download size={20} /> Télécharger mon CV
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- PAGE CONTACT ---
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const data = {
      access_key: "d2c578d9-0364-46d7-a11f-89be36fb6384",
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-6 py-20 min-h-screen relative z-10">
      <h1 className="text-5xl font-serif font-extrabold mb-12 text-center text-gray-900 dark:text-white">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <a href="mailto:massinadiao01@gmail.com" className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center hover:border-primary-purple dark:hover:border-primary-purple transition group shadow-lg">
          <Mail size={32} className="text-purple-600 dark:text-light-purple mb-4 group-hover:scale-110 transition" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Email</span>
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center hover:border-primary-purple dark:hover:border-primary-purple transition group shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-light-purple mb-4 group-hover:scale-110 transition"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.5 5.5 0 0 0 19 7.82a5.5 5.5 0 0 0-.1-3.2s-1.3-.4-4 1.4a13.3 13.3 0 0 0-7 0C5.3 4.2 4 4.6 4 4.6a5.5 5.5 0 0 0-.1 3.2A5.5 5.5 0 0 0 2 11.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 22"></path></svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">GitHub</span>
        </a>
        <a href="https://linkedin.com/in/massina-diao-" target="_blank" rel="noreferrer" className="bg-white dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 rounded-2xl flex flex-col items-center hover:border-primary-purple dark:hover:border-primary-purple transition group shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-light-purple mb-4 group-hover:scale-110 transition"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">LinkedIn</span>
        </a>
      </div>
      
      <div className="bg-white dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-8 md:p-12 rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Votre nom</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary-purple" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Votre email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary-purple" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Votre message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary-purple"></textarea>
          </div>
          
          <button type="submit" disabled={status === 'sending'} className="bg-primary-purple hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold w-full transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>

          {status === 'success' && <p className="text-green-500 font-medium text-center mt-4">Message envoyé avec succès ! Je vous répondrai rapidement.</p>}
          {status === 'error' && <p className="text-red-500 font-medium text-center mt-4">Une erreur est survenue lors de l'envoi du message.</p>}
        </form>
      </div>
    </motion.div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [projetActif, setProjetActif] = useState(null);
  
  // GESTION DU THEME DARK/LIGHT
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const technologies = ["Python", "R", "Java", "C / C++", "JavaScript", "React", "Next.js", "Vue.js", "Node.js", "Laravel", "MySQL", "MongoDB", "Firebase", "spaCy", "Stanza", "Git", "Tailwind"];
  
  const langagesPhares = [
    { nom: "Python", desc: "pandas, spaCy, Stanza", niveau: 90, colorBg: "bg-blue-500", colorStroke: "text-blue-500", colorText: "text-blue-600 dark:text-blue-400" },
    { nom: "JavaScript / TS", desc: "React, Next.js, Vue", niveau: 85, colorBg: "bg-yellow-500", colorStroke: "text-yellow-500", colorText: "text-yellow-600 dark:text-yellow-400" },
    { nom: "Java", desc: "POO, Android", niveau: 80, colorBg: "bg-orange-500", colorStroke: "text-orange-500", colorText: "text-orange-600 dark:text-orange-400" },
    { nom: "C / C++", desc: "Algorithmique, POO", niveau: 80, colorBg: "bg-purple-500", colorStroke: "text-purple-500", colorText: "text-purple-600 dark:text-purple-400" },
    { nom: "PHP", desc: "Laravel", niveau: 75, colorBg: "bg-pink-500", colorStroke: "text-pink-500", colorText: "text-pink-600 dark:text-pink-400" }
  ];

  const skillCategories = [
    { categorie: "Frontend", barColor: "bg-purple-500", skills: [{ nom: "HTML", niveau: "95%" }, { nom: "CSS", niveau: "85%" }, { nom: "JavaScript", niveau: "85%" }, { nom: "React", niveau: "85%" }, { nom: "Next.js", niveau: "75%" }, { nom: "Vue.js", niveau: "70%" }, { nom: "Tailwind CSS", niveau: "90%" }] },
    { categorie: "Backend", barColor: "bg-pink-500", skills: [{ nom: "Node.js", niveau: "85%" }, { nom: "Express", niveau: "80%" }, { nom: "Java", niveau: "80%" }, { nom: "PHP", niveau: "75%" }, { nom: "Laravel", niveau: "75%" }] },
    { categorie: "Data & IA", barColor: "bg-blue-500", skills: [{ nom: "Python", niveau: "90%" }, { nom: "pandas", niveau: "85%" }, { nom: "spaCy", niveau: "80%" }, { nom: "Stanza", niveau: "80%" }, { nom: "R (FactoMineR)", niveau: "80%" }] },
    { categorie: "Systèmes, BDD & Outils", barColor: "bg-teal-500", skills: [{ nom: "MySQL", niveau: "85%" }, { nom: "PostgreSQL", niveau: "80%" }, { nom: "MongoDB", niveau: "80%" }, { nom: "Firebase", niveau: "85%" }, { nom: "C / C++ (Système)", niveau: "80%" }, { nom: "Git / GitHub", niveau: "90%" }, { nom: "UML", niveau: "85%" }] }
  ];

  const projets = [
    { titre: "AssoWeb", desc_courte: "Plateforme web étudiante : annuaire et génération de CV.", description: "Développée en totale autonomie, cette plateforme permet aux étudiants de poster des annonces et de postuler via un système de génération de CV PDF automatique. L'architecture a été pensée avec UML avant l'implémentation.", badges: ["Web", "Fullstack"], technos: ["React", "Node.js", "MongoDB"], image: "/capture-assoweb.png" },
    { titre: "Gestion Parrainages", desc_courte: "Solution sécurisée pour l'élection présidentielle au Sénégal.", description: "Projet à fort enjeu visant à informatiser le processus électoral. Le frontend assure une saisie extrêmement rapide et robuste pour éviter toute perte de donnée critique.", badges: ["Web", "Fullstack"], technos: ["Angular", "Node.js", "MySQL"], image: "/capture-parrainage.png" },
    { titre: "Plateforme Scolaire", desc_courte: "Application E-learning reliant élèves, professeurs et parents.", description: "Développement complet d'une plateforme de soutien scolaire en ligne intégrant la gestion des rôles, des cours, des quiz interactifs et un forum d'échange.", badges: ["Web", "Fullstack"], technos: ["Laravel", "Bootstrap", "MySQL"], image: "/capture-ecole.png" },
    { titre: "Plateforme Asso 404", desc_courte: "Plateforme web de gestion associative (projet académique).", description: "Projet académique consistant en la création d'une plateforme complète pour l'association étudiante Asso 404. Développement d'un tableau de bord administrateur, gestion des membres et affichage des événements en temps réel.", badges: ["Web", "Fullstack"], technos: ["React", "Node.js", "Firebase", "Tailwind"], image: "/capture-asso404.png" },
    { titre: "MagEvents", desc_courte: "Plateforme automatisant la gestion des inscriptions, les notifications et le feedback.", description: "MagEvents est une solution complète conçue pour pallier les lourdeurs de la gestion événementielle traditionnelle. L'application automatise le suivi des inscriptions, l'envoi de notifications ciblées et la collecte de feedback après l'événement.", badges: ["Web", "Fullstack"], technos: ["React", "Node.js", "MongoDB"], image: "/capture-magevents.png" },
    { titre: "Mately", desc_courte: "Application mobile de gestion de tâches et productivité.", description: "Application fullstack combinant un backend Express API REST et une interface mobile intuitive pour la catégorisation avancée des tâches du quotidien.", badges: ["Mobile", "Fullstack"], technos: ["React Native", "Node.js", "MongoDB"], image: "/capture-mately.png" },
    { titre: "League of Stones", desc_courte: "Jeu de cartes interactif avec consommation d'API.", description: "Projet web de jeu de stratégie implémentant des mécaniques complexes d'affichage et de gestion d'état côté client, en communiquant avec une API REST pour récupérer les données de cartes.", badges: ["Web", "Frontend"], technos: ["React", "Firebase", "API"], image: "/capture-stones.png" },
    { titre: "Analyse NLP Textuelle", desc_courte: "Segmentation, POS tagging sur textes et extraction statistique.", description: "Projet de recherche d'humanités numériques. L'objectif était de comparer les performances des bibliothèques spaCy et Stanza sur des transcriptions textuelles complexes pour en générer des statistiques fiables en CSV.", badges: ["IA", "Scripts"], technos: ["Python", "spaCy", "Stanza"], image: "/capture-nlp.png" },
    { titre: "Mini-shell POSIX", desc_courte: "Interpréteur de commandes système en langage C.", description: "Développement bas niveau d'un mini-shell supportant les commandes internes (cd, exit), la création de processus enfants avec fork(), l'exécution via execvp() et la gestion de l'attente avec wait().", badges: ["Système", "C"], technos: ["C", "POSIX", "Processus"], image: "/capture-shell.png" },
    { titre: "Auto-Battle Donjon", desc_courte: "Simulation de combat appliquant les design patterns en C++.", description: "Création d'un moteur de jeu de rôle au tour par tour. L'architecture repose lourdement sur la programmation orientée objet avancée (héritage, polymorphisme) et les design patterns de création.", badges: ["Logiciel", "POO"], technos: ["C++", "UML", "Patterns"], image: "/capture-donjon.png" },
    { titre: "Réservation Services", desc_courte: "Prototype mobile natif sous Android Studio.", description: "Application Android permettant à un utilisateur de parcourir, rechercher et réserver des services spécifiques via des formulaires interactifs liés aux Activités natives de l'OS.", badges: ["Mobile", "Natif"], technos: ["Java", "Android Studio", "XML"], image: "/capture-android.png" },
    { titre: "Simulation Rover Mars", desc_courte: "Réseau simulant la communication TCP multithreadée.", description: "Projet système axé sur la programmation réseau. Écriture de sockets en C pour établir une communication TCP fiable, avec gestion du multithreading pour les capteurs du rover.", badges: ["Réseau", "Système"], technos: ["C", "Sockets", "Threads"], image: "/capture-rover.png" }
  ];

  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50 dark:bg-[#0a0514] text-gray-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
        
        {/* FOND LUMINEUX MIXTE DYNAMIQUE (Aura / Halos) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-30 bg-purple-300 dark:bg-purple-900 transition-colors duration-700"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 bg-teal-200 dark:bg-teal-900 transition-colors duration-700"></div>
        </div>

        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home projets={projets} technologies={technologies} onOpenProject={setProjetActif} />} />
            <Route path="/projets" element={<ProjectsPage projets={projets} onOpenProject={setProjetActif} />} />
            <Route path="/experiences" element={<ExperiencePage />} />
            <Route path="/competences" element={<SkillsPage langages={langagesPhares} categories={skillCategories} />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
        
        <AnimatePresence>
          {projetActif && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={() => setProjetActif(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-[#110b1f] border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="h-64 relative bg-gray-200 dark:bg-gray-900">
                  <img src={projetActif.image} alt={projetActif.titre} className="w-full h-full object-cover opacity-90 dark:opacity-80" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x400/1e1a3a/8b5cf6?text=Projet"; }} />
                  <button onClick={() => setProjetActif(null)} className="absolute top-4 right-4 bg-white/50 dark:bg-black/50 hover:bg-primary-purple dark:hover:bg-primary-purple text-gray-900 dark:text-white p-2 rounded-full transition"><X size={20} /></button>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projetActif.badges.map((b, i) => <span key={i} className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700/30">{b}</span>)}
                  </div>
                  <h3 className="text-3xl font-serif font-extrabold mb-4 text-gray-900 dark:text-white">{projetActif.titre}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">{projetActif.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Stack :</span>
                    <div className="text-sm text-purple-700 dark:text-light-purple font-mono font-medium bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-800/30">{projetActif.technos.join(" / ")}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="border-t border-gray-200 dark:border-gray-800/50 text-center py-8 text-gray-500 dark:text-gray-600 text-sm mt-10 relative z-10">
          © 2026 Elhadji Massina Diao - Tous droits réservés.
        </footer>
      </div>
    </Router>
  );
}