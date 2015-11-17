# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:
# Author: Eli
# Create Date:2015-11-17
# Modify Author:
# Modify Date:
# Function: 装饰器函数，包括自定义注销验证装饰器
# ****************************************************************#
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.models import AnonymousUser


def loginout_required(function=None, redirect_field_name='index', login_url=None):
    """
    Decorator for views that checks that the user is logged in, redirecting
    to the log-in page if necessary.
    """
    actual_decorator = user_passes_test(
        lambda u: AnonymousUser.__instancecheck__(u),
        login_url='index',
        redirect_field_name='index',
    )
    if function:
        return actual_decorator(function)
    return actual_decorator