import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Sparkles,
  Users,
  ChevronDown,
  X,
  Filter,
} from 'lucide-react';

// Import API
import api from '../api/axios';
import PageHeader from '../components/Header';
import FreelanceCard from '../components/FreelanceCard';
import FreelanceProfileModal from '../components/FreelanceProfileModal';
import { useApp } from "../context/AppContext";

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

// Catégories
const categories = [
  'Développement Web',
  'Design Graphique',
  'Marketing Digital',
  'Rédaction',
  'Traduction',
  'Consulting',
  'Photographie',
  'Vidéo',
];

// StatCard avec les couleurs du logo
const StatCard = ({ title, value, icon: Icon, colorScheme }) => {
  const getGradient = (scheme) => {
    switch(scheme) {
      case 'primary':
        return `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`;
      case 'secondary':
        return `linear-gradient(135deg, ${COLORS.lightBlue} 0%, ${COLORS.lightBlueDark} 100%)`;
      case 'accent':
        return `linear-gradient(135deg, ${COLORS.lightBlue} 0%, ${COLORS.gold} 100%)`;
      case 'dark':
        return `linear-gradient(135deg, ${COLORS.darkBlueDark} 0%, ${COLORS.darkBlue} 100%)`;
      default:
        return `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ background: getGradient(colorScheme) }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-white/90 text-sm font-medium mb-2">{title}</p>
            <p className="text-white text-4xl font-bold">{value}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant SelectField avec les couleurs du logo
const SelectField = ({ name, value, onChange, options, placeholder, icon: Icon }) => (
  <div className="relative group">
    {Icon && (
      <Icon 
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none z-10 transition-colors" 
        style={{ color: value ? COLORS.lightBlue : '#9ca3af' }}
      />
    )}
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 ${
        Icon ? 'pl-12' : ''
      } pr-10 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none transition-all text-gray-900 font-medium cursor-pointer appearance-none`}
      style={{
        borderColor: value ? `${COLORS.lightBlue}40` : '#e5e7eb'
      }}
      onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
      onBlur={(e) => e.target.style.borderColor = value ? `${COLORS.lightBlue}40` : '#e5e7eb'}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown 
      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none transition-colors" 
      style={{ color: value ? COLORS.lightBlue : '#9ca3af' }}
    />
  </div>
);

// Composant principal SearchPage
const SearchPage = ({ sidebarWidth = 50 }) => {
  const { currentUser } = useApp();
  const [freelances, setFreelances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    location: '',
    searchQuery: '',
  });
  
  // États pour le modal
  const [selectedFreelance, setSelectedFreelance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFreelances = async () => {
      try {
        setLoading(true);
        const res = await api.get('/freelances');
        const data = res.data.data?.data || [];
        setFreelances(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        alert('Impossible de charger les freelances');
        setFreelances([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelances();
  }, []);

  const filteredFreelances = useMemo(() => {
    if (!Array.isArray(freelances)) return [];
    return freelances
      .filter((f) =>
        !searchFilters.category ||
        searchFilters.category === 'Tous' ||
        f.categorie?.includes(searchFilters.category)
      )
      .filter((f) =>
        !searchFilters.location || f.user?.ville === searchFilters.location
      )
      .filter((f) =>
        !searchFilters.searchQuery ||
        f.user?.nom?.toLowerCase().includes(searchFilters.searchQuery.toLowerCase()) ||
        f.user?.prenom?.toLowerCase().includes(searchFilters.searchQuery.toLowerCase()) ||
        f.titre_professionnel?.toLowerCase().includes(searchFilters.searchQuery.toLowerCase())
      )
      .sort((a, b) => (b.est_en_vedette ? 1 : -1));
  }, [freelances, searchFilters]);

  const handleFilterChange = (filterType, value) => {
    setSearchFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleResetFilters = () => {
    setSearchFilters({ category: '', location: '', searchQuery: '' });
  };

  const handleViewProfile = (freelance) => {
    setSelectedFreelance(freelance);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFreelance(null);
  };

  const isFiltered =
    searchFilters.category || searchFilters.location || searchFilters.searchQuery;

  // Stats
  const stats = {
    total: freelances.length,
    disponibles: filteredFreelances.length,
    enVedette: freelances.filter(f => f.est_en_vedette).length,
    categories: [...new Set(freelances.map(f => f.categorie).filter(Boolean))].length,
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ 
          marginLeft: window.innerWidth >= 768 ? sidebarWidth : 0,
          background: `linear-gradient(135deg, ${COLORS.lightBlue}08 0%, ${COLORS.darkBlue}05 50%, white 100%)`
        }}
      >
        <div className="text-center">
          <div 
            className="w-20 h-20 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ 
              borderColor: `${COLORS.lightBlue}30`,
              borderTopColor: COLORS.lightBlue 
            }}
          />
          <p className="font-bold text-lg" style={{ color: COLORS.lightBlue }}>
            Chargement des talents...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen pb-20 md:pb-0"
      style={{ 
        marginLeft: window.innerWidth >= 768 ? sidebarWidth : 0,
        background: `linear-gradient(135deg, ${COLORS.lightBlue}08 0%, ${COLORS.darkBlue}05 50%, white 100%)`
      }}
    >
      {/* Header réutilisable */}
      <PageHeader
        title="Trouvez votre talent"
        subtitle="Parcourez nos meilleurs freelances et experts"
        currentUser={currentUser}
        userType={currentUser?.type_utilisateur}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Grid avec les couleurs du logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard title="Total Talents" value={stats.total} icon={Users} colorScheme="primary" />
          <StatCard title="Disponibles" value={stats.disponibles} icon={Sparkles} colorScheme="secondary" />
          <StatCard title="En Vedette" value={stats.enVedette} icon={Sparkles} colorScheme="accent" />
          <StatCard title="Catégories" value={stats.categories} icon={Filter} colorScheme="dark" />
        </div>

        {/* Filtres avec les couleurs du logo */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-3 border border-gray-100 mb-8">
          <div className="relative flex-1">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
              style={{ color: searchFilters.searchQuery ? COLORS.lightBlue : '#9ca3af' }}
            />
            <input
              type="text"
              placeholder="Rechercher un talent..."
              value={searchFilters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900 font-medium"
              onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <SelectField
            name="category"
            value={searchFilters.category}
            onChange={(value) => handleFilterChange('category', value)}
            options={categories}
            placeholder="Toutes les catégories"
            icon={Sparkles}
          />
          <SelectField
            name="location"
            value={searchFilters.location}
            onChange={(value) => handleFilterChange('location', value)}
            options={['Brazzaville', 'Pointe-Noire', 'Dolisie']}
            placeholder="Toutes les villes"
            icon={MapPin}
          />
          <button
            onClick={handleResetFilters}
            disabled={!isFiltered}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>
        </div>

        {/* Header résultats avec les couleurs du logo */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-2xl md:text-3xl font-bold flex items-center gap-3"
            style={{ color: COLORS.darkBlue }}
          >
            <div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.lightBlue}20 0%, ${COLORS.gold}20 100%)` 
              }}
            >
              <Users className="h-5 w-5 md:h-6 md:w-6" style={{ color: COLORS.lightBlue }} />
            </div>
            Résultats
            <span 
              className="ml-2 px-3 md:px-4 py-1 md:py-1.5 text-white rounded-full text-sm md:text-base font-bold shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
              }}
            >
              {filteredFreelances.length}
            </span>
          </h2>
        </div>

        {/* Liste des freelances */}
        {filteredFreelances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelances.map((f, index) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <FreelanceCard 
                  freelance={f} 
                  onViewProfile={() => handleViewProfile(f)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 text-center border border-gray-100 shadow-lg"
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.lightBlue}20 0%, ${COLORS.gold}20 100%)` 
              }}
            >
              <Search className="w-12 h-12" style={{ color: COLORS.lightBlue }} />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.darkBlue }}>
              Aucun résultat trouvé
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {isFiltered
                ? "Essayez d'ajuster vos filtres ou votre recherche"
                : "Aucun talent disponible pour le moment"}
            </p>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
                }}
              >
                <X className="w-5 h-5" />
                Réinitialiser les filtres
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal de profil */}
      <FreelanceProfileModal
        freelance={selectedFreelance}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentUser={currentUser}
        api={api}
      />
    </main>
  );
};

export default SearchPage;