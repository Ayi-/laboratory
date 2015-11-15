# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName:permissions
# Author: Eli
# Create Date:2015-11-1
# Modify Author:
# Modify Date:
# Function: 自定义权限管理
# ****************************************************************#
__author__ = 'AE'

from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    允许管理员编辑的自定义权限
    """
    def has_permission(self, request, view):
        #print request.user.is_active
        if request.user.is_active:
            if request.method in permissions.SAFE_METHODS:
                return True
            try:
                return request.user.is_staff or request.user.permission.code == 1
            except AttributeError:
                return False

    def has_object_permission(self, request, view, obj):
        # obj是读取到的一个字段的数据
        # 任何request都有只读权限，所以总是允许GET,HEAD 或 OPTIONS
        #print request.user.is_staff
        if request.user.is_active:
            if request.method in permissions.SAFE_METHODS:
                return True

            # 只有拥有admin权限才可以读写
            try:
                return request.user.is_staff or request.user.permission.code == 1
            except AttributeError:
                return False

class IsAdmin(permissions.BasePermission):
    """
    允许管理员编辑的自定义权限
    """
    def has_permission(self, request, view):

        if request.user.is_active:
            try:
                return request.user.is_staff or request.user.permission.code == 1
            except AttributeError:
                return False

    def has_object_permission(self, request, view, obj):
        # obj是读取到的一个字段的数据

        if request.user.is_active:
            # 只有拥有admin权限才可以读写
            try:
                return request.user.is_staff or request.user.permission.code == 1
            except AttributeError:
                return False
