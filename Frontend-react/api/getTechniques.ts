export const getTechniques = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/techniques', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // If authentication is required, include a token here:
        // 'Authorization': `Bearer ${your_token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        techniques: data.techniques || data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Erreur lors du chargement des données.',
      };
    }
  } catch (error) {
    console.error('Erreur API:', error);
    return {
      success: false,
      message: 'Impossible de se connecter au serveur.',
    };
  }
};
