import React, { useState } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Building, Phone, MapPin, Globe, User,
  CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Upload, FileText,
  Users, Calendar, GraduationCap, Shield, Sparkles, Check, X
} from 'lucide-react';

// Composant principal avec navigation entre formulaires
export default function UniversityAuthForms() {
  const [currentForm, setCurrentForm] = useState('choice'); // choice, login, register

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {currentForm === 'choice' && <FormChoice setCurrentForm={setCurrentForm} />}
      {currentForm === 'login' && <LoginForm setCurrentForm={setCurrentForm} />}
      {currentForm === 'register' && <RegisterForm setCurrentForm={setCurrentForm} />}
    </div>
  );
}

// Page de choix entre connexion et inscription
function FormChoice({ setCurrentForm }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <Building className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Espace Université
          </h1>
          <p className="text-xl text-gray-600">
            Gérez votre établissement et attirez les meilleurs étudiants
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Connexion Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Connexion</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vous avez déjà un compte ? Connectez-vous pour gérer votre profil universitaire.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Accédez à votre tableau de bord',
                'Gérez vos programmes',
                'Consultez les candidatures',
                'Mettez à jour vos informations'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentForm('login')}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center group-hover:shadow-xl"
            >
              Se connecter
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Inscription Card */}
          <div className="group bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-white">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-3">Inscription</h2>
            <p className="text-indigo-100 mb-6 leading-relaxed">
              Nouvelle université ? Rejoignez notre plateforme et développez votre visibilité.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Profil complet et attractif',
                'Gestion des candidatures',
                'Statistiques en temps réel',
                'Support dédié 24/7'
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCurrentForm('register')}
              className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            >
              S'inscrire gratuitement
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-indigo-200 text-sm mt-4">
              <Shield className="w-4 h-4 inline mr-1" />
              Inscription 100% gratuite et sécurisée
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            { number: '500+', label: 'Universités inscrites' },
            { number: '50,000+', label: 'Étudiants actifs' },
            { number: '95%', label: 'Taux de satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Formulaire de connexion
function LoginForm({ setCurrentForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation simple
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login:', formData);
      // Ici, ajoutez votre logique de connexion
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => setCurrentForm('choice')}
          className="flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-600">Accédez à votre espace université</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email universitaire
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@universite.edu"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Se connecter
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Nouveau sur la plateforme ?</span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => setCurrentForm('register')}
            className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300"
          >
            Créer un compte université
          </button>
        </div>

        {/* Help */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Besoin d'aide ? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">Contactez notre support</a></p>
        </div>
      </div>
    </div>
  );
}

// Formulaire d'inscription (multi-étapes)
function RegisterForm({ setCurrentForm }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1: Informations de base
    universityName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Étape 2: Détails de l'université
    address: '',
    city: '',
    country: '',
    website: '',
    foundedYear: '',
    type: '',
    
    // Étape 3: Contact et documents
    contactPerson: '',
    contactTitle: '',
    accreditationDoc: null,
    logo: null,
    
    // Acceptation
    terms: false
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 3;

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.universityName) newErrors.universityName = 'Nom requis';
      if (!formData.email) newErrors.email = 'Email requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
      if (!formData.password) newErrors.password = 'Mot de passe requis';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    } else if (step === 2) {
      if (!formData.address) newErrors.address = 'Adresse requise';
      if (!formData.city) newErrors.city = 'Ville requise';
      if (!formData.country) newErrors.country = 'Pays requis';
      if (!formData.type) newErrors.type = 'Type requis';
    } else if (step === 3) {
      if (!formData.contactPerson) newErrors.contactPerson = 'Nom du contact requis';
      if (!formData.terms) newErrors.terms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Registration:', formData);
      // Ici, ajoutez votre logique d'inscription
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={() => currentStep === 1 ? setCurrentForm('choice') : handlePrevious()}
          className="flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Inscription Université</h2>
            <p className="text-gray-600">Rejoignez notre réseau d'établissements partenaires</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step <= currentStep 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      step < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Informations</span>
              <span>Détails</span>
              <span>Finalisation</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations de base */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom de l'université *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.universityName}
                      onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                      placeholder="Université Marien-Ngouabi"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.universityName ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.universityName && (
                    <p className="text-red-500 text-sm mt-1">{errors.universityName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email institutionnel *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@universite.edu"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+242 XX XXX XXXX"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Étape 2: Détails de l'université */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse complète *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Avenue principale, BP 123"
                      rows="3"
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Brazzaville"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pays *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.country ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      <option value="congo">République du Congo</option>
                      <option value="rdc">RD Congo</option>
                      <option value="senegal">Sénégal</option>
                      <option value="cameroun">Cameroun</option>
                      <option value="cote-ivoire">Côte d'Ivoire</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Site web
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.universite.edu"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Année de fondation
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.foundedYear}
                        onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                        placeholder="1971"
                        min="1800"
                        max="2025"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type d'établissement *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.type ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      <option value="public">Publique</option>
                      <option value="private">Privée</option>
                      <option value="mixed">Mixte</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Contact et documents */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-indigo-900 mb-1">Vérification de l'établissement</p>
                      <p className="text-sm text-indigo-700">
                        Ces informations nous permettent de vérifier l'authenticité de votre université. 
                        Votre profil sera activé après validation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom du contact *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Dr. Jean Dupont"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.contactPerson ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fonction
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.contactTitle}
                        onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
                        placeholder="Recteur / Directeur des admissions"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Documents */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document d'accréditation
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="accreditation"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setFormData({ ...formData, accreditationDoc: e.target.files[0] })}
                    />
                    <label htmlFor="accreditation" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        {formData.accreditationDoc ? formData.accreditationDoc.name : 'Cliquez pour télécharger'}
                      </p>
                      <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 5MB)</p>
                    </label>
                  </div>
                </div>

                {/* Upload Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Logo de l'université
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        {formData.logo ? formData.logo.name : 'Télécharger le logo'}
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG, SVG (max 2MB)</p>
                    </label>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.terms}
                      onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                      className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      J'accepte les <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">conditions d'utilisation</a> et la <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">politique de confidentialité</a>. 
                      Je certifie que toutes les informations fournies sont exactes et que je suis autorisé à représenter cette institution.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-sm mt-2 ml-8">{errors.terms}</p>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Que se passe-t-il ensuite ?</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Vérification de votre dossier (24-48h)</li>
                        <li>• Email de confirmation d'activation</li>
                        <li>• Accès complet à votre tableau de bord</li>
                        <li>• Support dédié pour la configuration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Précédent
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Finaliser l'inscription
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-2 text-green-600" />
            Vos données sont sécurisées et protégées
          </div>
        </div>
      </div>
    </div>
  );
}