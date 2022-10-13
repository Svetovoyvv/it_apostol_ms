from . import Base, q
from sqlalchemy.orm import relationship
class PeopleModel(Base):
    __tablename__ = 'peoples'
    id = q.Column(q.Integer, primary_key=True)
    ins_number = q.Column(q.String(14), nullable=True)
    reg_number = q.Column(q.Integer, nullable=True)
    name = q.Column(q.String(128), nullable=True)
    university_id = q.Column(q.Integer, q.ForeignKey('universities.id'), nullable=True)
    university = relationship('UniversityModel', back_populates='peoples')
    study_id = q.Column(q.Integer, q.ForeignKey('studydirections.id'), nullable=True)
    study = relationship('StudyDirectionModel', back_populates='peoples')
    link = q.Column(q.String(256), nullable=True)
    add = q.Column(q.BigInteger, nullable=True)
    change = q.Column(q.BigInteger, nullable=True)
    agreed = q.Column(q.Boolean, default=False)



