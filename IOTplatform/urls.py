# -*- coding:utf-8 -*-
"""IOTplatform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""

from django.conf.urls import include, url, patterns
from django.contrib import admin, auth
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns
from app.models import EquipStateLast
from app.views import OrderListJson, UserViewSet, GroupViewSet, AppUserViewSet, EquipmentViewSet, PermissionViewSet, \
    Index, \
    profile, equip, EquipmentTempleteView, AddEquip, PositionViewSet, EquipStateLastViewSet, Status
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'groups', GroupViewSet)
router.register(r'appuser', AppUserViewSet, base_name='appuser')
router.register(r'equipment', EquipmentViewSet)
router.register(r'permission', PermissionViewSet)
router.register(r'position', PositionViewSet)
router.register(r'equipmenttemp', EquipmentTempleteView, base_name='equipmenttemp')
router.register(r'equipstatelast',EquipStateLastViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

]

urlpatterns += patterns('app.views',
                        url(r'^$', Status.as_view(), name='status'),
                        url(r'^index/$', login_required(Index.as_view()), name='index'),  # 主页
                        url(r'^login/$', 'loginApp', name='login'),  # 登陆
                        url(r'^login4/$', 'login4App', name='login4'),  # APP登陆
                        url(r'^logout/$', 'logoutApp', name='logout'),  # 注销
                        url(r'^app_data/$', 'app_data', name='app_data'),  # 获取数据
                        # 获取设备数据
                        url(r'^equipment/list/(?P<type>[\w]*)$', login_required(equip.as_view()), name='equip'),

                        url(r'^equipment/add/equip$', login_required(AddEquip.as_view()), name='addequip'),
                        url(r'^getGPS/$', 'getGPS', name='getGPS'),  # 获取GPS
                        url(r'^profile/$', login_required(profile.as_view()), name='profile'),  # 个人首页

                        # 获取datetables数据
                        url(r'^ajax_dict/$', csrf_exempt(login_required(OrderListJson.as_view())), name='ajax-dict'),
                        #url(r'^ajax_tem/$', 'ajax_tem', name='ajax_tem'),  # 获取模版
                        url(r'^sendcmd/$', 'sendcmd', name='sendcmd'),  # 发送命令

                        # RESTFUL
                        url(r'^api/', include(router.urls)),
                        url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
                        )
