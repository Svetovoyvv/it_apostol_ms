from pydantic import BaseModel, Field

class StudyDirectionPublic(BaseModel):
    name: str = Field(..., title='Код направления')
    description: str = Field(..., title='Описание направления')
    class Config:
        orm_mode = True
