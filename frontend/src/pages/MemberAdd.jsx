import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberForm from './MemberForm';

export default function MemberAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    photo: '', name: '', gender: '', birth_date: '', death_date: '', birthplace: '', residence: '', bio: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: fetch('/api/individuals', { method: 'POST', body: ... })
    alert('成员已添加（仅前端模拟）');
    navigate('/members');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>&larr; 返回</button>
      <h2 className="text-xl font-bold mb-4">添加成员</h2>
      <MemberForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText="添加"
        cancelText="取消"
        onCancel={() => navigate(-1)}
      />
    </div>
  );
} 