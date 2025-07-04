import { motion } from 'framer-motion';

const Loading = ({ type = 'general' }) => {
  const renderGroupsLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="card">
          <div className="flex items-center space-x-4 mb-4">
            <div className="skeleton w-12 h-12 rounded-full"></div>
            <div className="flex-1">
              <div className="skeleton h-4 w-24 mb-2 rounded"></div>
              <div className="skeleton h-3 w-16 rounded"></div>
            </div>
          </div>
          <div className="skeleton h-4 w-full mb-2 rounded"></div>
          <div className="skeleton h-4 w-3/4 mb-4 rounded"></div>
          <div className="flex justify-between items-center">
            <div className="skeleton h-3 w-20 rounded"></div>
            <div className="skeleton h-8 w-16 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderThreadsLoading = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="skeleton w-10 h-10 rounded-full"></div>
            <div className="flex-1">
              <div className="skeleton h-4 w-32 mb-1 rounded"></div>
              <div className="skeleton h-3 w-24 rounded"></div>
            </div>
          </div>
          <div className="skeleton h-5 w-3/4 mb-3 rounded"></div>
          <div className="skeleton h-4 w-full mb-2 rounded"></div>
          <div className="skeleton h-4 w-5/6 mb-4 rounded"></div>
          <div className="flex items-center space-x-4">
            <div className="skeleton h-3 w-16 rounded"></div>
            <div className="skeleton h-3 w-20 rounded"></div>
            <div className="skeleton h-3 w-12 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfileLoading = () => (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="skeleton w-24 h-24 rounded-full"></div>
          <div className="flex-1">
            <div className="skeleton h-6 w-48 mb-2 rounded"></div>
            <div className="skeleton h-4 w-32 mb-3 rounded"></div>
            <div className="skeleton h-4 w-full mb-2 rounded"></div>
            <div className="skeleton h-4 w-3/4 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="skeleton h-8 w-16 mx-auto mb-1 rounded"></div>
            <div className="skeleton h-3 w-12 mx-auto rounded"></div>
          </div>
          <div className="text-center">
            <div className="skeleton h-8 w-16 mx-auto mb-1 rounded"></div>
            <div className="skeleton h-3 w-12 mx-auto rounded"></div>
          </div>
          <div className="text-center">
            <div className="skeleton h-8 w-16 mx-auto mb-1 rounded"></div>
            <div className="skeleton h-3 w-12 mx-auto rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="skeleton h-5 w-32 mb-4 rounded"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="skeleton w-8 h-8 rounded-full"></div>
                <div className="flex-1">
                  <div className="skeleton h-4 w-24 mb-1 rounded"></div>
                  <div className="skeleton h-3 w-16 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="skeleton h-5 w-32 mb-4 rounded"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="skeleton w-6 h-6 rounded"></div>
                <div className="skeleton h-4 w-32 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeneralLoading = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600 font-medium">Loading amazing content...</p>
      </div>
    </div>
  );

  switch (type) {
    case 'groups':
      return renderGroupsLoading();
    case 'threads':
      return renderThreadsLoading();
    case 'profile':
      return renderProfileLoading();
    default:
      return renderGeneralLoading();
  }
};

export default Loading;