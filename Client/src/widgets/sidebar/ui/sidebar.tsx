import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";

import { SidebarContent } from "./sidebar-content";
import { SidebarDivider } from "./sidebar-divider";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { SidebarRoot } from "./sidebar-root";

type SidebarComponents = {
	Header: typeof SidebarHeader;
	Content: typeof SidebarContent;
	Footer: typeof SidebarFooter;
	Divider: typeof SidebarDivider;
};

type SidebarProps = {
	children: ReactElement | ReactElement[];
};

type Sidebar = ((props: Readonly<SidebarProps>) => ReactElement) & SidebarComponents;

const SidebarBackground = () => {
	return (
		<svg
			className="absolute top-0 left-0 -z-10 w-full h-full"
			viewBox="0 0 228 908"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_38129_50083)">
				<circle cx="42" cy="27" r="80" fill="url(#paint0_radial_38129_50083)" />
			</g>
			<g filter="url(#filter1_f_38129_50083)">
				<circle cx="249" cy="659" r="249" fill="url(#paint1_radial_38129_50083)" />
			</g>
			<defs>
				<filter
					id="filter0_f_38129_50083"
					x="-138"
					y="-153"
					width="360"
					height="360"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_38129_50083" />
				</filter>
				<filter
					id="filter1_f_38129_50083"
					x="-373.5"
					y="36.5"
					width="1245"
					height="1245"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="186.75" result="effect1_foregroundBlur_38129_50083" />
				</filter>
				<radialGradient
					id="paint0_radial_38129_50083"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(42 27) rotate(90) scale(80)"
				>
					<stop stopColor="#1D39C4" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
				<radialGradient
					id="paint1_radial_38129_50083"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(249 659) rotate(90) scale(249)"
				>
					<stop stopColor="#1A34B6" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};

const validateSidebarChildren = (children: ReactElement | ReactElement[]) => {
	Children.forEach(children, (child) => {
		if (!isValidElement(child) || child.type === undefined) return;

		if (!(
			child.type === SidebarHeader ||
			child.type === SidebarContent ||
			child.type === SidebarFooter ||
			child.type === SidebarDivider
		)) {
			throw new Error(`
				Component <Sidebar> can only accept children of types <Sidebar.Header>, <Sidebar.Content>, <Sidebar.Footer> and <Sidebar.Divider>.
				Received child of type ${child.type}.
				Please ensure that all children of <Sidebar> are of the correct type. 
			`);
		}
	});
};

export const Sidebar = (({ children }: Readonly<SidebarProps>) => {
	validateSidebarChildren(children);

	return <SidebarRoot background={<SidebarBackground />}>{children as ReactNode}</SidebarRoot>;
}) as Sidebar;

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Divider = SidebarDivider;
