import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    const { access_token } = await authResponse.json();

    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=3',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const activities = await activitiesRes.json();

    // 🔹 Safety Check: Ensure activities is an array before mapping
    if (!Array.isArray(activities)) {
      console.error('Strava API returned an error object:', activities);
      return NextResponse.json([]);
    }

    const formattedActivities = activities.map(a => ({
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