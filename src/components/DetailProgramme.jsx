import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Share2, Clock, GraduationCap, DollarSign, Globe, 
  CheckCircle, X, FileText, Send, Star, Briefcase, Download, 
  Building, Calendar, MapPin, Phone, Mail, Award, TrendingUp, Target,
  Book, Users, BarChart3, Lightbulb, Zap, Users2
} from 'lucide-react';

export default function ProgramDetailPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);

  const program = {
    id: 1,
    name: "Sciences Informatiques & Intelligence Artificielle",
    shortName: "Informatique & IA",
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
    longDescription: "Ce programme d'excellence est conçu pour former des ingénieurs informatiques de haut niveau capables de concevoir, développer et déployer des solutions technologiques innovantes. Grâce à une pédagogie combinant enseignement théorique rigoureux et projets pratiques, nos étudiants acquièrent les compétences essentielles demandées par l'industrie mondiale.",
    accreditation: "CAMES - Programme accrédité",
    trending: true,
    rating: 4.8,
    reviews: 156,
    
    keyStats: [
      { icon: Users, value: "450", label: "Étudiants actuels" },
      { icon: GraduationCap, value: "28", label: "Enseignants-chercheurs" },
      { icon: TrendingUp, value: "95%", label: "Taux d'insertion" },
      { icon: DollarSign, value: "450-800K", label: "Salaire moyen" }
    ],

    highlights: [
      { icon: Zap, title: "Technologie de Pointe", description: "Accès aux derniers outils et frameworks" },
      { icon: Globe, title: "Rayonnement International", description: "Partenariats avec IBM, Microsoft, Orange" },
      { icon: Lightbulb, title: "Innovation", description: "Projets réels en collaboration avec l'industrie" },
      { icon: Users2, title: "Mentorat Personnalisé", description: "Suivi individuel par les enseignants-chercheurs" }
    ],

    skills: [
      { category: "Programmation", items: ["Python", "C++", "Java", "JavaScript", "SQL"] },
      { category: "Frameworks & Outils", items: ["TensorFlow", "React", "Django", "Spring Boot", "Docker"] },
      { category: "Concepts Avancés", items: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Cloud Architecture"] },
      { category: "Soft Skills", items: ["Leadership", "Communication", "Gestion de Projet", "Travail en équipe", "Entrepreneuriat"] }
    ],

    careers: [
      { title: "Ingénieur Logiciel", salary: "450 000 - 650 000 FCFA", demand: "Très forte", companies: "Google, Microsoft, Orange, Airtel" },
      { title: "Data Scientist", salary: "550 000 - 850 000 FCFA", demand: "Forte", companies: "Banques, Assurances, Tech" },
      { title: "Expert Cybersécurité", salary: "600 000 - 1 000 000 FCFA", demand: "Très forte", companies: "Institutions financières" },
      { title: "Architecte Cloud", salary: "700 000 - 1 200 000 FCFA", demand: "Forte", companies: "Grandes entreprises" },
      { title: "Chef de Projet IT", salary: "500 000 - 900 000 FCFA", demand: "Forte", companies: "SSII, Consultances" },
      { title: "Entrepreneur/Startup", salary: "Variable", demand: "En croissance", companies: "Écosystème startup" }
    ],

    requirements: [
      { category: "Académique", items: ["Baccalauréat série C ou D", "Moyenne générale ≥ 14/20", "Solides connaissances en mathématiques"] },
      { category: "Concours", items: ["Épreuve écrite (Mathématiques, Logique)", "Épreuve informatique pratique", "Entretien individuel"] },
      { category: "Compétences", items: ["Logique analytique", "Esprit créatif", "Capacité d'apprentissage rapide", "Autonomie et rigueur"] }
    ],

    curriculum: [
      { year: "1ère Année", courses: [
        { name: "Algorithmique Avancée", hours: 60, credits: 6, type: "Fondamental" },
        { name: "Mathématiques pour l'Informatique", hours: 90, credits: 9, type: "Fondamental" },
        { name: "Programmation Python", hours: 75, credits: 7, type: "Pratique" },
        { name: "Architecture des Ordinateurs", hours: 60, credits: 6, type: "Fondamental" }
      ]},
      { year: "2ème Année", courses: [
        { name: "Programmation Orientée Objet", hours: 75, credits: 7, type: "Fondamental" },
        { name: "Bases de Données", hours: 90, credits: 9, type: "Fondamental" },
        { name: "Réseaux Informatiques", hours: 60, credits: 6, type: "Fondamental" },
        { name: "Développement Web", hours: 75, credits: 7, type: "Pratique" }
      ]},
      { year: "3ème Année", courses: [
        { name: "Intelligence Artificielle", hours: 90, credits: 9, type: "Spécialisé" },
        { name: "Machine Learning", hours: 90, credits: 9, type: "Spécialisé" },
        { name: "Cybersécurité", hours: 60, credits: 6, type: "Spécialisé" },
        { name: "Projet de Fin d'Études", hours: 150, credits: 15, type: "Projet" }
      ]}
    ],

    testimonials: [
      {
        name: "Alain Nsiona",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        year: 2019,
        company: "Ingénieur Senior chez Google",
        text: "La formation reçue m'a permis d'acquérir les fondamentaux solides pour évoluer en Silicon Valley."
      },
      {
        name: "Célia Mambongo",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        year: 2020,
        company: "Data Scientist à la Banque Africaine",
        text: "L'approche pédagogique m'a donné une avance considérable dans le secteur."
      },
      {
        name: "Marc Kimpongo",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        year: 2021,
        company: "Fondateur de TechCongo",
        text: "Les mentors et ressources de l'université ont été précieux pour créer ma startup."
      }
    ],

    facilities: [
      { name: "Laboratoires de Programmation", description: "50 postes de travail équipés", rooms: 4 },
      { name: "Centres de Serveurs", description: "Infrastructure complète pour réseaux et cloud", rooms: 2 },
      { name: "Salle de Réalité Virtuelle", description: "Équipements VR/AR", rooms: 1 },
      { name: "Amphithéâtres Modernes", description: "Salles haute performance", rooms: 6 }
    ]
  };

  const ContactModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
          <div className="p-8 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Demande d'Admission</h3>
                <p className="text-slate-600 mt-1">{program.name}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nom *</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Prénom *</label>
                <input type="text" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
              <input type="email" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone *</label>
              <input type="tel" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea rows="4" className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900" placeholder="Décrivez votre parcours..."></textarea>
            </div>

            <button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-4 rounded-lg font-bold transition-colors">
              Envoyer ma candidature
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="flex items-center space-x-2 text-indigo-900 hover:text-indigo-800 font-semibold">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux programmes</span>
          </button>
          <div className="flex items-center space-x-3">
            <button className="p-3 hover:bg-slate-100 rounded-lg transition-colors">
              <Heart className="w-6 h-6 text-slate-600" />
            </button>
            <button className="p-3 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 h-96 flex items-end relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto w-full px-4 pb-12">
          <div className="flex items-end justify-between">
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-bold mb-4">
                {program.accreditation}
              </div>
              <h1 className="text-5xl font-bold mb-2">{program.name}</h1>
              <p className="text-xl text-slate-200">{program.category}</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right text-white">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-300 fill-current' : ''}`} />
                  ))}
                </div>
                <div className="text-sm">{program.rating}/5 ({program.reviews} avis)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {program.keyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-indigo-900" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble' },
              { id: 'curriculum', label: 'Curriculum' },
              { id: 'careers', label: 'Carrières' },
              { id: 'admission', label: 'Admission' },
              { id: 'testimonials', label: 'Témoignages' },
              { id: 'facilities', label: 'Infrastructure' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                  activeSection === tab.id
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeSection === 'overview' && (
          <div className="space-y-12">
            <p className="text-xl text-slate-700 leading-relaxed">{program.longDescription}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {program.highlights.map((h, i) => (
                <div key={i} className="p-6 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-900">
                  <div className="w-12 h-12 bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                    <h.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{h.title}</h3>
                  <p className="text-slate-600 text-sm">{h.description}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <Clock className="w-7 h-7 text-blue-900 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Durée</h3>
                <p className="text-slate-700 font-semibold">{program.duration}</p>
              </div>
              <div className="p-8 bg-purple-50 border-2 border-purple-200 rounded-xl">
                <Globe className="w-7 h-7 text-purple-900 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Langue</h3>
                <p className="text-slate-700 font-semibold">{program.language}</p>
              </div>
              <div className="p-8 bg-green-50 border-2 border-green-200 rounded-xl">
                <DollarSign className="w-7 h-7 text-green-900 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Frais</h3>
                <p className="text-slate-700 font-semibold">{program.tuition}</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'curriculum' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Programme d'Études</h2>
            {program.curriculum.map((year, i) => (
              <div key={i} className="border-2 border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-6 py-4 font-bold text-slate-900 text-lg">{year.year}</div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold">Cours</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Type</th>
                        <th className="px-6 py-3 text-center text-sm font-bold">Heures</th>
                        <th className="px-6 py-3 text-center text-sm font-bold">Crédits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {year.courses.map((c, ci) => (
                        <tr key={ci} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium">{c.name}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              c.type === 'Fondamental' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {c.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">{c.hours}h</td>
                          <td className="px-6 py-4 text-center font-bold text-indigo-900">{c.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'careers' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Débouchés Professionnels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.careers.map((c, i) => (
                <div key={i} className="p-8 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-900">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-600">Salaire</div>
                      <div className="text-lg font-bold text-indigo-900">{c.salary}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Demande</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        c.demand === 'Très forte' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.demand}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Entreprises</div>
                      <p className="text-sm text-slate-700">{c.companies}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'admission' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">Processus d'Admission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {program.requirements.map((r, i) => (
                  <div key={i} className={`p-6 border-2 rounded-xl ${
                    r.category === 'Académique' ? 'border-blue-200 bg-blue-50' : 'border-amber-200 bg-amber-50'
                  }`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{r.category}</h3>
                    <ul className="space-y-3">
                      {r.items.map((item, ii) => (
                        <li key={ii} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-900 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Calendrier</h3>
                <div className="space-y-4">
                  {[
                    { date: "01 Août", event: "Ouverture candidatures" },
                    { date: "30 Sept", event: "Clôture dossiers" },
                    { date: "15 Oct", event: "Publication admissibles" },
                    { date: "20-30 Oct", event: "Concours" },
                    { date: "15 Nov", event: "Résultats" },
                    { date: "06 Jan 2026", event: "Rentrée" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 p-3 bg-white rounded-lg">
                      <div className="w-2 h-2 bg-indigo-900 rounded-full mt-2"></div>
                      <div>
                        <div className="font-bold text-indigo-900">{item.date}</div>
                        <div className="text-sm text-slate-700">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowContactModal(true)} className="w-full mt-6 bg-indigo-900 hover:bg-indigo-800 text-white py-4 rounded-lg font-bold">
                  Postuler maintenant
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'testimonials' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">Témoignages d'Étudiants</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {program.testimonials.map((t, i) => (
                <div key={i} className="p-8 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-900 hover:shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={t.photo} 
                      alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900">{t.name}</h3>
                      <p className="text-sm text-slate-600">Promotion {t.year}</p>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.text}"</p>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-start space-x-2">
                      <Briefcase className="w-5 h-5 text-indigo-900 flex-shrink-0 mt-1" />
                      <p className="font-semibold text-indigo-900 text-sm">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'facilities' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-slate-900">Infrastructure & Ressources</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {program.facilities.map((f, i) => (
                <div key={i} className="p-8 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-900">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{f.name}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full text-sm font-bold">
                      {f.rooms} salle{f.rooms > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Équipements Technologiques</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Serveurs Haute Performance", items: "CPU: Intel Xeon | RAM: 256GB | Storage: 50TB" },
                  { title: "Logiciels Professionnels", items: "JetBrains Suite | Visual Studio | Adobe Creative Cloud | Matlab" },
                  { title: "Environnements Cloud", items: "AWS | Google Cloud | Microsoft Azure | Accès gratuit aux étudiants" }
                ].map((eq, i) => (
                  <div key={i} className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                    <h4 className="font-bold mb-3">{eq.title}</h4>
                    <p className="text-sm text-slate-200">{eq.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Compétences Acquises</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {program.skills.map((sg, i) => (
              <div key={i} className="p-6 bg-white border-2 border-slate-200 rounded-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{sg.category}</h3>
                <ul className="space-y-3">
                  {sg.items.map((item, ii) => (
                    <li key={ii} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-indigo-900" />
                      <span className="text-slate-700 font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partenariats */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Partenariats Stratégiques</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "IBM", logo: "🔵", desc: "Formations et stages" },
              { name: "Microsoft", logo: "⬛", desc: "Azure et certifications" },
              { name: "Google", logo: "🔴", desc: "Cloud Skills Boost" },
              { name: "Orange", logo: "🟠", desc: "Projets réels" }
            ].map((p, i) => (
              <div key={i} className="p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-900 text-center">
                <div className="text-5xl mb-4">{p.logo}</div>
                <h3 className="font-bold text-slate-900 mb-2">{p.name}</h3>
                <p className="text-sm text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Prêt à rejoindre notre programme ?</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Commencez votre parcours vers une carrière technologique exceptionnelle
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowContactModal(true)}
              className="bg-white text-indigo-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Postuler maintenant
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" />
              Télécharger la brochure
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Université Marien Ngouabi</h4>
              <p className="text-slate-300 text-sm">Excellence académique depuis 1971</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white">Accueil</a></li>
                <li><a href="#" className="hover:text-white">Programmes</a></li>
                <li><a href="#" className="hover:text-white">Admission</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +242 05 532 09 53
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  rectorat@umng.cg
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Adresse</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                  <span>BP 69, Brazzaville, Congo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>© 2025 Université Marien Ngouabi. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}