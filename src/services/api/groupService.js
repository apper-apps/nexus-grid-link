import groupsData from '@/services/mockData/groups.json';

class GroupService {
  constructor() {
    this.groups = [...groupsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.groups];
  }

  async getById(id) {
    await this.delay(200);
    const group = this.groups.find(g => g.Id === id);
    if (!group) {
      throw new Error('Group not found');
    }
    return { ...group };
  }

  async create(groupData) {
    await this.delay(400);
    const newGroup = {
      ...groupData,
      Id: Math.max(...this.groups.map(g => g.Id)) + 1,
      memberCount: 1,
      postCount: 0
    };
    this.groups.push(newGroup);
    return { ...newGroup };
  }

  async update(id, updates) {
    await this.delay(300);
    const index = this.groups.findIndex(g => g.Id === id);
    if (index === -1) {
      throw new Error('Group not found');
    }
    this.groups[index] = { ...this.groups[index], ...updates };
    return { ...this.groups[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.groups.findIndex(g => g.Id === id);
    if (index === -1) {
      throw new Error('Group not found');
    }
    this.groups.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const groupService = new GroupService();