# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:serializers
# Author: Eli
# Create Date:2015-10-31
# Modify Author:
# Modify Date:
# Function: 序列化
# ****************************************************************#
from django.core.serializers.json import Serializer
from django.template.loader import get_template
from app.modelchoice import modelchoice

__author__ = 'AE'

from django.contrib.auth.models import User, Group
from app.models import User as AppUser, Equipment, EquipStateAll, EquipStateLast, Permission, Position
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    user_permissions = serializers.StringRelatedField(many=True)  # 添加外键，不然会报错

    class Meta:
        model = User
        fields = '__all__'

        # exclude = ('user_permissions',)
        # depth = 1


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    permissions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Group
        fields = ('__all__')


class PermissionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'
        # extra_kwargs = {'url': {'view_name': 'permission-detail'}}


class AppUserSerializer(serializers.HyperlinkedModelSerializer):
    permission = serializers.StringRelatedField(many=False)
    # position = serializers.StringRelatedField(many=True)
    class Meta:
        model = AppUser
        fields = '__all__'
        extra_kwargs = {'url': {'view_name': 'appuser-detail'}}  # 避免和user冲突
        # lookup_field = 'permission'


class MessageSer(Serializer):
    def get_dump_object(self, obj):
        message = {
            "level": obj.level,
            "message": obj.message,
            "extra_tags": obj.tags,
        }
        return message


class EquipTempSerializer(serializers.BaseSerializer):
    """
    模板获取
    """
    success = serializers.CharField()
    ob = serializers.CharField()
    columns = serializers.ListField()
    content_html = serializers.CharField()

    class Meta:
        fields = ('content_html', 'columns', 'ob', 'success')

    def to_representation(self, obj):
        # 获取模型名
        # print self.context
        ob = self.context.get('pk', None)
        model = modelchoice.get(ob, None)
        # print ob
        if not ob or not model:
            return None
        # print ob
        obj.session['model'] = ob
        # 获取列的数据
        order_columns = [f for f in model._meta.fields]
        # if ob == 'equip':
        #     order_columns = [f for f in modelchoice.get(ob)._meta.fields]

        t = get_template('table.html')  # 获取模板内容

        # 获取模板
        content_html = t.render({'order_columns': order_columns}, obj)  # 渲染模板生成想要的全部局部html内容，而不是某一个变量
        columns = [{'data': column.attname} for column in order_columns]
        columns.append({'data': 'control'})

        payload = {
            'content_html': content_html,
            'columns': columns,
            'ob': ob,
            'success': True}  # 构造json类型数据，以方便前端处理

        return payload
        #
        # def success(self,requser):
        #     return True
        # def ob(self,request):
        #     print request
        #     return request.GET.get('name')
        # def columns(self,request):
        #     order_columns = [f for f in modelchoice.get(self.ob)._meta.fields]
        #     columns = [{'data': column.attname} for column in order_columns]
        #     columns.append({'data': '控制栏'})
        #     return columns
        # def content_html(self,request):
        #     order_columns = [f for f in modelchoice.get(self.ob)._meta.fields]
        #     # if ob == 'equip':
        #     #     order_columns = [f for f in modelchoice.get(ob)._meta.fields]
        #     t = get_template('table.html')  # 获取模板内容
        #
        #     # 获取模板
        #     content_html = t.render({'order_columns': order_columns})  # 渲染模板生成想要的全部局部html内容，而不是某一个变量
        #
        #     return content_html


class EquipSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    position = serializers.PrimaryKeyRelatedField(many=False,read_only=True)

    class Meta:
        model = Equipment
        fields = '__all__'


class EquipStateLastSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    equip = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    class Meta:
        model = EquipStateLast
        fields = '__all__'


class PositionSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model = Position
        fields = '__all__'
