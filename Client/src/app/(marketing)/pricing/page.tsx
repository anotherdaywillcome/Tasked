"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

// export const metadata: Metadata = {
// 	title: "Pricing | Tasked",
// 	description: "Compare Tasked plans for individuals, delivery teams, and larger organizations."
// };
import { ROUTES } from "@shared/config";

const PLANS = [
	{
		name: "Starter",
		price: "$0",
		period: "forever",
		fit: "For solo operators and small internal experiments.",
		features: ["3 active projects", "Core dashboard widgets", "Basic assignments", "Community support"],
		cta: "Start for free",
		featured: false
	},
	{
		name: "Team",
		price: "$12",
		period: "per users / month",
		fit: "For teams coordinating active projects delivery.",
		features: ["Unlimited projects", "Resizable dashboards", "Private projects", "Priority support"],
		cta: "Choose Team",
		featured: true
	},
	{
		name: "Scale",
		price: "$29",
		period: "per users / month",
		fit: "For larger teams that need stronger controls.",
		features: ["Everything in Team", "Advanced assignments", "Workspace-level privacy", "Guided onboarding"],
		cta: "Choose Scale",
		featured: false
	}
] as const;

const COMPARISON = [
	["Active projects", "3", "Unlimited", "Unlimited"],
	["Dashboard widgets", "Core set", "Resizable", "Resizable + reporting"],
	["Team assignments", "Basic", "Included", "Advanced"],
	["Project privacy", "Standard", "Private projects", "Private workspaces"],
	["Support", "Community", "Priority", "Priority + onboarding"]
] as const;

const INCLUDED = [
	{
		title: "Private notepad",
		description: "A personal writing space inside your workspace."
	},
	{
		title: "Priority labels",
		description: "Consistent urgency signals across every task."
	},
	{
		title: "Today view",
		description: "A focused view of what is due right now."
	},
	{
		title: "Overdue view",
		description: "Immediate visibility into work that needs recovery."
	}
] as const;

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
};

const Reveal = ({ children, className, delay = 0 }: Readonly<RevealProps>) => {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y: 24 }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ once: true, margin: "-80px" }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{children}
		</motion.div>
	);
};

