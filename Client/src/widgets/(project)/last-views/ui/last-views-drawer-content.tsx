import Image from "next/image";
import Link from "next/link";

import { Project } from "@entities/projects";

type LastViewsDrawerContentProps = {
	project: Omit<Project, "taskSummary">;
};

export const LastViewsDrawerContent = ({ project: { name } }: Readonly<LastViewsDrawerContentProps>) => {
	return (
		<section className="relative flex h-full px-[24px]">
			<h2 className="sr-only">Project {name} last views</h2>
			<ol className="flex flex-col py-[16px] activity-scroll w-full">
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Wade Warren
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									wade.warren@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								2 min ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Kristin Watson
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									kristin.watson@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								38 min ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Jenny Wilson
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									jenny.wilson@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								53 min ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Wade Warren
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									wade.warren@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								2 hour ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Guy Hawkins
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									guy.hawkins@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								1 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="py-[12px] flex gap-x-[8px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex gap-x-[8px] w-full justify-between items-start">
							<div className="flex flex-col gap-y-[2px]">
								<Link
									href="./"
									className="font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100)"
								>
									Cody Fisher
								</Link>
								<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
									cody.fisher@gmail.com
								</p>
							</div>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								3 days ago
							</time>
						</div>
					</div>
				</li>
			</ol>
		</section>
	);
};
