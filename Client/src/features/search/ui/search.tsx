"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Fragment, useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";

import { MOTION_ICON_TYPES, MotionIcon, Spinner } from "@shared/ui";

import { FILTERS, GROUPS } from "../config/search";
import type { Filter, SearchResult, SearchState } from "../model/types";

const MOCK_RESULTS: Array<SearchResult> = [
	{
		id: 1,
		title: "John Doe",
		type: "users",
		description: "Frontend Engineer",
		shortcut: "Ctrl P",
		icon: "Dashboard"
	},
	{
		id: 2,
		title: "Design System",
		type: "projects",
		description: "Internal component library",
		shortcut: "Ctrl D",
		icon: "Projects"
	},
	{
		id: 3,
		title: "Fix search motion",
		type: "tasks",
		description: "Assigned to Alex",
		shortcut: "Ctrl T",
		icon: "Tasks"
	},
	{
		id: 4,
		title: "Jane Smith",
		type: "users",
		description: "Product Designer",
		shortcut: "Ctrl J",
		icon: "Dashboard"
	},
	{
		id: 5,
		title: "Marketing Website",
		type: "projects",
		description: "Landing page redesign",
		shortcut: "Ctrl M",
		icon: "Projects"
	}
];

const searchAction = async (query: string, filter: Filter): Promise<Array<SearchResult>> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const normalized = query.toLowerCase().trim();

	return MOCK_RESULTS.filter((item) => {
		const matchesQuery =
			!normalized ||
			item.title.toLowerCase().includes(normalized) ||
			item.description.toLowerCase().includes(normalized);
		const matchesFilter = filter === "all" || item.type === filter;

		return matchesQuery && matchesFilter;
	});
};

