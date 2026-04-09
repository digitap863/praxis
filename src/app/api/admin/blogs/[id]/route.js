import cloudinary, { deleteFromCloudinary } from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Blog from "@/lib/db/models/Blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        // Delete from Cloudinary if image exists
        if (blog.image) {
            await deleteFromCloudinary(blog.image);
        }

        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

        const formData = await req.formData();
        const title = formData.get("title");
        const author = formData.get("author");
        const date = formData.get("date");
        const category = formData.get("category");
        const tags = formData.get("tags");
        const contentStr = formData.get("content");
        const imageFile = formData.get("image");

        let imageUrl = blog.image;

        if (imageFile && imageFile.size > 0) {
            // Delete old image from Cloudinary
            if (blog.image) {
                await deleteFromCloudinary(blog.image);
            }

            // Upload new image
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "Praxis/Blogs", resource_type: "auto" },
                    (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                ).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
        }

        const tagsArray = tags ? tags.split(",").map(t => t.trim()).filter(t => t) : blog.tags;
        const content = contentStr ?? blog.content;

        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title: title || blog.title,
            author: author || blog.author,
            date: date || blog.date,
            category: category || blog.category,
            image: imageUrl,
            tags: tagsArray,
            content,
            slug: title
                ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                : blog.slug
        }, { new: true });

        return NextResponse.json(updatedBlog);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
