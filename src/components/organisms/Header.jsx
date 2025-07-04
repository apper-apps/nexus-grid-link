import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ onCreatePost, onMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (query) => {
    navigate(`/discover?search=${encodeURIComponent(query)}`);
  };
  
  const notifications = [
    { id: 1, type: 'like', message: 'Alex liked your post', time: '2 hours ago' },
    { id: 2, type: 'comment', message: 'Sarah commented on your post', time: '4 hours ago' },
    { id: 3, type: 'follow', message: 'Mike started following you', time: '1 day ago' }
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">Nexus Hub</span>
          </Link>
          
          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Create post button */}
            <Button
              variant="primary"
              size="medium"
              icon="Plus"
              onClick={onCreatePost}
              className="hidden sm:flex"
            >
              Create
            </Button>
            
            <Button
              variant="primary"
              size="medium"
              onClick={onCreatePost}
              className="sm:hidden"
            >
              <ApperIcon name="Plus" className="w-5 h-5" />
            </Button>
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              >
                <ApperIcon name="Bell" className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-primary hover:text-purple-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
              >
                <Avatar size="medium" initials="JD" />
              </button>
              
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ApperIcon name="User" className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ApperIcon name="MessageSquare" className="w-4 h-4" />
                    <span>Messages</span>
                  </Link>
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                    <ApperIcon name="Settings" className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <ApperIcon name="LogOut" className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;