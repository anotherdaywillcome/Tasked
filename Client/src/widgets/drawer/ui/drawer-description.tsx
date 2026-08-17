type DrawerDescriptionProps = {
	children: string;
};

export const DrawerDescription = ({ children }: Readonly<DrawerDescriptionProps>) => {
	return (
		<p className="font-(family-name:--font-barlow) font-bold text-[0.875rem] leading-[133%] tracking-[0.01em] uppercase text-(--geek-blue-4)">
			{children}
		</p>
	);
};
