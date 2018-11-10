import socket
import sys

DEV_ESTALEE = "165.227.127.167"
PORT = 65432
HOST = "127.0.0.1"

def get_constants(prefix):
    """Create a dictionary mapping socket module constants to their names."""
    return dict((getattr(socket, n), n)
                 for n in dir(socket)
                 if n.startswith(prefix)
                 )

families = get_constants('AF_')
types = get_constants('SOCK_')
protocols = get_constants('IPPROTO_')
# Create a TCP/IP socket
sock = socket.create_connection((HOST, PORT))
print >>sys.stderr, 'Family  :', families[sock.family]
print >>sys.stderr, 'Type    :', types[sock.type]
print >>sys.stderr, 'Protocol:', protocols[sock.proto]
print >>sys.stderr

try:
    message = "This is the message. It will be repeated."
    print "sending %s" % message
    sock.sendall(message)
    # Look for the response
    amount_received = 0
    amount_expected = len(message)
    recieved = ""
    while amount_received < amount_expected:
        data = sock.recv(16)
        amount_received += len(data)
        recieved += data
finally:
    print "Recieved: '%s'" % recieved
    sock.close()
