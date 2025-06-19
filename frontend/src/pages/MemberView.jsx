import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 假数据，后续用 fetch 获取
const mockMembers = [
  { id: 1, name: '张三', gender: '男', birth_date: '1980-05-10', death_date: '', birthplace: '北京', residence: '上海', bio: '张三简介', photo: 'https://via.placeholder.com/120' },
  { id: 2, name: '李四', gender: '女', birth_date: '1985-08-20', death_date: '', birthplace: '上海', residence: '北京', bio: '李四简介', photo: 'https://via.placeholder.com/120' },
  { id: 3, name: '王五', gender: '男', birth_date: '1990-01-15', death_date: '', birthplace: '广州', residence: '深圳', bio: '王五简介', photo: 'https://via.placeholder.com/120' },
];

export default function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = mockMembers.find(m => m.id === Number(id));

  if (!member) return <div>未找到该成员</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>&larr; 返回</button>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={member.photo} alt={member.name} className="w-32 h-32 object-cover rounded shadow" />
        <div className="flex-1 space-y-2">
          <div><span className="font-semibold">姓名：</span>{member.name}</div>
          <div><span className="font-semibold">性别：</span>{member.gender}</div>
          <div><span className="font-semibold">出生日期：</span>{member.birth_date}</div>
          <div><span className="font-semibold">死亡日期：</span>{member.death_date || '—'}</div>
          <div><span className="font-semibold">出生地：</span>{member.birthplace}</div>
          <div><span className="font-semibold">居住地：</span>{member.residence}</div>
        </div>
      </div>
      <div className="mt-6">
        <div className="font-semibold mb-1">个人介绍：</div>
        <div className="bg-gray-50 p-3 rounded min-h-[60px]">{member.bio || '无'}</div>
      </div>
    </div>
  );
} 