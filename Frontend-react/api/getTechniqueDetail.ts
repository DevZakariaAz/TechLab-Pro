const API_BASE_URL = "http://127.0.0.1:8000/api" // Replace with your actual API URL

export interface TechniqueDetail {
  id: number
  name: string
  description: string
  image?: string
  category_id: number
  category?: {
    id: number
    name: string
  }
  rating?: number
  duration?: string
  difficulty?: string
  created_at: string
  updated_at: string
}

export interface Step {
  id: number
  technique_id: number
  title: string
  description: string
  duration: string
  order: number
  image?: string
  created_at: string
  updated_at: string
}

export interface Prerequisite {
  id: number
  technique_id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface Tip {
  id: number
  technique_id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

export const getTechniqueDetail = async (techniqueId: number): Promise<TechniqueDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/techniques/${techniqueId}`, {
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
    console.error("Error fetching technique detail:", error)
    throw error
  }
}

export const getTechniqueSteps = async (techniqueId: number): Promise<Step[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/steps?technique_id=${techniqueId}`, {
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
    console.error("Error fetching technique steps:", error)
    return []
  }
}

export const getTechniquePrerequisites = async (techniqueId: number): Promise<Prerequisite[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/prerequisites?technique_id=${techniqueId}`, {
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
    console.error("Error fetching technique prerequisites:", error)
    return []
  }
}

export const getTechniqueTips = async (techniqueId: number): Promise<Tip[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tips?technique_id=${techniqueId}`, {
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
    console.error("Error fetching technique tips:", error)
    return []
  }
}
