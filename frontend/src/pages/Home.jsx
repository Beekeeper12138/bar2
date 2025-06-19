import React, { useEffect, useState } from 'react';
import { useBranch } from '../BranchContext';
// import ECharts for React (后续可用 'echarts-for-react')
// import ReactECharts from 'echarts-for-react';

export default function Home() {
  const { branch, setBranch } = useBranch();
  const [branches, setBranches] = useState([]); // 家族分支
  const [recentMembers, setRecentMembers] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  // const [timelineData, setTimelineData] = useState([]); // 时间线数据

  useEffect(() => {
    setBranches(['张氏', '李氏', '王氏']);
    // 模拟不同分支数据
    if (branch === '张氏') {
      setRecentMembers([
        { name: '张三', gender: '男', birth_date: '1980-05-10' },
        { name: '张小明', gender: '男', birth_date: '2000-01-01' },
      ]);
      setRecentEvents([
        { title: '张氏家族聚会', event_date: '2024-06-01' },
      ]);
    } else if (branch === '李氏') {
      setRecentMembers([
        { name: '李四', gender: '女', birth_date: '1985-08-20' },
      ]);
      setRecentEvents([
        { title: '李氏新成员加入', event_date: '2024-05-15' },
      ]);
    } else {
      setRecentMembers([]);
      setRecentEvents([]);
    }
  }, [branch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">家族概览</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左侧：分支选择+最近成员 */}
        <div className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold mb-2">家族分支</div>
            <select
              className="form-select w-full border rounded p-2"
              value={branch}
              onChange={e => setBranch(e.target.value)}
            >
              {branches.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold mb-2">最近更新成员</div>
            <table className="w-full text-left border">
              <thead>
                <tr>
                  <th className="py-1 px-2">姓名</th>
                  <th className="py-1 px-2">性别</th>
                  <th className="py-1 px-2">出生日期</th>
                </tr>
              </thead>
              <tbody>
                {recentMembers.map((m, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1 px-2">{m.name}</td>
                    <td className="py-1 px-2">{m.gender}</td>
                    <td className="py-1 px-2">{m.birth_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* 右侧：时间线+最近事件 */}
        <div className="space-y-6">
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold mb-2">家族时间线</div>
            <div className="h-48 flex items-center justify-center text-gray-400">[时间线图表占位]</div>
            {/* 后续用 <ReactECharts option={...} /> 替换 */}
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="font-semibold mb-2">最近事件</div>
            <ul className="list-disc pl-5">
              {recentEvents.map((e, i) => (
                <li key={i} className="mb-1">
                  <span className="font-medium">{e.title}</span>
                  <span className="ml-2 text-gray-500 text-sm">{e.event_date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 