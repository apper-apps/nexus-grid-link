import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { messageService } from '@/services/api/messageService';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await messageService.getConversations();
      setConversations(data);
      
      if (data.length > 0) {
        setSelectedConversation(data[0]);
        const messagesData = await messageService.getMessages(data[0].Id);
        setMessages(messagesData);
      }
    } catch (err) {
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMessages();
  }, []);
  
  const handleConversationSelect = async (conversation) => {
    setSelectedConversation(conversation);
    try {
      const messagesData = await messageService.getMessages(conversation.Id);
      setMessages(messagesData);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    try {
      const message = await messageService.sendMessage({
        conversationId: selectedConversation.Id,
        content: newMessage,
        senderId: 1 // Current user ID
      });
      
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  
  const filteredConversations = conversations.filter(conv =>
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) return <Loading type="general" />;
  if (error) return <Error message={error} onRetry={loadMessages} />;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 card h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            <Button variant="primary" size="small">
              <ApperIcon name="Plus" className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mb-4">
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon="Search"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredConversations.length === 0 ? (
              <Empty
                icon="MessageCircle"
                title="No conversations"
                description="Start a conversation with someone!"
                actionText="New Message"
                onAction={() => {}}
              />
            ) : (
              filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.Id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.Id === conversation.Id
                      ? 'bg-purple-50 border border-purple-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={conversation.participant.avatar}
                      alt={conversation.participant.username}
                      size="medium"
                      online={conversation.participant.isOnline}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.participant.username}
                        </p>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage?.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {conversation.lastMessage?.content}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="primary" size="small">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
        
        {/* Messages */}
        <div className="lg:col-span-3 card h-full flex flex-col">
          {selectedConversation ? (
            <>
              {/* Message Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={selectedConversation.participant.avatar}
                    alt={selectedConversation.participant.username}
                    size="medium"
                    online={selectedConversation.participant.isOnline}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedConversation.participant.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.participant.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="small">
                    <ApperIcon name="Phone" className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="small">
                    <ApperIcon name="Video" className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="small">
                    <ApperIcon name="MoreVertical" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.length === 0 ? (
                  <Empty
                    icon="MessageCircle"
                    title="No messages yet"
                    description="Start the conversation!"
                    actionText=""
                  />
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.Id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.senderId === 1 ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 1
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 1 ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <Button type="button" variant="ghost" size="small">
                    <ApperIcon name="Paperclip" className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex-1">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="border-none focus:ring-0 bg-gray-50"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    disabled={!newMessage.trim()}
                  >
                    <ApperIcon name="Send" className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="blob-bg w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <ApperIcon name="MessageCircle" className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;