// // src/pages/AuthPage.jsx
// import React, { useState, useEffect } from "react";
// import { Users, Briefcase, LogIn, AlertCircle, ArrowRight, Mail, CheckCircle } from "lucide-react";
// import api from "../api/axios";
// import { useApp } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const InputField = ({ type='text', name, placeholder, value, onChange, required=true }) => (
//   <input
//     type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}
//     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-500 text-gray-900"
//   />
// );

// const SelectField = ({ name, placeholder, value, onChange, options, required=true }) => (
//   <select name={name} value={value} onChange={onChange} required={required}
//     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
//   >
//     <option value="" disabled>{placeholder}</option>
//     {options.map(opt => (
//       <option key={opt.id || opt} value={opt.nom || opt}>
//         {opt.nom || opt}
//       </option>
//     ))}
//   </select>
// );

// const AuthPage = () => {
//   const { setIsAuthenticated, setCurrentUser } = useApp();
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(false);
//   const [localUserType, setLocalUserType] = useState(null);
//   const [formData, setFormData] = useState({
//     nom:'', prenom:'', email:'', password:'', password_confirmation:'',
//     telephone:'', whatsapp:'', titre_professionnel:'', categorie:'', ville:''
//   });
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   const [showEmailVerificationScreen, setShowEmailVerificationScreen] = useState(false);
//   const [registeredEmail, setRegisteredEmail] = useState('');

api.get('/test')
  .then(response => {
    console.log('✅ Succès:', response.data);
    // Vous devriez voir origin: "https://bisojob.netlify.app"
  })
  .catch(error => {
    console.error('❌ Erreur:', error.response || error.message);
  });


//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get('/categories');
//         if (res.data.success) {
//           setCategories(res.data.data);
//         }
//       } catch (err) {
//         console.error('Erreur API /categories:', err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'telephone' ? { whatsapp: value } : {})
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg('');
//     setSuccessMsg('');

//     try {
//       let res;
//       if (isLogin) {
//         res = await api.post('/login', { email: formData.email, password: formData.password });
        
//         if (!res.data.success) {
//           setErrorMsg(res.data.message || 'Erreur inconnue');
//           return;
//         }

//         const user = res.data.data.user;
//         const token = res.data.data.token;
//         const emailVerified = res.data.data.email_verified;

//         // Si l'email n'est pas vérifié, bloquer la connexion
//         if (!emailVerified) {
//           setErrorMsg('Veuillez d\'abord vérifier votre email avant de vous connecter. Vérifiez votre boîte mail.');
//           return;
//         }

//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));

//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         navigate('/dashboard');

//       } else {
//         // Inscription
//         const { password_confirmation, ...data } = formData;
//         const finalData = localUserType === 'client'
//           ? Object.fromEntries(Object.entries(data).filter(([k]) => !['titre_professionnel','categorie','ville'].includes(k)))
//           : data;
        
//         res = await api.post('/register', { 
//           ...finalData, 
//           type_utilisateur: localUserType, 
//           password_confirmation: formData.password_confirmation 
//         });

//         if (!res.data.success) {
//           setErrorMsg(res.data.message || 'Erreur inconnue');
//           return;
//         }

//         // Afficher l'écran de vérification d'email
//         setRegisteredEmail(formData.email);
//         setShowEmailVerificationScreen(true);
//       }

//     } catch(err) {
//       console.error('Erreur Axios:', err);
//       if (err.response?.data?.message) {
//         setErrorMsg(err.response.data.message);
//       } else {
//         setErrorMsg('Connexion échouée : Problème de communication serveur.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectUserType = type => {
//     setLocalUserType(type);
//     setFormData({
//       nom:'', prenom:'', email:'', password:'', password_confirmation:'',
//       telephone:'', whatsapp:'', titre_professionnel:'', categorie:'', ville:''
//     });
//     setErrorMsg('');
//     setSuccessMsg('');
//   };

