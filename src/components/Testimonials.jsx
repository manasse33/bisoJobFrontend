// import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, TrendingUp, Star, ChevronRight, Play, Award, MapPin, Calendar, ArrowRight, Sparkles, Target, Globe, MessageSquare } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Prisca Mabiala",
      field: "Licence Informatique - 2024",
      text: "Grâce au test d'orientation, j'ai découvert ma passion pour le développement web. Aujourd'hui, je travaille déjà sur des projets freelance !",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      university: "Institut Polytechnique",
      achievement: "Stage chez Orange Congo"
    },
    {
      name: "André Kimbembe", 
      field: "Master Droit des Affaires - 2023",
      text: "La plateforme m'a aidé à comparer les programmes et comprendre les débouchés. J'ai trouvé exactement ce qui me convenait.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      university: "Université Marien-Ngouabi",
      achievement: "Avocat junior"
    },
    {
      name: "Sylvie Tchicaya",
      field: "Licence Architecture - 2024",
      text: "J'ai pu explorer toutes les écoles d'architecture et leurs spécialisations. Le processus d'admission était clair et bien expliqué.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      university: "École d'Architecture",
      achievement: "Projet primé"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ils ont trouvé leur voie grâce à notre accompagnement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 font-medium">{testimonial.field}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {testimonial.university}
                  </p>
                  <p className="text-sm text-emerald-600 flex items-center font-medium">
                    <Award className="w-4 h-4 mr-2" />
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
