import { NextResponse } from "next/navigation";
import { PROPERTIES_DATA } from "@/data/mockData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const style = searchParams.get("style");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    const query = searchParams.get("query");

    // Attempt proxy to FastAPI if running on port 8000
    try {
      const fastApiRes = await fetch(`http://localhost:8000/api/properties?${searchParams.toString()}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(1000)
      });
      if (fastApiRes.ok) {
        const data = await fastApiRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback to internal dataset
    }

    let filtered = [...PROPERTIES_DATA];

    if (destination && destination !== "all") {
      const q = destination.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          (p.state && p.state.toLowerCase().includes(q))
      );
    }

    if (style && style !== "all") {
      const s = style.toLowerCase();
      filtered = filtered.filter(
        (p) => p.category.toLowerCase().includes(s) || p.title.toLowerCase().includes(s)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice, 10));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice, 10));
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
