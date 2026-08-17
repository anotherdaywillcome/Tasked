import { clsx } from "clsx";
import Image from "next/image";

import { groupMessagesBySender } from "@entities/messages";

import { getRelativeTime } from "@shared/lib/utils";
import { Button, Icon, ICON_TYPES } from "@shared/ui";

type Attachment = {
	id: string;
	url: string;
};

type Participant = {
	id: string;
	fullName: string;
	imageUrl: string;
};

type Message = {
	id: string;
	senderId: string;
	text: string;
	createdAt: string;
	attachments?: Array<Attachment>;
};

type ConversationDetails = {
	id: string;
	participants: Array<Participant>;
	messages: Array<Message>;
};

const currentUser: Participant = {
	id: "2",
	fullName: "Di Smolski",
	imageUrl: "/images/users/di_smolskii.png"
};

const participantsByConversationId: Record<string, Participant> = {
	"1": {
		id: "1",
		fullName: "Jenny Wilson",
		imageUrl: "/images/users/jenny_wilson.jpg"
	},
	"2": {
		id: "1",
		fullName: "Cody Fisher",
		imageUrl: "/images/users/cody_fisher.jpg"
	},
	"3": {
		id: "1",
		fullName: "Wade Warren",
		imageUrl: "/images/users/wade_warren.jpg"
	},
	"4": {
		id: "1",
		fullName: "Kirstin Watson",
		imageUrl: "/images/users/kristin_watson.jpg"
	},
	"5": {
		id: "1",
		fullName: "Guy Hawkins",
		imageUrl: "/images/users/guy_hawkins.jpg"
	},
	"6": {
		id: "1",
		fullName: "Esther Howard",
		imageUrl: "/images/users/esther_howard.jpg"
	},
	"7": {
		id: "1",
		fullName: "Floyd Miles",
		imageUrl: "/images/users/floyd_miles.jpg"
	}
};

