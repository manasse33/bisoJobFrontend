import React from 'react';
import { Star, MapPin, Briefcase, Eye, Award, Clock, DollarSign } from 'lucide-react';

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

const FreelanceCard = ({ freelance, onViewProfile, index = 0 }) => {
  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 hover:shadow-xl transition-all duration-300 overflow-hidden group"
      style={{ borderColor: '#e5e7eb' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${COLORS.lightBlue}40`}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
    >
      {/* Badge Vedette avec les couleurs du logo */}
      {freelance.est_en_vedette && (
        <div 
          className="border-b-2"
          style={{ 
            background: `linear-gradient(to right, ${COLORS.gold}15, ${COLORS.gold}25, ${COLORS.gold}15)`,
            borderBottomColor: `${COLORS.gold}40`
          }}
        >
          <div className="flex items-center gap-2 justify-center py-3 px-4">
            <Award className="w-4 h-4" style={{ color: COLORS.gold }} />
            <span 
              className="font-bold text-xs uppercase tracking-wide"
              style={{ color: COLORS.gold }}
            >
              Freelance Vedette
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* En-tête avec photo */}
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 border-2 transition-all"
            style={{ 
              background: `linear-gradient(to bottom right, ${COLORS.lightBlue}20, ${COLORS.gold}20)`,
              borderColor: `${COLORS.lightBlue}40`
            }}
            onMouseEnter={(e) => e.target.style.borderColor = COLORS.lightBlue}
            onMouseLeave={(e) => e.target.style.borderColor = `${COLORS.lightBlue}40`}
          >
            {freelance.user?.photo_profil ? (
              <img
                src={freelance.user.photo_profil}
                alt={`${freelance.user.prenom} ${freelance.user.nom}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span 
                className="text-xl font-bold"
                style={{ color: COLORS.lightBlue }}
              >
                {freelance.user?.prenom?.[0]}{freelance.user?.nom?.[0]}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-xl mb-1 truncate group-hover:opacity-80 transition-opacity"
              style={{ color: COLORS.darkBlue }}
            >
              {freelance.user?.prenom} {freelance.user?.nom}
            </h3>
            <p className="text-sm text-gray-600 truncate font-medium">
              {freelance.titre_professionnel || freelance.categorie}
            </p>
          </div>
        </div>

        {/* Biographie courte */}
        {freelance.biographie && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
            {freelance.biographie}
          </p>
        )}

        {/* Stats Grid avec les couleurs du logo */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div 
            className="p-3 rounded-xl border-2"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`,
              borderColor: `${COLORS.lightBlue}30`
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4" style={{ color: COLORS.lightBlue }} />
              <p className="text-xs text-gray-600 font-medium">Note</p>
            </div>
            <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>
              {Number(freelance.note_moyenne || 0).toFixed(1)}
              <span className="text-xs font-normal text-gray-500 ml-1">({freelance.nombre_avis || 0})</span>
            </p>
          </div>

          <div 
            className="p-3 rounded-xl border-2"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.gold}10, ${COLORS.gold}20)`,
              borderColor: `${COLORS.gold}30`
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4" style={{ color: COLORS.gold }} />
              <p className="text-xs text-gray-600 font-medium">Projets</p>
            </div>
            <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>
              {freelance.nombre_projets_realises || 0}
            </p>
          </div>

          <div 
            className="p-3 rounded-xl border-2"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.darkBlue}10, ${COLORS.darkBlue}20)`,
              borderColor: `${COLORS.darkBlue}30`
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4" style={{ color: COLORS.darkBlue }} />
              <p className="text-xs text-gray-600 font-medium">Ville</p>
            </div>
            <p className="text-sm font-bold truncate" style={{ color: COLORS.darkBlue }}>
              {freelance.user?.ville || 'N/A'}
            </p>
          </div>

          <div 
            className="p-3 rounded-xl border-2"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.lightBlueDark}10, ${COLORS.lightBlueDark}20)`,
              borderColor: `${COLORS.lightBlueDark}30`
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4" style={{ color: COLORS.lightBlueDark }} />
              <p className="text-xs text-gray-600 font-medium">Vues</p>
            </div>
            <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>
              {freelance.nombre_vues || 0}
            </p>
          </div>
        </div>

        {/* Compétences avec les couleurs du logo */}
        {freelance.competences && freelance.competences.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {freelance.competences.slice(0, 3).map((comp, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border-2"
                style={{
                  backgroundColor: `${COLORS.lightBlue}15`,
                  color: COLORS.lightBlue,
                  borderColor: `${COLORS.lightBlue}30`
                }}
              >
                {comp.nom_competence}
              </span>
            ))}
            {freelance.competences.length > 3 && (
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold border-2 border-gray-200">
                +{freelance.competences.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Tarifs avec les couleurs du logo */}
        <div 
          className="flex items-center justify-between mb-4 p-4 rounded-xl border-2"
          style={{
            background: `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.gold}10)`,
            borderColor: `${COLORS.lightBlue}30`
          }}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" style={{ color: COLORS.lightBlue }} />
            <span className="text-xs font-semibold text-gray-600 uppercase">À partir de</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold" style={{ color: COLORS.lightBlue }}>
              {freelance.tarif_minimum?.toLocaleString() || 0}
            </span>
            <span className="text-xs font-medium text-gray-500">FCFA</span>
          </div>
        </div>

        {/* Bouton Voir profil avec les couleurs du logo */}
        <button
          onClick={onViewProfile}
          className="w-full px-6 py-3 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
          }}
        >
          Voir le profil
        </button>
      </div>

      {/* Badge de disponibilité avec les couleurs du logo */}
      <div 
        className="h-1.5"
        style={{
          backgroundColor: freelance.disponibilite ? `${COLORS.lightBlue}20` : `${COLORS.gold}20`
        }}
      />
      <div 
        className="px-4 py-3 text-center text-sm font-semibold border-t-2"
        style={{
          backgroundColor: freelance.disponibilite ? `${COLORS.lightBlue}15` : `${COLORS.gold}15`,
          color: freelance.disponibilite ? COLORS.lightBlue : COLORS.gold,
          borderColor: freelance.disponibilite ? `${COLORS.lightBlue}30` : `${COLORS.gold}30`
        }}
      >
        {freelance.disponibilite ? '✓ Disponible maintenant' : '○ Actuellement occupé'}
      </div>
    </div>
  );
};

export default FreelanceCard;