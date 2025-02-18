import { NextResponse } from 'next/server';

const DEXSCREENER_API_URL = 'https://api.dexscreener.com/latest/dex/search';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' }, 
        { status: 400 }
      );
    }

    const endpoint = `${DEXSCREENER_API_URL}?q=${query}`;

    const response = await fetch(endpoint, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET',
    });
    
    if (!response.ok) {
      const errorMessage = `DexScreener API returned ${response.status}: ${response.statusText}`;
      console.error(errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching DexScreener data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch DexScreener data' }, 
      { status: 500 }
    );
  }
}
