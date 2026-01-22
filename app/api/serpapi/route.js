export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, keyword, lat, lon, zoom = 14 } = body;

    if (!apiKey || !keyword || !lat || !lon) {
      return Response.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
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

    const response = await fetch(
      `https://serpapi.com/search.json?${params}`
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
