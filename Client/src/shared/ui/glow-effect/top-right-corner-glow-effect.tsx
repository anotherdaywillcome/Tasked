export const TopRightCornerGlowEffect = () => {
	return (
		<svg
			className="absolute top-0 right-0 z-10"
			width="277"
			height="301"
			viewBox="0 0 277 301"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_488_129570)">
				<circle cx="246.518" cy="54.0254" r="110" fill="url(#paint0_radial_488_129570)" />
			</g>
			<defs>
				<filter
					id="filter0_f_488_129570"
					x="0.000244141"
					y="-192.492"
					width="493.035"
					height="493.035"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="68.2587" result="effect1_foregroundBlur_488_129570" />
				</filter>
				<radialGradient
					id="paint0_radial_488_129570"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(246.518 54.0254) rotate(90) scale(110)"
				>
					<stop stopColor="#1D39C4" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};
