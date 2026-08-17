"use client";

import type { ReactElement } from "react";
import { Children, isValidElement, useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS, type GridLayoutManagerSettings } from "../config/manager";
import { GridContainerContext } from "../lib/hooks/use-grid-container";
import { useGridMeasurements } from "../lib/hooks/use-grid-measurements";
import { hasCollision } from "../lib/utils/has-collision";
import { useActiveLayout, useEditMode } from "../model/selectors";
import { useDashboardLayoutStore } from "../model/store";
import type { DashboardWidget as DashboardWidgetType, DashboardWidgetDefinition } from "../model/types";

import { GridLayoutManagerComponent } from "./grid-layout-manager-component";
import { GridLayoutManagerComponentGhostLayer } from "./grid-layout-manager-component-ghost-layer";

type GridLayoutManagerComponents = {
	Component: typeof GridLayoutManagerItem;
};

type GridLayoutManagerItemProps = {
	type: string;
	label: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	minH?: number;
	maxW?: number;
	maxH?: number;
	defaultVisible?: boolean;
	children: ReactElement;
};

type GridLayoutManagerProps = {
	children?: ReactElement | ReactElement[];
	columns?: number;
	rows?: number;
	rowWidth?: GridLayoutManagerSettings["rowWidth"];
	rowHeight?: GridLayoutManagerSettings["rowHeight"];
	columnGap?: GridLayoutManagerSettings["columnGap"];
	rowGap?: GridLayoutManagerSettings["rowGap"];
	minHeight?: GridLayoutManagerSettings["minHeight"];
	swapOverlapThreshold?: number;
};

type GridLayoutManager = ((props: Readonly<GridLayoutManagerProps>) => ReactElement) & GridLayoutManagerComponents;

const normalizeTrackSize = (value: number | undefined) => {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
};

const GridLayoutManagerItem = (props: Readonly<GridLayoutManagerItemProps>) => {
	void props;

	return null;
};

