"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

import { ROUTES } from "@shared/config";

// export const metadata: Metadata = {
// 	title: "About | Tasked",
// 	description: "Learn why Tasked exists and how it helps teams keep projects, tasks, people, and progress aligned."
// };

const BELIEFS = [
	{
		number: "01",
		title: "Clarity over complexity",
		description: "The next step should be obvious. We remove the layers that make simple work feel complicated.",
		accent: "from-[#8b7bff]/25 via-[#8b7bff]/5 to-transparent"
	},
	{
		number: "02",
		title: "Context stays close",
		description: "Decisions, owners, and progress live beside the work—so no one has to reconstruct the story.",
		accent: "from-[#4aa8ff]/20 via-[#4aa8ff]/5 to-transparent"
	},
	{
		number: "03",
		title: "Calm creates momentum",
		description: "Good software lowers the noise floor and gives thoughtful teams more room to do their best work.",
		accent: "from-[#c879ff]/20 via-[#c879ff]/5 to-transparent"
	}
] as const;

const RHYTHM = [
	{ label: "Plan", description: "Shape the work and make the outcome clear." },
	{ label: "Assign", description: "Put ownership where everyone can see it." },
	{ label: "Review", description: "Read the signals before priorities drift." },
	{ label: "Move", description: "Turn shared context into steady progress." }
] as const;

