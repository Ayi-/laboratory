#!/usr/bin/env python
# -*- coding:utf-8 -*-
# ****************************************************************#
# ScriptName: logic
# Author: Eli
# Create Date: 2015/10/02
# Modify Author:
# Modify Date: 
# Function: 逻辑处理-暂定
# ****************************************************************#
import math

__author__ = 'eli'


def getAround(lon, lat, raidus):
    '''
    查询指定坐标点圆形坐标范围
    :param lon: 经度
    :param lat: 纬度
    :param raidus: 半径，单位：m
    :return:列表，minLon,minLat,maxLon,maxLat
    '''
    latitude = lat
    longitude = lon
    degree = (24901 * 1609) / 360.0
    raidusMile = raidus
    dpmLat = 1.0 / degree
    radiusLat = dpmLat * raidusMile
    minLat = latitude - radiusLat
    maxLat = latitude + radiusLat

    mpdLng = abs(degree * math.cos(latitude * (math.pi / 180.0)))
    dpmLng = 1 / mpdLng
    radiusLng = dpmLng * raidusMile
    minLng = longitude - radiusLng
    maxLng = longitude + radiusLng

    return [minLng, minLat, maxLng, maxLat]


def getDistance(start_longitude, start_latitude, end_longitude, end_latitude):
    '''
    计算两点间距离
    :param start_longitude: 开始坐标经度
    :param start_latitude:开始坐标纬度
    :param end_longitude:结束坐标经度
    :param end_latitude:结束坐标纬度
    :return:米
    '''
    lat1 = (math.pi / 180) * start_latitude
    lat2 = (math.pi / 180) * end_latitude

    lon1 = (math.pi / 180) * start_longitude
    lon2 = (math.pi / 180) * end_longitude

    # 地球半径
    R = 6371
    # 两点间距离 km，如果想要米的话，结果*1000就可以了
    d = math.acos(math.sin(lat1) * math.sin(lat2) + math.cos(lat1) * math.cos(lat2) * math.cos(lon2 - lon1)) * R

    return d * 1000
