# -*- coding:utf-8 -*-
from django.utils.timezone import localtime

def date_time(value):
    return localtime(value).strftime('%Y-%m-%d %H:%M:%S')
