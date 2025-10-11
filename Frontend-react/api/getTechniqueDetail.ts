// 🌐 API Base URL
const API_BASE_URL = "http://127.0.0.1:8000/api"

// 🧩 Type Definitions
export interface StepTip {
  id: number
  tip: string
  description: string
  pivot: {
    duration: number
  }
}

export interface Step {
  id: number
  title: string
  reactive: string
  duration: number
  description: string
  created_at: string
  updated_at: string
  pivot?: {
    position: number
  }
  tips?: StepTip[]
}

export interface TechniqueDetail {
  id: number
  title: string
  description: string
  image: string
  category_id?: number
  category?: {
    id: number
    name: string
  }
  rating?: number
  duration?: number
  difficulty?: string
  created_at: string
  updated_at: string
  steps?: Step[]
}

// 🧠 Helper for JSON fetch
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  })
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  const json = await response.json()
  return json.data // always take the "data" object
}

// 🧪 Get a technique with its steps + tips (matches Postman)
export const getTechniqueDetail = async (techniqueId: number): Promise<TechniqueDetail> => {
  try {
    const technique = await fetchJSON<TechniqueDetail>(`${API_BASE_URL}/techniques/${techniqueId}`)

    // Optional: sort steps by pivot.position if needed
    if (technique.steps) {
      technique.steps.sort((a, b) => (a.pivot?.position || 0) - (b.pivot?.position || 0))

      // Sort tips inside each step by pivot.duration (optional)
      technique.steps.forEach(step => {
        if (step.tips) {
          step.tips.sort((a, b) => a.pivot.duration - b.pivot.duration)
        }
      })
    }

    return technique
  } catch (error) {
    console.error("Error fetching technique detail:", error)
    throw error
  }
}
