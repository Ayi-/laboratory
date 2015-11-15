# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:celery
# Author: Eli
# Create Date:2015-11-12
# Modify Author:
# Modify Date:
# Function: 任务程序，用来自动更新信息
# ****************************************************************#
from __future__ import absolute_import

__author__ = 'AE'

import os
from celery import Celery
from django.conf import settings


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "IOTplatform.settings")


app = Celery('IOTplatform')

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))