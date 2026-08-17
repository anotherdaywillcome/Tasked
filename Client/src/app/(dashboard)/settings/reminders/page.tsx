import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	ICON_TYPES,
	Switch
} from "@shared/ui";

const TIME_OPTIONS = [{ label: "lead time", value: "lead-time" }];

type SettingsDropdownProps = {
	defaultValue: string;
	label: string;
	name: string;
	options: Array<{ label: string; value: string; disabled?: boolean }>;
};

const SettingsDropdown = ({ defaultValue, label, name, options }: Readonly<SettingsDropdownProps>) => {
	const defaultOption = options.find((option) => option.value === defaultValue);

	return (
		<DropdownMenu name={name} id={name} defaultValue={defaultValue}>
			<DropdownMenuLabel htmlFor={name}>{label}</DropdownMenuLabel>
			<DropdownMenuTrigger placeholder={defaultOption?.label ?? "Select option"} />
			<DropdownMenuContent align="start">
				<DropdownMenuGroup>
					{options.map((option) => (
						<DropdownMenuItem key={option.value} value={option.value} disabled={option.disabled}>
							{option.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const RemindersPage = () => {
	return (
		<section
			className="relative flex flex-col h-full basis-[74%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] overflow-hidden"
			aria-labelledby="reminders-title"
		>
			<header className="relative flex px-[20px] py-[18px] items-center justify-between border-b-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-100)">
				<div className="flex items-center gap-x-[12px]">
					<Icon className="text-[white]" type={ICON_TYPES.CalendarAddBold} size={16} />
					<h2
						id="reminders-title"
						className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)"
					>
						Reminders
					</h2>
				</div>
			</header>
			<form className="h-full" id="reminders-form" aria-labelledby="reminders-title">
				<fieldset>
					<legend>Sound signal when task is completed.</legend>
					<SettingsDropdown
						label="Lead Time"
						name="leadTime"
						options={TIME_OPTIONS}
						defaultValue="lead-time"
					/>
					<small>
						If this feature is enabled, a reminder will be added by default before the task is due.
					</small>
				</fieldset>
				<fieldset>
					<legend>What method of reminder do you prefer?</legend>
					<small>Sound signal when task is completed.</small>
					<Switch
						label="Notifications on your computer"
						name="notificationsOnComputer"
						value="notificationsOnComputer"
					/>
					<Switch label="Notification on mobile" name="notificationsOnMobile" value="notificationsOnMobile" />
					<Switch label="Email" name="notificationsEmail" value="notificationsEmail" />
				</fieldset>
				<div>
					<h3>Reminders not working?</h3>
					<ul>
						<li>
							<p>Make sure your device settings allow you to receive notifications from AI-Task.</p>
						</li>
						<li>
							<p>
								Check if your device is in Do Not Disturb mode. To receive notifications, turn it off or
								add AI-Task to your Allowed Apps list.
							</p>
						</li>
						<li>
							<small>Still need help? Check out our troubleshooting guide.</small>
						</li>
					</ul>
				</div>
			</form>
			<footer className="relative flex px-[20px] py-[12px] border-t-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-50)">
				<Button
					className="ml-auto mr-0 px-[16px] pt-[7px] pb-[9px] rounded-[10px]"
					type="submit"
					form="reminders-form"
				>
					Save changed
				</Button>
			</footer>
		</section>
	);
};

export default RemindersPage;
