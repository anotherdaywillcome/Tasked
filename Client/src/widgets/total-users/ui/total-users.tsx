import { clsx } from "clsx";

import { Icon, ICON_TYPES } from "@shared/ui";

type TotalUsers = {
	total: number;
	delta: number;
	period: string;
};

const getTotalUsers = async (): Promise<TotalUsers> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				total: 21,
				delta: 4,
				period: "last 7 days"
			});
		}, 6000);
	});
};

export const TotalUsers = async () => {
	const { total, delta, period } = await getTotalUsers();

	const isIncrease = delta > 0;
	const formattedDelta = new Intl.NumberFormat("en", {
		signDisplay: "always"
	}).format(delta);

	return (
		<section className="border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1.25rem] bg-(--geek-blue-primary-opacity-100) p-[0.75rem] h-full">
			<header className="flex items-center gap-x-[0.5rem]">
				<h2 className="font-(family-name:--font-barlow) font-bold text-[0.625rem] leading-[140%] tracking-[0.01em] text-(--neutrals-3) uppercase">
					Total Tasks
				</h2>
				<p
					className={clsx(
						"flex items-center gap-x-[0.125rem]",
						isIncrease ? "text-(--green-50)" : "text-(--volcano-1000)"
					)}
				>
					<Icon
						className={clsx(isIncrease ? "-rotate-90" : "rotate-90")}
						size={14}
						type={ICON_TYPES.Chevron}
					/>
					<span
						className={clsx(
							"font-(family-name:--font-barlow) font-bold text-[0.625rem] leading-[140%] tracking-[0.01em] uppercase",
							isIncrease ? "text-(--green-50)" : "text-(--volcano-1000)"
						)}
						aria-label={`${Math.abs(delta)} tasks ${delta > 0 ? "added" : "removed"} during ${period}`}
					>
						{formattedDelta}
					</span>
				</p>
			</header>
			<p className="font-(family-name:--font-barlow) font-bold text-[1.5rem] leading-[125%] tracking-[0.01em] text-(--white-pallete-100) mt-[0.5rem]">
				{total}
			</p>
		</section>
	);
};

// TODO
// After Main page
// DropDown
// Select
// Switch
// Scroll when overflow
// Sidebar
// Fix Grid
// Add missing pages
// All widgets must be responsive
// Lets start in sidebar must be aside !