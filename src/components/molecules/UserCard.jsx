import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const UserCard = ({ user, showFollowButton = true, compact = false }) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Avatar src={user.avatar} alt={user.username} size="medium" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
          <p className="text-xs text-gray-500 truncate">{user.bio}</p>
        </div>
        {user.badges && user.badges.length > 0 && (
          <Badge variant="primary" size="small">
            {user.badges[0]}
          </Badge>
        )}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card"
    >
      <div className="text-center">
        <Avatar src={user.avatar} alt={user.username} size="xlarge" className="mx-auto mb-4" />
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.username}</h3>
        
        {user.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>
        )}
        
        <div className="flex items-center justify-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>{user.joinedGroups?.length || 0} groups</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Star" className="w-4 h-4" />
            <span>{user.points || 0} points</span>
          </div>
        </div>
        
        {user.badges && user.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {user.badges.slice(0, 3).map((badge, index) => (
              <Badge key={index} variant="primary" size="small">
                {badge}
              </Badge>
            ))}
            {user.badges.length > 3 && (
              <Badge variant="default" size="small">
                +{user.badges.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {showFollowButton && (
          <Button variant="primary" size="medium" className="w-full">
            Follow
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;