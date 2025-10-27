// src/data/freelancesData.js
export const freelances = [
  { 
    id: 1, 
    name: 'Jean Makaya', 
    category: 'Développeur Web', 
    location: 'Pointe-Noire', 
    rating: 4.8, 
    price: '15000-30000 FCFA', 
    featured: true, 
    phone: '+242066123456', 
    photo: 'JM',
    bio: 'Développeur web passionné avec 5 ans d\'expérience...',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'MongoDB', 'Design UI/UX']
  },
  { 
    id: 2, 
    name: 'Marie Ngoma', 
    category: 'Designer Graphique', 
    location: 'Brazzaville', 
    rating: 4.9, 
    price: '10000-25000 FCFA', 
    featured: true, 
    phone: '+242066234567', 
    photo: 'MN' 
  },
  // ... autres freelances
];

export const categories = [
  'Tous', 
  'Développement', 
  'Design', 
  'Artisanat', 
  'Beauté', 
  'Construction', 
  'Photographie', 
  'Autre'
];