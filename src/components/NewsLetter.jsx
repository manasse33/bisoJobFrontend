import React, { useState } from 'react';
import { Search, BookOpen, Users, TrendingUp, Star, ChevronRight, Play, Award, MapPin, Calendar, ArrowRight, Sparkles, Target, Globe, MessageSquare } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg%3E%3Cg" fill="none" fill-rule="evenodd%3E%3Cg" fill-opacity="0.05%3E%3Ccircle" cx="30" cy="30" r="2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Reste informé des dernières opportunités
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Reçois les nouvelles formations, les dates d'inscription et nos conseils d'orientation personnalisés
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton-email@exemple.com"
                className="flex-1 bg-transparent text-white placeholder-white/60 px-6 py-4 outline-none text-lg"
              />
              <button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center"
                disabled={subscribed}
              >
                {subscribed ? (
                  <>
                    <Award className="w-5 h-5 mr-2" />
                    Inscrit !
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 mr-2" />
                    S'inscrire
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Calendrier des inscriptions</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Nouvelles filières</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Conseils personnalisés</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
