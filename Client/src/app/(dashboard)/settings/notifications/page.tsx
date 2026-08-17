import { Button, Checkbox, Icon, ICON_TYPES, Switch } from "@shared/ui";

const PROJECT_NOTIFICATIONS = [
	{ id: "comments", label: "Comments for you" },
	{ id: "tasks-assigned", label: "Tasks assigned to you" },
	{ id: "tasks-completed", label: "Completed tasks" },
	{ id: "tasks-uncompleted", label: "Uncompleted tasks" },
	{ id: "mentions", label: "Mentions in comments" },
	{ id: "projects-invitation-accepted", label: "Project invitation accepted" },
	{ id: "projects-invitation-declined", label: "Project invitation declined" },
	{ id: "member-left", label: "Member left the projects" },
	{ id: "member-removed", label: "Member removed" }
];

const NotificationsPage = () => {
	return (
		<section
			className="relative flex h-full basis-[74%] flex-col overflow-hidden rounded-[20px] border-[0.5px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px]"
			aria-labelledby="notifications-title"
		>
			<header className="relative flex items-center justify-between border-b-[0.5px] border-solid border-(--geek-blue-primary-opacity-50) bg-(--geek-blue-primary-opacity-100) px-[20px] py-[18px] backdrop-blur-[50px]">
				<div className="flex items-center gap-x-[12px]">
					<Icon className="text-[white]" type={ICON_TYPES.NotificationsBold} size={16} />

					<h2
						id="notifications-title"
						className="font-(family-name:--font-barlow) text-[16px] font-bold leading-[125%] tracking-[0.01em] text-(--white-pallete-100)"
					>
						Notifications
					</h2>
				</div>
			</header>
			<form
				id="notifications-form"
				className="flex h-full flex-col gap-y-[24px] px-[20px] py-[18px]"
				aria-labelledby="notifications-title"
			>
				<fieldset>
					<legend className="mb-[16px] font-(family-name:--font-barlow) text-[14px] font-bold text-(--white-pallete-100)">
						Project notifications
					</legend>
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th
									scope="col"
									className="pb-[12px] text-left font-(family-name:--font-barlow) text-[12px] font-semibold text-(--white-pallete-100)"
								>
									Notification
								</th>
								<th
									scope="col"
									className="w-[120px] pb-[12px] text-center font-(family-name:--font-barlow) text-[12px] font-semibold text-(--white-pallete-100)"
								>
									Email
								</th>
								<th
									scope="col"
									className="w-[140px] pb-[12px] text-center font-(family-name:--font-barlow) text-[12px] font-semibold text-(--white-pallete-100)"
								>
									Mobile device
								</th>
							</tr>
						</thead>
						<tbody>
							{PROJECT_NOTIFICATIONS.map((notification) => (
								<tr key={notification.id}>
									<th
										scope="row"
										className="py-[10px] text-left font-(family-name:--font-barlow) text-[14px] font-medium text-(--white-pallete-100)"
									>
										{notification.label}
									</th>
									<td className="text-center">
										<Checkbox
											name={`${notification.id}-email`}
											label={`Receive email notification for ${notification.label}`}
											value={`${notification.id}-email`}
										/>
									</td>
									<td className="text-center">
										<Checkbox
											name={`${notification.id}-mobile`}
											label={`Receive mobile notification for ${notification.label}`}
											value={`${notification.id}-mobile`}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</fieldset>
				<fieldset>
					<legend className="mb-[16px] font-(family-name:--font-barlow) text-[14px] font-bold text-(--white-pallete-100)">
						Account and email notifications
					</legend>
					<div className="flex flex-col gap-y-[12px]">
						<Switch label="Daily summary" name="dailySummary" value="dailySummary" />
						<Switch label="Tips and tricks" name="tipsAndTricks" value="tipsAndTricks" />
						<Switch
							label="Notification of new account login"
							name="notificationsOfNewAccountLogin"
							value="notificationsOfNewAccountLogin"
						/>
					</div>
				</fieldset>
			</form>
			<footer className="relative flex border-t-[0.5px] border-solid border-(--geek-blue-primary-opacity-50) bg-(--geek-blue-primary-opacity-50) px-[20px] py-[12px] backdrop-blur-[50px]">
				<Button
					type="submit"
					form="notifications-form"
					className="ml-auto rounded-[10px] px-[16px] pb-[9px] pt-[7px]"
				>
					Save changes
				</Button>
			</footer>
		</section>
	);
};

export default NotificationsPage;
