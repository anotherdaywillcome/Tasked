export const BottomLeftCornerGlowEffect = () => {
	return (
		<svg
			className="absolute bottom-0 left-0 z-10"
			width="340"
			height="489"
			viewBox="0 0 340 489"
			fill="none"
			shapeRendering="geometricPrecision"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_f_488_129571)">
				<circle cx="104" cy="437.775" r="261" fill="url(#paint0_radial_488_129571)" />
			</g>
			<defs>
				<filter
					id="filter0_f_488_129571"
					x="-333.776"
					y="-0.000274658"
					width="875.551"
					height="875.551"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="88.3878" result="effect1_foregroundBlur_488_129571" />
				</filter>
				<radialGradient
					id="paint0_radial_488_129571"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(104 437.775) rotate(90) scale(261)"
				>
					<stop stopColor="#1A34B6" />
					<stop offset="1" stopColor="#1D39C4" stopOpacity="0" />
				</radialGradient>
			</defs>
		</svg>
	);
};
