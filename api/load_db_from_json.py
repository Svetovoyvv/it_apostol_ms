import json
data = json.load(open('dump.json'))
def delete_sub_dict(d: dict):
    r = {}
    for k, v in d.items():
        if not isinstance(v, dict):
            r[k] = v
    return r
universities = data['universities']
study_directions = data['study_directions']
peoples = data['peoples']

from depends import get_db
from crud.models import *
Base.metadata.create_all()
session_maker = get_db()

session = next(session_maker)

for university in universities:
    university = UniversityModel(**delete_sub_dict(university))
    session.add(university)
for study_direction in study_directions:
    study_direction = StudyDirectionModel(**delete_sub_dict(study_direction))
    session.add(study_direction)
for people in peoples:
    people = PeopleModel(**delete_sub_dict(people))
    session.add(people)
session.commit()
