import { NextResponse } from 'next/server';
import { Restaurant } from '@/types/global';

export async function POST(request: Request) {
    try {
        const { matchSettings } = await request.json();

        const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
        const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

        const params = new URLSearchParams({
            key: GOOGLE_PLACES_API_KEY || '',
            location: `${matchSettings.lat},${matchSettings.lng}`,
            radius: matchSettings.radius.toString(),
            type: 'restaurant',
        });

        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        const restaurants: Restaurant[] = data.results.map((place: { place_id: string; name: string; photos?: { photo_reference: string }[]; rating: number; vicinity: string }) => ({
            id: place.place_id,
            name: place.name,
            image_url: place.photos?.[0]?.photo_reference || '',
            rating: place.rating,
            address: place.vicinity,
        }));
console.log('restaurants: ', restaurants);
        return NextResponse.json(restaurants);
    } catch (error) {
        console.error('Error fetching Google Places data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}