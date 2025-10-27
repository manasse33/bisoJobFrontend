// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Briefcase,
//   Edit,
//   Save,
//   X,
//   Camera,
//   Star,
//   Award,
//   TrendingUp,
//   DollarSign,
//   Clock,
//   CheckCircle,
//   Plus,
//   Trash2,
// } from "lucide-react";
// import api from "../api/axios";
// import { useApp } from "../context/AppContext";
// import PageHeader from "../components/Header";

// // ### PALETTE UNIFIÉE (Basée sur BisoJob et les couleurs sémantiques) ###
// const PALETTE = {
//   // 1. Couleurs de Marque (Primaire - remplace indigo-600)
//   primary: '#4a9fd8',      // lightBlue
//   primaryHover: '#3a8fc8', // lightBlueDark
//   primaryDark: '#1a3a52',   // darkBlue
//   accent: '#d4a574',       // gold

//   // 2. Couleurs Sémantiques
//   success: '#28a745',       // remplace emerald-600
//   successBg: 'rgba(40, 167, 69, 0.1)', // remplace emerald-50/100
//   successText: '#15803d',
  
//   danger: '#dc3545',        // pour les alertes critiques
//   dangerBg: 'rgba(220, 53, 69, 0.1)',
  
//   warning: '#ffc107',       // remplace yellow-500 (étoiles) et orange-600
//   warningBg: 'rgba(255, 193, 7, 0.1)', // remplace orange-50
//   warningText: '#d97706',

//   // 3. Niveaux de Gris
//   text: '#212529',         // remplace slate-900 (Texte principal)
//   textMuted: '#6b7280',    // remplace slate-600/500/700 (Texte secondaire, labels)
//   textLight: '#ffffff',    // text-white
  
//   bgPage: '#f8f9fa',       // Fond de page (remplace bg-white sur main)
//   bgComponent: '#ffffff',  // Fond de carte (bg-white)
  
//   border: '#e5e7eb',        // remplace border-slate-100/200/300 (Bordures légères)
//   borderLight: '#f3f4f6',   // remplace bg-slate-200 (Bouton Annuler, background léger)

//   // 4. Teintes et Dégradés
//   primaryTint: 'rgba(74, 159, 216, 0.15)', // remplace indigo-50/100
//   primaryTintBorder: 'rgba(74, 159, 216, 0.3)', // remplace indigo-200/300
  
//   gradientPrimary: `linear-gradient(135deg, #1a3a52 0%, #4a9fd8 100%)`, // darkBlue -> lightBlue
// };
// // ########################################################

// const ProfilePage = ({ sidebarWidth = 50 }) => {
//   const { currentUser, setCurrentUser } = useApp();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [profileData, setProfileData] = useState({
//     prenom: "",
//     nom: "",
//     email: "",
//     telephone: "",
//     ville: "",
//     biographie: "",
//     categorie: "",
//     tarif_horaire: "",
//     experience: "",
//   });

//   const [competences, setCompetences] = useState([]);
//   const [newCompetence, setNewCompetence] = useState("");

//   const userType = currentUser?.type_utilisateur || "client";
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (currentUser) {
//       setProfileData({
//         prenom: currentUser.prenom || "",
//         nom: currentUser.nom || "",
//         email: currentUser.email || "",
//         telephone: currentUser.telephone || "",
//         ville: currentUser.ville || "",
//         biographie: currentUser.freelance?.biographie || currentUser.biographie || "",
//         categorie: currentUser.freelance?.categorie || "",
//         tarif_horaire: currentUser.freelance?.tarif_horaire || "",
//         experience: currentUser.freelance?.annees_experience || "",
//       });

//       if (currentUser.freelance?.competences) {
//         setCompetences(
//           Array.isArray(currentUser.freelance.competences)
//             ? currentUser.freelance.competences
//             : []
//         );
//       }
//     }
//   }, [currentUser]);

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put(
//         "/profile",
//         {
//           ...profileData,
//           competences: competences,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.success) {
//         setCurrentUser(res.data.data);
//         setEditMode(false);
//         alert("Profil mis à jour avec succès !");
//       }
//     } catch (error) {
//       console.error("Erreur:", error);
//       alert("Erreur lors de la mise à jour du profil");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addCompetence = () => {
//     if (newCompetence.trim() && !competences.find(c => c.nom_competence === newCompetence.trim())) {
//       setCompetences([...competences, { nom_competence: newCompetence.trim() }]);
//       setNewCompetence("");
//     }
//   };

//   const removeCompetence = (comp) => {
//     setCompetences(competences.filter((c) => c.nom_competence !== comp.nom_competence));
//   };

//   const stats = {
//     projets: currentUser?.stats?.projets || 0,
//     completionRate: currentUser?.stats?.completion_rate || 95,
//     rating: currentUser?.freelance?.note_moyenne || 4.8,
//     reviews: currentUser?.stats?.total_avis || 0,
//   };
  
//   // Fonction de style pour la marge mobile
//   const getSidebarMargin = () => {
//     return window.innerWidth >= 768 ? sidebarWidth : 0;
//   };
  
//   // Fonction pour la marge du bas pour la barre de navigation mobile
//   const getPaddingBottom = () => {
//     return window.innerWidth < 768 ? '5rem' : '2rem'; // 5rem pour laisser de l'espace à la barre de nav
//   };


//   return (
//     <main 
//       className="min-h-screen" 
//       style={{ 
//         marginLeft: getSidebarMargin(),
//         backgroundColor: PALETTE.bgPage,
//         paddingBottom: getPaddingBottom() // AJOUT pour la réactivité mobile
//       }}
//     >
//       <PageHeader
//         title={`Profil ${userType === "freelance" ? "Freelance" : "Client"}`}
//         subtitle="Gérez vos informations personnelles"
//         currentUser={currentUser}
//         userType={userType}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Grid - Pour Freelance uniquement */}
//         {userType === "freelance" && (
//           // MODIFICATION: sm:grid-cols-2 pour que ça passe sur les petits écrans
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div 
//               className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.borderColor = PALETTE.primaryTintBorder}
//               onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Projets complétés</p>
//                   <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.primary }}>{stats.projets}</p>
//                 </div>
//                 <div 
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: PALETTE.primaryTint }}
//                 >
//                   <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.primary }} />
//                 </div>
//               </div>
//             </div>

