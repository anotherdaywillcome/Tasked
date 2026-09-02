export enum Privacy {
	Public,
	Private
}

export const privacyOptions = Object.values(Privacy).filter((value) => typeof value === "string");
