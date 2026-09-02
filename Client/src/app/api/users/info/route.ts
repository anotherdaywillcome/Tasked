import { NextResponse } from "next/server";

import { GetUserInfoResponse } from "@entities/users";

import { delay } from "@shared/lib/utils";

const mockData: GetUserInfoResponse = {
	id: "3296137b-2f7a-4b1a-819f-b5e6df7ccd19",
	fullName: "Di Smolskii",
	role: "Product Designer",
	imageUrl: "/images/users/di_smolskii.png"
};

export const GET = async () => {
	await delay(6000);

	// const users = await getUserInfo();
	// return NextResponse.json(userInfoAdapter(users));

	return NextResponse.json(mockData);
};
