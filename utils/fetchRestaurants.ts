import { MatchSettings, Restaurant } from '@/types/global';

export async function fetchRestaurants(matchSettings: MatchSettings): Promise<Restaurant[]> {
    try {
        const response = await fetch('/api/google-places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matchSettings }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
        }

        const data: Restaurant[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchRestaurants:', error);
        throw error;
    }
}