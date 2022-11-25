export const getCurrentChatById = (id: number, chats: Record<string, any>[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const chat of chats) {
    if (chat.id === id) {
      return { ...chat };
    }
  }
  return {};
};
