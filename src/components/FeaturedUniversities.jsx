// import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, TrendingUp, Star, ChevronRight, Play, Award, MapPin, Calendar, ArrowRight, Sparkles, Target, Globe, MessageSquare } from 'lucide-react';

export function FeaturedUniversities() {
  const universities = [
    {
      name: "Université Marien-Ngouabi",
      city: "Brazzaville",
      description: "Université publique de référence avec excellence académique reconnue",
      rating: 4.8,
      programs: 45,
      students: "8,500+",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=500&h=300&fit=crop",
      badges: ["Public", "Accrédité"]
    },
    {
      name: "Institut National Polytechnique",
      city: "Brazzaville", 
      description: "Formations d'excellence en informatique, télécoms et innovation technologique",
      rating: 4.9,
      programs: 12,
      students: "2,400+",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop",
      badges: ["Technique", "Innovation"]
    },
    {
      name: "École d'Architecture de Brazzaville",
      city: "Brazzaville",
      description: "Formation d'architectes créatifs pour un développement urbain durable",
      rating: 4.7,
      programs: 8,
      students: "900+",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=300&fit=crop",
      badges: ["Spécialisé", "Durable"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">Universités partenaires</h2>
            <p className="text-gray-600">Les meilleures institutions du Congo</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2 group">
            <span>Voir toutes</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {universities.map((uni, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={uni.image} 
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 flex space-x-2">
                  {uni.badges.map((badge, i) => (
                    <span key={i} className="px-3 py-1 bg-white/90 text-sm font-medium text-gray-700 rounded-full backdrop-blur-sm">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900">{uni.rating}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{uni.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {uni.city}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed">{uni.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>{uni.programs} programmes</span>
                  <span>{uni.students} étudiants</span>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Voir profil
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                    Admissions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
