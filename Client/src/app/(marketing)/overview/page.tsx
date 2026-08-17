"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

// export const metadata: Metadata = {
// 	title: "Overview | Tasked",
// 	description:
// 		"See how Tasked connects the workspace-wide picture with focused projects views and clear task-level action."
// };
import { ROUTES } from "@shared/config";

const LAYERS = [
	{
		number: "01",
		eyebrow: "Workspace level",
		title: "Begin with the whole picture.",
		description:
			"Your workspace is the orientation layer: the active portfolio, the areas asking for attention, and the people carrying the work."
	},
	{
		number: "02",
		eyebrow: "Project level",
		title: "Step into the shared context.",
		description:
			"Each projects narrows the frame to one outcome, bringing its team, progress, views, and working decisions into focus."
	},
	{
		number: "03",
		eyebrow: "Task level",
		title: "Land on the next action.",
		description:
			"At the task level, the broad plan becomes something concrete: a clear piece of work with the context needed to finish it."
	}
] as const;

const CONNECTIONS = [
	{
		from: "Projects",
		to: "Tasks",
		description: "Project scope resolves into specific, trackable pieces of work."
	},
	{
		from: "Tasks",
		to: "Owners",
		description: "Responsibility stays attached as work changes hands or priority."
	},
	{
		from: "Owners",
		to: "Workspace",
		description: "Assignments become a readable view of where the team is focused."
	},
	{
		from: "Activity",
		to: "Signals",
		description: "Every update keeps the workspace-wide picture current."
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

const ChevronIcon = () => (
	<svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
		<path d="m4.5 2.5 3.5 3.5-3.5 3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const HeroMap = () => {
	const reduceMotion = useReducedMotion();
	const nodes = [
		{ label: "Projects", detail: "Shared outcomes", position: "md:left-[7%] md:top-[16%]", dot: "bg-[#8977f4]" },
		{ label: "Tasks", detail: "Clear actions", position: "md:right-[7%] md:top-[16%]", dot: "bg-[#5ba9ee]" },
		{ label: "People", detail: "Visible ownership", position: "md:bottom-[16%] md:left-[7%]", dot: "bg-[#bd77ed]" },
		{
			label: "Working notes",
			detail: "Personal context",
			position: "md:bottom-[16%] md:right-[7%]",
			dot: "bg-[#6bd2c4]"
		}
	] as const;

	return (
		<motion.div
			className="relative mx-auto mt-[4rem] max-w-[64rem]"
			initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.985 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
		>
			<div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent" />
			<div className="relative overflow-hidden rounded-[1.5rem] bg-[#090813]/92 shadow-[0_34px_110px_rgba(0,0,0,0.55),0_0_90px_rgba(80,60,240,0.1)] backdrop-blur-2xl">
				<div className="flex h-[3rem] items-center justify-between border-b border-white/[0.07] px-[1rem] md:px-[1.25rem]">
					<div className="flex items-center gap-[0.625rem]">
						<span className="grid size-[1.5rem] place-items-center rounded-[0.4rem] bg-gradient-to-br from-[#8673fa] to-[#3c51ca] shadow-[0_0_18px_rgba(110,91,255,0.24)]">
							<span className="size-[0.4rem] rotate-45 rounded-[0.08rem] bg-white" />
						</span>
						<span className="text-[0.625rem] font-medium text-white/55">Tasked</span>
					</div>
					<p className="text-[0.5625rem] font-medium tracking-[0.12em] text-white/25 uppercase">
						Workspace model
					</p>
					<div className="flex items-center gap-[0.375rem]">
						<span className="size-[0.375rem] rounded-full bg-[#64d4a1] shadow-[0_0_10px_rgba(100,212,161,0.5)]" />
						<span className="text-[0.5rem] text-white/28">Connected</span>
					</div>
				</div>

				<div className="relative min-h-[35rem] p-[1rem] sm:p-[1.5rem] md:min-h-[30rem] md:p-[2rem]">
					<div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:radial-gradient(rgba(255,255,255,.22)_0.7px,transparent_0.7px)] [background-size:1.5rem_1.5rem]" />
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,91,244,0.1),transparent_37%)]" />

					<svg
						className="pointer-events-none absolute inset-0 hidden size-full md:block"
						preserveAspectRatio="none"
						viewBox="0 0 1000 480"
					>
						<defs>
							<linearGradient id="overview-line-a" x1="0" x2="1">
								<stop stopColor="#8e7cf7" stopOpacity="0.12" />
								<stop offset="0.52" stopColor="#9a8cff" stopOpacity="0.8" />
								<stop offset="1" stopColor="#5ca9ef" stopOpacity="0.12" />
							</linearGradient>
						</defs>
						{[
							"M500 240 C390 180 310 120 185 105",
							"M500 240 C610 180 690 120 815 105",
							"M500 240 C390 300 310 360 185 375",
							"M500 240 C610 300 690 360 815 375"
						].map((path) => (
							<motion.path
								d={path}
								fill="none"
								initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 1 }}
								stroke="url(#overview-line-a)"
								strokeDasharray="3 7"
								strokeWidth="1.25"
								transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
								key={path}
							/>
						))}
					</svg>

					<div className="relative grid gap-[0.65rem] pt-[0.5rem] md:block md:h-[24rem] md:pt-0">
						{nodes.map(({ label, detail, position, dot }, index) => (
							<motion.div
								className={clsx(
									"relative rounded-[0.8rem] border border-white/[0.08] bg-[#11101c]/90 p-[0.9rem] shadow-[0_16px_38px_rgba(0,0,0,0.22)] backdrop-blur-xl md:absolute md:w-[11.5rem]",
									position
								)}
								initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.6 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
								key={label}
							>
								<div className="flex items-center gap-[0.65rem]">
									<span
										className={clsx(
											"size-[0.5rem] rounded-full shadow-[0_0_12px_currentColor]",
											dot
										)}
									/>
									<div>
										<p className="text-[0.65rem] font-medium text-white/70">{label}</p>
										<p className="mt-[0.15rem] text-[0.48rem] text-white/25">{detail}</p>
									</div>
								</div>
							</motion.div>
						))}

						<motion.div
							className="relative mx-auto my-[1rem] w-full max-w-[15rem] rounded-[1rem] border border-[#8c7aff]/25 bg-gradient-to-br from-[#1c1732] to-[#100e1c] p-[1.15rem] text-center shadow-[0_0_0_1px_rgba(139,121,255,0.06),0_0_55px_rgba(104,79,235,0.18)] md:absolute md:left-1/2 md:top-1/2 md:my-0 md:-translate-x-1/2 md:-translate-y-1/2"
							initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
						>
							<span className="mx-auto grid size-[2.5rem] place-items-center rounded-[0.7rem] bg-gradient-to-br from-[#8c77fc] to-[#4056d2] shadow-[0_10px_25px_rgba(95,73,223,0.35)]">
								<span className="size-[0.65rem] rotate-45 rounded-[0.12rem] bg-white" />
							</span>
							<p className="mt-[0.85rem] text-[0.75rem] font-semibold text-white/85">Your workspace</p>
							<p className="mt-[0.25rem] text-[0.5rem] text-white/30">One connected source of context</p>
						</motion.div>
					</div>

					<motion.div
						className="relative mx-auto mt-[1rem] flex max-w-[28rem] items-center justify-center gap-[0.4rem] rounded-full border border-white/[0.07] bg-white/[0.025] px-[0.75rem] py-[0.5rem] text-[0.5rem] text-white/28 backdrop-blur-xl md:mt-0"
						initial={reduceMotion ? false : { opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.1 }}
					>
						<span>Workspace</span>
						<ChevronIcon />
						<span>Website launch</span>
						<ChevronIcon />
						<span className="text-[#9d90f6]">Review prototype</span>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const WorkspaceVisual = () => (
	<div className="relative min-h-[19rem] overflow-hidden rounded-[1rem] border border-white/[0.07] bg-[#0b0914]/70 p-[1rem] sm:p-[1.25rem]">
		<div className="flex items-center justify-between">
			<div>
				<p className="text-[0.625rem] font-medium text-white/70">Active portfolio</p>
				<p className="mt-[0.2rem] text-[0.48rem] text-white/25">Where attention is moving</p>
			</div>
			<span className="rounded-full bg-[#7d6be4]/12 px-[0.5rem] py-[0.25rem] text-[0.45rem] text-[#a295f7]">
				Live view
			</span>
		</div>
		<div className="mt-[1rem] space-y-[0.55rem]">
			{[
				["Website launch", "On track", "72%", "#8977f4"],
				["Mobile experience", "Needs review", "46%", "#58a7ec"],
				["Design system", "On track", "91%", "#bc76ec"]
			].map(([name, status, progress, color]) => (
				<div className="rounded-[0.65rem] border border-white/[0.06] bg-white/[0.025] p-[0.75rem]" key={name}>
					<div className="flex items-center justify-between gap-[0.75rem]">
						<div className="flex min-w-0 items-center gap-[0.55rem]">
							<span
								className="size-[0.5rem] shrink-0 rounded-[0.15rem]"
								style={{ backgroundColor: color }}
							/>
							<span className="truncate text-[0.55rem] text-white/58">{name}</span>
						</div>
						<span className="text-[0.43rem] text-white/25">{status}</span>
					</div>
					<div className="mt-[0.55rem] flex items-center gap-[0.5rem]">
						<div className="h-[0.18rem] flex-1 rounded-full bg-white/[0.06]">
							<div className="h-full rounded-full bg-[#8876ef]/65" style={{ width: progress }} />
						</div>
						<span className="text-[0.42rem] text-white/20">{progress}</span>
					</div>
				</div>
			))}
		</div>
		<div className="absolute bottom-[0.75rem] right-[0.85rem] flex -space-x-[0.25rem]">
			{["EP", "JB", "SL"].map((initials) => (
				<span
					className="grid size-[1.25rem] place-items-center rounded-full border border-[#0b0914] bg-[#242036] text-[0.35rem] text-white/50"
					key={initials}
				>
					{initials}
				</span>
			))}
		</div>
	</div>
);

