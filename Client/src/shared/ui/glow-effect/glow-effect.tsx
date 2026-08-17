import { BottomLeftCornerGlowEffect } from "./bottom-left-corner-glow-effect";
import { TopRightCornerGlowEffect } from "./top-right-corner-glow-effect";

export const GlowEffectPositions = {
	TopRight: "top-right",
	BottomLeft: "bottom-left"
} as const;

type GlowEffectPosition = (typeof GlowEffectPositions)[keyof typeof GlowEffectPositions];

type GlowEffectProps = {
	position: GlowEffectPosition;
};

export const GlowEffect = ({ position }: Readonly<GlowEffectProps>) => {
	switch (position) {
		case GlowEffectPositions.TopRight:
			return <TopRightCornerGlowEffect />;
		case GlowEffectPositions.BottomLeft:
			return <BottomLeftCornerGlowEffect />;
	}
};