const messagesByConversationId: Record<string, Array<Message>> = {
	"1": [
		{
			id: "1",
			senderId: "2",
			text: "Hi Jenny!",
			createdAt: "2025-02-18T10:15:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "2",
			text: "Can you check the direction selection screen when you have a moment?",
			createdAt: "2025-02-18T10:16:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "1",
			text: "Yes, I already reviewed the first pass. The layout is clear, but the empty state needs stronger copy.",
			createdAt: "2025-02-18T10:19:00Z",
			attachments: []
		},
		{
			id: "4",
			senderId: "1",
			text: "I also left a note about the mobile spacing.",
			createdAt: "2025-02-18T10:20:00Z",
			attachments: []
		},
		{
			id: "5",
			senderId: "2",
			text: "Good catch. I will tighten the copy and keep the mobile header compact.",
			createdAt: "2025-02-18T10:24:00Z",
			attachments: []
		},
		{
			id: "6",
			senderId: "1",
			text: "Great. Send me the updated version after lunch.",
			createdAt: "2025-02-18T10:26:00Z",
			attachments: []
		},
		{
			id: "7",
			senderId: "1",
			text: "If there is time, please include the disabled state too.",
			createdAt: "2025-02-18T10:27:00Z",
			attachments: []
		}
	],
	"2": [
		{
			id: "1",
			senderId: "2",
			text: "The task board filters are ready for review.",
			createdAt: "2025-02-18T11:05:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "1",
			text: "Nice. I will test the unread and assigned filters now.",
			createdAt: "2025-02-18T11:08:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "2",
			text: "The only known issue is that the clear button still keeps focus after reset.",
			createdAt: "2025-02-18T11:09:00Z",
			attachments: []
		}
	],
	"3": [
		{
			id: "1",
			senderId: "1",
			text: "Hi Di!",
			createdAt: "2025-02-18T12:15:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "1",
			text: "How's the work on the direction selection screen going?",
			createdAt: "2025-02-18T12:16:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "2",
			text: "Hi Wade! I have already created several mockups and checked the edge cases for small screens.",
			createdAt: "2025-02-18T12:17:00Z",
			attachments: []
		},
		{
			id: "4",
			senderId: "2",
			text: "The main remaining piece is choosing the empty state copy.",
			createdAt: "2025-02-18T12:18:00Z",
			attachments: []
		},
		{
			id: "5",
			senderId: "1",
			text: "Good. Please keep the first option focused on speed and make the second one more detailed.",
			createdAt: "2025-02-18T12:21:00Z",
			attachments: []
		},
		{
			id: "6",
			senderId: "2",
			text: "Got it. I will update both variants and send the preview after lunch.",
			createdAt: "2025-02-18T12:24:00Z",
			attachments: []
		},
		{
			id: "7",
			senderId: "2",
			text: "I will also attach the task once the mockups are ready for review.",
			createdAt: "2025-02-18T12:25:00Z",
			attachments: []
		},
		{
			id: "8",
			senderId: "1",
			text: "Please add one longer note in the description area too. We need to see how the bubble handles text that wraps across multiple lines without breaking the spacing or pushing the avatar row into a strange position.",
			createdAt: "2025-02-18T12:30:00Z",
			attachments: []
		},
		{
			id: "9",
			senderId: "2",
			text: "That is useful for testing. I will include a realistic paragraph in the prototype.",
			createdAt: "2025-02-18T12:34:00Z",
			attachments: []
		},
		{
			id: "10",
			senderId: "2",
			text: "I will keep the text readable and avoid changing the visual style.",
			createdAt: "2025-02-18T12:35:00Z",
			attachments: []
		},
		{
			id: "11",
			senderId: "1",
			text: "Perfect. Ping me when the preview is deployed.",
			createdAt: "2025-02-18T12:38:00Z",
			attachments: []
		},
		{
			id: "12",
			senderId: "2",
			text: "Will do.",
			createdAt: "2025-02-18T12:39:00Z",
			attachments: []
		}
	],
	"4": [
		{
			id: "1",
			senderId: "2",
			text: "The projects settings copy is approved.",
			createdAt: "2025-02-18T13:10:00Z",
			attachments: []
		}
	],
	"5": [
		{
			id: "1",
			senderId: "1",
			text: "I am going through the overflow cases now.",
			createdAt: "2025-02-18T14:00:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "2",
			text: "Start with the longest thread. That one usually exposes spacing issues first.",
			createdAt: "2025-02-18T14:01:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "1",
			text: "Agreed. I added a long sequence with small grouped messages.",
			createdAt: "2025-02-18T14:03:00Z",
			attachments: []
		},
		{
			id: "4",
			senderId: "1",
			text: "This should make vertical overflow obvious.",
			createdAt: "2025-02-18T14:04:00Z",
			attachments: []
		},
		{
			id: "5",
			senderId: "2",
			text: "Check that the composer remains visible at the bottom.",
			createdAt: "2025-02-18T14:05:00Z",
			attachments: []
		},
		{
			id: "6",
			senderId: "2",
			text: "Also check that the last message is not hidden behind it.",
			createdAt: "2025-02-18T14:06:00Z",
			attachments: []
		},
		{
			id: "7",
			senderId: "1",
			text: "I will test desktop height first, then narrow viewport.",
			createdAt: "2025-02-18T14:08:00Z",
			attachments: []
		},
		{
			id: "8",
			senderId: "2",
			text: "Good. We need confidence before wiring this to the backend.",
			createdAt: "2025-02-18T14:09:00Z",
			attachments: []
		},
		{
			id: "9",
			senderId: "1",
			text: "The API response will stay flat, so the grouping logic should keep working.",
			createdAt: "2025-02-18T14:11:00Z",
			attachments: []
		},
		{
			id: "10",
			senderId: "2",
			text: "Yes, grouped rendering is a UI concern.",
			createdAt: "2025-02-18T14:12:00Z",
			attachments: []
		},
		{
			id: "11",
			senderId: "2",
			text: "The backend should only return messages in chronological order.",
			createdAt: "2025-02-18T14:13:00Z",
			attachments: []
		},
		{
			id: "12",
			senderId: "1",
			text: "I added enough rows to force the message area to overflow on common laptop sizes.",
			createdAt: "2025-02-18T14:15:00Z",
			attachments: []
		},
		{
			id: "13",
			senderId: "1",
			text: "If the panel clips content, we will see it immediately.",
			createdAt: "2025-02-18T14:16:00Z",
			attachments: []
		},
		{
			id: "14",
			senderId: "2",
			text: "Send a screenshot after the check.",
			createdAt: "2025-02-18T14:18:00Z",
			attachments: []
		},
		{
			id: "15",
			senderId: "1",
			text: "Will do.",
			createdAt: "2025-02-18T14:19:00Z",
			attachments: []
		},
		{
			id: "16",
			senderId: "2",
			text: "Thanks.",
			createdAt: "2025-02-18T14:20:00Z",
			attachments: []
		}
	],
	"6": [
		{
			id: "1",
			senderId: "2",
			text: 'I found one label that is too long for the compact layout: "Automatically notify all projects collaborators when this task changes status". It wraps, but it should still feel intentional in the sidebar and not collide with the timestamp.',
			createdAt: "2025-02-18T15:02:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "1",
			text: "That is a good stress case. Keep it in the mock.",
			createdAt: "2025-02-18T15:05:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "2",
			text: "Done.",
			createdAt: "2025-02-18T15:07:00Z",
			attachments: []
		},
		{
			id: "4",
			senderId: "1",
			text: "I will verify it with the message group timestamp.",
			createdAt: "2025-02-18T15:09:00Z",
			attachments: []
		},
		{
			id: "5",
			senderId: "2",
			text: "Sounds good.",
			createdAt: "2025-02-18T15:10:00Z",
			attachments: []
		},
		{
			id: "6",
			senderId: "2",
			text: "The long text should be enough for horizontal and vertical wrapping tests.",
			createdAt: "2025-02-18T15:11:00Z",
			attachments: []
		}
	],
	"7": [
		{
			id: "1",
			senderId: "1",
			text: "Can you confirm the final empty state today?",
			createdAt: "2025-02-18T16:10:00Z",
			attachments: []
		},
		{
			id: "2",
			senderId: "2",
			text: "Yes. I prefer the shorter version.",
			createdAt: "2025-02-18T16:12:00Z",
			attachments: []
		},
		{
			id: "3",
			senderId: "2",
			text: "It is easier to scan and leaves more room for the action button.",
			createdAt: "2025-02-18T16:13:00Z",
			attachments: []
		},
		{
			id: "4",
			senderId: "1",
			text: "I agree. I will mark that one as selected.",
			createdAt: "2025-02-18T16:15:00Z",
			attachments: []
		},
		{
			id: "5",
			senderId: "2",
			text: "Please keep the alternate copy in the notes.",
			createdAt: "2025-02-18T16:16:00Z",
			attachments: []
		},
		{
			id: "6",
			senderId: "1",
			text: "Done.",
			createdAt: "2025-02-18T16:18:00Z",
			attachments: []
		},
		{
			id: "7",
			senderId: "1",
			text: "I also linked the task to the design review.",
			createdAt: "2025-02-18T16:19:00Z",
			attachments: []
		},
		{
			id: "8",
			senderId: "2",
			text: "Perfect.",
			createdAt: "2025-02-18T16:20:00Z",
			attachments: []
		},
		{
			id: "9",
			senderId: "2",
			text: "I will close my comments after the preview build finishes.",
			createdAt: "2025-02-18T16:21:00Z",
			attachments: []
		},
		{
			id: "10",
			senderId: "1",
			text: "Thanks.",
			createdAt: "2025-02-18T16:22:00Z",
			attachments: []
		}
	]
};