//   const handleBack = () => {
//     setLocalUserType(null);
//     setIsLogin(false);
//     setSuccessMsg('');
//     setErrorMsg('');
//     setShowEmailVerificationScreen(false);
//   };

//   const handleSwitchMode = toLogin => {
//     setIsLogin(toLogin);
//     if (!toLogin) setLocalUserType(null);
//     setSuccessMsg('');
//     setErrorMsg('');
//     setShowEmailVerificationScreen(false);
//   };

//   const handleResendVerification = async () => {
//     setLoading(true);
//     setErrorMsg('');
//     setSuccessMsg('');

//     try {
//       const res = await api.post('/resend-verification-email', { email: registeredEmail });
//       if (res.data.success) {
//         setSuccessMsg('Email de vérification renvoyé avec succès !');
//       } else {
//         setErrorMsg(res.data.message || 'Erreur lors du renvoi');
//       }
//     } catch (err) {
//       setErrorMsg('Erreur lors du renvoi de l\'email');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shouldShowUserTypeSelection = !localUserType && !isLogin && !showEmailVerificationScreen;

//   const buttonClass = "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2";
//   const backButtonClass = "w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition mt-2 flex items-center justify-center";

//   // Écran de vérification d'email après inscription
//   if (showEmailVerificationScreen) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-[#eaf3ff] via-[#f6f9ff] to-white flex items-center justify-center py-12 sm:py-20 px-4">
//         <div className="w-full max-w-md">
//           <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-lg p-8 border border-white/30">
            
