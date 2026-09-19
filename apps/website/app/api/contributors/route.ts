import { getContributors } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const contributors = await getContributors();
		return NextResponse.json(contributors);
	} catch (error) {
		console.error("Error in /api/contributors:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
