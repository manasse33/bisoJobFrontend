// src/components/PageHeader.jsx - Version harmonisée avec les couleurs BisoJob
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, LogOut, Settings, X, Briefcase, MessageCircle } from "lucide-react";
import api from "../api/axios";

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

const PageHeader = ({ 
  title, 
  subtitle, 
  currentUser,
  userType,
  showPeriodSelector = false,
  selectedPeriod,
  onPeriodChange,
  customActions = null
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const userMenuRef = useRef(null);
  const token = localStorage.getItem("token");

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      return;
    }

    try {
      await api.post("/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b-2 border-gray-200 shadow-sm">
      {/* Gradient subtil en arrière-plan */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${COLORS.lightBlue}05, transparent, ${COLORS.gold}05)`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
        <div>
          <h1 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: COLORS.darkBlue }}
          >
            {title}
          </h1>
          <p className="text-gray-600 text-sm">
            {subtitle || `Bienvenue, ${currentUser?.prenom} ${currentUser?.nom}`}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {showPeriodSelector && (
            <select
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="px-4 py-2.5 bg-white border-2 rounded-xl focus:outline-none text-sm font-medium cursor-pointer appearance-none transition-all flex-1 md:flex-none"
              style={{
                borderColor: `${COLORS.lightBlue}40`,
                color: COLORS.lightBlue
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
              onBlur={(e) => e.target.style.borderColor = `${COLORS.lightBlue}40`}
            >
              <option value="jour">Aujourd'hui</option>
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois</option>
            </select>
          )}

          {customActions}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: `${COLORS.lightBlue}15`,
                color: COLORS.lightBlue
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = `${COLORS.lightBlue}25`}
              onMouseLeave={(e) => e.target.style.backgroundColor = `${COLORS.lightBlue}15`}
              title="Menu utilisateur"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown User Menu */}
            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 overflow-hidden animate-fadeIn"
                style={{ borderColor: `${COLORS.lightBlue}30` }}
              >
                <div 
                  className="p-4 border-b-2"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.lightBlue}10 0%, ${COLORS.gold}10 100%)`,
                    borderBottomColor: `${COLORS.lightBlue}30`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-12 w-12 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                      }}
                    >
                      {currentUser?.prenom?.charAt(0)}{currentUser?.nom?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p 
                        className="font-bold truncate"
                        style={{ color: COLORS.darkBlue }}
                      >
                        {currentUser?.prenom} {currentUser?.nom}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: `${COLORS.lightBlue}20`,
                      color: COLORS.lightBlue
                    }}
                  >
                    {userType === "admin" ? "Administrateur" : userType === "freelance" ? "Freelance" : "Client"}
                  </span>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                    style={{ color: COLORS.darkBlue }}
                  >
                    <User className="h-5 w-5" style={{ color: COLORS.lightBlue }} />
                    <span className="font-medium">Mon profil</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                    style={{ color: COLORS.darkBlue }}
                  >
                    <Settings className="h-5 w-5" style={{ color: COLORS.lightBlue }} />
                    <span className="font-medium">Paramètres</span>
                  </button>

                  <div className="border-t-2 border-gray-100 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-semibold"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default PageHeader;