import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, BookOpen, DollarSign, Calendar, Download,
  Filter, ChevronDown, ArrowUp, ArrowDown, Target, Award, Clock, Globe,
  FileText, PieChart, Activity, Zap, RefreshCw, Eye, Share2, Printer
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, 
         AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
         ResponsiveContainer } from 'recharts';

// Composant Header de statistiques
export function StatisticsHeader() {
  const [timeRange, setTimeRange] = useState('year');
  const [selectedYear, setSelectedYear] = useState('2025');

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center">
            <BarChart3 className="w-8 h-8 mr-3" />
            Statistiques & Rapports
          </h1>
          <p className="text-indigo-200 text-lg">Analyses détaillées et indicateurs de performance</p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-white/50"
          >
            <option value="2025">Année 2025</option>
            <option value="2024">Année 2024</option>
            <option value="2023">Année 2023</option>
          </select>

          <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            {['month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-3 font-semibold transition-colors ${
                  timeRange === range 
                    ? 'bg-white text-indigo-900' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {range === 'month' ? 'Mois' : range === 'quarter' ? 'Trimestre' : 'Année'}
              </button>
            ))}
          </div>

          <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Exporter
          </button>

          <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Rapport complet
          </button>
        </div>
      </div>
    </div>
  );
}

// KPI Cards
export function KPICards() {
  const kpis = [
    {
      label: 'Candidatures totales',
      value: '1,247',
      change: '+18%',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'vs année précédente'
    },
    {
      label: 'Taux d\'acceptation',
      value: '68%',
      change: '-3%',
      trend: 'down',
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      description: 'Moyenne universitaire'
    },
    {
      label: 'Étudiants actifs',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      description: 'Tous programmes confondus'
    },
    {
      label: 'Revenus générés',
      value: '1.8M FCFA',
      change: '+8%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      description: 'Année académique'
    },
    {
      label: 'Taux de rétention',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      description: 'Étudiants poursuivant'
    },
    {
      label: 'Satisfaction moyenne',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up',
      icon: <Award className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      description: 'Enquêtes étudiants'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <div className={`bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}>
                  {kpi.icon}
                </div>
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                kpi.trend === 'up' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            
            <div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{kpi.value}</p>
              <p className="text-gray-600 font-medium">{kpi.label}</p>
              <p className="text-sm text-gray-500 mt-2">{kpi.description}</p>
            </div>
          </div>
          <div className={`h-1 bg-gradient-to-r ${kpi.color}`}></div>
        </div>
      ))}
    </div>
  );
}

// Graphique des candidatures
export function ApplicationsChart() {
  const data = [
    { month: 'Jan', candidatures: 85, acceptees: 58, rejetees: 27 },
    { month: 'Fev', candidatures: 92, acceptees: 63, rejetees: 29 },
    { month: 'Mar', candidatures: 118, acceptees: 81, rejetees: 37 },
    { month: 'Avr', candidatures: 145, acceptees: 99, rejetees: 46 },
    { month: 'Mai', candidatures: 167, acceptees: 114, rejetees: 53 },
    { month: 'Juin', candidatures: 198, acceptees: 135, rejetees: 63 },
    { month: 'Juil', candidatures: 156, acceptees: 106, rejetees: 50 },
    { month: 'Août', candidatures: 134, acceptees: 91, rejetees: 43 },
    { month: 'Sept', candidatures: 152, acceptees: 103, rejetees: 49 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Évolution des candidatures</h2>
          <p className="text-gray-600 mt-1">Suivi mensuel des admissions</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCandidatures" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAcceptees" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRejetees" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="candidatures" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCandidatures)" 
            name="Candidatures"
          />
          <Area 
            type="monotone" 
            dataKey="acceptees" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAcceptees)" 
            name="Acceptées"
          />
          <Area 
            type="monotone" 
            dataKey="rejetees" 
            stroke="#ef4444" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRejetees)" 
            name="Rejetées"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Répartition par programme
export function ProgramDistribution() {
  const data = [
    { name: 'Informatique', value: 687, color: '#3b82f6' },
    { name: 'Droit', value: 542, color: '#8b5cf6' },
    { name: 'Économie', value: 623, color: '#10b981' },
    { name: 'Médecine', value: 498, color: '#ef4444' },
    { name: 'Architecture', value: 287, color: '#f59e0b' },
    { name: 'Sciences', value: 210, color: '#6366f1' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Répartition par programme</h2>
        <p className="text-gray-600 mt-1">{total} étudiants au total</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 space-y-3 mt-6 lg:mt-0">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Performance par département
export function DepartmentPerformance() {
  const data = [
    { 
      department: 'Informatique', 
      satisfaction: 4.8, 
      retention: 94, 
      employment: 89,
      color: '#3b82f6'
    },
    { 
      department: 'Droit', 
      satisfaction: 4.6, 
      retention: 91, 
      employment: 85,
      color: '#8b5cf6'
    },
    { 
      department: 'Économie', 
      satisfaction: 4.5, 
      retention: 89, 
      employment: 82,
      color: '#10b981'
    },
    { 
      department: 'Médecine', 
      satisfaction: 4.9, 
      retention: 96, 
      employment: 95,
      color: '#ef4444'
    },
    { 
      department: 'Architecture', 
      satisfaction: 4.7, 
      retention: 92, 
      employment: 87,
      color: '#f59e0b'
    },
    { 
      department: 'Sciences', 
      satisfaction: 4.4, 
      retention: 87, 
      employment: 79,
      color: '#6366f1'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Performance par département</h2>
        <p className="text-gray-600 mt-1">Indicateurs clés de succès</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="department" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px'
            }}
          />
          <Legend />
          <Bar dataKey="satisfaction" fill="#3b82f6" name="Satisfaction (sur 5)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="retention" fill="#10b981" name="Rétention (%)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="employment" fill="#f59e0b" name="Emploi post-diplôme (%)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Revenus et finances
export function RevenueChart() {
  const data = [
    { month: 'Jan', revenus: 145000, depenses: 98000 },
    { month: 'Fev', revenus: 152000, depenses: 102000 },
    { month: 'Mar', revenus: 168000, depenses: 115000 },
    { month: 'Avr', revenus: 189000, depenses: 128000 },
    { month: 'Mai', revenus: 234000, depenses: 156000 },
    { month: 'Juin', revenus: 267000, depenses: 178000 },
    { month: 'Juil', revenus: 198000, depenses: 134000 },
    { month: 'Août', revenus: 176000, depenses: 119000 },
    { month: 'Sept', revenus: 212000, depenses: 143000 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Revenus & Dépenses</h2>
          <p className="text-gray-600 mt-1">Analyse financière mensuelle (FCFA)</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Profit net</p>
          <p className="text-2xl font-bold text-green-600">+542K FCFA</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px'
            }}
            formatter={(value) => `${value.toLocaleString()} FCFA`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenus" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Revenus"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="depenses" 
            stroke="#ef4444" 
            strokeWidth={3}
            name="Dépenses"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Quick Stats
export function QuickStats() {
  const stats = [
    {
      label: 'Taux de conversion',
      value: '68%',
      description: 'Candidatures → Inscriptions',
      icon: <Target className="w-5 h-5" />,
      color: 'blue'
    },
    {
      label: 'Délai moyen traitement',
      value: '5.2 jours',
      description: 'Réponse aux candidatures',
      icon: <Clock className="w-5 h-5" />,
      color: 'purple'
    },
    {
      label: 'Origine internationale',
      value: '12%',
      description: 'Étudiants étrangers',
      icon: <Globe className="w-5 h-5" />,
      color: 'green'
    },
    {
      label: 'Taux de diplomation',
      value: '87%',
      description: 'Dans les délais normaux',
      icon: <Award className="w-5 h-5" />,
      color: 'orange'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center mb-4`}>
            {stat.icon}
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
          <p className="text-gray-600 font-medium mb-1">{stat.label}</p>
          <p className="text-sm text-gray-500">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}

// Top Performers
export function TopPerformers() {
  const topPrograms = [
    { name: 'Licence Informatique', score: 94, trend: 'up', applications: 234 },
    { name: 'Master Droit des Affaires', score: 91, trend: 'up', applications: 189 },
    { name: 'Licence Médecine', score: 89, trend: 'stable', applications: 456 },
    { name: 'Master Économie', score: 87, trend: 'up', applications: 187 },
    { name: 'Licence Architecture', score: 85, trend: 'down', applications: 123 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top 5 programmes</h2>
        <p className="text-gray-600 mt-1">Classement par performance globale</p>
      </div>

      <div className="space-y-4">
        {topPrograms.map((program, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                index === 0 ? 'bg-yellow-100 text-yellow-700' :
                index === 1 ? 'bg-gray-200 text-gray-700' :
                index === 2 ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{program.name}</p>
                <p className="text-sm text-gray-600">{program.applications} candidatures</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{program.score}</p>
                <p className="text-xs text-gray-500">Score</p>
              </div>
              <div>
                {program.trend === 'up' && <TrendingUp className="w-6 h-6 text-green-500" />}
                {program.trend === 'down' && <TrendingUp className="w-6 h-6 text-red-500 rotate-180" />}
                {program.trend === 'stable' && <Activity className="w-6 h-6 text-gray-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Composant principal
export default function StatisticsSection() {
  return (
    <div className="space-y-6">
      <StatisticsHeader />
      
      <KPICards />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <ApplicationsChart />
        <ProgramDistribution />
      </div>

      <DepartmentPerformance />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <TopPerformers />
      </div>

      <QuickStats />

      {/* Actions rapides */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <Printer className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Imprimer le rapport</h3>
          <p className="text-gray-600 mb-4">Générez un PDF professionnel</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <Share2 className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Partager les données</h3>
          <p className="text-gray-600 mb-4">Envoyez le rapport par email</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <Calendar className="w-12 h-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Rapport planifié</h3>
          <p className="text-gray-600 mb-4">Automatisez l'envoi mensuel</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Configurer
          </button>
        </div>
      </div>
    </div>
  );
}