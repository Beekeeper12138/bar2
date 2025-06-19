import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../BranchContext';

const allEvents = [
  { id: 1, title: '家族聚会', event_date: '2024-06-01', description: '全家族成员在祖宅聚会。', people: '张三,李四,王五', branch: '张氏' },
  { id: 2, title: '新成员加入', event_date: '2024-05-15', description: '欢迎新成员王小明加入家族。', people: '王小明,李四', branch: '张氏' },
  { id: 3, title: '家族迁徙', event_date: '2023-12-10', description: '部分家族成员迁居新城市。', people: '张三,王五', branch: '张氏' },
  { id: 4, title: '李氏家宴', event_date: '2024-04-10', description: '李氏家族春季家宴。', people: '李四,赵六', branch: '李氏' },
];

export default function Events() {
  const { branch } = useBranch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const events = allEvents.filter(e => e.branch === branch);
  const filtered = events.filter(e => {
    const s = search.trim().toLowerCase();
    return (
      e.title.toLowerCase().includes(s) ||
      e.people.toLowerCase().includes(s)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">事件管理</h1>
      {/* 搜索栏 */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          className="form-input border rounded p-2 w-full md:w-80"
          placeholder="搜索事件名称或人员"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-1" />
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => navigate('/events/add')}>添加事件</button>
      </div>
      {/* 事件表格 */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="py-1 px-2">标题</th>
              <th className="py-1 px-2">日期</th>
              <th className="py-1 px-2">描述</th>
              <th className="py-1 px-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} className="border-t">
                <td className="py-1 px-2">{e.title}</td>
                <td className="py-1 px-2">{e.event_date}</td>
                <td className="py-1 px-2">{e.description}</td>
                <td className="py-1 px-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm" onClick={() => navigate(`/events/${e.id}`)}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 