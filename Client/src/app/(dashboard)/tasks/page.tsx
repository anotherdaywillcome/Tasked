import { Fragment } from "react";

import { ViewHeader } from "@widgets/view-header";

import { CreateTask } from "@features/create-task";
import { Search } from "@features/search";

import { ICON_TYPES } from "@shared/ui";

const TasksPage = () => {
	return (
		<Fragment>
			<ViewHeader title="My Tasks" icon={ICON_TYPES.TaskSquare}>
				<ViewHeader.Tools>
					<Search />
					<CreateTask />
				</ViewHeader.Tools>
			</ViewHeader>
			<main className="mt-[1.25rem]">
				<h1 className="font-(family-name:--font-barlow) font-bold leading-[1.125rem] tracking-[0.01em] text-(--white-pallete-100)">
					Tasks Page
				</h1>
			</main>
		</Fragment>
	);
};

export default TasksPage;
