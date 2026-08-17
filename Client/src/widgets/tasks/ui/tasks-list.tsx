import { TaskRow } from "@entities/tasks";

import Dribble from "@public/images/projects/dribble.svg";
import Paypal from "@public/images/projects/paypal.svg";
import Sleekpay from "@public/images/projects/sleekpay.svg";
import Youtube from "@public/images/projects/youtube.svg";

type Task = {
	projectName: string;
	image: string;
	description: string;
	dueDate: string;
	id: string;
	priority: string;
};

const getTasks = async (): Promise<Array<Task>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					description: "Research your target audience and create 3-5 users personas",
					image: Sleekpay,
					projectName: "SleekPay",
					dueDate: "2026-03-12T00:00:00Z",
					id: "2291",
					priority: "low"
				},
				{
					description: "Create an interactive prototype of the main interface of the application using tools",
					image: Paypal,
					projectName: "PayPal",
					dueDate: "2026-03-26T00:00:00Z",
					id: "2492",
					priority: "high"
				},
				{
					description: "Upload a projects showreel and make a cover for the video",
					image: Youtube,
					projectName: "Youtube",
					dueDate: "2026-03-19T00:00:00Z",
					id: "2686",
					priority: "medium"
				},
				{
					description: "Organize prototype testing with real users.",
					image: Paypal,
					projectName: "PayPal",
					dueDate: "2026-03-15T00:00:00Z",
					id: "2491",
					priority: "high"
				},
				{
					description: "Publishing design post for financial app projects (SleekPay)",
					image: Dribble,
					projectName: "Dribble",
					dueDate: "2026-03-13T00:00:00Z",
					id: "2489",
					priority: "medium"
				}
			]);
		}, 6000);
	});
};

export const TasksList = async () => {
	const tasks = await getTasks();

	return (
		<ul className="flex flex-col gap-y-[0.5rem] py-[0.75rem]">
			{tasks.map(({ id, projectName, image, description, dueDate, priority }) => (
				<li key={id}>
					<TaskRow
						id={id}
						projectName={projectName}
						dueDate={dueDate}
						description={description}
						priority={priority}
						imageUrl={image}
					/>
				</li>
			))}
		</ul>
	);
};
