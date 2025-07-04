import conversationsData from '@/services/mockData/conversations.json';
import messagesData from '@/services/mockData/messages.json';

class MessageService {
  constructor() {
    this.conversations = [...conversationsData];
    this.messages = [...messagesData];
  }

  async getConversations() {
    await this.delay(300);
    return [...this.conversations];
  }

  async getMessages(conversationId) {
    await this.delay(200);
    return this.messages.filter(m => m.conversationId === conversationId).map(m => ({ ...m }));
  }

  async sendMessage(messageData) {
    await this.delay(400);
    const newMessage = {
      ...messageData,
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(newMessage);
    
    // Update conversation's last message
    const conversation = this.conversations.find(c => c.Id === messageData.conversationId);
    if (conversation) {
      conversation.lastMessage = {
        content: messageData.content,
        time: 'now'
      };
    }
    
    return { ...newMessage };
  }

  async createConversation(participantId) {
    await this.delay(300);
    const newConversation = {
      Id: Math.max(...this.conversations.map(c => c.Id)) + 1,
      participant: {
        Id: participantId,
        username: 'NewUser',
        avatar: '',
        isOnline: true
      },
      lastMessage: {
        content: 'Conversation started',
        time: 'now'
      },
      unreadCount: 0
    };
    this.conversations.push(newConversation);
    return { ...newConversation };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const messageService = new MessageService();