import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  RefreshCw,
  TrendingUp,
  Clock,
  AlertTriangle,
  X,
  AlertCircle,
} from "lucide-react";

// ### PALETTE UNIFIÉE (Basée sur DashboardPage.jsx) ###
// Cette palette est la "source de vérité" pour toutes les couleurs.
const PALETTE = {
  // 1. Couleurs de Marque (confirmées de BisoJob)
  primary: '#4a9fd8',      // lightBlue
  primaryHover: '#3a8fc8', // lightBlueDark
  primaryDark: '#1a3a52',   // darkBlue
  primaryDarkHover: '#0f2537', // darkBlueDark
  accent: '#d4a574',       // gold

  // 2. Couleurs Sémantiques (unifiées)
  success: '#28a745',
  successBg: 'rgba(40, 167, 69, 0.1)',
  successText: '#15803d', // Vert foncé pour texte
  
  danger: '#dc3545',
  dangerBg: 'rgba(220, 53, 69, 0.1)',
  dangerText: '#b91c1c', // Rouge foncé pour texte
  
  warning: '#ffc107',
  warningBg: 'rgba(255, 193, 7, 0.1)',
  warningText: '#d97706', // Orange/Jaune foncé pour texte

  // 3. Niveaux de Gris (unifiés)
  text: '#212529',         // text-gray-900 (Texte principal)
  textMuted: '#6b7280',    // text-gray-600 (Texte secondaire)
  textLight: '#ffffff',    // text-white
  
  bgPage: '#f8f9fa',       // Fond de page (similaire à gray-50)
  bgComponent: '#ffffff',  // Fond de carte (white)
  bgComponentLight: 'rgba(255, 255, 255, 0.8)', // bg-white/80
  
  border: '#e5e7eb',        // border-gray-200
  borderLight: '#f3f4f6',   // border-gray-100 (similaire à gray-100)

  // 4. Teintes (pour les fonds légers, remplace bg-blue-50 etc.)
  primaryTint: 'rgba(74, 159, 216, 0.1)',
  primaryTintHover: 'rgba(74, 159, 216, 0.15)',
  primaryTintBorder: 'rgba(74, 159, 216, 0.3)',
  
  accentTint: 'rgba(212, 165, 116, 0.1)',
  accentTintBorder: 'rgba(212, 165, 116, 0.3)',
  
  // 5. Dégradés (basés sur les couleurs de marque)
  gradientPrimary: 'linear-gradient(135deg, #1a3a52 0%, #4a9fd8 100%)', // darkBlue -> lightBlue
  gradientSecondary: 'linear-gradient(135deg, #4a9fd8 0%, #3a8fc8 100%)', // lightBlue -> lightBlueDark
  gradientAccent: 'linear-gradient(135deg, #4a9fd8 0%, #d4a574 100%)', // lightBlue -> gold
  gradientDark: 'linear-gradient(135deg, #0f2537 0%, #1a3a52 100%)', // darkBlueDark -> darkBlue
};
// ########################################################

// Confirmation Modal - Style unifié
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = "warning" }) => {
  if (!isOpen) return null;

  const isDanger = type === "danger" || type === "warning";
  const iconColor = isDanger ? PALETTE.danger : PALETTE.primary;
  const iconBg = isDanger ? PALETTE.dangerBg : PALETTE.primaryTint;
  const confirmBg = isDanger ? PALETTE.danger : PALETTE.primary;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
        style={{ backgroundColor: PALETTE.bgComponent }}
      >
        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            <AlertCircle className="h-10 w-10" style={{ color: iconColor }} />
          </div>
          <h3 
            className="text-2xl font-bold mb-2" 
            style={{ color: PALETTE.text }}
          >
            {title}
          </h3>
          <p 
            className="leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            {message}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-6 py-3 rounded-xl font-bold transition-all"
            style={{ 
              backgroundColor: PALETTE.borderLight, 
              color: PALETTE.textMuted 
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = PALETTE.border}
            onMouseLeave={(e) => e.target.style.backgroundColor = PALETTE.borderLight}
          >
            Annuler
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            className="flex-1 px-6 py-3 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            style={{ 
              backgroundColor: confirmBg,
              color: PALETTE.textLight
            }}
            onMouseEnter={(e) => e.target.style.opacity = 0.9}
            onMouseLeave={(e) => e.target.style.opacity = 1}
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Toast Notification - Style unifié
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const style = {
    backgroundColor: type === "success" ? PALETTE.success : PALETTE.danger,
    color: PALETTE.textLight,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
      style={style}
    >
      {type === "success" && <CheckCircle className="h-6 w-6" />}
      {type === "error" && <XCircle className="h-6 w-6" />}
      <span className="font-bold">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 rounded-lg p-1 transition-colors"
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
};

