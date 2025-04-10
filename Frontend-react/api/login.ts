export const login = async (email: string, password: string) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.status) {
      return {
        success: true,
        token: data.token,
        user: data.user,
      };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Erreur serveur ou réseau.' };
  }
};
