if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (b && "click" == b.type && /input|textarea/i.test(b.target.tagName) && a.contains(e[0], b.target) || (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery), window.Modernizr = function(a, b, c) {
        function d(a) {
            o.cssText = a
        }

        function e(a, b) {
            return typeof a === b
        }
        var f, g, h, i = "2.8.2",
            j = {},
            k = !0,
            l = b.documentElement,
            m = "modernizr",
            n = b.createElement(m),
            o = n.style,
            p = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            q = {},
            r = [],
            s = r.slice,
            t = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    n = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : m + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', m, '">', a, "</style>"].join(""), j.id = m, (k ? j : n).innerHTML += f, n.appendChild(j), k || (n.style.background = "", n.style.overflow = "hidden", i = l.style.overflow, l.style.overflow = "hidden", l.appendChild(n)), g = c(j, a), k ? j.parentNode.removeChild(j) : (n.parentNode.removeChild(n), l.style.overflow = i), !!g
            },
            u = {}.hasOwnProperty;
        h = e(u, "undefined") || e(u.call, "undefined") ? function(a, b) {
            return b in a && e(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return u.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = s.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(s.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(s.call(arguments)))
                };
            return d
        }), q.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : t(["@media (", p.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        };
        for (var v in q) h(q, v) && (g = v.toLowerCase(), j[g] = q[v](), r.push((j[g] ? "" : "no-") + g));
        return j.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) h(a, d) && j.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), j[a] !== c) return j;
                    b = "function" == typeof b ? b() : b, "undefined" != typeof k && k && (l.className += " " + (b ? "" : "no-") + a), j[a] = b
                }
                return j
            }, d(""), n = f = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function d() {
                    var a = s.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function e(a) {
                    var b = r[a[p]];
                    return b || (b = {}, q++, a[p] = q, r[q] = b), b
                }

                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
                }

                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
                    return f
                }

                function h(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return s.shivMethods ? f(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(s, b.frag)
                }

                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return !s.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a
                }
                var j, k, l = "3.7.0",
                    m = a.html5 || {},
                    n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    p = "_html5shiv",
                    q = 0,
                    r = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                        }()
                    } catch (c) {
                        j = !0, k = !0
                    }
                }();
                var s = {
                    elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: l,
                    shivCSS: m.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: m.shivMethods !== !1,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = s, i(b)
            }(this, b), j._version = i, j._prefixes = p, j.testStyles = t, l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (k ? " js " + r.join(" ") : ""), j
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == q.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = r.shift();
            s = 1, a ? a.t ? o(function() {
                ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : s = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && o(function() {
                        v.removeChild(l)
                    }, 50);
                    for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload()
                }
            }
            var j = j || m.errorTimeout,
                l = b.createElement(a),
                n = 0,
                q = 0,
                t = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, q)
            }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
        }

        function j(a, b, c, d, f) {
            return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
        }

        function k() {
            var a = m;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var l, m, n = b.documentElement,
            o = a.setTimeout,
            p = b.getElementsByTagName("script")[0],
            q = {}.toString,
            r = [],
            s = 0,
            t = "MozAppearance" in n.style,
            u = t && !!b.createRange().compareNode,
            v = u ? n : p.parentNode,
            n = a.opera && "[object Opera]" == q.call(a.opera),
            n = !!b.attachEvent && !n,
            w = t ? "object" : n ? "script" : "img",
            x = n ? "script" : w,
            y = Array.isArray || function(a) {
                return "[object Array]" == q.call(a)
            },
            z = [],
            A = {},
            B = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            };
        m = function(a) {
            function b(a) {
                var b, c, d, a = a.split("!"),
                    e = z.length,
                    f = a.pop(),
                    g = a.length,
                    f = {
                        url: f,
                        origUrl: f,
                        prefixes: a
                    };
                for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
                for (c = 0; e > c; c++) f = z[c](f);
                return f
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2
                })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a), n()
                        }), g(a, l, b, 0, j);
                        else if (Object(a) === a)
                            for (i in h = function() {
                                    var b, c = 0;
                                    for (b in a) a.hasOwnProperty(b) && c++;
                                    return c
                                }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                                var a = [].slice.call(arguments);
                                m.apply(this, a), n()
                            } : l[i] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), n()
                                }
                            }(m[i])), g(a[i], l, b, i, j))
                    } else !c && n()
                }
                var h, i, j = !!a.test,
                    k = a.load || a.both,
                    l = a.callback || f,
                    m = l,
                    n = a.complete || f;
                c(j ? a.yep : a.nope, !!k), k && c(k)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (y(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, m.addPrefix = function(a, b) {
            B[a] = b
        }, m.addFilter = function(a) {
            z.push(a)
        }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function() {
            b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k, l, n = b.createElement("script"),
                e = e || m.errorTimeout;
            n.src = a;
            for (l in d) n.setAttribute(l, d[l]);
            c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
                !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
            }, o(function() {
                k || (k = 1, c(1))
            }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var j, e = b.createElement("link"),
                c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (p.parentNode.insertBefore(e, p), o(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, ! function(a, b, c) {
        "object" == typeof module && module && "object" == typeof module.exports ? module.exports = c : (a[b] = c, "function" == typeof define && define.amd && define(b, [], function() {
            return c
        }))
    }(this, "jRespond", function(a, b, c) {
        "use strict";
        return function(a) {
            var b = [],
                d = [],
                e = a,
                f = "",
                g = "",
                h = 0,
                i = 100,
                j = 500,
                k = j,
                l = function() {
                    var a = 0;
                    return a = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
                },
                m = function(a) {
                    if (a.length === c) n(a);
                    else
                        for (var b = 0; b < a.length; b++) n(a[b])
                },
                n = function(a) {
                    var e = a.breakpoint,
                        h = a.enter || c;
                    b.push(a), d.push(!1), q(e) && (h !== c && h.call(null, {
                        entering: f,
                        exiting: g
                    }), d[b.length - 1] = !0)
                },
                o = function() {
                    for (var a = [], e = [], h = 0; h < b.length; h++) {
                        var i = b[h].breakpoint,
                            j = b[h].enter || c,
                            k = b[h].exit || c;
                        "*" === i ? (j !== c && a.push(j), k !== c && e.push(k)) : q(i) ? (j === c || d[h] || a.push(j), d[h] = !0) : (k !== c && d[h] && e.push(k), d[h] = !1)
                    }
                    for (var l = {
                            entering: f,
                            exiting: g
                        }, m = 0; m < e.length; m++) e[m].call(null, l);
                    for (var n = 0; n < a.length; n++) a[n].call(null, l)
                },
                p = function(a) {
                    for (var b = !1, c = 0; c < e.length; c++)
                        if (a >= e[c].enter && a <= e[c].exit) {
                            b = !0;
                            break
                        }
                    b && f !== e[c].label ? (g = f, f = e[c].label, o()) : b || "" === f || (f = "", o())
                },
                q = function(a) {
                    if ("object" == typeof a) {
                        if (a.join().indexOf(f) >= 0) return !0
                    } else {
                        if ("*" === a) return !0;
                        if ("string" == typeof a && f === a) return !0
                    }
                },
                r = function() {
                    var a = l();
                    a !== h ? (k = i, p(a)) : k = j, h = a, setTimeout(r, k)
                };
            return r(), {
                addFunc: function(a) {
                    m(a)
                },
                getBreakpoint: function() {
                    return f
                }
            }
        }
    }(this, this.document)),
    function(a) {
        jQuery.fn.extend({
            slimScroll: function(b) {
                var c = a.extend({
                    width: "auto",
                    height: "250px",
                    size: "7px",
                    color: "#000",
                    position: "right",
                    distance: "1px",
                    start: "top",
                    opacity: .4,
                    alwaysVisible: !1,
                    disableFadeOut: !1,
                    railVisible: !1,
                    railColor: "#333",
                    railOpacity: .2,
                    railDraggable: !0,
                    railClass: "slimScrollRail",
                    barClass: "slimScrollBar",
                    wrapperClass: "slimScrollDiv",
                    allowPageScroll: !1,
                    wheelStep: 20,
                    touchScrollStep: 200,
                    borderRadius: "7px",
                    railBorderRadius: "7px"
                }, b);
                return this.each(function() {
                    function d(b) {
                        if (j) {
                            b = b || window.event;
                            var d = 0;
                            b.wheelDelta && (d = -b.wheelDelta / 120), b.detail && (d = b.detail / 3), a(b.target || b.srcTarget || b.srcElement).closest("." + c.wrapperClass).is(u.parent()) && e(d, !0), b.preventDefault && !s && b.preventDefault(), s || (b.returnValue = !1)
                        }
                    }

                    function e(a, b, d) {
                        s = !1;
                        var e = a,
                            f = u.outerHeight() - w.outerHeight();
                        b && (e = parseInt(w.css("top")) + a * parseInt(c.wheelStep) / 100 * w.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), w.css({
                            top: e + "px"
                        })), p = parseInt(w.css("top")) / (u.outerHeight() - w.outerHeight()), e = p * (u[0].scrollHeight - u.outerHeight()), d && (e = a, a = e / u[0].scrollHeight * u.outerHeight(), a = Math.min(Math.max(a, 0), f), w.css({
                            top: a + "px"
                        })), u.scrollTop(e), u.trigger("slimscrolling", ~~e), h(), i()
                    }

                    function f() {
                        window.addEventListener ? (this.addEventListener("DOMMouseScroll", d, !1), this.addEventListener("mousewheel", d, !1), this.addEventListener("MozMousePixelScroll", null, !1)) : document.attachEvent("onmousewheel", d)
                    }

                    function g() {
                        o = Math.max(u.outerHeight() / u[0].scrollHeight * u.outerHeight(), r), w.css({
                            height: o + "px"
                        });
                        var a = o == u.outerHeight() ? "none" : "block";
                        w.css({
                            display: a
                        })
                    }

                    function h() {
                        g(), clearTimeout(m), p == ~~p ? (s = c.allowPageScroll, q != p && u.trigger("slimscroll", 0 == ~~p ? "top" : "bottom")) : s = !1, q = p, o >= u.outerHeight() ? s = !0 : (w.stop(!0, !0).fadeIn("fast"), c.railVisible && x.stop(!0, !0).fadeIn("fast"))
                    }

                    function i() {
                        c.alwaysVisible || (m = setTimeout(function() {
                            c.disableFadeOut && j || k || l || (w.fadeOut("slow"), x.fadeOut("slow"))
                        }, 1e3))
                    }
                    var j, k, l, m, n, o, p, q, r = 30,
                        s = !1,
                        u = a(this);
                    if (u.parent().hasClass(c.wrapperClass)) {
                        var v = u.scrollTop(),
                            w = u.parent().find("." + c.barClass),
                            x = u.parent().find("." + c.railClass);
                        if (g(), a.isPlainObject(b)) {
                            if ("height" in b && "auto" == b.height) {
                                u.parent().css("height", "auto"), u.css("height", "auto");
                                var y = u.parent().parent().height();
                                u.parent().css("height", y), u.css("height", y)
                            }
                            if ("scrollTo" in b) v = parseInt(c.scrollTo);
                            else if ("scrollBy" in b) v += parseInt(c.scrollBy);
                            else if ("destroy" in b) return w.remove(), x.remove(), void u.unwrap();
                            e(v, !1, !0)
                        }
                    } else {
                        c.height = "auto" == c.height ? u.parent().height() : c.height, v = a("<div></div>").addClass(c.wrapperClass).css({
                            position: "relative",
                            overflow: "hidden",
                            width: c.width,
                            height: c.height
                        }), u.css({
                            overflow: "hidden",
                            width: c.width,
                            height: c.height
                        });
                        var x = a("<div></div>").addClass(c.railClass).css({
                                width: c.size,
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                display: c.alwaysVisible && c.railVisible ? "block" : "none",
                                "border-radius": c.railBorderRadius,
                                background: c.railColor,
                                opacity: c.railOpacity,
                                zIndex: 90
                            }),
                            w = a("<div></div>").addClass(c.barClass).css({
                                background: c.color,
                                width: c.size,
                                position: "absolute",
                                top: 0,
                                opacity: c.opacity,
                                display: c.alwaysVisible ? "block" : "none",
                                "border-radius": c.borderRadius,
                                BorderRadius: c.borderRadius,
                                MozBorderRadius: c.borderRadius,
                                WebkitBorderRadius: c.borderRadius,
                                zIndex: 99
                            }),
                            y = "right" == c.position ? {
                                right: c.distance
                            } : {
                                left: c.distance
                            };
                        x.css(y), w.css(y), u.wrap(v), u.parent().append(w), u.parent().append(x), c.railDraggable && w.bind("mousedown", function(b) {
                            var c = a(document);
                            return l = !0, t = parseFloat(w.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
                                currTop = t + a.pageY - pageY, w.css("top", currTop), e(0, w.position().top, !1)
                            }), c.bind("mouseup.slimscroll", function() {
                                l = !1, i(), c.unbind(".slimscroll")
                            }), !1
                        }).bind("selectstart.slimscroll", function(a) {
                            return a.stopPropagation(), a.preventDefault(), !1
                        }), x.hover(function() {
                            h()
                        }, function() {
                            i()
                        }), w.hover(function() {
                            k = !0
                        }, function() {
                            k = !1
                        }), u.hover(function() {
                            j = !0, h(), i()
                        }, function() {
                            j = !1, i()
                        }), u.bind("touchstart", function(a) {
                            a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                        }), u.bind("touchmove", function(a) {
                            s || a.originalEvent.preventDefault(), a.originalEvent.touches.length && (e((n - a.originalEvent.touches[0].pageY) / c.touchScrollStep, !0), n = a.originalEvent.touches[0].pageY)
                        }), g(), "bottom" === c.start ? (w.css({
                            top: u.outerHeight() - w.outerHeight()
                        }), e(0, !0)) : "top" !== c.start && (e(a(c.start).position().top, null, !0), c.alwaysVisible || w.hide()), f()
                    }
                }), this
            }
        }), jQuery.fn.extend({
            slimscroll: jQuery.fn.slimScroll
        })
    }(jQuery),
    function(a) {
        jQuery.fn.extend({
            slimScrollHorizontal: function(b) {
                var c = {
                        wheelStep: 20,
                        height: "auto",
                        width: "250px",
                        size: "7px",
                        color: "#000",
                        position: "bottom",
                        distance: "1px",
                        start: "left",
                        opacity: .4,
                        alwaysVisible: !1,
                        disableFadeOut: !1,
                        railVisible: !1,
                        railColor: "#333",
                        railOpacity: "0.2",
                        railClass: "slimScrollRail",
                        barClass: "slimScrollBar",
                        wrapperClass: "slimScrollDiv",
                        allowPageScroll: !1,
                        scroll: 0,
                        touchScrollStep: 200
                    },
                    d = a.extend(c, b);
                return this.each(function() {
                    function b(a, b, c) {
                        var g = a;
                        if ("auto" == u.css("left") && u.css("left", "0px"), b) {
                            g = parseInt(u.css("left")) + a * parseInt(d.wheelStep) / 100 * u.outerWidth();
                            var h = r.outerWidth() - u.outerWidth();
                            g = Math.min(Math.max(g, 0), h), u.css({
                                left: g + "px"
                            })
                        }
                        if (m = parseInt(u.css("left")) / (r.outerWidth() - u.outerWidth()), g = m * (r[0].scrollWidth - r.outerWidth()), c) {
                            g = a;
                            var i = g / r[0].scrollWidth * r.outerWidth();
                            u.css({
                                left: i + "px"
                            })
                        }
                        r.scrollLeft(g), e(), f()
                    }

                    function c() {
                        l = Math.max(r.outerWidth() / r[0].scrollWidth * r.outerWidth(), p), u.css({
                            width: l + "px"
                        })
                    }

                    function e() {
                        if (c(), clearTimeout(j), m == ~~m && (q = d.allowPageScroll, n != m)) {
                            var a = 0 == ~~m ? "left" : "right";
                            r.trigger("slimscroll", a)
                        }
                        return n = m, l >= r.outerWidth() ? void(q = !0) : (u.stop(!0, !0).fadeIn("fast"), void(d.railVisible && t.stop(!0, !0).fadeIn("fast")))
                    }

                    function f() {
                        d.alwaysVisible || (j = setTimeout(function() {
                            d.disableFadeOut && g || h || i || (u.fadeOut("slow"), t.fadeOut("slow"))
                        }, 1e3))
                    }
                    var g, h, i, j, k, l, m, n, o = "<div></div>",
                        p = 30,
                        q = !1,
                        r = a(this);
                    if (r.parent().hasClass("slimScrollDiv")) return void(scroll && (u = r.parent().find(".slimScrollBar"), t = r.parent().find(".slimScrollRail"), b(r.scrollLeft() + parseInt(scroll), !1, !0)));
                    var s = a(o).addClass(d.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    r.css({
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    var t = a(o).addClass(d.railClass).css({
                            width: "100%",
                            height: d.size,
                            position: "absolute",
                            bottom: 0,
                            display: d.alwaysVisible && d.railVisible ? "block" : "none",
                            "border-radius": d.size,
                            background: d.railColor,
                            opacity: d.railOpacity,
                            zIndex: 90
                        }),
                        u = a(o).addClass(d.barClass).css({
                            background: d.color,
                            height: d.size,
                            position: "absolute",
                            bottom: 0,
                            opacity: d.opacity,
                            display: d.alwaysVisible ? "block" : "none",
                            "border-radius": d.size,
                            BorderRadius: d.size,
                            MozBorderRadius: d.size,
                            WebkitBorderRadius: d.size,
                            zIndex: 99
                        }),
                        v = "top" == d.position ? {
                            top: d.distance
                        } : {
                            bottom: d.distance
                        };
                    t.css(v), u.css(v), r.wrap(s), r.parent().append(u), r.parent().append(t), u.draggable({
                        axis: "x",
                        containment: "parent",
                        start: function() {
                            i = !0
                        },
                        stop: function() {
                            i = !1, f()
                        },
                        drag: function() {
                            b(0, a(this).position().left, !1)
                        }
                    }), t.hover(function() {
                        e()
                    }, function() {
                        f()
                    }), u.hover(function() {
                        h = !0
                    }, function() {
                        h = !1
                    }), r.hover(function() {
                        g = !0, e(), f()
                    }, function() {
                        g = !1, f()
                    }), r.bind("touchstart", function(a) {
                        a.originalEvent.touches.length && (k = a.originalEvent.touches[0].pageX)
                    }), r.bind("touchmove", function(a) {
                        if (a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                            var c = (k - a.originalEvent.touches[0].pageX) / d.touchScrollStep;
                            b(c, !0)
                        }
                    });
                    var w = function(a) {
                            if (g) {
                                var a = a || window.event,
                                    c = 0;
                                a.wheelDelta && (c = -a.wheelDelta / 120), a.detail && (c = a.detail / 3), b(c, !0), a.preventDefault && !q && a.preventDefault(), q || (a.returnValue = !1)
                            }
                        },
                        x = function() {
                            window.addEventListener ? (this.addEventListener("DOMMouseScroll", w, !1), this.addEventListener("mousewheel", w, !1)) : document.attachEvent("onmousewheel", w)
                        };
                    x(), c(), "right" == d.start ? (u.css({
                        left: r.outerWidth() - u.outerWidth()
                    }), b(0, !0)) : "object" == typeof d.start && (b(a(d.start).position().left, null, !0), d.alwaysVisible || u.hide())
                }), this
            }
        }), jQuery.fn.extend({
            slimscrollHorizontal: jQuery.fn.slimScrollHorizontal
        })
    }(jQuery),
    function() {
        "use strict";

        function a(c, d) {
            function e(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }
            var f;
            if (d = d || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = c, this.tapDelay = d.tapDelay || 200, !a.notNeeded(c)) {
                for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++) h[g[i]] = e(h[g[i]], h);
                b && (c.addEventListener("mouseover", this.onMouse, !0), c.addEventListener("mousedown", this.onMouse, !0), c.addEventListener("mouseup", this.onMouse, !0)), c.addEventListener("click", this.onClick, !0), c.addEventListener("touchstart", this.onTouchStart, !1), c.addEventListener("touchmove", this.onTouchMove, !1), c.addEventListener("touchend", this.onTouchEnd, !1), c.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (c.removeEventListener = function(a, b, d) {
                    var e = Node.prototype.removeEventListener;
                    "click" === a ? e.call(c, a, b.hijacked || b, d) : e.call(c, a, b, d)
                }, c.addEventListener = function(a, b, d) {
                    var e = Node.prototype.addEventListener;
                    "click" === a ? e.call(c, a, b.hijacked || (b.hijacked = function(a) {
                        a.propagationStopped || b(a)
                    }), d) : e.call(c, a, b, d)
                }), "function" == typeof c.onclick && (f = c.onclick, c.addEventListener("click", function(a) {
                    f(a)
                }, !1), c.onclick = null)
            }
        }
        var b = navigator.userAgent.indexOf("Android") > 0,
            c = /iP(ad|hone|od)/.test(navigator.userAgent),
            d = c && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            e = c && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
            f = navigator.userAgent.indexOf("BB10") > 0;
        a.prototype.needsClick = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled) return !0;
                    break;
                case "input":
                    if (c && "file" === a.type || a.disabled) return !0;
                    break;
                case "label":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(a.className)
        }, a.prototype.needsFocus = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !b;
                case "input":
                    switch (a.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !a.disabled && !a.readOnly;
                default:
                    return /\bneedsfocus\b/.test(a.className)
            }
        }, a.prototype.sendClick = function(a, b) {
            var c, d;
            document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c)
        }, a.prototype.determineEventType = function(a) {
            return b && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
        }, a.prototype.focus = function(a) {
            var b;
            c && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
        }, a.prototype.updateScrollParent = function(a) {
            var b, c;
            if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
                c = a;
                do {
                    if (c.scrollHeight > c.offsetHeight) {
                        b = c, a.fastClickScrollParent = c;
                        break
                    }
                    c = c.parentElement
                } while (c)
            }
            b && (b.fastClickLastScrollTop = b.scrollTop)
        }, a.prototype.getTargetElementFromEventTarget = function(a) {
            return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
        }, a.prototype.onTouchStart = function(a) {
            var b, e, f;
            if (a.targetTouches.length > 1) return !0;
            if (b = this.getTargetElementFromEventTarget(a.target), e = a.targetTouches[0], c) {
                if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return !0;
                if (!d) {
                    if (e.identifier && e.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
                    this.lastTouchIdentifier = e.identifier, this.updateScrollParent(b)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = e.pageX, this.touchStartY = e.pageY, a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(), !0
        }, a.prototype.touchHasMoved = function(a) {
            var b = a.changedTouches[0],
                c = this.touchBoundary;
            return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
        }, a.prototype.onTouchMove = function(a) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        }, a.prototype.findControl = function(a) {
            return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, a.prototype.onTouchEnd = function(a) {
            var f, g, h, i, j, k = this.targetElement;
            if (!this.trackingClick) return !0;
            if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, g = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, e && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
                if (f = this.findControl(k)) {
                    if (this.focus(k), b) return !1;
                    k = f
                }
            } else if (this.needsFocus(k)) return a.timeStamp - g > 100 || c && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), c && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
            return c && !d && (i = k.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
        }, a.prototype.onTouchCancel = function() {
            this.trackingClick = !1, this.targetElement = null
        }, a.prototype.onMouse = function(a) {
            return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
        }, a.prototype.onClick = function(a) {
            var b;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
        }, a.prototype.destroy = function() {
            var a = this.layer;
            b && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, a.notNeeded = function(a) {
            var c, d, e;
            if ("undefined" == typeof window.ontouchstart) return !0;
            if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!b) return !0;
                if (c = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== c.content.indexOf("user-scalable=no")) return !0;
                    if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (f && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (c = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== c.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === a.style.msTouchAction ? !0 : !1
        }, a.attach = function(b, c) {
            return new a(b, c)
        }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return a
        }) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
    }(), ! function(a) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a(window.Velocity ? window.jQuery : require("jquery")) : "function" == typeof define && define.amd ? window.Velocity ? define(a) : define(["jquery"], a) : a(window.jQuery)
    }(function(a) {
        return function(b, c, d, e) {
            function f(a) {
                for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                    var e = a[b];
                    e && d.push(e)
                }
                return d
            }

            function g(a) {
                return q.isNode(a) ? [a] : a
            }

            function h(a) {
                var b = n.data(a, "velocity");
                return null === b ? e : b
            }

            function i(a) {
                return function(b) {
                    return Math.round(b * a) * (1 / a)
                }
            }

            function j(a, b, d, e) {
                function f(a, b) {
                    return 1 - 3 * b + 3 * a
                }

                function g(a, b) {
                    return 3 * b - 6 * a
                }

                function h(a) {
                    return 3 * a
                }

                function i(a, b, c) {
                    return ((f(b, c) * a + g(b, c)) * a + h(b)) * a
                }

                function j(a, b, c) {
                    return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b)
                }

                function k(b, c) {
                    for (var e = 0; p > e; ++e) {
                        var f = j(c, a, d);
                        if (0 === f) return c;
                        var g = i(c, a, d) - b;
                        c -= g / f
                    }
                    return c
                }

                function l() {
                    for (var b = 0; t > b; ++b) x[b] = i(b * u, a, d)
                }

                function m(b, c, e) {
                    var f, g, h = 0;
                    do g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g; while (Math.abs(f) > r && ++h < s);
                    return g
                }

                function n(b) {
                    for (var c = 0, e = 1, f = t - 1; e != f && x[e] <= b; ++e) c += u;
                    --e;
                    var g = (b - x[e]) / (x[e + 1] - x[e]),
                        h = c + g * u,
                        i = j(h, a, d);
                    return i >= q ? k(b, h) : 0 == i ? h : m(b, c, c + u)
                }

                function o() {
                    y = !0, (a != b || d != e) && l()
                }
                var p = 4,
                    q = .001,
                    r = 1e-7,
                    s = 10,
                    t = 11,
                    u = 1 / (t - 1),
                    v = "Float32Array" in c;
                if (4 !== arguments.length) return !1;
                for (var w = 0; 4 > w; ++w)
                    if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
                a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
                var x = v ? new Float32Array(t) : new Array(t),
                    y = !1,
                    z = function(c) {
                        return y || o(), a === b && d === e ? c : 0 === c ? 0 : 1 === c ? 1 : i(n(c), b, e)
                    };
                z.getControlPoints = function() {
                    return [{
                        x: a,
                        y: b
                    }, {
                        x: d,
                        y: e
                    }]
                };
                var A = "generateBezier(" + [a, b, d, e] + ")";
                return z.toString = function() {
                    return A
                }, z
            }

            function k(a, b) {
                var c = a;
                return q.isString(a) ? t.Easings[a] || (c = !1) : c = q.isArray(a) && 1 === a.length ? i.apply(null, a) : q.isArray(a) && 2 === a.length ? u.apply(null, a.concat([b])) : q.isArray(a) && 4 === a.length ? j.apply(null, a) : !1, c === !1 && (c = t.Easings[t.defaults.easing] ? t.defaults.easing : s), c
            }

            function l(a) {
                if (a)
                    for (var b = (new Date).getTime(), c = 0, d = t.State.calls.length; d > c; c++)
                        if (t.State.calls[c]) {
                            var f = t.State.calls[c],
                                g = f[0],
                                i = f[2],
                                j = f[3];
                            j || (j = t.State.calls[c][3] = b - 16);
                            for (var k = Math.min((b - j) / i.duration, 1), n = 0, p = g.length; p > n; n++) {
                                var r = g[n],
                                    s = r.element;
                                if (h(s)) {
                                    var u = !1;
                                    i.display !== e && null !== i.display && "none" !== i.display && ("flex" === i.display && v.setPropertyValue(s, "display", (o ? "-ms-" : "-webkit-") + i.display), v.setPropertyValue(s, "display", i.display)), i.visibility && "hidden" !== i.visibility && v.setPropertyValue(s, "visibility", i.visibility);
                                    for (var w in r)
                                        if ("element" !== w) {
                                            var y, z = r[w],
                                                A = q.isString(z.easing) ? t.Easings[z.easing] : z.easing;
                                            if (y = 1 === k ? z.endValue : z.startValue + (z.endValue - z.startValue) * A(k), z.currentValue = y, v.Hooks.registered[w]) {
                                                var B = v.Hooks.getRoot(w),
                                                    C = h(s).rootPropertyValueCache[B];
                                                C && (z.rootPropertyValue = C)
                                            }
                                            var D = v.setPropertyValue(s, w, z.currentValue + (0 === parseFloat(y) ? "" : z.unitType), z.rootPropertyValue, z.scrollData);
                                            v.Hooks.registered[w] && (h(s).rootPropertyValueCache[B] = v.Normalizations.registered[B] ? v.Normalizations.registered[B]("extract", null, D[1]) : D[1]), "transform" === D[0] && (u = !0)
                                        }
                                    i.mobileHA && h(s).transformCache.translate3d === e && (h(s).transformCache.translate3d = "(0px, 0px, 0px)", u = !0), u && v.flushTransformCache(s)
                                }
                            }
                            i.display !== e && "none" !== i.display && (t.State.calls[c][2].display = !1), i.visibility && "hidden" !== i.visibility && (t.State.calls[c][2].visibility = !1), i.progress && i.progress.call(f[1], f[1], k, Math.max(0, j + i.duration - b), j), 1 === k && m(c)
                        }
                t.State.isTicking && x(l)
            }

            function m(a, b) {
                if (!t.State.calls[a]) return !1;
                for (var c = t.State.calls[a][0], d = t.State.calls[a][1], f = t.State.calls[a][2], g = t.State.calls[a][4], i = !1, j = 0, k = c.length; k > j; j++) {
                    var l = c[j].element;
                    if (b || f.loop || ("none" === f.display && v.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && v.setPropertyValue(l, "visibility", f.visibility)), (n.queue(l)[1] === e || !/\.velocityQueueEntryFlag/i.test(n.queue(l)[1])) && h(l)) {
                        h(l).isAnimating = !1, h(l).rootPropertyValueCache = {};
                        var m = !1;
                        n.each(v.Lists.transforms3D, function(a, b) {
                            var c = /^scale/.test(b) ? 1 : 0,
                                d = h(l).transformCache[b];
                            h(l).transformCache[b] !== e && new RegExp("^\\(" + c + "[^.]").test(d) && (m = !0, delete h(l).transformCache[b])
                        }), f.mobileHA && (m = !0, delete h(l).transformCache.translate3d), m && v.flushTransformCache(l), v.Values.removeClass(l, "velocity-animating")
                    }
                    if (!b && f.complete && !f.loop && j === k - 1) try {
                        f.complete.call(d, d)
                    } catch (o) {
                        setTimeout(function() {
                            throw o
                        }, 1)
                    }
                    g && f.loop !== !0 && g(d), f.loop !== !0 || b || t(l, "reverse", {
                        loop: !0,
                        delay: f.delay
                    }), f.queue !== !1 && n.dequeue(l, f.queue)
                }
                t.State.calls[a] = !1;
                for (var p = 0, q = t.State.calls.length; q > p; p++)
                    if (t.State.calls[p] !== !1) {
                        i = !0;
                        break
                    }
                i === !1 && (t.State.isTicking = !1, delete t.State.calls, t.State.calls = [])
            }
            var n, o = function() {
                    if (d.documentMode) return d.documentMode;
                    for (var a = 7; a > 4; a--) {
                        var b = d.createElement("div");
                        if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a
                    }
                    return e
                }(),
                p = function() {
                    var a = 0;
                    return c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || function(b) {
                        var c, d = (new Date).getTime();
                        return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function() {
                            b(d + c)
                        }, c)
                    }
                }(),
                q = {
                    isString: function(a) {
                        return "string" == typeof a
                    },
                    isArray: Array.isArray || function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    },
                    isFunction: function(a) {
                        return "[object Function]" === Object.prototype.toString.call(a)
                    },
                    isNode: function(a) {
                        return a && a.nodeType
                    },
                    isNodeList: function(a) {
                        return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== e && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0)
                    },
                    isWrapped: function(a) {
                        return a && (a.jquery || c.Zepto && c.Zepto.zepto.isZ(a))
                    },
                    isSVG: function(a) {
                        return c.SVGElement && a instanceof SVGElement
                    },
                    isEmptyObject: function(a) {
                        var b;
                        for (b in a) return !1;
                        return !0
                    }
                };
            if (a && a.fn !== e ? n = a : c.Velocity && c.Velocity.Utilities && (n = c.Velocity.Utilities), !n) throw new Error("Velocity: Either jQuery or Velocity's jQuery shim must first be loaded.");
            if (b.Velocity !== e && b.Velocity.Utilities == e) throw new Error("Velocity: Namespace is occupied.");
            if (7 >= o) {
                if (a) return void(a.fn.velocity = a.fn.animate);
                throw new Error("Velocity: In IE<=7, Velocity falls back to jQuery, which must first be loaded.")
            }
            if (8 === o && !a) throw new Error("Velocity: In IE8, Velocity requires jQuery proper to be loaded; Velocity's jQuery shim does not work with IE8.");
            var r = 400,
                s = "swing",
                t = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: c.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: d.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: n,
                    Sequences: {},
                    Easings: {},
                    Promise: c.Promise,
                    defaults: {
                        queue: "",
                        duration: r,
                        easing: s,
                        begin: null,
                        complete: null,
                        progress: null,
                        display: e,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(a) {
                        n.data(a, "velocity", {
                            isSVG: q.isSVG(a),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    animate: null,
                    hook: null,
                    mock: !1,
                    version: {
                        major: 0,
                        minor: 11,
                        patch: 9
                    },
                    debug: !1
                };
            c.pageYOffset !== e ? (t.State.scrollAnchor = c, t.State.scrollPropertyLeft = "pageXOffset", t.State.scrollPropertyTop = "pageYOffset") : (t.State.scrollAnchor = d.documentElement || d.body.parentNode || d.body, t.State.scrollPropertyLeft = "scrollLeft", t.State.scrollPropertyTop = "scrollTop");
            var u = function() {
                function a(a) {
                    return -a.tension * a.x - a.friction * a.v
                }

                function b(b, c, d) {
                    var e = {
                        x: b.x + d.dx * c,
                        v: b.v + d.dv * c,
                        tension: b.tension,
                        friction: b.friction
                    };
                    return {
                        dx: e.v,
                        dv: a(e)
                    }
                }

                function c(c, d) {
                    var e = {
                            dx: c.v,
                            dv: a(c)
                        },
                        f = b(c, .5 * d, e),
                        g = b(c, .5 * d, f),
                        h = b(c, d, g),
                        i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
                        j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
                    return c.x = c.x + i * d, c.v = c.v + j * d, c
                }
                return function d(a, b, e) {
                    var f, g, h, i = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        j = [0],
                        k = 0,
                        l = 1e-4,
                        m = .016;
                    for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m; h = c(h || i, g), j.push(1 + h.x), k += 16, Math.abs(h.x) > l && Math.abs(h.v) > l;);
                    return f ? function(a) {
                        return j[a * (j.length - 1) | 0]
                    } : k
                }
            }();
            t.Easings = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                },
                spring: function(a) {
                    return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
                }
            }, n.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function(a, b) {
                t.Easings[b[0]] = j.apply(null, b[1])
            });
            var v = t.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var a = 0; a < v.Lists.colors.length; a++) v.Hooks.templates[v.Lists.colors[a]] = ["Red Green Blue Alpha", "255 255 255 1"];
                        var b, c, d;
                        if (o)
                            for (b in v.Hooks.templates) {
                                c = v.Hooks.templates[b], d = c[0].split(" ");
                                var e = c[1].match(v.RegEx.valueSplit);
                                "Color" === d[0] && (d.push(d.shift()), e.push(e.shift()), v.Hooks.templates[b] = [d.join(" "), e.join(" ")])
                            }
                        for (b in v.Hooks.templates) {
                            c = v.Hooks.templates[b], d = c[0].split(" ");
                            for (var a in d) {
                                var f = b + d[a],
                                    g = a;
                                v.Hooks.registered[f] = [b, g]
                            }
                        }
                    },
                    getRoot: function(a) {
                        var b = v.Hooks.registered[a];
                        return b ? b[0] : a
                    },
                    cleanRootPropertyValue: function(a, b) {
                        return v.RegEx.valueUnwrap.test(b) && (b = b.match(v.Hooks.RegEx.valueUnwrap)[1]), v.Values.isCSSNullValue(b) && (b = v.Hooks.templates[a][1]), b
                    },
                    extractValue: function(a, b) {
                        var c = v.Hooks.registered[a];
                        if (c) {
                            var d = c[0],
                                e = c[1];
                            return b = v.Hooks.cleanRootPropertyValue(d, b), b.toString().match(v.RegEx.valueSplit)[e]
                        }
                        return b
                    },
                    injectValue: function(a, b, c) {
                        var d = v.Hooks.registered[a];
                        if (d) {
                            var e, f, g = d[0],
                                h = d[1];
                            return c = v.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(v.RegEx.valueSplit), e[h] = b, f = e.join(" ")
                        }
                        return c
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(a, b, c) {
                            switch (a) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var d;
                                    return v.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(v.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;
                                case "inject":
                                    return "rect(" + c + ")"
                            }
                        },
                        opacity: function(a, b, c) {
                            if (8 >= o) switch (a) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return c = d ? d[1] / 100 : 1;
                                case "inject":
                                    return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
                            } else switch (a) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                    return c;
                                case "inject":
                                    return c
                            }
                        }
                    },
                    register: function() {
                        9 >= o || t.State.isGingerbread || (v.Lists.transformsBase = v.Lists.transformsBase.concat(v.Lists.transforms3D));
                        for (var a = 0; a < v.Lists.transformsBase.length; a++) ! function() {
                            var b = v.Lists.transformsBase[a];
                            v.Normalizations.registered[b] = function(a, c, d) {
                                switch (a) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return h(c) === e || h(c).transformCache[b] === e ? /^scale/i.test(b) ? 1 : 0 : h(c).transformCache[b].replace(/[()]/g, "");
                                    case "inject":
                                        var f = !1;
                                        switch (b.substr(0, b.length - 1)) {
                                            case "translate":
                                                f = !/(%|px|em|rem|vw|vh|\d)$/i.test(d);
                                                break;
                                            case "scal":
                                            case "scale":
                                                t.State.isAndroid && h(c).transformCache[b] === e && 1 > d && (d = 1), f = !/(\d)$/i.test(d);
                                                break;
                                            case "skew":
                                                f = !/(deg|\d)$/i.test(d);
                                                break;
                                            case "rotate":
                                                f = !/(deg|\d)$/i.test(d)
                                        }
                                        return f || (h(c).transformCache[b] = "(" + d + ")"), h(c).transformCache[b]
                                }
                            }
                        }();
                        for (var a = 0; a < v.Lists.colors.length; a++) ! function() {
                            var b = v.Lists.colors[a];
                            v.Normalizations.registered[b] = function(a, c, d) {
                                switch (a) {
                                    case "name":
                                        return b;
                                    case "extract":
                                        var f;
                                        if (v.RegEx.wrappedValueAlreadyExtracted.test(d)) f = d;
                                        else {
                                            var g, h = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(d) ? g = h[d] !== e ? h[d] : h.black : v.RegEx.isHex.test(d) ? g = "rgb(" + v.Values.hexToRgb(d).join(" ") + ")" : /^rgba?\(/i.test(d) || (g = h.black), f = (g || d).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return 8 >= o || 3 !== f.split(" ").length || (f += " 1"), f;
                                    case "inject":
                                        return 8 >= o ? 4 === d.split(" ").length && (d = d.split(/\s+/).slice(0, 3).join(" ")) : 3 === d.split(" ").length && (d += " 1"), (8 >= o ? "rgb" : "rgba") + "(" + d.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function(a) {
                        return a.replace(/-(\w)/g, function(a, b) {
                            return b.toUpperCase()
                        })
                    },
                    SVGAttribute: function(a) {
                        var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (o || t.State.isAndroid && !t.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a)
                    },
                    prefixCheck: function(a) {
                        if (t.State.prefixMatches[a]) return [t.State.prefixMatches[a], !0];
                        for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; d > c; c++) {
                            var e;
                            if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
                                    return a.toUpperCase()
                                }), q.isString(t.State.prefixElement.style[e])) return t.State.prefixMatches[a] = e, [e, !0]
                        }
                        return [a, !1]
                    }
                },
                Values: {
                    hexToRgb: function(a) {
                        var b, c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return a = a.replace(c, function(a, b, c, d) {
                            return b + b + c + c + d + d
                        }), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(a) {
                        return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
                    },
                    getUnitType: function(a) {
                        return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
                    },
                    getDisplayType: function(a) {
                        var b = a.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : "block"
                    },
                    addClass: function(a, b) {
                        a.classList ? a.classList.add(b) : a.className += (a.className.length ? " " : "") + b
                    },
                    removeClass: function(a, b) {
                        a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(a, b, d, f) {
                    function g(a, b) {
                        function d() {
                            j && v.setPropertyValue(a, "display", "none")
                        }
                        var i = 0;
                        if (8 >= o) i = n.css(a, b);
                        else {
                            var j = !1;
                            if (/^(width|height)$/.test(b) && 0 === v.getPropertyValue(a, "display") && (j = !0, v.setPropertyValue(a, "display", v.Values.getDisplayType(a))), !f) {
                                if ("height" === b && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                    var k = a.offsetHeight - (parseFloat(v.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingBottom")) || 0);
                                    return d(), k
                                }
                                if ("width" === b && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                                    var l = a.offsetWidth - (parseFloat(v.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingRight")) || 0);
                                    return d(), l
                                }
                            }
                            var m;
                            m = h(a) === e ? c.getComputedStyle(a, null) : h(a).computedStyle ? h(a).computedStyle : h(a).computedStyle = c.getComputedStyle(a, null), (o || t.State.isFirefox) && "borderColor" === b && (b = "borderTopColor"), i = 9 === o && "filter" === b ? m.getPropertyValue(b) : m[b], ("" === i || null === i) && (i = a.style[b]), d()
                        }
                        if ("auto" === i && /^(top|right|bottom|left)$/i.test(b)) {
                            var p = g(a, "position");
                            ("fixed" === p || "absolute" === p && /top|left/i.test(b)) && (i = n(a).position()[b] + "px")
                        }
                        return i
                    }
                    var i;
                    if (v.Hooks.registered[b]) {
                        var j = b,
                            k = v.Hooks.getRoot(j);
                        d === e && (d = v.getPropertyValue(a, v.Names.prefixCheck(k)[0])), v.Normalizations.registered[k] && (d = v.Normalizations.registered[k]("extract", a, d)), i = v.Hooks.extractValue(j, d)
                    } else if (v.Normalizations.registered[b]) {
                        var l, m;
                        l = v.Normalizations.registered[b]("name", a), "transform" !== l && (m = g(a, v.Names.prefixCheck(l)[0]), v.Values.isCSSNullValue(m) && v.Hooks.templates[b] && (m = v.Hooks.templates[b][1])), i = v.Normalizations.registered[b]("extract", a, m)
                    }
                    return /^[\d-]/.test(i) || (i = h(a) && h(a).isSVG && v.Names.SVGAttribute(b) ? /^(height|width)$/i.test(b) ? a.getBBox()[b] : a.getAttribute(b) : g(a, v.Names.prefixCheck(b)[0])), v.Values.isCSSNullValue(i) && (i = 0), t.debug >= 2 && console.log("Get " + b + ": " + i), i
                },
                setPropertyValue: function(a, b, d, e, f) {
                    var g = b;
                    if ("scroll" === b) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? c.scrollTo(d, f.alternateValue) : c.scrollTo(f.alternateValue, d);
                    else if (v.Normalizations.registered[b] && "transform" === v.Normalizations.registered[b]("name", a)) v.Normalizations.registered[b]("inject", a, d), g = "transform", d = h(a).transformCache[b];
                    else {
                        if (v.Hooks.registered[b]) {
                            var i = b,
                                j = v.Hooks.getRoot(b);
                            e = e || v.getPropertyValue(a, j), d = v.Hooks.injectValue(i, d, e), b = j
                        }
                        if (v.Normalizations.registered[b] && (d = v.Normalizations.registered[b]("inject", a, d), b = v.Normalizations.registered[b]("name", a)), g = v.Names.prefixCheck(b)[0], 8 >= o) try {
                            a.style[g] = d
                        } catch (k) {
                            t.debug && console.log("Browser does not support [" + d + "] for [" + g + "]")
                        } else h(a) && h(a).isSVG && v.Names.SVGAttribute(b) ? a.setAttribute(b, d) : a.style[g] = d;
                        t.debug >= 2 && console.log("Set " + b + " (" + g + "): " + d)
                    }
                    return [g, d]
                },
                flushTransformCache: function(a) {
                    function b(b) {
                        return parseFloat(v.getPropertyValue(a, b))
                    }
                    var c = "";
                    if ((o || t.State.isAndroid && !t.State.isChrome) && h(a).isSVG) {
                        var d = {
                            translate: [b("translateX"), b("translateY")],
                            skewX: [b("skewX")],
                            skewY: [b("skewY")],
                            scale: 1 !== b("scale") ? [b("scale"), b("scale")] : [b("scaleX"), b("scaleY")],
                            rotate: [b("rotateZ"), 0, 0]
                        };
                        n.each(h(a).transformCache, function(a) {
                            /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), d[a] && (c += a + "(" + d[a].join(" ") + ") ", delete d[a])
                        })
                    } else {
                        var e, f;
                        n.each(h(a).transformCache, function(b) {
                            return e = h(a).transformCache[b], "transformPerspective" === b ? (f = e, !0) : (9 === o && "rotateZ" === b && (b = "rotate"), void(c += b + e + " "))
                        }), f && (c = "perspective" + f + " " + c)
                    }
                    v.setPropertyValue(a, "transform", c)
                }
            };
            v.Hooks.register(), v.Normalizations.register(), t.hook = function(a, b, c) {
                var d = e;
                return q.isWrapped(a) && (a = [].slice.call(a)), n.each(g(a), function(a, f) {
                    if (h(f) === e && t.init(f), c === e) d === e && (d = t.CSS.getPropertyValue(f, b));
                    else {
                        var g = t.CSS.setPropertyValue(f, b, c);
                        "transform" === g[0] && t.CSS.flushTransformCache(f), d = g
                    }
                }), d
            };
            var w = function() {
                function a() {
                    return i ? B.promise || null : j
                }

                function b() {
                    function a() {
                        function a(a, b) {
                            var c = e,
                                d = e,
                                f = e;
                            return q.isArray(a) ? (c = a[0], !q.isArray(a[1]) && /^[\d-]/.test(a[1]) || q.isFunction(a[1]) || v.RegEx.isHex.test(a[1]) ? f = a[1] : (q.isString(a[1]) && !v.RegEx.isHex.test(a[1]) || q.isArray(a[1])) && (d = b ? a[1] : k(a[1], i.duration), a[2] !== e && (f = a[2]))) : c = a, b || (d = d || i.easing), q.isFunction(c) && (c = c.call(g, y, x)), q.isFunction(f) && (f = f.call(g, y, x)), [c || 0, d, f]
                        }

                        function m(a, b) {
                            var c, d;
                            return d = (b || 0).toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                                return c = a, ""
                            }), c || (c = v.Values.getUnitType(a)), [d, c]
                        }

                        function o() {
                            var a = {
                                    myParent: g.parentNode || d.body,
                                    position: v.getPropertyValue(g, "position"),
                                    fontSize: v.getPropertyValue(g, "fontSize")
                                },
                                b = a.position === I.lastPosition && a.myParent === I.lastParent,
                                e = a.fontSize === I.lastFontSize;
                            I.lastParent = a.myParent, I.lastPosition = a.position, I.lastFontSize = a.fontSize;
                            var f = 100,
                                i = {};
                            if (e && b) i.emToPx = I.lastEmToPx, i.percentToPxWidth = I.lastPercentToPxWidth, i.percentToPxHeight = I.lastPercentToPxHeight;
                            else {
                                var j = h(g).isSVG ? d.createElementNS("http://www.w3.org/2000/svg", "rect") : d.createElement("div");
                                t.init(j), a.myParent.appendChild(j), n.each(["overflow", "overflowX", "overflowY"], function(a, b) {
                                    t.CSS.setPropertyValue(j, b, "hidden")
                                }), t.CSS.setPropertyValue(j, "position", a.position), t.CSS.setPropertyValue(j, "fontSize", a.fontSize), t.CSS.setPropertyValue(j, "boxSizing", "content-box"), n.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) {
                                    t.CSS.setPropertyValue(j, b, f + "%")
                                }), t.CSS.setPropertyValue(j, "paddingLeft", f + "em"), i.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(v.getPropertyValue(j, "width", null, !0)) || 1) / f, i.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(v.getPropertyValue(j, "height", null, !0)) || 1) / f, i.emToPx = I.lastEmToPx = (parseFloat(v.getPropertyValue(j, "paddingLeft")) || 1) / f, a.myParent.removeChild(j)
                            }
                            return null === I.remToPx && (I.remToPx = parseFloat(v.getPropertyValue(d.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(c.innerWidth) / 100, I.vhToPx = parseFloat(c.innerHeight) / 100), i.remToPx = I.remToPx, i.vwToPx = I.vwToPx, i.vhToPx = I.vhToPx, t.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(i), g), i
                        }
                        if (i.begin && 0 === y) try {
                            i.begin.call(p, p)
                        } catch (r) {
                            setTimeout(function() {
                                throw r
                            }, 1)
                        }
                        if ("scroll" === C) {
                            var w, z, A, D = /^x$/i.test(i.axis) ? "Left" : "Top",
                                E = parseFloat(i.offset) || 0;
                            i.container ? q.isWrapped(i.container) || q.isNode(i.container) ? (i.container = i.container[0] || i.container, w = i.container["scroll" + D], A = w + n(g).position()[D.toLowerCase()] + E) : i.container = null : (w = t.State.scrollAnchor[t.State["scrollProperty" + D]], z = t.State.scrollAnchor[t.State["scrollProperty" + ("Left" === D ? "Top" : "Left")]], A = n(g).offset()[D.toLowerCase()] + E), j = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: w,
                                    currentValue: w,
                                    endValue: A,
                                    unitType: "",
                                    easing: i.easing,
                                    scrollData: {
                                        container: i.container,
                                        direction: D,
                                        alternateValue: z
                                    }
                                },
                                element: g
                            }, t.debug && console.log("tweensContainer (scroll): ", j.scroll, g)
                        } else if ("reverse" === C) {
                            if (!h(g).tweensContainer) return void n.dequeue(g, i.queue);
                            "none" === h(g).opts.display && (h(g).opts.display = "auto"), "hidden" === h(g).opts.visibility && (h(g).opts.visibility = "visible"), h(g).opts.loop = !1, h(g).opts.begin = null, h(g).opts.complete = null, u.easing || delete i.easing, u.duration || delete i.duration, i = n.extend({}, h(g).opts, i);
                            var F = n.extend(!0, {}, h(g).tweensContainer);
                            for (var G in F)
                                if ("element" !== G) {
                                    var H = F[G].startValue;
                                    F[G].startValue = F[G].currentValue = F[G].endValue, F[G].endValue = H, q.isEmptyObject(u) || (F[G].easing = i.easing), t.debug && console.log("reverse tweensContainer (" + G + "): " + JSON.stringify(F[G]), g)
                                }
                            j = F
                        } else if ("start" === C) {
                            var F;
                            h(g).tweensContainer && h(g).isAnimating === !0 && (F = h(g).tweensContainer), n.each(s, function(b, c) {
                                if (RegExp("^" + v.Lists.colors.join("$|^") + "$").test(b)) {
                                    var d = a(c, !0),
                                        f = d[0],
                                        g = d[1],
                                        h = d[2];
                                    if (v.RegEx.isHex.test(f)) {
                                        for (var i = ["Red", "Green", "Blue"], j = v.Values.hexToRgb(f), k = h ? v.Values.hexToRgb(h) : e, l = 0; l < i.length; l++) s[b + i[l]] = [j[l], g, k ? k[l] : k];
                                        delete s[b]
                                    }
                                }
                            });
                            for (var K in s) {
                                var L = a(s[K]),
                                    M = L[0],
                                    N = L[1],
                                    O = L[2];
                                K = v.Names.camelCase(K);
                                var P = v.Hooks.getRoot(K),
                                    Q = !1;
                                if (h(g).isSVG || v.Names.prefixCheck(P)[1] !== !1 || v.Normalizations.registered[P] !== e) {
                                    (i.display !== e && null !== i.display && "none" !== i.display || i.visibility && "hidden" !== i.visibility) && /opacity|filter/.test(K) && !O && 0 !== M && (O = 0), i._cacheValues && F && F[K] ? (O === e && (O = F[K].endValue + F[K].unitType), Q = h(g).rootPropertyValueCache[P]) : v.Hooks.registered[K] ? O === e ? (Q = v.getPropertyValue(g, P), O = v.getPropertyValue(g, K, Q)) : Q = v.Hooks.templates[P][1] : O === e && (O = v.getPropertyValue(g, K));
                                    var R, S, T, U = !1;
                                    if (R = m(K, O), O = R[0], T = R[1], R = m(K, M), M = R[0].replace(/^([+-\/*])=/, function(a, b) {
                                            return U = b, ""
                                        }), S = R[1], O = parseFloat(O) || 0, M = parseFloat(M) || 0, "%" === S && (/^(fontSize|lineHeight)$/.test(K) ? (M /= 100, S = "em") : /^scale/.test(K) ? (M /= 100, S = "") : /(Red|Green|Blue)$/i.test(K) && (M = M / 100 * 255, S = "")), /[\/*]/.test(U)) S = T;
                                    else if (T !== S && 0 !== O)
                                        if (0 === M) S = T;
                                        else {
                                            b = b || o();
                                            var V = /margin|padding|left|right|width|text|word|letter/i.test(K) || /X$/.test(K) || "x" === K ? "x" : "y";
                                            switch (T) {
                                                case "%":
                                                    O *= "x" === V ? b.percentToPxWidth : b.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    O *= b[T + "ToPx"]
                                            }
                                            switch (S) {
                                                case "%":
                                                    O *= 1 / ("x" === V ? b.percentToPxWidth : b.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    O *= 1 / b[S + "ToPx"]
                                            }
                                        }
                                    switch (U) {
                                        case "+":
                                            M = O + M;
                                            break;
                                        case "-":
                                            M = O - M;
                                            break;
                                        case "*":
                                            M = O * M;
                                            break;
                                        case "/":
                                            M = O / M
                                    }
                                    j[K] = {
                                        rootPropertyValue: Q,
                                        startValue: O,
                                        currentValue: O,
                                        endValue: M,
                                        unitType: S,
                                        easing: N
                                    }, t.debug && console.log("tweensContainer (" + K + "): " + JSON.stringify(j[K]), g)
                                } else t.debug && console.log("Skipping [" + P + "] due to a lack of browser support.")
                            }
                            j.element = g
                        }
                        j.element && (v.Values.addClass(g, "velocity-animating"), J.push(j), "" === i.queue && (h(g).tweensContainer = j, h(g).opts = i), h(g).isAnimating = !0, y === x - 1 ? (t.State.calls.length > 1e4 && (t.State.calls = f(t.State.calls)), t.State.calls.push([J, p, i, null, B.resolver]), t.State.isTicking === !1 && (t.State.isTicking = !0, l())) : y++)
                    }
                    var b, g = this,
                        i = n.extend({}, t.defaults, u),
                        j = {};
                    if (h(g) === e && t.init(g), parseFloat(i.delay) && i.queue !== !1 && n.queue(g, i.queue, function(a) {
                            t.velocityQueueEntryFlag = !0, h(g).delayTimer = {
                                setTimeout: setTimeout(a, parseFloat(i.delay)),
                                next: a
                            }
                        }), t.mock === !0) i.duration = 1;
                    else switch (i.duration.toString().toLowerCase()) {
                        case "fast":
                            i.duration = 200;
                            break;
                        case "normal":
                            i.duration = r;
                            break;
                        case "slow":
                            i.duration = 600;
                            break;
                        default:
                            i.duration = parseFloat(i.duration) || 1
                    }
                    i.easing = k(i.easing, i.duration), i.begin && !q.isFunction(i.begin) && (i.begin = null), i.progress && !q.isFunction(i.progress) && (i.progress = null), i.complete && !q.isFunction(i.complete) && (i.complete = null), i.display !== e && null !== i.display && (i.display = i.display.toString().toLowerCase(), "auto" === i.display && (i.display = t.CSS.Values.getDisplayType(g))), i.visibility && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && t.State.isMobile && !t.State.isGingerbread, i.queue === !1 ? i.delay ? setTimeout(a, i.delay) : a() : n.queue(g, i.queue, function(b, c) {
                        return c === !0 ? (B.promise && B.resolver(p), !0) : (t.velocityQueueEntryFlag = !0, void a(b))
                    }), "" !== i.queue && "fx" !== i.queue || "inprogress" === n.queue(g)[0] || n.dequeue(g)
                }
                var i, j, o, p, s, u, w = arguments[0] && (n.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || q.isString(arguments[0].properties));
                if (q.isWrapped(this) ? (i = !1, o = 0, p = this, j = this) : (i = !0, o = 1, p = w ? arguments[0].elements : arguments[0]), p = q.isWrapped(p) ? [].slice.call(p) : p) {
                    w ? (s = arguments[0].properties, u = arguments[0].options) : (s = arguments[o], u = arguments[o + 1]);
                    var x = q.isArray(p) || q.isNodeList(p) ? p.length : 1,
                        y = 0;
                    if ("stop" !== s && !n.isPlainObject(u)) {
                        var z = o + 1;
                        u = {};
                        for (var A = z; A < arguments.length; A++) !q.isArray(arguments[A]) && /^\d/.test(arguments[A]) ? u.duration = parseFloat(arguments[A]) : q.isString(arguments[A]) || q.isArray(arguments[A]) ? u.easing = arguments[A] : q.isFunction(arguments[A]) && (u.complete = arguments[A])
                    }
                    var B = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    i && t.Promise && (B.promise = new t.Promise(function(a, b) {
                        B.resolver = a, B.rejecter = b
                    }));
                    var C;
                    switch (s) {
                        case "scroll":
                            C = "scroll";
                            break;
                        case "reverse":
                            C = "reverse";
                            break;
                        case "stop":
                            n.each(g(p), function(a, b) {
                                h(b) && h(b).delayTimer && (clearTimeout(h(b).delayTimer.setTimeout), h(b).delayTimer.next && h(b).delayTimer.next(), delete h(b).delayTimer)
                            });
                            var D = [];
                            return n.each(t.State.calls, function(a, b) {
                                b && n.each(g(b[1]), function(c, d) {
                                    var f = q.isString(u) ? u : "";
                                    return u !== e && b[2].queue !== f ? !0 : void n.each(g(p), function(b, c) {
                                        c === d && (u !== e && (n.each(n.queue(c, f), function(a, b) {
                                            q.isFunction(b) && b(null, !0)
                                        }), n.queue(c, f, [])), h(c) && "" === f && n.each(h(c).tweensContainer, function(a, b) {
                                            b.endValue = b.currentValue
                                        }), D.push(a))
                                    })
                                })
                            }), n.each(D, function(a, b) {
                                m(b, !0)
                            }), B.promise && B.resolver(p), a();
                        default:
                            if (!n.isPlainObject(s) || q.isEmptyObject(s)) {
                                if (q.isString(s) && t.Sequences[s]) {
                                    var E = n.extend({}, u),
                                        F = E.duration,
                                        G = E.delay || 0;
                                    return E.backwards === !0 && (p = (q.isWrapped(p) ? [].slice.call(p) : p).reverse()), n.each(g(p), function(a, b) {
                                        parseFloat(E.stagger) ? E.delay = G + parseFloat(E.stagger) * a : q.isFunction(E.stagger) && (E.delay = G + E.stagger.call(b, a, x)), E.drag && (E.duration = parseFloat(F) || (/^(callout|transition)/.test(s) ? 1e3 : r), E.duration = Math.max(E.duration * (E.backwards ? 1 - a / x : (a + 1) / x), .75 * E.duration, 200)), t.Sequences[s].call(b, b, E || {}, a, x, p, B.promise ? B : e)
                                    }), a()
                                }
                                var H = "Velocity: First argument (" + s + ") was not a property map, a known action, or a registered sequence. Aborting.";
                                return B.promise ? B.rejecter(new Error(H)) : console.log(H), a()
                            }
                            C = "start"
                    }
                    var I = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        J = [];
                    n.each(g(p), function(a, c) {
                        q.isNode(c) && b.call(c)
                    });
                    var K, E = n.extend({}, t.defaults, u);
                    if (E.loop = parseInt(E.loop), K = 2 * E.loop - 1, E.loop)
                        for (var L = 0; K > L; L++) {
                            var M = {
                                delay: E.delay
                            };
                            L === K - 1 && (M.display = E.display, M.visibility = E.visibility, M.complete = E.complete), t(p, "reverse", M)
                        }
                    return a()
                }
            };
            t = n.extend(w, t), t.animate = w;
            var x = c.requestAnimationFrame || p;
            t.State.isMobile || d.hidden === e || d.addEventListener("visibilitychange", function() {
                d.hidden ? (x = function(a) {
                    return setTimeout(function() {
                        a(!0)
                    }, 16)
                }, l()) : x = c.requestAnimationFrame || p
            });
            var y;
            return a && a.fn !== e ? y = a : c.Zepto && (y = c.Zepto), (y || c).Velocity = t, y && (y.fn.velocity = w, y.fn.velocity.defaults = t.defaults), n.each(["Down", "Up"], function(a, b) {
                t.Sequences["slide" + b] = function(a, c, d, f, g, h) {
                    var i = n.extend({}, c),
                        j = i.begin,
                        k = i.complete,
                        l = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        m = {};
                    i.display === e && (i.display = "Down" === b ? "inline" === t.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function(a) {
                        j && j.call(a, a), m.overflowY = a.style.overflowY, a.style.overflowY = "hidden";
                        for (var c in l) {
                            m[c] = a.style[c];
                            var d = t.CSS.getPropertyValue(a, c);
                            l[c] = "Down" === b ? [d, 0] : [0, d]
                        }
                    }, i.complete = function(a) {
                        for (var b in m) a.style[b] = m[b];
                        k && k.call(a, a), h && h.resolver(g || a)
                    }, t(a, l, i)
                }
            }), n.each(["In", "Out"], function(a, b) {
                t.Sequences["fade" + b] = function(a, c, d, f, g, h) {
                    var i = n.extend({}, c),
                        j = {
                            opacity: "In" === b ? 1 : 0
                        },
                        k = i.complete;
                    i.complete = d !== f - 1 ? i.begin = null : function() {
                        k && k.call(a, a), h && h.resolver(g || a)
                    }, i.display === e && (i.display = "In" === b ? "auto" : "none"), t(this, j, i)
                }
            }), t
        }(a || window, window, document)
    }),
    function(a, b) {
        "use strict";
        a.quicksearch = {
            defaults: {
                delay: 100,
                selector: null,
                stripeRows: null,
                loader: null,
                noResults: "",
                matchedResultsCount: 0,
                bind: "keyup search input",
                removeDiacritics: !1,
                minValLength: 0,
                onBefore: a.noop,
                onAfter: a.noop,
                onValTooSmall: a.noop,
                show: function() {
                    a(this).show()
                },
                hide: function() {
                    a(this).hide()
                },
                prepareQuery: function(a) {
                    return a.toLowerCase().split(" ")
                },
                testQuery: function(a, b) {
                    for (var c = 0; c < a.length; c += 1)
                        if (-1 === b.indexOf(a[c])) return !1;
                    return !0
                }
            },
            diacriticsRemovalMap: [{
                base: "A",
                letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
            }, {
                base: "AA",
                letters: /[\uA732]/g
            }, {
                base: "AE",
                letters: /[\u00C6\u01FC\u01E2]/g
            }, {
                base: "AO",
                letters: /[\uA734]/g
            }, {
                base: "AU",
                letters: /[\uA736]/g
            }, {
                base: "AV",
                letters: /[\uA738\uA73A]/g
            }, {
                base: "AY",
                letters: /[\uA73C]/g
            }, {
                base: "B",
                letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
            }, {
                base: "C",
                letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
            }, {
                base: "D",
                letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
            }, {
                base: "DZ",
                letters: /[\u01F1\u01C4]/g
            }, {
                base: "Dz",
                letters: /[\u01F2\u01C5]/g
            }, {
                base: "E",
                letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
            }, {
                base: "F",
                letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
            }, {
                base: "G",
                letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
            }, {
                base: "H",
                letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
            }, {
                base: "I",
                letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
            }, {
                base: "J",
                letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
            }, {
                base: "K",
                letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
            }, {
                base: "L",
                letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
            }, {
                base: "LJ",
                letters: /[\u01C7]/g
            }, {
                base: "Lj",
                letters: /[\u01C8]/g
            }, {
                base: "M",
                letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
            }, {
                base: "N",
                letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
            }, {
                base: "NJ",
                letters: /[\u01CA]/g
            }, {
                base: "Nj",
                letters: /[\u01CB]/g
            }, {
                base: "O",
                letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
            }, {
                base: "OI",
                letters: /[\u01A2]/g
            }, {
                base: "OO",
                letters: /[\uA74E]/g
            }, {
                base: "OU",
                letters: /[\u0222]/g
            }, {
                base: "P",
                letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
            }, {
                base: "Q",
                letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
            }, {
                base: "R",
                letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
            }, {
                base: "S",
                letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
            }, {
                base: "T",
                letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
            }, {
                base: "TZ",
                letters: /[\uA728]/g
            }, {
                base: "U",
                letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
            }, {
                base: "V",
                letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
            }, {
                base: "VY",
                letters: /[\uA760]/g
            }, {
                base: "W",
                letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
            }, {
                base: "X",
                letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
            }, {
                base: "Y",
                letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
            }, {
                base: "Z",
                letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
            }, {
                base: "a",
                letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
            }, {
                base: "aa",
                letters: /[\uA733]/g
            }, {
                base: "ae",
                letters: /[\u00E6\u01FD\u01E3]/g
            }, {
                base: "ao",
                letters: /[\uA735]/g
            }, {
                base: "au",
                letters: /[\uA737]/g
            }, {
                base: "av",
                letters: /[\uA739\uA73B]/g
            }, {
                base: "ay",
                letters: /[\uA73D]/g
            }, {
                base: "b",
                letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
            }, {
                base: "c",
                letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
            }, {
                base: "d",
                letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
            }, {
                base: "dz",
                letters: /[\u01F3\u01C6]/g
            }, {
                base: "e",
                letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
            }, {
                base: "f",
                letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
            }, {
                base: "g",
                letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
            }, {
                base: "h",
                letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
            }, {
                base: "hv",
                letters: /[\u0195]/g
            }, {
                base: "i",
                letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
            }, {
                base: "j",
                letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
            }, {
                base: "k",
                letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
            }, {
                base: "l",
                letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
            }, {
                base: "lj",
                letters: /[\u01C9]/g
            }, {
                base: "m",
                letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
            }, {
                base: "n",
                letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
            }, {
                base: "nj",
                letters: /[\u01CC]/g
            }, {
                base: "o",
                letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
            }, {
                base: "oi",
                letters: /[\u01A3]/g
            }, {
                base: "ou",
                letters: /[\u0223]/g
            }, {
                base: "oo",
                letters: /[\uA74F]/g
            }, {
                base: "p",
                letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
            }, {
                base: "q",
                letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
            }, {
                base: "r",
                letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
            }, {
                base: "s",
                letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
            }, {
                base: "t",
                letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
            }, {
                base: "tz",
                letters: /[\uA729]/g
            }, {
                base: "u",
                letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
            }, {
                base: "v",
                letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
            }, {
                base: "vy",
                letters: /[\uA761]/g
            }, {
                base: "w",
                letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
            }, {
                base: "x",
                letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
            }, {
                base: "y",
                letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
            }, {
                base: "z",
                letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
            }]
        }, a.fn.quicksearch = function(c, d) {
            this.removeDiacritics = function(b) {
                for (var c = a.quicksearch.diacriticsRemovalMap, d = 0; d < c.length; d++) b = b.replace(c[d].letters, c[d].base);
                return b
            };
            var e, f, g, h, i = "",
                j = "",
                k = this,
                l = a.extend({}, a.quicksearch.defaults, d);
            return l.noResults = l.noResults ? a(l.noResults) : a(), l.loader = l.loader ? a(l.loader) : a(), this.go = function() {
                var a, b = 0,
                    c = 0,
                    d = 0,
                    e = !0,
                    h = 0 === i.replace(" ", "").length;
                for (l.removeDiacritics && (i = k.removeDiacritics(i)), a = l.prepareQuery(i), b = 0, c = g.length; c > b; b++) a.length > 0 && a[0].length < l.minValLength ? (l.show.apply(g[b]), e = !1, d++) : h || l.testQuery(a, f[b], g[b]) ? (l.show.apply(g[b]), e = !1, d++) : l.hide.apply(g[b]);
                return e ? this.results(!1) : (this.results(!0), this.stripe()), this.matchedResultsCount = d, this.loader(!1), l.onAfter.call(this), j = i, this
            }, this.search = function(a) {
                i = a, k.trigger()
            }, this.reset = function() {
                i = "", this.loader(!0), l.onBefore.call(this), b.clearTimeout(e), e = b.setTimeout(function() {
                    k.go()
                }, l.delay)
            }, this.currentMatchedResults = function() {
                return this.matchedResultsCount
            }, this.stripe = function() {
                if ("object" == typeof l.stripeRows && null !== l.stripeRows) {
                    var b = l.stripeRows.join(" "),
                        c = l.stripeRows.length;
                    h.not(":hidden").each(function(d) {
                        a(this).removeClass(b).addClass(l.stripeRows[d % c])
                    })
                }
                return this
            }, this.strip_html = function(b) {
                var c = b.replace(new RegExp("<[^<]+\\>", "g"), "");
                return c = a.trim(c.toLowerCase())
            }, this.results = function(a) {
                return l.noResults.length && l.noResults[a ? "hide" : "show"](), this
            }, this.loader = function(a) {
                return l.loader.length && l.loader[a ? "show" : "hide"](), this
            }, this.cache = function(b) {
                b = "undefined" == typeof b ? !0 : b, h = l.noResults ? a(c).not(l.noResults) : a(c);
                var d = "string" == typeof l.selector ? h.find(l.selector) : a(c).not(l.noResults);
                return f = d.map(function() {
                    var a = k.strip_html(this.innerHTML);
                    return l.removeDiacritics ? k.removeDiacritics(a) : a
                }), g = h.map(function() {
                    return this
                }), i = i || this.val() || "", b && this.go(), this
            }, this.trigger = function() {
                return i.length < l.minValLength && i.length > j.length || i.length < l.minValLength - 1 && i.length < j.length ? (l.onValTooSmall.call(this, i), k.go()) : (this.loader(!0), l.onBefore.call(this), b.clearTimeout(e), e = b.setTimeout(function() {
                    k.go()
                }, l.delay)), this
            }, this.cache(), this.results(!0), this.stripe(), this.loader(!1), this.each(function() {
                a(this).on(l.bind, function() {
                    i = a(this).val(), k.trigger()
                }), a(this).on(l.resetBind, function() {
                    i = "", k.reset()
                })
            })
        }
    }(jQuery, this, document),
    function(a, b) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.bootbox = b(a.jQuery)
    }(this, function a(b, c) {
        "use strict";

        function d(a) {
            var b = q[o.locale];
            return b ? b[a] : q.en[a]
        }

        function e(a, c, d) {
            a.stopPropagation(), a.preventDefault();
            var e = b.isFunction(d) && d(a) === !1;
            e || c.modal("hide")
        }

        function f(a) {
            var b, c = 0;
            for (b in a) c++;
            return c
        }

        function g(a, c) {
            var d = 0;
            b.each(a, function(a, b) {
                c(a, b, d++)
            })
        }

        function h(a) {
            var c, d;
            if ("object" != typeof a) throw new Error("Please supply an object of options");
            if (!a.message) throw new Error("Please specify a message");
            return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), a.backdrop = a.backdrop ? "static" : !1, c = a.buttons, d = f(c), g(c, function(a, e, f) {
                if (b.isFunction(e) && (e = c[a] = {
                        callback: e
                    }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object");
                e.label || (e.label = a), e.className || (e.className = 2 >= d && f === d - 1 ? "btn-primary" : "btn-default")
            }), a
        }

        function i(a, b) {
            var c = a.length,
                d = {};
            if (1 > c || c > 2) throw new Error("Invalid argument length");
            return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], d
        }

        function j(a, c, d) {
            return b.extend(!0, {}, a, i(c, d))
        }

        function k(a, b, c, d) {
            var e = {
                className: "bootbox-" + a,
                buttons: l.apply(null, b)
            };
            return m(j(e, d, c), b)
        }

        function l() {
            for (var a = {}, b = 0, c = arguments.length; c > b; b++) {
                var e = arguments[b],
                    f = e.toLowerCase(),
                    g = e.toUpperCase();
                a[f] = {
                    label: d(g)
                }
            }
            return a
        }

        function m(a, b) {
            var d = {};
            return g(b, function(a, b) {
                d[b] = !0
            }), g(a.buttons, function(a) {
                if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")")
            }), a
        }
        var n = {
                dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
                header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
                footer: "<div class='modal-footer'></div>",
                closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
                form: "<form class='bootbox-form'></form>",
                inputs: {
                    text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
                    textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
                    email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
                    select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
                    checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
                    date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
                    time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
                    number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
                    password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
                }
            },
            o = {
                locale: "en",
                backdrop: !0,
                animate: !0,
                className: null,
                closeButton: !0,
                show: !0,
                container: "body"
            },
            p = {};
        p.alert = function() {
            var a;
            if (a = k("alert", ["ok"], ["message", "callback"], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided");
            return a.buttons.ok.callback = a.onEscape = function() {
                return b.isFunction(a.callback) ? a.callback() : !0
            }, p.dialog(a)
        }, p.confirm = function() {
            var a;
            if (a = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), a.buttons.cancel.callback = a.onEscape = function() {
                    return a.callback(!1)
                }, a.buttons.confirm.callback = function() {
                    return a.callback(!0)
                }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback");
            return p.dialog(a)
        }, p.prompt = function() {
            var a, d, e, f, h, i, k;
            f = b(n.form), d = {
                className: "bootbox-prompt",
                buttons: l("cancel", "confirm"),
                value: "",
                inputType: "text"
            }, a = m(j(d, arguments, ["title", "callback"]), ["cancel", "confirm"]), i = a.show === c ? !0 : a.show;
            var o = ["date", "time", "number"],
                q = document.createElement("input");
            if (q.setAttribute("type", a.inputType), o[a.inputType] && (a.inputType = q.type), a.message = f, a.buttons.cancel.callback = a.onEscape = function() {
                    return a.callback(null)
                }, a.buttons.confirm.callback = function() {
                    var c;
                    switch (a.inputType) {
                        case "text":
                        case "textarea":
                        case "email":
                        case "select":
                        case "date":
                        case "time":
                        case "number":
                        case "password":
                            c = h.val();
                            break;
                        case "checkbox":
                            var d = h.find("input:checked");
                            c = [], g(d, function(a, d) {
                                c.push(b(d).val())
                            })
                    }
                    return a.callback(c)
                }, a.show = !1, !a.title) throw new Error("prompt requires a title");
            if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback");
            if (!n.inputs[a.inputType]) throw new Error("invalid prompt type");
            switch (h = b(n.inputs[a.inputType]), a.inputType) {
                case "text":
                case "textarea":
                case "email":
                case "date":
                case "time":
                case "number":
                case "password":
                    h.val(a.value);
                    break;
                case "select":
                    var r = {};
                    if (k = a.inputOptions || [], !k.length) throw new Error("prompt with select requires options");
                    g(k, function(a, d) {
                        var e = h;
                        if (d.value === c || d.text === c) throw new Error("given options in wrong format");
                        d.group && (r[d.group] || (r[d.group] = b("<optgroup/>").attr("label", d.group)), e = r[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>")
                    }), g(r, function(a, b) {
                        h.append(b)
                    }), h.val(a.value);
                    break;
                case "checkbox":
                    var s = b.isArray(a.value) ? a.value : [a.value];
                    if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options");
                    if (!k[0].value || !k[0].text) throw new Error("given options in wrong format");
                    h = b("<div/>"), g(k, function(c, d) {
                        var e = b(n.inputs[a.inputType]);
                        e.find("input").attr("value", d.value), e.find("label").append(d.text), g(s, function(a, b) {
                            b === d.value && e.find("input").prop("checked", !0)
                        }), h.append(e)
                    })
            }
            return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), f.append(h), f.on("submit", function(a) {
                a.preventDefault(), a.stopPropagation(), e.find(".btn-primary").click()
            }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function() {
                h.focus()
            }), i === !0 && e.modal("show"), e
        }, p.dialog = function(a) {
            a = h(a);
            var c = b(n.dialog),
                d = c.find(".modal-dialog"),
                f = c.find(".modal-body"),
                i = a.buttons,
                j = "",
                k = {
                    onEscape: a.onEscape
                };
            if (g(i, function(a, b) {
                    j += "<button data-bb-handler='" + a + "' type='button' class='btn " + b.className + "'>" + b.label + "</button>", k[a] = b.callback
                }), f.find(".bootbox-body").html(a.message), a.animate === !0 && c.addClass("fade"), a.className && c.addClass(a.className), "large" === a.size && d.addClass("modal-lg"), "small" === a.size && d.addClass("modal-sm"), a.title && f.before(n.header), a.closeButton) {
                var l = b(n.closeButton);
                a.title ? c.find(".modal-header").prepend(l) : l.css("margin-top", "-10px").prependTo(f)
            }
            return a.title && c.find(".modal-title").html(a.title), j.length && (f.after(n.footer), c.find(".modal-footer").html(j)), c.on("hidden.bs.modal", function(a) {
                a.target === this && c.remove()
            }), c.on("shown.bs.modal", function() {
                c.find(".btn-primary:first").focus()
            }), c.on("escape.close.bb", function(a) {
                k.onEscape && e(a, c, k.onEscape)
            }), c.on("click", ".modal-footer button", function(a) {
                var d = b(this).data("bb-handler");
                e(a, c, k[d])
            }), c.on("click", ".bootbox-close-button", function(a) {
                e(a, c, k.onEscape)
            }), c.on("keyup", function(a) {
                27 === a.which && c.trigger("escape.close.bb")
            }), b(a.container).append(c), c.modal({
                backdrop: a.backdrop,
                keyboard: !1,
                show: !1
            }), a.show && c.modal("show"), c
        }, p.setDefaults = function() {
            var a = {};
            2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a)
        }, p.hideAll = function() {
            b(".bootbox").modal("hide")
        };
        var q = {
            br: {
                OK: "OK",
                CANCEL: "Cancelar",
                CONFIRM: "Sim"
            },
            da: {
                OK: "OK",
                CANCEL: "Annuller",
                CONFIRM: "Accepter"
            },
            de: {
                OK: "OK",
                CANCEL: "Abbrechen",
                CONFIRM: "Akzeptieren"
            },
            el: {
                OK: "Εντάξει",
                CANCEL: "Ακύρωση",
                CONFIRM: "Επιβεβαίωση"
            },
            en: {
                OK: "OK",
                CANCEL: "Cancel",
                CONFIRM: "OK"
            },
            es: {
                OK: "OK",
                CANCEL: "Cancelar",
                CONFIRM: "Aceptar"
            },
            fi: {
                OK: "OK",
                CANCEL: "Peruuta",
                CONFIRM: "OK"
            },
            fr: {
                OK: "OK",
                CANCEL: "Annuler",
                CONFIRM: "D'accord"
            },
            he: {
                OK: "אישור",
                CANCEL: "ביטול",
                CONFIRM: "אישור"
            },
            it: {
                OK: "OK",
                CANCEL: "Annulla",
                CONFIRM: "Conferma"
            },
            lt: {
                OK: "Gerai",
                CANCEL: "Atšaukti",
                CONFIRM: "Patvirtinti"
            },
            lv: {
                OK: "Labi",
                CANCEL: "Atcelt",
                CONFIRM: "Apstiprināt"
            },
            nl: {
                OK: "OK",
                CANCEL: "Annuleren",
                CONFIRM: "Accepteren"
            },
            no: {
                OK: "OK",
                CANCEL: "Avbryt",
                CONFIRM: "OK"
            },
            pl: {
                OK: "OK",
                CANCEL: "Anuluj",
                CONFIRM: "Potwierdź"
            },
            ru: {
                OK: "OK",
                CANCEL: "Отмена",
                CONFIRM: "Применить"
            },
            sv: {
                OK: "OK",
                CANCEL: "Avbryt",
                CONFIRM: "OK"
            },
            tr: {
                OK: "Tamam",
                CANCEL: "İptal",
                CONFIRM: "Onayla"
            },
            zh_CN: {
                OK: "OK",
                CANCEL: "取消",
                CONFIRM: "确认"
            },
            zh_TW: {
                OK: "OK",
                CANCEL: "取消",
                CONFIRM: "確認"
            }
        };
        return p.init = function(c) {
            return a(c || b)
        }, p
    }),
    function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function(a) {
        "use strict";
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H = {},
            I = 0;
        b = function() {
                return {
                    common: {
                        type: "line",
                        lineColor: "#00f",
                        fillColor: "#cdf",
                        defaultPixelsPerValue: 3,
                        width: "auto",
                        height: "auto",
                        composite: !1,
                        tagValuesAttribute: "values",
                        tagOptionsPrefix: "spark",
                        enableTagOptions: !1,
                        enableHighlight: !0,
                        highlightLighten: 1.4,
                        tooltipSkipNull: !0,
                        tooltipPrefix: "",
                        tooltipSuffix: "",
                        disableHiddenCheck: !1,
                        numberFormatter: !1,
                        numberDigitGroupCount: 3,
                        numberDigitGroupSep: ",",
                        numberDecimalMark: ".",
                        disableTooltips: !1,
                        disableInteraction: !1
                    },
                    line: {
                        spotColor: "#f80",
                        highlightSpotColor: "#5f5",
                        highlightLineColor: "#f22",
                        spotRadius: 1.5,
                        minSpotColor: "#f80",
                        maxSpotColor: "#f80",
                        lineWidth: 1,
                        normalRangeMin: void 0,
                        normalRangeMax: void 0,
                        normalRangeColor: "#ccc",
                        drawNormalOnTop: !1,
                        chartRangeMin: void 0,
                        chartRangeMax: void 0,
                        chartRangeMinX: void 0,
                        chartRangeMaxX: void 0,
                        tooltipFormat: new d('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                    },
                    bar: {
                        barColor: "#3366cc",
                        negBarColor: "#f44",
                        stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        zeroColor: void 0,
                        nullColor: void 0,
                        zeroAxis: !0,
                        barWidth: 4,
                        barSpacing: 1,
                        chartRangeMax: void 0,
                        chartRangeMin: void 0,
                        chartRangeClip: !1,
                        colorMap: void 0,
                        tooltipFormat: new d('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                    },
                    tristate: {
                        barWidth: 4,
                        barSpacing: 1,
                        posBarColor: "#6f6",
                        negBarColor: "#f44",
                        zeroBarColor: "#999",
                        colorMap: {},
                        tooltipFormat: new d('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                        tooltipValueLookups: {
                            map: {
                                "-1": "Loss",
                                0: "Draw",
                                1: "Win"
                            }
                        }
                    },
                    discrete: {
                        lineHeight: "auto",
                        thresholdColor: void 0,
                        thresholdValue: 0,
                        chartRangeMax: void 0,
                        chartRangeMin: void 0,
                        chartRangeClip: !1,
                        tooltipFormat: new d("{{prefix}}{{value}}{{suffix}}")
                    },
                    bullet: {
                        targetColor: "#f33",
                        targetWidth: 3,
                        performanceColor: "#33f",
                        rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                        base: void 0,
                        tooltipFormat: new d("{{fieldkey:fields}} - {{value}}"),
                        tooltipValueLookups: {
                            fields: {
                                r: "Range",
                                p: "Performance",
                                t: "Target"
                            }
                        }
                    },
                    pie: {
                        offset: 0,
                        sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                        borderWidth: 0,
                        borderColor: "#000",
                        tooltipFormat: new d('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                    },
                    box: {
                        raw: !1,
                        boxLineColor: "#000",
                        boxFillColor: "#cdf",
                        whiskerColor: "#000",
                        outlierLineColor: "#333",
                        outlierFillColor: "#fff",
                        medianColor: "#f00",
                        showOutliers: !0,
                        outlierIQR: 1.5,
                        spotRadius: 1.5,
                        target: void 0,
                        targetColor: "#4a2",
                        chartRangeMax: void 0,
                        chartRangeMin: void 0,
                        tooltipFormat: new d("{{field:fields}}: {{value}}"),
                        tooltipFormatFieldlistKey: "field",
                        tooltipValueLookups: {
                            fields: {
                                lq: "Lower Quartile",
                                med: "Median",
                                uq: "Upper Quartile",
                                lo: "Left Outlier",
                                ro: "Right Outlier",
                                lw: "Left Whisker",
                                rw: "Right Whisker"
                            }
                        }
                    }
                }
            }, A = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', c = function() {
                var b, c;
                return b = function() {
                    this.init.apply(this, arguments)
                }, arguments.length > 1 ? (arguments[0] ? (b.prototype = a.extend(new arguments[0], arguments[arguments.length - 1]), b._super = arguments[0].prototype) : b.prototype = arguments[arguments.length - 1], arguments.length > 2 && (c = Array.prototype.slice.call(arguments, 1, -1), c.unshift(b.prototype), a.extend.apply(a, c))) : b.prototype = arguments[0], b.prototype.cls = b, b
            }, a.SPFormatClass = d = c({
                fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
                precre: /(\w+)\.(\d+)/,
                init: function(a, b) {
                    this.format = a, this.fclass = b
                },
                render: function(a, b, c) {
                    var d, e, f, g, h, i = this,
                        k = a;
                    return this.format.replace(this.fre, function() {
                        var a;
                        return e = arguments[1], f = arguments[3], d = i.precre.exec(e), d ? (h = d[2], e = d[1]) : h = !1, g = k[e], void 0 === g ? "" : f && b && b[f] ? (a = b[f], a.get ? b[f].get(g) || g : b[f][g] || g) : (j(g) && (g = c.get("numberFormatter") ? c.get("numberFormatter")(g) : o(g, h, c.get("numberDigitGroupCount"), c.get("numberDigitGroupSep"), c.get("numberDecimalMark"))), g)
                    })
                }
            }), a.spformat = function(a, b) {
                return new d(a, b)
            }, e = function(a, b, c) {
                return b > a ? b : a > c ? c : a
            }, f = function(a, b) {
                var c;
                return 2 === b ? (c = Math.floor(a.length / 2), a.length % 2 ? a[c] : (a[c - 1] + a[c]) / 2) : a.length % 2 ? (c = (a.length * b + b) / 4, c % 1 ? (a[Math.floor(c)] + a[Math.floor(c) - 1]) / 2 : a[c - 1]) : (c = (a.length * b + 2) / 4, c % 1 ? (a[Math.floor(c)] + a[Math.floor(c) - 1]) / 2 : a[c - 1])
            }, g = function(a) {
                var b;
                switch (a) {
                    case "undefined":
                        a = void 0;
                        break;
                    case "null":
                        a = null;
                        break;
                    case "true":
                        a = !0;
                        break;
                    case "false":
                        a = !1;
                        break;
                    default:
                        b = parseFloat(a), a == b && (a = b)
                }
                return a
            }, h = function(a) {
                var b, c = [];
                for (b = a.length; b--;) c[b] = g(a[b]);
                return c
            }, i = function(a, b) {
                var c, d, e = [];
                for (c = 0, d = a.length; d > c; c++) a[c] !== b && e.push(a[c]);
                return e
            }, j = function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, o = function(b, c, d, e, f) {
                var g, h;
                for (b = (c === !1 ? parseFloat(b).toString() : b.toFixed(c)).split(""), g = (g = a.inArray(".", b)) < 0 ? b.length : g, g < b.length && (b[g] = f), h = g - d; h > 0; h -= d) b.splice(h, 0, e);
                return b.join("")
            }, k = function(a, b, c) {
                var d;
                for (d = b.length; d--;)
                    if ((!c || null !== b[d]) && b[d] !== a) return !1;
                return !0
            }, l = function(a) {
                var b, c = 0;
                for (b = a.length; b--;) c += "number" == typeof a[b] ? a[b] : 0;
                return c
            }, n = function(b) {
                return a.isArray(b) ? b : [b]
            }, m = function(a) {
                var b;
                document.createStyleSheet ? document.createStyleSheet().cssText = a : (b = document.createElement("style"), b.type = "text/css", document.getElementsByTagName("head")[0].appendChild(b), b["string" == typeof document.body.style.WebkitAppearance ? "innerText" : "innerHTML"] = a)
            }, a.fn.simpledraw = function(b, c, d, e) {
                var f, g;
                if (d && (f = this.data("_jqs_vcanvas"))) return f;
                if (void 0 === b && (b = a(this).innerWidth()), void 0 === c && (c = a(this).innerHeight()), a.fn.sparkline.hasCanvas) f = new E(b, c, this, e);
                else {
                    if (!a.fn.sparkline.hasVML) return !1;
                    f = new F(b, c, this)
                }
                return g = a(this).data("_jqs_mhandler"), g && g.registerCanvas(f), f
            }, a.fn.cleardraw = function() {
                var a = this.data("_jqs_vcanvas");
                a && a.reset()
            }, a.RangeMapClass = p = c({
                init: function(a) {
                    var b, c, d = [];
                    for (b in a) a.hasOwnProperty(b) && "string" == typeof b && b.indexOf(":") > -1 && (c = b.split(":"), c[0] = 0 === c[0].length ? -1 / 0 : parseFloat(c[0]), c[1] = 0 === c[1].length ? 1 / 0 : parseFloat(c[1]), c[2] = a[b], d.push(c));
                    this.map = a, this.rangelist = d || !1
                },
                get: function(a) {
                    var b, c, d, e = this.rangelist;
                    if (void 0 !== (d = this.map[a])) return d;
                    if (e)
                        for (b = e.length; b--;)
                            if (c = e[b], c[0] <= a && c[1] >= a) return c[2];
                    return void 0
                }
            }), a.range_map = function(a) {
                return new p(a)
            }, q = c({
                init: function(b, c) {
                    var d = a(b);
                    this.$el = d, this.options = c, this.currentPageX = 0, this.currentPageY = 0, this.el = b, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !c.get("disableTooltips"), this.highlightEnabled = !c.get("disableHighlight")
                },
                registerSparkline: function(a) {
                    this.splist.push(a), this.over && this.updateDisplay()
                },
                registerCanvas: function(b) {
                    var c = a(b.canvas);
                    this.canvas = b, this.$canvas = c, c.mouseenter(a.proxy(this.mouseenter, this)), c.mouseleave(a.proxy(this.mouseleave, this)), c.click(a.proxy(this.mouseclick, this))
                },
                reset: function(a) {
                    this.splist = [], this.tooltip && a && (this.tooltip.remove(), this.tooltip = void 0)
                },
                mouseclick: function(b) {
                    var c = a.Event("sparklineClick");
                    c.originalEvent = b, c.sparklines = this.splist, this.$el.trigger(c)
                },
                mouseenter: function(b) {
                    a(document.body).unbind("mousemove.jqs"), a(document.body).bind("mousemove.jqs", a.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, !this.tooltip && this.displayTooltips && (this.tooltip = new r(this.options), this.tooltip.updatePosition(b.pageX, b.pageY)), this.updateDisplay()
                },
                mouseleave: function() {
                    a(document.body).unbind("mousemove.jqs");
                    var b, c, d = this.splist,
                        e = d.length,
                        f = !1;
                    for (this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null), c = 0; e > c; c++) b = d[c], b.clearRegionHighlight() && (f = !0);
                    f && this.canvas.render()
                },
                mousemove: function(a) {
                    this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, this.tooltip && this.tooltip.updatePosition(a.pageX, a.pageY), this.updateDisplay()
                },
                updateDisplay: function() {
                    var b, c, d, e, f, g = this.splist,
                        h = g.length,
                        i = !1,
                        j = this.$canvas.offset(),
                        k = this.currentPageX - j.left,
                        l = this.currentPageY - j.top;
                    if (this.over) {
                        for (d = 0; h > d; d++) c = g[d], e = c.setRegionHighlight(this.currentEl, k, l), e && (i = !0);
                        if (i) {
                            if (f = a.Event("sparklineRegionChange"), f.sparklines = this.splist, this.$el.trigger(f), this.tooltip) {
                                for (b = "", d = 0; h > d; d++) c = g[d], b += c.getCurrentRegionTooltip();
                                this.tooltip.setContent(b)
                            }
                            this.disableHighlight || this.canvas.render()
                        }
                        null === e && this.mouseleave()
                    }
                }
            }), r = c({
                sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
                init: function(b) {
                    var c, d = b.get("tooltipClassname", "jqstooltip"),
                        e = this.sizeStyle;
                    this.container = b.get("tooltipContainer") || document.body, this.tooltipOffsetX = b.get("tooltipOffsetX", 10), this.tooltipOffsetY = b.get("tooltipOffsetY", 12), a("#jqssizetip").remove(), a("#jqstooltip").remove(), this.sizetip = a("<div/>", {
                        id: "jqssizetip",
                        style: e,
                        "class": d
                    }), this.tooltip = a("<div/>", {
                        id: "jqstooltip",
                        "class": d
                    }).appendTo(this.container), c = this.tooltip.offset(), this.offsetLeft = c.left, this.offsetTop = c.top, this.hidden = !0, a(window).unbind("resize.jqs scroll.jqs"), a(window).bind("resize.jqs scroll.jqs", a.proxy(this.updateWindowDims, this)), this.updateWindowDims()
                },
                updateWindowDims: function() {
                    this.scrollTop = a(window).scrollTop(), this.scrollLeft = a(window).scrollLeft(), this.scrollRight = this.scrollLeft + a(window).width(), this.updatePosition()
                },
                getSize: function(a) {
                    this.sizetip.html(a).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
                },
                setContent: function(a) {
                    return a ? (this.getSize(a), this.tooltip.html(a).css({
                        width: this.width,
                        height: this.height,
                        visibility: "visible"
                    }), void(this.hidden && (this.hidden = !1, this.updatePosition()))) : (this.tooltip.css("visibility", "hidden"), void(this.hidden = !0))
                },
                updatePosition: function(a, b) {
                    if (void 0 === a) {
                        if (void 0 === this.mousex) return;
                        a = this.mousex - this.offsetLeft, b = this.mousey - this.offsetTop
                    } else this.mousex = a -= this.offsetLeft, this.mousey = b -= this.offsetTop;
                    this.height && this.width && !this.hidden && (b -= this.height + this.tooltipOffsetY, a += this.tooltipOffsetX, b < this.scrollTop && (b = this.scrollTop), a < this.scrollLeft ? a = this.scrollLeft : a + this.width > this.scrollRight && (a = this.scrollRight - this.width), this.tooltip.css({
                        left: a,
                        top: b
                    }))
                },
                remove: function() {
                    this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = void 0, a(window).unbind("resize.jqs scroll.jqs")
                }
            }), B = function() {
                m(A)
            }, a(B), G = [], a.fn.sparkline = function(b, c) {
                return this.each(function() {
                    var d, e, f = new a.fn.sparkline.options(this, c),
                        g = a(this);
                    if (d = function() {
                            var c, d, e, h, i, j, k;
                            return "html" === b || void 0 === b ? (k = this.getAttribute(f.get("tagValuesAttribute")), (void 0 === k || null === k) && (k = g.html()), c = k.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")) : c = b, d = "auto" === f.get("width") ? c.length * f.get("defaultPixelsPerValue") : f.get("width"), "auto" === f.get("height") ? f.get("composite") && a.data(this, "_jqs_vcanvas") || (h = document.createElement("span"), h.innerHTML = "a", g.html(h), e = a(h).innerHeight() || a(h).height(), a(h).remove(), h = null) : e = f.get("height"), f.get("disableInteraction") ? i = !1 : (i = a.data(this, "_jqs_mhandler"), i ? f.get("composite") || i.reset() : (i = new q(this, f), a.data(this, "_jqs_mhandler", i))), f.get("composite") && !a.data(this, "_jqs_vcanvas") ? void(a.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), a.data(this, "_jqs_errnotify", !0))) : (j = new(a.fn.sparkline[f.get("type")])(this, c, f, d, e), j.render(), void(i && i.registerSparkline(j)))
                        }, a(this).html() && !f.get("disableHiddenCheck") && a(this).is(":hidden") || a.fn.jquery < "1.3.0" && a(this).parents().is(":hidden") || !a(this).parents("body").length) {
                        if (!f.get("composite") && a.data(this, "_jqs_pending"))
                            for (e = G.length; e; e--) G[e - 1][0] == this && G.splice(e - 1, 1);
                        G.push([this, d]), a.data(this, "_jqs_pending", !0)
                    } else d.call(this)
                })
            }, a.fn.sparkline.defaults = b(), a.sparkline_display_visible = function() {
                var b, c, d, e = [];
                for (c = 0, d = G.length; d > c; c++) b = G[c][0], a(b).is(":visible") && !a(b).parents().is(":hidden") ? (G[c][1].call(b), a.data(G[c][0], "_jqs_pending", !1), e.push(c)) : a(b).closest("html").length || a.data(b, "_jqs_pending") || (a.data(G[c][0], "_jqs_pending", !1), e.push(c));
                for (c = e.length; c; c--) G.splice(e[c - 1], 1)
            }, a.fn.sparkline.options = c({
                init: function(b, c) {
                    var d, e, f, g;
                    this.userOptions = c = c || {}, this.tag = b, this.tagValCache = {}, e = a.fn.sparkline.defaults, f = e.common, this.tagOptionsPrefix = c.enableTagOptions && (c.tagOptionsPrefix || f.tagOptionsPrefix), g = this.getTagSetting("type"), d = g === H ? e[c.type || f.type] : e[g], this.mergedOptions = a.extend({}, f, d, c)
                },
                getTagSetting: function(a) {
                    var b, c, d, e, f = this.tagOptionsPrefix;
                    if (f === !1 || void 0 === f) return H;
                    if (this.tagValCache.hasOwnProperty(a)) b = this.tagValCache.key;
                    else {
                        if (b = this.tag.getAttribute(f + a), void 0 === b || null === b) b = H;
                        else if ("[" === b.substr(0, 1))
                            for (b = b.substr(1, b.length - 2).split(","), c = b.length; c--;) b[c] = g(b[c].replace(/(^\s*)|(\s*$)/g, ""));
                        else if ("{" === b.substr(0, 1))
                            for (d = b.substr(1, b.length - 2).split(","), b = {}, c = d.length; c--;) e = d[c].split(":", 2), b[e[0].replace(/(^\s*)|(\s*$)/g, "")] = g(e[1].replace(/(^\s*)|(\s*$)/g, ""));
                        else b = g(b);
                        this.tagValCache.key = b
                    }
                    return b
                },
                get: function(a, b) {
                    var c, d = this.getTagSetting(a);
                    return d !== H ? d : void 0 === (c = this.mergedOptions[a]) ? b : c
                }
            }), a.fn.sparkline._base = c({
                disabled: !1,
                init: function(b, c, d, e, f) {
                    this.el = b, this.$el = a(b), this.values = c, this.options = d, this.width = e, this.height = f, this.currentRegion = void 0
                },
                initTarget: function() {
                    var a = !this.options.get("disableInteraction");
                    (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), a)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
                },
                render: function() {
                    return this.disabled ? (this.el.innerHTML = "", !1) : !0
                },
                getRegion: function() {},
                setRegionHighlight: function(a, b, c) {
                    var d, e = this.currentRegion,
                        f = !this.options.get("disableHighlight");
                    return b > this.canvasWidth || c > this.canvasHeight || 0 > b || 0 > c ? null : (d = this.getRegion(a, b, c), e !== d ? (void 0 !== e && f && this.removeHighlight(), this.currentRegion = d, void 0 !== d && f && this.renderHighlight(), !0) : !1)
                },
                clearRegionHighlight: function() {
                    return void 0 !== this.currentRegion ? (this.removeHighlight(), this.currentRegion = void 0, !0) : !1
                },
                renderHighlight: function() {
                    this.changeHighlight(!0)
                },
                removeHighlight: function() {
                    this.changeHighlight(!1)
                },
                changeHighlight: function() {},
                getCurrentRegionTooltip: function() {
                    var b, c, e, f, g, h, i, j, k, l, m, n, o, p, q = this.options,
                        r = "",
                        s = [];
                    if (void 0 === this.currentRegion) return "";
                    if (b = this.getCurrentRegionFields(), m = q.get("tooltipFormatter")) return m(this, q, b);
                    if (q.get("tooltipChartTitle") && (r += '<div class="jqs jqstitle">' + q.get("tooltipChartTitle") + "</div>\n"), c = this.options.get("tooltipFormat"), !c) return "";
                    if (a.isArray(c) || (c = [c]), a.isArray(b) || (b = [b]), i = this.options.get("tooltipFormatFieldlist"), j = this.options.get("tooltipFormatFieldlistKey"), i && j) {
                        for (k = [], h = b.length; h--;) l = b[h][j], -1 != (p = a.inArray(l, i)) && (k[p] = b[h]);
                        b = k
                    }
                    for (e = c.length, o = b.length, h = 0; e > h; h++)
                        for (n = c[h], "string" == typeof n && (n = new d(n)), f = n.fclass || "jqsfield", p = 0; o > p; p++) b[p].isNull && q.get("tooltipSkipNull") || (a.extend(b[p], {
                            prefix: q.get("tooltipPrefix"),
                            suffix: q.get("tooltipSuffix")
                        }), g = n.render(b[p], q.get("tooltipValueLookups"), q), s.push('<div class="' + f + '">' + g + "</div>"));
                    return s.length ? r + s.join("\n") : ""
                },
                getCurrentRegionFields: function() {},
                calcHighlightColor: function(a, b) {
                    var c, d, f, g, h = b.get("highlightColor"),
                        i = b.get("highlightLighten");
                    if (h) return h;
                    if (i && (c = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a))) {
                        for (f = [], d = 4 === a.length ? 16 : 1, g = 0; 3 > g; g++) f[g] = e(Math.round(parseInt(c[g + 1], 16) * d * i), 0, 255);
                        return "rgb(" + f.join(",") + ")"
                    }
                    return a
                }
            }), s = {
                changeHighlight: function(b) {
                    var c, d = this.currentRegion,
                        e = this.target,
                        f = this.regionShapes[d];
                    f && (c = this.renderRegion(d, b), a.isArray(c) || a.isArray(f) ? (e.replaceWithShapes(f, c), this.regionShapes[d] = a.map(c, function(a) {
                        return a.id
                    })) : (e.replaceWithShape(f, c), this.regionShapes[d] = c.id))
                },
                render: function() {
                    var b, c, d, e, f = this.values,
                        g = this.target,
                        h = this.regionShapes;
                    if (this.cls._super.render.call(this)) {
                        for (d = f.length; d--;)
                            if (b = this.renderRegion(d))
                                if (a.isArray(b)) {
                                    for (c = [], e = b.length; e--;) b[e].append(), c.push(b[e].id);
                                    h[d] = c
                                } else b.append(), h[d] = b.id;
                        else h[d] = null;
                        g.render()
                    }
                }
            }, a.fn.sparkline.line = t = c(a.fn.sparkline._base, {
                type: "line",
                init: function(a, b, c, d, e) {
                    t._super.init.call(this, a, b, c, d, e), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
                },
                getRegion: function(a, b) {
                    var c, d = this.regionMap;
                    for (c = d.length; c--;)
                        if (null !== d[c] && b >= d[c][0] && b <= d[c][1]) return d[c][2];
                    return void 0
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: null === this.yvalues[a],
                        x: this.xvalues[a],
                        y: this.yvalues[a],
                        color: this.options.get("lineColor"),
                        fillColor: this.options.get("fillColor"),
                        offset: a
                    }
                },
                renderHighlight: function() {
                    var a, b, c = this.currentRegion,
                        d = this.target,
                        e = this.vertices[c],
                        f = this.options,
                        g = f.get("spotRadius"),
                        h = f.get("highlightSpotColor"),
                        i = f.get("highlightLineColor");
                    e && (g && h && (a = d.drawCircle(e[0], e[1], g, void 0, h), this.highlightSpotId = a.id, d.insertAfterShape(this.lastShapeId, a)), i && (b = d.drawLine(e[0], this.canvasTop, e[0], this.canvasTop + this.canvasHeight, i), this.highlightLineId = b.id, d.insertAfterShape(this.lastShapeId, b)))
                },
                removeHighlight: function() {
                    var a = this.target;
                    this.highlightSpotId && (a.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (a.removeShapeId(this.highlightLineId), this.highlightLineId = null)
                },
                scanValues: function() {
                    var a, b, c, d, e, f = this.values,
                        g = f.length,
                        h = this.xvalues,
                        i = this.yvalues,
                        j = this.yminmax;
                    for (a = 0; g > a; a++) b = f[a], c = "string" == typeof f[a], d = "object" == typeof f[a] && f[a] instanceof Array, e = c && f[a].split(":"), c && 2 === e.length ? (h.push(Number(e[0])), i.push(Number(e[1])), j.push(Number(e[1]))) : d ? (h.push(b[0]), i.push(b[1]), j.push(b[1])) : (h.push(a), null === f[a] || "null" === f[a] ? i.push(null) : (i.push(Number(b)), j.push(Number(b))));
                    this.options.get("xvalues") && (h = this.options.get("xvalues")), this.maxy = this.maxyorg = Math.max.apply(Math, j), this.miny = this.minyorg = Math.min.apply(Math, j), this.maxx = Math.max.apply(Math, h), this.minx = Math.min.apply(Math, h), this.xvalues = h, this.yvalues = i, this.yminmax = j
                },
                processRangeOptions: function() {
                    var a = this.options,
                        b = a.get("normalRangeMin"),
                        c = a.get("normalRangeMax");
                    void 0 !== b && (b < this.miny && (this.miny = b), c > this.maxy && (this.maxy = c)), void 0 !== a.get("chartRangeMin") && (a.get("chartRangeClip") || a.get("chartRangeMin") < this.miny) && (this.miny = a.get("chartRangeMin")), void 0 !== a.get("chartRangeMax") && (a.get("chartRangeClip") || a.get("chartRangeMax") > this.maxy) && (this.maxy = a.get("chartRangeMax")), void 0 !== a.get("chartRangeMinX") && (a.get("chartRangeClipX") || a.get("chartRangeMinX") < this.minx) && (this.minx = a.get("chartRangeMinX")), void 0 !== a.get("chartRangeMaxX") && (a.get("chartRangeClipX") || a.get("chartRangeMaxX") > this.maxx) && (this.maxx = a.get("chartRangeMaxX"))
                },
                drawNormalRange: function(a, b, c, d, e) {
                    var f = this.options.get("normalRangeMin"),
                        g = this.options.get("normalRangeMax"),
                        h = b + Math.round(c - c * ((g - this.miny) / e)),
                        i = Math.round(c * (g - f) / e);
                    this.target.drawRect(a, h, d, i, void 0, this.options.get("normalRangeColor")).append()
                },
                render: function() {
                    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, q, r, s, u, v, w, x, y, z, A, B, C = this.options,
                        D = this.target,
                        E = this.canvasWidth,
                        F = this.canvasHeight,
                        G = this.vertices,
                        H = C.get("spotRadius"),
                        I = this.regionMap;
                    if (t._super.render.call(this) && (this.scanValues(), this.processRangeOptions(), z = this.xvalues, A = this.yvalues, this.yminmax.length && !(this.yvalues.length < 2))) {
                        for (e = f = 0, b = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, c = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, d = this.yvalues.length - 1, H && (4 * H > E || 4 * H > F) && (H = 0), H && (x = C.get("highlightSpotColor") && !C.get("disableInteraction"), (x || C.get("minSpotColor") || C.get("spotColor") && A[d] === this.miny) && (F -= Math.ceil(H)), (x || C.get("maxSpotColor") || C.get("spotColor") && A[d] === this.maxy) && (F -= Math.ceil(H), e += Math.ceil(H)), (x || (C.get("minSpotColor") || C.get("maxSpotColor")) && (A[0] === this.miny || A[0] === this.maxy)) && (f += Math.ceil(H), E -= Math.ceil(H)), (x || C.get("spotColor") || C.get("minSpotColor") || C.get("maxSpotColor") && (A[d] === this.miny || A[d] === this.maxy)) && (E -= Math.ceil(H))), F--, void 0 === C.get("normalRangeMin") || C.get("drawNormalOnTop") || this.drawNormalRange(f, e, F, E, c), h = [], i = [h], o = q = null, r = A.length, B = 0; r > B; B++) j = z[B], l = z[B + 1], k = A[B], m = f + Math.round((j - this.minx) * (E / b)), n = r - 1 > B ? f + Math.round((l - this.minx) * (E / b)) : E, q = m + (n - m) / 2, I[B] = [o || 0, q, B], o = q, null === k ? B && (null !== A[B - 1] && (h = [], i.push(h)), G.push(null)) : (k < this.miny && (k = this.miny), k > this.maxy && (k = this.maxy), h.length || h.push([m, e + F]), g = [m, e + Math.round(F - F * ((k - this.miny) / c))], h.push(g), G.push(g));
                        for (s = [], u = [], v = i.length, B = 0; v > B; B++) h = i[B], h.length && (C.get("fillColor") && (h.push([h[h.length - 1][0], e + F]), u.push(h.slice(0)), h.pop()), h.length > 2 && (h[0] = [h[0][0], h[1][1]]), s.push(h));
                        for (v = u.length, B = 0; v > B; B++) D.drawShape(u[B], C.get("fillColor"), C.get("fillColor")).append();
                        for (void 0 !== C.get("normalRangeMin") && C.get("drawNormalOnTop") && this.drawNormalRange(f, e, F, E, c), v = s.length, B = 0; v > B; B++) D.drawShape(s[B], C.get("lineColor"), void 0, C.get("lineWidth")).append();
                        if (H && C.get("valueSpots"))
                            for (w = C.get("valueSpots"), void 0 === w.get && (w = new p(w)), B = 0; r > B; B++) y = w.get(A[B]), y && D.drawCircle(f + Math.round((z[B] - this.minx) * (E / b)), e + Math.round(F - F * ((A[B] - this.miny) / c)), H, void 0, y).append();
                        H && C.get("spotColor") && null !== A[d] && D.drawCircle(f + Math.round((z[z.length - 1] - this.minx) * (E / b)), e + Math.round(F - F * ((A[d] - this.miny) / c)), H, void 0, C.get("spotColor")).append(), this.maxy !== this.minyorg && (H && C.get("minSpotColor") && (j = z[a.inArray(this.minyorg, A)], D.drawCircle(f + Math.round((j - this.minx) * (E / b)), e + Math.round(F - F * ((this.minyorg - this.miny) / c)), H, void 0, C.get("minSpotColor")).append()), H && C.get("maxSpotColor") && (j = z[a.inArray(this.maxyorg, A)], D.drawCircle(f + Math.round((j - this.minx) * (E / b)), e + Math.round(F - F * ((this.maxyorg - this.miny) / c)), H, void 0, C.get("maxSpotColor")).append())), this.lastShapeId = D.getLastShapeId(), this.canvasTop = e, D.render()
                    }
                }
            }), a.fn.sparkline.bar = u = c(a.fn.sparkline._base, s, {
                type: "bar",
                init: function(b, c, d, f, j) {
                    var k, l, m, n, o, q, r, s, t, v, w, x, y, z, A, B, C, D, E, F, G, H, I = parseInt(d.get("barWidth"), 10),
                        J = parseInt(d.get("barSpacing"), 10),
                        K = d.get("chartRangeMin"),
                        L = d.get("chartRangeMax"),
                        M = d.get("chartRangeClip"),
                        N = 1 / 0,
                        O = -1 / 0;
                    for (u._super.init.call(this, b, c, d, f, j), q = 0, r = c.length; r > q; q++) F = c[q], k = "string" == typeof F && F.indexOf(":") > -1, (k || a.isArray(F)) && (A = !0, k && (F = c[q] = h(F.split(":"))), F = i(F, null), l = Math.min.apply(Math, F), m = Math.max.apply(Math, F), N > l && (N = l), m > O && (O = m));
                    this.stacked = A, this.regionShapes = {}, this.barWidth = I, this.barSpacing = J, this.totalBarWidth = I + J, this.width = f = c.length * I + (c.length - 1) * J, this.initTarget(), M && (y = void 0 === K ? -1 / 0 : K, z = void 0 === L ? 1 / 0 : L), o = [], n = A ? [] : o;
                    var P = [],
                        Q = [];
                    for (q = 0, r = c.length; r > q; q++)
                        if (A)
                            for (B = c[q], c[q] = E = [], P[q] = 0, n[q] = Q[q] = 0, C = 0, D = B.length; D > C; C++) F = E[C] = M ? e(B[C], y, z) : B[C], null !== F && (F > 0 && (P[q] += F), 0 > N && O > 0 ? 0 > F ? Q[q] += Math.abs(F) : n[q] += F : n[q] += Math.abs(F - (0 > F ? O : N)), o.push(F));
                        else F = M ? e(c[q], y, z) : c[q], F = c[q] = g(F), null !== F && o.push(F);
                    this.max = x = Math.max.apply(Math, o), this.min = w = Math.min.apply(Math, o), this.stackMax = O = A ? Math.max.apply(Math, P) : x, this.stackMin = N = A ? Math.min.apply(Math, o) : w, void 0 !== d.get("chartRangeMin") && (d.get("chartRangeClip") || d.get("chartRangeMin") < w) && (w = d.get("chartRangeMin")), void 0 !== d.get("chartRangeMax") && (d.get("chartRangeClip") || d.get("chartRangeMax") > x) && (x = d.get("chartRangeMax")), this.zeroAxis = t = d.get("zeroAxis", !0), v = 0 >= w && x >= 0 && t ? 0 : 0 == t ? w : w > 0 ? w : x, this.xaxisOffset = v, s = A ? Math.max.apply(Math, n) + Math.max.apply(Math, Q) : x - w, this.canvasHeightEf = t && 0 > w ? this.canvasHeight - 2 : this.canvasHeight - 1, v > w ? (H = A && x >= 0 ? O : x, G = (H - v) / s * this.canvasHeight, G !== Math.ceil(G) && (this.canvasHeightEf -= 2, G = Math.ceil(G))) : G = this.canvasHeight, this.yoffset = G, a.isArray(d.get("colorMap")) ? (this.colorMapByIndex = d.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = d.get("colorMap"), this.colorMapByValue && void 0 === this.colorMapByValue.get && (this.colorMapByValue = new p(this.colorMapByValue))), this.range = s
                },
                getRegion: function(a, b) {
                    var c = Math.floor(b / this.totalBarWidth);
                    return 0 > c || c >= this.values.length ? void 0 : c
                },
                getCurrentRegionFields: function() {
                    var a, b, c = this.currentRegion,
                        d = n(this.values[c]),
                        e = [];
                    for (b = d.length; b--;) a = d[b], e.push({
                        isNull: null === a,
                        value: a,
                        color: this.calcColor(b, a, c),
                        offset: c
                    });
                    return e
                },
                calcColor: function(b, c, d) {
                    var e, f, g = this.colorMapByIndex,
                        h = this.colorMapByValue,
                        i = this.options;
                    return e = i.get(this.stacked ? "stackedBarColor" : 0 > c ? "negBarColor" : "barColor"), 0 === c && void 0 !== i.get("zeroColor") && (e = i.get("zeroColor")), h && (f = h.get(c)) ? e = f : g && g.length > d && (e = g[d]), a.isArray(e) ? e[b % e.length] : e
                },
                renderRegion: function(b, c) {
                    var d, e, f, g, h, i, j, l, m, n, o = this.values[b],
                        p = this.options,
                        q = this.xaxisOffset,
                        r = [],
                        s = this.range,
                        t = this.stacked,
                        u = this.target,
                        v = b * this.totalBarWidth,
                        w = this.canvasHeightEf,
                        x = this.yoffset;
                    if (o = a.isArray(o) ? o : [o], j = o.length, l = o[0], g = k(null, o), n = k(q, o, !0), g) return p.get("nullColor") ? (f = c ? p.get("nullColor") : this.calcHighlightColor(p.get("nullColor"), p), d = x > 0 ? x - 1 : x, u.drawRect(v, d, this.barWidth - 1, 0, f, f)) : void 0;
                    for (h = x, i = 0; j > i; i++) {
                        if (l = o[i], t && l === q) {
                            if (!n || m) continue;
                            m = !0
                        }
                        e = s > 0 ? Math.floor(w * (Math.abs(l - q) / s)) + 1 : 1, q > l || l === q && 0 === x ? (d = h, h += e) : (d = x - e, x -= e), f = this.calcColor(i, l, b), c && (f = this.calcHighlightColor(f, p)), r.push(u.drawRect(v, d, this.barWidth - 1, e - 1, f, f))
                    }
                    return 1 === r.length ? r[0] : r
                }
            }), a.fn.sparkline.tristate = v = c(a.fn.sparkline._base, s, {
                type: "tristate",
                init: function(b, c, d, e, f) {
                    var g = parseInt(d.get("barWidth"), 10),
                        h = parseInt(d.get("barSpacing"), 10);
                    v._super.init.call(this, b, c, d, e, f), this.regionShapes = {}, this.barWidth = g, this.barSpacing = h, this.totalBarWidth = g + h, this.values = a.map(c, Number), this.width = e = c.length * g + (c.length - 1) * h, a.isArray(d.get("colorMap")) ? (this.colorMapByIndex = d.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = d.get("colorMap"), this.colorMapByValue && void 0 === this.colorMapByValue.get && (this.colorMapByValue = new p(this.colorMapByValue))), this.initTarget()
                },
                getRegion: function(a, b) {
                    return Math.floor(b / this.totalBarWidth)
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: void 0 === this.values[a],
                        value: this.values[a],
                        color: this.calcColor(this.values[a], a),
                        offset: a
                    }
                },
                calcColor: function(a, b) {
                    var c, d, e = this.values,
                        f = this.options,
                        g = this.colorMapByIndex,
                        h = this.colorMapByValue;
                    return c = h && (d = h.get(a)) ? d : g && g.length > b ? g[b] : f.get(e[b] < 0 ? "negBarColor" : e[b] > 0 ? "posBarColor" : "zeroBarColor")
                },
                renderRegion: function(a, b) {
                    var c, d, e, f, g, h, i = this.values,
                        j = this.options,
                        k = this.target;
                    return c = k.pixelHeight, e = Math.round(c / 2), f = a * this.totalBarWidth, i[a] < 0 ? (g = e, d = e - 1) : i[a] > 0 ? (g = 0, d = e - 1) : (g = e - 1, d = 2), h = this.calcColor(i[a], a), null !== h ? (b && (h = this.calcHighlightColor(h, j)), k.drawRect(f, g, this.barWidth - 1, d - 1, h, h)) : void 0
                }
            }), a.fn.sparkline.discrete = w = c(a.fn.sparkline._base, s, {
                type: "discrete",
                init: function(b, c, d, e, f) {
                    w._super.init.call(this, b, c, d, e, f), this.regionShapes = {}, this.values = c = a.map(c, Number), this.min = Math.min.apply(Math, c), this.max = Math.max.apply(Math, c), this.range = this.max - this.min, this.width = e = "auto" === d.get("width") ? 2 * c.length : this.width, this.interval = Math.floor(e / c.length), this.itemWidth = e / c.length, void 0 !== d.get("chartRangeMin") && (d.get("chartRangeClip") || d.get("chartRangeMin") < this.min) && (this.min = d.get("chartRangeMin")), void 0 !== d.get("chartRangeMax") && (d.get("chartRangeClip") || d.get("chartRangeMax") > this.max) && (this.max = d.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = "auto" === d.get("lineHeight") ? Math.round(.3 * this.canvasHeight) : d.get("lineHeight"))
                },
                getRegion: function(a, b) {
                    return Math.floor(b / this.itemWidth)
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: void 0 === this.values[a],
                        value: this.values[a],
                        offset: a
                    }
                },
                renderRegion: function(a, b) {
                    var c, d, f, g, h = this.values,
                        i = this.options,
                        j = this.min,
                        k = this.max,
                        l = this.range,
                        m = this.interval,
                        n = this.target,
                        o = this.canvasHeight,
                        p = this.lineHeight,
                        q = o - p;
                    return d = e(h[a], j, k), g = a * m, c = Math.round(q - q * ((d - j) / l)), f = i.get(i.get("thresholdColor") && d < i.get("thresholdValue") ? "thresholdColor" : "lineColor"), b && (f = this.calcHighlightColor(f, i)), n.drawLine(g, c, g, c + p, f)
                }
            }), a.fn.sparkline.bullet = x = c(a.fn.sparkline._base, {
                type: "bullet",
                init: function(a, b, c, d, e) {
                    var f, g, i;
                    x._super.init.call(this, a, b, c, d, e), this.values = b = h(b), i = b.slice(), i[0] = null === i[0] ? i[2] : i[0], i[1] = null === b[1] ? i[2] : i[1], f = Math.min.apply(Math, b), g = Math.max.apply(Math, b), f = void 0 === c.get("base") ? 0 > f ? f : 0 : c.get("base"), this.min = f, this.max = g, this.range = g - f, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = d = "auto" === c.get("width") ? "4.0em" : d, this.target = this.$el.simpledraw(d, e, c.get("composite")), b.length || (this.disabled = !0), this.initTarget()
                },
                getRegion: function(a, b, c) {
                    var d = this.target.getShapeAt(a, b, c);
                    return void 0 !== d && void 0 !== this.shapes[d] ? this.shapes[d] : void 0
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        fieldkey: a.substr(0, 1),
                        value: this.values[a.substr(1)],
                        region: a
                    }
                },
                changeHighlight: function(a) {
                    var b, c = this.currentRegion,
                        d = this.valueShapes[c];
                    switch (delete this.shapes[d], c.substr(0, 1)) {
                        case "r":
                            b = this.renderRange(c.substr(1), a);
                            break;
                        case "p":
                            b = this.renderPerformance(a);
                            break;
                        case "t":
                            b = this.renderTarget(a)
                    }
                    this.valueShapes[c] = b.id, this.shapes[b.id] = c, this.target.replaceWithShape(d, b)
                },
                renderRange: function(a, b) {
                    var c = this.values[a],
                        d = Math.round(this.canvasWidth * ((c - this.min) / this.range)),
                        e = this.options.get("rangeColors")[a - 2];
                    return b && (e = this.calcHighlightColor(e, this.options)), this.target.drawRect(0, 0, d - 1, this.canvasHeight - 1, e, e)
                },
                renderPerformance: function(a) {
                    var b = this.values[1],
                        c = Math.round(this.canvasWidth * ((b - this.min) / this.range)),
                        d = this.options.get("performanceColor");
                    return a && (d = this.calcHighlightColor(d, this.options)), this.target.drawRect(0, Math.round(.3 * this.canvasHeight), c - 1, Math.round(.4 * this.canvasHeight) - 1, d, d)
                },
                renderTarget: function(a) {
                    var b = this.values[0],
                        c = Math.round(this.canvasWidth * ((b - this.min) / this.range) - this.options.get("targetWidth") / 2),
                        d = Math.round(.1 * this.canvasHeight),
                        e = this.canvasHeight - 2 * d,
                        f = this.options.get("targetColor");
                    return a && (f = this.calcHighlightColor(f, this.options)), this.target.drawRect(c, d, this.options.get("targetWidth") - 1, e - 1, f, f)
                },
                render: function() {
                    var a, b, c = this.values.length,
                        d = this.target;
                    if (x._super.render.call(this)) {
                        for (a = 2; c > a; a++) b = this.renderRange(a).append(), this.shapes[b.id] = "r" + a, this.valueShapes["r" + a] = b.id;
                        null !== this.values[1] && (b = this.renderPerformance().append(), this.shapes[b.id] = "p1", this.valueShapes.p1 = b.id), null !== this.values[0] && (b = this.renderTarget().append(), this.shapes[b.id] = "t0", this.valueShapes.t0 = b.id), d.render()
                    }
                }
            }), a.fn.sparkline.pie = y = c(a.fn.sparkline._base, {
                type: "pie",
                init: function(b, c, d, e, f) {
                    var g, h = 0;
                    if (y._super.init.call(this, b, c, d, e, f), this.shapes = {}, this.valueShapes = {}, this.values = c = a.map(c, Number), "auto" === d.get("width") && (this.width = this.height), c.length > 0)
                        for (g = c.length; g--;) h += c[g];
                    this.total = h, this.initTarget(), this.radius = Math.floor(Math.min(this.canvasWidth, this.canvasHeight) / 2)
                },
                getRegion: function(a, b, c) {
                    var d = this.target.getShapeAt(a, b, c);
                    return void 0 !== d && void 0 !== this.shapes[d] ? this.shapes[d] : void 0
                },
                getCurrentRegionFields: function() {
                    var a = this.currentRegion;
                    return {
                        isNull: void 0 === this.values[a],
                        value: this.values[a],
                        percent: this.values[a] / this.total * 100,
                        color: this.options.get("sliceColors")[a % this.options.get("sliceColors").length],
                        offset: a
                    }
                },
                changeHighlight: function(a) {
                    var b = this.currentRegion,
                        c = this.renderSlice(b, a),
                        d = this.valueShapes[b];
                    delete this.shapes[d], this.target.replaceWithShape(d, c), this.valueShapes[b] = c.id, this.shapes[c.id] = b
                },
                renderSlice: function(a, b) {
                    var c, d, e, f, g, h = this.target,
                        i = this.options,
                        j = this.radius,
                        k = i.get("borderWidth"),
                        l = i.get("offset"),
                        m = 2 * Math.PI,
                        n = this.values,
                        o = this.total,
                        p = l ? 2 * Math.PI * (l / 360) : 0;
                    for (f = n.length, e = 0; f > e; e++) {
                        if (c = p, d = p, o > 0 && (d = p + m * (n[e] / o)), a === e) return g = i.get("sliceColors")[e % i.get("sliceColors").length], b && (g = this.calcHighlightColor(g, i)), h.drawPieSlice(j, j, j - k, c, d, void 0, g);
                        p = d
                    }
                },
                render: function() {
                    var a, b, c = this.target,
                        d = this.values,
                        e = this.options,
                        f = this.radius,
                        g = e.get("borderWidth");
                    if (y._super.render.call(this)) {
                        for (g && c.drawCircle(f, f, Math.floor(f - g / 2), e.get("borderColor"), void 0, g).append(), b = d.length; b--;) d[b] && (a = this.renderSlice(b).append(), this.valueShapes[b] = a.id, this.shapes[a.id] = b);
                        c.render()
                    }
                }
            }), a.fn.sparkline.box = z = c(a.fn.sparkline._base, {
                type: "box",
                init: function(b, c, d, e, f) {
                    z._super.init.call(this, b, c, d, e, f), this.values = a.map(c, Number), this.width = "auto" === d.get("width") ? "4.0em" : e, this.initTarget(), this.values.length || (this.disabled = 1)
                },
                getRegion: function() {
                    return 1
                },
                getCurrentRegionFields: function() {
                    var a = [{
                        field: "lq",
                        value: this.quartiles[0]
                    }, {
                        field: "med",
                        value: this.quartiles[1]
                    }, {
                        field: "uq",
                        value: this.quartiles[2]
                    }];
                    return void 0 !== this.loutlier && a.push({
                        field: "lo",
                        value: this.loutlier
                    }), void 0 !== this.routlier && a.push({
                        field: "ro",
                        value: this.routlier
                    }), void 0 !== this.lwhisker && a.push({
                        field: "lw",
                        value: this.lwhisker
                    }), void 0 !== this.rwhisker && a.push({
                        field: "rw",
                        value: this.rwhisker
                    }), a
                },
                render: function() {
                    var a, b, c, d, e, g, h, i, j, k, l, m = this.target,
                        n = this.values,
                        o = n.length,
                        p = this.options,
                        q = this.canvasWidth,
                        r = this.canvasHeight,
                        s = void 0 === p.get("chartRangeMin") ? Math.min.apply(Math, n) : p.get("chartRangeMin"),
                        t = void 0 === p.get("chartRangeMax") ? Math.max.apply(Math, n) : p.get("chartRangeMax"),
                        u = 0;
                    if (z._super.render.call(this)) {
                        if (p.get("raw")) p.get("showOutliers") && n.length > 5 ? (b = n[0], a = n[1], d = n[2], e = n[3], g = n[4], h = n[5], i = n[6]) : (a = n[0], d = n[1], e = n[2], g = n[3], h = n[4]);
                        else if (n.sort(function(a, b) {
                                return a - b
                            }), d = f(n, 1), e = f(n, 2), g = f(n, 3), c = g - d, p.get("showOutliers")) {
                            for (a = h = void 0, j = 0; o > j; j++) void 0 === a && n[j] > d - c * p.get("outlierIQR") && (a = n[j]), n[j] < g + c * p.get("outlierIQR") && (h = n[j]);
                            b = n[0], i = n[o - 1]
                        } else a = n[0], h = n[o - 1];
                        this.quartiles = [d, e, g], this.lwhisker = a, this.rwhisker = h, this.loutlier = b, this.routlier = i, l = q / (t - s + 1), p.get("showOutliers") && (u = Math.ceil(p.get("spotRadius")), q -= 2 * Math.ceil(p.get("spotRadius")), l = q / (t - s + 1), a > b && m.drawCircle((b - s) * l + u, r / 2, p.get("spotRadius"), p.get("outlierLineColor"), p.get("outlierFillColor")).append(), i > h && m.drawCircle((i - s) * l + u, r / 2, p.get("spotRadius"), p.get("outlierLineColor"), p.get("outlierFillColor")).append()), m.drawRect(Math.round((d - s) * l + u), Math.round(.1 * r), Math.round((g - d) * l), Math.round(.8 * r), p.get("boxLineColor"), p.get("boxFillColor")).append(), m.drawLine(Math.round((a - s) * l + u), Math.round(r / 2), Math.round((d - s) * l + u), Math.round(r / 2), p.get("lineColor")).append(), m.drawLine(Math.round((a - s) * l + u), Math.round(r / 4), Math.round((a - s) * l + u), Math.round(r - r / 4), p.get("whiskerColor")).append(), m.drawLine(Math.round((h - s) * l + u), Math.round(r / 2), Math.round((g - s) * l + u), Math.round(r / 2), p.get("lineColor")).append(), m.drawLine(Math.round((h - s) * l + u), Math.round(r / 4), Math.round((h - s) * l + u), Math.round(r - r / 4), p.get("whiskerColor")).append(), m.drawLine(Math.round((e - s) * l + u), Math.round(.1 * r), Math.round((e - s) * l + u), Math.round(.9 * r), p.get("medianColor")).append(), p.get("target") && (k = Math.ceil(p.get("spotRadius")), m.drawLine(Math.round((p.get("target") - s) * l + u), Math.round(r / 2 - k), Math.round((p.get("target") - s) * l + u), Math.round(r / 2 + k), p.get("targetColor")).append(), m.drawLine(Math.round((p.get("target") - s) * l + u - k), Math.round(r / 2), Math.round((p.get("target") - s) * l + u + k), Math.round(r / 2), p.get("targetColor")).append()), m.render()
                    }
                }
            }),
            function() {
                document.namespaces && !document.namespaces.v ? (a.fn.sparkline.hasVML = !0, document.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML")) : a.fn.sparkline.hasVML = !1;
                var b = document.createElement("canvas");
                a.fn.sparkline.hasCanvas = !(!b.getContext || !b.getContext("2d"))
            }(), C = c({
                init: function(a, b, c, d) {
                    this.target = a, this.id = b, this.type = c, this.args = d
                },
                append: function() {
                    return this.target.appendShape(this), this
                }
            }), D = c({
                _pxregex: /(\d+)(px)?\s*$/i,
                init: function(b, c, d) {
                    b && (this.width = b, this.height = c, this.target = d, this.lastShapeId = null, d[0] && (d = d[0]), a.data(d, "_jqs_vcanvas", this))
                },
                drawLine: function(a, b, c, d, e, f) {
                    return this.drawShape([
                        [a, b],
                        [c, d]
                    ], e, f)
                },
                drawShape: function(a, b, c, d) {
                    return this._genShape("Shape", [a, b, c, d])
                },
                drawCircle: function(a, b, c, d, e, f) {
                    return this._genShape("Circle", [a, b, c, d, e, f])
                },
                drawPieSlice: function(a, b, c, d, e, f, g) {
                    return this._genShape("PieSlice", [a, b, c, d, e, f, g])
                },
                drawRect: function(a, b, c, d, e, f) {
                    return this._genShape("Rect", [a, b, c, d, e, f])
                },
                getElement: function() {
                    return this.canvas
                },
                getLastShapeId: function() {
                    return this.lastShapeId
                },
                reset: function() {
                    alert("reset not implemented")
                },
                _insert: function(b, c) {
                    a(c).html(b)
                },
                _calculatePixelDims: function(b, c, d) {
                    var e;
                    e = this._pxregex.exec(c), this.pixelHeight = e ? e[1] : a(d).height(), e = this._pxregex.exec(b), this.pixelWidth = e ? e[1] : a(d).width()
                },
                _genShape: function(a, b) {
                    var c = I++;
                    return b.unshift(c), new C(this, c, a, b)
                },
                appendShape: function() {
                    alert("appendShape not implemented")
                },
                replaceWithShape: function() {
                    alert("replaceWithShape not implemented")
                },
                insertAfterShape: function() {
                    alert("insertAfterShape not implemented")
                },
                removeShapeId: function() {
                    alert("removeShapeId not implemented")
                },
                getShapeAt: function() {
                    alert("getShapeAt not implemented")
                },
                render: function() {
                    alert("render not implemented")
                }
            }), E = c(D, {
                init: function(b, c, d, e) {
                    E._super.init.call(this, b, c, d), this.canvas = document.createElement("canvas"), d[0] && (d = d[0]), a.data(d, "_jqs_vcanvas", this), a(this.canvas).css({
                        display: "inline-block",
                        width: b,
                        height: c,
                        verticalAlign: "top"
                    }), this._insert(this.canvas, d), this._calculatePixelDims(b, c, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = e, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = void 0, a(this.canvas).css({
                        width: this.pixelWidth,
                        height: this.pixelHeight
                    })
                },
                _getContext: function(a, b, c) {
                    var d = this.canvas.getContext("2d");
                    return void 0 !== a && (d.strokeStyle = a), d.lineWidth = void 0 === c ? 1 : c, void 0 !== b && (d.fillStyle = b), d
                },
                reset: function() {
                    var a = this._getContext();
                    a.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = void 0
                },
                _drawShape: function(a, b, c, d, e) {
                    var f, g, h = this._getContext(c, d, e);
                    for (h.beginPath(), h.moveTo(b[0][0] + .5, b[0][1] + .5), f = 1, g = b.length; g > f; f++) h.lineTo(b[f][0] + .5, b[f][1] + .5);
                    void 0 !== c && h.stroke(), void 0 !== d && h.fill(), void 0 !== this.targetX && void 0 !== this.targetY && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
                },
                _drawCircle: function(a, b, c, d, e, f, g) {
                    var h = this._getContext(e, f, g);
                    h.beginPath(), h.arc(b, c, d, 0, 2 * Math.PI, !1), void 0 !== this.targetX && void 0 !== this.targetY && h.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a), void 0 !== e && h.stroke(), void 0 !== f && h.fill()
                },
                _drawPieSlice: function(a, b, c, d, e, f, g, h) {
                    var i = this._getContext(g, h);
                    i.beginPath(), i.moveTo(b, c), i.arc(b, c, d, e, f, !1), i.lineTo(b, c), i.closePath(), void 0 !== g && i.stroke(), h && i.fill(), void 0 !== this.targetX && void 0 !== this.targetY && i.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
                },
                _drawRect: function(a, b, c, d, e, f, g) {
                    return this._drawShape(a, [
                        [b, c],
                        [b + d, c],
                        [b + d, c + e],
                        [b, c + e],
                        [b, c]
                    ], f, g)
                },
                appendShape: function(a) {
                    return this.shapes[a.id] = a, this.shapeseq.push(a.id), this.lastShapeId = a.id, a.id
                },
                replaceWithShape: function(a, b) {
                    var c, d = this.shapeseq;
                    for (this.shapes[b.id] = b, c = d.length; c--;) d[c] == a && (d[c] = b.id);
                    delete this.shapes[a]
                },
                replaceWithShapes: function(a, b) {
                    var c, d, e, f = this.shapeseq,
                        g = {};
                    for (d = a.length; d--;) g[a[d]] = !0;
                    for (d = f.length; d--;) c = f[d], g[c] && (f.splice(d, 1), delete this.shapes[c], e = d);
                    for (d = b.length; d--;) f.splice(e, 0, b[d].id), this.shapes[b[d].id] = b[d]
                },
                insertAfterShape: function(a, b) {
                    var c, d = this.shapeseq;
                    for (c = d.length; c--;)
                        if (d[c] === a) return d.splice(c + 1, 0, b.id), void(this.shapes[b.id] = b)
                },
                removeShapeId: function(a) {
                    var b, c = this.shapeseq;
                    for (b = c.length; b--;)
                        if (c[b] === a) {
                            c.splice(b, 1);
                            break
                        }
                    delete this.shapes[a]
                },
                getShapeAt: function(a, b, c) {
                    return this.targetX = b, this.targetY = c, this.render(), this.currentTargetShapeId
                },
                render: function() {
                    var a, b, c, d = this.shapeseq,
                        e = this.shapes,
                        f = d.length,
                        g = this._getContext();
                    for (g.clearRect(0, 0, this.pixelWidth, this.pixelHeight), c = 0; f > c; c++) a = d[c], b = e[a], this["_draw" + b.type].apply(this, b.args);
                    this.interact || (this.shapes = {}, this.shapeseq = [])
                }
            }), F = c(D, {
                init: function(b, c, d) {
                    var e;
                    F._super.init.call(this, b, c, d), d[0] && (d = d[0]), a.data(d, "_jqs_vcanvas", this), this.canvas = document.createElement("span"), a(this.canvas).css({
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden",
                        width: b,
                        height: c,
                        margin: "0px",
                        padding: "0px",
                        verticalAlign: "top"
                    }), this._insert(this.canvas, d), this._calculatePixelDims(b, c, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, e = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", e), this.group = a(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
                },
                _drawShape: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m = [];
                    for (l = 0, k = b.length; k > l; l++) m[l] = "" + b[l][0] + "," + b[l][1];
                    return f = m.splice(0, 1), e = void 0 === e ? 1 : e, g = void 0 === c ? ' stroked="false" ' : ' strokeWeight="' + e + 'px" strokeColor="' + c + '" ', h = void 0 === d ? ' filled="false"' : ' fillColor="' + d + '" filled="true" ', i = m[0] === m[m.length - 1] ? "x " : "", j = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + a + '" ' + g + h + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + f + " l " + m.join(", ") + " " + i + 'e"> </v:shape>'
                },
                _drawCircle: function(a, b, c, d, e, f, g) {
                    var h, i, j;
                    return b -= d, c -= d, h = void 0 === e ? ' stroked="false" ' : ' strokeWeight="' + g + 'px" strokeColor="' + e + '" ', i = void 0 === f ? ' filled="false"' : ' fillColor="' + f + '" filled="true" ', j = '<v:oval  id="jqsshape' + a + '" ' + h + i + ' style="position:absolute;top:' + c + "px; left:" + b + "px; width:" + 2 * d + "px; height:" + 2 * d + 'px"></v:oval>'
                },
                _drawPieSlice: function(a, b, c, d, e, f, g, h) {
                    var i, j, k, l, m, n, o, p;
                    if (e === f) return "";
                    if (f - e === 2 * Math.PI && (e = 0, f = 2 * Math.PI), j = b + Math.round(Math.cos(e) * d), k = c + Math.round(Math.sin(e) * d), l = b + Math.round(Math.cos(f) * d), m = c + Math.round(Math.sin(f) * d), j === l && k === m) {
                        if (f - e < Math.PI) return "";
                        j = l = b + d, k = m = c
                    }
                    return j === l && k === m && f - e < Math.PI ? "" : (i = [b - d, c - d, b + d, c + d, j, k, l, m], n = void 0 === g ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + g + '" ', o = void 0 === h ? ' filled="false"' : ' fillColor="' + h + '" filled="true" ', p = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"  id="jqsshape' + a + '" ' + n + o + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;"  path="m ' + b + "," + c + " wa " + i.join(", ") + ' x e"> </v:shape>')
                },
                _drawRect: function(a, b, c, d, e, f, g) {
                    return this._drawShape(a, [
                        [b, c],
                        [b, c + e],
                        [b + d, c + e],
                        [b + d, c],
                        [b, c]
                    ], f, g)
                },
                reset: function() {
                    this.group.innerHTML = ""
                },
                appendShape: function(a) {
                    var b = this["_draw" + a.type].apply(this, a.args);
                    return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", b) : this.prerender += b, this.lastShapeId = a.id, a.id
                },
                replaceWithShape: function(b, c) {
                    var d = a("#jqsshape" + b),
                        e = this["_draw" + c.type].apply(this, c.args);
                    d[0].outerHTML = e
                },
                replaceWithShapes: function(b, c) {
                    var d, e = a("#jqsshape" + b[0]),
                        f = "",
                        g = c.length;
                    for (d = 0; g > d; d++) f += this["_draw" + c[d].type].apply(this, c[d].args);
                    for (e[0].outerHTML = f, d = 1; d < b.length; d++) a("#jqsshape" + b[d]).remove()
                },
                insertAfterShape: function(b, c) {
                    var d = a("#jqsshape" + b),
                        e = this["_draw" + c.type].apply(this, c.args);
                    d[0].insertAdjacentHTML("afterEnd", e)
                },
                removeShapeId: function(b) {
                    var c = a("#jqsshape" + b);
                    this.group.removeChild(c[0])
                },
                getShapeAt: function(a) {
                    var b = a.id.substr(8);
                    return b
                },
                render: function() {
                    this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
                }
            })
    }),
    function(a, b, c) {
        ! function(a) {
            "use strict";
            "function" == typeof define && define.amd ? define("datatables", ["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : jQuery && !jQuery.fn.dataTable && a(jQuery)
        }(function(d) {
            "use strict";

            function e(a) {
                var b, c, f = "a aa ai ao as b fn i m o s ",
                    g = {};
                d.each(a, function(d) {
                    b = d.match(/^([^A-Z]+?)([A-Z])/), b && -1 !== f.indexOf(b[1] + " ") && (c = d.replace(b[0], b[2].toLowerCase()), g[c] = d, "o" === b[1] && e(a[d]))
                }), a._hungarianMap = g
            }

            function f(a, b, g) {
                a._hungarianMap || e(a);
                var h;
                d.each(b, function(e) {
                    h = a._hungarianMap[e], h === c || !g && b[h] !== c || ("o" === h.charAt(0) ? (b[h] || (b[h] = {}), d.extend(!0, b[h], b[e]), f(a[h], b[h], g)) : b[h] = b[e])
                })
            }

            function g(a) {
                var b = Wb.defaults.oLanguage,
                    c = a.sZeroRecords;
                !a.sEmptyTable && c && "No data available in table" === b.sEmptyTable && Lb(a, a, "sZeroRecords", "sEmptyTable"), !a.sLoadingRecords && c && "Loading..." === b.sLoadingRecords && Lb(a, a, "sZeroRecords", "sLoadingRecords"), a.sInfoThousands && (a.sThousands = a.sInfoThousands);
                var d = a.sDecimal;
                d && Ub(d)
            }

            function h(a) {
                rc(a, "ordering", "bSort"), rc(a, "orderMulti", "bSortMulti"), rc(a, "orderClasses", "bSortClasses"), rc(a, "orderCellsTop", "bSortCellsTop"), rc(a, "order", "aaSorting"), rc(a, "orderFixed", "aaSortingFixed"), rc(a, "paging", "bPaginate"), rc(a, "pagingType", "sPaginationType"), rc(a, "pageLength", "iDisplayLength"), rc(a, "searching", "bFilter");
                var b = a.aoSearchCols;
                if (b)
                    for (var c = 0, d = b.length; d > c; c++) b[c] && f(Wb.models.oSearch, b[c])
            }

            function i(a) {
                rc(a, "orderable", "bSortable"), rc(a, "orderData", "aDataSort"), rc(a, "orderSequence", "asSorting"), rc(a, "orderDataType", "sortDataType")
            }

            function j(a) {
                var b = a.oBrowser,
                    c = d("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: 1,
                        width: 1,
                        overflow: "hidden"
                    }).append(d("<div/>").css({
                        position: "absolute",
                        top: 1,
                        left: 1,
                        width: 100,
                        overflow: "scroll"
                    }).append(d('<div class="test"/>').css({
                        width: "100%",
                        height: 10
                    }))).appendTo("body"),
                    e = c.find(".test");
                b.bScrollOversize = 100 === e[0].offsetWidth, b.bScrollbarLeft = 1 !== e.offset().left, c.remove()
            }

            function k(a, b, d, e, f, g) {
                var h, i = e,
                    j = !1;
                for (d !== c && (h = d, j = !0); i !== f;) a.hasOwnProperty(i) && (h = j ? b(h, a[i], i, a) : a[i], j = !0, i += g);
                return h
            }

            function l(a, c) {
                var e = Wb.defaults.column,
                    f = a.aoColumns.length,
                    g = d.extend({}, Wb.models.oColumn, e, {
                        nTh: c ? c : b.createElement("th"),
                        sTitle: e.sTitle ? e.sTitle : c ? c.innerHTML : "",
                        aDataSort: e.aDataSort ? e.aDataSort : [f],
                        mData: e.mData ? e.mData : f,
                        idx: f
                    });
                a.aoColumns.push(g);
                var h = a.aoPreSearchCols;
                h[f] = d.extend({}, Wb.models.oSearch, h[f]), m(a, f, null)
            }

            function m(a, b, e) {
                var g = a.aoColumns[b],
                    h = a.oClasses,
                    j = d(g.nTh);
                if (!g.sWidthOrig) {
                    g.sWidthOrig = j.attr("width") || null;
                    var k = (j.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                    k && (g.sWidthOrig = k[1])
                }
                e !== c && null !== e && (i(e), f(Wb.defaults.column, e), e.mDataProp === c || e.mData || (e.mData = e.mDataProp), e.sType && (g._sManualType = e.sType), e.className && !e.sClass && (e.sClass = e.className), d.extend(g, e), Lb(g, e, "sWidth", "sWidthOrig"), "number" == typeof e.iDataSort && (g.aDataSort = [e.iDataSort]), Lb(g, e, "aDataSort"));
                var l = g.mData,
                    m = B(l),
                    n = g.mRender ? B(g.mRender) : null,
                    o = function(a) {
                        return "string" == typeof a && -1 !== a.indexOf("@")
                    };
                g._bAttrSrc = d.isPlainObject(l) && (o(l.sort) || o(l.type) || o(l.filter)), g.fnGetData = function(a, b, d) {
                    var e = m(a, b, c, d);
                    return n && b ? n(e, b, a, d) : e
                }, g.fnSetData = function(a, b, c) {
                    return C(l)(a, b, c)
                }, a.oFeatures.bSort || (g.bSortable = !1, j.addClass(h.sSortableNone));
                var p = -1 !== d.inArray("asc", g.asSorting),
                    q = -1 !== d.inArray("desc", g.asSorting);
                g.bSortable && (p || q) ? p && !q ? (g.sSortingClass = h.sSortableAsc, g.sSortingClassJUI = h.sSortJUIAscAllowed) : !p && q ? (g.sSortingClass = h.sSortableDesc, g.sSortingClassJUI = h.sSortJUIDescAllowed) : (g.sSortingClass = h.sSortable, g.sSortingClassJUI = h.sSortJUI) : (g.sSortingClass = h.sSortableNone, g.sSortingClassJUI = "")
            }

            function n(a) {
                if (a.oFeatures.bAutoWidth !== !1) {
                    var b = a.aoColumns;
                    sb(a);
                    for (var c = 0, d = b.length; d > c; c++) b[c].nTh.style.width = b[c].sWidth
                }
                var e = a.oScroll;
                ("" !== e.sY || "" !== e.sX) && qb(a), Pb(a, null, "column-sizing", [a])
            }

            function o(a, b) {
                var c = r(a, "bVisible");
                return "number" == typeof c[b] ? c[b] : null
            }

            function p(a, b) {
                var c = r(a, "bVisible"),
                    e = d.inArray(b, c);
                return -1 !== e ? e : null
            }

            function q(a) {
                return r(a, "bVisible").length
            }

            function r(a, b) {
                var c = [];
                return d.map(a.aoColumns, function(a, d) {
                    a[b] && c.push(d)
                }), c
            }

            function s(a) {
                var b, d, e, f, g, h, i, j, k, l = a.aoColumns,
                    m = a.aoData,
                    n = Wb.ext.type.detect;
                for (b = 0, d = l.length; d > b; b++)
                    if (i = l[b], k = [], !i.sType && i._sManualType) i.sType = i._sManualType;
                    else if (!i.sType) {
                    for (e = 0, f = n.length; f > e; e++) {
                        for (g = 0, h = m.length; h > g && (k[g] === c && (k[g] = y(a, g, b, "type")), j = n[e](k[g], a), j && "html" !== j); g++);
                        if (j) {
                            i.sType = j;
                            break
                        }
                    }
                    i.sType || (i.sType = "string")
                }
            }

            function t(a, b, e, f) {
                var g, h, i, j, k, m, n, o = a.aoColumns;
                if (b)
                    for (g = b.length - 1; g >= 0; g--) {
                        n = b[g];
                        var p = n.targets !== c ? n.targets : n.aTargets;
                        for (d.isArray(p) || (p = [p]), i = 0, j = p.length; j > i; i++)
                            if ("number" == typeof p[i] && p[i] >= 0) {
                                for (; o.length <= p[i];) l(a);
                                f(p[i], n)
                            } else if ("number" == typeof p[i] && p[i] < 0) f(o.length + p[i], n);
                        else if ("string" == typeof p[i])
                            for (k = 0, m = o.length; m > k; k++)("_all" == p[i] || d(o[k].nTh).hasClass(p[i])) && f(k, n)
                    }
                if (e)
                    for (g = 0, h = e.length; h > g; g++) f(g, e[g])
            }

            function u(a, b, c, e) {
                var f = a.aoData.length,
                    g = d.extend(!0, {}, Wb.models.oRow, {
                        src: c ? "dom" : "data"
                    });
                g._aData = b, a.aoData.push(g);
                for (var h = a.aoColumns, i = 0, j = h.length; j > i; i++) c && z(a, f, i, y(a, f, i)), h[i].sType = null;
                return a.aiDisplayMaster.push(f), (c || !a.oFeatures.bDeferRender) && I(a, f, c, e), f
            }

            function v(a, b) {
                var c;
                return b instanceof d || (b = d(b)), b.map(function(b, d) {
                    return c = H(a, d), u(a, c.data, d, c.cells)
                })
            }

            function w(a, b) {
                return b._DT_RowIndex !== c ? b._DT_RowIndex : null
            }

            function x(a, b, c) {
                return d.inArray(c, a.aoData[b].anCells)
            }

            function y(a, b, d, e) {
                var f = a.iDraw,
                    g = a.aoColumns[d],
                    h = a.aoData[b]._aData,
                    i = g.sDefaultContent,
                    j = g.fnGetData(h, e, {
                        settings: a,
                        row: b,
                        col: d
                    });
                if (j === c) return a.iDrawError != f && null === i && (Kb(a, 0, "Requested unknown parameter " + ("function" == typeof g.mData ? "{function}" : "'" + g.mData + "'") + " for row " + b, 4), a.iDrawError = f), i;
                if (j !== h && null !== j || null === i) {
                    if ("function" == typeof j) return j.call(h)
                } else j = i;
                return null === j && "display" == e ? "" : j
            }

            function z(a, b, c, d) {
                var e = a.aoColumns[c],
                    f = a.aoData[b]._aData;
                e.fnSetData(f, d, {
                    settings: a,
                    row: b,
                    col: c
                })
            }

            function A(a) {
                return d.map(a.match(/(\\.|[^\.])+/g), function(a) {
                    return a.replace(/\\./g, ".")
                })
            }

            function B(a) {
                if (d.isPlainObject(a)) {
                    var b = {};
                    return d.each(a, function(a, c) {
                            c && (b[a] = B(c))
                        }),
                        function(a, d, e, f) {
                            var g = b[d] || b._;
                            return g !== c ? g(a, d, e, f) : a
                        }
                }
                if (null === a) return function(a) {
                    return a
                };
                if ("function" == typeof a) return function(b, c, d, e) {
                    return a(b, c, d, e)
                };
                if ("string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(b) {
                    return b[a]
                };
                var e = function(a, b, d) {
                    var f, g, h, i;
                    if ("" !== d)
                        for (var j = A(d), k = 0, l = j.length; l > k; k++) {
                            if (f = j[k].match(sc), g = j[k].match(tc), f) {
                                j[k] = j[k].replace(sc, ""), "" !== j[k] && (a = a[j[k]]), h = [], j.splice(0, k + 1), i = j.join(".");
                                for (var m = 0, n = a.length; n > m; m++) h.push(e(a[m], b, i));
                                var o = f[0].substring(1, f[0].length - 1);
                                a = "" === o ? h : h.join(o);
                                break
                            }
                            if (g) j[k] = j[k].replace(tc, ""), a = a[j[k]]();
                            else {
                                if (null === a || a[j[k]] === c) return c;
                                a = a[j[k]]
                            }
                        }
                    return a
                };
                return function(b, c) {
                    return e(b, c, a)
                }
            }

            function C(a) {
                if (d.isPlainObject(a)) return C(a._);
                if (null === a) return function() {};
                if ("function" == typeof a) return function(b, c, d) {
                    a(b, "set", c, d)
                };
                if ("string" != typeof a || -1 === a.indexOf(".") && -1 === a.indexOf("[") && -1 === a.indexOf("(")) return function(b, c) {
                    b[a] = c
                };
                var b = function(a, d, e) {
                    for (var f, g, h, i, j, k = A(e), l = k[k.length - 1], m = 0, n = k.length - 1; n > m; m++) {
                        if (g = k[m].match(sc), h = k[m].match(tc), g) {
                            k[m] = k[m].replace(sc, ""), a[k[m]] = [], f = k.slice(), f.splice(0, m + 1), j = f.join(".");
                            for (var o = 0, p = d.length; p > o; o++) i = {}, b(i, d[o], j), a[k[m]].push(i);
                            return
                        }
                        h && (k[m] = k[m].replace(tc, ""), a = a[k[m]](d)), (null === a[k[m]] || a[k[m]] === c) && (a[k[m]] = {}), a = a[k[m]]
                    }
                    l.match(tc) ? a = a[l.replace(tc, "")](d) : a[l.replace(sc, "")] = d
                };
                return function(c, d) {
                    return b(c, d, a)
                }
            }

            function D(a) {
                return mc(a.aoData, "_aData")
            }

            function E(a) {
                a.aoData.length = 0, a.aiDisplayMaster.length = 0, a.aiDisplay.length = 0
            }

            function F(a, b, d) {
                for (var e = -1, f = 0, g = a.length; g > f; f++) a[f] == b ? e = f : a[f] > b && a[f]--; - 1 != e && d === c && a.splice(e, 1)
            }

            function G(a, b, d, e) {
                var f, g, h = a.aoData[b];
                if ("dom" !== d && (d && "auto" !== d || "dom" !== h.src)) {
                    var i, j = h.anCells;
                    if (j)
                        for (f = 0, g = j.length; g > f; f++) {
                            for (i = j[f]; i.childNodes.length;) i.removeChild(i.firstChild);
                            j[f].innerHTML = y(a, b, f, "display")
                        }
                } else h._aData = H(a, h).data;
                h._aSortData = null, h._aFilterData = null;
                var k = a.aoColumns;
                if (e !== c) k[e].sType = null;
                else
                    for (f = 0, g = k.length; g > f; f++) k[f].sType = null;
                J(h)
            }

            function H(a, b) {
                var c, e, f, g, h = [],
                    i = [],
                    j = b.firstChild,
                    k = 0,
                    l = a.aoColumns,
                    m = function(a, b, c) {
                        if ("string" == typeof a) {
                            var d = a.indexOf("@");
                            if (-1 !== d) {
                                var e = a.substring(d + 1);
                                f["@" + e] = c.getAttribute(e)
                            }
                        }
                    },
                    n = function(a) {
                        e = l[k], g = d.trim(a.innerHTML), e && e._bAttrSrc ? (f = {
                            display: g
                        }, m(e.mData.sort, f, a), m(e.mData.type, f, a), m(e.mData.filter, f, a), h.push(f)) : h.push(g), k++
                    };
                if (j)
                    for (; j;) c = j.nodeName.toUpperCase(), ("TD" == c || "TH" == c) && (n(j), i.push(j)), j = j.nextSibling;
                else {
                    i = b.anCells;
                    for (var o = 0, p = i.length; p > o; o++) n(i[o])
                }
                return {
                    data: h,
                    cells: i
                }
            }

            function I(a, c, d, e) {
                var f, g, h, i, j, k = a.aoData[c],
                    l = k._aData,
                    m = [];
                if (null === k.nTr) {
                    for (f = d || b.createElement("tr"), k.nTr = f, k.anCells = m, f._DT_RowIndex = c, J(k), i = 0, j = a.aoColumns.length; j > i; i++) h = a.aoColumns[i], g = d ? e[i] : b.createElement(h.sCellType), m.push(g), (!d || h.mRender || h.mData !== i) && (g.innerHTML = y(a, c, i, "display")), h.sClass && (g.className += " " + h.sClass), h.bVisible && !d ? f.appendChild(g) : !h.bVisible && d && g.parentNode.removeChild(g), h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, g, y(a, c, i), l, c, i);
                    Pb(a, "aoRowCreatedCallback", null, [f, l, c])
                }
                k.nTr.setAttribute("role", "row")
            }

            function J(a) {
                var b = a.nTr,
                    c = a._aData;
                if (b) {
                    if (c.DT_RowId && (b.id = c.DT_RowId), c.DT_RowClass) {
                        var e = c.DT_RowClass.split(" ");
                        a.__rowc = a.__rowc ? qc(a.__rowc.concat(e)) : e, d(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)
                    }
                    c.DT_RowData && d(b).data(c.DT_RowData)
                }
            }

            function K(a) {
                var b, c, e, f, g, h = a.nTHead,
                    i = a.nTFoot,
                    j = 0 === d("th, td", h).length,
                    k = a.oClasses,
                    l = a.aoColumns;
                for (j && (f = d("<tr/>").appendTo(h)), b = 0, c = l.length; c > b; b++) g = l[b], e = d(g.nTh).addClass(g.sClass), j && e.appendTo(f), a.oFeatures.bSort && (e.addClass(g.sSortingClass), g.bSortable !== !1 && (e.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Eb(a, g.nTh, b))), g.sTitle != e.html() && e.html(g.sTitle), Rb(a, "header")(a, e, g, k);
                if (j && P(a.aoHeader, h), d(h).find(">tr").attr("role", "row"), d(h).find(">tr>th, >tr>td").addClass(k.sHeaderTH), d(i).find(">tr>th, >tr>td").addClass(k.sFooterTH), null !== i) {
                    var m = a.aoFooter[0];
                    for (b = 0, c = m.length; c > b; b++) g = l[b], g.nTf = m[b].cell, g.sClass && d(g.nTf).addClass(g.sClass)
                }
            }

            function L(a, b, e) {
                var f, g, h, i, j, k, l, m, n, o = [],
                    p = [],
                    q = a.aoColumns.length;
                if (b) {
                    for (e === c && (e = !1), f = 0, g = b.length; g > f; f++) {
                        for (o[f] = b[f].slice(), o[f].nTr = b[f].nTr, h = q - 1; h >= 0; h--) a.aoColumns[h].bVisible || e || o[f].splice(h, 1);
                        p.push([])
                    }
                    for (f = 0, g = o.length; g > f; f++) {
                        if (l = o[f].nTr)
                            for (; k = l.firstChild;) l.removeChild(k);
                        for (h = 0, i = o[f].length; i > h; h++)
                            if (m = 1, n = 1, p[f][h] === c) {
                                for (l.appendChild(o[f][h].cell), p[f][h] = 1; o[f + m] !== c && o[f][h].cell == o[f + m][h].cell;) p[f + m][h] = 1, m++;
                                for (; o[f][h + n] !== c && o[f][h].cell == o[f][h + n].cell;) {
                                    for (j = 0; m > j; j++) p[f + j][h + n] = 1;
                                    n++
                                }
                                d(o[f][h].cell).attr("rowspan", m).attr("colspan", n)
                            }
                    }
                }
            }

            function M(a) {
                var b = Pb(a, "aoPreDrawCallback", "preDraw", [a]);
                if (-1 !== d.inArray(!1, b)) return void ob(a, !1);
                var e = [],
                    f = 0,
                    g = a.asStripeClasses,
                    h = g.length,
                    i = (a.aoOpenRows.length, a.oLanguage),
                    j = a.iInitDisplayStart,
                    k = "ssp" == Sb(a),
                    l = a.aiDisplay;
                a.bDrawing = !0, j !== c && -1 !== j && (a._iDisplayStart = k ? j : j >= a.fnRecordsDisplay() ? 0 : j, a.iInitDisplayStart = -1);
                var m = a._iDisplayStart,
                    n = a.fnDisplayEnd();
                if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, ob(a, !1);
                else if (k) {
                    if (!a.bDestroying && !S(a)) return
                } else a.iDraw++;
                if (0 !== l.length)
                    for (var o = k ? 0 : m, p = k ? a.aoData.length : n, r = o; p > r; r++) {
                        var s = l[r],
                            t = a.aoData[s];
                        null === t.nTr && I(a, s);
                        var u = t.nTr;
                        if (0 !== h) {
                            var v = g[f % h];
                            t._sRowStripe != v && (d(u).removeClass(t._sRowStripe).addClass(v), t._sRowStripe = v)
                        }
                        Pb(a, "aoRowCallback", null, [u, t._aData, f, r]), e.push(u), f++
                    } else {
                        var w = i.sZeroRecords;
                        1 == a.iDraw && "ajax" == Sb(a) ? w = i.sLoadingRecords : i.sEmptyTable && 0 === a.fnRecordsTotal() && (w = i.sEmptyTable), e[0] = d("<tr/>", {
                            "class": h ? g[0] : ""
                        }).append(d("<td />", {
                            valign: "top",
                            colSpan: q(a),
                            "class": a.oClasses.sRowEmpty
                        }).html(w))[0]
                    }
                Pb(a, "aoHeaderCallback", "header", [d(a.nTHead).children("tr")[0], D(a), m, n, l]), Pb(a, "aoFooterCallback", "footer", [d(a.nTFoot).children("tr")[0], D(a), m, n, l]);
                var x = d(a.nTBody);
                x.children().detach(), x.append(d(e)), Pb(a, "aoDrawCallback", "draw", [a]), a.bSorted = !1, a.bFiltered = !1, a.bDrawing = !1
            }

            function N(a, b) {
                var c = a.oFeatures,
                    d = c.bSort,
                    e = c.bFilter;
                d && Bb(a), e ? X(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice(), b !== !0 && (a._iDisplayStart = 0), a._drawHold = b, M(a), a._drawHold = !1
            }

            function O(a) {
                var b = a.oClasses,
                    c = d(a.nTable),
                    e = d("<div/>").insertBefore(c),
                    f = a.oFeatures,
                    g = d("<div/>", {
                        id: a.sTableId + "_wrapper",
                        "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
                    });
                a.nHolding = e[0], a.nTableWrapper = g[0], a.nTableReinsertBefore = a.nTable.nextSibling;
                for (var h, i, j, k, l, m, n = a.sDom.split(""), o = 0; o < n.length; o++) {
                    if (h = null, i = n[o], "<" == i) {
                        if (j = d("<div/>")[0], k = n[o + 1], "'" == k || '"' == k) {
                            for (l = "", m = 2; n[o + m] != k;) l += n[o + m], m++;
                            if ("H" == l ? l = b.sJUIHeader : "F" == l && (l = b.sJUIFooter), -1 != l.indexOf(".")) {
                                var p = l.split(".");
                                j.id = p[0].substr(1, p[0].length - 1), j.className = p[1]
                            } else "#" == l.charAt(0) ? j.id = l.substr(1, l.length - 1) : j.className = l;
                            o += m
                        }
                        g.append(j), g = d(j)
                    } else if (">" == i) g = g.parent();
                    else if ("l" == i && f.bPaginate && f.bLengthChange) h = kb(a);
                    else if ("f" == i && f.bFilter) h = W(a);
                    else if ("r" == i && f.bProcessing) h = nb(a);
                    else if ("t" == i) h = pb(a);
                    else if ("i" == i && f.bInfo) h = eb(a);
                    else if ("p" == i && f.bPaginate) h = lb(a);
                    else if (0 !== Wb.ext.feature.length)
                        for (var q = Wb.ext.feature, r = 0, s = q.length; s > r; r++)
                            if (i == q[r].cFeature) {
                                h = q[r].fnInit(a);
                                break
                            }
                    if (h) {
                        var t = a.aanFeatures;
                        t[i] || (t[i] = []), t[i].push(h), g.append(h)
                    }
                }
                e.replaceWith(g)
            }

            function P(a, b) {
                var c, e, f, g, h, i, j, k, l, m, n, o = d(b).children("tr"),
                    p = function(a, b, c) {
                        for (var d = a[b]; d[c];) c++;
                        return c
                    };
                for (a.splice(0, a.length), f = 0, i = o.length; i > f; f++) a.push([]);
                for (f = 0, i = o.length; i > f; f++)
                    for (c = o[f], k = 0, e = c.firstChild; e;) {
                        if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase())
                            for (l = 1 * e.getAttribute("colspan"), m = 1 * e.getAttribute("rowspan"), l = l && 0 !== l && 1 !== l ? l : 1, m = m && 0 !== m && 1 !== m ? m : 1, j = p(a, f, k), n = 1 === l ? !0 : !1, h = 0; l > h; h++)
                                for (g = 0; m > g; g++) a[f + g][j + h] = {
                                    cell: e,
                                    unique: n
                                }, a[f + g].nTr = c;
                        e = e.nextSibling
                    }
            }

            function Q(a, b, c) {
                var d = [];
                c || (c = a.aoHeader, b && (c = [], P(c, b)));
                for (var e = 0, f = c.length; f > e; e++)
                    for (var g = 0, h = c[e].length; h > g; g++) !c[e][g].unique || d[g] && a.bSortCellsTop || (d[g] = c[e][g].cell);
                return d
            }

            function R(a, b, c) {
                if (Pb(a, "aoServerParams", "serverParams", [b]), b && d.isArray(b)) {
                    var e = {},
                        f = /(.*?)\[\]$/;
                    d.each(b, function(a, b) {
                        var c = b.name.match(f);
                        if (c) {
                            var d = c[0];
                            e[d] || (e[d] = []), e[d].push(b.value)
                        } else e[b.name] = b.value
                    }), b = e
                }
                var g, h = a.ajax,
                    i = a.oInstance;
                if (d.isPlainObject(h) && h.data) {
                    g = h.data;
                    var j = d.isFunction(g) ? g(b) : g;
                    b = d.isFunction(g) && j ? j : d.extend(!0, b, j), delete h.data
                }
                var k = {
                    data: b,
                    success: function(b) {
                        var d = b.error || b.sError;
                        d && a.oApi._fnLog(a, 0, d), a.json = b, Pb(a, null, "xhr", [a, b]), c(b)
                    },
                    dataType: "json",
                    cache: !1,
                    type: a.sServerMethod,
                    error: function(b, c) {
                        var d = a.oApi._fnLog;
                        "parsererror" == c ? d(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && d(a, 0, "Ajax error", 7), ob(a, !1)
                    }
                };
                a.oAjaxData = b, Pb(a, null, "preXhr", [a, b]), a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource, d.map(b, function(a, b) {
                    return {
                        name: b,
                        value: a
                    }
                }), c, a) : a.sAjaxSource || "string" == typeof h ? a.jqXHR = d.ajax(d.extend(k, {
                    url: h || a.sAjaxSource
                })) : d.isFunction(h) ? a.jqXHR = h.call(i, b, c, a) : (a.jqXHR = d.ajax(d.extend(k, h)), h.data = g)
            }

            function S(a) {
                return a.bAjaxDataGet ? (a.iDraw++, ob(a, !0), R(a, T(a), function(b) {
                    U(a, b)
                }), !1) : !0
            }

            function T(a) {
                var b, c, e, f, g = a.aoColumns,
                    h = g.length,
                    i = a.oFeatures,
                    j = a.oPreviousSearch,
                    k = a.aoPreSearchCols,
                    l = [],
                    m = Ab(a),
                    n = a._iDisplayStart,
                    o = i.bPaginate !== !1 ? a._iDisplayLength : -1,
                    p = function(a, b) {
                        l.push({
                            name: a,
                            value: b
                        })
                    };
                p("sEcho", a.iDraw), p("iColumns", h), p("sColumns", mc(g, "sName").join(",")), p("iDisplayStart", n), p("iDisplayLength", o);
                var q = {
                    draw: a.iDraw,
                    columns: [],
                    order: [],
                    start: n,
                    length: o,
                    search: {
                        value: j.sSearch,
                        regex: j.bRegex
                    }
                };
                for (b = 0; h > b; b++) e = g[b], f = k[b], c = "function" == typeof e.mData ? "function" : e.mData, q.columns.push({
                    data: c,
                    name: e.sName,
                    searchable: e.bSearchable,
                    orderable: e.bSortable,
                    search: {
                        value: f.sSearch,
                        regex: f.bRegex
                    }
                }), p("mDataProp_" + b, c), i.bFilter && (p("sSearch_" + b, f.sSearch), p("bRegex_" + b, f.bRegex), p("bSearchable_" + b, e.bSearchable)), i.bSort && p("bSortable_" + b, e.bSortable);
                i.bFilter && (p("sSearch", j.sSearch), p("bRegex", j.bRegex)), i.bSort && (d.each(m, function(a, b) {
                    q.order.push({
                        column: b.col,
                        dir: b.dir
                    }), p("iSortCol_" + a, b.col), p("sSortDir_" + a, b.dir)
                }), p("iSortingCols", m.length));
                var r = Wb.ext.legacy.ajax;
                return null === r ? a.sAjaxSource ? l : q : r ? l : q
            }

            function U(a, b) {
                var d = function(a, d) {
                        return b[a] !== c ? b[a] : b[d]
                    },
                    e = d("sEcho", "draw"),
                    f = d("iTotalRecords", "recordsTotal"),
                    g = d("iTotalDisplayRecords", "recordsFiltered");
                if (e) {
                    if (1 * e < a.iDraw) return;
                    a.iDraw = 1 * e
                }
                E(a), a._iRecordsTotal = parseInt(f, 10), a._iRecordsDisplay = parseInt(g, 10);
                for (var h = V(a, b), i = 0, j = h.length; j > i; i++) u(a, h[i]);
                a.aiDisplay = a.aiDisplayMaster.slice(), a.bAjaxDataGet = !1, M(a), a._bInitComplete || ib(a, b), a.bAjaxDataGet = !0, ob(a, !1)
            }

            function V(a, b) {
                var e = d.isPlainObject(a.ajax) && a.ajax.dataSrc !== c ? a.ajax.dataSrc : a.sAjaxDataProp;
                return "data" === e ? b.aaData || b[e] : "" !== e ? B(e)(b) : b
            }

            function W(a) {
                var c = a.oClasses,
                    e = a.sTableId,
                    f = a.oLanguage,
                    g = a.oPreviousSearch,
                    h = a.aanFeatures,
                    i = '<input type="search" class="' + c.sFilterInput + '"/>',
                    j = f.sSearch;
                j = j.match(/_INPUT_/) ? j.replace("_INPUT_", i) : j + i;
                var k = d("<div/>", {
                        id: h.f ? null : e + "_filter",
                        "class": c.sFilter
                    }).append(d("<label/>").append(j)),
                    l = function() {
                        var b = (h.f, this.value ? this.value : "");
                        b != g.sSearch && (X(a, {
                            sSearch: b,
                            bRegex: g.bRegex,
                            bSmart: g.bSmart,
                            bCaseInsensitive: g.bCaseInsensitive
                        }), a._iDisplayStart = 0, M(a))
                    },
                    m = d("input", k).val(g.sSearch).attr("placeholder", f.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", "ssp" === Sb(a) ? tb(l, 400) : l).bind("keypress.DT", function(a) {
                        return 13 == a.keyCode ? !1 : void 0
                    }).attr("aria-controls", e);
                return d(a.nTable).on("search.dt.DT", function(c, d) {
                    if (a === d) try {
                        m[0] !== b.activeElement && m.val(g.sSearch)
                    } catch (e) {}
                }), k[0]
            }

            function X(a, b, d) {
                var e = a.oPreviousSearch,
                    f = a.aoPreSearchCols,
                    g = function(a) {
                        e.sSearch = a.sSearch, e.bRegex = a.bRegex, e.bSmart = a.bSmart, e.bCaseInsensitive = a.bCaseInsensitive
                    },
                    h = function(a) {
                        return a.bEscapeRegex !== c ? !a.bEscapeRegex : a.bRegex
                    };
                if (s(a), "ssp" != Sb(a)) {
                    $(a, b.sSearch, d, h(b), b.bSmart, b.bCaseInsensitive), g(b);
                    for (var i = 0; i < f.length; i++) Z(a, f[i].sSearch, i, h(f[i]), f[i].bSmart, f[i].bCaseInsensitive);
                    Y(a)
                } else g(b);
                a.bFiltered = !0, Pb(a, null, "search", [a])
            }

            function Y(a) {
                for (var b, c, d = Wb.ext.search, e = a.aiDisplay, f = 0, g = d.length; g > f; f++) {
                    for (var h = [], i = 0, j = e.length; j > i; i++) c = e[i], b = a.aoData[c], d[f](a, b._aFilterData, c, b._aData, i) && h.push(c);
                    e.length = 0, e.push.apply(e, h)
                }
            }

            function Z(a, b, c, d, e, f) {
                if ("" !== b)
                    for (var g, h = a.aiDisplay, i = _(b, d, e, f), j = h.length - 1; j >= 0; j--) g = a.aoData[h[j]]._aFilterData[c], i.test(g) || h.splice(j, 1)
            }

            function $(a, b, c, d, e, f) {
                var g, h, i, j = _(b, d, e, f),
                    k = a.oPreviousSearch.sSearch,
                    l = a.aiDisplayMaster;
                if (0 !== Wb.ext.search.length && (c = !0), h = bb(a), b.length <= 0) a.aiDisplay = l.slice();
                else
                    for ((h || c || k.length > b.length || 0 !== b.indexOf(k) || a.bSorted) && (a.aiDisplay = l.slice()), g = a.aiDisplay, i = g.length - 1; i >= 0; i--) j.test(a.aoData[g[i]]._sFilterRow) || g.splice(i, 1)
            }

            function _(a, b, c, e) {
                if (a = b ? a : ab(a), c) {
                    var f = d.map(a.match(/"[^"]+"|[^ ]+/g) || "", function(a) {
                        return '"' === a.charAt(0) ? a.match(/^"(.*)"$/)[1] : a
                    });
                    a = "^(?=.*?" + f.join(")(?=.*?") + ").*$"
                }
                return new RegExp(a, e ? "i" : "")
            }

            function ab(a) {
                return a.replace(ec, "\\$1")
            }

            function bb(a) {
                var b, c, d, e, f, g, h, i, j = a.aoColumns,
                    k = Wb.ext.type.search,
                    l = !1;
                for (c = 0, e = a.aoData.length; e > c; c++)
                    if (i = a.aoData[c], !i._aFilterData) {
                        for (g = [], d = 0, f = j.length; f > d; d++) b = j[d], b.bSearchable ? (h = y(a, c, d, "filter"), k[b.sType] && (h = k[b.sType](h)), null === h && (h = ""), "string" != typeof h && h.toString && (h = h.toString())) : h = "", h.indexOf && -1 !== h.indexOf("&") && (uc.innerHTML = h, h = vc ? uc.textContent : uc.innerText), h.replace && (h = h.replace(/[\r\n]/g, "")), g.push(h);
                        i._aFilterData = g, i._sFilterRow = g.join("  "), l = !0
                    }
                return l
            }

            function cb(a) {
                return {
                    search: a.sSearch,
                    smart: a.bSmart,
                    regex: a.bRegex,
                    caseInsensitive: a.bCaseInsensitive
                }
            }

            function db(a) {
                return {
                    sSearch: a.search,
                    bSmart: a.smart,
                    bRegex: a.regex,
                    bCaseInsensitive: a.caseInsensitive
                }
            }

            function eb(a) {
                var b = a.sTableId,
                    c = a.aanFeatures.i,
                    e = d("<div/>", {
                        "class": a.oClasses.sInfo,
                        id: c ? null : b + "_info"
                    });
                return c || (a.aoDrawCallback.push({
                    fn: fb,
                    sName: "information"
                }), e.attr("role", "status").attr("aria-live", "polite"), d(a.nTable).attr("aria-describedby", b + "_info")), e[0]
            }

            function fb(a) {
                var b = a.aanFeatures.i;
                if (0 !== b.length) {
                    var c = a.oLanguage,
                        e = a._iDisplayStart + 1,
                        f = a.fnDisplayEnd(),
                        g = a.fnRecordsTotal(),
                        h = a.fnRecordsDisplay(),
                        i = h ? c.sInfo : c.sInfoEmpty;
                    h !== g && (i += " " + c.sInfoFiltered), i += c.sInfoPostFix, i = gb(a, i);
                    var j = c.fnInfoCallback;
                    null !== j && (i = j.call(a.oInstance, a, e, f, g, h, i)), d(b).html(i)
                }
            }

            function gb(a, b) {
                var c = a.fnFormatNumber,
                    d = a._iDisplayStart + 1,
                    e = a._iDisplayLength,
                    f = a.fnRecordsDisplay(),
                    g = -1 === e;
                return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
            }

            function hb(a) {
                var b, c, d, e = a.iInitDisplayStart,
                    f = a.aoColumns,
                    g = a.oFeatures;
                if (!a.bInitialised) return void setTimeout(function() {
                    hb(a)
                }, 200);
                for (O(a), K(a), L(a, a.aoHeader), L(a, a.aoFooter), ob(a, !0), g.bAutoWidth && sb(a), b = 0, c = f.length; c > b; b++) d = f[b], d.sWidth && (d.nTh.style.width = yb(d.sWidth));
                N(a);
                var h = Sb(a);
                "ssp" != h && ("ajax" == h ? R(a, [], function(c) {
                    var d = V(a, c);
                    for (b = 0; b < d.length; b++) u(a, d[b]);
                    a.iInitDisplayStart = e, N(a), ob(a, !1), ib(a, c)
                }, a) : (ob(a, !1), ib(a)))
            }

            function ib(a, b) {
                a._bInitComplete = !0, b && n(a), Pb(a, "aoInitComplete", "init", [a, b])
            }

            function jb(a, b) {
                var c = parseInt(b, 10);
                a._iDisplayLength = c, Qb(a), Pb(a, null, "length", [a, c])
            }

            function kb(a) {
                for (var b = a.oClasses, c = a.sTableId, e = a.aLengthMenu, f = d.isArray(e[0]), g = f ? e[0] : e, h = f ? e[1] : e, i = d("<select/>", {
                        name: c + "_length",
                        "aria-controls": c,
                        "class": b.sLengthSelect
                    }), j = 0, k = g.length; k > j; j++) i[0][j] = new Option(h[j], g[j]);
                var l = d("<div><label/></div>").addClass(b.sLength);
                return a.aanFeatures.l || (l[0].id = c + "_length"), l.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", i[0].outerHTML)), d("select", l).val(a._iDisplayLength).bind("change.DT", function() {
                    jb(a, d(this).val()), M(a)
                }), d(a.nTable).bind("length.dt.DT", function(b, c, e) {
                    a === c && d("select", l).val(e)
                }), l[0]
            }

            function lb(a) {
                var b = a.sPaginationType,
                    c = Wb.ext.pager[b],
                    e = "function" == typeof c,
                    f = function(a) {
                        M(a)
                    },
                    g = d("<div/>").addClass(a.oClasses.sPaging + b)[0],
                    h = a.aanFeatures;
                return e || c.fnInit(a, g, f), h.p || (g.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
                    fn: function(a) {
                        if (e) {
                            var b, d, g = a._iDisplayStart,
                                i = a._iDisplayLength,
                                j = a.fnRecordsDisplay(),
                                k = -1 === i,
                                l = k ? 0 : Math.ceil(g / i),
                                m = k ? 1 : Math.ceil(j / i),
                                n = c(l, m);
                            for (b = 0, d = h.p.length; d > b; b++) Rb(a, "pageButton")(a, h.p[b], b, n, l, m)
                        } else c.fnUpdate(a, f)
                    },
                    sName: "pagination"
                })), g
            }

            function mb(a, b, c) {
                var d = a._iDisplayStart,
                    e = a._iDisplayLength,
                    f = a.fnRecordsDisplay();
                0 === f || -1 === e ? d = 0 : "number" == typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = e >= 0 ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? f > d + e && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : Kb(a, 0, "Unknown paging action: " + b, 5);
                var g = a._iDisplayStart !== d;
                return a._iDisplayStart = d, g && (Pb(a, null, "page", [a]), c && M(a)), g
            }

            function nb(a) {
                return d("<div/>", {
                    id: a.aanFeatures.r ? null : a.sTableId + "_processing",
                    "class": a.oClasses.sProcessing
                }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
            }

            function ob(a, b) {
                a.oFeatures.bProcessing && d(a.aanFeatures.r).css("display", b ? "block" : "none"), Pb(a, null, "processing", [a, b])
            }

            function pb(a) {
                var b = d(a.nTable);
                b.attr("role", "grid");
                var c = a.oScroll;
                if ("" === c.sX && "" === c.sY) return a.nTable;
                var e = c.sX,
                    f = c.sY,
                    g = a.oClasses,
                    h = b.children("caption"),
                    i = h.length ? h[0]._captionSide : null,
                    j = d(b[0].cloneNode(!1)),
                    k = d(b[0].cloneNode(!1)),
                    l = b.children("tfoot"),
                    m = "<div/>",
                    n = function(a) {
                        return a ? yb(a) : null
                    };
                c.sX && "100%" === b.attr("width") && b.removeAttr("width"), l.length || (l = null);
                var o = d(m, {
                    "class": g.sScrollWrapper
                }).append(d(m, {
                    "class": g.sScrollHead
                }).css({
                    overflow: "hidden",
                    position: "relative",
                    border: 0,
                    width: e ? n(e) : "100%"
                }).append(d(m, {
                    "class": g.sScrollHeadInner
                }).css({
                    "box-sizing": "content-box",
                    width: c.sXInner || "100%"
                }).append(j.removeAttr("id").css("margin-left", 0).append(b.children("thead")))).append("top" === i ? h : null)).append(d(m, {
                    "class": g.sScrollBody
                }).css({
                    overflow: "auto",
                    height: n(f),
                    width: n(e)
                }).append(b));
                l && o.append(d(m, {
                    "class": g.sScrollFoot
                }).css({
                    overflow: "hidden",
                    border: 0,
                    width: e ? n(e) : "100%"
                }).append(d(m, {
                    "class": g.sScrollFootInner
                }).append(k.removeAttr("id").css("margin-left", 0).append(b.children("tfoot")))).append("bottom" === i ? h : null));
                var p = o.children(),
                    q = p[0],
                    r = p[1],
                    s = l ? p[2] : null;
                return e && d(r).scroll(function() {
                    var a = this.scrollLeft;
                    q.scrollLeft = a, l && (s.scrollLeft = a)
                }), a.nScrollHead = q, a.nScrollBody = r, a.nScrollFoot = s, a.aoDrawCallback.push({
                    fn: qb,
                    sName: "scrolling"
                }), o[0]
            }

            function qb(a) {
                var b, c, e, f, g, h, i, j, k, l = a.oScroll,
                    m = l.sX,
                    n = l.sXInner,
                    p = l.sY,
                    q = l.iBarWidth,
                    r = d(a.nScrollHead),
                    s = r[0].style,
                    t = r.children("div"),
                    u = t[0].style,
                    v = t.children("table"),
                    w = a.nScrollBody,
                    x = d(w),
                    y = w.style,
                    z = d(a.nScrollFoot),
                    A = z.children("div"),
                    B = A.children("table"),
                    C = d(a.nTHead),
                    D = d(a.nTable),
                    E = D[0],
                    F = E.style,
                    G = a.nTFoot ? d(a.nTFoot) : null,
                    H = a.oBrowser,
                    I = H.bScrollOversize,
                    J = [],
                    K = [],
                    L = [],
                    M = function(a) {
                        var b = a.style;
                        b.paddingTop = "0", b.paddingBottom = "0", b.borderTopWidth = "0", b.borderBottomWidth = "0", b.height = 0
                    };
                if (D.children("thead, tfoot").remove(), g = C.clone().prependTo(D), b = C.find("tr"), e = g.find("tr"), g.find("th, td").removeAttr("tabindex"), G && (h = G.clone().prependTo(D), c = G.find("tr"), f = h.find("tr")), m || (y.width = "100%", r[0].style.width = "100%"), d.each(Q(a, g), function(b, c) {
                        i = o(a, b), c.style.width = a.aoColumns[i].sWidth
                    }), G && rb(function(a) {
                        a.style.width = ""
                    }, f), l.bCollapse && "" !== p && (y.height = x[0].offsetHeight + C[0].offsetHeight + "px"), k = D.outerWidth(), "" === m ? (F.width = "100%", I && (D.find("tbody").height() > w.offsetHeight || "scroll" == x.css("overflow-y")) && (F.width = yb(D.outerWidth() - q))) : "" !== n ? F.width = yb(n) : k == x.width() && x.height() < D.height() ? (F.width = yb(k - q), D.outerWidth() > k - q && (F.width = yb(k))) : F.width = yb(k), k = D.outerWidth(), rb(M, e), rb(function(a) {
                        L.push(a.innerHTML), J.push(yb(d(a).css("width")))
                    }, e), rb(function(a, b) {
                        a.style.width = J[b]
                    }, b), d(e).height(0), G && (rb(M, f), rb(function(a) {
                        K.push(yb(d(a).css("width")))
                    }, f), rb(function(a, b) {
                        a.style.width = K[b]
                    }, c), d(f).height(0)), rb(function(a, b) {
                        a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + L[b] + "</div>", a.style.width = J[b]
                    }, e), G && rb(function(a, b) {
                        a.innerHTML = "", a.style.width = K[b]
                    }, f), D.outerWidth() < k ? (j = w.scrollHeight > w.offsetHeight || "scroll" == x.css("overflow-y") ? k + q : k, I && (w.scrollHeight > w.offsetHeight || "scroll" == x.css("overflow-y")) && (F.width = yb(j - q)), ("" === m || "" !== n) && Kb(a, 1, "Possible column misalignment", 6)) : j = "100%", y.width = yb(j), s.width = yb(j), G && (a.nScrollFoot.style.width = yb(j)), p || I && (y.height = yb(E.offsetHeight + q)), p && l.bCollapse) {
                    y.height = yb(p);
                    var N = m && E.offsetWidth > w.offsetWidth ? q : 0;
                    E.offsetHeight < w.offsetHeight && (y.height = yb(E.offsetHeight + N))
                }
                var O = D.outerWidth();
                v[0].style.width = yb(O), u.width = yb(O);
                var P = D.height() > w.clientHeight || "scroll" == x.css("overflow-y"),
                    R = "padding" + (H.bScrollbarLeft ? "Left" : "Right");
                u[R] = P ? q + "px" : "0px", G && (B[0].style.width = yb(O), A[0].style.width = yb(O), A[0].style[R] = P ? q + "px" : "0px"), x.scroll(), !a.bSorted && !a.bFiltered || a._drawHold || (w.scrollTop = 0)
            }

            function rb(a, b, c) {
                for (var d, e, f = 0, g = 0, h = b.length; h > g;) {
                    for (d = b[g].firstChild, e = c ? c[g].firstChild : null; d;) 1 === d.nodeType && (c ? a(d, e, f) : a(d, f), f++), d = d.nextSibling, e = c ? e.nextSibling : null;
                    g++
                }
            }

            function sb(b) {
                var c, e, f, g, h, i = b.nTable,
                    j = b.aoColumns,
                    k = b.oScroll,
                    l = k.sY,
                    m = k.sX,
                    o = k.sXInner,
                    p = j.length,
                    s = r(b, "bVisible"),
                    t = d("th", b.nTHead),
                    u = i.getAttribute("width"),
                    v = i.parentNode,
                    w = !1;
                for (c = 0; c < s.length; c++) e = j[s[c]], null !== e.sWidth && (e.sWidth = ub(e.sWidthOrig, v), w = !0);
                if (w || m || l || p != q(b) || p != t.length) {
                    var x = d(i).clone().empty().css("visibility", "hidden").removeAttr("id").append(d(b.nTHead).clone(!1)).append(d(b.nTFoot).clone(!1)).append(d("<tbody><tr/></tbody>"));
                    x.find("tfoot th, tfoot td").css("width", "");
                    var y = x.find("tbody tr");
                    for (t = Q(b, x.find("thead")[0]), c = 0; c < s.length; c++) e = j[s[c]], t[c].style.width = null !== e.sWidthOrig && "" !== e.sWidthOrig ? yb(e.sWidthOrig) : "";
                    if (b.aoData.length)
                        for (c = 0; c < s.length; c++) f = s[c], e = j[f], d(wb(b, f)).clone(!1).append(e.sContentPadding).appendTo(y);
                    if (x.appendTo(v), m && o ? x.width(o) : m ? (x.css("width", "auto"), x.width() < v.offsetWidth && x.width(v.offsetWidth)) : l ? x.width(v.offsetWidth) : u && x.width(u), vb(b, x[0]), m) {
                        var z = 0;
                        for (c = 0; c < s.length; c++) e = j[s[c]], h = d(t[c]).outerWidth(), z += null === e.sWidthOrig ? h : parseInt(e.sWidth, 10) + h - d(t[c]).width();
                        x.width(yb(z)), i.style.width = yb(z)
                    }
                    for (c = 0; c < s.length; c++) e = j[s[c]], g = d(t[c]).width(), g && (e.sWidth = yb(g));
                    i.style.width = yb(x.css("width")), x.remove()
                } else
                    for (c = 0; p > c; c++) j[c].sWidth = yb(t.eq(c).width());
                u && (i.style.width = yb(u)), !u && !m || b._reszEvt || (d(a).bind("resize.DT-" + b.sInstance, tb(function() {
                    n(b)
                })), b._reszEvt = !0)
            }

            function tb(a, b) {
                var d, e, f = b || 200;
                return function() {
                    var b = this,
                        g = +new Date,
                        h = arguments;
                    d && d + f > g ? (clearTimeout(e), e = setTimeout(function() {
                        d = c, a.apply(b, h)
                    }, f)) : d ? (d = g, a.apply(b, h)) : d = g
                }
            }

            function ub(a, c) {
                if (!a) return 0;
                var e = d("<div/>").css("width", yb(a)).appendTo(c || b.body),
                    f = e[0].offsetWidth;
                return e.remove(), f
            }

            function vb(a, b) {
                var c = a.oScroll;
                if (c.sX || c.sY) {
                    var e = c.sX ? 0 : c.iBarWidth;
                    b.style.width = yb(d(b).outerWidth() - e)
                }
            }

            function wb(a, b) {
                var c = xb(a, b);
                if (0 > c) return null;
                var e = a.aoData[c];
                return e.nTr ? e.anCells[b] : d("<td/>").html(y(a, c, b, "display"))[0]
            }

            function xb(a, b) {
                for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; g > f; f++) c = y(a, f, b, "display") + "", c = c.replace(wc, ""), c.length > d && (d = c.length, e = f);
                return e
            }

            function yb(a) {
                return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
            }

            function zb() {
                if (!Wb.__scrollbarWidth) {
                    var a = d("<p/>").css({
                            width: "100%",
                            height: 200,
                            padding: 0
                        })[0],
                        b = d("<div/>").css({
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 200,
                            height: 150,
                            padding: 0,
                            overflow: "hidden",
                            visibility: "hidden"
                        }).append(a).appendTo("body"),
                        c = a.offsetWidth;
                    b.css("overflow", "scroll");
                    var e = a.offsetWidth;
                    c === e && (e = b[0].clientWidth), b.remove(), Wb.__scrollbarWidth = c - e
                }
                return Wb.__scrollbarWidth
            }

            function Ab(a) {
                var b, c, e, f, g, h, i, j = [],
                    k = a.aoColumns,
                    l = a.aaSortingFixed,
                    m = d.isPlainObject(l),
                    n = [],
                    o = function(a) {
                        a.length && !d.isArray(a[0]) ? n.push(a) : n.push.apply(n, a)
                    };
                for (d.isArray(l) && o(l), m && l.pre && o(l.pre), o(a.aaSorting), m && l.post && o(l.post), b = 0; b < n.length; b++)
                    for (i = n[b][0], f = k[i].aDataSort, c = 0, e = f.length; e > c; c++) g = f[c], h = k[g].sType || "string", j.push({
                        src: i,
                        col: g,
                        dir: n[b][1],
                        index: n[b][2],
                        type: h,
                        formatter: Wb.ext.type.order[h + "-pre"]
                    });
                return j
            }

            function Bb(a) {
                var b, c, d, e, f, g = [],
                    h = Wb.ext.type.order,
                    i = a.aoData,
                    j = (a.aoColumns, 0),
                    k = a.aiDisplayMaster;
                for (s(a), f = Ab(a), b = 0, c = f.length; c > b; b++) e = f[b], e.formatter && j++, Gb(a, e.col);
                if ("ssp" != Sb(a) && 0 !== f.length) {
                    for (b = 0, d = k.length; d > b; b++) g[k[b]] = b;
                    k.sort(j === f.length ? function(a, b) {
                        var c, d, e, h, j, k = f.length,
                            l = i[a]._aSortData,
                            m = i[b]._aSortData;
                        for (e = 0; k > e; e++)
                            if (j = f[e], c = l[j.col], d = m[j.col], h = d > c ? -1 : c > d ? 1 : 0, 0 !== h) return "asc" === j.dir ? h : -h;
                        return c = g[a], d = g[b], d > c ? -1 : c > d ? 1 : 0
                    } : function(a, b) {
                        var c, d, e, j, k, l, m = f.length,
                            n = i[a]._aSortData,
                            o = i[b]._aSortData;
                        for (e = 0; m > e; e++)
                            if (k = f[e], c = n[k.col], d = o[k.col], l = h[k.type + "-" + k.dir] || h["string-" + k.dir], j = l(c, d), 0 !== j) return j;
                        return c = g[a], d = g[b], d > c ? -1 : c > d ? 1 : 0
                    })
                }
                a.bSorted = !0
            }

            function Cb(a) {
                for (var b, c, d = a.aoColumns, e = Ab(a), f = a.oLanguage.oAria, g = 0, h = d.length; h > g; g++) {
                    var i = d[g],
                        j = i.asSorting,
                        k = i.sTitle.replace(/<.*?>/g, ""),
                        l = i.nTh;
                    l.removeAttribute("aria-sort"), i.bSortable ? (e.length > 0 && e[0].col == g ? (l.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" : "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b = k + ("asc" === c ? f.sSortAscending : f.sSortDescending)) : b = k, l.setAttribute("aria-label", b)
                }
            }

            function Db(a, b, e, f) {
                var g, h = a.aoColumns[b],
                    i = a.aaSorting,
                    j = h.asSorting,
                    k = function(a) {
                        var b = a._idx;
                        return b === c && (b = d.inArray(a[1], j)), b + 1 >= j.length ? 0 : b + 1
                    };
                if ("number" == typeof i[0] && (i = a.aaSorting = [i]), e && a.oFeatures.bSortMulti) {
                    var l = d.inArray(b, mc(i, "0")); - 1 !== l ? (g = k(i[l]), i[l][1] = j[g], i[l]._idx = g) : (i.push([b, j[0], 0]), i[i.length - 1]._idx = 0)
                } else i.length && i[0][0] == b ? (g = k(i[0]), i.length = 1, i[0][1] = j[g], i[0]._idx = g) : (i.length = 0, i.push([b, j[0]]), i[0]._idx = 0);
                N(a), "function" == typeof f && f(a)
            }

            function Eb(a, b, c, d) {
                var e = a.aoColumns[c];
                Nb(b, {}, function(b) {
                    e.bSortable !== !1 && (a.oFeatures.bProcessing ? (ob(a, !0), setTimeout(function() {
                        Db(a, c, b.shiftKey, d), "ssp" !== Sb(a) && ob(a, !1)
                    }, 0)) : Db(a, c, b.shiftKey, d))
                })
            }

            function Fb(a) {
                var b, c, e, f = a.aLastSort,
                    g = a.oClasses.sSortColumn,
                    h = Ab(a),
                    i = a.oFeatures;
                if (i.bSort && i.bSortClasses) {
                    for (b = 0, c = f.length; c > b; b++) e = f[b].src, d(mc(a.aoData, "anCells", e)).removeClass(g + (2 > b ? b + 1 : 3));
                    for (b = 0, c = h.length; c > b; b++) e = h[b].src, d(mc(a.aoData, "anCells", e)).addClass(g + (2 > b ? b + 1 : 3))
                }
                a.aLastSort = h
            }

            function Gb(a, b) {
                var c, d = a.aoColumns[b],
                    e = Wb.ext.order[d.sSortDataType];
                e && (c = e.call(a.oInstance, a, b, p(a, b)));
                for (var f, g, h = Wb.ext.type.order[d.sType + "-pre"], i = 0, j = a.aoData.length; j > i; i++) f = a.aoData[i], f._aSortData || (f._aSortData = []), (!f._aSortData[b] || e) && (g = e ? c[i] : y(a, i, b, "sort"), f._aSortData[b] = h ? h(g) : g)
            }

            function Hb(a) {
                if (a.oFeatures.bStateSave && !a.bDestroying) {
                    var b = {
                        time: +new Date,
                        start: a._iDisplayStart,
                        length: a._iDisplayLength,
                        order: d.extend(!0, [], a.aaSorting),
                        search: cb(a.oPreviousSearch),
                        columns: d.map(a.aoColumns, function(b, c) {
                            return {
                                visible: b.bVisible,
                                search: cb(a.aoPreSearchCols[c])
                            }
                        })
                    };
                    Pb(a, "aoStateSaveParams", "stateSaveParams", [a, b]), a.oSavedState = b, a.fnStateSaveCallback.call(a.oInstance, a, b)
                }
            }

            function Ib(a) {
                var b, c, e = a.aoColumns;
                if (a.oFeatures.bStateSave) {
                    var f = a.fnStateLoadCallback.call(a.oInstance, a);
                    if (f && f.time) {
                        var g = Pb(a, "aoStateLoadParams", "stateLoadParams", [a, f]);
                        if (-1 === d.inArray(!1, g)) {
                            var h = a.iStateDuration;
                            if (!(h > 0 && f.time < +new Date - 1e3 * h) && e.length === f.columns.length) {
                                for (a.oLoadedState = d.extend(!0, {}, f), a._iDisplayStart = f.start, a.iInitDisplayStart = f.start, a._iDisplayLength = f.length, a.aaSorting = [], d.each(f.order, function(b, c) {
                                        a.aaSorting.push(c[0] >= e.length ? [0, c[1]] : c)
                                    }), d.extend(a.oPreviousSearch, db(f.search)), b = 0, c = f.columns.length; c > b; b++) {
                                    var i = f.columns[b];
                                    e[b].bVisible = i.visible, d.extend(a.aoPreSearchCols[b], db(i.search))
                                }
                                Pb(a, "aoStateLoaded", "stateLoaded", [a, f])
                            }
                        }
                    }
                }
            }

            function Jb(a) {
                var b = Wb.settings,
                    c = d.inArray(a, mc(b, "nTable"));
                return -1 !== c ? b[c] : null
            }

            function Kb(b, c, d, e) {
                if (d = "DataTables warning: " + (null !== b ? "table id=" + b.sTableId + " - " : "") + d, e && (d += ". For more information about this error, please see http://datatables.net/tn/" + e), c) a.console && console.log && console.log(d);
                else {
                    var f = Wb.ext,
                        g = f.sErrMode || f.errMode;
                    if ("alert" != g) throw new Error(d);
                    alert(d)
                }
            }

            function Lb(a, b, e, f) {
                return d.isArray(e) ? void d.each(e, function(c, e) {
                    d.isArray(e) ? Lb(a, b, e[0], e[1]) : Lb(a, b, e)
                }) : (f === c && (f = e), void(b[e] !== c && (a[f] = b[e])))
            }

            function Mb(a, b, c) {
                var e;
                for (var f in b) b.hasOwnProperty(f) && (e = b[f], d.isPlainObject(e) ? (d.isPlainObject(a[f]) || (a[f] = {}), d.extend(!0, a[f], e)) : a[f] = c && "data" !== f && "aaData" !== f && d.isArray(e) ? e.slice() : e);
                return a
            }

            function Nb(a, b, c) {
                d(a).bind("click.DT", b, function(b) {
                    a.blur(), c(b)
                }).bind("keypress.DT", b, function(a) {
                    13 === a.which && (a.preventDefault(), c(a))
                }).bind("selectstart.DT", function() {
                    return !1
                })
            }

            function Ob(a, b, c, d) {
                c && a[b].push({
                    fn: c,
                    sName: d
                })
            }

            function Pb(a, b, c, e) {
                var f = [];
                return b && (f = d.map(a[b].slice().reverse(), function(b) {
                    return b.fn.apply(a.oInstance, e)
                })), null !== c && d(a.nTable).trigger(c + ".dt", e), f
            }

            function Qb(a) {
                var b = a._iDisplayStart,
                    c = a.fnDisplayEnd(),
                    d = a._iDisplayLength;
                c === a.fnRecordsDisplay() && (b = c - d), (-1 === d || 0 > b) && (b = 0), a._iDisplayStart = b
            }

            function Rb(a, b) {
                var c = a.renderer,
                    e = Wb.ext.renderer[b];
                return d.isPlainObject(c) && c[b] ? e[c[b]] || e._ : "string" == typeof c ? e[c] || e._ : e._
            }

            function Sb(a) {
                return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
            }

            function Tb(a, b) {
                var c = [],
                    d = Sc.numbers_length,
                    e = Math.floor(d / 2);
                return d >= b ? c = oc(0, b) : e >= a ? (c = oc(0, d - 2), c.push("ellipsis"), c.push(b - 1)) : a >= b - 1 - e ? (c = oc(b - (d - 2), b), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0)) : (c = oc(a - 1, a + 2), c.push("ellipsis"), c.push(b - 1), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0)), c.DT_el = "span", c
            }

            function Ub(a) {
                d.each({
                    num: function(b) {
                        return Tc(b, a)
                    },
                    "num-fmt": function(b) {
                        return Tc(b, a, fc)
                    },
                    "html-num": function(b) {
                        return Tc(b, a, bc)
                    },
                    "html-num-fmt": function(b) {
                        return Tc(b, a, bc, fc)
                    }
                }, function(b, c) {
                    Xb.type.order[b + a + "-pre"] = c
                })
            }

            function Vb(a) {
                return function() {
                    var b = [Jb(this[Wb.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                    return Wb.ext.internal[a].apply(this, b)
                }
            }
            var Wb, Xb, Yb, Zb, $b, _b = {},
                ac = /[\r\n]/g,
                bc = /<.*?>/g,
                cc = /^[\w\+\-]/,
                dc = /[\w\+\-]$/,
                ec = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")", "g"),
                fc = /[',$£€¥%\u2009\u202F]/g,
                gc = function(a) {
                    return a && a !== !0 && "-" !== a ? !1 : !0
                },
                hc = function(a) {
                    var b = parseInt(a, 10);
                    return !isNaN(b) && isFinite(a) ? b : null
                },
                ic = function(a, b) {
                    return _b[b] || (_b[b] = new RegExp(ab(b), "g")), "string" == typeof a ? a.replace(/\./g, "").replace(_b[b], ".") : a
                },
                jc = function(a, b, c) {
                    var d = "string" == typeof a;
                    return b && d && (a = ic(a, b)), c && d && (a = a.replace(fc, "")), gc(a) || !isNaN(parseFloat(a)) && isFinite(a)
                },
                kc = function(a) {
                    return gc(a) || "string" == typeof a
                },
                lc = function(a, b, c) {
                    if (gc(a)) return !0;
                    var d = kc(a);
                    return d && jc(pc(a), b, c) ? !0 : null
                },
                mc = function(a, b, d) {
                    var e = [],
                        f = 0,
                        g = a.length;
                    if (d !== c)
                        for (; g > f; f++) a[f] && a[f][b] && e.push(a[f][b][d]);
                    else
                        for (; g > f; f++) a[f] && e.push(a[f][b]);
                    return e
                },
                nc = function(a, b, d, e) {
                    var f = [],
                        g = 0,
                        h = b.length;
                    if (e !== c)
                        for (; h > g; g++) f.push(a[b[g]][d][e]);
                    else
                        for (; h > g; g++) f.push(a[b[g]][d]);
                    return f
                },
                oc = function(a, b) {
                    var d, e = [];
                    b === c ? (b = 0, d = a) : (d = b, b = a);
                    for (var f = b; d > f; f++) e.push(f);
                    return e
                },
                pc = function(a) {
                    return a.replace(bc, "")
                },
                qc = function(a) {
                    var b, c, d, e = [],
                        f = a.length,
                        g = 0;
                    a: for (c = 0; f > c; c++) {
                        for (b = a[c], d = 0; g > d; d++)
                            if (e[d] === b) continue a;
                        e.push(b), g++
                    }
                    return e
                },
                rc = function(a, b, d) {
                    a[b] !== c && (a[d] = a[b])
                },
                sc = /\[.*?\]$/,
                tc = /\(\)$/,
                uc = d("<div>")[0],
                vc = uc.textContent !== c,
                wc = /<.*?>/g;
            Wb = function(a) {
                this.$ = function(a, b) {
                    return this.api(!0).$(a, b)
                }, this._ = function(a, b) {
                    return this.api(!0).rows(a, b).data()
                }, this.api = function(a) {
                    return new Yb(a ? Jb(this[Xb.iApiIndex]) : this)
                }, this.fnAddData = function(a, b) {
                    var e = this.api(!0),
                        f = d.isArray(a) && (d.isArray(a[0]) || d.isPlainObject(a[0])) ? e.rows.add(a) : e.row.add(a);
                    return (b === c || b) && e.draw(), f.flatten().toArray()
                }, this.fnAdjustColumnSizing = function(a) {
                    var b = this.api(!0).columns.adjust(),
                        d = b.settings()[0],
                        e = d.oScroll;
                    a === c || a ? b.draw(!1) : ("" !== e.sX || "" !== e.sY) && qb(d)
                }, this.fnClearTable = function(a) {
                    var b = this.api(!0).clear();
                    (a === c || a) && b.draw()
                }, this.fnClose = function(a) {
                    this.api(!0).row(a).child.hide()
                }, this.fnDeleteRow = function(a, b, d) {
                    var e = this.api(!0),
                        f = e.rows(a),
                        g = f.settings()[0],
                        h = g.aoData[f[0][0]];
                    return f.remove(), b && b.call(this, g, h), (d === c || d) && e.draw(), h
                }, this.fnDestroy = function(a) {
                    this.api(!0).destroy(a)
                }, this.fnDraw = function(a) {
                    this.api(!0).draw(!a)
                }, this.fnFilter = function(a, b, d, e, f, g) {
                    var h = this.api(!0);
                    null === b || b === c ? h.search(a, d, e, g) : h.column(b).search(a, d, e, g), h.draw()
                }, this.fnGetData = function(a, b) {
                    var d = this.api(!0);
                    if (a !== c) {
                        var e = a.nodeName ? a.nodeName.toLowerCase() : "";
                        return b !== c || "td" == e || "th" == e ? d.cell(a, b).data() : d.row(a).data() || null
                    }
                    return d.data().toArray()
                }, this.fnGetNodes = function(a) {
                    var b = this.api(!0);
                    return a !== c ? b.row(a).node() : b.rows().nodes().flatten().toArray()
                }, this.fnGetPosition = function(a) {
                    var b = this.api(!0),
                        c = a.nodeName.toUpperCase();
                    if ("TR" == c) return b.row(a).index();
                    if ("TD" == c || "TH" == c) {
                        var d = b.cell(a).index();
                        return [d.row, d.columnVisible, d.column]
                    }
                    return null
                }, this.fnIsOpen = function(a) {
                    return this.api(!0).row(a).child.isShown()
                }, this.fnOpen = function(a, b, c) {
                    return this.api(!0).row(a).child(b, c).show().child()[0]
                }, this.fnPageChange = function(a, b) {
                    var d = this.api(!0).page(a);
                    (b === c || b) && d.draw(!1)
                }, this.fnSetColumnVis = function(a, b, d) {
                    var e = this.api(!0).column(a).visible(b);
                    (d === c || d) && e.columns.adjust().draw()
                }, this.fnSettings = function() {
                    return Jb(this[Xb.iApiIndex])
                }, this.fnSort = function(a) {
                    this.api(!0).order(a).draw()
                }, this.fnSortListener = function(a, b, c) {
                    this.api(!0).order.listener(a, b, c)
                }, this.fnUpdate = function(a, b, d, e, f) {
                    var g = this.api(!0);
                    return d === c || null === d ? g.row(b).data(a) : g.cell(b, d).data(a), (f === c || f) && g.columns.adjust(), (e === c || e) && g.draw(), 0
                }, this.fnVersionCheck = Xb.fnVersionCheck;
                var b = this,
                    e = a === c,
                    k = this.length;
                e && (a = {}), this.oApi = this.internal = Xb.internal;
                for (var n in Wb.ext.internal) n && (this[n] = Vb(n));
                return this.each(function() {
                    var n, o = {},
                        p = k > 1 ? Mb(o, a, !0) : a,
                        q = 0,
                        r = this.getAttribute("id"),
                        s = !1,
                        w = Wb.defaults;
                    if ("table" != this.nodeName.toLowerCase()) return void Kb(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                    h(w), i(w.column), f(w, w, !0), f(w.column, w.column, !0), f(w, p);
                    var x = Wb.settings;
                    for (q = 0, n = x.length; n > q; q++) {
                        if (x[q].nTable == this) {
                            var y = p.bRetrieve !== c ? p.bRetrieve : w.bRetrieve,
                                z = p.bDestroy !== c ? p.bDestroy : w.bDestroy;
                            if (e || y) return x[q].oInstance;
                            if (z) {
                                x[q].oInstance.fnDestroy();
                                break
                            }
                            return void Kb(x[q], 0, "Cannot reinitialise DataTable", 3)
                        }
                        if (x[q].sTableId == this.id) {
                            x.splice(q, 1);
                            break
                        }
                    }(null === r || "" === r) && (r = "DataTables_Table_" + Wb.ext._unique++, this.id = r);
                    var A = d.extend(!0, {}, Wb.models.oSettings, {
                        nTable: this,
                        oApi: b.internal,
                        oInit: p,
                        sDestroyWidth: d(this)[0].style.width,
                        sInstance: r,
                        sTableId: r
                    });
                    x.push(A), A.oInstance = 1 === b.length ? b : d(this).dataTable(), h(p), p.oLanguage && g(p.oLanguage), p.aLengthMenu && !p.iDisplayLength && (p.iDisplayLength = d.isArray(p.aLengthMenu[0]) ? p.aLengthMenu[0][0] : p.aLengthMenu[0]), p = Mb(d.extend(!0, {}, w), p), Lb(A.oFeatures, p, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]), Lb(A, p, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"],
                        ["aoSearchCols", "aoPreSearchCols"],
                        ["iDisplayLength", "_iDisplayLength"],
                        ["bJQueryUI", "bJUI"]
                    ]), Lb(A.oScroll, p, [
                        ["sScrollX", "sX"],
                        ["sScrollXInner", "sXInner"],
                        ["sScrollY", "sY"],
                        ["bScrollCollapse", "bCollapse"]
                    ]), Lb(A.oLanguage, p, "fnInfoCallback"), Ob(A, "aoDrawCallback", p.fnDrawCallback, "user"), Ob(A, "aoServerParams", p.fnServerParams, "user"), Ob(A, "aoStateSaveParams", p.fnStateSaveParams, "user"), Ob(A, "aoStateLoadParams", p.fnStateLoadParams, "user"), Ob(A, "aoStateLoaded", p.fnStateLoaded, "user"), Ob(A, "aoRowCallback", p.fnRowCallback, "user"), Ob(A, "aoRowCreatedCallback", p.fnCreatedRow, "user"), Ob(A, "aoHeaderCallback", p.fnHeaderCallback, "user"), Ob(A, "aoFooterCallback", p.fnFooterCallback, "user"), Ob(A, "aoInitComplete", p.fnInitComplete, "user"), Ob(A, "aoPreDrawCallback", p.fnPreDrawCallback, "user");
                    var B = A.oClasses;
                    if (p.bJQueryUI ? (d.extend(B, Wb.ext.oJUIClasses, p.oClasses), p.sDom === w.sDom && "lfrtip" === w.sDom && (A.sDom = '<"H"lfr>t<"F"ip>'), A.renderer ? d.isPlainObject(A.renderer) && !A.renderer.header && (A.renderer.header = "jqueryui") : A.renderer = "jqueryui") : d.extend(B, Wb.ext.classes, p.oClasses), d(this).addClass(B.sTable), ("" !== A.oScroll.sX || "" !== A.oScroll.sY) && (A.oScroll.iBarWidth = zb()), A.oScroll.sX === !0 && (A.oScroll.sX = "100%"), A.iInitDisplayStart === c && (A.iInitDisplayStart = p.iDisplayStart, A._iDisplayStart = p.iDisplayStart), null !== p.iDeferLoading) {
                        A.bDeferLoading = !0;
                        var C = d.isArray(p.iDeferLoading);
                        A._iRecordsDisplay = C ? p.iDeferLoading[0] : p.iDeferLoading, A._iRecordsTotal = C ? p.iDeferLoading[1] : p.iDeferLoading
                    }
                    "" !== p.oLanguage.sUrl ? (A.oLanguage.sUrl = p.oLanguage.sUrl, d.getJSON(A.oLanguage.sUrl, null, function(a) {
                        g(a), f(w.oLanguage, a), d.extend(!0, A.oLanguage, p.oLanguage, a), hb(A)
                    }), s = !0) : d.extend(!0, A.oLanguage, p.oLanguage), null === p.asStripeClasses && (A.asStripeClasses = [B.sStripeOdd, B.sStripeEven]);
                    var D = A.asStripeClasses,
                        E = d("tbody tr:eq(0)", this); - 1 !== d.inArray(!0, d.map(D, function(a) {
                        return E.hasClass(a)
                    })) && (d("tbody tr", this).removeClass(D.join(" ")), A.asDestroyStripes = D.slice());
                    var F, G = [],
                        I = this.getElementsByTagName("thead");
                    if (0 !== I.length && (P(A.aoHeader, I[0]), G = Q(A)), null === p.aoColumns)
                        for (F = [], q = 0, n = G.length; n > q; q++) F.push(null);
                    else F = p.aoColumns;
                    for (q = 0, n = F.length; n > q; q++) l(A, G ? G[q] : null);
                    if (t(A, p.aoColumnDefs, F, function(a, b) {
                            m(A, a, b)
                        }), E.length) {
                        var J = function(a, b) {
                            return a.getAttribute("data-" + b) ? b : null
                        };
                        d.each(H(A, E[0]).cells, function(a, b) {
                            var d = A.aoColumns[a];
                            if (d.mData === a) {
                                var e = J(b, "sort") || J(b, "order"),
                                    f = J(b, "filter") || J(b, "search");
                                (null !== e || null !== f) && (d.mData = {
                                    _: a + ".display",
                                    sort: null !== e ? a + ".@data-" + e : c,
                                    type: null !== e ? a + ".@data-" + e : c,
                                    filter: null !== f ? a + ".@data-" + f : c
                                }, m(A, a))
                            }
                        })
                    }
                    var K = A.oFeatures;
                    if (p.bStateSave && (K.bStateSave = !0, Ib(A, p), Ob(A, "aoDrawCallback", Hb, "state_save")), p.aaSorting === c) {
                        var L = A.aaSorting;
                        for (q = 0, n = L.length; n > q; q++) L[q][1] = A.aoColumns[q].asSorting[0]
                    }
                    Fb(A), K.bSort && Ob(A, "aoDrawCallback", function() {
                        if (A.bSorted) {
                            var a = Ab(A),
                                b = {};
                            d.each(a, function(a, c) {
                                b[c.src] = c.dir
                            }), Pb(A, null, "order", [A, a, b]), Cb(A)
                        }
                    }), Ob(A, "aoDrawCallback", function() {
                        (A.bSorted || "ssp" === Sb(A) || K.bDeferRender) && Fb(A)
                    }, "sc"), j(A);
                    var M = d(this).children("caption").each(function() {
                            this._captionSide = d(this).css("caption-side")
                        }),
                        N = d(this).children("thead");
                    0 === N.length && (N = d("<thead/>").appendTo(this)), A.nTHead = N[0];
                    var O = d(this).children("tbody");
                    0 === O.length && (O = d("<tbody/>").appendTo(this)), A.nTBody = O[0];
                    var R = d(this).children("tfoot");
                    if (0 === R.length && M.length > 0 && ("" !== A.oScroll.sX || "" !== A.oScroll.sY) && (R = d("<tfoot/>").appendTo(this)), 0 === R.length || 0 === R.children().length ? d(this).addClass(B.sNoFooter) : R.length > 0 && (A.nTFoot = R[0], P(A.aoFooter, A.nTFoot)), p.aaData)
                        for (q = 0; q < p.aaData.length; q++) u(A, p.aaData[q]);
                    else(A.bDeferLoading || "dom" == Sb(A)) && v(A, d(A.nTBody).children("tr"));
                    A.aiDisplay = A.aiDisplayMaster.slice(), A.bInitialised = !0, s === !1 && hb(A)
                }), b = null, this
            };
            var xc = [],
                yc = Array.prototype,
                zc = function(a) {
                    var b, c, e = Wb.settings,
                        f = d.map(e, function(a) {
                            return a.nTable
                        });
                    return a ? a.nTable && a.oApi ? [a] : a.nodeName && "table" === a.nodeName.toLowerCase() ? (b = d.inArray(a, f), -1 !== b ? [e[b]] : null) : a && "function" == typeof a.settings ? a.settings().toArray() : ("string" == typeof a ? c = d(a) : a instanceof d && (c = a), c ? c.map(function() {
                        return b = d.inArray(this, f), -1 !== b ? e[b] : null
                    }).toArray() : void 0) : []
                };
            Yb = function(a, b) {
                if (!this instanceof Yb) throw "DT API must be constructed as a new object";
                var c = [],
                    e = function(a) {
                        var b = zc(a);
                        b && c.push.apply(c, b)
                    };
                if (d.isArray(a))
                    for (var f = 0, g = a.length; g > f; f++) e(a[f]);
                else e(a);
                this.context = qc(c), b && this.push.apply(this, b.toArray ? b.toArray() : b), this.selector = {
                    rows: null,
                    cols: null,
                    opts: null
                }, Yb.extend(this, this, xc)
            }, Wb.Api = Yb, Yb.prototype = {
                concat: yc.concat,
                context: [],
                each: function(a) {
                    for (var b = 0, c = this.length; c > b; b++) a.call(this, this[b], b, this);
                    return this
                },
                eq: function(a) {
                    var b = this.context;
                    return b.length > a ? new Yb(b[a], this[a]) : null
                },
                filter: function(a) {
                    var b = [];
                    if (yc.filter) b = yc.filter.call(this, a, this);
                    else
                        for (var c = 0, d = this.length; d > c; c++) a.call(this, this[c], c, this) && b.push(this[c]);
                    return new Yb(this.context, b)
                },
                flatten: function() {
                    var a = [];
                    return new Yb(this.context, a.concat.apply(a, this.toArray()))
                },
                join: yc.join,
                indexOf: yc.indexOf || function(a, b) {
                    for (var c = b || 0, d = this.length; d > c; c++)
                        if (this[c] === a) return c;
                    return -1
                },
                iterator: function(a, b, d) {
                    var e, f, g, h, i, j, k, l, m = [],
                        n = this.context,
                        o = this.selector;
                    for ("string" == typeof a && (d = b, b = a, a = !1), f = 0, g = n.length; g > f; f++)
                        if ("table" === b) e = d(n[f], f), e !== c && m.push(e);
                        else if ("columns" === b || "rows" === b) e = d(n[f], this[f], f), e !== c && m.push(e);
                    else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b)
                        for (k = this[f], "column-rows" === b && (j = Fc(n[f], o.opts)), h = 0, i = k.length; i > h; h++) l = k[h], e = "cell" === b ? d(n[f], l.row, l.column, f, h) : d(n[f], l, f, h, j), e !== c && m.push(e);
                    if (m.length) {
                        var p = new Yb(n, a ? m.concat.apply([], m) : m),
                            q = p.selector;
                        return q.rows = o.rows, q.cols = o.cols, q.opts = o.opts, p
                    }
                    return this
                },
                lastIndexOf: yc.lastIndexOf || function() {
                    return this.indexOf.apply(this.toArray.reverse(), arguments)
                },
                length: 0,
                map: function(a) {
                    var b = [];
                    if (yc.map) b = yc.map.call(this, a, this);
                    else
                        for (var c = 0, d = this.length; d > c; c++) b.push(a.call(this, this[c], c));
                    return new Yb(this.context, b)
                },
                pluck: function(a) {
                    return this.map(function(b) {
                        return b[a]
                    })
                },
                pop: yc.pop,
                push: yc.push,
                reduce: yc.reduce || function(a, b) {
                    return k(this, a, b, 0, this.length, 1)
                },
                reduceRight: yc.reduceRight || function(a, b) {
                    return k(this, a, b, this.length - 1, -1, -1)
                },
                reverse: yc.reverse,
                selector: null,
                shift: yc.shift,
                sort: yc.sort,
                splice: yc.splice,
                toArray: function() {
                    return yc.slice.call(this)
                },
                to$: function() {
                    return d(this)
                },
                toJQuery: function() {
                    return d(this)
                },
                unique: function() {
                    return new Yb(this.context, qc(this))
                },
                unshift: yc.unshift
            }, Yb.extend = function(a, b, c) {
                if (b && (b instanceof Yb || b.__dt_wrapper)) {
                    var e, f, g, h = function(a, b, c) {
                        return function() {
                            var d = b.apply(a, arguments);
                            return Yb.extend(d, d, c.methodExt), d
                        }
                    };
                    for (e = 0, f = c.length; f > e; e++) g = c[e], b[g.name] = "function" == typeof g.val ? h(a, g.val, g) : d.isPlainObject(g.val) ? {} : g.val, b[g.name].__dt_wrapper = !0, Yb.extend(a, b[g.name], g.propExt)
                }
            }, Yb.register = Zb = function(a, b) {
                if (d.isArray(a))
                    for (var c = 0, e = a.length; e > c; c++) Yb.register(a[c], b);
                else {
                    var f, g, h, i, j = a.split("."),
                        k = xc,
                        l = function(a, b) {
                            for (var c = 0, d = a.length; d > c; c++)
                                if (a[c].name === b) return a[c];
                            return null
                        };
                    for (f = 0, g = j.length; g > f; f++) {
                        i = -1 !== j[f].indexOf("()"), h = i ? j[f].replace("()", "") : j[f];
                        var m = l(k, h);
                        m || (m = {
                            name: h,
                            val: {},
                            methodExt: [],
                            propExt: []
                        }, k.push(m)), f === g - 1 ? m.val = b : k = i ? m.methodExt : m.propExt
                    }
                }
            }, Yb.registerPlural = $b = function(a, b, e) {
                Yb.register(a, e), Yb.register(b, function() {
                    var a = e.apply(this, arguments);
                    return a === this ? this : a instanceof Yb ? a.length ? d.isArray(a[0]) ? new Yb(a.context, a[0]) : a[0] : c : a
                })
            };
            var Ac = function(a, b) {
                if ("number" == typeof a) return [b[a]];
                var c = d.map(b, function(a) {
                    return a.nTable
                });
                return d(c).filter(a).map(function() {
                    var a = d.inArray(this, c);
                    return b[a]
                }).toArray()
            };
            Zb("tables()", function(a) {
                return a ? new Yb(Ac(a, this.context)) : this
            }), Zb("table()", function(a) {
                var b = this.tables(a),
                    c = b.context;
                return c.length ? new Yb(c[0]) : b
            }), $b("tables().nodes()", "table().node()", function() {
                return this.iterator("table", function(a) {
                    return a.nTable
                })
            }), $b("tables().body()", "table().body()", function() {
                return this.iterator("table", function(a) {
                    return a.nTBody
                })
            }), $b("tables().header()", "table().header()", function() {
                return this.iterator("table", function(a) {
                    return a.nTHead
                })
            }), $b("tables().footer()", "table().footer()", function() {
                return this.iterator("table", function(a) {
                    return a.nTFoot
                })
            }), $b("tables().containers()", "table().container()", function() {
                return this.iterator("table", function(a) {
                    return a.nTableWrapper
                })
            }), Zb("draw()", function(a) {
                return this.iterator("table", function(b) {
                    N(b, a === !1)
                })
            }), Zb("page()", function(a) {
                return a === c ? this.page.info().page : this.iterator("table", function(b) {
                    mb(b, a)
                })
            }), Zb("page.info()", function() {
                if (0 === this.context.length) return c;
                var a = this.context[0],
                    b = a._iDisplayStart,
                    d = a._iDisplayLength,
                    e = a.fnRecordsDisplay(),
                    f = -1 === d;
                return {
                    page: f ? 0 : Math.floor(b / d),
                    pages: f ? 1 : Math.ceil(e / d),
                    start: b,
                    end: a.fnDisplayEnd(),
                    length: d,
                    recordsTotal: a.fnRecordsTotal(),
                    recordsDisplay: e
                }
            }), Zb("page.len()", function(a) {
                return a === c ? 0 !== this.context.length ? this.context[0]._iDisplayLength : c : this.iterator("table", function(b) {
                    jb(b, a)
                })
            });
            var Bc = function(a, b, c) {
                if ("ssp" == Sb(a) ? N(a, b) : (ob(a, !0), R(a, [], function(c) {
                        E(a);
                        for (var d = V(a, c), e = 0, f = d.length; f > e; e++) u(a, d[e]);
                        N(a, b), ob(a, !1)
                    })), c) {
                    var d = new Yb(a);
                    d.one("draw", function() {
                        c(d.ajax.json())
                    })
                }
            };
            Zb("ajax.json()", function() {
                var a = this.context;
                return a.length > 0 ? a[0].json : void 0
            }), Zb("ajax.params()", function() {
                var a = this.context;
                return a.length > 0 ? a[0].oAjaxData : void 0
            }), Zb("ajax.reload()", function(a, b) {
                return this.iterator("table", function(c) {
                    Bc(c, b === !1, a)
                })
            }), Zb("ajax.url()", function(a) {
                var b = this.context;
                return a === c ? 0 === b.length ? c : (b = b[0], b.ajax ? d.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource) : this.iterator("table", function(b) {
                    d.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
                })
            }), Zb("ajax.url().load()", function(a, b) {
                return this.iterator("table", function(c) {
                    Bc(c, b === !1, a)
                })
            });
            var Cc = function(a, b) {
                    var e, f, g, h, i, j, k = [];
                    for (a && "string" != typeof a && a.length !== c || (a = [a]), g = 0, h = a.length; h > g; g++)
                        for (f = a[g] && a[g].split ? a[g].split(",") : [a[g]], i = 0, j = f.length; j > i; i++) e = b("string" == typeof f[i] ? d.trim(f[i]) : f[i]), e && e.length && k.push.apply(k, e);
                    return k
                },
                Dc = function(a) {
                    return a || (a = {}), a.filter && !a.search && (a.search = a.filter), {
                        search: a.search || "none",
                        order: a.order || "current",
                        page: a.page || "all"
                    }
                },
                Ec = function(a) {
                    for (var b = 0, c = a.length; c > b; b++)
                        if (a[b].length > 0) return a[0] = a[b], a.length = 1, a.context = [a.context[b]], a;
                    return a.length = 0, a
                },
                Fc = function(a, b) {
                    var c, e, f, g = [],
                        h = a.aiDisplay,
                        i = a.aiDisplayMaster,
                        j = b.search,
                        k = b.order,
                        l = b.page;
                    if ("ssp" == Sb(a)) return "removed" === j ? [] : oc(0, i.length);
                    if ("current" == l)
                        for (c = a._iDisplayStart, e = a.fnDisplayEnd(); e > c; c++) g.push(h[c]);
                    else if ("current" == k || "applied" == k) g = "none" == j ? i.slice() : "applied" == j ? h.slice() : d.map(i, function(a) {
                        return -1 === d.inArray(a, h) ? a : null
                    });
                    else if ("index" == k || "original" == k)
                        for (c = 0, e = a.aoData.length; e > c; c++) "none" == j ? g.push(c) : (f = d.inArray(c, h), (-1 === f && "removed" == j || f >= 0 && "applied" == j) && g.push(c));
                    return g
                },
                Gc = function(a, b, c) {
                    return Cc(b, function(b) {
                        var e = hc(b);
                        if (null !== e && !c) return [e];
                        var f = Fc(a, c);
                        if (null !== e && -1 !== d.inArray(e, f)) return [e];
                        if (!b) return f;
                        for (var g = [], h = 0, i = f.length; i > h; h++) g.push(a.aoData[f[h]].nTr);
                        return b.nodeName && -1 !== d.inArray(b, g) ? [b._DT_RowIndex] : d(g).filter(b).map(function() {
                            return this._DT_RowIndex
                        }).toArray()
                    })
                };
            Zb("rows()", function(a, b) {
                a === c ? a = "" : d.isPlainObject(a) && (b = a, a = ""), b = Dc(b);
                var e = this.iterator("table", function(c) {
                    return Gc(c, a, b)
                });
                return e.selector.rows = a, e.selector.opts = b, e
            }), Zb("rows().nodes()", function() {
                return this.iterator("row", function(a, b) {
                    return a.aoData[b].nTr || c
                })
            }), Zb("rows().data()", function() {
                return this.iterator(!0, "rows", function(a, b) {
                    return nc(a.aoData, b, "_aData")
                })
            }), $b("rows().cache()", "row().cache()", function(a) {
                return this.iterator("row", function(b, c) {
                    var d = b.aoData[c];
                    return "search" === a ? d._aFilterData : d._aSortData
                })
            }), $b("rows().invalidate()", "row().invalidate()", function(a) {
                return this.iterator("row", function(b, c) {
                    G(b, c, a)
                })
            }), $b("rows().indexes()", "row().index()", function() {
                return this.iterator("row", function(a, b) {
                    return b
                })
            }), $b("rows().remove()", "row().remove()", function() {
                var a = this;
                return this.iterator("row", function(b, c, e) {
                    var f = b.aoData;
                    f.splice(c, 1);
                    for (var g = 0, h = f.length; h > g; g++) null !== f[g].nTr && (f[g].nTr._DT_RowIndex = g);
                    d.inArray(c, b.aiDisplay);
                    F(b.aiDisplayMaster, c), F(b.aiDisplay, c), F(a[e], c, !1), Qb(b)
                })
            }), Zb("rows.add()", function(a) {
                var b = this.iterator("table", function(b) {
                        var c, d, e, f = [];
                        for (d = 0, e = a.length; e > d; d++) c = a[d], f.push(c.nodeName && "TR" === c.nodeName.toUpperCase() ? v(b, c)[0] : u(b, c));
                        return f
                    }),
                    c = this.rows(-1);
                return c.pop(), c.push.apply(c, b.toArray()), c
            }), Zb("row()", function(a, b) {
                return Ec(this.rows(a, b))
            }), Zb("row().data()", function(a) {
                var b = this.context;
                return a === c ? b.length && this.length ? b[0].aoData[this[0]]._aData : c : (b[0].aoData[this[0]]._aData = a, G(b[0], this[0], "data"), this)
            }), Zb("row().node()", function() {
                var a = this.context;
                return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null
            }), Zb("row.add()", function(a) {
                a instanceof d && a.length && (a = a[0]);
                var b = this.iterator("table", function(b) {
                    return a.nodeName && "TR" === a.nodeName.toUpperCase() ? v(b, a)[0] : u(b, a)
                });
                return this.row(b[0])
            });
            var Hc = function(a, b, c, e) {
                    var f = [],
                        g = function(b, c) {
                            if (b.nodeName && "tr" === b.nodeName.toLowerCase()) f.push(b);
                            else {
                                var e = d("<tr><td/></tr>").addClass(c);
                                d("td", e).addClass(c).html(b)[0].colSpan = q(a), f.push(e[0])
                            }
                        };
                    if (d.isArray(c) || c instanceof d)
                        for (var h = 0, i = c.length; i > h; h++) g(c[h], e);
                    else g(c, e);
                    b._details && b._details.remove(), b._details = d(f), b._detailsShow && b._details.insertAfter(b.nTr)
                },
                Ic = function(a) {
                    var b = a.context;
                    if (b.length && a.length) {
                        var d = b[0].aoData[a[0]];
                        d._details && (d._details.remove(), d._detailsShow = c, d._details = c)
                    }
                },
                Jc = function(a, b) {
                    var c = a.context;
                    if (c.length && a.length) {
                        var d = c[0].aoData[a[0]];
                        d._details && (d._detailsShow = b, b ? d._details.insertAfter(d.nTr) : d._details.detach(), Kc(c[0]))
                    }
                },
                Kc = function(a) {
                    var b = new Yb(a),
                        c = ".dt.DT_details",
                        d = "draw" + c,
                        e = "column-visibility" + c,
                        f = "destroy" + c,
                        g = a.aoData;
                    b.off(d + " " + e + " " + f), mc(g, "_details").length > 0 && (b.on(d, function(c, d) {
                        a === d && b.rows({
                            page: "current"
                        }).eq(0).each(function(a) {
                            var b = g[a];
                            b._detailsShow && b._details.insertAfter(b.nTr)
                        })
                    }), b.on(e, function(b, c) {
                        if (a === c)
                            for (var d, e = q(c), f = 0, h = g.length; h > f; f++) d = g[f], d._details && d._details.children("td[colspan]").attr("colspan", e)
                    }), b.on(f, function(b, c) {
                        if (a === c)
                            for (var d = 0, e = g.length; e > d; d++) g[d]._details && Ic(g[d])
                    }))
                },
                Lc = "",
                Mc = Lc + "row().child",
                Nc = Mc + "()";
            Zb(Nc, function(a, b) {
                var d = this.context;
                return a === c ? d.length && this.length ? d[0].aoData[this[0]]._details : c : (a === !0 ? this.child.show() : a === !1 ? Ic(this) : d.length && this.length && Hc(d[0], d[0].aoData[this[0]], a, b), this)
            }), Zb([Mc + ".show()", Nc + ".show()"], function() {
                return Jc(this, !0), this
            }), Zb([Mc + ".hide()", Nc + ".hide()"], function() {
                return Jc(this, !1), this
            }), Zb([Mc + ".remove()", Nc + ".remove()"], function() {
                return Ic(this), this
            }), Zb(Mc + ".isShown()", function() {
                var a = this.context;
                return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
            });
            var Oc = /^(.+):(name|visIdx|visible)$/,
                Pc = function(a, b) {
                    var c = a.aoColumns,
                        e = mc(c, "sName"),
                        f = mc(c, "nTh");
                    return Cc(b, function(b) {
                        var g = hc(b);
                        if ("" === b) return oc(c.length);
                        if (null !== g) return [g >= 0 ? g : c.length + g];
                        var h = "string" == typeof b ? b.match(Oc) : "";
                        if (!h) return d(f).filter(b).map(function() {
                            return d.inArray(this, f)
                        }).toArray();
                        switch (h[2]) {
                            case "visIdx":
                            case "visible":
                                var i = parseInt(h[1], 10);
                                if (0 > i) {
                                    var j = d.map(c, function(a, b) {
                                        return a.bVisible ? b : null
                                    });
                                    return [j[j.length + i]]
                                }
                                return [o(a, i)];
                            case "name":
                                return d.map(e, function(a, b) {
                                    return a === h[1] ? b : null
                                })
                        }
                    })
                },
                Qc = function(a, b, e, f) {
                    var g, h, i, j, k = a.aoColumns,
                        l = k[b],
                        m = a.aoData;
                    if (e === c) return l.bVisible;
                    if (l.bVisible !== e) {
                        if (e) {
                            var o = d.inArray(!0, mc(k, "bVisible"), b + 1);
                            for (h = 0, i = m.length; i > h; h++) j = m[h].nTr, g = m[h].anCells, j && j.insertBefore(g[b], g[o] || null)
                        } else d(mc(a.aoData, "anCells", b)).detach();
                        l.bVisible = e, L(a, a.aoHeader), L(a, a.aoFooter), (f === c || f) && (n(a), (a.oScroll.sX || a.oScroll.sY) && qb(a)), Pb(a, null, "column-visibility", [a, b, e]), Hb(a)
                    }
                };
            Zb("columns()", function(a, b) {
                a === c ? a = "" : d.isPlainObject(a) && (b = a, a = ""), b = Dc(b);
                var e = this.iterator("table", function(c) {
                    return Pc(c, a, b)
                });
                return e.selector.cols = a, e.selector.opts = b, e
            }), $b("columns().header()", "column().header()", function() {
                return this.iterator("column", function(a, b) {
                    return a.aoColumns[b].nTh
                })
            }), $b("columns().footer()", "column().footer()", function() {
                return this.iterator("column", function(a, b) {
                    return a.aoColumns[b].nTf
                })
            }), $b("columns().data()", "column().data()", function() {
                return this.iterator("column-rows", function(a, b, c, d, e) {
                    for (var f = [], g = 0, h = e.length; h > g; g++) f.push(y(a, e[g], b, ""));
                    return f
                })
            }), $b("columns().cache()", "column().cache()", function(a) {
                return this.iterator("column-rows", function(b, c, d, e, f) {
                    return nc(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
                })
            }), $b("columns().nodes()", "column().nodes()", function() {
                return this.iterator("column-rows", function(a, b, c, d, e) {
                    return nc(a.aoData, e, "anCells", b)
                })
            }), $b("columns().visible()", "column().visible()", function(a, b) {
                return this.iterator("column", function(d, e) {
                    return a === c ? d.aoColumns[e].bVisible : Qc(d, e, a, b)
                })
            }), $b("columns().indexes()", "column().index()", function(a) {
                return this.iterator("column", function(b, c) {
                    return "visible" === a ? p(b, c) : c
                })
            }), Zb("columns.adjust()", function() {
                return this.iterator("table", function(a) {
                    n(a)
                })
            }), Zb("column.index()", function(a, b) {
                if (0 !== this.context.length) {
                    var c = this.context[0];
                    if ("fromVisible" === a || "toData" === a) return o(c, b);
                    if ("fromData" === a || "toVisible" === a) return p(c, b)
                }
            }), Zb("column()", function(a, b) {
                return Ec(this.columns(a, b))
            });
            var Rc = function(a, b, e) {
                var f, g, h, i, j, k = a.aoData,
                    l = Fc(a, e),
                    m = nc(k, l, "anCells"),
                    n = d([].concat.apply([], m)),
                    o = a.aoColumns.length;
                return Cc(b, function(a) {
                    if (null === a || a === c) {
                        for (g = [], h = 0, i = l.length; i > h; h++)
                            for (f = l[h], j = 0; o > j; j++) g.push({
                                row: f,
                                column: j
                            });
                        return g
                    }
                    return d.isPlainObject(a) ? [a] : n.filter(a).map(function(a, b) {
                        return f = b.parentNode._DT_RowIndex, {
                            row: f,
                            column: d.inArray(b, k[f].anCells)
                        }
                    }).toArray()
                })
            };
            Zb("cells()", function(a, b, e) {
                    if (d.isPlainObject(a) && (typeof a.row !== c ? (e = b, b = null) : (e = a, a = null)), d.isPlainObject(b) && (e = b, b = null), null === b || b === c) return this.iterator("table", function(b) {
                        return Rc(b, a, Dc(e))
                    });
                    var f, g, h, i, j, k = this.columns(b, e),
                        l = this.rows(a, e),
                        m = this.iterator("table", function(a, b) {
                            for (f = [], g = 0, h = l[b].length; h > g; g++)
                                for (i = 0, j = k[b].length; j > i; i++) f.push({
                                    row: l[b][g],
                                    column: k[b][i]
                                });
                            return f
                        });
                    return d.extend(m.selector, {
                        cols: b,
                        rows: a,
                        opts: e
                    }), m
                }), $b("cells().nodes()", "cell().node()", function() {
                    return this.iterator("cell", function(a, b, c) {
                        return a.aoData[b].anCells[c]
                    })
                }), Zb("cells().data()", function() {
                    return this.iterator("cell", function(a, b, c) {
                        return y(a, b, c)
                    })
                }), $b("cells().cache()", "cell().cache()", function(a) {
                    return a = "search" === a ? "_aFilterData" : "_aSortData", this.iterator("cell", function(b, c, d) {
                        return b.aoData[c][a][d]
                    })
                }), $b("cells().indexes()", "cell().index()", function() {
                    return this.iterator("cell", function(a, b, c) {
                        return {
                            row: b,
                            column: c,
                            columnVisible: p(a, c)
                        }
                    })
                }), Zb(["cells().invalidate()", "cell().invalidate()"], function(a) {
                    var b = this.selector;
                    return this.rows(b.rows, b.opts).invalidate(a), this
                }), Zb("cell()", function(a, b, c) {
                    return Ec(this.cells(a, b, c))
                }), Zb("cell().data()", function(a) {
                    var b = this.context,
                        d = this[0];
                    return a === c ? b.length && d.length ? y(b[0], d[0].row, d[0].column) : c : (z(b[0], d[0].row, d[0].column, a), G(b[0], d[0].row, "data", d[0].column), this)
                }), Zb("order()", function(a, b) {
                    var e = this.context;
                    return a === c ? 0 !== e.length ? e[0].aaSorting : c : ("number" == typeof a ? a = [
                        [a, b]
                    ] : d.isArray(a[0]) || (a = Array.prototype.slice.call(arguments)), this.iterator("table", function(b) {
                        b.aaSorting = a.slice()
                    }))
                }), Zb("order.listener()", function(a, b, c) {
                    return this.iterator("table", function(d) {
                        Eb(d, a, b, c)
                    })
                }), Zb(["columns().order()", "column().order()"], function(a) {
                    var b = this;
                    return this.iterator("table", function(c, e) {
                        var f = [];
                        d.each(b[e], function(b, c) {
                            f.push([c, a])
                        }), c.aaSorting = f
                    })
                }), Zb("search()", function(a, b, e, f) {
                    var g = this.context;
                    return a === c ? 0 !== g.length ? g[0].oPreviousSearch.sSearch : c : this.iterator("table", function(c) {
                        c.oFeatures.bFilter && X(c, d.extend({}, c.oPreviousSearch, {
                            sSearch: a + "",
                            bRegex: null === b ? !1 : b,
                            bSmart: null === e ? !0 : e,
                            bCaseInsensitive: null === f ? !0 : f
                        }), 1)
                    })
                }), $b("columns().search()", "column().search()", function(a, b, e, f) {
                    return this.iterator("column", function(g, h) {
                        var i = g.aoPreSearchCols;
                        return a === c ? i[h].sSearch : void(g.oFeatures.bFilter && (d.extend(i[h], {
                            sSearch: a + "",
                            bRegex: null === b ? !1 : b,
                            bSmart: null === e ? !0 : e,
                            bCaseInsensitive: null === f ? !0 : f
                        }), X(g, g.oPreviousSearch, 1)))
                    })
                }), Zb("state()", function() {
                    return this.context.length ? this.context[0].oSavedState : null
                }), Zb("state.clear()", function() {
                    return this.iterator("table", function(a) {
                        a.fnStateSaveCallback.call(a.oInstance, a, {})
                    })
                }), Zb("state.loaded()", function() {
                    return this.context.length ? this.context[0].oLoadedState : null
                }), Zb("state.save()", function() {
                    return this.iterator("table", function(a) {
                        Hb(a)
                    })
                }), Wb.versionCheck = Wb.fnVersionCheck = function(a) {
                    for (var b, c, d = Wb.version.split("."), e = a.split("."), f = 0, g = e.length; g > f; f++)
                        if (b = parseInt(d[f], 10) || 0, c = parseInt(e[f], 10) || 0, b !== c) return b > c;
                    return !0
                }, Wb.isDataTable = Wb.fnIsDataTable = function(a) {
                    var b = d(a).get(0),
                        c = !1;
                    return d.each(Wb.settings, function(a, d) {
                        (d.nTable === b || d.nScrollHead === b || d.nScrollFoot === b) && (c = !0)
                    }), c
                }, Wb.tables = Wb.fnTables = function(a) {
                    return jQuery.map(Wb.settings, function(b) {
                        return !a || a && d(b.nTable).is(":visible") ? b.nTable : void 0
                    })
                }, Wb.camelToHungarian = f, Zb("$()", function(a, b) {
                    var c = this.rows(b).nodes(),
                        e = d(c);
                    return d([].concat(e.filter(a).toArray(), e.find(a).toArray()))
                }), d.each(["on", "one", "off"], function(a, b) {
                    Zb(b + "()", function() {
                        var a = Array.prototype.slice.call(arguments);
                        a[0].match(/\.dt\b/) || (a[0] += ".dt");
                        var c = d(this.tables().nodes());
                        return c[b].apply(c, a), this
                    })
                }), Zb("clear()", function() {
                    return this.iterator("table", function(a) {
                        E(a)
                    })
                }), Zb("settings()", function() {
                    return new Yb(this.context, this.context)
                }), Zb("data()", function() {
                    return this.iterator("table", function(a) {
                        return mc(a.aoData, "_aData")
                    }).flatten()
                }), Zb("destroy()", function(b) {
                    return b = b || !1, this.iterator("table", function(c) {
                        var e, f = c.nTableWrapper.parentNode,
                            g = c.oClasses,
                            h = c.nTable,
                            i = c.nTBody,
                            j = c.nTHead,
                            k = c.nTFoot,
                            l = d(h),
                            m = d(i),
                            n = d(c.nTableWrapper),
                            o = d.map(c.aoData, function(a) {
                                return a.nTr
                            });
                        c.bDestroying = !0, Pb(c, "aoDestroyCallback", "destroy", [c]), b || new Yb(c).columns().visible(!0), n.unbind(".DT").find(":not(tbody *)").unbind(".DT"), d(a).unbind(".DT-" + c.sInstance), h != j.parentNode && (l.children("thead").detach(), l.append(j)), k && h != k.parentNode && (l.children("tfoot").detach(), l.append(k)), l.detach(), n.detach(), c.aaSorting = [], c.aaSortingFixed = [], Fb(c), d(o).removeClass(c.asStripeClasses.join(" ")), d("th, td", j).removeClass(g.sSortable + " " + g.sSortableAsc + " " + g.sSortableDesc + " " + g.sSortableNone), c.bJUI && (d("th span." + g.sSortIcon + ", td span." + g.sSortIcon, j).detach(), d("th, td", j).each(function() {
                            var a = d("div." + g.sSortJUIWrapper, this);
                            d(this).append(a.contents()), a.detach()
                        })), !b && f && f.insertBefore(h, c.nTableReinsertBefore), m.children().detach(), m.append(o), l.css("width", c.sDestroyWidth).removeClass(g.sTable), e = c.asDestroyStripes.length, e && m.children().each(function(a) {
                            d(this).addClass(c.asDestroyStripes[a % e])
                        });
                        var p = d.inArray(c, Wb.settings); - 1 !== p && Wb.settings.splice(p, 1)
                    })
                }), Wb.version = "1.10.2", Wb.settings = [], Wb.models = {}, Wb.models.oSearch = {
                    bCaseInsensitive: !0,
                    sSearch: "",
                    bRegex: !1,
                    bSmart: !0
                }, Wb.models.oRow = {
                    nTr: null,
                    anCells: null,
                    _aData: [],
                    _aSortData: null,
                    _aFilterData: null,
                    _sFilterRow: null,
                    _sRowStripe: "",
                    src: null
                }, Wb.models.oColumn = {
                    idx: null,
                    aDataSort: null,
                    asSorting: null,
                    bSearchable: null,
                    bSortable: null,
                    bVisible: null,
                    _sManualType: null,
                    _bAttrSrc: !1,
                    fnCreatedCell: null,
                    fnGetData: null,
                    fnSetData: null,
                    mData: null,
                    mRender: null,
                    nTh: null,
                    nTf: null,
                    sClass: null,
                    sContentPadding: null,
                    sDefaultContent: null,
                    sName: null,
                    sSortDataType: "std",
                    sSortingClass: null,
                    sSortingClassJUI: null,
                    sTitle: null,
                    sType: null,
                    sWidth: null,
                    sWidthOrig: null
                }, Wb.defaults = {
                    aaData: null,
                    aaSorting: [
                        [0, "asc"]
                    ],
                    aaSortingFixed: [],
                    ajax: null,
                    aLengthMenu: [10, 25, 50, 100],
                    aoColumns: null,
                    aoColumnDefs: null,
                    aoSearchCols: [],
                    asStripeClasses: null,
                    bAutoWidth: !0,
                    bDeferRender: !1,
                    bDestroy: !1,
                    bFilter: !0,
                    bInfo: !0,
                    bJQueryUI: !1,
                    bLengthChange: !0,
                    bPaginate: !0,
                    bProcessing: !1,
                    bRetrieve: !1,
                    bScrollCollapse: !1,
                    bServerSide: !1,
                    bSort: !0,
                    bSortMulti: !0,
                    bSortCellsTop: !1,
                    bSortClasses: !0,
                    bStateSave: !1,
                    fnCreatedRow: null,
                    fnDrawCallback: null,
                    fnFooterCallback: null,
                    fnFormatNumber: function(a) {
                        return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
                    },
                    fnHeaderCallback: null,
                    fnInfoCallback: null,
                    fnInitComplete: null,
                    fnPreDrawCallback: null,
                    fnRowCallback: null,
                    fnServerData: null,
                    fnServerParams: null,
                    fnStateLoadCallback: function(a) {
                        try {
                            return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
                        } catch (b) {}
                    },
                    fnStateLoadParams: null,
                    fnStateLoaded: null,
                    fnStateSaveCallback: function(a, b) {
                        try {
                            (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
                        } catch (c) {}
                    },
                    fnStateSaveParams: null,
                    iStateDuration: 7200,
                    iDeferLoading: null,
                    iDisplayLength: 10,
                    iDisplayStart: 0,
                    iTabIndex: 0,
                    oClasses: {},
                    oLanguage: {
                        oAria: {
                            sSortAscending: ": activate to sort column ascending",
                            sSortDescending: ": activate to sort column descending"
                        },
                        oPaginate: {
                            sFirst: "First",
                            sLast: "Last",
                            sNext: "Next",
                            sPrevious: "Previous"
                        },
                        sEmptyTable: "No data available in table",
                        sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                        sInfoEmpty: "Showing 0 to 0 of 0 entries",
                        sInfoFiltered: "(filtered from _MAX_ total entries)",
                        sInfoPostFix: "",
                        sDecimal: "",
                        sThousands: ",",
                        sLengthMenu: "Show _MENU_ entries",
                        sLoadingRecords: "Loading...",
                        sProcessing: "Processing...",
                        sSearch: "Search:",
                        sSearchPlaceholder: "",
                        sUrl: "",
                        sZeroRecords: "No matching records found"
                    },
                    oSearch: d.extend({}, Wb.models.oSearch),
                    sAjaxDataProp: "data",
                    sAjaxSource: null,
                    sDom: "lfrtip",
                    sPaginationType: "simple_numbers",
                    sScrollX: "",
                    sScrollXInner: "",
                    sScrollY: "",
                    sServerMethod: "GET",
                    renderer: null
                }, e(Wb.defaults), Wb.defaults.column = {
                    aDataSort: null,
                    iDataSort: -1,
                    asSorting: ["asc", "desc"],
                    bSearchable: !0,
                    bSortable: !0,
                    bVisible: !0,
                    fnCreatedCell: null,
                    mData: null,
                    mRender: null,
                    sCellType: "td",
                    sClass: "",
                    sContentPadding: "",
                    sDefaultContent: null,
                    sName: "",
                    sSortDataType: "std",
                    sTitle: null,
                    sType: null,
                    sWidth: null
                }, e(Wb.defaults.column), Wb.models.oSettings = {
                    oFeatures: {
                        bAutoWidth: null,
                        bDeferRender: null,
                        bFilter: null,
                        bInfo: null,
                        bLengthChange: null,
                        bPaginate: null,
                        bProcessing: null,
                        bServerSide: null,
                        bSort: null,
                        bSortMulti: null,
                        bSortClasses: null,
                        bStateSave: null
                    },
                    oScroll: {
                        bCollapse: null,
                        iBarWidth: 0,
                        sX: null,
                        sXInner: null,
                        sY: null
                    },
                    oLanguage: {
                        fnInfoCallback: null
                    },
                    oBrowser: {
                        bScrollOversize: !1,
                        bScrollbarLeft: !1
                    },
                    ajax: null,
                    aanFeatures: [],
                    aoData: [],
                    aiDisplay: [],
                    aiDisplayMaster: [],
                    aoColumns: [],
                    aoHeader: [],
                    aoFooter: [],
                    oPreviousSearch: {},
                    aoPreSearchCols: [],
                    aaSorting: null,
                    aaSortingFixed: [],
                    asStripeClasses: null,
                    asDestroyStripes: [],
                    sDestroyWidth: 0,
                    aoRowCallback: [],
                    aoHeaderCallback: [],
                    aoFooterCallback: [],
                    aoDrawCallback: [],
                    aoRowCreatedCallback: [],
                    aoPreDrawCallback: [],
                    aoInitComplete: [],
                    aoStateSaveParams: [],
                    aoStateLoadParams: [],
                    aoStateLoaded: [],
                    sTableId: "",
                    nTable: null,
                    nTHead: null,
                    nTFoot: null,
                    nTBody: null,
                    nTableWrapper: null,
                    bDeferLoading: !1,
                    bInitialised: !1,
                    aoOpenRows: [],
                    sDom: null,
                    sPaginationType: "two_button",
                    iStateDuration: 0,
                    aoStateSave: [],
                    aoStateLoad: [],
                    oSavedState: null,
                    oLoadedState: null,
                    sAjaxSource: null,
                    sAjaxDataProp: null,
                    bAjaxDataGet: !0,
                    jqXHR: null,
                    json: c,
                    oAjaxData: c,
                    fnServerData: null,
                    aoServerParams: [],
                    sServerMethod: null,
                    fnFormatNumber: null,
                    aLengthMenu: null,
                    iDraw: 0,
                    bDrawing: !1,
                    iDrawError: -1,
                    _iDisplayLength: 10,
                    _iDisplayStart: 0,
                    _iRecordsTotal: 0,
                    _iRecordsDisplay: 0,
                    bJUI: null,
                    oClasses: {},
                    bFiltered: !1,
                    bSorted: !1,
                    bSortCellsTop: null,
                    oInit: null,
                    aoDestroyCallback: [],
                    fnRecordsTotal: function() {
                        return "ssp" == Sb(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
                    },
                    fnRecordsDisplay: function() {
                        return "ssp" == Sb(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
                    },
                    fnDisplayEnd: function() {
                        var a = this._iDisplayLength,
                            b = this._iDisplayStart,
                            c = b + a,
                            d = this.aiDisplay.length,
                            e = this.oFeatures,
                            f = e.bPaginate;
                        return e.bServerSide ? f === !1 || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c
                    },
                    oInstance: null,
                    sInstance: null,
                    iTabIndex: 0,
                    nScrollHead: null,
                    nScrollFoot: null,
                    aLastSort: [],
                    oPlugins: {}
                }, Wb.ext = Xb = {
                    classes: {},
                    errMode: "alert",
                    feature: [],
                    search: [],
                    internal: {},
                    legacy: {
                        ajax: null
                    },
                    pager: {},
                    renderer: {
                        pageButton: {},
                        header: {}
                    },
                    order: {},
                    type: {
                        detect: [],
                        search: {},
                        order: {}
                    },
                    _unique: 0,
                    fnVersionCheck: Wb.fnVersionCheck,
                    iApiIndex: 0,
                    oJUIClasses: {},
                    sVersion: Wb.version
                }, d.extend(Xb, {
                    afnFiltering: Xb.search,
                    aTypes: Xb.type.detect,
                    ofnSearch: Xb.type.search,
                    oSort: Xb.type.order,
                    afnSortData: Xb.order,
                    aoFeatures: Xb.feature,
                    oApi: Xb.internal,
                    oStdClasses: Xb.classes,
                    oPagination: Xb.pager
                }), d.extend(Wb.ext.classes, {
                    sTable: "dataTable",
                    sNoFooter: "no-footer",
                    sPageButton: "paginate_button",
                    sPageButtonActive: "current",
                    sPageButtonDisabled: "disabled",
                    sStripeOdd: "odd",
                    sStripeEven: "even",
                    sRowEmpty: "dataTables_empty",
                    sWrapper: "dataTables_wrapper",
                    sFilter: "dataTables_filter",
                    sInfo: "dataTables_info",
                    sPaging: "dataTables_paginate paging_",
                    sLength: "dataTables_length",
                    sProcessing: "dataTables_processing",
                    sSortAsc: "sorting_asc",
                    sSortDesc: "sorting_desc",
                    sSortable: "sorting",
                    sSortableAsc: "sorting_asc_disabled",
                    sSortableDesc: "sorting_desc_disabled",
                    sSortableNone: "sorting_disabled",
                    sSortColumn: "sorting_",
                    sFilterInput: "",
                    sLengthSelect: "",
                    sScrollWrapper: "dataTables_scroll",
                    sScrollHead: "dataTables_scrollHead",
                    sScrollHeadInner: "dataTables_scrollHeadInner",
                    sScrollBody: "dataTables_scrollBody",
                    sScrollFoot: "dataTables_scrollFoot",
                    sScrollFootInner: "dataTables_scrollFootInner",
                    sHeaderTH: "",
                    sFooterTH: "",
                    sSortJUIAsc: "",
                    sSortJUIDesc: "",
                    sSortJUI: "",
                    sSortJUIAscAllowed: "",
                    sSortJUIDescAllowed: "",
                    sSortJUIWrapper: "",
                    sSortIcon: "",
                    sJUIHeader: "",
                    sJUIFooter: ""
                }),
                function() {
                    var a = "";
                    a = "";
                    var b = a + "ui-state-default",
                        c = a + "css_right ui-icon ui-icon-",
                        e = a + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
                    d.extend(Wb.ext.oJUIClasses, Wb.ext.classes, {
                        sPageButton: "fg-button ui-button " + b,
                        sPageButtonActive: "ui-state-disabled",
                        sPageButtonDisabled: "ui-state-disabled",
                        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
                        sSortAsc: b + " sorting_asc",
                        sSortDesc: b + " sorting_desc",
                        sSortable: b + " sorting",
                        sSortableAsc: b + " sorting_asc_disabled",
                        sSortableDesc: b + " sorting_desc_disabled",
                        sSortableNone: b + " sorting_disabled",
                        sSortJUIAsc: c + "triangle-1-n",
                        sSortJUIDesc: c + "triangle-1-s",
                        sSortJUI: c + "carat-2-n-s",
                        sSortJUIAscAllowed: c + "carat-1-n",
                        sSortJUIDescAllowed: c + "carat-1-s",
                        sSortJUIWrapper: "DataTables_sort_wrapper",
                        sSortIcon: "DataTables_sort_icon",
                        sScrollHead: "dataTables_scrollHead " + b,
                        sScrollFoot: "dataTables_scrollFoot " + b,
                        sHeaderTH: b,
                        sFooterTH: b,
                        sJUIHeader: e + " ui-corner-tl ui-corner-tr",
                        sJUIFooter: e + " ui-corner-bl ui-corner-br"
                    })
                }();
            var Sc = Wb.ext.pager;
            d.extend(Sc, {
                simple: function() {
                    return ["previous", "next"]
                },
                full: function() {
                    return ["first", "previous", "next", "last"]
                },
                simple_numbers: function(a, b) {
                    return ["previous", Tb(a, b), "next"]
                },
                full_numbers: function(a, b) {
                    return ["first", "previous", Tb(a, b), "next", "last"]
                },
                _numbers: Tb,
                numbers_length: 7
            }), d.extend(!0, Wb.ext.renderer, {
                pageButton: {
                    _: function(a, c, e, f, g, h) {
                        var i, j, k = a.oClasses,
                            l = a.oLanguage.oPaginate,
                            m = 0,
                            n = function(b, c) {
                                var f, o, p, q, r = function(b) {
                                    mb(a, b.data.action, !0)
                                };
                                for (f = 0, o = c.length; o > f; f++)
                                    if (q = c[f], d.isArray(q)) {
                                        var s = d("<" + (q.DT_el || "div") + "/>").appendTo(b);
                                        n(s, q)
                                    } else {
                                        switch (i = "", j = "", q) {
                                            case "ellipsis":
                                                b.append("<span>&hellip;</span>");
                                                break;
                                            case "first":
                                                i = l.sFirst, j = q + (g > 0 ? "" : " " + k.sPageButtonDisabled);
                                                break;
                                            case "previous":
                                                i = l.sPrevious, j = q + (g > 0 ? "" : " " + k.sPageButtonDisabled);
                                                break;
                                            case "next":
                                                i = l.sNext, j = q + (h - 1 > g ? "" : " " + k.sPageButtonDisabled);
                                                break;
                                            case "last":
                                                i = l.sLast, j = q + (h - 1 > g ? "" : " " + k.sPageButtonDisabled);
                                                break;
                                            default:
                                                i = q + 1, j = g === q ? k.sPageButtonActive : ""
                                        }
                                        i && (p = d("<a>", {
                                            "class": k.sPageButton + " " + j,
                                            "aria-controls": a.sTableId,
                                            "data-dt-idx": m,
                                            tabindex: a.iTabIndex,
                                            id: 0 === e && "string" == typeof q ? a.sTableId + "_" + q : null
                                        }).html(i).appendTo(b), Nb(p, {
                                            action: q
                                        }, r), m++)
                                    }
                            };
                        try {
                            var o = d(b.activeElement).data("dt-idx");
                            n(d(c).empty(), f), null !== o && d(c).find("[data-dt-idx=" + o + "]").focus()
                        } catch (p) {}
                    }
                }
            });
            var Tc = function(a, b, c, d) {
                return a && "-" !== a ? (b && (a = ic(a, b)), a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, ""))), 1 * a) : -1 / 0
            };
            return d.extend(Xb.type.order, {
                "date-pre": function(a) {
                    return Date.parse(a) || 0
                },
                "html-pre": function(a) {
                    return gc(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
                },
                "string-pre": function(a) {
                    return gc(a) ? "" : "string" == typeof a ? a.toLowerCase() : a.toString ? a.toString() : ""
                },
                "string-asc": function(a, b) {
                    return b > a ? -1 : a > b ? 1 : 0
                },
                "string-desc": function(a, b) {
                    return b > a ? 1 : a > b ? -1 : 0
                }
            }), Ub(""), d.extend(Wb.ext.type.detect, [function(a, b) {
                var c = b.oLanguage.sDecimal;
                return jc(a, c) ? "num" + c : null
            }, function(a) {
                if (a && (!cc.test(a) || !dc.test(a))) return null;
                var b = Date.parse(a);
                return null !== b && !isNaN(b) || gc(a) ? "date" : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return jc(a, c, !0) ? "num-fmt" + c : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return lc(a, c) ? "html-num" + c : null
            }, function(a, b) {
                var c = b.oLanguage.sDecimal;
                return lc(a, c, !0) ? "html-num-fmt" + c : null
            }, function(a) {
                return gc(a) || "string" == typeof a && -1 !== a.indexOf("<") ? "html" : null
            }]), d.extend(Wb.ext.type.search, {
                html: function(a) {
                    return gc(a) ? a : "string" == typeof a ? a.replace(ac, " ").replace(bc, "") : ""
                },
                string: function(a) {
                    return gc(a) ? a : "string" == typeof a ? a.replace(ac, " ") : a
                }
            }), d.extend(!0, Wb.ext.renderer, {
                header: {
                    _: function(a, b, c, e) {
                        d(a.nTable).on("order.dt.DT", function(d, f, g, h) {
                            if (a === f) {
                                var i = c.idx;
                                b.removeClass(c.sSortingClass + " " + e.sSortAsc + " " + e.sSortDesc).addClass("asc" == h[i] ? e.sSortAsc : "desc" == h[i] ? e.sSortDesc : c.sSortingClass)
                            }
                        })
                    },
                    jqueryui: function(a, b, c, e) {
                        var f = c.idx;
                        d("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(d("<span/>").addClass(e.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b), d(a.nTable).on("order.dt.DT", function(d, g, h, i) {
                            a === g && (b.removeClass(e.sSortAsc + " " + e.sSortDesc).addClass("asc" == i[f] ? e.sSortAsc : "desc" == i[f] ? e.sSortDesc : c.sSortingClass), b.find("span." + e.sSortIcon).removeClass(e.sSortJUIAsc + " " + e.sSortJUIDesc + " " + e.sSortJUI + " " + e.sSortJUIAscAllowed + " " + e.sSortJUIDescAllowed).addClass("asc" == i[f] ? e.sSortJUIAsc : "desc" == i[f] ? e.sSortJUIDesc : c.sSortingClassJUI))
                        })
                    }
                }
            }), Wb.render = {
                number: function(a, b, c, d) {
                    return {
                        display: function(e) {
                            var f = 0 > e ? "-" : "";
                            e = Math.abs(parseFloat(e));
                            var g = parseInt(e, 10),
                                h = c ? b + (e - g).toFixed(c).substring(2) : "";
                            return f + (d || "") + g.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + h
                        }
                    }
                }
            }, d.extend(Wb.ext.internal, {
                _fnExternApiFunc: Vb,
                _fnBuildAjax: R,
                _fnAjaxUpdate: S,
                _fnAjaxParameters: T,
                _fnAjaxUpdateDraw: U,
                _fnAjaxDataSrc: V,
                _fnAddColumn: l,
                _fnColumnOptions: m,
                _fnAdjustColumnSizing: n,
                _fnVisibleToColumnIndex: o,
                _fnColumnIndexToVisible: p,
                _fnVisbleColumns: q,
                _fnGetColumns: r,
                _fnColumnTypes: s,
                _fnApplyColumnDefs: t,
                _fnHungarianMap: e,
                _fnCamelToHungarian: f,
                _fnLanguageCompat: g,
                _fnBrowserDetect: j,
                _fnAddData: u,
                _fnAddTr: v,
                _fnNodeToDataIndex: w,
                _fnNodeToColumnIndex: x,
                _fnGetCellData: y,
                _fnSetCellData: z,
                _fnSplitObjNotation: A,
                _fnGetObjectDataFn: B,
                _fnSetObjectDataFn: C,
                _fnGetDataMaster: D,
                _fnClearTable: E,
                _fnDeleteIndex: F,
                _fnInvalidateRow: G,
                _fnGetRowElements: H,
                _fnCreateTr: I,
                _fnBuildHead: K,
                _fnDrawHead: L,
                _fnDraw: M,
                _fnReDraw: N,
                _fnAddOptionsHtml: O,
                _fnDetectHeader: P,
                _fnGetUniqueThs: Q,
                _fnFeatureHtmlFilter: W,
                _fnFilterComplete: X,
                _fnFilterCustom: Y,
                _fnFilterColumn: Z,
                _fnFilter: $,
                _fnFilterCreateSearch: _,
                _fnEscapeRegex: ab,
                _fnFilterData: bb,
                _fnFeatureHtmlInfo: eb,
                _fnUpdateInfo: fb,
                _fnInfoMacros: gb,
                _fnInitialise: hb,
                _fnInitComplete: ib,
                _fnLengthChange: jb,
                _fnFeatureHtmlLength: kb,
                _fnFeatureHtmlPaginate: lb,
                _fnPageChange: mb,
                _fnFeatureHtmlProcessing: nb,
                _fnProcessingDisplay: ob,
                _fnFeatureHtmlTable: pb,
                _fnScrollDraw: qb,
                _fnApplyToChildren: rb,
                _fnCalculateColumnWidths: sb,
                _fnThrottle: tb,
                _fnConvertToWidth: ub,
                _fnScrollingWidthAdjust: vb,
                _fnGetWidestNode: wb,
                _fnGetMaxLenString: xb,
                _fnStringToCss: yb,
                _fnScrollBarWidth: zb,
                _fnSortFlatten: Ab,
                _fnSort: Bb,
                _fnSortAria: Cb,
                _fnSortListener: Db,
                _fnSortAttachListener: Eb,
                _fnSortingClasses: Fb,
                _fnSortData: Gb,
                _fnSaveState: Hb,
                _fnLoadState: Ib,
                _fnSettingsFromNode: Jb,
                _fnLog: Kb,
                _fnMap: Lb,
                _fnBindAction: Nb,
                _fnCallbackReg: Ob,
                _fnCallbackFire: Pb,
                _fnLengthOverflow: Qb,
                _fnRenderer: Rb,
                _fnDataSource: Sb,
                _fnRowAttributes: J,
                _fnCalculateEnd: function() {}
            }), d.fn.dataTable = Wb, d.fn.dataTableSettings = Wb.settings, d.fn.dataTableExt = Wb.ext, d.fn.DataTable = function(a) {
                return d(this).dataTable(a).api()
            }, d.each(Wb, function(a, b) {
                d.fn.DataTable[a] = b
            }), d.fn.dataTable
        })
    }(window, document);
var TableTools;
if (function(a, b, c) {
        var d = function(d) {
            "use strict";
            var e = {
                version: "1.0.4-TableTools2",
                clients: {},
                moviePath: "",
                nextId: 1,
                $: function(a) {
                    return "string" == typeof a && (a = b.getElementById(a)), a.addClass || (a.hide = function() {
                        this.style.display = "none"
                    }, a.show = function() {
                        this.style.display = ""
                    }, a.addClass = function(a) {
                        this.removeClass(a), this.className += " " + a
                    }, a.removeClass = function(a) {
                        this.className = this.className.replace(new RegExp("\\s*" + a + "\\s*"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
                    }, a.hasClass = function(a) {
                        return !!this.className.match(new RegExp("\\s*" + a + "\\s*"))
                    }), a
                },
                setMoviePath: function(a) {
                    this.moviePath = a
                },
                dispatch: function(a, b, c) {
                    var d = this.clients[a];
                    d && d.receiveEvent(b, c)
                },
                register: function(a, b) {
                    this.clients[a] = b
                },
                getDOMObjectPosition: function(a) {
                    var b = {
                        left: 0,
                        top: 0,
                        width: a.width ? a.width : a.offsetWidth,
                        height: a.height ? a.height : a.offsetHeight
                    };
                    for ("" !== a.style.width && (b.width = a.style.width.replace("px", "")), "" !== a.style.height && (b.height = a.style.height.replace("px", "")); a;) b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
                    return b
                },
                Client: function(a) {
                    this.handlers = {}, this.id = e.nextId++, this.movieId = "ZeroClipboard_TableToolsMovie_" + this.id, e.register(this.id, this), a && this.glue(a)
                }
            };
            return e.Client.prototype = {
                    id: 0,
                    ready: !1,
                    movie: null,
                    clipText: "",
                    fileName: "",
                    action: "copy",
                    handCursorEnabled: !0,
                    cssEffects: !0,
                    handlers: null,
                    sized: !1,
                    glue: function(a, c) {
                        this.domElement = e.$(a);
                        var d = 99;
                        this.domElement.style.zIndex && (d = parseInt(this.domElement.style.zIndex, 10) + 1);
                        var f = e.getDOMObjectPosition(this.domElement);
                        this.div = b.createElement("div");
                        var g = this.div.style;
                        g.position = "absolute", g.left = "0px", g.top = "0px", g.width = f.width + "px", g.height = f.height + "px", g.zIndex = d, "undefined" != typeof c && "" !== c && (this.div.title = c), 0 !== f.width && 0 !== f.height && (this.sized = !0), this.domElement && (this.domElement.appendChild(this.div), this.div.innerHTML = this.getHTML(f.width, f.height).replace(/&/g, "&amp;"))
                    },
                    positionElement: function() {
                        var a = e.getDOMObjectPosition(this.domElement),
                            b = this.div.style;
                        if (b.position = "absolute", b.width = a.width + "px", b.height = a.height + "px", 0 !== a.width && 0 !== a.height) {
                            this.sized = !0;
                            var c = this.div.childNodes[0];
                            c.width = a.width, c.height = a.height
                        }
                    },
                    getHTML: function(a, b) {
                        var c = "",
                            d = "id=" + this.id + "&width=" + a + "&height=" + b;
                        if (navigator.userAgent.match(/MSIE/)) {
                            var f = location.href.match(/^https/i) ? "https://" : "http://";
                            c += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + f + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' + a + '" height="' + b + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + e.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + d + '"/><param name="wmode" value="transparent"/></object>'
                        } else c += '<embed id="' + this.movieId + '" src="' + e.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + a + '" height="' + b + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + d + '" wmode="transparent" />';
                        return c
                    },
                    hide: function() {
                        this.div && (this.div.style.left = "-2000px")
                    },
                    show: function() {
                        this.reposition()
                    },
                    destroy: function() {
                        if (this.domElement && this.div) {
                            this.hide(), this.div.innerHTML = "";
                            var a = b.getElementsByTagName("body")[0];
                            try {
                                a.removeChild(this.div)
                            } catch (c) {}
                            this.domElement = null, this.div = null
                        }
                    },
                    reposition: function(a) {
                        if (a && (this.domElement = e.$(a), this.domElement || this.hide()), this.domElement && this.div) {
                            var b = e.getDOMObjectPosition(this.domElement),
                                c = this.div.style;
                            c.left = "" + b.left + "px", c.top = "" + b.top + "px"
                        }
                    },
                    clearText: function() {
                        this.clipText = "", this.ready && this.movie.clearText()
                    },
                    appendText: function(a) {
                        this.clipText += a, this.ready && this.movie.appendText(a)
                    },
                    setText: function(a) {
                        this.clipText = a, this.ready && this.movie.setText(a)
                    },
                    setCharSet: function(a) {
                        this.charSet = a, this.ready && this.movie.setCharSet(a)
                    },
                    setBomInc: function(a) {
                        this.incBom = a, this.ready && this.movie.setBomInc(a)
                    },
                    setFileName: function(a) {
                        this.fileName = a, this.ready && this.movie.setFileName(a)
                    },
                    setAction: function(a) {
                        this.action = a, this.ready && this.movie.setAction(a)
                    },
                    addEventListener: function(a, b) {
                        a = a.toString().toLowerCase().replace(/^on/, ""), this.handlers[a] || (this.handlers[a] = []), this.handlers[a].push(b)
                    },
                    setHandCursor: function(a) {
                        this.handCursorEnabled = a, this.ready && this.movie.setHandCursor(a)
                    },
                    setCSSEffects: function(a) {
                        this.cssEffects = !!a
                    },
                    receiveEvent: function(c, d) {
                        var e;
                        switch (c = c.toString().toLowerCase().replace(/^on/, "")) {
                            case "load":
                                if (this.movie = b.getElementById(this.movieId), !this.movie) return e = this, void setTimeout(function() {
                                    e.receiveEvent("load", null)
                                }, 1);
                                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) return e = this, setTimeout(function() {
                                    e.receiveEvent("load", null)
                                }, 100), void(this.ready = !0);
                                this.ready = !0, this.movie.clearText(), this.movie.appendText(this.clipText), this.movie.setFileName(this.fileName), this.movie.setAction(this.action), this.movie.setCharSet(this.charSet), this.movie.setBomInc(this.incBom), this.movie.setHandCursor(this.handCursorEnabled);
                                break;
                            case "mouseover":
                                this.domElement && this.cssEffects && this.recoverActive && this.domElement.addClass("active");
                                break;
                            case "mouseout":
                                this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0));
                                break;
                            case "mousedown":
                                this.domElement && this.cssEffects && this.domElement.addClass("active");
                                break;
                            case "mouseup":
                                this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
                        }
                        if (this.handlers[c])
                            for (var f = 0, g = this.handlers[c].length; g > f; f++) {
                                var h = this.handlers[c][f];
                                "function" == typeof h ? h(this, d) : "object" == typeof h && 2 == h.length ? h[0][h[1]](this, d) : "string" == typeof h && a[h](this, d)
                            }
                    }
                }, a.ZeroClipboard_TableTools = e,
                function(a, b, d) {
                    TableTools = function(b, c) {
                        !this instanceof TableTools && alert("Warning: TableTools must be initialised with the keyword 'new'");
                        var d = a.fn.dataTable.Api ? new a.fn.dataTable.Api(b).settings()[0] : b.fnSettings();
                        return this.s = {
                            that: this,
                            dt: d,
                            print: {
                                saveStart: -1,
                                saveLength: -1,
                                saveScroll: -1,
                                funcEnd: function() {}
                            },
                            buttonCounter: 0,
                            select: {
                                type: "",
                                selected: [],
                                preRowSelect: null,
                                postSelected: null,
                                postDeselected: null,
                                all: !1,
                                selectedClass: ""
                            },
                            custom: {},
                            swfPath: "",
                            buttonSet: [],
                            master: !1,
                            tags: {}
                        }, this.dom = {
                            container: null,
                            table: null,
                            print: {
                                hidden: [],
                                message: null
                            },
                            collection: {
                                collection: null,
                                background: null
                            }
                        }, this.classes = a.extend(!0, {}, TableTools.classes), this.s.dt.bJUI && a.extend(!0, this.classes, TableTools.classes_themeroller), this.fnSettings = function() {
                            return this.s
                        }, "undefined" == typeof c && (c = {}), TableTools._aInstances.push(this), this._fnConstruct(c), this
                    }, TableTools.prototype = {
                        fnGetSelected: function(a) {
                            var b, c, d = [],
                                e = this.s.dt.aoData,
                                f = this.s.dt.aiDisplay;
                            if (a)
                                for (b = 0, c = f.length; c > b; b++) e[f[b]]._DTTT_selected && d.push(e[f[b]].nTr);
                            else
                                for (b = 0, c = e.length; c > b; b++) e[b]._DTTT_selected && d.push(e[b].nTr);
                            return d
                        },
                        fnGetSelectedData: function() {
                            var a, b, c = [],
                                d = this.s.dt.aoData;
                            for (a = 0, b = d.length; b > a; a++) d[a]._DTTT_selected && c.push(this.s.dt.oInstance.fnGetData(a));
                            return c
                        },
                        fnGetSelectedIndexes: function(a) {
                            var b, c, d = [],
                                e = this.s.dt.aoData,
                                f = this.s.dt.aiDisplay;
                            if (a)
                                for (b = 0, c = f.length; c > b; b++) e[f[b]]._DTTT_selected && d.push(f[b]);
                            else
                                for (b = 0, c = e.length; c > b; b++) e[b]._DTTT_selected && d.push(b);
                            return d
                        },
                        fnIsSelected: function(a) {
                            var b = this.s.dt.oInstance.fnGetPosition(a);
                            return this.s.dt.aoData[b]._DTTT_selected === !0 ? !0 : !1
                        },
                        fnSelectAll: function(a) {
                            this._fnRowSelect(a ? this.s.dt.aiDisplay : this.s.dt.aoData)
                        },
                        fnSelectNone: function(a) {
                            this._fnRowDeselect(this.fnGetSelectedIndexes(a))
                        },
                        fnSelect: function(a) {
                            "single" == this.s.select.type ? (this.fnSelectNone(), this._fnRowSelect(a)) : this._fnRowSelect(a)
                        },
                        fnDeselect: function(a) {
                            this._fnRowDeselect(a)
                        },
                        fnGetTitle: function(a) {
                            var b = "";
                            if ("undefined" != typeof a.sTitle && "" !== a.sTitle) b = a.sTitle;
                            else {
                                var c = d.getElementsByTagName("title");
                                c.length > 0 && (b = c[0].innerHTML)
                            }
                            return "¡".toString().length < 4 ? b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "") : b.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g, "")
                        },
                        fnCalcColRatios: function(a) {
                            var b, c, d = this.s.dt.aoColumns,
                                e = this._fnColumnTargets(a.mColumns),
                                f = [],
                                g = 0,
                                h = 0;
                            for (b = 0, c = e.length; c > b; b++) e[b] && (g = d[b].nTh.offsetWidth, h += g, f.push(g));
                            for (b = 0, c = f.length; c > b; b++) f[b] = f[b] / h;
                            return f.join("	")
                        },
                        fnGetTableData: function(a) {
                            return this.s.dt ? this._fnGetDataTablesData(a) : void 0
                        },
                        fnSetText: function(a, b) {
                            this._fnFlashSetText(a, b)
                        },
                        fnResizeButtons: function() {
                            for (var a in e.clients)
                                if (a) {
                                    var b = e.clients[a];
                                    "undefined" != typeof b.domElement && b.domElement.parentNode && b.positionElement()
                                }
                        },
                        fnResizeRequired: function() {
                            for (var a in e.clients)
                                if (a) {
                                    var b = e.clients[a];
                                    if ("undefined" != typeof b.domElement && b.domElement.parentNode == this.dom.container && b.sized === !1) return !0
                                }
                            return !1
                        },
                        fnPrint: function(a, b) {
                            b === c && (b = {}), a === c || a ? this._fnPrintStart(b) : this._fnPrintEnd()
                        },
                        fnInfo: function(b, c) {
                            var d = a("<div/>").addClass(this.classes.print.info).html(b).appendTo("body");
                            setTimeout(function() {
                                d.fadeOut("normal", function() {
                                    d.remove()
                                })
                            }, c)
                        },
                        fnContainer: function() {
                            return this.dom.container
                        },
                        _fnConstruct: function(b) {
                            var c = this;
                            this._fnCustomiseSettings(b), this.dom.container = d.createElement(this.s.tags.container), this.dom.container.className = this.classes.container, "none" != this.s.select.type && this._fnRowSelectConfig(), this._fnButtonDefinations(this.s.buttonSet, this.dom.container), this.s.dt.aoDestroyCallback.push({
                                sName: "TableTools",
                                fn: function() {
                                    a(c.s.dt.nTBody).off("click.DTTT_Select", "tr"), a(c.dom.container).empty();
                                    var b = a.inArray(c, TableTools._aInstances); - 1 !== b && TableTools._aInstances.splice(b, 1)
                                }
                            })
                        },
                        _fnCustomiseSettings: function(b) {
                            "undefined" == typeof this.s.dt._TableToolsInit && (this.s.master = !0, this.s.dt._TableToolsInit = !0), this.dom.table = this.s.dt.nTable, this.s.custom = a.extend({}, TableTools.DEFAULTS, b), this.s.swfPath = this.s.custom.sSwfPath, "undefined" != typeof e && (e.moviePath = this.s.swfPath), this.s.select.type = this.s.custom.sRowSelect, this.s.select.preRowSelect = this.s.custom.fnPreRowSelect, this.s.select.postSelected = this.s.custom.fnRowSelected, this.s.select.postDeselected = this.s.custom.fnRowDeselected, this.s.custom.sSelectedClass && (this.classes.select.row = this.s.custom.sSelectedClass), this.s.tags = this.s.custom.oTags, this.s.buttonSet = this.s.custom.aButtons
                        },
                        _fnButtonDefinations: function(b, c) {
                            for (var d, e = 0, f = b.length; f > e; e++) {
                                if ("string" == typeof b[e]) {
                                    if ("undefined" == typeof TableTools.BUTTONS[b[e]]) {
                                        alert("TableTools: Warning - unknown button type: " + b[e]);
                                        continue
                                    }
                                    d = a.extend({}, TableTools.BUTTONS[b[e]], !0)
                                } else {
                                    if ("undefined" == typeof TableTools.BUTTONS[b[e].sExtends]) {
                                        alert("TableTools: Warning - unknown button type: " + b[e].sExtends);
                                        continue
                                    }
                                    var g = a.extend({}, TableTools.BUTTONS[b[e].sExtends], !0);
                                    d = a.extend(g, b[e], !0)
                                }
                                var h = this._fnCreateButton(d, a(c).hasClass(this.classes.collection.container));
                                h && c.appendChild(h)
                            }
                        },
                        _fnCreateButton: function(a, b) {
                            var c = this._fnButtonBase(a, b);
                            if (a.sAction.match(/flash/)) {
                                if (!this._fnHasFlash()) return !1;
                                this._fnFlashConfig(c, a)
                            } else "text" == a.sAction ? this._fnTextConfig(c, a) : "div" == a.sAction ? this._fnTextConfig(c, a) : "collection" == a.sAction && (this._fnTextConfig(c, a), this._fnCollectionConfig(c, a));
                            return c
                        },
                        _fnButtonBase: function(a, b) {
                            var c, e, f;
                            b ? (c = a.sTag && "default" !== a.sTag ? a.sTag : this.s.tags.collection.button, e = a.sLinerTag && "default" !== a.sLinerTag ? a.sLiner : this.s.tags.collection.liner, f = this.classes.collection.buttons.normal) : (c = a.sTag && "default" !== a.sTag ? a.sTag : this.s.tags.button, e = a.sLinerTag && "default" !== a.sLinerTag ? a.sLiner : this.s.tags.liner, f = this.classes.buttons.normal);
                            var g = d.createElement(c),
                                h = d.createElement(e),
                                i = this._fnGetMasterSettings();
                            return g.className = f + " " + a.sButtonClass, g.setAttribute("id", "ToolTables_" + this.s.dt.sInstance + "_" + i.buttonCounter), g.appendChild(h), h.innerHTML = a.sButtonText, i.buttonCounter++, g
                        },
                        _fnGetMasterSettings: function() {
                            if (this.s.master) return this.s;
                            for (var a = TableTools._aInstances, b = 0, c = a.length; c > b; b++)
                                if (this.dom.table == a[b].s.dt.nTable) return a[b].s
                        },
                        _fnCollectionConfig: function(a, b) {
                            var c = d.createElement(this.s.tags.collection.container);
                            c.style.display = "none", c.className = this.classes.collection.container, b._collection = c, d.body.appendChild(c), this._fnButtonDefinations(b.aButtons, c)
                        },
                        _fnCollectionShow: function(c, e) {
                            var f = this,
                                g = a(c).offset(),
                                h = e._collection,
                                i = g.left,
                                j = g.top + a(c).outerHeight(),
                                k = a(b).height(),
                                l = a(d).height(),
                                m = a(b).width(),
                                n = a(d).width();
                            h.style.position = "absolute", h.style.left = i + "px", h.style.top = j + "px", h.style.display = "block", a(h).css("opacity", 0);
                            var o = d.createElement("div");
                            o.style.position = "absolute", o.style.left = "0px", o.style.top = "0px", o.style.height = (k > l ? k : l) + "px", o.style.width = (m > n ? m : n) + "px", o.className = this.classes.collection.background, a(o).css("opacity", 0), d.body.appendChild(o), d.body.appendChild(h);
                            var p = a(h).outerWidth(),
                                q = a(h).outerHeight();
                            i + p > n && (h.style.left = n - p + "px"), j + q > l && (h.style.top = j - q - a(c).outerHeight() + "px"), this.dom.collection.collection = h, this.dom.collection.background = o, setTimeout(function() {
                                a(h).animate({
                                    opacity: 1
                                }, 500), a(o).animate({
                                    opacity: .25
                                }, 500)
                            }, 10), this.fnResizeButtons(), a(o).click(function() {
                                f._fnCollectionHide.call(f, null, null)
                            })
                        },
                        _fnCollectionHide: function(b, c) {
                            (null === c || "collection" != c.sExtends) && null !== this.dom.collection.collection && (a(this.dom.collection.collection).animate({
                                opacity: 0
                            }, 500, function() {
                                this.style.display = "none"
                            }), a(this.dom.collection.background).animate({
                                opacity: 0
                            }, 500, function() {
                                this.parentNode.removeChild(this)
                            }), this.dom.collection.collection = null, this.dom.collection.background = null)
                        },
                        _fnRowSelectConfig: function() {
                            if (this.s.master) {
                                {
                                    var b = this,
                                        c = this.s.dt;
                                    this.s.dt.aoOpenRows
                                }
                                a(c.nTable).addClass(this.classes.select.table), "os" === this.s.select.type && (a(c.nTBody).on("mousedown.DTTT_Select", "tr", function(b) {
                                    b.shiftKey && a(c.nTBody).css("-moz-user-select", "none").one("selectstart.DTTT_Select", "tr", function() {
                                        return !1
                                    })
                                }), a(c.nTBody).on("mouseup.DTTT_Select", "tr", function() {
                                    a(c.nTBody).css("-moz-user-select", "")
                                })), a(c.nTBody).on("click.DTTT_Select", this.s.custom.sRowSelector, function(d) {
                                    var e = "tr" === this.nodeName.toLowerCase() ? this : a(this).parents("tr")[0],
                                        f = b.s.select,
                                        g = b.s.dt.oInstance.fnGetPosition(e);
                                    if (e.parentNode == c.nTBody && null !== c.oInstance.fnGetData(e)) {
                                        if ("os" == f.type)
                                            if (d.ctrlKey || d.metaKey) b.fnIsSelected(e) ? b._fnRowDeselect(e, d) : b._fnRowSelect(e, d);
                                            else if (d.shiftKey) {
                                            var h = b.s.dt.aiDisplay.slice(),
                                                i = a.inArray(f.lastRow, h),
                                                j = a.inArray(g, h);
                                            if (0 === b.fnGetSelected().length || -1 === i) h.splice(a.inArray(g, h) + 1, h.length);
                                            else {
                                                if (i > j) {
                                                    var k = j;
                                                    j = i, i = k
                                                }
                                                h.splice(j + 1, h.length), h.splice(0, i)
                                            }
                                            b.fnIsSelected(e) ? (h.splice(a.inArray(g, h), 1), b._fnRowDeselect(h, d)) : b._fnRowSelect(h, d)
                                        } else b.fnIsSelected(e) && 1 === b.fnGetSelected().length ? b._fnRowDeselect(e, d) : (b.fnSelectNone(), b._fnRowSelect(e, d));
                                        else b.fnIsSelected(e) ? b._fnRowDeselect(e, d) : "single" == f.type ? (b.fnSelectNone(), b._fnRowSelect(e, d)) : "multi" == f.type && b._fnRowSelect(e, d);
                                        f.lastRow = g
                                    }
                                }), c.oApi._fnCallbackReg(c, "aoRowCreatedCallback", function(d, e, f) {
                                    c.aoData[f]._DTTT_selected && a(d).addClass(b.classes.select.row)
                                }, "TableTools-SelectAll")
                            }
                        },
                        _fnRowSelect: function(b, c) {
                            var d, e, f = this,
                                g = this._fnSelectData(b),
                                h = (0 === g.length ? null : g[0].nTr, []);
                            for (d = 0, e = g.length; e > d; d++) g[d].nTr && h.push(g[d].nTr);
                            if (null === this.s.select.preRowSelect || this.s.select.preRowSelect.call(this, c, h, !0)) {
                                for (d = 0, e = g.length; e > d; d++) g[d]._DTTT_selected = !0, g[d].nTr && a(g[d].nTr).addClass(f.classes.select.row);
                                null !== this.s.select.postSelected && this.s.select.postSelected.call(this, h), TableTools._fnEventDispatch(this, "select", h, !0)
                            }
                        },
                        _fnRowDeselect: function(b, c) {
                            var d, e, f = this,
                                g = this._fnSelectData(b),
                                h = (0 === g.length ? null : g[0].nTr, []);
                            for (d = 0, e = g.length; e > d; d++) g[d].nTr && h.push(g[d].nTr);
                            if (null === this.s.select.preRowSelect || this.s.select.preRowSelect.call(this, c, h, !1)) {
                                for (d = 0, e = g.length; e > d; d++) g[d]._DTTT_selected = !1, g[d].nTr && a(g[d].nTr).removeClass(f.classes.select.row);
                                null !== this.s.select.postDeselected && this.s.select.postDeselected.call(this, h), TableTools._fnEventDispatch(this, "select", h, !1)
                            }
                        },
                        _fnSelectData: function(a) {
                            var b, c, d, e = [];
                            if (a.nodeName) b = this.s.dt.oInstance.fnGetPosition(a), e.push(this.s.dt.aoData[b]);
                            else {
                                if ("undefined" != typeof a.length) {
                                    for (c = 0, d = a.length; d > c; c++) a[c].nodeName ? (b = this.s.dt.oInstance.fnGetPosition(a[c]), e.push(this.s.dt.aoData[b])) : e.push("number" == typeof a[c] ? this.s.dt.aoData[a[c]] : a[c]);
                                    return e
                                }
                                e.push(a)
                            }
                            return e
                        },
                        _fnTextConfig: function(b, c) {
                            var d = this;
                            null !== c.fnInit && c.fnInit.call(this, b, c), "" !== c.sToolTip && (b.title = c.sToolTip), a(b).hover(function() {
                                null !== c.fnMouseover && c.fnMouseover.call(this, b, c, null)
                            }, function() {
                                null !== c.fnMouseout && c.fnMouseout.call(this, b, c, null)
                            }), null !== c.fnSelect && TableTools._fnEventListen(this, "select", function(a) {
                                c.fnSelect.call(d, b, c, a)
                            }), a(b).click(function(a) {
                                null !== c.fnClick && c.fnClick.call(d, b, c, null, a), null !== c.fnComplete && c.fnComplete.call(d, b, c, null, null), d._fnCollectionHide(b, c)
                            })
                        },
                        _fnHasFlash: function() {
                            try {
                                var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                                if (a) return !0
                            } catch (b) {
                                if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] !== c && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) return !0
                            }
                            return !1
                        },
                        _fnFlashConfig: function(a, b) {
                            var c = this,
                                d = new e.Client;
                            null !== b.fnInit && b.fnInit.call(this, a, b), d.setHandCursor(!0), "flash_save" == b.sAction ? (d.setAction("save"), d.setCharSet("utf16le" == b.sCharSet ? "UTF16LE" : "UTF8"), d.setBomInc(b.bBomInc), d.setFileName(b.sFileName.replace("*", this.fnGetTitle(b)))) : "flash_pdf" == b.sAction ? (d.setAction("pdf"), d.setFileName(b.sFileName.replace("*", this.fnGetTitle(b)))) : d.setAction("copy"), d.addEventListener("mouseOver", function() {
                                null !== b.fnMouseover && b.fnMouseover.call(c, a, b, d)
                            }), d.addEventListener("mouseOut", function() {
                                null !== b.fnMouseout && b.fnMouseout.call(c, a, b, d)
                            }), d.addEventListener("mouseDown", function() {
                                null !== b.fnClick && b.fnClick.call(c, a, b, d)
                            }), d.addEventListener("complete", function(e, f) {
                                null !== b.fnComplete && b.fnComplete.call(c, a, b, d, f), c._fnCollectionHide(a, b)
                            }), this._fnFlashGlue(d, a, b.sToolTip)
                        },
                        _fnFlashGlue: function(a, b, c) {
                            var e = this,
                                f = b.getAttribute("id");
                            d.getElementById(f) ? a.glue(b, c) : setTimeout(function() {
                                e._fnFlashGlue(a, b, c)
                            }, 100)
                        },
                        _fnFlashSetText: function(a, b) {
                            var c = this._fnChunkData(b, 8192);
                            a.clearText();
                            for (var d = 0, e = c.length; e > d; d++) a.appendText(c[d])
                        },
                        _fnColumnTargets: function(a) {
                            var b, c, d = [],
                                e = this.s.dt;
                            if ("object" == typeof a) {
                                for (b = 0, c = e.aoColumns.length; c > b; b++) d.push(!1);
                                for (b = 0, c = a.length; c > b; b++) d[a[b]] = !0
                            } else if ("visible" == a)
                                for (b = 0, c = e.aoColumns.length; c > b; b++) d.push(e.aoColumns[b].bVisible ? !0 : !1);
                            else if ("hidden" == a)
                                for (b = 0, c = e.aoColumns.length; c > b; b++) d.push(e.aoColumns[b].bVisible ? !1 : !0);
                            else if ("sortable" == a)
                                for (b = 0, c = e.aoColumns.length; c > b; b++) d.push(e.aoColumns[b].bSortable ? !0 : !1);
                            else
                                for (b = 0, c = e.aoColumns.length; c > b; b++) d.push(!0);
                            return d
                        },
                        _fnNewline: function(a) {
                            return "auto" == a.sNewLine ? navigator.userAgent.match(/Windows/) ? "\r\n" : "\n" : a.sNewLine
                        },
                        _fnGetDataTablesData: function(b) {
                            var c, d, e, f, g, h, i, j = [],
                                k = "",
                                l = this.s.dt,
                                m = new RegExp(b.sFieldBoundary, "g"),
                                n = this._fnColumnTargets(b.mColumns),
                                o = "undefined" != typeof b.bSelectedOnly ? b.bSelectedOnly : !1;
                            if (b.bHeader) {
                                for (g = [], c = 0, d = l.aoColumns.length; d > c; c++) n[c] && (k = l.aoColumns[c].sTitle.replace(/\n/g, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, ""), k = this._fnHtmlDecode(k), g.push(this._fnBoundData(k, b.sFieldBoundary, m)));
                                j.push(g.join(b.sFieldSeperator))
                            }
                            var p = this.fnGetSelected();
                            o = "none" !== this.s.select.type && o && 0 !== p.length;
                            var q = a.fn.dataTable.Api,
                                r = q ? new q(l).rows(b.oSelectorOpts).indexes().flatten().toArray() : l.oInstance.$("tr", b.oSelectorOpts).map(function(b, c) {
                                    return o && -1 === a.inArray(c, p) ? null : l.oInstance.fnGetPosition(c)
                                }).get();
                            for (e = 0, f = r.length; f > e; e++) {
                                for (i = l.aoData[r[e]].nTr, g = [], c = 0, d = l.aoColumns.length; d > c; c++)
                                    if (n[c]) {
                                        var s = l.oApi._fnGetCellData(l, r[e], c, "display");
                                        b.fnCellRender ? k = b.fnCellRender(s, c, i, r[e]) + "" : "string" == typeof s ? (k = s.replace(/\n/g, " "), k = k.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi, "$1$2$3"), k = k.replace(/<.*?>/g, "")) : k = s + "", k = k.replace(/^\s+/, "").replace(/\s+$/, ""), k = this._fnHtmlDecode(k), g.push(this._fnBoundData(k, b.sFieldBoundary, m))
                                    }
                                j.push(g.join(b.sFieldSeperator)), b.bOpenRows && (h = a.grep(l.aoOpenRows, function(a) {
                                    return a.nParent === i
                                }), 1 === h.length && (k = this._fnBoundData(a("td", h[0].nTr).html(), b.sFieldBoundary, m), j.push(k)))
                            }
                            if (b.bFooter && null !== l.nTFoot) {
                                for (g = [], c = 0, d = l.aoColumns.length; d > c; c++) n[c] && null !== l.aoColumns[c].nTf && (k = l.aoColumns[c].nTf.innerHTML.replace(/\n/g, " ").replace(/<.*?>/g, ""), k = this._fnHtmlDecode(k), g.push(this._fnBoundData(k, b.sFieldBoundary, m)));
                                j.push(g.join(b.sFieldSeperator))
                            }
                            var t = j.join(this._fnNewline(b));
                            return t
                        },
                        _fnBoundData: function(a, b, c) {
                            return "" === b ? a : b + a.replace(c, b + b) + b
                        },
                        _fnChunkData: function(a, b) {
                            for (var c = [], d = a.length, e = 0; d > e; e += b) c.push(d > e + b ? a.substring(e, e + b) : a.substring(e, d));
                            return c
                        },
                        _fnHtmlDecode: function(a) {
                            if (-1 === a.indexOf("&")) return a;
                            var b = d.createElement("div");
                            return a.replace(/&([^\s]*?);/g, function(a, c) {
                                return "#" === a.substr(1, 1) ? String.fromCharCode(Number(c.substr(1))) : (b.innerHTML = a, b.childNodes[0].nodeValue)
                            })
                        },
                        _fnPrintStart: function(c) {
                            var e = this,
                                f = this.s.dt;
                            this._fnPrintHideNodes(f.nTable), this.s.print.saveStart = f._iDisplayStart, this.s.print.saveLength = f._iDisplayLength, c.bShowAll && (f._iDisplayStart = 0, f._iDisplayLength = -1, f.oApi._fnCalculateEnd && f.oApi._fnCalculateEnd(f), f.oApi._fnDraw(f)), ("" !== f.oScroll.sX || "" !== f.oScroll.sY) && (this._fnPrintScrollStart(f), a(this.s.dt.nTable).bind("draw.DTTT_Print", function() {
                                e._fnPrintScrollStart(f)
                            }));
                            var g = f.aanFeatures;
                            for (var h in g)
                                if ("i" != h && "t" != h && 1 == h.length)
                                    for (var i = 0, j = g[h].length; j > i; i++) this.dom.print.hidden.push({
                                        node: g[h][i],
                                        display: "block"
                                    }), g[h][i].style.display = "none";
                            a(d.body).addClass(this.classes.print.body), "" !== c.sInfo && this.fnInfo(c.sInfo, 3e3), c.sMessage && a("<div/>").addClass(this.classes.print.message).html(c.sMessage).prependTo("body"), this.s.print.saveScroll = a(b).scrollTop(), b.scrollTo(0, 0), a(d).bind("keydown.DTTT", function(a) {
                                27 == a.keyCode && (a.preventDefault(), e._fnPrintEnd.call(e, a))
                            })
                        },
                        _fnPrintEnd: function() {
                            {
                                var c = this.s.dt,
                                    e = this.s.print;
                                this.dom.print
                            }
                            this._fnPrintShowNodes(), ("" !== c.oScroll.sX || "" !== c.oScroll.sY) && (a(this.s.dt.nTable).unbind("draw.DTTT_Print"), this._fnPrintScrollEnd()), b.scrollTo(0, e.saveScroll), a("div." + this.classes.print.message).remove(), a(d.body).removeClass("DTTT_Print"), c._iDisplayStart = e.saveStart, c._iDisplayLength = e.saveLength, c.oApi._fnCalculateEnd && c.oApi._fnCalculateEnd(c), c.oApi._fnDraw(c), a(d).unbind("keydown.DTTT")
                        },
                        _fnPrintScrollStart: function() {
                            var b, c, d = this.s.dt,
                                e = d.nScrollHead.getElementsByTagName("div")[0],
                                f = (e.getElementsByTagName("table")[0], d.nTable.parentNode);
                            b = d.nTable.getElementsByTagName("thead"), b.length > 0 && d.nTable.removeChild(b[0]), null !== d.nTFoot && (c = d.nTable.getElementsByTagName("tfoot"), c.length > 0 && d.nTable.removeChild(c[0])), b = d.nTHead.cloneNode(!0), d.nTable.insertBefore(b, d.nTable.childNodes[0]), null !== d.nTFoot && (c = d.nTFoot.cloneNode(!0), d.nTable.insertBefore(c, d.nTable.childNodes[1])), "" !== d.oScroll.sX && (d.nTable.style.width = a(d.nTable).outerWidth() + "px", f.style.width = a(d.nTable).outerWidth() + "px", f.style.overflow = "visible"), "" !== d.oScroll.sY && (f.style.height = a(d.nTable).outerHeight() + "px", f.style.overflow = "visible")
                        },
                        _fnPrintScrollEnd: function() {
                            var a = this.s.dt,
                                b = a.nTable.parentNode;
                            "" !== a.oScroll.sX && (b.style.width = a.oApi._fnStringToCss(a.oScroll.sX), b.style.overflow = "auto"), "" !== a.oScroll.sY && (b.style.height = a.oApi._fnStringToCss(a.oScroll.sY), b.style.overflow = "auto")
                        },
                        _fnPrintShowNodes: function() {
                            for (var a = this.dom.print.hidden, b = 0, c = a.length; c > b; b++) a[b].node.style.display = a[b].display;
                            a.splice(0, a.length)
                        },
                        _fnPrintHideNodes: function(b) {
                            for (var c = this.dom.print.hidden, d = b.parentNode, e = d.childNodes, f = 0, g = e.length; g > f; f++)
                                if (e[f] != b && 1 == e[f].nodeType) {
                                    var h = a(e[f]).css("display");
                                    "none" != h && (c.push({
                                        node: e[f],
                                        display: h
                                    }), e[f].style.display = "none")
                                }
                                "BODY" != d.nodeName.toUpperCase() && this._fnPrintHideNodes(d)
                        }
                    }, TableTools._aInstances = [], TableTools._aListeners = [], TableTools.fnGetMasters = function() {
                        for (var a = [], b = 0, c = TableTools._aInstances.length; c > b; b++) TableTools._aInstances[b].s.master && a.push(TableTools._aInstances[b]);
                        return a
                    }, TableTools.fnGetInstance = function(a) {
                        "object" != typeof a && (a = d.getElementById(a));
                        for (var b = 0, c = TableTools._aInstances.length; c > b; b++)
                            if (TableTools._aInstances[b].s.master && TableTools._aInstances[b].dom.table == a) return TableTools._aInstances[b];
                        return null
                    }, TableTools._fnEventListen = function(a, b, c) {
                        TableTools._aListeners.push({
                            that: a,
                            type: b,
                            fn: c
                        })
                    }, TableTools._fnEventDispatch = function(a, b, c, d) {
                        for (var e = TableTools._aListeners, f = 0, g = e.length; g > f; f++) a.dom.table == e[f].that.dom.table && e[f].type == b && e[f].fn(c, d)
                    }, TableTools.buttonBase = {
                        sAction: "text",
                        sTag: "default",
                        sLinerTag: "default",
                        sButtonClass: "DTTT_button_text",
                        sButtonText: "Button text",
                        sTitle: "",
                        sToolTip: "",
                        sCharSet: "utf8",
                        bBomInc: !1,
                        sFileName: "*.csv",
                        sFieldBoundary: "",
                        sFieldSeperator: "	",
                        sNewLine: "auto",
                        mColumns: "all",
                        bHeader: !0,
                        bFooter: !0,
                        bOpenRows: !1,
                        bSelectedOnly: !1,
                        oSelectorOpts: c,
                        fnMouseover: null,
                        fnMouseout: null,
                        fnClick: null,
                        fnSelect: null,
                        fnComplete: null,
                        fnInit: null,
                        fnCellRender: null
                    }, TableTools.BUTTONS = {
                        csv: a.extend({}, TableTools.buttonBase, {
                            sAction: "flash_save",
                            sButtonClass: "DTTT_button_csv",
                            sButtonText: "CSV",
                            sFieldBoundary: '"',
                            sFieldSeperator: ",",
                            fnClick: function(a, b, c) {
                                this.fnSetText(c, this.fnGetTableData(b))
                            }
                        }),
                        xls: a.extend({}, TableTools.buttonBase, {
                            sAction: "flash_save",
                            sCharSet: "utf16le",
                            bBomInc: !0,
                            sButtonClass: "DTTT_button_xls",
                            sButtonText: "Excel",
                            fnClick: function(a, b, c) {
                                this.fnSetText(c, this.fnGetTableData(b))
                            }
                        }),
                        copy: a.extend({}, TableTools.buttonBase, {
                            sAction: "flash_copy",
                            sButtonClass: "DTTT_button_copy",
                            sButtonText: "Copy",
                            fnClick: function(a, b, c) {
                                this.fnSetText(c, this.fnGetTableData(b))
                            },
                            fnComplete: function(a, b, c, d) {
                                var e = d.split("\n").length;
                                b.bHeader && e--, null !== this.s.dt.nTFoot && b.bFooter && e--;
                                var f = 1 == e ? "" : "s";
                                this.fnInfo("<h6>Table copied</h6><p>Copied " + e + " row" + f + " to the clipboard.</p>", 1500)
                            }
                        }),
                        pdf: a.extend({}, TableTools.buttonBase, {
                            sAction: "flash_pdf",
                            sNewLine: "\n",
                            sFileName: "*.pdf",
                            sButtonClass: "DTTT_button_pdf",
                            sButtonText: "PDF",
                            sPdfOrientation: "portrait",
                            sPdfSize: "A4",
                            sPdfMessage: "",
                            fnClick: function(a, b, c) {
                                this.fnSetText(c, "title:" + this.fnGetTitle(b) + "\nmessage:" + b.sPdfMessage + "\ncolWidth:" + this.fnCalcColRatios(b) + "\norientation:" + b.sPdfOrientation + "\nsize:" + b.sPdfSize + "\n--/TableToolsOpts--\n" + this.fnGetTableData(b))
                            }
                        }),
                        print: a.extend({}, TableTools.buttonBase, {
                            sInfo: "<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.</p>",
                            sMessage: null,
                            bShowAll: !0,
                            sToolTip: "View print view",
                            sButtonClass: "DTTT_button_print",
                            sButtonText: "Print",
                            fnClick: function(a, b) {
                                this.fnPrint(!0, b)
                            }
                        }),
                        text: a.extend({}, TableTools.buttonBase),
                        select: a.extend({}, TableTools.buttonBase, {
                            sButtonText: "Select button",
                            fnSelect: function(b) {
                                0 !== this.fnGetSelected().length ? a(b).removeClass(this.classes.buttons.disabled) : a(b).addClass(this.classes.buttons.disabled)
                            },
                            fnInit: function(b) {
                                a(b).addClass(this.classes.buttons.disabled)
                            }
                        }),
                        select_single: a.extend({}, TableTools.buttonBase, {
                            sButtonText: "Select button",
                            fnSelect: function(b) {
                                var c = this.fnGetSelected().length;
                                1 == c ? a(b).removeClass(this.classes.buttons.disabled) : a(b).addClass(this.classes.buttons.disabled)
                            },
                            fnInit: function(b) {
                                a(b).addClass(this.classes.buttons.disabled)
                            }
                        }),
                        select_all: a.extend({}, TableTools.buttonBase, {
                            sButtonText: "Select all",
                            fnClick: function() {
                                this.fnSelectAll()
                            },
                            fnSelect: function(b) {
                                this.fnGetSelected().length == this.s.dt.fnRecordsDisplay() ? a(b).addClass(this.classes.buttons.disabled) : a(b).removeClass(this.classes.buttons.disabled)
                            }
                        }),
                        select_none: a.extend({}, TableTools.buttonBase, {
                            sButtonText: "Deselect all",
                            fnClick: function() {
                                this.fnSelectNone()
                            },
                            fnSelect: function(b) {
                                0 !== this.fnGetSelected().length ? a(b).removeClass(this.classes.buttons.disabled) : a(b).addClass(this.classes.buttons.disabled)
                            },
                            fnInit: function(b) {
                                a(b).addClass(this.classes.buttons.disabled)
                            }
                        }),
                        ajax: a.extend({}, TableTools.buttonBase, {
                            sAjaxUrl: "/xhr.php",
                            sButtonText: "Ajax button",
                            fnClick: function(b, c) {
                                var d = this.fnGetTableData(c);
                                a.ajax({
                                    url: c.sAjaxUrl,
                                    data: [{
                                        name: "tableData",
                                        value: d
                                    }],
                                    success: c.fnAjaxComplete,
                                    dataType: "json",
                                    type: "POST",
                                    cache: !1,
                                    error: function() {
                                        alert("Error detected when sending table data to server")
                                    }
                                })
                            },
                            fnAjaxComplete: function() {
                                alert("Ajax complete")
                            }
                        }),
                        div: a.extend({}, TableTools.buttonBase, {
                            sAction: "div",
                            sTag: "div",
                            sButtonClass: "DTTT_nonbutton",
                            sButtonText: "Text button"
                        }),
                        collection: a.extend({}, TableTools.buttonBase, {
                            sAction: "collection",
                            sButtonClass: "DTTT_button_collection",
                            sButtonText: "Collection",
                            fnClick: function(a, b) {
                                this._fnCollectionShow(a, b)
                            }
                        })
                    }, TableTools.buttons = TableTools.BUTTONS, TableTools.classes = {
                        container: "DTTT_container",
                        buttons: {
                            normal: "DTTT_button",
                            disabled: "DTTT_disabled"
                        },
                        collection: {
                            container: "DTTT_collection",
                            background: "DTTT_collection_background",
                            buttons: {
                                normal: "DTTT_button",
                                disabled: "DTTT_disabled"
                            }
                        },
                        select: {
                            table: "DTTT_selectable",
                            row: "DTTT_selected selected"
                        },
                        print: {
                            body: "DTTT_Print",
                            info: "DTTT_print_info",
                            message: "DTTT_PrintMessage"
                        }
                    }, TableTools.classes_themeroller = {
                        container: "DTTT_container ui-buttonset ui-buttonset-multi",
                        buttons: {
                            normal: "DTTT_button ui-button ui-state-default"
                        },
                        collection: {
                            container: "DTTT_collection ui-buttonset ui-buttonset-multi"
                        }
                    }, TableTools.DEFAULTS = {
                        sSwfPath: "../swf/copy_csv_xls_pdf.swf",
                        sRowSelect: "none",
                        sRowSelector: "tr",
                        sSelectedClass: null,
                        fnPreRowSelect: null,
                        fnRowSelected: null,
                        fnRowDeselected: null,
                        aButtons: ["copy", "csv", "xls", "pdf", "print"],
                        oTags: {
                            container: "div",
                            button: "a",
                            liner: "span",
                            collection: {
                                container: "div",
                                button: "a",
                                liner: "span"
                            }
                        }
                    }, TableTools.defaults = TableTools.DEFAULTS, TableTools.prototype.CLASS = "TableTools", TableTools.version = "2.2.2", a.fn.dataTable.Api && a.fn.dataTable.Api.register("tabletools()", function() {
                        var a = null;
                        return this.context.length > 0 && (a = TableTools.fnGetInstance(this.context[0].nTable)), a
                    }), "function" == typeof a.fn.dataTable && "function" == typeof a.fn.dataTableExt.fnVersionCheck && a.fn.dataTableExt.fnVersionCheck("1.9.0") ? a.fn.dataTableExt.aoFeatures.push({
                        fnInit: function(a) {
                            var b = a.oInit,
                                c = b ? b.tableTools || b.oTableTools || {} : {};
                            return new TableTools(a.oInstance, c).dom.container
                        },
                        cFeature: "T",
                        sFeature: "TableTools"
                    }) : alert("Warning: TableTools requires DataTables 1.9.0 or newer - www.datatables.net/download"), a.fn.DataTable.TableTools = TableTools
                }(jQuery, a, b), "function" == typeof d.fn.dataTable && "function" == typeof d.fn.dataTableExt.fnVersionCheck && d.fn.dataTableExt.fnVersionCheck("1.9.0") ? d.fn.dataTableExt.aoFeatures.push({
                    fnInit: function(a) {
                        var b = "undefined" != typeof a.oInit.oTableTools ? a.oInit.oTableTools : {},
                            c = new TableTools(a.oInstance, b);
                        return TableTools._aInstances.push(c), c.dom.container
                    },
                    cFeature: "T",
                    sFeature: "TableTools"
                }) : alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"), d.fn.dataTable.TableTools = TableTools, d.fn.DataTable.TableTools = TableTools, TableTools
        };
        "function" == typeof define && define.amd ? define(["jquery", "datatables"], d) : "object" == typeof exports ? d(require("jquery"), require("datatables")) : jQuery && !jQuery.fn.dataTable.TableTools && d(jQuery, jQuery.fn.dataTable)
    }(window, document), $.extend(!0, $.fn.dataTable.defaults, {
        sDom: "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
        sPaginationType: "bootstrap",
        oLanguage: {
            sLengthMenu: "_MENU_ records per page"
        }
    }), $.extend($.fn.dataTableExt.oStdClasses, {
        sWrapper: "dataTables_wrapper form-inline",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm"
    }), $.fn.dataTableExt.oApi.fnPagingInfo = function(a) {
        return {
            iStart: a._iDisplayStart,
            iEnd: a.fnDisplayEnd(),
            iLength: a._iDisplayLength,
            iTotal: a.fnRecordsTotal(),
            iFilteredTotal: a.fnRecordsDisplay(),
            iPage: -1 === a._iDisplayLength ? 0 : Math.ceil(a._iDisplayStart / a._iDisplayLength),
            iTotalPages: -1 === a._iDisplayLength ? 0 : Math.ceil(a.fnRecordsDisplay() / a._iDisplayLength)
        }
    }, $.extend($.fn.dataTableExt.oPagination, {
        bootstrap: {
            fnInit: function(a, b, c) {
                var d = a.oLanguage.oPaginate,
                    e = function(b) {
                        b.preventDefault(), a.oApi._fnPageChange(a, b.data.action) && c(a)
                    };
                $(b).append('<ul class="pagination"><li class="prev disabled"><a href="#">&larr; ' + d.sPrevious + '</a></li><li class="next disabled"><a href="#">' + d.sNext + " &rarr; </a></li></ul>");
                var f = $("a", b);
                $(f[0]).bind("click.DT", {
                    action: "previous"
                }, e), $(f[1]).bind("click.DT", {
                    action: "next"
                }, e)
            },
            fnUpdate: function(a, b) {
                var c, d, e, f, g, h, i = 5,
                    j = a.oInstance.fnPagingInfo(),
                    k = a.aanFeatures.p,
                    l = Math.floor(i / 2);
                for (j.iTotalPages < i ? (g = 1, h = j.iTotalPages) : j.iPage <= l ? (g = 1, h = i) : j.iPage >= j.iTotalPages - l ? (g = j.iTotalPages - i + 1, h = j.iTotalPages) : (g = j.iPage - l + 1, h = g + i - 1), c = 0, d = k.length; d > c; c++) {
                    for ($("li:gt(0)", k[c]).filter(":not(:last)").remove(), e = g; h >= e; e++) f = e == j.iPage + 1 ? 'class="active"' : "", $("<li " + f + '><a href="#">' + e + "</a></li>").insertBefore($("li:last", k[c])[0]).bind("click", function(c) {
                        c.preventDefault(), a._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * j.iLength, b(a)
                    });
                    0 === j.iPage ? $("li:first", k[c]).addClass("disabled") : $("li:first", k[c]).removeClass("disabled"), j.iPage === j.iTotalPages - 1 || 0 === j.iTotalPages ? $("li:last", k[c]).addClass("disabled") : $("li:last", k[c]).removeClass("disabled")
                }
            }
        }
    }), $.fn.DataTable.TableTools && ($.extend(!0, $.fn.DataTable.TableTools.classes, {
        container: "DTTT btn-group",
        buttons: {
            normal: "btn btn-default",
            disabled: "disabled"
        },
        collection: {
            container: "DTTT_dropdown dropdown-menu",
            buttons: {
                normal: "",
                disabled: "disabled"
            }
        },
        print: {
            info: "DTTT_print_info modal"
        },
        select: {
            row: "active"
        }
    }), $.extend(!0, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
        collection: {
            container: "ul",
            button: "li",
            liner: "a"
        }
    })), function(a, b) {
        var c = function(c, d) {
            "use strict";
            var e = function(a, b) {
                if (!d.versionCheck || !d.versionCheck("1.10.1")) throw "DataTables Responsive requires DataTables 1.10.1 or newer";
                a.responsive || (this.s = {
                    dt: new d.Api(a),
                    columns: []
                }, b && "string" == typeof b.details && (b.details = {
                    type: b.details
                }), this.c = c.extend(!0, {}, e.defaults, b), a.responsive = this, this._constructor())
            };
            e.prototype = {
                _constructor: function() {
                    var b = this,
                        d = this.s.dt;
                    d.settings()[0]._responsive = this, c(a).on("resize.dtr orientationchange.dtr", d.settings()[0].oApi._fnThrottle(function() {
                        b._resize()
                    })), d.on("destroy.dtr", function() {
                        c(a).off("resize.dtr orientationchange.dtr")
                    }), this.c.breakpoints.sort(function(a, b) {
                        return a.width < b.width ? 1 : a.width > b.width ? -1 : 0
                    }), this._classLogic(), this._resizeAuto(), this._resize();
                    var e = this.c.details;
                    e.type && (b._detailsInit(), this._detailsVis(), d.on("column-visibility.dtr", function() {
                        b._detailsVis()
                    }), c(d.table().node()).addClass("dtr-" + e.type))
                },
                _columnsVisiblity: function(a) {
                    var b, d, e = this.s.dt,
                        f = this.s.columns,
                        g = c.map(f, function(b) {
                            return b.auto && null === b.minWidth ? !1 : b.auto === !0 ? "-" : -1 !== b.includeIn.indexOf(a)
                        }),
                        h = 0;
                    for (b = 0, d = g.length; d > b; b++) g[b] === !0 && (h += f[b].minWidth);
                    var i = e.table().container().offsetWidth,
                        j = i - h;
                    for (b = 0, d = g.length; d > b; b++) f[b].control ? j -= f[b].minWidth : "-" === g[b] && (g[b] = j - f[b].minWidth < 0 ? !1 : !0, j -= f[b].minWidth);
                    var k = !1;
                    for (b = 0, d = f.length; d > b; b++)
                        if (!f[b].control && !g[b]) {
                            k = !0;
                            break
                        }
                    for (b = 0, d = f.length; d > b; b++) f[b].control && (g[b] = k);
                    return g
                },
                _classLogic: function() {
                    var a = this,
                        b = this.c.breakpoints,
                        d = this.s.dt.columns().eq(0).map(function(a) {
                            return {
                                className: this.column(a).header().className,
                                includeIn: [],
                                auto: !1,
                                control: !1
                            }
                        }),
                        e = function(a, b) {
                            var c = d[a].includeIn; - 1 === c.indexOf(b) && c.push(b)
                        },
                        f = function(c, f, g, h) {
                            var i, j, k;
                            if (g) {
                                if ("max-" === g)
                                    for (i = a._find(f).width, j = 0, k = b.length; k > j; j++) b[j].width <= i && e(c, b[j].name);
                                else if ("min-" === g)
                                    for (i = a._find(f).width, j = 0, k = b.length; k > j; j++) b[j].width >= i && e(c, b[j].name);
                                else if ("not-" === g)
                                    for (j = 0, k = b.length; k > j; j++) - 1 === b[j].name.indexOf(h) && e(c, b[j].name)
                            } else d[c].includeIn.push(f)
                        };
                    d.each(function(a, d) {
                        for (var e = a.className.split(" "), g = !1, h = 0, i = e.length; i > h; h++) {
                            var j = c.trim(e[h]);
                            if ("all" === j) return g = !0, void(a.includeIn = c.map(b, function(a) {
                                return a.name
                            }));
                            if ("none" === j) return void(g = !0);
                            if ("control" === j) return g = !0, void(a.control = !0);
                            c.each(b, function(a, b) {
                                var c = b.name.split("-"),
                                    e = new RegExp("(min\\-|max\\-|not\\-)?(" + c[0] + ")(\\-[_a-zA-Z0-9])?"),
                                    h = j.match(e);
                                h && (g = !0, h[2] === c[0] && h[3] === "-" + c[1] ? f(d, b.name, h[1], h[2] + h[3]) : h[2] !== c[0] || h[3] || f(d, b.name, h[1], h[2]))
                            })
                        }
                        g || (a.auto = !0)
                    }), this.s.columns = d
                },
                _detailsInit: function() {
                    var a = this,
                        b = this.s.dt,
                        d = this.c.details;
                    "inline" === d.type && (d.target = "td:first-child");
                    var e = d.target,
                        f = "string" == typeof e ? e : "td";
                    c(b.table().body()).on("click", f, function() {
                        if (c(b.table().node()).hasClass("collapsed")) {
                            if ("number" == typeof e) {
                                var d = 0 > e ? b.columns().eq(0).length + e : e;
                                if (b.cell(this).index().column !== d) return
                            }
                            var f = b.row(c(this).closest("tr"));
                            if (f.child.isShown()) f.child(!1), c(f.node()).removeClass("parent");
                            else {
                                var g = a.c.details.renderer(b, f[0]);
                                f.child(g, "child").show(), c(f.node()).addClass("parent")
                            }
                        }
                    })
                },
                _detailsVis: function() {
                    var a = this,
                        b = this.s.dt,
                        d = b.columns(":hidden").indexes().flatten(),
                        e = !0;
                    (0 === d.length || 1 === d.length && this.s.columns[d[0]].control) && (e = !1), e ? (c(b.table().node()).addClass("collapsed"), b.rows().eq(0).each(function(c) {
                        var d = b.row(c);
                        if (d.child()) {
                            var e = a.c.details.renderer(b, d[0]);
                            e === !1 ? d.child.hide() : d.child(e, "child").show()
                        }
                    })) : (c(b.table().node()).removeClass("collapsed"), b.rows().eq(0).each(function(a) {
                        b.row(a).child.hide()
                    }))
                },
                _find: function(a) {
                    for (var b = this.c.breakpoints, c = 0, d = b.length; d > c; c++)
                        if (b[c].name === a) return b[c]
                },
                _resize: function() {
                    for (var b = this.s.dt, d = c(a).width(), e = this.c.breakpoints, f = e[0].name, g = e.length - 1; g >= 0; g--)
                        if (d <= e[g].width) {
                            f = e[g].name;
                            break
                        }
                    var h = this._columnsVisiblity(f);
                    b.columns().eq(0).each(function(a, c) {
                        b.column(a).visible(h[c])
                    })
                },
                _resizeAuto: function() {
                    var a = this.s.dt,
                        b = this.s.columns;
                    if (this.c.auto && -1 !== c.inArray(!0, c.map(b, function(a) {
                            return a.auto
                        }))) {
                        var d = (a.table().node().offsetWidth, a.columns, a.table().node().cloneNode(!1)),
                            e = c(a.table().header().cloneNode(!1)).appendTo(d),
                            f = c(a.table().body().cloneNode(!1)).appendTo(d);
                        a.rows({
                            page: "current"
                        }).indexes().each(function(b) {
                            var d = a.row(b).node().cloneNode(!0);
                            a.columns(":hidden").flatten().length && c(d).append(a.cells(b, ":hidden").nodes().to$().clone()), c(d).appendTo(f)
                        });
                        var g = a.columns().header().to$().clone(!1).wrapAll("tr").appendTo(e),
                            h = c("<div/>").css({
                                width: 1,
                                height: 1,
                                overflow: "hidden"
                            }).append(d).insertBefore(a.table().node());
                        a.columns().eq(0).each(function(a) {
                            b[a].minWidth = g[a].offsetWidth || 0
                        }), h.remove()
                    }
                }
            }, e.breakpoints = [{
                name: "desktop",
                width: 1 / 0
            }, {
                name: "tablet-l",
                width: 1024
            }, {
                name: "tablet-p",
                width: 768
            }, {
                name: "mobile-l",
                width: 480
            }, {
                name: "mobile-p",
                width: 320
            }], e.defaults = {
                breakpoints: e.breakpoints,
                auto: !0,
                details: {
                    renderer: function(a, b) {
                        var d = a.cells(b, ":hidden").eq(0).map(function(b) {
                            var d = c(a.column(b.column).header());
                            return d.hasClass("control") ? "" : '<li><span class="dtr-title">' + d.text() + ':</span> <span class="dtr-data">' + a.cell(b).data() + "</span></li>"
                        }).toArray().join("");
                        return d ? c("<ul/>").append(d) : !1
                    },
                    target: 0,
                    type: "inline"
                }
            };
            var f = c.fn.dataTable.Api;
            return f.register("responsive()", function() {
                return this
            }), f.register("responsive.recalc()", function() {
                this.iterator("table", function(a) {
                    a._responsive && (a._responsive._resizeAuto(), a._responsive._resize())
                })
            }), e.version = "1.0.1", c.fn.dataTable.Responsive = e, c.fn.DataTable.Responsive = e, c(b).on("init.dt.dtr", function(a, b) {
                if (c(b.nTable).hasClass("responsive") || c(b.nTable).hasClass("dt-responsive") || b.oInit.responsive) {
                    var d = b.oInit.responsive;
                    d !== !1 && new e(b, c.isPlainObject(d) ? d : {})
                }
            }), e
        };
        "function" == typeof define && define.amd ? define(["jquery", "datatables"], c) : "object" == typeof exports ? c(require("jquery"), require("datatables")) : jQuery && !jQuery.fn.dataTable.Responsive && c(jQuery, jQuery.fn.dataTable)
    }(window, document), function(a) {
        a.supr = function(b, d) {
            var e = {
                    customScroll: {
                        color: "#fff",
                        rscolor: "#fff",
                        size: "3px",
                        opacity: "1",
                        alwaysVisible: !1
                    },
                    header: {
                        fixed: !0,
                        shrink: !0
                    },
                    breadcrumbs: {
                        auto: !0,
                        homeicon: "s16 icomoon-icon-screen-2",
                        dividerIcon: "s16 icomoon-icon-arrow-right-3"
                    },
                    sidebar: {
                        fixed: !0,
                        rememberToggle: !0,
                        offCanvas: !0
                    },
                    rightSidebar: {
                        fixed: !0,
                        rememberToggle: !0
                    },
                    sideNav: {
                        toggleMode: !0,
                        showArrows: !0,
                        sideNavArrowIcon: "icomoon-icon-arrow-down-2 s16",
                        subOpenSpeed: 300,
                        subCloseSpeed: 400,
                        animationEasing: "linear",
                        absoluteUrl: !1,
                        subDir: ""
                    },
                    panels: {
                        refreshIcon: "im-spinner6",
                        toggleIcon: "im-minus",
                        collapseIcon: "im-plus",
                        closeIcon: "im-close",
                        showControlsOnHover: !0,
                        loadingEffect: "facebook",
                        loaderColor: "#bac3d2",
                        rememberSortablePosition: !0
                    },
                    accordion: {
                        toggleIcon: "l-arrows-minus s16",
                        collapseIcon: "l-arrows-plus s16"
                    },
                    tables: {
                        responsive: !0,
                        customscroll: !0
                    },
                    alerts: {
                        animation: !0,
                        closeEffect: "bounceOutDown"
                    },
                    dropdownMenu: {
                        animation: !0,
                        openEffect: "fadeIn"
                    },
                    backToTop: !0
                },
                f = this;
            f.settings = {};
            var b = (a(b), b);
            f.init = function() {
                if (f.settings = a.extend({}, e, d), this.browserSelector(), this.storejs(), this.firstImpression(), this.mouseWheel(), this.retinaReady(), this.toggleSidebar(), this.sideBarNav(), this.setCurrentNav(), this.waitMe(), this.panels(), this.checkBoxesAndRadios(), this.accordions(), this.quickSearch(), this.equalHeight(), this.respondjs(), f.settings.backToTop && this.backToTop(), f.settings.breadcrumbs.auto && this.breadCrumbs(), a(".modal").on("show.bs.modal", function() {
                        f.centerModal()
                    }), f.settings.dropdownMenu.animation && this.dropdownMenuAnimations(), this.dropdownMenuFix(), this.animatedProgressBars(), f.settings.tables.responsive && this.responsiveTables(), this.emailApp(), this.toDoWidget(), f.settings.header.fixed && 1 == store.get("fixed-header") && this.fixedHeader(!0), f.settings.header.shrink && this.shrinkHeader(), f.settings.sidebar.fixed && 1 == store.get("fixed-left-sidebar") && this.fixedSidebar("left"), f.settings.rightSidebar.fixed && 1 == store.get("fixed-right-sidebar") && this.fixedSidebar("right"), f.settings.sidebar.rememberToggle) {
                    var b = f.getBreakPoint();
                    (1 == store.get("sidebarToggle") && "large" == b || 1 == store.get("sidebarToggle") && "laptop" == b) && (f.toggleLeftSidebar(), f.sideBarNavToggle(), f.collapseSideBarNav(!1), f.removeFixedSidebar("left"))
                }
                if (f.settings.rightSidebar.rememberToggle) {
                    var b = f.getBreakPoint();
                    (1 == store.get("rightSidebarToggle") && "large" == b || 1 == store.get("rightSidebarToggle") && "laptop" == b) && (f.toggleRightSidebarBtn("hide"), f.hideRightSidebar()), (1 == store.get("rightSidebarToggle") && "tablet" == b || 1 == store.get("rightSidebarToggle") && "phone" == b) && f.toggleRightSidebarBtn("hide")
                }
                a(window).load(function() {
                    0 == store.get("fixed-header") && 1 == store.get("fixed-right-sidebar") && f.rightSidebarTopPosition(), f.stickyFooter()
                }), a(window).resize(function() {
                    f.centerModal(), f.stickyFooter()
                }), a(window).scroll(function() {
                    0 == store.get("fixed-header") && 1 == store.get("fixed-right-sidebar") && f.rightSidebarTopPosition(), f.stickyFooter()
                })
            }, f.stickyFooter = function() {
                $footer = a("#footer");
                var b = a(".page-content");
                $footer.css(b.height() < a(window).height() ? {
                    position: "absolute"
                } : {
                    position: "static"
                })
            }, f.getBreakPoint = function() {
                var a = jRespond([{
                    label: "phone",
                    enter: 0,
                    exit: 767
                }, {
                    label: "tablet",
                    enter: 768,
                    exit: 979
                }, {
                    label: "laptop",
                    enter: 980,
                    exit: 1366
                }, {
                    label: "large",
                    enter: 1367,
                    exit: 1e4
                }]);
                return a.getBreakpoint()
            }, f.fixedHeader = function(b) {
                var c = a("#header");
                return 1 == b ? (c.addClass("header-fixed"), store.set("fixed-header", 1), a("body").addClass("fixed-header"), !0) : (c.removeClass("header-fixed"), store.set("fixed-header", 0), a("body").removeClass("fixed-header"), !1)
            }, f.fixedSidebar = function(b) {
                var c = a(".page-sidebar"),
                    d = a("#right-sidebar"),
                    e = f.getBreakPoint();
                return "left" !== b || "large" != e && "laptop" != e && c.hasClass("collapse-sidebar") ? "right" !== b || "large" != e && "laptop" != e ? void 0 : (d.addClass("sidebar-fixed"), f.addScrollTo(d.find(".sidebar-scrollarea"), "right", f.settings.customScroll.rscolor), store.set("fixed-right-sidebar", 1), a("body").addClass("fixed-right-sidebar"), !0) : (c.addClass("sidebar-fixed"), f.addScrollTo(c.find(".sidebar-scrollarea"), "right", f.settings.customScroll.color), store.set("fixed-left-sidebar", 1), a("body").addClass("fixed-left-sidebar"), !0)
            }, f.rightSidebarTopPosition = function() {
                var b = a(document).scrollTop();
                b > 49 ? a("#right-sidebar").addClass("rstop") : a("#right-sidebar").removeClass("rstop")
            }, f.addScrollTo = function(a, b, c) {
                a.slimScroll({
                    position: b,
                    height: "100%",
                    distance: "0px",
                    railVisible: !1,
                    size: f.settings.customScroll.size,
                    color: c,
                    railOpacity: f.settings.customScroll.opacity,
                    railColor: f.settings.customScroll.railColor
                })
            }, f.removeScrollTo = function(a) {
                a.parent().hasClass("slimScrollDiv") && (a.parent().replaceWith(a), a.attr("style", ""))
            }, f.removeFixedSidebar = function(b) {
                if ("left" === b) {
                    var c = a("#sidebar .sidebar-scrollarea");
                    a("#sidebar").removeClass("sidebar-fixed"), f.removeScrollTo(c), store.set("fixed-left-sidebar", 0), a("body").removeClass("fixed-left-sidebar")
                }
                if ("right" === b) {
                    var c = a("#right-sidebar .sidebar-scrollarea");
                    a("#right-sidebar").removeClass("sidebar-fixed"), f.removeScrollTo(c), store.set("fixed-right-sidebar", 0), a("body").removeClass("fixed-right-sidebar")
                }
            }, f.toggleRightSidebarBtn = function(b) {
                var c = a("#toggle-right-sidebar");
                "hide" === b && (c.addClass("hide-right-sidebar"), store.set("rightSidebarToggle", 1), c.find("i").removeClass("s16 icomoon-icon-indent-increase").addClass("s16 icomoon-icon-indent-decrease")), "show" === b && (c.removeClass("hide-right-sidebar"), store.set("rightSidebarToggle", 0), c.find("i").removeClass("s16 icomoon-icon-indent-decrease").addClass("s16 icomoon-icon-indent-increase"))
            }, f.toggleSidebar = function() {
                var b = a(".collapseBtn"),
                    c = a("#toggle-right-sidebar"),
                    d = f.getBreakPoint(),
                    e = (a("#sidebar .sidebar-scrollarea"), a(".page-content"), a(".page-sidebar"));
                c.on("click", function(b) {
                    b.preventDefault(), a(this).hasClass("hide-right-sidebar") ? (f.toggleRightSidebarBtn("show"), f.showRightSidebar()) : (f.hideRightSidebar(), f.toggleRightSidebarBtn("hide"))
                }), b.on("click", function(a) {
                    a.preventDefault(), e.hasClass("hide-sidebar") ? f.showLeftSidebar() : e.hasClass("collapse-sidebar") ? (f.unToggleLeftSidebar(), f.collapseSideBarNav(!0)) : "phone" == d ? f.hideLeftSidebar() : (f.toggleLeftSidebar(), f.collapseSideBarNav(!1), f.stickyFooter()), e.hasClass("collapse-sidebar") ? (store.set("sidebarToggle", 1), f.sideBarNavToggle()) : store.set("sidebarToggle", 0)
                })
            }, f.hideRightSidebar = function() {
                var b = f.getBreakPoint();
                a("#right-sidebar").addClass("hide-sidebar"), a("#right-sidebarbg").addClass("hide-sidebar"), a(".page-content, #footer").removeClass("right-sidebar-page"), ("laptop" == b || "tablet" == b || "phone" == b) && a(".page-content").removeClass("rOverLap"), a("#back-to-top").removeClass("rightsidebar")
            }, f.showRightSidebar = function() {
                var b = f.getBreakPoint();
                a("#right-sidebar").removeClass("hide-sidebar"), a("#right-sidebarbg").removeClass("hide-sidebar"), ("laptop" == b || "tablet" == b || "phone" == b) && a(".page-content").addClass("rOverLap"), a(".page-content, #footer").addClass("right-sidebar-page"), a("#back-to-top").addClass("rightsidebar")
            }, f.hideLeftSidebar = function() {
                var b = f.getBreakPoint();
                a(".page-sidebar").addClass("hide-sidebar"), a("#sidebarbg").addClass("hide-sidebar"), a(".page-content, #footer").addClass("full-page"), a(".page-content, #footer").removeClass("sidebar-page"), "phone" != b || f.settings.sidebar.offCanvas || a(".page-content").addClass("overLap"), ("phone" == b && f.settings.sidebar.offCanvas || "tablet" == b && f.settings.sidebar.offCanvas) && a(".page-content, #footer").removeClass("offCanvas")
            }, f.toggleLeftSidebar = function() {
                var b = f.getBreakPoint(),
                    c = a("#sidebar .sidebar-scrollarea");
                f.settings.sidebar.fixed && f.removeScrollTo(c), a(".page-sidebar, #sidebarbg").addClass("collapse-sidebar"), a(".page-content, #footer").addClass("collapsed-sidebar"), a(".page-content, #footer").removeClass("sidebar-page"), "tablet" != b || f.settings.sidebar.offCanvas || a(".page-content, #footer").removeClass("overLap")
            }, f.unToggleLeftSidebar = function() {
                var b = f.getBreakPoint(),
                    c = a("#sidebar .sidebar-scrollarea");
                f.settings.sidebar.fixed && f.addScrollTo(c, "right", f.settings.customScroll.color), a(".page-sidebar, #sidebarbg").removeClass("collapse-sidebar"), a(".page-content, #footer").removeClass("collapsed-sidebar"), a(".page-content, #footer").addClass("sidebar-page"), "tablet" != b || f.settings.sidebar.offCanvas || a(".page-content, #footer").addClass("overLap")
            }, f.showLeftSidebar = function() {
                var b = f.getBreakPoint(),
                    c = a("#sidebar .sidebar-scrollarea");
                f.settings.sidebar.fixed && f.addScrollTo(c), a(".page-sidebar").removeClass("hide-sidebar"), a("#sidebarbg").removeClass("hide-sidebar"), a("#sidebarbg").removeClass("collapse-sidebar"), a(".page-sidebar").removeClass("collapse-sidebar"), a(".page-content, #footer").removeClass("full-page"), ("large" == b || "laptop" == b && !f.settings.sidebar.offCanvas) && a(".page-content, #footer").removeClass("overLap"), "phone" != b || f.settings.sidebar.offCanvas || a(".page-content, #footer").addClass("overLap"), ("phone" == b && f.settings.sidebar.offCanvas || "tablet" == b && f.settings.sidebar.offCanvas) && a(".page-content, #footer").addClass("offCanvas"), a(".page-content, #footer").removeClass("collapsed-sidebar"), a(".page-content, #footer").addClass("sidebar-page")
            }, f.sideBarNav = function() {
                var b = (a(".page-sidebar .sidebar-scrollarea"), a(".mainnav> ul")),
                    c = (b.find("li.current"), b.find("li")),
                    d = b.find("a"),
                    e = b.find("li>ul.sub");
                e.closest("li").addClass("hasSub"), e.prev("a").hasClass("notExpand") || e.prev("a").addClass("notExpand"), f.settings.sideNav.showArrows && (a(".mainnav").hasClass("show-arrows") || a(".mainnav").addClass("show-arrows"), e.prev("a").find("i.hasDrop").length || e.prev("a").prepend('<i class="' + f.settings.sideNav.sideNavArrowIcon + ' hasDrop"></i>')), d.on("click", function(d) {
                    var e = a(this);
                    e.hasClass("notExpand") ? (d.preventDefault(), a(".page-sidebar").hasClass("collapse-sidebar") || (a(this).closest("li").closest("ul").hasClass("show") ? (e.next("ul").slideDown(f.settings.sideNav.subOpenSpeed, f.settings.sideNav.animationEasing), e.next("ul").addClass("show"), e.addClass("expand").removeClass("notExpand"), c.removeClass("highlight-menu"), e.closest("li.hasSub").addClass("highlight-menu")) : (navexpand = b.find("li.hasSub .expand"), navexpand.next("ul").removeClass("show"), navexpand.next("ul").slideUp(f.settings.sideNav.subCloseSpeed, f.settings.sideNav.animationEasing), navexpand.addClass("notExpand").removeClass("expand"), navexpand.find(".sideNav-arrow").removeClass("rotateM180").addClass("rotate0"), e.next("ul").slideDown(f.settings.sideNav.subOpenSpeed, f.settings.sideNav.animationEasing), e.next("ul").addClass("show"), e.addClass("expand").removeClass("notExpand"), c.removeClass("highlight-menu"), e.closest("li.hasSub").addClass("highlight-menu")))) : e.hasClass("expand") && (d.preventDefault(), e.next("ul").removeClass("show"), e.next("ul").slideUp(f.settings.sideNav.subCloseSpeed, f.settings.sideNav.animationEasing), e.addClass("notExpand").removeClass("expand"), c.removeClass("highlight-menu"))
                })
            }, f.sideBarNavToggle = function() {
                var b = a(".mainnav"),
                    c = b.find("li");
                Modernizr.touch ? c.click(function() {
                    _this = a(this), _this.hasClass("hover-li") ? _this.removeClass("hover-li") : (c.each(function() {
                        a(this).removeClass("hover-li")
                    }), _this.addClass("hover-li"))
                }) : c.hover(function() {
                    a(this).addClass("hover-li")
                }, function() {
                    a(this).removeClass("hover-li")
                })
            }, f.setCurrentNav = function() {
                var b = document.domain,
                    c = a(".mainnav> ul"),
                    d = c.find("a");
                if ("" === b) {
                    var e = window.location.pathname.split("/"),
                        g = e.pop();
                    this.setCurrentClass(d, g)
                } else if (f.settings.sideNav.absoluteUrl) {
                    var h = "http://" + b + window.location.pathname;
                    setCurrentClass(d, h)
                } else {
                    var i = window.location.pathname.split("/"),
                        i = i.pop();
                    if ("" != f.settings.sideNav.subDir) var i = window.location.pathname + f.settings.sideNav.subDir;
                    this.setCurrentClass(d, i)
                }
            }, f.setCurrentClass = function(b, c) {
                b.each(function() {
                    var b = a(this).attr("href");
                    if (b === c) {
                        if (a(this).addClass("active"), f.settings.header.fixed && 1 == store.get("fixed-header") && a(this).append("<span class='indicator'></span>"), ulElem = a(this).closest("ul"), ulElem.hasClass("sub")) {
                            ulElem.addClass("show").css("display", "block");
                            var d = a(this).closest("li.hasSub").children("a.notExpand");
                            d.removeClass("notExpand").addClass("expand active-state"), d.closest("li.hasSub").addClass("highlight-menu")
                        }
                    } else "" == c && (c = "index.html"), b === c && (a(this).addClass("active"), f.settings.header.fixed && 1 == store.get("fixed-header") && a(this).append("<span class='indicator'></span>"))
                })
            }, f.panels = function() {
                var b = a(".panel");
                b.each(function(b) {
                    self = a(this), panelHeading = self.find(".panel-heading"), panelsid = "supr" + b, self.attr("id", panelsid), (self.hasClass("toggle") || self.hasClass("panelClose") || self.hasClass("panelRefresh")) && (panelHeading.find(".panel-controls-right").length ? panelControlsRight = panelHeading.find(".panel-controls-right") : (panelHeading.append('<div class="panel-controls panel-controls-right">'), panelControlsRight = panelHeading.find(".panel-controls-right"))), self.hasClass("panelRefresh") && !panelControlsRight.find("a.panel-refresh").length && panelControlsRight.append('<a href="#" class="panel-refresh"><i class="' + f.settings.panels.refreshIcon + '"></i></a>'), self.hasClass("toggle") && !panelControlsRight.find("a.toggle").length && (self.hasClass("panel-closed") ? (panelControlsRight.append('<a href="#" class="toggle panel-maximize"><i class="' + f.settings.panels.collapseIcon + '"></i></a>'), self.find(".panel-body").slideToggle(0), self.find(".panel-footer").slideToggle(0), self.find(".panel-heading").toggleClass("min")) : panelControlsRight.append('<a href="#" class="toggle panel-minimize"><i class="' + f.settings.panels.toggleIcon + '"></i></a>')), self.hasClass("panelClose") && !panelControlsRight.find("a.panel-close").length && panelControlsRight.append('<a href="#" class="panel-close"><i class="' + f.settings.panels.closeIcon + '"></i></a>'), self.hasClass("showControls") ? (self.find(".panel-controls-left").addClass("panel-controls-show"), self.find(".panel-controls-right").addClass("panel-controls-show")) : f.settings.panels.showControlsOnHover && (self.find(".panel-controls-left").addClass("panel-controls-hide"), self.find(".panel-controls-right").addClass("panel-controls-hide"));
                    var c = a(this).find(".scroll"),
                        d = c.data("height");
                    c.slimScroll({
                        position: "right",
                        height: "100%",
                        distance: "0",
                        railVisible: !1,
                        size: f.settings.customScroll.size,
                        color: "#777",
                        railOpacity: f.settings.customScroll.opacity,
                        railColor: "#fff",
                        height: d
                    });
                    var e = a(this).find(".scroll-horizontal");
                    e.slimScrollHorizontal({
                        size: f.settings.customScroll.size,
                        color: "#777",
                        railOpacity: f.settings.customScroll.opacity,
                        railColor: "#fff",
                        width: "100%",
                        positon: "bottom",
                        start: "left",
                        railVisible: !0
                    })
                }), panelControls = b.find(".panel-controls"), panelControlsLink = panelControls.find("a"), f.settings.panels.showControlsOnHover && b.hover(function() {
                    a(this).find(".panel-controls").hasClass("panel-controls-hide") && a(this).find(".panel-controls").fadeIn(300)
                }, function() {
                    a(this).find(".panel-controls").hasClass("panel-controls-hide") && a(this).find(".panel-controls").fadeOut(300)
                }), panelControlsLink.click(function(b) {
                    b.preventDefault(), self = a(this), thisIcon = self.find("i"), thisPanel = self.closest(".panel"), thisPanelBody = thisPanel.find(".panel-body"), thisPanelFooter = thisPanel.find(".panel-footer"), thisPanelHeading = thisPanel.find(".panel-heading"), self.hasClass("panel-close") && setTimeout(function() {
                        thisPanel.remove()
                    }, 500), self.hasClass("toggle") && (self.toggleClass("panel-minimize panel-maximize"), thisIcon.toggleClass(f.settings.panels.toggleIcon + " " + f.settings.panels.collapseIcon), thisPanelBody.slideToggle(200), thisPanelFooter.slideToggle(200), thisPanelHeading.toggleClass("min")), self.hasClass("panel-refresh") && (self.closest(".panel").waitMe({
                        effect: f.settings.panels.loadingEffect,
                        text: "",
                        bg: "rgba(255,255,255,0.7)",
                        color: f.settings.panels.loaderColor
                    }), setTimeout(function() {
                        self.closest(".panel").waitMe("hide")
                    }, 3e3))
                });
                var c = "panels_position_" + h;
                if (!a(".contentwrapper").hasClass("notSortable")) {
                    var d = a(".contentwrapper").find(".sortable-layout"),
                        e = d.find(".panelMove"),
                        g = e.find(".panel-heading"),
                        h = window.location.href,
                        i = localStorage.getItem(c);
                    if (f.settings.panels.rememberSortablePosition && i) {
                        var j = JSON.parse(i);
                        for (var k in j.grid) {
                            var l = d.eq(k);
                            for (var m in j.grid[k].section) l.append(a("#" + j.grid[k].section[m].id))
                        }
                    }
                    d.sortable({
                        items: e,
                        handle: g,
                        placeholder: "panel-placeholder",
                        forcePlaceholderSize: !0,
                        helper: "original",
                        forceHelperSize: !0,
                        cursor: "move",
                        delay: 200,
                        opacity: .8,
                        zIndex: 1e4,
                        tolerance: "pointer",
                        iframeFix: !1,
                        revert: !0,
                        update: function(a, b) {
                            f.settings.panels.rememberSortablePosition && panelSavePosition(b.item)
                        }
                    }).sortable("option", "connectWith", d), a(".reset-layout").click(function() {
                        bootbox.confirm({
                            message: "Warning!!! This action will reset panels position",
                            title: "Are you sure ?",
                            className: "modal-style2",
                            callback: function(a) {
                                a && (localStorage.removeItem(c), location.reload())
                            }
                        }), f.centerModal()
                    }), panelSavePosition = function() {
                        var b = [];
                        d.each(function() {
                            var c = [];
                            a(this).children(".panelMove").each(function() {
                                var b = {};
                                b.id = a(this).attr("id"), c.push(b)
                            });
                            var d = {
                                section: c
                            };
                            b.push(d)
                        });
                        var e = JSON.stringify({
                            grid: b
                        });
                        i != e && localStorage.setItem(c, e, null)
                    }
                }
            }, f.waitMe = function() {
                ! function(a) {
                    a.fn.waitMe = function(b) {
                        return this.each(function() {
                            function c() {
                                k.removeClass(l + "_container"), k.find("." + l).remove()
                            }
                            var d, e, f, g, h, i, j, k = a(this),
                                l = "waitMe",
                                m = !1,
                                n = "background-color",
                                o = "",
                                p = "",
                                q = {
                                    init: function() {
                                        function c() {
                                            g = a('<div class="' + l + '"></div>');
                                            var b = "width:" + j.sizeW + ";height:" + j.sizeH;
                                            switch (j.effect) {
                                                case "none":
                                                    f = 0;
                                                    break;
                                                case "bounce":
                                                    f = 3, h = "", i = b;
                                                    break;
                                                case "rotateplane":
                                                    f = 1, h = "", i = b;
                                                    break;
                                                case "stretch":
                                                    f = 5, h = "", i = b;
                                                    break;
                                                case "orbit":
                                                    f = 2, h = b, i = "";
                                                    break;
                                                case "roundBounce":
                                                    f = 12, h = b, i = "";
                                                    break;
                                                case "win8":
                                                    f = 5, m = !0, h = b, i = b;
                                                    break;
                                                case "win8_linear":
                                                    f = 5, m = !0, h = b, i = "";
                                                    break;
                                                case "ios":
                                                    f = 12, h = b, i = "";
                                                    break;
                                                case "facebook":
                                                    f = 3, h = "", i = b;
                                                    break;
                                                case "rotation":
                                                    f = 1, n = "border-color", h = "", i = b;
                                                    break;
                                                case "timer":
                                                    f = 2, o = "border-color:" + j.color, h = b, i = "";
                                                    break;
                                                case "pulse":
                                                    f = 1, n = "border-color", h = "", i = b;
                                                    break;
                                                case "progressBar":
                                                    f = 1, h = "", i = b;
                                                    break;
                                                case "bouncePulse":
                                                    f = 3, h = "", i = b
                                            }
                                            if ("" == j.sizeW && "" == j.sizeH && (i = "", h = ""), "" != h && "" != o && (o = ";" + o), f > 0) {
                                                e = a('<div class="' + l + "_progress " + j.effect + '"></div>');
                                                for (var c = 1; f >= c; ++c) p += m ? '<div class="' + l + "_progress_elem" + c + '" style="' + i + '"><div style="' + n + ":" + j.color + '"></div></div>' : '<div class="' + l + "_progress_elem" + c + '" style="' + n + ":" + j.color + ";" + i + '"></div>';
                                                e = a('<div class="' + l + "_progress " + j.effect + '" style="' + h + o + '">' + p + "</div>")
                                            }
                                            j.text && (d = a('<div class="' + l + '_text" style="color:' + j.color + '">' + j.text + "</div>")), k.find("> ." + l) && k.find("> ." + l).remove(), waitMeDivObj = a('<div class="' + l + '_content"></div>'), waitMeDivObj.append(e, d), g.append(waitMeDivObj), "HTML" == k[0].tagName && (k = a("body")), k.addClass(l + "_container").append(g), k.find("> ." + l).css({
                                                background: j.bg
                                            }), k.find("." + l + "_content").css({
                                                marginTop: -k.find("." + l + "_content").outerHeight() / 2 + "px"
                                            })
                                        }
                                        var q = {
                                            effect: "bounce",
                                            text: "",
                                            bg: "rgba(255,255,255,0.7)",
                                            color: "#000",
                                            sizeW: "",
                                            sizeH: ""
                                        };
                                        j = a.extend(q, b), c()
                                    },
                                    hide: function() {
                                        c()
                                    }
                                };
                            return q[b] ? q[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void(a.event.special.destroyed = {
                                remove: function(a) {
                                    a.handler && a.handler()
                                }
                            }) : q.init.apply(this, arguments)
                        })
                    }
                }(jQuery)
            }, f.backToTop = function() {
                a(window).scroll(function() {
                    a(window).scrollTop() > 200 ? a("#back-to-top").fadeIn(200) : a("#back-to-top").fadeOut(200)
                }), a("#back-to-top, .back-to-top").click(function() {
                    return a("html, body").animate({
                        scrollTop: 0
                    }, "800"), !1
                })
            }, f.centerModal = function() {
                a(".modal").each(function() {
                    0 == a(this).hasClass("in") && a(this).show();
                    var b = a(window).height() - 60,
                        c = a(this).find(".modal-header").outerHeight() || 2,
                        d = a(this).find(".modal-footer").outerHeight() || 2;
                    a(this).find(".modal-content").css({
                        "max-height": function() {
                            return b
                        }
                    }), a(this).find(".modal-body").css({
                        "max-height": function() {
                            return b - (c + d)
                        }
                    }), a(this).find(".modal-dialog").addClass("modal-dialog-center").css({
                        "margin-top": function() {
                            return -(a(this).outerHeight() / 2)
                        },
                        "margin-left": function() {
                            return -(a(this).outerWidth() / 2)
                        }
                    }), 0 == a(this).hasClass("in") && a(this).hide()
                })
            }, f.accordions = function() {
                var b = a(".accordion");
                b.collapse(), accPutIcon = function() {
                    b.each(function() {
                        accExp = a(this).find(".panel-collapse.in"), accExp.prev(".panel-heading").addClass("content-in").find("a.accordion-toggle").append('<i class="' + f.settings.accordion.toggleIcon + '"></i>'), accNor = a(this).find(".panel-collapse").not(".panel-collapse.in"), accNor.prev(".panel-heading").find("a.accordion-toggle").append('<i class="' + f.settings.accordion.collapseIcon + '"></i>')
                    })
                }, accUpdIcon = function() {
                    b.each(function() {
                        accExp = a(this).find(".panel-collapse.in"), accExp.prev(".panel-heading").find("i").remove(), accExp.prev(".panel-heading").addClass("content-in").find("a.accordion-toggle").append('<i class="' + f.settings.accordion.toggleIcon + '"></i>'), accNor = a(this).find(".panel-collapse").not(".panel-collapse.in"), accNor.prev(".panel-heading").find("i").remove(), accNor.prev(".panel-heading").removeClass("content-in").find("a.accordion-toggle").append('<i class="' + f.settings.accordion.collapseIcon + '"></i>')
                    })
                }, accPutIcon(), a(".accordion").on("shown.bs.collapse", function() {
                    accUpdIcon()
                }).on("hidden.bs.collapse", function() {
                    accUpdIcon()
                })
            }, f.breadCrumbs = function() {
                var b = a(".heading > .breadcrumb"),
                    c = '<i class="' + f.settings.breadcrumbs.homeicon + '"></i>',
                    d = a(".mainnav a.active"),
                    e = d.closest(".sub");
                b.empty(), b.append("<li>You are here:</li>"), b.append('<li><a href="index.html" class="tip" title="back to dashboard">' + c + "</a></li>"), b.append('<span class="divider"><i class="' + f.settings.breadcrumbs.dividerIcon + '"></i></span>'), e.closest("li").hasClass("hasSub") ? (navel1 = e.prev("a.active-state"), link = navel1.attr("href"), text1 = navel1.children(".notification").remove().end().text().trim(), b.append('<li><a href="' + link + '">' + text1 + "</a></li>"), text = d.children(".notification").remove().end().text(), b.append('<span class="divider"><i class="' + f.settings.breadcrumbs.dividerIcon + '"></i></span>'), b.append("<li>" + text + "</li>")) : (text = d.children(".notification").remove().end().text(), b.append("<li>" + text + "</li>"))
            }, f.checkBoxesAndRadios = function() {
                var b = a("input[type=checkbox]"),
                    c = a("input[type=radio]");
                b.each(function(b) {
                    chboxClass = "undefined" == typeof a(this).data("class") ? "checkbox-custom" : a(this).data("class"), "undefined" == typeof a(this).attr("id") ? (chboxId = "chbox" + b, a(this).attr("id", chboxId)) : chboxId = a(this).attr("id"), chboxLabeltxt = "undefined" == typeof a(this).data("label") ? "" : a(this).data("label"), a(this).parent().hasClass(chboxClass) || a(this).parent().hasClass("toggle") || (a(this).wrap('<div class="' + chboxClass + '">'), a(this).parent().append('<label for="' + chboxId + '">' + chboxLabeltxt + "</label>"))
                }), c.each(function(b) {
                    radioClass = "undefined" == typeof a(this).data("class") ? "radio-custom" : a(this).data("class"), "undefined" == typeof a(this).attr("id") ? (radioId = "radio" + b, a(this).attr("id", radioId)) : radioId = a(this).attr("id"), radioLabeltxt = "undefined" == typeof a(this).data("label") ? "" : a(this).data("label"), a(this).parent().hasClass(radioClass) || a(this).parent().hasClass("toggle") || (a(this).wrap('<div class="' + radioClass + '">'), a(this).parent().append('<label for="' + radioId + '">' + radioLabeltxt + "</label>"))
                })
            }, f.shrinkHeader = function() {
                var b, c, d, e = a("#header"),
                    f = a("body");
                return d = e.position().top, b = a(document), c = !1, a(window).on("scroll touchmove", function() {
                    return c = !0
                }), setInterval(function() {
                    return c ? (e.toggleClass("shrink", b.scrollTop() > d), f.toggleClass("shrink-header", b.scrollTop() > d), c = !1) : void 0
                }, 250)
            }, f.storejs = function() {
                ! function(a) {
                    function b() {
                        try {
                            return h in a && a[h]
                        } catch (b) {
                            return !1
                        }
                    }

                    function c(a) {
                        return function() {
                            var b = Array.prototype.slice.call(arguments, 0);
                            b.unshift(e), j.appendChild(e), e.addBehavior("#default#userData"), e.load(h);
                            var c = a.apply(f, b);
                            return j.removeChild(e), c
                        }
                    }

                    function d(a) {
                        return a.replace(/^d/, "___$&").replace(m, "___")
                    }
                    var e, f = {},
                        g = a.document,
                        h = "localStorage",
                        i = "script";
                    if (f.disabled = !1, f.set = function() {}, f.get = function() {}, f.remove = function() {}, f.clear = function() {}, f.transact = function(a, b, c) {
                            var d = f.get(a);
                            null == c && (c = b, b = null), "undefined" == typeof d && (d = b || {}), c(d), f.set(a, d)
                        }, f.getAll = function() {}, f.forEach = function() {}, f.serialize = function(a) {
                            return JSON.stringify(a)
                        }, f.deserialize = function(a) {
                            if ("string" != typeof a) return void 0;
                            try {
                                return JSON.parse(a)
                            } catch (b) {
                                return a || void 0
                            }
                        }, b()) e = a[h], f.set = function(a, b) {
                        return void 0 === b ? f.remove(a) : (e.setItem(a, f.serialize(b)), b)
                    }, f.get = function(a) {
                        return f.deserialize(e.getItem(a))
                    }, f.remove = function(a) {
                        e.removeItem(a)
                    }, f.clear = function() {
                        e.clear()
                    }, f.getAll = function() {
                        var a = {};
                        return f.forEach(function(b, c) {
                            a[b] = c
                        }), a
                    }, f.forEach = function(a) {
                        for (var b = 0; b < e.length; b++) {
                            var c = e.key(b);
                            a(c, f.get(c))
                        }
                    };
                    else if (g.documentElement.addBehavior) {
                        var j, k;
                        try {
                            k = new ActiveXObject("htmlfile"), k.open(), k.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), k.close(), j = k.w.frames[0].document, e = j.createElement("div")
                        } catch (l) {
                            e = g.createElement("div"), j = g.body
                        }
                        var m = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
                        f.set = c(function(a, b, c) {
                            return b = d(b), void 0 === c ? f.remove(b) : (a.setAttribute(b, f.serialize(c)), a.save(h), c)
                        }), f.get = c(function(a, b) {
                            return b = d(b), f.deserialize(a.getAttribute(b))
                        }), f.remove = c(function(a, b) {
                            b = d(b), a.removeAttribute(b), a.save(h)
                        }), f.clear = c(function(a) {
                            var b = a.XMLDocument.documentElement.attributes;
                            a.load(h);
                            for (var c, d = 0; c = b[d]; d++) a.removeAttribute(c.name);
                            a.save(h)
                        }), f.getAll = function() {
                            var a = {};
                            return f.forEach(function(b, c) {
                                a[b] = c
                            }), a
                        }, f.forEach = c(function(a, b) {
                            for (var c, d = a.XMLDocument.documentElement.attributes, e = 0; c = d[e]; ++e) b(c.name, f.deserialize(a.getAttribute(c.name)))
                        })
                    }
                    try {
                        var n = "__storejs__";
                        f.set(n, n), f.get(n) != n && (f.disabled = !0), f.remove(n)
                    } catch (l) {
                        f.disabled = !0
                    }
                    f.enabled = !f.disabled, "undefined" != typeof module && module.exports && this.module !== module ? module.exports = f : "function" == typeof define && define.amd ? define(f) : a.store = f
                }(Function("return this")())
            }, f.mouseWheel = function() {
                ! function(a) {
                    function b(b) {
                        var c = b || window.event,
                            d = [].slice.call(arguments, 1),
                            e = 0,
                            f = 0,
                            g = 0;
                        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), g = e, void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (g = 0, f = -1 * e), void 0 !== c.wheelDeltaY && (g = c.wheelDeltaY / 120), void 0 !== c.wheelDeltaX && (f = -1 * c.wheelDeltaX / 120), d.unshift(b, e, f, g), (a.event.dispatch || a.event.handle).apply(this, d)
                    }
                    var c = ["DOMMouseScroll", "mousewheel"];
                    if (a.event.fixHooks)
                        for (var d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks;
                    a.event.special.mousewheel = {
                        setup: function() {
                            if (this.addEventListener)
                                for (var a = c.length; a;) this.addEventListener(c[--a], b, !1);
                            else this.onmousewheel = b
                        },
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var a = c.length; a;) this.removeEventListener(c[--a], b, !1);
                            else this.onmousewheel = null
                        }
                    }, a.fn.extend({
                        mousewheel: function(a) {
                            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                        },
                        unmousewheel: function(a) {
                            return this.unbind("mousewheel", a)
                        }
                    })
                }(jQuery)
            }, f.dropdownMenuFix = function() {
                var b = f.getBreakPoint();
                a("ul.dropdown-menu").each("phone" == b || "tablet" == b ? function() {
                    a(this).removeClass("right"), a(this).removeClass("left");
                    var b = a(this).parent().innerWidth(),
                        c = a(this).innerWidth(),
                        d = b / 2 - c / 2;
                    d += "px", a(this).css("margin-left", d)
                } : function() {
                    if (!a(this).hasClass("left")) {
                        var b = a(this).parent().innerWidth(),
                            c = a(this).innerWidth(),
                            d = b / 2 - c / 2;
                        d += "px", a(this).css("margin-left", d)
                    }
                }), a(".dropdown-form").click(function(a) {
                    a.stopPropagation()
                })
            }, f.expandSideBarNav = function() {
                nav = a(".mainnav"), nava = nav.find("a"), nava.next("ul").slideDown(f.settings.sideNav.subOpenSpeed, f.settings.sideNav.animationEasing), nava.next("ul").addClass("expand"), nava.addClass("drop").removeClass("notExpand")
            }, f.collapseSideBarNav = function(b) {
                nav = a(".mainnav"), nava = nav.find("a.expand"), navactiv = nav.find("a.active-state"), b ? (navactiv.next("ul").slideDown(f.settings.sideNav.subOpenSpeed, f.settings.sideNav.animationEasing).addClass("show"), navactiv.addClass("expand").removeClass("notExpand")) : (nava.next("ul").slideUp(f.settings.sideNav.subOpenSpeed, f.settings.sideNav.animationEasing), nava.next("ul").removeClass("show"), setTimeout(function() {
                    nava.next("ul").removeAttr("style")
                }, f.settings.sideNav.subCloseSpeed), nava.addClass("notExpand").removeClass("expand"))
            }, f.dropdownMenuAnimations = function() {
                openEffect = "animated " + f.settings.dropdownMenu.openEffect, a(".dropdown").on("show.bs.dropdown", function() {
                    a(this).find(".dropdown-menu").addClass(openEffect)
                })
            }, f.retinaReady = function() {
                ! function() {
                    function a() {}

                    function b(a) {
                        return f.retinaImageSuffix + a
                    }

                    function c(a, c) {
                        if (this.path = a || "", "undefined" != typeof c && null !== c) this.at_2x_path = c, this.perform_check = !1;
                        else {
                            if (void 0 !== document.createElement) {
                                var d = document.createElement("a");
                                d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
                            } else {
                                var e = this.path.split("?");
                                e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
                            }
                            this.perform_check = !0
                        }
                    }

                    function d(a) {
                        this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
                        var b = this;
                        this.path.check_2x_variant(function(a) {
                            a && b.swap()
                        })
                    }
                    var e = "undefined" == typeof exports ? window : exports,
                        f = {
                            retinaImageSuffix: "@2x",
                            check_mime_type: !0,
                            force_original_dimensions: !0
                        };
                    e.Retina = a, a.configure = function(a) {
                        null === a && (a = {});
                        for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
                    }, a.init = function(a) {
                        null === a && (a = e);
                        var b = a.onload || function() {};
                        a.onload = function() {
                            var a, c, e = document.getElementsByTagName("img"),
                                f = [];
                            for (a = 0; a < e.length; a += 1) c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
                            b()
                        }
                    }, a.isRetina = function() {
                        var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
                        return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
                    };
                    var g = /\.\w+$/;
                    e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function() {
                        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
                    }, c.prototype.check_2x_variant = function(a) {
                        var b, d = this;
                        return this.is_external() ? a(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function() {
                            if (4 !== b.readyState) return a(!1);
                            if (b.status >= 200 && b.status <= 399) {
                                if (f.check_mime_type) {
                                    var e = b.getResponseHeader("Content-Type");
                                    if (null === e || !e.match(/^image/i)) return a(!1)
                                }
                                return c.confirmed_paths.push(d.at_2x_path), a(!0)
                            }
                            return a(!1)
                        }, void b.send()) : a(!0)
                    }, e.RetinaImage = d, d.prototype.swap = function(a) {
                        function b() {
                            c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
                        }
                        "undefined" == typeof a && (a = this.path.at_2x_path);
                        var c = this;
                        b()
                    }, a.isRetina() && a.init(e)
                }()
            }, f.waitMe = function() {
                ! function(a) {
                    a.fn.waitMe = function(b) {
                        return this.each(function() {
                            var c, d, e, f, g, h, i, j = a(this),
                                k = !1,
                                l = "background-color",
                                m = "",
                                n = {
                                    init: function() {
                                        switch (i = a.extend({
                                            effect: "bounce",
                                            text: "",
                                            bg: "rgba(255,255,255,0.7)",
                                            color: "#000",
                                            sizeW: "",
                                            sizeH: ""
                                        }, b), f = a('<div class="waitMe"></div>'), i.effect) {
                                            case "none":
                                                e = 0;
                                                break;
                                            case "bounce":
                                                e = 3, g = "", h = "width:" + i.sizeW + ";height:" + i.sizeH;
                                                break;
                                            case "rotateplane":
                                                e = 1, g = "", h = "width:" + i.sizeW + ";height:" + i.sizeH;
                                                break;
                                            case "stretch":
                                                e = 5, g = "", h = "width:" + i.sizeW + ";height:" + i.sizeH;
                                                break;
                                            case "orbit":
                                                e = 2, g = "width:" + i.sizeW + ";height:" + i.sizeH, h = "";
                                                break;
                                            case "roundBounce":
                                                e = 12, g = "width:" + i.sizeW + ";height:" + i.sizeH, h = "";
                                                break;
                                            case "win8":
                                                e = 5, k = !0, g = "width:" + i.sizeW + ";height:" + i.sizeH, h = "width:" + i.sizeW + ";height:" + i.sizeH;
                                                break;
                                            case "win8_linear":
                                                e = 5, k = !0, g = "width:" + i.sizeW + ";height:" + i.sizeH, h = "";
                                                break;
                                            case "ios":
                                                e = 12, g = "width:" + i.sizeW + ";height:" + i.sizeH, h = "";
                                                break;
                                            case "facebook":
                                                e = 3, g = "", h = "width:" + i.sizeW + ";height:" + i.sizeH;
                                                break;
                                            case "rotation":
                                                e = 1, l = "border-color", g = "", h = "width:" + i.sizeW + ";height:" + i.sizeH
                                        }
                                        if ("" == i.sizeW && "" == i.sizeH && (g = h = ""), e > 0) {
                                            d = a('<div class="waitMe_progress ' + i.effect + '"></div>');
                                            for (var n = 1; e >= n; ++n) m = k ? m + ('<div class="waitMe_progress_elem' + n + '" style="' + h + '"><div style="' + l + ":" + i.color + '"></div></div>') : m + ('<div class="waitMe_progress_elem' + n + '" style="' + l + ":" + i.color + ";" + h + '"></div>');
                                            d = a('<div class="waitMe_progress ' + i.effect + '" style="' + g + '">' + m + "</div>")
                                        }
                                        i.text && (c = a('<div class="waitMe_text" style="color:' + i.color + '">' + i.text + "</div>")), j.find("> .waitMe") && j.find("> .waitMe").remove(), waitMeDivObj = a('<div class="waitMe_content"></div>'), waitMeDivObj.append(d, c), f.append(waitMeDivObj), "HTML" == j[0].tagName && (j = a("body")), j.addClass("waitMe_container").append(f), j.find("> .waitMe").css({
                                            background: i.bg
                                        }), j.find(".waitMe_content").css({
                                            marginTop: -j.find(".waitMe_content").outerHeight() / 2 + "px"
                                        })
                                    },
                                    hide: function() {
                                        j.removeClass("waitMe_container"), j.find(".waitMe").remove()
                                    }
                                };
                            return n[b] ? n[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void(a.event.special.destroyed = {
                                remove: function(a) {
                                    a.handler && a.handler()
                                }
                            }) : n.init.apply(this, arguments)
                        })
                    }
                }(jQuery)
            }, f.animatedProgressBars = function() {
                ! function(a) {
                    "use strict";
                    var b = function(c, d) {
                        this.$element = a(c), this.options = a.extend({}, b.defaults, d)
                    };
                    b.defaults = {
                        transition_delay: 300,
                        refresh_speed: 50,
                        display_text: "none",
                        use_percentage: !0,
                        percent_format: function(a) {
                            return a + "%"
                        },
                        amount_format: function(a, b) {
                            return a + " / " + b
                        },
                        update: a.noop,
                        done: a.noop,
                        fail: a.noop
                    }, b.prototype.transition = function() {
                        var c = this.$element,
                            d = c.parent(),
                            e = this.$back_text,
                            f = this.$front_text,
                            g = this.options,
                            h = parseInt(c.attr("data-transitiongoal")),
                            i = parseInt(c.attr("aria-valuemin")) || 0,
                            j = parseInt(c.attr("aria-valuemax")) || 100,
                            k = d.hasClass("vertical"),
                            l = g.update && "function" == typeof g.update ? g.update : b.defaults.update,
                            m = g.done && "function" == typeof g.done ? g.done : b.defaults.done,
                            n = g.fail && "function" == typeof g.fail ? g.fail : b.defaults.fail;
                        if (isNaN(h)) return void n("data-transitiongoal not set");
                        var o = Math.round(100 * (h - i) / (j - i));
                        if ("center" === g.display_text && !e && !f) {
                            this.$back_text = e = a("<span>").addClass("progressbar-back-text").prependTo(d), this.$front_text = f = a("<span>").addClass("progressbar-front-text").prependTo(c);
                            var p;
                            k ? (p = d.css("height"), e.css({
                                height: p,
                                "line-height": p
                            }), f.css({
                                height: p,
                                "line-height": p
                            }), a(window).resize(function() {
                                p = d.css("height"), e.css({
                                    height: p,
                                    "line-height": p
                                }), f.css({
                                    height: p,
                                    "line-height": p
                                })
                            })) : (p = d.css("width"), f.css({
                                width: p
                            }), a(window).resize(function() {
                                p = d.css("width"), f.css({
                                    width: p
                                })
                            }))
                        }
                        setTimeout(function() {
                            var a, b, n, p, q;
                            k ? c.css("height", o + "%") : c.css("width", o + "%");
                            var r = setInterval(function() {
                                k ? (n = c.height(), p = d.height()) : (n = c.width(), p = d.width()), a = Math.round(100 * n / p), b = Math.round(i + n / p * (j - i)), a >= o && (a = o, b = h, m(c), clearInterval(r)), "none" !== g.display_text && (q = g.use_percentage ? g.percent_format(a) : g.amount_format(b, j, i), "fill" === g.display_text ? c.text(q) : "center" === g.display_text && (e.text(q), f.text(q))), c.attr("aria-valuenow", b), l(a, c)
                            }, g.refresh_speed)
                        }, g.transition_delay)
                    };
                    var c = a.fn.progressbar;
                    a.fn.progressbar = function(c) {
                        return this.each(function() {
                            var d = a(this),
                                e = d.data("bs.progressbar"),
                                f = "object" == typeof c && c;
                            e || d.data("bs.progressbar", e = new b(this, f)), e.transition()
                        })
                    }, a.fn.progressbar.Constructor = b, a.fn.progressbar.noConflict = function() {
                        return a.fn.progressbar = c, this
                    }
                }(window.jQuery)
            }, f.browserSelector = function() {
                function a(a) {
                    var b = a.toLowerCase(),
                        d = function(a) {
                            return b.indexOf(a) > -1
                        },
                        e = "gecko",
                        f = "webkit",
                        g = "safari",
                        h = "opera",
                        i = "mobile",
                        j = document.documentElement,
                        k = [!/opera|webtv/i.test(b) && /msie\s(\d)/.test(b) ? "ie ie" + RegExp.$1 : d("firefox/2") ? e + " ff2" : d("firefox/3.5") ? e + " ff3 ff3_5" : d("firefox/3.6") ? e + " ff3 ff3_6" : d("firefox/3") ? e + " ff3" : d("gecko/") ? e : d("opera") ? h + (/version\/(\d+)/.test(b) ? " " + h + RegExp.$1 : /opera(\s|\/)(\d+)/.test(b) ? " " + h + RegExp.$2 : "") : d("konqueror") ? "konqueror" : d("blackberry") ? i + " blackberry" : d("android") ? i + " android" : d("chrome") ? f + " chrome" : d("iron") ? f + " iron" : d("applewebkit/") ? f + " " + g + (/version\/(\d+)/.test(b) ? " " + g + RegExp.$1 : "") : d("mozilla/") ? e : "", d("j2me") ? i + " j2me" : d("iphone") ? i + " iphone" : d("ipod") ? i + " ipod" : d("ipad") ? i + " ipad" : d("mac") ? "mac" : d("darwin") ? "mac" : d("webtv") ? "webtv" : d("win") ? "win" + (d("windows nt 6.0") ? " vista" : "") : d("freebsd") ? "freebsd" : d("x11") || d("linux") ? "linux" : "", "js"];
                    return c = k.join(" "), j.className += " " + c, c
                }
                a(navigator.userAgent)
            }, f.firstImpression = function() {
                window.firstImpression = function(a, b) {
                    var c, d, e, f;
                    return c = function(a, b, c) {
                        var d, e, f;
                        return arguments.length > 1 && "[object Object]" !== String(b) ? (c = c || {}, (null === b || void 0 === b) && (c.expires = -1), "number" == typeof c.expires && (d = c.expires, f = c.expires = new Date, f.setTime(f.getTime() + 24 * d * 60 * 60 * 1e3)), c.path = "/", document.cookie = [encodeURIComponent(a), "=", encodeURIComponent(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")) : (e = new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)").exec(document.cookie), e ? decodeURIComponent(e[1]) : null)
                    }, void 0 === a && (a = "_firstImpression"), void 0 === b && (b = 730), null === a ? void c("_firstImpression", null) : null === b ? void c(a, null) : (d = function() {
                        return c(a)
                    }, e = function() {
                        c(a, !0, {
                            expires: b
                        })
                    }, (f = function() {
                        var a = d();
                        return a || e(), !a
                    })())
                }
            }, f.matchHeight = function() {
                ! function(a) {
                    var b = -1,
                        c = -1,
                        d = function(b) {
                            var c = null,
                                d = [];
                            return a(b).each(function() {
                                var b = a(this),
                                    f = b.offset().top - e(b.css("margin-top")),
                                    g = 0 < d.length ? d[d.length - 1] : null;
                                null === g ? d.push(b) : 1 >= Math.floor(Math.abs(c - f)) ? d[d.length - 1] = g.add(b) : d.push(b), c = f
                            }), d
                        },
                        e = function(a) {
                            return parseFloat(a) || 0
                        },
                        f = function(b) {
                            var c = {
                                byRow: !0,
                                remove: !1,
                                property: "height"
                            };
                            return "object" == typeof b && (c = a.extend(c, b)), "boolean" == typeof b && (c.byRow = b), "remove" === b && (c.remove = !0), c
                        },
                        g = a.fn.matchHeight = function(b) {
                            if (b = f(b), b.remove) {
                                var c = this;
                                return this.css(b.property, ""), a.each(g._groups, function(a, b) {
                                    b.elements = b.elements.not(c)
                                }), this
                            }
                            return 1 >= this.length ? this : (g._groups.push({
                                elements: this,
                                options: b
                            }), g._apply(this, b), this)
                        };
                    g._groups = [], g._throttle = 80, g._maintainScroll = !1, g._beforeUpdate = null, g._afterUpdate = null, g._apply = function(b, c) {
                        var h = f(c),
                            i = a(b),
                            j = [i],
                            k = a(window).scrollTop(),
                            l = a("html").outerHeight(!0),
                            m = i.parents().filter(":hidden");
                        return m.css("display", "block"), h.byRow && (i.each(function() {
                            var b = a(this),
                                c = "inline-block" === b.css("display") ? "inline-block" : "block";
                            b.data("style-cache", b.attr("style")), b.css({
                                display: c,
                                "padding-top": "0",
                                "padding-bottom": "0",
                                "margin-top": "0",
                                "margin-bottom": "0",
                                "border-top-width": "0",
                                "border-bottom-width": "0",
                                height: "100px"
                            })
                        }), j = d(i), i.each(function() {
                            var b = a(this);
                            b.attr("style", b.data("style-cache") || "").css("height", "")
                        })), a.each(j, function(b, c) {
                            var d = a(c),
                                f = 0;
                            h.byRow && 1 >= d.length || (d.each(function() {
                                var b = a(this),
                                    c = {
                                        display: "inline-block" === b.css("display") ? "inline-block" : "block"
                                    };
                                c[h.property] = "", b.css(c), b.outerHeight(!1) > f && (f = b.outerHeight(!1)), b.css("display", "")
                            }), d.each(function() {
                                var b = a(this),
                                    c = 0;
                                "border-box" !== b.css("box-sizing") && (c += e(b.css("border-top-width")) + e(b.css("border-bottom-width")), c += e(b.css("padding-top")) + e(b.css("padding-bottom"))), b.css(h.property, f - c)
                            }))
                        }), m.css("display", ""), g._maintainScroll && a(window).scrollTop(k / l * a("html").outerHeight(!0)), this
                    }, g._applyDataApi = function() {
                        var b = {};
                        a("[data-match-height], [data-mh]").each(function() {
                            var c = a(this),
                                d = c.attr("data-match-height") || c.attr("data-mh");
                            b[d] = d in b ? b[d].add(c) : c
                        }), a.each(b, function() {
                            this.matchHeight(!0)
                        })
                    };
                    var h = function(b) {
                        g._beforeUpdate && g._beforeUpdate(b, g._groups), a.each(g._groups, function() {
                            g._apply(this.elements, this.options)
                        }), g._afterUpdate && g._afterUpdate(b, g._groups)
                    };
                    g._update = function(d, e) {
                        if (e && "resize" === e.type) {
                            var f = a(window).width();
                            if (f === b) return;
                            b = f
                        }
                        d ? -1 === c && (c = setTimeout(function() {
                            h(e), c = -1
                        }, g._throttle)) : h(e)
                    }, a(g._applyDataApi), a(window).bind("load", function(a) {
                        g._update(!1, a)
                    }), a(window).bind("resize orientationchange", function(a) {
                        g._update(!0, a)
                    })
                }(jQuery)
            }, f.equalHeight = function() {
                f.matchHeight()
            }, f.quickSearch = function() {
                a(".chat-search input").length && a(".chat-search input").val("").quicksearch(".user-list .list-group-item", {
                    removeDiacritics: !0
                }), a(".todo-search input").length && a(".todo-search input").val("").quicksearch(".todo-list .todo-task-item"), a(".users-search input").length && a(".users-search input").val("").quicksearch(".recent-users-widget .list-group-item"), a(".icon-search").length && a(".icon-search").val("").quicksearch(".col-md-3", {
                    removeDiacritics: !0
                })
            }, f.resSearchButton = function() {
                var b = a(".resSearchBtn"),
                    c = a(".closeSearchForm"),
                    d = a("#header .navbar-form");
                b.click(function() {
                    d.addClass("show animated fadeIn"), c.addClass("show")
                }), c.click(function() {
                    a(this).removeClass("show"), d.removeClass("show animated fadeIn")
                })
            }, f.resSidebarButton = function() {
                var b = a("#showNav");
                b.click(function() {
                    a(this).hasClass("sidebar-showed") ? (f.hideLeftSidebar(), a(this).removeClass("sidebar-showed")) : (f.showLeftSidebar(), a(this).addClass("sidebar-showed"))
                })
            }, f.responsiveTables = function() {
                var b = a(".table").not(".non-responsive");
                b.each(function() {
                    a(this).wrap('<div class="table-responsive" />'), f.settings.tables.customscroll && a("div.table-responsive").slimScrollHorizontal({
                        size: f.settings.customScroll.size,
                        color: "#f3f3f3",
                        railOpacity: "0.3",
                        width: "100%",
                        positon: "bottom",
                        start: "left",
                        railVisible: !0,
                        distance: "3px"
                    })
                })
            }, f.emailApp = function() {
                var b = a("#email-sidebar"),
                    c = a("#email-content");
                a("#email-toggle").click(function() {
                    a(this).hasClass("pushed") ? (a(this).removeClass("pushed"), b.removeClass("email-sidebar-hide"), b.addClass("email-sidebar-show"), c.removeClass("email-content-expand"), c.addClass("email-content-contract")) : (a(this).addClass("pushed"), b.removeClass("email-sidebar-show"), b.addClass("email-sidebar-hide"), c.removeClass("email-content-contract"), c.addClass("email-content-expand"))
                })
            }, f.collapseEmailAppSidebar = function() {
                var b = a("#email-sidebar"),
                    c = a("#email-content");
                b.removeClass("email-sidebar-show"), b.addClass("email-sidebar-hide"), c.removeClass("email-content-contract"), c.addClass("email-content-expand"), a("#email-toggle").addClass("pushed")
            }, f.expandEmailAppSidebar = function() {
                var b = a("#email-sidebar"),
                    c = a("#email-content");
                b.removeClass("email-sidebar-hide"), b.addClass("email-sidebar-show"), c.removeClass("email-content-expand"), c.addClass("email-content-contract"), a("#email-toggle").removeClass("pushed")
            }, f.toDoWidget = function() {
                var b = a(".todo-widget"),
                    c = b.find(".todo-task-item"),
                    d = c.find('input[type="checkbox"]'),
                    e = c.find(".close");
                d.change(function() {
                    a(this).prop("checked") ? a(this).closest(".todo-task-item").addClass("task-done") : a(this).closest(".todo-task-item").removeClass("task-done")
                }), e.click(function() {
                    a(this).closest(".todo-task-item").fadeOut("500")
                })
            }, f.removeDefaultClassess = function() {
                var b = (f.getBreakPoint(), a("#sidebar")),
                    c = a("#right-sidebar"),
                    d = a(".page-content");
                d.addClass("sidebar-page"), d.addClass("right-sidebar-page"), b.removeClass("hidden-lg hidden-md hidden-sm hidden-xs"), c.removeClass("hidden-lg hidden-md hidden-sm hidden-xs"), a("#sidebarbg, #right-sidebarbg").removeClass("hidden-lg hidden-md hidden-sm hidden-xs")
            }, f.respondjs = function() {
                var b = jRespond([{
                    label: "phone",
                    enter: 0,
                    exit: 767
                }, {
                    label: "tablet",
                    enter: 768,
                    exit: 979
                }, {
                    label: "laptop",
                    enter: 980,
                    exit: 1366
                }, {
                    label: "large",
                    enter: 1367,
                    exit: 1e4
                }]);
                return b.addFunc({
                    breakpoint: "large",
                    enter: function() {
                        f.removeDefaultClassess(), store.set("rightSidebarToggle", 0), f.toggleRightSidebarBtn("show"), f.showRightSidebar()
                    },
                    exit: function() {}
                }), b.addFunc({
                    breakpoint: "laptop",
                    enter: function() {
                        f.removeDefaultClassess(), f.hideRightSidebar()
                    },
                    exit: function() {}
                }), b.addFunc({
                    breakpoint: "tablet",
                    enter: function() {
                        f.removeDefaultClassess(), f.toggleLeftSidebar(), f.sideBarNavToggle(), f.collapseSideBarNav(!1), f.hideRightSidebar(), f.dropdownMenuFix()
                    },
                    exit: function() {
                        f.showLeftSidebar(), f.dropdownMenuFix()
                    }
                }), b.addFunc({
                    breakpoint: "phone",
                    enter: function() {
                        f.removeDefaultClassess(), f.dropdownMenuFix(), f.hideLeftSidebar(), f.collapseEmailAppSidebar(), a("#email-content").addClass("email-content-offCanvas"), f.hideRightSidebar()
                    },
                    exit: function() {
                        f.showLeftSidebar(), a("#email-content").removeClass("email-content-offCanvas"), f.expandEmailAppSidebar()
                    }
                }), b
            }, f.init()
        }, a.fn.supr = function(b) {
            return this.each(function() {
                if (void 0 == a(this).data("supr")) {
                    var c = new a.supr(this, b);
                    a(this).data("supr", c)
                }
            })
        }
    }(jQuery), window.console || (console = {
        log: function() {}
    }), navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.querySelector("head").appendChild(msViewportStyle)
}
var nua = navigator.userAgent,
    isAndroid = nua.indexOf("Mozilla/5.0") > -1 && nua.indexOf("Android ") > -1 && nua.indexOf("AppleWebKit") > -1 && -1 === nua.indexOf("Chrome");
isAndroid && $("select.form-control").removeClass("form-control").css("width", "100%"), window.addEventListener("load", function() {
    FastClick.attach(document.body)
}, !1), $(document).ready(function() {
    $("a[href^=#]").click(function(a) {
        a.preventDefault()
    }), $("body").supr({
        customScroll: {
            color: "#c4c4c4",
            rscolor: "#95A5A6",
            size: "5px",
            opacity: "1",
            alwaysVisible: !1
        },
        header: {
            fixed: !0,
            shrink: !0
        },
        breadcrumbs: {
            auto: !0,
            homeicon: "s16 icomoon-icon-screen-2",
            dividerIcon: "s16 icomoon-icon-arrow-right-3"
        },
        sidebar: {
            fixed: !0,
            rememberToggle: !0,
            offCanvas: !1
        },
        rightSidebar: {
            fixed: !0,
            rememberToggle: !0
        },
        sideNav: {
            toggleMode: !0,
            showArrows: !0,
            sideNavArrowIcon: "icomoon-icon-arrow-down-2 s16",
            subOpenSpeed: 200,
            subCloseSpeed: 300,
            animationEasing: "linear",
            absoluteUrl: !1,
            subDir: ""
        },
        panels: {
            refreshIcon: "brocco-icon-refresh s12",
            toggleIcon: "icomoon-icon-plus",
            collapseIcon: "icomoon-icon-minus",
            closeIcon: "icomoon-icon-close",
            showControlsOnHover: !1,
            loadingEffect: "rotateplane",
            loaderColor: "#616469",
            rememberSortablePosition: !0
        },
        accordion: {
            toggleIcon: "icomoon-icon-minus s12",
            collapseIcon: "icomoon-icon-plus s12"
        },
        tables: {
            responsive: !0,
            customscroll: !0
        },
        alerts: {
            animation: !0,
            closeEffect: "bounceOutDown"
        },
        dropdownMenu: {
            animation: !0,
            openEffect: "fadeIn"
        },
        backToTop: !0
    }), $("[data-toggle=tooltip]").tooltip({
        container: "body"
    }), $(".tip").tooltip({
        placement: "top",
        container: "body"
    }), $(".tipR").tooltip({
        placement: "right",
        container: "body"
    }), $(".tipB").tooltip({
        placement: "bottom",
        container: "body"
    }), $(".tipL").tooltip({
        placement: "left",
        container: "body"
    }), $("[data-toggle=popover]").popover({
        html: !0
    });
    var a = $("body").data("supr");
    firstImpression() && (a.settings.header.fixed ? store.set("fixed-header", 1) : store.set("fixed-header", 0), a.settings.sidebar.fixed ? store.set("fixed-left-sidebar", 1) : store.set("fixed-left-sidebar", 0), a.settings.rightSidebar.fixed ? store.set("fixed-right-sidebar", 1) : store.set("fixed-right-sidebar", 0)), 1 == store.get("fixed-header") ? $("#fixed-header-toggle").prop("checked", !0) : $("#fixed-header-toggle").prop("checked", !1), 1 == store.get("fixed-left-sidebar") ? $("#fixed-left-sidebar").prop("checked", !0) : $("#fixed-left-sidebar").prop("checked", !1), 1 == store.get("fixed-right-sidebar") ? $("#fixed-right-sidebar").prop("checked", !0) : $("#fixed-right-sidebar").prop("checked", !1), $("#fixed-header-toggle").on("change", function() {
        a.fixedHeader(this.checked ? !0 : !1)
    }), $("#fixed-left-sidebar").on("change", function() {
        this.checked ? a.fixedSidebar("left") : a.removeFixedSidebar("left")
    }), $("#fixed-right-sidebar").on("change", function() {
        this.checked ? a.fixedSidebar("right") : a.removeFixedSidebar("right")
    })
}), $(document).ready(function() {
    $("#basic-datatables").dataTable({
        oLanguage: {
            sSearch: "",
            sLengthMenu: "<span>_MENU_</span>"
        },
        sDom: "<'row'<'col-md-6 col-xs-12 'l><'col-md-6 col-xs-12'f>r>t<'row'<'col-md-4 col-xs-12'i><'col-md-8 col-xs-12'p>>"
    }), $("#vertical-scroll-datatables").dataTable({
        scrollY: "200px",
        scrollCollapse: !0,
        paging: !1
    }), $("#responsive-datatables").dataTable({
        oLanguage: {
            sSearch: "",
            sLengthMenu: "<span>_MENU_</span>"
        },
        sDom: "<'row'<'col-md-6 col-xs-12 'l><'col-md-6 col-xs-12'f>r>t<'row'<'col-md-4 col-xs-12'i><'col-md-8 col-xs-12'p>>"
    }), $("#tabletools").DataTable({
        oLanguage: {
            sSearch: "",
            sLengthMenu: "<span>_MENU_</span>"
        },
        sDom: "T<'row'<'col-md-6 col-xs-12 'l><'col-md-6 col-xs-12'f>r>t<'row'<'col-md-4 col-xs-12'i><'col-md-8 col-xs-12'p>>",
        tableTools: {
            sSwfPath: "http://cdn.datatables.net/tabletools/2.2.2/swf/copy_csv_xls_pdf.swf",
            aButtons: ["copy", "csv", "xls", "print", "select_all", "select_none"]
        }
    })
});
var positive = [1, 5, 3, 7, 8, 6, 10],
    negative = [10, 6, 8, 7, 3, 5, 1],
    negative1 = [7, 6, 8, 7, 6, 5, 4];
$("#stat1").sparkline(positive, {
    height: 15,
    spotRadius: 0,
    barColor: "#9FC569",
    type: "bar"
}), $("#stat2").sparkline(negative, {
    height: 15,
    spotRadius: 0,
    barColor: "#ED7A53",
    type: "bar"
}), $("#stat3").sparkline(negative1, {
    height: 15,
    spotRadius: 0,
    barColor: "#ED7A53",
    type: "bar"
}), $("#stat4").sparkline(positive, {
    height: 15,
    spotRadius: 0,
    barColor: "#9FC569",
    type: "bar"
}), $("#stat5").sparkline(positive, {
    height: 15,
    spotRadius: 0,
    barColor: "#9FC569",
    type: "bar"
}), $("#stat6").sparkline(positive, {
    width: 70,
    height: 20,
    lineColor: "#88bbc8",
    fillColor: "#f2f7f9",
    spotColor: "#e72828",
    maxSpotColor: "#005e20",
    minSpotColor: "#f7941d",
    spotRadius: 3,
    lineWidth: 2
});