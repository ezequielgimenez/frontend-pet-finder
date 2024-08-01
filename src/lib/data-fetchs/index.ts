const MAPBOX_TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;

export async function setLongLat(query: string) {
  if (query) {
    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await resp.json();
    const [long, lat] = data.features[0].center;
    return { long, lat };
  }
}
