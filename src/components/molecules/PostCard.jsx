import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PostCard = ({ post, showGroup = true, compact = false }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const navigate = useNavigate();
  
  const handleUpvote = (e) => {
    e.stopPropagation();
    if (upvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setUpvoted(!upvoted);
  };
  
  const handleClick = () => {
    navigate(`/thread/${post.Id}`);
  };
  
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleClick}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
          <p className="text-xs text-gray-500 truncate">
            {post.replyCount || 0} replies • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{upvotes}</span>
          <ApperIcon name="ArrowUp" className="w-4 h-4 text-gray-400" />
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={handleClick}
      className="card cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Avatar src={post.author?.avatar} alt={post.author?.username} size="medium" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{post.author?.username}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            {showGroup && post.group && (
              <>
                <span>in</span>
                <Badge variant="default" size="small">
                  {post.group.name}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ApperIcon name="MessageCircle" className="w-4 h-4" />
            <span>{post.replyCount || 0} replies</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Eye" className="w-4 h-4" />
            <span>{post.views || 0} views</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="small"
            onClick={handleUpvote}
            className={`${upvoted ? 'text-primary bg-purple-50' : 'text-gray-600'}`}
          >
            <ApperIcon name="ArrowUp" className="w-4 h-4 mr-1" />
            {upvotes}
          </Button>
          
          <Button variant="ghost" size="small">
            <ApperIcon name="Share" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;