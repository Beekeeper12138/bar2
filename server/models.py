from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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

class Relationship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    member1_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    member2_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    relation_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'member1_id': self.member1_id,
            'member2_id': self.member2_id,
            'relation_type': self.relation_type
        }