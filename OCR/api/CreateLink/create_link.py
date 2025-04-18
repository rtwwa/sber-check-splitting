import string
from random import randint

alp = string.ascii_lowercase + string.ascii_uppercase + "0123456789"

def generate_hash(n: int) -> str:
    hash: str = ""
    
    for i in range(n):
        hash += alp[randint(0, len(alp) - 1)]    
    
    return hash

def create_link() -> list[str]:
    hash = generate_hash(10)
    url = f"http://localhost:8090/small-router/{hash}"
    
    return [url, hash]