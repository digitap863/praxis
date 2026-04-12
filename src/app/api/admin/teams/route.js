import cloudinary from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Team from "@/lib/db/models/Team";
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
            query.name = { $regex: search, $options: "i" };
        }

        const total = await Team.countDocuments(query);
        const teams = await Team.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            teams,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("Error in fetching teams:", error);
        return new NextResponse("Error in fetching teams", { status: 400 });
    }
}

export async function POST(req) {
    try {
        await connect();
        const formData = await req.formData();
        
        const name = formData.get("name");
        const position = formData.get("position");
        const description = formData.get("description");
        const file = formData.get("image");

        if (!name || !file) {
            return NextResponse.json({ message: "Name and image are required" }, { status: 400 });
        }

        let imageUrl = "";
        if (file && typeof file !== "string") {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Praxis/Team", resource_type: "auto" },
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

        const teamMember = await Team.create({
            name,
            position: position || "Praxis Team",
            description,
            image: imageUrl,
        });

        return NextResponse.json(teamMember, { status: 201 });
    } catch (error) {
        console.error("Error in adding team member:", error);
        return new NextResponse("Error in adding team member", { status: 400 });
    }
}
