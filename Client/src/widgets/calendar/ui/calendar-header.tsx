"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
	ICON,
	Icon
} from "@shared/ui";
import { clsx } from "clsx";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { CALENDAR_MONTHS } from "../config";
import { useCalendar } from "../model/calendar-context";

export type CalendarHeaderProps = {
	children?: ReactNode;
};

type PeriodDropdownProps = {
	accessibleLabel: string;
	options: ReadonlyArray<{ label: string; value: string }>;
	value: string;
	onValueChange: (value: string) => void;
	className?: string;
};

const PeriodDropdown = ({
	accessibleLabel,
	className,
	onValueChange,
	options,
	value
}: Readonly<PeriodDropdownProps>) => {
	const selectedOption = options.find((option) => option.value === value);

	return (
		<DropdownMenu key={`${accessibleLabel}-${value}`} value={value} onValueChange={onValueChange}>
			<DropdownMenuTrigger
				className={clsx("h-[32px] min-w-[116px] py-0 pl-[10px] pr-[7px]", className)}
				aria-label={accessibleLabel}
			>
				{selectedOption?.label}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{options.map((option) => (
						<DropdownMenuItem key={option.value} value={option.value}>
							{option.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const NavigationButton = ({
	accessibleLabel,
	direction,
	onClick
}: Readonly<{ accessibleLabel: string; direction: "previous" | "next"; onClick: () => void }>) => {
	return (
		<motion.button
			type="button"
			className="flex h-[32px] w-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-100) text-(--neutrals-2) hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
			aria-label={accessibleLabel}
			whileHover={{ scale: 1.04 }}
			whileTap={{ scale: 0.96 }}
			onClick={onClick}
		>
			<Icon type={ICON.Chevron} size={14} className={direction === "previous" ? "rotate-90" : "-rotate-90"} />
		</motion.button>
	);
};

export const CalendarHeader = ({ children }: Readonly<CalendarHeaderProps>) => {
	const {
		availableYears,
		headingId,
		selectedMonth,
		selectedYear,
		selectMonth,
		selectYear,
		showNextMonth,
		showPreviousMonth,
		showToday,
		visibleTasks
	} = useCalendar();
	const monthOptions = CALENDAR_MONTHS.map((label, value) => ({ label, value: String(value) }));
	const yearOptions = availableYears.map((year) => ({ label: String(year), value: String(year) }));
	const taskCountLabel = `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;

	return (
		<header className="flex min-w-0 flex-wrap items-center justify-between gap-[10px] rounded-[14px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-50) px-[12px] py-[10px] backdrop-blur-[24px]">
			<div className="flex min-w-0 items-center gap-x-[10px]">
				<span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] bg-(--geek-blue-primary-opacity-200) text-(--geek-blue-4)">
					<Icon type={ICON.Calendar} size={15} />
				</span>
				<div className="min-w-0">
					<h2
						id={headingId}
						className="truncate font-(family-name:--font-barlow) text-[13px] leading-[123%] font-bold tracking-[0.01em] text-(--white-pallete-100)"
					>
						Project calendar
					</h2>
					<p className="mt-[2px] font-(family-name:--font-barlow) text-[10px] leading-[130%] font-medium text-(--neutrals-2)">
						{taskCountLabel} scheduled
					</p>
				</div>
			</div>
			<div className="flex min-w-0 flex-wrap items-center justify-end gap-[6px]">
				<PeriodDropdown
					accessibleLabel="Filter tasks by month"
					options={monthOptions}
					value={String(selectedMonth)}
					onValueChange={(value) => selectMonth(Number(value))}
				/>
				<PeriodDropdown
					accessibleLabel="Filter tasks by year"
					className="min-w-[84px]"
					options={yearOptions}
					value={String(selectedYear)}
					onValueChange={(value) => selectYear(Number(value))}
				/>
				<span className="mx-[2px] hidden h-[20px] w-px bg-(--white-pallete-10) sm:block" aria-hidden="true" />
				<NavigationButton
					accessibleLabel="Show previous month"
					direction="previous"
					onClick={showPreviousMonth}
				/>
				<motion.button
					type="button"
					className="h-[32px] cursor-pointer rounded-[8px] border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-100) px-[10px] font-(family-name:--font-barlow) text-[11px] leading-none font-bold tracking-[0.01em] text-(--neutrals-2) hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={showToday}
				>
					Today
				</motion.button>
				<NavigationButton accessibleLabel="Show next month" direction="next" onClick={showNextMonth} />
				{children}
			</div>
		</header>
	);
};
