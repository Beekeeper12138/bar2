import React from 'react';

export default function MemberForm({ form, onChange, onSubmit, submitText = '保存', cancelText = '取消', onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={form.photo || 'https://via.placeholder.com/120'} alt={form.name} className="w-32 h-32 object-cover rounded shadow" />
        <input
          type="text"
          name="photo"
          className="form-input border rounded p-2 flex-1"
          placeholder="照片网址"
          value={form.photo}
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" className="form-input border rounded p-2" placeholder="姓名" value={form.name} onChange={onChange} required />
        <select name="gender" className="form-select border rounded p-2" value={form.gender} onChange={onChange} required>
          <option value="">性别</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <input type="date" name="birth_date" className="form-input border rounded p-2" placeholder="出生日期" value={form.birth_date} onChange={onChange} required />
        <input type="date" name="death_date" className="form-input border rounded p-2" placeholder="死亡日期" value={form.death_date} onChange={onChange} />
        <input type="text" name="birthplace" className="form-input border rounded p-2" placeholder="出生地" value={form.birthplace} onChange={onChange} />
        <input type="text" name="residence" className="form-input border rounded p-2" placeholder="居住地" value={form.residence} onChange={onChange} />
      </div>
      <textarea name="bio" className="form-textarea border rounded p-2 w-full" placeholder="个人介绍" value={form.bio} onChange={onChange} rows={3} />
      <div className="flex gap-4 mt-4">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{submitText}</button>
        <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 rounded" onClick={onCancel}>{cancelText}</button>
      </div>
    </form>
  );
} 