//             {/* Logo BisoJob */}
//             <div className="flex flex-col items-center justify-center mb-8">
//               <div className="relative">
//                 <img 
//                   src="/logo-bisojob.jpg" 
//                   alt="BisoJob Logo" 
//                   className="h-40 w-auto mb-4 object-contain transition-transform duration-700 hover:scale-105"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextElementSibling.style.display = 'flex';
//                   }}
//                 />
//                 {/* Fallback text logo */}
//                 <div className="hidden items-center gap-2">
//                   <div className="h-12 w-12 bg-gradient-to-br from-[#0046a3] to-[#00b5ff] rounded-2xl flex items-center justify-center shadow-lg">
//                     <span className="text-2xl font-bold text-white">B</span>
//                   </div>
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0046a3] via-[#007bff] to-[#00b5ff] bg-clip-text text-transparent">
//                     BisoJob
//                   </h1>
//                 </div>
//               </div>
//             </div>

//             {/* Icône Email */}
//             <div className="flex justify-center mb-6">
//               <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
//                 <Mail className="h-10 w-10 text-blue-600" />
//               </div>
//             </div>

//             {/* Titre */}
//             <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
//               Vérifiez votre email 📧
//             </h1>

//             {/* Message principal */}
//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//               <p className="text-blue-800 text-sm text-center leading-relaxed">
//                 Un email de vérification a été envoyé à <span className="font-semibold">{registeredEmail}</span>
//               </p>
//             </div>

//             {/* Instructions */}
//             <div className="space-y-3 mb-6">
//               <div className="flex items-start gap-3 text-sm text-gray-700">
//                 <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <p>Vérifiez votre boîte mail (et vos spams)</p>
//               </div>
//               <div className="flex items-start gap-3 text-sm text-gray-700">
//                 <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <p>Cliquez sur le lien de vérification dans l'email</p>
//               </div>
//               <div className="flex items-start gap-3 text-sm text-gray-700">
//                 <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <p>Revenez vous connecter après la vérification</p>
//               </div>
//             </div>

//             {/* Messages de succès/erreur */}
//             {successMsg && (
//               <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
//                 <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-green-700 text-sm">{successMsg}</p>
//               </div>
//             )}

//             {errorMsg && (
//               <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-red-700 text-sm">{errorMsg}</p>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="space-y-3">
//               <button
//                 onClick={handleResendVerification}
//                 disabled={loading}
//                 className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Envoi en cours...
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="h-5 w-5" />
//                     Renvoyer l'email
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={handleBack}
//                 className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
//               >
//                 ← Retour à la connexion
//               </button>
//             </div>

//             {/* Note de sécurité */}
//             <div className="mt-6 p-4 bg-gray-50 rounded-xl">
//               <p className="text-xs text-gray-600 text-center">
//                 💡 <span className="font-semibold">Astuce :</span> Si vous ne recevez pas l'email, vérifiez vos courriers indésirables (spam)
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#eaf3ff] via-[#f6f9ff] to-white flex items-center justify-center py-12 sm:py-20 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-lg p-8 border border-white/30">

//           {/* Logo BisoJob */}
//           <div className="flex flex-col items-center justify-center mb-8">
//             <div className="relative">
//               <img 
//                 src="/logo-bisojob.jpg" 
//                 alt="BisoJob Logo" 
//                 className="h-40 w-auto mb-4 object-contain transition-transform duration-700 hover:scale-105"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextElementSibling.style.display = 'flex';
//                 }}
//               />
//               {/* Fallback text logo */}
//               <div className="hidden items-center gap-2">
//                 <div className="h-12 w-12 bg-gradient-to-br from-[#0046a3] to-[#00b5ff] rounded-2xl flex items-center justify-center shadow-lg">
//                   <span className="text-2xl font-bold text-white">B</span>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0046a3] via-[#007bff] to-[#00b5ff] bg-clip-text text-transparent">
//                   BisoJob
//                 </h1>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 text-center mt-2">
//               {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte professionnel'}
//             </p>
//           </div>

//           {shouldShowUserTypeSelection ? (
//             <div className="space-y-3">
//               <button 
//                 onClick={() => handleSelectUserType('client')} 
//                 className="w-full bg-gradient-to-r from-[#0046a3] to-[#007bff] hover:from-[#003580] hover:to-[#0060d0] text-white py-4 px-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-xl font-semibold flex items-center justify-center gap-3 group"
//               >
//                 <Users className="h-5 w-5 group-hover:scale-110 transition" /> 
//                 Je suis un client 
//                 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
//               </button>

//               <button 
//                 onClick={() => handleSelectUserType('freelance')} 
//                 className="w-full bg-white border-2 border-[#0046a3] text-[#0046a3] hover:bg-blue-50 py-4 px-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-xl font-semibold flex items-center justify-center gap-3 group"
//               >
//                 <Briefcase className="h-5 w-5 group-hover:scale-110 transition" /> 
//                 Je suis un freelance 
//                 <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
//               </button>
              
//               <div className="pt-4 border-t border-gray-200 text-center">
//                 <p className="text-sm text-gray-600">
//                   Déjà inscrit ?{' '}
//                   <button 
//                     type="button" 
//                     onClick={() => handleSwitchMode(true)} 
//                     className="text-[#0046a3] hover:text-[#007bff] hover:underline font-semibold inline-flex items-center gap-1"
//                   >
//                     <LogIn className="h-4 w-4" />
//                     Connectez-vous
//                   </button>
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <div className="grid grid-cols-2 gap-3">
//                   <InputField name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
//                   <InputField name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
//                 </div>
//               )}

//               {!isLogin && localUserType === 'freelance' && (
//                 <>
//                   <InputField name="titre_professionnel" placeholder="Ex: Développeur Web Full Stack" value={formData.titre_professionnel} onChange={handleChange} />
//                   <SelectField
//                     name="categorie"
//                     placeholder="Sélectionnez votre métier"
//                     options={categories}
//                     value={formData.categorie}
//                     onChange={handleChange}
//                   />
//                   <SelectField name="ville" placeholder="Ville" options={['Brazzaville','Pointe-Noire','Dolisie']} value={formData.ville} onChange={handleChange} />
//                 </>
//               )}

//               {!isLogin && <InputField type="tel" name="telephone" placeholder="Téléphone (WhatsApp)" value={formData.telephone} onChange={handleChange} />}
//               <InputField type="email" name="email" placeholder="Adresse email" value={formData.email} onChange={handleChange} />
//               <InputField type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
//               {!isLogin && <InputField type="password" name="password_confirmation" placeholder="Confirmer le mot de passe" value={formData.password_confirmation} onChange={handleChange} />}

//               {errorMsg && (
//                 <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
//                   <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
//                   <p className="text-red-700 text-sm">{errorMsg}</p>
//                 </div>
//               )}

//               <button type="submit" disabled={loading} className={buttonClass}>
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Chargement...
//                   </>
//                 ) : isLogin ? (
//                   <>
//                     <LogIn className="h-5 w-5" />
//                     Se connecter
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="h-5 w-5" />
//                     S'inscrire
//                   </>
//                 )}
//               </button>

//               {!isLogin && localUserType && (
//                 <button type="button" onClick={handleBack} className={backButtonClass}>
//                   ← Retour au choix du type
//                 </button>
//               )}

//               <div className="pt-4 border-t border-gray-200 text-center">
//                 {isLogin ? (
//                   <p className="text-sm text-gray-600">
//                     Pas encore de compte ?{' '}
//                     <button type="button" onClick={() => handleSwitchMode(false)} className="text-[#0046a3] hover:text-[#007bff] hover:underline font-semibold">
//                       Inscrivez-vous
//                     </button>
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-600">
//                     Déjà inscrit ?{' '}
//                     <button type="button" onClick={() => handleSwitchMode(true)} className="text-[#0046a3] hover:text-[#007bff] hover:underline font-semibold inline-flex items-center gap-1">
//                       <LogIn className="h-4 w-4" />
//                       Connectez-vous
//                     </button>
//                   </p>
//                 )}
//               </div>
//             </form>
//           )}
//         </div>

//         <div className="mt-8 text-center space-y-2">
//           <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
//             🔒 Vos données sont sécurisées et chiffrées
//           </p>
//           <p className="text-xs text-gray-500">
//             En vous inscrivant, vous acceptez nos conditions d'utilisation
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AuthPage;


// src/pages/AuthPage.jsx
import React, { useState, useEffect } from "react";
import { Users, Briefcase, LogIn, AlertCircle, ArrowRight, Mail, CheckCircle } from "lucide-react";
import api from "../api/axios";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// ### PALETTE UNIFIÉE ###
const PALETTE = {
  // 1. Couleurs de Marque
  primary: '#4a9fd8',      // lightBlue
  primaryHover: '#3a8fc8', // lightBlueDark
  primaryDark: '#1a3a52',   // darkBlue
  accent: '#d4a574',       // gold

  // 2. Couleurs Sémantiques
  success: '#28a745',       
  successBg: 'rgba(40, 167, 69, 0.1)', 
  successText: '#15803d',
  
  danger: '#dc3545',        
  dangerBg: 'rgba(220, 53, 69, 0.1)',
  dangerText: '#c82333',

  // 3. Niveaux de Gris
  text: '#212529',         // Texte principal
  textMuted: '#6b7280',    // Texte secondaire
  textLight: '#ffffff',    // text-white
  
  bgPage: '#f8f9fa',       // Fond de page
  bgComponent: '#ffffff',  // Fond de carte
  
  border: '#e5e7eb',        // Bordure légère
  borderLight: '#f3f4f6',   // Fond très léger

  // 4. Teintes et Dégradés
  primaryTint: 'rgba(74, 159, 216, 0.15)', // Fond bleu très clair
  primaryTintBorder: 'rgba(74, 159, 216, 0.3)', // Bordure bleu clair
  
  gradientPrimary: `linear-gradient(135deg, #1a3a52 0%, #4a9fd8 100%)`, // darkBlue -> lightBlue
};
// ######################

const InputField = ({ type='text', name, placeholder, value, onChange, required=true }) => (
  <input
    type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}
    className="w-full px-4 py-3 rounded-xl border-2 transition placeholder-gray-500 text-sm"
    style={{
      borderColor: PALETTE.border,
      backgroundColor: PALETTE.borderLight,
      color: PALETTE.text,
      '--hover-bg': PALETTE.bgComponent, // Simulation de hover
      '--hover-border': PALETTE.primaryTintBorder,
      '--focus-ring': PALETTE.primary,
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = PALETTE.bgComponent;
        e.currentTarget.style.borderColor = PALETTE.primaryTintBorder;
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = PALETTE.borderLight;
        e.currentTarget.style.borderColor = PALETTE.border;
    }}
    onFocus={(e) => {
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.boxShadow = `0 0 0 2px ${PALETTE.primaryTint}, 0 0 0 4px ${PALETTE.primaryTintBorder}`;
        e.currentTarget.style.borderColor = PALETTE.primary;
    }}
    onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = PALETTE.border;
    }}
  />
);

