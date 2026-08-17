type DrawerTitleProps = {
	children: string;
};

export const DrawerTitle = ({ children }: Readonly<DrawerTitleProps>) => {
	return (
		<h3 className="font-(family-name:--font-barlow) font-bold text-[0.75rem] leading-[133%] tracking-[0.01em] uppercase text-(--geek-blue-4) pl-[0.75rem]">
			{children}
		</h3>
	);
};
