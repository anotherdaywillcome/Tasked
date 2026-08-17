import type { ComponentPropsWithoutRef } from "react";

type SidebarDividerProps = ComponentPropsWithoutRef<"svg">;

export const SidebarDivider = ({ ...props }: Readonly<SidebarDividerProps>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="228"
			height="1"
			viewBox="0 0 228 1"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			<mask id="path-1-inside-1_38144_50092" fill="white">
				<path d="M12 0H216V1H12V0Z" />
			</mask>
			<path
				d="M216 1V0H12V1V2H216V1Z"
				fill="url(#paint0_radial_38144_50092)"
				mask="url(#path-1-inside-1_38144_50092)"
			/>
			<defs>
				<radialGradient
					id="paint0_radial_38144_50092"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="matrix(105.102 3.15959e-08 -1.84669e-05 9.47703 120.342 1)"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#597EF7" />
					<stop offset="1" stopColor="#10239E" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};
