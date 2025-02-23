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

// app/api/reports/route.js
// import dbConnect from "@/lib/dbConnect";
// import Report from "@/models/report"; // Ensure case matches file name

// export async function GET() {
//   try {
//     // 1. Database connection
//     console.log("[API] Connecting to DB...");
//     await dbConnect();
//     console.log("[API] DB connected");

//     // 2. Query data
//     console.log("[API] Fetching reports...");
//     const reports = await Report.find({}).lean();
//     console.log(`[API] Found ${reports.length} reports`);

//     // 3. Return response
//     return new Response(JSON.stringify(reports), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     // 4. Detailed error logging
//     console.error("[API Error]", error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: error.message,
//       stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//     }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export async function POST(request) {
//   await dbConnect();
//   try {
//     const body = await request.json();
//     const newReport = new Report(body);
//     await newReport.save();
//     return Response.json(newReport, { status: 201 });
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to create report" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   await dbConnect();
//   try {
//     const { id, status } = await request.json();
//     await Report.findByIdAndUpdate(id, { status });
//     const updatedReports = await Report.find().lean();
//     return Response.json(updatedReports);
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to update report" },
//       { status: 500 }
//     );
//   }
// }