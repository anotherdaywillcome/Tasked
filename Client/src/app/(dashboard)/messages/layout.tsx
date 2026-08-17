import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { ViewHeader } from "@widgets/view-header";

import { CreateTask } from "@features/create-task";
import { Search } from "@features/search";

import { ROUTES } from "@shared/config";
import { getRelativeTime } from "@shared/lib/utils";
import { Icon, ICON_TYPES } from "@shared/ui";

type MessagesLayoutProps = {
	children: ReactNode;
};

type LastMessage = {
	text: string;
	createdAt: string;
	senderId: string;
	isRead: boolean;
};

type Participant = {
	id: string;
	fullName: string;
	imageUrl: string;
	isOnline: boolean;
};

type Conversation = {
	id: string;
	participant: Participant;
	lastMessage: LastMessage;
};

type Conversations = {
	conversations: Array<Conversation>;
	unreadCount: number;
};

type UnreadMessages = {
	count: number;
};

const getConversations = (): Promise<Conversations> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				conversations: [
					{
						id: "1",
						participant: {
							id: "1c",
							fullName: "Jenny Wilson",
							imageUrl: "/images/users/jenny_wilson.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u15",
							isRead: true
						}
					},
					{
						id: "2",
						participant: {
							id: "2c",
							fullName: "Cody Fisher",
							imageUrl: "/images/users/cody_fisher.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u16",
							isRead: false
						}
					},
					{
						id: "3",
						participant: {
							id: "3c",
							fullName: "Wade Warren",
							imageUrl: "/images/users/wade_warren.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u1444",
							isRead: false
						}
					},
					{
						id: "4",
						participant: {
							id: "4c",
							fullName: "Kirstin Watson",
							imageUrl: "/images/users/kristin_watson.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u15",
							isRead: true
						}
					},
					{
						id: "5",
						participant: {
							id: "5c",
							fullName: "Guy Hawkins",
							imageUrl: "/images/users/guy_hawkins.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u15",
							isRead: true
						}
					},
					{
						id: "6",
						participant: {
							id: "6c",
							fullName: "Esther Howard",
							imageUrl: "/images/users/esther_howard.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u15",
							isRead: true
						}
					},
					{
						id: "7",
						participant: {
							id: "7c",
							fullName: "Floyd Miles",
							imageUrl: "/images/users/floyd_miles.jpg",
							isOnline: false
						},
						lastMessage: {
							text: "Text here...",
							createdAt: "2025-02-18T10:15:00Z",
							senderId: "u15",
							isRead: true
						}
					}
				],
				unreadCount: 5
			});
		}, 6000);
	});
};

const MessagesLayout = async ({ children }: Readonly<MessagesLayoutProps>) => {
	const { conversations, unreadCount } = await getConversations();

	return (
		<Fragment>
			<ViewHeader title="Messages" icon={ICON_TYPES.Message}>
				<ViewHeader.Tools>
					<Search />
					<CreateTask />
				</ViewHeader.Tools>
			</ViewHeader>
			<section className="flex min-h-0 flex-row gap-x-[8px] h-full mt-[1.25rem]">
				<h1 className="sr-only">Messages</h1>
				<section className="flex flex-col basis-[30%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] pb-[18px]">
					<h2 className="sr-only">Conversation list</h2>
					<header className="shrink-0 flex items-center justify-between px-[20px] py-[18px]">
						<p className="flex items-center font-(family-name:--font-barlow) gap-x-[8px] font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
							Messages
							<span className="text-(--neutrals-3)" aria-label={`${unreadCount} unread messages`}>
								{unreadCount}
							</span>
						</p>
						<button
							className="cursor-pointer flex items-center justify-between gap-x-[8px] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[10px] px-[8px] py-[7px] bg-(--geek-blue-primary-opacity-100) font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)"
							type="button"
						>
							<span>Filter</span>
							<Icon className="text-[#fff]" type={ICON_TYPES.Filter} size={16} />
						</button>
					</header>
					<nav className="overflow-y-auto">
						<ul className="relative">
							{conversations.map((conversation, index) => (
								<li key={conversation.id}>
									<Link className="relative" href={ROUTES.Conversation(conversation.id)}>
										<article
											className={clsx(
												"relative border-t-[0.50px] border-solid border-(--white-pallete-10) py-[12px] px-[20px] flex items-center hover:bg-(--geek-blue-primary-opacity-100)",
												conversations.length - 1 === index && "border-b-[0.50px]"
											)}
										>
											{!conversation.lastMessage.isRead && (
												<div className="w-[8px] h-[8px] flex items-center justify-center absolute top-[50%] translate-y-[-50%] left-[6px]">
													<div className="w-[4px] h-[4px] rounded-full bg-(--neutrals-3)"></div>
													<span className="sr-only" aria-label="Unread message" />
												</div>
											)}
											<Image
												src={conversation.participant.imageUrl}
												alt=""
												className="w-[48px] h-[48px] rounded-full overflow-hidden object-cover bg-red-600 mr-[8px]"
												width={48}
												height={48}
											/>
											<div className="flex flex-col gap-y-[4px]">
												<h3 className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
													{conversation.participant.fullName}
												</h3>
												<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)">
													{conversation.lastMessage.text}
												</p>
											</div>
											<time className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3) self-start ml-auto mr-0 my-[2px]">
												{getRelativeTime(conversation.lastMessage.createdAt)}
											</time>
										</article>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</section>
				{children}
			</section>
		</Fragment>
	);
};

export default MessagesLayout;
