import socket
import sys

PORT = 65432
HOST = "127.0.0.1"
# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((HOST, PORT))
sock.listen(100)
while True:
    print "waiting for a connection"
    connection, client_address = sock.accept()
    try:
        print "connection from ", client_address
        while True:
            data = connection.recv(16)
            print "received %s" % data
            if data:
                print "sending data back to the client"
                connection.sendall(data)
            else:
                print "no more data from", client_address
                break
    finally:
        connection.close()
