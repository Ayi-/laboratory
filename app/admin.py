# -*- coding:utf8 -*-
from django.contrib import admin
from app.models import User,Equipment,Position,Permission, EquipStateAll, EquipStateLast

# class UserAdmin(admin.ModelAdmin):
#     """
#     定义保存密码的时候加密。
#     """
#     def save_model(self, request, obj, form, change):
#         obj.save()


# Register your models here.
#admin.site.register(User,UserAdmin)
admin.site.register(User)

admin.site.register(Equipment)
admin.site.register(EquipStateAll)
admin.site.register(EquipStateLast)
admin.site.register(Position)
admin.site.register(Permission)