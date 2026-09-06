import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { GetFeaturedClientsResponse } from "@entities/users";

import { delay } from "@shared/lib/utils";

const mockData: GetFeaturedClientsResponse = [
	{
		id: "7f3c9e21-4a6b-4d82-9f15-2b8e7c1a6d30",
		imageUrl: "/images/users/jensen_ackles.jpg",
		fullName: "Jensen Ackles",
		role: "Administrator"
	},
	{
		id: "c2a81f54-93d7-4b6e-a120-5f9c3d7e8421",
		imageUrl: "/images/users/jared_padalecki.jpg",
		fullName: "Jared Padalecki",
		role: "Project Manager"
	},
	{
		id: "e6b4d219-7c53-48af-91e2-3a8d6f5b0274",
		imageUrl: "/images/users/robert_palka.jpg",
		fullName: "Robert Palka",
		role: "Developer"
	},
	{
		id: "1a9f6c42-d875-4e31-b207-8c5d9a3f614e",
		imageUrl: "/images/users/bartozs_zmarzlik.jpg",
		fullName: "Bartozs Zmarzlik",
		role: "Product Owner"
	},
	{
		id: "b7d2e845-16fa-4c93-a581-6e0f3d9b724c",
		imageUrl: "/images/users/rupert_grind.jpg",
		fullName: "Rupert Grind",
		role: "QA Engineer"
	},
	{
		id: "4e8a2c71-f935-46bd-9d20-7b1f5a638c04",
		imageUrl: "/images/users/john_block.jpg",
		fullName: "John Block",
		role: "UX Designer"
	}
];

const limitParamSchema = z.coerce
	.number("Limit parameter must be a number")
	.int("Limit parameter must be a valid integer")
	.positive("Limit must be positive")
	.default(mockData.length);

const getLimitParam = (request: NextRequest) => {
	const limit = request.nextUrl.searchParams.get("limit") ?? undefined;

	return limitParamSchema.safeParse(limit);
};

export const GET = async (request: NextRequest) => {
	await delay(6000);

	const limitParamValidationResult = getLimitParam(request);

	if (!limitParamValidationResult.success) {
		return NextResponse.json(
			{
				message: "Invalid limit parameter",
				errors: z.treeifyError(limitParamValidationResult.error)
			},
			{ status: 400 }
		);
	}

	const limit = limitParamValidationResult.data;

	// const clients = await getFeaturedClients({ limit });
	// return NextResponse.json(featuredClientsAdapter(clients));

	return NextResponse.json(mockData.slice(0, limit));
};
