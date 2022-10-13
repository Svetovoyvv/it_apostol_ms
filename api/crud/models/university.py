from . import Base, q

class UniversityModel(Base):
    __tablename__ = 'universities'
    id = q.Column(q.Integer, primary_key=True)
    name = q.Column(q.String(128), unique=True)
    display_name = q.Column(q.Text)
    description = q.Column(q.Text)
    link = q.Column(q.String(256))
    peoples = q.orm.relationship('PeopleModel', back_populates='university')


