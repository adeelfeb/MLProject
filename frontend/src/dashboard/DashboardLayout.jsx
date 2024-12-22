import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ChatList from "../components/chatlist/ChatList";
import { useSidebar } from "../contexts/SidebarContext";
import authService from '../AserverAuth/auth';
import ToastNotification from '../components/toastNotification/ToastNotification';
import { useSelector } from 'react-redux';
import EmptyOutletContent from './EmptyOutletContent';

function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isUserLoggedOut, setIsUserLoggedOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen } = useSidebar();
  const [toastMessage, setToastMessage] = useState(null);
  const [isError, setIsError] = useState(false);


  const handleLogout = () => {
    setIsUserLoggedOut(true);
    navigate("/login");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentUser = await authService.getCurrentUser();
      setIsAuthenticated(!!currentUser);
    };
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) return <div className="text-black">Loading....</div>;

  return (
    <div className="flex h-screen">
      <aside className="lg:w-1/8 bg-[#fff4f4] text-gray transition-all duration-300">
        <ChatList onLogout={handleLogout} />
      </aside>
      <main className={`flex-1 bg-white ${isSidebarOpen ? 'ml-1/4' : 'ml-0'} lg:ml-1/4 overflow-y-auto`}>
        <div>
          {/* Check if the current path is /dashboard and render EmptyOutletContent if no Outlet is present */}
          {location.pathname === '/dashboard' ? <EmptyOutletContent  /> : <Outlet />}
        </div>
      </main>
    
    </div>
  );
}

export default DashboardLayout;
