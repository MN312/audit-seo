import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { apiKey, action, query, keyword, lat, lon, limit = 30 } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    // Action: Search Places (pour trouver un établissement)
    if (action === 'searchPlaces') {
      const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(query)}&type=search&api_key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        return NextResponse.json({ error: data.error }, { status: 400 });
      }

      const places = (data.local_results || []).slice(0, limit).map(place => ({
        placeId: place.place_id,
        name: place.title,
        address: place.address,
        rating: place.rating,
        reviews: place.reviews,
        lat: place.gps_coordinates?.latitude,
        lon: place.gps_coordinates?.longitude,
        type: place.type
      }));

      return NextResponse.json({ places });
    }

    // Action: Search Ranking (pour vérifier le positionnement)
    if (action === 'searchRanking') {
      const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(keyword)}&ll=@${lat},${lon},14z&type=search&api_key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        return NextResponse.json({ error: data.error }, { status: 400 });
      }

      const competitors = (data.local_results || []).slice(0, 10).map(place => ({
        placeId: place.place_id,
        name: place.title,
        rating: place.rating,
        reviews: place.reviews
      }));

      return NextResponse.json({
        local_results: data.local_results || [],
        competitors
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
