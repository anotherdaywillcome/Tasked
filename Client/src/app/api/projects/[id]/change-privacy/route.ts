import { NextRequest, NextResponse } from "next/server";

import { delay } from "@shared/lib/utils";

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
	await delay(6000);

	return NextResponse.json(null, { status: 204 });
};
