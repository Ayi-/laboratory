# -*- coding:utf-8 -*-
from gevent.server import StreamServer
import MySQLdb

BUFSIZE = 1024
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "IOTplatform.settings")
import sys
reload(sys)
sys.setdefaultencoding('utf8')

import django
django.setup() # 不添加这个会提示错误
from django.db import connection
# db=MySQLdb.connect(host="localhost",user="root", passwd="0000",db="fsleep")
# c=db.cursor()

from app.models import EquipStateAll,Equipment
from app.tasks import update_laboratory_state
def laboratory(socket, address):
    data = socket.recv(BUFSIZE).split(',')
    if int(data[-1])>4000 or data[0] !=1: #
        print data
        describe=Equipment.objects.get(id=data[0]).describe.split('|')
        eq_data=[]

        if data[0]== '1':
            update_laboratory_state.delay(int(data[1])+int(data[2]))
        else:
            update_laboratory_state.delay(0)
        for i in range(len(describe)):
            eq_data.append('{0}:{1:<6}'.format(describe[i],data[i+1]))
        EquipStateAll.objects.create(equip_id=data[0], data='|'.join(eq_data))
        connection.close()  # 关闭连接。不然如果延迟时间太长的话，MySQL会无法连接

server = StreamServer(('0.0.0.0', 8081), laboratory)
print "open server\n"
server.serve_forever()
