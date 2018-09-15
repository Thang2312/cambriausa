/* jquery-multifile v2.2.1 @ 2015-05-07 09:05:57 */
window.jQuery && function(a) {
    "use strict";

    function b(a) {
        return a > 1048576 ? (a / 1048576).toFixed(1) + "Mb" : 1024 == a ? "1Mb" : (a / 1024).toFixed(1) + "Kb"
    }

    function c(a) {
        return (a.files && a.files.length ? a.files : null) || [{
            name: a.value,
            size: 0,
            type: ((a.value || "").match(/[^\.]+$/i) || [""])[0]
        }]
    }
    a.fn.MultiFile = function(d) {
        if (0 == this.length) return this;
        if ("string" == typeof arguments[0]) {
            if (this.length > 1) {
                var e = arguments;
                return this.each(function() {
                    a.fn.MultiFile.apply(a(this), e)
                })
            }
            return a.fn.MultiFile[arguments[0]].apply(this, a.makeArray(arguments).slice(1) || [])
        }
        "number" == typeof d && (d = {
            max: d
        });
        var d = a.extend({}, a.fn.MultiFile.options, d || {});
        a("form").not("MultiFile-intercepted").addClass("MultiFile-intercepted").submit(a.fn.MultiFile.disableEmpty),
            a.fn.MultiFile.options.autoIntercept && (a.fn.MultiFile.intercept(a.fn.MultiFile.options.autoIntercept), a.fn.MultiFile.options.autoIntercept = null), this.not(
                ".MultiFile-applied").addClass("MultiFile-applied").each(function() {
                window.MultiFile = (window.MultiFile || 0) + 1;
                var e = window.MultiFile,
                    f = {
                        e: this,
                        E: a(this),
                        clone: a(this).clone()
                    },
                    g = a.extend({}, a.fn.MultiFile.options, d || {}, (a.metadata ? f.E.metadata() : a.meta ? f.E.data() : null) || {}, {});
                g.max > 0 || (g.max = f.E.attr("maxlength")), g.max > 0 || (g.max = (String(f.e.className.match(/\b(max|limit)\-([0-9]+)\b/gi) || [""]).match(/[0-9]+/gi) || [""])[0], g.max =
                        g.max > 0 ? String(g.max).match(/[0-9]+/gi)[0] : -1), g.max = new Number(g.max), g.accept = g.accept || f.E.attr("accept") || "", g.accept || (g.accept = f.e.className
                        .match(/\b(accept\-[\w\|]+)\b/gi) || "", g.accept = new String(g.accept).replace(/^(accept|ext)\-/i, "")), g.maxsize = g.maxsize > 0 ? g.maxsize : null || f.E.data(
                        "maxsize") || 0, g.maxsize > 0 || (g.maxsize = (String(f.e.className.match(/\b(maxsize|maxload|size)\-([0-9]+)\b/gi) || [""]).match(/[0-9]+/gi) || [""])[0], g.maxsize =
                        g.maxsize > 0 ? String(g.maxsize).match(/[0-9]+/gi)[0] : -1), g.maxfile = g.maxfile > 0 ? g.maxfile : null || f.E.data("maxfile") || 0, g.maxfile > 0 || (g.maxfile =
                        (String(f.e.className.match(/\b(maxfile|filemax)\-([0-9]+)\b/gi) || [""]).match(/[0-9]+/gi) || [""])[0], g.maxfile = g.maxfile > 0 ? String(g.maxfile).match(
                            /[0-9]+/gi)[0] : -1), g.maxfile > 1 && (g.maxfile = 1024 * g.maxfile), g.maxsize > 1 && (g.maxsize = 1024 * g.maxsize), g.max > 1 && f.E.attr("multiple",
                        "multiple").prop("multiple", !0), a.extend(f, g || {}), f.STRING = a.extend({}, a.fn.MultiFile.options.STRING, f.STRING), a.extend(f, {
                        n: 0,
                        slaves: [],
                        files: [],
                        instanceKey: f.e.id || "MultiFile" + String(e),
                        generateID: function(a) {
                            return f.instanceKey + (a > 0 ? "_F" + String(a) : "")
                        },
                        trigger: function(b, d, e, f) {
                            var g, h = e[b] || e["on" + b];
                            return h ? (f = f || e.files || c(this), a.each(f, function(a, b) {
                                g = h.apply(e.wrapper, [
                                    d,
                                    b.name,
                                    e,
                                    b
                                ])
                            }), g) : void 0
                        }
                    }), String(f.accept).length > 1 && (f.accept = f.accept.replace(/\W+/g, "|").replace(/^\W|\W$/g, ""), f.rxAccept = new RegExp("\\.(" + (f.accept ? f.accept : "") +
                        ")$", "gi")), f.wrapID = f.instanceKey,
                    f.E.wrap('<div class="MultiFile-wrap" id="' + f.wrapID + '"></div>'), f.wrapper = a("#" + f.wrapID), f.e.name = f.e.name || "file" + e + "[]", f.list || (f.wrapper.append(
                        '<div class="MultiFile-list cf" id="' + f.wrapID + '_list"></div>'), f.list = a("#" + f.wrapID + "_list")), f.list = a(f.list), f.addSlave = function(d, g) {
                        f.n++, d.MultiFile = f, d.id = d.name = "",
                            d.id = f.generateID(g), d.name = String(f.namePattern.replace(/\$name/gi, a(f.clone).attr("name")).replace(/\$id/gi, a(f.clone).attr("id")).replace(/\$g/gi, e)
                                .replace(/\$i/gi, g));
                        var h;
                        f.max > 0 && f.files.length > f.max && (d.disabled = !0, h = !0), f.current = d, d = a(d),
                            d.val("").attr("value", "")[0].value = "", d.addClass("MultiFile-applied"), d.change(function() {
                                a(this).blur();
                                var e = this,
                                    h = f.files || [],
                                    i = this.files || [{
                                        name: this.value,
                                        size: 0,
                                        type: ((this.value || "").match(/[^\.]+$/i) || [""])[0]
                                    }],
                                    j = [],
                                    k = 0,
                                    l = f.total_size || 0,
                                    m = [];
                                a.each(i, function(a, b) {
                                        j[j.length] = b
                                    }), f.trigger("FileSelect", this, f, j), a.each(i, function(d, g) {
                                        var h = g.name,
                                            i = g.size,
                                            j = function(a) {
                                                return a.replace("$ext", String(h.match(/[^\.]+$/i) || "")).replace("$file", h.match(/[^\/\\]+$/gi)).replace("$size", b(i) + " > " +
                                                    b(f.maxfile))
                                            };
                                        f.accept && h && !h.match(f.rxAccept) && (m[m.length] = j(f.STRING.denied), f.trigger("FileInvalid", this, f, [
                                            g
                                        ])), a(f.wrapper).find("input[type=file]").not(e).each(function() {
                                            a.each(c(this), function(a, b) {
                                                if (b.name) {
                                                    var c = (b.name || "").replace(/^C:\\fakepath\\/gi, "");
                                                    (h == c || h == c.substr(c.length - h.length)) && (m[m.length] = j(f.STRING.duplicate), f.trigger(
                                                        "FileDuplicate", e, f, [
                                                            b
                                                        ]))
                                                }
                                            })
                                        }), f.maxfile > 0 && i > 0 && i > f.maxfile && (m[m.length] = j(f.STRING.toobig), f.trigger("FileTooBig", this, f, [
                                            g
                                        ]));
                                        var l = f.trigger("FileValidate", this, f, [g]);
                                        l && "" != l && (m[m.length] = j(l)), k += g.size
                                    }), l += k, j.size = k,
                                    j.total = l, j.total_length = j.length + h.length, f.max > 0 && h.length + i.length > f.max && (m[m.length] = f.STRING.toomany.replace("$max", f.max),
                                        f.trigger("FileTooMany", this, f, j)), f.maxsize > 0 && l > f.maxsize && (m[m.length] = f.STRING.toomuch.replace("$size", b(l) + " > " + b(f.maxsize)),
                                        f.trigger("FileTooMuch", this, f, j));
                                var n = a(f.clone).clone();
                                return n.addClass("MultiFile"),
                                    m.length > 0 ? (f.error(m.join("\n\n")), f.n--, f.addSlave(n[0], g), d.parent().prepend(n), d.remove(), !1) : (f.total_size = l, i = h.concat(j), i
                                        .size = l, i.size_label = b(l), f.files = i, a(this).css({
                                            position: "absolute",
                                            top: "-3000px"
                                        }), d.after(n), f.addSlave(n[0], g + 1), f.addToList(this, g, j), f.trigger("afterFileSelect", this, f, j), void 0)
                            }), a(d).data("MultiFile-wrap", f.wrapper),
                            a(f.wrapper).data("MultiFile", f), h && a(d).attr("disabled", "disabled").prop("disabled", !0)
                    }, f.addToList = function(d, e, g) {
                        f.trigger("FileAppend", d, f, g);
                        var h = a("<span class='group'/>");
                        a.each(g, function(c, e) {
                            var g = String(e.name || ""),
                                i = f.STRING,
                                j = i.label || i.file || i.name,
                                k = i.title || i.tooltip || i.selected,
                                l = '<img class="MultiFile-preview" style="' + f.previewCss + '"/>',
                                m = a(('<span class="MultiFile-label-2" title="' + k + '">' + (f.preview || a(d).is(".with-preview") ?
                                    l : "") + "</span>" + '<span class="MultiFile-title">' + j + "</span>").replace(/\$(file|name)/gi, (g.match(/[^\/\\]+$/gi) || [g])[0]).replace(/\$(ext|extension|type)/gi, (g.match(
                                    /[^\.]+$/gi) || [""])[0]).replace(/\$(size)/gi, b(e.size || 0)).replace(/\$(preview)/gi, l).replace(/\$(i)/gi, c));
                            m.find("img.MultiFile-preview").each(function() {
                                    var a = this,
                                        b = new FileReader;
                                    b.readAsDataURL(e),
                                        b.onload = function(b) {
                                            a.src = b.target.result
                                        }
                                }), c > 1 && h.append(""),
                                h.append(m);
                            var g = String(e.name || "");
                            h[h.length] = ('<span class="MultiFile-title" title="' + f.STRING.selected + '">' + f.STRING.file + "</span>").replace(/\$(file|name)/gi, (g.match(
                                /[^\/\\]+$/gi) || [
                                g
                            ])[0]).replace(/\$(ext|extension|type)/gi, (g.match(/[^\.]+$/gi) || [""])[0]).replace(/\$(size)/gi, b(e.size || 0)).replace(/\$(i)/gi, c)
                        });
                        var i = a('<div class="MultiFile-label"></div>'),
                            j = a('<a class="MultiFile-remove" href="#' + f.wrapID + '">' + f.STRING.remove + "</a>").click(function() {
                                var e = c(d);
                                f.trigger("FileRemove", d, f, e),
                                    f.n--, f.current.disabled = !1, a(d).remove(), a(this).parent().remove(), a(f.current).css({
                                        position: "",
                                        top: ""
                                    }), a(f.current).reset().val("").attr("value", "")[0].value = "";
                                var g = [],
                                    h = 0;
                                return a(f.wrapper).find("input[type=file]").each(function() {
                                    a.each(c(this), function(a, b) {
                                        b.name && (g[g.length] = b, h += b.size)
                                    })
                                }), f.files = g, f.total_size = h, f.size_label = b(h), a(f.wrapper).data("MultiFile", f), f.trigger("afterFileRemove", d, f, e), f.trigger(
                                    "FileChange", f.current, f, g), !1
                            });
                        f.list.append(i.append(j, " ", h)), f.trigger("afterFileAppend", d, f, g), f.trigger("FileChange", d, f, f.files)
                    }, f.MultiFile || f.addSlave(f.e, 0), f.n++
            })
    }, a.extend(a.fn.MultiFile, {
        data: function() {
            var b = a(this),
                c = b.is(".MultiFile-wrap"),
                d = c ? b : b.data("MultiFile-wrap");
            if (!d || !d.length) return !console.error("Could not find MultiFile control wrapper");
            var e = d.data("MultiFile");
            return e ? e || {} : !console.error("Could not find MultiFile data in wrapper")
        },
        reset: function() {
            var b = this.MultiFile("data");
            return b && a(b.list).find("a.MultiFile-remove").click(),
                a(this)
        },
        files: function() {
            var a = this.MultiFile("data");
            return a ? a.files || [] : !console.log("MultiFile plugin not initialized")
        },
        size: function() {
            var a = this.MultiFile("data");
            return a ? a.total_size || 0 : !console.log("MultiFile plugin not initialized")
        },
        count: function() {
            var a = this.MultiFile("data");
            return a ? a.files ? a.files.length || 0 : 0 : !console.log("MultiFile plugin not initialized")
        },
        disableEmpty: function(b) {
            b = ("string" == typeof b ? b : "") || "mfD";
            var c = [];
            return a("input:file.MultiFile").each(function() {
                    "" == a(this).val() && (c[c.length] = this)
                }), window.clearTimeout(a.fn.MultiFile.reEnableTimeout),
                a.fn.MultiFile.reEnableTimeout = window.setTimeout(a.fn.MultiFile.reEnableEmpty, 500), a(c).each(function() {
                    this.disabled = !0
                }).addClass(b)
        },
        reEnableEmpty: function(b) {
            return b = ("string" == typeof b ? b : "") || "mfD",
                a("input:file." + b).removeClass(b).each(function() {
                    this.disabled = !1
                })
        },
        intercepted: {},
        intercept: function(b, c, d) {
            var e, f;
            if (d = d || [], d.constructor.toString().indexOf("Array") < 0 && (d = [d]), "function" == typeof b) return a.fn.MultiFile.disableEmpty(),
                f = b.apply(c || window, d), setTimeout(function() {
                    a.fn.MultiFile.reEnableEmpty()
                }, 1e3), f;
            b.constructor.toString().indexOf("Array") < 0 && (b = [
                b
            ]);
            for (var g = 0; g < b.length; g++) e = b[g] + "", e && function(b) {
                a.fn.MultiFile.intercepted[b] = a.fn[b] || function() {}, a.fn[b] = function() {
                    return a.fn.MultiFile.disableEmpty(),
                        f = a.fn.MultiFile.intercepted[b].apply(this, arguments),
                        setTimeout(function() {
                            a.fn.MultiFile.reEnableEmpty()
                        }, 1e3), f
                }
            }(e)
        }
    }), a.fn.MultiFile.options = {
        accept: "",
        max: -1,
        maxfile: -1,
        maxsize: -1,
        namePattern: "$name",
        preview: !1,
        previewCss: "max-height:100px; max-width:100px;",
        STRING: {
            remove: "x",
            denied: "You cannot select a $ext file.\nTry again...",
            file: "$file",
            selected: "File selected: $file",
            duplicate: "This file has already been selected:\n$file",
            toomuch: "The files selected exceed the maximum size permited ($size)",
            toomany: "Too many files selected (max: $max)",
            toobig: "$file is too big (max $size)"
        },
        autoIntercept: ["submit", "ajaxSubmit", "ajaxForm", "validate", "valid"],
        error: function(a) {
            "undefined" != typeof console && console.log(a), alert(a)
        }
    }, a.fn.reset = a.fn.reset || function() {
        return this.each(function() {
            try {
                this.reset()
            } catch (a) {}
        })
    }, a(function() {
        a("input[type=file].multi").MultiFile()
    })
}(jQuery);