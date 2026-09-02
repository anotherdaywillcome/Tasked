import { Privacy } from "../../model";

export type UpdateProjectPrivacyCommand = {
	id: string;
	privacy: Privacy;
};
