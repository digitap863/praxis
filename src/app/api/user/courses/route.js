import connect from "@/lib/db/connection";
import Course from "@/lib/db/models/Courses";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "10");
        
        const courses = await Course.find()
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json(courses);
    } catch (error) {
        console.error("Error in fetching courses:", error);
        return new NextResponse("Error in fetching courses", { status: 500 });
    }
}
