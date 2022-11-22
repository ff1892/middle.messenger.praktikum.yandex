export const getCurrentChatById = (id: number, chats: Record<string, any>[]) => {
  for (const chat of chats) {
    if (chat.id === id) {
      return { ...chat };
    }
  }
  return {};
};
