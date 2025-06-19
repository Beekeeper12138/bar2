import React from 'react';
import { NavLink } from 'react-router-dom';

const menu = [
  { path: '/home', label: '家族概览' },
  { path: '/members', label: '成员管理' },
  { path: '/relations', label: '关系管理' },
  { path: '/events', label: '事件管理' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white shadow h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold text-center border-b">家族谱系系统</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menu.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-gray-100 transition ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 