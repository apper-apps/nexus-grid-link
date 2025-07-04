import usersData from '@/services/mockData/users.json';
import postsData from '@/services/mockData/posts.json';
import groupsData from '@/services/mockData/groups.json';

class UserService {
  constructor() {
    this.users = [...usersData];
    this.posts = [...postsData];
    this.groups = [...groupsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.users];
  }

  async getById(id) {
    await this.delay(200);
    const user = this.users.find(u => u.Id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  }

  async getUserPosts(userId) {
    await this.delay(250);
    return this.posts.filter(p => p.authorId === userId).map(p => ({ ...p }));
  }

  async getUserGroups(userId) {
    await this.delay(250);
    const user = this.users.find(u => u.Id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.groups.filter(g => user.joinedGroups.includes(g.Id)).map(g => ({ ...g }));
  }

  async create(userData) {
    await this.delay(400);
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      joinedGroups: [],
      points: 0,
      badges: []
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, updates) {
    await this.delay(300);
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = { ...this.users[index], ...updates };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.users.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const userService = new UserService();