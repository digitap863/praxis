import cloudinary, { deleteFromCloudinary } from "@/lib/cloudinary";
import connect from "@/lib/db/connection";
import Team from "@/lib/db/models/Team";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const teamMember = await Team.findById(id);
        if (!teamMember) return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        return NextResponse.json(teamMember);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const teamMember = await Team.findById(id);
        if (!teamMember) return NextResponse.json({ error: "Team member not found" }, { status: 404 });

        // Delete from Cloudinary if image exists
        if (teamMember.image) {
            await deleteFromCloudinary(teamMember.image);
        }

        await Team.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        await connect();
        const teamMember = await Team.findById(id);
        if (!teamMember) return NextResponse.json({ error: "Team member not found" }, { status: 404 });

        const formData = await req.formData();
        const name = formData.get("name");
        const position = formData.get("position");
        const description = formData.get("description");
        const imageFile = formData.get("image");

        let imageUrl = teamMember.image;

        if (imageFile && imageFile.size > 0) {
            // Delete old image from Cloudinary
            if (teamMember.image) {
                await deleteFromCloudinary(teamMember.image);
            }

            // Upload new image
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "Praxis/Team", resource_type: "auto" },
                    (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    }
                ).end(buffer);
            });
            imageUrl = uploadRes.secure_url;
        }

        const updatedTeamMember = await Team.findByIdAndUpdate(id, {
            name: name || teamMember.name,
            position: position || teamMember.position,
            description: description || teamMember.description,
            image: imageUrl,
        }, { new: true });

        return NextResponse.json(updatedTeamMember);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
