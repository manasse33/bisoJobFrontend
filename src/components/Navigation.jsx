import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Search, Briefcase, MessageSquare, FileText,
  LayoutDashboard, LogIn, User, ChevronRight, Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

const SidebarNavigation = () => {
  // MODIFICATION 1: Récupérer currentUser depuis le hook
  const { isAuthenticated, currentUser } = useApp();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // MODIFICATION 2: Ajout d'une fonction pour les initiales
  const getInitials = (user) => {
    if (!user) return '?';
    const prenomInitial = user.prenom?.[0] || '';
    const nomInitial = user.nom?.[0] || '';
    return `${prenomInitial}${nomInitial}`.toUpperCase();
  };

  const menuItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/search', label: 'Trouver un talent', labelShort: 'Talents', icon: Search },
    { path: '/project', label: 'Publier un projet', labelShort: 'Projet', icon: FileText, auth: true },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, auth: true },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  const visibleMenuItems = menuItems.filter(item => {
    if (item.auth && !isAuthenticated) return false;
    return true;
  });

  const MenuItem = ({ item, isExpanded, isBottomNav }) => {
    const isActive = location.pathname === item.path;
    if (item.auth && !isAuthenticated) return null;

    const showLabel = (isExpanded && !isBottomNav) || isBottomNav;
    const displayLabel = isBottomNav && item.labelShort ? item.labelShort : item.label;

    return (
      <Link
        to={item.path}
        className={`group relative flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 overflow-hidden
          ${isBottomNav ? 'flex-1 flex-col py-2.5 min-w-0' : ''}
        `}
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
            : 'transparent',
          color: isActive ? 'white' : COLORS.darkBlue
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = `linear-gradient(to right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <div className={`relative z-10 flex ${isBottomNav ? 'flex-col items-center gap-1' : 'items-center gap-3 w-full'}`}>
          <div className={`flex items-center justify-center transition-all duration-300 
            ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
          >
            <item.icon
              className="h-5 w-5 flex-shrink-0 transition-all duration-300"
              style={{ color: isActive ? 'white' : COLORS.lightBlue }}
            />
          </div>
          
          {showLabel && (
            <span 
              className={`truncate transition-all duration-300
                ${isBottomNav ? 'text-xs max-w-full text-center' : 'text-sm font-medium'}
                ${isActive ? 'font-semibold' : ''}
              `}
              style={{ color: isActive ? 'white' : COLORS.darkBlue }}
            >
              {displayLabel}
            </span>
          )}

          {/* Indicateur actif pour desktop */}
          {isActive && !isBottomNav && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute right-2 w-1.5 h-6 bg-white rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </div>

        {/* Indicateur actif pour mobile (en bas) */}
        {isActive && isBottomNav && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
            style={{ backgroundColor: COLORS.lightBlue }}
            layoutId="activeIndicatorMobile"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* SIDEBAR DESKTOP */}
      <motion.aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-xl z-50
          ${isExpanded ? 'w-56' : 'w-20'} transition-all duration-300`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        initial={false}
      >
        {/* Effet de gradient subtil en arrière-plan avec les couleurs BisoJob */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom right, ${COLORS.lightBlue}08, transparent, ${COLORS.gold}05)`
          }}
        />

        {/* LOGO */}
        <div className="relative h-20 flex items-center justify-center border-b-2 border-gray-200 px-4">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                  }}
                >
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold whitespace-nowrap" style={{ color: COLORS.darkBlue }}>
                    Biso<span style={{ color: COLORS.lightBlue }}>Job</span>
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Trouvez votre talent</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                }}
              >
                <Briefcase className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MENU */}
        <nav className="relative flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {visibleMenuItems.map((item) => (
            <MenuItem key={item.path} item={item} isExpanded={isExpanded} isBottomNav={false} />
          ))}

          {/* Badge "Nouveau" avec les couleurs BisoJob */}
          {isExpanded && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 mx-2 p-3 rounded-xl border-2"
              style={{
                background: `linear-gradient(to bottom right, ${COLORS.gold}15, ${COLORS.gold}25)`,
                borderColor: `${COLORS.gold}40`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: COLORS.gold }} />
                <span className="text-xs font-bold uppercase" style={{ color: COLORS.gold }}>Nouveau</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Découvrez nos nouveaux talents vedettes !
              </p>
            </motion.div>
          )}
        </nav>

        {/* PROFIL / CONNEXION */}
        <div className="relative border-t-2 border-gray-200 p-3">
          {isAuthenticated && currentUser ? ( // Ajout de currentUser ici
            <Link
              to="/profile"
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                ${isExpanded ? '' : 'justify-center'}`}
              style={{
                background: location.pathname === '/profile'
                  ? `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/profile') {
                  e.currentTarget.style.background = `linear-gradient(to right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`;
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/profile') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110
                  ${location.pathname === '/profile' ? 'ring-2 ring-white' : ''}`}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                }}
              >
                {/* MODIFICATION 3: Remplacement des initiales codées en dur */}
                {getInitials(currentUser)}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col items-start overflow-hidden"
                  >
                    <span 
                      className="text-sm font-semibold truncate"
                      style={{ color: location.pathname === '/profile' ? 'white' : COLORS.darkBlue }}
                    >
                      {/* MODIFICATION 4: Remplacement du nom codé en dur */}
                      {currentUser?.prenom} {currentUser?.nom}
                    </span>
                    <span 
                      className="text-xs truncate"
                      style={{ color: location.pathname === '/profile' ? `${COLORS.lightBlue}30` : '#6b7280' }}
                    >
                      Voir profil
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              {!isExpanded && (
                <div 
                  className="absolute right-1 top-1 w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: COLORS.lightBlue }}
                />
              )}
            </Link>
          ) : (
            <Link
              to="/auth"
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
                ${isExpanded ? '' : 'justify-center'}`}
              style={{
                background: location.pathname === '/auth'
                  ? `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/auth') {
                  e.currentTarget.style.background = `linear-gradient(to right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`;
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/auth') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <LogIn 
                className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color: location.pathname === '/auth' ? 'white' : COLORS.lightBlue }}
              />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium"
                    style={{ color: location.pathname === '/auth' ? 'white' : COLORS.darkBlue }}
                  >
                    Connexion
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )}
        </div>

        {/* Indicateur d'expansion */}
        <div className="absolute top-1/2 -right-3 -translate-y-1/2">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </motion.div>
        </div>
      </motion.aside>

      {/* BOTTOM NAV MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-gray-200 shadow-2xl flex items-stretch z-50">
        {/* Gradient subtil en arrière-plan avec les couleurs BisoJob */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${COLORS.lightBlue}05, transparent)`
          }}
        />
        
        <div className="relative flex justify-around items-stretch w-full px-2 py-2 pb-safe">
          {visibleMenuItems.slice(0, 4).map(item => (
            <MenuItem key={item.path} item={item} isExpanded={true} isBottomNav={true} />
          ))}

          {/* Bouton connexion / profil */}
          {isAuthenticated && currentUser ? ( // Ajout de currentUser ici
            <Link
              to="/profile"
              className="relative flex flex-col items-center justify-center flex-1 py-2.5 min-w-0 rounded-xl transition-all duration-300 overflow-hidden"
              style={{
                background: location.pathname === '/profile'
                  ? `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                  : 'transparent'
              }}
              onTouchStart={(e) => {
                if (location.pathname !== '/profile') {
                  e.currentTarget.style.background = `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`;
                }
              }}
              onTouchEnd={(e) => {
                if (location.pathname !== '/profile') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div 
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-md transition-all duration-300
                  ${location.pathname === '/profile' ? 'bg-white scale-110' : ''}`}
                style={{
                  background: location.pathname === '/profile' 
                    ? 'white'
                    : `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`,
                  color: location.pathname === '/profile' ? COLORS.lightBlue : 'white'
                }}
              >
                {/* MODIFICATION 5: Remplacement des initiales (mobile) */}
                {getInitials(currentUser)}
              </div>
              <span 
                className="text-xs mt-1 truncate max-w-full font-medium"
                style={{ color: location.pathname === '/profile' ? 'white' : COLORS.darkBlue }}
              >
                Profil
              </span>
              <div 
                className="absolute top-1 right-1 w-2 h-2 rounded-full border border-white"
                style={{ backgroundColor: COLORS.lightBlue }}
              />
              {location.pathname === '/profile' && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full"
                  layoutId="activeIndicatorMobile"
                  initial={false}
                />
              )}
            </Link>
          ) : (
            <Link
              to="/auth"
              className="relative flex flex-col items-center justify-center flex-1 py-2.5 min-w-0 rounded-xl transition-all duration-300 overflow-hidden"
              style={{
                background: location.pathname === '/auth'
                  ? `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                  : 'transparent'
              }}
              onTouchStart={(e) => {
                if (location.pathname !== '/auth') {
                  e.currentTarget.style.background = `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`;
                }
              }}
              onTouchEnd={(e) => {
                if (location.pathname !== '/auth') {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <LogIn 
                className={`h-5 w-5 flex-shrink-0 transition-all duration-300
                  ${location.pathname === '/auth' ? 'scale-110' : ''}`}
                style={{ color: location.pathname === '/auth' ? 'white' : COLORS.lightBlue }}
              />
              <span 
                className="text-xs mt-1 truncate max-w-full font-medium"
                style={{ color: location.pathname === '/auth' ? 'white' : COLORS.darkBlue }}
              >
                Connexion
              </span>
              {location.pathname === '/auth' && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full"
                  layoutId="activeIndicatorMobile"
                  initial={false}
                />
              )}
            </Link>
          )}
        </div>
      </nav>

      <style jsx>{`
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .pb-safe {
            padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default SidebarNavigation;