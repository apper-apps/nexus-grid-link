import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const GroupCard = ({ group, isJoined = false, compact = false }) => {
  const [joined, setJoined] = useState(isJoined);
  const navigate = useNavigate();
  
  const handleJoinToggle = (e) => {
    e.stopPropagation();
    setJoined(!joined);
  };
  
  const handleClick = () => {
    navigate(`/group/${group.Id}`);
  };
  
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
>
        <Avatar 
          src={group.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${group.name}&backgroundColor=7c3aed,f59e0b,10b981`} 
          alt={group.name} 
          size="medium" 
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{group.name}</p>
          <p className="text-xs text-gray-500 truncate">{group.memberCount} members</p>
        </div>
        {group.isPrivate && (
          <ApperIcon name="Lock" className="w-4 h-4 text-gray-400" />
        )}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="card cursor-pointer"
    >
<div className="flex items-center space-x-4 mb-4">
        <Avatar 
          src={group.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${group.name}&backgroundColor=7c3aed,f59e0b,10b981`} 
          alt={group.name} 
          size="large" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{group.name}</h3>
            {group.isPrivate && (
              <ApperIcon name="Lock" className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <Badge variant="default" size="small">
            {group.category}
          </Badge>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>{group.memberCount.toLocaleString()} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="MessageCircle" className="w-4 h-4" />
            <span>{group.postCount || 0} posts</span>
          </div>
        </div>
        
        <Button
          variant={joined ? "secondary" : "primary"}
          size="small"
          onClick={handleJoinToggle}
        >
          {joined ? "Joined" : "Join"}
        </Button>
      </div>
    </motion.div>
  );
};

export default GroupCard;