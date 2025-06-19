import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockEvents = [
  { id: 1, title: '家族聚会', event_date: '2024-06-01', description: '全家族成员在祖宅聚会。', people: '张三,李四,王五' },
  { id: 2, title: '新成员加入', event_date: '2024-05-15', description: '欢迎新成员王小明加入家族。', people: '王小明,李四' },
  { id: 3, title: '家族迁徙', event_date: '2023-12-10', description: '部分家族成员迁居新城市。', people: '张三,王五' },
];

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === Number(id));

  if (!event) return <div>未找到该事件</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>&larr; 返回</button>
      <h2 className="text-xl font-bold mb-4">{event.title}</h2>
      <div className="mb-2"><span className="font-semibold">时间：</span>{event.event_date}</div>
      <div className="mb-2"><span className="font-semibold">涉及人员：</span>{event.people}</div>
      <div className="mb-2"><span className="font-semibold">描述：</span>{event.description}</div>
    </div>
  );
} 