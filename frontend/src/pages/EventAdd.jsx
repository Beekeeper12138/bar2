import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', event_date: '', people: '', description: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: fetch('/api/events', { method: 'POST', body: ... })
    alert('事件已添加（仅前端模拟）');
    navigate('/events');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>&larr; 返回</button>
      <h2 className="text-xl font-bold mb-4">添加事件</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" className="form-input border rounded p-2 w-full" placeholder="事件标题" value={form.title} onChange={handleChange} required />
        <input type="date" name="event_date" className="form-input border rounded p-2 w-full" placeholder="事件时间" value={form.event_date} onChange={handleChange} required />
        <input type="text" name="people" className="form-input border rounded p-2 w-full" placeholder="涉及人员（用逗号分隔）" value={form.people} onChange={handleChange} required />
        <textarea name="description" className="form-textarea border rounded p-2 w-full" placeholder="事件描述" value={form.description} onChange={handleChange} rows={4} required />
        <div className="flex gap-4 mt-4">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">添加</button>
          <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={() => navigate(-1)}>取消</button>
        </div>
      </form>
    </div>
  );
} 