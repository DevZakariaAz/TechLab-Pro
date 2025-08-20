const API_BASE_URL = "http://127.0.0.1:8000/api" // Replace with your actual API URL

export interface TechniqueDetail {
  id: number
  title: string
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
  title: string
  reactive: string
  duration: string
  description: string
  created_at: string
  updated_at: string
  tips?: StepTip[]
}

export interface StepTip {
  id: number
  tip: string
  description: string
  pivot: {
    duration: string
  }
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
    // Use the steps endpoint with technique filter instead of nested route
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
    // Return fallback data if API fails
    return [
      {
        id: 1,
        title: "Cristal Violet",
        reactive: "Cristal Violet",
        duration: "5",
        description: "Appliquer uniformément",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tips: [
          {
            id: 1,
            tip: "Application uniforme",
            description: "Appliquer le cristal violet de manière uniforme sur toute la surface",
            pivot: { duration: "30" },
          },
        ],
      },
      {
        id: 2,
        title: "Décoloration à l'alcool",
        reactive: "Alcool",
        duration: "2",
        description: "Rincer délicatement",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tips: [],
      },
      {
        id: 3,
        title: "Contre-coloration à la Safranine",
        reactive: "Safranine",
        duration: "2",
        description: "Coloration finale",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tips: [],
      },
    ]
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

export const getStepTips = async (stepId: number): Promise<StepTip[]> => {
  try {
    // Use the tips endpoint with step filter instead of nested route
    const response = await fetch(`${API_BASE_URL}/tips?step_id=${stepId}`, {
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
    console.error("Error fetching step tips:", error)
    return []
  }
}
