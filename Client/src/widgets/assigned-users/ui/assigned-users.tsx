"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { Project } from "@entities/projects";
import type { Assignee } from "@entities/tasks";
import { projectQueries } from "@entities/projects/api/project.queries";

import type { AvatarStackDirectionVariant, AvatarStackVariant } from "@shared/ui";
import { AvatarStack } from "@shared/ui";

import { ASSIGNED_USERS_DEFAULT_SETTINGS } from "../config";

import { AssignedUsersSkeleton } from "./assigned-users-skeleton";

type AssignedUsersProps = {
	project: Omit<Project, "taskSummary">;
	max?: number;
	direction?: AvatarStackDirectionVariant;
	variant?: AvatarStackVariant;
	onLoadSuccess?: () => void;
};

export const AssignedUsers = ({
	project: { id },
	max = ASSIGNED_USERS_DEFAULT_SETTINGS.max,
	direction = ASSIGNED_USERS_DEFAULT_SETTINGS.direction,
	variant = ASSIGNED_USERS_DEFAULT_SETTINGS.variant,
	onLoadSuccess
}: Readonly<AssignedUsersProps>) => {
	const {
		data: assignedUsers,
		isPending,
		isError,
		isFetching,
		isRefetching
	} = useQuery(projectQueries.assignees(id));

	// if (isFetching || isRefetching) {
	// 	return <AssignedUsersSkeleton max={max} />;
	// }

	// TODO
	// Why when reload page refetch happens ?

	useEffect(() => {
		if (!isPending && !isError) {
			onLoadSuccess?.();
		}
	}, [isPending, isError, onLoadSuccess]);

	if (!assignedUsers && isFetching) {
		return <AssignedUsersSkeleton max={max} />;
	}

	if (isRefetching) {
		// Show something
	}

	if (isError) {
		return null;
	}

	return (
		<AvatarStack
			max={max}
			users={assignedUsers as unknown as Array<Assignee>}
			variant={variant}
			direction={direction}
		/>
	);
};
