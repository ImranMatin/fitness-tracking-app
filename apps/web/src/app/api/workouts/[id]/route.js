import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - Get a specific workout with exercises
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const workoutId = parseInt(params.id);

    const workout = await sql`
      SELECT * FROM workouts 
      WHERE id = ${workoutId} AND user_id = ${userId}
    `;

    if (workout.length === 0) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

    const exercises = await sql`
      SELECT we.*, e.name as exercise_name, e.category, e.muscle_group
      FROM workout_exercises we
      JOIN exercises e ON we.exercise_id = e.id
      WHERE we.workout_id = ${workoutId}
      ORDER BY we.created_at
    `;

    return Response.json({
      workout: workout[0],
      exercises,
    });
  } catch (error) {
    console.error("GET /api/workouts/[id] error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT - Update a workout
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const workoutId = parseInt(params.id);
    const body = await request.json();

    // Verify ownership
    const existing = await sql`
      SELECT id FROM workouts 
      WHERE id = ${workoutId} AND user_id = ${userId}
    `;

    if (existing.length === 0) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

    const { name, date, duration_minutes, calories_burned, notes } = body;

    const setClauses = [];
    const values = [];

    if (name !== undefined) {
      setClauses.push(`name = $${values.length + 1}`);
      values.push(name);
    }
    if (date !== undefined) {
      setClauses.push(`date = $${values.length + 1}`);
      values.push(date);
    }
    if (duration_minutes !== undefined) {
      setClauses.push(`duration_minutes = $${values.length + 1}`);
      values.push(duration_minutes);
    }
    if (calories_burned !== undefined) {
      setClauses.push(`calories_burned = $${values.length + 1}`);
      values.push(calories_burned);
    }
    if (notes !== undefined) {
      setClauses.push(`notes = $${values.length + 1}`);
      values.push(notes);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    setClauses.push(`updated_at = $${values.length + 1}`);
    values.push(new Date().toISOString());

    const query = `
      UPDATE workouts 
      SET ${setClauses.join(", ")} 
      WHERE id = $${values.length + 1} AND user_id = $${values.length + 2}
      RETURNING *
    `;

    const result = await sql(query, [...values, workoutId, userId]);

    return Response.json({ workout: result[0] });
  } catch (error) {
    console.error("PUT /api/workouts/[id] error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE - Delete a workout
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const workoutId = parseInt(params.id);

    const result = await sql`
      DELETE FROM workouts 
      WHERE id = ${workoutId} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

    return Response.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/workouts/[id] error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
