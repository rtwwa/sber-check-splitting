import redis

def PingDb(host: str, port: int, password: str):
    try:
        ## Подключаемся к Redis
        conn = redis.StrictRedis(
            host=host,
            port=port,
            password=password
        )
        print(conn)
        conn.ping()
    except Exception as ex:
        print('Error:', ex)
        exit('Failed to connect, terminating.')