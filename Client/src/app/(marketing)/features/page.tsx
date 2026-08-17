"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";

// export const metadata: Metadata = {
// 	title: "Features | Tasked",
// 	description:
// 		"Explore Tasked's customizable dashboards, projects controls, task views, people tools, private notes, and workspace search."
// };
import { ROUTES } from "@shared/config";

const CAPABILITIES = [
	{
		id: "dashboard",
		label: "Custom dashboards",
		description: "Resize, rearrange, show, or hide widgets until the workspace matches the way you scan your day.",
		detail: "Flexible by default",
		className: "lg:col-span-2"
	},
	{
		id: "projects",
		label: "Project control",
		description:
			"Pin important work, set visibility, assign an owner, and read completion without opening a report.",
		detail: "State at a glance",
		className: ""
	},
	{
		id: "tasks",
		label: "Task clarity",
		description:
			"Keep the description, projects, due date, identifier, and priority together in one scannable row.",
		detail: "No missing context",
		className: ""
	},
	{
		id: "people",
		label: "People & ownership",
		description: "See who is involved, who owns the next step, and how work is distributed across the team.",
		detail: "Ownership stays visible",
		className: ""
	},
	{
		id: "notes",
		label: "Private notepad",
		description:
			"Capture working notes with lightweight formatting in a private space beside the rest of your dashboard.",
		detail: "Thoughts stay yours",
		className: ""
	},
	{
		id: "search",
		label: "Workspace search",
		description:
			"Find projects, tasks, and people from one focused command surface without breaking your train of thought.",
		detail: "Everything in reach",
		className: "lg:col-span-3"
	}
] as const;