export const GridLayoutManager = (({
	children,
	columns = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.columns,
	rows = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.rows,
	rowWidth = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.rowWidth,
	rowHeight = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.rowHeight,
	columnGap = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.columnGap,
	rowGap = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.rowGap,
	minHeight = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.minHeight,
	swapOverlapThreshold = DEFAULT_GRID_LAYOUT_MANAGER_SETTINGS.swapOverlapThreshold
}: Readonly<GridLayoutManagerProps>) => {
	const widgets = useActiveLayout();

	const editMode = useEditMode();
	const setGridSettings = useDashboardLayoutStore((state) => state.setGridSettings);
	const registerWidgets = useDashboardLayoutStore((state) => state.registerWidgets);
	const removeWidget = useDashboardLayoutStore((state) => state.removeWidget);

	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	const [ghost, setGhost] = useState<{
		widget: DashboardWidgetType | null;
		invalid: boolean;
	}>({
		widget: null,
		invalid: false
	});

	const gridSettings = useMemo<GridLayoutManagerSettings>(
		() => ({
			columns: Math.max(1, Math.floor(columns)),
			rows: Math.max(1, Math.floor(rows)),
			rowWidth: normalizeTrackSize(rowWidth),
			rowHeight: normalizeTrackSize(rowHeight),
			columnGap,
			rowGap,
			minHeight,
			swapOverlapThreshold
		}),
		[columnGap, columns, minHeight, rowGap, rowHeight, rows, rowWidth, swapOverlapThreshold]
	);
	const gridCellCount = gridSettings.columns * gridSettings.rows;
	const gridTemplateColumns = `repeat(${gridSettings.columns}, ${
		gridSettings.rowWidth ? `${gridSettings.rowWidth}px` : "minmax(0, 1fr)"
	})`;
	const gridTemplateRows = `repeat(${gridSettings.rows}, ${
		gridSettings.rowHeight ? `${gridSettings.rowHeight}px` : "minmax(0, 1fr)"
	})`;
	const sizes = useGridMeasurements(container, gridSettings);
	const contextValue = useMemo(
		() => ({
			...sizes,
			columns: gridSettings.columns,
			rows: gridSettings.rows,
			swapOverlapThreshold: gridSettings.swapOverlapThreshold
		}),
		[sizes, gridSettings.columns, gridSettings.rows, gridSettings.swapOverlapThreshold]
	);

	const declaredWidgets = useMemo(() => {
		return Children.toArray(children).filter((child): child is ReactElement<GridLayoutManagerItemProps> =>
			isValidElement<GridLayoutManagerItemProps>(child)
		);

		// && child.type === GridLayoutManagerItem
	}, [children]);

	const widgetDefinitions = useMemo<DashboardWidgetDefinition[]>(() => {
		return declaredWidgets.map(({ props }) => ({
			type: props.type,
			label: props.label,
			x: props.x,
			y: props.y,
			w: props.w,
			h: props.h,
			minW: props.minW ?? Math.min(props.w, 4),
			minH: props.minH ?? Math.min(props.h, 4),
			maxW: props.maxW,
			maxH: props.maxH,
			defaultVisible: props.defaultVisible
		}));
	}, [declaredWidgets]);

	const widgetContentByType = useMemo(() => {
		return new Map(declaredWidgets.map((widget) => [widget.props.type, widget.props.children]));
	}, [declaredWidgets]);

	useEffect(() => {
		setGridSettings(gridSettings);
	}, [gridSettings, setGridSettings]);

	useEffect(() => {
		registerWidgets(widgetDefinitions);
	}, [registerWidgets, widgetDefinitions]);

	const setContainerRef = useCallback((node: HTMLDivElement | null) => {
		setContainer(node);
	}, []);

	const updateGhost = useCallback((widget: DashboardWidgetType | null) => {
		const state = useDashboardLayoutStore.getState();
		const activeLayout = state.draftLayout ?? state.layout;

		setGhost({
			widget,
			invalid: widget ? hasCollision(activeLayout, widget) : false
		});
	}, []);

	// console.log("declaredWidgets", declaredWidgets);
	// console.log("children", children);

	return (
		<GridContainerContext.Provider value={contextValue}>
			<main
				ref={setContainerRef}
				className={[
					"relative",
					"isolate",
					"grid",
					"overflow-hidden",
					"min-h-0",
					"shrink-0",
					"w-full",
					"mt-[1.25rem]"
				].join(" ")}
				style={{
					width: gridSettings.rowWidth && sizes.gridWidth ? `${sizes.gridWidth}px` : undefined,
					height: sizes.gridHeight ? `${sizes.gridHeight}px` : undefined,
					minHeight: gridSettings.minHeight,
					columnGap: gridSettings.columnGap,
					rowGap: gridSettings.rowGap,
					gridTemplateColumns,
					gridTemplateRows
				}}
			>
				{editMode && (
					<div
						aria-hidden="true"
						className={["pointer-events-none", "absolute", "inset-0", "z-0", "grid"].join(" ")}
						style={{
							columnGap: gridSettings.columnGap,
							rowGap: gridSettings.rowGap,
							gridTemplateColumns,
							gridTemplateRows
						}}
					>
						{Array.from({ length: gridCellCount }).map((_, index) => (
							<div key={index} className="rounded-[2px] border border-sky-300/25 bg-sky-300/5" />
						))}
					</div>
				)}
				{widgets.map((widget) => {
					const content = widgetContentByType.get(widget.type);

					if (!content) {
						return null;
					}

					return (
						<GridLayoutManagerComponent
							key={widget.id}
							widget={widget}
							onPreviewChange={updateGhost}
							onRemove={removeWidget}
						>
							{content}
						</GridLayoutManagerComponent>
					);
				})}
				<GridLayoutManagerComponentGhostLayer widget={ghost.widget} invalid={ghost.invalid} />
			</main>
		</GridContainerContext.Provider>
	);
}) as GridLayoutManager;

GridLayoutManager.Component = GridLayoutManagerItem;
