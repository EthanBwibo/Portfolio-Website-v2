import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || '',
    }),
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error('Failed to fetch Spotify access token');
  }
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Fetch Current Playing & Recent History in parallel
    const [nowRes, recentRes] = await Promise.all([
      fetch(NOW_PLAYING_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      }),
      fetch(RECENTLY_PLAYED_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      }),
    ]);

    let currentSong = null;
    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        currentSong = {
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists?.map((a) => a.name).join(', '),
          album: data.item.album?.name,
          albumArt: data.item.album?.images?.[0]?.url || null,
          songUrl: data.item.external_urls?.spotify,
        };
      }
    }

    let recentTracks = [];
    if (recentRes.status === 200) {
      const recentData = await recentRes.json();
      recentTracks = (recentData.items || []).map((item) => ({
        title: item.track?.name,
        artist: item.track?.artists?.map((a) => a.name).join(', '),
        albumArt: item.track?.album?.images?.[0]?.url || null,
        songUrl: item.track?.external_urls?.spotify,
      }));
    }

    return NextResponse.json({
      isPlaying: currentSong?.isPlaying ?? false,
      current: currentSong,
      recent: recentTracks,
    });
  } catch (error) {
    console.error('Spotify API error:', error.message);
    return NextResponse.json({ isPlaying: false, current: null, recent: [] });
  }
}