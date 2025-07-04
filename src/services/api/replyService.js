import repliesData from '@/services/mockData/replies.json';

class ReplyService {
  constructor() {
    this.replies = [...repliesData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.replies];
  }

  async getById(id) {
    await this.delay(200);
    const reply = this.replies.find(r => r.Id === id);
    if (!reply) {
      throw new Error('Reply not found');
    }
    return { ...reply };
  }

  async getByPost(postId) {
    await this.delay(250);
    return this.replies.filter(r => r.postId === postId).map(r => ({ ...r }));
  }

  async create(replyData) {
    await this.delay(400);
    const newReply = {
      ...replyData,
      Id: Math.max(...this.replies.map(r => r.Id)) + 1,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      author: {
        Id: replyData.authorId,
        username: 'CurrentUser',
        avatar: ''
      }
    };
    this.replies.push(newReply);
    return { ...newReply };
  }

  async update(id, updates) {
    await this.delay(300);
    const index = this.replies.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reply not found');
    }
    this.replies[index] = { ...this.replies[index], ...updates };
    return { ...this.replies[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.replies.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error('Reply not found');
    }
    this.replies.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const replyService = new ReplyService();