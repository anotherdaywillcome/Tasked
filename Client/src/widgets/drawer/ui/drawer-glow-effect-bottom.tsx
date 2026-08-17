import { clsx } from "clsx";

type DrawerBackground2Props = {
	className?: string;
};

export const DrawerGlowEffectBottom = ({ className }: Readonly<DrawerBackground2Props>) => {
	return (
		<svg
			className={clsx(className)}
			width="1173"
			height="351"
			viewBox="0 0 1173 351"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_38557_109761)">
				<ellipse cx="498.5" cy="414.513" rx="380.5" ry="121" fill="url(#paint0_radial_38557_109761)" />
			</g>
			<defs>
				<filter
					id="filter0_f_38557_109761"
					x="-175.512"
					y="0.000457764"
					width="1348.02"
					height="829.024"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="146.756" result="effect1_foregroundBlur_38557_109761" />
				</filter>
				<radialGradient
					id="paint0_radial_38557_109761"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(498.5 414.513) rotate(90) scale(121 380.5)"
				>
					<stop stopColor="#1D39C4" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};
