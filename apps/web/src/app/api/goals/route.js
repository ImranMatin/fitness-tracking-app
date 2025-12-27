import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - List all goals for the current user
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "active";

    const goals = await sql`
      SELECT * FROM goals 
      WHERE user_id = ${userId} AND status = ${status}
      ORDER BY created_at DESC
    `;

    return Response.json({ goals });
  } catch (error) {
    console.error("GET /api/goals error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST - Create a new goal
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const {
      title,
      description,
      target_type,
      target_value,
      target_unit,
      target_date,
    } = body;

    if (!title || !target_type) {
      return Response.json(
        { error: "Title and target type are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO goals (user_id, title, description, target_type, target_value, target_unit, target_date)
      VALUES (${userId}, ${title}, ${description || null}, ${target_type}, ${target_value || null}, ${target_unit || null}, ${target_date || null})
      RETURNING *
    `;

    return Response.json({ goal: result[0] });
  } catch (error) {
    console.error("POST /api/goals error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
