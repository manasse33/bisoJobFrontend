import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users, FileText, 
  Settings, Plus, Edit, Trash2, Eye, Download, Upload, Send, Filter,
  Search, MoreVertical, Award, Target, TrendingUp, BookOpen, ChevronRight,
  Mail, Phone, MapPin, Star, User, Building, GraduationCap, DollarSign,
  Clipboard, FileCheck, UserCheck, AlertTriangle, ArrowRight, Save, X
} from 'lucide-react';

export default function ProcessusAdmission() {
  const [activeView, setActiveView] = useState('timeline');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Phases du processus d'admission
  const admissionPhases = [
    {
      id: 1,
      name: 'Candidature en ligne',
      status: 'active',
      startDate: '01 Sept 2025',
      endDate: '30 Sept 2025',
      progress: 75,
      candidates: 234,
      description: 'Dépôt des dossiers de candidature en ligne',
      color: 'indigo',
      icon: FileText,
      tasks: [
        { name: 'Vérification des documents', completed: 180, total: 234 },
        { name: 'Validation des paiements', completed: 210, total: 234 },
        { name: 'Confirmation des dossiers', completed: 156, total: 234 }
      ]
    },
    {
      id: 2,
      name: 'Étude des dossiers',
      status: 'active',
      startDate: '01 Oct 2025',
      endDate: '15 Oct 2025',
      progress: 45,
      candidates: 189,
      description: 'Analyse et évaluation des candidatures',
      color: 'indigo',
      icon: FileCheck,
      tasks: [
        { name: 'Évaluation académique', completed: 85, total: 189 },
        { name: 'Vérification prérequis', completed: 95, total: 189 },
        { name: 'Calcul des scores', completed: 78, total: 189 }
      ]
    },
    {
      id: 3,
      name: 'Tests d\'admission',
      status: 'upcoming',
      startDate: '20 Oct 2025',
      endDate: '25 Oct 2025',
      progress: 0,
      candidates: 150,
      description: 'Épreuves écrites et tests de compétences',
      color: 'indigo',
      icon: Clipboard,
      tasks: [
        { name: 'Tests écrits', completed: 0, total: 150 },
        { name: 'Tests oraux', completed: 0, total: 150 },
        { name: 'Correction et notation', completed: 0, total: 150 }
      ]
    },
    {
      id: 4,
      name: 'Entretiens',
      status: 'upcoming',
      startDate: '28 Oct 2025',
      endDate: '05 Nov 2025',
      progress: 0,
      candidates: 120,
      description: 'Entretiens individuels avec le jury',
      color: 'indigo',
      icon: Users,
      tasks: [
        { name: 'Planification des entretiens', completed: 0, total: 120 },
        { name: 'Réalisation des entretiens', completed: 0, total: 120 },
        { name: 'Évaluation finale', completed: 0, total: 120 }
      ]
    },
    {
      id: 5,
      name: 'Délibération',
      status: 'upcoming',
      startDate: '08 Nov 2025',
      endDate: '12 Nov 2025',
      progress: 0,
      candidates: 120,
      description: 'Décisions finales du comité d\'admission',
      color: 'indigo',
      icon: UserCheck,
      tasks: [
        { name: 'Réunion du jury', completed: 0, total: 1 },
        { name: 'Validation des décisions', completed: 0, total: 120 },
        { name: 'Préparation des notifications', completed: 0, total: 120 }
      ]
    },
    {
      id: 6,
      name: 'Résultats & Inscriptions',
      status: 'upcoming',
      startDate: '15 Nov 2025',
      endDate: '30 Nov 2025',
      progress: 0,
      candidates: 0,
      description: 'Publication des résultats et inscriptions',
      color: 'indigo',
      icon: Award,
      tasks: [
        { name: 'Publication des résultats', completed: 0, total: 1 },
        { name: 'Envoi des notifications', completed: 0, total: 120 },
        { name: 'Inscriptions confirmées', completed: 0, total: 0 }
      ]
    }
  ];

  // Candidats en cours de traitement
  const candidatesInProcess = [
    {
      id: 'ADM-2025-001',
      name: 'Marie Kongo',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      program: 'Licence Informatique',
      currentPhase: 'Étude des dossiers',
      academicScore: 16.8,
      overallScore: 85,
      status: 'in-progress',
      dateSubmitted: '15 Sept 2025',
      documents: { total: 8, validated: 7 },
      contact: { email: 'marie.kongo@email.cg', phone: '+242 06 123 4567' },
      address: 'Brazzaville, Moungali',
      previousEducation: 'Bac Scientifique - Lycée Savorgnan de Brazza',
      motivationScore: 18,
      testDate: '20 Oct 2025'
    },
    {
      id: 'ADM-2025-002',
      name: 'Jean Makala',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      program: 'Master Droit des Affaires',
      currentPhase: 'Étude des dossiers',
      academicScore: 15.2,
      overallScore: 78,
      status: 'in-progress',
      dateSubmitted: '18 Sept 2025',
      documents: { total: 10, validated: 9 },
      contact: { email: 'jean.makala@email.cg', phone: '+242 06 234 5678' },
      address: 'Pointe-Noire, Loandjili',
      previousEducation: 'Licence Droit - Université Marien Ngouabi',
      motivationScore: 16,
      testDate: '20 Oct 2025'
    },
    {
      id: 'ADM-2025-003',
      name: 'Sophie Mbala',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      program: 'Licence Économie',
      currentPhase: 'Candidature en ligne',
      academicScore: 17.5,
      overallScore: 92,
      status: 'pending-review',
      dateSubmitted: '25 Sept 2025',
      documents: { total: 8, validated: 5 },
      contact: { email: 'sophie.mbala@email.cg', phone: '+242 06 345 6789' },
      address: 'Brazzaville, Bacongo',
      previousEducation: 'Bac Économique et Social - Lycée Thomas Sankara',
      motivationScore: 19,
      testDate: '20 Oct 2025'
    },
    {
      id: 'ADM-2025-004',
      name: 'David Nkounkou',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      program: 'Licence Architecture',
      currentPhase: 'Étude des dossiers',
      academicScore: 14.8,
      overallScore: 72,
      status: 'attention-required',
      dateSubmitted: '12 Sept 2025',
      documents: { total: 9, validated: 6 },
      contact: { email: 'david.nkounkou@email.cg', phone: '+242 06 456 7890' },
      address: 'Dolisie, Centre-ville',
      previousEducation: 'Bac Technique - Lycée Technique de Dolisie',
      motivationScore: 15,
      testDate: '20 Oct 2025'
    }
  ];

  // Statistiques globales
  const globalStats = {
    totalCandidates: 234,
    inProgress: 189,
    completed: 45,
    rejected: 12,
    averageProcessingTime: '5.2 jours',
    acceptanceRate: '68%'
  };

  const getPhaseColor = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-violet-500',
      orange: 'from-orange-500 to-amber-500',
      green: 'from-green-500 to-emerald-500',
      indigo: 'from-indigo-900 to-purple-900 ',
      emerald: 'from-emerald-500 to-teal-500'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const badges = {
      'in-progress': { text: 'En cours', class: 'bg-blue-100 text-blue-700' },
      'pending-review': { text: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
      'attention-required': { text: 'Attention requise', class: 'bg-red-100 text-red-700' },
      'completed': { text: 'Complété', class: 'bg-green-100 text-green-700' }
    };
    return badges[status] || badges['in-progress'];
  };

  const CandidateDetailModal = ({ candidate, onClose }) => {
    if (!candidate) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={candidate.photo} 
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full border-4 border-white/30"
                />
                <div>
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <p className="text-indigo-100">{candidate.id}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-900">{candidate.academicScore}</div>
                <div className="text-sm text-blue-700">Score académique</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-900">{candidate.overallScore}%</div>
                <div className="text-sm text-purple-700">Score global</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-900">{candidate.motivationScore}</div>
                <div className="text-sm text-green-700">Motivation</div>
              </div>
            </div>

            {/* Information Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Programme et Phase */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                    Programme demandé
                  </h3>
                  <p className="text-gray-800">{candidate.program}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-indigo-600" />
                    Phase actuelle
                  </h3>
                  <p className="text-gray-800">{candidate.currentPhase}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(candidate.status).class}`}>
                    {getStatusBadge(candidate.status).text}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                    Contact
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {candidate.contact.email}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {candidate.contact.phone}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {candidate.address}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                    Formation antérieure
                  </h3>
                  <p className="text-sm text-gray-700">{candidate.previousEducation}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Documents
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-indigo-600">
                    {candidate.documents.validated}/{candidate.documents.total}
                  </div>
                  <div className="text-sm text-gray-600">documents validés</div>
                </div>
                <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition-colors flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous
                </button>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${(candidate.documents.validated / candidate.documents.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                Chronologie
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Candidature soumise</p>
                    <p className="text-sm text-gray-600">{candidate.dateSubmitted}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">En cours d'évaluation</p>
                    <p className="text-sm text-gray-600">Phase actuelle</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Test prévu</p>
                    <p className="text-sm text-gray-600">{candidate.testDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Approuver
              </button>
              <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                <XCircle className="w-5 h-5 mr-2" />
                Rejeter
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="space-y-2 mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold">Processus d'Admission</h1>
            <p className="text-indigo-100 text-lg">Gestion complète du cycle d'admission 2025-2026</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </button>
            <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle phase
            </button>
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total candidats', value: globalStats.totalCandidates, icon: Users, color: 'blue' },
          { label: 'En cours', value: globalStats.inProgress, icon: Clock, color: 'yellow' },
          { label: 'Complétés', value: globalStats.completed, icon: CheckCircle, color: 'green' },
          { label: 'Rejetés', value: globalStats.rejected, icon: XCircle, color: 'red' },
          { label: 'Temps moyen', value: globalStats.averageProcessingTime, icon: TrendingUp, color: 'purple' },
          { label: 'Taux d\'acceptation', value: globalStats.acceptanceRate, icon: Target, color: 'indigo' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
        <button
          onClick={() => setActiveView('timeline')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeView === 'timeline'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Chronologie des phases
        </button>
        <button
          onClick={() => setActiveView('candidates')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeView === 'candidates'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Candidats en cours
        </button>
      </div>

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <div className="space-y-6">
          {admissionPhases.map((phase, index) => (
            <div key={phase.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Phase Header */}
              <div className={`bg-gradient-to-r ${getPhaseColor(phase.color)} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <phase.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{phase.name}</h3>
                      <p className="text-white/80">{phase.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      phase.status === 'active' ? 'bg-green-500/30 text-white border-2 border-green-200' :
                      phase.status === 'completed' ? 'bg-blue-500/30 text-white border-2 border-blue-200' :
                      'bg-gray-500/30 text-white/70 border-2 border-gray-200'
                    }`}>
                      {phase.status === 'active' ? 'En cours' : phase.status === 'completed' ? 'Terminée' : 'À venir'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progression</span>
                    <span className="text-sm font-bold">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white rounded-full h-3 transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Phase Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {/* Dates */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                      Période
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Début:</span>
                        <span className="font-semibold text-gray-900">{phase.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fin:</span>
                        <span className="font-semibold text-gray-900">{phase.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Candidates */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-indigo-600" />
                      Candidats
                    </h4>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">{phase.candidates}</div>
                      <div className="text-sm text-gray-600">dans cette phase</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-indigo-600" />
                      État général
                    </h4>
                    <div className="space-y-2">
                      {phase.status === 'active' ? (
                        <div className="flex items-center text-green-700">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Phase active</span>
                        </div>
                      ) : phase.status === 'completed' ? (
                        <div className="flex items-center text-blue-700">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Phase terminée</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-5 h-5 mr-2" />
                          <span className="font-medium">À venir</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Clipboard className="w-5 h-5 mr-2 text-indigo-600" />
                    Tâches à accomplir
                  </h4>
                  <div className="space-y-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{task.name}</span>
                          <span className="text-sm font-semibold text-indigo-600">
                            {task.completed}/{task.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(task.completed / task.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="flex-1 min-w-[200px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Voir les détails
                  </button>
                  <button className="flex-1 min-w-[200px] border-2 border-indigo-200 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center">
                    <Edit className="w-5 h-5 mr-2" />
                    Modifier la phase
                  </button>
                  <button className="flex-1 min-w-[200px] border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Notifier les candidats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidates View */}
      {activeView === 'candidates' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un candidat..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-3">
                <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Toutes les phases</option>
                  <option>Candidature en ligne</option>
                  <option>Étude des dossiers</option>
                  <option>Tests d'admission</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Tous les statuts</option>
                  <option>En cours</option>
                  <option>En attente</option>
                  <option>Attention requise</option>
                </select>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtrer
                </button>
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Candidat</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Programme</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Phase actuelle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Documents</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidatesInProcess.map((candidate) => {
                  const statusBadge = getStatusBadge(candidate.status);
                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={candidate.photo} 
                            alt={candidate.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{candidate.program}</p>
                        <p className="text-sm text-gray-500">Soumis le {candidate.dateSubmitted}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{candidate.currentPhase}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                            <span className="font-semibold text-gray-900">{candidate.academicScore}/20</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Global: {candidate.overallScore}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(candidate.documents.validated / candidate.documents.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {candidate.documents.validated}/{candidate.documents.total}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedCandidate(candidate);
                              setShowCandidateDetail(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approuver"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button 
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Contacter"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                          <button 
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Plus d'options"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de <span className="font-semibold">1-4</span> sur <span className="font-semibold">189</span> candidats
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <ArrowRight className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Notifications de masse</h3>
          <p className="text-blue-100">Envoyer des emails ou SMS à tous les candidats d'une phase</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <ArrowRight className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Planifier des tests</h3>
          <p className="text-purple-100">Organiser et planifier les sessions de tests d'admission</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <ArrowRight className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Exporter les données</h3>
          <p className="text-green-100">Télécharger les rapports et statistiques complètes</p>
        </div>
      </div>

      {/* Alerts and Reminders */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
          Alertes et rappels
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-red-900">Dossiers incomplets</p>
                <p className="text-sm text-red-700 mt-1">
                  23 candidats n'ont pas encore soumis tous leurs documents
                </p>
                <button className="text-sm text-red-600 font-medium mt-2 hover:underline">
                  Envoyer un rappel →
                </button>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-xl">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-orange-900">Deadline approchant</p>
                <p className="text-sm text-orange-700 mt-1">
                  Phase "Candidature en ligne" se termine dans 2 jours
                </p>
                <button className="text-sm text-orange-600 font-medium mt-2 hover:underline">
                  Voir les détails →
                </button>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-900">Tests à planifier</p>
                <p className="text-sm text-blue-700 mt-1">
                  150 candidats en attente de convocation pour les tests
                </p>
                <button className="text-sm text-blue-600 font-medium mt-2 hover:underline">
                  Planifier maintenant →
                </button>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-xl">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-green-900">Objectif atteint</p>
                <p className="text-sm text-green-700 mt-1">
                  75% des dossiers de la phase 1 ont été traités
                </p>
                <button className="text-sm text-green-600 font-medium mt-2 hover:underline">
                  Voir le rapport →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {showCandidateDetail && (
        <CandidateDetailModal 
          candidate={selectedCandidate}
          onClose={() => {
            setShowCandidateDetail(false);
            setSelectedCandidate(null);
          }}
        />
      )}
    </div>
  );
}