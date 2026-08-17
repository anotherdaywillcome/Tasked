import { Suspense } from "react";

import { FeaturedClients } from "@widgets/featured-clients";

import { Registration } from "@features/register";

import { AvatarStackSkeleton, Divider, GradientBorder, GradientText } from "@shared/ui";

const RegistrationPage = () => {
	return (
		<section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[1.5rem] p-[1.5rem] backdrop-blur-[2.5rem] bg-[rgba(1,0,9,0.6)] max-lg:relative max-lg:top-[unset] max-lg:left-[unset] max-lg:translate-x-[unset] max-lg:translate-y-[unset] max-lg:w-[min(100%_-_2rem,62rem)] max-lg:mx-auto max-lg:my-[1.5rem] max-lg:p-[clamp(1rem,2vw,1.25rem)] max-md:w-[min(100%_-_1.25rem,48rem)] max-sm:w-[calc(100%_-_1rem)] max-sm:my-[1rem] max-sm:rounded-[1rem] max-sm:p-[1rem]">
			<h1 className="sr-only">Create new account</h1>
			<div className="grid grid-cols-[26.25rem_21.25rem] gap-[3rem] max-lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] max-lg:gap-[clamp(1rem,2.6vw,2rem)] max-md:grid-cols-1 max-md:gap-[2rem]">
				<div className="relative">
					<p className="font-(family-name:--font-barlow) font-bold leading-[normal] text-[3rem] tracking-[0.01em] text-(--white-pallete-100) max-lg:text-[clamp(2rem,4.2vw,2.5rem)] max-sm:text-[1.75rem]">
						<span>Join Over 2568+</span>
						<GradientText className="font-(family-name:--font-barlow)! font-bold! text-[3rem]! tracking-[0.01em]! cursor-text max-lg:text-[clamp(2rem,4.2vw,2.5rem)]! max-sm:text-[1.75rem]!">
							Expert Designers
						</GradientText>
					</p>
					<p className="mt-[0.875rem] max-w-[34rem] font-(family-name:--font-barlow) font-medium text-[0.75rem] leading-[1rem] tracking-[0.01em] text-(--white-pallete-100) max-sm:text-[0.6875rem] max-sm:leading-[0.9375rem]">
						We take pride in offering unparalleled customer support to ensure your experience with our
						platforms
					</p>
					<Suspense fallback={<AvatarStackSkeleton />}>
						<FeaturedClients />
					</Suspense>
					<Divider className="absolute bottom-0 left-0 max-md:relative max-md:mt-[1rem]" />
				</div>
				<div className="max-lg:w-full">
					<Registration />
				</div>
			</div>
			<GradientBorder />
		</section>
	);
};

export default RegistrationPage;
