import cloudinary, { deleteFromCloudinary } from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Course from "@/lib/db/models/Courses";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const course = await Course.findById(id);
        if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
        return NextResponse.json(course);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const course = await Course.findById(id);
        if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

        // Delete from Cloudinary if image exists
        if (course.image) {
            await deleteFromCloudinary(course.image);
        }

        await Course.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const course = await Course.findById(id);
        if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

        const formData = await req.formData();
        const title = formData.get("title");
        const smallDescription = formData.get("smallDescription");
        const content = formData.get("content");
        const imageFile = formData.get("image");

        let imageUrl = course.image;

        if (imageFile && imageFile.size > 0) {
            // Delete old image from Cloudinary
            if (course.image) {
                await deleteFromCloudinary(course.image);
            }

            // Upload new image
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "Praxis/Courses", resource_type: "auto" },
                    (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                ).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, {
            title: title || course.title,
            smallDescription: smallDescription || course.smallDescription,
            content: content || course.content,
            image: imageUrl,
            slug: title 
                ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                : course.slug
        }, { new: true });

        return NextResponse.json(updatedCourse);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
