# 族谱前端设计代码
import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)

# 配置
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///family_tree.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化扩展
db = SQLAlchemy(app)
CORS(app)  # 启用CORS支持

# 数据模型
class Individual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    death_date = db.Column(db.Date)
    birth_place = db.Column(db.String(200))
    current_residence = db.Column(db.String(200))
    biography = db.Column(db.Text)
    photo_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Relationship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    individual1_id = db.Column(db.Integer, db.ForeignKey('individual.id'), nullable=False)
    individual2_id = db.Column(db.Integer, db.ForeignKey('individual.id'), nullable=False)
    relationship_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    event_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Family(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# 成员管理路由
@app.route('/api/individuals', methods=['GET'])
def get_individuals():
    individuals = Individual.query.all()
    return jsonify([{
        'id': i.id,
        'name': i.name,
        'gender': i.gender,
        'birth_date': i.birth_date.isoformat(),
        'death_date': i.death_date.isoformat() if i.death_date else None,
        'birth_place': i.birth_place,
        'current_residence': i.current_residence,
        'biography': i.biography,
        'photo_url': i.photo_url
    } for i in individuals])

@app.route('/api/individuals', methods=['POST'])
def create_individual():
    data = request.get_json()
    
    individual = Individual(
        name=data['name'],
        gender=data['gender'],
        birth_date=datetime.strptime(data['birth_date'], '%Y-%m-%d').date(),
        death_date=datetime.strptime(data['death_date'], '%Y-%m-%d').date() if data.get('death_date') else None,
        birth_place=data.get('birth_place'),
        current_residence=data.get('current_residence'),
        biography=data.get('biography'),
        photo_url=data.get('photo_url')
    )
    
    db.session.add(individual)
    db.session.commit()
    
    return jsonify({'message': '创建成功', 'id': individual.id}), 201

@app.route('/api/individuals/<int:id>', methods=['PUT'])
def update_individual(id):
    individual = Individual.query.get_or_404(id)
    data = request.get_json()
    
    individual.name = data.get('name', individual.name)
    individual.gender = data.get('gender', individual.gender)
    if 'birth_date' in data:
        individual.birth_date = datetime.strptime(data['birth_date'], '%Y-%m-%d').date()
    if 'death_date' in data:
        individual.death_date = datetime.strptime(data['death_date'], '%Y-%m-%d').date() if data['death_date'] else None
    individual.birth_place = data.get('birth_place', individual.birth_place)
    individual.current_residence = data.get('current_residence', individual.current_residence)
    individual.biography = data.get('biography', individual.biography)
    individual.photo_url = data.get('photo_url', individual.photo_url)
    
    db.session.commit()
    return jsonify({'message': '更新成功'})

@app.route('/api/individuals/<int:id>', methods=['DELETE'])
def delete_individual(id):
    individual = Individual.query.get_or_404(id)
    db.session.delete(individual)
    db.session.commit()
    return jsonify({'message': '删除成功'})

# 关系管理路由
@app.route('/api/relationships', methods=['POST'])
def create_relationship():
    data = request.get_json()
    
    relationship = Relationship(
        individual1_id=data['individual1_id'],
        individual2_id=data['individual2_id'],
        relationship_type=data['relationship_type']
    )
    
    db.session.add(relationship)
    db.session.commit()
    
    return jsonify({'message': '关系创建成功', 'id': relationship.id}), 201

@app.route('/api/relationships/<int:id>', methods=['DELETE'])
def delete_relationship(id):
    relationship = Relationship.query.get_or_404(id)
    db.session.delete(relationship)
    db.session.commit()
    return jsonify({'message': '关系删除成功'})

@app.route('/api/relationships/search', methods=['GET'])
def search_relationships():
    name = request.args.get('name', '').strip()
    if not name:
        return jsonify({'error': '请输入搜索姓名'}), 400
    
    # 查找包含该姓名的所有关系
    relationships = db.session.query(
        Relationship,
        Individual.name.label('person1_name'),
        db.session.query(Individual.name).filter(Individual.id == Relationship.individual2_id).label('person2_name')
    ).join(
        Individual,
        Individual.id == Relationship.individual1_id
    ).filter(
        Individual.name.like(f'%{name}%')
    ).all()
    
    # 查找该姓名作为第二个人的关系
    relationships2 = db.session.query(
        Relationship,
        db.session.query(Individual.name).filter(Individual.id == Relationship.individual1_id).label('person1_name'),
        Individual.name.label('person2_name')
    ).join(
        Individual,
        Individual.id == Relationship.individual2_id
    ).filter(
        Individual.name.like(f'%{name}%')
    ).all()
    
    # 合并结果
    results = []
    for r in relationships:
        results.append({
            'person1_name': r.person1_name,
            'person2_name': r.person2_name,
            'relationship_type': r.Relationship.relationship_type
        })
    
    for r in relationships2:
        results.append({
            'person1_name': r.person1_name,
            'person2_name': r.person2_name,
            'relationship_type': r.Relationship.relationship_type
        })
    
    return jsonify(results)

# 事件管理路由
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': e.id,
        'title': e.title,
        'description': e.description,
        'event_date': e.event_date.isoformat()
    } for e in events])

@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.get_json()
    
    event = Event(
        title=data['title'],
        description=data.get('description'),
        event_date=datetime.strptime(data['event_date'], '%Y-%m-%d').date()
    )
    
    db.session.add(event)
    db.session.commit()
    
    return jsonify({'message': '事件创建成功', 'id': event.id}), 201

# 事件搜索路由
@app.route('/api/events/search', methods=['GET'])
def search_events():
    name = request.args.get('name', '').strip()
    start_date = request.args.get('start_date', '').strip()
    end_date = request.args.get('end_date', '').strip()
    
    query = Event.query
    
    if name:
        query = query.filter(Event.title.like(f'%{name}%'))
    
    if start_date:
        query = query.filter(Event.event_date >= datetime.strptime(start_date, '%Y-%m-%d').date())
    
    if end_date:
        query = query.filter(Event.event_date <= datetime.strptime(end_date, '%Y-%m-%d').date())
    
    events = query.all()
    
    results = []
    for event in events:
        event_data = {
            'id': event.id,
            'name': event.title,
            'date': event.event_date.strftime('%Y-%m-%d'),
            'description': event.description
        }
        results.append(event_data)
    
    return jsonify(results)

# 文件上传路由
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': '没有文件'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': '没有选择文件'}), 400
    
    if file:
        filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
        file.save(os.path.join('uploads', filename))
        return jsonify({'url': f'/uploads/{filename}'}), 201

# 成员搜索路由
@app.route('/api/individuals/search', methods=['GET'])
def search_individuals():
    name = request.args.get('name', '').strip()
    if not name:
        return jsonify([])
    
    # 使用LIKE进行模糊搜索
    individuals = Individual.query.filter(Individual.name.like(f'%{name}%')).all()
    
    results = []
    for individual in individuals:
        results.append({
            'id': individual.id,
            'name': individual.name,
            'gender': individual.gender
        })
    
    return jsonify(results)

# 家族搜索路由
@app.route('/api/families/search', methods=['GET'])
def search_families():
    name = request.args.get('name', '').strip()
    if not name:
        return jsonify([])
    
    # 使用LIKE进行模糊搜索
    families = Family.query.filter(Family.name.like(f'%{name}%')).all()
    
    results = []
    for family in families:
        results.append({
            'id': family.id,
            'name': family.name
        })
    
    return jsonify(results)

# 初始化数据库
def init_db():
    with app.app_context():
        db.create_all()
        # 创建上传目录
        os.makedirs('uploads', exist_ok=True)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)