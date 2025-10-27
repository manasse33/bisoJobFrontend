import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit,
  Save,
  X,
  Camera,
  Star,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import api from "../api/axios";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/Header";

const ProfilePage = ({ sidebarWidth = 50 }) => {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    ville: "",
    biographie: "",
    categorie: "",
    tarif_horaire: "",
    experience: "",
  });

  const [competences, setCompetences] = useState([]);
  const [newCompetence, setNewCompetence] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    titre: "",
    description: "",
    image: null,
    lien_externe: "",
  });

  const userType = currentUser?.type_utilisateur || "client";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        prenom: currentUser.prenom || "",
        nom: currentUser.nom || "",
        email: currentUser.email || "",
        telephone: currentUser.telephone || "",
        ville: currentUser.ville || "",
        biographie: currentUser.freelance?.biographie || currentUser.biographie || "",
        categorie: currentUser.freelance?.categorie || "",
        tarif_horaire: currentUser.freelance?.tarif_horaire || "",
        experience: currentUser.freelance?.annees_experience || "",
      });

      // Extraction des compétences
      if (currentUser.freelance?.competences) {
        const nomsCompetences = Array.isArray(currentUser.freelance.competences)
          ? currentUser.freelance.competences.map(c => c.nom_competence)
          : [];
        setCompetences(nomsCompetences);
      }

      // Extraction des portfolios
      if (currentUser.freelance?.portofolios) {
        setPortfolios(currentUser.freelance.portofolios || []);
      }
    }
  }, [currentUser]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.put(
        "/profile",
        {
          ...profileData,
          competences: competences,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setCurrentUser(res.data.data);
        setEditMode(false);
        alert("Profil mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const addCompetence = () => {
    if (newCompetence.trim() && !competences.includes(newCompetence.trim())) {
      setCompetences([...competences, newCompetence.trim()]);
      setNewCompetence("");
    }
  };

  const removeCompetence = (comp) => {
    setCompetences(competences.filter((c) => c !== comp));
  };

  const stats = {
    projets: currentUser?.freelance?.nombre_projets_realises || 0,
    completionRate: currentUser?.stats?.completion_rate || 95,
    rating: currentUser?.freelance?.note_moyenne || 0,
    reviews: currentUser?.freelance?.nombre_avis || 0,
  };

  return (
    <main className="min-h-screen bg-white" style={{ marginLeft: sidebarWidth }}>
      <PageHeader
        title={`Profil ${userType === "freelance" ? "Freelance" : "Client"}`}
        subtitle="Gérez vos informations personnelles"
        currentUser={currentUser}
        userType={userType}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid - Pour Freelance uniquement */}
        {userType === "freelance" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:border-indigo-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Projets complétés</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.projets}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:border-emerald-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Taux de réussite</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.completionRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:border-purple-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Note moyenne</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-purple-600">{stats.rating}</p>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:border-orange-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Avis reçus</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.reviews}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo et infos de base */}
            <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-xl bg-indigo-100 flex items-center justify-center overflow-hidden">
                    {currentUser?.photo_profil ? (
                      <img
                        src={currentUser.photo_profil}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-indigo-600" />
                    )}
                  </div>
                  {editMode && (
                    <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-lg text-white shadow-lg hover:bg-indigo-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {currentUser?.prenom} {currentUser?.nom}
                      </h2>
                      <p className="text-slate-600 mt-1">
                        {userType === "freelance"
                          ? profileData.categorie || "Freelance"
                          : "Client"}
                      </p>
                    </div>
                    {!editMode ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                          {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          Sauvegarder
                        </button>
                        <button
                          onClick={() => setEditMode(false)}
                          className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {userType === "freelance" && (
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-slate-900">
                          {stats.rating}
                        </span>
                        <span className="text-slate-500 text-sm">
                          ({stats.reviews} avis)
                        </span>
                      </div>
                      <div className="h-4 w-px bg-slate-300" />
                      <div className="flex items-center gap-1 text-slate-600">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {stats.projets} projets
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Biographie */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  À propos
                </h3>
                {editMode ? (
                  <textarea
                    value={profileData.biographie}
                    onChange={(e) =>
                      setProfileData({ ...profileData, biographie: e.target.value })
                    }
                    rows={4}
                    placeholder="Parlez de vous, vos compétences, votre expérience..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    {profileData.biographie || "Aucune description ajoutée"}
                  </p>
                )}
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-indigo-600 mb-4">
                Informations de contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    Prénom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profileData.prenom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, prenom: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{profileData.prenom}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    Nom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, nom: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{profileData.nom}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    Email
                  </label>
                  <p className="text-slate-900 font-medium">{profileData.email}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Phone className="w-4 h-4 text-indigo-600" />
                    Téléphone
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profileData.telephone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, telephone: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">
                      {profileData.telephone || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    Ville
                  </label>
                  {editMode ? (
                    <select
                      value={profileData.ville}
                      onChange={(e) =>
                        setProfileData({ ...profileData, ville: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Brazzaville">Brazzaville</option>
                      <option value="Pointe-Noire">Pointe-Noire</option>
                      <option value="Dolisie">Dolisie</option>
                    </select>
                  ) : (
                    <p className="text-slate-900 font-medium">
                      {profileData.ville || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Membre depuis
                  </label>
                  <p className="text-slate-900 font-medium">
                    {currentUser?.created_at ? new Date(currentUser.created_at).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Infos Freelance spécifiques */}
            {userType === "freelance" && (
              <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-600 mb-4">
                  Informations professionnelles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      Catégorie
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profileData.categorie}
                        onChange={(e) =>
                          setProfileData({ ...profileData, categorie: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                      />
                    ) : (
                      <p className="text-slate-900 font-medium">
                        {profileData.categorie || "Non renseigné"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <DollarSign className="w-4 h-4 text-indigo-600" />
                      Tarif horaire (FCFA)
                    </label>
                    {editMode ? (
                      <input
                        type="number"
                        value={profileData.tarif_horaire}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            tarif_horaire: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                      />
                    ) : (
                      <p className="text-slate-900 font-medium">
                        {profileData.tarif_horaire
                          ? `${Number(profileData.tarif_horaire).toLocaleString()} FCFA`
                          : "Non renseigné"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      Années d'expérience
                    </label>
                    {editMode ? (
                      <input
                        type="number"
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({ ...profileData, experience: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                      />
                    ) : (
                      <p className="text-slate-900 font-medium">
                        {profileData.experience
                          ? `${profileData.experience} ans`
                          : "Non renseigné"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Compétences - Freelance uniquement */}
            {userType === "freelance" && (
              <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-600 mb-4">Compétences</h3>

                {editMode && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newCompetence}
                      onChange={(e) => setNewCompetence(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCompetence()}
                      placeholder="Ajouter une compétence..."
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                    />
                    <button
                      onClick={addCompetence}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {competences.length > 0 ? (
                    competences.map((comp, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg border-2 border-indigo-200 font-semibold"
                      >
                        <span>{comp}</span>
                        {editMode && (
                          <button
                            onClick={() => removeCompetence(comp)}
                            className="hover:text-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">Aucune compétence ajoutée</p>
                  )}
                </div>
              </div>
            )}

            {/* Portfolio - Freelance uniquement */}
            {userType === "freelance" && (
              <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-indigo-600">Portfolio</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors text-sm">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                {portfolios.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolios.map((portfolio) => (
                      <div
                        key={portfolio.id}
                        className="group relative rounded-xl overflow-hidden border-2 border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="aspect-video bg-slate-100 overflow-hidden">
                          {portfolio.image_url_full ? (
                            <img
                              src={portfolio.image_url_full}
                              alt={portfolio.titre}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-slate-900 mb-1 line-clamp-1">
                            {portfolio.titre}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                            {portfolio.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {portfolio.date_realisation
                                ? new Date(portfolio.date_realisation).toLocaleDateString("fr-FR")
                                : new Date(portfolio.date_ajout).toLocaleDateString("fr-FR")}
                            </span>
                            {portfolio.lien_externe && (
                              <a
                                href={portfolio.lien_externe}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                              >
                                Voir
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        {editMode && (
                          <button className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm font-medium mb-2">
                      Aucun projet dans votre portfolio
                    </p>
                    <p className="text-slate-400 text-xs">
                      Ajoutez vos meilleurs projets pour attirer plus de clients
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-indigo-600 mb-4">Actions rapides</h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Tableau de bord
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="w-full px-4 py-3 bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-600 rounded-lg font-semibold transition-colors"
                >
                  {userType === "freelance" ? "Explorer les projets" : "Mes projets"}
                </button>
                <button className="w-full px-4 py-3 bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-600 rounded-lg font-semibold transition-colors">
                  Messagerie
                </button>
              </div>
            </div>

            {/* Conseil */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-indigo-600 mb-2">
                💡 Conseil
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {userType === "freelance"
                  ? "Un profil complet avec une photo et des compétences augmente vos chances de recevoir des demandes de 70%."
                  : "Complétez votre profil pour faciliter la communication avec les freelances."}
              </p>
            </div>

            {/* Progression du profil */}
            <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-indigo-600 mb-4">
                Progression du profil
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-700">Complétude</span>
                    <span className="font-bold text-indigo-600">75%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700">Informations de base</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-700">Biographie</span>
                  </div>
                  {userType === "freelance" && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-slate-700">Compétences</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {portfolios.length > 0 ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                        )}
                        <span className={portfolios.length > 0 ? "text-slate-700" : "text-slate-500"}>
                          Portfolio
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;