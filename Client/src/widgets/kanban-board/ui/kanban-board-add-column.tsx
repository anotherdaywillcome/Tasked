"use client";

import { Icon, ICON_TYPES } from "@shared/ui";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";

import { useKanbanBoard } from "../model/kanban-board-context";

export const KanbanBoardAddColumn = () => {
	const { addColumn } = useKanbanBoard();
	const [isCreating, setIsCreating] = useState(false);
	const [title, setTitle] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextTitle = title.trim();

		if (!nextTitle) return;

		addColumn(nextTitle);
		setTitle("");
		setIsCreating(false);
	};

	return (
		<motion.li
			layout
			className="relative min-w-[240px] list-none"
			transition={{ type: "spring", stiffness: 420, damping: 34 }}
		>
			<AnimatePresence initial={false} mode="wait">
				{isCreating ? (
					<motion.form
						key="form"
						className="rounded-[20px] border-[0.50px] border-solid border-(--geek-blue-6) bg-(--geek-blue-primary-opacity-100) p-[12px]"
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						onSubmit={handleSubmit}
					>
						<label
							className="mb-[8px] block font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em] text-(--neutrals-4)"
							htmlFor="new-kanban-column-title"
						>
							Column name
						</label>
						<input
							autoFocus
							className="w-full rounded-[10px] border-[0.50px] border-solid border-(--white-pallete-20) bg-(--geek-blue-primary-opacity-200) px-[12px] py-[10px] font-(family-name:--font-barlow) text-[13px] text-(--white-pallete-100) outline-none placeholder:text-(--neutrals-2) focus:border-(--geek-blue-5) focus:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
							id="new-kanban-column-title"
							maxLength={60}
							placeholder="e.g. In review"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
						<div className="mt-[10px] flex justify-end gap-x-[6px]">
							<button
								className="cursor-pointer rounded-[8px] px-[10px] py-[7px] font-(family-name:--font-barlow) text-[12px] font-bold text-(--neutrals-3) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
								type="button"
								onClick={() => {
									setTitle("");
									setIsCreating(false);
								}}
							>
								Cancel
							</button>
							<button
								className="cursor-pointer rounded-[8px] bg-(--geek-blue-7) px-[12px] py-[7px] font-(family-name:--font-barlow) text-[12px] font-bold text-(--white-pallete-100) shadow-geek-blue hover:bg-(--geek-blue-6) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-400)] disabled:cursor-not-allowed disabled:opacity-50"
								type="submit"
								disabled={!title.trim()}
							>
								Add column
							</button>
						</div>
					</motion.form>
				) : (
					<motion.button
						key="button"
						className="flex w-full cursor-pointer items-center justify-center gap-x-[8px] rounded-[20px] border-[0.50px] border-dashed border-(--geek-blue-6) bg-(--geek-blue-primary-opacity-100) p-[18px] text-(--neutrals-5) hover:border-(--geek-blue-5) hover:bg-(--geek-blue-primary-opacity-200) hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--daybreak-blue-200)]"
						type="button"
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 4 }}
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						onClick={() => setIsCreating(true)}
					>
						<Icon type={ICON_TYPES.Add} size={16} />
						<span className="font-(family-name:--font-barlow) text-[12px] leading-[133%] font-bold tracking-[0.01em] capitalize">
							Add new column
						</span>
					</motion.button>
				)}
			</AnimatePresence>
		</motion.li>
	);
};
