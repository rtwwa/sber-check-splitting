from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    name: str
    numberServings: int
    price: float
    total: float
    
class SCache(BaseModel):
    numberClients: int
    total_account: int
    products: List[Product]
