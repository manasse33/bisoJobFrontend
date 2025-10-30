import axios from 'axios';

const API_BASE_URL = 'https://bisojobbackend.onrender.com/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};

// Récupérer les projets du client
export const fetchProjects = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/clients/mes-projets`,
      getAuthHeaders()
    );
    
    if (response.data.success) {
      // Retourner le tableau de projets depuis data.data
      return response.data.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    throw error;
  }
};


// 🔹 Récupérer tous les projets (admin)
export const fetchAllProjects = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/projets`,
      getAuthHeaders()
    );

    if (response.data.success) {
      // Selon ta structure backend, ça peut être response.data.data ou data.data
      return response.data.data.data || response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les projets:', error);
    throw error;
  }
};

// 🔹 Récupérer les détails d’un projet spécifique (admin)
export const fetchProjectDetails = async (projectId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/projets/${projectId}`,
      getAuthHeaders()
    );

    if (response.data.success) {
      return response.data.data || {};
    }
    throw new Error('Projet introuvable');
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet ${projectId}:`, error);
    throw error;
  }
};

// Créer un nouveau projet
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/clients/projets`,
      projectData,
      getAuthHeaders()
    );
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Erreur lors de la création du projet');
  } catch (error) {
    console.error('Erreur création projet:', error);
    throw error;
  }
};

// Modifier un projet
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/clients/projets/${projectId}`,
      projectData,
      getAuthHeaders()
    );
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('Erreur lors de la modification');
  } catch (error) {
    console.error('Erreur modification projet:', error);
    throw error;
  }
};

// Supprimer un projet
export const deleteProject = async (projectId) => {
  try {
    await axios.delete(
      `${API_BASE_URL}/clients/projets/${projectId}`,
      getAuthHeaders()
    );
    return true;
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    throw error;
  }
};

export const closeProject = async (projectId) => {
  try {
    await axios.put(
      `${API_BASE_URL}/clients/projets/${projectId}/cloturer`,
      {}, // corps vide
      getAuthHeaders() // headers
    );
    return true;
  } catch (error) {
    console.error('Erreur de cloture projet:', error);
    throw error;
  }
};


// Récupérer les catégories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/categories`,
      getAuthHeaders()
    );
    
    if (response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    return [];
  }
};