const CONTROLS = [
	{
		number: "01",
		title: "Drag to resize",
		description: "Give high-signal widgets more room and keep supporting context compact."
	},
	{
		number: "02",
		title: "Choose what stays",
		description: "Show the views you rely on and hide the ones you do not need today."
	},
	{
		number: "03",
		title: "Create in context",
		description: "Add tasks, projects, and people directly from the surface where they belong."
	},
	{
		number: "04",
		title: "Act from the signal",
		description: "Move from a count or summary into the underlying work with less navigation."
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

const SearchIcon = () => (
	<svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
		<circle cx="7" cy="7" r="3.75" stroke="currentColor" />
		<path d="m10 10 3 3" stroke="currentColor" strokeLinecap="round" />
	</svg>
);

const GripIcon = () => (
	<svg aria-hidden="true" fill="currentColor" height="12" viewBox="0 0 12 12" width="12">
		<circle cx="3" cy="3" r="1" />
		<circle cx="9" cy="3" r="1" />
		<circle cx="3" cy="9" r="1" />
		<circle cx="9" cy="9" r="1" />
	</svg>
);

const CheckIcon = () => (
	<svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
		<path d="m2.5 6.2 2.1 2.1 4.9-4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const HeroCanvas = () => {
	const reduceMotion = useReducedMotion();

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
						<span className="text-[0.625rem] font-medium text-white/55">Acme workspace</span>
					</div>
					<div className="hidden items-center gap-[0.5rem] rounded-[0.4rem] border border-white/[0.07] bg-white/[0.03] px-[0.75rem] py-[0.35rem] text-[0.5625rem] text-white/30 sm:flex">
						<SearchIcon />
						Search anything
						<kbd className="ml-[1rem] rounded-[0.2rem] bg-white/[0.06] px-[0.35rem] py-[0.1rem] text-[0.5rem] text-white/25">
							⌘ K
						</kbd>
					</div>
					<span className="grid size-[1.5rem] place-items-center rounded-full bg-[#1b1828] text-[0.5rem] font-semibold text-white/55">
						AM
					</span>
				</div>

				<div className="relative min-h-[29rem] p-[1rem] sm:p-[1.5rem] md:p-[2rem]">
					<div className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]" />
					<div className="relative flex items-center justify-between">
						<div>
							<p className="text-[0.5625rem] tracking-[0.12em] text-[#9a8fff] uppercase">
								Customize mode
							</p>
							<h2 className="mt-[0.35rem] text-[1.25rem] font-semibold tracking-[-0.02em] text-white/90">
								Build your workspace
							</h2>
						</div>
						<button
							className="rounded-[0.45rem] bg-white px-[0.75rem] py-[0.4rem] text-[0.5625rem] font-semibold text-[#0a0812]"
							type="button"
						>
							Save layout
						</button>
					</div>

					<div className="relative mt-[1.5rem] grid gap-[0.75rem] md:grid-cols-[minmax(0,1.35fr)_minmax(13rem,0.65fr)]">
						<div className="grid gap-[0.75rem] sm:grid-cols-2">
							<div className="relative overflow-hidden rounded-[0.875rem] border border-[#8b78ff]/30 bg-[#12101e]/90 p-[1rem] shadow-[0_0_0_1px_rgba(139,120,255,0.06),0_18px_40px_rgba(0,0,0,0.2)] sm:col-span-2">
								<div className="absolute right-[0.5rem] top-[0.5rem] cursor-grab text-white/20">
									<GripIcon />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="text-[0.6875rem] font-medium text-white/75">Project activity</p>
										<p className="mt-[0.2rem] text-[0.5rem] text-white/25">
											Updates across active work
										</p>
									</div>
									<span className="rounded-full bg-[#7765e8]/15 px-[0.5rem] py-[0.25rem] text-[0.5rem] text-[#a99dff]">
										Live
									</span>
								</div>
								<div className="mt-[1rem] flex h-[4.25rem] items-end gap-[0.4rem]">
									{[36, 52, 45, 62, 55, 74, 68, 84, 72, 92, 80, 96, 88, 104].map((height, index) => (
										<motion.span
											className="w-full rounded-t-[0.16rem] bg-gradient-to-t from-[#4e3bc0]/30 to-[#9281ff]/80"
											initial={reduceMotion ? { height } : { height: 0 }}
											animate={{ height: height * 0.6 }}
											transition={{
												duration: 0.5,
												delay: 0.65 + index * 0.035,
												ease: [0.22, 1, 0.36, 1]
											}}
											key={index}
										/>
									))}
								</div>
								<span className="absolute bottom-[0.3rem] right-[0.3rem] size-[0.5rem] border-b border-r border-[#a293ff]/60" />
							</div>

							{[
								["Tasks due today", "08", "2 high priority"],
								["Project health", "92%", "4 on track"]
							].map(([label, value, note]) => (
								<div
									className="relative rounded-[0.875rem] border border-white/[0.07] bg-[#100e1a]/90 p-[1rem]"
									key={label}
								>
									<div className="absolute right-[0.5rem] top-[0.5rem] text-white/15">
										<GripIcon />
									</div>
									<p className="text-[0.5625rem] text-white/30">{label}</p>
									<p className="mt-[0.55rem] text-[1.5rem] font-semibold tracking-[-0.04em] text-white/85">
										{value}
									</p>
									<p className="mt-[0.25rem] text-[0.5rem] text-[#9588f4]">{note}</p>
								</div>
							))}
						</div>

						<div className="rounded-[0.875rem] border border-white/[0.08] bg-[#100e1a]/95 p-[1rem]">
							<div className="flex items-center justify-between">
								<p className="text-[0.6875rem] font-medium text-white/75">Visible widgets</p>
								<span className="text-[0.5rem] text-white/25">6 of 9</span>
							</div>
							<ul className="mt-[0.9rem] space-y-[0.45rem]">
								{["Projects", "Tasks", "Private notepad", "Overdue", "Team", "Completed"].map(
									(item, index) => (
										<li
											className="flex items-center justify-between rounded-[0.5rem] bg-white/[0.025] px-[0.65rem] py-[0.55rem]"
											key={item}
										>
											<div className="flex items-center gap-[0.5rem]">
												<span className="text-white/15">
													<GripIcon />
												</span>
												<span className="text-[0.5625rem] text-white/48">{item}</span>
											</div>
											<span
												className={clsx(
													"relative h-[0.85rem] w-[1.5rem] rounded-full",
													index < 4 ? "bg-[#7160df]" : "bg-white/[0.09]"
												)}
											>
												<span
													className={clsx(
														"absolute top-[0.125rem] size-[0.6rem] rounded-full bg-white",
														index < 4 ? "right-[0.125rem]" : "left-[0.125rem] bg-white/30"
													)}
												/>
											</span>
										</li>
									)
								)}
							</ul>
						</div>
					</div>

					<motion.div
						className="absolute bottom-[1.5rem] left-1/2 w-[min(90%,24rem)] -translate-x-1/2 overflow-hidden rounded-[0.8rem] border border-white/[0.11] bg-[#151220]/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:bottom-[2rem] md:left-auto md:right-[2rem] md:w-[22rem] md:translate-x-0"
						initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.65, delay: 1, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className="flex items-center gap-[0.55rem] border-b border-white/[0.07] px-[0.8rem] py-[0.65rem] text-white/30">
							<SearchIcon />
							<span className="text-[0.6rem] text-white/65">launch</span>
						</div>
						<div className="p-[0.4rem]">
							{[
								["Project", "Website launch", "12 open tasks"],
								["Task", "Review launch checklist", "Due today"]
							].map(([type, title, detail], index) => (
								<div
									className={clsx(
										"flex items-center justify-between rounded-[0.5rem] px-[0.55rem] py-[0.5rem]",
										index === 0 && "bg-white/[0.055]"
									)}
									key={title}
								>
									<div className="flex items-center gap-[0.55rem]">
										<span className="grid size-[1.5rem] place-items-center rounded-[0.4rem] bg-[#272238] text-[0.5rem] text-[#a99dff]">
											{type.charAt(0)}
										</span>
										<div>
											<p className="text-[0.55rem] text-white/65">{title}</p>
											<p className="mt-[0.1rem] text-[0.45rem] text-white/25">{type}</p>
										</div>
									</div>
									<span className="text-[0.45rem] text-white/25">{detail}</span>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const CapabilityVisual = ({ id }: { id: (typeof CAPABILITIES)[number]["id"] }) => {
	if (id === "dashboard") {
		return (
			<div className="grid h-[8.5rem] grid-cols-3 grid-rows-2 gap-[0.4rem] rounded-[0.75rem] border border-white/[0.06] bg-[#0b0914]/70 p-[0.65rem]">
				<div className="col-span-2 rounded-[0.4rem] border border-[#8d7cff]/20 bg-gradient-to-br from-[#7360e6]/15 to-transparent p-[0.55rem]">
					<div className="h-[0.25rem] w-[2.5rem] rounded-full bg-white/15" />
					<div className="mt-[0.75rem] flex items-end gap-[0.2rem]">
						{[12, 18, 15, 24, 20, 30, 26].map((height, index) => (
							<span
								className="w-full rounded-t-[0.1rem] bg-[#8d7cff]/60"
								key={index}
								style={{ height }}
							/>
						))}
					</div>
				</div>
				<div className="rounded-[0.4rem] border border-white/[0.06] bg-white/[0.025] p-[0.55rem]">
					<div className="h-[0.25rem] w-[1.75rem] rounded-full bg-white/10" />
					<div className="mt-[0.8rem] text-[1rem] font-semibold text-white/65">24</div>
				</div>
				<div className="rounded-[0.4rem] border border-white/[0.06] bg-white/[0.025]" />
				<div className="col-span-2 rounded-[0.4rem] border border-white/[0.06] bg-white/[0.025]" />
			</div>
		);
	}

	if (id === "projects") {
		return (
			<div className="space-y-[0.45rem]">
				{[
					["Website launch", "72%"],
					["Mobile experience", "46%"],
					["Design system", "91%"]
				].map(([name, progress], index) => (
					<div className="rounded-[0.55rem] border border-white/[0.06] bg-[#0b0914]/70 p-[0.6rem]" key={name}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-[0.45rem]">
								<span
									className={clsx(
										"size-[0.45rem] rounded-full",
										index === 0 ? "bg-[#8d7cff]" : index === 1 ? "bg-[#58a6ff]" : "bg-[#b66cff]"
									)}
								/>
								<span className="text-[0.52rem] text-white/55">{name}</span>
							</div>
							<span className="text-[0.45rem] text-white/25">{progress}</span>
						</div>
						<div className="mt-[0.45rem] h-[0.16rem] rounded-full bg-white/[0.06]">
							<div className="h-full rounded-full bg-[#8170eb]/60" style={{ width: progress }} />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (id === "tasks") {
		return (
			<div className="space-y-[0.4rem]">
				{[
					["Finalize prototype", "High", "Today"],
					["Review research", "Medium", "Jul 24"],
					["Write handoff notes", "Low", "Jul 26"]
				].map(([task, priority, due], index) => (
					<div
						className="flex items-center gap-[0.5rem] rounded-[0.5rem] border border-white/[0.06] bg-[#0b0914]/70 px-[0.6rem] py-[0.55rem]"
						key={task}
					>
						<span
							className={clsx(
								"grid size-[0.85rem] place-items-center rounded-[0.25rem] border",
								index === 0
									? "border-[#8877f3] bg-[#7765df] text-white"
									: "border-white/10 text-transparent"
							)}
						>
							<CheckIcon />
						</span>
						<span className="min-w-0 flex-1 truncate text-[0.5rem] text-white/50">{task}</span>
						<span
							className={clsx(
								"rounded-full px-[0.4rem] py-[0.15rem] text-[0.4rem]",
								index === 0
									? "bg-[#ff6d55]/10 text-[#ff8a78]"
									: index === 1
										? "bg-[#ffc85c]/10 text-[#e9bc64]"
										: "bg-[#5dc9c3]/10 text-[#72c9c4]"
							)}
						>
							{priority}
						</span>
						<span className="text-[0.4rem] text-white/20">{due}</span>
					</div>
				))}
			</div>
		);
	}

	if (id === "people") {
		return (
			<div className="grid grid-cols-2 gap-[0.45rem]">
				{[
					["EP", "Elena", "7 tasks"],
					["JB", "John", "4 tasks"],
					["SL", "Sophie", "6 tasks"],
					["MR", "Matteo", "3 tasks"]
				].map(([initials, name, tasks], index) => (
					<div
						className="flex items-center gap-[0.5rem] rounded-[0.55rem] border border-white/[0.06] bg-[#0b0914]/70 p-[0.55rem]"
						key={name}
					>
						<span
							className={clsx(
								"grid size-[1.45rem] place-items-center rounded-full text-[0.42rem] font-semibold text-white/75",
								index % 2 === 0
									? "bg-gradient-to-br from-[#856ef0] to-[#3f4ea9]"
									: "bg-gradient-to-br from-[#3978b8] to-[#283d78]"
							)}
						>
							{initials}
						</span>
						<div>
							<p className="text-[0.5rem] text-white/55">{name}</p>
							<p className="mt-[0.1rem] text-[0.4rem] text-white/22">{tasks}</p>
						</div>
					</div>
				))}
			</div>
		);
	}

	if (id === "notes") {
		return (
			<div className="overflow-hidden rounded-[0.65rem] border border-white/[0.06] bg-[#0b0914]/70">
				<div className="flex items-center gap-[0.55rem] border-b border-white/[0.06] px-[0.65rem] py-[0.45rem] text-[0.45rem] font-semibold text-white/30">
					<span className="text-white/60">B</span>
					<span className="italic">I</span>
					<span className="underline">U</span>
					<span>≡</span>
					<span>•</span>
				</div>
				<div className="p-[0.7rem]">
					<p className="text-[0.52rem] font-medium text-white/55">Notes for Friday</p>
					<div className="mt-[0.6rem] space-y-[0.35rem]">
						<div className="h-[0.22rem] w-full rounded-full bg-white/[0.08]" />
						<div className="h-[0.22rem] w-[82%] rounded-full bg-white/[0.06]" />
						<div className="h-[0.22rem] w-[64%] rounded-full bg-white/[0.06]" />
					</div>
					<p className="mt-[0.65rem] text-[0.42rem] text-[#9688ef]">Only visible to you</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-[27rem] overflow-hidden rounded-[0.75rem] border border-white/[0.08] bg-[#0b0914]/80 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
			<div className="flex items-center gap-[0.5rem] border-b border-white/[0.06] px-[0.75rem] py-[0.6rem] text-[#8f83e8]">
				<SearchIcon />
				<span className="text-[0.55rem] text-white/55">design</span>
				<span className="ml-auto text-[0.42rem] text-white/20">ESC</span>
			</div>
			<div className="grid gap-[0.35rem] p-[0.4rem] sm:grid-cols-3">
				{[
					["Project", "Design system"],
					["Task", "Audit design tokens"],
					["Person", "Sophie Laurent"]
				].map(([type, result], index) => (
					<div
						className={clsx(
							"rounded-[0.5rem] border p-[0.55rem]",
							index === 0 ? "border-[#8877f3]/20 bg-[#8877f3]/10" : "border-transparent bg-white/[0.025]"
						)}
						key={result}
					>
						<p className="text-[0.4rem] tracking-[0.08em] text-white/20 uppercase">{type}</p>
						<p className="mt-[0.35rem] text-[0.5rem] text-white/52">{result}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const FeaturesPage = () => {
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
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-20 h-[64rem] bg-[radial-gradient(circle_at_50%_-8%,rgba(105,78,242,0.28),transparent_43%),radial-gradient(circle_at_88%_28%,rgba(53,116,255,0.1),transparent_28%),linear-gradient(to_bottom,#0c0920_0%,#080617_48%,transparent_100%)]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 h-[55rem] opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
				aria-hidden="true"
			/>

			<section
				className="px-[1.25rem] pb-[6rem] pt-[3.25rem] sm:px-[2rem] md:pt-[5rem]"
				ref={heroRef}
				aria-labelledby="features-title"
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
							Product capabilities
						</motion.div>
						<motion.h1
							className="text-balance text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.5rem] md:text-[5.5rem]"
							id="features-title"
							initial={reduceMotion ? false : { opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
						>
							One precise toolkit for{" "}
							<span className="bg-gradient-to-r from-[#b7aaff] via-[#929eff] to-[#78c7ff] bg-clip-text text-transparent">
								every moving part.
							</span>
						</motion.h1>
						<motion.p
							className="mx-auto mt-[1.75rem] max-w-[38rem] text-balance text-[1rem] leading-[1.7] text-white/55 md:text-[1.125rem]"
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
						>
							Customize the dashboard, control every project, and find the exact task or teammate you
							need—without stitching together a stack of separate tools.
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
								href={ROUTES.Pricing}
							>
								Compare plans
							</Link>
						</motion.div>
					</div>
					<HeroCanvas />
				</motion.div>
			</section>

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="capabilities-title">
				<div className="mx-auto max-w-[70rem]">
					<Reveal className="flex flex-col justify-between gap-[1.5rem] md:flex-row md:items-end">
						<div>
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								Everything connected
							</p>
							<h2
								className="mt-[0.875rem] max-w-[39rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="capabilities-title"
							>
								Depth where the work demands it.
							</h2>
						</div>
						<p className="max-w-[19rem] text-[0.8125rem] leading-[1.65] text-white/40">
							Six focused capabilities, designed to behave like one product.
						</p>
					</Reveal>

					<div className="mt-[3rem] grid gap-[0.75rem] md:grid-cols-2 lg:grid-cols-3">
						{CAPABILITIES.map(({ id, label, description, detail, className }, index) => (
							<Reveal className={className} delay={(index % 3) * 0.06} key={id}>
								<article className="group relative h-full min-h-[21rem] overflow-hidden rounded-[1.125rem] border border-white/[0.08] bg-white/[0.025] p-[1.35rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-xl transition-[border-color,transform,background-color] duration-300 hover:-translate-y-[0.1875rem] hover:border-white/[0.14] hover:bg-white/[0.04]">
									<div className="absolute -right-[3rem] -top-[3rem] size-[9rem] rounded-full bg-[#725deb]/10 blur-[3rem] transition-colors group-hover:bg-[#725deb]/20" />
									<div className="relative flex h-full min-h-[18.2rem] flex-col">
										<div className="flex items-center justify-between">
											<span className="text-[0.5625rem] font-semibold tracking-[0.12em] text-[#998cf0] uppercase">
												{detail}
											</span>
											<span className="grid size-[1.5rem] place-items-center rounded-full border border-white/[0.08] text-[0.5rem] text-white/28">
												0{index + 1}
											</span>
										</div>
										<div className="my-[1.5rem]">
											<CapabilityVisual id={id} />
										</div>
										<div className="mt-auto">
											<h3 className="text-[1.125rem] font-semibold tracking-[-0.02em] text-white/88">
												{label}
											</h3>
											<p className="mt-[0.65rem] max-w-[31rem] text-[0.8125rem] leading-[1.65] text-white/42">
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

			<section className="px-[1.25rem] py-[6rem] sm:px-[2rem] md:py-[8rem]" aria-labelledby="controls-title">
				<div className="mx-auto grid max-w-[70rem] gap-[3rem] lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-[6rem]">
					<Reveal>
						<div className="lg:sticky lg:top-[3rem]">
							<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#9689ef] uppercase">
								Controls, not configuration
							</p>
							<h2
								className="mt-[0.875rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-[3.5rem]"
								id="controls-title"
							>
								Make the workspace yours in moments.
							</h2>
							<p className="mt-[1.25rem] max-w-[19rem] text-[0.875rem] leading-[1.7] text-white/42">
								Tasked adapts through direct, visible controls—not an administration maze.
							</p>
						</div>
					</Reveal>
					<ol className="overflow-hidden rounded-[1.125rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
						{CONTROLS.map(({ number, title, description }, index) => (
							<motion.li
								className="group grid gap-[1rem] border-b border-white/[0.07] p-[1.35rem] last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_1.5rem] sm:items-center"
								initial={reduceMotion ? false : { opacity: 0, x: 20 }}
								transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
								viewport={{ once: true, margin: "-70px" }}
								whileInView={{ opacity: 1, x: 0 }}
								key={title}
							>
								<span className="text-[0.5625rem] font-semibold tracking-[0.1em] text-white/22">
									{number}
								</span>
								<div>
									<h3 className="text-[1rem] font-semibold text-white/82">{title}</h3>
									<p className="mt-[0.35rem] max-w-[29rem] text-[0.75rem] leading-[1.65] text-white/36">
										{description}
									</p>
								</div>
								<span className="hidden text-white/18 transition-[color,transform] group-hover:translate-x-[0.15rem] group-hover:text-[#9588ef] sm:block">
									<ArrowIcon />
								</span>
							</motion.li>
						))}
					</ol>
				</div>
			</section>

			<section
				className="px-[1.25rem] pb-[5rem] pt-[3rem] sm:px-[2rem] md:pb-[7rem]"
				aria-labelledby="features-cta-title"
			>
				<Reveal className="mx-auto max-w-[70rem]">
					<div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-white/[0.035] px-[1.5rem] py-[4rem] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl md:px-[3rem] md:py-[5rem]">
						<div
							className="absolute left-1/2 top-0 -z-10 h-[15rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6e55ef]/25 blur-[5rem]"
							aria-hidden="true"
						/>
						<p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[#aa9fff] uppercase">
							See it in your workflow
						</p>
						<h2
							className="mx-auto mt-[1rem] max-w-[38rem] text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3.5rem]"
							id="features-cta-title"
						>
							Put every capability to work.
						</h2>
						<p className="mx-auto mt-[1.25rem] max-w-[28rem] text-[0.875rem] leading-[1.65] text-white/45">
							Start with the full workspace, then shape it around the way your team delivers.
						</p>
						<div className="mt-[2rem] flex flex-col items-center justify-center gap-[0.75rem] sm:flex-row">
							<Link
								className="group inline-flex w-full items-center justify-center gap-[0.5rem] rounded-[0.625rem] bg-white px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-semibold text-[#090713] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0915] sm:w-auto"
								href={ROUTES.Registration}
							>
								Start planning for free
								<span className="transition-transform group-hover:translate-x-[0.125rem]">
									<ArrowIcon />
								</span>
							</Link>
							<Link
								className="w-full rounded-[0.625rem] border border-white/[0.1] px-[1.125rem] py-[0.6875rem] text-[0.8125rem] font-medium text-white/65 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white sm:w-auto"
								href={ROUTES.Pricing}
							>
								See pricing
							</Link>
						</div>
					</div>
				</Reveal>
			</section>
		</div>
	);
};

export default FeaturesPage;
