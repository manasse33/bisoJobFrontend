import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, TrendingUp, Star, ChevronRight, Play, Award, MapPin, Calendar, ArrowRight, Sparkles, Target, Globe, MessageSquare } from 'lucide-react';

// Composant Hero amélioré avec animations
export function Hero() {
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { value: "24", label: "Universités partenaires", icon: <Globe className="w-5 h-5" /> },
    { value: "180+", label: "Programmes d'études", icon: <BookOpen className="w-5 h-5" /> },
    { value: "12 500+", label: "Étudiants orientés", icon: <Users className="w-5 h-5" /> },
    { value: "95%", label: "Taux de satisfaction", icon: <Star className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 min-h-screen flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">Nouveau : Test d'orientation IA</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Trace ton avenir
                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  après le bac
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                Découvre les filières qui te correspondent, compare les meilleures universités du Congo et construis le parcours de tes rêves avec notre accompagnement personnalisé.
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold flex items-center justify-center">
                <Target className="w-5 h-5 mr-2" />
                Test d'orientation gratuit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </button>
            </div>

            {/* Barre de recherche avancée */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 border border-white/20">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Rechercher une filière, université ou métier..."
                    className="flex-1 px-4 py-4 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-lg"
                  />
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section statistiques animées */}
          <div className="space-y-8">
            {/* Carte statistique principale */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  {stats[currentStat].icon}
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-white">{stats[currentStat].value}</div>
                  <div className="text-blue-200">{stats[currentStat].label}</div>
                </div>
              </div>
            </div>

            {/* Mini statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all duration-500 ${
                    index === currentStat ? 'ring-2 ring-cyan-400 bg-white/10' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-cyan-400">{stat.icon}</div>
                    <div>
                      <div className="text-white font-bold">{stat.value}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}