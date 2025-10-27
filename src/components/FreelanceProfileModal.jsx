import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  MapPin,
  Star,
  Briefcase,
  DollarSign,
  Clock,
  Award,
  Eye,
  Mail,
  Phone,
  ExternalLink,
  Send,
  Edit,
  Trash2,
  Flag,
  CheckCircle,
  ImageIcon,
  TrendingUp,
  Share2,
  Bookmark,
} from 'lucide-react';

// --- PALETTE UNIFIÉE (Basée sur BisoJob et les couleurs sémantiques) ---
const PALETTE = {
  // 1. Couleurs de Marque (Primaire - remplace blue/indigo)
  primary: '#4a9fd8',      // lightBlue
  primaryHover: '#3a8fc8', // lightBlueDark
  primaryDark: '#1a3a52',   // darkBlue
  accent: '#d4a574',       // gold

  // 2. Couleurs Sémantiques
  success: '#28a745',       // Vert
  successBg: 'rgba(40, 167, 69, 0.1)',
  warning: '#ffc107',       // Jaune/Orange pour signalement ou occupé
  warningBg: 'rgba(255, 193, 7, 0.1)',
  danger: '#dc3545',        // Rouge pour suppression/erreur
  dangerBg: 'rgba(220, 53, 69, 0.1)',

  // 3. Couleurs Générales
  border: '#cbd5e1',        // Bordure grise
  textMuted: '#4b5563',     // Texte gris foncé
  bgLight: '#f9fafb',      // Fond très clair
};

