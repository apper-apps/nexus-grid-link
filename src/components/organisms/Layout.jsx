import { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import CreatePostModal from '@/components/molecules/CreatePostModal';
import { groupService } from '@/services/api/groupService';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await groupService.getAll();
        setGroups(data);
      } catch (error) {
        console.error('Failed to load groups:', error);
      }
    };
    
    loadGroups();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        groups={groups}
      />
      
      <div className="md:ml-64">
        <Header
          onMenuToggle={() => setSidebarOpen(true)}
          onCreatePost={() => setCreatePostOpen(true)}
        />
        
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      
      <CreatePostModal
        isOpen={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        groups={groups}
      />
    </div>
  );
};

export default Layout;