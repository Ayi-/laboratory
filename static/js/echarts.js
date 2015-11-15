!function (t) {
    var e, i;
    !function () {
        function t(t, e) {
            if (!e)return t;
            if (0 === t.indexOf(".")) {
                var i = e.split("/"), r = t.split("/"), o = i.length - 1, n = r.length, s = 0, a = 0;
                t:for (var h = 0; n > h; h++)switch (r[h]) {
                    case"..":
                        if (!(o > s))break t;
                        s++, a++;
                        break;
                    case".":
                        a++;
                        break;
                    default:
                        break t
                }
                return i.length = o - s, r = r.slice(a), i.concat(r).join("/")
            }
            return t
        }

        function r(e) {
            function i(i, s) {
                if ("string" == typeof i) {
                    var a = r[i];
                    return a || (a = n(t(i, e)), r[i] = a), a
                }
                i instanceof Array && (s = s || function () {
                    }, s.apply(this, o(i, s, e)))
            }

            var r = {};
            return i
        }

        function o(i, r, o) {
            for (var a = [], h = s[o], l = 0, c = Math.min(i.length, r.length); c > l; l++) {
                var d, u = t(i[l], o);
                switch (u) {
                    case"require":
                        d = h && h.require || e;
                        break;
                    case"exports":
                        d = h.exports;
                        break;
                    case"module":
                        d = h;
                        break;
                    default:
                        d = n(u)
                }
                a.push(d)
            }
            return a
        }

        function n(t) {
            var e = s[t];
            if (!e)throw new Error("No " + t);
            if (!e.defined) {
                var i = e.factory, r = i.apply(this, o(e.deps || [], i, t));
                "undefined" != typeof r && (e.exports = r), e.defined = 1
            }
            return e.exports
        }

        var s = {};
        i = function (t, e, i) {
            s[t] = {id: t, deps: e, factory: i, defined: 0, exports: {}, require: r(t)}
        }, e = r("")
    }(), i("echarts/chart/pie", ["require", "./base", "zrender/shape/Text", "zrender/shape/Ring", "zrender/shape/Circle", "zrender/shape/Sector", "zrender/shape/Polyline", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/math", "zrender/tool/color", "../chart"], function (t) {
        function e(t, e, r, o, n) {
            i.call(this, t, e, r, o, n);
            var s = this;
            s.shapeHandler.onmouseover = function (t) {
                var e = t.target, i = l.get(e, "seriesIndex"), r = l.get(e, "dataIndex"), o = l.get(e, "special"), n = [e.style.x, e.style.y], a = e.style.startAngle, h = e.style.endAngle, c = ((h + a) / 2 + 360) % 360, d = e.highlightStyle.color, u = s.getLabel(i, r, o, n, c, d, !0);
                u && s.zr.addHoverShape(u);
                var p = s.getLabelLine(i, r, n, e.style.r0, e.style.r, c, d, !0);
                p && s.zr.addHoverShape(p)
            }, this.refresh(o)
        }

        var i = t("./base"), r = t("zrender/shape/Text"), o = t("zrender/shape/Ring"), n = t("zrender/shape/Circle"), s = t("zrender/shape/Sector"), a = t("zrender/shape/Polyline"), h = t("../config");
        h.pie = {
            zlevel: 0,
            z: 2,
            clickable: !0,
            legendHoverLink: !0,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockWise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            itemStyle: {
                normal: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !0, position: "outer"},
                    labelLine: {show: !0, length: 20, lineStyle: {width: 1, type: "solid"}}
                },
                emphasis: {
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 1,
                    label: {show: !1},
                    labelLine: {show: !1, length: 20, lineStyle: {width: 1, type: "solid"}}
                }
            }
        };
        var l = t("../util/ecData"), c = t("zrender/tool/util"), d = t("zrender/tool/math"), u = t("zrender/tool/color");
        return e.prototype = {
            type: h.CHART_TYPE_PIE, _buildShape: function () {
                var t = this.series, e = this.component.legend;
                this.selectedMap = {}, this._selected = {};
                var i, r, s;
                this._selectedMode = !1;
                for (var a, c = 0, d = t.length; d > c; c++)if (t[c].type === h.CHART_TYPE_PIE) {
                    if (t[c] = this.reformOption(t[c]), this.legendHoverLink = t[c].legendHoverLink || this.legendHoverLink, a = t[c].name || "", this.selectedMap[a] = e ? e.isSelected(a) : !0, !this.selectedMap[a])continue;
                    i = this.parseCenter(this.zr, t[c].center), r = this.parseRadius(this.zr, t[c].radius), this._selectedMode = this._selectedMode || t[c].selectedMode, this._selected[c] = [], this.deepQuery([t[c], this.option], "calculable") && (s = {
                        zlevel: t[c].zlevel,
                        z: t[c].z,
                        hoverable: !1,
                        style: {
                            x: i[0],
                            y: i[1],
                            r0: r[0] <= 10 ? 0 : r[0] - 10,
                            r: r[1] + 10,
                            brushType: "stroke",
                            lineWidth: 1,
                            strokeColor: t[c].calculableHolderColor || this.ecTheme.calculableHolderColor || h.calculableHolderColor
                        }
                    }, l.pack(s, t[c], c, void 0, -1), this.setCalculable(s), s = r[0] <= 10 ? new n(s) : new o(s), this.shapeList.push(s)), this._buildSinglePie(c), this.buildMark(c)
                }
                this.addShapeList()
            }, _buildSinglePie: function (t) {
                for (var e, i = this.series, r = i[t], o = r.data, n = this.component.legend, s = 0, a = 0, h = 0, l = Number.NEGATIVE_INFINITY, c = [], d = 0, u = o.length; u > d; d++)e = o[d].name, this.selectedMap[e] = n ? n.isSelected(e) : !0, this.selectedMap[e] && !isNaN(o[d].value) && (0 !== +o[d].value ? s++ : a++, h += +o[d].value, l = Math.max(l, +o[d].value));
                if (0 !== h) {
                    for (var p, f, g, m, _, y, v = 100, x = r.clockWise, b = (r.startAngle.toFixed(2) - 0 + 360) % 360, T = r.minAngle || .01, S = 360 - T * s - .01 * a, C = r.roseType, d = 0, u = o.length; u > d; d++)if (e = o[d].name, this.selectedMap[e] && !isNaN(o[d].value)) {
                        if (f = n ? n.getColor(e) : this.zr.getColor(d), v = o[d].value / h, p = "area" != C ? x ? b - v * S - (0 !== v ? T : .01) : v * S + b + (0 !== v ? T : .01) : x ? b - 360 / u : 360 / u + b, p = p.toFixed(2) - 0, v = (100 * v).toFixed(2), g = this.parseCenter(this.zr, r.center), m = this.parseRadius(this.zr, r.radius), _ = +m[0], y = +m[1], "radius" === C ? y = o[d].value / l * (y - _) * .8 + .2 * (y - _) + _ : "area" === C && (y = Math.sqrt(o[d].value / l) * (y - _) + _), x) {
                            var E;
                            E = b, b = p, p = E
                        }
                        this._buildItem(c, t, d, v, o[d].selected, g, _, y, b, p, f), x || (b = p)
                    }
                    this._autoLabelLayout(c, g, y);
                    for (var d = 0, u = c.length; u > d; d++)this.shapeList.push(c[d]);
                    c = null
                }
            }, _buildItem: function (t, e, i, r, o, n, s, a, h, c, d) {
                var u = this.series, p = ((c + h) / 2 + 360) % 360, f = this.getSector(e, i, r, o, n, s, a, h, c, d);
                l.pack(f, u[e], e, u[e].data[i], i, u[e].data[i].name, r), t.push(f);
                var g = this.getLabel(e, i, r, n, p, d, !1), m = this.getLabelLine(e, i, n, s, a, p, d, !1);
                m && (l.pack(m, u[e], e, u[e].data[i], i, u[e].data[i].name, r), t.push(m)), g && (l.pack(g, u[e], e, u[e].data[i], i, u[e].data[i].name, r), g._labelLine = m, t.push(g))
            }, getSector: function (t, e, i, r, o, n, a, h, l, c) {
                var p = this.series, f = p[t], g = f.data[e], m = [g, f], _ = this.deepMerge(m, "itemStyle.normal") || {}, y = this.deepMerge(m, "itemStyle.emphasis") || {}, v = this.getItemStyleColor(_.color, t, e, g) || c, x = this.getItemStyleColor(y.color, t, e, g) || ("string" == typeof v ? u.lift(v, -.2) : v), b = {
                    zlevel: f.zlevel,
                    z: f.z,
                    clickable: this.deepQuery(m, "clickable"),
                    style: {
                        x: o[0],
                        y: o[1],
                        r0: n,
                        r: a,
                        startAngle: h,
                        endAngle: l,
                        brushType: "both",
                        color: v,
                        lineWidth: _.borderWidth,
                        strokeColor: _.borderColor,
                        lineJoin: "round"
                    },
                    highlightStyle: {color: x, lineWidth: y.borderWidth, strokeColor: y.borderColor, lineJoin: "round"},
                    _seriesIndex: t,
                    _dataIndex: e
                };
                if (r) {
                    var T = ((b.style.startAngle + b.style.endAngle) / 2).toFixed(2) - 0;
                    b.style._hasSelected = !0, b.style._x = b.style.x, b.style._y = b.style.y;
                    var S = this.query(f, "selectedOffset");
                    b.style.x += d.cos(T, !0) * S, b.style.y -= d.sin(T, !0) * S, this._selected[t][e] = !0
                } else this._selected[t][e] = !1;
                return this._selectedMode && (b.onclick = this.shapeHandler.onclick), this.deepQuery([g, f, this.option], "calculable") && (this.setCalculable(b), b.draggable = !0), (this._needLabel(f, g, !0) || this._needLabelLine(f, g, !0)) && (b.onmouseover = this.shapeHandler.onmouseover), b = new s(b)
            }, getLabel: function (t, e, i, o, n, s, a) {
                var h = this.series, l = h[t], u = l.data[e];
                if (this._needLabel(l, u, a)) {
                    var p, f, g, m = a ? "emphasis" : "normal", _ = c.merge(c.clone(u.itemStyle) || {}, l.itemStyle), y = _[m].label, v = y.textStyle || {}, x = o[0], b = o[1], T = this.parseRadius(this.zr, l.radius), S = "middle";
                    y.position = y.position || _.normal.label.position, "center" === y.position ? (p = x, f = b, g = "center") : "inner" === y.position || "inside" === y.position ? (T = (T[0] + T[1]) * (y.distance || .5), p = Math.round(x + T * d.cos(n, !0)), f = Math.round(b - T * d.sin(n, !0)), s = "#fff", g = "center") : (T = T[1] - -_[m].labelLine.length, p = Math.round(x + T * d.cos(n, !0)), f = Math.round(b - T * d.sin(n, !0)), g = n >= 90 && 270 >= n ? "right" : "left"), "center" != y.position && "inner" != y.position && "inside" != y.position && (p += "left" === g ? 20 : -20), u.__labelX = p - ("left" === g ? 5 : -5), u.__labelY = f;
                    var C = new r({
                        zlevel: l.zlevel,
                        z: l.z + 1,
                        hoverable: !1,
                        style: {
                            x: p,
                            y: f,
                            color: v.color || s,
                            text: this.getLabelText(t, e, i, m),
                            textAlign: v.align || g,
                            textBaseline: v.baseline || S,
                            textFont: this.getFont(v)
                        },
                        highlightStyle: {brushType: "fill"}
                    });
                    return C._radius = T, C._labelPosition = y.position || "outer", C._rect = C.getRect(C.style), C._seriesIndex = t, C._dataIndex = e, C
                }
            }, getLabelText: function (t, e, i, r) {
                var o = this.series, n = o[t], s = n.data[e], a = this.deepQuery([s, n], "itemStyle." + r + ".label.formatter");
                return a ? "function" == typeof a ? a.call(this.myChart, {
                    seriesIndex: t,
                    seriesName: n.name || "",
                    series: n,
                    dataIndex: e,
                    data: s,
                    name: s.name,
                    value: s.value,
                    percent: i
                }) : "string" == typeof a ? (a = a.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}"), a = a.replace("{a0}", n.name).replace("{b0}", s.name).replace("{c0}", s.value).replace("{d0}", i)) : void 0 : s.name
            }, getLabelLine: function (t, e, i, r, o, n, s, h) {
                var l = this.series, u = l[t], p = u.data[e];
                if (this._needLabelLine(u, p, h)) {
                    var f = h ? "emphasis" : "normal", g = c.merge(c.clone(p.itemStyle) || {}, u.itemStyle), m = g[f].labelLine, _ = m.lineStyle || {}, y = i[0], v = i[1], x = o, b = this.parseRadius(this.zr, u.radius)[1] - -m.length, T = d.cos(n, !0), S = d.sin(n, !0);
                    return new a({
                        zlevel: u.zlevel,
                        z: u.z + 1,
                        hoverable: !1,
                        style: {
                            pointList: [[y + x * T, v - x * S], [y + b * T, v - b * S], [p.__labelX, p.__labelY]],
                            strokeColor: _.color || s,
                            lineType: _.type,
                            lineWidth: _.width
                        },
                        _seriesIndex: t,
                        _dataIndex: e
                    })
                }
            }, _needLabel: function (t, e, i) {
                return this.deepQuery([e, t], "itemStyle." + (i ? "emphasis" : "normal") + ".label.show")
            }, _needLabelLine: function (t, e, i) {
                return this.deepQuery([e, t], "itemStyle." + (i ? "emphasis" : "normal") + ".labelLine.show")
            }, _autoLabelLayout: function (t, e, i) {
                for (var r = [], o = [], n = 0, s = t.length; s > n; n++)("outer" === t[n]._labelPosition || "outside" === t[n]._labelPosition) && (t[n]._rect._y = t[n]._rect.y, t[n]._rect.x < e[0] ? r.push(t[n]) : o.push(t[n]));
                this._layoutCalculate(r, e, i, -1), this._layoutCalculate(o, e, i, 1)
            }, _layoutCalculate: function (t, e, i, r) {
                function o(e, i, r) {
                    for (var o = e; i > o; o++)if (t[o]._rect.y += r, t[o].style.y += r, t[o]._labelLine && (t[o]._labelLine.style.pointList[1][1] += r, t[o]._labelLine.style.pointList[2][1] += r), o > e && i > o + 1 && t[o + 1]._rect.y > t[o]._rect.y + t[o]._rect.height)return void n(o, r / 2);
                    n(i - 1, r / 2)
                }

                function n(e, i) {
                    for (var r = e; r >= 0 && (t[r]._rect.y -= i, t[r].style.y -= i, t[r]._labelLine && (t[r]._labelLine.style.pointList[1][1] -= i, t[r]._labelLine.style.pointList[2][1] -= i), !(r > 0 && t[r]._rect.y > t[r - 1]._rect.y + t[r - 1]._rect.height)); r--);
                }

                function s(t, e, i, r, o) {
                    for (var n, s, a, h = i[0], l = i[1], c = o > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, d = 0, u = t.length; u > d; d++)s = Math.abs(t[d]._rect.y - l), a = t[d]._radius - r, n = r + a > s ? Math.sqrt((r + a + 20) * (r + a + 20) - Math.pow(t[d]._rect.y - l, 2)) : Math.abs(t[d]._rect.x + (o > 0 ? 0 : t[d]._rect.width) - h), e && n >= c && (n = c - 10), !e && c >= n && (n = c + 10), t[d]._rect.x = t[d].style.x = h + n * o, t[d]._labelLine && (t[d]._labelLine.style.pointList[2][0] = h + (n - 5) * o, t[d]._labelLine.style.pointList[1][0] = h + (n - 20) * o), c = n
                }

                t.sort(function (t, e) {
                    return t._rect.y - e._rect.y
                });
                for (var a, h = 0, l = t.length, c = [], d = [], u = 0; l > u; u++)a = t[u]._rect.y - h, 0 > a && o(u, l, -a, r), h = t[u]._rect.y + t[u]._rect.height;
                this.zr.getHeight() - h < 0 && n(l - 1, h - this.zr.getHeight());
                for (var u = 0; l > u; u++)t[u]._rect.y >= e[1] ? d.push(t[u]) : c.push(t[u]);
                s(d, !0, e, i, r), s(c, !1, e, i, r)
            }, reformOption: function (t) {
                var e = c.merge;
                return t = e(e(t || {}, c.clone(this.ecTheme.pie || {})), c.clone(h.pie)), t.itemStyle.normal.label.textStyle = this.getTextStyle(t.itemStyle.normal.label.textStyle), t.itemStyle.emphasis.label.textStyle = this.getTextStyle(t.itemStyle.emphasis.label.textStyle), this.z = t.z, this.zlevel = t.zlevel, t
            }, refresh: function (t) {
                t && (this.option = t, this.series = t.series), this.backupShapeList(), this._buildShape()
            }, addDataAnimation: function (t, e) {
                function i() {
                    a--, 0 === a && e && e()
                }

                for (var r = this.series, o = {}, n = 0, s = t.length; s > n; n++)o[t[n][0]] = t[n];
                var a = 0, l = {}, c = {}, d = {}, u = this.shapeList;
                this.shapeList = [];
                for (var p, f, g, m = {}, n = 0, s = t.length; s > n; n++)p = t[n][0], f = t[n][2], g = t[n][3], r[p] && r[p].type === h.CHART_TYPE_PIE && (f ? (g || (l[p + "_" + r[p].data.length] = "delete"), m[p] = 1) : g ? m[p] = 0 : (l[p + "_-1"] = "delete", m[p] = -1), this._buildSinglePie(p));
                for (var _, y, n = 0, s = this.shapeList.length; s > n; n++)switch (p = this.shapeList[n]._seriesIndex, _ = this.shapeList[n]._dataIndex, y = p + "_" + _, this.shapeList[n].type) {
                    case"sector":
                        l[y] = this.shapeList[n];
                        break;
                    case"text":
                        c[y] = this.shapeList[n];
                        break;
                    case"polyline":
                        d[y] = this.shapeList[n]
                }
                this.shapeList = [];
                for (var v, n = 0, s = u.length; s > n; n++)if (p = u[n]._seriesIndex, o[p]) {
                    if (_ = u[n]._dataIndex + m[p], y = p + "_" + _, v = l[y], !v)continue;
                    if ("sector" === u[n].type)"delete" != v ? (a++, this.zr.animate(u[n].id, "style").when(400, {
                        startAngle: v.style.startAngle,
                        endAngle: v.style.endAngle
                    }).done(i).start()) : (a++, this.zr.animate(u[n].id, "style").when(400, m[p] < 0 ? {startAngle: u[n].style.startAngle} : {endAngle: u[n].style.endAngle}).done(i).start()); else if ("text" === u[n].type || "polyline" === u[n].type)if ("delete" === v)this.zr.delShape(u[n].id); else switch (u[n].type) {
                        case"text":
                            a++, v = c[y], this.zr.animate(u[n].id, "style").when(400, {
                                x: v.style.x,
                                y: v.style.y
                            }).done(i).start();
                            break;
                        case"polyline":
                            a++, v = d[y], this.zr.animate(u[n].id, "style").when(400, {pointList: v.style.pointList}).done(i).start()
                    }
                }
                this.shapeList = u, a || e && e()
            }, onclick: function (t) {
                var e = this.series;
                if (this.isClick && t.target) {
                    this.isClick = !1;
                    for (var i, r = t.target, o = r.style, n = l.get(r, "seriesIndex"), s = l.get(r, "dataIndex"), a = 0, c = this.shapeList.length; c > a; a++)if (this.shapeList[a].id === r.id) {
                        if (n = l.get(r, "seriesIndex"), s = l.get(r, "dataIndex"), o._hasSelected)r.style.x = r.style._x, r.style.y = r.style._y, r.style._hasSelected = !1, this._selected[n][s] = !1; else {
                            var u = ((o.startAngle + o.endAngle) / 2).toFixed(2) - 0;
                            r.style._hasSelected = !0, this._selected[n][s] = !0, r.style._x = r.style.x, r.style._y = r.style.y, i = this.query(e[n], "selectedOffset"), r.style.x += d.cos(u, !0) * i, r.style.y -= d.sin(u, !0) * i
                        }
                        this.zr.modShape(r.id)
                    } else this.shapeList[a].style._hasSelected && "single" === this._selectedMode && (n = l.get(this.shapeList[a], "seriesIndex"), s = l.get(this.shapeList[a], "dataIndex"), this.shapeList[a].style.x = this.shapeList[a].style._x, this.shapeList[a].style.y = this.shapeList[a].style._y, this.shapeList[a].style._hasSelected = !1, this._selected[n][s] = !1, this.zr.modShape(this.shapeList[a].id));
                    this.messageCenter.dispatch(h.EVENT.PIE_SELECTED, t.event, {
                        selected: this._selected,
                        target: l.get(r, "name")
                    }, this.myChart), this.zr.refreshNextFrame()
                }
            }
        }, c.inherits(e, i), t("../chart").define("pie", e), e
    }), i("echarts/echarts", ["require", "./config", "zrender/tool/util", "zrender/tool/event", "zrender/tool/env", "zrender", "zrender/config", "./chart/island", "./component/toolbox", "./component", "./component/title", "./component/tooltip", "./component/legend", "./util/ecData", "./chart", "zrender/tool/color", "./component/timeline", "zrender/shape/Image", "zrender/loadingEffect/Bar", "zrender/loadingEffect/Bubble", "zrender/loadingEffect/DynamicLine", "zrender/loadingEffect/Ring", "zrender/loadingEffect/Spin", "zrender/loadingEffect/Whirling", "./theme/macarons", "./theme/infographic"], function (t) {
        function e() {
            s.Dispatcher.call(this)
        }

        function i(t) {
            t.innerHTML = "", this._themeConfig = {}, this.dom = t, this._connected = !1, this._status = {
                dragIn: !1,
                dragOut: !1,
                needRefresh: !1
            }, this._curEventType = !1, this._chartList = [], this._messageCenter = new e, this._messageCenterOutSide = new e, this.resize = this.resize(), this._init()
        }

        function r(t, e, i, r, o) {
            for (var n = t._chartList, s = n.length; s--;) {
                var a = n[s];
                "function" == typeof a[e] && a[e](i, r, o)
            }
        }

        var o = t("./config"), n = t("zrender/tool/util"), s = t("zrender/tool/event"), a = {}, h = t("zrender/tool/env").canvasSupported, l = new Date - 0, c = {}, d = "_echarts_instance_";
        a.version = "2.2.7", a.dependencies = {zrender: "2.1.1"}, a.init = function (e, r) {
            var o = t("zrender");
            o.version.replace(".", "") - 0 < a.dependencies.zrender.replace(".", "") - 0 && console.error("ZRender " + o.version + " is too old for ECharts " + a.version + ". Current version need ZRender " + a.dependencies.zrender + "+"), e = e instanceof Array ? e[0] : e;
            var n = e.getAttribute(d);
            return n || (n = l++, e.setAttribute(d, n)), c[n] && c[n].dispose(), c[n] = new i(e), c[n].id = n, c[n].canvasSupported = h, c[n].setTheme(r), c[n]
        }, a.getInstanceById = function (t) {
            return c[t]
        }, n.merge(e.prototype, s.Dispatcher.prototype, !0);
        var u = t("zrender/config").EVENT, p = ["CLICK", "DBLCLICK", "MOUSEOVER", "MOUSEOUT", "DRAGSTART", "DRAGEND", "DRAGENTER", "DRAGOVER", "DRAGLEAVE", "DROP"];
        return i.prototype = {
            _init: function () {
                var e = this, i = t("zrender").init(this.dom);
                this._zr = i, this._messageCenter.dispatch = function (t, i, r, o) {
                    r = r || {}, r.type = t, r.event = i, e._messageCenter.dispatchWithContext(t, r, o), e._messageCenterOutSide.dispatchWithContext(t, r, o)
                }, this._onevent = function (t) {
                    return e.__onevent(t)
                };
                for (var r in o.EVENT)"CLICK" != r && "DBLCLICK" != r && "HOVER" != r && "MOUSEOUT" != r && "MAP_ROAM" != r && this._messageCenter.bind(o.EVENT[r], this._onevent, this);
                var n = {};
                this._onzrevent = function (t) {
                    return e[n[t.type]](t)
                };
                for (var s = 0, a = p.length; a > s; s++) {
                    var h = p[s], l = u[h];
                    n[l] = "_on" + h.toLowerCase(), i.on(l, this._onzrevent)
                }
                this.chart = {}, this.component = {};
                var c = t("./chart/island");
                this._island = new c(this._themeConfig, this._messageCenter, i, {}, this), this.chart.island = this._island;
                var d = t("./component/toolbox");
                this._toolbox = new d(this._themeConfig, this._messageCenter, i, {}, this), this.component.toolbox = this._toolbox;
                var f = t("./component");
                f.define("title", t("./component/title")), f.define("tooltip", t("./component/tooltip")), f.define("legend", t("./component/legend")), (0 === i.getWidth() || 0 === i.getHeight()) && console.error("Dom’s width & height should be ready before init.")
            }, __onevent: function (t) {
                t.__echartsId = t.__echartsId || this.id;
                var e = t.__echartsId === this.id;
                switch (this._curEventType || (this._curEventType = t.type), t.type) {
                    case o.EVENT.LEGEND_SELECTED:
                        this._onlegendSelected(t);
                        break;
                    case o.EVENT.DATA_ZOOM:
                        if (!e) {
                            var i = this.component.dataZoom;
                            i && (i.silence(!0), i.absoluteZoom(t.zoom), i.silence(!1))
                        }
                        this._ondataZoom(t);
                        break;
                    case o.EVENT.DATA_RANGE:
                        e && this._ondataRange(t);
                        break;
                    case o.EVENT.MAGIC_TYPE_CHANGED:
                        if (!e) {
                            var r = this.component.toolbox;
                            r && (r.silence(!0), r.setMagicType(t.magicType), r.silence(!1))
                        }
                        this._onmagicTypeChanged(t);
                        break;
                    case o.EVENT.DATA_VIEW_CHANGED:
                        e && this._ondataViewChanged(t);
                        break;
                    case o.EVENT.TOOLTIP_HOVER:
                        e && this._tooltipHover(t);
                        break;
                    case o.EVENT.RESTORE:
                        this._onrestore();
                        break;
                    case o.EVENT.REFRESH:
                        e && this._onrefresh(t);
                        break;
                    case o.EVENT.TOOLTIP_IN_GRID:
                    case o.EVENT.TOOLTIP_OUT_GRID:
                        if (e) {
                            if (this._connected) {
                                var n = this.component.grid;
                                n && (t.x = (t.event.zrenderX - n.getX()) / n.getWidth(), t.y = (t.event.zrenderY - n.getY()) / n.getHeight())
                            }
                        } else {
                            var n = this.component.grid;
                            n && this._zr.trigger("mousemove", {
                                connectTrigger: !0,
                                zrenderX: n.getX() + t.x * n.getWidth(),
                                zrenderY: n.getY() + t.y * n.getHeight()
                            })
                        }
                }
                if (this._connected && e && this._curEventType === t.type) {
                    for (var s in this._connected)this._connected[s].connectedEventHandler(t);
                    this._curEventType = null
                }
                (!e || !this._connected && e) && (this._curEventType = null)
            }, _onclick: function (t) {
                if (r(this, "onclick", t), t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(o.EVENT.CLICK, t.event, e, this)
                }
            }, _ondblclick: function (t) {
                if (r(this, "ondblclick", t), t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(o.EVENT.DBLCLICK, t.event, e, this)
                }
            }, _onmouseover: function (t) {
                if (t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(o.EVENT.HOVER, t.event, e, this)
                }
            }, _onmouseout: function (t) {
                if (t.target) {
                    var e = this._eventPackage(t.target);
                    e && null != e.seriesIndex && this._messageCenter.dispatch(o.EVENT.MOUSEOUT, t.event, e, this)
                }
            }, _ondragstart: function (t) {
                this._status = {dragIn: !1, dragOut: !1, needRefresh: !1}, r(this, "ondragstart", t)
            }, _ondragenter: function (t) {
                r(this, "ondragenter", t)
            }, _ondragover: function (t) {
                r(this, "ondragover", t)
            }, _ondragleave: function (t) {
                r(this, "ondragleave", t)
            }, _ondrop: function (t) {
                r(this, "ondrop", t, this._status), this._island.ondrop(t, this._status)
            }, _ondragend: function (t) {
                if (r(this, "ondragend", t, this._status), this._timeline && this._timeline.ondragend(t, this._status), this._island.ondragend(t, this._status), this._status.needRefresh) {
                    this._syncBackupData(this._option);
                    var e = this._messageCenter;
                    e.dispatch(o.EVENT.DATA_CHANGED, t.event, this._eventPackage(t.target), this), e.dispatch(o.EVENT.REFRESH, null, null, this)
                }
            }, _onlegendSelected: function (t) {
                this._status.needRefresh = !1, r(this, "onlegendSelected", t, this._status), this._status.needRefresh && this._messageCenter.dispatch(o.EVENT.REFRESH, null, null, this)
            }, _ondataZoom: function (t) {
                this._status.needRefresh = !1, r(this, "ondataZoom", t, this._status), this._status.needRefresh && this._messageCenter.dispatch(o.EVENT.REFRESH, null, null, this)
            }, _ondataRange: function (t) {
                this._clearEffect(), this._status.needRefresh = !1, r(this, "ondataRange", t, this._status), this._status.needRefresh && this._zr.refreshNextFrame()
            }, _onmagicTypeChanged: function () {
                this._clearEffect(), this._render(this._toolbox.getMagicOption())
            }, _ondataViewChanged: function (t) {
                this._syncBackupData(t.option), this._messageCenter.dispatch(o.EVENT.DATA_CHANGED, null, t, this), this._messageCenter.dispatch(o.EVENT.REFRESH, null, null, this)
            }, _tooltipHover: function (t) {
                var e = [];
                r(this, "ontooltipHover", t, e)
            }, _onrestore: function () {
                this.restore()
            }, _onrefresh: function (t) {
                this._refreshInside = !0, this.refresh(t), this._refreshInside = !1
            }, _syncBackupData: function (t) {
                this.component.dataZoom && this.component.dataZoom.syncBackupData(t)
            }, _eventPackage: function (e) {
                if (e) {
                    var i = t("./util/ecData"), r = i.get(e, "seriesIndex"), o = i.get(e, "dataIndex");
                    return o = -1 != r && this.component.dataZoom ? this.component.dataZoom.getRealDataIndex(r, o) : o, {
                        seriesIndex: r,
                        seriesName: (i.get(e, "series") || {}).name,
                        dataIndex: o,
                        data: i.get(e, "data"),
                        name: i.get(e, "name"),
                        value: i.get(e, "value"),
                        special: i.get(e, "special")
                    }
                }
            }, _noDataCheck: function (t) {
                for (var e = t.series, i = 0, r = e.length; r > i; i++)if (e[i].type == o.CHART_TYPE_MAP || e[i].data && e[i].data.length > 0 || e[i].markPoint && e[i].markPoint.data && e[i].markPoint.data.length > 0 || e[i].markLine && e[i].markLine.data && e[i].markLine.data.length > 0 || e[i].nodes && e[i].nodes.length > 0 || e[i].links && e[i].links.length > 0 || e[i].matrix && e[i].matrix.length > 0 || e[i].eventList && e[i].eventList.length > 0)return !1;
                var n = this._option && this._option.noDataLoadingOption || this._themeConfig.noDataLoadingOption || o.noDataLoadingOption || {
                        text: this._option && this._option.noDataText || this._themeConfig.noDataText || o.noDataText,
                        effect: this._option && this._option.noDataEffect || this._themeConfig.noDataEffect || o.noDataEffect
                    };
                return this.clear(), this.showLoading(n), !0
            }, _render: function (e) {
                if (this._mergeGlobalConifg(e), !this._noDataCheck(e)) {
                    var i = e.backgroundColor;
                    if (i)if (h || -1 == i.indexOf("rgba"))this.dom.style.backgroundColor = i; else {
                        var r = i.split(",");
                        this.dom.style.filter = "alpha(opacity=" + 100 * r[3].substring(0, r[3].lastIndexOf(")")) + ")", r.length = 3, r[0] = r[0].replace("a", ""), this.dom.style.backgroundColor = r.join(",") + ")"
                    }
                    this._zr.clearAnimation(), this._chartList = [];
                    var n = t("./chart"), s = t("./component");
                    (e.xAxis || e.yAxis) && (e.grid = e.grid || {}, e.dataZoom = e.dataZoom || {});
                    for (var a, l, c, d = ["title", "legend", "tooltip", "dataRange", "roamController", "grid", "dataZoom", "xAxis", "yAxis", "polar"], u = 0, p = d.length; p > u; u++)l = d[u], c = this.component[l], e[l] ? (c ? c.refresh && c.refresh(e) : (a = s.get(/^[xy]Axis$/.test(l) ? "axis" : l), c = new a(this._themeConfig, this._messageCenter, this._zr, e, this, l), this.component[l] = c), this._chartList.push(c)) : c && (c.dispose(), this.component[l] = null, delete this.component[l]);
                    for (var f, g, m, _ = {}, u = 0, p = e.series.length; p > u; u++)g = e.series[u].type, g ? _[g] || (_[g] = !0, f = n.get(g), f ? (this.chart[g] ? (m = this.chart[g], m.refresh(e)) : m = new f(this._themeConfig, this._messageCenter, this._zr, e, this), this._chartList.push(m), this.chart[g] = m) : console.error(g + " has not been required.")) : console.error("series[" + u + "] chart type has not been defined.");
                    for (g in this.chart)g == o.CHART_TYPE_ISLAND || _[g] || (this.chart[g].dispose(), this.chart[g] = null, delete this.chart[g]);
                    this.component.grid && this.component.grid.refixAxisShape(this.component), this._island.refresh(e), this._toolbox.refresh(e), e.animation && !e.renderAsImage ? this._zr.refresh() : this._zr.render();
                    var y = "IMG" + this.id, v = document.getElementById(y);
                    e.renderAsImage && h ? (v ? v.src = this.getDataURL(e.renderAsImage) : (v = this.getImage(e.renderAsImage), v.id = y, v.style.position = "absolute", v.style.left = 0, v.style.top = 0, this.dom.firstChild.appendChild(v)), this.un(), this._zr.un(), this._disposeChartList(), this._zr.clear()) : v && v.parentNode.removeChild(v), v = null, this._option = e
                }
            }, restore: function () {
                this._clearEffect(), this._option = n.clone(this._optionRestore), this._disposeChartList(), this._island.clear(), this._toolbox.reset(this._option, !0), this._render(this._option)
            }, refresh: function (t) {
                this._clearEffect(), t = t || {};
                var e = t.option;
                !this._refreshInside && e && (e = this.getOption(), n.merge(e, t.option, !0), n.merge(this._optionRestore, t.option, !0), this._toolbox.reset(e)), this._island.refresh(e), this._toolbox.refresh(e), this._zr.clearAnimation();
                for (var i = 0, r = this._chartList.length; r > i; i++)this._chartList[i].refresh && this._chartList[i].refresh(e);
                this.component.grid && this.component.grid.refixAxisShape(this.component), this._zr.refresh()
            }, _disposeChartList: function () {
                this._clearEffect(), this._zr.clearAnimation();
                for (var t = this._chartList.length; t--;) {
                    var e = this._chartList[t];
                    if (e) {
                        var i = e.type;
                        this.chart[i] && delete this.chart[i], this.component[i] && delete this.component[i], e.dispose && e.dispose()
                    }
                }
                this._chartList = []
            }, _mergeGlobalConifg: function (e) {
                for (var i = ["backgroundColor", "calculable", "calculableColor", "calculableHolderColor", "nameConnector", "valueConnector", "animation", "animationThreshold", "animationDuration", "animationDurationUpdate", "animationEasing", "addDataAnimation", "symbolList", "DRAG_ENABLE_TIME"], r = i.length; r--;) {
                    var n = i[r];
                    null == e[n] && (e[n] = null != this._themeConfig[n] ? this._themeConfig[n] : o[n])
                }
                var s = e.color;
                s && s.length || (s = this._themeConfig.color || o.color), this._zr.getColor = function (e) {
                    var i = t("zrender/tool/color");
                    return i.getColor(e, s)
                }, h || (e.animation = !1, e.addDataAnimation = !1)
            }, setOption: function (t, e) {
                return t.timeline ? this._setTimelineOption(t) : this._setOption(t, e)
            }, _setOption: function (t, e, i) {
                return !e && this._option ? this._option = n.merge(this.getOption(), n.clone(t), !0) : (this._option = n.clone(t), !i && this._timeline && this._timeline.dispose()), this._optionRestore = n.clone(this._option), this._option.series && 0 !== this._option.series.length ? (this.component.dataZoom && (this._option.dataZoom || this._option.toolbox && this._option.toolbox.feature && this._option.toolbox.feature.dataZoom && this._option.toolbox.feature.dataZoom.show) && this.component.dataZoom.syncOption(this._option), this._toolbox.reset(this._option), this._render(this._option), this) : void this._zr.clear()
            }, getOption: function () {
                function t(t) {
                    var r = i._optionRestore[t];
                    if (r)if (r instanceof Array)for (var o = r.length; o--;)e[t][o].data = n.clone(r[o].data); else e[t].data = n.clone(r.data)
                }

                var e = n.clone(this._option), i = this;
                return t("xAxis"), t("yAxis"), t("series"), e
            }, setSeries: function (t, e) {
                return e ? (this._option.series = t, this.setOption(this._option, e)) : this.setOption({series: t}), this
            }, getSeries: function () {
                return this.getOption().series
            }, _setTimelineOption: function (e) {
                this._timeline && this._timeline.dispose();
                var i = t("./component/timeline"), r = new i(this._themeConfig, this._messageCenter, this._zr, e, this);
                return this._timeline = r, this.component.timeline = this._timeline, this
            }, addData: function (t, e, i, r, s) {
                function a() {
                    if (d._zr) {
                        d._zr.clearAnimation();
                        for (var t = 0, e = w.length; e > t; t++)w[t].motionlessOnce = l.addDataAnimation && w[t].addDataAnimation;
                        d._messageCenter.dispatch(o.EVENT.REFRESH, null, {option: l}, d)
                    }
                }

                for (var h = t instanceof Array ? t : [[t, e, i, r, s]], l = this.getOption(), c = this._optionRestore, d = this, u = 0, p = h.length; p > u; u++) {
                    t = h[u][0], e = h[u][1], i = h[u][2], r = h[u][3], s = h[u][4];
                    var f = c.series[t], g = i ? "unshift" : "push", m = i ? "pop" : "shift";
                    if (f) {
                        var _ = f.data, y = l.series[t].data;
                        if (_[g](e), y[g](e), r || (_[m](), e = y[m]()), null != s) {
                            var v, x;
                            if (f.type === o.CHART_TYPE_PIE && (v = c.legend) && (x = v.data)) {
                                var b = l.legend.data;
                                if (x[g](s), b[g](s), !r) {
                                    var T = n.indexOf(x, e.name);
                                    -1 != T && x.splice(T, 1), T = n.indexOf(b, e.name), -1 != T && b.splice(T, 1)
                                }
                            } else if (null != c.xAxis && null != c.yAxis) {
                                var S, C, E = f.xAxisIndex || 0;
                                (null == c.xAxis[E].type || "category" === c.xAxis[E].type) && (S = c.xAxis[E].data, C = l.xAxis[E].data, S[g](s), C[g](s), r || (S[m](), C[m]())), E = f.yAxisIndex || 0, "category" === c.yAxis[E].type && (S = c.yAxis[E].data, C = l.yAxis[E].data, S[g](s), C[g](s), r || (S[m](), C[m]()))
                            }
                        }
                        this._option.series[t].data = l.series[t].data
                    }
                }
                this._zr.clearAnimation();
                for (var w = this._chartList, z = 0, k = function () {
                    z--, 0 === z && a()
                }, u = 0, p = w.length; p > u; u++)l.addDataAnimation && w[u].addDataAnimation && (z++, w[u].addDataAnimation(h, k));
                return this.component.dataZoom && this.component.dataZoom.syncOption(l), this._option = l, l.addDataAnimation || setTimeout(a, 0), this
            }, addMarkPoint: function (t, e) {
                return this._addMark(t, e, "markPoint")
            }, addMarkLine: function (t, e) {
                return this._addMark(t, e, "markLine")
            }, _addMark: function (t, e, i) {
                var r, o = this._option.series;
                if (o && (r = o[t])) {
                    var s = this._optionRestore.series, a = s[t], h = r[i], l = a[i];
                    h = r[i] = h || {data: []}, l = a[i] = l || {data: []};
                    for (var c in e)"data" === c ? (h.data = h.data.concat(e.data), l.data = l.data.concat(e.data)) : "object" != typeof e[c] || null == h[c] ? h[c] = l[c] = e[c] : (n.merge(h[c], e[c], !0), n.merge(l[c], e[c], !0));
                    var d = this.chart[r.type];
                    d && d.addMark(t, e, i)
                }
                return this
            }, delMarkPoint: function (t, e) {
                return this._delMark(t, e, "markPoint")
            }, delMarkLine: function (t, e) {
                return this._delMark(t, e, "markLine")
            }, _delMark: function (t, e, i) {
                var r, o, n, s = this._option.series;
                if (!(s && (r = s[t]) && (o = r[i]) && (n = o.data)))return this;
                e = e.split(" > ");
                for (var a = -1, h = 0, l = n.length; l > h; h++) {
                    var c = n[h];
                    if (c instanceof Array) {
                        if (c[0].name === e[0] && c[1].name === e[1]) {
                            a = h;
                            break
                        }
                    } else if (c.name === e[0]) {
                        a = h;
                        break
                    }
                }
                if (a > -1) {
                    n.splice(a, 1), this._optionRestore.series[t][i].data.splice(a, 1);
                    var d = this.chart[r.type];
                    d && d.delMark(t, e.join(" > "), i)
                }
                return this
            }, getDom: function () {
                return this.dom
            }, getZrender: function () {
                return this._zr
            }, getDataURL: function (t) {
                if (!h)return "";
                if (0 === this._chartList.length) {
                    var e = "IMG" + this.id, i = document.getElementById(e);
                    if (i)return i.src
                }
                var r = this.component.tooltip;
                switch (r && r.hideTip(), t) {
                    case"jpeg":
                        break;
                    default:
                        t = "png"
                }
                var o = this._option.backgroundColor;
                return o && "rgba(0,0,0,0)" === o.replace(" ", "") && (o = "#fff"), this._zr.toDataURL("image/" + t, o)
            }, getImage: function (t) {
                var e = this._optionRestore.title, i = document.createElement("img");
                return i.src = this.getDataURL(t), i.title = e && e.text || "ECharts", i
            }, getConnectedDataURL: function (e) {
                if (!this.isConnected())return this.getDataURL(e);
                var i = this.dom, r = {
                    self: {
                        img: this.getDataURL(e),
                        left: i.offsetLeft,
                        top: i.offsetTop,
                        right: i.offsetLeft + i.offsetWidth,
                        bottom: i.offsetTop + i.offsetHeight
                    }
                }, o = r.self.left, n = r.self.top, s = r.self.right, a = r.self.bottom;
                for (var h in this._connected)i = this._connected[h].getDom(), r[h] = {
                    img: this._connected[h].getDataURL(e),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight
                }, o = Math.min(o, r[h].left), n = Math.min(n, r[h].top), s = Math.max(s, r[h].right), a = Math.max(a, r[h].bottom);
                var l = document.createElement("div");
                l.style.position = "absolute", l.style.left = "-4000px", l.style.width = s - o + "px", l.style.height = a - n + "px", document.body.appendChild(l);
                var c = t("zrender").init(l), d = t("zrender/shape/Image");
                for (var h in r)c.addShape(new d({style: {x: r[h].left - o, y: r[h].top - n, image: r[h].img}}));
                c.render();
                var u = this._option.backgroundColor;
                u && "rgba(0,0,0,0)" === u.replace(/ /g, "") && (u = "#fff");
                var p = c.toDataURL("image/png", u);
                return setTimeout(function () {
                    c.dispose(), l.parentNode.removeChild(l), l = null
                }, 100), p
            }, getConnectedImage: function (t) {
                var e = this._optionRestore.title, i = document.createElement("img");
                return i.src = this.getConnectedDataURL(t), i.title = e && e.text || "ECharts", i
            }, on: function (t, e) {
                return this._messageCenterOutSide.bind(t, e, this), this
            }, un: function (t, e) {
                return this._messageCenterOutSide.unbind(t, e), this
            }, connect: function (t) {
                if (!t)return this;
                if (this._connected || (this._connected = {}), t instanceof Array)for (var e = 0, i = t.length; i > e; e++)this._connected[t[e].id] = t[e]; else this._connected[t.id] = t;
                return this
            }, disConnect: function (t) {
                if (!t || !this._connected)return this;
                if (t instanceof Array)for (var e = 0, i = t.length; i > e; e++)delete this._connected[t[e].id]; else delete this._connected[t.id];
                for (var r in this._connected)return this;
                return this._connected = !1, this
            }, connectedEventHandler: function (t) {
                t.__echartsId != this.id && this._onevent(t)
            }, isConnected: function () {
                return !!this._connected
            }, showLoading: function (e) {
                var i = {
                    bar: t("zrender/loadingEffect/Bar"),
                    bubble: t("zrender/loadingEffect/Bubble"),
                    dynamicLine: t("zrender/loadingEffect/DynamicLine"),
                    ring: t("zrender/loadingEffect/Ring"),
                    spin: t("zrender/loadingEffect/Spin"),
                    whirling: t("zrender/loadingEffect/Whirling")
                };
                this._toolbox.hideDataView(), e = e || {};
                var r = e.textStyle || {};
                e.textStyle = r;
                var s = n.merge(n.merge(n.clone(r), this._themeConfig.textStyle), o.textStyle);
                r.textFont = s.fontStyle + " " + s.fontWeight + " " + s.fontSize + "px " + s.fontFamily, r.text = e.text || this._option && this._option.loadingText || this._themeConfig.loadingText || o.loadingText, null != e.x && (r.x = e.x), null != e.y && (r.y = e.y), e.effectOption = e.effectOption || {}, e.effectOption.textStyle = r;
                var a = e.effect;
                return ("string" == typeof a || null == a) && (a = i[e.effect || this._option && this._option.loadingEffect || this._themeConfig.loadingEffect || o.loadingEffect] || i.spin), this._zr.showLoading(new a(e.effectOption)), this
            }, hideLoading: function () {
                return this._zr.hideLoading(), this
            }, setTheme: function (e) {
                if (e) {
                    if ("string" == typeof e)switch (e) {
                        case"macarons":
                            e = t("./theme/macarons");
                            break;
                        case"infographic":
                            e = t("./theme/infographic");
                            break;
                        default:
                            e = {}
                    } else e = e || {};
                    this._themeConfig = e
                }
                if (!h) {
                    var i = this._themeConfig.textStyle;
                    i && i.fontFamily && i.fontFamily2 && (i.fontFamily = i.fontFamily2), i = o.textStyle, i.fontFamily = i.fontFamily2
                }
                this._timeline && this._timeline.setTheme(!0), this._optionRestore && this.restore()
            }, resize: function () {
                var t = this;
                return function () {
                    if (t._clearEffect(), t._zr.resize(), t._option && t._option.renderAsImage && h)return t._render(t._option), t;
                    t._zr.clearAnimation(), t._island.resize(), t._toolbox.resize(), t._timeline && t._timeline.resize();
                    for (var e = 0, i = t._chartList.length; i > e; e++)t._chartList[e].resize && t._chartList[e].resize();
                    return t.component.grid && t.component.grid.refixAxisShape(t.component), t._zr.refresh(), t._messageCenter.dispatch(o.EVENT.RESIZE, null, null, t), t
                }
            }, _clearEffect: function () {
                this._zr.modLayer(o.EFFECT_ZLEVEL, {motionBlur: !1}), this._zr.painter.clearLayer(o.EFFECT_ZLEVEL)
            }, clear: function () {
                return this._disposeChartList(), this._zr.clear(), this._option = {}, this._optionRestore = {}, this.dom.style.backgroundColor = null, this
            }, dispose: function () {
                var t = this.dom.getAttribute(d);
                t && delete c[t], this._island.dispose(), this._toolbox.dispose(), this._timeline && this._timeline.dispose(), this._messageCenter.unbind(), this.clear(), this._zr.dispose(), this._zr = null
            }
        }, a
    }), i("zrender/shape/Circle", ["require", "./Base", "../tool/util"], function (t) {
        "use strict";
        var e = t("./Base"), i = function (t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "circle", buildPath: function (t, e) {
                t.moveTo(e.x + e.r, e.y), t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !0)
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                }, t.__rect
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("zrender/shape/Ring", ["require", "./Base", "../tool/util"], function (t) {
        var e = t("./Base"), i = function (t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "ring", buildPath: function (t, e) {
                t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !1), t.moveTo(e.x + e.r0, e.y), t.arc(e.x, e.y, e.r0, 0, 2 * Math.PI, !0)
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                }, t.__rect
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("zrender/shape/Sector", ["require", "../tool/math", "../tool/computeBoundingBox", "../tool/vector", "./Base", "../tool/util"], function (t) {
        var e = t("../tool/math"), i = t("../tool/computeBoundingBox"), r = t("../tool/vector"), o = t("./Base"), n = r.create(), s = r.create(), a = r.create(), h = r.create(), l = function (t) {
            o.call(this, t)
        };
        return l.prototype = {
            type: "sector", buildPath: function (t, i) {
                var r = i.x, o = i.y, n = i.r0 || 0, s = i.r, a = i.startAngle, h = i.endAngle, l = i.clockWise || !1;
                a = e.degreeToRadian(a), h = e.degreeToRadian(h), l || (a = -a, h = -h);
                var c = e.cos(a), d = e.sin(a);
                t.moveTo(c * n + r, d * n + o), t.lineTo(c * s + r, d * s + o), t.arc(r, o, s, a, h, !l), t.lineTo(e.cos(h) * n + r, e.sin(h) * n + o), 0 !== n && t.arc(r, o, n, h, a, l), t.closePath()
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var o = t.x, l = t.y, c = t.r0 || 0, d = t.r, u = e.degreeToRadian(t.startAngle), p = e.degreeToRadian(t.endAngle), f = t.clockWise;
                return f || (u = -u, p = -p), c > 1 ? i.arc(o, l, c, u, p, !f, n, a) : (n[0] = a[0] = o, n[1] = a[1] = l), i.arc(o, l, d, u, p, !f, s, h), r.min(n, n, s), r.max(a, a, h), t.__rect = {
                    x: n[0],
                    y: n[1],
                    width: a[0] - n[0],
                    height: a[1] - n[1]
                }, t.__rect
            }
        }, t("../tool/util").inherits(l, o), l
    }), i("zrender/shape/Polyline", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "./Polygon", "../tool/util"], function (t) {
        var e = t("./Base"), i = t("./util/smoothSpline"), r = t("./util/smoothBezier"), o = t("./util/dashedLineTo"), n = function (t) {
            this.brushTypeOnly = "stroke", this.textPosition = "end", e.call(this, t)
        };
        return n.prototype = {
            type: "polyline", buildPath: function (t, e) {
                var r = e.pointList;
                if (!(r.length < 2)) {
                    var n = Math.min(e.pointList.length, Math.round(e.pointListLength || e.pointList.length));
                    if (e.smooth && "spline" !== e.smooth) {
                        e.controlPointList || this.updateControlPoints(e);
                        var s = e.controlPointList;
                        t.moveTo(r[0][0], r[0][1]);
                        for (var a, h, l, c = 0; n - 1 > c; c++)a = s[2 * c], h = s[2 * c + 1], l = r[c + 1], t.bezierCurveTo(a[0], a[1], h[0], h[1], l[0], l[1])
                    } else if ("spline" === e.smooth && (r = i(r), n = r.length), e.lineType && "solid" != e.lineType) {
                        if ("dashed" == e.lineType || "dotted" == e.lineType) {
                            var d = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                            t.moveTo(r[0][0], r[0][1]);
                            for (var c = 1; n > c; c++)o(t, r[c - 1][0], r[c - 1][1], r[c][0], r[c][1], d)
                        }
                    } else {
                        t.moveTo(r[0][0], r[0][1]);
                        for (var c = 1; n > c; c++)t.lineTo(r[c][0], r[c][1])
                    }
                }
            }, updateControlPoints: function (t) {
                t.controlPointList = r(t.pointList, t.smooth, !1, t.smoothConstraint)
            }, getRect: function (e) {
                return t("./Polygon").prototype.getRect(e)
            }
        }, t("../tool/util").inherits(n, e), n
    }), i("echarts/config", [], function () {
        var t = {
            CHART_TYPE_LINE: "line",
            CHART_TYPE_BAR: "bar",
            CHART_TYPE_SCATTER: "scatter",
            CHART_TYPE_PIE: "pie",
            CHART_TYPE_RADAR: "radar",
            CHART_TYPE_VENN: "venn",
            CHART_TYPE_TREEMAP: "treemap",
            CHART_TYPE_TREE: "tree",
            CHART_TYPE_MAP: "map",
            CHART_TYPE_K: "k",
            CHART_TYPE_ISLAND: "island",
            CHART_TYPE_FORCE: "force",
            CHART_TYPE_CHORD: "chord",
            CHART_TYPE_GAUGE: "gauge",
            CHART_TYPE_FUNNEL: "funnel",
            CHART_TYPE_EVENTRIVER: "eventRiver",
            CHART_TYPE_WORDCLOUD: "wordCloud",
            CHART_TYPE_HEATMAP: "heatmap",
            COMPONENT_TYPE_TITLE: "title",
            COMPONENT_TYPE_LEGEND: "legend",
            COMPONENT_TYPE_DATARANGE: "dataRange",
            COMPONENT_TYPE_DATAVIEW: "dataView",
            COMPONENT_TYPE_DATAZOOM: "dataZoom",
            COMPONENT_TYPE_TOOLBOX: "toolbox",
            COMPONENT_TYPE_TOOLTIP: "tooltip",
            COMPONENT_TYPE_GRID: "grid",
            COMPONENT_TYPE_AXIS: "axis",
            COMPONENT_TYPE_POLAR: "polar",
            COMPONENT_TYPE_X_AXIS: "xAxis",
            COMPONENT_TYPE_Y_AXIS: "yAxis",
            COMPONENT_TYPE_AXIS_CATEGORY: "categoryAxis",
            COMPONENT_TYPE_AXIS_VALUE: "valueAxis",
            COMPONENT_TYPE_TIMELINE: "timeline",
            COMPONENT_TYPE_ROAMCONTROLLER: "roamController",
            backgroundColor: "rgba(0,0,0,0)",
            color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
            markPoint: {
                clickable: !0,
                symbol: "pin",
                symbolSize: 10,
                large: !1,
                effect: {show: !1, loop: !0, period: 15, type: "scale", scaleSize: 2, bounceDistance: 10},
                itemStyle: {
                    normal: {borderWidth: 2, label: {show: !0, position: "inside"}},
                    emphasis: {label: {show: !0}}
                }
            },
            markLine: {
                clickable: !0,
                symbol: ["circle", "arrow"],
                symbolSize: [2, 4],
                smoothness: .2,
                precision: 2,
                effect: {show: !1, loop: !0, period: 15, scaleSize: 2},
                bundling: {enable: !1, maxTurningAngle: 45},
                itemStyle: {
                    normal: {borderWidth: 1.5, label: {show: !0, position: "end"}, lineStyle: {type: "dashed"}},
                    emphasis: {label: {show: !1}, lineStyle: {}}
                }
            },
            textStyle: {
                decoration: "none",
                fontFamily: "Arial, Verdana, sans-serif",
                fontFamily2: "微软雅黑",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            EVENT: {
                REFRESH: "refresh",
                RESTORE: "restore",
                RESIZE: "resize",
                CLICK: "click",
                DBLCLICK: "dblclick",
                HOVER: "hover",
                MOUSEOUT: "mouseout",
                DATA_CHANGED: "dataChanged",
                DATA_ZOOM: "dataZoom",
                DATA_RANGE: "dataRange",
                DATA_RANGE_SELECTED: "dataRangeSelected",
                DATA_RANGE_HOVERLINK: "dataRangeHoverLink",
                LEGEND_SELECTED: "legendSelected",
                LEGEND_HOVERLINK: "legendHoverLink",
                MAP_SELECTED: "mapSelected",
                PIE_SELECTED: "pieSelected",
                MAGIC_TYPE_CHANGED: "magicTypeChanged",
                DATA_VIEW_CHANGED: "dataViewChanged",
                TIMELINE_CHANGED: "timelineChanged",
                MAP_ROAM: "mapRoam",
                FORCE_LAYOUT_END: "forceLayoutEnd",
                TOOLTIP_HOVER: "tooltipHover",
                TOOLTIP_IN_GRID: "tooltipInGrid",
                TOOLTIP_OUT_GRID: "tooltipOutGrid",
                ROAMCONTROLLER: "roamController"
            },
            DRAG_ENABLE_TIME: 120,
            EFFECT_ZLEVEL: 10,
            effectBlendAlpha: .95,
            symbolList: ["circle", "rectangle", "triangle", "diamond", "emptyCircle", "emptyRectangle", "emptyTriangle", "emptyDiamond"],
            loadingEffect: "spin",
            loadingText: "数据读取中...",
            noDataEffect: "bubble",
            noDataText: "暂无数据",
            calculable: !1,
            calculableColor: "rgba(255,165,0,0.6)",
            calculableHolderColor: "#ccc",
            nameConnector: " & ",
            valueConnector: ": ",
            animation: !0,
            addDataAnimation: !0,
            animationThreshold: 2e3,
            animationDuration: 2e3,
            animationDurationUpdate: 500,
            animationEasing: "ExponentialOut"
        };
        return t
    }), i("echarts/util/ecData", [], function () {
        function t(t, e, i, r, o, n, s, a) {
            var h;
            return "undefined" != typeof r && (h = null == r.value ? r : r.value), t._echartsData = {
                _series: e,
                _seriesIndex: i,
                _data: r,
                _dataIndex: o,
                _name: n,
                _value: h,
                _special: s,
                _special2: a
            }, t._echartsData
        }

        function e(t, e) {
            var i = t._echartsData;
            if (!e)return i;
            switch (e) {
                case"series":
                case"seriesIndex":
                case"data":
                case"dataIndex":
                case"name":
                case"value":
                case"special":
                case"special2":
                    return i && i["_" + e]
            }
            return null
        }

        function i(t, e, i) {
            switch (t._echartsData = t._echartsData || {}, e) {
                case"series":
                case"seriesIndex":
                case"data":
                case"dataIndex":
                case"name":
                case"value":
                case"special":
                case"special2":
                    t._echartsData["_" + e] = i
            }
        }

        function r(t, e) {
            e._echartsData = {
                _series: t._echartsData._series,
                _seriesIndex: t._echartsData._seriesIndex,
                _data: t._echartsData._data,
                _dataIndex: t._echartsData._dataIndex,
                _name: t._echartsData._name,
                _value: t._echartsData._value,
                _special: t._echartsData._special,
                _special2: t._echartsData._special2
            }
        }

        return {pack: t, set: i, get: e, clone: r}
    }), i("zrender/shape/Text", ["require", "../tool/area", "./Base", "../tool/util"], function (t) {
        var e = t("../tool/area"), i = t("./Base"), r = function (t) {
            i.call(this, t)
        };
        return r.prototype = {
            type: "text", brush: function (t, i) {
                var r = this.style;
                if (i && (r = this.getHighlightStyle(r, this.highlightStyle || {})), "undefined" != typeof r.text && r.text !== !1) {
                    t.save(), this.doClip(t), this.setContext(t, r), this.setTransform(t), r.textFont && (t.font = r.textFont), t.textAlign = r.textAlign || "start", t.textBaseline = r.textBaseline || "middle";
                    var o, n = (r.text + "").split("\n"), s = e.getTextHeight("国", r.textFont), a = this.getRect(r), h = r.x;
                    o = "top" == r.textBaseline ? a.y : "bottom" == r.textBaseline ? a.y + s : a.y + s / 2;
                    for (var l = 0, c = n.length; c > l; l++) {
                        if (r.maxWidth)switch (r.brushType) {
                            case"fill":
                                t.fillText(n[l], h, o, r.maxWidth);
                                break;
                            case"stroke":
                                t.strokeText(n[l], h, o, r.maxWidth);
                                break;
                            case"both":
                                t.fillText(n[l], h, o, r.maxWidth), t.strokeText(n[l], h, o, r.maxWidth);
                                break;
                            default:
                                t.fillText(n[l], h, o, r.maxWidth)
                        } else switch (r.brushType) {
                            case"fill":
                                t.fillText(n[l], h, o);
                                break;
                            case"stroke":
                                t.strokeText(n[l], h, o);
                                break;
                            case"both":
                                t.fillText(n[l], h, o), t.strokeText(n[l], h, o);
                                break;
                            default:
                                t.fillText(n[l], h, o)
                        }
                        o += s
                    }
                    t.restore()
                }
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var i = e.getTextWidth(t.text, t.textFont), r = e.getTextHeight(t.text, t.textFont), o = t.x;
                "end" == t.textAlign || "right" == t.textAlign ? o -= i : "center" == t.textAlign && (o -= i / 2);
                var n;
                return n = "top" == t.textBaseline ? t.y : "bottom" == t.textBaseline ? t.y - r : t.y - r / 2, t.__rect = {
                    x: o,
                    y: n,
                    width: i,
                    height: r
                }, t.__rect
            }
        }, t("../tool/util").inherits(r, i), r
    }), i("echarts/chart/base", ["require", "zrender/shape/Image", "../util/shape/Icon", "../util/shape/MarkLine", "../util/shape/Symbol", "zrender/shape/Polyline", "zrender/shape/ShapeBundle", "../config", "../util/ecData", "../util/ecAnimation", "../util/ecEffect", "../util/accMath", "../component/base", "../layout/EdgeBundling", "zrender/tool/util", "zrender/tool/area"], function (t) {
        function e(t) {
            return null != t.x && null != t.y
        }

        function i(t, e, i, r, o) {
            f.call(this, t, e, i, r, o);
            var n = this;
            this.selectedMap = {}, this.lastShapeList = [], this.shapeHandler = {
                onclick: function () {
                    n.isClick = !0
                }, ondragover: function (t) {
                    var e = t.target;
                    e.highlightStyle = e.highlightStyle || {};
                    var i = e.highlightStyle, r = i.brushTyep, o = i.strokeColor, s = i.lineWidth;
                    i.brushType = "stroke", i.strokeColor = n.ecTheme.calculableColor || l.calculableColor, i.lineWidth = "icon" === e.type ? 30 : 10, n.zr.addHoverShape(e), setTimeout(function () {
                        i && (i.brushType = r, i.strokeColor = o, i.lineWidth = s)
                    }, 20)
                }, ondrop: function (t) {
                    null != c.get(t.dragged, "data") && (n.isDrop = !0)
                }, ondragend: function () {
                    n.isDragend = !0
                }
            }
        }

        var r = t("zrender/shape/Image"), o = t("../util/shape/Icon"), n = t("../util/shape/MarkLine"), s = t("../util/shape/Symbol"), a = t("zrender/shape/Polyline"), h = t("zrender/shape/ShapeBundle"), l = t("../config"), c = t("../util/ecData"), d = t("../util/ecAnimation"), u = t("../util/ecEffect"), p = t("../util/accMath"), f = t("../component/base"), g = t("../layout/EdgeBundling"), m = t("zrender/tool/util"), _ = t("zrender/tool/area");
        return i.prototype = {
            setCalculable: function (t) {
                return t.dragEnableTime = this.ecTheme.DRAG_ENABLE_TIME || l.DRAG_ENABLE_TIME, t.ondragover = this.shapeHandler.ondragover, t.ondragend = this.shapeHandler.ondragend, t.ondrop = this.shapeHandler.ondrop, t
            }, ondrop: function (t, e) {
                if (this.isDrop && t.target && !e.dragIn) {
                    var i, r = t.target, o = t.dragged, n = c.get(r, "seriesIndex"), s = c.get(r, "dataIndex"), a = this.series, h = this.component.legend;
                    if (-1 === s) {
                        if (c.get(o, "seriesIndex") == n)return e.dragOut = e.dragIn = e.needRefresh = !0, void(this.isDrop = !1);
                        i = {
                            value: c.get(o, "value"),
                            name: c.get(o, "name")
                        }, this.type === l.CHART_TYPE_PIE && i.value < 0 && (i.value = 0);
                        for (var d = !1, u = a[n].data, f = 0, g = u.length; g > f; f++)u[f].name === i.name && "-" === u[f].value && (a[n].data[f].value = i.value, d = !0);
                        !d && a[n].data.push(i), h && h.add(i.name, o.style.color || o.style.strokeColor)
                    } else i = a[n].data[s] || "-", null != i.value ? (a[n].data[s].value = "-" != i.value ? p.accAdd(a[n].data[s].value, c.get(o, "value")) : c.get(o, "value"), (this.type === l.CHART_TYPE_FUNNEL || this.type === l.CHART_TYPE_PIE) && (h && 1 === h.getRelatedAmount(i.name) && this.component.legend.del(i.name), i.name += this.option.nameConnector + c.get(o, "name"), h && h.add(i.name, o.style.color || o.style.strokeColor))) : a[n].data[s] = "-" != i ? p.accAdd(a[n].data[s], c.get(o, "value")) : c.get(o, "value");
                    e.dragIn = e.dragIn || !0, this.isDrop = !1;
                    var m = this;
                    setTimeout(function () {
                        m.zr.trigger("mousemove", t.event)
                    }, 300)
                }
            }, ondragend: function (t, e) {
                if (this.isDragend && t.target && !e.dragOut) {
                    var i = t.target, r = c.get(i, "seriesIndex"), o = c.get(i, "dataIndex"), n = this.series;
                    if (null != n[r].data[o].value) {
                        n[r].data[o].value = "-";
                        var s = n[r].data[o].name, a = this.component.legend;
                        a && 0 === a.getRelatedAmount(s) && a.del(s)
                    } else n[r].data[o] = "-";
                    e.dragOut = !0, e.needRefresh = !0, this.isDragend = !1
                }
            }, onlegendSelected: function (t, e) {
                var i = t.selected;
                for (var r in this.selectedMap)this.selectedMap[r] != i[r] && (e.needRefresh = !0), this.selectedMap[r] = i[r]
            }, _buildPosition: function () {
                this._symbol = this.option.symbolList, this._sIndex2ShapeMap = {}, this._sIndex2ColorMap = {}, this.selectedMap = {}, this.xMarkMap = {};
                for (var t, e, i, r, o = this.series, n = {
                    top: [],
                    bottom: [],
                    left: [],
                    right: [],
                    other: []
                }, s = 0, a = o.length; a > s; s++)o[s].type === this.type && (o[s] = this.reformOption(o[s]), this.legendHoverLink = o[s].legendHoverLink || this.legendHoverLink, t = o[s].xAxisIndex, e = o[s].yAxisIndex, i = this.component.xAxis.getAxis(t), r = this.component.yAxis.getAxis(e), i.type === l.COMPONENT_TYPE_AXIS_CATEGORY ? n[i.getPosition()].push(s) : r.type === l.COMPONENT_TYPE_AXIS_CATEGORY ? n[r.getPosition()].push(s) : n.other.push(s));
                for (var h in n)n[h].length > 0 && this._buildSinglePosition(h, n[h]);
                this.addShapeList()
            }, _buildSinglePosition: function (t, e) {
                var i = this._mapData(e), r = i.locationMap, o = i.maxDataLength;
                if (0 !== o && 0 !== r.length) {
                    switch (t) {
                        case"bottom":
                        case"top":
                            this._buildHorizontal(e, o, r, this.xMarkMap);
                            break;
                        case"left":
                        case"right":
                            this._buildVertical(e, o, r, this.xMarkMap);
                            break;
                        case"other":
                            this._buildOther(e, o, r, this.xMarkMap)
                    }
                    for (var n = 0, s = e.length; s > n; n++)this.buildMark(e[n])
                }
            }, _mapData: function (t) {
                for (var e, i, r, o, n = this.series, s = 0, a = {}, h = "__kener__stack__", c = this.component.legend, d = [], u = 0, p = 0, f = t.length; f > p; p++) {
                    if (e = n[t[p]], r = e.name, this._sIndex2ShapeMap[t[p]] = this._sIndex2ShapeMap[t[p]] || this.query(e, "symbol") || this._symbol[p % this._symbol.length], c) {
                        if (this.selectedMap[r] = c.isSelected(r), this._sIndex2ColorMap[t[p]] = c.getColor(r), o = c.getItemShape(r)) {
                            var g = o.style;
                            if (this.type == l.CHART_TYPE_LINE)g.iconType = "legendLineIcon", g.symbol = this._sIndex2ShapeMap[t[p]]; else if (e.itemStyle.normal.barBorderWidth > 0) {
                                var m = o.highlightStyle;
                                g.brushType = "both", g.x += 1, g.y += 1, g.width -= 2, g.height -= 2, g.strokeColor = m.strokeColor = e.itemStyle.normal.barBorderColor, m.lineWidth = 3
                            }
                            c.setItemShape(r, o)
                        }
                    } else this.selectedMap[r] = !0, this._sIndex2ColorMap[t[p]] = this.zr.getColor(t[p]);
                    this.selectedMap[r] && (i = e.stack || h + t[p], null == a[i] ? (a[i] = s, d[s] = [t[p]], s++) : d[a[i]].push(t[p])), u = Math.max(u, e.data.length)
                }
                return {locationMap: d, maxDataLength: u}
            }, _calculMarkMapXY: function (t, e, i) {
                for (var r = this.series, o = 0, n = e.length; n > o; o++)for (var s = 0, a = e[o].length; a > s; s++) {
                    var h = e[o][s], l = "xy" == i ? 0 : "", c = this.component.grid, d = t[h];
                    if ("-1" != i.indexOf("x")) {
                        d["counter" + l] > 0 && (d["average" + l] = d["sum" + l] / d["counter" + l]);
                        var u = this.component.xAxis.getAxis(r[h].xAxisIndex || 0).getCoord(d["average" + l]);
                        d["averageLine" + l] = [[u, c.getYend()], [u, c.getY()]], d["minLine" + l] = [[d["minX" + l], c.getYend()], [d["minX" + l], c.getY()]], d["maxLine" + l] = [[d["maxX" + l], c.getYend()], [d["maxX" + l], c.getY()]], d.isHorizontal = !1
                    }
                    if (l = "xy" == i ? 1 : "", "-1" != i.indexOf("y")) {
                        d["counter" + l] > 0 && (d["average" + l] = d["sum" + l] / d["counter" + l]);
                        var p = this.component.yAxis.getAxis(r[h].yAxisIndex || 0).getCoord(d["average" + l]);
                        d["averageLine" + l] = [[c.getX(), p], [c.getXend(), p]], d["minLine" + l] = [[c.getX(), d["minY" + l]], [c.getXend(), d["minY" + l]]], d["maxLine" + l] = [[c.getX(), d["maxY" + l]], [c.getXend(), d["maxY" + l]]], d.isHorizontal = !0
                    }
                }
            }, addLabel: function (t, e, i, r, o) {
                var n = [i, e], s = this.deepMerge(n, "itemStyle.normal.label"), a = this.deepMerge(n, "itemStyle.emphasis.label"), h = s.textStyle || {}, l = a.textStyle || {};
                if (s.show) {
                    var c = t.style;
                    c.text = this._getLabelText(e, i, r, "normal"), c.textPosition = null == s.position ? "horizontal" === o ? "right" : "top" : s.position, c.textColor = h.color, c.textFont = this.getFont(h), c.textAlign = h.align, c.textBaseline = h.baseline
                }
                if (a.show) {
                    var d = t.highlightStyle;
                    d.text = this._getLabelText(e, i, r, "emphasis"), d.textPosition = s.show ? t.style.textPosition : null == a.position ? "horizontal" === o ? "right" : "top" : a.position, d.textColor = l.color, d.textFont = this.getFont(l), d.textAlign = l.align, d.textBaseline = l.baseline
                }
                return t
            }, _getLabelText: function (t, e, i, r) {
                var o = this.deepQuery([e, t], "itemStyle." + r + ".label.formatter");
                o || "emphasis" !== r || (o = this.deepQuery([e, t], "itemStyle.normal.label.formatter"));
                var n = this.getDataFromOption(e, "-");
                return o ? "function" == typeof o ? o.call(this.myChart, {
                    seriesName: t.name,
                    series: t,
                    name: i,
                    value: n,
                    data: e,
                    status: r
                }) : "string" == typeof o ? o = o.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{a0}", t.name).replace("{b0}", i).replace("{c0}", this.numAddCommas(n)) : void 0 : n instanceof Array ? null != n[2] ? this.numAddCommas(n[2]) : n[0] + " , " + n[1] : this.numAddCommas(n)
            }, buildMark: function (t) {
                var e = this.series[t];
                this.selectedMap[e.name] && (e.markLine && this._buildMarkLine(t), e.markPoint && this._buildMarkPoint(t))
            }, _buildMarkPoint: function (t) {
                for (var e, i, r = (this.markAttachStyle || {})[t], o = this.series[t], n = m.clone(o.markPoint), s = 0, a = n.data.length; a > s; s++)e = n.data[s], i = this.getMarkCoord(t, e), e.x = null != e.x ? e.x : i[0], e.y = null != e.y ? e.y : i[1], !e.type || "max" !== e.type && "min" !== e.type || (e.value = i[3], e.name = e.name || e.type, e.symbolSize = e.symbolSize || _.getTextWidth(i[3], this.getFont()) / 2 + 5);
                for (var h = this._markPoint(t, n), s = 0, a = h.length; a > s; s++) {
                    var c = h[s];
                    c.zlevel = o.zlevel, c.z = o.z + 1;
                    for (var d in r)c[d] = m.clone(r[d]);
                    this.shapeList.push(c)
                }
                if (this.type === l.CHART_TYPE_FORCE || this.type === l.CHART_TYPE_CHORD)for (var s = 0, a = h.length; a > s; s++)this.zr.addShape(h[s])
            }, _buildMarkLine: function (t) {
                for (var e, i = (this.markAttachStyle || {})[t], r = this.series[t], o = m.clone(r.markLine), n = 0, s = o.data.length; s > n; n++) {
                    var a = o.data[n];
                    !a.type || "max" !== a.type && "min" !== a.type && "average" !== a.type ? e = [this.getMarkCoord(t, a[0]), this.getMarkCoord(t, a[1])] : (e = this.getMarkCoord(t, a), o.data[n] = [m.clone(a), {}], o.data[n][0].name = a.name || a.type, o.data[n][0].value = "average" !== a.type ? e[3] : +e[3].toFixed(null != o.precision ? o.precision : this.deepQuery([this.ecTheme, l], "markLine.precision")), e = e[2], a = [{}, {}]), null != e && null != e[0] && null != e[1] && (o.data[n][0].x = null != a[0].x ? a[0].x : e[0][0], o.data[n][0].y = null != a[0].y ? a[0].y : e[0][1], o.data[n][1].x = null != a[1].x ? a[1].x : e[1][0], o.data[n][1].y = null != a[1].y ? a[1].y : e[1][1])
                }
                var c = this._markLine(t, o), d = o.large;
                if (d) {
                    var u = new h({style: {shapeList: c}}), p = c[0];
                    if (p) {
                        m.merge(u.style, p.style), m.merge(u.highlightStyle = {}, p.highlightStyle), u.style.brushType = "stroke", u.zlevel = r.zlevel, u.z = r.z + 1, u.hoverable = !1;
                        for (var f in i)u[f] = m.clone(i[f])
                    }
                    this.shapeList.push(u), this.zr.addShape(u), u._mark = "largeLine";
                    var g = o.effect;
                    g.show && (u.effect = g)
                } else {
                    for (var n = 0, s = c.length; s > n; n++) {
                        var _ = c[n];
                        _.zlevel = r.zlevel, _.z = r.z + 1;
                        for (var f in i)_[f] = m.clone(i[f]);
                        this.shapeList.push(_)
                    }
                    if (this.type === l.CHART_TYPE_FORCE || this.type === l.CHART_TYPE_CHORD)for (var n = 0, s = c.length; s > n; n++)this.zr.addShape(c[n])
                }
            }, _markPoint: function (t, e) {
                var i = this.series[t], r = this.component;
                m.merge(m.merge(e, m.clone(this.ecTheme.markPoint || {})), m.clone(l.markPoint)), e.name = i.name;
                var o, n, s, a, h, d, u, p = [], f = e.data, g = r.dataRange, _ = r.legend, y = this.zr.getWidth(), v = this.zr.getHeight();
                if (e.large)o = this.getLargeMarkPointShape(t, e), o._mark = "largePoint", o && p.push(o); else for (var x = 0, b = f.length; b > x; x++)null != f[x].x && null != f[x].y && (s = null != f[x].value ? f[x].value : "", _ && (n = _.getColor(i.name)), g && (n = isNaN(s) ? n : g.getColor(s), a = [f[x], e], h = this.deepQuery(a, "itemStyle.normal.color") || n, d = this.deepQuery(a, "itemStyle.emphasis.color") || h, null == h && null == d) || (n = null == n ? this.zr.getColor(t) : n, f[x].tooltip = f[x].tooltip || e.tooltip || {trigger: "item"}, f[x].name = null != f[x].name ? f[x].name : "", f[x].value = s, o = this.getSymbolShape(e, t, f[x], x, f[x].name, this.parsePercent(f[x].x, y), this.parsePercent(f[x].y, v), "pin", n, "rgba(0,0,0,0)", "horizontal"), o._mark = "point", u = this.deepMerge([f[x], e], "effect"), u.show && (o.effect = u), i.type === l.CHART_TYPE_MAP && (o._geo = this.getMarkGeo(f[x])), c.pack(o, i, t, f[x], x, f[x].name, s), p.push(o)));
                return p
            }, _markLine: function () {
                function t(t, e) {
                    t[e] = t[e]instanceof Array ? t[e].length > 1 ? t[e] : [t[e][0], t[e][0]] : [t[e], t[e]]
                }

                return function (i, r) {
                    var o = this.series[i], n = this.component, s = n.dataRange, a = n.legend;
                    m.merge(m.merge(r, m.clone(this.ecTheme.markLine || {})), m.clone(l.markLine));
                    var h = a ? a.getColor(o.name) : this.zr.getColor(i);
                    t(r, "symbol"), t(r, "symbolSize"), t(r, "symbolRotate");
                    for (var d = r.data, u = [], p = this.zr.getWidth(), f = this.zr.getHeight(), _ = 0; _ < d.length; _++) {
                        var y = d[_];
                        if (e(y[0]) && e(y[1])) {
                            var v = this.deepMerge(y), x = [v, r], b = h, T = null != v.value ? v.value : "";
                            if (s) {
                                b = isNaN(T) ? b : s.getColor(T);
                                var S = this.deepQuery(x, "itemStyle.normal.color") || b, C = this.deepQuery(x, "itemStyle.emphasis.color") || S;
                                if (null == S && null == C)continue
                            }
                            y[0].tooltip = v.tooltip || r.tooltip || {trigger: "item"}, y[0].name = y[0].name || "", y[1].name = y[1].name || "", y[0].value = T, u.push({
                                points: [[this.parsePercent(y[0].x, p), this.parsePercent(y[0].y, f)], [this.parsePercent(y[1].x, p), this.parsePercent(y[1].y, f)]],
                                rawData: y,
                                color: b
                            })
                        }
                    }
                    var E = this.query(r, "bundling.enable");
                    if (E) {
                        var w = new g;
                        w.maxTurningAngle = this.query(r, "bundling.maxTurningAngle") / 180 * Math.PI, u = w.run(u)
                    }
                    r.name = o.name;
                    for (var z = [], _ = 0, k = u.length; k > _; _++) {
                        var L = u[_], A = L.rawEdge || L, y = A.rawData, T = null != y.value ? y.value : "", M = this.getMarkLineShape(r, i, y, _, L.points, E, A.color);
                        M._mark = "line";
                        var P = this.deepMerge([y[0], y[1], r], "effect");
                        P.show && (M.effect = P, M.effect.large = r.large), o.type === l.CHART_TYPE_MAP && (M._geo = [this.getMarkGeo(y[0]), this.getMarkGeo(y[1])]), c.pack(M, o, i, y[0], _, y[0].name + ("" !== y[1].name ? " > " + y[1].name : ""), T), z.push(M)
                    }
                    return z
                }
            }(), getMarkCoord: function () {
                return [0, 0]
            }, getSymbolShape: function (t, e, i, n, s, a, h, l, d, u, p) {
                var f = [i, t], g = this.getDataFromOption(i, "-");
                l = this.deepQuery(f, "symbol") || l;
                var m = this.deepQuery(f, "symbolSize");
                m = "function" == typeof m ? m(g) : m, "number" == typeof m && (m = [m, m]);
                var _ = this.deepQuery(f, "symbolRotate"), y = this.deepMerge(f, "itemStyle.normal"), v = this.deepMerge(f, "itemStyle.emphasis"), x = null != y.borderWidth ? y.borderWidth : y.lineStyle && y.lineStyle.width;
                null == x && (x = l.match("empty") ? 2 : 0);
                var b = null != v.borderWidth ? v.borderWidth : v.lineStyle && v.lineStyle.width;
                null == b && (b = x + 2);
                var T = this.getItemStyleColor(y.color, e, n, i), S = this.getItemStyleColor(v.color, e, n, i), C = m[0], E = m[1], w = new o({
                    style: {
                        iconType: l.replace("empty", "").toLowerCase(),
                        x: a - C,
                        y: h - E,
                        width: 2 * C,
                        height: 2 * E,
                        brushType: "both",
                        color: l.match("empty") ? u : T || d,
                        strokeColor: y.borderColor || T || d,
                        lineWidth: x
                    },
                    highlightStyle: {
                        color: l.match("empty") ? u : S || T || d,
                        strokeColor: v.borderColor || y.borderColor || S || T || d,
                        lineWidth: b
                    },
                    clickable: this.deepQuery(f, "clickable")
                });
                return l.match("image") && (w.style.image = l.replace(new RegExp("^image:\\/\\/"), ""), w = new r({
                    style: w.style,
                    highlightStyle: w.highlightStyle,
                    clickable: this.deepQuery(f, "clickable")
                })), null != _ && (w.rotation = [_ * Math.PI / 180, a, h]), l.match("star") && (w.style.iconType = "star", w.style.n = l.replace("empty", "").replace("star", "") - 0 || 5), "none" === l && (w.invisible = !0, w.hoverable = !1), w = this.addLabel(w, t, i, s, p), l.match("empty") && (null == w.style.textColor && (w.style.textColor = w.style.strokeColor), null == w.highlightStyle.textColor && (w.highlightStyle.textColor = w.highlightStyle.strokeColor)), c.pack(w, t, e, i, n, s), w._x = a, w._y = h, w._dataIndex = n, w._seriesIndex = e, w
            }, getMarkLineShape: function (t, e, i, r, o, s, h) {
                var l = null != i[0].value ? i[0].value : "-", c = null != i[1].value ? i[1].value : "-", d = [i[0].symbol || t.symbol[0], i[1].symbol || t.symbol[1]], u = [i[0].symbolSize || t.symbolSize[0], i[1].symbolSize || t.symbolSize[1]];
                u[0] = "function" == typeof u[0] ? u[0](l) : u[0], u[1] = "function" == typeof u[1] ? u[1](c) : u[1];
                var p = [this.query(i[0], "symbolRotate") || t.symbolRotate[0], this.query(i[1], "symbolRotate") || t.symbolRotate[1]], f = [i[0], i[1], t], g = this.deepMerge(f, "itemStyle.normal");
                g.color = this.getItemStyleColor(g.color, e, r, i);
                var m = this.deepMerge(f, "itemStyle.emphasis");
                m.color = this.getItemStyleColor(m.color, e, r, i);
                var _ = g.lineStyle, y = m.lineStyle, v = _.width;
                null == v && (v = g.borderWidth);
                var x = y.width;
                null == x && (x = null != m.borderWidth ? m.borderWidth : v + 2);
                var b = this.deepQuery(f, "smoothness");
                this.deepQuery(f, "smooth") || (b = 0);
                var T = s ? a : n, S = new T({
                    style: {
                        symbol: d,
                        symbolSize: u,
                        symbolRotate: p,
                        brushType: "both",
                        lineType: _.type,
                        shadowColor: _.shadowColor || _.color || g.borderColor || g.color || h,
                        shadowBlur: _.shadowBlur,
                        shadowOffsetX: _.shadowOffsetX,
                        shadowOffsetY: _.shadowOffsetY,
                        color: g.color || h,
                        strokeColor: _.color || g.borderColor || g.color || h,
                        lineWidth: v,
                        symbolBorderColor: g.borderColor || g.color || h,
                        symbolBorder: g.borderWidth
                    },
                    highlightStyle: {
                        shadowColor: y.shadowColor,
                        shadowBlur: y.shadowBlur,
                        shadowOffsetX: y.shadowOffsetX,
                        shadowOffsetY: y.shadowOffsetY,
                        color: m.color || g.color || h,
                        strokeColor: y.color || _.color || m.borderColor || g.borderColor || m.color || g.color || h,
                        lineWidth: x,
                        symbolBorderColor: m.borderColor || g.borderColor || m.color || g.color || h,
                        symbolBorder: null == m.borderWidth ? g.borderWidth + 2 : m.borderWidth
                    },
                    clickable: this.deepQuery(f, "clickable")
                }), C = S.style;
                return s ? (C.pointList = o, C.smooth = b) : (C.xStart = o[0][0], C.yStart = o[0][1], C.xEnd = o[1][0], C.yEnd = o[1][1], C.curveness = b, S.updatePoints(S.style)), S = this.addLabel(S, t, i[0], i[0].name + " : " + i[1].name)
            }, getLargeMarkPointShape: function (t, e) {
                var i, r, o, n, a, h, l = this.series[t], c = this.component, d = e.data, u = c.dataRange, p = c.legend, f = [d[0], e];
                if (p && (r = p.getColor(l.name)), !u || (o = null != d[0].value ? d[0].value : "", r = isNaN(o) ? r : u.getColor(o), n = this.deepQuery(f, "itemStyle.normal.color") || r, a = this.deepQuery(f, "itemStyle.emphasis.color") || n, null != n || null != a)) {
                    r = this.deepMerge(f, "itemStyle.normal").color || r;
                    var g = this.deepQuery(f, "symbol") || "circle";
                    g = g.replace("empty", "").replace(/\d/g, ""), h = this.deepMerge([d[0], e], "effect");
                    var m = window.devicePixelRatio || 1;
                    return i = new s({
                        style: {
                            pointList: d,
                            color: r,
                            strokeColor: r,
                            shadowColor: h.shadowColor || r,
                            shadowBlur: (null != h.shadowBlur ? h.shadowBlur : 8) * m,
                            size: this.deepQuery(f, "symbolSize"),
                            iconType: g,
                            brushType: "fill",
                            lineWidth: 1
                        }, draggable: !1, hoverable: !1
                    }), h.show && (i.effect = h), i
                }
            }, backupShapeList: function () {
                this.shapeList && this.shapeList.length > 0 ? (this.lastShapeList = this.shapeList, this.shapeList = []) : this.lastShapeList = []
            }, addShapeList: function () {
                var t, e, i = this.option.animationThreshold / (this.canvasSupported ? 2 : 4), r = this.lastShapeList, o = this.shapeList, n = r.length > 0, s = n ? this.query(this.option, "animationDurationUpdate") : this.query(this.option, "animationDuration"), a = this.query(this.option, "animationEasing"), h = {}, c = {};
                if (this.option.animation && !this.option.renderAsImage && o.length < i && !this.motionlessOnce) {
                    for (var d = 0, u = r.length; u > d; d++)e = this._getAnimationKey(r[d]), e.match("undefined") ? this.zr.delShape(r[d].id) : (e += r[d].type, h[e] ? this.zr.delShape(r[d].id) : h[e] = r[d]);
                    for (var d = 0, u = o.length; u > d; d++)e = this._getAnimationKey(o[d]), e.match("undefined") ? this.zr.addShape(o[d]) : (e += o[d].type, c[e] = o[d]);
                    for (e in h)c[e] || this.zr.delShape(h[e].id);
                    for (e in c)h[e] ? (this.zr.delShape(h[e].id), this._animateMod(h[e], c[e], s, a, 0, n)) : (t = this.type != l.CHART_TYPE_LINE && this.type != l.CHART_TYPE_RADAR || 0 === e.indexOf("icon") ? 0 : s / 2, this._animateMod(!1, c[e], s, a, t, n));
                    this.zr.refresh(), this.animationEffect()
                } else {
                    this.motionlessOnce = !1, this.zr.delShape(r);
                    for (var d = 0, u = o.length; u > d; d++)this.zr.addShape(o[d])
                }
            }, _getAnimationKey: function (t) {
                return this.type != l.CHART_TYPE_MAP && this.type != l.CHART_TYPE_TREEMAP && this.type != l.CHART_TYPE_VENN && this.type != l.CHART_TYPE_TREE ? c.get(t, "seriesIndex") + "_" + c.get(t, "dataIndex") + (t._mark ? t._mark : "") + (this.type === l.CHART_TYPE_RADAR ? c.get(t, "special") : "") : c.get(t, "seriesIndex") + "_" + c.get(t, "dataIndex") + (t._mark ? t._mark : "undefined")
            }, _animateMod: function (t, e, i, r, o, n) {
                switch (e.type) {
                    case"polyline":
                    case"half-smooth-polygon":
                        d.pointList(this.zr, t, e, i, r);
                        break;
                    case"rectangle":
                        d.rectangle(this.zr, t, e, i, r);
                        break;
                    case"image":
                    case"icon":
                        d.icon(this.zr, t, e, i, r, o);
                        break;
                    case"candle":
                        n ? this.zr.addShape(e) : d.candle(this.zr, t, e, i, r);
                        break;
                    case"ring":
                    case"sector":
                    case"circle":
                        n ? "sector" === e.type ? d.sector(this.zr, t, e, i, r) : this.zr.addShape(e) : d.ring(this.zr, t, e, i + (c.get(e, "dataIndex") || 0) % 20 * 100, r);
                        break;
                    case"text":
                        d.text(this.zr, t, e, i, r);
                        break;
                    case"polygon":
                        n ? d.pointList(this.zr, t, e, i, r) : d.polygon(this.zr, t, e, i, r);
                        break;
                    case"ribbon":
                        d.ribbon(this.zr, t, e, i, r);
                        break;
                    case"gauge-pointer":
                        d.gaugePointer(this.zr, t, e, i, r);
                        break;
                    case"mark-line":
                        d.markline(this.zr, t, e, i, r);
                        break;
                    case"bezier-curve":
                    case"line":
                        d.line(this.zr, t, e, i, r);
                        break;
                    default:
                        this.zr.addShape(e)
                }
            }, animationMark: function (t, e, i) {
                for (var i = i || this.shapeList, r = 0, o = i.length; o > r; r++)i[r]._mark && this._animateMod(!1, i[r], t, e, 0, !0);
                this.animationEffect(i)
            }, animationEffect: function (t) {
                if (!t && this.clearEffectShape(), t = t || this.shapeList, null != t) {
                    var e = l.EFFECT_ZLEVEL;
                    this.canvasSupported && this.zr.modLayer(e, {
                        motionBlur: !0,
                        lastFrameAlpha: this.option.effectBlendAlpha || l.effectBlendAlpha
                    });
                    for (var i, r = 0, o = t.length; o > r; r++)i = t[r], i._mark && i.effect && i.effect.show && u[i._mark] && (u[i._mark](this.zr, this.effectList, i, e), this.effectList[this.effectList.length - 1]._mark = i._mark)
                }
            }, clearEffectShape: function (t) {
                var e = this.effectList;
                if (this.zr && e && e.length > 0) {
                    t && this.zr.modLayer(l.EFFECT_ZLEVEL, {motionBlur: !1}), this.zr.delShape(e);
                    for (var i = 0; i < e.length; i++)e[i].effectAnimator && e[i].effectAnimator.stop()
                }
                this.effectList = []
            }, addMark: function (t, e, i) {
                var r = this.series[t];
                if (this.selectedMap[r.name]) {
                    var o = this.query(this.option, "animationDurationUpdate"), n = this.query(this.option, "animationEasing"), s = r[i].data, a = this.shapeList.length;
                    if (r[i].data = e.data, this["_build" + i.replace("m", "M")](t), this.option.animation && !this.option.renderAsImage)this.animationMark(o, n, this.shapeList.slice(a)); else {
                        for (var h = a, l = this.shapeList.length; l > h; h++)this.zr.addShape(this.shapeList[h]);
                        this.zr.refreshNextFrame()
                    }
                    r[i].data = s
                }
            }, delMark: function (t, e, i) {
                i = i.replace("mark", "").replace("large", "").toLowerCase();
                var r = this.series[t];
                if (this.selectedMap[r.name]) {
                    for (var o = !1, n = [this.shapeList, this.effectList], s = 2; s--;)for (var a = 0, h = n[s].length; h > a; a++)if (n[s][a]._mark == i && c.get(n[s][a], "seriesIndex") == t && c.get(n[s][a], "name") == e) {
                        this.zr.delShape(n[s][a].id), n[s].splice(a, 1), o = !0;
                        break
                    }
                    o && this.zr.refreshNextFrame()
                }
            }
        }, m.inherits(i, f), i
    }), i("zrender/tool/util", ["require", "../dep/excanvas"], function (t) {
        function e(t) {
            return t && 1 === t.nodeType && "string" == typeof t.nodeName
        }

        function i(t) {
            if ("object" == typeof t && null !== t) {
                var r = t;
                if (t instanceof Array) {
                    r = [];
                    for (var o = 0, n = t.length; n > o; o++)r[o] = i(t[o])
                } else if (!_[y.call(t)] && !e(t)) {
                    r = {};
                    for (var s in t)t.hasOwnProperty(s) && (r[s] = i(t[s]))
                }
                return r
            }
            return t
        }

        function r(t, i, r, n) {
            if (i.hasOwnProperty(r)) {
                var s = t[r];
                "object" != typeof s || _[y.call(s)] || e(s) ? !n && r in t || (t[r] = i[r]) : o(t[r], i[r], n)
            }
        }

        function o(t, e, i) {
            for (var o in e)r(t, e, o, i);
            return t
        }

        function n() {
            if (!u)if (t("../dep/excanvas"), window.G_vmlCanvasManager) {
                var e = document.createElement("div");
                e.style.position = "absolute", e.style.top = "-1000px", document.body.appendChild(e), u = G_vmlCanvasManager.initElement(e).getContext("2d")
            } else u = document.createElement("canvas").getContext("2d");
            return u
        }

        function s(t, e) {
            if (t.indexOf)return t.indexOf(e);
            for (var i = 0, r = t.length; r > i; i++)if (t[i] === e)return i;
            return -1
        }

        function a(t, e) {
            function i() {
            }

            var r = t.prototype;
            i.prototype = e.prototype, t.prototype = new i;
            for (var o in r)t.prototype[o] = r[o];
            t.constructor = t
        }

        function h(t, e, i) {
            if (t && e)if (t.forEach && t.forEach === f)t.forEach(e, i); else if (t.length === +t.length)for (var r = 0, o = t.length; o > r; r++)e.call(i, t[r], r, t); else for (var n in t)t.hasOwnProperty(n) && e.call(i, t[n], n, t)
        }

        function l(t, e, i) {
            if (t && e) {
                if (t.map && t.map === g)return t.map(e, i);
                for (var r = [], o = 0, n = t.length; n > o; o++)r.push(e.call(i, t[o], o, t));
                return r
            }
        }

        function c(t, e, i) {
            if (t && e) {
                if (t.filter && t.filter === m)return t.filter(e, i);
                for (var r = [], o = 0, n = t.length; n > o; o++)e.call(i, t[o], o, t) && r.push(t[o]);
                return r
            }
        }

        function d(t, e) {
            return function () {
                t.apply(e, arguments)
            }
        }

        var u, p = Array.prototype, f = p.forEach, g = p.map, m = p.filter, _ = {
            "[object Function]": 1,
            "[object RegExp]": 1,
            "[object Date]": 1,
            "[object Error]": 1,
            "[object CanvasGradient]": 1
        }, y = Object.prototype.toString;
        return {inherits: a, clone: i, merge: o, getContext: n, indexOf: s, each: h, map: l, filter: c, bind: d}
    }), i("zrender/tool/math", [], function () {
        function t(t, e) {
            return Math.sin(e ? t * o : t)
        }

        function e(t, e) {
            return Math.cos(e ? t * o : t)
        }

        function i(t) {
            return t * o
        }

        function r(t) {
            return t / o
        }

        var o = Math.PI / 180;
        return {sin: t, cos: e, degreeToRadian: i, radianToDegree: r}
    }), i("echarts/chart", [], function () {
        var t = {}, e = {};
        return t.define = function (i, r) {
            return e[i] = r, t
        }, t.get = function (t) {
            return e[t]
        }, t
    }), i("zrender/tool/event", ["require", "../mixin/Eventful"], function (t) {
        "use strict";
        function e(t) {
            return "undefined" != typeof t.zrenderX && t.zrenderX || "undefined" != typeof t.offsetX && t.offsetX || "undefined" != typeof t.layerX && t.layerX || "undefined" != typeof t.clientX && t.clientX
        }

        function i(t) {
            return "undefined" != typeof t.zrenderY && t.zrenderY || "undefined" != typeof t.offsetY && t.offsetY || "undefined" != typeof t.layerY && t.layerY || "undefined" != typeof t.clientY && t.clientY
        }

        function r(t) {
            return "undefined" != typeof t.zrenderDelta && t.zrenderDelta || "undefined" != typeof t.wheelDelta && t.wheelDelta || "undefined" != typeof t.detail && -t.detail
        }

        var o = t("../mixin/Eventful"), n = "function" == typeof window.addEventListener ? function (t) {
            t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
        } : function (t) {
            t.returnValue = !1, t.cancelBubble = !0
        };
        return {getX: e, getY: i, getDelta: r, stop: n, Dispatcher: o}
    }), i("zrender/tool/color", ["require", "../tool/util"], function (t) {
        function e(t) {
            Y = t
        }

        function i() {
            Y = q
        }

        function r(t, e) {
            return t = 0 | t, e = e || Y, e[t % e.length]
        }

        function o(t) {
            G = t
        }

        function n() {
            V = G
        }

        function s() {
            return G
        }

        function a(t, e, i, r, o, n, s) {
            N || (N = W.getContext());
            for (var a = N.createRadialGradient(t, e, i, r, o, n), h = 0, l = s.length; l > h; h++)a.addColorStop(s[h][0], s[h][1]);
            return a.__nonRecursion = !0, a
        }

        function h(t, e, i, r, o) {
            N || (N = W.getContext());
            for (var n = N.createLinearGradient(t, e, i, r), s = 0, a = o.length; a > s; s++)n.addColorStop(o[s][0], o[s][1]);
            return n.__nonRecursion = !0, n
        }

        function l(t, e, i) {
            t = f(t), e = f(e), t = A(t), e = A(e);
            for (var r = [], o = (e[0] - t[0]) / i, n = (e[1] - t[1]) / i, s = (e[2] - t[2]) / i, a = (e[3] - t[3]) / i, h = 0, l = t[0], c = t[1], u = t[2], p = t[3]; i > h; h++)r[h] = d([I(Math.floor(l), [0, 255]), I(Math.floor(c), [0, 255]), I(Math.floor(u), [0, 255]), p.toFixed(4) - 0], "rgba"), l += o, c += n, u += s, p += a;
            return l = e[0], c = e[1], u = e[2], p = e[3], r[h] = d([l, c, u, p], "rgba"), r
        }

        function c(t, e) {
            var i = [], r = t.length;
            if (void 0 === e && (e = 20), 1 === r)i = l(t[0], t[0], e); else if (r > 1)for (var o = 0, n = r - 1; n > o; o++) {
                var s = l(t[o], t[o + 1], e);
                n - 1 > o && s.pop(), i = i.concat(s)
            }
            return i
        }

        function d(t, e) {
            if (e = e || "rgb", t && (3 === t.length || 4 === t.length)) {
                if (t = P(t, function (t) {
                        return t > 1 ? Math.ceil(t) : t
                    }), e.indexOf("hex") > -1)return "#" + ((1 << 24) + (t[0] << 16) + (t[1] << 8) + +t[2]).toString(16).slice(1);
                if (e.indexOf("hs") > -1) {
                    var i = P(t.slice(1, 3), function (t) {
                        return t + "%"
                    });
                    t[1] = i[0], t[2] = i[1]
                }
                return e.indexOf("a") > -1 ? (3 === t.length && t.push(1), t[3] = I(t[3], [0, 1]), e + "(" + t.slice(0, 4).join(",") + ")") : e + "(" + t.slice(0, 3).join(",") + ")"
            }
        }

        function u(t) {
            t = C(t), t.indexOf("rgba") < 0 && (t = f(t));
            var e = [], i = 0;
            return t.replace(/[\d.]+/g, function (t) {
                t = 3 > i ? 0 | t : +t, e[i++] = t
            }), e
        }

        function p(t, e) {
            if (!O(t))return t;
            var i = A(t), r = i[3];
            return "undefined" == typeof r && (r = 1), t.indexOf("hsb") > -1 ? i = R(i) : t.indexOf("hsl") > -1 && (i = D(i)), e.indexOf("hsb") > -1 || e.indexOf("hsv") > -1 ? i = F(i) : e.indexOf("hsl") > -1 && (i = B(i)), i[3] = r, d(i, e)
        }

        function f(t) {
            return p(t, "rgba")
        }

        function g(t) {
            return p(t, "rgb")
        }

        function m(t) {
            return p(t, "hex")
        }

        function _(t) {
            return p(t, "hsva")
        }

        function y(t) {
            return p(t, "hsv")
        }

        function v(t) {
            return p(t, "hsba")
        }

        function x(t) {
            return p(t, "hsb")
        }

        function b(t) {
            return p(t, "hsla")
        }

        function T(t) {
            return p(t, "hsl")
        }

        function S(t) {
            for (var e in Z)if (m(Z[e]) === m(t))return e;
            return null
        }

        function C(t) {
            return String(t).replace(/\s+/g, "")
        }

        function E(t) {
            if (Z[t] && (t = Z[t]), t = C(t), t = t.replace(/hsv/i, "hsb"), /^#[\da-f]{3}$/i.test(t)) {
                t = parseInt(t.slice(1), 16);
                var e = (3840 & t) << 8, i = (240 & t) << 4, r = 15 & t;
                t = "#" + ((1 << 24) + (e << 4) + e + (i << 4) + i + (r << 4) + r).toString(16).slice(1)
            }
            return t
        }

        function w(t, e) {
            if (!O(t))return t;
            var i = e > 0 ? 1 : -1;
            "undefined" == typeof e && (e = 0), e = Math.abs(e) > 1 ? 1 : Math.abs(e), t = g(t);
            for (var r = A(t), o = 0; 3 > o; o++)r[o] = 1 === i ? r[o] * (1 - e) | 0 : (255 - r[o]) * e + r[o] | 0;
            return "rgb(" + r.join(",") + ")"
        }

        function z(t) {
            if (!O(t))return t;
            var e = A(f(t));
            return e = P(e, function (t) {
                return 255 - t
            }), d(e, "rgb")
        }

        function k(t, e, i) {
            if (!O(t) || !O(e))return t;
            "undefined" == typeof i && (i = .5), i = 1 - I(i, [0, 1]);
            for (var r = 2 * i - 1, o = A(f(t)), n = A(f(e)), s = o[3] - n[3], a = ((r * s === -1 ? r : (r + s) / (1 + r * s)) + 1) / 2, h = 1 - a, l = [], c = 0; 3 > c; c++)l[c] = o[c] * a + n[c] * h;
            var u = o[3] * i + n[3] * (1 - i);
            return u = Math.max(0, Math.min(1, u)), 1 === o[3] && 1 === n[3] ? d(l, "rgb") : (l[3] = u, d(l, "rgba"))
        }

        function L() {
            return "#" + (Math.random().toString(16) + "0000").slice(2, 8)
        }

        function A(t) {
            t = E(t);
            var e = t.match(X);
            if (null === e)throw new Error("The color format error");
            var i, r, o, n = [];
            if (e[2])i = e[2].replace("#", "").split(""), o = [i[0] + i[1], i[2] + i[3], i[4] + i[5]], n = P(o, function (t) {
                return I(parseInt(t, 16), [0, 255])
            }); else if (e[4]) {
                var s = e[4].split(",");
                r = s[3], o = s.slice(0, 3), n = P(o, function (t) {
                    return t = Math.floor(t.indexOf("%") > 0 ? 2.55 * parseInt(t, 0) : t), I(t, [0, 255])
                }), "undefined" != typeof r && n.push(I(parseFloat(r), [0, 1]))
            } else if (e[5] || e[6]) {
                var a = (e[5] || e[6]).split(","), h = parseInt(a[0], 0) / 360, l = a[1], c = a[2];
                r = a[3], n = P([l, c], function (t) {
                    return I(parseFloat(t) / 100, [0, 1])
                }), n.unshift(h), "undefined" != typeof r && n.push(I(parseFloat(r), [0, 1]))
            }
            return n
        }

        function M(t, e) {
            if (!O(t))return t;
            null === e && (e = 1);
            var i = A(f(t));
            return i[3] = I(Number(e).toFixed(4), [0, 1]), d(i, "rgba")
        }

        function P(t, e) {
            if ("function" != typeof e)throw new TypeError;
            for (var i = t ? t.length : 0, r = 0; i > r; r++)t[r] = e(t[r]);
            return t
        }

        function I(t, e) {
            return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]), t
        }

        function O(t) {
            return t instanceof Array || "string" == typeof t
        }

        function R(t) {
            var e, i, r, o = t[0], n = t[1], s = t[2];
            if (0 === n)e = 255 * s, i = 255 * s, r = 255 * s; else {
                var a = 6 * o;
                6 === a && (a = 0);
                var h = 0 | a, l = s * (1 - n), c = s * (1 - n * (a - h)), d = s * (1 - n * (1 - (a - h))), u = 0, p = 0, f = 0;
                0 === h ? (u = s, p = d, f = l) : 1 === h ? (u = c, p = s, f = l) : 2 === h ? (u = l, p = s, f = d) : 3 === h ? (u = l, p = c, f = s) : 4 === h ? (u = d, p = l, f = s) : (u = s, p = l, f = c), e = 255 * u, i = 255 * p, r = 255 * f
            }
            return [e, i, r]
        }

        function D(t) {
            var e, i, r, o = t[0], n = t[1], s = t[2];
            if (0 === n)e = 255 * s, i = 255 * s, r = 255 * s; else {
                var a;
                a = .5 > s ? s * (1 + n) : s + n - n * s;
                var h = 2 * s - a;
                e = 255 * H(h, a, o + 1 / 3), i = 255 * H(h, a, o), r = 255 * H(h, a, o - 1 / 3)
            }
            return [e, i, r]
        }

        function H(t, e, i) {
            return 0 > i && (i += 1), i > 1 && (i -= 1), 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
        }

        function F(t) {
            var e, i, r = t[0] / 255, o = t[1] / 255, n = t[2] / 255, s = Math.min(r, o, n), a = Math.max(r, o, n), h = a - s, l = a;
            if (0 === h)e = 0, i = 0; else {
                i = h / a;
                var c = ((a - r) / 6 + h / 2) / h, d = ((a - o) / 6 + h / 2) / h, u = ((a - n) / 6 + h / 2) / h;
                r === a ? e = u - d : o === a ? e = 1 / 3 + c - u : n === a && (e = 2 / 3 + d - c), 0 > e && (e += 1), e > 1 && (e -= 1)
            }
            return e = 360 * e, i = 100 * i, l = 100 * l, [e, i, l]
        }

        function B(t) {
            var e, i, r = t[0] / 255, o = t[1] / 255, n = t[2] / 255, s = Math.min(r, o, n), a = Math.max(r, o, n), h = a - s, l = (a + s) / 2;
            if (0 === h)e = 0, i = 0; else {
                i = .5 > l ? h / (a + s) : h / (2 - a - s);
                var c = ((a - r) / 6 + h / 2) / h, d = ((a - o) / 6 + h / 2) / h, u = ((a - n) / 6 + h / 2) / h;
                r === a ? e = u - d : o === a ? e = 1 / 3 + c - u : n === a && (e = 2 / 3 + d - c), 0 > e && (e += 1), e > 1 && (e -= 1)
            }
            return e = 360 * e, i = 100 * i, l = 100 * l, [e, i, l]
        }

        var N, W = t("../tool/util"), Y = ["#ff9277", " #dddd00", " #ffc877", " #bbe3ff", " #d5ffbb", "#bbbbff", " #ddb000", " #b0dd00", " #e2bbff", " #ffbbe3", "#ff7777", " #ff9900", " #83dd00", " #77e3ff", " #778fff", "#c877ff", " #ff77ab", " #ff6600", " #aa8800", " #77c7ff", "#ad77ff", " #ff77ff", " #dd0083", " #777700", " #00aa00", "#0088aa", " #8400dd", " #aa0088", " #dd0000", " #772e00"], q = Y, G = "rgba(255,255,0,0.5)", V = G, X = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, Z = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#0ff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000",
            blanchedalmond: "#ffebcd",
            blue: "#00f",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#0ff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#f0f",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            grey: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#789",
            lightslategrey: "#789",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#0f0",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#f0f",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#f00",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#fff",
            whitesmoke: "#f5f5f5",
            yellow: "#ff0",
            yellowgreen: "#9acd32"
        };
        return {
            customPalette: e,
            resetPalette: i,
            getColor: r,
            getHighlightColor: s,
            customHighlight: o,
            resetHighlight: n,
            getRadialGradient: a,
            getLinearGradient: h,
            getGradientColors: c,
            getStepColors: l,
            reverse: z,
            mix: k,
            lift: w,
            trim: C,
            random: L,
            toRGB: g,
            toRGBA: f,
            toHex: m,
            toHSL: T,
            toHSLA: b,
            toHSB: x,
            toHSBA: v,
            toHSV: y,
            toHSVA: _,
            toName: S,
            toColor: d,
            toArray: u,
            alpha: M,
            getData: A
        }
    }), i("zrender/tool/env", [], function () {
        function t(t) {
            var e = this.os = {}, i = this.browser = {}, r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/), o = t.match(/(Android);?[\s\/]+([\d.]+)?/), n = t.match(/(iPad).*OS\s([\d_]+)/), s = t.match(/(iPod)(.*OS\s([\d_]+))?/), a = !n && t.match(/(iPhone\sOS)\s([\d_]+)/), h = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), l = h && t.match(/TouchPad/), c = t.match(/Kindle\/([\d.]+)/), d = t.match(/Silk\/([\d._]+)/), u = t.match(/(BlackBerry).*Version\/([\d.]+)/), p = t.match(/(BB10).*Version\/([\d.]+)/), f = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/), g = t.match(/PlayBook/), m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/), _ = t.match(/Firefox\/([\d.]+)/), y = t.match(/MSIE ([\d.]+)/), v = r && t.match(/Mobile\//) && !m, x = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m, y = t.match(/MSIE\s([\d.]+)/);
            return (i.webkit = !!r) && (i.version = r[1]), o && (e.android = !0, e.version = o[2]), a && !s && (e.ios = e.iphone = !0, e.version = a[2].replace(/_/g, ".")), n && (e.ios = e.ipad = !0, e.version = n[2].replace(/_/g, ".")), s && (e.ios = e.ipod = !0, e.version = s[3] ? s[3].replace(/_/g, ".") : null), h && (e.webos = !0, e.version = h[2]), l && (e.touchpad = !0), u && (e.blackberry = !0, e.version = u[2]), p && (e.bb10 = !0, e.version = p[2]), f && (e.rimtabletos = !0, e.version = f[2]), g && (i.playbook = !0), c && (e.kindle = !0, e.version = c[1]), d && (i.silk = !0, i.version = d[1]), !d && e.android && t.match(/Kindle Fire/) && (i.silk = !0), m && (i.chrome = !0, i.version = m[1]), _ && (i.firefox = !0, i.version = _[1]), y && (i.ie = !0, i.version = y[1]), v && (t.match(/Safari/) || e.ios) && (i.safari = !0), x && (i.webview = !0), y && (i.ie = !0, i.version = y[1]), e.tablet = !!(n || g || o && !t.match(/Mobile/) || _ && t.match(/Tablet/) || y && !t.match(/Phone/) && t.match(/Touch/)), e.phone = !(e.tablet || e.ipod || !(o || a || h || u || p || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || _ && t.match(/Mobile/) || y && t.match(/Touch/))), {
                browser: i,
                os: e,
                canvasSupported: document.createElement("canvas").getContext ? !0 : !1
            }
        }

        return t(navigator.userAgent)
    }), i("zrender/zrender", ["require", "./dep/excanvas", "./tool/util", "./tool/log", "./tool/guid", "./Handler", "./Painter", "./Storage", "./animation/Animation", "./tool/env"], function (t) {
        function e(t) {
            return function () {
                t._needsRefreshNextFrame && t.refresh()
            }
        }

        t("./dep/excanvas");
        var i = t("./tool/util"), r = t("./tool/log"), o = t("./tool/guid"), n = t("./Handler"), s = t("./Painter"), a = t("./Storage"), h = t("./animation/Animation"), l = {}, c = {};
        c.version = "2.1.1", c.init = function (t) {
            var e = new d(o(), t);
            return l[e.id] = e, e
        }, c.dispose = function (t) {
            if (t)t.dispose(); else {
                for (var e in l)l[e].dispose();
                l = {}
            }
            return c
        }, c.getInstance = function (t) {
            return l[t]
        }, c.delInstance = function (t) {
            return delete l[t], c
        };
        var d = function (i, r) {
            this.id = i, this.env = t("./tool/env"), this.storage = new a, this.painter = new s(r, this.storage), this.handler = new n(r, this.storage, this.painter), this.animation = new h({stage: {update: e(this)}}), this.animation.start();
            var o = this;
            this.painter.refreshNextFrame = function () {
                o.refreshNextFrame()
            }, this._needsRefreshNextFrame = !1;
            var o = this, l = this.storage, c = l.delFromMap;
            l.delFromMap = function (t) {
                var e = l.get(t);
                o.stopAnimation(e), c.call(l, t)
            }
        };
        return d.prototype.getId = function () {
            return this.id
        }, d.prototype.addShape = function (t) {
            return this.addElement(t), this
        }, d.prototype.addGroup = function (t) {
            return this.addElement(t), this
        }, d.prototype.delShape = function (t) {
            return this.delElement(t), this
        }, d.prototype.delGroup = function (t) {
            return this.delElement(t), this
        }, d.prototype.modShape = function (t, e) {
            return this.modElement(t, e), this
        }, d.prototype.modGroup = function (t, e) {
            return this.modElement(t, e), this
        }, d.prototype.addElement = function (t) {
            return this.storage.addRoot(t), this._needsRefreshNextFrame = !0, this
        }, d.prototype.delElement = function (t) {
            return this.storage.delRoot(t), this._needsRefreshNextFrame = !0, this
        }, d.prototype.modElement = function (t, e) {
            return this.storage.mod(t, e), this._needsRefreshNextFrame = !0, this
        }, d.prototype.modLayer = function (t, e) {
            return this.painter.modLayer(t, e), this._needsRefreshNextFrame = !0, this
        }, d.prototype.addHoverShape = function (t) {
            return this.storage.addHover(t), this
        }, d.prototype.render = function (t) {
            return this.painter.render(t), this._needsRefreshNextFrame = !1, this
        }, d.prototype.refresh = function (t) {
            return this.painter.refresh(t), this._needsRefreshNextFrame = !1, this
        }, d.prototype.refreshNextFrame = function () {
            return this._needsRefreshNextFrame = !0, this
        }, d.prototype.refreshHover = function (t) {
            return this.painter.refreshHover(t), this
        }, d.prototype.refreshShapes = function (t, e) {
            return this.painter.refreshShapes(t, e), this
        }, d.prototype.resize = function () {
            return this.painter.resize(), this
        }, d.prototype.animate = function (t, e, o) {
            var n = this;
            if ("string" == typeof t && (t = this.storage.get(t)), t) {
                var s;
                if (e) {
                    for (var a = e.split("."), h = t, l = 0, c = a.length; c > l; l++)h && (h = h[a[l]]);
                    h && (s = h)
                } else s = t;
                if (!s)return void r('Property "' + e + '" is not existed in element ' + t.id);
                null == t.__animators && (t.__animators = []);
                var d = t.__animators, u = this.animation.animate(s, {loop: o}).during(function () {
                    n.modShape(t)
                }).done(function () {
                    var e = i.indexOf(t.__animators, u);
                    e >= 0 && d.splice(e, 1)
                });
                return d.push(u), u
            }
            r("Element not existed")
        }, d.prototype.stopAnimation = function (t) {
            if (t.__animators) {
                for (var e = t.__animators, i = e.length, r = 0; i > r; r++)e[r].stop();
                e.length = 0
            }
            return this
        }, d.prototype.clearAnimation = function () {
            return this.animation.clear(), this
        }, d.prototype.showLoading = function (t) {
            return this.painter.showLoading(t), this
        }, d.prototype.hideLoading = function () {
            return this.painter.hideLoading(), this
        }, d.prototype.getWidth = function () {
            return this.painter.getWidth()
        }, d.prototype.getHeight = function () {
            return this.painter.getHeight()
        }, d.prototype.toDataURL = function (t, e, i) {
            return this.painter.toDataURL(t, e, i)
        }, d.prototype.shapeToImage = function (t, e, i) {
            var r = o();
            return this.painter.shapeToImage(r, t, e, i)
        }, d.prototype.on = function (t, e, i) {
            return this.handler.on(t, e, i), this
        }, d.prototype.un = function (t, e) {
            return this.handler.un(t, e), this
        }, d.prototype.trigger = function (t, e) {
            return this.handler.trigger(t, e), this
        }, d.prototype.clear = function () {
            return this.storage.delRoot(), this.painter.clear(), this
        }, d.prototype.dispose = function () {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, c.delInstance(this.id)
        }, c
    }), i("echarts/chart/island", ["require", "./base", "zrender/shape/Circle", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/event", "zrender/tool/color", "../util/accMath", "../chart"], function (t) {
        function e(t, e, r, o, s) {
            i.call(this, t, e, r, o, s), this._nameConnector, this._valueConnector, this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth();
            var h = this;
            h.shapeHandler.onmousewheel = function (t) {
                var e = t.target, i = t.event, r = a.getDelta(i);
                r = r > 0 ? -1 : 1, e.style.r -= r, e.style.r = e.style.r < 5 ? 5 : e.style.r;
                var o = n.get(e, "value"), s = o * h.option.island.calculateStep;
                o = s > 1 ? Math.round(o - s * r) : +(o - s * r).toFixed(2);
                var l = n.get(e, "name");
                e.style.text = l + ":" + o, n.set(e, "value", o), n.set(e, "name", l), h.zr.modShape(e.id), h.zr.refreshNextFrame(), a.stop(i)
            }
        }

        var i = t("./base"), r = t("zrender/shape/Circle"), o = t("../config");
        o.island = {zlevel: 0, z: 5, r: 15, calculateStep: .1};
        var n = t("../util/ecData"), s = t("zrender/tool/util"), a = t("zrender/tool/event");
        return e.prototype = {
            type: o.CHART_TYPE_ISLAND, _combine: function (e, i) {
                var r = t("zrender/tool/color"), o = t("../util/accMath"), s = o.accAdd(n.get(e, "value"), n.get(i, "value")), a = n.get(e, "name") + this._nameConnector + n.get(i, "name");
                e.style.text = a + this._valueConnector + s, n.set(e, "value", s), n.set(e, "name", a), e.style.r = this.option.island.r, e.style.color = r.mix(e.style.color, i.style.color)
            }, refresh: function (t) {
                t && (t.island = this.reformOption(t.island), this.option = t, this._nameConnector = this.option.nameConnector, this._valueConnector = this.option.valueConnector)
            }, getOption: function () {
                return this.option
            }, resize: function () {
                var t = this.zr.getWidth(), e = this.zr.getHeight(), i = t / (this._zrWidth || t), r = e / (this._zrHeight || e);
                if (1 !== i || 1 !== r) {
                    this._zrWidth = t, this._zrHeight = e;
                    for (var o = 0, n = this.shapeList.length; n > o; o++)this.zr.modShape(this.shapeList[o].id, {
                        style: {
                            x: Math.round(this.shapeList[o].style.x * i),
                            y: Math.round(this.shapeList[o].style.y * r)
                        }
                    })
                }
            }, add: function (t) {
                var e = n.get(t, "name"), i = n.get(t, "value"), o = null != n.get(t, "series") ? n.get(t, "series").name : "", s = this.getFont(this.option.island.textStyle), a = this.option.island, h = {
                    zlevel: a.zlevel,
                    z: a.z,
                    style: {
                        x: t.style.x,
                        y: t.style.y,
                        r: this.option.island.r,
                        color: t.style.color || t.style.strokeColor,
                        text: e + this._valueConnector + i,
                        textFont: s
                    },
                    draggable: !0,
                    hoverable: !0,
                    onmousewheel: this.shapeHandler.onmousewheel,
                    _type: "island"
                };
                "#fff" === h.style.color && (h.style.color = t.style.strokeColor), this.setCalculable(h), h.dragEnableTime = 0, n.pack(h, {name: o}, -1, i, -1, e), h = new r(h), this.shapeList.push(h), this.zr.addShape(h)
            }, del: function (t) {
                this.zr.delShape(t.id);
                for (var e = [], i = 0, r = this.shapeList.length; r > i; i++)this.shapeList[i].id != t.id && e.push(this.shapeList[i]);
                this.shapeList = e
            }, ondrop: function (t, e) {
                if (this.isDrop && t.target) {
                    var i = t.target, r = t.dragged;
                    this._combine(i, r), this.zr.modShape(i.id), e.dragIn = !0, this.isDrop = !1
                }
            }, ondragend: function (t, e) {
                var i = t.target;
                this.isDragend ? e.dragIn && (this.del(i), e.needRefresh = !0) : e.dragIn || (i.style.x = a.getX(t.event), i.style.y = a.getY(t.event), this.add(i), e.needRefresh = !0), this.isDragend = !1
            }
        }, s.inherits(e, i), t("../chart").define("island", e), e
    }), i("echarts/component", [], function () {
        var t = {}, e = {};
        return t.define = function (i, r) {
            return e[i] = r, t
        }, t.get = function (t) {
            return e[t]
        }, t
    }), i("echarts/component/title", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/color", "../component"], function (t) {
        function e(t, e, r, o, n) {
            i.call(this, t, e, r, o, n), this.refresh(o)
        }

        var i = t("./base"), r = t("zrender/shape/Text"), o = t("zrender/shape/Rectangle"), n = t("../config");
        n.title = {
            zlevel: 0,
            z: 6,
            show: !0,
            text: "",
            subtext: "",
            x: "left",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 5,
            textStyle: {fontSize: 18, fontWeight: "bolder", color: "#333"},
            subtextStyle: {color: "#aaa"}
        };
        var s = t("zrender/tool/util"), a = t("zrender/tool/area"), h = t("zrender/tool/color");
        return e.prototype = {
            type: n.COMPONENT_TYPE_TITLE, _buildShape: function () {
                if (this.titleOption.show) {
                    this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                    for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
                }
            }, _buildItem: function () {
                var t = this.titleOption.text, e = this.titleOption.link, i = this.titleOption.target, o = this.titleOption.subtext, n = this.titleOption.sublink, s = this.titleOption.subtarget, a = this.getFont(this.titleOption.textStyle), l = this.getFont(this.titleOption.subtextStyle), c = this._itemGroupLocation.x, d = this._itemGroupLocation.y, u = this._itemGroupLocation.width, p = this._itemGroupLocation.height, f = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {y: d, color: this.titleOption.textStyle.color, text: t, textFont: a, textBaseline: "top"},
                    highlightStyle: {color: h.lift(this.titleOption.textStyle.color, 1), brushType: "fill"},
                    hoverable: !1
                };
                e && (f.hoverable = !0, f.clickable = !0, f.onclick = function () {
                    i && "self" == i ? window.location = e : window.open(e)
                });
                var g = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        y: d + p,
                        color: this.titleOption.subtextStyle.color,
                        text: o,
                        textFont: l,
                        textBaseline: "bottom"
                    },
                    highlightStyle: {color: h.lift(this.titleOption.subtextStyle.color, 1), brushType: "fill"},
                    hoverable: !1
                };
                switch (n && (g.hoverable = !0, g.clickable = !0, g.onclick = function () {
                    s && "self" == s ? window.location = n : window.open(n)
                }), this.titleOption.x) {
                    case"center":
                        f.style.x = g.style.x = c + u / 2, f.style.textAlign = g.style.textAlign = "center";
                        break;
                    case"left":
                        f.style.x = g.style.x = c, f.style.textAlign = g.style.textAlign = "left";
                        break;
                    case"right":
                        f.style.x = g.style.x = c + u, f.style.textAlign = g.style.textAlign = "right";
                        break;
                    default:
                        c = this.titleOption.x - 0, c = isNaN(c) ? 0 : c, f.style.x = g.style.x = c
                }
                this.titleOption.textAlign && (f.style.textAlign = g.style.textAlign = this.titleOption.textAlign), this.shapeList.push(new r(f)), "" !== o && this.shapeList.push(new r(g))
            }, _buildBackground: function () {
                var t = this.reformCssArray(this.titleOption.padding);
                this.shapeList.push(new o({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - t[3],
                        y: this._itemGroupLocation.y - t[0],
                        width: this._itemGroupLocation.width + t[3] + t[1],
                        height: this._itemGroupLocation.height + t[0] + t[2],
                        brushType: 0 === this.titleOption.borderWidth ? "fill" : "both",
                        color: this.titleOption.backgroundColor,
                        strokeColor: this.titleOption.borderColor,
                        lineWidth: this.titleOption.borderWidth
                    }
                }))
            }, _getItemGroupLocation: function () {
                var t, e = this.reformCssArray(this.titleOption.padding), i = this.titleOption.text, r = this.titleOption.subtext, o = this.getFont(this.titleOption.textStyle), n = this.getFont(this.titleOption.subtextStyle), s = Math.max(a.getTextWidth(i, o), a.getTextWidth(r, n)), h = a.getTextHeight(i, o) + ("" === r ? 0 : this.titleOption.itemGap + a.getTextHeight(r, n)), l = this.zr.getWidth();
                switch (this.titleOption.x) {
                    case"center":
                        t = Math.floor((l - s) / 2);
                        break;
                    case"left":
                        t = e[3] + this.titleOption.borderWidth;
                        break;
                    case"right":
                        t = l - s - e[1] - this.titleOption.borderWidth;
                        break;
                    default:
                        t = this.titleOption.x - 0, t = isNaN(t) ? 0 : t
                }
                var c, d = this.zr.getHeight();
                switch (this.titleOption.y) {
                    case"top":
                        c = e[0] + this.titleOption.borderWidth;
                        break;
                    case"bottom":
                        c = d - h - e[2] - this.titleOption.borderWidth;
                        break;
                    case"center":
                        c = Math.floor((d - h) / 2);
                        break;
                    default:
                        c = this.titleOption.y - 0, c = isNaN(c) ? 0 : c
                }
                return {x: t, y: c, width: s, height: h}
            }, refresh: function (t) {
                t && (this.option = t, this.option.title = this.reformOption(this.option.title), this.titleOption = this.option.title, this.titleOption.textStyle = this.getTextStyle(this.titleOption.textStyle), this.titleOption.subtextStyle = this.getTextStyle(this.titleOption.subtextStyle)), this.clear(), this._buildShape()
            }
        }, s.inherits(e, i), t("../component").define("title", e), e
    }), i("zrender/config", [], function () {
        var t = {
            EVENT: {
                RESIZE: "resize",
                CLICK: "click",
                DBLCLICK: "dblclick",
                MOUSEWHEEL: "mousewheel",
                MOUSEMOVE: "mousemove",
                MOUSEOVER: "mouseover",
                MOUSEOUT: "mouseout",
                MOUSEDOWN: "mousedown",
                MOUSEUP: "mouseup",
                GLOBALOUT: "globalout",
                DRAGSTART: "dragstart",
                DRAGEND: "dragend",
                DRAGENTER: "dragenter",
                DRAGOVER: "dragover",
                DRAGLEAVE: "dragleave",
                DROP: "drop",
                touchClickDelay: 300
            },
            elementClassName: "zr-element",
            catchBrushException: !1,
            debugMode: 0,
            devicePixelRatio: Math.max(window.devicePixelRatio || 1, 1)
        };
        return t
    }), i("zrender/loadingEffect/Bar", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Rectangle"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/color"), n = t("../shape/Rectangle");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            var i = r.merge(this.options, {
                textStyle: {color: "#888"},
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effectOption: {
                    x: 0,
                    y: this.canvasHeight / 2 - 30,
                    width: this.canvasWidth,
                    height: 5,
                    brushType: "fill",
                    timeInterval: 100
                }
            }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effectOption, l = new n({highlightStyle: r.clone(h)});
            return l.highlightStyle.color = h.color || o.getLinearGradient(h.x, h.y, h.x + h.width, h.y + h.height, [[0, "#ff6400"], [.5, "#ffe100"], [1, "#b1ff00"]]), null != i.progress ? (t(a), l.highlightStyle.width = this.adjust(i.progress, [0, 1]) * i.effectOption.width, t(l), t(s), void e()) : (l.highlightStyle.width = 0, setInterval(function () {
                t(a), l.highlightStyle.width < h.width ? l.highlightStyle.width += 8 : l.highlightStyle.width = 0, t(l), t(s), e()
            }, h.timeInterval))
        }, e
    }), i("echarts/component/tooltip", ["require", "./base", "../util/shape/Cross", "zrender/shape/Line", "zrender/shape/Rectangle", "../config", "../util/ecData", "zrender/config", "zrender/tool/event", "zrender/tool/area", "zrender/tool/color", "zrender/tool/util", "zrender/shape/Base", "../component"], function (t) {
        function e(t, e, n, s, a) {
            i.call(this, t, e, n, s, a), this.dom = a.dom;
            var h = this;
            h._onmousemove = function (t) {
                return h.__onmousemove(t)
            }, h._onglobalout = function (t) {
                return h.__onglobalout(t)
            }, this.zr.on(l.EVENT.MOUSEMOVE, h._onmousemove), this.zr.on(l.EVENT.GLOBALOUT, h._onglobalout), h._hide = function (t) {
                return h.__hide(t)
            }, h._tryShow = function (t) {
                return h.__tryShow(t)
            }, h._refixed = function (t) {
                return h.__refixed(t)
            }, h._setContent = function (t, e) {
                return h.__setContent(t, e)
            }, this._tDom = this._tDom || document.createElement("div"), this._tDom.onselectstart = function () {
                return !1
            }, this._tDom.onmouseover = function () {
                h._mousein = !0
            }, this._tDom.onmouseout = function () {
                h._mousein = !1
            }, this._tDom.className = "echarts-tooltip", this._tDom.style.position = "absolute", this.hasAppend = !1, this._axisLineShape && this.zr.delShape(this._axisLineShape.id), this._axisLineShape = new o({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                invisible: !0,
                hoverable: !1
            }), this.shapeList.push(this._axisLineShape), this.zr.addShape(this._axisLineShape), this._axisShadowShape && this.zr.delShape(this._axisShadowShape.id), this._axisShadowShape = new o({
                zlevel: this.getZlevelBase(),
                z: 1,
                invisible: !0,
                hoverable: !1
            }), this.shapeList.push(this._axisShadowShape), this.zr.addShape(this._axisShadowShape), this._axisCrossShape && this.zr.delShape(this._axisCrossShape.id), this._axisCrossShape = new r({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                invisible: !0,
                hoverable: !1
            }), this.shapeList.push(this._axisCrossShape), this.zr.addShape(this._axisCrossShape), this.showing = !1, this.refresh(s)
        }

        var i = t("./base"), r = t("../util/shape/Cross"), o = t("zrender/shape/Line"), n = t("zrender/shape/Rectangle"), s = new n({}), a = t("../config");
        a.tooltip = {
            zlevel: 1,
            z: 8,
            show: !0,
            showContent: !0,
            trigger: "item",
            islandFormatter: "{a} <br/>{b} : {c}",
            showDelay: 20,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderColor: "#333",
            borderRadius: 4,
            borderWidth: 0,
            padding: 5,
            axisPointer: {
                type: "line",
                lineStyle: {color: "#48b", width: 2, type: "solid"},
                crossStyle: {color: "#1e90ff", width: 1, type: "dashed"},
                shadowStyle: {color: "rgba(150,150,150,0.3)", width: "auto", type: "default"}
            },
            textStyle: {color: "#fff"}
        };
        var h = t("../util/ecData"), l = t("zrender/config"), c = t("zrender/tool/event"), d = t("zrender/tool/area"), u = t("zrender/tool/color"), p = t("zrender/tool/util"), f = t("zrender/shape/Base");
        return e.prototype = {
            type: a.COMPONENT_TYPE_TOOLTIP,
            _gCssText: "position:absolute;display:block;border-style:solid;white-space:nowrap;",
            _style: function (t) {
                if (!t)return "";
                var e = [];
                if (t.transitionDuration) {
                    var i = "left " + t.transitionDuration + "s,top " + t.transitionDuration + "s";
                    e.push("transition:" + i), e.push("-moz-transition:" + i), e.push("-webkit-transition:" + i), e.push("-o-transition:" + i)
                }
                t.backgroundColor && (e.push("background-Color:" + u.toHex(t.backgroundColor)), e.push("filter:alpha(opacity=70)"), e.push("background-Color:" + t.backgroundColor)), null != t.borderWidth && e.push("border-width:" + t.borderWidth + "px"), null != t.borderColor && e.push("border-color:" + t.borderColor), null != t.borderRadius && (e.push("border-radius:" + t.borderRadius + "px"), e.push("-moz-border-radius:" + t.borderRadius + "px"), e.push("-webkit-border-radius:" + t.borderRadius + "px"), e.push("-o-border-radius:" + t.borderRadius + "px"));
                var r = t.textStyle;
                r && (r.color && e.push("color:" + r.color), r.decoration && e.push("text-decoration:" + r.decoration), r.align && e.push("text-align:" + r.align), r.fontFamily && e.push("font-family:" + r.fontFamily), r.fontSize && e.push("font-size:" + r.fontSize + "px"), r.fontSize && e.push("line-height:" + Math.round(3 * r.fontSize / 2) + "px"), r.fontStyle && e.push("font-style:" + r.fontStyle), r.fontWeight && e.push("font-weight:" + r.fontWeight));
                var o = t.padding;
                return null != o && (o = this.reformCssArray(o), e.push("padding:" + o[0] + "px " + o[1] + "px " + o[2] + "px " + o[3] + "px")), e = e.join(";") + ";"
            },
            __hide: function () {
                this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, this._tDom && (this._tDom.style.display = "none");
                var t = !1;
                this._axisLineShape.invisible || (this._axisLineShape.invisible = !0, this.zr.modShape(this._axisLineShape.id), t = !0), this._axisShadowShape.invisible || (this._axisShadowShape.invisible = !0, this.zr.modShape(this._axisShadowShape.id), t = !0), this._axisCrossShape.invisible || (this._axisCrossShape.invisible = !0, this.zr.modShape(this._axisCrossShape.id), t = !0), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2), t && this.zr.refreshNextFrame(), this.showing = !1
            },
            _show: function (t, e, i, r) {
                var o = this._tDom.offsetHeight, n = this._tDom.offsetWidth;
                t && ("function" == typeof t && (t = t([e, i])), t instanceof Array && (e = t[0], i = t[1])), e + n > this._zrWidth && (e -= n + 40), i + o > this._zrHeight && (i -= o - 20), 20 > i && (i = 0), this._tDom.style.cssText = this._gCssText + this._defaultCssText + (r ? r : "") + "left:" + e + "px;top:" + i + "px;", (10 > o || 10 > n) && setTimeout(this._refixed, 20), this.showing = !0
            },
            __refixed: function () {
                if (this._tDom) {
                    var t = "", e = this._tDom.offsetHeight, i = this._tDom.offsetWidth;
                    this._tDom.offsetLeft + i > this._zrWidth && (t += "left:" + (this._zrWidth - i - 20) + "px;"), this._tDom.offsetTop + e > this._zrHeight && (t += "top:" + (this._zrHeight - e - 10) + "px;"), "" !== t && (this._tDom.style.cssText += t)
                }
            },
            __tryShow: function () {
                var t, e;
                if (this._curTarget) {
                    if ("island" === this._curTarget._type && this.option.tooltip.show)return void this._showItemTrigger();
                    var i = h.get(this._curTarget, "series"), r = h.get(this._curTarget, "data");
                    t = this.deepQuery([r, i, this.option], "tooltip.show"), null != i && null != r && t ? (e = this.deepQuery([r, i, this.option], "tooltip.trigger"), "axis" === e ? this._showAxisTrigger(i.xAxisIndex, i.yAxisIndex, h.get(this._curTarget, "dataIndex")) : this._showItemTrigger()) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
                } else this._findPolarTrigger() || this._findAxisTrigger()
            },
            _findAxisTrigger: function () {
                if (!this.component.xAxis || !this.component.yAxis)return void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
                for (var t, e, i = this.option.series, r = 0, o = i.length; o > r; r++)if ("axis" === this.deepQuery([i[r], this.option], "tooltip.trigger"))return t = i[r].xAxisIndex || 0, e = i[r].yAxisIndex || 0, this.component.xAxis.getAxis(t) && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("x", this.component.xAxis.getAxis(t))) : this.component.yAxis.getAxis(e) && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? void this._showAxisTrigger(t, e, this._getNearestDataIndex("y", this.component.yAxis.getAxis(e))) : void this._showAxisTrigger(t, e, -1);
                "cross" === this.option.tooltip.axisPointer.type && this._showAxisTrigger(-1, -1, -1)
            },
            _findPolarTrigger: function () {
                if (!this.component.polar)return !1;
                var t, e = c.getX(this._event), i = c.getY(this._event), r = this.component.polar.getNearestIndex([e, i]);
                return r ? (t = r.valueIndex, r = r.polarIndex) : r = -1, -1 != r ? this._showPolarTrigger(r, t) : !1
            },
            _getNearestDataIndex: function (t, e) {
                var i = -1, r = c.getX(this._event), o = c.getY(this._event);
                if ("x" === t) {
                    for (var n, s, a = this.component.grid.getXend(), h = e.getCoordByIndex(i); a > h && (s = h, r >= h);)n = h, h = e.getCoordByIndex(++i);
                    return 0 >= i ? i = 0 : s - r >= r - n ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1), i
                }
                for (var l, d, u = this.component.grid.getY(), h = e.getCoordByIndex(i); h > u && (l = h, h >= o);)d = h, h = e.getCoordByIndex(++i);
                return 0 >= i ? i = 0 : o - l >= d - o ? i -= 1 : null == e.getNameByIndex(i) && (i -= 1), i
            },
            _showAxisTrigger: function (t, e, i) {
                if (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_IN_GRID, this._event, null, this.myChart), null == this.component.xAxis || null == this.component.yAxis || null == t || null == e)return clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), void(this._hidingTicket = setTimeout(this._hide, this._hideDelay));
                var r, o, n, s, h = this.option.series, l = [], d = [], u = "";
                if ("axis" === this.option.tooltip.trigger) {
                    if (!this.option.tooltip.show)return;
                    o = this.option.tooltip.formatter, n = this.option.tooltip.position
                }
                var p, f, g = -1 != t && this.component.xAxis.getAxis(t).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "xAxis" : -1 != e && this.component.yAxis.getAxis(e).type === a.COMPONENT_TYPE_AXIS_CATEGORY ? "yAxis" : !1;
                if (g) {
                    var m = "xAxis" == g ? t : e;
                    r = this.component[g].getAxis(m);
                    for (var _ = 0, y = h.length; y > _; _++)this._isSelected(h[_].name) && h[_][g + "Index"] === m && "axis" === this.deepQuery([h[_], this.option], "tooltip.trigger") && (s = this.query(h[_], "tooltip.showContent") || s, o = this.query(h[_], "tooltip.formatter") || o, n = this.query(h[_], "tooltip.position") || n, u += this._style(this.query(h[_], "tooltip")), null != h[_].stack && "xAxis" == g ? (l.unshift(h[_]), d.unshift(_)) : (l.push(h[_]), d.push(_)));
                    this.messageCenter.dispatch(a.EVENT.TOOLTIP_HOVER, this._event, {
                        seriesIndex: d,
                        dataIndex: i
                    }, this.myChart);
                    var v;
                    "xAxis" == g ? (p = this.subPixelOptimize(r.getCoordByIndex(i), this._axisLineWidth), f = c.getY(this._event), v = [p, this.component.grid.getY(), p, this.component.grid.getYend()]) : (p = c.getX(this._event), f = this.subPixelOptimize(r.getCoordByIndex(i), this._axisLineWidth), v = [this.component.grid.getX(), f, this.component.grid.getXend(), f]), this._styleAxisPointer(l, v[0], v[1], v[2], v[3], r.getGap(), p, f)
                } else p = c.getX(this._event), f = c.getY(this._event), this._styleAxisPointer(h, this.component.grid.getX(), f, this.component.grid.getXend(), f, 0, p, f), i >= 0 ? this._showItemTrigger(!0) : (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._tDom.style.display = "none");
                if (l.length > 0) {
                    if (this._lastItemTriggerId = -1, this._lastDataIndex != i || this._lastSeriesIndex != d[0]) {
                        this._lastDataIndex = i, this._lastSeriesIndex = d[0];
                        var x, b;
                        if ("function" == typeof o) {
                            for (var T = [], _ = 0, y = l.length; y > _; _++)x = l[_].data[i], b = this.getDataFromOption(x, "-"), T.push({
                                seriesIndex: d[_],
                                seriesName: l[_].name || "",
                                series: l[_],
                                dataIndex: i,
                                data: x,
                                name: r.getNameByIndex(i),
                                value: b,
                                0: l[_].name || "",
                                1: r.getNameByIndex(i),
                                2: b,
                                3: x
                            });
                            this._curTicket = "axis:" + i, this._tDom.innerHTML = o.call(this.myChart, T, this._curTicket, this._setContent)
                        } else if ("string" == typeof o) {
                            this._curTicket = 0 / 0, o = o.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}");
                            for (var _ = 0, y = l.length; y > _; _++)o = o.replace("{a" + _ + "}", this._encodeHTML(l[_].name || "")), o = o.replace("{b" + _ + "}", this._encodeHTML(r.getNameByIndex(i))), x = l[_].data[i], x = this.getDataFromOption(x, "-"), o = o.replace("{c" + _ + "}", x instanceof Array ? x : this.numAddCommas(x));
                            this._tDom.innerHTML = o
                        } else {
                            this._curTicket = 0 / 0, o = this._encodeHTML(r.getNameByIndex(i));
                            for (var _ = 0, y = l.length; y > _; _++)o += "<br/>" + this._encodeHTML(l[_].name || "") + " : ", x = l[_].data[i], x = this.getDataFromOption(x, "-"), o += x instanceof Array ? x : this.numAddCommas(x);
                            this._tDom.innerHTML = o
                        }
                    }
                    if (s === !1 || !this.option.tooltip.showContent)return;
                    this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(n, p + 10, f + 10, u)
                }
            },
            _showPolarTrigger: function (t, e) {
                if (null == this.component.polar || null == t || null == e || 0 > e)return !1;
                var i, r, o, n = this.option.series, s = [], a = [], h = "";
                if ("axis" === this.option.tooltip.trigger) {
                    if (!this.option.tooltip.show)return !1;
                    i = this.option.tooltip.formatter, r = this.option.tooltip.position
                }
                for (var l = this.option.polar[t].indicator[e].text, d = 0, u = n.length; u > d; d++)this._isSelected(n[d].name) && n[d].polarIndex === t && "axis" === this.deepQuery([n[d], this.option], "tooltip.trigger") && (o = this.query(n[d], "tooltip.showContent") || o, i = this.query(n[d], "tooltip.formatter") || i, r = this.query(n[d], "tooltip.position") || r, h += this._style(this.query(n[d], "tooltip")), s.push(n[d]), a.push(d));
                if (s.length > 0) {
                    for (var p, f, g, m = [], d = 0, u = s.length; u > d; d++) {
                        p = s[d].data;
                        for (var _ = 0, y = p.length; y > _; _++)f = p[_], this._isSelected(f.name) && (f = null != f ? f : {
                            name: "",
                            value: {dataIndex: "-"}
                        }, g = this.getDataFromOption(f.value[e]), m.push({
                            seriesIndex: a[d],
                            seriesName: s[d].name || "",
                            series: s[d],
                            dataIndex: e,
                            data: f,
                            name: f.name,
                            indicator: l,
                            value: g,
                            0: s[d].name || "",
                            1: f.name,
                            2: g,
                            3: l
                        }))
                    }
                    if (m.length <= 0)return;
                    if (this._lastItemTriggerId = -1, this._lastDataIndex != e || this._lastSeriesIndex != a[0])if (this._lastDataIndex = e, this._lastSeriesIndex = a[0], "function" == typeof i)this._curTicket = "axis:" + e, this._tDom.innerHTML = i.call(this.myChart, m, this._curTicket, this._setContent); else if ("string" == typeof i) {
                        i = i.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}").replace("{d}", "{d0}");
                        for (var d = 0, u = m.length; u > d; d++)i = i.replace("{a" + d + "}", this._encodeHTML(m[d].seriesName)), i = i.replace("{b" + d + "}", this._encodeHTML(m[d].name)), i = i.replace("{c" + d + "}", this.numAddCommas(m[d].value)), i = i.replace("{d" + d + "}", this._encodeHTML(m[d].indicator));
                        this._tDom.innerHTML = i
                    } else {
                        i = this._encodeHTML(m[0].name) + "<br/>" + this._encodeHTML(m[0].indicator) + " : " + this.numAddCommas(m[0].value);
                        for (var d = 1, u = m.length; u > d; d++)i += "<br/>" + this._encodeHTML(m[d].name) + "<br/>", i += this._encodeHTML(m[d].indicator) + " : " + this.numAddCommas(m[d].value);
                        this._tDom.innerHTML = i
                    }
                    if (o === !1 || !this.option.tooltip.showContent)return;
                    return this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(r, c.getX(this._event), c.getY(this._event), h), !0
                }
            },
            _showItemTrigger: function (t) {
                if (this._curTarget) {
                    var e, i, r, o = h.get(this._curTarget, "series"), n = h.get(this._curTarget, "seriesIndex"), s = h.get(this._curTarget, "data"), l = h.get(this._curTarget, "dataIndex"), d = h.get(this._curTarget, "name"), u = h.get(this._curTarget, "value"), p = h.get(this._curTarget, "special"), f = h.get(this._curTarget, "special2"), g = [s, o, this.option], m = "";
                    if ("island" != this._curTarget._type) {
                        var _ = t ? "axis" : "item";
                        this.option.tooltip.trigger === _ && (e = this.option.tooltip.formatter, i = this.option.tooltip.position), this.query(o, "tooltip.trigger") === _ && (r = this.query(o, "tooltip.showContent") || r, e = this.query(o, "tooltip.formatter") || e, i = this.query(o, "tooltip.position") || i, m += this._style(this.query(o, "tooltip"))), r = this.query(s, "tooltip.showContent") || r, e = this.query(s, "tooltip.formatter") || e, i = this.query(s, "tooltip.position") || i, m += this._style(this.query(s, "tooltip"))
                    } else this._lastItemTriggerId = 0 / 0, r = this.deepQuery(g, "tooltip.showContent"), e = this.deepQuery(g, "tooltip.islandFormatter"), i = this.deepQuery(g, "tooltip.islandPosition");
                    this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId !== this._curTarget.id && (this._lastItemTriggerId = this._curTarget.id, "function" == typeof e ? (this._curTicket = (o.name || "") + ":" + l, this._tDom.innerHTML = e.call(this.myChart, {
                        seriesIndex: n,
                        seriesName: o.name || "",
                        series: o,
                        dataIndex: l,
                        data: s,
                        name: d,
                        value: u,
                        percent: p,
                        indicator: p,
                        value2: f,
                        indicator2: f,
                        0: o.name || "",
                        1: d,
                        2: u,
                        3: p,
                        4: f,
                        5: s,
                        6: n,
                        7: l
                    }, this._curTicket, this._setContent)) : "string" == typeof e ? (this._curTicket = 0 / 0, e = e.replace("{a}", "{a0}").replace("{b}", "{b0}").replace("{c}", "{c0}"), e = e.replace("{a0}", this._encodeHTML(o.name || "")).replace("{b0}", this._encodeHTML(d)).replace("{c0}", u instanceof Array ? u : this.numAddCommas(u)), e = e.replace("{d}", "{d0}").replace("{d0}", p || ""), e = e.replace("{e}", "{e0}").replace("{e0}", h.get(this._curTarget, "special2") || ""), this._tDom.innerHTML = e) : (this._curTicket = 0 / 0, this._tDom.innerHTML = o.type === a.CHART_TYPE_RADAR && p ? this._itemFormatter.radar.call(this, o, d, u, p) : o.type === a.CHART_TYPE_EVENTRIVER ? this._itemFormatter.eventRiver.call(this, o, d, u, s) : "" + (null != o.name ? this._encodeHTML(o.name) + "<br/>" : "") + ("" === d ? "" : this._encodeHTML(d) + " : ") + (u instanceof Array ? u : this.numAddCommas(u))));
                    var y = c.getX(this._event), v = c.getY(this._event);
                    this.deepQuery(g, "tooltip.axisPointer.show") && this.component.grid ? this._styleAxisPointer([o], this.component.grid.getX(), v, this.component.grid.getXend(), v, 0, y, v) : this._hide(), r !== !1 && this.option.tooltip.showContent && (this.hasAppend || (this._tDom.style.left = this._zrWidth / 2 + "px", this._tDom.style.top = this._zrHeight / 2 + "px", this.dom.firstChild.appendChild(this._tDom), this.hasAppend = !0), this._show(i, y + 20, v - 20, m))
                }
            },
            _itemFormatter: {
                radar: function (t, e, i, r) {
                    var o = "";
                    o += this._encodeHTML("" === e ? t.name || "" : e), o += "" === o ? "" : "<br />";
                    for (var n = 0; n < r.length; n++)o += this._encodeHTML(r[n].text) + " : " + this.numAddCommas(i[n]) + "<br />";
                    return o
                }, chord: function (t, e, i, r, o) {
                    if (null == o)return this._encodeHTML(e) + " (" + this.numAddCommas(i) + ")";
                    var n = this._encodeHTML(e), s = this._encodeHTML(r);
                    return "" + (null != t.name ? this._encodeHTML(t.name) + "<br/>" : "") + n + " -> " + s + " (" + this.numAddCommas(i) + ")<br />" + s + " -> " + n + " (" + this.numAddCommas(o) + ")"
                }, eventRiver: function (t, e, i, r) {
                    var o = "";
                    o += this._encodeHTML("" === t.name ? "" : t.name + " : "), o += this._encodeHTML(e), o += "" === o ? "" : "<br />", r = r.evolution;
                    for (var n = 0, s = r.length; s > n; n++)o += '<div style="padding-top:5px;">', r[n].detail && (r[n].detail.img && (o += '<img src="' + r[n].detail.img + '" style="float:left;width:40px;height:40px;">'), o += '<div style="margin-left:45px;">' + r[n].time + "<br/>", o += '<a href="' + r[n].detail.link + '" target="_blank">', o += r[n].detail.text + "</a></div>", o += "</div>");
                    return o
                }
            },
            _styleAxisPointer: function (t, e, i, r, o, n, s, a) {
                if (t.length > 0) {
                    var h, l, c = this.option.tooltip.axisPointer, d = c.type, u = {line: {}, cross: {}, shadow: {}};
                    for (var p in u)u[p].color = c[p + "Style"].color, u[p].width = c[p + "Style"].width, u[p].type = c[p + "Style"].type;
                    for (var f = 0, g = t.length; g > f; f++)h = t[f], l = this.query(h, "tooltip.axisPointer.type"), d = l || d, l && (u[l].color = this.query(h, "tooltip.axisPointer." + l + "Style.color") || u[l].color, u[l].width = this.query(h, "tooltip.axisPointer." + l + "Style.width") || u[l].width, u[l].type = this.query(h, "tooltip.axisPointer." + l + "Style.type") || u[l].type);
                    if ("line" === d) {
                        var m = u.line.width, _ = e == r;
                        this._axisLineShape.style = {
                            xStart: _ ? this.subPixelOptimize(e, m) : e,
                            yStart: _ ? i : this.subPixelOptimize(i, m),
                            xEnd: _ ? this.subPixelOptimize(r, m) : r,
                            yEnd: _ ? o : this.subPixelOptimize(o, m),
                            strokeColor: u.line.color,
                            lineWidth: m,
                            lineType: u.line.type
                        }, this._axisLineShape.invisible = !1, this.zr.modShape(this._axisLineShape.id)
                    } else if ("cross" === d) {
                        var y = u.cross.width;
                        this._axisCrossShape.style = {
                            brushType: "stroke",
                            rect: this.component.grid.getArea(),
                            x: this.subPixelOptimize(s, y),
                            y: this.subPixelOptimize(a, y),
                            text: ("( " + this.component.xAxis.getAxis(0).getValueFromCoord(s) + " , " + this.component.yAxis.getAxis(0).getValueFromCoord(a) + " )").replace("  , ", " ").replace(" ,  ", " "),
                            textPosition: "specific",
                            strokeColor: u.cross.color,
                            lineWidth: y,
                            lineType: u.cross.type
                        }, this.component.grid.getXend() - s > 100 ? (this._axisCrossShape.style.textAlign = "left", this._axisCrossShape.style.textX = s + 10) : (this._axisCrossShape.style.textAlign = "right", this._axisCrossShape.style.textX = s - 10), a - this.component.grid.getY() > 50 ? (this._axisCrossShape.style.textBaseline = "bottom", this._axisCrossShape.style.textY = a - 10) : (this._axisCrossShape.style.textBaseline = "top", this._axisCrossShape.style.textY = a + 10), this._axisCrossShape.invisible = !1, this.zr.modShape(this._axisCrossShape.id)
                    } else"shadow" === d && ((null == u.shadow.width || "auto" === u.shadow.width || isNaN(u.shadow.width)) && (u.shadow.width = n), e === r ? Math.abs(this.component.grid.getX() - e) < 2 ? (u.shadow.width /= 2, e = r += u.shadow.width / 2) : Math.abs(this.component.grid.getXend() - e) < 2 && (u.shadow.width /= 2, e = r -= u.shadow.width / 2) : i === o && (Math.abs(this.component.grid.getY() - i) < 2 ? (u.shadow.width /= 2, i = o += u.shadow.width / 2) : Math.abs(this.component.grid.getYend() - i) < 2 && (u.shadow.width /= 2, i = o -= u.shadow.width / 2)), this._axisShadowShape.style = {
                        xStart: e,
                        yStart: i,
                        xEnd: r,
                        yEnd: o,
                        strokeColor: u.shadow.color,
                        lineWidth: u.shadow.width
                    }, this._axisShadowShape.invisible = !1, this.zr.modShape(this._axisShadowShape.id));
                    this.zr.refreshNextFrame()
                }
            },
            __onmousemove: function (t) {
                if (clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), !this._mousein || !this._enterable) {
                    var e = t.target, i = c.getX(t.event), r = c.getY(t.event);
                    if (e) {
                        this._curTarget = e, this._event = t.event, this._event.zrenderX = i, this._event.zrenderY = r;
                        var o;
                        if (this._needAxisTrigger && this.component.polar && -1 != (o = this.component.polar.isInside([i, r])))for (var n = this.option.series, h = 0, l = n.length; l > h; h++)if (n[h].polarIndex === o && "axis" === this.deepQuery([n[h], this.option], "tooltip.trigger")) {
                            this._curTarget = null;
                            break
                        }
                        this._showingTicket = setTimeout(this._tryShow, this._showDelay)
                    } else this._curTarget = !1, this._event = t.event, this._event.zrenderX = i, this._event.zrenderY = r, this._needAxisTrigger && this.component.grid && d.isInside(s, this.component.grid.getArea(), i, r) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : this._needAxisTrigger && this.component.polar && -1 != this.component.polar.isInside([i, r]) ? this._showingTicket = setTimeout(this._tryShow, this._showDelay) : (!this._event.connectTrigger && this.messageCenter.dispatch(a.EVENT.TOOLTIP_OUT_GRID, this._event, null, this.myChart), this._hidingTicket = setTimeout(this._hide, this._hideDelay))
                }
            },
            __onglobalout: function () {
                clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this._hidingTicket = setTimeout(this._hide, this._hideDelay)
            },
            __setContent: function (t, e) {
                this._tDom && (t === this._curTicket && (this._tDom.innerHTML = e), setTimeout(this._refixed, 20))
            },
            ontooltipHover: function (t, e) {
                if (!this._lastTipShape || this._lastTipShape && this._lastTipShape.dataIndex != t.dataIndex) {
                    this._lastTipShape && this._lastTipShape.tipShape.length > 0 && (this.zr.delShape(this._lastTipShape.tipShape), this.shapeList.length = 2);
                    for (var i = 0, r = e.length; r > i; i++)e[i].zlevel = this.getZlevelBase(), e[i].z = this.getZBase(), e[i].style = f.prototype.getHighlightStyle(e[i].style, e[i].highlightStyle), e[i].draggable = !1, e[i].hoverable = !1, e[i].clickable = !1, e[i].ondragend = null, e[i].ondragover = null, e[i].ondrop = null, this.shapeList.push(e[i]), this.zr.addShape(e[i]);
                    this._lastTipShape = {dataIndex: t.dataIndex, tipShape: e}
                }
            },
            ondragend: function () {
                this._hide()
            },
            onlegendSelected: function (t) {
                this._selectedMap = t.selected
            },
            _setSelectedMap: function () {
                this._selectedMap = this.component.legend ? p.clone(this.component.legend.getSelectedMap()) : {}
            },
            _isSelected: function (t) {
                return null != this._selectedMap[t] ? this._selectedMap[t] : !0
            },
            showTip: function (t) {
                if (t) {
                    var e, i = this.option.series;
                    if (null != t.seriesIndex)e = t.seriesIndex; else for (var r = t.seriesName, o = 0, n = i.length; n > o; o++)if (i[o].name === r) {
                        e = o;
                        break
                    }
                    var s = i[e];
                    if (null != s) {
                        var c = this.myChart.chart[s.type], d = "axis" === this.deepQuery([s, this.option], "tooltip.trigger");
                        if (c)if (d) {
                            var u = t.dataIndex;
                            switch (c.type) {
                                case a.CHART_TYPE_LINE:
                                case a.CHART_TYPE_BAR:
                                case a.CHART_TYPE_K:
                                case a.CHART_TYPE_RADAR:
                                    if (null == this.component.polar || s.data[0].value.length <= u)return;
                                    var p = s.polarIndex || 0, f = this.component.polar.getVector(p, u, "max");
                                    this._event = {zrenderX: f[0], zrenderY: f[1]}, this._showPolarTrigger(p, u)
                            }
                        } else {
                            var g, m, _ = c.shapeList;
                            switch (c.type) {
                                case a.CHART_TYPE_LINE:
                                case a.CHART_TYPE_BAR:
                                case a.CHART_TYPE_K:
                                case a.CHART_TYPE_TREEMAP:
                                case a.CHART_TYPE_SCATTER:
                                    for (var u = t.dataIndex, o = 0, n = _.length; n > o; o++)if (null == _[o]._mark && h.get(_[o], "seriesIndex") == e && h.get(_[o], "dataIndex") == u) {
                                        this._curTarget = _[o], g = _[o].style.x, m = c.type != a.CHART_TYPE_K ? _[o].style.y : _[o].style.y[0];
                                        break
                                    }
                                    break;
                                case a.CHART_TYPE_RADAR:
                                    for (var u = t.dataIndex, o = 0, n = _.length; n > o; o++)if ("polygon" === _[o].type && h.get(_[o], "seriesIndex") == e && h.get(_[o], "dataIndex") == u) {
                                        this._curTarget = _[o];
                                        var f = this.component.polar.getCenter(s.polarIndex || 0);
                                        g = f[0], m = f[1];
                                        break
                                    }
                                    break;
                                case a.CHART_TYPE_PIE:
                                    for (var y = t.name, o = 0, n = _.length; n > o; o++)if ("sector" === _[o].type && h.get(_[o], "seriesIndex") == e && h.get(_[o], "name") == y) {
                                        this._curTarget = _[o];
                                        var v = this._curTarget.style, x = (v.startAngle + v.endAngle) / 2 * Math.PI / 180;
                                        g = this._curTarget.style.x + Math.cos(x) * v.r / 1.5, m = this._curTarget.style.y - Math.sin(x) * v.r / 1.5;
                                        break
                                    }
                                    break;
                                case a.CHART_TYPE_MAP:
                                    for (var y = t.name, b = s.mapType, o = 0, n = _.length; n > o; o++)if ("text" === _[o].type && _[o]._mapType === b && _[o].style._name === y) {
                                        this._curTarget = _[o], g = this._curTarget.style.x + this._curTarget.position[0], m = this._curTarget.style.y + this._curTarget.position[1];
                                        break
                                    }
                                    break;
                                case a.CHART_TYPE_CHORD:
                                    for (var y = t.name, o = 0, n = _.length; n > o; o++)if ("sector" === _[o].type && h.get(_[o], "name") == y) {
                                        this._curTarget = _[o];
                                        var v = this._curTarget.style, x = (v.startAngle + v.endAngle) / 2 * Math.PI / 180;
                                        return g = this._curTarget.style.x + Math.cos(x) * (v.r - 2), m = this._curTarget.style.y - Math.sin(x) * (v.r - 2), void this.zr.trigger(l.EVENT.MOUSEMOVE, {
                                            zrenderX: g,
                                            zrenderY: m
                                        })
                                    }
                                    break;
                                case a.CHART_TYPE_FORCE:
                                    for (var y = t.name, o = 0, n = _.length; n > o; o++)if ("circle" === _[o].type && h.get(_[o], "name") == y) {
                                        this._curTarget = _[o], g = this._curTarget.position[0], m = this._curTarget.position[1];
                                        break
                                    }
                            }
                            null != g && null != m && (this._event = {
                                zrenderX: g,
                                zrenderY: m
                            }, this.zr.addHoverShape(this._curTarget), this.zr.refreshHover(), this._showItemTrigger())
                        }
                    }
                }
            },
            hideTip: function () {
                this._hide()
            },
            refresh: function (t) {
                if (this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), this._lastTipShape = !1, this.shapeList.length = 2, this._lastDataIndex = -1, this._lastSeriesIndex = -1, this._lastItemTriggerId = -1, t) {
                    this.option = t, this.option.tooltip = this.reformOption(this.option.tooltip), this.option.tooltip.textStyle = p.merge(this.option.tooltip.textStyle, this.ecTheme.textStyle), this._needAxisTrigger = !1, "axis" === this.option.tooltip.trigger && (this._needAxisTrigger = !0);
                    for (var e = this.option.series, i = 0, r = e.length; r > i; i++)if ("axis" === this.query(e[i], "tooltip.trigger")) {
                        this._needAxisTrigger = !0;
                        break
                    }
                    this._showDelay = this.option.tooltip.showDelay, this._hideDelay = this.option.tooltip.hideDelay, this._defaultCssText = this._style(this.option.tooltip), this._setSelectedMap(), this._axisLineWidth = this.option.tooltip.axisPointer.lineStyle.width, this._enterable = this.option.tooltip.enterable, !this._enterable && this._tDom.className.indexOf(l.elementClassName) < 0 && (this._tDom.className += " " + l.elementClassName)
                }
                if (this.showing) {
                    var o = this;
                    setTimeout(function () {
                        o.zr.trigger(l.EVENT.MOUSEMOVE, o.zr.handler._event)
                    }, 50)
                }
            },
            onbeforDispose: function () {
                this._lastTipShape && this._lastTipShape.tipShape.length > 0 && this.zr.delShape(this._lastTipShape.tipShape), clearTimeout(this._hidingTicket), clearTimeout(this._showingTicket), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove), this.zr.un(l.EVENT.GLOBALOUT, this._onglobalout), this.hasAppend && this.dom.firstChild && this.dom.firstChild.removeChild(this._tDom), this._tDom = null
            },
            _encodeHTML: function (t) {
                return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
            }
        }, p.inherits(e, i), t("../component").define("tooltip", e), e
    }), i("zrender/loadingEffect/Bubble", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Circle"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/color"), n = t("../shape/Circle");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            for (var i = r.merge(this.options, {
                textStyle: {color: "#888"},
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effect: {n: 50, lineWidth: 2, brushType: "stroke", color: "random", timeInterval: 100}
            }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effect, l = h.n, c = h.brushType, d = h.lineWidth, u = [], p = this.canvasWidth, f = this.canvasHeight, g = 0; l > g; g++) {
                var m = "random" == h.color ? o.alpha(o.random(), .3) : h.color;
                u[g] = new n({
                    highlightStyle: {
                        x: Math.ceil(Math.random() * p),
                        y: Math.ceil(Math.random() * f),
                        r: Math.ceil(40 * Math.random()),
                        brushType: c,
                        color: m,
                        strokeColor: m,
                        lineWidth: d
                    }, animationY: Math.ceil(20 * Math.random())
                })
            }
            return setInterval(function () {
                t(a);
                for (var i = 0; l > i; i++) {
                    var r = u[i].highlightStyle;
                    r.y - u[i].animationY + r.r <= 0 && (u[i].highlightStyle.y = f + r.r, u[i].highlightStyle.x = Math.ceil(Math.random() * p)), u[i].highlightStyle.y -= u[i].animationY, t(u[i])
                }
                t(s), e()
            }, h.timeInterval)
        }, e
    }), i("zrender/loadingEffect/DynamicLine", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Line"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/color"), n = t("../shape/Line");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            for (var i = r.merge(this.options, {
                textStyle: {color: "#fff"},
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                effectOption: {n: 30, lineWidth: 1, color: "random", timeInterval: 100}
            }), s = this.createTextShape(i.textStyle), a = this.createBackgroundShape(i.backgroundColor), h = i.effectOption, l = h.n, c = h.lineWidth, d = [], u = this.canvasWidth, p = this.canvasHeight, f = 0; l > f; f++) {
                var g = -Math.ceil(1e3 * Math.random()), m = Math.ceil(400 * Math.random()), _ = Math.ceil(Math.random() * p), y = "random" == h.color ? o.random() : h.color;
                d[f] = new n({
                    highlightStyle: {
                        xStart: g,
                        yStart: _,
                        xEnd: g + m,
                        yEnd: _,
                        strokeColor: y,
                        lineWidth: c
                    }, animationX: Math.ceil(100 * Math.random()), len: m
                })
            }
            return setInterval(function () {
                t(a);
                for (var i = 0; l > i; i++) {
                    var r = d[i].highlightStyle;
                    r.xStart >= u && (d[i].len = Math.ceil(400 * Math.random()), r.xStart = -400, r.xEnd = -400 + d[i].len, r.yStart = Math.ceil(Math.random() * p), r.yEnd = r.yStart), r.xStart += d[i].animationX, r.xEnd += d[i].animationX, t(d[i])
                }
                t(s), e()
            }, h.timeInterval)
        }, e
    }), i("echarts/component/timeline", ["require", "./base", "zrender/shape/Rectangle", "../util/shape/Icon", "../util/shape/Chain", "../config", "zrender/tool/util", "zrender/tool/area", "zrender/tool/event", "../component"], function (t) {
        function e(t, e, i, o, n) {
            r.call(this, t, e, i, o, n);
            var s = this;
            if (s._onclick = function (t) {
                    return s.__onclick(t)
                }, s._ondrift = function (t, e) {
                    return s.__ondrift(this, t, e)
                }, s._ondragend = function () {
                    return s.__ondragend()
                }, s._setCurrentOption = function () {
                    var t = s.timelineOption;
                    s.currentIndex %= t.data.length;
                    var e = s.options[s.currentIndex] || {};
                    s.myChart._setOption(e, t.notMerge, !0), s.messageCenter.dispatch(a.EVENT.TIMELINE_CHANGED, null, {
                        currentIndex: s.currentIndex,
                        data: null != t.data[s.currentIndex].name ? t.data[s.currentIndex].name : t.data[s.currentIndex]
                    }, s.myChart)
                }, s._onFrame = function () {
                    s._setCurrentOption(), s._syncHandleShape(), s.timelineOption.autoPlay && (s.playTicket = setTimeout(function () {
                        return s.currentIndex += 1, !s.timelineOption.loop && s.currentIndex >= s.timelineOption.data.length ? (s.currentIndex = s.timelineOption.data.length - 1, void s.stop()) : void s._onFrame()
                    }, s.timelineOption.playInterval))
                }, this.setTheme(!1), this.options = this.option.options, this.currentIndex = this.timelineOption.currentIndex % this.timelineOption.data.length, this.timelineOption.notMerge || 0 === this.currentIndex || (this.options[this.currentIndex] = h.merge(this.options[this.currentIndex], this.options[0])), this.timelineOption.show && (this._buildShape(), this._syncHandleShape()), this._setCurrentOption(), this.timelineOption.autoPlay) {
                var s = this;
                this.playTicket = setTimeout(function () {
                    s.play()
                }, null != this.ecTheme.animationDuration ? this.ecTheme.animationDuration : a.animationDuration)
            }
        }

        function i(t, e) {
            var i = 2, r = e.x + i, o = e.y + i + 2, s = e.width - i, a = e.height - i, h = e.symbol;
            if ("last" === h)t.moveTo(r + s - 2, o + a / 3), t.lineTo(r + s - 2, o), t.lineTo(r + 2, o + a / 2), t.lineTo(r + s - 2, o + a), t.lineTo(r + s - 2, o + a / 3 * 2), t.moveTo(r, o), t.lineTo(r, o); else if ("next" === h)t.moveTo(r + 2, o + a / 3), t.lineTo(r + 2, o), t.lineTo(r + s - 2, o + a / 2), t.lineTo(r + 2, o + a), t.lineTo(r + 2, o + a / 3 * 2), t.moveTo(r, o), t.lineTo(r, o); else if ("play" === h)if ("stop" === e.status)t.moveTo(r + 2, o), t.lineTo(r + s - 2, o + a / 2), t.lineTo(r + 2, o + a), t.lineTo(r + 2, o); else {
                var l = "both" === e.brushType ? 2 : 3;
                t.rect(r + 2, o, l, a), t.rect(r + s - l - 2, o, l, a)
            } else if (h.match("image")) {
                var c = "";
                c = h.replace(new RegExp("^image:\\/\\/"), ""), h = n.prototype.iconLibrary.image, h(t, {
                    x: r,
                    y: o,
                    width: s,
                    height: a,
                    image: c
                })
            }
        }

        var r = t("./base"), o = t("zrender/shape/Rectangle"), n = t("../util/shape/Icon"), s = t("../util/shape/Chain"), a = t("../config");
        a.timeline = {
            zlevel: 0,
            z: 4,
            show: !0,
            type: "time",
            notMerge: !1,
            realtime: !0,
            x: 80,
            x2: 80,
            y2: 0,
            height: 50,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            controlPosition: "left",
            autoPlay: !1,
            loop: !0,
            playInterval: 2e3,
            lineStyle: {width: 1, color: "#666", type: "dashed"},
            label: {show: !0, interval: "auto", rotate: 0, textStyle: {color: "#333"}},
            checkpointStyle: {
                symbol: "auto",
                symbolSize: "auto",
                color: "auto",
                borderColor: "auto",
                borderWidth: "auto",
                label: {show: !1, textStyle: {color: "auto"}}
            },
            controlStyle: {itemSize: 15, itemGap: 5, normal: {color: "#333"}, emphasis: {color: "#1e90ff"}},
            symbol: "emptyDiamond",
            symbolSize: 4,
            currentIndex: 0
        };
        var h = t("zrender/tool/util"), l = t("zrender/tool/area"), c = t("zrender/tool/event");
        return e.prototype = {
            type: a.COMPONENT_TYPE_TIMELINE, _buildShape: function () {
                if (this._location = this._getLocation(), this._buildBackground(), this._buildControl(), this._chainPoint = this._getChainPoint(), this.timelineOption.label.show)for (var t = this._getInterval(), e = 0, i = this._chainPoint.length; i > e; e += t)this._chainPoint[e].showLabel = !0;
                this._buildChain(), this._buildHandle();
                for (var e = 0, r = this.shapeList.length; r > e; e++)this.zr.addShape(this.shapeList[e])
            }, _getLocation: function () {
                var t, e = this.timelineOption, i = this.reformCssArray(this.timelineOption.padding), r = this.zr.getWidth(), o = this.parsePercent(e.x, r), n = this.parsePercent(e.x2, r);
                null == e.width ? (t = r - o - n, n = r - n) : (t = this.parsePercent(e.width, r), n = o + t);
                var s, a, h = this.zr.getHeight(), l = this.parsePercent(e.height, h);
                return null != e.y ? (s = this.parsePercent(e.y, h), a = s + l) : (a = h - this.parsePercent(e.y2, h), s = a - l), {
                    x: o + i[3],
                    y: s + i[0],
                    x2: n - i[1],
                    y2: a - i[2],
                    width: t - i[1] - i[3],
                    height: l - i[0] - i[2]
                }
            }, _getReformedLabel: function (t) {
                var e = this.timelineOption, i = null != e.data[t].name ? e.data[t].name : e.data[t], r = e.data[t].formatter || e.label.formatter;
                return r && ("function" == typeof r ? i = r.call(this.myChart, i) : "string" == typeof r && (i = r.replace("{value}", i))), i
            }, _getInterval: function () {
                var t = this._chainPoint, e = this.timelineOption, i = e.label.interval;
                if ("auto" === i) {
                    var r = e.label.textStyle.fontSize, o = e.data, n = e.data.length;
                    if (n > 3) {
                        var s, a, h = !1;
                        for (i = 0; !h && n > i;) {
                            i++, h = !0;
                            for (var c = i; n > c; c += i) {
                                if (s = t[c].x - t[c - i].x, 0 !== e.label.rotate)a = r; else if (o[c].textStyle)a = l.getTextWidth(t[c].name, t[c].textFont); else {
                                    var d = t[c].name + "", u = (d.match(/\w/g) || "").length, p = d.length - u;
                                    a = u * r * 2 / 3 + p * r
                                }
                                if (a > s) {
                                    h = !1;
                                    break
                                }
                            }
                        }
                    } else i = 1
                } else i = i - 0 + 1;
                return i
            }, _getChainPoint: function () {
                function t(t) {
                    return null != l[t].name ? l[t].name : l[t] + ""
                }

                var e, i = this.timelineOption, r = i.symbol.toLowerCase(), o = i.symbolSize, n = i.label.rotate, s = i.label.textStyle, a = this.getFont(s), l = i.data, c = this._location.x, d = this._location.y + this._location.height / 4 * 3, u = this._location.x2 - this._location.x, p = l.length, f = [];
                if (p > 1) {
                    var g = u / p;
                    if (g = g > 50 ? 50 : 20 > g ? 5 : g, u -= 2 * g, "number" === i.type)for (var m = 0; p > m; m++)f.push(c + g + u / (p - 1) * m); else {
                        f[0] = new Date(t(0).replace(/-/g, "/")), f[p - 1] = new Date(t(p - 1).replace(/-/g, "/")) - f[0];
                        for (var m = 1; p > m; m++)f[m] = c + g + u * (new Date(t(m).replace(/-/g, "/")) - f[0]) / f[p - 1];
                        f[0] = c + g
                    }
                } else f.push(c + u / 2);
                for (var _, y, v, x, b, T = [], m = 0; p > m; m++)c = f[m], _ = l[m].symbol && l[m].symbol.toLowerCase() || r, _.match("empty") ? (_ = _.replace("empty", ""), v = !0) : v = !1, _.match("star") && (y = _.replace("star", "") - 0 || 5, _ = "star"), e = l[m].textStyle ? h.merge(l[m].textStyle || {}, s) : s, x = e.align || "center", n ? (x = n > 0 ? "right" : "left", b = [n * Math.PI / 180, c, d - 5]) : b = !1, T.push({
                    x: c,
                    n: y,
                    isEmpty: v,
                    symbol: _,
                    symbolSize: l[m].symbolSize || o,
                    color: l[m].color,
                    borderColor: l[m].borderColor,
                    borderWidth: l[m].borderWidth,
                    name: this._getReformedLabel(m),
                    textColor: e.color,
                    textAlign: x,
                    textBaseline: e.baseline || "middle",
                    textX: c,
                    textY: d - (n ? 5 : 0),
                    textFont: l[m].textStyle ? this.getFont(e) : a,
                    rotation: b,
                    showLabel: !1
                });
                return T
            }, _buildBackground: function () {
                var t = this.timelineOption, e = this.reformCssArray(this.timelineOption.padding), i = this._location.width, r = this._location.height;
                (0 !== t.borderWidth || "rgba(0,0,0,0)" != t.backgroundColor.replace(/\s/g, "")) && this.shapeList.push(new o({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._location.x - e[3],
                        y: this._location.y - e[0],
                        width: i + e[1] + e[3],
                        height: r + e[0] + e[2],
                        brushType: 0 === t.borderWidth ? "fill" : "both",
                        color: t.backgroundColor,
                        strokeColor: t.borderColor,
                        lineWidth: t.borderWidth
                    }
                }))
            }, _buildControl: function () {
                var t = this, e = this.timelineOption, i = e.lineStyle, r = e.controlStyle;
                if ("none" !== e.controlPosition) {
                    var o, s = r.itemSize, a = r.itemGap;
                    "left" === e.controlPosition ? (o = this._location.x, this._location.x += 3 * (s + a)) : (o = this._location.x2 - (3 * (s + a) - a), this._location.x2 -= 3 * (s + a));
                    var l = this._location.y, c = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase() + 1,
                        style: {
                            iconType: "timelineControl",
                            symbol: "last",
                            x: o,
                            y: l,
                            width: s,
                            height: s,
                            brushType: "stroke",
                            color: r.normal.color,
                            strokeColor: r.normal.color,
                            lineWidth: i.width
                        },
                        highlightStyle: {
                            color: r.emphasis.color,
                            strokeColor: r.emphasis.color,
                            lineWidth: i.width + 1
                        },
                        clickable: !0
                    };
                    this._ctrLastShape = new n(c), this._ctrLastShape.onclick = function () {
                        t.last()
                    }, this.shapeList.push(this._ctrLastShape), o += s + a, this._ctrPlayShape = new n(h.clone(c)), this._ctrPlayShape.style.brushType = "fill", this._ctrPlayShape.style.symbol = "play", this._ctrPlayShape.style.status = this.timelineOption.autoPlay ? "playing" : "stop", this._ctrPlayShape.style.x = o, this._ctrPlayShape.onclick = function () {
                        "stop" === t._ctrPlayShape.style.status ? t.play() : t.stop()
                    }, this.shapeList.push(this._ctrPlayShape), o += s + a, this._ctrNextShape = new n(h.clone(c)), this._ctrNextShape.style.symbol = "next", this._ctrNextShape.style.x = o, this._ctrNextShape.onclick = function () {
                        t.next()
                    }, this.shapeList.push(this._ctrNextShape)
                }
            }, _buildChain: function () {
                var t = this.timelineOption, e = t.lineStyle;
                this._timelineShae = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        x: this._location.x,
                        y: this.subPixelOptimize(this._location.y, e.width),
                        width: this._location.x2 - this._location.x,
                        height: this._location.height,
                        chainPoint: this._chainPoint,
                        brushType: "both",
                        strokeColor: e.color,
                        lineWidth: e.width,
                        lineType: e.type
                    },
                    hoverable: !1,
                    clickable: !0,
                    onclick: this._onclick
                }, this._timelineShae = new s(this._timelineShae), this.shapeList.push(this._timelineShae)
            }, _buildHandle: function () {
                var t = this._chainPoint[this.currentIndex], e = t.symbolSize + 1;
                e = 5 > e ? 5 : e, this._handleShape = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 1,
                    hoverable: !1,
                    draggable: !0,
                    style: {
                        iconType: "diamond",
                        n: t.n,
                        x: t.x - e,
                        y: this._location.y + this._location.height / 4 - e,
                        width: 2 * e,
                        height: 2 * e,
                        brushType: "both",
                        textPosition: "specific",
                        textX: t.x,
                        textY: this._location.y - this._location.height / 4,
                        textAlign: "center",
                        textBaseline: "middle"
                    },
                    highlightStyle: {},
                    ondrift: this._ondrift,
                    ondragend: this._ondragend
                }, this._handleShape = new n(this._handleShape), this.shapeList.push(this._handleShape)
            }, _syncHandleShape: function () {
                if (this.timelineOption.show) {
                    var t = this.timelineOption, e = t.checkpointStyle, i = this._chainPoint[this.currentIndex];
                    this._handleShape.style.text = e.label.show ? i.name : "", this._handleShape.style.textFont = i.textFont, this._handleShape.style.n = i.n, "auto" === e.symbol ? this._handleShape.style.iconType = "none" != i.symbol ? i.symbol : "diamond" : (this._handleShape.style.iconType = e.symbol, e.symbol.match("star") && (this._handleShape.style.n = e.symbol.replace("star", "") - 0 || 5, this._handleShape.style.iconType = "star"));
                    var r;
                    "auto" === e.symbolSize ? (r = i.symbolSize + 2, r = 5 > r ? 5 : r) : r = e.symbolSize - 0, this._handleShape.style.color = "auto" === e.color ? i.color ? i.color : t.controlStyle.emphasis.color : e.color, this._handleShape.style.textColor = "auto" === e.label.textStyle.color ? this._handleShape.style.color : e.label.textStyle.color, this._handleShape.highlightStyle.strokeColor = this._handleShape.style.strokeColor = "auto" === e.borderColor ? i.borderColor ? i.borderColor : "#fff" : e.borderColor, this._handleShape.style.lineWidth = "auto" === e.borderWidth ? i.borderWidth ? i.borderWidth : 0 : e.borderWidth - 0, this._handleShape.highlightStyle.lineWidth = this._handleShape.style.lineWidth + 1, this.zr.animate(this._handleShape.id, "style").when(500, {
                        x: i.x - r,
                        textX: i.x,
                        y: this._location.y + this._location.height / 4 - r,
                        width: 2 * r,
                        height: 2 * r
                    }).start("ExponentialOut")
                }
            }, _findChainIndex: function (t) {
                var e = this._chainPoint, i = e.length;
                if (t <= e[0].x)return 0;
                if (t >= e[i - 1].x)return i - 1;
                for (var r = 0; i - 1 > r; r++)if (t >= e[r].x && t <= e[r + 1].x)return Math.abs(t - e[r].x) < Math.abs(t - e[r + 1].x) ? r : r + 1
            }, __onclick: function (t) {
                var e = c.getX(t.event), i = this._findChainIndex(e);
                return i === this.currentIndex ? !0 : (this.currentIndex = i, this.timelineOption.autoPlay && this.stop(), clearTimeout(this.playTicket), void this._onFrame())
            }, __ondrift: function (t, e) {
                this.timelineOption.autoPlay && this.stop();
                var i, r = this._chainPoint, o = r.length;
                t.style.x + e <= r[0].x - r[0].symbolSize ? (t.style.x = r[0].x - r[0].symbolSize, i = 0) : t.style.x + e >= r[o - 1].x - r[o - 1].symbolSize ? (t.style.x = r[o - 1].x - r[o - 1].symbolSize, i = o - 1) : (t.style.x += e, i = this._findChainIndex(t.style.x));
                var n = r[i], s = n.symbolSize + 2;
                if (t.style.iconType = n.symbol, t.style.n = n.n, t.style.textX = t.style.x + s / 2, t.style.y = this._location.y + this._location.height / 4 - s, t.style.width = 2 * s, t.style.height = 2 * s, t.style.text = n.name, i === this.currentIndex)return !0;
                if (this.currentIndex = i, this.timelineOption.realtime) {
                    clearTimeout(this.playTicket);
                    var a = this;
                    this.playTicket = setTimeout(function () {
                        a._setCurrentOption()
                    }, 200)
                }
                return !0
            }, __ondragend: function () {
                this.isDragend = !0
            }, ondragend: function (t, e) {
                this.isDragend && t.target && (!this.timelineOption.realtime && this._setCurrentOption(), e.dragOut = !0, e.dragIn = !0, e.needRefresh = !1, this.isDragend = !1, this._syncHandleShape())
            }, last: function () {
                return this.timelineOption.autoPlay && this.stop(), this.currentIndex -= 1, this.currentIndex < 0 && (this.currentIndex = this.timelineOption.data.length - 1), this._onFrame(), this.currentIndex
            }, next: function () {
                return this.timelineOption.autoPlay && this.stop(), this.currentIndex += 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
            }, play: function (t, e) {
                return this._ctrPlayShape && "playing" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "playing", this.zr.modShape(this._ctrPlayShape.id), this.zr.refreshNextFrame()), this.timelineOption.autoPlay = null != e ? e : !0, this.timelineOption.autoPlay || clearTimeout(this.playTicket), this.currentIndex = null != t ? t : this.currentIndex + 1, this.currentIndex >= this.timelineOption.data.length && (this.currentIndex = 0), this._onFrame(), this.currentIndex
            }, stop: function () {
                return this._ctrPlayShape && "stop" != this._ctrPlayShape.style.status && (this._ctrPlayShape.style.status = "stop", this.zr.modShape(this._ctrPlayShape.id), this.zr.refreshNextFrame()), this.timelineOption.autoPlay = !1, clearTimeout(this.playTicket), this.currentIndex
            }, resize: function () {
                this.timelineOption.show && (this.clear(), this._buildShape(), this._syncHandleShape())
            }, setTheme: function (t) {
                this.timelineOption = this.reformOption(h.clone(this.option.timeline)), this.timelineOption.label.textStyle = this.getTextStyle(this.timelineOption.label.textStyle), this.timelineOption.checkpointStyle.label.textStyle = this.getTextStyle(this.timelineOption.checkpointStyle.label.textStyle), this.myChart.canvasSupported || (this.timelineOption.realtime = !1), this.timelineOption.show && t && (this.clear(), this._buildShape(), this._syncHandleShape())
            }, onbeforDispose: function () {
                clearTimeout(this.playTicket)
            }
        }, n.prototype.iconLibrary.timelineControl = i, h.inherits(e, r), t("../component").define("timeline", e), e
    }), i("zrender/loadingEffect/Ring", ["require", "./Base", "../tool/util", "../tool/color", "../shape/Ring", "../shape/Sector"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/color"), n = t("../shape/Ring"), s = t("../shape/Sector");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            var i = r.merge(this.options, {
                textStyle: {color: "#07a"},
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                effect: {
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                    r0: 60,
                    r: 100,
                    color: "#bbdcff",
                    brushType: "fill",
                    textPosition: "inside",
                    textFont: "normal 30px verdana",
                    textColor: "rgba(30, 144, 255, 0.6)",
                    timeInterval: 100
                }
            }), a = i.effect, h = i.textStyle;
            null == h.x && (h.x = a.x), null == h.y && (h.y = a.y + (a.r0 + a.r) / 2 - 5);
            for (var l = this.createTextShape(i.textStyle), c = this.createBackgroundShape(i.backgroundColor), d = a.x, u = a.y, p = a.r0 + 6, f = a.r - 6, g = a.color, m = o.lift(g, .1), _ = new n({highlightStyle: r.clone(a)}), y = [], v = o.getGradientColors(["#ff6400", "#ffe100", "#97ff00"], 25), x = 15, b = 240, T = 0; 16 > T; T++)y.push(new s({
                highlightStyle: {
                    x: d,
                    y: u,
                    r0: p,
                    r: f,
                    startAngle: b - x,
                    endAngle: b,
                    brushType: "fill",
                    color: m
                },
                _color: o.getLinearGradient(d + p * Math.cos(b, !0), u - p * Math.sin(b, !0), d + p * Math.cos(b - x, !0), u - p * Math.sin(b - x, !0), [[0, v[2 * T]], [1, v[2 * T + 1]]])
            })), b -= x;
            b = 360;
            for (var T = 0; 4 > T; T++)y.push(new s({
                highlightStyle: {
                    x: d,
                    y: u,
                    r0: p,
                    r: f,
                    startAngle: b - x,
                    endAngle: b,
                    brushType: "fill",
                    color: m
                },
                _color: o.getLinearGradient(d + p * Math.cos(b, !0), u - p * Math.sin(b, !0), d + p * Math.cos(b - x, !0), u - p * Math.sin(b - x, !0), [[0, v[2 * T + 32]], [1, v[2 * T + 33]]])
            })), b -= x;
            var S = 0;
            if (null != i.progress) {
                t(c), S = 100 * this.adjust(i.progress, [0, 1]).toFixed(2) / 5, _.highlightStyle.text = 5 * S + "%", t(_);
                for (var T = 0; 20 > T; T++)y[T].highlightStyle.color = S > T ? y[T]._color : m, t(y[T]);
                return t(l), void e()
            }
            return setInterval(function () {
                t(c), S += S >= 20 ? -20 : 1, t(_);
                for (var i = 0; 20 > i; i++)y[i].highlightStyle.color = S > i ? y[i]._color : m, t(y[i]);
                t(l), e()
            }, a.timeInterval)
        }, e
    }), i("echarts/component/toolbox", ["require", "./base", "zrender/shape/Line", "zrender/shape/Image", "zrender/shape/Rectangle", "../util/shape/Icon", "../config", "zrender/tool/util", "zrender/config", "zrender/tool/event", "./dataView", "../component"], function (t) {
        function e(t, e, r, o, n) {
            i.call(this, t, e, r, o, n), this.dom = n.dom, this._magicType = {}, this._magicMap = {}, this._isSilence = !1, this._iconList, this._iconShapeMap = {}, this._featureTitle = {}, this._featureIcon = {}, this._featureColor = {}, this._featureOption = {}, this._enableColor = "red", this._disableColor = "#ccc", this._markShapeList = [];
            var s = this;
            s._onMark = function (t) {
                s.__onMark(t)
            }, s._onMarkUndo = function (t) {
                s.__onMarkUndo(t)
            }, s._onMarkClear = function (t) {
                s.__onMarkClear(t)
            }, s._onDataZoom = function (t) {
                s.__onDataZoom(t)
            }, s._onDataZoomReset = function (t) {
                s.__onDataZoomReset(t)
            }, s._onDataView = function (t) {
                s.__onDataView(t)
            }, s._onRestore = function (t) {
                s.__onRestore(t)
            }, s._onSaveAsImage = function (t) {
                s.__onSaveAsImage(t)
            }, s._onMagicType = function (t) {
                s.__onMagicType(t)
            }, s._onCustomHandler = function (t) {
                s.__onCustomHandler(t)
            }, s._onmousemove = function (t) {
                return s.__onmousemove(t)
            }, s._onmousedown = function (t) {
                return s.__onmousedown(t)
            }, s._onmouseup = function (t) {
                return s.__onmouseup(t)
            }, s._onclick = function (t) {
                return s.__onclick(t)
            }
        }

        var i = t("./base"), r = t("zrender/shape/Line"), o = t("zrender/shape/Image"), n = t("zrender/shape/Rectangle"), s = t("../util/shape/Icon"), a = t("../config");
        a.toolbox = {
            zlevel: 0,
            z: 6,
            show: !1,
            orient: "horizontal",
            x: "right",
            y: "top",
            color: ["#1e90ff", "#22bb22", "#4b0082", "#d2691e"],
            disableColor: "#ddd",
            effectiveColor: "red",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemSize: 16,
            showTitle: !0,
            feature: {
                mark: {
                    show: !1,
                    title: {mark: "辅助线开关", markUndo: "删除辅助线", markClear: "清空辅助线"},
                    lineStyle: {width: 1, color: "#1e90ff", type: "dashed"}
                },
                dataZoom: {show: !1, title: {dataZoom: "区域缩放", dataZoomReset: "区域缩放后退"}},
                dataView: {show: !1, title: "数据视图", readOnly: !1, lang: ["数据视图", "关闭", "刷新"]},
                magicType: {
                    show: !1,
                    title: {
                        line: "折线图切换",
                        bar: "柱形图切换",
                        stack: "堆积",
                        tiled: "平铺",
                        force: "力导向布局图切换",
                        chord: "和弦图切换",
                        pie: "饼图切换",
                        funnel: "漏斗图切换"
                    },
                    type: []
                },
                restore: {show: !1, title: "还原"},
                saveAsImage: {show: !1, title: "保存为图片", type: "png", lang: ["点击保存"]}
            }
        };
        var h = t("zrender/tool/util"), l = t("zrender/config"), c = t("zrender/tool/event"), d = "stack", u = "tiled";
        return e.prototype = {
            type: a.COMPONENT_TYPE_TOOLBOX, _buildShape: function () {
                this._iconList = [];
                var t = this.option.toolbox;
                this._enableColor = t.effectiveColor, this._disableColor = t.disableColor;
                var e = t.feature, i = [];
                for (var r in e)if (e[r].show)switch (r) {
                    case"mark":
                        i.push({key: r, name: "mark"}), i.push({key: r, name: "markUndo"}), i.push({
                            key: r,
                            name: "markClear"
                        });
                        break;
                    case"magicType":
                        for (var o = 0, n = e[r].type.length; n > o; o++)e[r].title[e[r].type[o] + "Chart"] = e[r].title[e[r].type[o]], e[r].option && (e[r].option[e[r].type[o] + "Chart"] = e[r].option[e[r].type[o]]), i.push({
                            key: r,
                            name: e[r].type[o] + "Chart"
                        });
                        break;
                    case"dataZoom":
                        i.push({key: r, name: "dataZoom"}), i.push({key: r, name: "dataZoomReset"});
                        break;
                    case"saveAsImage":
                        this.canvasSupported && i.push({key: r, name: "saveAsImage"});
                        break;
                    default:
                        i.push({key: r, name: r})
                }
                if (i.length > 0) {
                    for (var s, r, o = 0, n = i.length; n > o; o++)s = i[o].name, r = i[o].key, this._iconList.push(s), this._featureTitle[s] = e[r].title[s] || e[r].title, e[r].icon && (this._featureIcon[s] = e[r].icon[s] || e[r].icon), e[r].color && (this._featureColor[s] = e[r].color[s] || e[r].color), e[r].option && (this._featureOption[s] = e[r].option[s] || e[r].option);
                    this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                    for (var o = 0, n = this.shapeList.length; n > o; o++)this.zr.addShape(this.shapeList[o]);
                    this._iconShapeMap.mark && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear)), this._iconShapeMap.dataZoomReset && 0 === this._zoomQueue.length && this._iconDisable(this._iconShapeMap.dataZoomReset)
                }
            }, _buildItem: function () {
                var e, i, r, n, a = this.option.toolbox, h = this._iconList.length, l = this._itemGroupLocation.x, c = this._itemGroupLocation.y, d = a.itemSize, u = a.itemGap, p = a.color instanceof Array ? a.color : [a.color], f = this.getFont(a.textStyle);
                "horizontal" === a.orient ? (i = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "bottom" : "top", r = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "left" : "right", n = this._itemGroupLocation.y / this.zr.getHeight() < .5 ? "top" : "bottom") : i = this._itemGroupLocation.x / this.zr.getWidth() < .5 ? "right" : "left", this._iconShapeMap = {};
                for (var g = this, m = 0; h > m; m++) {
                    switch (e = {
                        type: "icon",
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {
                            x: l,
                            y: c,
                            width: d,
                            height: d,
                            iconType: this._iconList[m],
                            lineWidth: 1,
                            strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length],
                            brushType: "stroke"
                        },
                        highlightStyle: {
                            lineWidth: 1,
                            text: a.showTitle ? this._featureTitle[this._iconList[m]] : void 0,
                            textFont: f,
                            textPosition: i,
                            strokeColor: this._featureColor[this._iconList[m]] || p[m % p.length]
                        },
                        hoverable: !0,
                        clickable: !0
                    }, this._featureIcon[this._iconList[m]] && (e.style.image = this._featureIcon[this._iconList[m]].replace(new RegExp("^image:\\/\\/"), ""), e.style.opacity = .8, e.highlightStyle.opacity = 1, e.type = "image"), "horizontal" === a.orient && (0 === m && "left" === r && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = r, e.highlightStyle.textBaseline = n, e.highlightStyle.textX = l, e.highlightStyle.textY = "top" === n ? c + d + 10 : c - 10), m === h - 1 && "right" === r && (e.highlightStyle.textPosition = "specific", e.highlightStyle.textAlign = r, e.highlightStyle.textBaseline = n, e.highlightStyle.textX = l + d, e.highlightStyle.textY = "top" === n ? c + d + 10 : c - 10)), this._iconList[m]) {
                        case"mark":
                            e.onclick = g._onMark;
                            break;
                        case"markUndo":
                            e.onclick = g._onMarkUndo;
                            break;
                        case"markClear":
                            e.onclick = g._onMarkClear;
                            break;
                        case"dataZoom":
                            e.onclick = g._onDataZoom;
                            break;
                        case"dataZoomReset":
                            e.onclick = g._onDataZoomReset;
                            break;
                        case"dataView":
                            if (!this._dataView) {
                                var _ = t("./dataView");
                                this._dataView = new _(this.ecTheme, this.messageCenter, this.zr, this.option, this.myChart)
                            }
                            e.onclick = g._onDataView;
                            break;
                        case"restore":
                            e.onclick = g._onRestore;
                            break;
                        case"saveAsImage":
                            e.onclick = g._onSaveAsImage;
                            break;
                        default:
                            this._iconList[m].match("Chart") ? (e._name = this._iconList[m].replace("Chart", ""), e.onclick = g._onMagicType) : e.onclick = g._onCustomHandler
                    }
                    "icon" === e.type ? e = new s(e) : "image" === e.type && (e = new o(e)), this.shapeList.push(e), this._iconShapeMap[this._iconList[m]] = e, "horizontal" === a.orient ? l += d + u : c += d + u
                }
            }, _buildBackground: function () {
                var t = this.option.toolbox, e = this.reformCssArray(this.option.toolbox.padding);
                this.shapeList.push(new n({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - e[3],
                        y: this._itemGroupLocation.y - e[0],
                        width: this._itemGroupLocation.width + e[3] + e[1],
                        height: this._itemGroupLocation.height + e[0] + e[2],
                        brushType: 0 === t.borderWidth ? "fill" : "both",
                        color: t.backgroundColor,
                        strokeColor: t.borderColor,
                        lineWidth: t.borderWidth
                    }
                }))
            }, _getItemGroupLocation: function () {
                var t = this.option.toolbox, e = this.reformCssArray(this.option.toolbox.padding), i = this._iconList.length, r = t.itemGap, o = t.itemSize, n = 0, s = 0;
                "horizontal" === t.orient ? (n = (o + r) * i - r, s = o) : (s = (o + r) * i - r, n = o);
                var a, h = this.zr.getWidth();
                switch (t.x) {
                    case"center":
                        a = Math.floor((h - n) / 2);
                        break;
                    case"left":
                        a = e[3] + t.borderWidth;
                        break;
                    case"right":
                        a = h - n - e[1] - t.borderWidth;
                        break;
                    default:
                        a = t.x - 0, a = isNaN(a) ? 0 : a
                }
                var l, c = this.zr.getHeight();
                switch (t.y) {
                    case"top":
                        l = e[0] + t.borderWidth;
                        break;
                    case"bottom":
                        l = c - s - e[2] - t.borderWidth;
                        break;
                    case"center":
                        l = Math.floor((c - s) / 2);
                        break;
                    default:
                        l = t.y - 0, l = isNaN(l) ? 0 : l
                }
                return {x: a, y: l, width: n, height: s}
            }, __onmousemove: function (t) {
                this._marking && (this._markShape.style.xEnd = c.getX(t.event), this._markShape.style.yEnd = c.getY(t.event), this.zr.addHoverShape(this._markShape)), this._zooming && (this._zoomShape.style.width = c.getX(t.event) - this._zoomShape.style.x, this._zoomShape.style.height = c.getY(t.event) - this._zoomShape.style.y, this.zr.addHoverShape(this._zoomShape), this.dom.style.cursor = "crosshair", c.stop(t.event)), this._zoomStart && "pointer" != this.dom.style.cursor && "move" != this.dom.style.cursor && (this.dom.style.cursor = "crosshair")
            }, __onmousedown: function (t) {
                if (!t.target) {
                    this._zooming = !0;
                    var e = c.getX(t.event), i = c.getY(t.event), r = this.option.dataZoom || {};
                    return this._zoomShape = new n({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {x: e, y: i, width: 1, height: 1, brushType: "both"},
                        highlightStyle: {
                            lineWidth: 2,
                            color: r.fillerColor || a.dataZoom.fillerColor,
                            strokeColor: r.handleColor || a.dataZoom.handleColor,
                            brushType: "both"
                        }
                    }), this.zr.addHoverShape(this._zoomShape), !0
                }
            }, __onmouseup: function () {
                if (!this._zoomShape || Math.abs(this._zoomShape.style.width) < 10 || Math.abs(this._zoomShape.style.height) < 10)return this._zooming = !1, !0;
                if (this._zooming && this.component.dataZoom) {
                    this._zooming = !1;
                    var t = this.component.dataZoom.rectZoom(this._zoomShape.style);
                    t && (this._zoomQueue.push({
                        start: t.start,
                        end: t.end,
                        start2: t.start2,
                        end2: t.end2
                    }), this._iconEnable(this._iconShapeMap.dataZoomReset), this.zr.refreshNextFrame())
                }
                return !0
            }, __onclick: function (t) {
                if (!t.target)if (this._marking)this._marking = !1, this._markShapeList.push(this._markShape), this._iconEnable(this._iconShapeMap.markUndo), this._iconEnable(this._iconShapeMap.markClear), this.zr.addShape(this._markShape), this.zr.refreshNextFrame(); else if (this._markStart) {
                    this._marking = !0;
                    var e = c.getX(t.event), i = c.getY(t.event);
                    this._markShape = new r({
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        style: {
                            xStart: e,
                            yStart: i,
                            xEnd: e,
                            yEnd: i,
                            lineWidth: this.query(this.option, "toolbox.feature.mark.lineStyle.width"),
                            strokeColor: this.query(this.option, "toolbox.feature.mark.lineStyle.color"),
                            lineType: this.query(this.option, "toolbox.feature.mark.lineStyle.type")
                        }
                    }), this.zr.addHoverShape(this._markShape)
                }
            }, __onMark: function (t) {
                var e = t.target;
                if (this._marking || this._markStart)this._resetMark(), this.zr.refreshNextFrame(); else {
                    this._resetZoom(), this.zr.modShape(e.id, {style: {strokeColor: this._enableColor}}), this.zr.refreshNextFrame(), this._markStart = !0;
                    var i = this;
                    setTimeout(function () {
                        i.zr && i.zr.on(l.EVENT.CLICK, i._onclick) && i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove)
                    }, 10)
                }
                return !0
            }, __onMarkUndo: function () {
                if (this._marking)this._marking = !1; else {
                    var t = this._markShapeList.length;
                    if (t >= 1) {
                        var e = this._markShapeList[t - 1];
                        this.zr.delShape(e.id), this.zr.refreshNextFrame(), this._markShapeList.pop(), 1 === t && (this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear))
                    }
                }
                return !0
            }, __onMarkClear: function () {
                this._marking && (this._marking = !1);
                var t = this._markShapeList.length;
                if (t > 0) {
                    for (; t--;)this.zr.delShape(this._markShapeList.pop().id);
                    this._iconDisable(this._iconShapeMap.markUndo), this._iconDisable(this._iconShapeMap.markClear), this.zr.refreshNextFrame()
                }
                return !0
            }, __onDataZoom: function (t) {
                var e = t.target;
                if (this._zooming || this._zoomStart)this._resetZoom(), this.zr.refreshNextFrame(), this.dom.style.cursor = "default"; else {
                    this._resetMark(), this.zr.modShape(e.id, {style: {strokeColor: this._enableColor}}), this.zr.refreshNextFrame(), this._zoomStart = !0;
                    var i = this;
                    setTimeout(function () {
                        i.zr && i.zr.on(l.EVENT.MOUSEDOWN, i._onmousedown) && i.zr.on(l.EVENT.MOUSEUP, i._onmouseup) && i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove)
                    }, 10), this.dom.style.cursor = "crosshair"
                }
                return !0
            }, __onDataZoomReset: function () {
                return this._zooming && (this._zooming = !1), this._zoomQueue.pop(), this._zoomQueue.length > 0 ? this.component.dataZoom.absoluteZoom(this._zoomQueue[this._zoomQueue.length - 1]) : (this.component.dataZoom.rectZoom(), this._iconDisable(this._iconShapeMap.dataZoomReset), this.zr.refreshNextFrame()), !0
            }, _resetMark: function () {
                this._marking = !1, this._markStart && (this._markStart = !1, this._iconShapeMap.mark && this.zr.modShape(this._iconShapeMap.mark.id, {style: {strokeColor: this._iconShapeMap.mark.highlightStyle.strokeColor}}), this.zr.un(l.EVENT.CLICK, this._onclick), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove))
            }, _resetZoom: function () {
                this._zooming = !1, this._zoomStart && (this._zoomStart = !1, this._iconShapeMap.dataZoom && this.zr.modShape(this._iconShapeMap.dataZoom.id, {style: {strokeColor: this._iconShapeMap.dataZoom.highlightStyle.strokeColor}}), this.zr.un(l.EVENT.MOUSEDOWN, this._onmousedown), this.zr.un(l.EVENT.MOUSEUP, this._onmouseup), this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove))
            }, _iconDisable: function (t) {
                "image" != t.type ? this.zr.modShape(t.id, {
                    hoverable: !1,
                    clickable: !1,
                    style: {strokeColor: this._disableColor}
                }) : this.zr.modShape(t.id, {hoverable: !1, clickable: !1, style: {opacity: .3}})
            }, _iconEnable: function (t) {
                "image" != t.type ? this.zr.modShape(t.id, {
                    hoverable: !0,
                    clickable: !0,
                    style: {strokeColor: t.highlightStyle.strokeColor}
                }) : this.zr.modShape(t.id, {hoverable: !0, clickable: !0, style: {opacity: .8}})
            }, __onDataView: function () {
                return this._dataView.show(this.option), !0
            }, __onRestore: function () {
                return this._resetMark(), this._resetZoom(), this.messageCenter.dispatch(a.EVENT.RESTORE, null, null, this.myChart), !0
            }, __onSaveAsImage: function () {
                var t = this.option.toolbox.feature.saveAsImage, e = t.type || "png";
                "png" != e && "jpeg" != e && (e = "png");
                var i;
                i = this.myChart.isConnected() ? this.myChart.getConnectedDataURL(e) : this.zr.toDataURL("image/" + e, this.option.backgroundColor && "rgba(0,0,0,0)" === this.option.backgroundColor.replace(" ", "") ? "#fff" : this.option.backgroundColor);
                var r = document.createElement("div");
                r.id = "__echarts_download_wrap__", r.style.cssText = "position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:" + document.documentElement.clientHeight + "px;";
                var o = document.createElement("a");
                o.href = i, o.setAttribute("download", (t.name ? t.name : this.option.title && (this.option.title.text || this.option.title.subtext) ? this.option.title.text || this.option.title.subtext : "ECharts") + "." + e), o.innerHTML = '<img style="vertical-align:middle" src="' + i + '" title="' + (window.ActiveXObject || "ActiveXObject"in window ? "右键->图片另存为" : t.lang ? t.lang[0] : "点击保存") + '"/>', r.appendChild(o), document.body.appendChild(r), o = null, r = null, setTimeout(function () {
                    var t = document.getElementById("__echarts_download_wrap__");
                    t && (t.onclick = function () {
                        var t = document.getElementById("__echarts_download_wrap__");
                        t.onclick = null, t.innerHTML = "", document.body.removeChild(t), t = null
                    }, t = null)
                }, 500)
            }, __onMagicType: function (t) {
                this._resetMark();
                var e = t.target._name;
                return this._magicType[e] || (this._magicType[e] = !0, e === a.CHART_TYPE_LINE ? this._magicType[a.CHART_TYPE_BAR] = !1 : e === a.CHART_TYPE_BAR && (this._magicType[a.CHART_TYPE_LINE] = !1), e === a.CHART_TYPE_PIE ? this._magicType[a.CHART_TYPE_FUNNEL] = !1 : e === a.CHART_TYPE_FUNNEL && (this._magicType[a.CHART_TYPE_PIE] = !1), e === a.CHART_TYPE_FORCE ? this._magicType[a.CHART_TYPE_CHORD] = !1 : e === a.CHART_TYPE_CHORD && (this._magicType[a.CHART_TYPE_FORCE] = !1), e === d ? this._magicType[u] = !1 : e === u && (this._magicType[d] = !1), this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, t.event, {magicType: this._magicType}, this.myChart)), !0
            }, setMagicType: function (t) {
                this._resetMark(), this._magicType = t, !this._isSilence && this.messageCenter.dispatch(a.EVENT.MAGIC_TYPE_CHANGED, null, {magicType: this._magicType}, this.myChart)
            }, __onCustomHandler: function (t) {
                var e = t.target.style.iconType, i = this.option.toolbox.feature[e].onclick;
                "function" == typeof i && i.call(this, this.option)
            }, reset: function (t, e) {
                if (e && this.clear(), this.query(t, "toolbox.show") && this.query(t, "toolbox.feature.magicType.show")) {
                    var i = t.toolbox.feature.magicType.type, r = i.length;
                    for (this._magicMap = {}; r--;)this._magicMap[i[r]] = !0;
                    r = t.series.length;
                    for (var o, n; r--;)o = t.series[r].type, this._magicMap[o] && (n = t.xAxis instanceof Array ? t.xAxis[t.series[r].xAxisIndex || 0] : t.xAxis, n && "category" === (n.type || "category") && (n.__boundaryGap = null != n.boundaryGap ? n.boundaryGap : !0), n = t.yAxis instanceof Array ? t.yAxis[t.series[r].yAxisIndex || 0] : t.yAxis, n && "category" === n.type && (n.__boundaryGap = null != n.boundaryGap ? n.boundaryGap : !0), t.series[r].__type = o, t.series[r].__itemStyle = h.clone(t.series[r].itemStyle || {})), (this._magicMap[d] || this._magicMap[u]) && (t.series[r].__stack = t.series[r].stack)
                }
                this._magicType = e ? {} : this._magicType || {};
                for (var s in this._magicType)if (this._magicType[s]) {
                    this.option = t, this.getMagicOption();
                    break
                }
                var a = t.dataZoom;
                if (a && a.show) {
                    var l = null != a.start && a.start >= 0 && a.start <= 100 ? a.start : 0, c = null != a.end && a.end >= 0 && a.end <= 100 ? a.end : 100;
                    l > c && (l += c, c = l - c, l -= c), this._zoomQueue = [{start: l, end: c, start2: 0, end2: 100}]
                } else this._zoomQueue = []
            }, getMagicOption: function () {
                var t, e;
                if (this._magicType[a.CHART_TYPE_LINE] || this._magicType[a.CHART_TYPE_BAR]) {
                    for (var i = this._magicType[a.CHART_TYPE_LINE] ? !1 : !0, r = 0, o = this.option.series.length; o > r; r++)e = this.option.series[r].type, (e == a.CHART_TYPE_LINE || e == a.CHART_TYPE_BAR) && (t = this.option.xAxis instanceof Array ? this.option.xAxis[this.option.series[r].xAxisIndex || 0] : this.option.xAxis, t && "category" === (t.type || "category") && (t.boundaryGap = i ? !0 : t.__boundaryGap), t = this.option.yAxis instanceof Array ? this.option.yAxis[this.option.series[r].yAxisIndex || 0] : this.option.yAxis, t && "category" === t.type && (t.boundaryGap = i ? !0 : t.__boundaryGap));
                    this._defaultMagic(a.CHART_TYPE_LINE, a.CHART_TYPE_BAR)
                }
                if (this._defaultMagic(a.CHART_TYPE_CHORD, a.CHART_TYPE_FORCE), this._defaultMagic(a.CHART_TYPE_PIE, a.CHART_TYPE_FUNNEL), this._magicType[d] || this._magicType[u])for (var r = 0, o = this.option.series.length; o > r; r++)this._magicType[d] ? (this.option.series[r].stack = "_ECHARTS_STACK_KENER_2014_", e = d) : this._magicType[u] && (this.option.series[r].stack = null, e = u), this._featureOption[e + "Chart"] && h.merge(this.option.series[r], this._featureOption[e + "Chart"] || {}, !0);
                return this.option
            }, _defaultMagic: function (t, e) {
                if (this._magicType[t] || this._magicType[e])for (var i = 0, r = this.option.series.length; r > i; i++) {
                    var o = this.option.series[i].type;
                    (o == t || o == e) && (this.option.series[i].type = this._magicType[t] ? t : e, this.option.series[i].itemStyle = h.clone(this.option.series[i].__itemStyle), o = this.option.series[i].type, this._featureOption[o + "Chart"] && h.merge(this.option.series[i], this._featureOption[o + "Chart"] || {}, !0))
                }
            }, silence: function (t) {
                this._isSilence = t
            }, resize: function () {
                this._resetMark(), this.clear(), this.option && this.option.toolbox && this.option.toolbox.show && this._buildShape(), this._dataView && this._dataView.resize()
            }, hideDataView: function () {
                this._dataView && this._dataView.hide()
            }, clear: function (t) {
                this.zr && (this.zr.delShape(this.shapeList), this.shapeList = [], t || (this.zr.delShape(this._markShapeList), this._markShapeList = []))
            }, onbeforDispose: function () {
                this._dataView && (this._dataView.dispose(), this._dataView = null), this._markShapeList = null
            }, refresh: function (t) {
                t && (this._resetMark(), this._resetZoom(), t.toolbox = this.reformOption(t.toolbox), this.option = t, this.clear(!0), t.toolbox.show && this._buildShape(), this.hideDataView())
            }
        }, h.inherits(e, i), t("../component").define("toolbox", e), e
    }), i("zrender/loadingEffect/Spin", ["require", "./Base", "../tool/util", "../tool/color", "../tool/area", "../shape/Sector"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/color"), n = t("../tool/area"), s = t("../shape/Sector");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            var i = r.merge(this.options, {
                textStyle: {color: "#fff", textAlign: "start"},
                backgroundColor: "rgba(0, 0, 0, 0.8)"
            }), a = this.createTextShape(i.textStyle), h = 10, l = n.getTextWidth(a.highlightStyle.text, a.highlightStyle.textFont), c = n.getTextHeight(a.highlightStyle.text, a.highlightStyle.textFont), d = r.merge(this.options.effect || {}, {
                r0: 9,
                r: 15,
                n: 18,
                color: "#fff",
                timeInterval: 100
            }), u = this.getLocation(this.options.textStyle, l + h + 2 * d.r, Math.max(2 * d.r, c));
            d.x = u.x + d.r, d.y = a.highlightStyle.y = u.y + u.height / 2, a.highlightStyle.x = d.x + d.r + h;
            for (var p = this.createBackgroundShape(i.backgroundColor), f = d.n, g = d.x, m = d.y, _ = d.r0, y = d.r, v = d.color, x = [], b = Math.round(180 / f), T = 0; f > T; T++)x[T] = new s({
                highlightStyle: {
                    x: g,
                    y: m,
                    r0: _,
                    r: y,
                    startAngle: b * T * 2,
                    endAngle: b * T * 2 + b,
                    color: o.alpha(v, (T + 1) / f),
                    brushType: "fill"
                }
            });
            var S = [0, g, m];
            return setInterval(function () {
                t(p), S[0] -= .3;
                for (var i = 0; f > i; i++)x[i].rotation = S, t(x[i]);
                t(a), e()
            }, d.timeInterval)
        }, e
    }), i("zrender/loadingEffect/Whirling", ["require", "./Base", "../tool/util", "../tool/area", "../shape/Ring", "../shape/Droplet", "../shape/Circle"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("./Base"), r = t("../tool/util"), o = t("../tool/area"), n = t("../shape/Ring"), s = t("../shape/Droplet"), a = t("../shape/Circle");
        return r.inherits(e, i), e.prototype._start = function (t, e) {
            var i = r.merge(this.options, {
                textStyle: {color: "#888", textAlign: "start"},
                backgroundColor: "rgba(250, 250, 250, 0.8)"
            }), h = this.createTextShape(i.textStyle), l = 10, c = o.getTextWidth(h.highlightStyle.text, h.highlightStyle.textFont), d = o.getTextHeight(h.highlightStyle.text, h.highlightStyle.textFont), u = r.merge(this.options.effect || {}, {
                r: 18,
                colorIn: "#fff",
                colorOut: "#555",
                colorWhirl: "#6cf",
                timeInterval: 50
            }), p = this.getLocation(this.options.textStyle, c + l + 2 * u.r, Math.max(2 * u.r, d));
            u.x = p.x + u.r, u.y = h.highlightStyle.y = p.y + p.height / 2, h.highlightStyle.x = u.x + u.r + l;
            var f = this.createBackgroundShape(i.backgroundColor), g = new s({
                highlightStyle: {
                    a: Math.round(u.r / 2),
                    b: Math.round(u.r - u.r / 6),
                    brushType: "fill",
                    color: u.colorWhirl
                }
            }), m = new a({
                highlightStyle: {
                    r: Math.round(u.r / 6),
                    brushType: "fill",
                    color: u.colorIn
                }
            }), _ = new n({
                highlightStyle: {
                    r0: Math.round(u.r - u.r / 3),
                    r: u.r,
                    brushType: "fill",
                    color: u.colorOut
                }
            }), y = [0, u.x, u.y];
            return g.highlightStyle.x = m.highlightStyle.x = _.highlightStyle.x = y[1], g.highlightStyle.y = m.highlightStyle.y = _.highlightStyle.y = y[2], setInterval(function () {
                t(f), t(_), y[0] -= .3, g.rotation = y, t(g), t(m), t(h), e()
            }, u.timeInterval)
        }, e
    }), i("echarts/theme/macarons", [], function () {
        var t = {
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"],
            title: {textStyle: {fontWeight: "normal", color: "#008acd"}},
            dataRange: {itemWidth: 15, color: ["#5ab1ef", "#e0ffff"]},
            toolbox: {color: ["#1e90ff", "#1e90ff", "#1e90ff", "#1e90ff"], effectiveColor: "#ff4500"},
            tooltip: {
                backgroundColor: "rgba(50,50,50,0.5)",
                axisPointer: {
                    type: "line",
                    lineStyle: {color: "#008acd"},
                    crossStyle: {color: "#008acd"},
                    shadowStyle: {color: "rgba(200,200,200,0.2)"}
                }
            },
            dataZoom: {dataBackgroundColor: "#efefff", fillerColor: "rgba(182,162,222,0.2)", handleColor: "#008acd"},
            grid: {borderColor: "#eee"},
            categoryAxis: {axisLine: {lineStyle: {color: "#008acd"}}, splitLine: {lineStyle: {color: ["#eee"]}}},
            valueAxis: {
                axisLine: {lineStyle: {color: "#008acd"}},
                splitArea: {show: !0, areaStyle: {color: ["rgba(250,250,250,0.1)", "rgba(200,200,200,0.1)"]}},
                splitLine: {lineStyle: {color: ["#eee"]}}
            },
            polar: {
                axisLine: {lineStyle: {color: "#ddd"}},
                splitArea: {show: !0, areaStyle: {color: ["rgba(250,250,250,0.2)", "rgba(200,200,200,0.2)"]}},
                splitLine: {lineStyle: {color: "#ddd"}}
            },
            timeline: {
                lineStyle: {color: "#008acd"},
                controlStyle: {normal: {color: "#008acd"}, emphasis: {color: "#008acd"}},
                symbol: "emptyCircle",
                symbolSize: 3
            },
            bar: {itemStyle: {normal: {barBorderRadius: 5}, emphasis: {barBorderRadius: 5}}},
            line: {smooth: !0, symbol: "emptyCircle", symbolSize: 3},
            k: {
                itemStyle: {
                    normal: {
                        color: "#d87a80",
                        color0: "#2ec7c9",
                        lineStyle: {color: "#d87a80", color0: "#2ec7c9"}
                    }
                }
            },
            scatter: {symbol: "circle", symbolSize: 4},
            radar: {symbol: "emptyCircle", symbolSize: 3},
            map: {
                itemStyle: {
                    normal: {areaStyle: {color: "#ddd"}, label: {textStyle: {color: "#d87a80"}}},
                    emphasis: {areaStyle: {color: "#fe994e"}}
                }
            },
            force: {itemStyle: {normal: {linkStyle: {color: "#1e90ff"}}}},
            chord: {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {lineStyle: {color: "rgba(128, 128, 128, 0.5)"}}
                    },
                    emphasis: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {lineStyle: {color: "rgba(128, 128, 128, 0.5)"}}
                    }
                }
            },
            gauge: {
                axisLine: {lineStyle: {color: [[.2, "#2ec7c9"], [.8, "#5ab1ef"], [1, "#d87a80"]], width: 10}},
                axisTick: {splitNumber: 10, length: 15, lineStyle: {color: "auto"}},
                splitLine: {length: 22, lineStyle: {color: "auto"}},
                pointer: {width: 5}
            },
            textStyle: {fontFamily: "微软雅黑, Arial, Verdana, sans-serif"}
        };
        return t
    }), i("echarts/component/legend", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "zrender/shape/Sector", "../util/shape/Icon", "../util/shape/Candle", "../config", "zrender/tool/util", "zrender/tool/area", "../component"], function (t) {
        function e(t, e, r, o, n) {
            if (!this.query(o, "legend.data"))return void console.error("option.legend.data has not been defined.");
            i.call(this, t, e, r, o, n);
            var s = this;
            s._legendSelected = function (t) {
                s.__legendSelected(t)
            }, s._dispatchHoverLink = function (t) {
                return s.__dispatchHoverLink(t)
            }, this._colorIndex = 0, this._colorMap = {}, this._selectedMap = {}, this._hasDataMap = {}, this.refresh(o)
        }

        var i = t("./base"), r = t("zrender/shape/Text"), o = t("zrender/shape/Rectangle"), n = t("zrender/shape/Sector"), s = t("../util/shape/Icon"), a = t("../util/shape/Candle"), h = t("../config");
        h.legend = {
            zlevel: 0,
            z: 4,
            show: !0,
            orient: "horizontal",
            x: "center",
            y: "top",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 20,
            itemHeight: 14,
            textStyle: {color: "#333"},
            selectedMode: !0
        };
        var l = t("zrender/tool/util"), c = t("zrender/tool/area");
        e.prototype = {
            type: h.COMPONENT_TYPE_LEGEND, _buildShape: function () {
                if (this.legendOption.show) {
                    this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._buildItem();
                    for (var t = 0, e = this.shapeList.length; e > t; t++)this.zr.addShape(this.shapeList[t])
                }
            }, _buildItem: function () {
                var t, e, i, o, n, a, h, d, u = this.legendOption.data, p = u.length, f = this.legendOption.textStyle, g = this.zr.getWidth(), m = this.zr.getHeight(), _ = this._itemGroupLocation.x, y = this._itemGroupLocation.y, v = this.legendOption.itemWidth, x = this.legendOption.itemHeight, b = this.legendOption.itemGap;
                "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (_ = this._itemGroupLocation.x + this._itemGroupLocation.width - v);
                for (var T = 0; p > T; T++)n = l.merge(u[T].textStyle || {}, f), a = this.getFont(n), t = this._getName(u[T]), h = this._getFormatterName(t), "" !== t ? (e = u[T].icon || this._getSomethingByName(t).type, d = this.getColor(t), "horizontal" === this.legendOption.orient ? 200 > g - _ && v + 5 + c.getTextWidth(h, a) + (T === p - 1 || "" === u[T + 1] ? 0 : b) >= g - _ && (_ = this._itemGroupLocation.x, y += x + b) : 200 > m - y && x + (T === p - 1 || "" === u[T + 1] ? 0 : b) >= m - y && ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + b : _ += this._itemGroupLocation.maxWidth + b, y = this._itemGroupLocation.y), i = this._getItemShapeByType(_, y, v, x, this._selectedMap[t] && this._hasDataMap[t] ? d : "#ccc", e, d), i._name = t, i = new s(i), o = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        x: _ + v + 5,
                        y: y + x / 2,
                        color: this._selectedMap[t] ? "auto" === n.color ? d : n.color : "#ccc",
                        text: h,
                        textFont: a,
                        textBaseline: "middle"
                    },
                    highlightStyle: {color: d, brushType: "fill"},
                    hoverable: !!this.legendOption.selectedMode,
                    clickable: !!this.legendOption.selectedMode
                }, "vertical" === this.legendOption.orient && "right" === this.legendOption.x && (o.style.x -= v + 10, o.style.textAlign = "right"), o._name = t, o = new r(o), this.legendOption.selectedMode && (i.onclick = o.onclick = this._legendSelected, i.onmouseover = o.onmouseover = this._dispatchHoverLink, i.hoverConnect = o.id, o.hoverConnect = i.id), this.shapeList.push(i), this.shapeList.push(o), "horizontal" === this.legendOption.orient ? _ += v + 5 + c.getTextWidth(h, a) + b : y += x + b) : "horizontal" === this.legendOption.orient ? (_ = this._itemGroupLocation.x, y += x + b) : ("right" === this.legendOption.x ? _ -= this._itemGroupLocation.maxWidth + b : _ += this._itemGroupLocation.maxWidth + b, y = this._itemGroupLocation.y);
                "horizontal" === this.legendOption.orient && "center" === this.legendOption.x && y != this._itemGroupLocation.y && this._mLineOptimize()
            }, _getName: function (t) {
                return "undefined" != typeof t.name ? t.name : t
            }, _getFormatterName: function (t) {
                var e, i = this.legendOption.formatter;
                return e = "function" == typeof i ? i.call(this.myChart, t) : "string" == typeof i ? i.replace("{name}", t) : t
            }, _getFormatterNameFromData: function (t) {
                var e = this._getName(t);
                return this._getFormatterName(e)
            }, _mLineOptimize: function () {
                for (var t = [], e = this._itemGroupLocation.x, i = 2, r = this.shapeList.length; r > i; i++)this.shapeList[i].style.x === e ? t.push((this._itemGroupLocation.width - (this.shapeList[i - 1].style.x + c.getTextWidth(this.shapeList[i - 1].style.text, this.shapeList[i - 1].style.textFont) - e)) / 2) : i === r - 1 && t.push((this._itemGroupLocation.width - (this.shapeList[i].style.x + c.getTextWidth(this.shapeList[i].style.text, this.shapeList[i].style.textFont) - e)) / 2);
                for (var o = -1, i = 1, r = this.shapeList.length; r > i; i++)this.shapeList[i].style.x === e && o++, 0 !== t[o] && (this.shapeList[i].style.x += t[o])
            }, _buildBackground: function () {
                var t = this.reformCssArray(this.legendOption.padding);
                this.shapeList.push(new o({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                        x: this._itemGroupLocation.x - t[3],
                        y: this._itemGroupLocation.y - t[0],
                        width: this._itemGroupLocation.width + t[3] + t[1],
                        height: this._itemGroupLocation.height + t[0] + t[2],
                        brushType: 0 === this.legendOption.borderWidth ? "fill" : "both",
                        color: this.legendOption.backgroundColor,
                        strokeColor: this.legendOption.borderColor,
                        lineWidth: this.legendOption.borderWidth
                    }
                }))
            }, _getItemGroupLocation: function () {
                var t = this.legendOption.data, e = t.length, i = this.legendOption.itemGap, r = this.legendOption.itemWidth + 5, o = this.legendOption.itemHeight, n = this.legendOption.textStyle, s = this.getFont(n), a = 0, h = 0, d = this.reformCssArray(this.legendOption.padding), u = this.zr.getWidth() - d[1] - d[3], p = this.zr.getHeight() - d[0] - d[2], f = 0, g = 0;
                if ("horizontal" === this.legendOption.orient) {
                    h = o;
                    for (var m = 0; e > m; m++)if ("" !== this._getName(t[m])) {
                        var _ = c.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(l.merge(t[m].textStyle || {}, n)) : s);
                        f + r + _ + i > u ? (f -= i, a = Math.max(a, f), h += o + i, f = 0) : (f += r + _ + i, a = Math.max(a, f - i))
                    } else f -= i, a = Math.max(a, f), h += o + i, f = 0
                } else {
                    for (var m = 0; e > m; m++)g = Math.max(g, c.getTextWidth(this._getFormatterNameFromData(t[m]), t[m].textStyle ? this.getFont(l.merge(t[m].textStyle || {}, n)) : s));
                    g += r, a = g;
                    for (var m = 0; e > m; m++)"" !== this._getName(t[m]) ? f + o + i > p ? (a += g + i, f -= i, h = Math.max(h, f), f = 0) : (f += o + i, h = Math.max(h, f - i)) : (a += g + i, f -= i, h = Math.max(h, f), f = 0)
                }
                u = this.zr.getWidth(), p = this.zr.getHeight();
                var y;
                switch (this.legendOption.x) {
                    case"center":
                        y = Math.floor((u - a) / 2);
                        break;
                    case"left":
                        y = d[3] + this.legendOption.borderWidth;
                        break;
                    case"right":
                        y = u - a - d[1] - d[3] - 2 * this.legendOption.borderWidth;
                        break;
                    default:
                        y = this.parsePercent(this.legendOption.x, u)
                }
                var v;
                switch (this.legendOption.y) {
                    case"top":
                        v = d[0] + this.legendOption.borderWidth;
                        break;
                    case"bottom":
                        v = p - h - d[0] - d[2] - 2 * this.legendOption.borderWidth;
                        break;
                    case"center":
                        v = Math.floor((p - h) / 2);
                        break;
                    default:
                        v = this.parsePercent(this.legendOption.y, p)
                }
                return {x: y, y: v, width: a, height: h, maxWidth: g}
            }, _getSomethingByName: function (t) {
                for (var e, i = this.option.series, r = 0, o = i.length; o > r; r++) {
                    if (i[r].name === t)return {
                        type: i[r].type,
                        series: i[r],
                        seriesIndex: r,
                        data: null,
                        dataIndex: -1
                    };
                    if (i[r].type === h.CHART_TYPE_PIE || i[r].type === h.CHART_TYPE_RADAR || i[r].type === h.CHART_TYPE_CHORD || i[r].type === h.CHART_TYPE_FORCE || i[r].type === h.CHART_TYPE_FUNNEL || i[r].type === h.CHART_TYPE_TREEMAP) {
                        e = i[r].categories || i[r].data || i[r].nodes;
                        for (var n = 0, s = e.length; s > n; n++)if (e[n].name === t)return {
                            type: i[r].type,
                            series: i[r],
                            seriesIndex: r,
                            data: e[n],
                            dataIndex: n
                        }
                    }
                }
                return {type: "bar", series: null, seriesIndex: -1, data: null, dataIndex: -1}
            }, _getItemShapeByType: function (t, e, i, r, o, n, s) {
                var a, l = "#ccc" === o ? s : o, c = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                        iconType: "legendicon" + n,
                        x: t,
                        y: e,
                        width: i,
                        height: r,
                        color: o,
                        strokeColor: o,
                        lineWidth: 2
                    },
                    highlightStyle: {color: l, strokeColor: l, lineWidth: 1},
                    hoverable: this.legendOption.selectedMode,
                    clickable: this.legendOption.selectedMode
                };
                if (n.match("image")) {
                    var a = n.replace(new RegExp("^image:\\/\\/"), "");
                    n = "image"
                }
                switch (n) {
                    case"line":
                        c.style.brushType = "stroke", c.highlightStyle.lineWidth = 3;
                        break;
                    case"radar":
                    case"venn":
                    case"tree":
                    case"treemap":
                    case"scatter":
                        c.highlightStyle.lineWidth = 3;
                        break;
                    case"k":
                        c.style.brushType = "both", c.highlightStyle.lineWidth = 3, c.highlightStyle.color = c.style.color = this.deepQuery([this.ecTheme, h], "k.itemStyle.normal.color") || "#fff", c.style.strokeColor = "#ccc" != o ? this.deepQuery([this.ecTheme, h], "k.itemStyle.normal.lineStyle.color") || "#ff3200" : o;
                        break;
                    case"image":
                        c.style.iconType = "image", c.style.image = a, "#ccc" === o && (c.style.opacity = .5)
                }
                return c
            }, __legendSelected: function (t) {
                var e = t.target._name;
                if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
                this._selectedMap[e] = !this._selectedMap[e], this.messageCenter.dispatch(h.EVENT.LEGEND_SELECTED, t.event, {
                    selected: this._selectedMap,
                    target: e
                }, this.myChart)
            }, __dispatchHoverLink: function (t) {
                this.messageCenter.dispatch(h.EVENT.LEGEND_HOVERLINK, t.event, {target: t.target._name}, this.myChart)
            }, refresh: function (t) {
                if (t) {
                    this.option = t || this.option, this.option.legend = this.reformOption(this.option.legend), this.legendOption = this.option.legend;
                    var e, i, r, o, n = this.legendOption.data || [];
                    if (this.legendOption.selected)for (var s in this.legendOption.selected)this._selectedMap[s] = "undefined" != typeof this._selectedMap[s] ? this._selectedMap[s] : this.legendOption.selected[s];
                    for (var a = 0, l = n.length; l > a; a++)e = this._getName(n[a]), "" !== e && (i = this._getSomethingByName(e), i.series ? (this._hasDataMap[e] = !0, o = !i.data || i.type !== h.CHART_TYPE_PIE && i.type !== h.CHART_TYPE_FORCE && i.type !== h.CHART_TYPE_FUNNEL ? [i.series] : [i.data, i.series], r = this.getItemStyleColor(this.deepQuery(o, "itemStyle.normal.color"), i.seriesIndex, i.dataIndex, i.data), r && i.type != h.CHART_TYPE_K && this.setColor(e, r), this._selectedMap[e] = null != this._selectedMap[e] ? this._selectedMap[e] : !0) : this._hasDataMap[e] = !1)
                }
                this.clear(), this._buildShape()
            }, getRelatedAmount: function (t) {
                for (var e, i = 0, r = this.option.series, o = 0, n = r.length; n > o; o++)if (r[o].name === t && i++, r[o].type === h.CHART_TYPE_PIE || r[o].type === h.CHART_TYPE_RADAR || r[o].type === h.CHART_TYPE_CHORD || r[o].type === h.CHART_TYPE_FORCE || r[o].type === h.CHART_TYPE_FUNNEL) {
                    e = r[o].type != h.CHART_TYPE_FORCE ? r[o].data : r[o].categories;
                    for (var s = 0, a = e.length; a > s; s++)e[s].name === t && "-" != e[s].value && i++
                }
                return i
            }, setColor: function (t, e) {
                this._colorMap[t] = e
            }, getColor: function (t) {
                return this._colorMap[t] || (this._colorMap[t] = this.zr.getColor(this._colorIndex++)), this._colorMap[t]
            }, hasColor: function (t) {
                return this._colorMap[t] ? this._colorMap[t] : !1
            }, add: function (t, e) {
                for (var i = this.legendOption.data, r = 0, o = i.length; o > r; r++)if (this._getName(i[r]) === t)return;
                this.legendOption.data.push(t), this.setColor(t, e), this._selectedMap[t] = !0, this._hasDataMap[t] = !0
            }, del: function (t) {
                for (var e = this.legendOption.data, i = 0, r = e.length; r > i; i++)if (this._getName(e[i]) === t)return this.legendOption.data.splice(i, 1)
            }, getItemShape: function (t) {
                if (null != t)for (var e, i = 0, r = this.shapeList.length; r > i; i++)if (e = this.shapeList[i], e._name === t && "text" != e.type)return e
            }, setItemShape: function (t, e) {
                for (var i, r = 0, o = this.shapeList.length; o > r; r++)i = this.shapeList[r], i._name === t && "text" != i.type && (this._selectedMap[t] || (e.style.color = "#ccc", e.style.strokeColor = "#ccc"), this.zr.modShape(i.id, e))
            }, isSelected: function (t) {
                return "undefined" != typeof this._selectedMap[t] ? this._selectedMap[t] : !0
            }, getSelectedMap: function () {
                return this._selectedMap
            }, setSelected: function (t, e) {
                if ("single" === this.legendOption.selectedMode)for (var i in this._selectedMap)this._selectedMap[i] = !1;
                this._selectedMap[t] = e, this.messageCenter.dispatch(h.EVENT.LEGEND_SELECTED, null, {
                    selected: this._selectedMap,
                    target: t
                }, this.myChart)
            }, onlegendSelected: function (t, e) {
                var i = t.selected;
                for (var r in i)this._selectedMap[r] != i[r] && (e.needRefresh = !0), this._selectedMap[r] = i[r]
            }
        };
        var d = {
            line: function (t, e) {
                var i = e.height / 2;
                t.moveTo(e.x, e.y + i), t.lineTo(e.x + e.width, e.y + i)
            }, pie: function (t, e) {
                var i = e.x, r = e.y, o = e.width, s = e.height;
                n.prototype.buildPath(t, {x: i + o / 2, y: r + s + 2, r: s, r0: 6, startAngle: 45, endAngle: 135})
            }, eventRiver: function (t, e) {
                var i = e.x, r = e.y, o = e.width, n = e.height;
                t.moveTo(i, r + n), t.bezierCurveTo(i + o, r + n, i, r + 4, i + o, r + 4), t.lineTo(i + o, r), t.bezierCurveTo(i, r, i + o, r + n - 4, i, r + n - 4), t.lineTo(i, r + n)
            }, k: function (t, e) {
                var i = e.x, r = e.y, o = e.width, n = e.height;
                a.prototype.buildPath(t, {x: i + o / 2, y: [r + 1, r + 1, r + n - 6, r + n], width: o - 6})
            }, bar: function (t, e) {
                var i = e.x, r = e.y + 1, o = e.width, n = e.height - 2, s = 3;
                t.moveTo(i + s, r), t.lineTo(i + o - s, r), t.quadraticCurveTo(i + o, r, i + o, r + s), t.lineTo(i + o, r + n - s), t.quadraticCurveTo(i + o, r + n, i + o - s, r + n), t.lineTo(i + s, r + n), t.quadraticCurveTo(i, r + n, i, r + n - s), t.lineTo(i, r + s), t.quadraticCurveTo(i, r, i + s, r)
            }, force: function (t, e) {
                s.prototype.iconLibrary.circle(t, e)
            }, radar: function (t, e) {
                var i = 6, r = e.x + e.width / 2, o = e.y + e.height / 2, n = e.height / 2, s = 2 * Math.PI / i, a = -Math.PI / 2, h = r + n * Math.cos(a), l = o + n * Math.sin(a);
                t.moveTo(h, l), a += s;
                for (var c = 0, d = i - 1; d > c; c++)t.lineTo(r + n * Math.cos(a), o + n * Math.sin(a)), a += s;
                t.lineTo(h, l)
            }
        };
        d.chord = d.pie, d.map = d.bar;
        for (var u in d)s.prototype.iconLibrary["legendicon" + u] = d[u];
        return l.inherits(e, i), t("../component").define("legend", e), e
    }), i("echarts/theme/infographic", [], function () {
        var t = {
            color: ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD", "#D7504B", "#C6E579", "#F4E001", "#F0805A", "#26C0C0"],
            title: {textStyle: {fontWeight: "normal", color: "#27727B"}},
            dataRange: {x: "right", y: "center", itemWidth: 5, itemHeight: 25, color: ["#C1232B", "#FCCE10"]},
            toolbox: {
                color: ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD"],
                effectiveColor: "#ff4500"
            },
            tooltip: {
                backgroundColor: "rgba(50,50,50,0.5)",
                axisPointer: {
                    type: "line",
                    lineStyle: {color: "#27727B", type: "dashed"},
                    crossStyle: {color: "#27727B"},
                    shadowStyle: {color: "rgba(200,200,200,0.3)"}
                }
            },
            dataZoom: {
                dataBackgroundColor: "rgba(181,195,52,0.3)",
                fillerColor: "rgba(181,195,52,0.2)",
                handleColor: "#27727B"
            },
            grid: {borderWidth: 0},
            categoryAxis: {axisLine: {lineStyle: {color: "#27727B"}}, splitLine: {show: !1}},
            valueAxis: {
                axisLine: {show: !1},
                splitArea: {show: !1},
                splitLine: {lineStyle: {color: ["#ccc"], type: "dashed"}}
            },
            polar: {
                axisLine: {lineStyle: {color: "#ddd"}},
                splitArea: {show: !0, areaStyle: {color: ["rgba(250,250,250,0.2)", "rgba(200,200,200,0.2)"]}},
                splitLine: {lineStyle: {color: "#ddd"}}
            },
            timeline: {
                lineStyle: {color: "#27727B"},
                controlStyle: {normal: {color: "#27727B"}, emphasis: {color: "#27727B"}},
                symbol: "emptyCircle",
                symbolSize: 3
            },
            line: {
                itemStyle: {
                    normal: {borderWidth: 2, borderColor: "#fff", lineStyle: {width: 3}},
                    emphasis: {borderWidth: 0}
                }, symbol: "circle", symbolSize: 3.5
            },
            k: {
                itemStyle: {
                    normal: {
                        color: "#C1232B",
                        color0: "#B5C334",
                        lineStyle: {width: 1, color: "#C1232B", color0: "#B5C334"}
                    }
                }
            },
            scatter: {
                itemStyle: {
                    normal: {borderWidth: 1, borderColor: "rgba(200,200,200,0.5)"},
                    emphasis: {borderWidth: 0}
                }, symbol: "star4", symbolSize: 4
            },
            radar: {symbol: "emptyCircle", symbolSize: 3},
            map: {
                itemStyle: {
                    normal: {areaStyle: {color: "#ddd"}, label: {textStyle: {color: "#C1232B"}}},
                    emphasis: {areaStyle: {color: "#fe994e"}, label: {textStyle: {color: "rgb(100,0,0)"}}}
                }
            },
            force: {itemStyle: {normal: {linkStyle: {color: "#27727B"}}}},
            chord: {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {lineStyle: {color: "rgba(128, 128, 128, 0.5)"}}
                    },
                    emphasis: {
                        borderWidth: 1,
                        borderColor: "rgba(128, 128, 128, 0.5)",
                        chordStyle: {lineStyle: {color: "rgba(128, 128, 128, 0.5)"}}
                    }
                }
            },
            gauge: {
                center: ["50%", "80%"],
                radius: "100%",
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                    show: !0,
                    lineStyle: {color: [[.2, "#B5C334"], [.8, "#27727B"], [1, "#C1232B"]], width: "40%"}
                },
                axisTick: {splitNumber: 2, length: 5, lineStyle: {color: "#fff"}},
                axisLabel: {textStyle: {color: "#fff", fontWeight: "bolder"}},
                splitLine: {length: "5%", lineStyle: {color: "#fff"}},
                pointer: {width: "40%", length: "80%", color: "#fff"},
                title: {offsetCenter: [0, -20], textStyle: {color: "auto", fontSize: 20}},
                detail: {offsetCenter: [0, 0], textStyle: {color: "auto", fontSize: 40}}
            },
            textStyle: {fontFamily: "微软雅黑, Arial, Verdana, sans-serif"}
        };
        return t
    }), i("zrender/shape/Image", ["require", "./Base", "../tool/util"], function (t) {
        var e = t("./Base"), i = function (t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "image", brush: function (t, e, i) {
                var r = this.style || {};
                e && (r = this.getHighlightStyle(r, this.highlightStyle || {}));
                var o = r.image, n = this;
                if (this._imageCache || (this._imageCache = {}), "string" == typeof o) {
                    var s = o;
                    this._imageCache[s] ? o = this._imageCache[s] : (o = new Image, o.onload = function () {
                        o.onload = null, n.modSelf(), i()
                    }, o.src = s, this._imageCache[s] = o)
                }
                if (o) {
                    if ("IMG" == o.nodeName.toUpperCase())if (window.ActiveXObject) {
                        if ("complete" != o.readyState)return
                    } else if (!o.complete)return;
                    var a = r.width || o.width, h = r.height || o.height, l = r.x, c = r.y;
                    if (!o.width || !o.height)return;
                    if (t.save(), this.doClip(t), this.setContext(t, r), this.setTransform(t), r.sWidth && r.sHeight) {
                        var d = r.sx || 0, u = r.sy || 0;
                        t.drawImage(o, d, u, r.sWidth, r.sHeight, l, c, a, h)
                    } else if (r.sx && r.sy) {
                        var d = r.sx, u = r.sy, p = a - d, f = h - u;
                        t.drawImage(o, d, u, p, f, l, c, a, h)
                    } else t.drawImage(o, l, c, a, h);
                    r.width || (r.width = a), r.height || (r.height = h), this.style.width || (this.style.width = a), this.style.height || (this.style.height = h), this.drawText(t, r, this.style), t.restore()
                }
            }, getRect: function (t) {
                return {x: t.x, y: t.y, width: t.width, height: t.height}
            }, clearCache: function () {
                this._imageCache = {}
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("echarts/util/shape/MarkLine", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/Line", "zrender/shape/BezierCurve", "zrender/tool/area", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/curve"], function (t) {
        function e(t) {
            i.call(this, t), this.style.curveness > 0 && this.updatePoints(this.style), this.highlightStyle.curveness > 0 && this.updatePoints(this.highlightStyle)
        }

        var i = t("zrender/shape/Base"), r = t("./Icon"), o = t("zrender/shape/Line"), n = new o({}), s = t("zrender/shape/BezierCurve"), a = new s({}), h = t("zrender/tool/area"), l = t("zrender/shape/util/dashedLineTo"), c = t("zrender/tool/util"), d = t("zrender/tool/curve");
        return e.prototype = {
            type: "mark-line", brush: function (t, e) {
                var i = this.style;
                e && (i = this.getHighlightStyle(i, this.highlightStyle || {})), t.save(), this.setContext(t, i), this.setTransform(t), t.save(), t.beginPath(), this.buildPath(t, i), t.stroke(), t.restore(), this.brushSymbol(t, i, 0), this.brushSymbol(t, i, 1), this.drawText(t, i, this.style), t.restore()
            }, buildPath: function (t, e) {
                var i = e.lineType || "solid";
                if (t.moveTo(e.xStart, e.yStart), e.curveness > 0) {
                    var r = null;
                    switch (i) {
                        case"dashed":
                            r = [5, 5];
                            break;
                        case"dotted":
                            r = [1, 1]
                    }
                    r && t.setLineDash && t.setLineDash(r), t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd)
                } else if ("solid" == i)t.lineTo(e.xEnd, e.yEnd); else {
                    var o = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                    l(t, e.xStart, e.yStart, e.xEnd, e.yEnd, o)
                }
            }, updatePoints: function (t) {
                var e = t.curveness || 0, i = 1, r = t.xStart, o = t.yStart, n = t.xEnd, s = t.yEnd, a = (r + n) / 2 - i * (o - s) * e, h = (o + s) / 2 - i * (n - r) * e;
                t.cpX1 = a, t.cpY1 = h
            }, brushSymbol: function (t, e, i) {
                if ("none" != e.symbol[i]) {
                    t.save(), t.beginPath(), t.lineWidth = e.symbolBorder, t.strokeStyle = e.symbolBorderColor;
                    var o = e.symbol[i].replace("empty", "").toLowerCase();
                    e.symbol[i].match("empty") && (t.fillStyle = "#fff");
                    var n = e.xStart, s = e.yStart, a = e.xEnd, h = e.yEnd, l = 0 === i ? n : a, c = 0 === i ? s : h, u = e.curveness || 0, p = null != e.symbolRotate[i] ? e.symbolRotate[i] - 0 : 0;
                    if (p = p / 180 * Math.PI, "arrow" == o && 0 === p)if (0 === u) {
                        var f = 0 === i ? -1 : 1;
                        p = Math.PI / 2 + Math.atan2(f * (h - s), f * (a - n))
                    } else {
                        var g = e.cpX1, m = e.cpY1, _ = d.quadraticDerivativeAt, y = _(n, g, a, i), v = _(s, m, h, i);
                        p = Math.PI / 2 + Math.atan2(v, y)
                    }
                    t.translate(l, c), 0 !== p && t.rotate(p);
                    var x = e.symbolSize[i];
                    r.prototype.buildPath(t, {
                        x: -x,
                        y: -x,
                        width: 2 * x,
                        height: 2 * x,
                        iconType: o
                    }), t.closePath(), t.fill(), t.stroke(), t.restore()
                }
            }, getRect: function (t) {
                return t.curveness > 0 ? a.getRect(t) : n.getRect(t), t.__rect
            }, isCover: function (t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0], e = i[1], this.isCoverRect(t, e) ? this.style.curveness > 0 ? h.isInside(a, this.style, t, e) : h.isInside(n, this.style, t, e) : !1
            }
        }, c.inherits(e, i), e
    }), i("echarts/util/shape/Symbol", ["require", "zrender/shape/Base", "zrender/shape/Polygon", "zrender/tool/util", "./normalIsCover"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("zrender/shape/Base"), r = t("zrender/shape/Polygon"), o = new r({}), n = t("zrender/tool/util");
        return e.prototype = {
            type: "symbol", buildPath: function (t, e) {
                var i = e.pointList, r = i.length;
                if (0 !== r)for (var o, n, s, a, h, l = 1e4, c = Math.ceil(r / l), d = i[0]instanceof Array, u = e.size ? e.size : 2, p = u, f = u / 2, g = 2 * Math.PI, m = 0; c > m; m++) {
                    t.beginPath(), o = m * l, n = o + l, n = n > r ? r : n;
                    for (var _ = o; n > _; _++)if (e.random && (s = e["randomMap" + _ % 20] / 100, p = u * s * s, f = p / 2), d ? (a = i[_][0], h = i[_][1]) : (a = i[_].x, h = i[_].y), 3 > p)t.rect(a - f, h - f, p, p); else switch (e.iconType) {
                        case"circle":
                            t.moveTo(a, h), t.arc(a, h, f, 0, g, !0);
                            break;
                        case"diamond":
                            t.moveTo(a, h - f), t.lineTo(a + f / 3, h - f / 3), t.lineTo(a + f, h), t.lineTo(a + f / 3, h + f / 3), t.lineTo(a, h + f), t.lineTo(a - f / 3, h + f / 3), t.lineTo(a - f, h), t.lineTo(a - f / 3, h - f / 3), t.lineTo(a, h - f);
                            break;
                        default:
                            t.rect(a - f, h - f, p, p)
                    }
                    if (t.closePath(), c - 1 > m)switch (e.brushType) {
                        case"both":
                            t.fill(), e.lineWidth > 0 && t.stroke();
                            break;
                        case"stroke":
                            e.lineWidth > 0 && t.stroke();
                            break;
                        default:
                            t.fill()
                    }
                }
            }, getRect: function (t) {
                return t.__rect || o.getRect(t)
            }, isCover: t("./normalIsCover")
        }, n.inherits(e, i), e
    }), i("zrender/shape/ShapeBundle", ["require", "./Base", "../tool/util"], function (t) {
        var e = t("./Base"), i = function (t) {
            e.call(this, t)
        };
        return i.prototype = {
            constructor: i, type: "shape-bundle", brush: function (t, e) {
                var i = this.beforeBrush(t, e);
                t.beginPath();
                for (var r = 0; r < i.shapeList.length; r++) {
                    var o = i.shapeList[r], n = o.style;
                    e && (n = o.getHighlightStyle(n, o.highlightStyle || {}, o.brushTypeOnly)), o.buildPath(t, n)
                }
                switch (i.brushType) {
                    case"both":
                        t.fill();
                    case"stroke":
                        i.lineWidth > 0 && t.stroke();
                        break;
                    default:
                        t.fill()
                }
                this.drawText(t, i, this.style), this.afterBrush(t)
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                for (var e = 1 / 0, i = -1 / 0, r = 1 / 0, o = -1 / 0, n = 0; n < t.shapeList.length; n++)var s = t.shapeList[n], a = s.getRect(s.style), e = Math.min(a.x, e), r = Math.min(a.y, r), i = Math.max(a.x + a.width, i), o = Math.max(a.y + a.height, o);
                return t.__rect = {x: e, y: r, width: i - e, height: o - r}, t.__rect
            }, isCover: function (t, e) {
                var i = this.transformCoordToLocal(t, e);
                if (t = i[0], e = i[1], this.isCoverRect(t, e))for (var r = 0; r < this.style.shapeList.length; r++) {
                    var o = this.style.shapeList[r];
                    if (o.isCover(t, e))return !0
                }
                return !1
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("echarts/util/ecAnimation", ["require", "zrender/tool/util", "zrender/tool/curve", "zrender/shape/Polygon"], function (t) {
        function e(t, e, i, r, o) {
            var n, s = i.style.pointList, a = s.length;
            if (!e) {
                if (n = [], "vertical" != i._orient)for (var h = s[0][1], l = 0; a > l; l++)n[l] = [s[l][0], h]; else for (var c = s[0][0], l = 0; a > l; l++)n[l] = [c, s[l][1]];
                "half-smooth-polygon" == i.type && (n[a - 1] = f.clone(s[a - 1]), n[a - 2] = f.clone(s[a - 2])), e = {style: {pointList: n}}
            }
            n = e.style.pointList;
            var d = n.length;
            i.style.pointList = d == a ? n : a > d ? n.concat(s.slice(d)) : n.slice(0, a), t.addShape(i), i.__animating = !0, t.animate(i.id, "style").when(r, {pointList: s}).during(function () {
                i.updateControlPoints && i.updateControlPoints(i.style)
            }).done(function () {
                i.__animating = !1
            }).start(o)
        }

        function i(t, e) {
            for (var i = arguments.length, r = 2; i > r; r++) {
                var o = arguments[r];
                t.style[o] = e.style[o]
            }
        }

        function r(t, e, r, o, n) {
            var s = r.style;
            e || (e = {
                position: r.position,
                style: {
                    x: s.x,
                    y: "vertical" == r._orient ? s.y + s.height : s.y,
                    width: "vertical" == r._orient ? s.width : 0,
                    height: "vertical" != r._orient ? s.height : 0
                }
            });
            var a = s.x, h = s.y, l = s.width, c = s.height, d = [r.position[0], r.position[1]];
            i(r, e, "x", "y", "width", "height"), r.position = e.position, t.addShape(r), (d[0] != e.position[0] || d[1] != e.position[1]) && t.animate(r.id, "").when(o, {position: d}).start(n), r.__animating = !0, t.animate(r.id, "style").when(o, {
                x: a,
                y: h,
                width: l,
                height: c
            }).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function o(t, e, i, r, o) {
            if (!e) {
                var n = i.style.y;
                e = {style: {y: [n[0], n[0], n[0], n[0]]}}
            }
            var s = i.style.y;
            i.style.y = e.style.y, t.addShape(i), i.__animating = !0, t.animate(i.id, "style").when(r, {y: s}).done(function () {
                i.__animating = !1
            }).start(o)
        }

        function n(t, e, i, r, o) {
            var n = i.style.x, s = i.style.y, a = i.style.r0, h = i.style.r;
            i.__animating = !0, "r" != i._animationAdd ? (i.style.r0 = 0, i.style.r = 0, i.rotation = [2 * Math.PI, n, s], t.addShape(i), t.animate(i.id, "style").when(r, {
                r0: a,
                r: h
            }).done(function () {
                i.__animating = !1
            }).start(o), t.animate(i.id, "").when(r, {rotation: [0, n, s]}).start(o)) : (i.style.r0 = i.style.r, t.addShape(i), t.animate(i.id, "style").when(r, {r0: a}).done(function () {
                i.__animating = !1
            }).start(o))
        }

        function s(t, e, r, o, n) {
            e || (e = "r" != r._animationAdd ? {
                style: {
                    startAngle: r.style.startAngle,
                    endAngle: r.style.startAngle
                }
            } : {style: {r0: r.style.r}});
            var s = r.style.startAngle, a = r.style.endAngle;
            i(r, e, "startAngle", "endAngle"), t.addShape(r), r.__animating = !0, t.animate(r.id, "style").when(o, {
                startAngle: s,
                endAngle: a
            }).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function a(t, e, r, o, n) {
            e || (e = {style: {x: "left" == r.style.textAlign ? r.style.x + 100 : r.style.x - 100, y: r.style.y}});
            var s = r.style.x, a = r.style.y;
            i(r, e, "x", "y"), t.addShape(r), r.__animating = !0, t.animate(r.id, "style").when(o, {
                x: s,
                y: a
            }).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function h(e, i, r, o, n) {
            var s = t("zrender/shape/Polygon").prototype.getRect(r.style), a = s.x + s.width / 2, h = s.y + s.height / 2;
            r.scale = [.1, .1, a, h], e.addShape(r), r.__animating = !0, e.animate(r.id, "").when(o, {scale: [1, 1, a, h]}).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function l(t, e, r, o, n) {
            e || (e = {
                style: {
                    source0: 0,
                    source1: r.style.source1 > 0 ? 360 : -360,
                    target0: 0,
                    target1: r.style.target1 > 0 ? 360 : -360
                }
            });
            var s = r.style.source0, a = r.style.source1, h = r.style.target0, l = r.style.target1;
            e.style && i(r, e, "source0", "source1", "target0", "target1"), t.addShape(r), r.__animating = !0, t.animate(r.id, "style").when(o, {
                source0: s,
                source1: a,
                target0: h,
                target1: l
            }).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function c(t, e, i, r, o) {
            e || (e = {style: {angle: i.style.startAngle}});
            var n = i.style.angle;
            i.style.angle = e.style.angle, t.addShape(i), i.__animating = !0, t.animate(i.id, "style").when(r, {angle: n}).done(function () {
                i.__animating = !1
            }).start(o)
        }

        function d(t, e, i, o, n, s) {
            if (i.style._x = i.style.x, i.style._y = i.style.y, i.style._width = i.style.width, i.style._height = i.style.height, e)r(t, e, i, o, n); else {
                var a = i._x || 0, h = i._y || 0;
                i.scale = [.01, .01, a, h], t.addShape(i), i.__animating = !0, t.animate(i.id, "").delay(s).when(o, {scale: [1, 1, a, h]}).done(function () {
                    i.__animating = !1
                }).start(n || "QuinticOut")
            }
        }

        function u(t, e, r, o, n) {
            e || (e = {
                style: {
                    xStart: r.style.xStart,
                    yStart: r.style.yStart,
                    xEnd: r.style.xStart,
                    yEnd: r.style.yStart
                }
            });
            var s = r.style.xStart, a = r.style.xEnd, h = r.style.yStart, l = r.style.yEnd;
            i(r, e, "xStart", "xEnd", "yStart", "yEnd"), t.addShape(r), r.__animating = !0, t.animate(r.id, "style").when(o, {
                xStart: s,
                xEnd: a,
                yStart: h,
                yEnd: l
            }).done(function () {
                r.__animating = !1
            }).start(n)
        }

        function p(t, e, i, r, o) {
            o = o || "QuinticOut", i.__animating = !0, t.addShape(i);
            var n = i.style, s = function () {
                i.__animating = !1
            }, a = n.xStart, h = n.yStart, l = n.xEnd, c = n.yEnd;
            if (n.curveness > 0) {
                i.updatePoints(n);
                var d = {p: 0}, u = n.cpX1, p = n.cpY1, f = [], m = [], _ = g.quadraticSubdivide;
                t.animation.animate(d).when(r, {p: 1}).during(function () {
                    _(a, u, l, d.p, f), _(h, p, c, d.p, m), n.cpX1 = f[1], n.cpY1 = m[1], n.xEnd = f[2], n.yEnd = m[2], t.modShape(i)
                }).done(s).start(o)
            } else t.animate(i.id, "style").when(0, {xEnd: a, yEnd: h}).when(r, {xEnd: l, yEnd: c}).done(s).start(o)
        }

        var f = t("zrender/tool/util"), g = t("zrender/tool/curve");
        return {
            pointList: e,
            rectangle: r,
            candle: o,
            ring: n,
            sector: s,
            text: a,
            polygon: h,
            ribbon: l,
            gaugePointer: c,
            icon: d,
            line: u,
            markline: p
        }
    }), i("echarts/util/accMath", [], function () {
        function t(t, e) {
            var i = t.toString(), r = e.toString(), o = 0;
            try {
                o = r.split(".")[1].length
            } catch (n) {
            }
            try {
                o -= i.split(".")[1].length
            } catch (n) {
            }
            return (i.replace(".", "") - 0) / (r.replace(".", "") - 0) * Math.pow(10, o)
        }

        function e(t, e) {
            var i = t.toString(), r = e.toString(), o = 0;
            try {
                o += i.split(".")[1].length
            } catch (n) {
            }
            try {
                o += r.split(".")[1].length
            } catch (n) {
            }
            return (i.replace(".", "") - 0) * (r.replace(".", "") - 0) / Math.pow(10, o)
        }

        function i(t, e) {
            var i = 0, r = 0;
            try {
                i = t.toString().split(".")[1].length
            } catch (o) {
            }
            try {
                r = e.toString().split(".")[1].length
            } catch (o) {
            }
            var n = Math.pow(10, Math.max(i, r));
            return (Math.round(t * n) + Math.round(e * n)) / n
        }

        function r(t, e) {
            return i(t, -e)
        }

        return {accDiv: t, accMul: e, accAdd: i, accSub: r}
    }), i("echarts/component/base", ["require", "../config", "../util/ecData", "../util/ecQuery", "../util/number", "zrender/tool/util", "zrender/tool/env"], function (t) {
        function e(t, e, o, n, s) {
            this.ecTheme = t, this.messageCenter = e, this.zr = o, this.option = n, this.series = n.series, this.myChart = s, this.component = s.component, this.shapeList = [], this.effectList = [];
            var a = this;
            a._onlegendhoverlink = function (t) {
                if (a.legendHoverLink)for (var e, o = t.target, n = a.shapeList.length - 1; n >= 0; n--)e = a.type == i.CHART_TYPE_PIE || a.type == i.CHART_TYPE_FUNNEL ? r.get(a.shapeList[n], "name") : (r.get(a.shapeList[n], "series") || {}).name, e != o || a.shapeList[n].invisible || a.shapeList[n].__animating || a.zr.addHoverShape(a.shapeList[n])
            }, e && e.bind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink)
        }

        var i = t("../config"), r = t("../util/ecData"), o = t("../util/ecQuery"), n = t("../util/number"), s = t("zrender/tool/util");
        return e.prototype = {
            canvasSupported: t("zrender/tool/env").canvasSupported,
            _getZ: function (t) {
                if (null != this[t])return this[t];
                var e = this.ecTheme[this.type];
                return e && null != e[t] ? e[t] : (e = i[this.type], e && null != e[t] ? e[t] : 0)
            },
            getZlevelBase: function () {
                return this._getZ("zlevel")
            },
            getZBase: function () {
                return this._getZ("z")
            },
            reformOption: function (t) {
                return t = s.merge(s.merge(t || {}, s.clone(this.ecTheme[this.type] || {})), s.clone(i[this.type] || {})), this.z = t.z, this.zlevel = t.zlevel, t
            },
            reformCssArray: function (t) {
                if (!(t instanceof Array))return [t, t, t, t];
                switch (t.length + "") {
                    case"4":
                        return t;
                    case"3":
                        return [t[0], t[1], t[2], t[1]];
                    case"2":
                        return [t[0], t[1], t[0], t[1]];
                    case"1":
                        return [t[0], t[0], t[0], t[0]];
                    case"0":
                        return [0, 0, 0, 0]
                }
            },
            getShapeById: function (t) {
                for (var e = 0, i = this.shapeList.length; i > e; e++)if (this.shapeList[e].id === t)return this.shapeList[e];
                return null
            },
            getFont: function (t) {
                var e = this.getTextStyle(s.clone(t));
                return e.fontStyle + " " + e.fontWeight + " " + e.fontSize + "px " + e.fontFamily
            },
            getTextStyle: function (t) {
                return s.merge(s.merge(t || {}, this.ecTheme.textStyle), i.textStyle)
            },
            getItemStyleColor: function (t, e, i, r) {
                return "function" == typeof t ? t.call(this.myChart, {
                    seriesIndex: e,
                    series: this.series[e],
                    dataIndex: i,
                    data: r
                }) : t
            },
            getDataFromOption: function (t, e) {
                return null != t ? null != t.value ? t.value : t : e
            },
            subPixelOptimize: function (t, e) {
                return t = e % 2 === 1 ? Math.floor(t) + .5 : Math.round(t)
            },
            resize: function () {
                this.refresh && this.refresh(), this.clearEffectShape && this.clearEffectShape(!0);
                var t = this;
                setTimeout(function () {
                    t.animationEffect && t.animationEffect()
                }, 200)
            },
            clear: function () {
                this.clearEffectShape && this.clearEffectShape(), this.zr && this.zr.delShape(this.shapeList), this.shapeList = []
            },
            dispose: function () {
                this.onbeforDispose && this.onbeforDispose(), this.clear(), this.shapeList = null, this.effectList = null, this.messageCenter && this.messageCenter.unbind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink), this.onafterDispose && this.onafterDispose()
            },
            query: o.query,
            deepQuery: o.deepQuery,
            deepMerge: o.deepMerge,
            parsePercent: n.parsePercent,
            parseCenter: n.parseCenter,
            parseRadius: n.parseRadius,
            numAddCommas: n.addCommas,
            getPrecision: n.getPrecision
        }, e
    }), i("echarts/layout/EdgeBundling", ["require", "../data/KDTree", "zrender/tool/vector"], function (t) {
        function e(t, e) {
            t = t.array, e = e.array;
            var i = e[0] - t[0], r = e[1] - t[1], o = e[2] - t[2], n = e[3] - t[3];
            return i * i + r * r + o * o + n * n
        }

        function i(t) {
            this.points = [t.mp0, t.mp1], this.group = t
        }

        function r(t) {
            var e = t.points;
            e[0][1] < e[1][1] || t instanceof i ? (this.array = [e[0][0], e[0][1], e[1][0], e[1][1]], this._startPoint = e[0], this._endPoint = e[1]) : (this.array = [e[1][0], e[1][1], e[0][0], e[0][1]], this._startPoint = e[1], this._endPoint = e[0]), this.ink = c(e[0], e[1]), this.edge = t, this.group = null
        }

        function o() {
            this.edgeList = [], this.mp0 = h(), this.mp1 = h(), this.ink = 0
        }

        function n() {
            this.maxNearestEdge = 6, this.maxTurningAngle = Math.PI / 4, this.maxIteration = 20
        }

        var s = t("../data/KDTree"), a = t("zrender/tool/vector"), h = a.create, l = a.distSquare, c = a.dist, d = a.copy, u = a.clone;
        return r.prototype.getStartPoint = function () {
            return this._startPoint
        }, r.prototype.getEndPoint = function () {
            return this._endPoint
        }, o.prototype.addEdge = function (t) {
            t.group = this, this.edgeList.push(t)
        }, o.prototype.removeEdge = function (t) {
            t.group = null, this.edgeList.splice(this.edgeList.indexOf(t), 1)
        }, n.prototype = {
            constructor: n, run: function (t) {
                function e(t, e) {
                    return l(t, e) < 1e-10
                }

                function r(t, i) {
                    for (var r = [], o = 0, n = 0; n < t.length; n++)o > 0 && e(t[n], r[o - 1]) || (r[o++] = u(t[n]));
                    return i[0] && !e(r[0], i[0]) && (r = r.reverse()), r
                }

                for (var o = this._iterate(t), n = 0; n++ < this.maxIteration;) {
                    for (var s = [], a = 0; a < o.groups.length; a++)s.push(new i(o.groups[a]));
                    var h = this._iterate(s);
                    if (h.savedInk <= 0)break;
                    o = h
                }
                var c = [], d = function (t, e) {
                    for (var o, n = 0; n < t.length; n++) {
                        var s = t[n];
                        if (s.edgeList[0] && s.edgeList[0].edge instanceof i) {
                            for (var a = [], h = 0; h < s.edgeList.length; h++)a.push(s.edgeList[h].edge.group);
                            o = e ? e.slice() : [], o.unshift(s.mp0), o.push(s.mp1), d(a, o)
                        } else for (var h = 0; h < s.edgeList.length; h++) {
                            var l = s.edgeList[h];
                            o = e ? e.slice() : [], o.unshift(s.mp0), o.push(s.mp1), o.unshift(l.getStartPoint()), o.push(l.getEndPoint()), c.push({
                                points: r(o, l.edge.points),
                                rawEdge: l.edge
                            })
                        }
                    }
                };
                return d(o.groups), c
            }, _iterate: function (t) {
                for (var i = [], n = [], a = 0, l = 0; l < t.length; l++) {
                    var c = new r(t[l]);
                    i.push(c)
                }
                for (var u = new s(i, 4), p = [], f = h(), g = h(), m = 0, _ = h(), y = h(), v = 0, l = 0; l < i.length; l++) {
                    var c = i[l];
                    if (!c.group) {
                        u.nearestN(c, this.maxNearestEdge, e, p);
                        for (var x = 0, b = null, T = null, S = 0; S < p.length; S++) {
                            var C = p[S], E = 0;
                            C.group ? C.group !== T && (T = C.group, m = this._calculateGroupEdgeInk(C.group, c, f, g), E = C.group.ink + c.ink - m) : (m = this._calculateEdgeEdgeInk(c, C, f, g), E = C.ink + c.ink - m), E > x && (x = E, b = C, d(y, g), d(_, f), v = m)
                        }
                        if (b) {
                            a += x;
                            var w;
                            b.group || (w = new o, n.push(w), w.addEdge(b)), w = b.group, d(w.mp0, _), d(w.mp1, y), w.ink = v, b.group.addEdge(c)
                        } else {
                            var w = new o;
                            n.push(w), d(w.mp0, c.getStartPoint()), d(w.mp1, c.getEndPoint()), w.ink = c.ink, w.addEdge(c)
                        }
                    }
                }
                return {groups: n, edges: i, savedInk: a}
            }, _calculateEdgeEdgeInk: function () {
                var t = [], e = [];
                return function (i, r, o, n) {
                    t[0] = i.getStartPoint(), t[1] = r.getStartPoint(), e[0] = i.getEndPoint(), e[1] = r.getEndPoint(), this._calculateMeetPoints(t, e, o, n);
                    var s = c(t[0], o) + c(o, n) + c(n, e[0]) + c(t[1], o) + c(n, e[1]);
                    return s
                }
            }(), _calculateGroupEdgeInk: function (t, e, i, r) {
                for (var o = [], n = [], s = 0; s < t.edgeList.length; s++) {
                    var a = t.edgeList[s];
                    o.push(a.getStartPoint()), n.push(a.getEndPoint())
                }
                o.push(e.getStartPoint()), n.push(e.getEndPoint()), this._calculateMeetPoints(o, n, i, r);
                for (var h = c(i, r), s = 0; s < o.length; s++)h += c(o[s], i) + c(n[s], r);
                return h
            }, _calculateMeetPoints: function () {
                var t = h(), e = h();
                return function (i, r, o, n) {
                    a.set(t, 0, 0), a.set(e, 0, 0);
                    for (var s = i.length, h = 0; s > h; h++)a.add(t, t, i[h]);
                    a.scale(t, t, 1 / s), s = r.length;
                    for (var h = 0; s > h; h++)a.add(e, e, r[h]);
                    a.scale(e, e, 1 / s), this._limitTurningAngle(i, t, e, o), this._limitTurningAngle(r, e, t, n)
                }
            }(), _limitTurningAngle: function () {
                var t = h(), e = h(), i = h(), r = h();
                return function (o, n, s, h) {
                    var d = Math.cos(this.maxTurningAngle), u = Math.tan(this.maxTurningAngle);
                    a.sub(t, n, s), a.normalize(t, t), a.copy(h, n);
                    for (var p = 0, f = 0; f < o.length; f++) {
                        var g = o[f];
                        a.sub(e, g, n);
                        var m = a.len(e);
                        a.scale(e, e, 1 / m);
                        var _ = a.dot(e, t);
                        if (d > _) {
                            a.scaleAndAdd(i, n, t, m * _);
                            var y = c(i, g), v = y / u;
                            a.scaleAndAdd(r, i, t, -v);
                            var x = l(r, n);
                            x > p && (p = x, a.copy(h, r))
                        }
                    }
                }
            }()
        }, n
    }), i("echarts/util/ecEffect", ["require", "../util/ecData", "zrender/shape/Circle", "zrender/shape/Image", "zrender/tool/curve", "../util/shape/Icon", "../util/shape/Symbol", "zrender/shape/ShapeBundle", "zrender/shape/Polyline", "zrender/tool/vector", "zrender/tool/env"], function (t) {
        function e(t, e, i, r) {
            var o, s = i.effect, h = s.color || i.style.strokeColor || i.style.color, c = s.shadowColor || h, d = s.scaleSize, u = s.bounceDistance, p = "undefined" != typeof s.shadowBlur ? s.shadowBlur : d;
            "image" !== i.type ? (o = new l({
                zlevel: r,
                style: {
                    brushType: "stroke",
                    iconType: "droplet" != i.style.iconType ? i.style.iconType : "circle",
                    x: p + 1,
                    y: p + 1,
                    n: i.style.n,
                    width: i.style._width * d,
                    height: i.style._height * d,
                    lineWidth: 1,
                    strokeColor: h,
                    shadowColor: c,
                    shadowBlur: p
                },
                draggable: !1,
                hoverable: !1
            }), "pin" == i.style.iconType && (o.style.y += o.style.height / 2 * 1.5), f && (o.style.image = t.shapeToImage(o, o.style.width + 2 * p + 2, o.style.height + 2 * p + 2).style.image, o = new a({
                zlevel: o.zlevel,
                style: o.style,
                draggable: !1,
                hoverable: !1
            }))) : o = new a({
                zlevel: r,
                style: i.style,
                draggable: !1,
                hoverable: !1
            }), n.clone(i, o), o.position = i.position, e.push(o), t.addShape(o);
            var g = "image" !== i.type ? window.devicePixelRatio || 1 : 1, m = (o.style.width / g - i.style._width) / 2;
            o.style.x = i.style._x - m, o.style.y = i.style._y - m, "pin" == i.style.iconType && (o.style.y -= i.style.height / 2 * 1.5);
            var _ = 100 * (s.period + 10 * Math.random());
            t.modShape(i.id, {invisible: !0});
            var y = o.style.x + o.style.width / 2 / g, v = o.style.y + o.style.height / 2 / g;
            "scale" === s.type ? (t.modShape(o.id, {scale: [.1, .1, y, v]}), t.animate(o.id, "", s.loop).when(_, {scale: [1, 1, y, v]}).done(function () {
                i.effect.show = !1, t.delShape(o.id)
            }).start()) : t.animate(o.id, "style", s.loop).when(_, {y: o.style.y - u}).when(2 * _, {y: o.style.y}).done(function () {
                i.effect.show = !1, t.delShape(o.id)
            }).start()
        }

        function i(t, e, i, r) {
            var o = i.effect, n = o.color || i.style.strokeColor || i.style.color, s = o.scaleSize, a = o.shadowColor || n, h = "undefined" != typeof o.shadowBlur ? o.shadowBlur : 2 * s, l = window.devicePixelRatio || 1, d = new c({
                zlevel: r,
                position: i.position,
                scale: i.scale,
                style: {
                    pointList: i.style.pointList,
                    iconType: i.style.iconType,
                    color: n,
                    strokeColor: n,
                    shadowColor: a,
                    shadowBlur: h * l,
                    random: !0,
                    brushType: "fill",
                    lineWidth: 1,
                    size: i.style.size
                },
                draggable: !1,
                hoverable: !1
            });
            e.push(d), t.addShape(d), t.modShape(i.id, {invisible: !0});
            for (var u = Math.round(100 * o.period), p = {}, f = {}, g = 0; 20 > g; g++)d.style["randomMap" + g] = 0, p = {}, p["randomMap" + g] = 100, f = {}, f["randomMap" + g] = 0, d.style["randomMap" + g] = 100 * Math.random(), t.animate(d.id, "style", !0).when(u, p).when(2 * u, f).when(3 * u, p).when(4 * u, p).delay(Math.random() * u * g).start()
        }

        function r(t, e, i, r, o) {
            var a = i.effect, l = i.style, c = a.color || l.strokeColor || l.color, d = a.shadowColor || l.strokeColor || c, g = l.lineWidth * a.scaleSize, m = "undefined" != typeof a.shadowBlur ? a.shadowBlur : g, _ = new s({
                zlevel: r,
                style: {x: m, y: m, r: g, color: c, shadowColor: d, shadowBlur: m},
                hoverable: !1
            }), y = 0;
            if (f && !o) {
                var r = _.zlevel;
                _ = t.shapeToImage(_, 2 * (g + m), 2 * (g + m)), _.zlevel = r, _.hoverable = !1, y = m
            }
            o || (n.clone(i, _), _.position = i.position, e.push(_), t.addShape(_));
            var v = function () {
                o || (i.effect.show = !1, t.delShape(_.id)), _.effectAnimator = null
            };
            if (i instanceof u) {
                for (var x = [0], b = 0, T = l.pointList, S = l.controlPointList, C = 1; C < T.length; C++) {
                    if (S) {
                        var E = S[2 * (C - 1)], w = S[2 * (C - 1) + 1];
                        b += p.dist(T[C - 1], E) + p.dist(E, w) + p.dist(w, T[C])
                    } else b += p.dist(T[C - 1], T[C]);
                    x.push(b)
                }
                for (var z = {p: 0}, k = t.animation.animate(z, {loop: a.loop}), C = 0; C < x.length; C++)k.when(x[C] * a.period, {p: C});
                k.during(function () {
                    var e, i, r = Math.floor(z.p);
                    if (r == T.length - 1)e = T[r][0], i = T[r][1]; else {
                        var n = z.p - r, s = T[r], a = T[r + 1];
                        if (S) {
                            var l = S[2 * r], c = S[2 * r + 1];
                            e = h.cubicAt(s[0], l[0], c[0], a[0], n), i = h.cubicAt(s[1], l[1], c[1], a[1], n)
                        } else e = (a[0] - s[0]) * n + s[0], i = (a[1] - s[1]) * n + s[1]
                    }
                    _.style.x = e, _.style.y = i, o || t.modShape(_)
                }).done(v).start(), k.duration = b * a.period, _.effectAnimator = k
            } else {
                var L = l.xStart - y, A = l.yStart - y, M = l.xEnd - y, P = l.yEnd - y;
                _.style.x = L, _.style.y = A;
                var I = (M - L) * (M - L) + (P - A) * (P - A), O = Math.round(Math.sqrt(Math.round(I * a.period * a.period)));
                if (i.style.curveness > 0) {
                    var R = l.cpX1 - y, D = l.cpY1 - y;
                    _.effectAnimator = t.animation.animate(_, {loop: a.loop}).when(O, {p: 1}).during(function (e, i) {
                        _.style.x = h.quadraticAt(L, R, M, i), _.style.y = h.quadraticAt(A, D, P, i), o || t.modShape(_)
                    }).done(v).start()
                } else _.effectAnimator = t.animation.animate(_.style, {loop: a.loop}).when(O, {
                    x: M,
                    y: P
                }).during(function () {
                    o || t.modShape(_)
                }).done(v).start();
                _.effectAnimator.duration = O
            }
            return _
        }

        function o(t, e, i, o) {
            var n = new d({style: {shapeList: []}, zlevel: o, hoverable: !1}), s = i.style.shapeList, a = i.effect;
            n.position = i.position;
            for (var h = 0, l = [], c = 0; c < s.length; c++) {
                s[c].effect = a;
                var u = r(t, null, s[c], o, !0), p = u.effectAnimator;
                n.style.shapeList.push(u), p.duration > h && (h = p.duration), 0 === c && (n.style.color = u.style.color, n.style.shadowBlur = u.style.shadowBlur, n.style.shadowColor = u.style.shadowColor), l.push(p)
            }
            e.push(n), t.addShape(n);
            var f = function () {
                for (var t = 0; t < l.length; t++)l[t].stop()
            };
            if (h) {
                n.__dummy = 0;
                var g = t.animate(n.id, "", a.loop).when(h, {__dummy: 1}).during(function () {
                    t.modShape(n)
                }).done(function () {
                    i.effect.show = !1, t.delShape(n.id)
                }).start(), m = g.stop;
                g.stop = function () {
                    f(), m.call(this)
                }
            }
        }

        var n = t("../util/ecData"), s = t("zrender/shape/Circle"), a = t("zrender/shape/Image"), h = t("zrender/tool/curve"), l = t("../util/shape/Icon"), c = t("../util/shape/Symbol"), d = t("zrender/shape/ShapeBundle"), u = t("zrender/shape/Polyline"), p = t("zrender/tool/vector"), f = t("zrender/tool/env").canvasSupported;
        return {point: e, largePoint: i, line: r, largeLine: o}
    }), i("zrender/shape/Base", ["require", "../tool/matrix", "../tool/guid", "../tool/util", "../tool/log", "../mixin/Transformable", "../mixin/Eventful", "../tool/area", "../tool/color"], function (t) {
        function e(e, r, o, n, s, a, h) {
            s && (e.font = s), e.textAlign = a, e.textBaseline = h;
            var l = i(r, o, n, s, a, h);
            r = (r + "").split("\n");
            var c = t("../tool/area").getTextHeight("国", s);
            switch (h) {
                case"top":
                    n = l.y;
                    break;
                case"bottom":
                    n = l.y + c;
                    break;
                default:
                    n = l.y + c / 2
            }
            for (var d = 0, u = r.length; u > d; d++)e.fillText(r[d], o, n), n += c
        }

        function i(e, i, r, o, n, s) {
            var a = t("../tool/area"), h = a.getTextWidth(e, o), l = a.getTextHeight("国", o);
            switch (e = (e + "").split("\n"), n) {
                case"end":
                case"right":
                    i -= h;
                    break;
                case"center":
                    i -= h / 2
            }
            switch (s) {
                case"top":
                    break;
                case"bottom":
                    r -= l * e.length;
                    break;
                default:
                    r -= l * e.length / 2
            }
            return {x: i, y: r, width: h, height: l * e.length}
        }

        var r = window.G_vmlCanvasManager, o = t("../tool/matrix"), n = t("../tool/guid"), s = t("../tool/util"), a = t("../tool/log"), h = t("../mixin/Transformable"), l = t("../mixin/Eventful"), c = function (t) {
            t = t || {}, this.id = t.id || n();
            for (var e in t)this[e] = t[e];
            this.style = this.style || {}, this.highlightStyle = this.highlightStyle || null, this.parent = null, this.__dirty = !0, this.__clipShapes = [], h.call(this), l.call(this)
        };
        c.prototype.invisible = !1, c.prototype.ignore = !1, c.prototype.zlevel = 0, c.prototype.draggable = !1, c.prototype.clickable = !1, c.prototype.hoverable = !0, c.prototype.z = 0, c.prototype.brush = function (t, e) {
            var i = this.beforeBrush(t, e);
            switch (t.beginPath(), this.buildPath(t, i), i.brushType) {
                case"both":
                    t.fill();
                case"stroke":
                    i.lineWidth > 0 && t.stroke();
                    break;
                default:
                    t.fill()
            }
            this.drawText(t, i, this.style), this.afterBrush(t)
        }, c.prototype.beforeBrush = function (t, e) {
            var i = this.style;
            return this.brushTypeOnly && (i.brushType = this.brushTypeOnly), e && (i = this.getHighlightStyle(i, this.highlightStyle || {}, this.brushTypeOnly)), "stroke" == this.brushTypeOnly && (i.strokeColor = i.strokeColor || i.color), t.save(), this.doClip(t), this.setContext(t, i), this.setTransform(t), i
        }, c.prototype.afterBrush = function (t) {
            t.restore()
        };
        var d = [["color", "fillStyle"], ["strokeColor", "strokeStyle"], ["opacity", "globalAlpha"], ["lineCap", "lineCap"], ["lineJoin", "lineJoin"], ["miterLimit", "miterLimit"], ["lineWidth", "lineWidth"], ["shadowBlur", "shadowBlur"], ["shadowColor", "shadowColor"], ["shadowOffsetX", "shadowOffsetX"], ["shadowOffsetY", "shadowOffsetY"]];
        c.prototype.setContext = function (t, e) {
            for (var i = 0, r = d.length; r > i; i++) {
                var o = d[i][0], n = e[o], s = d[i][1];
                "undefined" != typeof n && (t[s] = n)
            }
        };
        var u = o.create();
        return c.prototype.doClip = function (t) {
            if (this.__clipShapes && !r)for (var e = 0; e < this.__clipShapes.length; e++) {
                var i = this.__clipShapes[e];
                if (i.needTransform) {
                    var n = i.transform;
                    o.invert(u, n), t.transform(n[0], n[1], n[2], n[3], n[4], n[5])
                }
                if (t.beginPath(), i.buildPath(t, i.style), t.clip(), i.needTransform) {
                    var n = u;
                    t.transform(n[0], n[1], n[2], n[3], n[4], n[5])
                }
            }
        }, c.prototype.getHighlightStyle = function (e, i, r) {
            var o = {};
            for (var n in e)o[n] = e[n];
            var s = t("../tool/color"), a = s.getHighlightColor();
            "stroke" != e.brushType ? (o.strokeColor = a, o.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom(), o.brushType = "both") : "stroke" != r ? (o.strokeColor = a, o.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom()) : o.strokeColor = i.strokeColor || s.mix(e.strokeColor, s.toRGB(a));
            for (var n in i)"undefined" != typeof i[n] && (o[n] = i[n]);
            return o
        }, c.prototype.getHighlightZoom = function () {
            return "text" != this.type ? 6 : 2
        }, c.prototype.drift = function (t, e) {
            this.position[0] += t, this.position[1] += e
        }, c.prototype.buildPath = function () {
            a("buildPath not implemented in " + this.type)
        }, c.prototype.getRect = function () {
            a("getRect not implemented in " + this.type)
        }, c.prototype.isCover = function (e, i) {
            var r = this.transformCoordToLocal(e, i);
            return e = r[0], i = r[1], this.isCoverRect(e, i) ? t("../tool/area").isInside(this, this.style, e, i) : !1
        }, c.prototype.isCoverRect = function (t, e) {
            var i = this.style.__rect;
            return i || (i = this.style.__rect = this.getRect(this.style)), t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height
        }, c.prototype.drawText = function (t, i, r) {
            if ("undefined" != typeof i.text && i.text !== !1) {
                var o = i.textColor || i.color || i.strokeColor;
                t.fillStyle = o;
                var n, s, a, h, l = 10, c = i.textPosition || this.textPosition || "top";
                switch (c) {
                    case"inside":
                    case"top":
                    case"bottom":
                    case"left":
                    case"right":
                        if (this.getRect) {
                            var d = (r || i).__rect || this.getRect(r || i);
                            switch (c) {
                                case"inside":
                                    a = d.x + d.width / 2, h = d.y + d.height / 2, n = "center", s = "middle", "stroke" != i.brushType && o == i.color && (t.fillStyle = "#fff");
                                    break;
                                case"left":
                                    a = d.x - l, h = d.y + d.height / 2, n = "end", s = "middle";
                                    break;
                                case"right":
                                    a = d.x + d.width + l, h = d.y + d.height / 2, n = "start", s = "middle";
                                    break;
                                case"top":
                                    a = d.x + d.width / 2, h = d.y - l, n = "center", s = "bottom";
                                    break;
                                case"bottom":
                                    a = d.x + d.width / 2, h = d.y + d.height + l, n = "center", s = "top"
                            }
                        }
                        break;
                    case"start":
                    case"end":
                        var u = i.pointList || [[i.xStart || 0, i.yStart || 0], [i.xEnd || 0, i.yEnd || 0]], p = u.length;
                        if (2 > p)return;
                        var f, g, m, _;
                        switch (c) {
                            case"start":
                                f = u[1][0], g = u[0][0], m = u[1][1], _ = u[0][1];
                                break;
                            case"end":
                                f = u[p - 2][0], g = u[p - 1][0], m = u[p - 2][1], _ = u[p - 1][1]
                        }
                        a = g, h = _;
                        var y = Math.atan((m - _) / (g - f)) / Math.PI * 180;
                        0 > g - f ? y += 180 : 0 > m - _ && (y += 360), l = 5, y >= 30 && 150 >= y ? (n = "center", s = "bottom", h -= l) : y > 150 && 210 > y ? (n = "right", s = "middle", a -= l) : y >= 210 && 330 >= y ? (n = "center", s = "top", h += l) : (n = "left", s = "middle", a += l);
                        break;
                    case"specific":
                        a = i.textX || 0, h = i.textY || 0, n = "start", s = "middle"
                }
                null != a && null != h && e(t, i.text, a, h, i.textFont, i.textAlign || n, i.textBaseline || s)
            }
        }, c.prototype.modSelf = function () {
            this.__dirty = !0, this.style && (this.style.__rect = null), this.highlightStyle && (this.highlightStyle.__rect = null)
        }, c.prototype.isSilent = function () {
            return !(this.hoverable || this.draggable || this.clickable || this.onmousemove || this.onmouseover || this.onmouseout || this.onmousedown || this.onmouseup || this.onclick || this.ondragenter || this.ondragover || this.ondragleave || this.ondrop)
        }, s.merge(c.prototype, h.prototype, !0), s.merge(c.prototype, l.prototype, !0), c
    }), i("echarts/util/shape/Icon", ["require", "zrender/tool/util", "zrender/shape/Star", "zrender/shape/Heart", "zrender/shape/Droplet", "zrender/shape/Image", "zrender/shape/Base"], function (t) {
        function e(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r + e.height), t.lineTo(i + 5 * o, r + 14 * n), t.lineTo(i + e.width, r + 3 * n), t.lineTo(i + 13 * o, r), t.lineTo(i + 2 * o, r + 11 * n), t.lineTo(i, r + e.height), t.moveTo(i + 6 * o, r + 10 * n), t.lineTo(i + 14 * o, r + 2 * n), t.moveTo(i + 10 * o, r + 13 * n), t.lineTo(i + e.width, r + 13 * n), t.moveTo(i + 13 * o, r + 10 * n), t.lineTo(i + 13 * o, r + e.height)
        }

        function i(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r + e.height), t.lineTo(i + 5 * o, r + 14 * n), t.lineTo(i + e.width, r + 3 * n), t.lineTo(i + 13 * o, r), t.lineTo(i + 2 * o, r + 11 * n), t.lineTo(i, r + e.height), t.moveTo(i + 6 * o, r + 10 * n), t.lineTo(i + 14 * o, r + 2 * n), t.moveTo(i + 10 * o, r + 13 * n), t.lineTo(i + e.width, r + 13 * n)
        }

        function r(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i + 4 * o, r + 15 * n), t.lineTo(i + 9 * o, r + 13 * n), t.lineTo(i + 14 * o, r + 8 * n), t.lineTo(i + 11 * o, r + 5 * n), t.lineTo(i + 6 * o, r + 10 * n), t.lineTo(i + 4 * o, r + 15 * n), t.moveTo(i + 5 * o, r), t.lineTo(i + 11 * o, r), t.moveTo(i + 5 * o, r + n), t.lineTo(i + 11 * o, r + n), t.moveTo(i, r + 2 * n), t.lineTo(i + e.width, r + 2 * n), t.moveTo(i, r + 5 * n), t.lineTo(i + 3 * o, r + e.height), t.lineTo(i + 13 * o, r + e.height), t.lineTo(i + e.width, r + 5 * n)
        }

        function o(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r + 3 * n), t.lineTo(i + 6 * o, r + 3 * n), t.moveTo(i + 3 * o, r), t.lineTo(i + 3 * o, r + 6 * n), t.moveTo(i + 3 * o, r + 8 * n), t.lineTo(i + 3 * o, r + e.height), t.lineTo(i + e.width, r + e.height), t.lineTo(i + e.width, r + 3 * n), t.lineTo(i + 8 * o, r + 3 * n)
        }

        function n(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i + 6 * o, r), t.lineTo(i + 2 * o, r + 3 * n), t.lineTo(i + 6 * o, r + 6 * n), t.moveTo(i + 2 * o, r + 3 * n), t.lineTo(i + 14 * o, r + 3 * n), t.lineTo(i + 14 * o, r + 11 * n), t.moveTo(i + 2 * o, r + 5 * n), t.lineTo(i + 2 * o, r + 13 * n), t.lineTo(i + 14 * o, r + 13 * n), t.moveTo(i + 10 * o, r + 10 * n), t.lineTo(i + 14 * o, r + 13 * n), t.lineTo(i + 10 * o, r + e.height)
        }

        function s(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16, s = e.width / 2;
            t.lineWidth = 1.5, t.arc(i + s, r + s, s - o, 0, 2 * Math.PI / 3), t.moveTo(i + 3 * o, r + e.height), t.lineTo(i + 0 * o, r + 12 * n), t.lineTo(i + 5 * o, r + 11 * n), t.moveTo(i, r + 8 * n), t.arc(i + s, r + s, s - o, Math.PI, 5 * Math.PI / 3), t.moveTo(i + 13 * o, r), t.lineTo(i + e.width, r + 4 * n), t.lineTo(i + 11 * o, r + 5 * n)
        }

        function a(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r), t.lineTo(i, r + e.height), t.lineTo(i + e.width, r + e.height), t.moveTo(i + 2 * o, r + 14 * n), t.lineTo(i + 7 * o, r + 6 * n), t.lineTo(i + 11 * o, r + 11 * n), t.lineTo(i + 15 * o, r + 2 * n)
        }

        function h(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r), t.lineTo(i, r + e.height), t.lineTo(i + e.width, r + e.height), t.moveTo(i + 3 * o, r + 14 * n), t.lineTo(i + 3 * o, r + 6 * n), t.lineTo(i + 4 * o, r + 6 * n), t.lineTo(i + 4 * o, r + 14 * n), t.moveTo(i + 7 * o, r + 14 * n), t.lineTo(i + 7 * o, r + 2 * n), t.lineTo(i + 8 * o, r + 2 * n), t.lineTo(i + 8 * o, r + 14 * n), t.moveTo(i + 11 * o, r + 14 * n), t.lineTo(i + 11 * o, r + 9 * n), t.lineTo(i + 12 * o, r + 9 * n), t.lineTo(i + 12 * o, r + 14 * n)
        }

        function l(t, e) {
            var i = e.x, r = e.y, o = e.width - 2, n = e.height - 2, s = Math.min(o, n) / 2;
            r += 2, t.moveTo(i + s + 3, r + s - 3), t.arc(i + s + 3, r + s - 3, s - 1, 0, -Math.PI / 2, !0), t.lineTo(i + s + 3, r + s - 3), t.moveTo(i + s, r), t.lineTo(i + s, r + s), t.arc(i + s, r + s, s, -Math.PI / 2, 2 * Math.PI, !0), t.lineTo(i + s, r + s), t.lineWidth = 1.5
        }

        function c(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            r -= n, t.moveTo(i + 1 * o, r + 2 * n), t.lineTo(i + 15 * o, r + 2 * n), t.lineTo(i + 14 * o, r + 3 * n), t.lineTo(i + 2 * o, r + 3 * n), t.moveTo(i + 3 * o, r + 6 * n), t.lineTo(i + 13 * o, r + 6 * n), t.lineTo(i + 12 * o, r + 7 * n), t.lineTo(i + 4 * o, r + 7 * n), t.moveTo(i + 5 * o, r + 10 * n), t.lineTo(i + 11 * o, r + 10 * n), t.lineTo(i + 10 * o, r + 11 * n), t.lineTo(i + 6 * o, r + 11 * n), t.moveTo(i + 7 * o, r + 14 * n), t.lineTo(i + 9 * o, r + 14 * n), t.lineTo(i + 8 * o, r + 15 * n), t.lineTo(i + 7 * o, r + 15 * n)
        }

        function d(t, e) {
            var i = e.x, r = e.y, o = e.width, n = e.height, s = o / 16, a = n / 16, h = 2 * Math.min(s, a);
            t.moveTo(i + s + h, r + a + h), t.arc(i + s, r + a, h, Math.PI / 4, 3 * Math.PI), t.lineTo(i + 7 * s - h, r + 6 * a - h), t.arc(i + 7 * s, r + 6 * a, h, Math.PI / 4 * 5, 4 * Math.PI), t.arc(i + 7 * s, r + 6 * a, h / 2, Math.PI / 4 * 5, 4 * Math.PI), t.moveTo(i + 7 * s - h / 2, r + 6 * a + h), t.lineTo(i + s + h, r + 14 * a - h), t.arc(i + s, r + 14 * a, h, -Math.PI / 4, 2 * Math.PI), t.moveTo(i + 7 * s + h / 2, r + 6 * a), t.lineTo(i + 14 * s - h, r + 10 * a - h / 2), t.moveTo(i + 16 * s, r + 10 * a), t.arc(i + 14 * s, r + 10 * a, h, 0, 3 * Math.PI), t.lineWidth = 1.5
        }

        function u(t, e) {
            var i = e.x, r = e.y, o = e.width, n = e.height, s = Math.min(o, n) / 2;
            t.moveTo(i + o, r + n / 2), t.arc(i + s, r + s, s, 0, 2 * Math.PI), t.arc(i + s, r, s, Math.PI / 4, Math.PI / 5 * 4), t.arc(i, r + s, s, -Math.PI / 3, Math.PI / 3), t.arc(i + o, r + n, s, Math.PI, Math.PI / 2 * 3), t.lineWidth = 1.5
        }

        function p(t, e) {
            for (var i = e.x, r = e.y, o = e.width, n = e.height, s = Math.round(n / 3), a = Math.round((s - 2) / 2), h = 3; h--;)t.rect(i, r + s * h + a, o, 2)
        }

        function f(t, e) {
            for (var i = e.x, r = e.y, o = e.width, n = e.height, s = Math.round(o / 3), a = Math.round((s - 2) / 2), h = 3; h--;)t.rect(i + s * h + a, r, 2, n)
        }

        function g(t, e) {
            var i = e.x, r = e.y, o = e.width / 16;
            t.moveTo(i + o, r), t.lineTo(i + o, r + e.height), t.lineTo(i + 15 * o, r + e.height), t.lineTo(i + 15 * o, r), t.lineTo(i + o, r), t.moveTo(i + 3 * o, r + 3 * o), t.lineTo(i + 13 * o, r + 3 * o), t.moveTo(i + 3 * o, r + 6 * o), t.lineTo(i + 13 * o, r + 6 * o), t.moveTo(i + 3 * o, r + 9 * o), t.lineTo(i + 13 * o, r + 9 * o), t.moveTo(i + 3 * o, r + 12 * o), t.lineTo(i + 9 * o, r + 12 * o)
        }

        function m(t, e) {
            var i = e.x, r = e.y, o = e.width / 16, n = e.height / 16;
            t.moveTo(i, r), t.lineTo(i, r + e.height), t.lineTo(i + e.width, r + e.height), t.lineTo(i + e.width, r), t.lineTo(i, r), t.moveTo(i + 4 * o, r), t.lineTo(i + 4 * o, r + 8 * n), t.lineTo(i + 12 * o, r + 8 * n), t.lineTo(i + 12 * o, r), t.moveTo(i + 6 * o, r + 11 * n), t.lineTo(i + 6 * o, r + 13 * n), t.lineTo(i + 10 * o, r + 13 * n), t.lineTo(i + 10 * o, r + 11 * n), t.lineTo(i + 6 * o, r + 11 * n)
        }

        function _(t, e) {
            var i = e.x, r = e.y, o = e.width, n = e.height;
            t.moveTo(i, r + n / 2), t.lineTo(i + o, r + n / 2), t.moveTo(i + o / 2, r), t.lineTo(i + o / 2, r + n)
        }

        function y(t, e) {
            var i = e.width / 2, r = e.height / 2, o = Math.min(i, r);
            t.moveTo(e.x + i + o, e.y + r), t.arc(e.x + i, e.y + r, o, 0, 2 * Math.PI), t.closePath()
        }

        function v(t, e) {
            t.rect(e.x, e.y, e.width, e.height), t.closePath()
        }

        function x(t, e) {
            var i = e.width / 2, r = e.height / 2, o = e.x + i, n = e.y + r, s = Math.min(i, r);
            t.moveTo(o, n - s), t.lineTo(o + s, n + s), t.lineTo(o - s, n + s), t.lineTo(o, n - s), t.closePath()
        }

        function b(t, e) {
            var i = e.width / 2, r = e.height / 2, o = e.x + i, n = e.y + r, s = Math.min(i, r);
            t.moveTo(o, n - s), t.lineTo(o + s, n), t.lineTo(o, n + s), t.lineTo(o - s, n), t.lineTo(o, n - s), t.closePath()
        }

        function T(t, e) {
            var i = e.x, r = e.y, o = e.width / 16;
            t.moveTo(i + 8 * o, r), t.lineTo(i + o, r + e.height), t.lineTo(i + 8 * o, r + e.height / 4 * 3), t.lineTo(i + 15 * o, r + e.height), t.lineTo(i + 8 * o, r), t.closePath()
        }

        function S(e, i) {
            var r = t("zrender/shape/Star"), o = i.width / 2, n = i.height / 2;
            r.prototype.buildPath(e, {x: i.x + o, y: i.y + n, r: Math.min(o, n), n: i.n || 5})
        }

        function C(e, i) {
            var r = t("zrender/shape/Heart");
            r.prototype.buildPath(e, {x: i.x + i.width / 2, y: i.y + .2 * i.height, a: i.width / 2, b: .8 * i.height})
        }

        function E(e, i) {
            var r = t("zrender/shape/Droplet");
            r.prototype.buildPath(e, {x: i.x + .5 * i.width, y: i.y + .5 * i.height, a: .5 * i.width, b: .8 * i.height})
        }

        function w(t, e) {
            var i = e.x, r = e.y - e.height / 2 * 1.5, o = e.width / 2, n = e.height / 2, s = Math.min(o, n);
            t.arc(i + o, r + n, s, Math.PI / 5 * 4, Math.PI / 5), t.lineTo(i + o, r + n + 1.5 * s), t.closePath()
        }

        function z(e, i, r) {
            var o = t("zrender/shape/Image");
            this._imageShape = this._imageShape || new o({style: {}});
            for (var n in i)this._imageShape.style[n] = i[n];
            this._imageShape.brush(e, !1, r)
        }

        function k(t) {
            A.call(this, t)
        }

        var L = t("zrender/tool/util"), A = t("zrender/shape/Base");
        return k.prototype = {
            type: "icon",
            iconLibrary: {
                mark: e,
                markUndo: i,
                markClear: r,
                dataZoom: o,
                dataZoomReset: n,
                restore: s,
                lineChart: a,
                barChart: h,
                pieChart: l,
                funnelChart: c,
                forceChart: d,
                chordChart: u,
                stackChart: p,
                tiledChart: f,
                dataView: g,
                saveAsImage: m,
                cross: _,
                circle: y,
                rectangle: v,
                triangle: x,
                diamond: b,
                arrow: T,
                star: S,
                heart: C,
                droplet: E,
                pin: w,
                image: z
            },
            brush: function (e, i, r) {
                var o = i ? this.highlightStyle : this.style;
                o = o || {};
                var n = o.iconType || this.style.iconType;
                if ("image" === n) {
                    var s = t("zrender/shape/Image");
                    s.prototype.brush.call(this, e, i, r)
                } else {
                    var o = this.beforeBrush(e, i);
                    switch (e.beginPath(), this.buildPath(e, o, r), o.brushType) {
                        case"both":
                            e.fill();
                        case"stroke":
                            o.lineWidth > 0 && e.stroke();
                            break;
                        default:
                            e.fill()
                    }
                    this.drawText(e, o, this.style), this.afterBrush(e)
                }
            },
            buildPath: function (t, e, i) {
                this.iconLibrary[e.iconType] ? this.iconLibrary[e.iconType].call(this, t, e, i) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y), t.closePath())
            },
            getRect: function (t) {
                return t.__rect ? t.__rect : (t.__rect = {
                    x: Math.round(t.x),
                    y: Math.round(t.y - ("pin" == t.iconType ? t.height / 2 * 1.5 : 0)),
                    width: t.width,
                    height: t.height * ("pin" === t.iconType ? 1.25 : 1)
                }, t.__rect)
            },
            isCover: function (t, e) {
                var i = this.transformCoordToLocal(t, e);
                t = i[0], e = i[1];
                var r = this.style.__rect;
                r || (r = this.style.__rect = this.getRect(this.style));
                var o = r.height < 8 || r.width < 8 ? 4 : 0;
                return t >= r.x - o && t <= r.x + r.width + o && e >= r.y - o && e <= r.y + r.height + o
            }
        }, L.inherits(k, A), k
    }), i("zrender/tool/guid", [], function () {
        var t = 2311;
        return function () {
            return "zrender__" + t++
        }
    }), i("zrender/tool/log", ["require", "../config"], function (t) {
        var e = t("../config");
        return function () {
            if (0 !== e.debugMode)if (1 == e.debugMode)for (var t in arguments)throw new Error(arguments[t]); else if (e.debugMode > 1)for (var t in arguments)console.log(arguments[t])
        }
    }), i("zrender/tool/area", ["require", "./util", "./curve"], function (t) {
        "use strict";
        function e(t) {
            return t %= P, 0 > t && (t += P), t
        }

        function i(t, e, i, n) {
            if (!e || !t)return !1;
            var s = t.type;
            C = C || E.getContext();
            var a = r(t, e, i, n);
            if ("undefined" != typeof a)return a;
            if (t.buildPath && C.isPointInPath)return o(t, C, e, i, n);
            switch (s) {
                case"ellipse":
                    return !0;
                case"trochoid":
                    var h = "out" == e.location ? e.r1 + e.r2 + e.d : e.r1 - e.r2 + e.d;
                    return p(e, i, n, h);
                case"rose":
                    return p(e, i, n, e.maxr);
                default:
                    return !1
            }
        }

        function r(t, e, i, r) {
            var o = t.type;
            switch (o) {
                case"bezier-curve":
                    return "undefined" == typeof e.cpX2 ? h(e.xStart, e.yStart, e.cpX1, e.cpY1, e.xEnd, e.yEnd, e.lineWidth, i, r) : a(e.xStart, e.yStart, e.cpX1, e.cpY1, e.cpX2, e.cpY2, e.xEnd, e.yEnd, e.lineWidth, i, r);
                case"line":
                    return s(e.xStart, e.yStart, e.xEnd, e.yEnd, e.lineWidth, i, r);
                case"polyline":
                    return c(e.pointList, e.lineWidth, i, r);
                case"ring":
                    return d(e.x, e.y, e.r0, e.r, i, r);
                case"circle":
                    return p(e.x, e.y, e.r, i, r);
                case"sector":
                    var n = e.startAngle * Math.PI / 180, l = e.endAngle * Math.PI / 180;
                    return e.clockWise || (n = -n, l = -l), f(e.x, e.y, e.r0, e.r, n, l, !e.clockWise, i, r);
                case"path":
                    return e.pathArray && b(e.pathArray, Math.max(e.lineWidth, 5), e.brushType, i, r);
                case"polygon":
                case"star":
                case"isogon":
                    return g(e.pointList, i, r);
                case"text":
                    var m = e.__rect || t.getRect(e);
                    return u(m.x, m.y, m.width, m.height, i, r);
                case"rectangle":
                case"image":
                    return u(e.x, e.y, e.width, e.height, i, r)
            }
        }

        function o(t, e, i, r, o) {
            return e.beginPath(), t.buildPath(e, i), e.closePath(), e.isPointInPath(r, o)
        }

        function n(t, e, r, o) {
            return !i(t, e, r, o)
        }

        function s(t, e, i, r, o, n, s) {
            if (0 === o)return !1;
            var a = Math.max(o, 5), h = 0, l = t;
            if (s > e + a && s > r + a || e - a > s && r - a > s || n > t + a && n > i + a || t - a > n && i - a > n)return !1;
            if (t === i)return Math.abs(n - t) <= a / 2;
            h = (e - r) / (t - i), l = (t * r - i * e) / (t - i);
            var c = h * n - s + l, d = c * c / (h * h + 1);
            return a / 2 * a / 2 >= d
        }

        function a(t, e, i, r, o, n, s, a, h, l, c) {
            if (0 === h)return !1;
            var d = Math.max(h, 5);
            if (c > e + d && c > r + d && c > n + d && c > a + d || e - d > c && r - d > c && n - d > c && a - d > c || l > t + d && l > i + d && l > o + d && l > s + d || t - d > l && i - d > l && o - d > l && s - d > l)return !1;
            var u = w.cubicProjectPoint(t, e, i, r, o, n, s, a, l, c, null);
            return d / 2 >= u
        }

        function h(t, e, i, r, o, n, s, a, h) {
            if (0 === s)return !1;
            var l = Math.max(s, 5);
            if (h > e + l && h > r + l && h > n + l || e - l > h && r - l > h && n - l > h || a > t + l && a > i + l && a > o + l || t - l > a && i - l > a && o - l > a)return !1;
            var c = w.quadraticProjectPoint(t, e, i, r, o, n, a, h, null);
            return l / 2 >= c
        }

        function l(t, i, r, o, n, s, a, h, l) {
            if (0 === a)return !1;
            var c = Math.max(a, 5);
            h -= t, l -= i;
            var d = Math.sqrt(h * h + l * l);
            if (d - c > r || r > d + c)return !1;
            if (Math.abs(o - n) >= P)return !0;
            if (s) {
                var u = o;
                o = e(n), n = e(u)
            } else o = e(o), n = e(n);
            o > n && (n += P);
            var p = Math.atan2(l, h);
            return 0 > p && (p += P), p >= o && n >= p || p + P >= o && n >= p + P
        }

        function c(t, e, i, r) {
            for (var e = Math.max(e, 10), o = 0, n = t.length - 1; n > o; o++) {
                var a = t[o][0], h = t[o][1], l = t[o + 1][0], c = t[o + 1][1];
                if (s(a, h, l, c, e, i, r))return !0
            }
            return !1
        }

        function d(t, e, i, r, o, n) {
            var s = (o - t) * (o - t) + (n - e) * (n - e);
            return r * r > s && s > i * i
        }

        function u(t, e, i, r, o, n) {
            return o >= t && t + i >= o && n >= e && e + r >= n
        }

        function p(t, e, i, r, o) {
            return i * i > (r - t) * (r - t) + (o - e) * (o - e)
        }

        function f(t, e, i, r, o, n, s, a, h) {
            return l(t, e, (i + r) / 2, o, n, s, r - i, a, h)
        }

        function g(t, e, i) {
            for (var r = t.length, o = 0, n = 0, s = r - 1; r > n; n++) {
                var a = t[s][0], h = t[s][1], l = t[n][0], c = t[n][1];
                o += m(a, h, l, c, e, i), s = n
            }
            return 0 !== o
        }

        function m(t, e, i, r, o, n) {
            if (n > e && n > r || e > n && r > n)return 0;
            if (r == e)return 0;
            var s = e > r ? 1 : -1, a = (n - e) / (r - e), h = a * (i - t) + t;
            return h > o ? s : 0
        }

        function _() {
            var t = O[0];
            O[0] = O[1], O[1] = t
        }

        function y(t, e, i, r, o, n, s, a, h, l) {
            if (l > e && l > r && l > n && l > a || e > l && r > l && n > l && a > l)return 0;
            var c = w.cubicRootAt(e, r, n, a, l, I);
            if (0 === c)return 0;
            for (var d, u, p = 0, f = -1, g = 0; c > g; g++) {
                var m = I[g], y = w.cubicAt(t, i, o, s, m);
                h > y || (0 > f && (f = w.cubicExtrema(e, r, n, a, O), O[1] < O[0] && f > 1 && _(), d = w.cubicAt(e, r, n, a, O[0]), f > 1 && (u = w.cubicAt(e, r, n, a, O[1]))), p += 2 == f ? m < O[0] ? e > d ? 1 : -1 : m < O[1] ? d > u ? 1 : -1 : u > a ? 1 : -1 : m < O[0] ? e > d ? 1 : -1 : d > a ? 1 : -1)
            }
            return p
        }

        function v(t, e, i, r, o, n, s, a) {
            if (a > e && a > r && a > n || e > a && r > a && n > a)return 0;
            var h = w.quadraticRootAt(e, r, n, a, I);
            if (0 === h)return 0;
            var l = w.quadraticExtremum(e, r, n);
            if (l >= 0 && 1 >= l) {
                for (var c = 0, d = w.quadraticAt(e, r, n, l), u = 0; h > u; u++) {
                    var p = w.quadraticAt(t, i, o, I[u]);
                    s > p || (c += I[u] < l ? e > d ? 1 : -1 : d > n ? 1 : -1)
                }
                return c
            }
            var p = w.quadraticAt(t, i, o, I[0]);
            return s > p ? 0 : e > n ? 1 : -1
        }

        function x(t, i, r, o, n, s, a, h) {
            if (h -= i, h > r || -r > h)return 0;
            var l = Math.sqrt(r * r - h * h);
            if (I[0] = -l, I[1] = l, Math.abs(o - n) >= P) {
                o = 0, n = P;
                var c = s ? 1 : -1;
                return a >= I[0] + t && a <= I[1] + t ? c : 0
            }
            if (s) {
                var l = o;
                o = e(n), n = e(l)
            } else o = e(o), n = e(n);
            o > n && (n += P);
            for (var d = 0, u = 0; 2 > u; u++) {
                var p = I[u];
                if (p + t > a) {
                    var f = Math.atan2(h, p), c = s ? 1 : -1;
                    0 > f && (f = P + f), (f >= o && n >= f || f + P >= o && n >= f + P) && (f > Math.PI / 2 && f < 1.5 * Math.PI && (c = -c), d += c)
                }
            }
            return d
        }

        function b(t, e, i, r, o) {
            var n = 0, c = 0, d = 0, u = 0, p = 0, f = !0, g = !0;
            i = i || "fill";
            for (var _ = "stroke" === i || "both" === i, b = "fill" === i || "both" === i, T = 0; T < t.length; T++) {
                var S = t[T], C = S.points;
                if (f || "M" === S.command) {
                    if (T > 0 && (b && (n += m(c, d, u, p, r, o)), 0 !== n))return !0;
                    u = C[C.length - 2], p = C[C.length - 1], f = !1, g && "A" !== S.command && (g = !1, c = u, d = p)
                }
                switch (S.command) {
                    case"M":
                        c = C[0], d = C[1];
                        break;
                    case"L":
                        if (_ && s(c, d, C[0], C[1], e, r, o))return !0;
                        b && (n += m(c, d, C[0], C[1], r, o)), c = C[0], d = C[1];
                        break;
                    case"C":
                        if (_ && a(c, d, C[0], C[1], C[2], C[3], C[4], C[5], e, r, o))return !0;
                        b && (n += y(c, d, C[0], C[1], C[2], C[3], C[4], C[5], r, o)), c = C[4], d = C[5];
                        break;
                    case"Q":
                        if (_ && h(c, d, C[0], C[1], C[2], C[3], e, r, o))return !0;
                        b && (n += v(c, d, C[0], C[1], C[2], C[3], r, o)), c = C[2], d = C[3];
                        break;
                    case"A":
                        var E = C[0], w = C[1], z = C[2], k = C[3], L = C[4], A = C[5], M = Math.cos(L) * z + E, P = Math.sin(L) * k + w;
                        g ? (g = !1, u = M, p = P) : n += m(c, d, M, P);
                        var I = (r - E) * k / z + E;
                        if (_ && l(E, w, k, L, L + A, 1 - C[7], e, I, o))return !0;
                        b && (n += x(E, w, k, L, L + A, 1 - C[7], I, o)), c = Math.cos(L + A) * z + E, d = Math.sin(L + A) * k + w;
                        break;
                    case"z":
                        if (_ && s(c, d, u, p, e, r, o))return !0;
                        f = !0
                }
            }
            return b && (n += m(c, d, u, p, r, o)), 0 !== n
        }

        function T(t, e) {
            var i = t + ":" + e;
            if (z[i])return z[i];
            C = C || E.getContext(), C.save(), e && (C.font = e), t = (t + "").split("\n");
            for (var r = 0, o = 0, n = t.length; n > o; o++)r = Math.max(C.measureText(t[o]).width, r);
            return C.restore(), z[i] = r, ++L > M && (L = 0, z = {}), r
        }

        function S(t, e) {
            var i = t + ":" + e;
            if (k[i])return k[i];
            C = C || E.getContext(), C.save(), e && (C.font = e), t = (t + "").split("\n");
            var r = (C.measureText("国").width + 2) * t.length;
            return C.restore(), k[i] = r, ++A > M && (A = 0, k = {}), r
        }

        var C, E = t("./util"), w = t("./curve"), z = {}, k = {}, L = 0, A = 0, M = 5e3, P = 2 * Math.PI, I = [-1, -1, -1], O = [-1, -1];
        return {
            isInside: i,
            isOutside: n,
            getTextWidth: T,
            getTextHeight: S,
            isInsidePath: b,
            isInsidePolygon: g,
            isInsideSector: f,
            isInsideCircle: p,
            isInsideLine: s,
            isInsideRect: u,
            isInsidePolyline: c,
            isInsideCubicStroke: a,
            isInsideQuadraticStroke: h
        }
    }), i("zrender/mixin/Transformable", ["require", "../tool/matrix", "../tool/vector"], function (t) {
        "use strict";
        function e(t) {
            return t > -a && a > t
        }

        function i(t) {
            return t > a || -a > t
        }

        var r = t("../tool/matrix"), o = t("../tool/vector"), n = [0, 0], s = r.translate, a = 5e-5, h = function () {
            this.position || (this.position = [0, 0]), "undefined" == typeof this.rotation && (this.rotation = [0, 0, 0]), this.scale || (this.scale = [1, 1, 0, 0]), this.needLocalTransform = !1, this.needTransform = !1
        };
        return h.prototype = {
            constructor: h, updateNeedTransform: function () {
                this.needLocalTransform = i(this.rotation[0]) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
            }, updateTransform: function () {
                this.updateNeedTransform();
                var t = this.parent && this.parent.needTransform;
                if (this.needTransform = this.needLocalTransform || t, this.needTransform) {
                    var e = this.transform || r.create();
                    if (r.identity(e), this.needLocalTransform) {
                        var o = this.scale;
                        if (i(o[0]) || i(o[1])) {
                            n[0] = -o[2] || 0, n[1] = -o[3] || 0;
                            var a = i(n[0]) || i(n[1]);
                            a && s(e, e, n), r.scale(e, e, o), a && (n[0] = -n[0], n[1] = -n[1], s(e, e, n))
                        }
                        if (this.rotation instanceof Array) {
                            if (0 !== this.rotation[0]) {
                                n[0] = -this.rotation[1] || 0, n[1] = -this.rotation[2] || 0;
                                var a = i(n[0]) || i(n[1]);
                                a && s(e, e, n), r.rotate(e, e, this.rotation[0]), a && (n[0] = -n[0], n[1] = -n[1], s(e, e, n))
                            }
                        } else 0 !== this.rotation && r.rotate(e, e, this.rotation);
                        (i(this.position[0]) || i(this.position[1])) && s(e, e, this.position)
                    }
                    t && (this.needLocalTransform ? r.mul(e, this.parent.transform, e) : r.copy(e, this.parent.transform)), this.transform = e, this.invTransform = this.invTransform || r.create(), r.invert(this.invTransform, e)
                }
            }, setTransform: function (t) {
                if (this.needTransform) {
                    var e = this.transform;
                    t.transform(e[0], e[1], e[2], e[3], e[4], e[5])
                }
            }, lookAt: function () {
                var t = o.create();
                return function (i) {
                    this.transform || (this.transform = r.create());
                    var n = this.transform;
                    if (o.sub(t, i, this.position), !e(t[0]) || !e(t[1])) {
                        o.normalize(t, t);
                        var s = this.scale;
                        n[2] = t[0] * s[1], n[3] = t[1] * s[1], n[0] = t[1] * s[0], n[1] = -t[0] * s[0], n[4] = this.position[0], n[5] = this.position[1], this.decomposeTransform()
                    }
                }
            }(), decomposeTransform: function () {
                if (this.transform) {
                    var t = this.transform, e = t[0] * t[0] + t[1] * t[1], r = this.position, o = this.scale, n = this.rotation;
                    i(e - 1) && (e = Math.sqrt(e));
                    var s = t[2] * t[2] + t[3] * t[3];
                    i(s - 1) && (s = Math.sqrt(s)), r[0] = t[4], r[1] = t[5], o[0] = e, o[1] = s, o[2] = o[3] = 0, n[0] = Math.atan2(-t[1] / s, t[0] / e), n[1] = n[2] = 0
                }
            }, transformCoordToLocal: function (t, e) {
                var i = [t, e];
                return this.needTransform && this.invTransform && o.applyTransform(i, i, this.invTransform), i
            }
        }, h
    }), i("zrender/mixin/Eventful", ["require"], function () {
        var t = function () {
            this._handlers = {}
        };
        return t.prototype.one = function (t, e, i) {
            var r = this._handlers;
            return e && t ? (r[t] || (r[t] = []), r[t].push({h: e, one: !0, ctx: i || this}), this) : this
        }, t.prototype.bind = function (t, e, i) {
            var r = this._handlers;
            return e && t ? (r[t] || (r[t] = []), r[t].push({h: e, one: !1, ctx: i || this}), this) : this
        }, t.prototype.unbind = function (t, e) {
            var i = this._handlers;
            if (!t)return this._handlers = {}, this;
            if (e) {
                if (i[t]) {
                    for (var r = [], o = 0, n = i[t].length; n > o; o++)i[t][o].h != e && r.push(i[t][o]);
                    i[t] = r
                }
                i[t] && 0 === i[t].length && delete i[t]
            } else delete i[t];
            return this
        }, t.prototype.dispatch = function (t) {
            if (this._handlers[t]) {
                var e = arguments, i = e.length;
                i > 3 && (e = Array.prototype.slice.call(e, 1));
                for (var r = this._handlers[t], o = r.length, n = 0; o > n;) {
                    switch (i) {
                        case 1:
                            r[n].h.call(r[n].ctx);
                            break;
                        case 2:
                            r[n].h.call(r[n].ctx, e[1]);
                            break;
                        case 3:
                            r[n].h.call(r[n].ctx, e[1], e[2]);
                            break;
                        default:
                            r[n].h.apply(r[n].ctx, e)
                    }
                    r[n].one ? (r.splice(n, 1), o--) : n++
                }
            }
            return this
        }, t.prototype.dispatchWithContext = function (t) {
            if (this._handlers[t]) {
                var e = arguments, i = e.length;
                i > 4 && (e = Array.prototype.slice.call(e, 1, e.length - 1));
                for (var r = e[e.length - 1], o = this._handlers[t], n = o.length, s = 0; n > s;) {
                    switch (i) {
                        case 1:
                            o[s].h.call(r);
                            break;
                        case 2:
                            o[s].h.call(r, e[1]);
                            break;
                        case 3:
                            o[s].h.call(r, e[1], e[2]);
                            break;
                        default:
                            o[s].h.apply(r, e)
                    }
                    o[s].one ? (o.splice(s, 1), n--) : s++
                }
            }
            return this
        }, t
    }), i("zrender/dep/excanvas", ["require"], function () {
        return document.createElement("canvas").getContext ? G_vmlCanvasManager = !1 : !function () {
            function t() {
                return this.context_ || (this.context_ = new x(this))
            }

            function e(t, e) {
                var i = N.call(arguments, 2);
                return function () {
                    return t.apply(e, i.concat(N.call(arguments)))
                }
            }

            function i(t) {
                return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
            }

            function r(t, e, i) {
                t.namespaces[e] || t.namespaces.add(e, i, "#default#VML")
            }

            function o(t) {
                if (r(t, "g_vml_", "urn:schemas-microsoft-com:vml"), r(t, "g_o_", "urn:schemas-microsoft-com:office:office"), !t.styleSheets.ex_canvas_) {
                    var e = t.createStyleSheet();
                    e.owningElement.id = "ex_canvas_", e.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"
                }
            }

            function n(t) {
                var e = t.srcElement;
                switch (t.propertyName) {
                    case"width":
                        e.getContext().clearRect(), e.style.width = e.attributes.width.nodeValue + "px", e.firstChild.style.width = e.clientWidth + "px";
                        break;
                    case"height":
                        e.getContext().clearRect(), e.style.height = e.attributes.height.nodeValue + "px", e.firstChild.style.height = e.clientHeight + "px"
                }
            }

            function s(t) {
                var e = t.srcElement;
                e.firstChild && (e.firstChild.style.width = e.clientWidth + "px", e.firstChild.style.height = e.clientHeight + "px")
            }

            function a() {
                return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            }

            function h(t, e) {
                for (var i = a(), r = 0; 3 > r; r++)for (var o = 0; 3 > o; o++) {
                    for (var n = 0, s = 0; 3 > s; s++)n += t[r][s] * e[s][o];
                    i[r][o] = n
                }
                return i
            }

            function l(t, e) {
                e.fillStyle = t.fillStyle, e.lineCap = t.lineCap, e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.shadowBlur = t.shadowBlur, e.shadowColor = t.shadowColor, e.shadowOffsetX = t.shadowOffsetX, e.shadowOffsetY = t.shadowOffsetY, e.strokeStyle = t.strokeStyle, e.globalAlpha = t.globalAlpha, e.font = t.font, e.textAlign = t.textAlign, e.textBaseline = t.textBaseline, e.scaleX_ = t.scaleX_, e.scaleY_ = t.scaleY_, e.lineScale_ = t.lineScale_
            }

            function c(t) {
                var e = t.indexOf("(", 3), i = t.indexOf(")", e + 1), r = t.substring(e + 1, i).split(",");
                return (4 != r.length || "a" != t.charAt(3)) && (r[3] = 1), r
            }

            function d(t) {
                return parseFloat(t) / 100
            }

            function u(t, e, i) {
                return Math.min(i, Math.max(e, t))
            }

            function p(t) {
                var e, i, r, o, n, s;
                if (o = parseFloat(t[0]) / 360 % 360, 0 > o && o++, n = u(d(t[1]), 0, 1), s = u(d(t[2]), 0, 1), 0 == n)e = i = r = s;
                else {
                    var a = .5 > s ? s * (1 + n) : s + n - s * n, h = 2 * s - a;
                    e = f(h, a, o + 1 / 3), i = f(h, a, o), r = f(h, a, o - 1 / 3)
                }
                return "#" + Y[Math.floor(255 * e)] + Y[Math.floor(255 * i)] + Y[Math.floor(255 * r)]
            }

            function f(t, e, i) {
                return 0 > i && i++, i > 1 && i--, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + (e - t) * (2 / 3 - i) * 6 : t
            }

            function g(t) {
                if (t in X)return X[t];
                var e, i = 1;
                if (t = String(t), "#" == t.charAt(0))e = t; else if (/^rgb/.test(t)) {
                    for (var r, o = c(t), e = "#", n = 0; 3 > n; n++)r = -1 != o[n].indexOf("%") ? Math.floor(255 * d(o[n])) : +o[n], e += Y[u(r, 0, 255)];
                    i = +o[3]
                } else if (/^hsl/.test(t)) {
                    var o = c(t);
                    e = p(o), i = o[3]
                } else e = V[t] || t;
                return X[t] = {color: e, alpha: i}
            }

            function m(t) {
                if (U[t])return U[t];
                var e, i = document.createElement("div"), r = i.style;
                try {
                    r.font = t, e = r.fontFamily.split(",")[0]
                } catch (o) {
                }
                return U[t] = {
                    style: r.fontStyle || Z.style,
                    variant: r.fontVariant || Z.variant,
                    weight: r.fontWeight || Z.weight,
                    size: r.fontSize || Z.size,
                    family: e || Z.family
                }
            }

            function _(t, e) {
                var i = {};
                for (var r in t)i[r] = t[r];
                var o = parseFloat(e.currentStyle.fontSize), n = parseFloat(t.size);
                return i.size = "number" == typeof t.size ? t.size : -1 != t.size.indexOf("px") ? n : -1 != t.size.indexOf("em") ? o * n : -1 != t.size.indexOf("%") ? o / 100 * n : -1 != t.size.indexOf("pt") ? n / .75 : o, i
            }

            function y(t) {
                return t.style + " " + t.variant + " " + t.weight + " " + t.size + "px '" + t.family + "'"
            }

            function v(t) {
                return Q[t] || "square"
            }

            function x(t) {
                this.m_ = a(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", this.miterLimit = 1 * F, this.globalAlpha = 1, this.font = "12px 微软雅黑", this.textAlign = "left", this.textBaseline = "alphabetic", this.canvas = t;
                var e = "width:" + t.clientWidth + "px;height:" + t.clientHeight + "px;overflow:hidden;position:absolute", i = t.ownerDocument.createElement("div");
                i.style.cssText = e, t.appendChild(i);
                var r = i.cloneNode(!1);
                r.style.backgroundColor = "#fff", r.style.filter = "alpha(opacity=0)", t.appendChild(r), this.element_ = i, this.scaleX_ = 1, this.scaleY_ = 1, this.lineScale_ = 1
            }

            function b(t, e, i, r) {
                t.currentPath_.push({
                    type: "bezierCurveTo",
                    cp1x: e.x,
                    cp1y: e.y,
                    cp2x: i.x,
                    cp2y: i.y,
                    x: r.x,
                    y: r.y
                }), t.currentX_ = r.x, t.currentY_ = r.y
            }

            function T(t, e) {
                var i = g(t.strokeStyle), r = i.color, o = i.alpha * t.globalAlpha, n = t.lineScale_ * t.lineWidth;
                1 > n && (o *= n), e.push("<g_vml_:stroke", ' opacity="', o, '"', ' joinstyle="', t.lineJoin, '"', ' miterlimit="', t.miterLimit, '"', ' endcap="', v(t.lineCap), '"', ' weight="', n, 'px"', ' color="', r, '" />')
            }

            function S(t, e, i, r) {
                var o = t.fillStyle, n = t.scaleX_, s = t.scaleY_, a = r.x - i.x, h = r.y - i.y;
                if (o instanceof z) {
                    var l = 0, c = {x: 0, y: 0}, d = 0, u = 1;
                    if ("gradient" == o.type_) {
                        var p = o.x0_ / n, f = o.y0_ / s, m = o.x1_ / n, _ = o.y1_ / s, y = C(t, p, f), v = C(t, m, _), x = v.x - y.x, b = v.y - y.y;
                        l = 180 * Math.atan2(x, b) / Math.PI, 0 > l && (l += 360), 1e-6 > l && (l = 0)
                    } else {
                        var y = C(t, o.x0_, o.y0_);
                        c = {x: (y.x - i.x) / a, y: (y.y - i.y) / h}, a /= n * F, h /= s * F;
                        var T = P.max(a, h);
                        d = 2 * o.r0_ / T, u = 2 * o.r1_ / T - d
                    }
                    var S = o.colors_;
                    S.sort(function (t, e) {
                        return t.offset - e.offset
                    });
                    for (var E = S.length, w = S[0].color, L = S[E - 1].color, A = S[0].alpha * t.globalAlpha, M = S[E - 1].alpha * t.globalAlpha, I = [], O = 0; E > O; O++) {
                        var R = S[O];
                        I.push(R.offset * u + d + " " + R.color)
                    }
                    e.push('<g_vml_:fill type="', o.type_, '"', ' method="none" focus="100%"', ' color="', w, '"', ' color2="', L, '"', ' colors="', I.join(","), '"', ' opacity="', M, '"', ' g_o_:opacity2="', A, '"', ' angle="', l, '"', ' focusposition="', c.x, ",", c.y, '" />')
                } else if (o instanceof k) {
                    if (a && h) {
                        var D = -i.x, H = -i.y;
                        e.push("<g_vml_:fill", ' position="', D / a * n * n, ",", H / h * s * s, '"', ' type="tile"', ' src="', o.src_, '" />')
                    }
                } else {
                    var B = g(t.fillStyle), N = B.color, W = B.alpha * t.globalAlpha;
                    e.push('<g_vml_:fill color="', N, '" opacity="', W, '" />')
                }
            }

            function C(t, e, i) {
                var r = t.m_;
                return {
                    x: F * (e * r[0][0] + i * r[1][0] + r[2][0]) - B,
                    y: F * (e * r[0][1] + i * r[1][1] + r[2][1]) - B
                }
            }

            function E(t) {
                return isFinite(t[0][0]) && isFinite(t[0][1]) && isFinite(t[1][0]) && isFinite(t[1][1]) && isFinite(t[2][0]) && isFinite(t[2][1])
            }

            function w(t, e, i) {
                if (E(e) && (t.m_ = e, t.scaleX_ = Math.sqrt(e[0][0] * e[0][0] + e[0][1] * e[0][1]), t.scaleY_ = Math.sqrt(e[1][0] * e[1][0] + e[1][1] * e[1][1]), i)) {
                    var r = e[0][0] * e[1][1] - e[0][1] * e[1][0];
                    t.lineScale_ = H(D(r))
                }
            }

            function z(t) {
                this.type_ = t, this.x0_ = 0, this.y0_ = 0, this.r0_ = 0, this.x1_ = 0, this.y1_ = 0, this.r1_ = 0, this.colors_ = []
            }

            function k(t, e) {
                switch (A(t), e) {
                    case"repeat":
                    case null:
                    case"":
                        this.repetition_ = "repeat";
                        break;
                    case"repeat-x":
                    case"repeat-y":
                    case"no-repeat":
                        this.repetition_ = e;
                        break;
                    default:
                        L("SYNTAX_ERR")
                }
                this.src_ = t.src, this.width_ = t.width, this.height_ = t.height
            }

            function L(t) {
                throw new M(t)
            }

            function A(t) {
                t && 1 == t.nodeType && "IMG" == t.tagName || L("TYPE_MISMATCH_ERR"), "complete" != t.readyState && L("INVALID_STATE_ERR")
            }

            function M(t) {
                this.code = this[t], this.message = t + ": DOM Exception " + this.code
            }

            var P = Math, I = P.round, O = P.sin, R = P.cos, D = P.abs, H = P.sqrt, F = 10, B = F / 2, N = (+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1], Array.prototype.slice);
            o(document);
            var W = {
                init: function (t) {
                    var i = t || document;
                    i.createElement("canvas"), i.attachEvent("onreadystatechange", e(this.init_, this, i))
                }, init_: function (t) {
                    for (var e = t.getElementsByTagName("canvas"), i = 0; i < e.length; i++)this.initElement(e[i])
                }, initElement: function (e) {
                    if (!e.getContext) {
                        e.getContext = t, o(e.ownerDocument), e.innerHTML = "", e.attachEvent("onpropertychange", n), e.attachEvent("onresize", s);
                        var i = e.attributes;
                        i.width && i.width.specified ? e.style.width = i.width.nodeValue + "px" : e.width = e.clientWidth, i.height && i.height.specified ? e.style.height = i.height.nodeValue + "px" : e.height = e.clientHeight
                    }
                    return e
                }
            };
            W.init();
            for (var Y = [], q = 0; 16 > q; q++)for (var G = 0; 16 > G; G++)Y[16 * q + G] = q.toString(16) + G.toString(16);
            var V = {
                aliceblue: "#F0F8FF",
                antiquewhite: "#FAEBD7",
                aquamarine: "#7FFFD4",
                azure: "#F0FFFF",
                beige: "#F5F5DC",
                bisque: "#FFE4C4",
                black: "#000000",
                blanchedalmond: "#FFEBCD",
                blueviolet: "#8A2BE2",
                brown: "#A52A2A",
                burlywood: "#DEB887",
                cadetblue: "#5F9EA0",
                chartreuse: "#7FFF00",
                chocolate: "#D2691E",
                coral: "#FF7F50",
                cornflowerblue: "#6495ED",
                cornsilk: "#FFF8DC",
                crimson: "#DC143C",
                cyan: "#00FFFF",
                darkblue: "#00008B",
                darkcyan: "#008B8B",
                darkgoldenrod: "#B8860B",
                darkgray: "#A9A9A9",
                darkgreen: "#006400",
                darkgrey: "#A9A9A9",
                darkkhaki: "#BDB76B",
                darkmagenta: "#8B008B",
                darkolivegreen: "#556B2F",
                darkorange: "#FF8C00",
                darkorchid: "#9932CC",
                darkred: "#8B0000",
                darksalmon: "#E9967A",
                darkseagreen: "#8FBC8F",
                darkslateblue: "#483D8B",
                darkslategray: "#2F4F4F",
                darkslategrey: "#2F4F4F",
                darkturquoise: "#00CED1",
                darkviolet: "#9400D3",
                deeppink: "#FF1493",
                deepskyblue: "#00BFFF",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1E90FF",
                firebrick: "#B22222",
                floralwhite: "#FFFAF0",
                forestgreen: "#228B22",
                gainsboro: "#DCDCDC",
                ghostwhite: "#F8F8FF",
                gold: "#FFD700",
                goldenrod: "#DAA520",
                grey: "#808080",
                greenyellow: "#ADFF2F",
                honeydew: "#F0FFF0",
                hotpink: "#FF69B4",
                indianred: "#CD5C5C",
                indigo: "#4B0082",
                ivory: "#FFFFF0",
                khaki: "#F0E68C",
                lavender: "#E6E6FA",
                lavenderblush: "#FFF0F5",
                lawngreen: "#7CFC00",
                lemonchiffon: "#FFFACD",
                lightblue: "#ADD8E6",
                lightcoral: "#F08080",
                lightcyan: "#E0FFFF",
                lightgoldenrodyellow: "#FAFAD2",
                lightgreen: "#90EE90",
                lightgrey: "#D3D3D3",
                lightpink: "#FFB6C1",
                lightsalmon: "#FFA07A",
                lightseagreen: "#20B2AA",
                lightskyblue: "#87CEFA",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#B0C4DE",
                lightyellow: "#FFFFE0",
                limegreen: "#32CD32",
                linen: "#FAF0E6",
                magenta: "#FF00FF",
                mediumaquamarine: "#66CDAA",
                mediumblue: "#0000CD",
                mediumorchid: "#BA55D3",
                mediumpurple: "#9370DB",
                mediumseagreen: "#3CB371",
                mediumslateblue: "#7B68EE",
                mediumspringgreen: "#00FA9A",
                mediumturquoise: "#48D1CC",
                mediumvioletred: "#C71585",
                midnightblue: "#191970",
                mintcream: "#F5FFFA",
                mistyrose: "#FFE4E1",
                moccasin: "#FFE4B5",
                navajowhite: "#FFDEAD",
                oldlace: "#FDF5E6",
                olivedrab: "#6B8E23",
                orange: "#FFA500",
                orangered: "#FF4500",
                orchid: "#DA70D6",
                palegoldenrod: "#EEE8AA",
                palegreen: "#98FB98",
                paleturquoise: "#AFEEEE",
                palevioletred: "#DB7093",
                papayawhip: "#FFEFD5",
                peachpuff: "#FFDAB9",
                peru: "#CD853F",
                pink: "#FFC0CB",
                plum: "#DDA0DD",
                powderblue: "#B0E0E6",
                rosybrown: "#BC8F8F",
                royalblue: "#4169E1",
                saddlebrown: "#8B4513",
                salmon: "#FA8072",
                sandybrown: "#F4A460",
                seagreen: "#2E8B57",
                seashell: "#FFF5EE",
                sienna: "#A0522D",
                skyblue: "#87CEEB",
                slateblue: "#6A5ACD",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#FFFAFA",
                springgreen: "#00FF7F",
                steelblue: "#4682B4",
                tan: "#D2B48C",
                thistle: "#D8BFD8",
                tomato: "#FF6347",
                turquoise: "#40E0D0",
                violet: "#EE82EE",
                wheat: "#F5DEB3",
                whitesmoke: "#F5F5F5",
                yellowgreen: "#9ACD32"
            }, X = {}, Z = {
                style: "normal",
                variant: "normal",
                weight: "normal",
                size: 12,
                family: "微软雅黑"
            }, U = {}, Q = {butt: "flat", round: "round"}, j = x.prototype;
            j.clearRect = function () {
                this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null), this.element_.innerHTML = ""
            }, j.beginPath = function () {
                this.currentPath_ = []
            }, j.moveTo = function (t, e) {
                var i = C(this, t, e);
                this.currentPath_.push({type: "moveTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
            }, j.lineTo = function (t, e) {
                var i = C(this, t, e);
                this.currentPath_.push({type: "lineTo", x: i.x, y: i.y}), this.currentX_ = i.x, this.currentY_ = i.y
            }, j.bezierCurveTo = function (t, e, i, r, o, n) {
                var s = C(this, o, n), a = C(this, t, e), h = C(this, i, r);
                b(this, a, h, s)
            }, j.quadraticCurveTo = function (t, e, i, r) {
                var o = C(this, t, e), n = C(this, i, r), s = {
                    x: this.currentX_ + 2 / 3 * (o.x - this.currentX_),
                    y: this.currentY_ + 2 / 3 * (o.y - this.currentY_)
                }, a = {x: s.x + (n.x - this.currentX_) / 3, y: s.y + (n.y - this.currentY_) / 3};
                b(this, s, a, n)
            }, j.arc = function (t, e, i, r, o, n) {
                i *= F;
                var s = n ? "at" : "wa", a = t + R(r) * i - B, h = e + O(r) * i - B, l = t + R(o) * i - B, c = e + O(o) * i - B;
                a != l || n || (a += .125);
                var d = C(this, t, e), u = C(this, a, h), p = C(this, l, c);
                this.currentPath_.push({
                    type: s,
                    x: d.x,
                    y: d.y,
                    radius: i,
                    xStart: u.x,
                    yStart: u.y,
                    xEnd: p.x,
                    yEnd: p.y
                })
            }, j.rect = function (t, e, i, r) {
                this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + r), this.lineTo(t, e + r), this.closePath()
            }, j.strokeRect = function (t, e, i, r) {
                var o = this.currentPath_;
                this.beginPath(), this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + r), this.lineTo(t, e + r), this.closePath(), this.stroke(), this.currentPath_ = o
            }, j.fillRect = function (t, e, i, r) {
                var o = this.currentPath_;
                this.beginPath(), this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + r), this.lineTo(t, e + r), this.closePath(), this.fill(), this.currentPath_ = o
            }, j.createLinearGradient = function (t, e, i, r) {
                var o = new z("gradient");
                return o.x0_ = t, o.y0_ = e, o.x1_ = i, o.y1_ = r, o
            }, j.createRadialGradient = function (t, e, i, r, o, n) {
                var s = new z("gradientradial");
                return s.x0_ = t, s.y0_ = e, s.r0_ = i, s.x1_ = r, s.y1_ = o, s.r1_ = n, s
            }, j.drawImage = function (t) {
                var e, i, r, o, n, s, a, h, l = t.runtimeStyle.width, c = t.runtimeStyle.height;
                t.runtimeStyle.width = "auto", t.runtimeStyle.height = "auto";
                var d = t.width, u = t.height;
                if (t.runtimeStyle.width = l, t.runtimeStyle.height = c, 3 == arguments.length)e = arguments[1], i = arguments[2], n = s = 0, a = r = d, h = o = u; else if (5 == arguments.length)e = arguments[1], i = arguments[2], r = arguments[3], o = arguments[4], n = s = 0, a = d, h = u; else {
                    if (9 != arguments.length)throw Error("Invalid number of arguments");
                    n = arguments[1], s = arguments[2], a = arguments[3], h = arguments[4], e = arguments[5], i = arguments[6], r = arguments[7], o = arguments[8]
                }
                var p = C(this, e, i), f = [], g = 10, m = 10, _ = v = 1;
                if (f.push(" <g_vml_:group", ' coordsize="', F * g, ",", F * m, '"', ' coordorigin="0,0"', ' style="width:', g, "px;height:", m, "px;position:absolute;"), 1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
                    var y = [], _ = this.scaleX_, v = this.scaleY_;
                    y.push("M11=", this.m_[0][0] / _, ",", "M12=", this.m_[1][0] / v, ",", "M21=", this.m_[0][1] / _, ",", "M22=", this.m_[1][1] / v, ",", "Dx=", I(p.x / F), ",", "Dy=", I(p.y / F), "");
                    var x = p, b = C(this, e + r, i), T = C(this, e, i + o), S = C(this, e + r, i + o);
                    x.x = P.max(x.x, b.x, T.x, S.x), x.y = P.max(x.y, b.y, T.y, S.y), f.push("padding:0 ", I(x.x / F), "px ", I(x.y / F), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", y.join(""), ", SizingMethod='clip');")
                } else f.push("top:", I(p.y / F), "px;left:", I(p.x / F), "px;");
                f.push(' ">'), (n || s) && f.push('<div style="overflow: hidden; width:', Math.ceil((r + n * r / a) * _), "px;", " height:", Math.ceil((o + s * o / h) * v), "px;", " filter:progid:DxImageTransform.Microsoft.Matrix(Dx=", -n * r / a * _, ",Dy=", -s * o / h * v, ');">'), f.push('<div style="width:', Math.round(_ * d * r / a), "px;", " height:", Math.round(v * u * o / h), "px;", " filter:"), this.globalAlpha < 1 && f.push(" progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * this.globalAlpha + ")"), f.push(" progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", t.src, ',sizingMethod=scale)">'), (n || s) && f.push("</div>"), f.push("</div></div>"), this.element_.insertAdjacentHTML("BeforeEnd", f.join(""))
            }, j.stroke = function (t) {
                var e = [], i = 10, r = 10;
                e.push("<g_vml_:shape", ' filled="', !!t, '"', ' style="position:absolute;width:', i, "px;height:", r, 'px;"', ' coordorigin="0,0"', ' coordsize="', F * i, ",", F * r, '"', ' stroked="', !t, '"', ' path="');
                for (var o = {x: null, y: null}, n = {x: null, y: null}, s = 0; s < this.currentPath_.length; s++) {
                    var a, h = this.currentPath_[s];
                    switch (h.type) {
                        case"moveTo":
                            a = h, e.push(" m ", I(h.x), ",", I(h.y));
                            break;
                        case"lineTo":
                            e.push(" l ", I(h.x), ",", I(h.y));
                            break;
                        case"close":
                            e.push(" x "), h = null;
                            break;
                        case"bezierCurveTo":
                            e.push(" c ", I(h.cp1x), ",", I(h.cp1y), ",", I(h.cp2x), ",", I(h.cp2y), ",", I(h.x), ",", I(h.y));
                            break;
                        case"at":
                        case"wa":
                            e.push(" ", h.type, " ", I(h.x - this.scaleX_ * h.radius), ",", I(h.y - this.scaleY_ * h.radius), " ", I(h.x + this.scaleX_ * h.radius), ",", I(h.y + this.scaleY_ * h.radius), " ", I(h.xStart), ",", I(h.yStart), " ", I(h.xEnd), ",", I(h.yEnd))
                    }
                    h && ((null == o.x || h.x < o.x) && (o.x = h.x), (null == n.x || h.x > n.x) && (n.x = h.x), (null == o.y || h.y < o.y) && (o.y = h.y), (null == n.y || h.y > n.y) && (n.y = h.y))
                }
                e.push(' ">'), t ? S(this, e, o, n) : T(this, e), e.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", e.join(""))
            }, j.fill = function () {
                this.stroke(!0)
            }, j.closePath = function () {
                this.currentPath_.push({type: "close"})
            }, j.save = function () {
                var t = {};
                l(this, t), this.aStack_.push(t), this.mStack_.push(this.m_), this.m_ = h(a(), this.m_)
            }, j.restore = function () {
                this.aStack_.length && (l(this.aStack_.pop(), this), this.m_ = this.mStack_.pop())
            }, j.translate = function (t, e) {
                var i = [[1, 0, 0], [0, 1, 0], [t, e, 1]];
                w(this, h(i, this.m_), !1)
            }, j.rotate = function (t) {
                var e = R(t), i = O(t), r = [[e, i, 0], [-i, e, 0], [0, 0, 1]];
                w(this, h(r, this.m_), !1)
            }, j.scale = function (t, e) {
                var i = [[t, 0, 0], [0, e, 0], [0, 0, 1]];
                w(this, h(i, this.m_), !0)
            }, j.transform = function (t, e, i, r, o, n) {
                var s = [[t, e, 0], [i, r, 0], [o, n, 1]];
                w(this, h(s, this.m_), !0)
            }, j.setTransform = function (t, e, i, r, o, n) {
                var s = [[t, e, 0], [i, r, 0], [o, n, 1]];
                w(this, s, !0)
            }, j.drawText_ = function (t, e, r, o, n) {
                var s = this.m_, a = 1e3, h = 0, l = a, c = {
                    x: 0,
                    y: 0
                }, d = [], u = _(m(this.font), this.element_), p = y(u), f = this.element_.currentStyle, g = this.textAlign.toLowerCase();
                switch (g) {
                    case"left":
                    case"center":
                    case"right":
                        break;
                    case"end":
                        g = "ltr" == f.direction ? "right" : "left";
                        break;
                    case"start":
                        g = "rtl" == f.direction ? "right" : "left";
                        break;
                    default:
                        g = "left"
                }
                switch (this.textBaseline) {
                    case"hanging":
                    case"top":
                        c.y = u.size / 1.75;
                        break;
                    case"middle":
                        break;
                    default:
                    case null:
                    case"alphabetic":
                    case"ideographic":
                    case"bottom":
                        c.y = -u.size / 2.25
                }
                switch (g) {
                    case"right":
                        h = a, l = .05;
                        break;
                    case"center":
                        h = l = a / 2
                }
                var v = C(this, e + c.x, r + c.y);
                d.push('<g_vml_:line from="', -h, ' 0" to="', l, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !n, '" stroked="', !!n, '" style="position:absolute;width:1px;height:1px;">'), n ? T(this, d) : S(this, d, {
                    x: -h,
                    y: 0
                }, {x: l, y: u.size});
                var x = s[0][0].toFixed(3) + "," + s[1][0].toFixed(3) + "," + s[0][1].toFixed(3) + "," + s[1][1].toFixed(3) + ",0,0", b = I(v.x / F) + "," + I(v.y / F);
                d.push('<g_vml_:skew on="t" matrix="', x, '" ', ' offset="', b, '" origin="', h, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', i(t), '" style="v-text-align:', g, ";font:", i(p), '" /></g_vml_:line>'), this.element_.insertAdjacentHTML("beforeEnd", d.join(""))
            }, j.fillText = function (t, e, i, r) {
                this.drawText_(t, e, i, r, !1)
            }, j.strokeText = function (t, e, i, r) {
                this.drawText_(t, e, i, r, !0)
            }, j.measureText = function (t) {
                if (!this.textMeasureEl_) {
                    var e = '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                    this.element_.insertAdjacentHTML("beforeEnd", e), this.textMeasureEl_ = this.element_.lastChild
                }
                var i = this.element_.ownerDocument;
                this.textMeasureEl_.innerHTML = "";
                try {
                    this.textMeasureEl_.style.font = this.font
                } catch (r) {
                }
                return this.textMeasureEl_.appendChild(i.createTextNode(t)), {width: this.textMeasureEl_.offsetWidth}
            }, j.clip = function () {
            }, j.arcTo = function () {
            }, j.createPattern = function (t, e) {
                return new k(t, e)
            }, z.prototype.addColorStop = function (t, e) {
                e = g(e), this.colors_.push({offset: t, color: e.color, alpha: e.alpha})
            };
            var K = M.prototype = new Error;
            K.INDEX_SIZE_ERR = 1, K.DOMSTRING_SIZE_ERR = 2, K.HIERARCHY_REQUEST_ERR = 3, K.WRONG_DOCUMENT_ERR = 4, K.INVALID_CHARACTER_ERR = 5, K.NO_DATA_ALLOWED_ERR = 6, K.NO_MODIFICATION_ALLOWED_ERR = 7, K.NOT_FOUND_ERR = 8, K.NOT_SUPPORTED_ERR = 9, K.INUSE_ATTRIBUTE_ERR = 10, K.INVALID_STATE_ERR = 11, K.SYNTAX_ERR = 12, K.INVALID_MODIFICATION_ERR = 13, K.NAMESPACE_ERR = 14, K.INVALID_ACCESS_ERR = 15, K.VALIDATION_ERR = 16, K.TYPE_MISMATCH_ERR = 17, G_vmlCanvasManager = W, CanvasRenderingContext2D = x, CanvasGradient = z, CanvasPattern = k, DOMException = M
        }(), G_vmlCanvasManager
    }), i("zrender/tool/matrix", [], function () {
        var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
            create: function () {
                var i = new t(6);
                return e.identity(i), i
            }, identity: function (t) {
                return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
            }, copy: function (t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
            }, mul: function (t, e, i) {
                return t[0] = e[0] * i[0] + e[2] * i[1], t[1] = e[1] * i[0] + e[3] * i[1], t[2] = e[0] * i[2] + e[2] * i[3], t[3] = e[1] * i[2] + e[3] * i[3], t[4] = e[0] * i[4] + e[2] * i[5] + e[4], t[5] = e[1] * i[4] + e[3] * i[5] + e[5], t
            }, translate: function (t, e, i) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], t
            }, rotate: function (t, e, i) {
                var r = e[0], o = e[2], n = e[4], s = e[1], a = e[3], h = e[5], l = Math.sin(i), c = Math.cos(i);
                return t[0] = r * c + s * l, t[1] = -r * l + s * c, t[2] = o * c + a * l, t[3] = -o * l + c * a, t[4] = c * n + l * h, t[5] = c * h - l * n, t
            }, scale: function (t, e, i) {
                var r = i[0], o = i[1];
                return t[0] = e[0] * r, t[1] = e[1] * o, t[2] = e[2] * r, t[3] = e[3] * o, t[4] = e[4] * r, t[5] = e[5] * o, t
            }, invert: function (t, e) {
                var i = e[0], r = e[2], o = e[4], n = e[1], s = e[3], a = e[5], h = i * s - n * r;
                return h ? (h = 1 / h, t[0] = s * h, t[1] = -n * h, t[2] = -r * h, t[3] = i * h, t[4] = (r * a - s * o) * h, t[5] = (n * o - i * a) * h, t) : null
            }
        };
        return e
    }), i("zrender/Storage", ["require", "./tool/util", "./Group"], function (t) {
        "use strict";
        function e(t, e) {
            return t.zlevel == e.zlevel ? t.z == e.z ? t.__renderidx - e.__renderidx : t.z - e.z : t.zlevel - e.zlevel
        }

        var i = t("./tool/util"), r = t("./Group"), o = {hover: !1, normal: "down", update: !1}, n = function () {
            this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], this._shapeListOffset = 0
        };
        return n.prototype.iterShape = function (t, e) {
            if (e || (e = o), e.hover)for (var i = 0, r = this._hoverElements.length; r > i; i++) {
                var n = this._hoverElements[i];
                if (n.updateTransform(), t(n))return this
            }
            switch (e.update && this.updateShapeList(), e.normal) {
                case"down":
                    for (var r = this._shapeList.length; r--;)if (t(this._shapeList[r]))return this;
                    break;
                default:
                    for (var i = 0, r = this._shapeList.length; r > i; i++)if (t(this._shapeList[i]))return this
            }
            return this
        }, n.prototype.getHoverShapes = function (t) {
            for (var i = [], r = 0, o = this._hoverElements.length; o > r; r++) {
                i.push(this._hoverElements[r]);
                var n = this._hoverElements[r].hoverConnect;
                if (n) {
                    var s;
                    n = n instanceof Array ? n : [n];
                    for (var a = 0, h = n.length; h > a; a++)s = n[a].id ? n[a] : this.get(n[a]), s && i.push(s)
                }
            }
            if (i.sort(e), t)for (var r = 0, o = i.length; o > r; r++)i[r].updateTransform();
            return i
        }, n.prototype.getShapeList = function (t) {
            return t && this.updateShapeList(), this._shapeList
        }, n.prototype.updateShapeList = function () {
            this._shapeListOffset = 0;
            for (var t = 0, i = this._roots.length; i > t; t++) {
                var r = this._roots[t];
                this._updateAndAddShape(r)
            }
            this._shapeList.length = this._shapeListOffset;
            for (var t = 0, i = this._shapeList.length; i > t; t++)this._shapeList[t].__renderidx = t;
            this._shapeList.sort(e)
        }, n.prototype._updateAndAddShape = function (t, e) {
            if (!t.ignore)if (t.updateTransform(), t.clipShape && (t.clipShape.parent = t, t.clipShape.updateTransform(), e ? (e = e.slice(), e.push(t.clipShape)) : e = [t.clipShape]), "group" == t.type) {
                for (var i = 0; i < t._children.length; i++) {
                    var r = t._children[i];
                    r.__dirty = t.__dirty || r.__dirty, this._updateAndAddShape(r, e)
                }
                t.__dirty = !1
            } else t.__clipShapes = e, this._shapeList[this._shapeListOffset++] = t
        }, n.prototype.mod = function (t, e) {
            if ("string" == typeof t && (t = this._elements[t]), t && (t.modSelf(), e))if (e.parent || e._storage || e.__clipShapes) {
                var r = {};
                for (var o in e)"parent" !== o && "_storage" !== o && "__clipShapes" !== o && e.hasOwnProperty(o) && (r[o] = e[o]);
                i.merge(t, r, !0)
            } else i.merge(t, e, !0);
            return this
        }, n.prototype.drift = function (t, e, i) {
            var r = this._elements[t];
            return r && (r.needTransform = !0, "horizontal" === r.draggable ? i = 0 : "vertical" === r.draggable && (e = 0), (!r.ondrift || r.ondrift && !r.ondrift(e, i)) && r.drift(e, i)), this
        }, n.prototype.addHover = function (t) {
            return t.updateNeedTransform(), this._hoverElements.push(t), this
        }, n.prototype.delHover = function () {
            return this._hoverElements = [], this
        }, n.prototype.hasHoverShape = function () {
            return this._hoverElements.length > 0
        }, n.prototype.addRoot = function (t) {
            this._elements[t.id] || (t instanceof r && t.addChildrenToStorage(this), this.addToMap(t), this._roots.push(t))
        }, n.prototype.delRoot = function (t) {
            if ("undefined" == typeof t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var o = this._roots[e];
                    o instanceof r && o.delChildrenFromStorage(this)
                }
                return this._elements = {}, this._hoverElements = [], this._roots = [], this._shapeList = [], void(this._shapeListOffset = 0)
            }
            if (t instanceof Array)for (var e = 0, n = t.length; n > e; e++)this.delRoot(t[e]); else {
                var s;
                s = "string" == typeof t ? this._elements[t] : t;
                var a = i.indexOf(this._roots, s);
                a >= 0 && (this.delFromMap(s.id), this._roots.splice(a, 1), s instanceof r && s.delChildrenFromStorage(this))
            }
        }, n.prototype.addToMap = function (t) {
            return t instanceof r && (t._storage = this), t.modSelf(), this._elements[t.id] = t, this
        }, n.prototype.get = function (t) {
            return this._elements[t]
        }, n.prototype.delFromMap = function (t) {
            var e = this._elements[t];
            return e && (delete this._elements[t], e instanceof r && (e._storage = null)), this
        }, n.prototype.dispose = function () {
            this._elements = this._renderList = this._roots = this._hoverElements = null
        }, n
    }), i("zrender/Painter", ["require", "./config", "./tool/util", "./tool/log", "./loadingEffect/Base", "./Layer", "./shape/Image"], function (t) {
        "use strict";
        function e() {
            return !1
        }

        function i() {
        }

        function r(t) {
            return t ? t.isBuildin ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1
        }

        var o = t("./config"), n = t("./tool/util"), s = t("./tool/log"), a = t("./loadingEffect/Base"), h = t("./Layer"), l = function (t, i) {
            this.root = t, t.style["-webkit-tap-highlight-color"] = "transparent", t.style["-webkit-user-select"] = "none", t.style["user-select"] = "none", t.style["-webkit-touch-callout"] = "none", this.storage = i, t.innerHTML = "", this._width = this._getWidth(), this._height = this._getHeight();
            var r = document.createElement("div");
            this._domRoot = r, r.style.position = "relative", r.style.overflow = "hidden", r.style.width = this._width + "px", r.style.height = this._height + "px", t.appendChild(r), this._layers = {}, this._zlevelList = [], this._layerConfig = {}, this._loadingEffect = new a({}), this.shapeToImage = this._createShapeToImageProcessor(), this._bgDom = document.createElement("div"), this._bgDom.style.cssText = ["position:absolute;left:0px;top:0px;width:", this._width, "px;height:", this._height + "px;", "-webkit-user-select:none;user-select;none;", "-webkit-touch-callout:none;"].join(""), this._bgDom.setAttribute("data-zr-dom-id", "bg"), this._bgDom.className = o.elementClassName, r.appendChild(this._bgDom), this._bgDom.onselectstart = e;
            var n = new h("_zrender_hover_", this);
            this._layers.hover = n, r.appendChild(n.dom), n.initContext(), n.dom.onselectstart = e, n.dom.style["-webkit-user-select"] = "none", n.dom.style["user-select"] = "none", n.dom.style["-webkit-touch-callout"] = "none", this.refreshNextFrame = null
        };
        return l.prototype.render = function (t) {
            return this.isLoading() && this.hideLoading(), this.refresh(t, !0), this
        }, l.prototype.refresh = function (t, e) {
            var i = this.storage.getShapeList(!0);
            this._paintList(i, e);
            for (var r = 0; r < this._zlevelList.length; r++) {
                var o = this._zlevelList[r], n = this._layers[o];
                !n.isBuildin && n.refresh && n.refresh()
            }
            return "function" == typeof t && t(), this
        }, l.prototype._preProcessLayer = function (t) {
            t.unusedCount++, t.updateTransform()
        }, l.prototype._postProcessLayer = function (t) {
            t.dirty = !1, 1 == t.unusedCount && t.clear()
        }, l.prototype._paintList = function (t, e) {
            "undefined" == typeof e && (e = !1), this._updateLayerStatus(t);
            var i, r, n;
            this.eachBuildinLayer(this._preProcessLayer);
            for (var a = 0, h = t.length; h > a; a++) {
                var l = t[a];
                if (r !== l.zlevel && (i && (i.needTransform && n.restore(), n.flush && n.flush()), r = l.zlevel, i = this.getLayer(r), i.isBuildin || s("ZLevel " + r + " has been used by unkown layer " + i.id), n = i.ctx, i.unusedCount = 0, (i.dirty || e) && i.clear(), i.needTransform && (n.save(), i.setTransform(n))), (i.dirty || e) && !l.invisible && (!l.onbrush || l.onbrush && !l.onbrush(n, !1)))if (o.catchBrushException)try {
                    l.brush(n, !1, this.refreshNextFrame)
                } catch (c) {
                    s(c, "brush error of " + l.type, l)
                } else l.brush(n, !1, this.refreshNextFrame);
                l.__dirty = !1
            }
            i && (i.needTransform && n.restore(), n.flush && n.flush()), this.eachBuildinLayer(this._postProcessLayer)
        }, l.prototype.getLayer = function (t) {
            var e = this._layers[t];
            return e || (e = new h(t, this), e.isBuildin = !0, this._layerConfig[t] && n.merge(e, this._layerConfig[t], !0), e.updateTransform(), this.insertLayer(t, e), e.initContext()), e
        }, l.prototype.insertLayer = function (t, e) {
            if (this._layers[t])return void s("ZLevel " + t + " has been used already");
            if (!r(e))return void s("Layer of zlevel " + t + " is not valid");
            var i = this._zlevelList.length, o = null, n = -1;
            if (i > 0 && t > this._zlevelList[0]) {
                for (n = 0; i - 1 > n && !(this._zlevelList[n] < t && this._zlevelList[n + 1] > t); n++);
                o = this._layers[this._zlevelList[n]]
            }
            this._zlevelList.splice(n + 1, 0, t);
            var a = o ? o.dom : this._bgDom;
            a.nextSibling ? a.parentNode.insertBefore(e.dom, a.nextSibling) : a.parentNode.appendChild(e.dom), this._layers[t] = e
        }, l.prototype.eachLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i];
                t.call(e, this._layers[r], r)
            }
        }, l.prototype.eachBuildinLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i], o = this._layers[r];
                o.isBuildin && t.call(e, o, r)
            }
        }, l.prototype.eachOtherLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i], o = this._layers[r];
                o.isBuildin || t.call(e, o, r)
            }
        }, l.prototype.getLayers = function () {
            return this._layers
        }, l.prototype._updateLayerStatus = function (t) {
            var e = this._layers, i = {};
            this.eachBuildinLayer(function (t, e) {
                i[e] = t.elCount, t.elCount = 0
            });
            for (var r = 0, o = t.length; o > r; r++) {
                var n = t[r], s = n.zlevel, a = e[s];
                if (a) {
                    if (a.elCount++, a.dirty)continue;
                    a.dirty = n.__dirty
                }
            }
            this.eachBuildinLayer(function (t, e) {
                i[e] !== t.elCount && (t.dirty = !0)
            })
        }, l.prototype.refreshShapes = function (t, e) {
            for (var i = 0, r = t.length; r > i; i++) {
                var o = t[i];
                o.modSelf()
            }
            return this.refresh(e), this
        }, l.prototype.setLoadingEffect = function (t) {
            return this._loadingEffect = t, this
        }, l.prototype.clear = function () {
            return this.eachBuildinLayer(this._clearLayer), this
        }, l.prototype._clearLayer = function (t) {
            t.clear()
        }, l.prototype.modLayer = function (t, e) {
            if (e) {
                this._layerConfig[t] ? n.merge(this._layerConfig[t], e, !0) : this._layerConfig[t] = e;
                var i = this._layers[t];
                i && n.merge(i, this._layerConfig[t], !0)
            }
        }, l.prototype.delLayer = function (t) {
            var e = this._layers[t];
            e && (this.modLayer(t, {
                position: e.position,
                rotation: e.rotation,
                scale: e.scale
            }), e.dom.parentNode.removeChild(e.dom), delete this._layers[t], this._zlevelList.splice(n.indexOf(this._zlevelList, t), 1))
        }, l.prototype.refreshHover = function () {
            this.clearHover();
            for (var t = this.storage.getHoverShapes(!0), e = 0, i = t.length; i > e; e++)this._brushHover(t[e]);
            var r = this._layers.hover.ctx;
            return r.flush && r.flush(), this.storage.delHover(), this
        }, l.prototype.clearHover = function () {
            var t = this._layers.hover;
            return t && t.clear(), this
        }, l.prototype.showLoading = function (t) {
            return this._loadingEffect && this._loadingEffect.stop(), t && this.setLoadingEffect(t), this._loadingEffect.start(this), this.loading = !0, this
        }, l.prototype.hideLoading = function () {
            return this._loadingEffect.stop(), this.clearHover(), this.loading = !1, this
        }, l.prototype.isLoading = function () {
            return this.loading
        }, l.prototype.resize = function () {
            var t = this._domRoot;
            t.style.display = "none";
            var e = this._getWidth(), i = this._getHeight();
            if (t.style.display = "", this._width != e || i != this._height) {
                this._width = e, this._height = i, t.style.width = e + "px", t.style.height = i + "px";
                for (var r in this._layers)this._layers[r].resize(e, i);
                this.refresh(null, !0)
            }
            return this
        }, l.prototype.clearLayer = function (t) {
            var e = this._layers[t];
            e && e.clear()
        }, l.prototype.dispose = function () {
            this.isLoading() && this.hideLoading(), this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
        }, l.prototype.getDomHover = function () {
            return this._layers.hover.dom
        }, l.prototype.toDataURL = function (t, e, i) {
            if (window.G_vmlCanvasManager)return null;
            var r = new h("image", this);
            this._bgDom.appendChild(r.dom), r.initContext();
            var n = r.ctx;
            r.clearColor = e || "#fff", r.clear();
            var a = this;
            this.storage.iterShape(function (t) {
                if (!t.invisible && (!t.onbrush || t.onbrush && !t.onbrush(n, !1)))if (o.catchBrushException)try {
                    t.brush(n, !1, a.refreshNextFrame)
                } catch (e) {
                    s(e, "brush error of " + t.type, t)
                } else t.brush(n, !1, a.refreshNextFrame)
            }, {normal: "up", update: !0});
            var l = r.dom.toDataURL(t, i);
            return n = null, this._bgDom.removeChild(r.dom), l
        }, l.prototype.getWidth = function () {
            return this._width
        }, l.prototype.getHeight = function () {
            return this._height
        }, l.prototype._getWidth = function () {
            var t = this.root, e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return ((t.clientWidth || parseInt(e.width, 10)) - parseInt(e.paddingLeft, 10) - parseInt(e.paddingRight, 10)).toFixed(0) - 0
        }, l.prototype._getHeight = function () {
            var t = this.root, e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return ((t.clientHeight || parseInt(e.height, 10)) - parseInt(e.paddingTop, 10) - parseInt(e.paddingBottom, 10)).toFixed(0) - 0
        }, l.prototype._brushHover = function (t) {
            var e = this._layers.hover.ctx;
            if (!t.onbrush || t.onbrush && !t.onbrush(e, !0)) {
                var i = this.getLayer(t.zlevel);
                if (i.needTransform && (e.save(), i.setTransform(e)), o.catchBrushException)try {
                    t.brush(e, !0, this.refreshNextFrame)
                } catch (r) {
                    s(r, "hoverBrush error of " + t.type, t)
                } else t.brush(e, !0, this.refreshNextFrame);
                i.needTransform && e.restore()
            }
        }, l.prototype._shapeToImage = function (e, i, r, o, n) {
            var s = document.createElement("canvas"), a = s.getContext("2d");
            s.style.width = r + "px", s.style.height = o + "px", s.setAttribute("width", r * n), s.setAttribute("height", o * n), a.clearRect(0, 0, r * n, o * n);
            var h = {position: i.position, rotation: i.rotation, scale: i.scale};
            i.position = [0, 0, 0], i.rotation = 0, i.scale = [1, 1], i && i.brush(a, !1);
            var l = t("./shape/Image"), c = new l({id: e, style: {x: 0, y: 0, image: s}});
            return null != h.position && (c.position = i.position = h.position), null != h.rotation && (c.rotation = i.rotation = h.rotation), null != h.scale && (c.scale = i.scale = h.scale), c
        }, l.prototype._createShapeToImageProcessor = function () {
            if (window.G_vmlCanvasManager)return i;
            var t = this;
            return function (e, i, r, n) {
                return t._shapeToImage(e, i, r, n, o.devicePixelRatio)
            }
        }, l
    }), i("zrender/tool/vector", [], function () {
        var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
            create: function (e, i) {
                var r = new t(2);
                return r[0] = e || 0, r[1] = i || 0, r
            }, copy: function (t, e) {
                return t[0] = e[0], t[1] = e[1], t
            }, clone: function (e) {
                var i = new t(2);
                return i[0] = e[0], i[1] = e[1], i
            }, set: function (t, e, i) {
                return t[0] = e, t[1] = i, t
            }, add: function (t, e, i) {
                return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t
            }, scaleAndAdd: function (t, e, i, r) {
                return t[0] = e[0] + i[0] * r, t[1] = e[1] + i[1] * r, t
            }, sub: function (t, e, i) {
                return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t
            }, len: function (t) {
                return Math.sqrt(this.lenSquare(t))
            }, lenSquare: function (t) {
                return t[0] * t[0] + t[1] * t[1]
            }, mul: function (t, e, i) {
                return t[0] = e[0] * i[0], t[1] = e[1] * i[1], t
            }, div: function (t, e, i) {
                return t[0] = e[0] / i[0], t[1] = e[1] / i[1], t
            }, dot: function (t, e) {
                return t[0] * e[0] + t[1] * e[1]
            }, scale: function (t, e, i) {
                return t[0] = e[0] * i, t[1] = e[1] * i, t
            }, normalize: function (t, i) {
                var r = e.len(i);
                return 0 === r ? (t[0] = 0, t[1] = 0) : (t[0] = i[0] / r, t[1] = i[1] / r), t
            }, distance: function (t, e) {
                return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
            }, distanceSquare: function (t, e) {
                return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
            }, negate: function (t, e) {
                return t[0] = -e[0], t[1] = -e[1], t
            }, lerp: function (t, e, i, r) {
                return t[0] = e[0] + r * (i[0] - e[0]), t[1] = e[1] + r * (i[1] - e[1]), t
            }, applyTransform: function (t, e, i) {
                var r = e[0], o = e[1];
                return t[0] = i[0] * r + i[2] * o + i[4], t[1] = i[1] * r + i[3] * o + i[5], t
            }, min: function (t, e, i) {
                return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t
            }, max: function (t, e, i) {
                return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t
            }
        };
        return e.length = e.len, e.lengthSquare = e.lenSquare, e.dist = e.distance, e.distSquare = e.distanceSquare, e
    }), i("zrender/Handler", ["require", "./config", "./tool/env", "./tool/event", "./tool/util", "./tool/vector", "./tool/matrix", "./mixin/Eventful"], function (t) {
        "use strict";
        function e(t, e) {
            return function (i, r) {
                return t.call(e, i, r)
            }
        }

        function i(t, e) {
            return function (i, r, o) {
                return t.call(e, i, r, o)
            }
        }

        function r(t) {
            for (var i = p.length; i--;) {
                var r = p[i];
                t["_" + r + "Handler"] = e(g[r], t)
            }
        }

        function o(t, e, i) {
            if (this._draggingTarget && this._draggingTarget.id == t.id || t.isSilent())return !1;
            var r = this._event;
            if (t.isCover(e, i)) {
                t.hoverable && this.storage.addHover(t);
                for (var o = t.parent; o;) {
                    if (o.clipShape && !o.clipShape.isCover(this._mouseX, this._mouseY))return !1;
                    o = o.parent
                }
                return this._lastHover != t && (this._processOutShape(r), this._processDragLeave(r), this._lastHover = t, this._processDragEnter(r)), this._processOverShape(r), this._processDragOver(r), this._hasfound = 1, !0
            }
            return !1
        }

        var n = t("./config"), s = t("./tool/env"), a = t("./tool/event"), h = t("./tool/util"), l = t("./tool/vector"), c = t("./tool/matrix"), d = n.EVENT, u = t("./mixin/Eventful"), p = ["resize", "click", "dblclick", "mousewheel", "mousemove", "mouseout", "mouseup", "mousedown", "touchstart", "touchend", "touchmove"], f = function (t) {
            if (window.G_vmlCanvasManager)return !0;
            t = t || window.event;
            var e = t.toElement || t.relatedTarget || t.srcElement || t.target;
            return e && e.className.match(n.elementClassName)
        }, g = {
            resize: function (t) {
                t = t || window.event, this._lastHover = null, this._isMouseDown = 0, this.dispatch(d.RESIZE, t)
            }, click: function (t, e) {
                if (f(t) || e) {
                    t = this._zrenderEventFixed(t);
                    var i = this._lastHover;
                    (i && i.clickable || !i) && this._clickThreshold < 5 && this._dispatchAgency(i, d.CLICK, t), this._mousemoveHandler(t)
                }
            }, dblclick: function (t, e) {
                if (f(t) || e) {
                    t = t || window.event, t = this._zrenderEventFixed(t);
                    var i = this._lastHover;
                    (i && i.clickable || !i) && this._clickThreshold < 5 && this._dispatchAgency(i, d.DBLCLICK, t), this._mousemoveHandler(t)
                }
            }, mousewheel: function (t, e) {
                if (f(t) || e) {
                    t = this._zrenderEventFixed(t);
                    var i = t.wheelDelta || -t.detail, r = i > 0 ? 1.1 : 1 / 1.1, o = !1, n = this._mouseX, s = this._mouseY;
                    this.painter.eachBuildinLayer(function (e) {
                        var i = e.position;
                        if (e.zoomable) {
                            e.__zoom = e.__zoom || 1;
                            var h = e.__zoom;
                            h *= r, h = Math.max(Math.min(e.maxZoom, h), e.minZoom), r = h / e.__zoom, e.__zoom = h, i[0] -= (n - i[0]) * (r - 1), i[1] -= (s - i[1]) * (r - 1), e.scale[0] *= r, e.scale[1] *= r, e.dirty = !0, o = !0, a.stop(t)
                        }
                    }), o && this.painter.refresh(), this._dispatchAgency(this._lastHover, d.MOUSEWHEEL, t), this._mousemoveHandler(t)
                }
            }, mousemove: function (t, e) {
                if ((f(t) || e) && !this.painter.isLoading()) {
                    t = this._zrenderEventFixed(t), this._lastX = this._mouseX, this._lastY = this._mouseY, this._mouseX = a.getX(t), this._mouseY = a.getY(t);
                    var i = this._mouseX - this._lastX, r = this._mouseY - this._lastY;
                    this._processDragStart(t), this._hasfound = 0, this._event = t, this._iterateAndFindHover(), this._hasfound || ((!this._draggingTarget || this._lastHover && this._lastHover != this._draggingTarget) && (this._processOutShape(t), this._processDragLeave(t)), this._lastHover = null, this.storage.delHover(), this.painter.clearHover());
                    var o = "default";
                    if (this._draggingTarget)this.storage.drift(this._draggingTarget.id, i, r), this._draggingTarget.modSelf(), this.storage.addHover(this._draggingTarget), this._clickThreshold++; else if (this._isMouseDown) {
                        var n = !1;
                        this.painter.eachBuildinLayer(function (t) {
                            t.panable && (o = "move", t.position[0] += i, t.position[1] += r, n = !0, t.dirty = !0)
                        }), n && this.painter.refresh()
                    }
                    this._draggingTarget || this._hasfound && this._lastHover.draggable ? o = "move" : this._hasfound && this._lastHover.clickable && (o = "pointer"), this.root.style.cursor = o, this._dispatchAgency(this._lastHover, d.MOUSEMOVE, t), (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) && this.painter.refreshHover()
                }
            }, mouseout: function (t, e) {
                if (f(t) || e) {
                    t = this._zrenderEventFixed(t);
                    var i = t.toElement || t.relatedTarget;
                    if (i != this.root)for (; i && 9 != i.nodeType;) {
                        if (i == this.root)return void this._mousemoveHandler(t);
                        i = i.parentNode
                    }
                    t.zrenderX = this._lastX, t.zrenderY = this._lastY, this.root.style.cursor = "default", this._isMouseDown = 0, this._processOutShape(t), this._processDrop(t), this._processDragEnd(t), this.painter.isLoading() || this.painter.refreshHover(), this.dispatch(d.GLOBALOUT, t)
                }
            }, mousedown: function (t, e) {
                if (f(t) || e) {
                    if (this._clickThreshold = 0, 2 == this._lastDownButton)return this._lastDownButton = t.button, void(this._mouseDownTarget = null);
                    this._lastMouseDownMoment = new Date, t = this._zrenderEventFixed(t), this._isMouseDown = 1, this._mouseDownTarget = this._lastHover, this._dispatchAgency(this._lastHover, d.MOUSEDOWN, t), this._lastDownButton = t.button
                }
            }, mouseup: function (t, e) {
                (f(t) || e) && (t = this._zrenderEventFixed(t), this.root.style.cursor = "default", this._isMouseDown = 0, this._mouseDownTarget = null, this._dispatchAgency(this._lastHover, d.MOUSEUP, t), this._processDrop(t), this._processDragEnd(t))
            }, touchstart: function (t, e) {
                (f(t) || e) && (t = this._zrenderEventFixed(t, !0), this._lastTouchMoment = new Date, this._mobileFindFixed(t), this._mousedownHandler(t))
            }, touchmove: function (t, e) {
                (f(t) || e) && (t = this._zrenderEventFixed(t, !0), this._mousemoveHandler(t), this._isDragging && a.stop(t))
            }, touchend: function (t, e) {
                if (f(t) || e) {
                    t = this._zrenderEventFixed(t, !0), this._mouseupHandler(t);
                    var i = new Date;
                    i - this._lastTouchMoment < d.touchClickDelay && (this._mobileFindFixed(t), this._clickHandler(t), i - this._lastClickMoment < d.touchClickDelay / 2 && (this._dblclickHandler(t), this._lastHover && this._lastHover.clickable && a.stop(t)), this._lastClickMoment = i), this.painter.clearHover()
                }
            }
        }, m = function (t, e, n) {
            u.call(this), this.root = t, this.storage = e, this.painter = n, this._lastX = this._lastY = this._mouseX = this._mouseY = 0, this._findHover = i(o, this), this._domHover = n.getDomHover(), r(this), window.addEventListener ? (window.addEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.addEventListener("touchstart", this._touchstartHandler), t.addEventListener("touchmove", this._touchmoveHandler), t.addEventListener("touchend", this._touchendHandler)) : (t.addEventListener("click", this._clickHandler), t.addEventListener("dblclick", this._dblclickHandler), t.addEventListener("mousewheel", this._mousewheelHandler), t.addEventListener("mousemove", this._mousemoveHandler), t.addEventListener("mousedown", this._mousedownHandler), t.addEventListener("mouseup", this._mouseupHandler)), t.addEventListener("DOMMouseScroll", this._mousewheelHandler), t.addEventListener("mouseout", this._mouseoutHandler)) : (window.attachEvent("onresize", this._resizeHandler), t.attachEvent("onclick", this._clickHandler), t.ondblclick = this._dblclickHandler, t.attachEvent("onmousewheel", this._mousewheelHandler), t.attachEvent("onmousemove", this._mousemoveHandler), t.attachEvent("onmouseout", this._mouseoutHandler), t.attachEvent("onmousedown", this._mousedownHandler), t.attachEvent("onmouseup", this._mouseupHandler))
        };
        m.prototype.on = function (t, e, i) {
            return this.bind(t, e, i), this
        }, m.prototype.un = function (t, e) {
            return this.unbind(t, e), this
        }, m.prototype.trigger = function (t, e) {
            switch (t) {
                case d.RESIZE:
                case d.CLICK:
                case d.DBLCLICK:
                case d.MOUSEWHEEL:
                case d.MOUSEMOVE:
                case d.MOUSEDOWN:
                case d.MOUSEUP:
                case d.MOUSEOUT:
                    this["_" + t + "Handler"](e, !0)
            }
        }, m.prototype.dispose = function () {
            var t = this.root;
            window.removeEventListener ? (window.removeEventListener("resize", this._resizeHandler), s.os.tablet || s.os.phone ? (t.removeEventListener("touchstart", this._touchstartHandler), t.removeEventListener("touchmove", this._touchmoveHandler), t.removeEventListener("touchend", this._touchendHandler)) : (t.removeEventListener("click", this._clickHandler), t.removeEventListener("dblclick", this._dblclickHandler), t.removeEventListener("mousewheel", this._mousewheelHandler), t.removeEventListener("mousemove", this._mousemoveHandler), t.removeEventListener("mousedown", this._mousedownHandler), t.removeEventListener("mouseup", this._mouseupHandler)), t.removeEventListener("DOMMouseScroll", this._mousewheelHandler), t.removeEventListener("mouseout", this._mouseoutHandler)) : (window.detachEvent("onresize", this._resizeHandler), t.detachEvent("onclick", this._clickHandler), t.detachEvent("dblclick", this._dblclickHandler), t.detachEvent("onmousewheel", this._mousewheelHandler), t.detachEvent("onmousemove", this._mousemoveHandler), t.detachEvent("onmouseout", this._mouseoutHandler), t.detachEvent("onmousedown", this._mousedownHandler), t.detachEvent("onmouseup", this._mouseupHandler)), this.root = this._domHover = this.storage = this.painter = null, this.un()
        }, m.prototype._processDragStart = function (t) {
            var e = this._lastHover;
            if (this._isMouseDown && e && e.draggable && !this._draggingTarget && this._mouseDownTarget == e) {
                if (e.dragEnableTime && new Date - this._lastMouseDownMoment < e.dragEnableTime)return;
                var i = e;
                this._draggingTarget = i, this._isDragging = 1, i.invisible = !0, this.storage.mod(i.id), this._dispatchAgency(i, d.DRAGSTART, t), this.painter.refresh()
            }
        }, m.prototype._processDragEnter = function (t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGENTER, t, this._draggingTarget)
        }, m.prototype._processDragOver = function (t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGOVER, t, this._draggingTarget)
        }, m.prototype._processDragLeave = function (t) {
            this._draggingTarget && this._dispatchAgency(this._lastHover, d.DRAGLEAVE, t, this._draggingTarget)
        }, m.prototype._processDrop = function (t) {
            this._draggingTarget && (this._draggingTarget.invisible = !1, this.storage.mod(this._draggingTarget.id), this.painter.refresh(), this._dispatchAgency(this._lastHover, d.DROP, t, this._draggingTarget))
        }, m.prototype._processDragEnd = function (t) {
            this._draggingTarget && (this._dispatchAgency(this._draggingTarget, d.DRAGEND, t), this._lastHover = null), this._isDragging = 0, this._draggingTarget = null
        }, m.prototype._processOverShape = function (t) {
            this._dispatchAgency(this._lastHover, d.MOUSEOVER, t)
        }, m.prototype._processOutShape = function (t) {
            this._dispatchAgency(this._lastHover, d.MOUSEOUT, t)
        }, m.prototype._dispatchAgency = function (t, e, i, r) {
            var o = "on" + e, n = {type: e, event: i, target: t, cancelBubble: !1}, s = t;
            for (r && (n.dragged = r); s && (s[o] && (n.cancelBubble = s[o](n)), s.dispatch(e, n), s = s.parent, !n.cancelBubble););
            if (t)n.cancelBubble || this.dispatch(e, n); else if (!r) {
                var a = {type: e, event: i};
                this.dispatch(e, a), this.painter.eachOtherLayer(function (t) {
                    "function" == typeof t[o] && t[o](a), t.dispatch && t.dispatch(e, a)
                })
            }
        }, m.prototype._iterateAndFindHover = function () {
            var t = c.create();
            return function () {
                for (var e, i, r = this.storage.getShapeList(), o = [0, 0], n = r.length - 1; n >= 0; n--) {
                    var s = r[n];
                    if (e !== s.zlevel && (i = this.painter.getLayer(s.zlevel, i), o[0] = this._mouseX, o[1] = this._mouseY, i.needTransform && (c.invert(t, i.transform), l.applyTransform(o, o, t))), this._findHover(s, o[0], o[1]))break
                }
            }
        }();
        var _ = [{x: 10}, {x: -20}, {x: 10, y: 10}, {y: -20}];
        return m.prototype._mobileFindFixed = function (t) {
            this._lastHover = null, this._mouseX = t.zrenderX, this._mouseY = t.zrenderY, this._event = t, this._iterateAndFindHover();
            for (var e = 0; !this._lastHover && e < _.length; e++) {
                var i = _[e];
                i.x && (this._mouseX += i.x), i.y && (this._mouseY += i.y), this._iterateAndFindHover()
            }
            this._lastHover && (t.zrenderX = this._mouseX, t.zrenderY = this._mouseY)
        }, m.prototype._zrenderEventFixed = function (t, e) {
            if (t.zrenderFixed)return t;
            if (e) {
                var i = "touchend" != t.type ? t.targetTouches[0] : t.changedTouches[0];
                if (i) {
                    var r = this.painter._domRoot.getBoundingClientRect();
                    t.zrenderX = i.clientX - r.left, t.zrenderY = i.clientY - r.top
                }
            } else {
                t = t || window.event;
                var o = t.toElement || t.relatedTarget || t.srcElement || t.target;
                o && o != this._domHover && (t.zrenderX = ("undefined" != typeof t.offsetX ? t.offsetX : t.layerX) + o.offsetLeft, t.zrenderY = ("undefined" != typeof t.offsetY ? t.offsetY : t.layerY) + o.offsetTop)
            }
            return t.zrenderFixed = 1, t
        }, h.merge(m.prototype, u.prototype, !0), m
    }), i("zrender/animation/Animation", ["require", "./Clip", "../tool/color", "../tool/util", "../tool/event"], function (t) {
        "use strict";
        function e(t, e) {
            return t[e]
        }

        function i(t, e, i) {
            t[e] = i
        }

        function r(t, e, i) {
            return (e - t) * i + t
        }

        function o(t, e, i, o, n) {
            var s = t.length;
            if (1 == n)for (var a = 0; s > a; a++)o[a] = r(t[a], e[a], i); else for (var h = t[0].length, a = 0; s > a; a++)for (var l = 0; h > l; l++)o[a][l] = r(t[a][l], e[a][l], i)
        }

        function n(t) {
            switch (typeof t) {
                case"undefined":
                case"string":
                    return !1
            }
            return "undefined" != typeof t.length
        }

        function s(t, e, i, r, o, n, s, h, l) {
            var c = t.length;
            if (1 == l)for (var d = 0; c > d; d++)h[d] = a(t[d], e[d], i[d], r[d], o, n, s); else for (var u = t[0].length, d = 0; c > d; d++)for (var p = 0; u > p; p++)h[d][p] = a(t[d][p], e[d][p], i[d][p], r[d][p], o, n, s)
        }

        function a(t, e, i, r, o, n, s) {
            var a = .5 * (i - t), h = .5 * (r - e);
            return (2 * (e - i) + a + h) * s + (-3 * (e - i) - 2 * a - h) * n + a * o + e
        }

        function h(t) {
            if (n(t)) {
                var e = t.length;
                if (n(t[0])) {
                    for (var i = [], r = 0; e > r; r++)i.push(g.call(t[r]));
                    return i
                }
                return g.call(t)
            }
            return t
        }

        function l(t) {
            return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
        }

        var c = t("./Clip"), d = t("../tool/color"), u = t("../tool/util"), p = t("../tool/event").Dispatcher, f = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
                setTimeout(t, 16)
            }, g = Array.prototype.slice, m = function (t) {
            t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {
                }, this._clips = [], this._running = !1, this._time = 0, p.call(this)
        };
        m.prototype = {
            add: function (t) {
                this._clips.push(t)
            }, remove: function (t) {
                if (t.__inStep)t.__needsRemove = !0; else {
                    var e = u.indexOf(this._clips, t);
                    e >= 0 && this._clips.splice(e, 1)
                }
            }, _update: function () {
                for (var t = (new Date).getTime(), e = t - this._time, i = this._clips, r = i.length, o = [], n = [], s = 0; r > s; s++) {
                    var a = i[s];
                    a.__inStep = !0;
                    var h = a.step(t);
                    a.__inStep = !1, h && (o.push(h), n.push(a))
                }
                for (var s = 0; r > s;)i[s].__needsRemove ? (i[s] = i[r - 1], i.pop(), r--) : s++;
                r = o.length;
                for (var s = 0; r > s; s++)n[s].fire(o[s]);
                this._time = t, this.onframe(e), this.dispatch("frame", e), this.stage.update && this.stage.update()
            }, start: function () {
                function t() {
                    e._running && (f(t), e._update())
                }

                var e = this;
                this._running = !0, this._time = (new Date).getTime(), f(t)
            }, stop: function () {
                this._running = !1
            }, clear: function () {
                this._clips = []
            }, animate: function (t, e) {
                e = e || {};
                var i = new _(t, e.loop, e.getter, e.setter);
                return i.animation = this, i
            }, constructor: m
        }, u.merge(m.prototype, p.prototype, !0);
        var _ = function (t, r, o, n) {
            this._tracks = {}, this._target = t, this._loop = r || !1, this._getter = o || e, this._setter = n || i, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
        };
        return _.prototype = {
            when: function (t, e) {
                for (var i in e)this._tracks[i] || (this._tracks[i] = [], 0 !== t && this._tracks[i].push({
                    time: 0,
                    value: h(this._getter(this._target, i))
                })), this._tracks[i].push({time: parseInt(t, 10), value: e[i]});
                return this
            }, during: function (t) {
                return this._onframeList.push(t), this
            }, start: function (t) {
                var e = this, i = this._setter, h = this._getter, u = "spline" === t, p = function () {
                    if (e._clipCount--, 0 === e._clipCount) {
                        e._tracks = {};
                        for (var t = e._doneList.length, i = 0; t > i; i++)e._doneList[i].call(e)
                    }
                }, f = function (f, g) {
                    var m = f.length;
                    if (m) {
                        var _ = f[0].value, y = n(_), v = !1, x = y && n(_[0]) ? 2 : 1;
                        f.sort(function (t, e) {
                            return t.time - e.time
                        });
                        var b;
                        if (m) {
                            b = f[m - 1].time;
                            for (var T = [], S = [], C = 0; m > C; C++) {
                                T.push(f[C].time / b);
                                var E = f[C].value;
                                "string" == typeof E && (E = d.toArray(E), 0 === E.length && (E[0] = E[1] = E[2] = 0, E[3] = 1), v = !0), S.push(E)
                            }
                            var w, C, z, k, L, A, M, P = 0, I = 0;
                            if (v)var O = [0, 0, 0, 0];
                            var R = function (t, n) {
                                if (I > n) {
                                    for (w = Math.min(P + 1, m - 1), C = w; C >= 0 && !(T[C] <= n); C--);
                                    C = Math.min(C, m - 2)
                                } else {
                                    for (C = P; m > C && !(T[C] > n); C++);
                                    C = Math.min(C - 1, m - 2)
                                }
                                P = C, I = n;
                                var c = T[C + 1] - T[C];
                                if (0 !== c) {
                                    if (z = (n - T[C]) / c, u)if (L = S[C], k = S[0 === C ? C : C - 1], A = S[C > m - 2 ? m - 1 : C + 1], M = S[C > m - 3 ? m - 1 : C + 2], y)s(k, L, A, M, z, z * z, z * z * z, h(t, g), x); else {
                                        var d;
                                        v ? (d = s(k, L, A, M, z, z * z, z * z * z, O, 1), d = l(O)) : d = a(k, L, A, M, z, z * z, z * z * z), i(t, g, d)
                                    } else if (y)o(S[C], S[C + 1], z, h(t, g), x); else {
                                        var d;
                                        v ? (o(S[C], S[C + 1], z, O, 1), d = l(O)) : d = r(S[C], S[C + 1], z), i(t, g, d)
                                    }
                                    for (C = 0; C < e._onframeList.length; C++)e._onframeList[C](t, n)
                                }
                            }, D = new c({
                                target: e._target,
                                life: b,
                                loop: e._loop,
                                delay: e._delay,
                                onframe: R,
                                ondestroy: p
                            });
                            t && "spline" !== t && (D.easing = t), e._clipList.push(D), e._clipCount++, e.animation.add(D)
                        }
                    }
                };
                for (var g in this._tracks)f(this._tracks[g], g);
                return this
            }, stop: function () {
                for (var t = 0; t < this._clipList.length; t++) {
                    var e = this._clipList[t];
                    this.animation.remove(e)
                }
                this._clipList = []
            }, delay: function (t) {
                return this._delay = t, this
            }, done: function (t) {
                return t && this._doneList.push(t), this
            }
        }, m
    }), i("zrender/loadingEffect/Base", ["require", "../tool/util", "../shape/Text", "../shape/Rectangle"], function (t) {
        function e(t) {
            this.setOptions(t)
        }

        var i = t("../tool/util"), r = t("../shape/Text"), o = t("../shape/Rectangle"), n = "Loading...", s = "normal 16px Arial";
        return e.prototype.createTextShape = function (t) {
            return new r({
                highlightStyle: i.merge({
                    x: this.canvasWidth / 2,
                    y: this.canvasHeight / 2,
                    text: n,
                    textAlign: "center",
                    textBaseline: "middle",
                    textFont: s,
                    color: "#333",
                    brushType: "fill"
                }, t, !0)
            })
        }, e.prototype.createBackgroundShape = function (t) {
            return new o({
                highlightStyle: {
                    x: 0,
                    y: 0,
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                    brushType: "fill",
                    color: t
                }
            })
        }, e.prototype.start = function (t) {
            function e(e) {
                t.storage.addHover(e)
            }

            function i() {
                t.refreshHover()
            }

            this.canvasWidth = t._width, this.canvasHeight = t._height, this.loadingTimer = this._start(e, i)
        }, e.prototype._start = function () {
            return setInterval(function () {
            }, 1e4)
        }, e.prototype.stop = function () {
            clearInterval(this.loadingTimer)
        }, e.prototype.setOptions = function (t) {
            this.options = t || {}
        }, e.prototype.adjust = function (t, e) {
            return t <= e[0] ? t = e[0] : t >= e[1] && (t = e[1]), t
        }, e.prototype.getLocation = function (t, e, i) {
            var r = null != t.x ? t.x : "center";
            switch (r) {
                case"center":
                    r = Math.floor((this.canvasWidth - e) / 2);
                    break;
                case"left":
                    r = 0;
                    break;
                case"right":
                    r = this.canvasWidth - e
            }
            var o = null != t.y ? t.y : "center";
            switch (o) {
                case"center":
                    o = Math.floor((this.canvasHeight - i) / 2);
                    break;
                case"top":
                    o = 0;
                    break;
                case"bottom":
                    o = this.canvasHeight - i
            }
            return {x: r, y: o, width: e, height: i}
        }, e
    }), i("zrender/Layer", ["require", "./mixin/Transformable", "./tool/util", "./config"], function (t) {
        function e() {
            return !1
        }

        function i(t, e, i) {
            var r = document.createElement(e), o = i.getWidth(), n = i.getHeight();
            return r.style.position = "absolute", r.style.left = 0, r.style.top = 0, r.style.width = o + "px", r.style.height = n + "px", r.width = o * s.devicePixelRatio, r.height = n * s.devicePixelRatio, r.setAttribute("data-zr-dom-id", t), r
        }

        var r = t("./mixin/Transformable"), o = t("./tool/util"), n = window.G_vmlCanvasManager, s = t("./config"), a = function (t, o) {
            this.id = t, this.dom = i(t, "canvas", o), this.dom.onselectstart = e, this.dom.style["-webkit-user-select"] = "none", this.dom.style["user-select"] = "none", this.dom.style["-webkit-touch-callout"] = "none", this.dom.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", this.dom.className = s.elementClassName, n && n.initElement(this.dom), this.domBack = null, this.ctxBack = null, this.painter = o, this.unusedCount = 0, this.config = null, this.dirty = !0, this.elCount = 0, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.zoomable = !1, this.panable = !1, this.maxZoom = 1 / 0, this.minZoom = 0, r.call(this)
        };
        return a.prototype.initContext = function () {
            this.ctx = this.dom.getContext("2d");
            var t = s.devicePixelRatio;
            1 != t && this.ctx.scale(t, t)
        }, a.prototype.createBackBuffer = function () {
            if (!n) {
                this.domBack = i("back-" + this.id, "canvas", this.painter), this.ctxBack = this.domBack.getContext("2d");
                var t = s.devicePixelRatio;
                1 != t && this.ctxBack.scale(t, t)
            }
        }, a.prototype.resize = function (t, e) {
            var i = s.devicePixelRatio;
            this.dom.style.width = t + "px", this.dom.style.height = e + "px", this.dom.setAttribute("width", t * i), this.dom.setAttribute("height", e * i), 1 != i && this.ctx.scale(i, i), this.domBack && (this.domBack.setAttribute("width", t * i), this.domBack.setAttribute("height", e * i), 1 != i && this.ctxBack.scale(i, i))
        }, a.prototype.clear = function () {
            var t = this.dom, e = this.ctx, i = t.width, r = t.height, o = this.clearColor && !n, a = this.motionBlur && !n, h = this.lastFrameAlpha, l = s.devicePixelRatio;
            if (a && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(t, 0, 0, i / l, r / l)), e.clearRect(0, 0, i / l, r / l), o && (e.save(), e.fillStyle = this.clearColor, e.fillRect(0, 0, i / l, r / l), e.restore()), a) {
                var c = this.domBack;
                e.save(), e.globalAlpha = h, e.drawImage(c, 0, 0, i / l, r / l), e.restore()
            }
        }, o.merge(a.prototype, r.prototype), a
    }), i("zrender/shape/Rectangle", ["require", "./Base", "../tool/util"], function (t) {
        var e = t("./Base"), i = function (t) {
            e.call(this, t)
        };
        return i.prototype = {
            type: "rectangle", _buildRadiusPath: function (t, e) {
                var i, r, o, n, s = e.x, a = e.y, h = e.width, l = e.height, c = e.radius;
                "number" == typeof c ? i = r = o = n = c : c instanceof Array ? 1 === c.length ? i = r = o = n = c[0] : 2 === c.length ? (i = o = c[0], r = n = c[1]) : 3 === c.length ? (i = c[0], r = n = c[1], o = c[2]) : (i = c[0], r = c[1], o = c[2], n = c[3]) : i = r = o = n = 0;
                var d;
                i + r > h && (d = i + r, i *= h / d, r *= h / d), o + n > h && (d = o + n, o *= h / d, n *= h / d), r + o > l && (d = r + o, r *= l / d, o *= l / d), i + n > l && (d = i + n, i *= l / d, n *= l / d), t.moveTo(s + i, a), t.lineTo(s + h - r, a), 0 !== r && t.quadraticCurveTo(s + h, a, s + h, a + r), t.lineTo(s + h, a + l - o), 0 !== o && t.quadraticCurveTo(s + h, a + l, s + h - o, a + l), t.lineTo(s + n, a + l), 0 !== n && t.quadraticCurveTo(s, a + l, s, a + l - n), t.lineTo(s, a + i), 0 !== i && t.quadraticCurveTo(s, a, s + i, a)
            }, buildPath: function (t, e) {
                e.radius ? this._buildRadiusPath(t, e) : (t.moveTo(e.x, e.y), t.lineTo(e.x + e.width, e.y), t.lineTo(e.x + e.width, e.y + e.height), t.lineTo(e.x, e.y + e.height), t.lineTo(e.x, e.y)), t.closePath()
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                    x: Math.round(t.x - e / 2),
                    y: Math.round(t.y - e / 2),
                    width: t.width + e,
                    height: t.height + e
                }, t.__rect
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("zrender/tool/curve", ["require", "./vector"], function (t) {
        function e(t) {
            return t > -m && m > t
        }

        function i(t) {
            return t > m || -m > t
        }

        function r(t, e, i, r, o) {
            var n = 1 - o;
            return n * n * (n * t + 3 * o * e) + o * o * (o * r + 3 * n * i)
        }

        function o(t, e, i, r, o) {
            var n = 1 - o;
            return 3 * (((e - t) * n + 2 * (i - e) * o) * n + (r - i) * o * o)
        }

        function n(t, i, r, o, n, s) {
            var a = o + 3 * (i - r) - t, h = 3 * (r - 2 * i + t), l = 3 * (i - t), c = t - n, d = h * h - 3 * a * l, u = h * l - 9 * a * c, p = l * l - 3 * h * c, f = 0;
            if (e(d) && e(u))if (e(h))s[0] = 0; else {
                var g = -l / h;
                g >= 0 && 1 >= g && (s[f++] = g)
            } else {
                var m = u * u - 4 * d * p;
                if (e(m)) {
                    var v = u / d, g = -h / a + v, x = -v / 2;
                    g >= 0 && 1 >= g && (s[f++] = g), x >= 0 && 1 >= x && (s[f++] = x)
                } else if (m > 0) {
                    var b = Math.sqrt(m), T = d * h + 1.5 * a * (-u + b), S = d * h + 1.5 * a * (-u - b);
                    T = 0 > T ? -Math.pow(-T, y) : Math.pow(T, y), S = 0 > S ? -Math.pow(-S, y) : Math.pow(S, y);
                    var g = (-h - (T + S)) / (3 * a);
                    g >= 0 && 1 >= g && (s[f++] = g)
                } else {
                    var C = (2 * d * h - 3 * a * u) / (2 * Math.sqrt(d * d * d)), E = Math.acos(C) / 3, w = Math.sqrt(d), z = Math.cos(E), g = (-h - 2 * w * z) / (3 * a), x = (-h + w * (z + _ * Math.sin(E))) / (3 * a), k = (-h + w * (z - _ * Math.sin(E))) / (3 * a);
                    g >= 0 && 1 >= g && (s[f++] = g), x >= 0 && 1 >= x && (s[f++] = x), k >= 0 && 1 >= k && (s[f++] = k)
                }
            }
            return f
        }

        function s(t, r, o, n, s) {
            var a = 6 * o - 12 * r + 6 * t, h = 9 * r + 3 * n - 3 * t - 9 * o, l = 3 * r - 3 * t, c = 0;
            if (e(h)) {
                if (i(a)) {
                    var d = -l / a;
                    d >= 0 && 1 >= d && (s[c++] = d)
                }
            } else {
                var u = a * a - 4 * h * l;
                if (e(u))s[0] = -a / (2 * h); else if (u > 0) {
                    var p = Math.sqrt(u), d = (-a + p) / (2 * h), f = (-a - p) / (2 * h);
                    d >= 0 && 1 >= d && (s[c++] = d), f >= 0 && 1 >= f && (s[c++] = f)
                }
            }
            return c
        }

        function a(t, e, i, r, o, n) {
            var s = (e - t) * o + t, a = (i - e) * o + e, h = (r - i) * o + i, l = (a - s) * o + s, c = (h - a) * o + a, d = (c - l) * o + l;
            n[0] = t, n[1] = s, n[2] = l, n[3] = d, n[4] = d, n[5] = c, n[6] = h, n[7] = r
        }

        function h(t, e, i, o, n, s, a, h, l, c, d) {
            var u, p = .005, f = 1 / 0;
            v[0] = l, v[1] = c;
            for (var _ = 0; 1 > _; _ += .05) {
                x[0] = r(t, i, n, a, _), x[1] = r(e, o, s, h, _);
                var y = g.distSquare(v, x);
                f > y && (u = _, f = y)
            }
            f = 1 / 0;
            for (var T = 0; 32 > T && !(m > p); T++) {
                var S = u - p, C = u + p;
                x[0] = r(t, i, n, a, S), x[1] = r(e, o, s, h, S);
                var y = g.distSquare(x, v);
                if (S >= 0 && f > y)u = S, f = y; else {
                    b[0] = r(t, i, n, a, C), b[1] = r(e, o, s, h, C);
                    var E = g.distSquare(b, v);
                    1 >= C && f > E ? (u = C, f = E) : p *= .5
                }
            }
            return d && (d[0] = r(t, i, n, a, u), d[1] = r(e, o, s, h, u)), Math.sqrt(f)
        }

        function l(t, e, i, r) {
            var o = 1 - r;
            return o * (o * t + 2 * r * e) + r * r * i
        }

        function c(t, e, i, r) {
            return 2 * ((1 - r) * (e - t) + r * (i - e))
        }

        function d(t, r, o, n, s) {
            var a = t - 2 * r + o, h = 2 * (r - t), l = t - n, c = 0;
            if (e(a)) {
                if (i(h)) {
                    var d = -l / h;
                    d >= 0 && 1 >= d && (s[c++] = d)
                }
            } else {
                var u = h * h - 4 * a * l;
                if (e(u)) {
                    var d = -h / (2 * a);
                    d >= 0 && 1 >= d && (s[c++] = d)
                } else if (u > 0) {
                    var p = Math.sqrt(u), d = (-h + p) / (2 * a), f = (-h - p) / (2 * a);
                    d >= 0 && 1 >= d && (s[c++] = d), f >= 0 && 1 >= f && (s[c++] = f)
                }
            }
            return c
        }

        function u(t, e, i) {
            var r = t + i - 2 * e;
            return 0 === r ? .5 : (t - e) / r
        }

        function p(t, e, i, r, o) {
            var n = (e - t) * r + t, s = (i - e) * r + e, a = (s - n) * r + n;
            o[0] = t, o[1] = n, o[2] = a, o[3] = a, o[4] = s, o[5] = i
        }

        function f(t, e, i, r, o, n, s, a, h) {
            var c, d = .005, u = 1 / 0;
            v[0] = s, v[1] = a;
            for (var p = 0; 1 > p; p += .05) {
                x[0] = l(t, i, o, p), x[1] = l(e, r, n, p);
                var f = g.distSquare(v, x);
                u > f && (c = p, u = f)
            }
            u = 1 / 0;
            for (var _ = 0; 32 > _ && !(m > d); _++) {
                var y = c - d, T = c + d;
                x[0] = l(t, i, o, y), x[1] = l(e, r, n, y);
                var f = g.distSquare(x, v);
                if (y >= 0 && u > f)c = y, u = f; else {
                    b[0] = l(t, i, o, T), b[1] = l(e, r, n, T);
                    var S = g.distSquare(b, v);
                    1 >= T && u > S ? (c = T, u = S) : d *= .5
                }
            }
            return h && (h[0] = l(t, i, o, c), h[1] = l(e, r, n, c)), Math.sqrt(u)
        }

        var g = t("./vector"), m = 1e-4, _ = Math.sqrt(3), y = 1 / 3, v = g.create(), x = g.create(), b = g.create();
        return {
            cubicAt: r,
            cubicDerivativeAt: o,
            cubicRootAt: n,
            cubicExtrema: s,
            cubicSubdivide: a,
            cubicProjectPoint: h,
            quadraticAt: l,
            quadraticDerivativeAt: c,
            quadraticRootAt: d,
            quadraticExtremum: u,
            quadraticSubdivide: p,
            quadraticProjectPoint: f
        }
    }), i("zrender/Group", ["require", "./tool/guid", "./tool/util", "./mixin/Transformable", "./mixin/Eventful"], function (t) {
        var e = t("./tool/guid"), i = t("./tool/util"), r = t("./mixin/Transformable"), o = t("./mixin/Eventful"), n = function (t) {
            t = t || {}, this.id = t.id || e();
            for (var i in t)this[i] = t[i];
            this.type = "group", this.clipShape = null, this._children = [], this._storage = null, this.__dirty = !0, r.call(this), o.call(this)
        };
        return n.prototype.ignore = !1, n.prototype.children = function () {
            return this._children.slice()
        }, n.prototype.childAt = function (t) {
            return this._children[t]
        }, n.prototype.addChild = function (t) {
            t != this && t.parent != this && (t.parent && t.parent.removeChild(t), this._children.push(t), t.parent = this, this._storage && this._storage !== t._storage && (this._storage.addToMap(t), t instanceof n && t.addChildrenToStorage(this._storage)))
        }, n.prototype.removeChild = function (t) {
            var e = i.indexOf(this._children, t);
            e >= 0 && this._children.splice(e, 1), t.parent = null, this._storage && (this._storage.delFromMap(t.id), t instanceof n && t.delChildrenFromStorage(this._storage))
        }, n.prototype.clearChildren = function () {
            for (var t = 0; t < this._children.length; t++) {
                var e = this._children[t];
                this._storage && (this._storage.delFromMap(e.id), e instanceof n && e.delChildrenFromStorage(this._storage))
            }
            this._children.length = 0
        }, n.prototype.eachChild = function (t, e) {
            for (var i = !!e, r = 0; r < this._children.length; r++) {
                var o = this._children[r];
                i ? t.call(e, o) : t(o)
            }
        }, n.prototype.traverse = function (t, e) {
            for (var i = !!e, r = 0; r < this._children.length; r++) {
                var o = this._children[r];
                i ? t.call(e, o) : t(o), "group" === o.type && o.traverse(t, e)
            }
        }, n.prototype.addChildrenToStorage = function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.addToMap(i), i instanceof n && i.addChildrenToStorage(t)
            }
        }, n.prototype.delChildrenFromStorage = function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.delFromMap(i.id), i instanceof n && i.delChildrenFromStorage(t)
            }
        }, n.prototype.modSelf = function () {
            this.__dirty = !0
        }, i.merge(n.prototype, r.prototype, !0), i.merge(n.prototype, o.prototype, !0), n
    }), i("zrender/shape/Star", ["require", "../tool/math", "./Base", "../tool/util"], function (t) {
        var e = t("../tool/math"), i = e.sin, r = e.cos, o = Math.PI, n = t("./Base"), s = function (t) {
            n.call(this, t)
        };
        return s.prototype = {
            type: "star", buildPath: function (t, e) {
                var n = e.n;
                if (n && !(2 > n)) {
                    var s = e.x, a = e.y, h = e.r, l = e.r0;
                    null == l && (l = n > 4 ? h * r(2 * o / n) / r(o / n) : h / 3);
                    var c = o / n, d = -o / 2, u = s + h * r(d), p = a + h * i(d);
                    d += c;
                    var f = e.pointList = [];
                    f.push([u, p]);
                    for (var g, m = 0, _ = 2 * n - 1; _ > m; m++)g = m % 2 === 0 ? l : h, f.push([s + g * r(d), a + g * i(d)]), d += c;
                    f.push([u, p]), t.moveTo(f[0][0], f[0][1]);
                    for (var m = 0; m < f.length; m++)t.lineTo(f[m][0], f[m][1]);
                    t.closePath()
                }
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e;
                return e = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                    x: Math.round(t.x - t.r - e / 2),
                    y: Math.round(t.y - t.r - e / 2),
                    width: 2 * t.r + e,
                    height: 2 * t.r + e
                }, t.__rect
            }
        }, t("../tool/util").inherits(s, n), s
    }), i("zrender/shape/Heart", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"], function (t) {
        "use strict";
        var e = t("./Base"), i = t("./util/PathProxy"), r = t("../tool/area"), o = function (t) {
            e.call(this, t), this._pathProxy = new i
        };
        return o.prototype = {
            type: "heart", buildPath: function (t, e) {
                var r = this._pathProxy || new i;
                r.begin(t), r.moveTo(e.x, e.y), r.bezierCurveTo(e.x + e.a / 2, e.y - 2 * e.b / 3, e.x + 2 * e.a, e.y + e.b / 3, e.x, e.y + e.b), r.bezierCurveTo(e.x - 2 * e.a, e.y + e.b / 3, e.x - e.a / 2, e.y - 2 * e.b / 3, e.x, e.y), r.closePath()
            }, getRect: function (t) {
                return t.__rect ? t.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
            }, isCover: function (t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0], e = i[1], this.isCoverRect(t, e) ? r.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
            }
        }, t("../tool/util").inherits(o, e), o
    }), i("zrender/shape/Droplet", ["require", "./Base", "./util/PathProxy", "../tool/area", "../tool/util"], function (t) {
        "use strict";
        var e = t("./Base"), i = t("./util/PathProxy"), r = t("../tool/area"), o = function (t) {
            e.call(this, t), this._pathProxy = new i
        };
        return o.prototype = {
            type: "droplet", buildPath: function (t, e) {
                var r = this._pathProxy || new i;
                r.begin(t), r.moveTo(e.x, e.y + e.a), r.bezierCurveTo(e.x + e.a, e.y + e.a, e.x + 3 * e.a / 2, e.y - e.a / 3, e.x, e.y - e.b), r.bezierCurveTo(e.x - 3 * e.a / 2, e.y - e.a / 3, e.x - e.a, e.y + e.a, e.x, e.y + e.a), r.closePath()
            }, getRect: function (t) {
                return t.__rect ? t.__rect : (this._pathProxy.isEmpty() || this.buildPath(null, t), this._pathProxy.fastBoundingRect())
            }, isCover: function (t, e) {
                var i = this.transformCoordToLocal(t, e);
                return t = i[0], e = i[1], this.isCoverRect(t, e) ? r.isInsidePath(this._pathProxy.pathCommands, this.style.lineWidth, this.style.brushType, t, e) : void 0
            }
        }, t("../tool/util").inherits(o, e), o
    }), i("zrender/animation/Clip", ["require", "./easing"], function (t) {
        function e(t) {
            this._targetPool = t.target || {}, this._targetPool instanceof Array || (this._targetPool = [this._targetPool]), this._life = t.life || 1e3, this._delay = t.delay || 0, this._startTime = (new Date).getTime() + this._delay, this._endTime = this._startTime + 1e3 * this._life, this.loop = "undefined" == typeof t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart
        }

        var i = t("./easing");
        return e.prototype = {
            step: function (t) {
                var e = (t - this._startTime) / this._life;
                if (!(0 > e)) {
                    e = Math.min(e, 1);
                    var r = "string" == typeof this.easing ? i[this.easing] : this.easing, o = "function" == typeof r ? r(e) : e;
                    return this.fire("frame", o), 1 == e ? this.loop ? (this.restart(), "restart") : (this.__needsRemove = !0, "destroy") : null
                }
            }, restart: function () {
                var t = (new Date).getTime(), e = (t - this._startTime) % this._life;
                this._startTime = (new Date).getTime() - e + this.gap, this.__needsRemove = !1
            }, fire: function (t, e) {
                for (var i = 0, r = this._targetPool.length; r > i; i++)this["on" + t] && this["on" + t](this._targetPool[i], e)
            }, constructor: e
        }, e
    }), i("zrender/shape/util/PathProxy", ["require", "../../tool/vector"], function (t) {
        var e = t("../../tool/vector"), i = function (t, e) {
            this.command = t, this.points = e || null
        }, r = function () {
            this.pathCommands = [], this._ctx = null, this._min = [], this._max = []
        };
        return r.prototype.fastBoundingRect = function () {
            var t = this._min, i = this._max;
            t[0] = t[1] = 1 / 0, i[0] = i[1] = -1 / 0;
            for (var r = 0; r < this.pathCommands.length; r++) {
                var o = this.pathCommands[r], n = o.points;
                switch (o.command) {
                    case"M":
                        e.min(t, t, n), e.max(i, i, n);
                        break;
                    case"L":
                        e.min(t, t, n), e.max(i, i, n);
                        break;
                    case"C":
                        for (var s = 0; 6 > s; s += 2)t[0] = Math.min(t[0], t[0], n[s]), t[1] = Math.min(t[1], t[1], n[s + 1]), i[0] = Math.max(i[0], i[0], n[s]), i[1] = Math.max(i[1], i[1], n[s + 1]);
                        break;
                    case"Q":
                        for (var s = 0; 4 > s; s += 2)t[0] = Math.min(t[0], t[0], n[s]), t[1] = Math.min(t[1], t[1], n[s + 1]), i[0] = Math.max(i[0], i[0], n[s]), i[1] = Math.max(i[1], i[1], n[s + 1]);
                        break;
                    case"A":
                        var a = n[0], h = n[1], l = n[2], c = n[3];
                        t[0] = Math.min(t[0], t[0], a - l), t[1] = Math.min(t[1], t[1], h - c), i[0] = Math.max(i[0], i[0], a + l), i[1] = Math.max(i[1], i[1], h + c)
                }
            }
            return {x: t[0], y: t[1], width: i[0] - t[0], height: i[1] - t[1]}
        }, r.prototype.begin = function (t) {
            return this._ctx = t || null, this.pathCommands.length = 0, this
        }, r.prototype.moveTo = function (t, e) {
            return this.pathCommands.push(new i("M", [t, e])), this._ctx && this._ctx.moveTo(t, e), this
        }, r.prototype.lineTo = function (t, e) {
            return this.pathCommands.push(new i("L", [t, e])), this._ctx && this._ctx.lineTo(t, e), this
        }, r.prototype.bezierCurveTo = function (t, e, r, o, n, s) {
            return this.pathCommands.push(new i("C", [t, e, r, o, n, s])), this._ctx && this._ctx.bezierCurveTo(t, e, r, o, n, s), this
        }, r.prototype.quadraticCurveTo = function (t, e, r, o) {
            return this.pathCommands.push(new i("Q", [t, e, r, o])), this._ctx && this._ctx.quadraticCurveTo(t, e, r, o), this
        }, r.prototype.arc = function (t, e, r, o, n, s) {
            return this.pathCommands.push(new i("A", [t, e, r, r, o, n - o, 0, s ? 0 : 1])), this._ctx && this._ctx.arc(t, e, r, o, n, s), this
        }, r.prototype.arcTo = function (t, e, i, r, o) {
            return this._ctx && this._ctx.arcTo(t, e, i, r, o), this
        }, r.prototype.rect = function (t, e, i, r) {
            return this._ctx && this._ctx.rect(t, e, i, r), this
        }, r.prototype.closePath = function () {
            return this.pathCommands.push(new i("z")), this._ctx && this._ctx.closePath(), this
        }, r.prototype.isEmpty = function () {
            return 0 === this.pathCommands.length
        }, r.PathSegment = i, r
    }), i("zrender/animation/easing", [], function () {
        var t = {
            Linear: function (t) {
                return t
            }, QuadraticIn: function (t) {
                return t * t
            }, QuadraticOut: function (t) {
                return t * (2 - t)
            }, QuadraticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }, CubicIn: function (t) {
                return t * t * t
            }, CubicOut: function (t) {
                return --t * t * t + 1
            }, CubicInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }, QuarticIn: function (t) {
                return t * t * t * t
            }, QuarticOut: function (t) {
                return 1 - --t * t * t * t
            }, QuarticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }, QuinticIn: function (t) {
                return t * t * t * t * t
            }, QuinticOut: function (t) {
                return --t * t * t * t * t + 1
            }, QuinticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }, SinusoidalIn: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, SinusoidalOut: function (t) {
                return Math.sin(t * Math.PI / 2)
            }, SinusoidalInOut: function (t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }, ExponentialIn: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, ExponentialOut: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, ExponentialInOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
            }, CircularIn: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, CircularOut: function (t) {
                return Math.sqrt(1 - --t * t)
            }, CircularInOut: function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }, ElasticIn: function (t) {
                var e, i = .1, r = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = r / 4) : e = r * Math.asin(1 / i) / (2 * Math.PI), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r)))
            }, ElasticOut: function (t) {
                var e, i = .1, r = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = r / 4) : e = r * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / r) + 1)
            }, ElasticInOut: function (t) {
                var e, i = .1, r = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!i || 1 > i ? (i = 1, e = r / 4) : e = r * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * i * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / r) * .5 + 1)
            }, BackIn: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, BackOut: function (t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1
            }, BackInOut: function (t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }, BounceIn: function (e) {
                return 1 - t.BounceOut(1 - e)
            }, BounceOut: function (t) {
                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, BounceInOut: function (e) {
                return .5 > e ? .5 * t.BounceIn(2 * e) : .5 * t.BounceOut(2 * e - 1) + .5
            }
        };
        return t
    }), i("zrender/shape/Line", ["require", "./Base", "./util/dashedLineTo", "../tool/util"], function (t) {
        var e = t("./Base"), i = t("./util/dashedLineTo"), r = function (t) {
            this.brushTypeOnly = "stroke", this.textPosition = "end", e.call(this, t)
        };
        return r.prototype = {
            type: "line", buildPath: function (t, e) {
                if (e.lineType && "solid" != e.lineType) {
                    if ("dashed" == e.lineType || "dotted" == e.lineType) {
                        var r = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                        i(t, e.xStart, e.yStart, e.xEnd, e.yEnd, r)
                    }
                } else t.moveTo(e.xStart, e.yStart), t.lineTo(e.xEnd, e.yEnd)
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e = t.lineWidth || 1;
                return t.__rect = {
                    x: Math.min(t.xStart, t.xEnd) - e,
                    y: Math.min(t.yStart, t.yEnd) - e,
                    width: Math.abs(t.xStart - t.xEnd) + e,
                    height: Math.abs(t.yStart - t.yEnd) + e
                }, t.__rect
            }
        }, t("../tool/util").inherits(r, e), r
    }), i("zrender/shape/BezierCurve", ["require", "./Base", "../tool/util"], function (t) {
        "use strict";
        var e = t("./Base"), i = function (t) {
            this.brushTypeOnly = "stroke", this.textPosition = "end", e.call(this, t)
        };
        return i.prototype = {
            type: "bezier-curve", buildPath: function (t, e) {
                t.moveTo(e.xStart, e.yStart), "undefined" != typeof e.cpX2 && "undefined" != typeof e.cpY2 ? t.bezierCurveTo(e.cpX1, e.cpY1, e.cpX2, e.cpY2, e.xEnd, e.yEnd) : t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd)
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                var e = Math.min(t.xStart, t.xEnd, t.cpX1), i = Math.min(t.yStart, t.yEnd, t.cpY1), r = Math.max(t.xStart, t.xEnd, t.cpX1), o = Math.max(t.yStart, t.yEnd, t.cpY1), n = t.cpX2, s = t.cpY2;
                "undefined" != typeof n && "undefined" != typeof s && (e = Math.min(e, n), i = Math.min(i, s), r = Math.max(r, n), o = Math.max(o, s));
                var a = t.lineWidth || 1;
                return t.__rect = {x: e - a, y: i - a, width: r - e + a, height: o - i + a}, t.__rect
            }
        }, t("../tool/util").inherits(i, e), i
    }), i("zrender/shape/util/dashedLineTo", [], function () {
        var t = [5, 5];
        return function (e, i, r, o, n, s) {
            if (e.setLineDash)return t[0] = t[1] = s, e.setLineDash(t), e.moveTo(i, r), void e.lineTo(o, n);
            s = "number" != typeof s ? 5 : s;
            var a = o - i, h = n - r, l = Math.floor(Math.sqrt(a * a + h * h) / s);
            a /= l, h /= l;
            for (var c = !0, d = 0; l > d; ++d)c ? e.moveTo(i, r) : e.lineTo(i, r), c = !c, i += a, r += h;
            e.lineTo(o, n)
        }
    }), i("echarts/util/shape/normalIsCover", [], function () {
        return function (t, e) {
            var i = this.transformCoordToLocal(t, e);
            return t = i[0], e = i[1], this.isCoverRect(t, e)
        }
    }), i("zrender/shape/Polygon", ["require", "./Base", "./util/smoothSpline", "./util/smoothBezier", "./util/dashedLineTo", "../tool/util"], function (t) {
        var e = t("./Base"), i = t("./util/smoothSpline"), r = t("./util/smoothBezier"), o = t("./util/dashedLineTo"), n = function (t) {
            e.call(this, t)
        };
        return n.prototype = {
            type: "polygon", buildPath: function (t, e) {
                var n = e.pointList;
                if (!(n.length < 2)) {
                    if (e.smooth && "spline" !== e.smooth) {
                        var s = r(n, e.smooth, !0, e.smoothConstraint);
                        t.moveTo(n[0][0], n[0][1]);
                        for (var a, h, l, c = n.length, d = 0; c > d; d++)a = s[2 * d], h = s[2 * d + 1], l = n[(d + 1) % c], t.bezierCurveTo(a[0], a[1], h[0], h[1], l[0], l[1])
                    } else if ("spline" === e.smooth && (n = i(n, !0)), e.lineType && "solid" != e.lineType) {
                        if ("dashed" == e.lineType || "dotted" == e.lineType) {
                            var u = e._dashLength || (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                            e._dashLength = u, t.moveTo(n[0][0], n[0][1]);
                            for (var d = 1, p = n.length; p > d; d++)o(t, n[d - 1][0], n[d - 1][1], n[d][0], n[d][1], u);
                            o(t, n[n.length - 1][0], n[n.length - 1][1], n[0][0], n[0][1], u)
                        }
                    } else {
                        t.moveTo(n[0][0], n[0][1]);
                        for (var d = 1, p = n.length; p > d; d++)t.lineTo(n[d][0], n[d][1]);
                        t.lineTo(n[0][0], n[0][1])
                    }
                    t.closePath()
                }
            }, getRect: function (t) {
                if (t.__rect)return t.__rect;
                for (var e = Number.MAX_VALUE, i = Number.MIN_VALUE, r = Number.MAX_VALUE, o = Number.MIN_VALUE, n = t.pointList, s = 0, a = n.length; a > s; s++)n[s][0] < e && (e = n[s][0]), n[s][0] > i && (i = n[s][0]), n[s][1] < r && (r = n[s][1]), n[s][1] > o && (o = n[s][1]);
                var h;
                return h = "stroke" == t.brushType || "fill" == t.brushType ? t.lineWidth || 1 : 0, t.__rect = {
                    x: Math.round(e - h / 2),
                    y: Math.round(r - h / 2),
                    width: i - e + h,
                    height: o - r + h
                }, t.__rect
            }
        }, t("../tool/util").inherits(n, e), n
    }), i("zrender/shape/util/smoothSpline", ["require", "../../tool/vector"], function (t) {
        function e(t, e, i, r, o, n, s) {
            var a = .5 * (i - t), h = .5 * (r - e);
            return (2 * (e - i) + a + h) * s + (-3 * (e - i) - 2 * a - h) * n + a * o + e
        }

        var i = t("../../tool/vector");
        return function (t, r) {
            for (var o = t.length, n = [], s = 0, a = 1; o > a; a++)s += i.distance(t[a - 1], t[a]);
            var h = s / 5;
            h = o > h ? o : h;
            for (var a = 0; h > a; a++) {
                var l, c, d, u = a / (h - 1) * (r ? o : o - 1), p = Math.floor(u), f = u - p, g = t[p % o];
                r ? (l = t[(p - 1 + o) % o], c = t[(p + 1) % o], d = t[(p + 2) % o]) : (l = t[0 === p ? p : p - 1], c = t[p > o - 2 ? o - 1 : p + 1], d = t[p > o - 3 ? o - 1 : p + 2]);
                var m = f * f, _ = f * m;
                n.push([e(l[0], g[0], c[0], d[0], f, m, _), e(l[1], g[1], c[1], d[1], f, m, _)])
            }
            return n
        }
    }), i("zrender/shape/util/smoothBezier", ["require", "../../tool/vector"], function (t) {
        var e = t("../../tool/vector");
        return function (t, i, r, o) {
            var n, s, a, h, l = [], c = [], d = [], u = [], p = !!o;
            if (p) {
                a = [1 / 0, 1 / 0], h = [-1 / 0, -1 / 0];
                for (var f = 0, g = t.length; g > f; f++)e.min(a, a, t[f]), e.max(h, h, t[f]);
                e.min(a, a, o[0]), e.max(h, h, o[1])
            }
            for (var f = 0, g = t.length; g > f; f++) {
                var n, s, m = t[f];
                if (r)n = t[f ? f - 1 : g - 1], s = t[(f + 1) % g]; else {
                    if (0 === f || f === g - 1) {
                        l.push(e.clone(t[f]));
                        continue
                    }
                    n = t[f - 1], s = t[f + 1]
                }
                e.sub(c, s, n), e.scale(c, c, i);
                var _ = e.distance(m, n), y = e.distance(m, s), v = _ + y;
                0 !== v && (_ /= v, y /= v), e.scale(d, c, -_), e.scale(u, c, y);
                var x = e.add([], m, d), b = e.add([], m, u);
                p && (e.max(x, x, a), e.min(x, x, h), e.max(b, b, a), e.min(b, b, h)), l.push(x), l.push(b)
            }
            return r && l.push(e.clone(l.shift())), l
        }
    }), i("echarts/util/number", [], function () {
        function t(t) {
            return t.replace(/^\s+/, "").replace(/\s+$/, "")
        }

        function e(e, i) {
            return "string" == typeof e ? t(e).match(/%$/) ? parseFloat(e) / 100 * i : parseFloat(e) : e
        }

        function i(t, i) {
            return [e(i[0], t.getWidth()), e(i[1], t.getHeight())]
        }

        function r(t, i) {
            i instanceof Array || (i = [0, i]);
            var r = Math.min(t.getWidth(), t.getHeight()) / 2;
            return [e(i[0], r), e(i[1], r)]
        }

        function o(t) {
            return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
        }

        function n(t) {
            for (var e = 1, i = 0; Math.round(t * e) / e !== t;)e *= 10, i++;
            return i
        }

        return {parsePercent: e, parseCenter: i, parseRadius: r, addCommas: o, getPrecision: n}
    }), i("echarts/util/ecQuery", ["require", "zrender/tool/util"], function (t) {
        function e(t, e) {
            if ("undefined" != typeof t) {
                if (!e)return t;
                e = e.split(".");
                for (var i = e.length, r = 0; i > r;) {
                    if (t = t[e[r]], "undefined" == typeof t)return;
                    r++
                }
                return t
            }
        }

        function i(t, i) {
            for (var r, o = 0, n = t.length; n > o; o++)if (r = e(t[o], i), "undefined" != typeof r)return r
        }

        function r(t, i) {
            for (var r, n = t.length; n--;) {
                var s = e(t[n], i);
                "undefined" != typeof s && ("undefined" == typeof r ? r = o.clone(s) : o.merge(r, s, !0))
            }
            return r
        }

        var o = t("zrender/tool/util");
        return {query: e, deepQuery: i, deepMerge: r}
    }), i("echarts/data/KDTree", ["require", "./quickSelect"], function (t) {
        function e(t, e) {
            this.left = null, this.right = null, this.axis = t, this.data = e
        }

        var i = t("./quickSelect"), r = function (t, e) {
            t.length && (e || (e = t[0].array.length), this.dimension = e, this.root = this._buildTree(t, 0, t.length - 1, 0), this._stack = [], this._nearstNList = [])
        };
        return r.prototype._buildTree = function (t, r, o, n) {
            if (r > o)return null;
            var s = Math.floor((r + o) / 2);
            s = i(t, r, o, s, function (t, e) {
                return t.array[n] - e.array[n]
            });
            var a = t[s], h = new e(n, a);
            return n = (n + 1) % this.dimension, o > r && (h.left = this._buildTree(t, r, s - 1, n), h.right = this._buildTree(t, s + 1, o, n)), h
        }, r.prototype.nearest = function (t, e) {
            var i = this.root, r = this._stack, o = 0, n = 1 / 0, s = null;
            for (i.data !== t && (n = e(i.data, t), s = i), t.array[i.axis] < i.data.array[i.axis] ? (i.right && (r[o++] = i.right), i.left && (r[o++] = i.left)) : (i.left && (r[o++] = i.left), i.right && (r[o++] = i.right)); o--;) {
                i = r[o];
                var a = t.array[i.axis] - i.data.array[i.axis], h = 0 > a, l = !1;
                a *= a, n > a && (a = e(i.data, t), n > a && i.data !== t && (n = a, s = i), l = !0), h ? (l && i.right && (r[o++] = i.right), i.left && (r[o++] = i.left)) : (l && i.left && (r[o++] = i.left), i.right && (r[o++] = i.right))
            }
            return s.data
        }, r.prototype._addNearest = function (t, e, i) {
            for (var r = this._nearstNList, o = t - 1; o > 0 && !(e >= r[o - 1].dist); o--)r[o].dist = r[o - 1].dist, r[o].node = r[o - 1].node;
            r[o].dist = e, r[o].node = i
        }, r.prototype.nearestN = function (t, e, i, r) {
            if (0 >= e)return r.length = 0, r;
            for (var o = this.root, n = this._stack, s = 0, a = this._nearstNList, h = 0; e > h; h++)a[h] || (a[h] = {}), a[h].dist = 0, a[h].node = null;
            var l = i(o.data, t), c = 0;
            for (o.data !== t && (c++, this._addNearest(c, l, o)), t.array[o.axis] < o.data.array[o.axis] ? (o.right && (n[s++] = o.right), o.left && (n[s++] = o.left)) : (o.left && (n[s++] = o.left), o.right && (n[s++] = o.right)); s--;) {
                o = n[s];
                var l = t.array[o.axis] - o.data.array[o.axis], d = 0 > l, u = !1;
                l *= l, (e > c || l < a[c - 1].dist) && (l = i(o.data, t), (e > c || l < a[c - 1].dist) && o.data !== t && (e > c && c++, this._addNearest(c, l, o)), u = !0), d ? (u && o.right && (n[s++] = o.right), o.left && (n[s++] = o.left)) : (u && o.left && (n[s++] = o.left), o.right && (n[s++] = o.right))
            }
            for (var h = 0; c > h; h++)r[h] = a[h].node.data;
            return r.length = c, r
        }, r
    }), i("echarts/data/quickSelect", ["require"], function () {
        function t(t, e) {
            return t - e
        }

        function e(t, e, i) {
            var r = t[e];
            t[e] = t[i], t[i] = r
        }

        function i(t, i, r, o, n) {
            for (var s = i; r > i;) {
                var s = Math.round((r + i) / 2), a = t[s];
                e(t, s, r), s = i;
                for (var h = i; r - 1 >= h; h++)n(a, t[h]) >= 0 && (e(t, h, s), s++);
                if (e(t, r, s), s === o)return s;
                o > s ? i = s + 1 : r = s - 1
            }
            return i
        }

        function r(e, r, o, n, s) {
            return arguments.length <= 3 && (n = r, s = 2 == arguments.length ? t : o, r = 0, o = e.length - 1), i(e, r, o, n, s)
        }

        return r
    }), i("echarts/component/dataView", ["require", "./base", "../config", "zrender/tool/util", "../component"], function (t) {
        function e(t, e, r, o, n) {
            i.call(this, t, e, r, o, n), this.dom = n.dom, this._tDom = document.createElement("div"), this._textArea = document.createElement("textArea"), this._buttonRefresh = document.createElement("button"), this._buttonRefresh.setAttribute("type", "button"), this._buttonClose = document.createElement("button"), this._buttonClose.setAttribute("type", "button"), this._hasShow = !1, this._zrHeight = r.getHeight(), this._zrWidth = r.getWidth(), this._tDom.className = "echarts-dataview", this.hide(), this.dom.firstChild.appendChild(this._tDom), window.addEventListener ? (this._tDom.addEventListener("click", this._stop), this._tDom.addEventListener("mousewheel", this._stop), this._tDom.addEventListener("mousemove", this._stop), this._tDom.addEventListener("mousedown", this._stop), this._tDom.addEventListener("mouseup", this._stop), this._tDom.addEventListener("touchstart", this._stop), this._tDom.addEventListener("touchmove", this._stop), this._tDom.addEventListener("touchend", this._stop)) : (this._tDom.attachEvent("onclick", this._stop), this._tDom.attachEvent("onmousewheel", this._stop), this._tDom.attachEvent("onmousemove", this._stop), this._tDom.attachEvent("onmousedown", this._stop), this._tDom.attachEvent("onmouseup", this._stop))
        }

        var i = t("./base"), r = t("../config"), o = t("zrender/tool/util");
        return e.prototype = {
            type: r.COMPONENT_TYPE_DATAVIEW,
            _lang: ["Data View", "close", "refresh"],
            _gCssText: "position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;",
            hide: function () {
                this._sizeCssText = "width:" + this._zrWidth + "px;height:0px;background-color:#f0ffff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
            },
            show: function (t) {
                this._hasShow = !0;
                var e = this.query(this.option, "toolbox.feature.dataView.lang") || this._lang;
                this.option = t, this._tDom.innerHTML = '<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">' + (e[0] || this._lang[0]) + "</p>";
                var i = this.query(this.option, "toolbox.feature.dataView.optionToContent");
                "function" != typeof i ? this._textArea.value = this._optionToContent() : (this._textArea = document.createElement("div"), this._textArea.innerHTML = i(this.option)), this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:" + (this._zrHeight - 100) + "px;", this._tDom.appendChild(this._textArea), this._buttonClose.style.cssText = "float:right;padding:1px 6px;", this._buttonClose.innerHTML = e[1] || this._lang[1];
                var r = this;
                this._buttonClose.onclick = function () {
                    r.hide()
                }, this._tDom.appendChild(this._buttonClose), this.query(this.option, "toolbox.feature.dataView.readOnly") === !1 ? (this._buttonRefresh.style.cssText = "float:right;margin-right:10px;padding:1px 6px;", this._buttonRefresh.innerHTML = e[2] || this._lang[2], this._buttonRefresh.onclick = function () {
                    r._save()
                }, this._textArea.readOnly = !1, this._textArea.style.cursor = "default") : (this._buttonRefresh.style.cssText = "display:none", this._textArea.readOnly = !0, this._textArea.style.cursor = "text"), this._tDom.appendChild(this._buttonRefresh), this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText
            },
            _optionToContent: function () {
                var t, e, i, o, n, s, a = [], h = "";
                if (this.option.xAxis)for (a = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], t = 0, o = a.length; o > t; t++)if ("category" == (a[t].type || "category")) {
                    for (s = [], e = 0, i = a[t].data.length; i > e; e++)s.push(this.getDataFromOption(a[t].data[e]));
                    h += s.join(", ") + "\n\n"
                }
                if (this.option.yAxis)for (a = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], t = 0, o = a.length; o > t; t++)if ("category" == a[t].type) {
                    for (s = [], e = 0, i = a[t].data.length; i > e; e++)s.push(this.getDataFromOption(a[t].data[e]));
                    h += s.join(", ") + "\n\n"
                }
                var l, c = this.option.series;
                for (t = 0, o = c.length; o > t; t++) {
                    for (s = [], e = 0, i = c[t].data.length; i > e; e++)n = c[t].data[e], l = c[t].type == r.CHART_TYPE_PIE || c[t].type == r.CHART_TYPE_MAP ? (n.name || "-") + ":" : "", c[t].type == r.CHART_TYPE_SCATTER && (n = this.getDataFromOption(n).join(", ")), s.push(l + this.getDataFromOption(n));
                    h += (c[t].name || "-") + " : \n", h += s.join(c[t].type == r.CHART_TYPE_SCATTER ? "\n" : ", "), h += "\n\n"
                }
                return h
            },
            _save: function () {
                var t = this.query(this.option, "toolbox.feature.dataView.contentToOption");
                if ("function" != typeof t) {
                    for (var e = this._textArea.value.split("\n"), i = [], o = 0, n = e.length; n > o; o++)e[o] = this._trim(e[o]), "" !== e[o] && i.push(e[o]);
                    this._contentToOption(i)
                } else t(this._textArea, this.option);
                this.hide();
                var s = this;
                setTimeout(function () {
                    s.messageCenter && s.messageCenter.dispatch(r.EVENT.DATA_VIEW_CHANGED, null, {option: s.option}, s.myChart)
                }, s.canvasSupported ? 800 : 100)
            },
            _contentToOption: function (t) {
                var e, i, o, n, s, a, h, l = [], c = 0;
                if (this.option.xAxis)for (l = this.option.xAxis instanceof Array ? this.option.xAxis : [this.option.xAxis], e = 0, n = l.length; n > e; e++)if ("category" == (l[e].type || "category")) {
                    for (a = t[c].split(","), i = 0, o = l[e].data.length; o > i; i++)h = this._trim(a[i] || ""), s = l[e].data[i], "undefined" != typeof l[e].data[i].value ? l[e].data[i].value = h : l[e].data[i] = h;
                    c++
                }
                if (this.option.yAxis)for (l = this.option.yAxis instanceof Array ? this.option.yAxis : [this.option.yAxis], e = 0, n = l.length; n > e; e++)if ("category" == l[e].type) {
                    for (a = t[c].split(","), i = 0, o = l[e].data.length; o > i; i++)h = this._trim(a[i] || ""), s = l[e].data[i], "undefined" != typeof l[e].data[i].value ? l[e].data[i].value = h : l[e].data[i] = h;
                    c++
                }
                var d = this.option.series;
                for (e = 0, n = d.length; n > e; e++)if (c++, d[e].type == r.CHART_TYPE_SCATTER)for (var i = 0, o = d[e].data.length; o > i; i++)a = t[c], h = a.replace(" ", "").split(","), "undefined" != typeof d[e].data[i].value ? d[e].data[i].value = h : d[e].data[i] = h, c++; else {
                    a = t[c].split(",");
                    for (var i = 0, o = d[e].data.length; o > i; i++)h = (a[i] || "").replace(/.*:/, ""), h = this._trim(h), h = "-" != h && "" !== h ? h - 0 : "-", "undefined" != typeof d[e].data[i].value ? d[e].data[i].value = h : d[e].data[i] = h;
                    c++
                }
            },
            _trim: function (t) {
                var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
                return t.replace(e, "")
            },
            _stop: function (t) {
                t = t || window.event, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            },
            resize: function () {
                this._zrHeight = this.zr.getHeight(), this._zrWidth = this.zr.getWidth(), this._tDom.offsetHeight > 10 && (this._sizeCssText = "width:" + this._zrWidth + "px;height:" + this._zrHeight + "px;background-color:#fff;", this._tDom.style.cssText = this._gCssText + this._sizeCssText, this._textArea.style.cssText = "display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:" + (this._zrHeight - 100) + "px;")
            },
            dispose: function () {
                window.removeEventListener ? (this._tDom.removeEventListener("click", this._stop), this._tDom.removeEventListener("mousewheel", this._stop), this._tDom.removeEventListener("mousemove", this._stop), this._tDom.removeEventListener("mousedown", this._stop), this._tDom.removeEventListener("mouseup", this._stop), this._tDom.removeEventListener("touchstart", this._stop), this._tDom.removeEventListener("touchmove", this._stop), this._tDom.removeEventListener("touchend", this._stop)) : (this._tDom.detachEvent("onclick", this._stop), this._tDom.detachEvent("onmousewheel", this._stop), this._tDom.detachEvent("onmousemove", this._stop), this._tDom.detachEvent("onmousedown", this._stop), this._tDom.detachEvent("onmouseup", this._stop)), this._buttonRefresh.onclick = null, this._buttonClose.onclick = null, this._hasShow && (this._tDom.removeChild(this._textArea), this._tDom.removeChild(this._buttonRefresh), this._tDom.removeChild(this._buttonClose)), this._textArea = null, this._buttonRefresh = null, this._buttonClose = null, this.dom.firstChild.removeChild(this._tDom), this._tDom = null
            }
        }, o.inherits(e, i), t("../component").define("dataView", e), e
    }), i("zrender/tool/computeBoundingBox", ["require", "./vector", "./curve"], function (t) {
        function e(t, e, i) {
            if (0 !== t.length) {
                for (var r = t[0][0], o = t[0][0], n = t[0][1], s = t[0][1], a = 1; a < t.length; a++) {
                    var h = t[a];
                    h[0] < r && (r = h[0]), h[0] > o && (o = h[0]), h[1] < n && (n = h[1]), h[1] > s && (s = h[1])
                }
                e[0] = r, e[1] = n, i[0] = o, i[1] = s
            }
        }

        function i(t, e, i, r, o, s) {
            var a = [];
            n.cubicExtrema(t[0], e[0], i[0], r[0], a);
            for (var h = 0; h < a.length; h++)a[h] = n.cubicAt(t[0], e[0], i[0], r[0], a[h]);
            var l = [];
            n.cubicExtrema(t[1], e[1], i[1], r[1], l);
            for (var h = 0; h < l.length; h++)l[h] = n.cubicAt(t[1], e[1], i[1], r[1], l[h]);
            a.push(t[0], r[0]), l.push(t[1], r[1]);
            var c = Math.min.apply(null, a), d = Math.max.apply(null, a), u = Math.min.apply(null, l), p = Math.max.apply(null, l);
            o[0] = c, o[1] = u, s[0] = d, s[1] = p
        }

        function r(t, e, i, r, o) {
            var s = n.quadraticExtremum(t[0], e[0], i[0]), a = n.quadraticExtremum(t[1], e[1], i[1]);
            s = Math.max(Math.min(s, 1), 0), a = Math.max(Math.min(a, 1), 0);
            var h = 1 - s, l = 1 - a, c = h * h * t[0] + 2 * h * s * e[0] + s * s * i[0], d = h * h * t[1] + 2 * h * s * e[1] + s * s * i[1], u = l * l * t[0] + 2 * l * a * e[0] + a * a * i[0], p = l * l * t[1] + 2 * l * a * e[1] + a * a * i[1];
            r[0] = Math.min(t[0], i[0], c, u), r[1] = Math.min(t[1], i[1], d, p), o[0] = Math.max(t[0], i[0], c, u), o[1] = Math.max(t[1], i[1], d, p)
        }

        var o = t("./vector"), n = t("./curve"), s = o.create(), a = o.create(), h = o.create(), l = function (t, e, i, r, n, l, c, d) {
            if (Math.abs(r - n) >= 2 * Math.PI)return c[0] = t - i, c[1] = e - i, d[0] = t + i, void(d[1] = e + i);
            if (s[0] = Math.cos(r) * i + t, s[1] = Math.sin(r) * i + e, a[0] = Math.cos(n) * i + t, a[1] = Math.sin(n) * i + e, o.min(c, s, a), o.max(d, s, a), r %= 2 * Math.PI, 0 > r && (r += 2 * Math.PI), n %= 2 * Math.PI, 0 > n && (n += 2 * Math.PI), r > n && !l ? n += 2 * Math.PI : n > r && l && (r += 2 * Math.PI), l) {
                var u = n;
                n = r, r = u
            }
            for (var p = 0; n > p; p += Math.PI / 2)p > r && (h[0] = Math.cos(p) * i + t, h[1] = Math.sin(p) * i + e, o.min(c, h, c), o.max(d, h, d))
        };
        return e.cubeBezier = i, e.quadraticBezier = r, e.arc = l, e
    }), i("echarts/util/shape/Cross", ["require", "zrender/shape/Base", "zrender/shape/Line", "zrender/tool/util", "./normalIsCover"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("zrender/shape/Base"), r = t("zrender/shape/Line"), o = t("zrender/tool/util");
        return e.prototype = {
            type: "cross", buildPath: function (t, e) {
                var i = e.rect;
                e.xStart = i.x, e.xEnd = i.x + i.width, e.yStart = e.yEnd = e.y, r.prototype.buildPath(t, e), e.xStart = e.xEnd = e.x, e.yStart = i.y, e.yEnd = i.y + i.height, r.prototype.buildPath(t, e)
            }, getRect: function (t) {
                return t.rect
            }, isCover: t("./normalIsCover")
        }, o.inherits(e, i), e
    }), i("echarts/util/shape/Candle", ["require", "zrender/shape/Base", "zrender/tool/util", "./normalIsCover"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("zrender/shape/Base"), r = t("zrender/tool/util");
        return e.prototype = {
            type: "candle", _numberOrder: function (t, e) {
                return e - t
            }, buildPath: function (t, e) {
                var i = r.clone(e.y).sort(this._numberOrder);
                t.moveTo(e.x, i[3]), t.lineTo(e.x, i[2]), t.moveTo(e.x - e.width / 2, i[2]), t.rect(e.x - e.width / 2, i[2], e.width, i[1] - i[2]), t.moveTo(e.x, i[1]), t.lineTo(e.x, i[0])
            }, getRect: function (t) {
                if (!t.__rect) {
                    var e = 0;
                    ("stroke" == t.brushType || "fill" == t.brushType) && (e = t.lineWidth || 1);
                    var i = r.clone(t.y).sort(this._numberOrder);
                    t.__rect = {
                        x: Math.round(t.x - t.width / 2 - e / 2),
                        y: Math.round(i[3] - e / 2),
                        width: t.width + e,
                        height: i[0] - i[3] + e
                    }
                }
                return t.__rect
            }, isCover: t("./normalIsCover")
        }, r.inherits(e, i), e
    }), i("echarts/util/shape/Chain", ["require", "zrender/shape/Base", "./Icon", "zrender/shape/util/dashedLineTo", "zrender/tool/util", "zrender/tool/matrix"], function (t) {
        function e(t) {
            i.call(this, t)
        }

        var i = t("zrender/shape/Base"), r = t("./Icon"), o = t("zrender/shape/util/dashedLineTo"), n = t("zrender/tool/util"), s = t("zrender/tool/matrix");
        return e.prototype = {
            type: "chain", brush: function (t, e) {
                var i = this.style;
                e && (i = this.getHighlightStyle(i, this.highlightStyle || {})), t.save(), this.setContext(t, i), this.setTransform(t), t.save(), t.beginPath(), this.buildLinePath(t, i), t.stroke(), t.restore(), this.brushSymbol(t, i), t.restore()
            }, buildLinePath: function (t, e) {
                var i = e.x, r = e.y + 5, n = e.width, s = e.height / 2 - 10;
                if (t.moveTo(i, r), t.lineTo(i, r + s), t.moveTo(i + n, r), t.lineTo(i + n, r + s), t.moveTo(i, r + s / 2), e.lineType && "solid" != e.lineType) {
                    if ("dashed" == e.lineType || "dotted" == e.lineType) {
                        var a = (e.lineWidth || 1) * ("dashed" == e.lineType ? 5 : 1);
                        o(t, i, r + s / 2, i + n, r + s / 2, a)
                    }
                } else t.lineTo(i + n, r + s / 2)
            }, brushSymbol: function (t, e) {
                var i = e.y + e.height / 4;
                t.save();
                for (var o, n = e.chainPoint, s = 0, a = n.length; a > s; s++) {
                    if (o = n[s], "none" != o.symbol) {
                        t.beginPath();
                        var h = o.symbolSize;
                        r.prototype.buildPath(t, {
                            iconType: o.symbol,
                            x: o.x - h,
                            y: i - h,
                            width: 2 * h,
                            height: 2 * h,
                            n: o.n
                        }), t.fillStyle = o.isEmpty ? "#fff" : e.strokeColor, t.closePath(), t.fill(), t.stroke()
                    }
                    o.showLabel && (t.font = o.textFont, t.fillStyle = o.textColor, t.textAlign = o.textAlign, t.textBaseline = o.textBaseline, o.rotation ? (t.save(), this._updateTextTransform(t, o.rotation), t.fillText(o.name, o.textX, o.textY), t.restore()) : t.fillText(o.name, o.textX, o.textY))
                }
                t.restore()
            }, _updateTextTransform: function (t, e) {
                var i = s.create();
                if (s.identity(i), 0 !== e[0]) {
                    var r = e[1] || 0, o = e[2] || 0;
                    (r || o) && s.translate(i, i, [-r, -o]), s.rotate(i, i, e[0]), (r || o) && s.translate(i, i, [r, o])
                }
                t.transform.apply(t, i)
            }, isCover: function (t, e) {
                var i = this.style;
                return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height ? !0 : !1
            }
        }, n.inherits(e, i), e
    }), i("zrender", ["zrender/zrender"], function (t) {
        return t
    }), i("echarts", ["echarts/echarts"], function (t) {
        return t
    });
    var r = e("zrender");
    r.tool = {
        color: e("zrender/tool/color"),
        math: e("zrender/tool/math"),
        util: e("zrender/tool/util"),
        vector: e("zrender/tool/vector"),
        area: e("zrender/tool/area"),
        event: e("zrender/tool/event")
    }, r.animation = {
        Animation: e("zrender/animation/Animation"),
        Cip: e("zrender/animation/Clip"),
        easing: e("zrender/animation/easing")
    };
    var o = e("echarts");
    o.config = e("echarts/config"), e("echarts/chart/pie"), t.echarts = o, t.zrender = r
}(window);