// src/pages/ContactPage.jsx
import React from 'react';
import { MessageCircle, Phone, Heart } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                required 
              />
              <input 
                type="tel" 
                placeholder="Téléphone" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                required 
              />
              <textarea 
                placeholder="Votre message" 
                rows="5" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
                required
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Contactez-nous directement</h2>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/242066000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <MessageCircle className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm">+242 066 000 000</p>
                  </div>
                </a>
                <a 
                  href="tel:+242066000000" 
                  className="flex items-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-sm">+242 066 000 000</p>
                  </div>
                </a>
                <a 
                  href="mailto:contact@bisojob.cg" 
                  className="flex items-center p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                  <Heart className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm">contact@bisojob.cg</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-green-600 rounded-xl shadow-md p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Horaires d'ouverture</h3>
              <p className="mb-2">Lundi - Vendredi: 8h - 18h</p>
              <p className="mb-2">Samedi: 9h - 14h</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;