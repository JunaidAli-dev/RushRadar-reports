let reports = [];

export async function GET() {
  return new Response(JSON.stringify(reports), { status: 200 });
}

export async function POST(req) {
  try {
    const { title, description, latitude, longitude } = await req.json();
    if (!title || !description || latitude === undefined || longitude === undefined) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const newReport = { 
      id: reports.length + 1,
      title,
      description,
      latitude,
      longitude,
      status: false,
      createdAt: new Date().toISOString() // Add server-generated timestamp
    };
    reports.push(newReport);

    return new Response(JSON.stringify(newReport), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    reports = reports.map(r => 
      r.id === id ? 
      { ...r, status } : // Preserve all fields including createdAt
      r
    );
    
    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}

