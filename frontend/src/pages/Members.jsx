import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../BranchContext';

const allMembers = [
  { id: 1, name: '张三', gender: '男', birth_date: '1980-05-10', photo: 'https://via.placeholder.com/120', death_date: '', birthplace: '北京', residence: '上海', bio: '张三简介', branch: '张氏' },
  { id: 2, name: '李四', gender: '女', birth_date: '1985-08-20', photo: 'https://via.placeholder.com/120', death_date: '', birthplace: '上海', residence: '北京', bio: '李四简介', branch: '李氏' },
  { id: 3, name: '王五', gender: '男', birth_date: '1990-01-15', photo: 'https://via.placeholder.com/120', death_date: '', birthplace: '广州', residence: '深圳', bio: '王五简介', branch: '张氏' },
];

export default function Members() {
  const { branch } = useBranch();
  const [search, setSearch] = useState({ name: '', gender: '', birthplace: '' });
  const navigate = useNavigate();
  const members = allMembers.filter(m => m.branch === branch);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">成员管理</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          onClick={() => navigate('/members/add')}
        >
          添加成员
        </button>
      </div>
      {/* 搜索栏 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <input
            type="text"
            className="form-input border rounded p-2"
            placeholder="姓名"
            value={search.name}
            onChange={e => setSearch(s => ({ ...s, name: e.target.value }))}
          />
          <select
            className="form-select border rounded p-2"
            value={search.gender}
            onChange={e => setSearch(s => ({ ...s, gender: e.target.value }))}
          >
            <option value="">性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          <input
            type="text"
            className="form-input border rounded p-2"
            placeholder="出生地"
            value={search.birthplace}
            onChange={e => setSearch(s => ({ ...s, birthplace: e.target.value }))}
          />
          <div className="flex gap-2">
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded">搜索</button>
            <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded">重置</button>
          </div>
        </form>
      </div>
      {/* 成员表格 */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="py-1 px-2">ID</th>
              <th className="py-1 px-2">姓名</th>
              <th className="py-1 px-2">性别</th>
              <th className="py-1 px-2">出生日期</th>
              <th className="py-1 px-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-t">
                <td className="py-1 px-2">{m.id}</td>
                <td className="py-1 px-2">{m.name}</td>
                <td className="py-1 px-2">{m.gender}</td>
                <td className="py-1 px-2">{m.birth_date}</td>
                <td className="py-1 px-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                    onClick={() => navigate(`/members/view/${m.id}`)}
                  >
                    查看
                  </button>
                  <button
                    className="px-2 py-1 bg-yellow-400 text-white rounded text-sm"
                    onClick={() => navigate(`/members/edit/${m.id}`)}
                  >
                    编辑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 分页 */}
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="inline-flex -space-x-px">
              <li>
                <a href="#" className="px-3 py-1 rounded-l border bg-gray-100 text-gray-400 cursor-not-allowed">上一页</a>
              </li>
              <li>
                <a href="#" className="px-3 py-1 border bg-blue-500 text-white">1</a>
              </li>
              <li>
                <a href="#" className="px-3 py-1 border bg-white text-blue-500">2</a>
              </li>
              <li>
                <a href="#" className="px-3 py-1 border bg-white text-blue-500">3</a>
              </li>
              <li>
                <a href="#" className="px-3 py-1 rounded-r border bg-gray-100 text-blue-500">下一页</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
} 