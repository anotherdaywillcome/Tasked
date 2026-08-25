import type { ReactNode, Ref, RefCallback } from "react";
import { Children, isValidElement } from "react";

import type { DropdownMenuItemRecord } from "./types";

const MODIFIER_KEYS = {
	alt: ["alt", "option", "⌥"],
	ctrl: ["control", "ctrl", "⌃"],
	meta: ["command", "cmd", "meta", "⌘"],
	shift: ["shift", "⇧"]
} as const;

export const matchesShortcut = (event: KeyboardEvent, shortcut: string) => {
	const keys = shortcut
		.split("+")
		.map((key) => key.trim().toLowerCase())
		.filter(Boolean);
	const includesModifier = (modifier: keyof typeof MODIFIER_KEYS) =>
		keys.some((key) => MODIFIER_KEYS[modifier].some((alias) => alias === key));
	const shortcutKey = keys.find(
		(key) => !Object.values(MODIFIER_KEYS).some((aliases) => aliases.some((alias) => alias === key))
	);
	const usesMetaAsPrimaryModifier = /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
	const expectsPrimaryModifier = includesModifier("meta");
	const expectsControl = includesModifier("ctrl") || (expectsPrimaryModifier && !usesMetaAsPrimaryModifier);
	const expectsMeta = expectsPrimaryModifier && usesMetaAsPrimaryModifier;

	if (!shortcutKey || event.repeat) return false;

	return (
		event.key.toLowerCase() === shortcutKey &&
		event.altKey === includesModifier("alt") &&
		event.ctrlKey === expectsControl &&
		event.metaKey === expectsMeta &&
		event.shiftKey === includesModifier("shift")
	);
};

export const getElementById = <TElement extends HTMLElement>(id: string) => {
	if (typeof document === "undefined") return null;

	return document.getElementById(id) as TElement | null;
};

export const getNextEnabledItem = (
	items: DropdownMenuItemRecord[],
	currentItemId: string | null,
	direction: 1 | -1
) => {
	const enabledItems = items.filter((item) => !item.disabled);

	if (!enabledItems.length) return null;

	const currentIndex = enabledItems.findIndex((item) => item.id === currentItemId);
	const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + enabledItems.length) % enabledItems.length;

	return enabledItems[nextIndex] ?? null;
};

export const getFirstEnabledItem = (items: DropdownMenuItemRecord[]) => items.find((item) => !item.disabled) ?? null;

export const getLastEnabledItem = (items: DropdownMenuItemRecord[]) => items.findLast((item) => !item.disabled) ?? null;

export const getTextContent = (children: ReactNode): string => {
	let textContent = "";

	Children.forEach(children, (child) => {
		if (typeof child === "string" || typeof child === "number") {
			textContent += child;
			return;
		}

		if (isValidElement<{ children?: ReactNode }>(child)) {
			textContent += getTextContent(child.props.children);
		}
	});

	return textContent;
};

export const callAll =
	<TEvent>(...handlers: Array<((event: TEvent) => void) | undefined>) =>
	(event: TEvent) => {
		handlers.forEach((handler) => handler?.(event));
	};

export const mergeRefs =
	<TElement>(...refs: Array<Ref<TElement> | undefined>): RefCallback<TElement> =>
	(element) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(element);
				return;
			}

			if (ref && "current" in ref) {
				ref.current = element;
			}
		});
	};