const SelectField = ({ name, placeholder, value, onChange, options, required=true }) => (
  <select name={name} value={value} onChange={onChange} required={required}
    className="w-full px-4 py-3 rounded-xl border-2 transition text-sm"
    style={{
      borderColor: PALETTE.border,
      backgroundColor: PALETTE.borderLight,
      color: PALETTE.text,
      '--hover-bg': PALETTE.bgComponent, // Simulation de hover
      '--hover-border': PALETTE.primaryTintBorder,
      '--focus-ring': PALETTE.primary,
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = PALETTE.bgComponent;
        e.currentTarget.style.borderColor = PALETTE.primaryTintBorder;
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = PALETTE.borderLight;
        e.currentTarget.style.borderColor = PALETTE.border;
    }}
    onFocus={(e) => {
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.boxShadow = `0 0 0 2px ${PALETTE.primaryTint}, 0 0 0 4px ${PALETTE.primaryTintBorder}`;
        e.currentTarget.style.borderColor = PALETTE.primary;
    }}
    onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = PALETTE.border;
    }}
  >
    <option value="" disabled style={{ color: PALETTE.textMuted }}>{placeholder}</option>
    {options.map(opt => (
      <option key={opt.id || opt} value={opt.nom || opt} style={{ color: PALETTE.text }}>
        {opt.nom || opt}
      </option>
    ))}
  </select>
);

