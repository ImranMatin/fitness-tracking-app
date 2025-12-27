import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - List all workouts for the current user
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const offset = parseInt(url.searchParams.get("offset")) || 0;

    const workouts = await sql`
      SELECT * FROM workouts
      WHERE user_id = ${userId}
      ORDER BY date DESC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return Response.json({ workouts });
  } catch (error) {
    console.error("GET /api/workouts error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST - Create a new workout
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { exercise_name, sets, reps, duration } = body;

    if (!exercise_name || !sets || !reps || !duration) {
      return Response.json(
        {
          error: "Exercise name, sets, reps, and duration are required",
        },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO workouts (user_id, exercise_name, sets, reps, duration)
      VALUES (${userId}, ${exercise_name}, ${parseInt(sets)}, ${parseInt(reps)}, ${parseInt(duration)})
      RETURNING *
    `;

    return Response.json({ workout: result[0] });
  } catch (error) {
    console.error("POST /api/workouts error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
