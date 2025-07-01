import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi'; // React Icons
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
     <Helmet>
      <title>DashBoard</title>
    </Helmet>
    <div className="flex flex-col min-h-screen bg-background text-text transition-all duration-300">
      {/* Top Nav */}
      {/* <NavBar /> */}

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surfaceColor shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-highlight focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-surfaceColor text-text border-r border-border p-6 shadow-md fixed md:static z-20 h-full md:h-auto overflow-y-auto`}
        >
          <nav className="flex flex-col gap-4 text-base font-semibold">
            <NavLink
              to="addMarathon"
              className={({ isActive }) =>
                `transition hover:text-highlight ${
                  isActive ? 'text-highlight underline' : ''
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Add Marathon
            </NavLink>
            <NavLink
              to="myMarathonList"
              className={({ isActive }) =>
                `transition hover:text-highlight ${
                  isActive ? 'text-highlight underline' : ''
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Marathon List
            </NavLink>
            <NavLink
              to="myApplyList"
              className={({ isActive }) =>
                `transition hover:text-highlight ${
                  isActive ? 'text-highlight underline' : ''
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              My Apply List
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition hover:text-highlight ${
                  isActive ? 'text-highlight underline' : ''
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              Back to home
            </NavLink>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 ml-0  overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
};

export default Dashboard;