const FreelanceProfileModal = ({ freelance, isOpen, onClose, currentUser, api }) => {
  const [freelanceData, setFreelanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avis, setAvis] = useState([]);
  const [showAvisForm, setShowAvisForm] = useState(false);
  const [newAvis, setNewAvis] = useState({ note: 5, commentaire: '' });
  const [submittingAvis, setSubmittingAvis] = useState(false);
  const [editingAvis, setEditingAvis] = useState(null);

  const isClient = currentUser?.type_utilisateur === 'client';
  const isOwner = currentUser?.id === freelance?.user_id;

  useEffect(() => {
    if (isOpen && freelance?.id) {
      fetchFreelanceProfile();
    }
  }, [isOpen, freelance?.id]);

  const fetchFreelanceProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/freelances/${freelance.id}`);

      if (res.data.success) {
        setFreelanceData(res.data.data);
        setAvis(res.data.data.avis || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAvis = async () => {
    if (!newAvis.note || newAvis.note < 1 || newAvis.note > 5) {
      alert('Veuillez sélectionner une note entre 1 et 5');
      return;
    }

    setSubmittingAvis(true);
    try {
      const res = await api.post('/avis', {
        freelance_id: freelance.id,
        note: newAvis.note,
        commentaire: newAvis.commentaire,
      });

      if (res.data.success) {
        setAvis([res.data.data, ...avis]);
        setNewAvis({ note: 5, commentaire: '' });
        setShowAvisForm(false);
        alert('Avis publié avec succès !');
        fetchFreelanceProfile();
      }
    } catch (error) {
      console.error('Erreur lors de la publication de l\'avis:', error);
      alert(error.response?.data?.message || 'Erreur lors de la publication de l\'avis');
    } finally {
      setSubmittingAvis(false);
    }
  };

  const handleUpdateAvis = async (avisId) => {
    setSubmittingAvis(true);
    try {
      const res = await api.put(`/avis/${avisId}`, editingAvis);

      if (res.data.success) {
        setAvis(avis.map(a => a.id === avisId ? res.data.data : a));
        setEditingAvis(null);
        alert('Avis mis à jour avec succès !');
        fetchFreelanceProfile();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avis:', error);
      alert('Erreur lors de la mise à jour de l\'avis');
    } finally {
      setSubmittingAvis(false);
    }
  };

  const handleDeleteAvis = async (avisId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;

    try {
      const res = await api.delete(`/avis/${avisId}`);

      if (res.data.success) {
        setAvis(avis.filter(a => a.id !== avisId));
        alert('Avis supprimé avec succès !');
        fetchFreelanceProfile();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'avis:', error);
      alert('Erreur lors de la suppression de l\'avis');
    }
  };

  const handleSignalerAvis = async (avisId) => {
    if (!confirm('Signaler cet avis comme inapproprié ?')) return;

    try {
      const res = await api.post(`/avis/${avisId}/signaler`);

      if (res.data.success) {
        alert('Avis signalé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
      alert('Erreur lors du signalement');
    }
  };

  const renderStars = (note, size = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= note
                ? 'text-yellow-500 fill-yellow-500' // Garde le jaune par défaut pour les étoiles
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderStarSelector = (currentNote, onChange) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= currentNote
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
      >
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="text-center">
              {/* Spinner color uniformization */}
              <div
                className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin mx-auto mb-4"
                style={{ borderTopColor: PALETTE.primary }}
              />
              <p className="font-bold text-lg" style={{ color: PALETTE.primary }}>Chargement du profil...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header - Style unifié avec gradient */}
            <div
              className="text-white p-8 relative"
              style={{ background: `linear-gradient(to right, ${PALETTE.primary} 0%, ${PALETTE.primaryHover} 50%, ${PALETTE.primaryDark} 100%)` }}
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden border-2 border-white/20 flex-shrink-0">
                  {freelanceData?.user?.photo_profil ? (
                    <img
                      src={freelanceData.user.photo_profil}
                      alt={freelanceData.user.nom}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-white">
                      {freelanceData?.user?.prenom?.[0]}{freelanceData?.user?.nom?.[0]}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    {freelanceData?.user?.prenom} {freelanceData?.user?.nom}
                  </h2>
                  <p className="text-lg text-white/90 mb-3 font-medium">
                    {freelanceData?.titre_professionnel || freelanceData?.categorie}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold">
                      <MapPin className="w-4 h-4" />
                      {freelanceData?.user?.ville || 'Non spécifié'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold">
                      <Eye className="w-4 h-4" />
                      {freelanceData?.nombre_vues || 0} vues
                    </span>
                    {freelanceData?.est_en_vedette && (
                      <span
                        className="inline-flex items-center gap-1.5 px-4 py-2 backdrop-blur-md rounded-full text-sm font-semibold"
                        style={{ backgroundColor: PALETTE.accent + '30', color: PALETTE.accent, borderColor: PALETTE.accent + '50', border: '1px solid' }}
                      >
                        <Award className="w-4 h-4" />
                        Vedette
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Stats Cards - Style unifié */}
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: `linear-gradient(to bottom right, ${PALETTE.primary}10, ${PALETTE.primary}20)`, borderColor: PALETTE.primary + '50' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5" style={{ color: PALETTE.primary }} />
                        <span className="text-sm font-semibold text-gray-600">Projets</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: PALETTE.primaryDark }}>
                        {freelanceData?.nombre_projets_realises || 0}
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: `linear-gradient(to bottom right, ${PALETTE.success}10, ${PALETTE.success}20)`, borderColor: PALETTE.success + '50' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5" style={{ color: PALETTE.success }} />
                        <span className="text-sm font-semibold text-gray-600">Expérience</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: PALETTE.primaryDark }}>
                        {freelanceData?.annees_experience || 0} ans
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl border"
                      style={{ background: `linear-gradient(to bottom right, ${PALETTE.primaryDark}10, ${PALETTE.primaryDark}20)`, borderColor: PALETTE.primaryDark + '50' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5" style={{ color: PALETTE.primaryDark }} />
                        <span className="text-sm font-semibold text-gray-600">Satisfaction</span>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: PALETTE.primaryDark }}>
                        {freelanceData?.taux_satisfaction || '100'}%
                      </p>
                    </div>
                  </div>

                  {/* Biographie */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Description du profil</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {freelanceData?.biographie || 'Aucune description disponible'}
                    </p>
                  </div>

                  {/* Compétences */}
                  {freelanceData?.competences && freelanceData.competences.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Compétences</h3>
                      <div className="flex flex-wrap gap-2">
                        {freelanceData.competences.map((comp, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full border-2 font-semibold text-sm"
                            style={{ backgroundColor: PALETTE.primary + '10', color: PALETTE.primaryDark, borderColor: PALETTE.primary + '30' }}
                          >
                            {comp.nom_competence}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Portfolio */}
                  {freelanceData?.portofolios && freelanceData.portofolios.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {freelanceData.portofolios.map((portfolio) => (
                          <div
                            key={portfolio.id}
                            className="group relative rounded-2xl overflow-hidden border-2 border-gray-100 hover:transition-all duration-300 hover:shadow-lg bg-white"
                            style={{ borderColor: PALETTE.primary + '30' }}
                          >
                            <div className="aspect-video bg-gray-100 overflow-hidden">
                              {portfolio.image_url_full ? (
                                <img
                                  src={portfolio.image_url_full}
                                  alt={portfolio.titre}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-12 h-12 text-gray-300" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                                {portfolio.titre}
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {portfolio.description || "Aucune description de projet fournie."}
                              </p>
                              {portfolio.lien_externe && (
                                <a
                                  href={portfolio.lien_externe}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-sm font-semibold transition-colors mt-2"
                                  style={{ color: PALETTE.primary, ':hover': { color: PALETTE.primaryHover } }}
                                >
                                  Voir le projet
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section Avis */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        Avis clients ({avis.length})
                      </h3>
                      {isClient && !isOwner && (
                        <button
                          onClick={() => setShowAvisForm(!showAvisForm)}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-white rounded-xl font-semibold transition-all shadow-md text-sm"
                          style={{ background: PALETTE.primary, color: 'white' }}
                        >
                          <Star className="w-4 h-4" />
                          Laisser un avis
                        </button>
                      )}
                    </div>

                    {/* Formulaire d'avis */}
                    {showAvisForm && isClient && (
                      <div
                        className="mb-6 p-4 rounded-xl border-2"
                        style={{ backgroundColor: PALETTE.primary + '10', borderColor: PALETTE.primary + '30' }}
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Votre note *
                            </label>
                            {renderStarSelector(newAvis.note, (note) => setNewAvis({ ...newAvis, note }))}
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Votre commentaire (optionnel)
                            </label>
                            <textarea
                              value={newAvis.commentaire}
                              onChange={(e) => setNewAvis({ ...newAvis, commentaire: e.target.value })}
                              placeholder="Partagez votre expérience avec ce freelance..."
                              rows={4}
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all outline-none resize-none"
                              style={{ ':focus': { borderColor: PALETTE.primary, boxShadow: `0 0 0 4px ${PALETTE.primary}20` } }}
                            />
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={handleSubmitAvis}
                              disabled={submittingAvis}
                              className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition-all disabled:opacity-50 shadow-md"
                              style={{ background: PALETTE.primary, ':hover': { background: PALETTE.primaryHover } }}
                            >
                              {submittingAvis ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Publication...
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5" />
                                  Publier l'avis
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setShowAvisForm(false);
                                setNewAvis({ note: 5, commentaire: '' });
                              }}
                              className="px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Liste des avis */}
                    {avis.length > 0 ? (
                      <div className="space-y-3">
                        {avis.map((a) => (
                          <div key={a.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            {editingAvis?.id === a.id ? (
                              <div className="space-y-3">
                                {renderStarSelector(editingAvis.note, (note) => setEditingAvis({ ...editingAvis, note }))}
                                <textarea
                                  value={editingAvis.commentaire}
                                  onChange={(e) => setEditingAvis({ ...editingAvis, commentaire: e.target.value })}
                                  rows={3}
                                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 transition-all outline-none resize-none"
                                  style={{ ':focus': { borderColor: PALETTE.primary, boxShadow: `0 0 0 4px ${PALETTE.primary}20` } }}
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleUpdateAvis(a.id)}
                                    disabled={submittingAvis}
                                    className="px-4 py-2 text-white rounded-xl font-semibold transition-all text-sm disabled:opacity-50 shadow-md"
                                    style={{ backgroundColor: PALETTE.success, ':hover': { backgroundColor: PALETTE.success + 'd0' } }}
                                  >
                                    {submittingAvis ? 'Mise à jour...' : 'Enregistrer'}
                                  </button>
                                  <button
                                    onClick={() => setEditingAvis(null)}
                                    className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold transition-colors text-sm"
                                  >
                                    Annuler
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                      style={{ background: `linear-gradient(to bottom right, ${PALETTE.primary}20, ${PALETTE.accent}30)` }}
                                    >
                                      <span className="font-bold" style={{ color: PALETTE.primaryDark }}>
                                        {a.client?.prenom?.[0]}{a.client?.nom?.[0]}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        {a.client?.prenom} {a.client?.nom}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {formatDate(a.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {renderStars(a.note, 'w-4 h-4')}
                                    {isClient && a.client_id === currentUser?.id && (
                                      <div className="flex gap-1 ml-2">
                                        <button
                                          onClick={() => setEditingAvis({ id: a.id, note: a.note, commentaire: a.commentaire })}
                                          className="p-1.5 rounded-lg transition-colors"
                                          style={{ color: PALETTE.primary, ':hover': { backgroundColor: PALETTE.primary + '10' } }}
                                          title="Modifier"
                                        >
                                          <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteAvis(a.id)}
                                          className="p-1.5 rounded-lg transition-colors"
                                          style={{ color: PALETTE.danger, ':hover': { backgroundColor: PALETTE.danger + '10' } }}
                                          title="Supprimer"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )}
                                    {isClient && a.client_id !== currentUser?.id && (
                                      <button
                                        onClick={() => handleSignalerAvis(a.id)}
                                        className="p-1.5 rounded-lg transition-colors ml-2"
                                        style={{ color: PALETTE.warning, ':hover': { backgroundColor: PALETTE.warning + '10' } }}
                                        title="Signaler"
                                      >
                                        <Flag className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {a.commentaire && (
                                  <p className="text-gray-700 leading-relaxed mt-2 text-sm">
                                    {a.commentaire}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium mb-2">Aucun avis pour le moment</p>
                        <p className="text-gray-400 text-sm">
                          Soyez le premier à laisser un avis
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                  {/* Tarifs */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tarification</h3>
                    <div className="space-y-3">
                      <div
                        className="flex items-center justify-between p-4 rounded-xl border"
                        style={{ background: `linear-gradient(to bottom right, ${PALETTE.primary}10, ${PALETTE.primary}20)`, borderColor: PALETTE.primary + '50' }}
                      >
                        <span className="text-sm font-semibold text-gray-600">Minimum</span>
                        <span className="text-xl font-bold" style={{ color: PALETTE.primary }}>
                          {freelanceData?.tarif_minimum?.toLocaleString() || 0} {freelanceData?.devise || 'FCFA'}
                        </span>
                      </div>
                      <div
                        className="flex items-center justify-between p-4 rounded-xl border"
                        style={{ background: `linear-gradient(to bottom right, ${PALETTE.success}10, ${PALETTE.success}20)`, borderColor: PALETTE.success + '50' }}
                      >
                        <span className="text-sm font-semibold text-gray-600">Maximum</span>
                        <span className="text-xl font-bold" style={{ color: PALETTE.success }}>
                          {freelanceData?.tarif_maximum?.toLocaleString() || 0} {freelanceData?.devise || 'FCFA'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  {!isOwner && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                      <div className="space-y-3">
                        {freelanceData?.user?.email && (
                          <a
                            href={`mailto:${freelanceData.user.email}`}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all border border-gray-200 group"
                            style={{ ':hover': { backgroundColor: PALETTE.primary + '10', borderColor: PALETTE.primary + '40' } }}
                          >
                            <div className="p-2 rounded-lg" style={{ backgroundColor: PALETTE.primary + '20' }}>
                              <Mail className="w-5 h-5" style={{ color: PALETTE.primary }} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-[${PALETTE.primary}]">
                              Envoyer un email
                            </span>
                          </a>
                        )}
                        {freelanceData?.user?.telephone && (
                          <a
                            href={`tel:${freelanceData.user.telephone}`}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all border border-gray-200 group"
                            style={{ ':hover': { backgroundColor: PALETTE.success + '10', borderColor: PALETTE.success + '40' } }}
                          >
                            <div className="p-2 rounded-lg" style={{ backgroundColor: PALETTE.success + '20' }}>
                              <Phone className="w-5 h-5" style={{ color: PALETTE.success }} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-[${PALETTE.success}]">
                              {freelanceData.user.telephone}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Disponibilité */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Disponibilité</h3>
                    <div className={`flex items-center gap-2 p-4 rounded-xl border-2`}
                      style={freelanceData?.disponibilite === 'disponible' ?
                        { backgroundColor: PALETTE.successBg, color: PALETTE.success, borderColor: PALETTE.success + '50' } :
                        { backgroundColor: PALETTE.warningBg, color: PALETTE.warning, borderColor: PALETTE.warning + '50' }
                      }
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">
                        {freelanceData?.disponibilite === 'disponible' ? 'Disponible maintenant' : 'Actuellement occupé'}
                      </span>
                    </div>
                  </div>

                  {/* Badge Vedette */}
                  {freelanceData?.est_en_vedette && (
                    <div
                      className="rounded-xl border-2 p-6 shadow-sm"
                      style={{ background: `linear-gradient(to bottom right, ${PALETTE.accent}10, ${PALETTE.accent}20)`, borderColor: PALETTE.accent + '50' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: PALETTE.accent + '30' }}>
                          <Award className="w-8 h-8" style={{ color: PALETTE.accent }} />
                        </div>
                        <div>
                          <p className="font-bold mb-1" style={{ color: PALETTE.primaryDark }}>Freelance Vedette</p>
                          <p className="text-xs text-gray-600">
                            Profil vérifié et recommandé par la plateforme.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Principal */}
                  {isClient && !isOwner && (
                    <button
                      className="w-full px-6 py-4 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                      style={{ background: PALETTE.primary, ':hover': { background: PALETTE.primaryHover } }}
                    >
                      <Send className="w-5 h-5" />
                      Contacter ce freelance
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default FreelanceProfileModal;