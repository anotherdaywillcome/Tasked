export type AvatarStackDescriptionProps = {
	children: string;
};

export const AvatarStackDescription = ({ children }: Readonly<AvatarStackDescriptionProps>) => {
	return (
		<span className="font-(family-name:--font-barlow) font-semibold text-[0.875rem] leading-[1.125rem] tracking-[0.01em] text-(--desert-storm)">
			{children}
		</span>
	);
};
