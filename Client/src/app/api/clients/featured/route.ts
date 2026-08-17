import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { GetFeaturedClientsResponse } from "@entities/users";

import { delay } from "@shared/lib/utils";

const mockData: GetFeaturedClientsResponse = [
	{ imageUrl: "/images/users/jensen_ackles.jpg", fullName: "Jensen Ackles" },
	{ imageUrl: "/images/users/jared_padalecki.jpg", fullName: "Jared Padalecki" },
	{ imageUrl: "/images/users/robert_palka.jpg", fullName: "Robert Palka" },
	{ imageUrl: "/images/users/bartozs_zmarzlik.jpg", fullName: "Bartozs Zmarzlik" },
	{ imageUrl: "/images/users/rupert_grind.jpg", fullName: "Rupert Grind" },
	{ imageUrl: "/images/users/john_block.jpg", fullName: "John Block" }
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
