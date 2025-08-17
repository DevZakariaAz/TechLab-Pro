export interface Category {
  id: string | number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

export const getCategories = async () => {
  const fallbackCategories: Category[] = [
    { id: "all", name: "Toutes", description: "Afficher toutes les techniques" },
    { id: "1", name: "Microbiologie", description: "Étude des micro-organismes" },
    { id: "2", name: "Histologiques", description: "Coupes histologiques générales" },
    { id: "3", name: "Fibres", description: "Colorations des fibres et tissus" },
  ]

  try {
    const response = await fetch("http://127.0.0.1:8000/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${your_token}`,
      },
    })

    const data = await response.json()

    if (response.ok && Array.isArray(data)) {
      // On ajoute manuellement l'option "Toutes" en premier
      return {
        success: true,
        categories: [{ id: "all", name: "Toutes" }, ...data],
      }
    } else {
      console.warn("API error, using fallback categories.")
      return {
        success: true,
        categories: fallbackCategories,
      }
    }
  } catch (error) {
    console.error("API not reachable, using fallback categories.", error)
    return {
      success: true,
      categories: fallbackCategories,
    }
  }
}
