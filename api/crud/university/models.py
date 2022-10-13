from pydantic import BaseModel, Field
from .. import StudyDirectionPublic
class UniversityPublic(BaseModel):
    display_name: str = Field(..., title='Короткое название университета')
    description: str = Field(..., title='Полное название университета')
    link: str = Field(..., title='Ссылка на сайт университета')
    class Config:
        orm_mode = True
class UniversityInfo(UniversityPublic):
    id: int = Field(..., title='Идентификатор университета')
    study_directions: list[StudyDirectionPublic] = Field(..., title='Список направлений')
    class Config:
        orm_mode = True
