import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  Briefcase,
  DollarSign,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Search,
  Eye,
  Clock,
  Package,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Send,
} from "lucide-react";

import {
  fetchProjects,
  fetchAllProjects,
  createProject,
  updateProject,
  deleteProject,
  closeProject,
  fetchCategories,
} from '../api/projetService';

import { useApp } from "../context/AppContext";
import PageHeader from "../components/Header";

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

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

// ProjectCard avec les couleurs du logo
const ProjectCard = ({ project, userType, onEdit, onDelete, onClose, onView, isOwner, index }) => {
  const statusConfig = {
    ouvert: { 
      label: "Ouvert", 
      color: COLORS.lightBlue,
      bg: `${COLORS.lightBlue}20`,
      border: `${COLORS.lightBlue}40`,
      icon: Sparkles 
    },
    en_cours: { 
      label: "En cours", 
      color: COLORS.darkBlue,
      bg: `${COLORS.darkBlue}20`,
      border: `${COLORS.darkBlue}40`,
      icon: Clock 
    },
    termine: { 
      label: "Terminé", 
      color: COLORS.gold,
      bg: `${COLORS.gold}20`,
      border: `${COLORS.gold}40`,
      icon: CheckCircle2 
    },
    annule: { 
      label: "Annulé", 
      color: '#ef4444',
      bg: '#fee2e2',
      border: '#fca5a5',
      icon: XCircle 
    },
  };

  const config = statusConfig[project.statut] || statusConfig.ouvert;
  const StatusIcon = config.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 hover:shadow-xl transition-all duration-300 overflow-hidden group"
      style={{ borderColor: '#e5e7eb' }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${COLORS.lightBlue}40`}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
    >
      {/* Ligne de couleur en haut selon le statut */}
      <div className="h-1.5" style={{ backgroundColor: config.bg }} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity"
              style={{ color: COLORS.darkBlue }}
            >
              {project.titre}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2"
                style={{
                  backgroundColor: config.bg,
                  color: config.color,
                  borderColor: config.border
                }}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                {config.label}
              </span>
              <span 
                className="px-3 py-1.5 rounded-full text-xs font-semibold border-2"
                style={{
                  backgroundColor: `${COLORS.lightBlue}15`,
                  color: COLORS.lightBlue,
                  borderColor: `${COLORS.lightBlue}30`
                }}
              >
                {project.categorie}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Stats Grid avec les couleurs du logo */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div 
            className="p-3 rounded-xl border-2"
            style={{
              background: `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`,
              borderColor: `${COLORS.lightBlue}30`
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" style={{ color: COLORS.lightBlue }} />
              <p className="text-xs text-gray-600 font-medium">Budget</p>
            </div>
            <p className="text-sm font-bold truncate" style={{ color: COLORS.darkBlue }}>
              {project.budget_minimum ? `${Number(project.budget_minimum).toLocaleString()}` : 'N/A'}
              {project.budget_maximum && ` - ${Number(project.budget_maximum).toLocaleString()}`}
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
              <Clock className="w-4 h-4" style={{ color: COLORS.gold }} />
              <p className="text-xs text-gray-600 font-medium">Délai</p>
            </div>
            <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>
              {project.delai_souhaite ? `${project.delai_souhaite} jours` : 'Flexible'}
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
            <p className="text-sm font-bold truncate" style={{ color: COLORS.darkBlue }}>{project.ville}</p>
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
            <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>{project.nombre_vues || 0}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="font-bold" style={{ color: COLORS.lightBlue }}>{project.nombre_contacts || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">{formatDate(project.date_publication)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {isOwner && userType === "client" && (
              <>
                <button
                  onClick={() => onEdit(project)}
                  className="p-2.5 rounded-xl transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: `${COLORS.lightBlue}15`,
                    color: COLORS.lightBlue 
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = `${COLORS.lightBlue}25`}
                  onMouseLeave={(e) => e.target.style.backgroundColor = `${COLORS.lightBlue}15`}
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {project.statut === "ouvert" && (
                  <button
                    onClick={() => {
                      if (window.confirm("Clôturer ce projet ?")) onClose(project.id);
                    }}
                    className="p-2.5 rounded-xl transition-all hover:scale-110"
                    style={{ 
                      backgroundColor: `${COLORS.gold}15`,
                      color: COLORS.gold 
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = `${COLORS.gold}25`}
                    onMouseLeave={(e) => e.target.style.backgroundColor = `${COLORS.gold}15`}
                    title="Clôturer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm("Supprimer définitivement ce projet ?")) onDelete(project.id);
                  }}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all hover:scale-110"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            
            {userType === "admin" && (
              <button
                onClick={() => {
                  if (window.confirm("Supprimer ce projet (Admin) ?")) onDelete(project.id);
                }}
                className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all hover:scale-110"
                title="Supprimer (Admin)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onView(project)}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
              }}
            >
              Détails
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ProjectModal avec les couleurs du logo
const ProjectModal = ({ isOpen, onClose, project, onSave, loading, categories }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categorie: "",
    budget_minimum: "",
    budget_maximum: "",
    devise: "FCFA",
    ville: "",
    delai_souhaite: "",
    statut: "ouvert",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        titre: project.titre || "",
        description: project.description || "",
        categorie: project.categorie || "",
        budget_minimum: project.budget_minimum || "",
        budget_maximum: project.budget_maximum || "",
        devise: project.devise || "FCFA",
        ville: project.ville || "",
        delai_souhaite: project.delai_souhaite || "",
        statut: project.statut || "ouvert",
      });
    } else {
      setFormData({
        titre: "",
        description: "",
        categorie: "",
        budget_minimum: "",
        budget_maximum: "",
        devise: "FCFA",
        ville: "",
        delai_souhaite: "",
        statut: "ouvert",
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const villes = ["Brazzaville", "Pointe-Noire", "Dolisie"];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
      >
        <div 
          className="px-8 py-6 flex justify-between items-center"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
          }}
        >
          <div>
            <h2 className="text-3xl font-bold text-white">
              {project ? "Modifier le projet" : "Nouveau projet"}
            </h2>
            <p className="text-white/80 text-sm mt-1">Remplissez les informations ci-dessous</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>
                Titre du projet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({...formData, titre: e.target.value})}
                placeholder="Ex: Création d'un site e-commerce"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900 font-medium"
                onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>
                Description détaillée <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                placeholder="Décrivez votre projet en détail..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none resize-none text-gray-900"
                onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categorie}
                  onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                  onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.nom}>{cat.nom}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>
                  Ville <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.ville}
                  onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                  onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  required
                >
                  <option value="">Sélectionner...</option>
                  {villes.map((ville) => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                  <option value="En Ligne">En ligne</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>Budget min</label>
                <input
                  type="number"
                  value={formData.budget_minimum}
                  onChange={(e) => setFormData({...formData, budget_minimum: e.target.value})}
                  placeholder="50000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                  onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>Budget max</label>
                <input
                  type="number"
                  value={formData.budget_maximum}
                  onChange={(e) => setFormData({...formData, budget_maximum: e.target.value})}
                  placeholder="150000"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                  onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>Devise</label>
                <select
                  value={formData.devise}
                  onChange={(e) => setFormData({...formData, devise: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                  onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option value="FCFA">FCFA</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: COLORS.darkBlue }}>Délai souhaité (jours)</label>
              <input
                type="number"
                value={formData.delai_souhaite}
                onChange={(e) => setFormData({...formData, delai_souhaite: e.target.value})}
                placeholder="30"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900"
                onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
            }}
          >
            {loading ? (
              <div 
                className="w-6 h-6 border-3 rounded-full animate-spin" 
                style={{ 
                  borderColor: 'rgba(255,255,255,0.3)',
                  borderTopColor: 'white' 
                }}
              />
            ) : (
              <Save className="w-6 h-6" />
            )}
            {project ? "Sauvegarder les modifications" : "Publier le projet"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Composant principal avec les couleurs du logo
const ProjectNewPage = ({ sidebarWidth = 50 }) => {
  const { currentUser } = useApp();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  const userType = currentUser?.type_utilisateur || "client";
  const userId = currentUser?.id;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [categoriesData] = await Promise.all([fetchCategories()]);
        
        let projectsData;
        if (userType === "admin" || userType === "freelance") {
          projectsData = await fetchAllProjects();
        } else {
          projectsData = await fetchProjects();
        }
        
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error("Erreur:", error);
        setProjects([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userType]);

  const handleSaveProject = async (formData) => {
    setSaveLoading(true);
    try {
      if (editingProject) {
        const updatedProject = await updateProject(editingProject.id, formData);
        setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
        Swal.fire({
          icon: "success",
          title: "Modifié !",
          text: "Le projet a été modifié avec succès",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const newProject = await createProject(formData);
        setProjects([newProject, ...projects]);
        Swal.fire({
          icon: "success",
          title: "Créé !",
          text: "Le projet a été créé avec succès",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      setModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response?.data?.message || "Une erreur s'est produite",
        confirmButtonColor: COLORS.lightBlue,
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      Swal.fire({
        icon: "success",
        title: "Supprimé !",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de supprimer ce projet",
        confirmButtonColor: COLORS.lightBlue,
      });
    }
  };

  const handleCloseProject = async (id) => {
    try {
      await closeProject(id);
      setProjects(projects.map(p => p.id === id ? {...p, statut: 'termine'} : p));
      Swal.fire({
        icon: "success",
        title: "Clôturé !",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de clôturer ce projet",
        confirmButtonColor: COLORS.lightBlue,
      });
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchSearch = project.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !filterCategory || project.categorie === filterCategory;
    const matchStatus = !filterStatus || project.statut === filterStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const stats = {
    total: projects.length,
    actifs: projects.filter(p => p.statut === "ouvert").length,
    en_cours: projects.filter(p => p.statut === "en_cours").length,
    termines: projects.filter(p => p.statut === "termine").length,
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
            Chargement des projets...
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
      <PageHeader
        title={userType === "admin" ? "Tous les Projets" : userType === "freelance" ? "Offres Disponibles" : "Mes Projets"}
        subtitle={userType === "admin" 
          ? "Gérez tous les projets de la plateforme" 
          : userType === "freelance"
          ? "Découvrez les projets et postulez"
          : "Gérez et suivez vos projets"}
        currentUser={currentUser}
        userType={userType}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Grid avec les couleurs du logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard title="Total" value={stats.total} icon={Briefcase} colorScheme="primary" />
          <StatCard title="Actifs" value={stats.actifs} icon={Sparkles} colorScheme="secondary" />
          <StatCard title="En cours" value={stats.en_cours} icon={Clock} colorScheme="accent" />
          <StatCard title="Terminés" value={stats.termines} icon={CheckCircle2} colorScheme="dark" />
        </div>

        {/* Filtres avec les couleurs du logo */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-3 border border-gray-100 mb-8">
          <div className="relative flex-1">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
              style={{ color: COLORS.lightBlue }}
            />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none text-gray-900 font-medium"
              onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none md:w-56 text-gray-900 font-medium"
            onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nom}>{cat.nom}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none md:w-48 text-gray-900 font-medium"
            onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            <option value="">Tous les statuts</option>
            <option value="ouvert">Ouvert</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
          {userType === "client" && (
            <button
              onClick={() => { setEditingProject(null); setModalOpen(true); }}
              className="px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
              }}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouveau</span>
            </button>
          )}
        </div>

        {/* Liste des projets */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => {
              const isOwner = userType === "client" && project.client_id === userId;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  userType={userType}
                  isOwner={isOwner}
                  index={index}
                  onEdit={(p) => { setEditingProject(p); setModalOpen(true); }}
                  onDelete={handleDeleteProject}
                  onClose={handleCloseProject}
                  onView={(p) => window.location.href = `/project/${p.id}`}
                />
              );
            })}
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
              <Briefcase className="w-12 h-12" style={{ color: COLORS.lightBlue }} />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.darkBlue }}>
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {searchTerm || filterCategory || filterStatus
                ? "Essayez de modifier vos critères de recherche" 
                : userType === "client" ? "Créez votre premier projet pour commencer" : "Aucun projet disponible"}
            </p>
            {userType === "client" && !searchTerm && !filterCategory && !filterStatus && (
              <button
                onClick={() => { setEditingProject(null); setModalOpen(true); }}
                className="px-8 py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
                }}
              >
                <Plus className="w-5 h-5" />
                Créer mon premier projet
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {userType === "client" && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingProject(null); }}
          project={editingProject}
          onSave={handleSaveProject}
          loading={saveLoading}
          categories={categories}
        />
      )}
    </main>
  );
};

export default ProjectNewPage;