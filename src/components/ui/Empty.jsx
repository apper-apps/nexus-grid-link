import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Users", 
  title = "Nothing here yet", 
  description = "Be the first to create something amazing!",
  actionText = "Get Started",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center max-w-md mx-auto p-8">
        <div className="blob-bg w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          <ApperIcon name={icon} className="w-16 h-16 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>{actionText}</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;