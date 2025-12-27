import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET - Dashboard data for the current user
export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get recent workouts (last 5)
    const recentWorkouts = await sql`
      SELECT * FROM workouts 
      WHERE user_id = ${userId}
      ORDER BY date DESC 
      LIMIT 5
    `;

    // Get total workouts this week
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const weeklyStats = await sql`
      SELECT 
        COUNT(*) as total_workouts_this_week,
        SUM(duration) as total_minutes_this_week
      FROM workouts 
      WHERE user_id = ${userId}
      AND date >= ${thisWeekStart.toISOString()}
    `;

    // Get all-time stats
    const allTimeStats = await sql`
      SELECT 
        COUNT(*) as total_workouts,
        SUM(duration) as total_minutes,
        AVG(duration) as avg_duration
      FROM workouts 
      WHERE user_id = ${userId}
    `;

    return Response.json({
      recentWorkouts,
      weeklyStats: weeklyStats[0] || {
        total_workouts_this_week: 0,
        total_minutes_this_week: 0,
      },
      allTimeStats: allTimeStats[0] || {
        total_workouts: 0,
        total_minutes: 0,
        avg_duration: 0,
      },
    });
  } catch (error) {
    console.error("GET /api/dashboard error", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
