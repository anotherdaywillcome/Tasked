import Image from "next/image";
import Link from "next/link";

// TODO
// Create ValidationMessage also create server action
// TODO !
// FSD Component splitting
// TEMPORARY
import UserImage from "@public/images/users/di_smolskii.png";

import { Button, Icon, ICON_TYPES, Input, Textarea } from "@shared/ui";

const AccountPage = () => {
	return (
		<section
			className="relative flex flex-col h-full basis-[74%] border-[0.50px] border-solid border-(--white-pallete-10) rounded-[20px] bg-(--geek-blue-primary-opacity-100) backdrop-blur-[32px] overflow-hidden"
			aria-labelledby="account-settings-title"
		>
			<header className="relative flex px-[20px] py-[18px] items-center justify-between border-b-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-100)">
				<div className="flex items-center gap-x-[12px]">
					<Icon className="text-[white]" type={ICON_TYPES.UserSquareBold} size={16} />
					<h2
						id="account-settings-title"
						className="font-(family-name:--font-barlow) font-bold text-[16px] leading-[125%] tracking-[0.01em] text-(--white-pallete-100)"
					>
						Account
					</h2>
				</div>
			</header>
			<form className="h-full" id="account-settings-form" aria-labelledby="account-settings-title">
				<fieldset>
					<legend>Photo</legend>
					<Image
						className="w-[72px]! h-[72px]! rounded-[24px] bg-[#B6C3EC] object-cover"
						src={UserImage}
						width={72}
						height={72}
						alt="Di Smolskii profile photo"
					/>
					<Button className="px-[16px] pt-[7px] pb-[9px] rounded-[10px]" variant="secondary" type="button">
						Change photo
					</Button>
					<Button className="px-[16px] pt-[7px] pb-[9px] rounded-[10px]" variant="secondary" type="button">
						Delete photo
					</Button>
				</fieldset>
				<fieldset>
					<legend>Profile</legend>
					<div>
						<Input defaultValue="Di Smolskii" type="text" name="username" label="User name" />
						<Input defaultValue="di.smolskii@gmail.com" type="email" name="email" label="Email" />
					</div>
					<Textarea
						label="Bio"
						name="bio"
						defaultValue="Creative Product Designer with 7+ years of experience. Passionate about intuitive interfaces and user research, utilizing the latest design trends and technologies."
					/>
				</fieldset>
				<fieldset>
					<legend className="font-(family-name:--font-barlow) font-bold text-[12px] leading-[133%] tracking-[0.01em] text-(--white-pallete-100)">
						Delete Account
					</legend>
					<p
						id="delete-account-description"
						className="font-(family-name:--font-barlow) font-medium text-[12px] leading-[133%] tracking-[0.01em] text-(--neutrals-3)"
					>
						All your data, including tasks, projects, comments and more will be immediately deleted without
						the possibility of recovery.{" "}
						<Link
							className="text-(--geek-blue-4) focus-ring"
							href="/"
							aria-label="Learn more about deleting your account"
						>
							Learn more.
						</Link>
					</p>
					<Button
						variant="secondary"
						type="button"
						className="px-[16px] pt-[7px] pb-[9px] rounded-[10px]"
						aria-describedby="delete-account-description"
						leadingIcon={<Icon type={ICON_TYPES.TrashBold} size={16} />}
					>
						Delete account
					</Button>
				</fieldset>
			</form>
			<footer className="relative flex px-[20px] py-[12px] border-t-[0.50px] border-solid border-(--geek-blue-primary-opacity-50) backdrop-blur-[50px] bg-(--geek-blue-primary-opacity-50)">
				<Button
					type="submit"
					form="account-settings-form"
					className="ml-auto mr-0 px-[16px] pt-[7px] pb-[9px] rounded-[10px]"
				>
					Save changed
				</Button>
			</footer>
		</section>
	);
};

export default AccountPage;
