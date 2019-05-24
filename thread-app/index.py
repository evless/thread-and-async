from socketserver import ThreadingMixIn
from http.server import BaseHTTPRequestHandler, HTTPServer
import random
import json
import time

def generateRandomOgrn():
    arr = []
    result = ''

    for _ in range(12):
        arr.append(random.randrange(10))
    
    arr[0] = random.randrange(2)

    if arr[0] == 0:
        arr[0] = 5
    
    arr[1] = random.randrange(2)
    arr[2] = random.randrange(9)
    arr[3] = random.randrange(9)
    arr[4] = random.randrange(10)

    for i in range(7):
        arr[i + 5] = random.randrange(10)
    
    for i in range(len(arr)):
        result += str(arr[i])

    summ = int(result)
    control = ((summ % 11) % 10)

    if control == 10:
        control = 0
    
    result += str(control)

    time.sleep(random.randrange(2))

    return result


class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
    pass


class Handler(BaseHTTPRequestHandler):
    counter = 0

    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        
        Handler.counter += 1
        userNumber = Handler.counter
        print(f'Start with user: #{userNumber}')

        result = []
        for _ in range(20):
            result.append(generateRandomOgrn())

        self.wfile.write(bytes(json.dumps({'result': result}), 'utf-8'))
        print(f'Finished with user: #{userNumber}')

def run():
    server_address = ('', 8080)
    httpd = ThreadingSimpleServer(server_address, Handler)
    httpd.serve_forever()

run()
