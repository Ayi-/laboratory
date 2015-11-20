# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:
# Author: Eli
# Create Date:2015-07-13 14:56:09
# Modify Author:
# Modify Date:
# Function: 视图函数
# ****************************************************************#
import json
from django.contrib import messages
from django.contrib.messages import get_messages

from django.views.generic import TemplateView, DetailView, FormView, UpdateView, CreateView
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User, Group, AnonymousUser
from django.core.urlresolvers import reverse_lazy  # 使用_lazy代替reverse,
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic.edit import BaseUpdateView

from django_datatables_view.base_datatable_view import BaseDatatableView
from django_datatables_view.mixins import LazyEncoder
from rest_framework.permissions import IsAuthenticated
from app.decorator import loginout_required

from app.permissions import IsAdminOrReadOnly, IsAdmin, adminPermission
from app.modelchoice import modelchoice
from app.forms import LoginForm, EquipmentForm, RegisterForm, UpdateEquip
from app.models import User as AppUser, Equipment, Permission, EquipStateLast, EquipStateAll, Position, LaboratoryState
from app.serializers import UserSerializer, GroupSerializer, AppUserSerializer, EquipSerializer, PermissionSerializer, \
    EquipTempSerializer, EquipStateLastSerializer, PositionSerializer

from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status

import logging
# 在程序中输出且在django中输出
logger = logging.getLogger(__name__)  # 这里用__name__通用,自动检测.


# logger.info('start server')


#
# @login_required
# def index(request):
#     """
#     主页
#     :param request:
#     :return:
#     """
#     #qe = EquipmentForConstructionMachine.objects.all()
#     #tf = (False, True)
#     #data = []
#     #for i in range(2):
#     #    for j in range(2):
#     #        data.append(qe.filter(rent_flag=tf[i], maintenance_flag=tf[j]).count())
#     return render_to_response('index.html', locals())




class Index(TemplateView):
    # queryset = None
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        if not adminPermission(self.request.user):
            qe = Equipment.objects.filter(user_id=self.request.user.id)
        else:
            qe = Equipment.objects.all()

        data = []
        for j in xrange(3):
            data.append(qe.filter(work_flag=j).count())
        context = super(Index, self).get_context_data(**kwargs)
        context['data'] = data
        return context


class Status(TemplateView):
    template_name = 'status.html'

    def get_context_data(self, **kwargs):
        qe = LaboratoryState.objects.last()

        context = super(Status, self).get_context_data(**kwargs)
        #context['data'] = qe.__dict__
        context['data'] = qe
        return context

@loginout_required
def loginApp(request):
    """
    登陆操作，成功后更新时间
    :param request:
    :return:
    """
    if request.method == 'POST':
        login_form = LoginForm(request.POST)

        if login_form.is_valid():
            user = authenticate(username=login_form.cleaned_data['username'],
                                password=login_form.cleaned_data['password'])

            if user and user.is_authenticated():
                user.set_last_time()  # 更新登录时间
                login(request, user)
                return redirect('/index')  # Redirect after POST
    else:
        login_form = LoginForm()
    return render(request, 'login.html', locals())


class Register(CreateView):
    template_name = 'register.html'
    form_class = RegisterForm
    success_url = reverse_lazy('login')

    # def dispatch(self, request, *args, **kwargs):
    #     if not AnonymousUser.__instancecheck__(request.user):
    #         return redirect('/index')
    #     return super(Register,self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()
        messages.success(self.request, u'注册成功！')
        return super(Register, self).form_valid(form)

@login_required
def logoutApp(request):
    """
    注销
    :param request:
    :return:
    """
    logout(request)
    return redirect('/login')


def sendcmd(request):
    """
    测试发送命令
    :param request:
    :return:
    """
    import socket

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(('112.74.17.206', 8081))
    sock.send('cmd')
    sock.close()
    return redirect('index')


# @login_required
# def equip(request):
#     """
#     返回设备详情界面
#     登陆后可访问
#     :param request:
#     :return:
#     """
#     name = request.GET.get('name', 'equip')
#
#     return render_to_response('equip.html', locals())

class AddEquip(CreateView):
    template_name = 'equipadd.html'
    form_class = EquipmentForm
    success_url = reverse_lazy('equip', kwargs={'type': 'equip'})
    # success_url = reverse_lazy('addequip')

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()
        form.instance.user = self.request.user
        form.save()
        messages.success(self.request, u'添加成功')

        return super(AddEquip, self).form_valid(form)


class equip(UpdateView):
    """
    返回设备详情界面
    登陆表可访问
    """
    model = Equipment
    template_name = 'equipment.html'
    form_class = UpdateEquip
    success_url = reverse_lazy('equip', kwargs={'type': 'equip'})

    # 设置request
    def get_form_kwargs(self):
        kwargs = super(equip, self).get_form_kwargs()
        kwargs['request'] = self.request
        return kwargs

    # 设置更新对象
    def get_object(self, queryset=None):
        return Equipment.objects.get(id=self.request.POST.get('pk'))
        #return self.request.user

    def get(self, request, *args, **kwargs):
        self.object = None
        data = kwargs.get('type','')
        self.request.session['type']=data
        form = self.get_form()
        if data == 'eqstatelast':
            order_columns = [f for f in EquipStateLast._meta.fields]
            columns = [{'data': column.attname} for column in order_columns]
            kwargs['order_columns'] = order_columns
            kwargs['columns'] = json.dumps(columns)
            self.template_name='equipstate.html'

        return self.render_to_response(self.get_context_data(form=form,**kwargs))

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()

        messages.success(self.request, u'更新成功')

        return super(equip, self).form_valid(form)


class profile(UpdateView):
    """
    个人主页
    """
    # queryset = AppUser.objects.all()
    model = AppUser
    fields = ['full_name']
    template_name = 'profile.html'
    success_url = reverse_lazy('profile')

    def get_object(self, queryset=None):
        return self.request.user

    def form_valid(self, form):
        messages.success(self.request, u'更新成功')
        return super(profile, self).form_valid(form)



@login_required
def getGPS(request):
    """
    获取gps信息
    :param request:
    :return:
    """
    if request.method == 'GET':
        latitude = float(request.GET.get('latitude', '0'))
        longitude = float(request.GET.get('longitude', '0'))
        id = int(request.GET.get('id', 0))
        raidus = float(request.GET.get('raidus')) * 1000
        if id > 0:
            qe = Equipment.objects.get(id=id)
            latitude = qe.position.gps_latitude
            longitude = qe.position.gps_longitude
        return HttpResponse(json.dumps({'state': 'OK',
                                        'raidus': raidus,
                                        'splat': latitude,
                                        'splon': longitude}),
                            content_type="application/json")

    return HttpResponse(json.dumps({'state': 'error'}),
                        content_type="application/json")


class OrderListJson(BaseDatatableView):
    """
    Datatables-django 设置
    用来获取表格数据
    """

    def prepare_results(self, qs):
        data = []

        for item in qs:
            data.append(item.get_dict())
        return data

    def get_initial_queryset(self):
        if not self.model:
            raise NotImplementedError("Need to provide a model or implement get_initial_queryset!")

        # 管理員权限
        if adminPermission(self.request.user):
            queryset = self.model.objects.all()
        else:
            if self.name != 'equip':
                queryset = self.model.objects.filter(equip__user=self.request.user.id)
            else:
                queryset = self.model.objects.filter(user_id=self.request.user.id)
        if self.model_id != None:
            queryset = queryset.filter(equip_id=self.model_id)
        return queryset

    def initialize(self, *args, **kwargs):
        # 获取设备model

        # 设置查询model
        self.name = self.request.session.get('model')

        # 设置状态查询model的id
        self.model_id = self.request.POST.get('model_id',None)

        name = self.request.POST.get('model',None)
        if name != None:
            self.name = name
        self.model = modelchoice.get(self.name)
        # 获取用户公司对应id
        # self.company_id = self.request.user.company.id
        # 获取model拥有字段名
        self.columns = [f.name for f in self.model._meta.fields]


##############################API#################################################

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows uers to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.DjangoModelPermissions,)


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (permissions.DjangoModelPermissions,)


class AppUserViewSet(viewsets.ModelViewSet):
    """
    这一个viewset提供了'list'和'detail'
    """
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    permission_classes = (  # permissions.IsAuthenticatedOrReadOnly,
                            IsAdmin,)

    def filter_queryset(self, queryset):
        if not adminPermission(self.request.user):
            queryset = queryset.filter(id=self.request.user.id)
        return super(AppUserViewSet, self).filter_queryset(queryset)


class PermissionViewSet(viewsets.ModelViewSet):
    """
    这一个viewset提供了'list','create','update'和'destroy'

    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = (  # permissions.IsAuthenticatedOrReadOnly,
                            IsAdmin,)
class PositionViewSet(viewsets.ModelViewSet):
    """
    这一个viewset提供了'list','create','update'和'destroy'

    """
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = (  # permissions.IsAuthenticatedOrReadOnly,
                            IsAdminOrReadOnly,)

class EquipmentTempleteView(viewsets.ViewSet):
    """
    获取设备字段信息以及模板
    """
    # serializer_class = EquipTempSerializer
    permission_classes = (  # permissions.IsAdminUsery,
                            IsAdminOrReadOnly,)

    # @list_route(methods=['get'])  # 修饰list
    def list(self, request):
        return Response(status.HTTP_404_NOT_FOUND)
        # serializer = EquipTempSerializer(self.request)
        # return Response(serializer.data)

    def create(self, request):
        pass

    # @detail_route(methods=['get'])  # 修饰detail
    def retrieve(self, request, pk=None):
        serializer = EquipTempSerializer(request, context={'pk': pk})
        # print request.session.get('model')
        # print self.request.session.get('model')
        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass


class EquipmentViewSet(viewsets.ModelViewSet):
    """
    这一个viewset提供了'list','create','update'和'destroy'
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipSerializer
    permission_classes = (  # permissions.IsAdminUsery,
                            IsAuthenticated,)

    def filter_queryset(self, queryset):
        if not adminPermission(self.request.user):
            queryset = queryset.filter(user_id=self.request.user.id)
        return super(EquipmentViewSet, self).filter_queryset(queryset)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        messages.success(request._request, u'删除成功')

        return Response(status=status.HTTP_204_NO_CONTENT)


class EquipStateLastViewSet(viewsets.ModelViewSet):
    """
    设备状态最新情况
    """
    queryset = EquipStateLast.objects.all()
    serializer_class = EquipStateLastSerializer
    permission_classes = (  # permissions.IsAdminUsery,
                            IsAdminOrReadOnly,)

    def filter_queryset(self, queryset):
        if not adminPermission(self.request.user):
            queryset = queryset.filter(equip__user_id=self.request.user.id)
        return super(EquipStateLastViewSet, self).filter_queryset(queryset)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        queryset = EquipStateAll.objects.filter(equip_id=instance.equip_id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


