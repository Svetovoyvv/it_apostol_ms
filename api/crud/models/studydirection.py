from . import Base, q

class StudyDirectionModel(Base):
    __tablename__ = 'studydirections'
    id = q.Column(q.Integer, primary_key=True)
    name = q.Column(q.String(32), unique=True)
    description = q.Column(q.Text)
    peoples = q.orm.relationship('PeopleModel', back_populates='study')

