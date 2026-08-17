"use client";

import { Fragment, useMemo, useState } from "react";

import { Button, Icon, ICON_TYPES } from "@shared/ui";

import { useLayoutShortcuts } from "../lib/hooks/use-layout-shortcuts";
import { useDashboardLayoutStore } from "../model/store";

export const GridLayoutManagerControls = () => {
	useLayoutShortcuts();

	const editMode = useDashboardLayoutStore((state) => state.editMode);
	const layout = useDashboardLayoutStore((state) => state.draftLayout ?? state.layout);
	const availableWidgets = useDashboardLayoutStore((state) => state.availableWidgets);
	const startEditSession = useDashboardLayoutStore((state) => state.startEditSession);
	const saveEditSession = useDashboardLayoutStore((state) => state.saveEditSession);
	const cancelEditSession = useDashboardLayoutStore((state) => state.cancelEditSession);
	const resetLayout = useDashboardLayoutStore((state) => state.resetLayout);
	const addWidget = useDashboardLayoutStore((state) => state.addWidget);
	const [selectedWidgetType, setSelectedWidgetType] = useState("");

	const addableWidgets = useMemo(() => {
		const activeTypes = new Set(layout.map((widget) => widget.type));

		return availableWidgets.filter((widget) => !activeTypes.has(widget.type));
	}, [availableWidgets, layout]);

	const activeSelectedWidgetType = addableWidgets.some((widget) => widget.type === selectedWidgetType)
		? selectedWidgetType
		: (addableWidgets[0]?.type ?? "");

	const handleAddWidget = () => {
		if (!activeSelectedWidgetType) return;

		addWidget(activeSelectedWidgetType);
	};

	return (
		<Fragment>
			{!editMode ? (
				<Button onClick={startEditSession} className="flex items-center gap-x-[4px] rounded-[12px]">
					<Icon type={ICON_TYPES.Grid} size={16} />
					<span className="font-(family-name:--font-barlow) font-bold!s text-(--white-pallete-100)">
						Customize
					</span>
				</Button>
			) : (
				<Fragment>
					<Button variant="secondary" onClick={resetLayout}>
						Reset
					</Button>
					<select
						aria-label="Widget to add"
						className="h-[2.625rem] min-w-[10rem] rounded-[0.75rem] border border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-150) px-[0.75rem] font-(family-name:--font-barlow) text-[0.875rem] font-bold text-(--white-pallete-100) outline-none transition-colors hover:border-(--white-pallete-20) focus-visible:border-(--geek-blue-4)"
						disabled={addableWidgets.length === 0}
						value={activeSelectedWidgetType}
						onChange={(event) => {
							setSelectedWidgetType(event.target.value);
						}}
					>
						{addableWidgets.length === 0 ? (
							<option value="">No widgets</option>
						) : (
							addableWidgets.map((widget) => (
								<option key={widget.type} value={widget.type}>
									{widget.label}
								</option>
							))
						)}
					</select>
					<Button disabled={!activeSelectedWidgetType} variant="secondary" onClick={handleAddWidget}>
						Add
					</Button>
					<Button variant="secondary" onClick={cancelEditSession}>
						Cancel
					</Button>
					<Button variant="success" onClick={saveEditSession}>
						Save
					</Button>
				</Fragment>
			)}
		</Fragment>
	);
};
