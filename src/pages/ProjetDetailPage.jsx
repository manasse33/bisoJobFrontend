import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  X,
  DollarSign,
  Clock,
  Calendar,
  Eye,
  User,
  MapPin,
  Package,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";

// Couleurs du logo BisoJob (identiques au Dashboard)
const COLORS = {
  darkBlue: '#1a3a52',      // Bleu marine foncé
  lightBlue: '#4a9fd8',     // Bleu clair
  gold: '#d4a574',          // Doré
  darkBlueDark: '#0f2537',  // Bleu très foncé
  lightBlueDark: '#3a8fc8', // Bleu moyen
};

const ProjetDetailPage = () => {
  const { id: projetId } = useParams();
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!projetId) {
      setLoading(false);
      return;
    }

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projets/${projetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setProjectDetails(res.data.data);
        } else {
          setProjectDetails(null);
        }
      } catch (error) {
        console.error("Erreur:", error);
        setProjectDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projetId, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      ouvert: { 
        bg: `${COLORS.lightBlue}20`, 
        text: COLORS.lightBlue, 
        border: `${COLORS.lightBlue}40`, 
        icon: CheckCircle 
      },
      en_cours: { 
        bg: `${COLORS.darkBlue}20`, 
        text: COLORS.darkBlue, 
        border: `${COLORS.darkBlue}40`, 
        icon: Clock 
      },
      termine: { 
        bg: `${COLORS.gold}20`, 
        text: COLORS.gold, 
        border: `${COLORS.gold}40`, 
        icon: CheckCircle 
      },
      annule: { 
        bg: '#fee2e2', 
        text: '#dc2626', 
        border: '#fca5a5', 
        icon: AlertCircle 
      },
    };
    return configs[status] || configs.ouvert;
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${COLORS.lightBlue}08 0%, ${COLORS.darkBlue}05 50%, white 100%)`
        }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: `${COLORS.lightBlue}30`,
              borderTopColor: COLORS.lightBlue
            }}
          />
          <p className="font-semibold text-lg" style={{ color: COLORS.lightBlue }}>
            Chargement des détails...
          </p>
        </div>
      </div>
    );
  }

  if (!projectDetails) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.lightBlue}08 0%, ${COLORS.darkBlue}05 50%, white 100%)`
        }}
      >
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg max-w-md border-2 border-gray-200">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.darkBlue }}>
            Projet introuvable
          </h2>
          <p className="text-gray-600 mb-6">Le projet demandé n'existe pas ou n'est plus disponible.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
            }}
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(projectDetails.statut);
  const StatusIcon = statusConfig.icon;

  return (
    <div 
      className="min-h-screen py-8"
      style={{
        background: `linear-gradient(135deg, ${COLORS.lightBlue}08 0%, ${COLORS.darkBlue}05 50%, white 100%)`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${COLORS.lightBlue}20` }}
                  >
                    <Briefcase className="w-6 h-6" style={{ color: COLORS.lightBlue }} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.darkBlue }}>
                      {projectDetails.titre}
                    </h1>
                    <p className="text-gray-500">Projet #{projetId}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span 
                    className="inline-flex items-center gap-1.5 px-4 py-2 border-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.text,
                      borderColor: statusConfig.border
                    }}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {projectDetails.statut}
                  </span>
                  <span 
                    className="px-4 py-2 border-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${COLORS.gold}20`,
                      color: COLORS.gold,
                      borderColor: `${COLORS.gold}40`
                    }}
                  >
                    {projectDetails.categorie}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  style={{ color: COLORS.darkBlue }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  style={{ color: COLORS.darkBlue }}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.darkBlue }}>
                Description du projet
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {projectDetails.description}
              </p>
            </div>

            {/* Key info avec les couleurs du logo */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.darkBlue }}>
                Informations clés
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-xl border-2"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.lightBlue}10, ${COLORS.lightBlue}20)`,
                    borderColor: `${COLORS.lightBlue}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: COLORS.lightBlue }}
                    >
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: COLORS.darkBlue }}>
                      Budget
                    </p>
                  </div>
                  <p className="text-xl font-bold" style={{ color: COLORS.darkBlue }}>
                    {projectDetails.budget_minimum?.toLocaleString()} - {projectDetails.budget_maximum?.toLocaleString()} {projectDetails.devise}
                  </p>
                </div>

                <div 
                  className="p-4 rounded-xl border-2"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.gold}10, ${COLORS.gold}20)`,
                    borderColor: `${COLORS.gold}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: COLORS.gold }}
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: COLORS.darkBlue }}>
                      Délai
                    </p>
                  </div>
                  <p className="text-xl font-bold" style={{ color: COLORS.darkBlue }}>
                    {projectDetails.delai_souhaite} jours
                  </p>
                </div>

                <div 
                  className="p-4 rounded-xl border-2"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.darkBlue}10, ${COLORS.darkBlue}20)`,
                    borderColor: `${COLORS.darkBlue}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: COLORS.darkBlue }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: COLORS.darkBlue }}>
                      Localisation
                    </p>
                  </div>
                  <p className="text-lg font-bold" style={{ color: COLORS.darkBlue }}>
                    {projectDetails.ville}
                  </p>
                </div>

                <div 
                  className="p-4 rounded-xl border-2"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.lightBlueDark}10, ${COLORS.lightBlueDark}20)`,
                    borderColor: `${COLORS.lightBlueDark}30`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: COLORS.lightBlueDark }}
                    >
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: COLORS.darkBlue }}>
                      Publication
                    </p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: COLORS.darkBlue }}>
                    {formatDate(projectDetails.date_publication)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats avec les couleurs du logo */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.darkBlue }}>
                Statistiques
              </h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ backgroundColor: `${COLORS.lightBlue}15` }}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" style={{ color: COLORS.lightBlue }} />
                    <span className="text-sm font-medium" style={{ color: COLORS.darkBlue }}>
                      Vues
                    </span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: COLORS.lightBlue }}>
                    {projectDetails.nombre_vues || 0}
                  </span>
                </div>

                <div 
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ backgroundColor: `${COLORS.gold}15` }}
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" style={{ color: COLORS.gold }} />
                    <span className="text-sm font-medium" style={{ color: COLORS.darkBlue }}>
                      Contacts
                    </span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: COLORS.gold }}>
                    {projectDetails.nombre_contacts || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Client avec les couleurs du logo */}
            {projectDetails.client && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.darkBlue }}>
                  Client
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                      }}
                    >
                      {projectDetails.client.prenom?.charAt(0)}{projectDetails.client.nom?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: COLORS.darkBlue }}>
                        {projectDetails.client.prenom} {projectDetails.client.nom}
                      </p>
                      <p className="text-sm text-gray-500">Client</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" style={{ color: COLORS.lightBlue }} />
                      <span className="break-all">{projectDetails.client.email}</span>
                    </div>
                    {projectDetails.client.telephone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" style={{ color: COLORS.lightBlue }} />
                        <span>{projectDetails.client.telephone}</span>
                      </div>
                    )}
                  </div>

                  <button 
                    className="w-full py-3 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
                    }}
                  >
                    Contacter le client
                  </button>
                </div>
              </div>
            )}

            {/* CTA avec les couleurs du logo */}
            <div 
              className="rounded-3xl shadow-lg p-6 text-white"
              style={{
                background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.lightBlue} 100%)`
              }}
            >
              <h3 className="text-lg font-bold mb-2">Intéressé par ce projet ?</h3>
              <p className="text-sm mb-4" style={{ color: `${COLORS.lightBlue}30` }}>
                Postulez maintenant et démarquez-vous.
              </p>
              <button 
                className="w-full py-3 bg-white rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
                style={{ color: COLORS.lightBlue }}
              >
                Postuler au projet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjetDetailPage;