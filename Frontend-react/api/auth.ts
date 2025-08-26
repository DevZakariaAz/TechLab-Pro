const API_BASE_URL = "http://localhost:8000/api"

export const sendResetCode = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Network error occurred")
  }
}

export const resetPassword = async (email: string, code: string, password: string, password_confirmation: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
        password,
        password_confirmation,
      }),
    })

    const data = await response.json()
    console.log("Reset Password Response:", data) // Debugging line
    return data
  } catch (error) {
    throw new Error("Network error occurred")
  }
}
