import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

import type { SelectItemRecord } from "./select";

export const getTextContent = (children: ReactNode): string => {
	let text = "";

	Children.forEach(children, (child) => {
		if (typeof child === "string" || typeof child === "number") {
			text += child;
			return;
		}

		if (isValidElement<{ children?: ReactNode }>(child)) {
			text += getTextContent(child.props.children);
		}
	});

	return text;
};

export const getDeclaredItems = (children: ReactNode): SelectItemRecord[] => {
	const items: SelectItemRecord[] = [];

	Children.forEach(children, (child) => {
		if (!isValidElement<{ children?: ReactNode; disabled?: boolean; id?: string; value?: string }>(child)) return;

		const component = child.type as { __selectItem?: boolean };

		if (component.__selectItem && child.props.value) {
			items.push({
				disabled: Boolean(child.props.disabled),
				id: child.props.id ?? "",
				label: getTextContent(child.props.children),
				value: child.props.value
			});
			return;
		}

		items.push(...getDeclaredItems(child.props.children));
	});

	return items;
};

export const getNextEnabledItem = (items: SelectItemRecord[], currentItemId: string | null, direction: 1 | -1) => {
	const enabledItems = items.filter(({ disabled }) => !disabled);

	if (!enabledItems.length) return null;

	const currentIndex = enabledItems.findIndex(({ id }) => id === currentItemId);
	const nextIndex = currentIndex < 0 ? 0 : (currentIndex + direction + enabledItems.length) % enabledItems.length;

	return enabledItems[nextIndex] ?? null;
};
