import type { ReactNode } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";

import { SelectContext } from "./context";
import { getDeclaredItems, getNextEnabledItem } from "./lib";
import { SelectOption, SelectPosition } from "./select";

type SelectProviderProps = {
	children: ReactNode;
	id?: string;
	className?: string;
	defaultOpen?: boolean;
	defaultValue?: string;
	disabled?: boolean;
	name?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
	open?: boolean;
	required?: boolean;
	value?: string;
};

export const SelectProvider = ({
	children,
	className,
	defaultOpen = false,
	defaultValue,
	disabled = false,
	id,
	name,
	onOpenChange,
	onValueChange,
	open,
	required,
	value,
	...props
}: Readonly<SelectProviderProps>) => {
	const generatedId = useId();
	const triggerId = id ?? generatedId;
	const contentId = `${triggerId}-content`;

	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const [activeItemId, setActiveItemId] = useState<string | null>(null);
	const [position, setPosition] = useState<SelectPosition | null>(null);

	const [registeredItems, setRegisteredItems] = useState<SelectOption[]>([]);

	const typeaheadRef = useRef("");
	const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const declaredItems = useMemo(() => getDeclaredItems(children), [children]);
	const enabledItems = registeredItems.filter(({ disabled: itemDisabled }) => !itemDisabled);

	const isOpenControlled = open !== undefined;
	const isValueControlled = value !== undefined;

	const isOpen = isOpenControlled ? open : uncontrolledOpen;

	const selectedValue = isValueControlled ? value : uncontrolledValue;
	const selectedItem = [...registeredItems, ...declaredItems].find(
		({ value: itemValue }) => itemValue === selectedValue
	);

	const setOpen = useCallback(
		(nextOpen: boolean) => {
			if (disabled && nextOpen) {
				return;
			}

			if (!nextOpen) {
				setActiveItemId(null);
			}

			if (!isOpenControlled) {
				setUncontrolledOpen(nextOpen);
			}

			onOpenChange?.(nextOpen);
		},
		[disabled, isOpenControlled, onOpenChange]
	);

	const updatePosition = useCallback(() => {
		const rect = triggerRef.current?.getBoundingClientRect();

		if (!rect) {
			return;
		}

		setPosition({
			left: rect.left,
			top: rect.bottom + 4,
			triggerHeight: rect.height,
			triggerTop: rect.top,
			width: rect.width
		});
	}, []);

	const registerItem = useCallback(
		(item: SelectOption) => {
			setRegisteredItems((current) => [...current.filter(({ id: itemId }) => itemId !== item.id), item]);
			setActiveItemId((current) => (item.value === selectedValue ? item.id : (current ?? item.id)));

			return () => setRegisteredItems((current) => current.filter(({ id: itemId }) => itemId !== item.id));
		},
		[selectedValue]
	);

	const selectItem = useCallback(
		(item: SelectOption) => {
			if (item.disabled) {
				return;
			}

			if (!isValueControlled) {
				setUncontrolledValue(item.value);
			}

			onValueChange?.(item.value);

			setOpen(false);

			queueMicrotask(() => triggerRef.current?.focus());
		},
		[isValueControlled, onValueChange, setOpen]
	);

	const setFirstItemActive = useCallback(() => {
		setActiveItemId(enabledItems[0]?.id ?? null);
	}, [enabledItems]);

	const setLastItemActive = useCallback(() => {
		setActiveItemId(enabledItems.at(-1)?.id ?? null);
	}, [enabledItems]);

	const setNextItemActive = useCallback(
		(direction: 1 | -1) => {
			setActiveItemId(getNextEnabledItem(registeredItems, activeItemId, direction)?.id ?? null);
		},
		[activeItemId, registeredItems]
	);

	const selectActiveItem = useCallback(() => {
		const item = registeredItems.find(({ id: itemId }) => itemId === activeItemId);

		if (item) {
			selectItem(item);
		}
	}, [activeItemId, registeredItems, selectItem]);

	const typeahead = useCallback(
		(character: string) => {
			if (typeaheadTimerRef.current) {
				clearTimeout(typeaheadTimerRef.current);
			}
			typeaheadRef.current += character.toLocaleLowerCase();

			const match = enabledItems.find(({ label }) => label.toLocaleLowerCase().startsWith(typeaheadRef.current));
			if (match) {
				setActiveItemId(match.id);
			}

			typeaheadTimerRef.current = setTimeout(() => {
				typeaheadRef.current = "";
			}, 500);
		},
		[enabledItems]
	);

	useLayoutEffect(() => {
		if (!isOpen) {
			return;
		}

		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [isOpen, updatePosition]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			if (!(event.target instanceof Node)) {
				return;
			}

			if (triggerRef.current?.contains(event.target) || contentRef.current?.contains(event.target)) {
				return;
			}

			setOpen(false);
		};

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, [isOpen, setOpen]);

	useEffect(
		() => () => {
			if (typeaheadTimerRef.current) {
				clearTimeout(typeaheadTimerRef.current);
			}
		},
		[]
	);

	return (
		<SelectContext
			value={{
				activeItemId,
				contentId,
				contentRef,
				disabled,
				open: isOpen,
				position,
				registerItem,
				required: Boolean(required),
				selectedLabel: selectedItem?.label ?? null,
				selectedValue,
				selectActiveItem,
				selectItem,
				setActiveItemId,
				setFirstItemActive,
				setLastItemActive,
				setNextItemActive,
				setOpen,
				triggerId,
				triggerRef,
				typeahead,
				updatePosition
			}}
		>
			<div className={clsx("flex flex-col gap-y-[0.25rem]", className)} {...props}>
				{name && (
					<input
						type="hidden"
						name={name}
						value={selectedValue ?? ""}
						required={required}
						disabled={disabled}
					/>
				)}
				{children}
			</div>
		</SelectContext>
	);
};
