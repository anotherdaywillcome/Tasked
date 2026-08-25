"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { use, useMemo, useState } from "react";

import { DrawerContext } from "@widgets/drawer/model";

import { Button, BUTTON_VARIANTS, Checkbox, Input, Spinner } from "@shared/ui";

import { assignableUsersQueryOptions, assignmentUsersQueryKey, assignUsers } from "../api";
import { type GetAssignableUsersResponse, useAssignmentProjectId } from "../model";

type AssignUserDrawerContentProps = {
	projectId: string;
};

const AssignUserDrawerContent = ({ projectId }: Readonly<AssignUserDrawerContentProps>) => {
	const queryClient = useQueryClient();
	const { close } = use(DrawerContext);
	const [search, setSearch] = useState("");
	const [toggledUserIds, setToggledUserIds] = useState<Set<string>>(new Set());

	const { data, isPending, isError, refetch } = useQuery(assignableUsersQueryOptions(projectId));

	const selectedUserIds = useMemo(
		() =>
			new Set(
				(data?.users ?? [])
					.filter(({ id, isAssigned }) => (toggledUserIds.has(id) ? !isAssigned : isAssigned))
					.map(({ id }) => id)
			),
		[data, toggledUserIds]
	);

	const visibleUsers = useMemo(() => {
		const normalizedSearch = search.trim().toLocaleLowerCase();

		if (!normalizedSearch) return data?.users ?? [];

		return (data?.users ?? []).filter(({ fullName, email }) =>
			`${fullName} ${email}`.toLocaleLowerCase().includes(normalizedSearch)
		);
	}, [data, search]);

	const {
		mutate,
		isPending: isSaving,
		isError: isSaveError
	} = useMutation({
		mutationFn: () => assignUsers({ projectId, userIds: Array.from(selectedUserIds) }),
		onSuccess: () => {
			queryClient.setQueryData<GetAssignableUsersResponse>(assignmentUsersQueryKey(projectId), (current) => ({
				users: (current?.users ?? []).map((user) => ({ ...user, isAssigned: selectedUserIds.has(user.id) }))
			}));
			close("assign-user");
		}
	});

	const toggleUser = (userId: string) => {
		setToggledUserIds((current) => {
			const next = new Set(current);

			if (next.has(userId)) next.delete(userId);
			else next.add(userId);

			return next;
		});
	};

	return (
		<div className="relative z-10 flex h-[calc(100%-1.25rem)] min-h-0 flex-col pt-[1.25rem] font-(family-name:--font-barlow)">
			<div className="shrink-0 px-[0.75rem]">
				<p className="text-[0.75rem] font-medium leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
					Choose who can collaborate on this project. You can update the team again at any time.
				</p>

				<div className="mt-[1.25rem]">
					<Input
						type="search"
						label="Find a team member"
						name="assign-user-search"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search by name or email"
						autoComplete="off"
					/>
				</div>

				<div className="mt-[1rem] flex items-center justify-between border-b-[0.031rem] border-(--white-pallete-10) pb-[0.625rem]">
					<h4 className="text-[0.625rem] font-bold leading-[140%] tracking-[0.04em] text-(--neutrals-2) uppercase">
						Project members
					</h4>
					<span className="rounded-full bg-(--geek-blue-primary-opacity-200) px-[0.5rem] py-[0.188rem] text-[0.625rem] font-bold text-(--geek-blue-4)">
						{selectedUserIds.size} selected
					</span>
				</div>
			</div>

			<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[0.75rem] py-[0.75rem] [scrollbar-color:var(--geek-blue-6)_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin]">
				{isPending && (
					<div
						className="flex min-h-[12rem] items-center justify-center"
						role="status"
						aria-label="Loading users"
					>
						<Spinner size={40} />
					</div>
				)}

				{isError && (
					<div className="flex min-h-[12rem] flex-col items-center justify-center gap-[1rem] text-center">
						<p className="text-[0.875rem] font-medium text-(--neutrals-3)">We could not load the users.</p>
						<Button type="button" variant={BUTTON_VARIANTS.Secondary} onClick={() => void refetch()}>
							Try again
						</Button>
					</div>
				)}

				{!isPending && !isError && visibleUsers.length === 0 && (
					<p className="py-[3rem] text-center text-[0.875rem] font-medium text-(--neutrals-3)">
						No users match your search.
					</p>
				)}

				{!isPending && !isError && visibleUsers.length > 0 && (
					<ul className="flex flex-col gap-[0.5rem] pb-[0.25rem]" role="list">
						{visibleUsers.map(({ id, fullName, email, imageUrl }) => {
							const isSelected = selectedUserIds.has(id);

							return (
								<li key={id}>
									<div className="flex items-center rounded-[0.875rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-100) p-[0.5rem] transition-[background-color,border-color] hover:border-(--white-pallete-20) hover:bg-(--geek-blue-primary-opacity-200)">
										<Image
											src={imageUrl}
											width={40}
											height={40}
											alt=""
											className="h-[2.5rem] w-[2.5rem] shrink-0 rounded-full border-[0.031rem] border-(--white-pallete-10) object-cover"
										/>
										<span className="ml-[0.625rem] min-w-0 flex-1">
											<strong className="block truncate text-[0.875rem] font-bold leading-[129%] tracking-[0.01em] text-(--white-pallete-100)">
												{fullName}
											</strong>
											<span className="mt-[0.188rem] block truncate text-[0.6875rem] font-medium leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
												{email}
											</span>
										</span>
										<Checkbox
											label={`${isSelected ? "Remove" : "Assign"} ${fullName}`}
											name="assignedUserIds"
											value={id}
											checked={isSelected}
											disabled={isSaving}
											onChange={() => toggleUser(id)}
										/>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			<div className="shrink-0 border-t-[0.031rem] border-(--white-pallete-10) px-[0.75rem] pt-[0.75rem]">
				{isSaveError && (
					<p
						className="mb-[0.5rem] text-center text-[0.75rem] font-medium text-(--accent-color-dengerous-4)"
						role="alert"
					>
						The assignment could not be saved. Please try again.
					</p>
				)}
				<div className="flex items-center justify-between gap-[0.75rem]">
					<p className="text-[0.75rem] font-medium text-(--neutrals-3)" aria-live="polite">
						{toggledUserIds.size === 0
							? "No changes"
							: `${toggledUserIds.size} ${toggledUserIds.size === 1 ? "change" : "changes"}`}
					</p>
					<Button
						type="button"
						className="min-w-[8.75rem]"
						disabled={isSaving || isPending || isError || toggledUserIds.size === 0}
						onClick={() => mutate()}
					>
						{isSaving ? "Saving..." : "Save members"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const AssignUserDrawer = () => {
	const projectId = useAssignmentProjectId();

	if (!projectId) {
		return (
			<div className="relative flex flex-1 items-center justify-center px-[1rem] py-[4rem] text-center font-(family-name:--font-barlow) text-[0.875rem] text-(--neutrals-3)">
				Choose a project before assigning users.
			</div>
		);
	}

	return <AssignUserDrawerContent key={projectId} projectId={projectId} />;
};
