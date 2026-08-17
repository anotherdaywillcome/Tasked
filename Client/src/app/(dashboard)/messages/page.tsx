import { Button, Icon, ICON_TYPES } from "@shared/ui";

const MessagesPage = () => {
	return (
		<section className="relative flex flex-col h-full basis-[69%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] overflow-hidden">
			<header className="relative flex px-[20px] py-[12px] items-center justify-between border-b-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-100)">
				<div className="flex items-center gap-x-[12px]">
					<span className="flex w-[32px] h-[32px] items-center justify-center rounded-full border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-400) text-(--neutrals-3)">
						<Icon type={ICON_TYPES.Message} size={16} />
					</span>
					<h4 className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
						Select a conversation
					</h4>
				</div>
				<button
					type="button"
					className="flex flex-row-reverse items-center cursor-not-allowed font-(family-name:--font-barlow) font-bold text-[14px] leading-[114%] tracking-[0.01em] text-(--white-pallete-100) px-[16px] py-[7px] gap-x-[4px] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[10px] bg-(--geek-blue-primary-opacity-150) opacity-50"
					disabled
				>
					<span>Attach task</span>
					<Icon type={ICON_TYPES.TaskSquare} size={14} />
				</button>
			</header>
			<div className="relative z-10 flex h-full items-center justify-center px-[24px] py-[24px] bg-[rgba(1,0,9,0.25)]">
				<div className="flex max-w-[360px] flex-col items-center text-center">
					<span className="mb-[16px] flex w-[56px] h-[56px] items-center justify-center rounded-full border-[0.50px] border-solid border-(--white-pallete-10) bg-(--geek-blue-primary-opacity-150) text-(--white-pallete-100)">
						<Icon type={ICON_TYPES.Message} size={24} />
					</span>
					<h2 className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)">
						No conversation selected
					</h2>
					<p className="mt-[8px] font-(family-name:--font-barlow) font-medium text-[12px] leading-[150%] tracking-[0.01em] text-(--neutrals-3)">
						Choose a thread from the list to view messages.
					</p>
				</div>
			</div>
			<footer className="relative flex px-[20px] py-[20px] border-t-[0.50px] border-solid border-(--white-pallete-10) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-50)">
				<form className="flex flex-col relative w-full">
					<label className="sr-only" htmlFor="message">
						Write a message
					</label>
					<div className="flex flex-col relative w-full">
						<textarea
							className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100) resize-none w-full max-h-[120px] min-h-[89px] border-[0.50px] border-solid border-(--white-pallete-10) focus:outline-none bg-(--geek-blue-primary-opacity-150) rounded-[10px] px-[12px] py-[12px] placeholder:text-(--neutrals-3) cursor-not-allowed opacity-60"
							placeholder="Select a conversation to write a message..."
							id="message"
							name="message"
							disabled
						/>
						<Button
							className="absolute bottom-[12px] right-[12px] px-[16px] py-[7px] rounded-[0.625rem] opacity-50 cursor-not-allowed"
							trailingIcon={<Icon type={ICON_TYPES.SendBold} size={16} />}
							type="submit"
							disabled
						>
							Send
						</Button>
						<div className="flex gap-x-[10px] absolute bottom-[12px] left-[12px]">
							<button className="cursor-not-allowed text-[#95ACCB] opacity-50" type="button" disabled>
								<span className="sr-only">Attach file</span>
								<Icon size={16} type={ICON_TYPES.Attach} />
							</button>
							<button className="cursor-not-allowed text-[#95ACCB] opacity-50" type="button" disabled>
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

export default MessagesPage;