const METRICS = [
	["Active projects", "12", "+2 this week"],
	["Tasks completed", "84%", "+8.4%"],
	["Team focus", "High", "On track"]
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

const WorkSurface = () => {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className="relative mx-auto mt-[4rem] max-w-[62rem]"
			initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
		>
			<div className="absolute -inset-[1px] rounded-[1.5rem] bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
			<div className="relative overflow-hidden rounded-[1.5rem] bg-[#090814]/90 shadow-[0_32px_100px_rgba(0,0,0,0.55),0_0_80px_rgba(82,61,255,0.11)] backdrop-blur-2xl">
				<div className="flex h-[2.75rem] items-center justify-between border-b border-white/[0.07] px-[1rem] md:px-[1.25rem]">
					<div className="flex items-center gap-[0.375rem]" aria-hidden="true">
						<span className="size-[0.5rem] rounded-full bg-white/20" />
						<span className="size-[0.5rem] rounded-full bg-white/10" />
						<span className="size-[0.5rem] rounded-full bg-white/10" />
					</div>
					<p className="text-[0.625rem] font-medium tracking-[0.12em] text-white/35 uppercase">
						Product workspace
					</p>
					<span className="flex size-[1.5rem] items-center justify-center rounded-full bg-gradient-to-br from-[#9281ff] to-[#3f57dc] text-[0.5rem] font-bold text-white">
						AR
					</span>
				</div>

				<div className="grid md:grid-cols-[13rem_minmax(0,1fr)]">
					<aside className="hidden min-h-[26rem] border-r border-white/[0.07] p-[1rem] md:block">
						<div className="mb-[1.75rem] flex items-center gap-[0.625rem] px-[0.5rem]">
							<span className="grid size-[1.75rem] place-items-center rounded-[0.5rem] bg-gradient-to-br from-[#7f6cf6] to-[#3a50cc] shadow-[0_0_20px_rgba(108,91,255,0.3)]">
								<span className="size-[0.5rem] rotate-45 rounded-[0.1rem] bg-white" />
							</span>
							<span className="text-[0.75rem] font-semibold text-white/85">Tasked</span>
						</div>
						<nav aria-label="Workspace preview navigation" className="space-y-[0.375rem]">
							{["Overview", "Projects", "My tasks", "Messages"].map((item, index) => (
								<div
									className={clsx(
										"flex items-center gap-[0.625rem] rounded-[0.5rem] px-[0.625rem] py-[0.5rem] text-[0.6875rem]",
										index === 0 ? "bg-white/[0.07] text-white" : "text-white/35"
									)}
									key={item}
								>
									<span
										className={clsx(
											"size-[0.375rem] rounded-full",
											index === 0 ? "bg-[#8f7cff]" : "bg-white/20"
										)}
									/>
									{item}
								</div>
							))}
						</nav>
						<div className="mt-[8rem] rounded-[0.75rem] border border-white/[0.07] bg-white/[0.025] p-[0.75rem]">
							<div className="mb-[0.5rem] flex items-center justify-between text-[0.5625rem] text-white/35">
								<span>Weekly focus</span>
								<span>78%</span>
							</div>
							<div className="h-[0.1875rem] overflow-hidden rounded-full bg-white/[0.08]">
								<motion.div
									className="h-full rounded-full bg-gradient-to-r from-[#6757eb] to-[#a99cff]"
									initial={reduceMotion ? { width: "78%" } : { width: 0 }}
									animate={{ width: "78%" }}
									transition={{ duration: 1, delay: 1 }}
								/>
							</div>
						</div>
					</aside>

					<div className="min-w-0 p-[1rem] sm:p-[1.5rem] md:p-[1.75rem]">
						<div className="flex flex-col justify-between gap-[1rem] sm:flex-row sm:items-end">
							<div>
								<p className="mb-[0.375rem] text-[0.5625rem] tracking-[0.12em] text-[#9a8eff] uppercase">
									Monday, 20 July
								</p>
								<h2 className="text-[1.375rem] font-semibold tracking-[-0.02em] text-white">
									Good morning, Alex.
								</h2>
							</div>
							<div className="flex -space-x-[0.375rem]" aria-label="Three active teammates">
								{["EP", "JB", "SL"].map((initials) => (
									<span
										className="grid size-[1.75rem] place-items-center rounded-full border-2 border-[#090814] bg-[#181624] text-[0.5rem] font-semibold text-white/70"
										key={initials}
									>
										{initials}
									</span>
								))}
							</div>
						</div>

						<div className="mt-[1.5rem] grid gap-[0.75rem] sm:grid-cols-3">
							{METRICS.map(([label, value, note]) => (
								<div
									className="rounded-[0.75rem] border border-white/[0.07] bg-white/[0.025] p-[0.875rem]"
									key={label}
								>
									<p className="text-[0.5625rem] text-white/35">{label}</p>
									<div className="mt-[0.5rem] flex items-end justify-between gap-[0.5rem]">
										<strong className="text-[1.125rem] font-semibold text-white/90">{value}</strong>
										<span className="text-[0.5rem] text-[#9e92ff]">{note}</span>
									</div>
								</div>
							))}
						</div>

						<div className="mt-[0.75rem] grid gap-[0.75rem] lg:grid-cols-[minmax(0,1.25fr)_minmax(10rem,0.75fr)]">
							<div className="rounded-[0.875rem] border border-white/[0.07] bg-white/[0.025] p-[1rem]">
								<div className="flex items-center justify-between">
									<p className="text-[0.6875rem] font-medium text-white/75">Momentum</p>
									<span className="text-[0.5rem] text-white/30">Last 7 days</span>
								</div>
								<div className="mt-[1.25rem] flex h-[5.75rem] items-end justify-between gap-[0.375rem] border-b border-white/[0.06]">
									{[34, 48, 41, 68, 58, 78, 92, 84, 100, 87, 94, 88].map((height, index) => (
										<motion.span
											className="w-full max-w-[0.75rem] rounded-t-[0.2rem] bg-gradient-to-t from-[#5040c8]/45 to-[#9b8cff]"
											initial={reduceMotion ? { height } : { height: 0 }}
											animate={{ height }}
											transition={{
												duration: 0.55,
												delay: 0.7 + index * 0.04,
												ease: [0.22, 1, 0.36, 1]
											}}
											key={index}
										/>
									))}
								</div>
							</div>
							<div className="rounded-[0.875rem] border border-white/[0.07] bg-white/[0.025] p-[1rem]">
								<p className="text-[0.6875rem] font-medium text-white/75">Today</p>
								<ul className="mt-[0.875rem] space-y-[0.75rem]">
									{["Review launch plan", "Confirm projects owners", "Share weekly update"].map(
										(task, index) => (
											<li
												className="flex items-center gap-[0.5rem] text-[0.5625rem] text-white/45"
												key={task}
											>
												<span
													className={clsx(
														"grid size-[0.875rem] shrink-0 place-items-center rounded-[0.25rem]",
														index === 0
															? "bg-[#7666e7] text-white"
															: "border border-white/15 text-transparent"
													)}
												>
													<CheckIcon />
												</span>
												{task}
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const AboutPage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
	const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.25]);

	return (
		<div className="relative isolate overflow-x-clip font-(family-name:--font-barlow) text-white">
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 top-[-8rem] -z-30 bg-[#05040c]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-20 h-[63rem] bg-[radial-gradient(circle_at_50%_-10%,rgba(115,84,255,0.28),transparent_42%),radial-gradient(circle_at_12%_30%,rgba(40,88,255,0.12),transparent_30%),linear-gradient(to_bottom,#0c0920_0%,#080617_45%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 h-[54rem] opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
				aria-hidden="true"
			/>

			<section
				className="px-[1.25rem] pb-[6rem] pt-[3.25rem] sm:px-[2rem] md:pt-[5rem]"
				ref={heroRef}
				aria-labelledby="about-title"
			>
				<motion.div className="mx-auto max-w-[70rem]" style={{ y: heroY, opacity: heroOpacity }}>
					<div className="mx-auto max-w-[49rem] text-center">
						<motion.div
							className="mb-[1.5rem] inline-flex items-center gap-[0.5rem] rounded-full border border-white/[0.09] bg-white/[0.045] px-[0.75rem] py-[0.4375rem] text-[0.625rem] font-semibold tracking-[0.12em] text-white/60 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
							initial={reduceMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<span className="size-[0.375rem] rounded-full bg-[#9e8dff] shadow-[0_0_12px_#8a75ff]" />
							The thinking behind Tasked
						</motion.div>
						<motion.h1
							className="text-balance text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.5rem] md:text-[5.5rem]"
							id="about-title"
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
						>
							Work feels better when everyone can see{" "}
							<span className="bg-gradient-to-r from-[#b6aaff] via-[#8e9cff] to-[#80caff] bg-clip-text text-transparent">
								where it&apos;s going.
							</span>
						</motion.h1>
						<motion.p
							className="mx-auto mt-[1.75rem] max-w-[37rem] text-balance text-[1rem] font-normal leading-[1.7] text-white/55 md:text-[1.125rem]"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
						>
							Tasked brings projects, people, and progress into one calm operating view—so teams spend
							less time tracking work and more time moving it forward.
						</motion.p>
						<motion.div
							className="mt-[2rem] flex flex-col items-center justify-center gap-[0.75rem] sm:flex-row"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
						>
							<Link
								className="group flex w-full items-center justify-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-[transform,box-shadow] hover:-translate-y-[1px] hover:shadow-[0_10px_36px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05040c] sm:w-auto"
								href={ROUTES.Registration}
							>
								Start planning
								<span className="transition-transform group-hover:translate-x-[0.125rem]">
									<ArrowIcon />
								</span>
							</Link>
							<Link
								className="w-full rounded-[0.625rem] border border-white/[0.1] bg-white/[0.045] px-[1.125rem] py-[0.6875rem] text-center text-[0.8125rem] font-medium text-white/75 backdrop-blur-xl transition-[background-color,border-color,color] hover:border-white/[0.16] hover:bg-white/[0.075] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-auto"
								href={ROUTES.Features}
							>
								Explore the product
							</Link>
						</motion.div>
					</div>
					<WorkSurface />
				</motion.div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="beliefs-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="max-w-[37rem]">
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
							Our principles
						</p>
						<h2
							className="mt-[0.875rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
							id="beliefs-title"
						>
							Built around how great teams actually work.
						</h2>
					</Reveal>
					<div className="mt-[3rem] grid gap-[0.75rem] md:grid-cols-3">
						{BELIEFS.map(({ number, title, description, accent }, index) => (
							<Reveal delay={index * 0.08} key={title}>
								<article className="group relative min-h-[17rem] overflow-hidden rounded-[1.125rem] border border-white/[0.08] bg-white/[0.025] p-[1.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-xl transition-[border-color,transform,background-color] duration-300 hover:-translate-y-[0.1875rem] hover:border-white/[0.14] hover:bg-white/[0.04]">
									<div
										className={clsx(
											"absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-300 group-hover:opacity-70",
											accent
										)}
										aria-hidden="true"
									/>
									<div className="relative flex min-h-[14rem] flex-col">
										<div className="flex items-center justify-between">
											<span className="text-[0.625rem] font-semibold tracking-[0.12em] text-white/35">
												{number}
											</span>
											<span className="size-[0.4375rem] rounded-full bg-white/20 transition-colors group-hover:bg-[#9b8cff]" />
										</div>
										<div className="mt-auto">
											<h3 className="text-[1.25rem] font-semibold tracking-[-0.025em] text-white/90">
												{title}
											</h3>
											<p className="mt-[0.75rem] text-[0.875rem] leading-[1.65] text-white/45">
												{description}
											</p>
										</div>
									</div>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="mission-title">
				<div className="mx-auto grid max-w-[70rem] gap-[3rem] lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-center lg:gap-[6rem]">
					<Reveal>
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
							Why we&apos;re here
						</p>
						<h2
							className="mt-[1rem] max-w-[42rem] text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-[3.5rem]"
							id="mission-title"
						>
							The best work doesn&apos;t need more noise. It needs a shared sense of direction.
						</h2>
						<p className="mt-[1.5rem] max-w-[35rem] text-[0.9375rem] leading-[1.75] text-white/45">
							We built Tasked because growing teams shouldn&apos;t have to choose between speed and
							clarity. Every surface is designed to keep the work legible, the ownership visible, and the
							team in flow.
						</p>
					</Reveal>
					<Reveal delay={0.12}>
						<div className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-[1.5rem] backdrop-blur-xl">
							<div
								className="absolute -right-[3rem] -top-[3rem] size-[9rem] rounded-full bg-[#735cff]/20 blur-[3rem]"
								aria-hidden="true"
							/>
							<p className="relative text-[0.625rem] font-semibold tracking-[0.12em] text-white/35 uppercase">
								Our north star
							</p>
							<p className="relative mt-[2.5rem] text-[1.5rem] font-medium leading-[1.25] tracking-[-0.025em] text-white/90">
								Make progress feel lighter.
							</p>
							<div className="relative mt-[2.5rem] flex items-center gap-[0.75rem] border-t border-white/[0.07] pt-[1rem]">
								<span className="grid size-[2rem] place-items-center rounded-full bg-gradient-to-br from-[#8f7aff] to-[#354cbd] text-[0.5625rem] font-bold">
									T
								</span>
								<div>
									<p className="text-[0.6875rem] font-medium text-white/70">Team Tasked</p>
									<p className="mt-[0.125rem] text-[0.5625rem] text-white/30">
										Building for focused teams
									</p>
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="rhythm-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="flex flex-col justify-between gap-[1.5rem] md:flex-row md:items-end">
						<div>
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								A natural rhythm
							</p>
							<h2
								className="mt-[0.875rem] max-w-[38rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="rhythm-title"
							>
								From idea to impact, without the friction.
							</h2>
						</div>
						<p className="max-w-[18rem] text-[0.8125rem] leading-[1.65] text-white/40">
							A simple operating loop keeps the whole team aligned as the work changes.
						</p>
					</Reveal>
					<ol className="mt-[3.5rem] grid gap-[0.625rem] md:grid-cols-4">
						{RHYTHM.map(({ label, description }, index) => (
							<motion.li
								className="group relative overflow-hidden rounded-[0.875rem] border border-white/[0.075] bg-white/[0.02] p-[1.25rem]"
								initial={reduceMotion ? false : { opacity: 0, y: 20 }}
								transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
								viewport={{ once: true, margin: "-60px" }}
								whileInView={{ opacity: 1, y: 0 }}
								key={label}
							>
								<div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#8f7cff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
								<span className="text-[0.5625rem] font-semibold tracking-[0.12em] text-white/25">
									0{index + 1}
								</span>
								<h3 className="mt-[2.5rem] text-[1rem] font-semibold text-white/85">{label}</h3>
								<p className="mt-[0.5rem] text-[0.75rem] leading-[1.6] text-white/35">{description}</p>
							</motion.li>
						))}
					</ol>
				</div>
			</section>

			<section className="px-[1.25rem] pb-[5rem] pt-[3rem] sm:px-[2rem] md:pb-[7rem]" aria-labelledby="cta-title">
				<Reveal className="mx-auto max-w-[70rem]">
					<div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.035] px-[1.5rem] py-[4rem] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl md:px-[3rem] md:py-[5rem]">
						<div
							className="absolute left-1/2 top-0 -z-10 h-[15rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6e55ef]/25 blur-[5rem]"
							aria-hidden="true"
						/>
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#aa9fff] uppercase">
							Ready when you are
						</p>
						<h2
							className="mx-auto mt-[1rem] max-w-[37rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]"
							id="cta-title"
						>
							Give your team a clearer way forward.
						</h2>
						<p className="mx-auto mt-[1.25rem] max-w-[28rem] text-[0.875rem] leading-[1.65] text-white/45">
							One place for the work, the context, and the people moving it forward.
						</p>
						<Link
							className="group mt-[2rem] inline-flex items-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0915]"
							href={ROUTES.Registration}
						>
							Start planning for free
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

export default AboutPage;
