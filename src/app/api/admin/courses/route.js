import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Course from "@/lib/db/models/Courses";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);

        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const query = {};
        
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const total = await Course.countDocuments(query);
        const courses = await Course.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            courses,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching courses:", error);
        return new NextResponse("Error in fetching courses", { status: 400 });
    }
}

export async function POST(req) {
    try {
        await connect();
        const formData = await req.formData();
        
        const title = formData.get("title");
        const smallDescription = formData.get("smallDescription");
        const content = formData.get("content");
        const file = formData.get("image");

        if (!title || !file) {
            return NextResponse.json({ message: "Title and image are required" }, { status: 400 });
        }

        // Generate Slug
        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const existing = await Course.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        let imageUrl = "";
        if (file && typeof file !== "string") {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Praxis/Courses", resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error("Upload failed"));
                    }
                );
                uploadStream.end(buffer);
            });
            imageUrl = uploadResult.secure_url;
        }

        const course = await Course.create({
            title,
            slug,
            smallDescription: smallDescription || "General",
            content,
            image: imageUrl,
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Error in adding course:", error);
        return new NextResponse("Error in adding course", { status: 400 });
    }
}
