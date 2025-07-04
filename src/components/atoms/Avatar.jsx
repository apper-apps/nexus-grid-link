import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'medium', 
  initials, 
  online = false,
  className = ''
}) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };
  
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm', 
    large: 'text-base',
    xlarge: 'text-lg'
  };
  
  const onlineSizes = {
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xlarge: 'w-4 h-4'
  };
  
  const avatarClasses = `${sizes[size]} rounded-full flex items-center justify-center relative ${className}`;
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={avatarClasses}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : initials ? (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <span className={`${textSizes[size]} font-semibold text-white`}>
            {initials}
          </span>
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
          <ApperIcon name="User" className={`${sizes[size]} text-gray-400`} />
        </div>
      )}
      
      {online && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${onlineSizes[size]} bg-accent rounded-full border-2 border-white`} />
      )}
    </motion.div>
  );
};

export default Avatar;