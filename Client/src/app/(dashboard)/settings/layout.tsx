import { clsx } from "clsx";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { ViewHeader } from "@widgets/view-header";

import { CreateTask } from "@features/create-task";
import { Search } from "@features/search";

import { ROUTES } from "@shared/config";
import { Icon, ICON_TYPES } from "@shared/ui";

type SettingsLayoutProps = {
	children: ReactNode;
};

const SETTINGS_NAVIGATION_ITEMS = [
	{
		icon: ICON_TYPES.UserSquareOutline,
		label: "Account",
		href: ROUTES.Account
	},
	{
		icon: ICON_TYPES.SettingsOutline,
		label: "Main settings",
		href: ROUTES.MainSettings
	},
	{
		icon: ICON_TYPES.CalendarAddOutline,
		label: "Reminders",
		href: ROUTES.Reminders
	},
	{
		icon: ICON_TYPES.NotificationsOutline,
		label: "Notifications",
		href: ROUTES.Notifications
	}
];

// Todo we have simmilar menus in this layoiut and messages
// One component for both ?

const SettingsLayout = ({ children }: Readonly<SettingsLayoutProps>) => {
	return (
		<Fragment>
			<ViewHeader title="Settings" icon={ICON_TYPES.Settings}>
				<ViewHeader.Tools>
					<Search />
					<CreateTask />
				</ViewHeader.Tools>
			</ViewHeader>
			<section className="flex min-h-0 flex-row gap-x-[8px] h-full mt-[1.25rem]">
				<h1 className="sr-only">Settings</h1>
				<section className="flex flex-col basis-[25%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] pb-[18px]">
					<h2 className="sr-only">Settings list</h2>
					<header className="relative px-[20px] py-[18px]">
						<p className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
							Navigation
						</p>
					</header>
					<nav className="overflow-y-auto">
						<ul className="relative w-full h-full">
							{SETTINGS_NAVIGATION_ITEMS.map(({ icon, label, href }, index) => (
								<li key={index} className="relative w-full">
									<Link
										className={clsx(
											"flex items-center w-full relative px-[20px] pt-[9px] pb-[10px] bg-transparent hover:bg-(--geek-blue-primary-opacity-100) text-(--neutrals-3) hover:text-(--white-pallete-100) border-t-[0.50px] border-solid border-(--white-pallete-50)",
											SETTINGS_NAVIGATION_ITEMS.length - 1 === index &&
												"border-b-[0.50px] border-solid border-(--white-pallete-50)"
										)}
										href={href}
									>
										<Icon className="mr-[8px]" type={icon} size={20} />
										<p className="font-(family-name:--font-barlow) font-medium text-[14px] leading-[129%] tracking-[0.01em]">
											{label}
										</p>
										<Icon
											className="mr-0 ml-[auto] mb-[-5px]"
											type={ICON_TYPES.ArrowRightOutline}
											size={20}
										/>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</section>
				{children}
			</section>
		</Fragment>
	);
};

export default SettingsLayout;
