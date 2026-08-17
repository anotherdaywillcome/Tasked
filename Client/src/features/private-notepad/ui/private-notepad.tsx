import { Suspense } from "react";

import { Icon, ICON_TYPES } from "@shared/ui";

import { PrivateNotepadFormattingToolbar } from "./private-notepad-formatting-toolbar";
import { PrivateNotepadSkeleton } from "./private-notepad-skeleton";
import { PrivateNotepadTextarea } from "./private-notepad-textarea";

export const PrivateNotepad = () => {
	return (
		<section
			className="flex flex-col w-full h-full border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1.25rem] bg-(--geek-blue-primary-opacity-100)"
			aria-labelledby="private-notepad-title"
		>
			<header className="flex items-center justify-between mx-[1rem] py-[1.25rem] border-b-[0.031rem] border-solid border-(--white-pallete-10)">
				<h2
					className="font-(family-name:--font-barlow) font-bold text-[0.875rem] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
					id="private-notepad-title"
				>
					Private Notepad
				</h2>
				<Icon width={15} height={15} className="text-(--neutrals-2)" type={ICON_TYPES.LockedLock} />
			</header>
			<div className="m-[0.75rem] border-[0.031rem] border-solid border-(--white-pallete-10) rounded-[1rem] bg-(--geek-blue-primary-opacity-100) flex flex-col flex-1">
				<Suspense fallback={<PrivateNotepadSkeleton />}>
					<PrivateNotepadTextarea />
				</Suspense>
				<PrivateNotepadFormattingToolbar />
			</div>
		</section>
	);
};
