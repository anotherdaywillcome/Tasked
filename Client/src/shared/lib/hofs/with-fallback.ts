type FallbackContext = {
	field: string;
	entity: string;
	entityId?: string;
};

export const withFallback = <T>(fallback: T, context: FallbackContext) => {
	return (value: T | null | undefined): T => {
		if (value !== null && value !== undefined) {
			return value;
		}

		console.warn("[BFF] Adapter fallback used", {
			...context,
			fallback
		});

		return fallback;
	};
};
