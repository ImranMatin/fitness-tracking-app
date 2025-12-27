import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - List all exercises (public data, but requires auth)
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const muscle_group = url.searchParams.get("muscle_group");
    const search = url.searchParams.get("search");

    let query = "SELECT * FROM exercises WHERE 1=1";
    const values = [];

    if (category) {
      query += ` AND category = $${values.length + 1}`;
      values.push(category);
    }

    if (muscle_group) {
      query += ` AND muscle_group = $${values.length + 1}`;
      values.push(muscle_group);
    }

    if (search) {
      query += ` AND (LOWER(name) LIKE LOWER($${values.length + 1}) OR LOWER(description) LIKE LOWER($${values.length + 1}))`;
      values.push(`%${search}%`);
      values.push(`%${search}%`);
    }

    query += " ORDER BY category, name";

    const exercises = await sql(query, values);

    return Response.json({ exercises });
  } catch (error) {
    console.error("GET /api/exercises error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
