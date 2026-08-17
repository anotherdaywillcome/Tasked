import { NextResponse } from "next/server";

import { GetUserInfoResponse } from "@entities/users";

import { delay } from "@shared/lib/utils";

const mockData: GetUserInfoResponse = {
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
