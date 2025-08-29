// API service for fetching data from Laravel backend
const API_BASE_URL = "http://localhost:8000/api";

export interface Laboratory {
  id: number
  title: string
  description?: string
  image?: string
  created_at: string
  updated_at: string
}

export const apiService = {
  // Fetch all laboratories
  async getLaboratories(): Promise<Laboratory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/laboratories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || data // Handle Laravel resource response format
    } catch (error) {
      console.error("Error fetching laboratories:", error)
      throw error
    }
  },

  // Search laboratories
  async searchLaboratories(query: string): Promise<Laboratory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/laboratories?search=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error("Error searching laboratories:", error)
      throw error
    }
  },
}
