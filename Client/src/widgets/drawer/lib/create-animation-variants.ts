type CreateAnimationVariantsParameters = {
	x: number | string;
	y: number | string;
	reversedIndex: number;
	opacity?: number;
	blur?: string;
};

export const createAnimationVariants = ({
	x,
	y,
	opacity = 1,
	blur = "0rem",
	reversedIndex
}: Readonly<CreateAnimationVariantsParameters>) => ({
	opacity,
	x,
	y,
	scale: 1.0 - reversedIndex / 10,
	filter: `blur(${blur})`
});