export const Search = () => {
	const inputId = useId();
	const paletteInputId = useId();
	const listboxId = useId();

	const inlineInputRef = useRef<HTMLInputElement>(null);
	const paletteInputRef = useRef<HTMLInputElement>(null);
	const selectedItemRef = useRef<HTMLButtonElement>(null);
	const shouldFocusPaletteInputRef = useRef(false);

	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [allowAutoOpen, setAllowAutoOpen] = useState(false);
	const [filter, setFilter] = useState<Filter>("all");
	const [searchState, setSearchState] = useState<SearchState>({
		query: "",
		filter: "all",
		results: MOCK_RESULTS
	});
	const [activeIndex, setActiveIndex] = useState(0);

	const deferredQuery = useDeferredValue(query);

	const results = searchState.results;
	const hasQuery = query.trim().length > 0;
	const shouldSearch = isOpen || hasQuery;
	const isLoading = shouldSearch && (searchState.query !== deferredQuery || searchState.filter !== filter);
	const activeResult = results[activeIndex];
	const activeOptionId = activeResult ? `${listboxId}-${activeResult.id}` : undefined;

	const openPalette = useCallback(() => {
		shouldFocusPaletteInputRef.current = true;
		setAllowAutoOpen(false);
		setIsOpen(true);
	}, []);

	const closePalette = useCallback(() => {
		setAllowAutoOpen(false);
		setIsOpen(false);
	}, []);

	const handleQueryChange = useCallback((value: string) => {
		setAllowAutoOpen(true);
		setQuery(value);
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

			if (!isShortcut) return;

			event.preventDefault();
			if (isOpen) {
				closePalette();
				return;
			}

			openPalette();
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [closePalette, isOpen, openPalette]);

	useEffect(() => {
		if (!isOpen) return;

		const frame = requestAnimationFrame(() => {
			if (!shouldFocusPaletteInputRef.current) return;

			shouldFocusPaletteInputRef.current = false;
			paletteInputRef.current?.focus();
			paletteInputRef.current?.select();
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closePalette();
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [closePalette, isOpen]);

	useEffect(() => {
		if (!shouldSearch) return;

		let isCurrentSearch = true;

		const search = async () => {
			const data = await searchAction(deferredQuery, filter);

			if (!isCurrentSearch) return;

			setSearchState({
				query: deferredQuery,
				filter,
				results: data
			});
			setActiveIndex(0);

			if (allowAutoOpen && deferredQuery.trim().length > 0 && data.length > 0) {
				shouldFocusPaletteInputRef.current = true;
				setIsOpen(true);
			}
		};

		search();

		return () => {
			isCurrentSearch = false;
		};
	}, [allowAutoOpen, deferredQuery, filter, shouldSearch]);

	useEffect(() => {
		if (!isOpen || isLoading) return;

		selectedItemRef.current?.scrollIntoView({
			block: "nearest"
		});
	}, [activeIndex, isLoading, isOpen]);

	const groupedResults = useMemo(() => {
		return GROUPS.map((group) => ({
			group,
			items: results
				.map((result, index) => ({
					result,
					index
				}))
				.filter(({ result }) => result.type === group)
		})).filter(({ items }) => items.length > 0);
	}, [results]);

	const handleResultSelect = useCallback((result: SearchResult) => {
		setAllowAutoOpen(false);
		setQuery(result.title);
		setIsOpen(false);
	}, []);

	const handleCommandKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
		if (event.defaultPrevented) return;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			if (!isOpen && results.length > 0) {
				shouldFocusPaletteInputRef.current = true;
				setIsOpen(true);
			}

			setActiveIndex((current) => {
				if (results.length === 0) return 0;
				return current >= results.length - 1 ? 0 : current + 1;
			});
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (!isOpen && results.length > 0) {
				shouldFocusPaletteInputRef.current = true;
				setIsOpen(true);
			}

			setActiveIndex((current) => {
				if (results.length === 0) return 0;
				return current <= 0 ? results.length - 1 : current - 1;
			});
		}

		if (event.key === "Enter" && activeResult) {
			event.preventDefault();
			handleResultSelect(activeResult);
		}
	};

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.18), transparent)`;

	return (
		<Fragment>
			<form
				role="search"
				className="group relative flex h-[2.5rem] w-[14.188rem] items-center overflow-hidden rounded-[0.75rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-150) transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200) focus-within:border-(--geek-blue-4) focus-within:bg-(--geek-blue-primary-opacity-200) focus-within:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)]"
				onSubmit={(event) => {
					event.preventDefault();

					if (activeResult) {
						handleResultSelect(activeResult);
					}
				}}
			>
				<span className="absolute left-[1rem] flex items-center">
					<MotionIcon
						isActive={isOpen}
						type={MOTION_ICON_TYPES.Search}
						className="h-[1rem]! w-[1rem]! text-(--neutrals-3)"
					/>
				</span>
				<label htmlFor={inputId} className="sr-only">
					Search
				</label>
				<input
					ref={inlineInputRef}
					id={inputId}
					type="text"
					role="combobox"
					value={query}
					aria-autocomplete="list"
					autoComplete="off"
					spellCheck={false}
					placeholder="Search"
					className="h-full min-w-0 flex-1 bg-transparent pl-[2.5rem] pr-[0.5rem] font-(family-name:--font-barlow) text-[0.875rem] font-medium leading-[1rem] tracking-[0.01em] text-(--white-pallete-100) caret-(--geek-blue-4) outline-none placeholder:text-(--neutrals-3) selection:bg-(--daybreak-blue-400) selection:text-(--white-pallete-100)"
					aria-haspopup="dialog"
					aria-expanded={isOpen}
					aria-controls={isOpen ? listboxId : undefined}
					aria-activedescendant={isOpen ? activeOptionId : undefined}
					onChange={(event) => {
						handleQueryChange(event.target.value);
					}}
					onKeyDown={handleCommandKeyDown}
				/>
				{isLoading && !isOpen && (
					<Spinner size={18} backgroundColor="transparent" className="mr-[0.375rem] shrink-0" />
				)}
				<button
					type="button"
					className="mr-[0.5rem] shrink-0 cursor-pointer rounded-[0.375rem] border border-(--white-pallete-10) bg-(--white-pallete-50) px-[0.375rem] py-[0.188rem] text-[0.625rem] font-medium leading-none text-(--white-pallete-40) transition-colors duration-200 hover:text-(--white-pallete-100) focus-visible:outline-none focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)]"
					aria-label="Open command palette"
					onClick={openPalette}
				>
					Ctrl K
				</button>
			</form>
			<AnimatePresence>
				{isOpen && (
					<Fragment>
						<motion.div
							className="fixed inset-0 z-40 bg-(--geek-blue-11)/70 backdrop-blur-[0.75rem]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={closePalette}
						/>
						<motion.div
							role="dialog"
							aria-modal="true"
							aria-label="Command palette"
							className="fixed inset-x-[1rem] top-[10vh] z-50 mx-auto w-[calc(100%-2rem)] max-w-[45rem] overflow-hidden rounded-[1.5rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-[#060918]/95 shadow-[0_2.5rem_7.5rem_rgba(0,0,0,0.65)] backdrop-blur-3xl sm:top-[12vh]"
							initial={{ opacity: 0, scale: 0.96, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.98, y: 10 }}
							transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
							onMouseMove={(event) => {
								const rect = event.currentTarget.getBoundingClientRect();

								mouseX.set(event.clientX - rect.left);
								mouseY.set(event.clientY - rect.top);
							}}
							onKeyDown={handleCommandKeyDown}
						>
							<motion.div
								className="pointer-events-none absolute inset-0"
								style={{
									maskImage,
									WebkitMaskImage: maskImage,
									background: "linear-gradient(135deg, rgba(133,165,255,0.16), transparent 55%)"
								}}
							/>
							<div className="relative border-b-[0.031rem] border-solid border-(--white-pallete-10) px-[1rem] py-[0.875rem] sm:px-[1.25rem]">
								<div className="relative">
									<span className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
										<MotionIcon
											isActive
											type={MOTION_ICON_TYPES.Search}
											className="h-[1.125rem]! w-[1.125rem]! text-(--neutrals-3)"
										/>
									</span>
									<label htmlFor={paletteInputId} className="sr-only">
										Search users, projects, and tasks
									</label>
									<input
										ref={paletteInputRef}
										id={paletteInputId}
										type="text"
										role="combobox"
										value={query}
										aria-autocomplete="list"
										aria-controls={listboxId}
										aria-expanded={isOpen}
										aria-activedescendant={activeOptionId}
										autoComplete="off"
										spellCheck={false}
										placeholder="Search users, projects or tasks..."
										className="h-[3rem] w-full bg-transparent pl-[2rem] pr-[4rem] font-(family-name:--font-barlow) text-[1rem] font-medium leading-[1.25rem] tracking-[0.01em] text-(--white-pallete-100) caret-(--geek-blue-4) outline-none placeholder:text-(--neutrals-3) selection:bg-(--daybreak-blue-400) selection:text-(--white-pallete-100)"
										onChange={(event) => {
											handleQueryChange(event.target.value);
										}}
										onKeyDown={handleCommandKeyDown}
									/>
									<span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-[0.5rem] border border-(--white-pallete-10) bg-(--white-pallete-50) px-[0.5rem] py-[0.25rem] text-[0.688rem] font-medium leading-none text-(--white-pallete-40)">
										ESC
									</span>
								</div>
							</div>
							<div className="relative flex gap-[0.5rem] overflow-x-auto border-b-[0.031rem] border-solid border-(--white-pallete-10) p-[0.75rem]">
								{FILTERS.map((item) => {
									const active = filter === item;

									return (
										<motion.button
											key={item}
											type="button"
											className={`relative shrink-0 cursor-pointer overflow-hidden rounded-[0.625rem] px-[0.75rem] py-[0.5rem] font-(family-name:--font-barlow) text-[0.75rem] font-semibold leading-[1rem] capitalize tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)] ${active ? "text-(--white-pallete-100)" : "text-(--neutrals-3) hover:text-(--white-pallete-100)"}`}
											aria-pressed={active}
											whileTap={{ scale: 0.96 }}
											onClick={() => {
												setFilter(item);
											}}
										>
											{active && (
												<motion.span
													layoutId="active-search-filter"
													className="absolute inset-0 rounded-[0.625rem] border border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-300)"
													transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
												/>
											)}
											<span className="relative z-10">{item}</span>
										</motion.button>
									);
								})}
							</div>
							<div className="relative max-h-[26.25rem] overflow-y-auto p-[0.5rem]">
								<AnimatePresence mode="wait" initial={false}>
									{isLoading ? (
										<motion.div
											key="loading"
											className="flex min-h-[13.5rem] items-center justify-center gap-[0.75rem] font-(family-name:--font-barlow) text-[0.875rem] font-medium text-(--neutrals-3)"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<Spinner size={24} backgroundColor="transparent" className="shrink-0" />
											<span>Searching...</span>
										</motion.div>
									) : results.length === 0 ? (
										<motion.div
											key="empty"
											className="flex min-h-[13.5rem] items-center justify-center px-[1rem] text-center font-(family-name:--font-barlow) text-[0.875rem] font-medium text-(--neutrals-3)"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											No matching users, projects, or tasks.
										</motion.div>
									) : (
										<motion.div
											key="results"
											id={listboxId}
											role="listbox"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											{groupedResults.map(({ group, items }) => (
												<section key={group} className="mb-[1rem] last:mb-0">
													<div className="px-[0.75rem] pb-[0.5rem] font-(family-name:--font-barlow) text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[0.18em] text-(--white-pallete-40)">
														{group}
													</div>
													<div className="space-y-[0.25rem]">
														{items.map(({ result, index }) => {
															const active = activeIndex === index;

															return (
																<motion.button
																	ref={active ? selectedItemRef : undefined}
																	key={result.id}
																	id={`${listboxId}-${result.id}`}
																	type="button"
																	role="option"
																	aria-selected={active}
																	className={`group relative flex w-full cursor-pointer items-center gap-[0.875rem] overflow-hidden rounded-[0.875rem] border-[0.031rem] border-solid p-[0.75rem] text-left transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:shadow-[0_0_0_0.125rem_var(--daybreak-blue-200)] ${active ? "border-(--geek-blue-4) bg-(--geek-blue-primary-opacity-300)" : "border-transparent hover:border-(--white-pallete-10) hover:bg-(--white-pallete-50)"}`}
																	initial={{ opacity: 0, y: 8 }}
																	animate={{ opacity: 1, y: 0 }}
																	whileHover={{ y: -1 }}
																	onMouseEnter={() => {
																		setActiveIndex(index);
																	}}
																	onClick={() => {
																		handleResultSelect(result);
																	}}
																>
																	<span className="relative z-10 flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[0.75rem] border border-(--white-pallete-10) bg-(--white-pallete-50)">
																		<MotionIcon
																			isActive={active}
																			type={MOTION_ICON_TYPES[result.icon]}
																			className="h-[1.125rem]! w-[1.125rem]! text-(--white-pallete-100)"
																		/>
																	</span>
																	<span className="relative z-10 min-w-0 flex-1">
																		<span className="block truncate font-(family-name:--font-barlow) text-[0.875rem] font-semibold leading-[1.125rem] tracking-[0.01em] text-(--white-pallete-100)">
																			{result.title}
																		</span>
																		<span className="mt-[0.125rem] block truncate font-(family-name:--font-barlow) text-[0.75rem] font-medium leading-[1rem] tracking-[0.01em] text-(--neutrals-3)">
																			{result.description}
																		</span>
																	</span>
																	{result.shortcut && (
																		<span className="relative z-10 hidden shrink-0 rounded-[0.375rem] border border-(--white-pallete-10) bg-(--white-pallete-50) px-[0.5rem] py-[0.25rem] text-[0.625rem] font-medium leading-none text-(--white-pallete-40) sm:inline-flex">
																			{result.shortcut}
																		</span>
																	)}
																</motion.button>
															);
														})}
													</div>
												</section>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							<div className="relative flex items-center justify-between border-t-[0.031rem] border-solid border-(--white-pallete-10) px-[1rem] py-[0.75rem] font-(family-name:--font-barlow) text-[0.688rem] font-medium leading-none text-(--white-pallete-40)">
								<div className="flex items-center gap-[1rem]">
									<span>Up/Down Navigate</span>
									<span>Enter Select</span>
								</div>
								<span>Esc Close</span>
							</div>
						</motion.div>
					</Fragment>
				)}
			</AnimatePresence>
		</Fragment>
	);
};
