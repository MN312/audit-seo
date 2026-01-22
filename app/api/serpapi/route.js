export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, action, keyword, lat, lon, zoom = 14, placeId } = body;

    if (!apiKey) {
      return Response.json({ error: "Clé API manquante" }, { status: 400 });
    }

    // ACTION 1: Récupérer les détails d'un lieu (lat/lon) via Place ID
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
        return Response.json({
          success: true,
          name: data.place_results.title,
          address: data.place_results.address,
          rating: data.place_results.rating,
          reviews: data.place_results.reviews,
          lat: data.place_results.gps_coordinates?.latitude,
          lon: data.place_results.gps_coordinates?.longitude,
        });
      } else {
        return Response.json({ error: "Lieu non trouvé", data }, { status: 404 });
      }
    }

    // ACTION 2: Rechercher le ranking sur une requête
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

      return Response.json(data);
    }

    return Response.json({ error: "Action non reconnue" }, { status: 400 });

  } catch (error) {
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
