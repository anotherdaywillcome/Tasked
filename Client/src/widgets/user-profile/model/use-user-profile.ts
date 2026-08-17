import { useEffect, useRef, useState } from "react";

type UserProfileState = "opened" | "closed";

export const useUserProfile = () => {
	const [userProfileState, setUserProfileState] = useState<UserProfileState>("closed");
	const userProfileRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handlePointerOutside = (event: MouseEvent) => {
			if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
				setUserProfileState("closed");
			}
		};

		document.addEventListener("pointerdown", handlePointerOutside);

		return () => {
			document.removeEventListener("pointerdown", handlePointerOutside);
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setUserProfileState("closed");
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const isUserProfileOpened = userProfileState === "opened";

	const handleUserProfileToggle = () => {
		setUserProfileState((prev) => {
			if (prev === "closed") {
				return "opened";
			}

			return "closed";
		});
	};

	return {
		userProfileRef,
		isUserProfileOpened,

		handleUserProfileToggle
	};
};
