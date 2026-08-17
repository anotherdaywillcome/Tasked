import { Suspense } from "react";

import { FeaturedClients } from "@widgets/featured-clients";

import { Login } from "@features/login";

import { AvatarStackSkeleton, Divider, GradientBorder, GradientText } from "@shared/ui";

const LoginPage = () => {
	return (
		<section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[1.5rem] p-[1.5rem] backdrop-blur-[2.5rem] bg-[rgba(1,0,9,0.6)]">
			<h1 className="sr-only">Sign in to existing account</h1>
			<div className="grid grid-cols-[26.25rem_21.25rem] gap-[3rem]">
				<div className="relative">
					<p className="font-(family-name:--font-barlow) font-bold leading-[normal] text-[3rem] tracking-[0.01em] text-(--white-pallete-100)">
						<span>Welcome Back</span>
						<GradientText className="font-(family-name:--font-barlow)! font-bold! text-[3rem]! tracking-[0.01em]! cursor-text">
							Dear Friend
						</GradientText>
					</p>
					<p className="font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[1rem] tracking-[0.01em] text-(--white-pallete-100) mt-[0.875rem]">
						We take pride in offering unparalleled customer support to ensure your experience with our
						platforms
					</p>
					<Suspense fallback={<AvatarStackSkeleton />}>
						<FeaturedClients />
					</Suspense>
					<Divider className="absolute bottom-0 left-0" />
				</div>
				<Login />
			</div>
			<GradientBorder />
		</section>
	);
};

export default LoginPage;
