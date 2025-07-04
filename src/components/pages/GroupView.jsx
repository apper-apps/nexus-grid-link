import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PostCard from '@/components/molecules/PostCard';
import UserCard from '@/components/molecules/UserCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { groupService } from '@/services/api/groupService';
import { postService } from '@/services/api/postService';

const GroupView = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  const loadGroupData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [groupData, postsData] = await Promise.all([
        groupService.getById(parseInt(groupId)),
        postService.getByGroup(parseInt(groupId))
      ]);
      
      setGroup(groupData);
      setPosts(postsData);
      
      // Simulate members data
      setMembers([
        { Id: 1, username: 'Alex Chen', bio: 'Tech enthusiast', avatar: '', points: 1250 },
        { Id: 2, username: 'Sarah Johnson', bio: 'Designer & artist', avatar: '', points: 980 },
        { Id: 3, username: 'Mike Rodriguez', bio: 'Community builder', avatar: '', points: 2100 }
      ]);
    } catch (err) {
      setError('Failed to load group. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (groupId) {
      loadGroupData();
    }
  }, [groupId]);
  
  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
    toast.success(isJoined ? 'Left group successfully!' : 'Joined group successfully!');
  };
  
  if (loading) return <Loading type="threads" />;
  if (error) return <Error message={error} onRetry={loadGroupData} />;
  if (!group) return <Error message="Group not found" />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Group Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <Avatar src={group.avatar} alt={group.name} size="xlarge" />
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                {group.isPrivate && (
                  <Badge variant="warning" size="small" icon="Lock">
                    Private
                  </Badge>
                )}
              </div>
              <Badge variant="default" size="medium">
                {group.category}
              </Badge>
              <p className="text-gray-600 mt-3 leading-relaxed">{group.description}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button
              variant={isJoined ? "secondary" : "primary"}
              size="large"
              onClick={handleJoinToggle}
              icon={isJoined ? "Check" : "Plus"}
            >
              {isJoined ? "Joined" : "Join Group"}
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Users" className="w-4 h-4" />
                <span>{group.memberCount.toLocaleString()} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="MessageCircle" className="w-4 h-4" />
                <span>{posts.length} posts</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'posts', name: 'Posts', icon: 'MessageSquare' },
            { id: 'members', name: 'Members', icon: 'Users' },
            { id: 'about', name: 'About', icon: 'Info' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-violet-600 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {posts.length === 0 ? (
                <Empty
                  icon="MessageSquare"
                  title="No posts yet"
                  description="Be the first to start a conversation in this group!"
                  actionText="Create First Post"
                  onAction={() => {/* Handle create post */}}
                />
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PostCard post={post} showGroup={false} />
                  </motion.div>
                ))
              )}
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {members.map((member, index) => (
                <motion.div
                  key={member.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <UserCard user={member} />
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Group</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{group.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Group Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Members</span>
                        <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Posts</span>
                        <span className="font-medium">{posts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{group.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Group Rules</h4>
                    <div className="space-y-2 text-sm text-gray-600">
<div className="flex items-start space-x-2">
                        <span className="text-violet-600">•</span>
                        <span>Be respectful and kind to all members</span>
                      </div>
<div className="flex items-start space-x-2">
                        <span className="text-violet-600">•</span>
                        <span>Stay on topic and relevant to the group</span>
                      </div>
<div className="flex items-start space-x-2">
                        <span className="text-violet-600">•</span>
                        <span>No spam or self-promotion</span>
                      </div>
<div className="flex items-start space-x-2">
                        <span className="text-violet-600">•</span>
                        <span>Use appropriate language</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Members</h3>
            <div className="space-y-3">
              {members.slice(0, 3).map((member) => (
                <UserCard key={member.Id} user={member} compact showFollowButton={false} />
              ))}
            </div>
            <Button variant="ghost" size="medium" className="w-full mt-4">
              View All Members
            </Button>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" size="medium" className="w-full" icon="Share">
                Share Group
              </Button>
              <Button variant="secondary" size="medium" className="w-full" icon="Flag">
                Report Group
              </Button>
              <Button variant="secondary" size="medium" className="w-full" icon="Bell">
                Notifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupView;