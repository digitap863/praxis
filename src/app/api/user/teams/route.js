import connect from "@/lib/db/connection";
import Team from "@/lib/db/models/Team";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const teams = await Team.find().sort({ createdAt: -1 });

        return NextResponse.json(teams);
    } catch (error) {
        console.error("Error in fetching teams:", error);
        return new NextResponse("Error in fetching teams", { status: 500 });
    }
}