const AuthPage = () => {
  const { setIsAuthenticated, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [localUserType, setLocalUserType] = useState(null);
  const [formData, setFormData] = useState({
    nom:'', prenom:'', email:'', password:'', password_confirmation:'',
    telephone:'', whatsapp:'', titre_professionnel:'', categorie:'', ville:''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showEmailVerificationScreen, setShowEmailVerificationScreen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error('Erreur API /categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'telephone' ? { whatsapp: value } : {})
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let res;
      if (isLogin) {
        res = await api.post('/login', { email: formData.email, password: formData.password });
        
        if (!res.data.success) {
          setErrorMsg(res.data.message || 'Erreur inconnue');
          return;
        }

        const user = res.data.data.user;
        const token = res.data.data.token;
        const emailVerified = res.data.data.email_verified;

        // Si l'email n'est pas vérifié, bloquer la connexion
        if (!emailVerified) {
          setErrorMsg('Veuillez d\'abord vérifier votre email avant de vous connecter. Vérifiez votre boîte mail.');
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setIsAuthenticated(true);
        setCurrentUser(user);
        navigate('/dashboard');

      } else {
        // Inscription
        const { password_confirmation, ...data } = formData;
        const finalData = localUserType === 'client'
          ? Object.fromEntries(Object.entries(data).filter(([k]) => !['titre_professionnel','categorie','ville'].includes(k)))
          : data;
        
        res = await api.post('/register', { 
          ...finalData, 
          type_utilisateur: localUserType, 
          password_confirmation: formData.password_confirmation 
        });

        if (!res.data.success) {
          setErrorMsg(res.data.message || 'Erreur inconnue');
          return;
        }

        // Afficher l'écran de vérification d'email
        setRegisteredEmail(formData.email);
        setShowEmailVerificationScreen(true);
      }

    } catch(err) {
      console.error('Erreur Axios:', err);
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Connexion échouée : Problème de communication serveur.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUserType = type => {
    setLocalUserType(type);
    setFormData({
      nom:'', prenom:'', email:'', password:'', password_confirmation:'',
      telephone:'', whatsapp:'', titre_professionnel:'', categorie:'', ville:''
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleBack = () => {
    setLocalUserType(null);
    setIsLogin(false);
    setSuccessMsg('');
    setErrorMsg('');
    setShowEmailVerificationScreen(false);
  };

  const handleSwitchMode = toLogin => {
    setIsLogin(toLogin);
    if (!toLogin) setLocalUserType(null);
    setSuccessMsg('');
    setErrorMsg('');
    setShowEmailVerificationScreen(false);
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.post('/resend-verification-email', { email: registeredEmail });
      if (res.data.success) {
        setSuccessMsg('Email de vérification renvoyé avec succès !');
      } else {
        setErrorMsg(res.data.message || 'Erreur lors du renvoi');
      }
    } catch (err) {
      setErrorMsg('Erreur lors du renvoi de l\'email');
    } finally {
      setLoading(false);
    }
  };

  const shouldShowUserTypeSelection = !localUserType && !isLogin && !showEmailVerificationScreen;

  const buttonStyle = {
    backgroundColor: PALETTE.primary,
    color: PALETTE.textLight,
    transition: 'background-color 0.2s, transform 0.2s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };
  
  const buttonHoverStyle = {
    backgroundColor: PALETTE.primaryHover,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  };

  const buttonClass = "w-full font-semibold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2";
  const backButtonClass = "w-full font-semibold py-3 rounded-xl transition mt-2 flex items-center justify-center";

  // Écran de vérification d'email après inscription
  if (showEmailVerificationScreen) {
    return (
      <main 
        className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4"
        style={{
          backgroundColor: PALETTE.bgPage,
          backgroundImage: `linear-gradient(to bottom right, #eaf3ff, ${PALETTE.bgPage})` // Garde un léger dégradé clair
        }}
      >
        <div className="w-full max-w-md">
          <div 
            className="rounded-3xl shadow-lg p-8 border border-white/30"
            style={{ 
              backgroundColor: PALETTE.bgComponent + 'd0', // 70% opacity
              backdropFilter: 'blur(20px)'
            }}
          >
            
            {/* Logo BisoJob */}
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative">
                    <img 
                        src="/logo-bisojob.jpg" 
                        alt="BisoJob Logo" 
                        className="h-40 w-auto mb-4 object-contain transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Icône Email */}
            <div className="flex justify-center mb-6">
              <div 
                className="h-20 w-20 rounded-full flex items-center justify-center animate-pulse"
                style={{ backgroundColor: PALETTE.primaryTint }}
              >
                <Mail className="h-10 w-10" style={{ color: PALETTE.primary }} />
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-2xl font-bold text-center mb-3" style={{ color: PALETTE.text }}>
              Vérifiez votre email 📧
            </h1>

            {/* Message principal */}
            <div 
              className="rounded-xl p-4 mb-6"
              style={{
                backgroundColor: PALETTE.primaryTint,
                border: `1px solid ${PALETTE.primaryTintBorder}`
              }}
            >
              <p className="text-sm text-center leading-relaxed" style={{ color: PALETTE.primaryDark }}>
                Un email de vérification a été envoyé à <span className="font-semibold">{registeredEmail}</span>
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm" style={{ color: PALETTE.textMuted }}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.success }} />
                <p>Vérifiez votre boîte mail (et vos spams)</p>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: PALETTE.textMuted }}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.success }} />
                <p>Cliquez sur le lien de vérification dans l'email</p>
              </div>
              <div className="flex items-start gap-3 text-sm" style={{ color: PALETTE.textMuted }}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.success }} />
                <p>Revenez vous connecter après la vérification</p>
              </div>
            </div>

            {/* Messages de succès/erreur */}
            {successMsg && (
              <div 
                className="mb-4 p-4 rounded-xl flex items-start gap-3"
                style={{
                  backgroundColor: PALETTE.successBg,
                  border: `1px solid ${PALETTE.success}`
                }}
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.success }} />
                <p className="text-sm" style={{ color: PALETTE.successText }}>{successMsg}</p>
              </div>
            )}

            {errorMsg && (
              <div 
                className="mb-4 p-4 rounded-xl flex items-start gap-3 animate-shake"
                style={{
                  backgroundColor: PALETTE.dangerBg,
                  border: `1px solid ${PALETTE.danger}`
                }}
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.danger }} />
                <p className="text-sm" style={{ color: PALETTE.dangerText }}>{errorMsg}</p>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                disabled={loading}
                className="w-full border-2 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                style={{
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.primary,
                  color: PALETTE.primary,
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.primaryTint}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = PALETTE.bgComponent}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" style={{ color: PALETTE.primary }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Renvoyer l'email
                  </>
                )}
              </button>

              <button
                onClick={handleBack}
                className={backButtonClass}
                style={{
                  backgroundColor: PALETTE.borderLight,
                  color: PALETTE.text,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.border}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = PALETTE.borderLight}
              >
                ← Retour à la connexion
              </button>
            </div>

            {/* Note de sécurité */}
            <div 
              className="mt-6 p-4 rounded-xl"
              style={{ backgroundColor: PALETTE.borderLight }}
            >
              <p className="text-xs text-center" style={{ color: PALETTE.textMuted }}>
                💡 <span className="font-semibold">Astuce :</span> Si vous ne recevez pas l'email, vérifiez vos courriers indésirables (spam)
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4"
      style={{
        backgroundColor: PALETTE.bgPage,
        backgroundImage: `linear-gradient(to bottom right, #eaf3ff, ${PALETTE.bgPage})`
      }}
    >
      <div className="w-full max-w-md">
        <div 
          className="rounded-3xl shadow-lg p-8 border border-white/30"
          style={{ 
            backgroundColor: PALETTE.bgComponent + 'd0', 
            backdropFilter: 'blur(20px)'
          }}
        >

          {/* Logo BisoJob */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              <img 
                src="/logo-bisojob.jpg" 
                alt="BisoJob Logo" 
                className="h-40 w-auto mb-4 object-contain transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <p className="text-sm text-center mt-2" style={{ color: PALETTE.textMuted }}>
              {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte professionnel'}
            </p>
          </div>

          {shouldShowUserTypeSelection ? (
            <div className="space-y-3">
              <button 
                onClick={() => handleSelectUserType('client')} 
                className="w-full py-4 px-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-xl font-semibold flex items-center justify-center gap-3 group"
                style={{
                  background: PALETTE.gradientPrimary,
                  color: PALETTE.textLight,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = PALETTE.primaryDark}
                onMouseLeave={(e) => e.currentTarget.style.background = PALETTE.gradientPrimary}
              >
                <Users className="h-5 w-5 group-hover:scale-110 transition" /> 
                Je suis un client 
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
              </button>

              <button 
                onClick={() => handleSelectUserType('freelance')} 
                className="w-full border-2 py-4 px-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-xl font-semibold flex items-center justify-center gap-3 group"
                style={{
                  backgroundColor: PALETTE.bgComponent,
                  borderColor: PALETTE.primaryDark,
                  color: PALETTE.primaryDark,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = PALETTE.primaryTint;
                    e.currentTarget.style.borderColor = PALETTE.primary;
                    e.currentTarget.style.color = PALETTE.primary;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = PALETTE.bgComponent;
                    e.currentTarget.style.borderColor = PALETTE.primaryDark;
                    e.currentTarget.style.color = PALETTE.primaryDark;
                }}
              >
                <Briefcase className="h-5 w-5 group-hover:scale-110 transition" /> 
                Je suis un freelance 
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
              </button>
              
              <div className="pt-4 border-t text-center" style={{ borderColor: PALETTE.border }}>
                <p className="text-sm" style={{ color: PALETTE.textMuted }}>
                  Déjà inscrit ?{' '}
                  <button 
                    type="button" 
                    onClick={() => handleSwitchMode(true)} 
                    className="hover:underline font-semibold inline-flex items-center gap-1"
                    style={{ color: PALETTE.primaryDark }}
                    onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = PALETTE.primaryDark}
                  >
                    <LogIn className="h-4 w-4" />
                    Connectez-vous
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <InputField name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
                  <InputField name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
                </div>
              )}

              {!isLogin && localUserType === 'freelance' && (
                <>
                  <InputField name="titre_professionnel" placeholder="Ex: Développeur Web Full Stack" value={formData.titre_professionnel} onChange={handleChange} />
                  <SelectField
                    name="categorie"
                    placeholder="Sélectionnez votre métier"
                    options={categories}
                    value={formData.categorie}
                    onChange={handleChange}
                  />
                  <SelectField name="ville" placeholder="Ville" options={['Brazzaville','Pointe-Noire','Dolisie']} value={formData.ville} onChange={handleChange} />
                </>
              )}

              {!isLogin && <InputField type="tel" name="telephone" placeholder="Téléphone (WhatsApp)" value={formData.telephone} onChange={handleChange} />}
              <InputField type="email" name="email" placeholder="Adresse email" value={formData.email} onChange={handleChange} />
              <InputField type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
              {!isLogin && <InputField type="password" name="password_confirmation" placeholder="Confirmer le mot de passe" value={formData.password_confirmation} onChange={handleChange} />}

              {errorMsg && (
                <div 
                  className="p-4 rounded-xl flex items-start gap-3 animate-shake"
                  style={{
                    backgroundColor: PALETTE.dangerBg,
                    border: `1px solid ${PALETTE.danger}`
                  }}
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: PALETTE.danger }} />
                  <p className="text-sm" style={{ color: PALETTE.dangerText }}>{errorMsg}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading} 
                className={buttonClass}
                style={buttonStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </>
                ) : isLogin ? (
                  <>
                    <LogIn className="h-5 w-5" />
                    Se connecter
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    S'inscrire
                  </>
                )}
              </button>

              {!isLogin && localUserType && (
                <button 
                  type="button" 
                  onClick={handleBack} 
                  className={backButtonClass}
                  style={{
                    backgroundColor: PALETTE.borderLight,
                    color: PALETTE.text,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = PALETTE.border}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = PALETTE.borderLight}
                >
                  ← Retour au choix du type
                </button>
              )}

              <div className="pt-4 border-t text-center" style={{ borderColor: PALETTE.border }}>
                {isLogin ? (
                  <p className="text-sm" style={{ color: PALETTE.textMuted }}>
                    Pas encore de compte ?{' '}
                    <button 
                      type="button" 
                      onClick={() => handleSwitchMode(false)} 
                      className="hover:underline font-semibold"
                      style={{ color: PALETTE.primaryDark }}
                      onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = PALETTE.primaryDark}
                    >
                      Inscrivez-vous
                    </button>
                  </p>
                ) : (
                  <p className="text-sm" style={{ color: PALETTE.textMuted }}>
                    Déjà inscrit ?{' '}
                    <button 
                      type="button" 
                      onClick={() => handleSwitchMode(true)} 
                      className="hover:underline font-semibold inline-flex items-center gap-1"
                      style={{ color: PALETTE.primaryDark }}
                      onMouseEnter={(e) => e.currentTarget.style.color = PALETTE.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = PALETTE.primaryDark}
                    >
                      <LogIn className="h-4 w-4" />
                      Connectez-vous
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: PALETTE.textMuted }}>
            🔒 Vos données sont sécurisées et chiffrées
          </p>
          <p className="text-xs" style={{ color: PALETTE.textMuted }}>
            En vous inscrivant, vous acceptez nos conditions d'utilisation
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
