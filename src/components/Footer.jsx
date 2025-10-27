// src/components/Footer.jsx
import React from 'react';
import { Briefcase, Heart } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Briefcase className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-2xl font-bold">BisoJob</span>
            </div>
            <p className="text-gray-400">Le talent congolais à portée de main</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-green-500">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('search')} className="hover:text-green-500">
                  Trouver un talent
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('auth')} className="hover:text-green-500">
                  S'inscrire
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Pour les Freelances</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => setCurrentPage('dashboard')} className="hover:text-green-500">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('payment')} className="hover:text-green-500">
                  Mise en avant
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-green-500">
                  Nous contacter
                </button>
              </li>
              <li>Pointe-Noire, Congo</li>
              <li>+242 066 000 000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 BisoJob. Tous droits réservés. Fait avec{' '}
            <Heart className="inline h-4 w-4 text-red-500" /> au Congo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;