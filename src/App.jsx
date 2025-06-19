import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FiHome, FiUsers, FiGitMerge, FiCalendar, FiSearch } from 'react-icons/fi'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <Router>
      <div className="container-fluid min-h-screen">
        <div className="row">
          {/* 侧边栏导航 */}
          <div className="col-md-2 bg-gray-100 p-0">
            <div className="p-4">
              <h4 className="text-center">家族谱系管理系统</h4>
              <hr className="my-3" />
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className={`flex items-center p-2 rounded ${activeTab === 'home' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('home')}
                  >
                    <FiHome className="mr-2" /> 首页
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/members" 
                    className={`flex items-center p-2 rounded ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('members')}
                  >
                    <FiUsers className="mr-2" /> 成员管理
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/relationships" 
                    className={`flex items-center p-2 rounded ${activeTab === 'relationships' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('relationships')}
                  >
                    <FiGitMerge className="mr-2" /> 关系管理
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/events" 
                    className={`flex items-center p-2 rounded ${activeTab === 'events' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('events')}
                  >
                    <FiCalendar className="mr-2" /> 事件管理
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/queries" 
                    className={`flex items-center p-2 rounded ${activeTab === 'queries' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => setActiveTab('queries')}
                  >
                    <FiSearch className="mr-2" /> 查询统计
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="col-md-10 p-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<MemberManagement />} />
              <Route path="/relationships" element={<RelationshipManagement />} />
              <Route path="/events" element={<EventManagement />} />
              <Route path="/queries" element={<QueryStatistics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">家族谱系管理系统</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">最近成员</h2>
          {/* 最近成员列表 */}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-3">最近事件</h2>
          {/* 最近事件列表 */}
        </div>
      </div>
    </div>
  )
}

function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', gender: '男', birthDate: '' });

  useEffect(() => {
<<<<<<< HEAD
    fetch('http://localhost:5000/api/members')
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error fetching members:', error));
=======
    // 这里应该从API获取成员数据
    const mockMembers = [
      { id: 1, name: '张三', gender: '男', birthDate: '1990-01-01' },
      { id: 2, name: '李四', gender: '女', birthDate: '1992-05-15' }
    ];
    setMembers(mockMembers);
>>>>>>> e973db8ebf906852c018a216fed4e5e815a5615a
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newMember.name,
        gender: newMember.gender,
        birth_date: newMember.birthDate
      })
    })
    .then(response => response.json())
    .then(data => {
      setMembers([...members, data]);
      setNewMember({ name: '', gender: '男', birthDate: '' });
    })
    .catch(error => console.error('Error adding member:', error));
=======
    // 这里应该调用API添加新成员
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([...members, { ...newMember, id: newId }]);
    setNewMember({ name: '', gender: '男', birthDate: '' });
>>>>>>> e973db8ebf906852c018a216fed4e5e815a5615a
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">成员列表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出生日期</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">添加成员</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              name="name"
              value={newMember.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
            <select
              name="gender"
              value={newMember.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">出生日期</label>
            <input
              type="date"
              name="birthDate"
              value={newMember.birthDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            添加成员
          </button>
        </form>
      </div>
    </div>
  );
}

function RelationshipManagement() {
  const [relations, setRelations] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // 这里应该从API获取关系数据
    const mockRelations = [
      { id: 1, member1: '张三', member2: '李四', relationType: '配偶' },
      { id: 2, member1: '张三', member2: '王五', relationType: '子女' }
    ];
    setRelations(mockRelations);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">关系图</h2>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">选择成员</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="">-- 选择成员 --</option>
              <option value="张三">张三</option>
              <option value="李四">李四</option>
              <option value="王五">王五</option>
            </select>
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">关系类型</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">所有关系</option>
              <option value="血缘关系">血缘关系</option>
              <option value="婚姻关系">婚姻关系</option>
            </select>
          </div>
        </div>
        <div className="border rounded-md p-4 bg-gray-50 min-h-64">
          {selectedMember ? (
            <div>
              <h3 className="text-lg font-medium mb-2">{selectedMember}的关系网络</h3>
              <ul className="space-y-2">
                {relations
                  .filter(r => r.member1 === selectedMember || r.member2 === selectedMember)
                  .map(r => (
                    <li key={r.id} className="border-b pb-2">
                      {r.member1 === selectedMember 
                        ? `${selectedMember} 是 ${r.member2} 的 ${r.relationType}`
                        : `${selectedMember} 是 ${r.member1} 的 ${r.relationType}`}
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">请选择一位成员查看其关系网络</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    relatedMembers: [],
    relatedFamilies: []
  });

  useEffect(() => {
    // 这里应该从API获取事件数据
    const mockEvents = [
      { id: 1, title: '家族祠堂落成', date: '2020-10-01', description: '家族祠堂正式落成典礼', relatedMembers: ['张三', '李四'], relatedFamilies: ['张氏家族'] },
      { id: 2, title: '家族年会', date: '2021-02-15', description: '年度家族聚会', relatedMembers: ['王五', '赵六'], relatedFamilies: ['王氏家族'] }
    ];
    setEvents(mockEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里应该调用API添加新事件
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setNewEvent({ title: '', date: '', description: '', relatedMembers: [], relatedFamilies: [] });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">事件列表</h2>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/3">
            <input 
              type="text" 
              placeholder="输入事件名称" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-1/3">
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="开始日期"
            />
          </div>
          <div className="w-1/3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
              搜索事件
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事件标题</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">事件日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联成员</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map(event => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.relatedMembers.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">
                      查看
                    </button>
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                      编辑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">新增事件</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">事件标题</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">事件日期</label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">事件描述</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            保存事件
          </button>
        </form>
      </div>
    </div>
  );
}

function QueryStatistics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [relationQuery, setRelationQuery] = useState({ member1: '', member2: '' });
  const [relationResults, setRelationResults] = useState([]);
  const [stats, setStats] = useState({ memberCount: 0, eventCount: 0, relationCount: 0 });

  useEffect(() => {
    // 这里应该从API获取统计数据
    setStats({
      memberCount: 50,
      eventCount: 10,
      relationCount: 30
    });
  }, []);

  const handleMemberSearch = (e) => {
    e.preventDefault();
    // 这里应该调用API进行成员搜索
    setSearchResults([
      { id: 1, name: '张三', gender: '男', birthDate: '1990-01-01' },
      { id: 2, name: '李四', gender: '女', birthDate: '1992-05-15' }
    ]);
  };

  const handleRelationSearch = (e) => {
    e.preventDefault();
    // 这里应该调用API进行关系搜索
    setRelationResults([
      { id: 1, member1: '张三', member2: '李四', relationType: '配偶' },
      { id: 2, member1: '张三', member2: '王五', relationType: '子女' }
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">成员查询</h2>
        <form onSubmit={handleMemberSearch} className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="输入成员姓名搜索..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              搜索
            </button>
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出生日期</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map(member => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{member.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">关系查询</h2>
        <form onSubmit={handleRelationSearch} className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">成员1</label>
              <input
                type="text"
                value={relationQuery.member1}
                onChange={(e) => setRelationQuery({...relationQuery, member1: e.target.value})}
                placeholder="输入成员1姓名"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">成员2</label>
              <input
                type="text"
                value={relationQuery.member2}
                onChange={(e) => setRelationQuery({...relationQuery, member2: e.target.value})}
                placeholder="输入成员2姓名"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            查询关系
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">成员1</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">成员2</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关系类型</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relationResults.map(relation => (
                <tr key={relation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{relation.member1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{relation.member2}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{relation.relationType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">统计分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">成员总数</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.memberCount}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">事件总数</h3>
            <p className="text-3xl font-bold text-green-600">{stats.eventCount}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800">关系总数</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.relationCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App