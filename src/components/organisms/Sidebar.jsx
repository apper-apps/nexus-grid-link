import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = ({ isOpen, onClose, groups = [] }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Discover', href: '/discover', icon: 'Compass' },
    { name: 'My Groups', href: '/groups', icon: 'Users' },
    { name: 'Messages', href: '/messages', icon: 'MessageCircle' },
    { name: 'Profile', href: '/profile', icon: 'User' }
  ];
  
  const isActive = (path) => {
    return location.pathname === path || (path === '/discover' && location.pathname === '/');
  };
  
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </h3>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Recent Groups */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Recent Groups
          </h3>
          <div className="space-y-1">
            {groups.slice(0, 5).map((group) => (
              <Link
                key={group.Id}
                to={`/group/${group.Id}`}
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {group.name.charAt(0)}
                  </span>
                </div>
                <span className="truncate">{group.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <ApperIcon name="Heart" className="w-4 h-4" />
          <span>Made with love for communities</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:bg-white md:border-r md:border-gray-200">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Nexus Hub</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Sidebar;