"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

import { useNavigationLinkHighlight } from "@shared/ui";
import { MOTION_CONFIG_CRISP } from "@shared/config";

import { USER_PROFILE_ITEMS, userProfileNavigationVariants } from "../config";

import { UserProfileNavigationLink } from "./user-profile-navigation-link";

type UserProfileNavigationProps = {
	id: string;
	isUserProfileOpened: boolean;
};

export const UserProfileNavigation = ({ isUserProfileOpened, id }: Readonly<UserProfileNavigationProps>) => {
	const { activeLinkId, handleLinkSelection, handleLinkUnselection } = useNavigationLinkHighlight(USER_PROFILE_ITEMS);

	return (
		<AnimatePresence initial={false}>
			{isUserProfileOpened && (
				<motion.ul
					id={id}
					key="user-profile-navigation"
					className="relative z-50 flex flex-col gap-y-[0.25rem] overflow-hidden border-t-[0.031rem] border-solid px-[0.5rem]"
					animate="opened"
					exit="closed"
					initial="closed"
					variants={userProfileNavigationVariants}
					onPointerLeave={handleLinkUnselection}
					onBlurCapture={handleLinkUnselection}
				>
					{USER_PROFILE_ITEMS.map(({ id, href, icon, label }, index) => {
						const isActive = activeLinkId === id;

						return (
							<li
								key={id}
								onPointerEnter={() => handleLinkSelection(id)}
								onFocusCapture={() => handleLinkSelection(id)}
								className={clsx(
									"relative z-10 rounded-[0.75rem]",
									index === 0 && "mt-[0.375rem]",
									USER_PROFILE_ITEMS.length - 1 === index && "mb-[0.375rem]"
								)}
							>
								{isActive && (
									<MotionConfig {...MOTION_CONFIG_CRISP}>
										<motion.div
											layoutId="nav-highlight"
											className="absolute inset-0 z-10 rounded-[0.75rem] border-[0.031rem] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-300)"
										/>
									</MotionConfig>
								)}
								<UserProfileNavigationLink href={href} icon={icon} isActive={isActive}>
									{label}
								</UserProfileNavigationLink>
							</li>
						);
					})}
				</motion.ul>
			)}
		</AnimatePresence>
	);
};
