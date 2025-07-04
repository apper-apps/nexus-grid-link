import { Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import Layout from "@/components/organisms/Layout";
import Profile from "@/components/pages/Profile";
import ThreadView from "@/components/pages/ThreadView";
import Messages from "@/components/pages/Messages";
import Discover from "@/components/pages/Discover";
import GroupView from "@/components/pages/GroupView";

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-black">
        <Layout>
            <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/group/:groupId" element={<GroupView />} />
                <Route path="/thread/:threadId" element={<ThreadView />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messages" element={<Messages />} />
            </Routes>
        </Layout>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{
                zIndex: 9999
            }} />
    </div></Router>
  );
}

export default App;