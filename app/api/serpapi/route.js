export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, action, keyword, lat, lon, zoom = 14, placeId } = body;

    if (!apiKey) {
      return Response.json({ error: "Clé API manquante" }, { status: 400 });
    }

    // ACTION 1: Récupérer les détails d'un lieu (lat/lon + infos complètes)
    if (action === "getPlaceDetails") {
      if (!placeId) {
        return Response.json({ error: "Place ID manquant" }, { status: 400 });
      }

      const params = new URLSearchParams({
        engine: "google_maps",
        type: "place",
        place_id: placeId,
        api_key: apiKey,
        hl: "fr",
        gl: "fr",
      });

      const response = await fetch(`https://serpapi.com/search.json?${params}`);
      const data = await response.json();

      if (data.place_results) {
        const place = data.place_results;
        
        // Extraire la ville depuis l'adresse
        let city = '';
        if (place.address) {
          const parts = place.address.split(',');
          if (parts.length >= 2) {
            const cityPart = parts[parts.length - 2].trim();
            city = cityPart.replace(/\d{5}/, '').trim();
          }
        }

        // Analyser les infos de la fiche pour l'audit
        const auditInfo = {
          hasPhotos: (place.photos && place.photos.length > 0) || false,
          photosCount: place.photos ? place.photos.length : 0,
          hasDescription: !!place.description,
          description: place.description || '',
          hasHours: !!place.hours,
          hasWebsite: !!place.website,
          website: place.website || '',
          hasPhone: !!place.phone,
          phone: place.phone || '',
          hasServices: (place.services && place.services.length > 0) || false,
          services: place.services || [],
          totalReviews: place.reviews || 0,
          reviewsLink: place.reviews_link || '',
          type: place.type || '',
          priceRange: place.price || '',
        };

        return Response.json({
          success: true,
          name: place.title || '',
          address: place.address || '',
          city: city,
          rating: place.rating || null,
          reviews: place.reviews || null,
          lat: place.gps_coordinates?.latitude || null,
          lon: place.gps_coordinates?.longitude || null,
          audit: auditInfo,
        });
      } else {
        return Response.json({ error: "Lieu non trouvé", data }, { status: 404 });
      }
    }

    // ACTION 2: Rechercher le ranking + concurrents
    if (action === "searchRanking") {
      if (!keyword || !lat || !lon) {
        return Response.json({ error: "Paramètres manquants" }, { status: 400 });
      }

      const params = new URLSearchParams({
        engine: "google_maps",
        q: keyword,
        ll: `@${lat},${lon},${zoom}z`,
        type: "search",
        api_key: apiKey,
        hl: "fr",
        gl: "fr",
      });

      const response = await fetch(`https://serpapi.com/search.json?${params}`);
      const data = await response.json();

      // Extraire les top 5 concurrents
      let competitors = [];
      if (data.local_results) {
        competitors = data.local_results.slice(0, 5).map((r, index) => ({
          position: index + 1,
          name: r.title || '',
          rating: r.rating || null,
          reviews: r.reviews || null,
          placeId: r.place_id || '',
          type: r.type || '',
        }));
      }

      return Response.json({
        ...data,
        competitors: competitors,
      });
    }

    // ACTION 3: Rechercher le volume de recherche (estimation via Google Trends ou autre)
    if (action === "getSearchVolume") {
      // Pour l'instant on retourne une estimation basée sur la taille de la ville
      // Dans une vraie implémentation, on utiliserait Google Keyword Planner ou SEMrush
      const { city, keyword } = body;
      
      // Estimation simplifiée basée sur la population
      const bigCities = ['paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille'];
      const mediumCities = ['rennes', 'reims', 'le havre', 'saint-étienne', 'toulon', 'grenoble', 'dijon', 'angers', 'nîmes', 'villeurbanne'];
      
      const cityLower = (city || '').toLowerCase();
      let baseVolume = 100; // petite ville
      
      if (bigCities.some(c => cityLower.includes(c))) {
        baseVolume = 1000;
      } else if (mediumCities.some(c => cityLower.includes(c))) {
        baseVolume = 400;
      }
      
      return Response.json({
        success: true,
        estimatedVolume: baseVolume,
        city: city,
        note: "Estimation basée sur la taille de la ville"
      });
    }

    return Response.json({ error: "Action non reconnue" }, { status: 400 });

  } catch (error) {
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
