import Image from "next/image";
import Link from "next/link";

import { Project } from "@entities/projects";

type ActivityDrawerContentProps = {
	project: Omit<Project, "taskSummary">;
};

export const ActivityDrawerContent = ({ project: { name } }: Readonly<ActivityDrawerContentProps>) => {
	return (
		<section className="relative flex h-full px-[24px]">
			<h2 className="sr-only">Project {name} activity</h2>
			<ol className="flex flex-col py-[16px] activity-scroll">
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Wade Warren</strong> created a new task:
								<Link href="./" className="text-(--geek-blue-4)">
									Analytics Creation: Installing tools for data collection.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Kristin Watson</strong> сhanged the status to completed on
								the task:
								<Link href="./" className="text-(--geek-blue-4)">
									Programming the main features.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Jenny Wilson</strong> created a new task:
								<Link href="./" className="text-(--geek-blue-4)">
									Data Security: Protecting users personal information.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Kristin Watson</strong> created a new task:
								<Link href="./" className="text-(--geek-blue-4)">
									Analytics Creation: Installing tools for data collection.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Floyd Miles</strong> сhanged the status to completed on
								the task:
								<Link href="./" className="text-(--geek-blue-4)">
									Improving speed and smoothness.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days 4ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Cody Fisher</strong> added a comment in the task:
								<Link href="./" className="text-(--geek-blue-4)">
									Analytics Creation: Installing tools for data collection.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
				<li className="relative">
					<div className="w-full flex items-start gap-x-[8px] py-[12px] border-b-[0.50px] border-solid border-(--white-pallete-10)">
						<Image
							src=""
							alt=""
							width={32}
							height={32}
							className="w-[32px] h-[32px] rounded-full bg-(--geek-blue-6) object-cover"
						/>
						<div className="flex flex-col gap-y-[6px]">
							<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
								<strong className="font-bold">Wade Warren</strong> created a new task:
								<Link href="./" className="text-(--geek-blue-4)">
									Analytics Creation: Installing tools for data collection.
								</Link>
							</p>
							<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
								2 days ago
							</time>
						</div>
					</div>
				</li>
			</ol>
		</section>
	);
};
