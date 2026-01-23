import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey, action, query, keyword, lat, lon } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    // ACTION 1: Get place details
    if (action === 'getPlaceDetails') {
      const { placeId } = body;
      const url = `https://serpapi.com/search.json?engine=google_maps&place_id=${placeId}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.place_results) {
        const place = data.place_results;
        return NextResponse.json({
          success: true,
          name: place.title,
          address: place.address,
          rating: place.rating,
          reviews: place.reviews,
          lat: place.gps_coordinates?.latitude,
          lon: place.gps_coordinates?.longitude,
        });
      }
      return NextResponse.json({ success: false, error: 'Place not found' });
    }

    // ACTION 2: Search places by name (30 results max)
    if (action === 'searchPlaces') {
      const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(query)}&type=search&api_key=${apiKey}&num=30`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.local_results && data.local_results.length > 0) {
        const places = data.local_results.slice(0, 30).map(place => ({
          placeId: place.place_id,
          name: place.title,
          address: place.address,
          rating: place.rating,
          reviews: place.reviews,
          lat: place.gps_coordinates?.latitude,
          lon: place.gps_coordinates?.longitude,
        }));
        return NextResponse.json({ success: true, places });
      }
      return NextResponse.json({ success: false, places: [], error: 'No results found' });
    }

    // ACTION 3: Search ranking for keyword
    if (action === 'searchRanking') {
      const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(keyword)}&ll=@${lat},${lon},15z&type=search&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const competitors = [];
      if (data.local_results) {
        data.local_results.slice(0, 20).forEach((place, index) => {
          competitors.push({
            position: index + 1,
            placeId: place.place_id,
            name: place.title,
            rating: place.rating,
            reviews: place.reviews,
          });
        });
      }

      return NextResponse.json({
        success: true,
        local_results: data.local_results || [],
        competitors,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
