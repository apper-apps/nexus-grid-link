import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import PostCard from '@/components/molecules/PostCard';
import GroupCard from '@/components/molecules/GroupCard';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services/api/userService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', bio: '' });
  
  const loadUserData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load current user data (simulated)
      const userData = await userService.getById(1);
      setUser(userData);
      setEditForm({ username: userData.username, bio: userData.bio });
      
      // Load user posts and groups
      const [postsData, groupsData] = await Promise.all([
        userService.getUserPosts(1),
        userService.getUserGroups(1)
      ]);
      
      setUserPosts(postsData);
      setUserGroups(groupsData);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUserData();
  }, []);
  
  const handleSaveProfile = async () => {
    try {
      await userService.update(1, editForm);
      setUser({ ...user, ...editForm });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };
  
  const achievements = [
    { name: 'First Post', description: 'Created your first post', earned: true },
    { name: 'Community Builder', description: 'Joined 5 groups', earned: true },
    { name: 'Helpful Member', description: 'Received 50 upvotes', earned: true },
    { name: 'Discussion Starter', description: 'Started 10 discussions', earned: false },
    { name: 'Popular Contributor', description: 'Received 100 upvotes', earned: false }
  ];
  
  if (loading) return <Loading type="profile" />;
  if (error) return <Error message={error} onRetry={loadUserData} />;
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <Avatar src={user?.avatar} alt={user?.username} size="xlarge" />
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-primary outline-none bg-transparent"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full text-gray-600 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.username}</h1>
                  <p className="text-gray-600 mb-4">{user?.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {user?.badges?.map((badge, index) => (
                      <Badge key={index} variant="primary" size="small">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            {isEditing ? (
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="medium"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({ username: user.username, bio: user.bio });
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="medium"
                icon="Edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{user?.points || 0}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{userPosts?.length || 0}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{userGroups?.length || 0}</div>
            <div className="text-sm text-gray-600">Groups</div>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'posts', name: 'Posts', icon: 'MessageSquare' },
            { id: 'groups', name: 'Groups', icon: 'Users' },
            { id: 'achievements', name: 'Achievements', icon: 'Trophy' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
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
              {userPosts.length === 0 ? (
                <Empty
                  icon="MessageSquare"
                  title="No posts yet"
                  description="Start sharing your thoughts with the community!"
                  actionText="Create First Post"
                  onAction={() => {/* Handle create post */}}
                />
              ) : (
                userPosts.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))
              )}
            </div>
          )}
          
          {activeTab === 'groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userGroups.length === 0 ? (
                <div className="col-span-full">
                  <Empty
                    icon="Users"
                    title="No groups joined"
                    description="Discover and join communities that match your interests!"
                    actionText="Browse Groups"
                    onAction={() => {/* Navigate to discover */}}
                  />
                </div>
              ) : (
                userGroups.map((group, index) => (
                  <motion.div
                    key={group.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GroupCard group={group} isJoined={true} />
                  </motion.div>
                ))
              )}
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card ${achievement.earned ? 'bg-gradient-to-r from-purple-50 to-blue-50' : 'opacity-60'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-primary to-purple-600' 
                        : 'bg-gray-300'
                    }`}>
                      <ApperIcon 
                        name={achievement.earned ? "Trophy" : "Lock"} 
                        className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-500'}`} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge variant="success" size="small">
                        Earned
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-gray-600">Joined Technology group</span>
                <span className="text-gray-400">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-gray-600">Posted in Design group</span>
                <span className="text-gray-400">5h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-gray-600">Received 10 upvotes</span>
                <span className="text-gray-400">1d ago</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" size="medium" className="w-full" icon="MessageSquare">
                Create Post
              </Button>
              <Button variant="secondary" size="medium" className="w-full" icon="Users">
                Find Groups
              </Button>
              <Button variant="secondary" size="medium" className="w-full" icon="Settings">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;