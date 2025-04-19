export const getTechniques = async () => {
  const fallbackTechniques = [
    {
      id: "1",
      title: "Coloration de Gram",
      description: "Permet de différencier les bactéries à Gram positif et négatif.",
      image: "https://images.pexels.com/photos/4031442/pexels-photo-4031442.jpeg",
      category: "microbiologiques",
      isFavorite: false,
    },
    {
      id: "2",
      title: "Coloration H&E",
      description: "Hématoxyline & Éosine, utilisée pour les coupes histologiques générales.",
      image: "https://images.pexels.com/photos/8539945/pexels-photo-8539945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "histologiques",
      isFavorite: true,
    },
    {
      id: "3",
      title: "Coloration de Ziehl-Neelsen",
      description: "Utilisée pour détecter les bacilles acido-alcoolo-résistants (BAAR).",
      image: "https://images.pexels.com/photos/4031440/pexels-photo-4031440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "microbiologiques",
      isFavorite: false,
    },
    {
      id: "4",
      title: "Coloration au bleu de toluidine",
      description: "Utilisée pour mettre en évidence les structures acides comme les noyaux.",
      image: "https://images.pexels.com/photos/4031370/pexels-photo-4031370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "histologiques",
      isFavorite: false,
    },
    {
      id: "5",
      title: "Coloration au rouge Congo",
      description: "Utilisée pour mettre en évidence l'amyloïde.",
      image: "https://images.pexels.com/photos/4031442/pexels-photo-4031442.jpeg",
      category: "fibres",
      isFavorite: false,
    },
    {
      id: "6",
      title: "Coloration au PAS",
      description: "Permet de mettre en évidence les polysaccharides comme le glycogène.",
      image: "https://images.pexels.com/photos/8539945/pexels-photo-8539945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "histologiques",
      isFavorite: true,
    },
    {
      id: "7",
      title: "Coloration de Giemsa",
      description: "Utilisée pour la détection des parasites du sang comme le paludisme.",
      image: "https://images.pexels.com/photos/4031370/pexels-photo-4031370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "microbiologiques",
      isFavorite: false,
    },
    {
      id: "8",
      title: "Coloration de Trichrome de Masson",
      description: "Utilisée pour distinguer les fibres musculaires, collagènes et cellules.",
      image: "http://images.pexels.com/photos/9629715/pexels-photo-9629715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "fibres",
      isFavorite: false,
    },
    {
      id: "9",
      title: "Coloration au bleu alcian",
      description: "Spécifique aux mucopolysaccharides acides.",
      image: "https://images.pexels.com/photos/9629678/pexels-photo-9629678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "histologiques",
      isFavorite: false,
    },
    {
      id: "10",
      title: "Coloration de May-Grünwald Giemsa",
      description: "Utilisée en hématologie pour différencier les cellules sanguines.",
      image: "https://images.pexels.com/photos/4031440/pexels-photo-4031440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "microbiologiques",
      isFavorite: false,
    },
  ];

  try {
    const response = await fetch('http://127.0.0.1:8000/api/techniques', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${your_token}`,
      },
    });

    const data = await response.json();

    if (response.ok && data?.techniques) {
      return {
        success: true,
        techniques: data.techniques,
      };
    } else {
      console.warn('API error, using fallback techniques.');
      return {
        success: true,
        techniques: fallbackTechniques,
      };
    }
  } catch (error) {
    console.error('API not reachable, using fallback techniques.', error);
    return {
      success: true,
      techniques: fallbackTechniques,
    };
  }
};
