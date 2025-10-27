import React, { useState } from 'react';
import { 
  MapPin, Star, Users, BookOpen, Award, ChevronRight, Heart, Globe, 
  Phone, Mail, Calendar, Clock, TrendingUp, Target, CheckCircle,
  Download, Share2, Building, GraduationCap, Briefcase, DollarSign, 
  Trophy, MessageCircle, Filter, Search, X, ArrowRight, ExternalLink, 
  Facebook, Instagram, Linkedin, Twitter, FileText, Shield, Zap
} from 'lucide-react';

export default function UniversityPublicPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProgramDetail, setShowProgramDetail] = useState(false);

  const university = {
    name: "Université Marien Ngouabi",
    slogan: "Savoir • Excellence • Leadership",
    type: "Établissement Public d'Enseignement Supérieur",
    founded: 1971,
    city: "Brazzaville",
    country: "République du Congo",
    rating: 4.5,
    reviews: 1250,
    students: 25000,
    programs: 45,
    teachers: 850,
    employmentRate: 87,
    ranking: "#1 au Congo, Top 50 en Afrique",
    verified: true,
    description: "Première institution d'enseignement supérieur de la République du Congo, l'Université Marien Ngouabi incarne plus de cinq décennies d'excellence académique. Nous formons les cadres et leaders qui façonnent l'avenir de notre nation et du continent africain à travers des programmes rigoureux et une recherche de classe mondiale.",
    contact: {
      address: "BP 69, Avenue de l'Indépendance, Brazzaville, République du Congo",
      phone: "+242 05 532 09 53",
      email: "rectorat@umng.cg",
      website: "www.umng.cg"
    },
    accreditations: [
      { name: "CAMES", full: "Conseil Africain et Malgache pour l'Enseignement Supérieur", year: "1971" },
      { name: "Ministère de l'Enseignement Supérieur", full: "République du Congo", year: "1971" },
      { name: "AUA", full: "Association des Universités Africaines", year: "1975" },
      { name: "ANEAQ", full: "Agence Nationale d'Évaluation et d'Assurance Qualité", year: "2020" }
    ]
  };

  const programs = [
    {
      id: 1,
      name: "Sciences Informatiques & Intelligence Artificielle",
      category: "Faculté des Sciences & Technologies",
      duration: "3 ans (Licence) / 5 ans (Master)",
      degree: "Licence / Master",
      tuition: "Formation gratuite - Concours d'entrée",
      language: "Français / Anglais technique",
      mode: "Présentiel - Temps plein",
      intake: 150,
      enrolled: 450,
      employmentRate: 95,
      avgSalary: "450 000 - 800 000 FCFA",
      description: "Programme d'excellence formant aux métiers de pointe du numérique : développement logiciel, intelligence artificielle, science des données, cybersécurité et systèmes distribués. Partenariats avec IBM, Microsoft et Orange Digital.",
      skills: ["Algorithmique Avancée", "Intelligence Artificielle & ML", "Architectures Cloud", "Cybersécurité", "Big Data & Analytics", "Développement Full-Stack"],
      careers: ["Ingénieur Logiciel", "Data Scientist", "Architecte Cloud", "Expert Cybersécurité", "Chef de Projet IT", "Consultant Digital"],
      requirements: ["Baccalauréat série C ou D", "Moyenne générale ≥ 14/20", "Concours d'entrée obligatoire", "Entretien de motivation"],
      nextIntake: "Septembre 2025",
      accreditation: "CAMES - Programme accrédité",
      trending: true
    },
    {
      id: 2,
      name: "Droit des Affaires & Fiscalité Internationale",
      category: "Faculté de Droit & Sciences Politiques",
      duration: "5 ans (Master)",
      degree: "Master",
      tuition: "Formation gratuite",
      language: "Français",
      mode: "Présentiel",
      intake: 80,
      enrolled: 160,
      employmentRate: 88,
      avgSalary: "600 000 - 1 200 000 FCFA",
      description: "Formation d'élite aux métiers juridiques d'entreprise avec spécialisation en droit OHADA, fiscalité internationale et contentieux des affaires. Partenariats avec cabinets internationaux.",
      skills: ["Droit Commercial OHADA", "Fiscalité Internationale", "Contentieux des Affaires", "Droit des Sociétés", "Compliance & Gouvernance", "Arbitrage Commercial"],
      careers: ["Avocat d'Affaires", "Juriste d'Entreprise", "Fiscaliste", "Compliance Officer", "Arbitre Commercial", "Conseiller Juridique"],
      requirements: ["Licence en Droit", "Moyenne ≥ 14/20", "Mémoire de recherche", "Entretien devant jury"],
      nextIntake: "Septembre 2025",
      accreditation: "CAMES - Programme accrédité",
      trending: false
    },
    {
      id: 3,
      name: "Médecine Générale & Spécialités",
      category: "Faculté des Sciences de la Santé",
      duration: "7 ans (Doctorat)",
      degree: "Doctorat en Médecine",
      tuition: "Formation gratuite - Concours très sélectif",
      language: "Français",
      mode: "Présentiel + Stages hospitaliers",
      intake: 100,
      enrolled: 580,
      employmentRate: 99,
      avgSalary: "800 000 - 2 000 000 FCFA",
      description: "Programme médical d'excellence conforme aux standards internationaux. Formation théorique et pratique dans nos CHU partenaires. Possibilités de spécialisations et échanges internationaux.",
      skills: ["Médecine Générale", "Chirurgie", "Pédiatrie", "Obstétrique", "Médecine Interne", "Urgences & Réanimation"],
      careers: ["Médecin Généraliste", "Chirurgien", "Spécialiste", "Médecin Hospitalier", "Médecin Chef", "Chercheur Médical"],
      requirements: ["Baccalauréat série D", "Moyenne ≥ 16/20", "Concours national très sélectif", "Examen médical complet"],
      nextIntake: "Septembre 2025",
      accreditation: "Ordre National des Médecins",
      trending: true
    },
    {
      id: 4,
      name: "Sciences Économiques & Gestion",
      category: "Faculté des Sciences Économiques",
      duration: "3 ans (Licence) / 5 ans (Master)",
      degree: "Licence / Master",
      tuition: "Formation gratuite",
      language: "Français / Anglais",
      mode: "Présentiel",
      intake: 120,
      enrolled: 350,
      employmentRate: 82,
      avgSalary: "400 000 - 700 000 FCFA",
      description: "Formation rigoureuse en analyse économique, finance d'entreprise et management stratégique. Stages obligatoires en institutions nationales et internationales.",
      skills: ["Analyse Économique", "Économétrie", "Finance d'Entreprise", "Politique Monétaire", "Commerce International", "Développement Économique"],
      careers: ["Économiste", "Analyste Financier", "Chargé d'Études", "Consultant", "Cadre Bancaire", "Expert en Développement"],
      requirements: ["Baccalauréat ES, S ou G2", "Moyenne ≥ 12/20", "Test de mathématiques"],
      nextIntake: "Septembre 2025",
      accreditation: "CAMES",
      trending: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Dr. Marie Kongo-Mbemba",
      program: "Doctorat en Informatique",
      year: "2020",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5,
      text: "L'UMNG m'a offert une formation académique exceptionnelle et les opportunités de recherche qui m'ont permis de devenir enseignant-chercheur. La rigueur scientifique et l'accompagnement personnalisé font la différence.",
      position: "Maître de Conférences, MIT - Massachusetts Institute of Technology"
    },
    {
      id: 2,
      name: "Me Jean-Pierre Makala",
      program: "Master en Droit des Affaires",
      year: "2018",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      text: "La formation juridique d'excellence reçue à l'UMNG m'a préparé aux plus hauts standards professionnels. Aujourd'hui, je plaide devant les plus grandes juridictions et conseille des multinationales.",
      position: "Associé Senior, Cabinet Makala & Associés - Barreau de Brazzaville"
    },
    {
      id: 3,
      name: "Dr. Sophie Mbala-Ondongo",
      program: "Doctorat en Sciences Économiques",
      year: "2019",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      text: "Grâce à la qualité de l'enseignement et au réseau d'excellence de l'UMNG, j'occupe aujourd'hui des fonctions stratégiques au sein d'institutions internationales de premier plan.",
      position: "Économiste Senior, Banque Africaine de Développement (BAD)"
    }
  ];

  const rankings = [
    { rank: "#1", category: "Congo", description: "Première université nationale" },
    { rank: "Top 50", category: "Afrique", description: "Classement Times Higher Education" },
    { rank: "Top 500", category: "Monde", description: "QS World University Rankings" },
    { rank: "5★", category: "Accréditation", description: "Excellence académique certifiée" }
  ];

  const ProgramDetailModal = ({ program, onClose }) => {
    if (!program) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-none md:rounded-2xl shadow-2xl max-w-6xl w-full my-8">
          <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8 md:p-12">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-4">
                {program.accreditation}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{program.name}</h2>
              <p className="text-xl text-slate-300 mb-4">{program.category}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-medium">
                  {program.degree}
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-medium">
                  {program.duration}
                </span>
                {program.trending && (
                  <span className="px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-sm font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Programme d'excellence
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{program.duration}</div>
                <div className="text-sm text-slate-600">Durée du programme</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <GraduationCap className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{program.degree}</div>
                <div className="text-sm text-slate-600">Diplôme délivré</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900 mb-1">{program.employmentRate}%</div>
                <div className="text-sm text-slate-600">Taux d'insertion</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <DollarSign className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <div className="text-lg font-bold text-slate-900 mb-1">{program.avgSalary}</div>
                <div className="text-sm text-slate-600">Salaire moyen</div>
              </div>
            </div>

            <div className="prose max-w-none mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Présentation du Programme</h3>
              <p className="text-lg text-slate-700 leading-relaxed">{program.description}</p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Compétences Développées</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {program.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="font-medium text-slate-900">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Débouchés Professionnels</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {program.careers.map((career, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-slate-900">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12 p-8 bg-amber-50 border border-amber-200 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-amber-600" />
                Conditions d'Admission
              </h3>
              <div className="space-y-3">
                {program.requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <span className="text-slate-900 font-medium">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Globe className="w-6 h-6 text-indigo-600 mb-3" />
                <div className="text-sm text-slate-600 mb-1">Langue</div>
                <div className="font-bold text-slate-900">{program.language}</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Building className="w-6 h-6 text-indigo-600 mb-3" />
                <div className="text-sm text-slate-600 mb-1">Format</div>
                <div className="font-bold text-slate-900">{program.mode}</div>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <Calendar className="w-6 h-6 text-indigo-600 mb-3" />
                <div className="text-sm text-slate-600 mb-1">Prochaine rentrée</div>
                <div className="font-bold text-slate-900">{program.nextIntake}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-indigo-900 hover:bg-indigo-800 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" />
                Télécharger la brochure
              </button>
              <button 
                onClick={() => setShowContactModal(true)}
                className="flex-1 border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50 py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Demander des informations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Demande d'Information</h3>
                <p className="text-slate-600 mt-1">Nos conseillers vous répondront sous 24h</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nom *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Votre prénom"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="+242 06 xxx xx xx"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Programme d'intérêt *</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required>
                <option value="">Sélectionnez un programme</option>
                {programs.map(prog => (
                  <option key={prog.id} value={prog.id}>{prog.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Décrivez votre projet académique..."
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-4 rounded-lg font-bold text-lg transition-colors">
              Envoyer ma demande
            </button>

            <p className="text-sm text-slate-500 text-center">
              En soumettant ce formulaire, vous acceptez notre politique de confidentialité
            </p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              {university.contact.phone}
            </span>
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {university.contact.email}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-300 transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-300 transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02em0wIDJjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                <Building className="w-12 h-12 text-indigo-900" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">{university.name}</h1>
                <p className="text-slate-300 text-lg mt-1">{university.slogan}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-lg border transition-all ${
                  isFavorite 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: MapPin, label: university.city + ", " + university.country },
              { icon: Calendar, label: "Fondée en " + university.founded },
              { icon: Shield, label: university.type },
              { icon: Award, label: university.ranking }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {rankings.map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                <div className="text-4xl font-bold text-white mb-2">{item.rank}</div>
                <div className="text-sm font-semibold text-slate-300 mb-1">{item.category}</div>
                <div className="text-xs text-slate-400">{item.description}</div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl text-white space-y-6">
            <p className="text-xl leading-relaxed text-slate-200">{university.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowContactModal(true)}
                className="bg-white text-indigo-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                Demander une brochure
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: university.students.toLocaleString(), label: "Étudiants" },
              { icon: GraduationCap, value: university.teachers, label: "Enseignants-Chercheurs" },
              { icon: BookOpen, value: university.programs, label: "Programmes d'études" },
              { icon: TrendingUp, value: university.employmentRate + "%", label: "Taux d'insertion" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-indigo-900" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'about', label: 'Présentation' },
              { id: 'programs', label: 'Programmes' },
              { id: 'admission', label: 'Admission' },
              { id: 'research', label: 'Recherche' },
              { id: 'testimonials', label: 'Alumni' },
              { id: 'contact', label: 'Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-indigo-900 border-b-4 border-indigo-900'
                    : 'text-slate-600 hover:text-indigo-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {activeTab === 'about' && (
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Excellence Académique & Innovation</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-700 leading-relaxed mb-6">
                  Depuis sa création en {university.founded}, l'Université Marien Ngouabi s'impose comme le fleuron de l'enseignement supérieur en République du Congo et l'une des institutions académiques les plus prestigieuses d'Afrique centrale.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Notre mission est de former des cadres de haut niveau, des chercheurs et des leaders capables de relever les défis du développement national et continental. Nous cultivons l'excellence académique, la rigueur scientifique et l'innovation à travers des programmes d'enseignement de classe mondiale et des activités de recherche de pointe.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Excellence Académique",
                  description: "Des programmes accrédités CAMES et reconnus internationalement, dispensés par des enseignants-chercheurs de renommée."
                },
                {
                  icon: Globe,
                  title: "Rayonnement International",
                  description: "Partenariats stratégiques avec plus de 50 universités mondiales et programmes d'échanges académiques."
                },
                {
                  icon: Zap,
                  title: "Innovation & Recherche",
                  description: "Laboratoires de recherche de pointe et centres d'excellence dans divers domaines scientifiques."
                }
              ].map((feature, index) => (
                <div key={index} className="p-8 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-14 h-14 bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-700 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white p-12 rounded-xl">
              <h3 className="text-3xl font-bold mb-8">Accréditations & Reconnaissances</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {university.accreditations.map((acc, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{acc.name}</h4>
                      <p className="text-slate-300 text-sm mb-2">{acc.full}</p>
                      <span className="text-xs text-slate-400">Depuis {acc.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-3">Programmes d'Excellence</h2>
                <p className="text-xl text-slate-600">Formations accréditées aux standards internationaux</p>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un programme..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 border-2 border-slate-300 rounded-lg hover:border-slate-400 transition-colors flex items-center font-semibold">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtrer
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {programs.map(program => (
                <div key={program.id} className="group bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-indigo-900 hover:shadow-2xl transition-all">
                  <div className="relative bg-slate-900 p-8 text-white">
                    {program.trending && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Excellence
                      </div>
                    )}
                    <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{program.category}</div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-200 transition-colors">{program.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-300">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </span>
                      <span className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {program.degree}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-slate-700 leading-relaxed mb-6">{program.description}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-sm font-semibold text-slate-600">Taux d'insertion professionnelle</span>
                        <span className="text-lg font-bold text-emerald-600">{program.employmentRate}%</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <span className="text-sm font-semibold text-slate-600">Salaire moyen de sortie</span>
                        <span className="text-lg font-bold text-slate-900">{program.avgSalary}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">Accréditation</span>
                        <span className="text-sm font-bold text-indigo-900">{program.accreditation}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedProgram(program);
                        setShowProgramDetail(true);
                      }}
                      className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-4 rounded-lg font-bold transition-colors flex items-center justify-center group"
                    >
                      <span>Découvrir le programme</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admission' && (
          <div className="space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Processus d'Admission</h2>
              <p className="text-xl text-slate-600">Un processus transparent et équitable pour identifier les meilleurs talents</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Candidature",
                  description: "Soumission du dossier en ligne avec tous les documents requis",
                  icon: FileText
                },
                {
                  step: "02",
                  title: "Évaluation",
                  description: "Examen rigoureux du dossier académique par notre commission",
                  icon: Award
                },
                {
                  step: "03",
                  title: "Concours",
                  description: "Épreuves écrites et/ou orales selon le programme choisi",
                  icon: BookOpen
                },
                {
                  step: "04",
                  title: "Admission",
                  description: "Décision finale et processus d'inscription administrative",
                  icon: CheckCircle
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-slate-200 -ml-4"></div>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-slate-200 mb-4">{step.step}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-indigo-900" />
                  Calendrier Académique 2025-2026
                </h3>
                <div className="space-y-4">
                  {[
                    { date: "01 Août 2025", event: "Ouverture des candidatures en ligne" },
                    { date: "30 Septembre 2025", event: "Clôture des dépôts de dossiers" },
                    { date: "15 Octobre 2025", event: "Publication des admissibles" },
                    { date: "20-30 Octobre 2025", event: "Concours d'entrée (écrits et oraux)" },
                    { date: "15 Novembre 2025", event: "Publication des résultats définitifs" },
                    { date: "01-15 Décembre 2025", event: "Inscriptions administratives" },
                    { date: "06 Janvier 2026", event: "Rentrée académique officielle" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-900 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-bold text-indigo-900 mb-1">{item.date}</div>
                        <div className="text-slate-700">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-amber-600" />
                    Dossier de Candidature
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Diplôme du Baccalauréat (copie certifiée)",
                      "Relevés de notes (3 dernières années)",
                      "Acte de naissance (original)",
                      "Certificat de nationalité",
                      "Carte d'identité nationale",
                      "Certificat médical récent",
                      "4 photos d'identité récentes",
                      "Lettre de motivation manuscrite",
                      "Curriculum Vitae détaillé"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <span className="text-slate-900 font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-900 text-white p-8 rounded-xl">
                  <h4 className="text-xl font-bold mb-3">Besoin d'assistance ?</h4>
                  <p className="text-indigo-200 mb-6">Notre service des admissions est à votre disposition pour toute question.</p>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-white text-indigo-900 hover:bg-slate-100 py-3 rounded-lg font-bold transition-colors"
                  >
                    Contacter le service des admissions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Recherche & Innovation</h2>
              <p className="text-xl text-slate-600">Nos laboratoires de recherche contribuent activement au développement scientifique et technologique</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Laboratoire d'Intelligence Artificielle",
                  focus: "Machine Learning, Computer Vision, NLP",
                  projects: 12,
                  publications: 45
                },
                {
                  title: "Centre de Recherche en Santé Publique",
                  focus: "Épidémiologie, Maladies tropicales",
                  projects: 8,
                  publications: 32
                },
                {
                  title: "Institut d'Études Juridiques",
                  focus: "Droit OHADA, Contentieux",
                  projects: 15,
                  publications: 28
                }
              ].map((lab, index) => (
                <div key={index} className="bg-slate-50 border-2 border-slate-200 rounded-xl p-8 hover:border-indigo-900 transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{lab.title}</h3>
                  <p className="text-slate-600 mb-6">{lab.focus}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="text-2xl font-bold text-indigo-900">{lab.projects}</div>
                      <div className="text-slate-600">Projets actifs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-indigo-900">{lab.publications}</div>
                      <div className="text-slate-600">Publications</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Alumni d'Excellence</h2>
              <p className="text-xl text-slate-600">Des parcours inspirants de nos anciens étudiants</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-indigo-900 hover:shadow-2xl transition-all">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-slate-100"
                      />
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{testimonial.name}</h3>
                        <p className="text-sm text-slate-600">{testimonial.program}</p>
                        <p className="text-xs text-slate-500">Promotion {testimonial.year}</p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-slate-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-start space-x-2">
                        <Briefcase className="w-4 h-4 text-indigo-900 flex-shrink-0 mt-1" />
                        <p className="text-sm font-semibold text-indigo-900">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Contactez-nous</h2>
                <p className="text-xl text-slate-600">Nous sommes à votre disposition pour répondre à toutes vos questions</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <MapPin className="w-6 h-6 text-indigo-900 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900 mb-1">Adresse</div>
                    <div className="text-slate-700">{university.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <Phone className="w-6 h-6 text-indigo-900 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900 mb-1">Téléphone</div>
                    <div className="text-slate-700">{university.contact.phone}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <Mail className="w-6 h-6 text-indigo-900 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900 mb-1">Email</div>
                    <div className="text-slate-700">{university.contact.email}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <Globe className="w-6 h-6 text-indigo-900 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-slate-900 mb-1">Site web</div>
                    <div className="text-slate-700">{university.contact.website}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Formulaire de Contact</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nom *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Prénom *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Objet *</label>
                  <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent" required>
                    <option value="">Sélectionnez</option>
                    <option>Information sur les programmes</option>
                    <option>Processus d'admission</option>
                    <option>Partenariats</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-4 rounded-lg font-bold text-lg transition-colors">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProgramDetail && (
        <ProgramDetailModal 
          program={selectedProgram}
          onClose={() => {
            setShowProgramDetail(false);
            setSelectedProgram(null);
          }}
        />
      )}

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}

      {/* Footer */}
      {/* <footer className="bg-slate-900 text-white mt-20"> */}
    </div>
    )
    }