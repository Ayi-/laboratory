# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:
# Author: Eli
# Create Date:2015-07-13 14:56:09
# Modify Author:
# Modify Date:
# Function: 模型函数
# ****************************************************************#
from __future__ import unicode_literals
import datetime

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User as aUser

from django.db import models

from django.utils import timezone
from django.utils.six import python_2_unicode_compatible

from django.utils.translation import ugettext_lazy as _


# Create your models here.

@python_2_unicode_compatible
class Permission(models.Model):
    """
    权限管理
    """
    name = models.CharField(_(u'权限名'), max_length=255, unique=True)  # 权限名
    code = models.IntegerField(_(u'权限代码'), unique=True)  # 权限代码

    class Meta:
        app_label = 'app'
        db_table = 'permission'
        verbose_name = u'权限表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '%s %d' % (self.name, self.code)


# @python_2_unicode_compatible
# class Company(models.Model):
#     """
#     隶属公司权限管理
#     """
#     name = models.CharField(_(u'名称'), max_length=255, unique=True)
#
#     class Meta:
#         app_label = 'app'
#         db_table = 'company'
#
#     def __str__(self):
#         return '%s' % self.name


class UserManeger(BaseUserManager):
    def create(self, username, password, **extra_fields):
        return self._create_user(username, password, **extra_fields)

    def _create_user(self, username, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        now = timezone.now()
        if not username:
            raise ValueError('The given username must be set')
        # email = self.normalize_email(email)
        user = self.model(username=username, date_joined=now, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, username, password, **extra_fields):
        return self._create_user(username, password,
                                 **extra_fields)


# 位置类
@python_2_unicode_compatible
class Position(models.Model):
    gps_longitude = models.FloatField(_(u'经度(E)'), default=0)
    gps_latitude = models.FloatField(_(u'维度(N)'), default=0)

    geo_position = models.CharField(_(u'地理位置'), max_length=100, default=u'无')

    def get_gps_position(self):
        return [self.gps_longitude, self.gps_latitude]

    def get_geo_position(self):
        return '%s' % self.geo_position

    def __str__(self):  # __unicode__ on Python 2
        return self.geo_position

    class Meta:
        db_table = 'position'
        verbose_name = u'GPS位置'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class User(AbstractBaseUser):
    username = models.CharField(_(u'用户名'), max_length=30, unique=True, default=None)
    full_name = models.CharField(_(u'昵称'), max_length=30, blank=True)
    email = models.EmailField(_(u'电子邮箱'), max_length=30, blank=True)

    # 权限
    # 2是用户级别
    permission = models.ForeignKey(Permission, default=2, blank=True, null=True, on_delete=models.SET_NULL,
                                   related_name='user', verbose_name=u'权限')
    position = models.ForeignKey(Position, blank=True, null=True, on_delete=models.SET_NULL, related_name='user',
                                 verbose_name=u'位置')
    date_joined = models.DateTimeField(_(u'创建时间'), default=timezone.now)  # 用户创建时间
    # setting = models.TextField()
    objects = UserManeger()

    # use by admin
    is_staff = False

    USERNAME_FIELD = 'user'
    REQUIRED_FIELDS = ['email', 'full_name', 'permission']

    class Meta:
        verbose_name = _(u'用户表')
        verbose_name_plural = verbose_name
        app_label = 'app'
        db_table = 'user'

    @classmethod
    def create(self, username, password, **extra_fields):
        return self.objects._create_user(username, password, **extra_fields)

    def save(self, *args, **kwargs):
        if not self.has_usable_password():
            self.set_password(self.password)
        super(User, self).save(*args, **kwargs)

    def set_last_time(self):
        self.last_login = timezone.now()
        self.save()

    def get_full_name(self):
        # The user is identified by their email address
        return self.username

    # use by admin
    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def __str__(self):  # __unicode__ on Python 2
        return self.username

    # use by admin
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return False

    def has_perms(self, per, obj=None):
        return False

    # use by admin
    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return False


# 设备抽象表
class AbstractBaseEquipment(models.Model):
    name = models.CharField(_(u'设备名'), max_length=255)
    typecode = models.CharField(_(u'设备型号'), max_length=100, default=None)

    price = models.IntegerField(_(u'设备价格(元)'), default=0)
    work_flag = models.IntegerField(_(u'工作标志'), default=0)
    describe = models.CharField(_(u'设备描述'),max_length=255,default="",
                                help_text=u'数据显示样式，如填写"数据",最终显示"数据:xxx"')
    load_date = models.DateTimeField(_(u'登记日期'), default=timezone.now)
    equip_sd_argument = models.TextField(_(u'设备描述'))

    def get_list(self):
        raise NotImplementedError(u'继承自AbstractBaseEquipment的子类必须提供get_list()函数')

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Equipment(AbstractBaseEquipment):
    user = models.ForeignKey(User, related_name='equipment', verbose_name=u'用户ID')
    position = models.ForeignKey(Position, blank=True, null=True, related_name='equipment', on_delete=models.SET_NULL,
                                 verbose_name=u'位置')

    def toJSON(self):
        fields = []
        for field in self._meta.fields:
            fields.append(field.name)

        d = {}
        for attr in fields:
            if isinstance(getattr(self, attr), timezone):
                d[attr] = getattr(self, attr).strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(getattr(self, attr), datetime.date):
                d[attr] = getattr(self, attr).strftime('%Y-%m-%d')
            else:
                d[attr] = getattr(self, attr)

        import json

        # return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
        return d

    def get_list(self):
        List = [getattr(self, f.name) for f in self._meta.fields]
        List[7] = List[7].strftime('%Y-%m-%d %H:%M:%S')
        List[8] = List[8].strftime('%Y-%m-%d %H:%M:%S')
        return List

    def get_dict(self):
        Dict = self.__dict__
        Dict.pop('_state', '')
        Dict['equip_sd_argument'] = Dict['equip_sd_argument'].replace('\n', r'<br>')

        # Dict['last_maintenance'] = timezone.strftime(Dict['last_maintenance'], '%Y-%m-%d %H:%M:%S')
        Dict['load_date'] = timezone.localtime(Dict['load_date']).strftime('%Y-%m-%d %H:%M:%S')
        return Dict

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'equipment'
        verbose_name = u'设备详情表'
        verbose_name_plural = verbose_name


class EquipStateManeger(models.Manager):

    def create(self, **kwargs):
        """
        Creates a new object with the given kwargs, saving it to the database
        and returning the created object.
        """
        now = timezone.now()
        obj = self.model(**kwargs)
        obj.state_date = now
        self._for_write = True
        obj.save(force_insert=True, using=self.db)

        # 更新最近数据
        EquipStateLast.objects.update_or_create(equip_id=obj.equip_id,
                                                defaults={'data':obj.data,'state_date':obj.state_date})

        # 更新设备状态
        Equipment.objects.filter(id=obj.equip_id).update(work_flag=1)

        return obj


class AbstractEquipState(models.Model):
    data = models.CharField(verbose_name=_(u'数据'), max_length=128, blank=True, default=None)
    state_date = models.DateTimeField(verbose_name=_(u'时间'), default=timezone.now)

    def get_dict(self):
        raise NotImplementedError(u'继承自AbstractBaseEquipment的子类必须提供get_dict()函数')

    class Meta:
        abstract = True


class LaboratoryState(models.Model):
    '''
    用于存放当前状态数据，每10分钟更新一次
    '''
    update_time = models.DateTimeField(_(u'更新时间'), default=timezone.now)
    number = models.IntegerField(_(u'当前人数'))
    temperature = models.FloatField(_(u'温度'))
    humidity = models.FloatField(_(u'湿度'))
    lx = models.IntegerField(_(u'光照'))

    class Meta:
        db_table = 'laboratory_state'
        verbose_name = u'实验室最新状态表'
        verbose_name_plural = verbose_name


@python_2_unicode_compatible
class EquipStateAll(AbstractEquipState):
    """
    存放每个设备的数据
    """
    equip = models.ForeignKey(Equipment, default=None, on_delete=models.DO_NOTHING, verbose_name=u'设备号',
                              related_name='equip_state_all')
    objects = EquipStateManeger()
    class Meta:
        db_table = 'equip_state_all'
        verbose_name = u'设备状态表'
        verbose_name_plural = verbose_name
        ordering = ['-state_date']

    def __str__(self):
        return self.equip.name

    def get_dict(self):
        Dict = self.__dict__
        Dict.pop('_state', '')

        Dict['state_date'] = timezone.localtime(Dict['state_date']).strftime('%Y-%m-%d %H:%M:%S')
        return Dict


@python_2_unicode_compatible
class EquipStateLast(AbstractEquipState):
    """
    存放每个设备的最近数据
    """
    equip = models.ForeignKey(Equipment, default=None, on_delete=models.DO_NOTHING, verbose_name=u'设备号',
                              related_name='equip_state_Last')

    class Meta:
        db_table = 'equip_state_last'
        verbose_name = u'设备最新状态表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.equip.name

    def get_dict(self):
        Dict = self.__dict__
        Dict.pop('_state', '')
        Dict['state_date'] = timezone.localtime(Dict['state_date']).strftime('%Y-%m-%d %H:%M:%S')
        return Dict


# 自定义认证
class MyCustomBackend:
    def authenticate(self, username=None, password=None):
        from django import forms

        try:
            user = User.objects.get(username=username)

        except User.DoesNotExist:
            pass
        else:
            if user.check_password(password):
                return user

            return None

    def get_user(self, user_id):
        '''
        使用request.user时候 会执行本函数
        :param user_id:
        :return:
        '''
        try:
            return User.objects.only('id').get(id=user_id)
        except User.DoesNotExist:
            return None
