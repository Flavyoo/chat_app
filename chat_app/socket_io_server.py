import socketio
import eventlet

sio = socketio.Server()

def myhandle(client_sock, client_addr):
    print("client connected from {0} on {1}".format(client_addr, client_sock))

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('chat message')
def message(sid, data):
    print('message ', data)

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


if __name__ == '__main__':
    # wrap Flask application with socketio's middleware
    app = socketio.Middleware(sio, myhandle)
    # deploy as an eventlet WSGI server
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 65432)), app)
