import { clsx } from "clsx";

type DrawerBackground1Props = {
	className?: string;
};

export const DrawerGlowEffectTop = ({ className }: Readonly<DrawerBackground1Props>) => {
	return (
		<svg
			className={clsx(className)}
			width="1172"
			height="416"
			viewBox="0 0 1172 416"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_38557_109755)">
				<ellipse cx="486" cy="108" rx="486" ry="108" fill="url(#paint0_radial_38557_109755)" />
			</g>
			<defs>
				<filter
					id="filter0_f_38557_109755"
					x="-200"
					y="-200"
					width="1372"
					height="616"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_38557_109755" />
				</filter>
				<radialGradient
					id="paint0_radial_38557_109755"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(486 59.1429) rotate(90) scale(156.857 705.857)"
				>
					<stop stopColor="#1D39C4" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};
