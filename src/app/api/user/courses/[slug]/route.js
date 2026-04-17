import connect from "@/lib/db/connection";
import Course from "@/lib/db/models/Courses";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await connect();
        const { slug } = await params;

        const course = await Course.findOne({ slug });

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        // Fetch recent/other courses as well
        const otherCourses = await Course.find({ _id: { $ne: course._id } })
            .limit(3)
            .sort({ createdAt: -1 });

        return NextResponse.json({ course, otherCourses });
    } catch (error) {
        console.error("Error fetching course detail:", error);
        return new NextResponse("Error fetching course detail", { status: 500 });
    }
}