//             <div 
//               className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(40, 167, 69, 0.3)'}
//               onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Taux de réussite</p>
//                   <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.success }}>{stats.completionRate}%</p>
//                 </div>
//                 <div 
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: PALETTE.successBg }}
//                 >
//                   <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.success }} />
//                 </div>
//               </div>
//             </div>

//             <div 
//               className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.borderColor = PALETTE.primaryTintBorder}
//               onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Note moyenne</p>
//                   <div className="flex items-center gap-2">
//                     <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.primary }}>{stats.rating}</p>
//                     <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: PALETTE.warning, fill: PALETTE.warning }} />
//                   </div>
//                 </div>
//                 <div 
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: PALETTE.primaryTint }}
//                 >
//                   <Award className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.primary }} />
//                 </div>
//               </div>
//             </div>

//             <div 
//               className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 193, 7, 0.3)'}
//               onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Avis reçus</p>
//                   <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.warningText }}>{stats.reviews}</p>
//                 </div>
//                 <div 
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//                   style={{ backgroundColor: PALETTE.warningBg }}
//                 >
//                   <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.warningText }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CONTENU PRINCIPAL & COLONNE LATERALE */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Colonne principale - Prend toute la largeur sur mobile et 2/3 sur grand écran */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Photo et infos de base */}
//             <div 
//               className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//             >
//               {/* Flex direction change pour mobile */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
//                 <div className="relative flex-shrink-0">
//                   <div 
//                     className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center overflow-hidden"
//                     style={{ backgroundColor: PALETTE.primaryTint }}
//                   >
//                     {currentUser?.photo_profil ? (
//                       <img
//                         src={currentUser.photo_profil}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <User className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: PALETTE.primary }} />
//                     )}
//                   </div>
//                   {editMode && (
//                     <button 
//                       className="absolute -bottom-2 -right-2 p-2 rounded-lg text-white shadow-lg transition-colors"
//                       style={{ 
//                         backgroundColor: PALETTE.primary,
//                         hover: { backgroundColor: PALETTE.primaryHover }
//                       }}
//                     >
//                       <Camera className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex-1 w-full">
//                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
//                     <div>
//                       <h2 className="text-xl sm:text-2xl font-bold" style={{ color: PALETTE.text }}>
//                         {currentUser?.prenom} {currentUser?.nom}
//                       </h2>
//                       <p className="mt-1 text-sm sm:text-base" style={{ color: PALETTE.textMuted }}>
//                         {userType === "freelance"
//                           ? profileData.categorie || "Freelance"
//                           : "Client"}
//                       </p>
//                     </div>
//                     {/* Boutons sur une seule ligne */}
//                     <div className="flex gap-2 mt-3 sm:mt-0">
//                       {!editMode ? (
//                         <button
//                           onClick={() => setEditMode(true)}
//                           className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-sm"
//                           style={{
//                             backgroundColor: PALETTE.primary,
//                             hover: { backgroundColor: PALETTE.primaryHover }
//                           }}
//                         >
//                           <Edit className="w-4 h-4" />
//                           Modifier
//                         </button>
//                       ) : (
//                         <div className="flex gap-2">
//                           <button
//                             onClick={handleSave}
//                             disabled={loading}
//                             className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-md hover:shadow-lg text-sm"
//                             style={{
//                               backgroundColor: PALETTE.success,
//                               hover: { backgroundColor: PALETTE.successText }
//                             }}
//                           >
//                             {loading ? (
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             ) : (
//                               <Save className="w-4 h-4" />
//                             )}
//                             Sauvegarder
//                           </button>
//                           <button
//                             onClick={() => setEditMode(false)}
//                             className="p-2 rounded-lg transition-colors flex-shrink-0"
//                             style={{
//                               backgroundColor: PALETTE.borderLight,
//                               color: PALETTE.textMuted,
//                               hover: { backgroundColor: PALETTE.border }
//                             }}
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {userType === "freelance" && (
//                     <div className="flex flex-wrap items-center gap-4 mt-3">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4" style={{ color: PALETTE.warning, fill: PALETTE.warning }} />
//                         <span className="font-semibold text-sm" style={{ color: PALETTE.text }}>
//                           {stats.rating}
//                         </span>
//                         <span className="text-xs" style={{ color: PALETTE.textMuted }}>
//                           ({stats.reviews} avis)
//                         </span>
//                       </div>
//                       <div className="h-4 w-px hidden sm:block" style={{ backgroundColor: PALETTE.border }} />
//                       <div className="flex items-center gap-1" style={{ color: PALETTE.textMuted }}>
//                         <Briefcase className="w-4 h-4" />
//                         <span className="text-sm font-medium">
//                           {stats.projets} projets
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Biographie */}
//               <div>
//                 <h3 className="text-lg font-bold mb-3" style={{ color: PALETTE.text }}>
//                   À propos
//                 </h3>
//                 {editMode ? (
//                   <textarea
//                     value={profileData.biographie}
//                     onChange={(e) =>
//                       setProfileData({ ...profileData, biographie: e.target.value })
//                     }
//                     rows={4}
//                     placeholder="Parlez de vous, vos compétences, votre expérience..."
//                     className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none text-sm"
//                     style={{
//                       borderColor: PALETTE.border,
//                       focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                     }}
//                   />
//                 ) : (
//                   <p className="leading-relaxed text-sm" style={{ color: PALETTE.textMuted }}>
//                     {profileData.biographie || "Aucune description ajoutée"}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Informations de contact */}
//             <div 
//               className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//             >
//               <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
//                 Informations de contact
//               </h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {/* Champs ici... */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <User className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Prénom
//                   </label>
//                   {editMode ? (
//                     <input
//                       type="text"
//                       value={profileData.prenom}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, prenom: e.target.value })
//                       }
//                       className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                       style={{
//                         borderColor: PALETTE.border,
//                         focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                       }}
//                     />
//                   ) : (
//                     <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.prenom}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <User className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Nom
//                   </label>
//                   {editMode ? (
//                     <input
//                       type="text"
//                       value={profileData.nom}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, nom: e.target.value })
//                       }
//                       className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                       style={{
//                         borderColor: PALETTE.border,
//                         focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                       }}
//                     />
//                   ) : (
//                     <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.nom}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <Mail className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Email
//                   </label>
//                   <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.email}</p>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <Phone className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Téléphone
//                   </label>
//                   {editMode ? (
//                     <input
//                       type="tel"
//                       value={profileData.telephone}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, telephone: e.target.value })
//                       }
//                       className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                       style={{
//                         borderColor: PALETTE.border,
//                         focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                       }}
//                     />
//                   ) : (
//                     <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                       {profileData.telephone || "Non renseigné"}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <MapPin className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Ville
//                   </label>
//                   {editMode ? (
//                     <select
//                       value={profileData.ville}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, ville: e.target.value })
//                       }
//                       className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                       style={{
//                         borderColor: PALETTE.border,
//                         focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                       }}
//                     >
//                       <option value="">Sélectionner...</option>
//                       <option value="Brazzaville">Brazzaville</option>
//                       <option value="Pointe-Noire">Pointe-Noire</option>
//                       <option value="Dolisie">Dolisie</option>
//                     </select>
//                   ) : (
//                     <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                       {profileData.ville || "Non renseigné"}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                     <Calendar className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                     Membre depuis
//                   </label>
//                   <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                     {new Date(currentUser?.created_at).toLocaleDateString("fr-FR", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Infos Freelance spécifiques */}
//             {userType === "freelance" && (
//               <div 
//                 className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//                 style={{
//                   backgroundColor: PALETTE.bgComponent,
//                   borderColor: PALETTE.border
//                 }}
//               >
//                 <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
//                   Informations professionnelles
//                 </h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                       <Briefcase className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                       Catégorie
//                     </label>
//                     {editMode ? (
//                       <input
//                         type="text"
//                         value={profileData.categorie}
//                         onChange={(e) =>
//                           setProfileData({ ...profileData, categorie: e.target.value })
//                         }
//                         className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                         style={{
//                           borderColor: PALETTE.border,
//                           focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                         }}
//                       />
//                     ) : (
//                       <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                         {profileData.categorie || "Non renseigné"}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                       <DollarSign className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                       Tarif horaire (FCFA)
//                     </label>
//                     {editMode ? (
//                       <input
//                         type="number"
//                         value={profileData.tarif_horaire}
//                         onChange={(e) =>
//                           setProfileData({
//                             ...profileData,
//                             tarif_horaire: e.target.value,
//                           })
//                         }
//                         className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                         style={{
//                           borderColor: PALETTE.border,
//                           focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                         }}
//                       />
//                     ) : (
//                       <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                         {profileData.tarif_horaire
//                           ? `${Number(profileData.tarif_horaire).toLocaleString()} FCFA`
//                           : "Non renseigné"}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
//                       <Clock className="w-4 h-4" style={{ color: PALETTE.primary }} />
//                       Années d'expérience
//                     </label>
//                     {editMode ? (
//                       <input
//                         type="number"
//                         value={profileData.experience}
//                         onChange={(e) =>
//                           setProfileData({ ...profileData, experience: e.target.value })
//                         }
//                         className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                         style={{
//                           borderColor: PALETTE.border,
//                           focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                         }}
//                       />
//                     ) : (
//                       <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
//                         {profileData.experience
//                           ? `${profileData.experience} ans`
//                           : "Non renseigné"}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Compétences - Freelance uniquement */}
//             {userType === "freelance" && (
//               <div 
//                 className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//                 style={{
//                   backgroundColor: PALETTE.bgComponent,
//                   borderColor: PALETTE.border
//                 }}
//               >
//                 <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>Compétences</h3>

//                 {editMode && (
//                   <div className="flex gap-2 mb-4">
//                     <input
//                       type="text"
//                       value={newCompetence}
//                       onChange={(e) => setNewCompetence(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && addCompetence()}
//                       placeholder="Ajouter une compétence..."
//                       className="flex-1 px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
//                       style={{
//                         borderColor: PALETTE.border,
//                         focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
//                       }}
//                     />
//                     <button
//                       onClick={addCompetence}
//                       className="px-3 py-2 text-white rounded-lg font-semibold transition-colors flex-shrink-0"
//                       style={{
//                         backgroundColor: PALETTE.primary,
//                         hover: { backgroundColor: PALETTE.primaryHover }
//                       }}
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
//                 )}

//                 <div className="flex flex-wrap gap-2">
//                {competences.length > 0 ? (
//                   competences.map((comp, index) => (
//                     <div
//                       key={comp.id || index}
//                       className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 font-semibold text-sm"
//                       style={{
//                         backgroundColor: PALETTE.primaryTint,
//                         color: PALETTE.primaryDark,
//                         borderColor: PALETTE.primaryTintBorder
//                       }}
//                     >
//                       <span>{comp.nom_competence || comp}</span>
//                       {editMode && (
//                         <button
//                           onClick={() => removeCompetence(comp)}
//                           className="transition-colors"
//                           style={{ color: PALETTE.danger }}
//                           onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.dangerText}
//                           onMouseLeave={(e) => e.currentTarget.style.color = PALETTE.danger}
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm" style={{ color: PALETTE.textMuted }}>Aucune compétence ajoutée</p>
//                 )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Colonne latérale - Prend toute la largeur sur mobile et 1/3 sur grand écran */}
//           <div className="space-y-6">
//             {/* Actions rapides */}
//             <div 
//               className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//             >
//               <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>Actions rapides</h3>

//               <div className="space-y-3">
//                 <button
//                   onClick={() => navigate("/dashboard")}
//                   className="w-full px-4 py-3 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm"
//                   style={{
//                     backgroundColor: PALETTE.primary,
//                     hover: { backgroundColor: PALETTE.primaryHover }
//                   }}
//                 >
//                   Tableau de bord
//                 </button>
//                 <button
//                   onClick={() => navigate("/projects")}
//                   className="w-full px-4 py-3 border-2 rounded-lg font-semibold transition-colors text-sm"
//                   style={{
//                     backgroundColor: PALETTE.bgComponent,
//                     borderColor: PALETTE.primaryTintBorder,
//                     color: PALETTE.primary,
//                     hover: { backgroundColor: PALETTE.primaryTint }
//                   }}
//                 >
//                   {userType === "freelance" ? "Explorer les projets" : "Mes projets"}
//                 </button>
//                 <button 
//                   className="w-full px-4 py-3 border-2 rounded-lg font-semibold transition-colors text-sm"
//                   style={{
//                     backgroundColor: PALETTE.bgComponent,
//                     borderColor: PALETTE.primaryTintBorder,
//                     color: PALETTE.primary,
//                     hover: { backgroundColor: PALETTE.primaryTint }
//                   }}
//                 >
//                   Messagerie
//                 </button>
//               </div>
//             </div>

//             {/* Conseil */}
//             <div 
//               className="rounded-2xl border-2 p-4 sm:p-6"
//               style={{
//                 backgroundColor: PALETTE.primaryTint,
//                 borderColor: PALETTE.primaryTintBorder
//               }}
//             >
//               <h3 className="text-sm font-semibold mb-2" style={{ color: PALETTE.primary }}>
//                 💡 Conseil
//               </h3>
//               <p className="text-xs leading-relaxed" style={{ color: PALETTE.textMuted }}>
//                 {userType === "freelance"
//                   ? "Un profil complet avec une photo et des compétences augmente vos chances de recevoir des demandes de 70%."
//                   : "Complétez votre profil pour faciliter la communication avec les freelances."}
//               </p>
//             </div>

//             {/* Progression du profil */}
//             <div 
//               className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
//               style={{
//                 backgroundColor: PALETTE.bgComponent,
//                 borderColor: PALETTE.border
//               }}
//             >
//               <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
//                 Progression du profil
//               </h3>

//               <div className="space-y-3">
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span className="font-semibold" style={{ color: PALETTE.textMuted }}>Complétude</span>
//                     <span className="font-bold" style={{ color: PALETTE.primary }}>75%</span>
//                   </div>
//                   <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.borderLight }}>
//                     <div
//                       className="h-full rounded-full transition-all duration-300"
//                       style={{ 
//                         width: "75%",
//                         backgroundColor: PALETTE.primary
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2 mt-4">
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="w-4 h-4" style={{ color: PALETTE.success }} />
//                     <span style={{ color: PALETTE.textMuted }}>Informations de base</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="w-4 h-4" style={{ color: PALETTE.success }} />
//                     <span style={{ color: PALETTE.textMuted }}>Photo de profil</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: PALETTE.border }} />
//                     <span style={{ color: PALETTE.textMuted }}>Portfolio</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
} from "lucide-react";
import api from "../api/axios";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/Header";

// ### PALETTE UNIFIÉE (Basée sur BisoJob et les couleurs sémantiques) ###
const PALETTE = {
  // 1. Couleurs de Marque (Primaire - remplace indigo-600)
  primary: '#4a9fd8',      // lightBlue
  primaryHover: '#3a8fc8', // lightBlueDark
  primaryDark: '#1a3a52',   // darkBlue
  accent: '#d4a574',       // gold

  // 2. Couleurs Sémantiques
  success: '#28a745',       // remplace emerald-600
  successBg: 'rgba(40, 167, 69, 0.1)', // remplace emerald-50/100
  successText: '#15803d',
  
  danger: '#dc3545',        // pour les alertes critiques
  dangerBg: 'rgba(220, 53, 69, 0.1)',
  dangerText: '#c82333',

  warning: '#ffc107',       // remplace yellow-500 (étoiles) et orange-600
  warningBg: 'rgba(255, 193, 7, 0.1)', // remplace orange-50
  warningText: '#d97706',

  // 3. Niveaux de Gris
  text: '#212529',         // remplace slate-900 (Texte principal)
  textMuted: '#6b7280',    // remplace slate-600/500/700 (Texte secondaire, labels)
  textLight: '#ffffff',    // text-white
  
  bgPage: '#f8f9fa',       // Fond de page (remplace bg-white sur main)
  bgComponent: '#ffffff',  // Fond de carte (bg-white)
  
  border: '#e5e7eb',        // remplace border-slate-100/200/300 (Bordures légères)
  borderLight: '#f3f4f6',   // remplace bg-slate-200 (Bouton Annuler, background léger)

  // 4. Teintes et Dégradés
  primaryTint: 'rgba(74, 159, 216, 0.15)', // remplace indigo-50/100
  primaryTintBorder: 'rgba(74, 159, 216, 0.3)', // remplace indigo-200/300
  
  gradientPrimary: `linear-gradient(135deg, #1a3a52 0%, #4a9fd8 100%)`, // darkBlue -> lightBlue
};
// ########################################################

/**
 * MODAL POUR L'AJOUT/MODIFICATION DE PORTOFOLIO
 */
const PortfolioModal = ({ isOpen, onClose, onSave, PALETTE }) => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    lien_externe: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Réinitialisation des états à l'ouverture pour un ajout
    if (isOpen) {
      setFormData({
        titre: "",
        description: "",
        lien_externe: "",
        image: null,
      });
      setPreviewImage(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titre || !formData.image) {
      alert("Veuillez remplir le titre et sélectionner une image.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("titre", formData.titre);
    data.append("description", formData.description || "");
    data.append("lien_externe", formData.lien_externe || "");
    data.append("image", formData.image); // Le fichier
    
    // Le onSave gère l'appel API
    await onSave(data);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl overflow-hidden"
        style={{ backgroundColor: PALETTE.bgComponent }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: PALETTE.primaryDark }}>
            Ajouter un projet au Portfolio
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ color: PALETTE.textMuted, hover: { backgroundColor: PALETTE.borderLight } }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>
              Titre du projet <span style={{ color: PALETTE.danger }}>*</span>
            </label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="Ex: Refonte du site BisoJob"
              className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
              style={{
                borderColor: PALETTE.border,
                focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Décrivez le projet et votre rôle..."
              className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none resize-none text-sm"
              style={{
                borderColor: PALETTE.border,
                focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>
              Lien externe (facultatif)
            </label>
            <input
              type="url"
              name="lien_externe"
              value={formData.lien_externe}
              onChange={handleChange}
              placeholder="https://votreprojet.com"
              className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
              style={{
                borderColor: PALETTE.border,
                focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>
              Image du projet <span style={{ color: PALETTE.danger }}>*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:cursor-pointer"
              style={{ 
                  '--file-bg': PALETTE.primary, 
                  '--file-text': PALETTE.textLight,
                  '--file-hover': PALETTE.primaryHover,
                  '--file-border': PALETTE.primaryTintBorder,
                  '--file-focus': PALETTE.primary,
                  backgroundColor: PALETTE.borderLight,
                  borderRadius: '0.5rem',
                  borderColor: PALETTE.border,
                  borderWidth: '2px'
              }}
            />
            {previewImage && (
              <div className="mt-3">
                <img src={previewImage} alt="Aperçu" className="w-full h-32 object-cover rounded-xl border-2" style={{ borderColor: PALETTE.border }} />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: PALETTE.success,
              hover: { backgroundColor: PALETTE.successText }
            }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Enregistrer le projet
          </button>
        </form>
      </motion.div>
    </div>
  );
};


/**
 * AFFICHAGE D'UN ÉLÉMENT DE PORTOFOLIO
 */
const PortofolioItem = ({ item, editMode, onDelete, PALETTE }) => {
  return (
    <div 
      className="relative rounded-xl border-2 shadow-sm overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
      style={{ 
        backgroundColor: PALETTE.bgComponent, 
        borderColor: PALETTE.border 
      }}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={item.image_url_full}
          alt={item.titre}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x160.png?text=Image+Introuvable" }} // Fallback
        />
      </div>
      
      <div className="p-4">
        <h4 className="text-base font-bold truncate mb-1" style={{ color: PALETTE.text }}>
          {item.titre}
        </h4>
        <p className="text-xs line-clamp-2" style={{ color: PALETTE.textMuted }}>
          {item.description || "Aucune description fournie."}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: PALETTE.borderLight }}>
          {item.lien_externe ? (
            <a 
              href={item.lien_externe} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: PALETTE.primary, hover: { color: PALETTE.primaryHover } }}
            >
              Voir le lien
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-xs italic" style={{ color: PALETTE.textMuted }}>Pas de lien</span>
          )}

          {editMode && (
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 rounded-full transition-colors"
              style={{ 
                color: PALETTE.danger, 
                hover: { backgroundColor: PALETTE.dangerBg, color: PALETTE.dangerText } 
              }}
              title="Supprimer ce projet"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ########################################################

const ProfilePage = ({ sidebarWidth = 50 }) => {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false); // NOUVEAU

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
  // NOUVEAU: État pour le portfolio
  const [portofolios, setPortofolios] = useState([]);

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

      if (currentUser.freelance?.competences) {
        setCompetences(
          Array.isArray(currentUser.freelance.competences)
            ? currentUser.freelance.competences
            : []
        );
      }
      // NOUVEAU: Initialisation du portfolio
      if (currentUser.freelance?.portofolios) {
        setPortofolios(
          Array.isArray(currentUser.freelance.portofolios)
            ? currentUser.freelance.portofolios
            : []
        );
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
    if (newCompetence.trim() && !competences.find(c => c.nom_competence === newCompetence.trim())) {
      setCompetences([...competences, { nom_competence: newCompetence.trim() }]);
      setNewCompetence("");
    }
  };

  const removeCompetence = (comp) => {
    setCompetences(competences.filter((c) => c.nom_competence !== comp.nom_competence));
  };
  
  // NOUVEAU: Logique pour la gestion du portfolio
  const handleSavePortofolio = async (formData) => {
    try {
      // POST /Portofolios
      const res = await api.post("/Portofolios", formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data' est souvent ajouté automatiquement par Axios/Fetch avec FormData
        },
      });

      if (res.data.success) {
        const newPortofolioItem = res.data.data; // Assurez-vous que l'API renvoie le nouvel élément créé
        setPortofolios((prev) => [...prev, newPortofolioItem]);
        setShowPortfolioModal(false);
        alert("Projet ajouté au portfolio avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du portfolio:", error);
      alert("Erreur lors de l'ajout du portfolio. (Vérifiez le format de l'image)");
    }
  };

  const handleDeletePortofolio = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet du portfolio ?")) return;

    try {
      // DELETE /Portofolios/{id}
      await api.delete(`/Portofolios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPortofolios(portofolios.filter(p => p.id !== id));
      alert("Projet supprimé du portfolio avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du portfolio:", error);
      alert("Erreur lors de la suppression du portfolio.");
    }
  };
  
  // Fin de la nouvelle logique

  const stats = {
    projets: currentUser?.stats?.projets || 0,
    completionRate: currentUser?.stats?.completion_rate || 95,
    rating: currentUser?.freelance?.note_moyenne || 4.8,
    reviews: currentUser?.stats?.total_avis || 0,
  };
  
  const getSidebarMargin = () => {
    return window.innerWidth >= 768 ? sidebarWidth : 0;
  };
  
  const getPaddingBottom = () => {
    return window.innerWidth < 768 ? '5rem' : '2rem';
  };


  return (
    <main 
      className="min-h-screen" 
      style={{ 
        marginLeft: getSidebarMargin(),
        backgroundColor: PALETTE.bgPage,
        paddingBottom: getPaddingBottom()
      }}
    >
      <PageHeader
        title={`Profil ${userType === "freelance" ? "Freelance" : "Client"}`}
        subtitle="Gérez vos informations personnelles"
        currentUser={currentUser}
        userType={userType}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid - Pour Freelance uniquement */}
        {userType === "freelance" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* ... (Existing Stat Cards) ... */}
            <div 
              className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = PALETTE.primaryTintBorder}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Projets complétés</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.primary }}>{stats.projets}</p>
                </div>
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PALETTE.primaryTint }}
                >
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.primary }} />
                </div>
              </div>
            </div>

            <div 
              className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(40, 167, 69, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Taux de réussite</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.success }}>{stats.completionRate}%</p>
                </div>
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PALETTE.successBg }}
                >
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.success }} />
                </div>
              </div>
            </div>

            <div 
              className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = PALETTE.primaryTintBorder}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Note moyenne</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.primary }}>{stats.rating}</p>
                    <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: PALETTE.warning, fill: PALETTE.warning }} />
                  </div>
                </div>
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PALETTE.primaryTint }}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.primary }} />
                </div>
              </div>
            </div>

            <div 
              className="rounded-2xl p-4 sm:p-6 border-2 shadow-sm transition-all duration-300"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255, 193, 7, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = PALETTE.border}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: PALETTE.textMuted }}>Avis reçus</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: PALETTE.warningText }}>{stats.reviews}</p>
                </div>
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PALETTE.warningBg }}
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: PALETTE.warningText }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* ... (Existing Profile/Contact/Professional Info Blocks) ... */}
            
            {/* Photo et infos de base */}
            <div 
              className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <div 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: PALETTE.primaryTint }}
                  >
                    {currentUser?.photo_profil ? (
                      <img
                        src={currentUser.photo_profil}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: PALETTE.primary }} />
                    )}
                  </div>
                  {editMode && (
                    <button 
                      className="absolute -bottom-2 -right-2 p-2 rounded-lg text-white shadow-lg transition-colors"
                      style={{ 
                        backgroundColor: PALETTE.primary,
                        hover: { backgroundColor: PALETTE.primaryHover }
                      }}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold" style={{ color: PALETTE.text }}>
                        {currentUser?.prenom} {currentUser?.nom}
                      </h2>
                      <p className="mt-1 text-sm sm:text-base" style={{ color: PALETTE.textMuted }}>
                        {userType === "freelance"
                          ? profileData.categorie || "Freelance"
                          : "Client"}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      {!editMode ? (
                        <button
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-sm"
                          style={{
                            backgroundColor: PALETTE.primary,
                            hover: { backgroundColor: PALETTE.primaryHover }
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          Modifier
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-md hover:shadow-lg text-sm"
                            style={{
                              backgroundColor: PALETTE.success,
                              hover: { backgroundColor: PALETTE.successText }
                            }}
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
                            className="p-2 rounded-lg transition-colors flex-shrink-0"
                            style={{
                              backgroundColor: PALETTE.borderLight,
                              color: PALETTE.textMuted,
                              hover: { backgroundColor: PALETTE.border }
                            }}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {userType === "freelance" && (
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: PALETTE.warning, fill: PALETTE.warning }} />
                        <span className="font-semibold text-sm" style={{ color: PALETTE.text }}>
                          {stats.rating}
                        </span>
                        <span className="text-xs" style={{ color: PALETTE.textMuted }}>
                          ({stats.reviews} avis)
                        </span>
                      </div>
                      <div className="h-4 w-px hidden sm:block" style={{ backgroundColor: PALETTE.border }} />
                      <div className="flex items-center gap-1" style={{ color: PALETTE.textMuted }}>
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
                <h3 className="text-lg font-bold mb-3" style={{ color: PALETTE.text }}>
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
                    className="w-full px-4 py-3 rounded-xl border-2 transition-all outline-none resize-none text-sm"
                    style={{
                      borderColor: PALETTE.border,
                      focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                    }}
                  />
                ) : (
                  <p className="leading-relaxed text-sm" style={{ color: PALETTE.textMuted }}>
                    {profileData.biographie || "Aucune description ajoutée"}
                  </p>
                )}
              </div>
            </div>

            {/* Informations de contact */}
            <div 
              className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
                Informations de contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ... (Existing Contact Fields) ... */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <User className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Prénom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profileData.prenom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, prenom: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                      style={{
                        borderColor: PALETTE.border,
                        focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                      }}
                    />
                  ) : (
                    <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.prenom}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <User className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Nom
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profileData.nom}
                      onChange={(e) =>
                        setProfileData({ ...profileData, nom: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                      style={{
                        borderColor: PALETTE.border,
                        focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                      }}
                    />
                  ) : (
                    <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.nom}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <Mail className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Email
                  </label>
                  <p className="font-medium text-sm" style={{ color: PALETTE.text }}>{profileData.email}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <Phone className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Téléphone
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profileData.telephone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, telephone: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                      style={{
                        borderColor: PALETTE.border,
                        focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                      }}
                    />
                  ) : (
                    <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
                      {profileData.telephone || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <MapPin className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Ville
                  </label>
                  {editMode ? (
                    <select
                      value={profileData.ville}
                      onChange={(e) =>
                        setProfileData({ ...profileData, ville: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                      style={{
                        borderColor: PALETTE.border,
                        focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                      }}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Brazzaville">Brazzaville</option>
                      <option value="Pointe-Noire">Pointe-Noire</option>
                      <option value="Dolisie">Dolisie</option>
                    </select>
                  ) : (
                    <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
                      {profileData.ville || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                    <Calendar className="w-4 h-4" style={{ color: PALETTE.primary }} />
                    Membre depuis
                  </label>
                  <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
                    {new Date(currentUser?.created_at).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Infos Freelance spécifiques */}
            {userType === "freelance" && (
              <div 
                className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
                style={{
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.border
                }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
                  Informations professionnelles
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ... (Existing Professional Fields) ... */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                      <Briefcase className="w-4 h-4" style={{ color: PALETTE.primary }} />
                      Catégorie
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profileData.categorie}
                        onChange={(e) =>
                          setProfileData({ ...profileData, categorie: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                        style={{
                          borderColor: PALETTE.border,
                          focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                        }}
                      />
                    ) : (
                      <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
                        {profileData.categorie || "Non renseigné"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                      <DollarSign className="w-4 h-4" style={{ color: PALETTE.primary }} />
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
                        className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                        style={{
                          borderColor: PALETTE.border,
                          focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                        }}
                      />
                    ) : (
                      <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
                        {profileData.tarif_horaire
                          ? `${Number(profileData.tarif_horaire).toLocaleString()} FCFA`
                          : "Non renseigné"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: PALETTE.textMuted }}>
                      <Clock className="w-4 h-4" style={{ color: PALETTE.primary }} />
                      Années d'expérience
                    </label>
                    {editMode ? (
                      <input
                        type="number"
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData({ ...profileData, experience: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                        style={{
                          borderColor: PALETTE.border,
                          focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                        }}
                      />
                    ) : (
                      <p className="font-medium text-sm" style={{ color: PALETTE.text }}>
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
              <div 
                className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
                style={{
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.border
                }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>Compétences</h3>

                {editMode && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newCompetence}
                      onChange={(e) => setNewCompetence(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCompetence()}
                      placeholder="Ajouter une compétence..."
                      className="flex-1 px-4 py-2 rounded-lg border-2 transition-all outline-none text-sm"
                      style={{
                        borderColor: PALETTE.border,
                        focus: { borderColor: PALETTE.primary, ring: PALETTE.primaryTint }
                      }}
                    />
                    <button
                      onClick={addCompetence}
                      className="px-3 py-2 text-white rounded-lg font-semibold transition-colors flex-shrink-0"
                      style={{
                        backgroundColor: PALETTE.primary,
                        hover: { backgroundColor: PALETTE.primaryHover }
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
               {competences.length > 0 ? (
                  competences.map((comp, index) => (
                    <div
                      key={comp.id || index}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 font-semibold text-sm"
                      style={{
                        backgroundColor: PALETTE.primaryTint,
                        color: PALETTE.primaryDark,
                        borderColor: PALETTE.primaryTintBorder
                      }}
                    >
                      <span>{comp.nom_competence || comp}</span>
                      {editMode && (
                        <button
                          onClick={() => removeCompetence(comp)}
                          className="transition-colors"
                          style={{ color: PALETTE.danger }}
                          onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.dangerText}
                          onMouseLeave={(e) => e.currentTarget.style.color = PALETTE.danger}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm" style={{ color: PALETTE.textMuted }}>Aucune compétence ajoutée</p>
                )}
                </div>
              </div>
            )}
            
            {/* NOUVELLE SECTION: Portofolio - Freelance uniquement */}
            {userType === "freelance" && (
              <div 
                className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
                style={{
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.border
                }}
              >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold" style={{ color: PALETTE.primary }}>Mon Portofolio</h3>
                    {editMode && (
                        <button
                            onClick={() => setShowPortfolioModal(true)}
                            className="flex items-center gap-1 px-3 py-1.5 text-white rounded-lg font-semibold transition-colors text-sm"
                            style={{
                                backgroundColor: PALETTE.primary,
                                hover: { backgroundColor: PALETTE.primaryHover }
                            }}
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portofolios.length > 0 ? (
                      portofolios.map((item) => (
                          <PortofolioItem 
                              key={item.id} 
                              item={item} 
                              editMode={editMode} 
                              onDelete={handleDeletePortofolio} 
                              PALETTE={PALETTE} 
                          />
                      ))
                  ) : (
                      <div className="lg:col-span-2 p-4 text-center rounded-lg" style={{ backgroundColor: PALETTE.borderLight }}>
                          <p className="text-sm" style={{ color: PALETTE.textMuted }}>
                              Votre portfolio est vide. {editMode && "Ajoutez un projet pour mettre en valeur votre travail !"}
                          </p>
                      </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* ... (Existing Quick Actions/Advice/Progress Blocks) ... */}
            <div 
              className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>Actions rapides</h3>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-4 py-3 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                  style={{
                    backgroundColor: PALETTE.primary,
                    hover: { backgroundColor: PALETTE.primaryHover }
                  }}
                >
                  Tableau de bord
                </button>
                <button
                  onClick={() => navigate("/projects")}
                  className="w-full px-4 py-3 border-2 rounded-lg font-semibold transition-colors text-sm"
                  style={{
                    backgroundColor: PALETTE.bgComponent,
                    borderColor: PALETTE.primaryTintBorder,
                    color: PALETTE.primary,
                    hover: { backgroundColor: PALETTE.primaryTint }
                  }}
                >
                  {userType === "freelance" ? "Explorer les projets" : "Mes projets"}
                </button>
                <button 
                  className="w-full px-4 py-3 border-2 rounded-lg font-semibold transition-colors text-sm"
                  style={{
                    backgroundColor: PALETTE.bgComponent,
                    borderColor: PALETTE.primaryTintBorder,
                    color: PALETTE.primary,
                    hover: { backgroundColor: PALETTE.primaryTint }
                  }}
                >
                  Messagerie
                </button>
              </div>
            </div>

            {/* Conseil */}
            <div 
              className="rounded-2xl border-2 p-4 sm:p-6"
              style={{
                backgroundColor: PALETTE.primaryTint,
                borderColor: PALETTE.primaryTintBorder
              }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: PALETTE.primary }}>
                💡 Conseil
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: PALETTE.textMuted }}>
                {userType === "freelance"
                  ? "Un profil complet avec une photo et des compétences augmente vos chances de recevoir des demandes de 70%."
                  : "Complétez votre profil pour faciliter la communication avec les freelances."}
              </p>
            </div>

            {/* Progression du profil */}
            <div 
              className="rounded-2xl border-2 p-4 sm:p-6 shadow-sm"
              style={{
                backgroundColor: PALETTE.bgComponent,
                borderColor: PALETTE.border
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.primary }}>
                Progression du profil
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold" style={{ color: PALETTE.textMuted }}>Complétude</span>
                    <span className="font-bold" style={{ color: PALETTE.primary }}>75%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.borderLight }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: "75%",
                        backgroundColor: PALETTE.primary
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" style={{ color: PALETTE.success }} />
                    <span style={{ color: PALETTE.textMuted }}>Informations de base</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" style={{ color: PALETTE.success }} />
                    <span style={{ color: PALETTE.textMuted }}>Photo de profil</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {/* Le portfolio est maintenant une section modifiable */}
                    {portofolios.length > 0 ? (
                        <CheckCircle className="w-4 h-4" style={{ color: PALETTE.success }} />
                    ) : (
                        <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: PALETTE.border }} />
                    )}
                    <span style={{ color: PALETTE.textMuted }}>Portfolio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modale Portfolio */}
      <AnimatePresence>
        {showPortfolioModal && (
          <PortfolioModal 
            isOpen={showPortfolioModal}
            onClose={() => setShowPortfolioModal(false)}
            onSave={handleSavePortofolio}
            PALETTE={PALETTE}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProfilePage;