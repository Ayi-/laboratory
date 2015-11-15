# -*- coding:utf-8 -*-
from django.utils import timezone

__author__ = 'AE'

from celery import shared_task
from datetime import datetime
from app.models import LaboratoryState,EquipStateLast

@shared_task
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