from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# 配置数据库路径
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'family_tree.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化数据库和CORS
db = SQLAlchemy(app)
CORS(app)

# 成员模型
class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    birth_date = db.Column(db.String(20))
    death_date = db.Column(db.String(20))
    photo_url = db.Column(db.String(255))
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'gender': self.gender,
            'birth_date': self.birth_date,
            'death_date': self.death_date,
            'photo_url': self.photo_url,
            'description': self.description
        }

# 创建数据库表
with app.app_context():
    db.create_all()

# API路由
@app.route('/api/members', methods=['GET'])
def get_members():
    members = Member.query.all()
    return jsonify([member.to_dict() for member in members])

@app.route('/api/members', methods=['POST'])
def add_member():
    data = request.get_json()
    new_member = Member(
        name=data['name'],
        gender=data['gender'],
        birth_date=data.get('birth_date'),
        death_date=data.get('death_date'),
        photo_url=data.get('photo_url'),
        description=data.get('description')
    )
    db.session.add(new_member)
    db.session.commit()
    return jsonify(new_member.to_dict()), 201

@app.route('/api/members/<int:id>', methods=['PUT'])
def update_member(id):
    member = Member.query.get_or_404(id)
    data = request.get_json()
    member.name = data.get('name', member.name)
    member.gender = data.get('gender', member.gender)
    member.birth_date = data.get('birth_date', member.birth_date)
    member.death_date = data.get('death_date', member.death_date)
    member.photo_url = data.get('photo_url', member.photo_url)
    member.description = data.get('description', member.description)
    db.session.commit()
    return jsonify(member.to_dict())

@app.route('/api/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    member = Member.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    return jsonify({'message': 'Member deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)