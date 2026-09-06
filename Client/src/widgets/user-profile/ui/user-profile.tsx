"use client";

import { motion, MotionConfig } from "motion/react";

import { MOTION_CONFIG_GENTLE, MOTION_CONFIG_QUICK, MOTION_CONFIG_SMOOTH } from "@shared/config";
import { Icon, ICON_TYPES, MOTION_ICON_TYPES, MotionIcon } from "@shared/ui";

import { userProfileChevronVariants, userProfileContainerVariants } from "../config";
import { useUserProfile } from "../model";

import { UserProfileNavigation } from "./user-profile-navigation";

export const UserProfile = () => {
	const { isUserProfileOpened, handleUserProfileToggle, userProfileRef } = useUserProfile();

	return (
		<MotionConfig {...MOTION_CONFIG_SMOOTH}>
			<motion.div
				ref={userProfileRef}
				className="absolute top-0 right-0 min-w-[10rem] rounded-[0.75rem] border-[0.031rem] border-solid text-(--white-pallete-100) backdrop-blur-[3.625rem]"
				initial="initial"
				animate={isUserProfileOpened ? "opened" : "closed"}
				whileHover="hovered"
				variants={userProfileContainerVariants}
			>
				<MotionConfig {...MOTION_CONFIG_QUICK}>
					<motion.nav aria-label="User profile" className="relative z-50">
						<button
							type="button"
							onClick={handleUserProfileToggle}
							className="flex h-[2.5rem] w-full cursor-pointer items-center gap-x-[0.625rem] rounded-[0.75rem] py-[0.375rem] pr-[0.75rem] pl-[0.5rem] text-left transition-[color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:shadow-focus-blue"
							aria-expanded={isUserProfileOpened}
							aria-controls="user-profile-navigation"
						>
							<span
								aria-hidden={true}
								className="flex h-[1.75rem] w-[1.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--geek-blue-primary-opacity-300) text-(--white-pallete-100)"
							>
								<Icon type={ICON_TYPES.User} size={18} />
							</span>
							<span className="relative z-50 min-w-0 flex-1 truncate font-(family-name:--font-barlow) text-[0.875rem] font-bold leading-[1rem] tracking-[0.01em] text-(--white-pallete-100)">
								Account
							</span>
							<MotionConfig {...MOTION_CONFIG_GENTLE}>
								<MotionIcon
									type={MOTION_ICON_TYPES.Chevron}
									className="h-[1rem] w-[1rem] shrink-0 text-(--neutrals-3)"
									animate={isUserProfileOpened ? "opened" : "closed"}
									variants={userProfileChevronVariants}
								/>
							</MotionConfig>
						</button>
						<UserProfileNavigation id="user-profile-navigation" isUserProfileOpened={isUserProfileOpened} />
					</motion.nav>
				</MotionConfig>
			</motion.div>
		</MotionConfig>
	);
};
