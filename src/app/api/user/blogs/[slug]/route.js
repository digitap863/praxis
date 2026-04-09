import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { slug } = await params;
        await connect();

        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Fetch recent blogs (excluding the current one)
        const recentBlogs = await Blog.find({ _id: { $ne: blog._id } })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title slug image date category author");

        return NextResponse.json({ blog, recentBlogs });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}
