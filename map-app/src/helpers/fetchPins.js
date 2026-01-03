const endpointUrl =
"https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins";
export default async function fetchPins(setPins) {
try {
    const res = await fetch(endpointUrl);
    if (!res.ok) throw new Error(`GET /pins failed: ${res.status}`);
    const data = await res.json();

    const normalized = (data.pins ?? data).map((p) => ({
    ...p,
    longitude: typeof p.longitude === "string" ? parseFloat(p.longitude) : p.longitude,
    latitude: typeof p.latitude === "string" ? parseFloat(p.latitude) : p.latitude,
    }));

    setPins(normalized);
} catch (err) {
    console.error(err);
}
}