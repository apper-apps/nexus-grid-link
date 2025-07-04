import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import GroupCard from '@/components/molecules/GroupCard';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { groupService } from '@/services/api/groupService';

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All', icon: 'Grid3x3' },
    { id: 'Technology', name: 'Technology', icon: 'Cpu' },
    { id: 'Art & Design', name: 'Art & Design', icon: 'Palette' },
    { id: 'Music', name: 'Music', icon: 'Music' },
    { id: 'Gaming', name: 'Gaming', icon: 'Gamepad2' },
    { id: 'Science', name: 'Science', icon: 'Microscope' },
    { id: 'Sports', name: 'Sports', icon: 'Trophy' },
    { id: 'Food', name: 'Food', icon: 'Coffee' },
    { id: 'Travel', name: 'Travel', icon: 'Map' }
  ];
  
  const loadGroups = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await groupService.getAll();
      setGroups(data);
    } catch (err) {
      setError('Failed to load groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadGroups();
  }, []);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };
  
  const filteredGroups = groups.filter(group => {
    const matchesSearch = !searchQuery || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const popularGroups = groups.filter(group => group.memberCount > 1000).slice(0, 6);
  
  if (loading) return <Loading type="groups" />;
  if (error) return <Error message={error} onRetry={loadGroups} />;
  
return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
Discover Your{' '}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">Community</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Join vibrant communities, share your passions, and connect with like-minded people from around the world.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-amber-50 border border-gray-200'
              }`}
            >
              <ApperIcon name={category.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Popular Groups */}
      {!searchQuery && selectedCategory === 'all' && popularGroups.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Popular Communities</h2>
            <Badge variant="primary" size="medium">
              <ApperIcon name="TrendingUp" className="w-4 h-4 mr-1" />
              Trending
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGroups.map((group, index) => (
              <motion.div
                key={group.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GroupCard group={group} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* All Groups */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory === 'all' ? 'All Communities' : `${selectedCategory} Communities`}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredGroups.length} {filteredGroups.length === 1 ? 'community' : 'communities'} found
          </span>
        </div>
        
        {filteredGroups.length === 0 ? (
          <Empty
            icon="Search"
            title="No communities found"
            description={searchQuery ? 
              `No communities match your search "${searchQuery}". Try different keywords or browse categories.` :
              "No communities found in this category. Try selecting a different category."
            }
            actionText="Clear Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSearchParams({});
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GroupCard group={group} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;