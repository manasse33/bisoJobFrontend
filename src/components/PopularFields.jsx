// import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, TrendingUp, Star, ChevronRight, Play, Award, MapPin, Calendar, ArrowRight, Sparkles, Target, Globe, MessageSquare } from 'lucide-react';

export function PopularFields() {
  const fields = [
    {
      name: "Informatique & IA",
      description: "Développement, cybersécurité, intelligence artificielle",
      university: "Institut Polytechnique",
      students: "2,400+",
      growth: "+25%",
      color: "from-blue-500 to-cyan-600",
      icon: "💻"
    },
    {
      name: "Médecine & Santé",
      description: "Médecine générale, pharmacie, sciences infirmières",
      university: "Faculté des Sciences de la Santé",
      students: "1,800+",
      growth: "+15%",
      color: "from-emerald-500 to-teal-600",
      icon: "🏥"
    },
    {
      name: "Droit & Justice",
      description: "Droit privé, public, international et des affaires",
      university: "Université Marien-Ngouabi",
      students: "3,200+",
      growth: "+12%",
      color: "from-purple-500 to-indigo-600",
      icon: "⚖️"
    },
    {
      name: "Architecture & BTP",
      description: "Architecture durable, génie civil, urbanisme",
      university: "École d'Architecture",
      students: "900+",
      growth: "+30%",
      color: "from-orange-500 to-red-600",
      icon: "🏗️"
    },
    {
      name: "Économie & Gestion",
      description: "Management, finance, économie du développement",
      university: "École de Commerce",
      students: "2,100+",
      growth: "+18%",
      color: "from-green-500 to-emerald-600",
      icon: "💼"
    },
    {
      name: "Sciences & Recherche",
      description: "Physique, chimie, mathématiques appliquées",
      university: "Faculté des Sciences",
      students: "1,500+",
      growth: "+20%",
      color: "from-violet-500 to-purple-600",
      icon: "🔬"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Filières d'excellence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvre les formations les plus demandées et porteuses d'avenir au Congo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map((field, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${field.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{field.icon}</div>
                  <div className="flex items-center space-x-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span>{field.growth}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">{field.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{field.description}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{field.university}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{field.students} étudiants</span>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold group-hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center">
                  Découvrir le programme
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