// Stats Card - Style unifié
const StatsCard = ({ icon: Icon, label, value, gradient, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
      style={{ background: gradient }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: 'rgba(255, 255, 255, 0.9)' }}
            >
              {label}
            </p>
            <p 
              className="text-4xl font-bold"
              style={{ color: PALETTE.textLight }}
            >
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp 
                  className="h-4 w-4"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }} 
                />
                <span 
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {trend}
                </span>
              </div>
            )}
          </div>
          <div 
            className="backdrop-blur-sm p-3 rounded-2xl"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Icon 
              className="h-7 w-7" 
              style={{ color: PALETTE.textLight }} 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// User Card - Style unifié
const UserCard = ({ user, onStatusChange, onViewDetails, index }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Configuration des styles basée sur la PALETTE unifiée
  const statusConfig = {
    actif: { bg: PALETTE.successBg, text: PALETTE.successText, border: PALETTE.successBg, icon: CheckCircle, label: "Actif" },
    suspendu: { bg: PALETTE.warningBg, text: PALETTE.warningText, border: PALETTE.warningBg, icon: AlertTriangle, label: "Suspendu" },
    inactif: { bg: PALETTE.borderLight, text: PALETTE.textMuted, border: PALETTE.border, icon: XCircle, label: "Inactif" },
  };

  const typeConfig = {
    freelance: { bg: PALETTE.primaryTint, text: PALETTE.primary, border: PALETTE.primaryTintBorder, icon: Briefcase },
    client: { bg: PALETTE.accentTint, text: PALETTE.accent, border: PALETTE.accentTintBorder, icon: Users },
    admin: { bg: PALETTE.dangerBg, text: PALETTE.dangerText, border: PALETTE.dangerBg, icon: Shield },
  };

  const status = statusConfig[user.statut] || statusConfig.inactif;
  const type = typeConfig[user.type_utilisateur] || typeConfig.client;
  const StatusIcon = status.icon;
  const TypeIcon = type.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getInitials = () => {
    return `${user.prenom?.charAt(0) || ''}${user.nom?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border"
      style={{ 
        backgroundColor: PALETTE.bgComponentLight,
        borderColor: PALETTE.borderLight,
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = PALETTE.primaryTintBorder}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.borderLight}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
            style={{ 
              background: PALETTE.gradientPrimary, 
              color: PALETTE.textLight 
            }}
          >
            {getInitials()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-lg mb-2 truncate"
              style={{ color: PALETTE.text }}
            >
              {user.prenom} {user.nom}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2"
                style={{ 
                  backgroundColor: status.bg, 
                  color: status.text, 
                  borderColor: status.border 
                }}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {status.label}
              </span>
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2"
                style={{ 
                  backgroundColor: type.bg, 
                  color: type.text, 
                  borderColor: type.border 
                }}
              >
                <TypeIcon className="h-3.5 w-3.5" />
                {user.type_utilisateur}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="p-2 rounded-xl transition-colors flex-shrink-0"
            style={{ color: PALETTE.textMuted }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.borderLight}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div 
                className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl border py-2 z-20"
                style={{ 
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.borderLight
                }}
              >
                <button 
                  onClick={() => { onViewDetails(user); setShowMenu(false); }} 
                  className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 font-medium transition-colors"
                  style={{ color: PALETTE.textMuted }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.borderLight}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Eye className="h-4 w-4" />
                  Voir les détails
                </button>
                {user.statut === "actif" && (
                  <button 
                    onClick={() => { onStatusChange(user.id, "suspendu"); setShowMenu(false); }} 
                    className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 font-medium transition-colors"
                    style={{ color: PALETTE.warningText }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.warningBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Ban className="h-4 w-4" />
                    Suspendre
                  </button>
                )}
                {user.statut === "suspendu" && (
                  <button 
                    onClick={() => { onStatusChange(user.id, "actif"); setShowMenu(false); }} 
                    className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 font-medium transition-colors"
                    style={{ color: PALETTE.successText }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.successBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <UserCheck className="h-4 w-4" />
                    Activer
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className="p-3 rounded-xl border"
          style={{ 
            backgroundColor: PALETTE.primaryTint, 
            borderColor: PALETTE.primaryTintBorder 
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-4 w-4" style={{ color: PALETTE.primary }} />
            <p className="text-xs font-medium" style={{ color: PALETTE.textMuted }}>Email</p>
          </div>
          <p className="text-sm font-bold truncate" style={{ color: PALETTE.primaryDark }}>{user.email}</p>
        </div>
        <div 
          className="p-3 rounded-xl border"
          style={{ 
            backgroundColor: PALETTE.accentTint, 
            borderColor: PALETTE.accentTintBorder 
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Phone className="h-4 w-4" style={{ color: PALETTE.accent }} />
            <p className="text-xs font-medium" style={{ color: PALETTE.textMuted }}>Téléphone</p>
          </div>
          <p className="text-sm font-bold truncate" style={{ color: PALETTE.primaryDark }}>{user.telephone}</p>
        </div>
        <div 
          className="p-3 rounded-xl border"
          style={{ 
            backgroundColor: PALETTE.successBg, 
            borderColor: 'rgba(40, 167, 69, 0.2)'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4" style={{ color: PALETTE.success }} />
            <p className="text-xs font-medium" style={{ color: PALETTE.textMuted }}>Ville</p>
          </div>
          <p className="text-sm font-bold truncate" style={{ color: PALETTE.successText }}>{user.adresse}</p>
        </div>
        <div 
          className="p-3 rounded-xl border"
          style={{ 
            backgroundColor: PALETTE.warningBg, 
            borderColor: 'rgba(255, 193, 7, 0.2)'
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="h-4 w-4" style={{ color: PALETTE.warningText }} />
            <p className="text-xs font-medium" style={{ color: PALETTE.textMuted }}>Projets</p>
          </div>
          <p className="text-sm font-bold" style={{ color: PALETTE.warningText }}>{user.projets_count || 0}</p>
        </div>
      </div>

      <div 
        className="flex items-center justify-between pt-4 border-t-2 text-xs"
        style={{ borderColor: PALETTE.borderLight }}
      >
        <div className="flex items-center gap-1.5" style={{ color: PALETTE.textMuted }}>
          <Calendar className="h-3.5 w-3.5" />
          <span className="font-medium">Inscrit {formatDate(user.date_creation)}</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: PALETTE.textMuted }}>
          <Clock className="h-3.5 w-3.5" />
          <span className="font-medium">Vu {formatDate(user.derniere_connexion)}</span>
        </div>
      </div>
    </motion.div>
  );
};

// User Details Modal - Style unifié
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl"
        style={{ backgroundColor: PALETTE.bgComponent }}
      >
        <div 
          className="px-8 py-6 flex justify-between items-center"
          style={{ background: PALETTE.gradientPrimary }}
        >
          <div>
            <h2 
              className="text-3xl font-bold"
              style={{ color: PALETTE.textLight }}
            >
              Détails de l'utilisateur
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: PALETTE.primaryTint }}
            >
              ID: #{user.id}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl transition-all"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)', 
              color: PALETTE.textLight 
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div 
            className="rounded-2xl p-6 mb-6 border-2"
            style={{ 
              backgroundColor: PALETTE.primaryTint, 
              borderColor: PALETTE.primaryTintBorder 
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg"
                style={{ 
                  background: PALETTE.gradientPrimary, 
                  color: PALETTE.textLight 
                }}
              >
                {user.prenom?.charAt(0)}{user.nom?.charAt(0)}
              </div>
              <div>
                <h3 
                  className="text-2xl font-bold"
                  style={{ color: PALETTE.text }}
                >
                  {user.prenom} {user.nom}
                </h3>
                <p 
                  className="capitalize font-medium"
                  style={{ color: PALETTE.textMuted }}
                >
                  {user.type_utilisateur}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.primaryTint, 
                borderColor: PALETTE.primaryTintBorder 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5" style={{ color: PALETTE.primary }} />
                <span className="font-bold" style={{ color: PALETTE.primary }}>Email</span>
              </div>
              <p className="break-all font-medium" style={{ color: PALETTE.text }}>{user.email}</p>
            </div>
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.accentTint, 
                borderColor: PALETTE.accentTintBorder 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5" style={{ color: PALETTE.accent }} />
                <span className="font-bold" style={{ color: PALETTE.accent }}>Téléphone</span>
              </div>
              <p className="font-medium" style={{ color: PALETTE.text }}>{user.telephone}</p>
            </div>
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.successBg, 
                borderColor: 'rgba(40, 167, 69, 0.2)' 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5" style={{ color: PALETTE.success }} />
                <span className="font-bold" style={{ color: PALETTE.success }}>Adresse</span>
              </div>
              <p className="font-medium" style={{ color: PALETTE.text }}>{user.adresse}</p>
            </div>
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.warningBg, 
                borderColor: 'rgba(255, 193, 7, 0.2)' 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5" style={{ color: PALETTE.warningText }} />
                <span className="font-bold" style={{ color: PALETTE.warningText }}>Projets</span>
              </div>
              <p className="font-medium" style={{ color: PALETTE.text }}>{user.projets_count || 0} projets</p>
            </div>
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.borderLight, 
                borderColor: PALETTE.border 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5" style={{ color: PALETTE.textMuted }} />
                <span className="font-bold" style={{ color: PALETTE.textMuted }}>Date d'inscription</span>
              </div>
              <p className="text-sm font-medium" style={{ color: PALETTE.text }}>{formatDate(user.date_creation)}</p>
            </div>
            <div 
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: PALETTE.borderLight, 
                borderColor: PALETTE.border 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" style={{ color: PALETTE.textMuted }} />
                <span className="font-bold" style={{ color: PALETTE.textMuted }}>Dernière connexion</span>
              </div>
              <p className="text-sm font-medium" style={{ color: PALETTE.text }}>{formatDate(user.derniere_connexion)}</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="w-full py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            style={{
              background: PALETTE.primary,
              color: PALETTE.textLight
            }}
            onMouseEnter={(e) => e.target.style.background = PALETTE.primaryHover}
            onMouseLeave={(e) => e.target.style.background = PALETTE.primary}
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const AdminUsersPage = ({ sidebarWidth = 50 }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("tous");
  const [filterStatus, setFilterStatus] = useState("tous");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null, newStatus: null });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const API_URL = "http://192.168.0.147:8000/api/v1";
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/users`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const res = await response.json();

      if (res.success) {
        const usersData = Array.isArray(res.data?.data) ? res.data.data : [];
        setUsers(usersData);

        const statsData = {
          total: usersData.length,
          actifs: usersData.filter(u => u.statut === "actif").length,
          suspendus: usersData.filter(u => u.statut === "suspendu").length,
          inactifs: usersData.filter(u => u.statut === "inactif").length,
          freelances: usersData.filter(u => u.type_utilisateur === "freelance").length,
          clients: usersData.filter(u => u.type_utilisateur === "client").length,
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setToast({ show: true, message: "Impossible de charger", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    setConfirmModal({ 
      isOpen: true, 
      userId, 
      newStatus,
      title: newStatus === "actif" ? "Activer cet utilisateur ?" : "Suspendre cet utilisateur ?",
      message: "Cette action modifiera le statut du compte.",
      type: newStatus === "actif" ? "success" : "warning"
    });
  };

  const confirmStatusChange = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/users/${confirmModal.userId}/status`, {
        method: 'PATCH',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: confirmModal.newStatus })
      });

      if (response.ok) {
        fetchUsers();
        setToast({ show: true, message: "Statut mis à jour avec succès", type: "success" });
      } else {
        setToast({ show: true, message: "Impossible de modifier le statut", type: "error" });
      }
    } catch (error) {
      setToast({ show: true, message: "Impossible de modifier le statut", type: "error" });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "tous" || user.type_utilisateur === filterType;
    const matchesStatus = filterStatus === "tous" || user.statut === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Dégradés unifiés
  const gradients = [
    PALETTE.gradientPrimary,
    PALETTE.gradientSecondary,
    PALETTE.gradientAccent,
    PALETTE.gradientDark,
  ];

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{ 
          marginLeft: window.innerWidth >= 768 ? sidebarWidth : 0,
          backgroundColor: PALETTE.bgPage
        }}
      >
        <div className="text-center">
          <div 
            className="w-20 h-20 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ 
              borderColor: PALETTE.primaryTintBorder, 
              borderTopColor: PALETTE.primary 
            }} 
          />
          <p 
            className="font-bold text-lg"
            style={{ color: PALETTE.primary }}
          >
            Chargement des utilisateurs...
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
        backgroundColor: PALETTE.bgPage
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: PALETTE.gradientPrimary }}
            >
              <Users className="h-8 w-8" style={{ color: PALETTE.textLight }} />
            </div>
            <div>
              <h1 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: PALETTE.text }}
              >
                Gestion des Utilisateurs
              </h1>
              <p 
                className="mt-1 font-medium"
                style={{ color: PALETTE.textMuted }}
              >
                Gérez et surveillez tous les utilisateurs de la plateforme
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard label="Total Utilisateurs" value={stats?.total || 0} icon={Users} gradient={gradients[0]} trend="+12%" />
          <StatsCard label="Utilisateurs Actifs" value={stats?.actifs || 0} icon={UserCheck} gradient={gradients[1]} trend="+8%" />
          <StatsCard label="Freelances" value={stats?.freelances || 0} icon={Briefcase} gradient={gradients[2]} trend="+15%" />
          <StatsCard label="Suspendus" value={stats?.suspendus || 0} icon={UserX} gradient={gradients[3]} />
        </div>

        {/* Filtres */}
        <div 
          className="rounded-3xl p-4 md:p-6 shadow-sm border mb-8"
          style={{ 
            backgroundColor: PALETTE.bgComponentLight,
            borderColor: PALETTE.borderLight
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div className="md:col-span-2 relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" 
                style={{ color: PALETTE.textMuted }} 
              />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all outline-none font-medium"
                style={{
                  borderColor: PALETTE.border,
                  color: PALETTE.text
                }}
                onFocus={(e) => e.target.style.borderColor = PALETTE.primary}
                onBlur={(e) => e.target.style.borderColor = PALETTE.border}
              />
            </div>

            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)} 
              className="px-4 py-3 border-2 rounded-xl transition-all outline-none bg-white font-medium"
              style={{
                borderColor: PALETTE.border,
                color: PALETTE.text
              }}
              onFocus={(e) => e.target.style.borderColor = PALETTE.primary}
              onBlur={(e) => e.target.style.borderColor = PALETTE.border}
            >
              <option value="tous">Tous les types</option>
              <option value="freelance">Freelances</option>
              <option value="client">Clients</option>
              <option value="admin">Admins</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="px-4 py-3 border-2 rounded-xl transition-all outline-none bg-white font-medium"
              style={{
                borderColor: PALETTE.border,
                color: PALETTE.text
              }}
              onFocus={(e) => e.target.style.borderColor = PALETTE.primary}
              onBlur={(e) => e.target.style.borderColor = PALETTE.border}
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actifs</option>
              <option value="suspendu">Suspendus</option>
              <option value="inactif">Inactifs</option>
            </select>
          </div>

          <div 
            className="flex flex-wrap gap-3 pt-4 border-t-2"
            style={{ borderColor: PALETTE.borderLight }}
          >
            <button 
              onClick={fetchUsers} 
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all"
              style={{
                backgroundColor: PALETTE.primaryTint,
                color: PALETTE.primary
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = PALETTE.primaryTintHover}
              onMouseLeave={(e) => e.target.style.backgroundColor = PALETTE.primaryTint}
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </button>
            <button 
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all"
              style={{
                backgroundColor: PALETTE.successBg,
                color: PALETTE.successText
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(40, 167, 69, 0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = PALETTE.successBg}
            >
              <Download className="h-4 w-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-4">
          <p 
            className="font-bold text-lg"
            style={{ color: PALETTE.textMuted }}
          >
            {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Liste des utilisateurs */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                onStatusChange={handleStatusChange}
                onViewDetails={(u) => { setSelectedUser(u); setShowDetailsModal(true); }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-16 text-center border shadow-lg rounded-3xl"
            style={{
              backgroundColor: PALETTE.bgComponentLight,
              borderColor: PALETTE.borderLight
            }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: PALETTE.primaryTint }}
            >
              <Users className="w-12 h-12" style={{ color: PALETTE.primary }} />
            </div>
            <h3 
              className="text-2xl font-bold mb-3"
              style={{ color: PALETTE.text }}
            >
              Aucun utilisateur trouvé
            </h3>
            <p className="text-lg" style={{ color: PALETTE.textMuted }}>
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDetailsModal && (
          <UserDetailsModal 
            user={selectedUser} 
            onClose={() => { setShowDetailsModal(false); setSelectedUser(null); }} 
          />
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null, newStatus: null })}
        onConfirm={confirmStatusChange}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
      />

      <AnimatePresence>
        {toast.show && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast({ show: false, message: "", type: "" })} 
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminUsersPage;