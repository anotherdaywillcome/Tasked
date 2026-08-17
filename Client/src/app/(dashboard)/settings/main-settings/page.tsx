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

const LANGUAGE_OPTIONS = [
	{ label: "English", value: "english" },
	{ label: "Russian", value: "russian" }
];

const TIME_ZONE_OPTIONS = [
	{ label: "Europe / Berlin", value: "europe-berlin" },
	{ label: "Europe / Riga", value: "europe-riga" },
	{ label: "Europe / London", value: "europe-london" },
	{ label: "America / New York", value: "america-new-york" },
	{ label: "America / Los Angeles", value: "america-los-angeles" }
];

const TIME_FORMAT_OPTIONS = [
	{ label: "1:00 pm", value: "12-hour" },
	{ label: "13:00", value: "24-hour" }
];

const DATE_FORMAT_OPTIONS = [
	{ label: "dd-mm-yyyy", value: "dd-mm-yyyy" },
	{ label: "mm-dd-yyyy", value: "mm-dd-yyyy" },
	{ label: "yyyy-mm-dd", value: "yyyy-mm-dd" }
];

const WEEK_START_OPTIONS = [
	{ label: "Monday", value: "monday" },
	{ label: "Sunday", value: "sunday" },
	{ label: "Saturday", value: "saturday" }
];

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

const MainSettingsPage = () => {
	return (
		<section
			className="relative flex flex-col h-full basis-[74%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] overflow-hidden"
			aria-labelledby="main-settings-title"
		>
			<header className="relative flex px-[20px] py-[18px] items-center justify-between border-b-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-100)">
				<div className="flex items-center gap-x-[12px]">
					<Icon className="text-[white]" type={ICON_TYPES.SettingsBold} size={16} />
					<h2
						id="main-settings-title"
						className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)"
					>
						Main Settings
					</h2>
				</div>
			</header>
			<form
				className="flex h-full flex-col gap-y-[1.25rem] px-[1.25rem] py-[1.125rem]"
				id="main-settings-form"
				aria-labelledby="main-settings-title"
			>
				<fieldset className="flex max-w-[17.5rem] flex-col gap-y-[0.75rem]">
					<legend className="mb-[0.75rem] font-(family-name:--font-barlow) font-bold text-[0.875rem] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)">
						Language
					</legend>
					<SettingsDropdown
						label="Language"
						name="language"
						options={LANGUAGE_OPTIONS}
						defaultValue="english"
					/>
				</fieldset>
				<fieldset className="flex max-w-[36rem] flex-col gap-y-[0.75rem]">
					<legend className="mb-[0.75rem] font-(family-name:--font-barlow) font-bold text-[0.875rem] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)">
						Date & Time
					</legend>
					<div className="grid grid-cols-2 gap-x-[0.75rem] gap-y-[0.75rem]">
						<SettingsDropdown
							label="Time zone"
							name="timeZone"
							options={TIME_ZONE_OPTIONS}
							defaultValue="europe-berlin"
						/>
						<SettingsDropdown
							label="Time format"
							name="timeFormat"
							options={TIME_FORMAT_OPTIONS}
							defaultValue="12-hour"
						/>
						<SettingsDropdown
							label="Date format"
							name="dateFormat"
							options={DATE_FORMAT_OPTIONS}
							defaultValue="dd-mm-yyyy"
						/>
						<SettingsDropdown
							label="Beginning of the week"
							name="weekStart"
							options={WEEK_START_OPTIONS}
							defaultValue="monday"
						/>
					</div>
				</fieldset>
				<fieldset aria-describedby="task-completion-sound-description">
					<legend>Sound of task completion</legend>
					<small id="task-completion-sound-description">Sound signal when task is completed.</small>
					<Switch label="Computer and Web" name="soundComputerAndWeb" value="soundComputerAndWeb" />
					<Switch label="Mobile device" name="soundMobileDevice" value="soundMobileDevice" />
				</fieldset>
			</form>
			<footer className="relative flex px-[20px] py-[12px] border-t-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-50)">
				<Button
					className="ml-auto mr-0 px-[16px] pt-[7px] pb-[9px] rounded-[10px]"
					type="submit"
					form="main-settings-form"
				>
					Save changed
				</Button>
			</footer>
		</section>
	);
};

export default MainSettingsPage;