const ArrowIcon = () => (
	<svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
		<path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const CheckIcon = () => (
	<svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
		<path
			d="m3 7.2 2.3 2.3L11 4"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.4"
		/>
	</svg>
);

const SparkIcon = () => (
	<svg aria-hidden="true" fill="none" height="15" viewBox="0 0 15 15" width="15">
		<path
			d="M7.5 1.5c.4 3.4 2.2 5.2 5.6 5.6-3.4.4-5.2 2.2-5.6 5.6-.4-3.4-2.2-5.2-5.6-5.6 3.4-.4 5.2-2.2 5.6-5.6Z"
			stroke="currentColor"
			strokeLinejoin="round"
		/>
	</svg>
);

const PricingPage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
	const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.95], [1, reduceMotion ? 1 : 0.3]);

	return (
		<div className="relative isolate overflow-x-clip font-(family-name:--font-barlow) text-white">
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 top-[-8rem] -z-30 bg-[#05040c]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-20 h-[64rem] bg-[radial-gradient(circle_at_50%_-8%,rgba(105,78,242,0.28),transparent_43%),radial-gradient(circle_at_88%_25%,rgba(53,116,255,0.09),transparent_28%),linear-gradient(to_bottom,#0c0920_0%,#080617_48%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 h-[55rem] opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
				aria-hidden="true"
			/>

			<section
				className="px-[1.25rem] pb-[6rem] pt-[3.25rem] sm:px-[2rem] md:pt-[5rem]"
				ref={heroRef}
				aria-labelledby="pricing-title"
			>
				<motion.div className="mx-auto max-w-[70rem]" style={{ y: heroY, opacity: heroOpacity }}>
					<div className="mx-auto max-w-[50rem] text-center">
						<motion.div
							className="mb-[1.5rem] inline-flex items-center gap-[0.5rem] rounded-full border border-white/[0.09] bg-white/[0.045] px-[0.75rem] py-[0.4375rem] text-[0.625rem] font-semibold tracking-[0.12em] text-white/60 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
							initial={reduceMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<span className="size-[0.375rem] rounded-full bg-[#9e8dff] shadow-[0_0_12px_#8a75ff]" />
							Simple monthly pricing
						</motion.div>
						<motion.h1
							className="text-balance text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.5rem] md:text-[5.5rem]"
							id="pricing-title"
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
						>
							Start free. Scale when{" "}
							<span className="bg-gradient-to-r from-[#b7aaff] via-[#929eff] to-[#78c7ff] bg-clip-text text-transparent">
								your team is ready.
							</span>
						</motion.h1>
						<motion.p
							className="mx-auto mt-[1.75rem] max-w-[37rem] text-balance text-[1rem] leading-[1.7] text-white/55 md:text-[1.125rem]"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
						>
							Three plans for three stages of coordination. Begin with the essentials, then add project
							capacity and stronger controls as the team grows.
						</motion.p>
						<motion.div
							className="mt-[1.75rem] inline-flex items-center gap-[0.55rem] rounded-full border border-white/[0.075] bg-white/[0.025] px-[0.75rem] py-[0.45rem] text-[0.5625rem] text-white/35 backdrop-blur-xl"
							initial={reduceMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.28 }}
						>
							<span className="text-[#9487ef]">
								<SparkIcon />
							</span>
							Prices shown in USD · billed monthly
						</motion.div>
					</div>

					<div className="mt-[4rem] grid gap-[0.75rem] lg:grid-cols-3" aria-labelledby="plans-title">
						<h2 className="sr-only" id="plans-title">
							Choose a Tasked plan
						</h2>
						{PLANS.map(({ name, price, period, fit, features, cta, featured }, index) => (
							<motion.article
								className={clsx(
									"group relative flex min-h-[31rem] flex-col overflow-hidden rounded-[1.25rem] border p-[1.35rem] backdrop-blur-2xl transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-[0.1875rem]",
									featured
										? "border-[#9382fb]/35 bg-gradient-to-b from-[#1b1632]/95 to-[#0d0b17]/95 shadow-[0_28px_70px_rgba(45,28,116,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#a697ff]/50"
										: "border-white/[0.08] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] hover:border-white/[0.14] hover:bg-white/[0.04]"
								)}
								initial={reduceMotion ? false : { opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.35 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
								key={name}
							>
								{featured && (
									<>
										<div className="absolute -right-[4rem] -top-[4rem] size-[13rem] rounded-full bg-[#725ce7]/25 blur-[4.5rem]" />
										<div className="absolute inset-x-[1.25rem] top-0 h-px bg-gradient-to-r from-transparent via-[#b0a4ff]/70 to-transparent" />
									</>
								)}
								<header className="relative flex min-h-[3rem] items-start justify-between gap-[1rem]">
									<div>
										<p className="text-[0.5625rem] font-semibold tracking-[0.13em] text-white/28 uppercase">
											Plan {index + 1}
										</p>
										<h3 className="mt-[0.4rem] text-[1.125rem] font-semibold tracking-[-0.02em] text-white/90">
											{name}
										</h3>
									</div>
									{featured && (
										<span className="rounded-full border border-[#9988f5]/20 bg-[#8a76ef]/15 px-[0.6rem] py-[0.3rem] text-[0.5rem] font-semibold tracking-[0.08em] text-[#b3a9f8] uppercase">
											Most popular
										</span>
									)}
								</header>

								<div className="relative mt-[2rem] flex items-end gap-[0.5rem]">
									<p className="text-[3.75rem] font-semibold leading-none tracking-[-0.055em] text-white">
										{price}
									</p>
									<p className="mb-[0.4rem] max-w-[5.5rem] text-[0.5625rem] leading-[1.35] text-white/28">
										{period}
									</p>
								</div>
								<p className="relative mt-[1.25rem] min-h-[2.7rem] text-[0.8125rem] leading-[1.65] text-white/42">
									{fit}
								</p>

								<div className="relative my-[1.5rem] h-px bg-white/[0.07]" />
								<p className="relative text-[0.5625rem] font-semibold tracking-[0.1em] text-white/25 uppercase">
									What you get
								</p>
								<ul className="relative mt-[1rem] space-y-[0.75rem]">
									{features.map((feature) => (
										<li
											className="flex items-center gap-[0.65rem] text-[0.75rem] text-white/52"
											key={feature}
										>
											<span
												className={clsx(
													"grid size-[1.1rem] shrink-0 place-items-center rounded-full",
													featured
														? "bg-[#8b78f0]/18 text-[#afa4f7]"
														: "bg-white/[0.055] text-white/35"
												)}
											>
												<CheckIcon />
											</span>
											{feature}
										</li>
									))}
								</ul>

								<Link
									className={clsx(
										"relative mt-auto flex items-center justify-center gap-[0.5rem] rounded-[0.625rem] px-[1rem] py-[0.7rem] text-[0.8125rem] font-semibold transition-[background-color,border-color,color,box-shadow,transform] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0914]",
										featured
											? "bg-white text-[#0a0812] shadow-[0_8px_28px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_34px_rgba(255,255,255,0.16)]"
											: "border border-white/[0.1] bg-white/[0.035] text-white/70 hover:border-white/[0.17] hover:bg-white/[0.065] hover:text-white"
									)}
									href={ROUTES.Registration}
								>
									{cta}
									<ArrowIcon />
								</Link>
							</motion.article>
						))}
					</div>
				</motion.div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="comparison-title">
				<div className="mx-auto grid max-w-[70rem] gap-[3rem] lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-[5rem]">
					<Reveal>
						<div className="lg:sticky lg:top-[3rem]">
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								Plan comparison
							</p>
							<h2
								className="mt-[0.875rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="comparison-title"
							>
								See exactly what changes.
							</h2>
							<p className="mt-[1.25rem] max-w-[18rem] text-[0.875rem] leading-[1.7] text-white/42">
								The core experience stays familiar. Capacity, controls, and support expand with each
								plan.
							</p>
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<div className="overflow-x-auto rounded-[1.125rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
							<table className="w-full min-w-[43rem] border-collapse text-left">
								<thead>
									<tr className="border-b border-white/[0.08]">
										<th
											className="w-[29%] p-[1rem] text-[0.5625rem] font-semibold tracking-[0.11em] text-white/24 uppercase"
											scope="col"
										>
											Capability
										</th>
										{PLANS.map(({ name, featured }) => (
											<th
												className={clsx(
													"p-[1rem] text-[0.6875rem] font-semibold text-white/60",
													featured && "bg-[#8775ed]/[0.055] text-[#aea3f7]"
												)}
												scope="col"
												key={name}
											>
												<div className="flex items-center gap-[0.45rem]">
													{featured && (
														<span className="size-[0.35rem] rounded-full bg-[#9b8df4] shadow-[0_0_8px_#8b7bea]" />
													)}
													{name}
												</div>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{COMPARISON.map(([capability, starter, team, scale]) => (
										<tr className="border-b border-white/[0.065] last:border-b-0" key={capability}>
											<th
												className="p-[1rem] text-[0.6875rem] font-medium text-white/48"
												scope="row"
											>
												{capability}
											</th>
											{[starter, team, scale].map((value, index) => (
												<td
													className={clsx(
														"p-[1rem] text-[0.6875rem] leading-[1.5] text-white/34",
														index === 1 && "bg-[#8775ed]/[0.055] text-white/52"
													)}
													key={value}
												>
													{value}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<p className="mt-[0.75rem] text-right text-[0.5rem] text-white/20">
							Scroll horizontally to compare on smaller screens.
						</p>
					</Reveal>
				</div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="included-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="flex flex-col justify-between gap-[1.5rem] md:flex-row md:items-end">
						<div>
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								Included from day one
							</p>
							<h2
								className="mt-[0.875rem] max-w-[38rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="included-title"
							>
								The daily essentials are never an add-on.
							</h2>
						</div>
						<p className="max-w-[19rem] text-[0.8125rem] leading-[1.65] text-white/40">
							Every plan starts with the same practical foundation.
						</p>
					</Reveal>
					<div className="mt-[3rem] grid gap-[0.65rem] sm:grid-cols-2 lg:grid-cols-4">
						{INCLUDED.map(({ title, description }, index) => (
							<Reveal delay={index * 0.06} key={title}>
								<article className="group relative min-h-[12rem] overflow-hidden rounded-[1rem] border border-white/[0.075] bg-white/[0.022] p-[1.2rem] backdrop-blur-xl transition-[border-color,background-color,transform] hover:-translate-y-[0.15rem] hover:border-white/[0.13] hover:bg-white/[0.04]">
									<div className="flex items-center justify-between">
										<span className="grid size-[1.5rem] place-items-center rounded-full bg-[#8875ee]/12 text-[#a89bf5]">
											<CheckIcon />
										</span>
										<span className="text-[0.5rem] font-semibold tracking-[0.1em] text-white/14">
											0{index + 1}
										</span>
									</div>
									<h3 className="mt-[2.2rem] text-[0.9375rem] font-semibold text-white/78">
										{title}
									</h3>
									<p className="mt-[0.5rem] text-[0.6875rem] leading-[1.6] text-white/32">
										{description}
									</p>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section
				className="px-[1.25rem] pb-[5rem] pt-[3rem] sm:px-[2rem] md:pb-[7rem]"
				aria-labelledby="pricing-cta-title"
			>
				<Reveal className="mx-auto max-w-[70rem]">
					<div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.035] px-[1.5rem] py-[4rem] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl md:px-[3rem] md:py-[5rem]">
						<div
							className="absolute left-1/2 top-0 -z-10 h-[15rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6e55ef]/25 blur-[5rem]"
							aria-hidden="true"
						/>
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#aa9fff] uppercase">
							No decision required today
						</p>
						<h2
							className="mx-auto mt-[1rem] max-w-[39rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]"
							id="pricing-cta-title"
						>
							Start on Starter. Upgrade when the work asks for it.
						</h2>
						<p className="mx-auto mt-[1.25rem] max-w-[29rem] text-[0.875rem] leading-[1.65] text-white/45">
							Create a workspace for free and choose a paid plan when your team needs more capacity or
							control.
						</p>
						<Link
							className="group mt-[2rem] inline-flex items-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0915]"
							href={ROUTES.Registration}
						>
							Start for free
							<span className="transition-transform group-hover:translate-x-[0.125rem]">
								<ArrowIcon />
							</span>
						</Link>
					</div>
				</Reveal>
			</section>
		</div>
	);
};

export default PricingPage;
