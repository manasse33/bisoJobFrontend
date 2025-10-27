// src/pages/PaymentPage.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Mise en avant de profil</h1>
          
          <div className="space-y-6">
            <div className="border-2 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Pack Vedette</h3>
                <span className="text-3xl font-bold text-green-600">5000 FCFA</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> 
                  Profil en tête pendant 30 jours
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> 
                  Badge "Vedette" sur votre profil
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> 
                  3x plus de visibilité
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> 
                  Support prioritaire
                </li>
              </ul>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Méthodes de paiement</h3>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
                  Airtel Money
                </button>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold">
                  MTN Mobile Money
                </button>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Virement bancaire
                </button>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg">
              Procéder au paiement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;