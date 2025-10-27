import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Briefcase, 
  TrendingUp,
  Sparkles,
  Menu,
  X,
  MapPin,
  Award
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Couleurs du logo: Bleu marine foncé (#1a3a52), Bleu clair (#4a9fd8), Doré (#d4a574)
  const colors = {
    darkBlue: '#1a3a52',
    lightBlue: '#4a9fd8',
    gold: '#d4a574',
    darkBlueDark: '#0f2537',
    lightBlueDark: '#3a8fc8'
  };

  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}>
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <span className="text-2xl font-bold" style={{ color: colors.darkBlue }}>
              Biso<span style={{ color: colors.lightBlue }}>Job</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
            onClick={() => navigate("/search")}
              className="font-medium transition-colors text-gray-700"
              style={{ ':hover': { color: colors.lightBlue } }}
              onMouseEnter={(e) => e.target.style.color = colors.lightBlue}
              onMouseLeave={(e) => e.target.style.color = '#374151'}
            >
              Trouver un talent
            </button>
            <button 
             onClick={() => navigate("/projet")}
              className="font-medium transition-colors text-gray-700"
              onMouseEnter={(e) => e.target.style.color = colors.lightBlue}
              onMouseLeave={(e) => e.target.style.color = '#374151'}
            >
              Publier un projet
            </button>
            <button 
       
              className="font-medium transition-colors text-gray-700"
              onMouseEnter={(e) => e.target.style.color = colors.lightBlue}
              onMouseLeave={(e) => e.target.style.color = '#374151'}
            >
              Contact
            </button>
            <button 
              onClick={() => navigate("/auth")}
              className="px-6 py-2.5 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}
            >
              Connexion
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-6 space-y-3">
            <button 
              onClick={() => { setCurrentPage && setCurrentPage('search'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
            >
              Trouver un talent
            </button>
            <button 
              onClick={() => { setCurrentPage && setCurrentPage('project'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
            >
              Publier un projet
            </button>
            <button 
              onClick={() => { setCurrentPage && setCurrentPage('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => { setCurrentPage && setCurrentPage('auth'); setMobileMenuOpen(false); }}
              className="block w-full px-4 py-3 text-white rounded-xl font-bold shadow-lg"
              style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}
            >
              Connexion
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(26,58,82,0.03) 0%, rgba(255,255,255,1) 50%, rgba(74,159,216,0.03) 100%)` }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 lg:space-y-10"
            >
              <div className="space-y-6">
             

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                  Le talent congolais,
                  <span className="block mt-2" style={{ 
                    background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    simplement accessible
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                  BisoJob connecte entreprises et freelances qualifiés au Congo. 
                  Trouvez le professionnel qu'il vous faut, rapidement et en toute confiance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setCurrentPage && setCurrentPage('search')}
                  className="group px-8 py-4 text-white rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}
                >
                  Trouver un freelance
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                   onClick={() => navigate("/auth")}
                  className="px-8 py-4 border-2 bg-white text-gray-900 rounded-xl font-bold hover:shadow-lg transition-all"
                  style={{ borderColor: colors.lightBlue }}
                  onMouseEnter={(e) => e.target.style.borderColor = colors.darkBlue}
                  onMouseLeave={(e) => e.target.style.borderColor = colors.lightBlue}
                >
                  Créer mon profil
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Profils vérifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Contact direct</span>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ 
                    background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    2.3K+
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Projets réalisés</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ 
                    background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    847+
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Freelances actifs</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl font-bold" style={{ 
                    background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">Satisfaction</div>
                </div>
              </div> */}
            </motion.div>

            {/* Right Visual - VOTRE LOGO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative flex items-center justify-center h-[500px]">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative"
                >
                  {/* Effet de glow derrière le logo */}
                  <div className="absolute inset-0 blur-3xl opacity-30 rounded-full"
                    style={{ background: `radial-gradient(circle, ${colors.lightBlue} 0%, transparent 70%)` }}
                  />
                  
                  {/* Votre logo */}
                  <div className="relative w-80 h-80 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center border-4"
                    style={{ borderColor: `${colors.lightBlue}40` }}
                  >
                    <img 
                      src="logo-bisojob.jpg" 
                      alt="BisoJob Logo"
                      className="w-64 h-64 object-contain"
                    />
                  </div>

                  {/* Sparkles animés avec couleurs du logo */}
                  <motion.div
                    animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    className="absolute top-0 left-10"
                  >
                    <Sparkles className="w-8 h-8" style={{ color: colors.gold }} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [0, 1.5, 0], rotate: [0, -180, -360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute top-0 right-10"
                  >
                    <Sparkles className="w-8 h-8" style={{ color: colors.gold }} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-10 left-20"
                  >
                    <Sparkles className="w-6 h-6" style={{ color: colors.lightBlue }} />
                  </motion.div>
                </motion.div>

                {/* Floating Stats avec couleurs du logo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border-2 p-4"
                  style={{ borderColor: `${colors.lightBlue}30` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.lightBlue}20 0%, ${colors.lightBlue}40 100%)` }}
                    >
                      <TrendingUp className="w-6 h-6" style={{ color: colors.lightBlue }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">24+</div>
                      <div className="text-sm text-gray-600 font-medium">Projets réalisés</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl border-2 p-4"
                  style={{ borderColor: `${colors.darkBlue}30` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.darkBlue}20 0%, ${colors.darkBlue}40 100%)` }}
                    >
                      <Users className="w-6 h-6" style={{ color: colors.darkBlue }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">8+</div>
                      <div className="text-sm text-gray-600 font-medium">Freelances actifs</div>
                    </div>
                  </div>
                </motion.div>

                {/* Orbiting icons avec couleurs du logo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-[20%] left-[10%]">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}
                    >
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute bottom-[20%] right-[10%]">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${colors.lightBlue} 0%, ${colors.gold} 100%)` }}
                    >
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi choisir BisoJob
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme pensée pour simplifier la mise en relation professionnelle
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: Search,
                color: colors.darkBlue,
                title: 'Recherche efficace',
                description: 'Filtres avancés pour trouver exactement le profil dont vous avez besoin en quelques clics.'
              },
              {
                icon: Award,
                color: colors.lightBlue,
                title: 'Profils vérifiés',
                description: 'Tous les freelances sont vérifiés avec portfolio, expériences et évaluations clients.'
              },
              {
                icon: MapPin,
                color: colors.gold,
                title: 'Contact direct',
                description: 'Échangez directement avec les freelances via WhatsApp, téléphone ou messagerie.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)` }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comment ça fonctionne
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Trois étapes simples pour démarrer
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                number: '01',
                title: 'Inscription',
                description: 'Créez votre compte gratuitement en quelques minutes. Renseignez vos informations de base.'
              },
              {
                number: '02',
                title: 'Recherche',
                description: 'Parcourez les profils ou publiez votre projet. Filtrez par compétences, expérience et localisation.'
              },
              {
                number: '03',
                title: 'Collaboration',
                description: 'Contactez directement les freelances et démarrez votre collaboration en toute simplicité.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl sm:text-7xl font-bold text-gray-100 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section avec couleurs du logo */}
      <section className="py-20 sm:py-32 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.darkBlueDark} 0%, ${colors.darkBlue} 50%, ${colors.lightBlueDark} 100%)` }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 30% 50%, ${colors.lightBlue} 0%, transparent 50%)` }}
        />
        <div className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 70% 50%, ${colors.gold} 0%, transparent 50%)` }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-12">
              Rejoignez BisoJob et accédez aux meilleurs talents du Congo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage && setCurrentPage('search')}
                className="px-10 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
              >
                Explorer les talents
              </button>
              <button 
                onClick={() => setCurrentPage && setCurrentPage('auth')}
                className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white transition-all"
                style={{ color: 'white' }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = colors.darkBlue;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Créer mon compte
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.lightBlue} 100%)` }}
              >
                <span className="text-lg font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold" style={{ color: colors.darkBlue }}>
                Biso<span style={{ color: colors.lightBlue }}>Job</span>
              </span>
            </div>
            <p className="text-gray-600 text-center md:text-left">
              © 2024 BisoJob. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