const ProjectVisual = () => (
	<div className="min-h-[19rem] overflow-hidden rounded-[1rem] border border-white/[0.07] bg-[#0b0914]/70">
		<div className="border-b border-white/[0.06] p-[1rem] sm:p-[1.25rem]">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.65rem]">
					<span className="grid size-[1.8rem] place-items-center rounded-[0.5rem] bg-gradient-to-br from-[#735fe1] to-[#384baf] text-[0.5rem] font-bold text-white">
						WL
					</span>
					<div>
						<p className="text-[0.65rem] font-medium text-white/70">Website launch</p>
						<p className="mt-[0.15rem] text-[0.45rem] text-white/25">Product marketing</p>
					</div>
				</div>
				<div className="flex -space-x-[0.25rem]">
					{["EP", "JB"].map((initials) => (
						<span
							className="grid size-[1.35rem] place-items-center rounded-full border border-[#0b0914] bg-[#242036] text-[0.35rem] text-white/50"
							key={initials}
						>
							{initials}
						</span>
					))}
				</div>
			</div>
			<div className="mt-[1rem] flex gap-[1rem] text-[0.48rem] text-white/25">
				<span className="border-b border-[#8b79f1] pb-[0.45rem] text-white/60">Board</span>
				<span>List</span>
				<span>Calendar</span>
				<span>Files</span>
			</div>
		</div>
		<div className="grid grid-cols-3 gap-[0.5rem] p-[0.75rem]">
			{[
				["Backlog", ["QA content", "Review SEO"]],
				["In progress", ["Launch page", "Email sequence"]],
				["Done", ["Brand assets", "Tracking plan"]]
			].map(([column, cards], index) => (
				<div className="rounded-[0.55rem] bg-white/[0.02] p-[0.45rem]" key={column as string}>
					<div className="mb-[0.45rem] flex items-center justify-between">
						<span className="text-[0.42rem] text-white/32">{column as string}</span>
						<span className="text-[0.38rem] text-white/18">2</span>
					</div>
					<div className="space-y-[0.35rem]">
						{(cards as string[]).map((card) => (
							<div
								className="rounded-[0.4rem] border border-white/[0.06] bg-[#14111f] p-[0.45rem]"
								key={card}
							>
								<p className="text-[0.42rem] text-white/45">{card}</p>
								<span
									className={clsx(
										"mt-[0.45rem] block h-[0.2rem] w-[1.5rem] rounded-full",
										index === 0
											? "bg-[#58a7ec]/45"
											: index === 1
												? "bg-[#b978ea]/45"
												: "bg-[#61c9a1]/45"
									)}
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</div>
);

const TaskVisual = () => (
	<div className="relative min-h-[19rem] overflow-hidden rounded-[1rem] border border-white/[0.07] bg-[#0b0914]/70 p-[1rem] sm:p-[1.25rem]">
		<div className="flex items-center justify-between">
			<span className="rounded-[0.35rem] bg-[#8472ed]/12 px-[0.5rem] py-[0.25rem] text-[0.45rem] text-[#a99cf7]">
				TSK-1042
			</span>
			<span className="text-[0.5rem] text-white/20">•••</span>
		</div>
		<h3 className="mt-[1.25rem] max-w-[18rem] text-[1rem] font-semibold tracking-[-0.02em] text-white/80">
			Review the final launch prototype
		</h3>
		<p className="mt-[0.6rem] max-w-[22rem] text-[0.55rem] leading-[1.6] text-white/30">
			Check responsive states and confirm that the handoff reflects the approved launch scope.
		</p>
		<div className="mt-[1.25rem] grid grid-cols-2 gap-[0.5rem]">
			{[
				["Project", "Website launch"],
				["Owner", "Elena Petrova"],
				["Due", "Today"],
				["Priority", "High"]
			].map(([label, value], index) => (
				<div className="rounded-[0.55rem] border border-white/[0.055] bg-white/[0.02] p-[0.6rem]" key={label}>
					<p className="text-[0.4rem] tracking-[0.08em] text-white/18 uppercase">{label}</p>
					<div className="mt-[0.35rem] flex items-center gap-[0.4rem]">
						{index === 1 && (
							<span className="grid size-[1rem] place-items-center rounded-full bg-[#453b75] text-[0.3rem] text-white/60">
								EP
							</span>
						)}
						<span
							className={clsx(
								"text-[0.48rem] text-white/48",
								index === 3 && "rounded-full bg-[#ff7058]/10 px-[0.4rem] py-[0.12rem] text-[#ff8d7b]"
							)}
						>
							{value}
						</span>
					</div>
				</div>
			))}
		</div>
	</div>
);

const layerVisuals = [
	<WorkspaceVisual key="workspace" />,
	<ProjectVisual key="project" />,
	<TaskVisual key="task" />
] as const;

const OverviewPage = () => {
	const heroRef = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
	const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 84]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, reduceMotion ? 1 : 0.3]);

	return (
		<div className="relative isolate overflow-x-clip font-(family-name:--font-barlow) text-white">
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 top-[-8rem] -z-30 bg-[#05040c]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-20 h-[64rem] bg-[radial-gradient(circle_at_50%_-8%,rgba(105,78,242,0.28),transparent_43%),radial-gradient(circle_at_12%_28%,rgba(53,116,255,0.1),transparent_28%),linear-gradient(to_bottom,#0c0920_0%,#080617_48%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 h-[55rem] opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
				aria-hidden="true"
			/>

			<section
				className="px-[1.25rem] pb-[6rem] pt-[3.25rem] sm:px-[2rem] md:pt-[5rem]"
				ref={heroRef}
				aria-labelledby="overview-title"
			>
				<motion.div className="mx-auto max-w-[70rem]" style={{ y: heroY, opacity: heroOpacity }}>
					<div className="mx-auto max-w-[51rem] text-center">
						<motion.div
							className="mb-[1.5rem] inline-flex items-center gap-[0.5rem] rounded-full border border-white/[0.09] bg-white/[0.045] px-[0.75rem] py-[0.4375rem] text-[0.625rem] font-semibold tracking-[0.12em] text-white/60 uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
							initial={reduceMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<span className="size-[0.375rem] rounded-full bg-[#9e8dff] shadow-[0_0_12px_#8a75ff]" />
							Product overview
						</motion.div>
						<motion.h1
							className="text-balance text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.5rem] md:text-[5.5rem]"
							id="overview-title"
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
						>
							The whole operation,{" "}
							<span className="bg-gradient-to-r from-[#b7aaff] via-[#929eff] to-[#78c7ff] bg-clip-text text-transparent">
								finally in one frame.
							</span>
						</motion.h1>
						<motion.p
							className="mx-auto mt-[1.75rem] max-w-[39rem] text-balance text-[1rem] leading-[1.7] text-white/55 md:text-[1.125rem]"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
						>
							Tasked connects the workspace-wide picture to focused projects and concrete tasks, so every
							level of work has a clear place—and every detail keeps its context.
						</motion.p>
						<motion.div
							className="mt-[2rem] flex flex-col items-center justify-center gap-[0.75rem] sm:flex-row"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
						>
							<Link
								className="group flex w-full items-center justify-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_10px_36px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05040c] sm:w-auto"
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
								Explore capabilities
							</Link>
						</motion.div>
					</div>
					<HeroMap />
				</motion.div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="layers-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="flex flex-col justify-between gap-[1.5rem] md:flex-row md:items-end">
						<div>
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								A clear information hierarchy
							</p>
							<h2
								className="mt-[0.875rem] max-w-[40rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="layers-title"
							>
								Start wide. Move closer only when you need to.
							</h2>
						</div>
						<p className="max-w-[19rem] text-[0.8125rem] leading-[1.65] text-white/40">
							Each layer answers a different question without sending you into another tool.
						</p>
					</Reveal>

					<div className="mt-[4rem] space-y-[5rem] md:space-y-[7rem]">
						{LAYERS.map(({ number, eyebrow, title, description }, index) => (
							<article
								className="grid items-center gap-[2.5rem] lg:grid-cols-2 lg:gap-[6rem]"
								key={title}
							>
								<Reveal className={clsx(index % 2 === 1 && "lg:order-2")}>
									<div className="max-w-[28rem]">
										<div className="flex items-center gap-[0.75rem]">
											<span className="text-[0.5625rem] font-semibold tracking-[0.12em] text-white/22">
												{number}
											</span>
											<span className="h-px w-[2rem] bg-white/10" />
											<p className="text-[0.5625rem] font-semibold tracking-[0.13em] text-[#978af0] uppercase">
												{eyebrow}
											</p>
										</div>
										<h3 className="mt-[1.25rem] text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white/90 md:text-[2.5rem]">
											{title}
										</h3>
										<p className="mt-[1.1rem] text-[0.875rem] leading-[1.75] text-white/42">
											{description}
										</p>
									</div>
								</Reveal>
								<Reveal className={clsx(index % 2 === 1 && "lg:order-1")} delay={0.1}>
									{layerVisuals[index]}
								</Reveal>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="connections-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="max-w-[41rem]">
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
							The product model
						</p>
						<h2
							className="mt-[0.875rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
							id="connections-title"
						>
							Information travels with the work.
						</h2>
						<p className="mt-[1.25rem] max-w-[33rem] text-[0.875rem] leading-[1.7] text-white/42">
							Tasked is structured around relationships, so the big picture never becomes detached from
							the details underneath it.
						</p>
					</Reveal>
					<div className="mt-[3rem] grid gap-[0.75rem] md:grid-cols-2">
						{CONNECTIONS.map(({ from, to, description }, index) => (
							<Reveal delay={(index % 2) * 0.07} key={from}>
								<article className="group relative min-h-[12rem] overflow-hidden rounded-[1rem] border border-white/[0.08] bg-white/[0.025] p-[1.35rem] backdrop-blur-xl transition-[border-color,background-color] hover:border-white/[0.14] hover:bg-white/[0.04]">
									<div className="absolute -right-[2rem] -top-[2rem] size-[7rem] rounded-full bg-[#745ee9]/10 blur-[2.5rem] transition-colors group-hover:bg-[#745ee9]/20" />
									<div className="relative flex items-center gap-[0.65rem]">
										<span className="rounded-[0.4rem] border border-white/[0.07] bg-white/[0.035] px-[0.6rem] py-[0.35rem] text-[0.5625rem] font-medium text-white/55">
											{from}
										</span>
										<span className="text-[#8f82e9]">
											<ArrowIcon />
										</span>
										<span className="rounded-[0.4rem] border border-[#8d7af2]/20 bg-[#8d7af2]/10 px-[0.6rem] py-[0.35rem] text-[0.5625rem] font-medium text-[#afa4f7]">
											{to}
										</span>
									</div>
									<p className="relative mt-[2.5rem] max-w-[24rem] text-[0.8125rem] leading-[1.65] text-white/40">
										{description}
									</p>
									<span className="absolute bottom-[1.2rem] right-[1.2rem] text-[0.5rem] font-semibold tracking-[0.1em] text-white/12">
										0{index + 1}
									</span>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			<section
				className="px-[1.25rem] pb-[5rem] pt-[3rem] sm:px-[2rem] md:pb-[7rem]"
				aria-labelledby="overview-cta-title"
			>
				<Reveal className="mx-auto max-w-[70rem]">
					<div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.035] px-[1.5rem] py-[4rem] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl md:px-[3rem] md:py-[5rem]">
						<div
							className="absolute left-1/2 top-0 -z-10 h-[15rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6e55ef]/25 blur-[5rem]"
							aria-hidden="true"
						/>
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#aa9fff] uppercase">
							See the workspace in motion
						</p>
						<h2
							className="mx-auto mt-[1rem] max-w-[39rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]"
							id="overview-cta-title"
						>
							Move from the full picture to the next detail.
						</h2>
						<p className="mx-auto mt-[1.25rem] max-w-[29rem] text-[0.875rem] leading-[1.65] text-white/45">
							Create your workspace and experience the connected structure for yourself.
						</p>
						<Link
							className="group mt-[2rem] inline-flex items-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0915]"
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

export default OverviewPage;
