import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { postService } from '@/services/api/postService';
import { replyService } from '@/services/api/replyService';

const ThreadView = () => {
  const { threadId } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  
  const loadThreadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [postData, repliesData] = await Promise.all([
        postService.getById(parseInt(threadId)),
        replyService.getByPost(parseInt(threadId))
      ]);
      
      setPost(postData);
      setReplies(repliesData);
      setUpvotes(postData.upvotes || 0);
    } catch (err) {
      setError('Failed to load thread. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (threadId) {
      loadThreadData();
    }
  }, [threadId]);
  
  const handleUpvote = () => {
    if (upvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setUpvoted(!upvoted);
  };
  
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      toast.error('Please write a reply');
      return;
    }
    
    setSubmittingReply(true);
    
    try {
      const newReply = await replyService.create({
        postId: parseInt(threadId),
        content: replyContent,
        authorId: 1 // Current user ID
      });
      
      setReplies([...replies, newReply]);
      setReplyContent('');
      toast.success('Reply added successfully!');
    } catch (err) {
      toast.error('Failed to add reply');
    } finally {
      setSubmittingReply(false);
    }
  };
  
  const ReplyItem = ({ reply, level = 0 }) => {
    const [replyUpvoted, setReplyUpvoted] = useState(false);
    const [replyUpvotes, setReplyUpvotes] = useState(reply.upvotes || 0);
    
    const handleReplyUpvote = () => {
      if (replyUpvoted) {
        setReplyUpvotes(replyUpvotes - 1);
      } else {
        setReplyUpvotes(replyUpvotes + 1);
      }
      setReplyUpvoted(!replyUpvoted);
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${level > 0 ? 'ml-12 mt-4' : ''}`}
      >
        <div className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
          <Avatar src={reply.author?.avatar} alt={reply.author?.username} size="medium" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-gray-900">{reply.author?.username}</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{reply.content}</p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="small"
                onClick={handleReplyUpvote}
                className={`${replyUpvoted ? 'text-primary bg-purple-50' : 'text-gray-600'}`}
              >
                <ApperIcon name="ArrowUp" className="w-4 h-4 mr-1" />
                {replyUpvotes}
              </Button>
              
              <Button variant="ghost" size="small">
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-1" />
                Reply
              </Button>
              
              <Button variant="ghost" size="small">
                <ApperIcon name="Share" className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  if (loading) return <Loading type="threads" />;
  if (error) return <Error message={error} onRetry={loadThreadData} />;
  if (!post) return <Error message="Thread not found" />;
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Post Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar src={post.author?.avatar} alt={post.author?.username} size="medium" />
            <div>
              <p className="font-medium text-gray-900">{post.author?.username}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                {post.group && (
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
          
          <Button variant="ghost" size="small">
            <ApperIcon name="MoreHorizontal" className="w-5 h-5" />
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="medium"
              onClick={handleUpvote}
              className={`${upvoted ? 'text-primary bg-purple-50' : 'text-gray-600'}`}
            >
              <ApperIcon name="ArrowUp" className="w-5 h-5 mr-2" />
              {upvotes} upvotes
            </Button>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <ApperIcon name="MessageCircle" className="w-5 h-5" />
              <span>{replies.length} replies</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <ApperIcon name="Eye" className="w-5 h-5" />
              <span>{post.views || 0} views</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="medium">
              <ApperIcon name="Share" className="w-5 h-5 mr-2" />
              Share
            </Button>
            
            <Button variant="ghost" size="medium">
              <ApperIcon name="Bookmark" className="w-5 h-5 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Reply Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <form onSubmit={handleReplySubmit}>
          <div className="flex space-x-4">
            <Avatar size="medium" initials="YO" />
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Info" className="w-4 h-4" />
                    <span>Be respectful and constructive</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  loading={submittingReply}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
      
      {/* Replies */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Replies ({replies.length})
          </h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
        
        {replies.length === 0 ? (
          <Empty
            icon="MessageCircle"
            title="No replies yet"
            description="Be the first to share your thoughts on this post!"
            actionText="Add Reply"
            onAction={() => document.querySelector('textarea').focus()}
          />
        ) : (
          <div className="space-y-4">
            {replies.map((reply, index) => (
              <motion.div
                key={reply.Id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ReplyItem reply={reply} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadView;