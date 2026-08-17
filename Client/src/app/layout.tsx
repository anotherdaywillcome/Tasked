import Image from "next/image";
import Script from "next/script";
import type { ReactNode } from "react";

import { FONTS } from "@shared/config";

import { QueryProvider } from "./_providers";

import "./_styles/styles.css";
import "./_styles/tailwind.css";

// TODO Needs adjustments
// Example
// export const metadata = buildStaticMetadata({
// 	title: "Tasked",
// 	description: "Manage your projects and tasks",
// 	metadataBase: new URL("https://example.com"),
// 	imagePath: "/images/og/dashboard.png",
// 	openGraph: {
// 		siteName: "My App",
// 		locale: "en_US"
// 	},
// 	twitter: {
// 		creator: "@mycompany"
// 	},
// 	metadata: {
// 		keywords: ["dashboard", "tasks", "projects"],
// 		robots: {
// 			index: true,
// 			follow: true
// 		},
// 		alternates: {
// 			canonical: "/dashboard"
// 		},
// 		authors: [
// 			{
// 				name: "Lauris"
// 			}
// 		],
// 		creator: "Lauris",
// 		publisher: "Lauris"
// 	}
// });

type RootLayoutProps = {
	children: ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
	return (
		<html lang="en" className={`${FONTS.Barlow.variable} h-full`}>
			<head>
				{process.env.NODE_ENV === "development" && (
					<Script
						src="https://unpkg.com/react-scan/dist/auto.global.js"
						crossOrigin="anonymous"
						strategy="beforeInteractive"
					/>
				)}
			</head>
			<body className="relative h-full min-h-screen min-h-dvh flex flex-col bg-(--geek-blue-11) bg-brand-violet">
				<div className="absolute inset-0 z-30 bg-vignette"></div>
				<div className="absolute inset-0 z-10">
					<Image src="/images/shadow_1.png" alt="" className="opacity-30" fill />
				</div>
				<div className="absolute inset-0 z-20">
					<Image src="/images/shadow_2.png" alt="" className="opacity-80" fill />
				</div>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
