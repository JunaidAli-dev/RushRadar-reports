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

    const newReport = { id: reports.length + 1, title, description, latitude, longitude, status: false };
    reports.push(newReport);

    return new Response(JSON.stringify(newReport), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, status } = await req.json();

    reports = reports.map(r => r.id === id ? {id: r.id, title: r.title, description: r.description, latitude: r.latitude, longitude: r.longitude, status} : r);
    
    return new Response(JSON.stringify(reports));
  } catch (error) {
    console.log(error.message);
    
    return new Response(JSON.stringify(reports), { status: 500 });
  }
}
