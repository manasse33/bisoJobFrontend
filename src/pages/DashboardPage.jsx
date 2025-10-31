import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "../api/axios";
import {
  Briefcase,
  Users,
  UserCheck,
  FolderTree,
  DollarSign,
  MessageCircle,
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Trash2,
  Edit,
  X,
  Eye,
  Send,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import PageHeader from "../components/Header";

// Couleurs du logo BisoJob
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

// StatCard avec style M-Pesa moderne
const StatCard = ({ title, value, icon: Icon, colorScheme, trend, trendValue }) => {
  const getColors = (scheme) => {
    switch(scheme) {
      case 'primary':
        return { bg: COLORS.darkBlue, iconBg: COLORS.lightBlue };
      case 'secondary':
        return { bg: COLORS.lightBlue, iconBg: COLORS.darkBlue };
      case 'accent':
        return { bg: COLORS.gold, iconBg: COLORS.lightBlue };
      case 'dark':
        return { bg: COLORS.darkBlueDark, iconBg: COLORS.gold };
      default:
        return { bg: COLORS.darkBlue, iconBg: COLORS.lightBlue };
    }
  };

  const colors = getColors(colorScheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
        style={{ background: colors.bg }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-3 rounded-2xl shadow-sm"
            style={{ backgroundColor: `${colors.iconBg}15` }}
          >
            <Icon className="h-6 w-6" style={{ color: colors.iconBg }} />
          </div>
          
          {trend && trendValue && (
            <div 
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ 
                backgroundColor: trend === "up" ? '#dcfce7' : '#fee2e2',
                color: trend === "up" ? '#16a34a' : '#dc2626'
              }}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {trendValue}%
            </div>
          )}
        </div>

        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p 
            className="text-3xl font-bold tracking-tight"
            style={{ color: colors.bg }}
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ActivityItem avec style moderne minimaliste
const ActivityItem = ({ title, description, time, icon: Icon, color, projetId, onViewProject }) => {
  const colorMap = {
    blue: { icon: COLORS.lightBlue, bg: `${COLORS.lightBlue}10` },
    darkBlue: { icon: COLORS.darkBlue, bg: `${COLORS.darkBlue}10` },
    gold: { icon: COLORS.gold, bg: `${COLORS.gold}10` },
    lightBlue: { icon: COLORS.lightBlueDark, bg: `${COLORS.lightBlueDark}10` },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group"
    >
      <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-all duration-200">
        <div 
          className="p-2.5 rounded-xl flex-shrink-0 shadow-sm"
          style={{ backgroundColor: colors.bg }}
        >
          <Icon className="h-5 w-5" style={{ color: colors.icon }} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
          <p className="text-gray-500 text-xs leading-relaxed mb-2">{description}</p>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-gray-400" />
            <p className="text-gray-400 text-xs">{time}</p>
          </div>
        </div>
        
        {projetId && (
          <button
            onClick={() => onViewProject(projetId)}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-110 flex-shrink-0 opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: `${COLORS.lightBlue}15`, color: COLORS.lightBlue }}
            title="Voir le projet"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// CategoryModal avec les couleurs du logo
const CategoryModal = ({ isOpen, onClose, onSubmit, category = null }) => {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    icone: "",
    ordre_affichage: 0,
    est_active: true,
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        nom: "",
        description: "",
        icone: "",
        ordre_affichage: 0,
        est_active: true,
      });
    }
  }, [category]);

  const handleSubmit = () => {
    if (!formData.nom.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Champ requis",
        text: "Le nom de la catégorie est obligatoire",
        confirmButtonColor: COLORS.lightBlue,
      });
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold" style={{ color: COLORS.darkBlue }}>
            {category ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none"
              style={{
                ':focus': {
                  borderColor: COLORS.lightBlue,
                }
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              maxLength={100}
              placeholder="Ex: Développement Web"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none resize-none"
              onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              rows={3}
              placeholder="Description de la catégorie..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Icône
              </label>
              <input
                type="text"
                value={formData.icone}
                onChange={(e) => setFormData({ ...formData, icone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none"
                onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                maxLength={50}
                placeholder="Code, Palette"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ordre
              </label>
              <input
                type="number"
                value={formData.ordre_affichage}
                onChange={(e) => setFormData({ ...formData, ordre_affichage: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all outline-none"
                onFocus={(e) => e.target.style.borderColor = COLORS.lightBlue}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="est_active"
              checked={formData.est_active}
              onChange={(e) => setFormData({ ...formData, est_active: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300"
              style={{ accentColor: COLORS.lightBlue }}
            />
            <label htmlFor="est_active" className="text-sm font-semibold text-gray-700">
              Catégorie active
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)` 
              }}
            >
              {category ? "Modifier" : "Créer"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// CategoryManagement avec les couleurs du logo
const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [statsCategories, setStatsCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const [categoriesRes, statsRes] = await Promise.all([
        api.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/categories/statistiques/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data);
      }

      if (statsRes.data.success) {
        setStatsCategories(statsRes.data.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (selectedCategory) {
        await api.put(`/categories/${selectedCategory.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/categories", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setIsModalOpen(false);
      setSelectedCategory(null);
      fetchCategories();
      
      Swal.fire({
        icon: "success",
        title: selectedCategory ? "Modifiée !" : "Créée !",
        text: selectedCategory ? "La catégorie a été modifiée." : "La catégorie a été créée.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response?.data?.message || "Une erreur est survenue",
        confirmButtonColor: COLORS.lightBlue,
      });
    }
  };

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
      
      Swal.fire({
        icon: "success",
        title: "Supprimée !",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.response?.data?.message || "Impossible de supprimer",
        confirmButtonColor: COLORS.lightBlue,
      });
    }
  };

  const getCategoryStats = (categoryName) => {
    const stat = statsCategories.find((s) => s.categorie?.nom === categoryName);
    return {
      freelances: stat?.nombre_freelances || 0,
      projets: stat?.nombre_projets || 0,
    };
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div 
            className="w-10 h-10 border-4 rounded-full animate-spin" 
            style={{ 
              borderColor: `${COLORS.lightBlue}30`,
              borderTopColor: COLORS.lightBlue 
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: COLORS.darkBlue }}>
              Gestion des catégories
            </h2>
            <p className="text-sm text-gray-500">Organisez vos catégories de services</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
            className="text-white px-4 md:px-5 py-2.5 md:py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm w-full sm:w-auto"
            style={{ backgroundColor: COLORS.lightBlue }}
          >
            <Plus className="h-5 w-5" />
            Ajouter
          </button>
        </div>

        <div className="space-y-3">
          {currentCategories.length > 0 ? (
            currentCategories.map((category, index) => {
              const stats = getCategoryStats(category.nom);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-4 md:p-5 rounded-2xl border transition-all bg-white hover:shadow-md"
                  style={{ borderColor: '#e5e7eb' }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                        <h3 className="font-bold text-sm md:text-base" style={{ color: COLORS.darkBlue }}>
                          {category.nom}
                        </h3>
                        {!category.est_active && (
                          <span className="text-xs px-2.5 py-1 bg-red-50 text-red-600 rounded-full font-semibold whitespace-nowrap">
                            Inactive
                          </span>
                        )}
                      </div>
                      {category.description && (
                        <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{category.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Users className="h-3.5 w-3.5" />
                          <span className="font-medium">{stats.freelances}</span>
                          <span className="hidden sm:inline">freelances</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span className="font-medium">{stats.projets}</span>
                          <span className="hidden sm:inline">projets</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end md:self-auto">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsModalOpen(true);
                        }}
                        className="p-2.5 md:p-3 rounded-xl transition-all hover:bg-gray-50"
                        style={{ color: COLORS.lightBlue }}
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2.5 md:p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-16 rounded-2xl bg-gray-50">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${COLORS.lightBlue}15` }}
              >
                <FolderTree className="w-8 h-8" style={{ color: COLORS.lightBlue }} />
              </div>
              <p className="text-gray-600 font-semibold mb-1">Aucune catégorie</p>
              <p className="text-gray-400 text-sm">Commencez par en créer une</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 font-medium">
              Page {currentPage} sur {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleCreateOrUpdate}
        category={selectedCategory}
      />
    </>
  );
};

// DashboardPage - Composant principal avec couleurs du logo
const DashboardPage = ({ sidebarWidth = 50 }) => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("mois");
  const [activitiesPage, setActivitiesPage] = useState(1);
  const activitiesPerPage = 5;

  const userType = currentUser?.type_utilisateur || "client";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { period: selectedPeriod },
        });

        if (res.data.success) {
          setDashboardData(res.data.data);
        }
      } catch (err) {
        console.error("Erreur de chargement dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userType, selectedPeriod, token]);

  const handleViewProject = (projetId) => {
    navigate(`/project/${projetId}`);
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-50"
        style={{ 
          marginLeft: sidebarWidth,
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
          <p className="font-semibold text-lg" style={{ color: COLORS.lightBlue }}>
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-50"
        style={{ 
          marginLeft: sidebarWidth,
        }}
      >
        <p className="text-red-600 font-semibold text-lg">Impossible de charger les données.</p>
      </div>
    );
  }

  const stats = dashboardData.stats || {};
  const activities = dashboardData.activities || [];

  const totalActivitiesPages = Math.ceil(activities.length / activitiesPerPage);
  const startIndex = (activitiesPage - 1) * activitiesPerPage;
  const endIndex = startIndex + activitiesPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  return (
    <main
      className="min-h-screen pb-20 md:pb-0 bg-gray-50"
      style={{ 
        marginLeft: window.innerWidth >= 768 ? sidebarWidth : 0,
      }}
    >
      <PageHeader
        title={`Tableau de bord ${userType === "freelance" ? "Freelance" : userType === "admin" ? "Admin" : "Client"}`}
        subtitle={`Bienvenue, ${currentUser?.prenom} ${currentUser?.nom}`}
        currentUser={currentUser}
        userType={userType}
        showPeriodSelector={true}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Grid modernisé */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Projets"
            value={stats.projects || 0}
            icon={Briefcase}
            colorScheme="primary"
            trend="up"
            trendValue="12"
          />

          {userType === "admin" ? (
            <>
              <StatCard
                title="Total Freelances"
                value={stats.freelances || 0}
                icon={Users}
                colorScheme="secondary"
                trend="up"
                trendValue="8"
              />
              <StatCard
                title="Total Clients"
                value={stats.clients || 0}
                icon={UserCheck}
                colorScheme="accent"
                trend="up"
                trendValue="15"
              />
              <StatCard
                title="Catégories"
                value={stats.categories || 0}
                icon={FolderTree}
                colorScheme="dark"
                trend="up"
                trendValue="5"
              />
            </>
          ) : userType === "freelance" ? (
            <>
              <StatCard
                title="Vues de profil"
                value={stats.profileViews || 0}
                icon={Eye}
                colorScheme="secondary"
                trend="up"
                trendValue="23"
              />
              <StatCard
                title="Propositions envoyées"
                value={stats.proposalsSent || 0}
                icon={Send}
                colorScheme="accent"
                trend="up"
                trendValue="5"
              />
              <StatCard
                title="Taux d'acceptation"
                value={`${stats.acceptanceRate || 0}%`}
                icon={TrendingUp}
                colorScheme="dark"
                trend="up"
                trendValue="8"
              />
            </>
          ) : (
            <>
              <StatCard
                title="Freelances contactés"
                value={stats.freelancesContacted || 0}
                icon={Users}
                colorScheme="secondary"
                trend="up"
                trendValue="15"
              />
              <StatCard
                title="Projets en cours"
                value={stats.projectsInProgress || 0}
                icon={Clock}
                colorScheme="accent"
                trend="up"
                trendValue="10"
              />
              <StatCard
                title="Budget dépensé"
                value={stats.totalSpent ? `${Number(stats.totalSpent).toLocaleString()} FCFA` : "0 FCFA"}
                icon={DollarSign}
                colorScheme="dark"
                trend="up"
                trendValue="12"
              />
            </>
          )}
        </div>

        {/* Main sections grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: COLORS.darkBlue }}>
                    Activités récentes
                  </h2>
                  <p className="text-sm text-gray-500">Vos dernières interactions</p>
                </div>
                <button 
                  className="text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105"
                  style={{ color: COLORS.lightBlue, backgroundColor: `${COLORS.lightBlue}10` }}
                >
                  Voir tout
                </button>
              </div>

              <div className="space-y-1">
                {currentActivities.length > 0 ? (
                  currentActivities.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      title={activity.title}
                      description={activity.description}
                      time={activity.time}
                      icon={
                        activity.icon === "briefcase"
                          ? Briefcase
                          : activity.icon === "message"
                          ? MessageCircle
                          : activity.icon === "star"
                          ? Star
                          : AlertCircle
                      }
                      color={activity.color || "blue"}
                      projetId={activity.projet_id}
                      onViewProject={handleViewProject}
                    />
                  ))
                ) : (
                  <div className="text-center py-16 rounded-2xl bg-gray-50">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${COLORS.lightBlue}15` }}
                    >
                      <AlertCircle className="w-8 h-8" style={{ color: COLORS.lightBlue }} />
                    </div>
                    <p className="text-gray-600 font-semibold mb-1">Aucune activité récente</p>
                    <p className="text-gray-400 text-sm">Les activités apparaîtront ici</p>
                  </div>
                )}
              </div>

              {totalActivitiesPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 font-medium">
                    Page {activitiesPage} sur {totalActivitiesPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActivitiesPage((prev) => Math.max(1, prev - 1))}
                      disabled={activitiesPage === 1}
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivitiesPage((prev) => Math.min(totalActivitiesPages, prev + 1))}
                      disabled={activitiesPage === totalActivitiesPages}
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Category Management - Admin only */}
            {userType === "admin" && <CategoryManagement />}
          </div>

          {/* Quick Actions modernisé */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6" style={{ color: COLORS.darkBlue }}>
                Actions rapides
              </h2>

              <div className="space-y-3 mb-8">
                {userType === "client" ? (
                  <>
                    <button
                      onClick={() => navigate("/project")}
                      className="w-full text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:scale-105"
                      style={{ backgroundColor: COLORS.lightBlue }}
                    >
                      <Briefcase className="h-5 w-5" />
                      Publier un projet
                    </button>
                    <button 
                      className="w-full py-4 rounded-2xl font-semibold transition-all"
                      style={{
                        backgroundColor: `${COLORS.lightBlue}10`,
                        color: COLORS.lightBlue
                      }}
                    >
                      Mes projets
                    </button>
                  </>
                ) : userType === "admin" ? (
                  <>
                    <button
                      onClick={() => navigate("/users")}
                      className="w-full text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:scale-105"
                      style={{ backgroundColor: COLORS.lightBlue }}
                    >
                      <Users className="h-5 w-5" />
                      Gérer les utilisateurs
                    </button>
                    <button 
                      className="w-full py-4 rounded-2xl font-semibold transition-all"
                      style={{
                        backgroundColor: `${COLORS.lightBlue}10`,
                        color: COLORS.lightBlue
                      }}
                    >
                      Voir les rapports
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:scale-105"
                      style={{ backgroundColor: COLORS.lightBlue }}
                    >
                      <Briefcase className="h-5 w-5" />
                      Voir mon profil
                    </button>
                    <button 
                      className="w-full py-4 rounded-2xl font-semibold transition-all"
                      style={{
                        backgroundColor: `${COLORS.lightBlue}10`,
                        color: COLORS.lightBlue
                      }}
                    >
                      Explorer les projets
                    </button>
                  </>
                )}

                <button 
                  className="w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: `${COLORS.lightBlue}10`,
                    color: COLORS.lightBlue
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </button>
              </div>

              {/* Profile Card modernisé */}
              <div className="border-t border-gray-100 pt-6">
                <div className="text-center mb-4">
                  <div 
                    className="w-16 h-16 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-sm"
                    style={{ backgroundColor: COLORS.lightBlue }}
                  >
                    {currentUser?.prenom?.charAt(0)}{currentUser?.nom?.charAt(0)}
                  </div>
                  <h3 className="font-bold text-base mb-1" style={{ color: COLORS.darkBlue }}>
                    {currentUser?.prenom} {currentUser?.nom}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {userType === "freelance" ? "Freelance" : userType === "admin" ? "Administrateur" : "Client"}
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                    ● Actif
                  </span>
                </div>

                <div 
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: `${COLORS.lightBlue}08`,
                    border: `1px solid ${COLORS.lightBlue}20`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div>
                      <h3 className="text-sm font-bold mb-1" style={{ color: COLORS.darkBlue }}>
                        Conseil du jour
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {userType === "admin"
                          ? "Vérifiez régulièrement les nouvelles inscriptions et projets."
                          : "Complétez votre profil pour augmenter vos chances de recevoir des demandes."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
