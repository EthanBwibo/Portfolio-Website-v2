import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.error('Missing Strava environment variables:', {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken,
      });
      return NextResponse.json([]);
    }

    const authResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      cache: 'no-store',
    });

    const tokenData = await authResponse.json();

    // Catch failed token refresh BEFORE making the athlete activities call
    if (!authResponse.ok || !tokenData.access_token) {
      console.error('Strava token refresh failed:', tokenData);
      return NextResponse.json([]);
    }

    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=3',
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        cache: 'no-store',
      }
    );

    const activities = await activitiesRes.json();

    if (!Array.isArray(activities)) {
      console.error('Strava athlete activities error:', activities);
      return NextResponse.json([]);
    }

    const formattedActivities = activities.map((a) => ({
      name: a.name,
      type: a.type,
      distance: (a.distance / 1000).toFixed(2), // meters to km
      date: a.start_date,
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error('Strava API crash:', error);
    return NextResponse.json([]);
  }
}