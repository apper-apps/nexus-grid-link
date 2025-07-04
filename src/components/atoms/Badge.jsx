import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({ 
  variant = 'default', 
  size = 'medium', 
  icon, 
  children, 
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-secondary to-orange-500 text-white',
    accent: 'bg-gradient-to-r from-accent to-green-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white'
  };
  
  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  };
  
  const badgeClasses = `inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={badgeClasses}
    >
      {icon && (
        <ApperIcon name={icon} className="w-3 h-3 mr-1" />
      )}
      {children}
    </motion.span>
  );
};

export default Badge;