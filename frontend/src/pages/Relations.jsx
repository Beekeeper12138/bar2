import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useBranch } from '../BranchContext';

const allRelations = [
  { id: 1, person1: '张三', person2: '李四', type: '配偶', branch: '张氏' },
  { id: 2, person1: '张三', person2: '王五', type: '父子', branch: '张氏' },
  { id: 3, person1: '李四', person2: '王五', type: '母子', branch: '张氏' },
  { id: 4, person1: '王五', person2: '赵六', type: '兄弟', branch: '张氏' },
  { id: 5, person1: '李四', person2: '赵六', type: '姐妹', branch: '李氏' },
];
const relationTypes = ['所有关系', '血缘关系', '婚姻关系'];

function getTreeOption() {
  return {
    tooltip: { trigger: 'item', triggerOn: 'mousemove' },
    series: [
      {
        type: 'tree',
        data: [
          {
            name: '张三',
            children: [
              { name: '王五' },
              { name: '李四' },
            ],
          },
        ],
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 10,
        label: { position: 'left', verticalAlign: 'middle', align: 'right', fontSize: 14 },
        leaves: { label: { position: 'right', verticalAlign: 'middle', align: 'left' } },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };
}

export default function Relations() {
  const { branch } = useBranch();
  const [filter, setFilter] = useState('所有关系');
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ person1: '', person2: '', type: '' });
  const [searchName, setSearchName] = useState('');

  // 只显示当前分支的关系
  const relations = allRelations.filter(r => r.branch === branch);

  // 联动筛选逻辑
  const filtered = relations.filter(r => {
    if (filter === '婚姻关系' && r.type !== '配偶') return false;
    if (filter === '血缘关系' && r.type === '配偶') return false;
    if (searchName && !(
      r.person1.includes(searchName) || r.person2.includes(searchName)
    )) return false;
    return true;
  });

  const handleAdd = e => {
    e.preventDefault();
    // 新增关系默认属于当前分支
    allRelations.push({ id: Date.now(), ...addForm, branch });
    setShowAdd(false);
    setAddForm({ person1: '', person2: '', type: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">关系管理</h1>
      {/* 关系筛选和添加 */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-4 items-center">
        <select
          className="form-select border rounded p-2 w-full md:w-60"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          {relationTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        <input
          type="text"
          className="form-input border rounded p-2 w-full md:w-60"
          placeholder="搜索姓名"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <div className="flex-1" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setShowAdd(true)}>添加关系</button>
      </div>
      {/* 家族树图表 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="font-semibold mb-2">家族树</div>
        <ReactECharts option={getTreeOption()} style={{ height: 300 }} />
      </div>
      {/* 关系表格 */}
      <div className="bg-white p-4 rounded shadow">
        <div className="font-semibold mb-2">成员关系</div>
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="py-1 px-2">姓名1</th>
              <th className="py-1 px-2">姓名2</th>
              <th className="py-1 px-2">关系</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-1 px-2">{r.person1}</td>
                <td className="py-1 px-2">{r.person2}</td>
                <td className="py-1 px-2">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 添加关系弹窗 */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowAdd(false)}>×</button>
            <h2 className="text-lg font-bold mb-4">添加关系</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" className="form-input border rounded p-2 w-full" placeholder="成员1姓名" value={addForm.person1} onChange={e => setAddForm(f => ({ ...f, person1: e.target.value }))} required />
              <input type="text" className="form-input border rounded p-2 w-full" placeholder="成员2姓名" value={addForm.person2} onChange={e => setAddForm(f => ({ ...f, person2: e.target.value }))} required />
              <select className="form-select border rounded p-2 w-full" value={addForm.type} onChange={e => setAddForm(f => ({ ...f, type: e.target.value }))} required>
                <option value="">选择关系类型</option>
                <option value="父子">父子</option>
                <option value="母子">母子</option>
                <option value="配偶">配偶</option>
                <option value="兄弟">兄弟</option>
                <option value="姐妹">姐妹</option>
              </select>
              <div className="flex gap-4 mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">添加</button>
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => setShowAdd(false)}>取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 