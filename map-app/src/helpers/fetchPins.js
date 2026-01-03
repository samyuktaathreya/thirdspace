
export default async function fetchPins(endpointUrl, setPins) {
try {
    const res = await fetch(`${endpointUrl}/pins`);
    if (!res.ok) throw new Error(`GET /pins failed: ${res.status}`);
    const data = await res.json();

    const normalized = (data.pins ?? data).map((p) => ({
    ...p,
    longitude: typeof p.longitude === "string" ? parseFloat(p.longitude) : p.longitude,
    latitude: typeof p.latitude === "string" ? parseFloat(p.latitude) : p.latitude,
    }));

    setPins(normalized);
    console.log(normalized);
} catch (err) {
    console.error(err);
}
}