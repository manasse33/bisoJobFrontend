import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, Loader, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const hasVerified = useRef(false); // Pour éviter les doubles appels

  useEffect(() => {
    // Éviter les doubles appels
    if (hasVerified.current) return;

    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      console.log('Vérification avec:', { token, email });

      if (!token || !email) {
        setStatus('error');
        setMessage('Lien de vérification invalide. Paramètres manquants.');
        return;
      }

      // Marquer comme vérifié pour éviter les doubles appels
      hasVerified.current = true;

      try {
        const response = await api.post('/verify-email', {
          token: token,
          email: email
        });

        console.log('Réponse vérification:', response.data);

        const data = response.data;

        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Email vérifié avec succès ! Vous pouvez maintenant vous connecter.');
        } else {
          setStatus('error');
          setMessage(data.message || 'Erreur lors de la vérification de l\'email.');
        }
      } catch (error) {
        console.error('Erreur verification:', error);
        setStatus('error');
        
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else if (error.response?.status === 400) {
          setMessage('Le lien de vérification est invalide ou a expiré.');
        } else if (error.response?.status === 404) {
          setMessage('Utilisateur introuvable.');
        } else {
          setMessage('Erreur de connexion au serveur. Veuillez réessayer.');
        }
      }
    };

    verifyEmail();
  }, []); // Dépendances vides pour n'exécuter qu'une seule fois

  // Effet séparé pour le countdown et la redirection
  useEffect(() => {
    if (status === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Utiliser setTimeout pour éviter l'erreur de render
            setTimeout(() => {
              navigate('/auth');
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, navigate]);

  const handleResendEmail = async () => {
    const email = searchParams.get('email');
    
    if (!email) {
      alert('Email non trouvé');
      return;
    }

    try {
      const response = await api.post('/resend-verification-email', { email });
      
      if (response.data.success) {
        alert('Email de vérification renvoyé avec succès ! Vérifiez votre boîte mail.');
      } else {
        alert(response.data.message || 'Erreur lors du renvoi');
      }
    } catch (error) {
      console.error('Erreur renvoi email:', error);
      alert('Erreur lors du renvoi de l\'email de vérification');
    }
  };

  const handleGoToLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf3ff] via-[#f6f9ff] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-lg p-8 text-center border border-white/30">
          
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <img 
                src="/logo-bisojob.jpg" 
                alt="BisoJob Logo" 
                className="h-32 w-auto mb-4 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback text logo */}
              <div className="hidden items-center gap-2 justify-center">
                <div className="h-12 w-12 bg-gradient-to-br from-[#0046a3] to-[#00b5ff] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">B</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0046a3] via-[#007bff] to-[#00b5ff] bg-clip-text text-transparent">
                  BisoJob
                </h1>
              </div>
            </div>
          </div>

          {/* Status Icon */}
          <div className="mb-6 flex justify-center">
            {status === 'verifying' && (
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <Loader className="h-10 w-10 text-blue-600 animate-spin" />
              </div>
            )}
            {status === 'success' && (
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            )}
            {status === 'error' && (
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center animate-shake">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {status === 'verifying' && 'Vérification en cours...'}
            {status === 'success' && 'Email vérifié ! 🎉'}
            {status === 'error' && 'Erreur de vérification'}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {status === 'verifying' && 'Veuillez patienter pendant que nous vérifions votre email.'}
            {status === 'success' && message}
            {status === 'error' && message}
          </p>

          {/* Success Actions */}
          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700 flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Votre compte est maintenant actif
                </p>
              </div>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-[#0046a3] to-[#007bff] hover:from-[#003580] hover:to-[#0060d0] text-white font-semibold py-3 rounded-xl transition transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
              >
                Se connecter
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-xs text-gray-500">
                Redirection automatique dans {countdown} seconde{countdown > 1 ? 's' : ''}...
              </p>
            </div>
          )}

          {/* Error Actions */}
          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700">
                  Le lien peut avoir expiré ou être invalide.
                </p>
              </div>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-[#0046a3] to-[#007bff] hover:from-[#003580] hover:to-[#0060d0] text-white font-semibold py-3 rounded-xl transition transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
              >
                Retour à la connexion
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={handleResendEmail}
                className="w-full bg-white border-2 border-[#0046a3] text-[#0046a3] hover:bg-blue-50 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Renvoyer l'email de vérification
              </button>
            </div>
          )}

          {/* Loading state - no actions */}
          {status === 'verifying' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  Traitement de votre demande...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            Besoin d'aide ? Contactez-nous à support@bisojob.com
          </p>
          <p className="text-xs text-gray-400">
            🔒 Vos données sont sécurisées et chiffrées
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;