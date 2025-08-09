import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FiMenu, FiPlusCircle, FiList, FiCheckCircle, FiHome } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { to: 'addMarathon', label: 'Add Marathon', icon: <FiPlusCircle size={18} /> },
    { to: 'myMarathonList', label: 'My Marathon List', icon: <FiList size={18} /> },
    { to: 'myApplyList', label: 'My Apply List', icon: <FiCheckCircle size={18} /> },
    { to: '/', label: 'Back to Home', icon: <FiHome size={18} /> },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="flex min-h-screen bg-background text-text transition-all duration-300">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out
            w-64 bg-surfaceColor border-r border-border shadow-lg z-30 flex flex-col`}
        >
          {/* Logo / Brand */}
          <div className="flex items-center justify-center p-6 border-b border-border">
            <NavLink
              to="/"
              className="text-2xl font-extrabold tracking-wide text-highlight hover:opacity-80 transition"
              onClick={() => setSidebarOpen(false)}
            >
              MarathonHub
            </NavLink>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2 p-4 font-medium flex-1">
            {menuItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-highlight text-white shadow-md'
                      : 'hover:bg-highlight/10'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 md:ml-64">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surfaceColor shadow">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-highlight focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </header>

          <main className="flex-1 p-4 md:p-6 bg-background">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
