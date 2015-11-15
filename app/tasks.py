# -*- coding:utf-8 -*-
from django.utils import timezone

__author__ = 'AE'
import os
from celery import shared_task

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "IOTplatform.settings")
from app.models import LaboratoryState,EquipStateLast


