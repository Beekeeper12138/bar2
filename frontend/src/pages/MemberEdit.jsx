import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockMembers = [
  { id: 1, name: '张三', gender: '男', birth_date: '1980-05-10', death_date: '', birthplace: '北京', residence: '上海', bio: '张三简介', photo: 'https://via.placeholder.com/120' },
  { id: 2, name: '李四', gender: '女', birth_date: '1985-08-20', death_date: '', birthplace: '上海', residence: '北京', bio: '李四简介', photo: 'https://via.placeholder.com/120' },
  { id: 3, name: '王五', gender: '男', birth_date: '1990-01-15', death_date: '', birthplace: '广州', residence: '深圳', bio: '王五简介', photo: 'https://via.placeholder.com/120' },
];

export default function MemberEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = mockMembers.find(m => m.id === Number(id));
  const [form, setForm] = useState(member || {});

  if (!member) return <div>未找到该成员</div>;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: fetch('/api/individuals/'+id, { method: 'PUT', body: ... })
    alert('修改已保存（仅前端模拟）');
    navigate('/members');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>&larr; 返回</button>
      <h2 className="text-xl font-bold mb-4">编辑成员</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src={form.photo} alt={form.name} className="w-32 h-32 object-cover rounded shadow" />
          <input
            type="text"
            name="photo"
            className="form-input border rounded p-2 flex-1"
            placeholder="照片网址"
            value={form.photo || ''}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" className="form-input border rounded p-2" placeholder="姓名" value={form.name || ''} onChange={handleChange} required />
          <select name="gender" className="form-select border rounded p-2" value={form.gender || ''} onChange={handleChange} required>
            <option value="">性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          <input type="date" name="birth_date" className="form-input border rounded p-2" placeholder="出生日期" value={form.birth_date || ''} onChange={handleChange} required />
          <input type="date" name="death_date" className="form-input border rounded p-2" placeholder="死亡日期" value={form.death_date || ''} onChange={handleChange} />
          <input type="text" name="birthplace" className="form-input border rounded p-2" placeholder="出生地" value={form.birthplace || ''} onChange={handleChange} />
          <input type="text" name="residence" className="form-input border rounded p-2" placeholder="居住地" value={form.residence || ''} onChange={handleChange} />
        </div>
        <textarea name="bio" className="form-textarea border rounded p-2 w-full" placeholder="个人介绍" value={form.bio || ''} onChange={handleChange} rows={3} />
        <div className="flex gap-4 mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">保存</button>
          <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => navigate(-1)}>取消</button>
        </div>
      </form>
    </div>
  );
} 