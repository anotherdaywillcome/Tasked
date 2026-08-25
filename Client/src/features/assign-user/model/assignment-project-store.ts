"use client";

import { useSyncExternalStore } from "react";

let selectedProjectId: string | null = null;
const listeners = new Set<() => void>();

export const selectAssignmentProject = (projectId: string) => {
	selectedProjectId = projectId;
	listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
};

const getSnapshot = () => selectedProjectId;
const getServerSnapshot = () => null;

export const useAssignmentProjectId = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
