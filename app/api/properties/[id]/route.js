import { NextResponse } from "next/navigation";
import { PROPERTIES_DATA } from "@/data/mockData";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Attempt proxy to FastAPI if running
    try {
      const fastApiRes = await fetch(`http://localhost:8000/api/properties/${id}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(1000)
      });
      if (fastApiRes.ok) {
        const data = await fastApiRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }

    const property = PROPERTIES_DATA.find((p) => p.id === id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
