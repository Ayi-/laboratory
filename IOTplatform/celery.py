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
from app.models import LaboratoryState, EquipStateLast


app = Celery('IOTplatform')

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

@app.task(bind=True)
def update_laboratory_state(self,lab_number):
    lab_state_number = LaboratoryState.objects.only('number').last().number
    eq_state_2 = EquipStateLast.objects.get(id=2).data.split('|')  # 获取设备号2的最近数据数据
    LaboratoryState.objects.create(
        number=lab_state_number+lab_number,
        temperature=eq_state_2[0].split(':')[1],
        humidity=eq_state_2[1].split(':')[1],
        lx=eq_state_2[2].split(':')[1]
    )
    return True