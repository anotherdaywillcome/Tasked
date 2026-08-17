type Message = {
	id: string;
	senderId: string;
	text: string;
	createdAt: string;
	attachments?: Array<{
		id: string;
		url: string;
	}>;
};

type MessageGroup = {
	id: string;
	senderId: string;
	createdAt: string;
	messages: Message[];
};

export const groupMessagesBySender = (messages: Message[]): MessageGroup[] => {
	return messages.reduce<MessageGroup[]>((groups, message) => {
		const lastGroup = groups[groups.length - 1];

		if (lastGroup?.senderId === message.senderId) {
			lastGroup.messages.push(message);
			lastGroup.createdAt = message.createdAt;
		} else {
			groups.push({
				id: message.id,
				senderId: message.senderId,
				createdAt: message.createdAt,
				messages: [message]
			});
		}

		return groups;
	}, []);
};
