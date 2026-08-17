"use client";

import type { Variants } from "motion/react";
import { motion, MotionConfig } from "motion/react";
import Link from "next/link";

import { MOTION_CONFIG_SNAPPY } from "../../config";

import { MAIN_NAVIGATION_ITEMS } from "./main-navigation";

const NAVIGATION_ITEM_HEIGHT = 16 as const;
const NAVIGATION_LETTER_DELAY = 0.015 as const;

const getNavigationLetterDirection = (index: number) => (index % 2 === 0 ? 1 : -1);

const NAVIGATION_WRAPPER_VARIANTS: Variants = {
	idle: {
		scale: 1
	},
	hover: {
		scale: 1
	},
	press: {
		scale: 0.8
	}
};

const NAVIGATION_INITIAL_LETTER_VARIANTS: Variants = {
	idle: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: index * NAVIGATION_LETTER_DELAY }
	}),
	hover: (index: number) => ({
		opacity: 0,
		y: getNavigationLetterDirection(index) * NAVIGATION_ITEM_HEIGHT,
		transition: { delay: index * NAVIGATION_LETTER_DELAY }
	})
};

const NAVIGATION_SECONDARY_LETTER_VARIANTS: Variants = {
	idle: (index: number) => ({
		opacity: 0,
		y: getNavigationLetterDirection(index) * -NAVIGATION_ITEM_HEIGHT,
		transition: { delay: index * NAVIGATION_LETTER_DELAY }
	}),
	hover: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: index * NAVIGATION_LETTER_DELAY }
	})
};

type MainNavigationItemProps = {
	href: (typeof MAIN_NAVIGATION_ITEMS)[number]["href"];
	label: (typeof MAIN_NAVIGATION_ITEMS)[number]["label"];
};

export const MainNavigationItem = ({ href, label }: Readonly<MainNavigationItemProps>) => {
	return (
		<MotionConfig {...MOTION_CONFIG_SNAPPY}>
			<motion.li
				tabIndex={-1}
				initial="idle"
				variants={NAVIGATION_WRAPPER_VARIANTS}
				whileHover="hover"
				whileTap="press"
			>
				<Link
					aria-label={label}
					className="focus-ring block"
					style={{ height: NAVIGATION_ITEM_HEIGHT }}
					href={href}
				>
					<span aria-hidden="true" className="flex overflow-hidden whitespace-pre">
						{Array.from(label).map((character, index) => (
							<span
								key={`${character}-${index}`}
								className="relative inline-block overflow-hidden"
								style={{
									height: NAVIGATION_ITEM_HEIGHT,
									lineHeight: `${NAVIGATION_ITEM_HEIGHT}px`
								}}
							>
								<motion.span
									className="block"
									custom={index}
									variants={NAVIGATION_INITIAL_LETTER_VARIANTS}
								>
									{character}
								</motion.span>
								<motion.span
									className="absolute inset-x-0 top-0 block"
									custom={index}
									variants={NAVIGATION_SECONDARY_LETTER_VARIANTS}
								>
									{character}
								</motion.span>
							</span>
						))}
					</span>
				</Link>
			</motion.li>
		</MotionConfig>
	);
};
