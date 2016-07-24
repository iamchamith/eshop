(function ($) {
    $.fn.countTo = function (options) {
        var defaultValue = { from: 0, to: 100, speed: 1000, refreshInterval: 100, decimals: 0, formatter: null, onUpdate: null, onComplete: null, };
        options = $.extend({}, defaultValue, options || {});
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function () {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof (options.onUpdate) === 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (typeof (options.formatter) === 'function') {
                    var formattedValue = options.formatter.call($(_this), value);
                    $(_this).html(formattedValue);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof (options.onComplete) === 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };


    $.ajaxSetup({
        beforeSend: function () {
            $('#cube-loader').fadeIn();
        },
        complete: function () {
            $('#cube-loader').fadeOut(1000);
        },
        success: function () {
            $('#cube-loader').fadeOut(1000);
        }
    });

    $.fn.populateOptions = function (options) {
        var settings = $.extend({
            data: null,
            placeHolder: "",
            complete: null,
        }, options);

        var datas = settings.data;
        var place = settings.placeHolder;
        if (datas != null) {
            var select = $(this);
            select.empty();
            select.append('<option value="-1">' + place + '</option>');
            $.each(datas, function (key, e) {
                select.append('<option value=' + e.Value + '>' + e.Text + '</option>');
            });
        }
        if ($.isFunction(settings.complete)) {
            settings.complete.call(this);
        }

    }

    $.fn.animateTo = function (effect, callback) {
        $(this).removeClass('hidden animated ' + effect).addClass('animated ' + effect).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated ' + effect);
            if ($.isFunction(callback)) {
                callback.call(this);
            }
        });
    }

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    var isStringNullOrEmpty = function (val) {
        switch (val) {
            case "":
            case 0:
            case "0":
            case null:
            case false:
            case undefined:
            case typeof this === 'undefined':
                return true;
            default: return false;
        }
    }

    //Check is string null or whitespace
    $.fn.isStringNullOrWhiteSpace = function (val) {
        return isStringNullOrEmpty(val) || val.replace(/\s/g, "") === '';
    },

    //If string is null or empty then return Null or else original value
     $.fn.nullIfStringNullOrEmpty = function (val) {
         if (isStringNullOrEmpty(val)) {
             return null;
         }
         return val;
     }


}(jQuery));

Array.prototype.unique = function () {
    var arr = this;
    return $.grep(arr, function (v, i) {
        return $.inArray(v, arr) === i;
    });
}


String.prototype.toCamelCase = function () {
    return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

String.prototype.toPascalCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};


$(function () {
    $(":file#files").kendoUpload({
        async: { saveUrl: "/admin/facility/uploadimage", autoUpload: true },
        multiple: false,
        // template: kendo.template($('#imageTemplate').html()),
        select: function (e) { loadImage(e.files[0].rawFile, function (img) { $('.image-container').empty().append(img); }, { maxWidth: 400 }); },
        success: function (e) { $('#uploadedImage').val(e.response); }
    });
});

!function ($) { "use strict"; var escape = /["\\\x00-\x1f\x7f-\x9f]/g, meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, hasOwn = Object.prototype.hasOwnProperty; $.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify : function (a) { if (null === a) return "null"; var b, c, d, e, f = $.type(a); if ("undefined" === f) return void 0; if ("number" === f || "boolean" === f) return String(a); if ("string" === f) return $.quoteString(a); if ("function" == typeof a.toJSON) return $.toJSON(a.toJSON()); if ("date" === f) { var g = a.getUTCMonth() + 1, h = a.getUTCDate(), i = a.getUTCFullYear(), j = a.getUTCHours(), k = a.getUTCMinutes(), l = a.getUTCSeconds(), m = a.getUTCMilliseconds(); return 10 > g && (g = "0" + g), 10 > h && (h = "0" + h), 10 > j && (j = "0" + j), 10 > k && (k = "0" + k), 10 > l && (l = "0" + l), 100 > m && (m = "0" + m), 10 > m && (m = "0" + m), '"' + i + "-" + g + "-" + h + "T" + j + ":" + k + ":" + l + "." + m + 'Z"' } if (b = [], $.isArray(a)) { for (c = 0; c < a.length; c++) b.push($.toJSON(a[c]) || "null"); return "[" + b.join(",") + "]" } if ("object" == typeof a) { for (c in a) if (hasOwn.call(a, c)) { if (f = typeof c, "number" === f) d = '"' + c + '"'; else { if ("string" !== f) continue; d = $.quoteString(c) } f = typeof a[c], "function" !== f && "undefined" !== f && (e = $.toJSON(a[c]), b.push(d + ":" + e)) } return "{" + b.join(",") + "}" } }, $.evalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function (str) { return eval("(" + str + ")") }, $.secureEvalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function (str) { var filtered = str.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""); if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + str + ")"); throw new SyntaxError("Error parsing JSON, source is not valid.") }, $.quoteString = function (a) { return a.match(escape) ? '"' + a.replace(escape, function (a) { var b = meta[a]; return "string" == typeof b ? b : (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)) }) + '"' : '"' + a + '"' } }(jQuery);
