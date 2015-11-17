# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:
# Author: Eli
# Create Date:2015-07-17 11：12
# Modify Author:
# Modify Date:
# Function: 模型函数
# ****************************************************************#
import sys

reload(sys)
sys.setdefaultencoding('utf8')
from django import forms
from django.forms import ModelForm
from django.forms.widgets import Input, TextInput, Textarea, Select, PasswordInput, EmailInput, HiddenInput
from app.models import User, Equipment, Permission
from django.utils.translation import ugettext_lazy as _


class LoginForm(forms.Form):
    username = forms.CharField(
        required=True,
        error_messages={'required': u'请输入用户名！', },
    )
    password = forms.CharField(
        required=True,
        error_messages={'required': u'请输入密码！'},
    )

    def clean(self):
        cleaned_data = super(LoginForm, self).clean()
        cleaned_username = cleaned_data.get("username", "")
        cleaned_password = cleaned_data.get("password", "")
        try:
            user = User.objects.get(username=cleaned_username)
        except User.DoesNotExist:
            self.add_error('username', _(u'用户不存在！'))
        else:
            if cleaned_password and not user.check_password(cleaned_password):
                self.add_error('password', _(u'密码错误！'))
                # raise forms.ValidationError(_(u'用户不存在'),code='invalid')
        return cleaned_data

        # model Form
        # class MyUserForm(forms.ModelForm):
        #
        #     def __init__(self, *args, **kwarg):
        #         super(MyUserForm, self).__init__(*args, **kwarg)
        #         self.fields['username'].required = True  # 设置字段为必填，而不需要在改写model的filed，如下
        #         self.fields['pasword'].required = True  # pasword = forms.CharField(required=True)
        #
        #     def clean_username(self):
        #         cleaned_data=super(MyUserForm,self).clean()
        #         username=cleaned_data.get('username')
        #
        #
        #     def clean(self):
        #         cleaned_data=super(MyUserForm,self).clean()
        #         username=cleaned_data.get('username')
        #         if User.objects.filter(username=username).count() is not 0:
        #             msg = u'用户已经存在'
        #             self._errors['username']=self.error_class([msg])
        #             del cleaned_data['username']
        #         return cleaned_data
        #
        #     class Meta:
        #         model = User
        #         fields=('username','password')  # 设置field
        #         # fields = '__all__'


class EquipmentForm(ModelForm):
    class Meta:
        model = Equipment
        fields = ('name', 'typecode', 'price', 'describe', 'equip_sd_argument')
        widgets = {
            'name': Input(attrs={'class': "form-control", 'placeholder': u'设备昵称，如：监控一号机'}),
            'typecode': Input(attrs={'class': "form-control", 'placeholder': u'设备型号，如：arduino uno'}),
            'price': Input(attrs={'class': "form-control"}),
            'describe': Input(attrs={
                'class': "form-control",
                'placeholder': u'数据显示格式,多个数据用|隔开，输入：温度|湿度，则设备状态显示：温度:xxx|湿度:xxx'}),
            'equip_sd_argument': Textarea(attrs={'class': "form-control", 'rows': "3",
                                                 'placeholder': u'例如:作用:监控温度'}),
        }
        labels = {
            'name': _('设备名'),
        }
        help_texts = {
            'name': _('设备的名称'),
        }
        error_messages = {
            'name': {
                'max_length': _('设备名太长'),
            },
        }

    def clean(self):
        cleaned_data = super(EquipmentForm, self).clean()
        # cleaned_username = cleaned_data.get("username","")
        # cleaned_password = cleaned_data.get("password","")
        return cleaned_data


class RegisterForm(ModelForm):
    """
    用户注册模块
    """
    permission = forms.ModelChoiceField(widget=Select(attrs={'class': "form-control"}),
                                        queryset=Permission.objects.all(),
                                        label=u'权限',
                                        initial=2)
    password2 = forms.CharField(widget=PasswordInput(attrs={'class': "form-control",
                                                            'placeholder': u'再次输入密码'}),
                                label=u'验证密码',
                                error_messages={'max_length': _(u'验证密码太长，不得超过30个字符'),
                                                'required': _(u'验证密码是必填项！'), })
    Invite = forms.CharField(widget=Input(attrs={'class': "form-control",
                                                       'placeholder': u'请输入申请码'}),
                             label=u'申请码',
                             required=False,
                             error_messages={'invalid': _(u'申请码错误！')})

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'full_name', 'email', 'permission')

        widgets = {
            'username': Input(attrs={'class': "form-control", 'placeholder': u'请输入用户名'}),
            'password': PasswordInput(attrs={'class': "form-control", 'placeholder': u'请输入密码'}),

            'full_name': Input(attrs={'class': "form-control", 'placeholder': u'请输入昵称'}),
            'email': EmailInput(attrs={
                'class': "form-control",
                'placeholder': u'请输入您的邮箱'}),

        }
        labels = {
            'permission': _(u'权限'),
        }
        help_texts = {
            'username': _(u'登陆的用户名'),
        }
        error_messages = {
            'username': {
                'max_length': _(u'用户名太长'),
                'required': _(u'用户名是必填项！'),

            },
            'password': {
                'max_length': _(u'密码太长，不得超过30个字符'),
                'required': _(u'密码是必填项！'),
            },
            'email': {
                'max_length': _(u'电子邮箱太长，不得超过30个字符'),
                'required': _(u'电子邮箱是必填项！'),
                'invalid': u'邮箱格式错误',
            },
        }

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        print cleaned_data
        if cleaned_data.get('permission','').code ==1:
            if cleaned_data.get('Invite','') != 'admin':
                self.add_error('Invite', _(u'申请码错误！'))
        if cleaned_data.get("password","") != cleaned_data.get("password2",""):
            self.add_error('password', _(u'验证密码不同！'))
        # cleaned_username = cleaned_data.get("username","")
        # cleaned_password = cleaned_data.get("password","")
        return cleaned_data
