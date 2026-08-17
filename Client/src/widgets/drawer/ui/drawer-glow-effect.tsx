import { DrawerGlowEffectBottom } from "./drawer-glow-effect-bottom";
import { DrawerGlowEffectTop } from "./drawer-glow-effect-top";

export const DRAWER_GLOW_EFFECT_POSITIONS = {
	Top: "top",
	Bottom: "bottom"
} as const;

type DrawerGlowEffectPosition = (typeof DRAWER_GLOW_EFFECT_POSITIONS)[keyof typeof DRAWER_GLOW_EFFECT_POSITIONS];

type GlowEffectProps = {
	position: DrawerGlowEffectPosition;
	className?: string;
};

export const DrawerGlowEffect = ({ position, className }: Readonly<GlowEffectProps>) => {
	switch (position) {
		case DRAWER_GLOW_EFFECT_POSITIONS.Top:
			return <DrawerGlowEffectTop className={className} />;
		case DRAWER_GLOW_EFFECT_POSITIONS.Bottom:
			return <DrawerGlowEffectBottom className={className} />;
	}
};