const getConversationDetails = (conversationId: string): Promise<ConversationDetails> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const participant = participantsByConversationId[conversationId] ?? participantsByConversationId["1"];
			const messages = messagesByConversationId[conversationId] ?? messagesByConversationId["1"];

			resolve({
				id: conversationId,
				participants: [participant, currentUser],
				messages
			});
		}, 6000);
	});
};

const ConversationPage = async ({ params }: { params: Promise<{ conversationId: string }> }) => {
	const { conversationId } = await params;

	const conversation = await getConversationDetails(conversationId);
	const messageGroups = groupMessagesBySender(conversation.messages);

	// TODO
	// Get userId
	const currentUserId = currentUser.id;

	return (
		<section className="relative flex flex-col h-full basis-[69%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] overflow-hidden">
			<header className="relative flex px-[20px] py-[12px] items-center justify-between border-b-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-100)">
				<div className="flex items-center gap-x-[12px]">
					<Image
						src={conversation.participants[0].imageUrl}
						alt=""
						width={32}
						height={32}
						className="w-[32px] h-[32px] rounded-full object-cover"
					/>
					<h4 className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
						{conversation.participants[0].fullName}
					</h4>
				</div>
				<button
					type="button"
					className="flex flex-row-reverse items-center cursor-pointer font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100) px-[16px] py-[7px] gap-x-[4px] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[10px] bg-(--geek-blue-primary-opacity-150)"
				>
					<span>Attach task</span>
					<Icon type={ICON_TYPES.TaskSquare} size={14} />
				</button>
			</header>
			<ol className="relative z-10 flex flex-col gap-y-[12px] h-full px-[24px] py-[24px] bg-[rgba(1,0,9,0.25)]">
				{messageGroups.map((group) => {
					const participant = conversation.participants.find((user) => user.id === group.senderId);

					return (
						<li className="relative" key={group.id}>
							<article
								className={clsx(
									"flex flex-col gap-y-[8px]",
									currentUserId === group.senderId ? "items-end" : "items-start"
								)}
							>
								<header
									className={clsx(
										"flex items-center gap-x-[12px]",
										currentUserId === group.senderId && "flex-row-reverse"
									)}
								>
									<Image
										src={participant?.imageUrl ?? ""}
										alt={participant?.fullName ?? ""}
										width={24}
										height={24}
										className="rounded-full w-[24px] h-[24px] object-cover bg-(--geek-blue-primary-opacity-400)"
									/>
									<strong className="font-(family-name:--font-barlow) font-bold text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) capitalize">
										{participant?.fullName}
									</strong>
									<time
										className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)"
										dateTime={group.createdAt}
									>
										{getRelativeTime(group.createdAt)}
									</time>
								</header>
								<ol
									className={clsx(
										"flex flex-col gap-y-[8px]",
										currentUserId === group.senderId ? "items-end" : "items-start"
									)}
								>
									{group.messages.map((message) => (
										<li
											key={message.id}
											className={clsx(
												"w-[fit-content] max-w-[452px] px-[16px] py-[12px] rounded-bl-[24px] rounded-br-[24px]",
												currentUserId === group.senderId
													? "bg-(--geek-blue-6) rounded-tl-[24px] rounded-tr-[0px]"
													: "bg-(--geek-blue-primary-opacity-400) rounded-tl-[0px] rounded-tr-[24px]"
											)}
										>
											<p className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
												{message.text}
											</p>
										</li>
									))}
								</ol>
							</article>
						</li>
					);
				})}
			</ol>
			<footer className="relative flex px-[20px] py-[20px] border-t-[0.50px] border-solid border-(--white-pallete-10) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-50)">
				<form className="flex flex-col relative w-full">
					<label className="sr-only" htmlFor="message">
						Write a message
					</label>
					<div className="flex flex-col relative w-full">
						<textarea
							className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) resize-none w-full max-h-[120px] min-h-[89px] border-[0.50px] border-solid border-(--white-pallete-10) focus:border-(--geek-blue-4) focus:outline-none bg-(--geek-blue-primary-opacity-150) rounded-[10px] px-[12px] py-[12px] placeholder:text-(--neutrals-3)"
							placeholder="Write a messege..."
							id="message"
							name="message"
						/>
						<Button
							className="absolute bottom-[12px] right-[12px] px-[16px] py-[7px] rounded-[0.625rem]"
							trailingIcon={<Icon type={ICON_TYPES.SendBold} size={16} />}
							type="submit"
						>
							Send
						</Button>
						<div className="flex gap-x-[10px] absolute bottom-[12px] left-[12px]">
							<button className="cursor-pointer text-[#95ACCB] hover:text-[#fff]" type="button">
								<span className="sr-only">Attach file</span>
								<Icon size={16} type={ICON_TYPES.Attach} />
							</button>
							<button className="cursor-pointer text-[#95ACCB] hover:text-[#fff]" type="button">
								<span className="sr-only">Add emoji</span>
								<Icon size={16} type={ICON_TYPES.Smileys} />
							</button>
						</div>
					</div>
				</form>
			</footer>
		</section>
	);
};

export default ConversationPage;
