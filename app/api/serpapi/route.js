export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, action, keyword, lat, lon, zoom = 14, placeId } = body;

    if (!apiKey) {
      return Response.json({ error: "Clé API manquante" }, { status: 400 });
    }

    // ACTION 1: Récupérer les détails d'un lieu (lat/lon + infos)
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

        return Response.json({
          success: true,
          name: place.title || '',
          address: place.address || '',
          city: city,
          rating: place.rating || null,
          reviews: place.reviews || null,
          lat: place.gps_coordinates?.latitude || null,
          lon: place.gps_coordinates?.longitude || null,
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
        }));
      }

      return Response.json({
        ...data,
        competitors: competitors,
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
