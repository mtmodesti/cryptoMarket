const zs = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerpolicy && (s.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
};
zs();
function lr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const Us =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ds = lr(Us);
function Eo(e) {
  return !!e || e === "";
}
function cr(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = ae(r) ? Ws(r) : cr(r);
      if (o) for (const s in o) t[s] = o[s];
    }
    return t;
  } else {
    if (ae(e)) return e;
    if (le(e)) return e;
  }
}
const Ks = /;(?![^(]*\))/g,
  qs = /:(.+)/;
function Ws(e) {
  const t = {};
  return (
    e.split(Ks).forEach((n) => {
      if (n) {
        const r = n.split(qs);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function gn(e) {
  let t = "";
  if (ae(e)) t = e;
  else if (L(e))
    for (let n = 0; n < e.length; n++) {
      const r = gn(e[n]);
      r && (t += r + " ");
    }
  else if (le(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Ae = (e) =>
    ae(e)
      ? e
      : e == null
      ? ""
      : L(e) || (le(e) && (e.toString === Ro || !$(e.toString)))
      ? JSON.stringify(e, Co, 2)
      : String(e),
  Co = (e, t) =>
    t && t.__v_isRef
      ? Co(e, t.value)
      : Et(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : ko(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : le(t) && !L(t) && !Po(t)
      ? String(t)
      : t,
  G = {},
  vt = [],
  Ie = () => {},
  Vs = () => !1,
  Ys = /^on[^a-z]/,
  mn = (e) => Ys.test(e),
  ar = (e) => e.startsWith("onUpdate:"),
  pe = Object.assign,
  ur = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Qs = Object.prototype.hasOwnProperty,
  K = (e, t) => Qs.call(e, t),
  L = Array.isArray,
  Et = (e) => bn(e) === "[object Map]",
  ko = (e) => bn(e) === "[object Set]",
  $ = (e) => typeof e == "function",
  ae = (e) => typeof e == "string",
  fr = (e) => typeof e == "symbol",
  le = (e) => e !== null && typeof e == "object",
  Ao = (e) => le(e) && $(e.then) && $(e.catch),
  Ro = Object.prototype.toString,
  bn = (e) => Ro.call(e),
  Js = (e) => bn(e).slice(8, -1),
  Po = (e) => bn(e) === "[object Object]",
  dr = (e) =>
    ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  nn = lr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  yn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Xs = /-(\w)/g,
  ze = yn((e) => e.replace(Xs, (t, n) => (n ? n.toUpperCase() : ""))),
  Zs = /\B([A-Z])/g,
  Pt = yn((e) => e.replace(Zs, "-$1").toLowerCase()),
  wn = yn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Tn = yn((e) => (e ? `on${wn(e)}` : "")),
  Ut = (e, t) => !Object.is(e, t),
  rn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  an = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Hn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Or;
const Gs = () =>
  Or ||
  (Or =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let $e;
class ei {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        $e &&
        ((this.parent = $e),
        (this.index = ($e.scopes || ($e.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active) {
      const n = $e;
      try {
        return ($e = this), t();
      } finally {
        $e = n;
      }
    }
  }
  on() {
    $e = this;
  }
  off() {
    $e = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      this.active = !1;
    }
  }
}
function ti(e, t = $e) {
  t && t.active && t.effects.push(e);
}
const hr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  So = (e) => (e.w & ot) > 0,
  Oo = (e) => (e.n & ot) > 0,
  ni = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ot;
  },
  ri = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        So(o) && !Oo(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~ot),
          (o.n &= ~ot);
      }
      t.length = n;
    }
  },
  Bn = new WeakMap();
let Ft = 0,
  ot = 1;
const zn = 30;
let Te;
const dt = Symbol(""),
  Un = Symbol("");
class pr {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      ti(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Te,
      n = tt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Te),
        (Te = this),
        (tt = !0),
        (ot = 1 << ++Ft),
        Ft <= zn ? ni(this) : Tr(this),
        this.fn()
      );
    } finally {
      Ft <= zn && ri(this),
        (ot = 1 << --Ft),
        (Te = this.parent),
        (tt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Te === this
      ? (this.deferStop = !0)
      : this.active &&
        (Tr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Tr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let tt = !0;
const To = [];
function St() {
  To.push(tt), (tt = !1);
}
function Ot() {
  const e = To.pop();
  tt = e === void 0 ? !0 : e;
}
function Ee(e, t, n) {
  if (tt && Te) {
    let r = Bn.get(e);
    r || Bn.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = hr())), Mo(o);
  }
}
function Mo(e, t) {
  let n = !1;
  Ft <= zn ? Oo(e) || ((e.n |= ot), (n = !So(e))) : (n = !e.has(Te)),
    n && (e.add(Te), Te.deps.push(e));
}
function qe(e, t, n, r, o, s) {
  const i = Bn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && L(e))
    i.forEach((c, u) => {
      (u === "length" || u >= r) && l.push(c);
    });
  else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        L(e)
          ? dr(n) && l.push(i.get("length"))
          : (l.push(i.get(dt)), Et(e) && l.push(i.get(Un)));
        break;
      case "delete":
        L(e) || (l.push(i.get(dt)), Et(e) && l.push(i.get(Un)));
        break;
      case "set":
        Et(e) && l.push(i.get(dt));
        break;
    }
  if (l.length === 1) l[0] && Dn(l[0]);
  else {
    const c = [];
    for (const u of l) u && c.push(...u);
    Dn(hr(c));
  }
}
function Dn(e, t) {
  const n = L(e) ? e : [...e];
  for (const r of n) r.computed && Mr(r);
  for (const r of n) r.computed || Mr(r);
}
function Mr(e, t) {
  (e !== Te || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const oi = lr("__proto__,__v_isRef,__isVue"),
  Io = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(fr)
  ),
  si = gr(),
  ii = gr(!1, !0),
  li = gr(!0),
  Ir = ci();
function ci() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = V(this);
        for (let s = 0, i = this.length; s < i; s++) Ee(r, "get", s + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(V)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        St();
        const r = V(this)[t].apply(this, n);
        return Ot(), r;
      };
    }),
    e
  );
}
function gr(e = !1, t = !1) {
  return function (r, o, s) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && s === (e ? (t ? Ci : $o) : t ? jo : Lo).get(r))
      return r;
    const i = L(r);
    if (!e && i && K(Ir, o)) return Reflect.get(Ir, o, s);
    const l = Reflect.get(r, o, s);
    return (fr(o) ? Io.has(o) : oi(o)) || (e || Ee(r, "get", o), t)
      ? l
      : he(l)
      ? i && dr(o)
        ? l
        : l.value
      : le(l)
      ? e
        ? Ho(l)
        : Qt(l)
      : l;
  };
}
const ai = Fo(),
  ui = Fo(!0);
function Fo(e = !1) {
  return function (n, r, o, s) {
    let i = n[r];
    if (Dt(i) && he(i) && !he(o)) return !1;
    if (
      !e &&
      !Dt(o) &&
      (Kn(o) || ((o = V(o)), (i = V(i))), !L(n) && he(i) && !he(o))
    )
      return (i.value = o), !0;
    const l = L(n) && dr(r) ? Number(r) < n.length : K(n, r),
      c = Reflect.set(n, r, o, s);
    return (
      n === V(s) && (l ? Ut(o, i) && qe(n, "set", r, o) : qe(n, "add", r, o)), c
    );
  };
}
function fi(e, t) {
  const n = K(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && qe(e, "delete", t, void 0), r;
}
function di(e, t) {
  const n = Reflect.has(e, t);
  return (!fr(t) || !Io.has(t)) && Ee(e, "has", t), n;
}
function hi(e) {
  return Ee(e, "iterate", L(e) ? "length" : dt), Reflect.ownKeys(e);
}
const No = { get: si, set: ai, deleteProperty: fi, has: di, ownKeys: hi },
  pi = {
    get: li,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  gi = pe({}, No, { get: ii, set: ui }),
  mr = (e) => e,
  _n = (e) => Reflect.getPrototypeOf(e);
function Xt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = V(e),
    s = V(t);
  n || (t !== s && Ee(o, "get", t), Ee(o, "get", s));
  const { has: i } = _n(o),
    l = r ? mr : n ? wr : Kt;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, s)) return l(e.get(s));
  e !== o && e.get(t);
}
function Zt(e, t = !1) {
  const n = this.__v_raw,
    r = V(n),
    o = V(e);
  return (
    t || (e !== o && Ee(r, "has", e), Ee(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function Gt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ee(V(e), "iterate", dt), Reflect.get(e, "size", e)
  );
}
function Fr(e) {
  e = V(e);
  const t = V(this);
  return _n(t).has.call(t, e) || (t.add(e), qe(t, "add", e, e)), this;
}
function Nr(e, t) {
  t = V(t);
  const n = V(this),
    { has: r, get: o } = _n(n);
  let s = r.call(n, e);
  s || ((e = V(e)), (s = r.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), s ? Ut(t, i) && qe(n, "set", e, t) : qe(n, "add", e, t), this
  );
}
function Lr(e) {
  const t = V(this),
    { has: n, get: r } = _n(t);
  let o = n.call(t, e);
  o || ((e = V(e)), (o = n.call(t, e))), r && r.call(t, e);
  const s = t.delete(e);
  return o && qe(t, "delete", e, void 0), s;
}
function jr() {
  const e = V(this),
    t = e.size !== 0,
    n = e.clear();
  return t && qe(e, "clear", void 0, void 0), n;
}
function en(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      l = V(i),
      c = t ? mr : e ? wr : Kt;
    return (
      !e && Ee(l, "iterate", dt), i.forEach((u, f) => r.call(o, c(u), c(f), s))
    );
  };
}
function tn(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = V(o),
      i = Et(s),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      u = o[e](...r),
      f = n ? mr : t ? wr : Kt;
    return (
      !t && Ee(s, "iterate", c ? Un : dt),
      {
        next() {
          const { value: p, done: h } = u.next();
          return h
            ? { value: p, done: h }
            : { value: l ? [f(p[0]), f(p[1])] : f(p), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ye(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function mi() {
  const e = {
      get(s) {
        return Xt(this, s);
      },
      get size() {
        return Gt(this);
      },
      has: Zt,
      add: Fr,
      set: Nr,
      delete: Lr,
      clear: jr,
      forEach: en(!1, !1),
    },
    t = {
      get(s) {
        return Xt(this, s, !1, !0);
      },
      get size() {
        return Gt(this);
      },
      has: Zt,
      add: Fr,
      set: Nr,
      delete: Lr,
      clear: jr,
      forEach: en(!1, !0),
    },
    n = {
      get(s) {
        return Xt(this, s, !0);
      },
      get size() {
        return Gt(this, !0);
      },
      has(s) {
        return Zt.call(this, s, !0);
      },
      add: Ye("add"),
      set: Ye("set"),
      delete: Ye("delete"),
      clear: Ye("clear"),
      forEach: en(!0, !1),
    },
    r = {
      get(s) {
        return Xt(this, s, !0, !0);
      },
      get size() {
        return Gt(this, !0);
      },
      has(s) {
        return Zt.call(this, s, !0);
      },
      add: Ye("add"),
      set: Ye("set"),
      delete: Ye("delete"),
      clear: Ye("clear"),
      forEach: en(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (e[s] = tn(s, !1, !1)),
        (n[s] = tn(s, !0, !1)),
        (t[s] = tn(s, !1, !0)),
        (r[s] = tn(s, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [bi, yi, wi, _i] = mi();
function br(e, t) {
  const n = t ? (e ? _i : wi) : e ? yi : bi;
  return (r, o, s) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(K(n, o) && o in r ? n : r, o, s);
}
const xi = { get: br(!1, !1) },
  vi = { get: br(!1, !0) },
  Ei = { get: br(!0, !1) },
  Lo = new WeakMap(),
  jo = new WeakMap(),
  $o = new WeakMap(),
  Ci = new WeakMap();
function ki(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ai(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ki(Js(e));
}
function Qt(e) {
  return Dt(e) ? e : yr(e, !1, No, xi, Lo);
}
function Ri(e) {
  return yr(e, !1, gi, vi, jo);
}
function Ho(e) {
  return yr(e, !0, pi, Ei, $o);
}
function yr(e, t, n, r, o) {
  if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const s = o.get(e);
  if (s) return s;
  const i = Ai(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return o.set(e, l), l;
}
function Ct(e) {
  return Dt(e) ? Ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Dt(e) {
  return !!(e && e.__v_isReadonly);
}
function Kn(e) {
  return !!(e && e.__v_isShallow);
}
function Bo(e) {
  return Ct(e) || Dt(e);
}
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function zo(e) {
  return an(e, "__v_skip", !0), e;
}
const Kt = (e) => (le(e) ? Qt(e) : e),
  wr = (e) => (le(e) ? Ho(e) : e);
function Uo(e) {
  tt && Te && ((e = V(e)), Mo(e.dep || (e.dep = hr())));
}
function Do(e, t) {
  (e = V(e)), e.dep && Dn(e.dep);
}
function he(e) {
  return !!(e && e.__v_isRef === !0);
}
function qn(e) {
  return Ko(e, !1);
}
function Pi(e) {
  return Ko(e, !0);
}
function Ko(e, t) {
  return he(e) ? e : new Si(e, t);
}
class Si {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : V(t)),
      (this._value = n ? t : Kt(t));
  }
  get value() {
    return Uo(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : V(t)),
      Ut(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : Kt(t)),
        Do(this));
  }
}
function Lt(e) {
  return he(e) ? e.value : e;
}
const Oi = {
  get: (e, t, n) => Lt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return he(o) && !he(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function qo(e) {
  return Ct(e) ? e : new Proxy(e, Oi);
}
class Ti {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new pr(t, () => {
        this._dirty || ((this._dirty = !0), Do(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = V(this);
    return (
      Uo(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Mi(e, t, n = !1) {
  let r, o;
  const s = $(e);
  return (
    s ? ((r = e), (o = Ie)) : ((r = e.get), (o = e.set)),
    new Ti(r, o, s || !o, n)
  );
}
function nt(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    xn(s, t, n);
  }
  return o;
}
function Pe(e, t, n, r) {
  if ($(e)) {
    const s = nt(e, t, n, r);
    return (
      s &&
        Ao(s) &&
        s.catch((i) => {
          xn(i, t, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < e.length; s++) o.push(Pe(e[s], t, n, r));
  return o;
}
function xn(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy,
      l = n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let f = 0; f < u.length; f++) if (u[f](e, i, l) === !1) return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      nt(c, null, 10, [e, i, l]);
      return;
    }
  }
  Ii(e, n, o, r);
}
function Ii(e, t, n, r = !0) {
  console.error(e);
}
let un = !1,
  Wn = !1;
const ve = [];
let De = 0;
const jt = [];
let Nt = null,
  yt = 0;
const $t = [];
let Xe = null,
  wt = 0;
const Wo = Promise.resolve();
let _r = null,
  Vn = null;
function Vo(e) {
  const t = _r || Wo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fi(e) {
  let t = De + 1,
    n = ve.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    qt(ve[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Yo(e) {
  (!ve.length || !ve.includes(e, un && e.allowRecurse ? De + 1 : De)) &&
    e !== Vn &&
    (e.id == null ? ve.push(e) : ve.splice(Fi(e.id), 0, e), Qo());
}
function Qo() {
  !un && !Wn && ((Wn = !0), (_r = Wo.then(Zo)));
}
function Ni(e) {
  const t = ve.indexOf(e);
  t > De && ve.splice(t, 1);
}
function Jo(e, t, n, r) {
  L(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    Qo();
}
function Li(e) {
  Jo(e, Nt, jt, yt);
}
function ji(e) {
  Jo(e, Xe, $t, wt);
}
function vn(e, t = null) {
  if (jt.length) {
    for (
      Vn = t, Nt = [...new Set(jt)], jt.length = 0, yt = 0;
      yt < Nt.length;
      yt++
    )
      Nt[yt]();
    (Nt = null), (yt = 0), (Vn = null), vn(e, t);
  }
}
function Xo(e) {
  if ((vn(), $t.length)) {
    const t = [...new Set($t)];
    if ((($t.length = 0), Xe)) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, Xe.sort((n, r) => qt(n) - qt(r)), wt = 0; wt < Xe.length; wt++)
      Xe[wt]();
    (Xe = null), (wt = 0);
  }
}
const qt = (e) => (e.id == null ? 1 / 0 : e.id);
function Zo(e) {
  (Wn = !1), (un = !0), vn(e), ve.sort((n, r) => qt(n) - qt(r));
  const t = Ie;
  try {
    for (De = 0; De < ve.length; De++) {
      const n = ve[De];
      n && n.active !== !1 && nt(n, null, 14);
    }
  } finally {
    (De = 0),
      (ve.length = 0),
      Xo(),
      (un = !1),
      (_r = null),
      (ve.length || jt.length || $t.length) && Zo(e);
  }
}
function $i(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || G;
  let o = n;
  const s = t.startsWith("update:"),
    i = s && t.slice(7);
  if (i && i in r) {
    const f = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: p, trim: h } = r[f] || G;
    h && (o = n.map((_) => _.trim())), p && (o = n.map(Hn));
  }
  let l,
    c = r[(l = Tn(t))] || r[(l = Tn(ze(t)))];
  !c && s && (c = r[(l = Tn(Pt(t)))]), c && Pe(c, e, 6, o);
  const u = r[l + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Pe(u, e, 6, o);
  }
}
function Go(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const s = e.emits;
  let i = {},
    l = !1;
  if (!$(e)) {
    const c = (u) => {
      const f = Go(u, t, !0);
      f && ((l = !0), pe(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !s && !l
    ? (r.set(e, null), null)
    : (L(s) ? s.forEach((c) => (i[c] = null)) : pe(i, s), r.set(e, i), i);
}
function En(e, t) {
  return !e || !mn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      K(e, t[0].toLowerCase() + t.slice(1)) || K(e, Pt(t)) || K(e, t));
}
let Re = null,
  Cn = null;
function fn(e) {
  const t = Re;
  return (Re = e), (Cn = (e && e.type.__scopeId) || null), t;
}
function es(e) {
  Cn = e;
}
function ts() {
  Cn = null;
}
function Hi(e, t = Re, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Qr(-1);
    const s = fn(t),
      i = e(...o);
    return fn(s), r._d && Qr(1), i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Mn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: u,
    render: f,
    renderCache: p,
    data: h,
    setupState: _,
    ctx: A,
    inheritAttrs: M,
  } = e;
  let P, R;
  const j = fn(e);
  try {
    if (n.shapeFlag & 4) {
      const W = o || r;
      (P = He(f.call(W, W, p, s, _, h, A))), (R = c);
    } else {
      const W = t;
      (P = He(
        W.length > 1 ? W(s, { attrs: c, slots: l, emit: u }) : W(s, null)
      )),
        (R = t.props ? c : Bi(c));
    }
  } catch (W) {
    (Ht.length = 0), xn(W, e, 1), (P = be(Fe));
  }
  let D = P;
  if (R && M !== !1) {
    const W = Object.keys(R),
      { shapeFlag: se } = D;
    W.length && se & 7 && (i && W.some(ar) && (R = zi(R, i)), (D = st(D, R)));
  }
  return (
    n.dirs && ((D = st(D)), (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (D.transition = n.transition),
    (P = D),
    fn(j),
    P
  );
}
const Bi = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || mn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  zi = (e, t) => {
    const n = {};
    for (const r in e) (!ar(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Ui(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: l, patchFlag: c } = t,
    u = s.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? $r(r, i, u) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const h = f[p];
        if (i[h] !== r[h] && !En(u, h)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? $r(r, i, u)
        : !0
      : !!i;
  return !1;
}
function $r(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (t[s] !== e[s] && !En(n, s)) return !0;
  }
  return !1;
}
function Di({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ki = (e) => e.__isSuspense;
function qi(e, t) {
  t && t.pendingBranch
    ? L(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ji(e);
}
function on(e, t) {
  if (ce) {
    let n = ce.provides;
    const r = ce.parent && ce.parent.provides;
    r === n && (n = ce.provides = Object.create(r)), (n[e] = t);
  }
}
function rt(e, t, n = !1) {
  const r = ce || Re;
  if (r) {
    const o =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && $(t) ? t.call(r.proxy) : t;
  }
}
const Hr = {};
function sn(e, t, n) {
  return ns(e, t, n);
}
function ns(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = G
) {
  const l = ce;
  let c,
    u = !1,
    f = !1;
  if (
    (he(e)
      ? ((c = () => e.value), (u = Kn(e)))
      : Ct(e)
      ? ((c = () => e), (r = !0))
      : L(e)
      ? ((f = !0),
        (u = e.some((R) => Ct(R) || Kn(R))),
        (c = () =>
          e.map((R) => {
            if (he(R)) return R.value;
            if (Ct(R)) return ft(R);
            if ($(R)) return nt(R, l, 2);
          })))
      : $(e)
      ? t
        ? (c = () => nt(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return p && p(), Pe(e, l, 3, [h]);
          })
      : (c = Ie),
    t && r)
  ) {
    const R = c;
    c = () => ft(R());
  }
  let p,
    h = (R) => {
      p = P.onStop = () => {
        nt(R, l, 4);
      };
    };
  if (Vt)
    return (h = Ie), t ? n && Pe(t, l, 3, [c(), f ? [] : void 0, h]) : c(), Ie;
  let _ = f ? [] : Hr;
  const A = () => {
    if (!!P.active)
      if (t) {
        const R = P.run();
        (r || u || (f ? R.some((j, D) => Ut(j, _[D])) : Ut(R, _))) &&
          (p && p(), Pe(t, l, 3, [R, _ === Hr ? void 0 : _, h]), (_ = R));
      } else P.run();
  };
  A.allowRecurse = !!t;
  let M;
  o === "sync"
    ? (M = A)
    : o === "post"
    ? (M = () => me(A, l && l.suspense))
    : (M = () => Li(A));
  const P = new pr(c, M);
  return (
    t
      ? n
        ? A()
        : (_ = P.run())
      : o === "post"
      ? me(P.run.bind(P), l && l.suspense)
      : P.run(),
    () => {
      P.stop(), l && l.scope && ur(l.scope.effects, P);
    }
  );
}
function Wi(e, t, n) {
  const r = this.proxy,
    o = ae(e) ? (e.includes(".") ? rs(r, e) : () => r[e]) : e.bind(r, r);
  let s;
  $(t) ? (s = t) : ((s = t.handler), (n = t));
  const i = ce;
  kt(this);
  const l = ns(o, s.bind(r), n);
  return i ? kt(i) : ht(), l;
}
function rs(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function ft(e, t) {
  if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), he(e))) ft(e.value, t);
  else if (L(e)) for (let n = 0; n < e.length; n++) ft(e[n], t);
  else if (ko(e) || Et(e))
    e.forEach((n) => {
      ft(n, t);
    });
  else if (Po(e)) for (const n in e) ft(e[n], t);
  return e;
}
function Vi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    cs(() => {
      e.isMounted = !0;
    }),
    as(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ke = [Function, Array],
  Yi = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: ke,
      onEnter: ke,
      onAfterEnter: ke,
      onEnterCancelled: ke,
      onBeforeLeave: ke,
      onLeave: ke,
      onAfterLeave: ke,
      onLeaveCancelled: ke,
      onBeforeAppear: ke,
      onAppear: ke,
      onAfterAppear: ke,
      onAppearCancelled: ke,
    },
    setup(e, { slots: t }) {
      const n = Ll(),
        r = Vi();
      let o;
      return () => {
        const s = t.default && ss(t.default(), !0);
        if (!s || !s.length) return;
        let i = s[0];
        if (s.length > 1) {
          for (const M of s)
            if (M.type !== Fe) {
              i = M;
              break;
            }
        }
        const l = V(e),
          { mode: c } = l;
        if (r.isLeaving) return In(i);
        const u = Br(i);
        if (!u) return In(i);
        const f = Yn(u, l, r, n);
        Qn(u, f);
        const p = n.subTree,
          h = p && Br(p);
        let _ = !1;
        const { getTransitionKey: A } = u.type;
        if (A) {
          const M = A();
          o === void 0 ? (o = M) : M !== o && ((o = M), (_ = !0));
        }
        if (h && h.type !== Fe && (!at(u, h) || _)) {
          const M = Yn(h, l, r, n);
          if ((Qn(h, M), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (M.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              In(i)
            );
          c === "in-out" &&
            u.type !== Fe &&
            (M.delayLeave = (P, R, j) => {
              const D = os(r, h);
              (D[String(h.key)] = h),
                (P._leaveCb = () => {
                  R(), (P._leaveCb = void 0), delete f.delayedLeave;
                }),
                (f.delayedLeave = j);
            });
        }
        return i;
      };
    },
  },
  Qi = Yi;
function os(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Yn(e, t, n, r) {
  const {
      appear: o,
      mode: s,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: f,
      onBeforeLeave: p,
      onLeave: h,
      onAfterLeave: _,
      onLeaveCancelled: A,
      onBeforeAppear: M,
      onAppear: P,
      onAfterAppear: R,
      onAppearCancelled: j,
    } = t,
    D = String(e.key),
    W = os(n, e),
    se = (z, ne) => {
      z && Pe(z, r, 9, ne);
    },
    de = (z, ne) => {
      const oe = ne[1];
      se(z, ne),
        L(z) ? z.every((ue) => ue.length <= 1) && oe() : z.length <= 1 && oe();
    },
    ye = {
      mode: s,
      persisted: i,
      beforeEnter(z) {
        let ne = l;
        if (!n.isMounted)
          if (o) ne = M || l;
          else return;
        z._leaveCb && z._leaveCb(!0);
        const oe = W[D];
        oe && at(e, oe) && oe.el._leaveCb && oe.el._leaveCb(), se(ne, [z]);
      },
      enter(z) {
        let ne = c,
          oe = u,
          ue = f;
        if (!n.isMounted)
          if (o) (ne = P || c), (oe = R || u), (ue = j || f);
          else return;
        let fe = !1;
        const Se = (z._enterCb = (Ve) => {
          fe ||
            ((fe = !0),
            Ve ? se(ue, [z]) : se(oe, [z]),
            ye.delayedLeave && ye.delayedLeave(),
            (z._enterCb = void 0));
        });
        ne ? de(ne, [z, Se]) : Se();
      },
      leave(z, ne) {
        const oe = String(e.key);
        if ((z._enterCb && z._enterCb(!0), n.isUnmounting)) return ne();
        se(p, [z]);
        let ue = !1;
        const fe = (z._leaveCb = (Se) => {
          ue ||
            ((ue = !0),
            ne(),
            Se ? se(A, [z]) : se(_, [z]),
            (z._leaveCb = void 0),
            W[oe] === e && delete W[oe]);
        });
        (W[oe] = e), h ? de(h, [z, fe]) : fe();
      },
      clone(z) {
        return Yn(z, t, n, r);
      },
    };
  return ye;
}
function In(e) {
  if (kn(e)) return (e = st(e)), (e.children = null), e;
}
function Br(e) {
  return kn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Qn(e, t) {
  e.shapeFlag & 6 && e.component
    ? Qn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function ss(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let s = 0; s < e.length; s++) {
    let i = e[s];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === xe
      ? (i.patchFlag & 128 && o++, (r = r.concat(ss(i.children, t, l))))
      : (t || i.type !== Fe) && r.push(l != null ? st(i, { key: l }) : i);
  }
  if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function is(e) {
  return $(e) ? { setup: e, name: e.name } : e;
}
const ln = (e) => !!e.type.__asyncLoader,
  kn = (e) => e.type.__isKeepAlive;
function Ji(e, t) {
  ls(e, "a", t);
}
function Xi(e, t) {
  ls(e, "da", t);
}
function ls(e, t, n = ce) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((An(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      kn(o.parent.vnode) && Zi(r, t, n, o), (o = o.parent);
  }
}
function Zi(e, t, n, r) {
  const o = An(t, e, r, !0);
  us(() => {
    ur(r[t], o);
  }, n);
}
function An(e, t, n = ce, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          St(), kt(n);
          const l = Pe(t, n, e, i);
          return ht(), Ot(), l;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const We =
    (e) =>
    (t, n = ce) =>
      (!Vt || e === "sp") && An(e, t, n),
  Gi = We("bm"),
  cs = We("m"),
  el = We("bu"),
  tl = We("u"),
  as = We("bum"),
  us = We("um"),
  nl = We("sp"),
  rl = We("rtg"),
  ol = We("rtc");
function sl(e, t = ce) {
  An("ec", e, t);
}
function il(e, t) {
  const n = Re;
  if (n === null) return e;
  const r = Pn(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, c, u = G] = t[s];
    $(i) && (i = { mounted: i, updated: i }),
      i.deep && ft(l),
      o.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: u,
      });
  }
  return e;
}
function it(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    s && (l.oldValue = s[i].value);
    let c = l.dir[r];
    c && (St(), Pe(c, n, 8, [e.el, l, e, t]), Ot());
  }
}
const fs = "components";
function ll(e, t) {
  return al(fs, e, !0, t) || e;
}
const cl = Symbol();
function al(e, t, n = !0, r = !1) {
  const o = Re || ce;
  if (o) {
    const s = o.type;
    if (e === fs) {
      const l = zl(s, !1);
      if (l && (l === t || l === ze(t) || l === wn(ze(t)))) return s;
    }
    const i = zr(o[e] || s[e], t) || zr(o.appContext[e], t);
    return !i && r ? s : i;
  }
}
function zr(e, t) {
  return e && (e[t] || e[ze(t)] || e[wn(ze(t))]);
}
function Ur(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (L(e) || ae(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (le(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, l) => t(i, l, void 0, s && s[l]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const u = i[l];
        o[l] = t(e[u], u, l, s && s[l]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
const Jn = (e) => (e ? (Es(e) ? Pn(e) || e.proxy : Jn(e.parent)) : null),
  dn = pe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Jn(e.parent),
    $root: (e) => Jn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => hs(e),
    $forceUpdate: (e) => e.f || (e.f = () => Yo(e.update)),
    $nextTick: (e) => e.n || (e.n = Vo.bind(e.proxy)),
    $watch: (e) => Wi.bind(e),
  }),
  ul = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let u;
      if (t[0] !== "$") {
        const _ = i[t];
        if (_ !== void 0)
          switch (_) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return s[t];
          }
        else {
          if (r !== G && K(r, t)) return (i[t] = 1), r[t];
          if (o !== G && K(o, t)) return (i[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && K(u, t)) return (i[t] = 3), s[t];
          if (n !== G && K(n, t)) return (i[t] = 4), n[t];
          Xn && (i[t] = 0);
        }
      }
      const f = dn[t];
      let p, h;
      if (f) return t === "$attrs" && Ee(e, "get", t), f(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== G && K(n, t)) return (i[t] = 4), n[t];
      if (((h = c.config.globalProperties), K(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e;
      return o !== G && K(o, t)
        ? ((o[t] = n), !0)
        : r !== G && K(r, t)
        ? ((r[t] = n), !0)
        : K(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((s[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== G && K(e, i)) ||
        (t !== G && K(t, i)) ||
        ((l = s[0]) && K(l, i)) ||
        K(r, i) ||
        K(dn, i) ||
        K(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : K(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Xn = !0;
function fl(e) {
  const t = hs(e),
    n = e.proxy,
    r = e.ctx;
  (Xn = !1), t.beforeCreate && Dr(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: s,
    methods: i,
    watch: l,
    provide: c,
    inject: u,
    created: f,
    beforeMount: p,
    mounted: h,
    beforeUpdate: _,
    updated: A,
    activated: M,
    deactivated: P,
    beforeDestroy: R,
    beforeUnmount: j,
    destroyed: D,
    unmounted: W,
    render: se,
    renderTracked: de,
    renderTriggered: ye,
    errorCaptured: z,
    serverPrefetch: ne,
    expose: oe,
    inheritAttrs: ue,
    components: fe,
    directives: Se,
    filters: Ve,
  } = t;
  if ((u && dl(u, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const ee in i) {
      const Y = i[ee];
      $(Y) && (r[ee] = Y.bind(n));
    }
  if (o) {
    const ee = o.call(n, n);
    le(ee) && (e.data = Qt(ee));
  }
  if (((Xn = !0), s))
    for (const ee in s) {
      const Y = s[ee],
        we = $(Y) ? Y.bind(n, n) : $(Y.get) ? Y.get.bind(n, n) : Ie,
        gt = !$(Y) && $(Y.set) ? Y.set.bind(n) : Ie,
        Ue = Be({ get: we, set: gt });
      Object.defineProperty(r, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => Ue.value,
        set: (Ne) => (Ue.value = Ne),
      });
    }
  if (l) for (const ee in l) ds(l[ee], r, n, ee);
  if (c) {
    const ee = $(c) ? c.call(n) : c;
    Reflect.ownKeys(ee).forEach((Y) => {
      on(Y, ee[Y]);
    });
  }
  f && Dr(f, e, "c");
  function ie(ee, Y) {
    L(Y) ? Y.forEach((we) => ee(we.bind(n))) : Y && ee(Y.bind(n));
  }
  if (
    (ie(Gi, p),
    ie(cs, h),
    ie(el, _),
    ie(tl, A),
    ie(Ji, M),
    ie(Xi, P),
    ie(sl, z),
    ie(ol, de),
    ie(rl, ye),
    ie(as, j),
    ie(us, W),
    ie(nl, ne),
    L(oe))
  )
    if (oe.length) {
      const ee = e.exposed || (e.exposed = {});
      oe.forEach((Y) => {
        Object.defineProperty(ee, Y, {
          get: () => n[Y],
          set: (we) => (n[Y] = we),
        });
      });
    } else e.exposed || (e.exposed = {});
  se && e.render === Ie && (e.render = se),
    ue != null && (e.inheritAttrs = ue),
    fe && (e.components = fe),
    Se && (e.directives = Se);
}
function dl(e, t, n = Ie, r = !1) {
  L(e) && (e = Zn(e));
  for (const o in e) {
    const s = e[o];
    let i;
    le(s)
      ? "default" in s
        ? (i = rt(s.from || o, s.default, !0))
        : (i = rt(s.from || o))
      : (i = rt(s)),
      he(i) && r
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[o] = i);
  }
}
function Dr(e, t, n) {
  Pe(L(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ds(e, t, n, r) {
  const o = r.includes(".") ? rs(n, r) : () => n[r];
  if (ae(e)) {
    const s = t[e];
    $(s) && sn(o, s);
  } else if ($(e)) sn(o, e.bind(n));
  else if (le(e))
    if (L(e)) e.forEach((s) => ds(s, t, n, r));
    else {
      const s = $(e.handler) ? e.handler.bind(n) : t[e.handler];
      $(s) && sn(o, s, e);
    }
}
function hs(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = s.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !o.length && !n && !r
      ? (c = t)
      : ((c = {}), o.length && o.forEach((u) => hn(c, u, i, !0)), hn(c, t, i)),
    s.set(t, c),
    c
  );
}
function hn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && hn(e, s, n, !0), o && o.forEach((i) => hn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = hl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const hl = {
  data: Kr,
  props: ct,
  emits: ct,
  methods: ct,
  computed: ct,
  beforeCreate: ge,
  created: ge,
  beforeMount: ge,
  mounted: ge,
  beforeUpdate: ge,
  updated: ge,
  beforeDestroy: ge,
  beforeUnmount: ge,
  destroyed: ge,
  unmounted: ge,
  activated: ge,
  deactivated: ge,
  errorCaptured: ge,
  serverPrefetch: ge,
  components: ct,
  directives: ct,
  watch: gl,
  provide: Kr,
  inject: pl,
};
function Kr(e, t) {
  return t
    ? e
      ? function () {
          return pe(
            $(e) ? e.call(this, this) : e,
            $(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function pl(e, t) {
  return ct(Zn(e), Zn(t));
}
function Zn(e) {
  if (L(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ge(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ct(e, t) {
  return e ? pe(pe(Object.create(null), e), t) : t;
}
function gl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = pe(Object.create(null), e);
  for (const r in t) n[r] = ge(e[r], t[r]);
  return n;
}
function ml(e, t, n, r = !1) {
  const o = {},
    s = {};
  an(s, Rn, 1), (e.propsDefaults = Object.create(null)), ps(e, t, o, s);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = r ? o : Ri(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s);
}
function bl(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i },
    } = e,
    l = V(o),
    [c] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let h = f[p];
        if (En(e.emitsOptions, h)) continue;
        const _ = t[h];
        if (c)
          if (K(s, h)) _ !== s[h] && ((s[h] = _), (u = !0));
          else {
            const A = ze(h);
            o[A] = Gn(c, l, A, _, e, !1);
          }
        else _ !== s[h] && ((s[h] = _), (u = !0));
      }
    }
  } else {
    ps(e, t, o, s) && (u = !0);
    let f;
    for (const p in l)
      (!t || (!K(t, p) && ((f = Pt(p)) === p || !K(t, f)))) &&
        (c
          ? n &&
            (n[p] !== void 0 || n[f] !== void 0) &&
            (o[p] = Gn(c, l, p, void 0, e, !0))
          : delete o[p]);
    if (s !== l)
      for (const p in s) (!t || (!K(t, p) && !0)) && (delete s[p], (u = !0));
  }
  u && qe(e, "set", "$attrs");
}
function ps(e, t, n, r) {
  const [o, s] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (nn(c)) continue;
      const u = t[c];
      let f;
      o && K(o, (f = ze(c)))
        ? !s || !s.includes(f)
          ? (n[f] = u)
          : ((l || (l = {}))[f] = u)
        : En(e.emitsOptions, c) ||
          ((!(c in r) || u !== r[c]) && ((r[c] = u), (i = !0)));
    }
  if (s) {
    const c = V(n),
      u = l || G;
    for (let f = 0; f < s.length; f++) {
      const p = s[f];
      n[p] = Gn(o, c, p, u[p], e, !K(u, p));
    }
  }
  return i;
}
function Gn(e, t, n, r, o, s) {
  const i = e[n];
  if (i != null) {
    const l = K(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && $(c)) {
        const { propsDefaults: u } = o;
        n in u ? (r = u[n]) : (kt(o), (r = u[n] = c.call(null, t)), ht());
      } else r = c;
    }
    i[0] &&
      (s && !l ? (r = !1) : i[1] && (r === "" || r === Pt(n)) && (r = !0));
  }
  return r;
}
function gs(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const s = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!$(e)) {
    const f = (p) => {
      c = !0;
      const [h, _] = gs(p, t, !0);
      pe(i, h), _ && l.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!s && !c) return r.set(e, vt), vt;
  if (L(s))
    for (let f = 0; f < s.length; f++) {
      const p = ze(s[f]);
      qr(p) && (i[p] = G);
    }
  else if (s)
    for (const f in s) {
      const p = ze(f);
      if (qr(p)) {
        const h = s[f],
          _ = (i[p] = L(h) || $(h) ? { type: h } : h);
        if (_) {
          const A = Yr(Boolean, _.type),
            M = Yr(String, _.type);
          (_[0] = A > -1),
            (_[1] = M < 0 || A < M),
            (A > -1 || K(_, "default")) && l.push(p);
        }
      }
    }
  const u = [i, l];
  return r.set(e, u), u;
}
function qr(e) {
  return e[0] !== "$";
}
function Wr(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Vr(e, t) {
  return Wr(e) === Wr(t);
}
function Yr(e, t) {
  return L(t) ? t.findIndex((n) => Vr(n, e)) : $(t) && Vr(t, e) ? 0 : -1;
}
const ms = (e) => e[0] === "_" || e === "$stable",
  xr = (e) => (L(e) ? e.map(He) : [He(e)]),
  yl = (e, t, n) => {
    if (t._n) return t;
    const r = Hi((...o) => xr(t(...o)), n);
    return (r._c = !1), r;
  },
  bs = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (ms(o)) continue;
      const s = e[o];
      if ($(s)) t[o] = yl(o, s, r);
      else if (s != null) {
        const i = xr(s);
        t[o] = () => i;
      }
    }
  },
  ys = (e, t) => {
    const n = xr(t);
    e.slots.default = () => n;
  },
  wl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = V(t)), an(t, "_", n)) : bs(t, (e.slots = {}));
    } else (e.slots = {}), t && ys(e, t);
    an(e.slots, Rn, 1);
  },
  _l = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let s = !0,
      i = G;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (s = !1)
          : (pe(o, t), !n && l === 1 && delete o._)
        : ((s = !t.$stable), bs(t, o)),
        (i = t);
    } else t && (ys(e, t), (i = { default: 1 }));
    if (s) for (const l in o) !ms(l) && !(l in i) && delete o[l];
  };
function ws() {
  return {
    app: null,
    config: {
      isNativeTag: Vs,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let xl = 0;
function vl(e, t) {
  return function (r, o = null) {
    $(r) || (r = Object.assign({}, r)), o != null && !le(o) && (o = null);
    const s = ws(),
      i = new Set();
    let l = !1;
    const c = (s.app = {
      _uid: xl++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: Dl,
      get config() {
        return s.config;
      },
      set config(u) {},
      use(u, ...f) {
        return (
          i.has(u) ||
            (u && $(u.install)
              ? (i.add(u), u.install(c, ...f))
              : $(u) && (i.add(u), u(c, ...f))),
          c
        );
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), c;
      },
      component(u, f) {
        return f ? ((s.components[u] = f), c) : s.components[u];
      },
      directive(u, f) {
        return f ? ((s.directives[u] = f), c) : s.directives[u];
      },
      mount(u, f, p) {
        if (!l) {
          const h = be(r, o);
          return (
            (h.appContext = s),
            f && t ? t(h, u) : e(h, u, p),
            (l = !0),
            (c._container = u),
            (u.__vue_app__ = c),
            Pn(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(u, f) {
        return (s.provides[u] = f), c;
      },
    });
    return c;
  };
}
function er(e, t, n, r, o = !1) {
  if (L(e)) {
    e.forEach((h, _) => er(h, t && (L(t) ? t[_] : t), n, r, o));
    return;
  }
  if (ln(r) && !o) return;
  const s = r.shapeFlag & 4 ? Pn(r.component) || r.component.proxy : r.el,
    i = o ? null : s,
    { i: l, r: c } = e,
    u = t && t.r,
    f = l.refs === G ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (u != null &&
      u !== c &&
      (ae(u)
        ? ((f[u] = null), K(p, u) && (p[u] = null))
        : he(u) && (u.value = null)),
    $(c))
  )
    nt(c, l, 12, [i, f]);
  else {
    const h = ae(c),
      _ = he(c);
    if (h || _) {
      const A = () => {
        if (e.f) {
          const M = h ? f[c] : c.value;
          o
            ? L(M) && ur(M, s)
            : L(M)
            ? M.includes(s) || M.push(s)
            : h
            ? ((f[c] = [s]), K(p, c) && (p[c] = f[c]))
            : ((c.value = [s]), e.k && (f[e.k] = c.value));
        } else
          h
            ? ((f[c] = i), K(p, c) && (p[c] = i))
            : _ && ((c.value = i), e.k && (f[e.k] = i));
      };
      i ? ((A.id = -1), me(A, n)) : A();
    }
  }
}
const me = qi;
function El(e) {
  return Cl(e);
}
function Cl(e, t) {
  const n = Gs();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: l,
      createComment: c,
      setText: u,
      setElementText: f,
      parentNode: p,
      nextSibling: h,
      setScopeId: _ = Ie,
      cloneNode: A,
      insertStaticContent: M,
    } = e,
    P = (
      a,
      d,
      g,
      y = null,
      b = null,
      v = null,
      k = !1,
      x = null,
      E = !!d.dynamicChildren
    ) => {
      if (a === d) return;
      a && !at(a, d) && ((y = T(a)), Ce(a, b, v, !0), (a = null)),
        d.patchFlag === -2 && ((E = !1), (d.dynamicChildren = null));
      const { type: w, ref: I, shapeFlag: S } = d;
      switch (w) {
        case vr:
          R(a, d, g, y);
          break;
        case Fe:
          j(a, d, g, y);
          break;
        case Fn:
          a == null && D(d, g, y, k);
          break;
        case xe:
          Se(a, d, g, y, b, v, k, x, E);
          break;
        default:
          S & 1
            ? de(a, d, g, y, b, v, k, x, E)
            : S & 6
            ? Ve(a, d, g, y, b, v, k, x, E)
            : (S & 64 || S & 128) && w.process(a, d, g, y, b, v, k, x, E, te);
      }
      I != null && b && er(I, a && a.ref, v, d || a, !d);
    },
    R = (a, d, g, y) => {
      if (a == null) r((d.el = l(d.children)), g, y);
      else {
        const b = (d.el = a.el);
        d.children !== a.children && u(b, d.children);
      }
    },
    j = (a, d, g, y) => {
      a == null ? r((d.el = c(d.children || "")), g, y) : (d.el = a.el);
    },
    D = (a, d, g, y) => {
      [a.el, a.anchor] = M(a.children, d, g, y, a.el, a.anchor);
    },
    W = ({ el: a, anchor: d }, g, y) => {
      let b;
      for (; a && a !== d; ) (b = h(a)), r(a, g, y), (a = b);
      r(d, g, y);
    },
    se = ({ el: a, anchor: d }) => {
      let g;
      for (; a && a !== d; ) (g = h(a)), o(a), (a = g);
      o(d);
    },
    de = (a, d, g, y, b, v, k, x, E) => {
      (k = k || d.type === "svg"),
        a == null ? ye(d, g, y, b, v, k, x, E) : oe(a, d, b, v, k, x, E);
    },
    ye = (a, d, g, y, b, v, k, x) => {
      let E, w;
      const {
        type: I,
        props: S,
        shapeFlag: F,
        transition: N,
        patchFlag: q,
        dirs: J,
      } = a;
      if (a.el && A !== void 0 && q === -1) E = a.el = A(a.el);
      else {
        if (
          ((E = a.el = i(a.type, v, S && S.is, S)),
          F & 8
            ? f(E, a.children)
            : F & 16 &&
              ne(a.children, E, null, y, b, v && I !== "foreignObject", k, x),
          J && it(a, null, y, "created"),
          S)
        ) {
          for (const re in S)
            re !== "value" &&
              !nn(re) &&
              s(E, re, null, S[re], v, a.children, y, b, C);
          "value" in S && s(E, "value", null, S.value),
            (w = S.onVnodeBeforeMount) && je(w, y, a);
        }
        z(E, a, a.scopeId, k, y);
      }
      J && it(a, null, y, "beforeMount");
      const X = (!b || (b && !b.pendingBranch)) && N && !N.persisted;
      X && N.beforeEnter(E),
        r(E, d, g),
        ((w = S && S.onVnodeMounted) || X || J) &&
          me(() => {
            w && je(w, y, a), X && N.enter(E), J && it(a, null, y, "mounted");
          }, b);
    },
    z = (a, d, g, y, b) => {
      if ((g && _(a, g), y)) for (let v = 0; v < y.length; v++) _(a, y[v]);
      if (b) {
        let v = b.subTree;
        if (d === v) {
          const k = b.vnode;
          z(a, k, k.scopeId, k.slotScopeIds, b.parent);
        }
      }
    },
    ne = (a, d, g, y, b, v, k, x, E = 0) => {
      for (let w = E; w < a.length; w++) {
        const I = (a[w] = x ? Ze(a[w]) : He(a[w]));
        P(null, I, d, g, y, b, v, k, x);
      }
    },
    oe = (a, d, g, y, b, v, k) => {
      const x = (d.el = a.el);
      let { patchFlag: E, dynamicChildren: w, dirs: I } = d;
      E |= a.patchFlag & 16;
      const S = a.props || G,
        F = d.props || G;
      let N;
      g && lt(g, !1),
        (N = F.onVnodeBeforeUpdate) && je(N, g, d, a),
        I && it(d, a, g, "beforeUpdate"),
        g && lt(g, !0);
      const q = b && d.type !== "foreignObject";
      if (
        (w
          ? ue(a.dynamicChildren, w, x, g, y, q, v)
          : k || we(a, d, x, null, g, y, q, v, !1),
        E > 0)
      ) {
        if (E & 16) fe(x, d, S, F, g, y, b);
        else if (
          (E & 2 && S.class !== F.class && s(x, "class", null, F.class, b),
          E & 4 && s(x, "style", S.style, F.style, b),
          E & 8)
        ) {
          const J = d.dynamicProps;
          for (let X = 0; X < J.length; X++) {
            const re = J[X],
              Oe = S[re],
              mt = F[re];
            (mt !== Oe || re === "value") &&
              s(x, re, Oe, mt, b, a.children, g, y, C);
          }
        }
        E & 1 && a.children !== d.children && f(x, d.children);
      } else !k && w == null && fe(x, d, S, F, g, y, b);
      ((N = F.onVnodeUpdated) || I) &&
        me(() => {
          N && je(N, g, d, a), I && it(d, a, g, "updated");
        }, y);
    },
    ue = (a, d, g, y, b, v, k) => {
      for (let x = 0; x < d.length; x++) {
        const E = a[x],
          w = d[x],
          I =
            E.el && (E.type === xe || !at(E, w) || E.shapeFlag & 70)
              ? p(E.el)
              : g;
        P(E, w, I, null, y, b, v, k, !0);
      }
    },
    fe = (a, d, g, y, b, v, k) => {
      if (g !== y) {
        for (const x in y) {
          if (nn(x)) continue;
          const E = y[x],
            w = g[x];
          E !== w && x !== "value" && s(a, x, w, E, k, d.children, b, v, C);
        }
        if (g !== G)
          for (const x in g)
            !nn(x) && !(x in y) && s(a, x, g[x], null, k, d.children, b, v, C);
        "value" in y && s(a, "value", g.value, y.value);
      }
    },
    Se = (a, d, g, y, b, v, k, x, E) => {
      const w = (d.el = a ? a.el : l("")),
        I = (d.anchor = a ? a.anchor : l(""));
      let { patchFlag: S, dynamicChildren: F, slotScopeIds: N } = d;
      N && (x = x ? x.concat(N) : N),
        a == null
          ? (r(w, g, y), r(I, g, y), ne(d.children, g, I, b, v, k, x, E))
          : S > 0 && S & 64 && F && a.dynamicChildren
          ? (ue(a.dynamicChildren, F, g, b, v, k, x),
            (d.key != null || (b && d === b.subTree)) && _s(a, d, !0))
          : we(a, d, g, I, b, v, k, x, E);
    },
    Ve = (a, d, g, y, b, v, k, x, E) => {
      (d.slotScopeIds = x),
        a == null
          ? d.shapeFlag & 512
            ? b.ctx.activate(d, g, y, k, E)
            : pt(d, g, y, b, v, k, E)
          : ie(a, d, E);
    },
    pt = (a, d, g, y, b, v, k) => {
      const x = (a.component = Nl(a, y, b));
      if ((kn(a) && (x.ctx.renderer = te), jl(x), x.asyncDep)) {
        if ((b && b.registerDep(x, ee), !a.el)) {
          const E = (x.subTree = be(Fe));
          j(null, E, d, g);
        }
        return;
      }
      ee(x, a, d, g, b, v, k);
    },
    ie = (a, d, g) => {
      const y = (d.component = a.component);
      if (Ui(a, d, g))
        if (y.asyncDep && !y.asyncResolved) {
          Y(y, d, g);
          return;
        } else (y.next = d), Ni(y.update), y.update();
      else (d.el = a.el), (y.vnode = d);
    },
    ee = (a, d, g, y, b, v, k) => {
      const x = () => {
          if (a.isMounted) {
            let { next: I, bu: S, u: F, parent: N, vnode: q } = a,
              J = I,
              X;
            lt(a, !1),
              I ? ((I.el = q.el), Y(a, I, k)) : (I = q),
              S && rn(S),
              (X = I.props && I.props.onVnodeBeforeUpdate) && je(X, N, I, q),
              lt(a, !0);
            const re = Mn(a),
              Oe = a.subTree;
            (a.subTree = re),
              P(Oe, re, p(Oe.el), T(Oe), a, b, v),
              (I.el = re.el),
              J === null && Di(a, re.el),
              F && me(F, b),
              (X = I.props && I.props.onVnodeUpdated) &&
                me(() => je(X, N, I, q), b);
          } else {
            let I;
            const { el: S, props: F } = d,
              { bm: N, m: q, parent: J } = a,
              X = ln(d);
            if (
              (lt(a, !1),
              N && rn(N),
              !X && (I = F && F.onVnodeBeforeMount) && je(I, J, d),
              lt(a, !0),
              S && H)
            ) {
              const re = () => {
                (a.subTree = Mn(a)), H(S, a.subTree, a, b, null);
              };
              X
                ? d.type.__asyncLoader().then(() => !a.isUnmounted && re())
                : re();
            } else {
              const re = (a.subTree = Mn(a));
              P(null, re, g, y, a, b, v), (d.el = re.el);
            }
            if ((q && me(q, b), !X && (I = F && F.onVnodeMounted))) {
              const re = d;
              me(() => je(I, J, re), b);
            }
            (d.shapeFlag & 256 ||
              (J && ln(J.vnode) && J.vnode.shapeFlag & 256)) &&
              a.a &&
              me(a.a, b),
              (a.isMounted = !0),
              (d = g = y = null);
          }
        },
        E = (a.effect = new pr(x, () => Yo(w), a.scope)),
        w = (a.update = () => E.run());
      (w.id = a.uid), lt(a, !0), w();
    },
    Y = (a, d, g) => {
      d.component = a;
      const y = a.vnode.props;
      (a.vnode = d),
        (a.next = null),
        bl(a, d.props, y, g),
        _l(a, d.children, g),
        St(),
        vn(void 0, a.update),
        Ot();
    },
    we = (a, d, g, y, b, v, k, x, E = !1) => {
      const w = a && a.children,
        I = a ? a.shapeFlag : 0,
        S = d.children,
        { patchFlag: F, shapeFlag: N } = d;
      if (F > 0) {
        if (F & 128) {
          Ue(w, S, g, y, b, v, k, x, E);
          return;
        } else if (F & 256) {
          gt(w, S, g, y, b, v, k, x, E);
          return;
        }
      }
      N & 8
        ? (I & 16 && C(w, b, v), S !== w && f(g, S))
        : I & 16
        ? N & 16
          ? Ue(w, S, g, y, b, v, k, x, E)
          : C(w, b, v, !0)
        : (I & 8 && f(g, ""), N & 16 && ne(S, g, y, b, v, k, x, E));
    },
    gt = (a, d, g, y, b, v, k, x, E) => {
      (a = a || vt), (d = d || vt);
      const w = a.length,
        I = d.length,
        S = Math.min(w, I);
      let F;
      for (F = 0; F < S; F++) {
        const N = (d[F] = E ? Ze(d[F]) : He(d[F]));
        P(a[F], N, g, null, b, v, k, x, E);
      }
      w > I ? C(a, b, v, !0, !1, S) : ne(d, g, y, b, v, k, x, E, S);
    },
    Ue = (a, d, g, y, b, v, k, x, E) => {
      let w = 0;
      const I = d.length;
      let S = a.length - 1,
        F = I - 1;
      for (; w <= S && w <= F; ) {
        const N = a[w],
          q = (d[w] = E ? Ze(d[w]) : He(d[w]));
        if (at(N, q)) P(N, q, g, null, b, v, k, x, E);
        else break;
        w++;
      }
      for (; w <= S && w <= F; ) {
        const N = a[S],
          q = (d[F] = E ? Ze(d[F]) : He(d[F]));
        if (at(N, q)) P(N, q, g, null, b, v, k, x, E);
        else break;
        S--, F--;
      }
      if (w > S) {
        if (w <= F) {
          const N = F + 1,
            q = N < I ? d[N].el : y;
          for (; w <= F; )
            P(null, (d[w] = E ? Ze(d[w]) : He(d[w])), g, q, b, v, k, x, E), w++;
        }
      } else if (w > F) for (; w <= S; ) Ce(a[w], b, v, !0), w++;
      else {
        const N = w,
          q = w,
          J = new Map();
        for (w = q; w <= F; w++) {
          const _e = (d[w] = E ? Ze(d[w]) : He(d[w]));
          _e.key != null && J.set(_e.key, w);
        }
        let X,
          re = 0;
        const Oe = F - q + 1;
        let mt = !1,
          Rr = 0;
        const Mt = new Array(Oe);
        for (w = 0; w < Oe; w++) Mt[w] = 0;
        for (w = N; w <= S; w++) {
          const _e = a[w];
          if (re >= Oe) {
            Ce(_e, b, v, !0);
            continue;
          }
          let Le;
          if (_e.key != null) Le = J.get(_e.key);
          else
            for (X = q; X <= F; X++)
              if (Mt[X - q] === 0 && at(_e, d[X])) {
                Le = X;
                break;
              }
          Le === void 0
            ? Ce(_e, b, v, !0)
            : ((Mt[Le - q] = w + 1),
              Le >= Rr ? (Rr = Le) : (mt = !0),
              P(_e, d[Le], g, null, b, v, k, x, E),
              re++);
        }
        const Pr = mt ? kl(Mt) : vt;
        for (X = Pr.length - 1, w = Oe - 1; w >= 0; w--) {
          const _e = q + w,
            Le = d[_e],
            Sr = _e + 1 < I ? d[_e + 1].el : y;
          Mt[w] === 0
            ? P(null, Le, g, Sr, b, v, k, x, E)
            : mt && (X < 0 || w !== Pr[X] ? Ne(Le, g, Sr, 2) : X--);
        }
      }
    },
    Ne = (a, d, g, y, b = null) => {
      const { el: v, type: k, transition: x, children: E, shapeFlag: w } = a;
      if (w & 6) {
        Ne(a.component.subTree, d, g, y);
        return;
      }
      if (w & 128) {
        a.suspense.move(d, g, y);
        return;
      }
      if (w & 64) {
        k.move(a, d, g, te);
        return;
      }
      if (k === xe) {
        r(v, d, g);
        for (let S = 0; S < E.length; S++) Ne(E[S], d, g, y);
        r(a.anchor, d, g);
        return;
      }
      if (k === Fn) {
        W(a, d, g);
        return;
      }
      if (y !== 2 && w & 1 && x)
        if (y === 0) x.beforeEnter(v), r(v, d, g), me(() => x.enter(v), b);
        else {
          const { leave: S, delayLeave: F, afterLeave: N } = x,
            q = () => r(v, d, g),
            J = () => {
              S(v, () => {
                q(), N && N();
              });
            };
          F ? F(v, q, J) : J();
        }
      else r(v, d, g);
    },
    Ce = (a, d, g, y = !1, b = !1) => {
      const {
        type: v,
        props: k,
        ref: x,
        children: E,
        dynamicChildren: w,
        shapeFlag: I,
        patchFlag: S,
        dirs: F,
      } = a;
      if ((x != null && er(x, null, g, a, !0), I & 256)) {
        d.ctx.deactivate(a);
        return;
      }
      const N = I & 1 && F,
        q = !ln(a);
      let J;
      if ((q && (J = k && k.onVnodeBeforeUnmount) && je(J, d, a), I & 6))
        O(a.component, g, y);
      else {
        if (I & 128) {
          a.suspense.unmount(g, y);
          return;
        }
        N && it(a, null, d, "beforeUnmount"),
          I & 64
            ? a.type.remove(a, d, g, b, te, y)
            : w && (v !== xe || (S > 0 && S & 64))
            ? C(w, d, g, !1, !0)
            : ((v === xe && S & 384) || (!b && I & 16)) && C(E, d, g),
          y && On(a);
      }
      ((q && (J = k && k.onVnodeUnmounted)) || N) &&
        me(() => {
          J && je(J, d, a), N && it(a, null, d, "unmounted");
        }, g);
    },
    On = (a) => {
      const { type: d, el: g, anchor: y, transition: b } = a;
      if (d === xe) {
        m(g, y);
        return;
      }
      if (d === Fn) {
        se(a);
        return;
      }
      const v = () => {
        o(g), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (a.shapeFlag & 1 && b && !b.persisted) {
        const { leave: k, delayLeave: x } = b,
          E = () => k(g, v);
        x ? x(a.el, v, E) : E();
      } else v();
    },
    m = (a, d) => {
      let g;
      for (; a !== d; ) (g = h(a)), o(a), (a = g);
      o(d);
    },
    O = (a, d, g) => {
      const { bum: y, scope: b, update: v, subTree: k, um: x } = a;
      y && rn(y),
        b.stop(),
        v && ((v.active = !1), Ce(k, a, d, g)),
        x && me(x, d),
        me(() => {
          a.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    C = (a, d, g, y = !1, b = !1, v = 0) => {
      for (let k = v; k < a.length; k++) Ce(a[k], d, g, y, b);
    },
    T = (a) =>
      a.shapeFlag & 6
        ? T(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : h(a.anchor || a.el),
    Q = (a, d, g) => {
      a == null
        ? d._vnode && Ce(d._vnode, null, null, !0)
        : P(d._vnode || null, a, d, null, null, null, g),
        Xo(),
        (d._vnode = a);
    },
    te = {
      p: P,
      um: Ce,
      m: Ne,
      r: On,
      mt: pt,
      mc: ne,
      pc: we,
      pbc: ue,
      n: T,
      o: e,
    };
  let B, H;
  return t && ([B, H] = t(te)), { render: Q, hydrate: B, createApp: vl(Q, B) };
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function _s(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (L(r) && L(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let l = o[s];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[s] = Ze(o[s])), (l.el = i.el)),
        n || _s(i, l));
    }
}
function kl(e) {
  const t = e.slice(),
    n = [0];
  let r, o, s, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        (l = (s + i) >> 1), e[n[l]] < u ? (s = l + 1) : (i = l);
      u < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i]);
  return n;
}
const Al = (e) => e.__isTeleport,
  xe = Symbol(void 0),
  vr = Symbol(void 0),
  Fe = Symbol(void 0),
  Fn = Symbol(void 0),
  Ht = [];
let Me = null;
function Ke(e = !1) {
  Ht.push((Me = e ? null : []));
}
function Rl() {
  Ht.pop(), (Me = Ht[Ht.length - 1] || null);
}
let Wt = 1;
function Qr(e) {
  Wt += e;
}
function xs(e) {
  return (
    (e.dynamicChildren = Wt > 0 ? Me || vt : null),
    Rl(),
    Wt > 0 && Me && Me.push(e),
    e
  );
}
function et(e, t, n, r, o, s) {
  return xs(U(e, t, n, r, o, s, !0));
}
function Pl(e, t, n, r, o) {
  return xs(be(e, t, n, r, o, !0));
}
function tr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function at(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Rn = "__vInternal",
  vs = ({ key: e }) => (e != null ? e : null),
  cn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? ae(e) || he(e) || $(e)
        ? { i: Re, r: e, k: t, f: !!n }
        : e
      : null;
function U(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  s = e === xe ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vs(t),
    ref: t && cn(t),
    scopeId: Cn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (Er(c, n), s & 128 && e.normalize(c))
      : n && (c.shapeFlag |= ae(n) ? 8 : 16),
    Wt > 0 &&
      !i &&
      Me &&
      (c.patchFlag > 0 || s & 6) &&
      c.patchFlag !== 32 &&
      Me.push(c),
    c
  );
}
const be = Sl;
function Sl(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === cl) && (e = Fe), tr(e))) {
    const l = st(e, t, !0);
    return (
      n && Er(l, n),
      Wt > 0 &&
        !s &&
        Me &&
        (l.shapeFlag & 6 ? (Me[Me.indexOf(e)] = l) : Me.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Ul(e) && (e = e.__vccOpts), t)) {
    t = Ol(t);
    let { class: l, style: c } = t;
    l && !ae(l) && (t.class = gn(l)),
      le(c) && (Bo(c) && !L(c) && (c = pe({}, c)), (t.style = cr(c)));
  }
  const i = ae(e) ? 1 : Ki(e) ? 128 : Al(e) ? 64 : le(e) ? 4 : $(e) ? 2 : 0;
  return U(e, t, n, r, o, i, s, !0);
}
function Ol(e) {
  return e ? (Bo(e) || Rn in e ? pe({}, e) : e) : null;
}
function st(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e,
    l = t ? Ml(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && vs(l),
    ref:
      t && t.ref ? (n && o ? (L(o) ? o.concat(cn(t)) : [o, cn(t)]) : cn(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== xe ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Tl(e = " ", t = 0) {
  return be(vr, null, e, t);
}
function Jr(e = "", t = !1) {
  return t ? (Ke(), Pl(Fe, null, e)) : be(Fe, null, e);
}
function He(e) {
  return e == null || typeof e == "boolean"
    ? be(Fe)
    : L(e)
    ? be(xe, null, e.slice())
    : typeof e == "object"
    ? Ze(e)
    : be(vr, null, String(e));
}
function Ze(e) {
  return e.el === null || e.memo ? e : st(e);
}
function Er(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (L(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Er(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(Rn in t)
        ? (t._ctx = Re)
        : o === 3 &&
          Re &&
          (Re.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    $(t)
      ? ((t = { default: t, _ctx: Re }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Tl(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Ml(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = gn([t.class, r.class]));
      else if (o === "style") t.style = cr([t.style, r.style]);
      else if (mn(o)) {
        const s = t[o],
          i = r[o];
        i &&
          s !== i &&
          !(L(s) && s.includes(i)) &&
          (t[o] = s ? [].concat(s, i) : i);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function je(e, t, n, r = null) {
  Pe(e, t, 7, [n, r]);
}
const Il = ws();
let Fl = 0;
function Nl(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || Il,
    s = {
      uid: Fl++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ei(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: gs(r, o),
      emitsOptions: Go(r, o),
      emit: null,
      emitted: null,
      propsDefaults: G,
      inheritAttrs: r.inheritAttrs,
      ctx: G,
      data: G,
      props: G,
      attrs: G,
      slots: G,
      refs: G,
      setupState: G,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = $i.bind(null, s)),
    e.ce && e.ce(s),
    s
  );
}
let ce = null;
const Ll = () => ce || Re,
  kt = (e) => {
    (ce = e), e.scope.on();
  },
  ht = () => {
    ce && ce.scope.off(), (ce = null);
  };
function Es(e) {
  return e.vnode.shapeFlag & 4;
}
let Vt = !1;
function jl(e, t = !1) {
  Vt = t;
  const { props: n, children: r } = e.vnode,
    o = Es(e);
  ml(e, n, o, t), wl(e, r);
  const s = o ? $l(e, t) : void 0;
  return (Vt = !1), s;
}
function $l(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = zo(new Proxy(e.ctx, ul)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? Bl(e) : null);
    kt(e), St();
    const s = nt(r, e, 0, [e.props, o]);
    if ((Ot(), ht(), Ao(s))) {
      if ((s.then(ht, ht), t))
        return s
          .then((i) => {
            Xr(e, i, t);
          })
          .catch((i) => {
            xn(i, e, 0);
          });
      e.asyncDep = s;
    } else Xr(e, s, t);
  } else Cs(e, t);
}
function Xr(e, t, n) {
  $(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : le(t) && (e.setupState = qo(t)),
    Cs(e, n);
}
let Zr;
function Cs(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Zr && !r.render) {
      const o = r.template;
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          u = pe(pe({ isCustomElement: s, delimiters: l }, i), c);
        r.render = Zr(o, u);
      }
    }
    e.render = r.render || Ie;
  }
  kt(e), St(), fl(e), Ot(), ht();
}
function Hl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ee(e, "get", "$attrs"), t[n];
    },
  });
}
function Bl(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Hl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Pn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(qo(zo(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in dn) return dn[n](e);
        },
      }))
    );
}
function zl(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ul(e) {
  return $(e) && "__vccOpts" in e;
}
const Be = (e, t) => Mi(e, t, Vt);
function ks(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? le(t) && !L(t)
      ? tr(t)
        ? be(e, null, [t])
        : be(e, t)
      : be(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && tr(n) && (n = [n]),
      be(e, t, n));
}
const Dl = "3.2.37",
  Kl = "http://www.w3.org/2000/svg",
  ut = typeof document != "undefined" ? document : null,
  Gr = ut && ut.createElement("template"),
  ql = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? ut.createElementNS(Kl, e)
        : ut.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => ut.createTextNode(e),
    createComment: (e) => ut.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => ut.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        Gr.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Gr.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Wl(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Vl(e, t, n) {
  const r = e.style,
    o = ae(n);
  if (n && !o) {
    for (const s in n) nr(r, s, n[s]);
    if (t && !ae(t)) for (const s in t) n[s] == null && nr(r, s, "");
  } else {
    const s = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = s);
  }
}
const eo = /\s*!important$/;
function nr(e, t, n) {
  if (L(n)) n.forEach((r) => nr(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = Yl(e, t);
    eo.test(n)
      ? e.setProperty(Pt(r), n.replace(eo, ""), "important")
      : (e[r] = n);
  }
}
const to = ["Webkit", "Moz", "ms"],
  Nn = {};
function Yl(e, t) {
  const n = Nn[t];
  if (n) return n;
  let r = ze(t);
  if (r !== "filter" && r in e) return (Nn[t] = r);
  r = wn(r);
  for (let o = 0; o < to.length; o++) {
    const s = to[o] + r;
    if (s in e) return (Nn[t] = s);
  }
  return t;
}
const no = "http://www.w3.org/1999/xlink";
function Ql(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(no, t.slice(6, t.length))
      : e.setAttributeNS(no, t, n);
  else {
    const s = Ds(t);
    n == null || (s && !Eo(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n);
  }
}
function Jl(e, t, n, r, o, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, s), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n == null ? "" : n;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = Eo(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
const [As, Xl] = (() => {
  let e = Date.now,
    t = !1;
  if (typeof window != "undefined") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance));
    const n = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(n && Number(n[1]) <= 53);
  }
  return [e, t];
})();
let rr = 0;
const Zl = Promise.resolve(),
  Gl = () => {
    rr = 0;
  },
  ec = () => rr || (Zl.then(Gl), (rr = As()));
function _t(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function tc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function nc(e, t, n, r, o = null) {
  const s = e._vei || (e._vei = {}),
    i = s[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = rc(t);
    if (r) {
      const u = (s[t] = oc(r, o));
      _t(e, l, u, c);
    } else i && (tc(e, l, i, c), (s[t] = void 0));
  }
}
const ro = /(?:Once|Passive|Capture)$/;
function rc(e) {
  let t;
  if (ro.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(ro)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [Pt(e.slice(2)), t];
}
function oc(e, t) {
  const n = (r) => {
    const o = r.timeStamp || As();
    (Xl || o >= n.attached - 1) && Pe(sc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = ec()), n;
}
function sc(e, t) {
  if (L(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const oo = /^on[a-z]/,
  ic = (e, t, n, r, o = !1, s, i, l, c) => {
    t === "class"
      ? Wl(e, r, o)
      : t === "style"
      ? Vl(e, n, r)
      : mn(t)
      ? ar(t) || nc(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : lc(e, t, r, o)
        )
      ? Jl(e, t, r, s, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Ql(e, t, r, o));
  };
function lc(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && oo.test(t) && $(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (oo.test(t) && ae(n))
    ? !1
    : t in e;
}
const cc = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Qi.props;
const so = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return L(t) ? (n) => rn(t, n) : t;
};
function ac(e) {
  e.target.composing = !0;
}
function io(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const uc = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = so(o);
      const s = r || (o.props && o.props.type === "number");
      _t(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), s && (l = Hn(l)), e._assign(l);
      }),
        n &&
          _t(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (_t(e, "compositionstart", ac),
          _t(e, "compositionend", io),
          _t(e, "change", io));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: o } },
      s
    ) {
      if (
        ((e._assign = so(s)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((o || e.type === "number") && Hn(e.value) === t))))
      )
        return;
      const i = t == null ? "" : t;
      e.value !== i && (e.value = i);
    },
  },
  fc = pe({ patchProp: ic }, ql);
let lo;
function dc() {
  return lo || (lo = El(fc));
}
const hc = (...e) => {
  const t = dc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = pc(r);
      if (!o) return;
      const s = t._component;
      !$(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "");
      const i = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function pc(e) {
  return ae(e) ? document.querySelector(e) : e;
}
var Rs = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const Cr = (e) => (es("data-v-172e8acc"), (e = e()), ts(), e),
  gc = {
    key: 0,
    class:
      "modal text-xl bg-cyan-700 h-96 flex justify-around items-center flex-col shadow-2xl rounded-2xl text-white shadow-black",
  },
  mc = Cr(() =>
    U(
      "p",
      { class: "flex justify-center items-center text-center" },
      " Cryptocurrency researched: ",
      -1
    )
  ),
  bc = { class: "underline" },
  yc = Cr(() =>
    U(
      "p",
      { class: "flex justify-center items-center text-center" },
      "Date searched:",
      -1
    )
  ),
  wc = { class: "underline" },
  _c = { class: "flex justify-center items-center text-center" },
  xc = { class: "underline flex justify-center items-center text-center" },
  vc = {
    key: 1,
    class:
      "modal text-xl bg-cyan-700 h-96 flex justify-around items-center flex-col shadow-2xl rounded-2xl text-white shadow-black",
  },
  Ec = Cr(() =>
    U(
      "p",
      { class: "w-3/4" },
      " Sorry. But we do not have information about the data that has been given. Confirm the info's and try again. ",
      -1
    )
  ),
  Cc = {
    name: "modal",
    components: {},
    data() {
      return { name: "", symbolURL: "", date: "", pastPrice: "" };
    },
    methods: {
      async getCoinData() {
        let e = document.querySelector("#dateInput"),
          t = e.value.replaceAll("-", " ").split(" ")[0],
          n = e.value.replaceAll("-", " ").split(" ")[1],
          r = e.value.replaceAll("-", " ").split(" ")[2],
          o = document.querySelector("#coinName").value.toLowerCase(),
          s = await fetch(
            `https://api.coingecko.com/api/v3/coins/${o}/history?date=${r}-${n}-${t}`
          );
        try {
          let i = await s.json();
          (this.name = i.id),
            (this.date = e.value),
            (this.pastPrice = i.market_data.current_price.usd.toFixed(2)),
            (this.open = !0);
        } catch {
          this.openError = !0;
        }
      },
      closeModalFunction() {
        document.querySelectorAll(".modal")[0].classList.add("closeModal"),
          setTimeout(() => {
            (this.openError = !1), (this.open = !1);
          }, 1e3);
      },
    },
  },
  kc = Object.assign(Cc, {
    setup(e) {
      const t = qn(!1),
        n = qn(!1);
      return (r, o) => (
        Ke(),
        et(
          xe,
          null,
          [
            U(
              "button",
              {
                class:
                  "bg-sky-600 m-2 border-2 border-sky-500 rounded-2xl w-8/12 hover:bg-sky-900 hover:text-white transition-colors text-white",
                onClick: o[0] || (o[0] = (s) => r.getCoinData()),
              },
              " Search "
            ),
            t.value
              ? (Ke(),
                et("div", gc, [
                  mc,
                  U("p", bc, Ae(this.name), 1),
                  yc,
                  U("p", wc, Ae(this.date), 1),
                  U(
                    "p",
                    _c,
                    " The price of the " +
                      Ae(this.name) +
                      " in the date of " +
                      Ae(this.date) +
                      " in Dollars is: ",
                    1
                  ),
                  U("p", xc, " USD " + Ae(this.pastPrice), 1),
                  U(
                    "button",
                    {
                      class:
                        "bg-cyan-900 w-44 hover:bg-sky-400 rounded-xl hover:text-black transition-colors text-white",
                      onClick: o[1] || (o[1] = (s) => r.closeModalFunction()),
                    },
                    " Close "
                  ),
                ]))
              : Jr("", !0),
            n.value
              ? (Ke(),
                et("div", vc, [
                  Ec,
                  U(
                    "button",
                    {
                      class:
                        "bg-cyan-900 w-44 hover:bg-sky-400 rounded-xl hover:text-black transition-colors text-white",
                      onClick: o[2] || (o[2] = (s) => r.closeModalFunction()),
                    },
                    " Close "
                  ),
                ]))
              : Jr("", !0),
          ],
          64
        )
      );
    },
  });
var Ac = Rs(kc, [["__scopeId", "data-v-172e8acc"]]);
const Rc = {
    name: "App",
    components: { modal: Ac },
    data() {
      return {
        coins: [],
        titles: [
          "#",
          "Symbol",
          "abbreviation",
          "Coin",
          "Price",
          "Price change",
          "24h Volume",
        ],
        textSearch: "",
        filteredCoins: [],
        datedData: [],
      };
    },
    mounted() {
      setInterval(this.getData, 10);
    },
    methods: {
      searchCoin() {
        this.filteredCoins = this.coins.filter(
          (e) =>
            e.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
            e.symbol.toLowerCase().includes(this.textSearch.toLowerCase())
        );
      },
      async getData() {
        const t = await (
          await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&parkline=false"
          )
        ).json();
        (this.coins = t), (this.filteredCoins = t), this.searchCoin();
      },
    },
  },
  Jt = (e) => (es("data-v-247f6746"), (e = e()), ts(), e),
  Pc = { class: "min-w-screen overflow-y-auto min-h-screen bgAnimated" },
  Sc = { class: "flex flex-col items-center" },
  Oc = Jt(() =>
    U(
      "h1",
      {
        class:
          "titlePage rounded-b-full text-center text-5xl font-mono tracking-wider uppercase font-medium w-2/3 bg-gradient-to-r from-sky-500 to-indigo-500 text-sky-400",
      },
      " Crypto Market ",
      -1
    )
  ),
  Tc = { class: "flex items-center justify-around gap-5 m-8 text-center" },
  Mc = {
    class:
      "resizeDiv flex border-solid border-2 border-sky-500 flex-col justify-evenly items-center rounded-2xl bg-sky-700 w-2/4 h-48 gap-4",
  },
  Ic = Jt(() =>
    U(
      "p",
      { class: "w-10/12 text-center text-cyan-200" },
      " Search the price of the crypto coin today! ",
      -1
    )
  ),
  Fc = {
    class:
      "resizeDiv border-solid rounded-2xl border-2 border-sky-500 flex flex-col gap-4 my-1 items-center bg-sky-700 h-48 w-2/4",
  },
  Nc = Jt(() =>
    U("span", { class: "text-cyan-200" }, "Search coin historical", -1)
  ),
  Lc = Jt(() =>
    U(
      "input",
      {
        id: "dateInput",
        type: "date",
        class:
          "border-solid border-2 border-sky-500 rounded-md w-4/5 text-center text-sm",
      },
      null,
      -1
    )
  ),
  jc = Jt(() =>
    U(
      "input",
      {
        id: "coinName",
        type: "text",
        class:
          "rounded-2xl placeholder:text-neutral-900 border-solid border-2 border-sky-500 w-3/5 text-center text-sm",
        placeholder: "Coin name",
      },
      null,
      -1
    )
  ),
  $c = {
    class:
      "rounded-lg w-4/5 flex items-center border-solid border-2 border-sky-500 overflow-x-auto max-h-xl",
  },
  Hc = { class: "w-full overflow-x-auto border-separate" },
  Bc = { class: "bg-sky-500 text-white underline text-5xl h-10" },
  zc = { class: "text-lg" },
  Uc = { class: "" },
  Dc = { class: "flex justify-center" },
  Kc = ["src"],
  qc = { class: "" },
  Wc = { class: "whitespace-nowrap" },
  Vc = { class: "whitespace-nowrap animate-pulse" },
  Yc = { class: "whitespace-nowrap animate-pulse" };
function Qc(e, t, n, r, o, s) {
  const i = ll("modal");
  return (
    Ke(),
    et("div", Pc, [
      U("div", Sc, [
        Oc,
        U("div", Tc, [
          U("div", Mc, [
            Ic,
            il(
              U(
                "input",
                {
                  class:
                    "rounded-md border-2 border-sky-500 flex bg-sky-600 text-center w-3/5 placeholder:text-white hover:text-white transition-colors text-white",
                  type: "text",
                  placeholder: "Search",
                  onKeyup: t[0] || (t[0] = (l) => s.searchCoin()),
                  "onUpdate:modelValue":
                    t[1] || (t[1] = (l) => (o.textSearch = l)),
                },
                null,
                544
              ),
              [[uc, o.textSearch]]
            ),
          ]),
          U("div", Fc, [Nc, Lc, jc, be(i)]),
        ]),
        U("div", $c, [
          U("table", Hc, [
            U("thead", null, [
              U("tr", Bc, [
                (Ke(!0),
                et(
                  xe,
                  null,
                  Ur(
                    o.titles,
                    (l) => (
                      Ke(), et("th", { class: "text-sm", key: l }, Ae(l), 1)
                    )
                  ),
                  128
                )),
              ]),
            ]),
            U("tbody", zc, [
              (Ke(!0),
              et(
                xe,
                null,
                Ur(
                  o.filteredCoins,
                  (l, c) => (
                    Ke(),
                    et(
                      "tr",
                      {
                        class:
                          "text-center hover:bg-sky-300 bg-sky-100 lineTable",
                        key: l.id,
                      },
                      [
                        U("td", Uc, Ae(c + 1), 1),
                        U("td", Dc, [
                          U(
                            "img",
                            { src: l.image, style: { width: "2rem" } },
                            null,
                            8,
                            Kc
                          ),
                        ]),
                        U("td", qc, Ae(l.symbol), 1),
                        U("td", Wc, Ae(l.name), 1),
                        U("td", Vc, " $ " + Ae(l.current_price.toFixed(2)), 1),
                        U(
                          "td",
                          {
                            class: gn([
                              l.price_change_percentage_24h >= 0
                                ? "text-green-600"
                                : "text-red-600",
                            ]),
                          },
                          Ae(l.price_change_percentage_24h) + " % ",
                          3
                        ),
                        U(
                          "td",
                          Yc,
                          " $" + Ae(l.total_volume.toLocaleString()),
                          1
                        ),
                      ]
                    )
                  )
                ),
                128
              )),
            ]),
          ]),
        ]),
      ]),
    ])
  );
}
var Jc = Rs(Rc, [
  ["render", Qc],
  ["__scopeId", "data-v-247f6746"],
]);
/*!
 * vue-router v4.0.15
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Ps =
    typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  Tt = (e) => (Ps ? Symbol(e) : "_vr_" + e),
  Xc = Tt("rvlm"),
  co = Tt("rvd"),
  kr = Tt("r"),
  Ss = Tt("rl"),
  or = Tt("rvl"),
  xt = typeof window != "undefined";
function Zc(e) {
  return e.__esModule || (Ps && e[Symbol.toStringTag] === "Module");
}
const Z = Object.assign;
function Ln(e, t) {
  const n = {};
  for (const r in t) {
    const o = t[r];
    n[r] = Array.isArray(o) ? o.map(e) : e(o);
  }
  return n;
}
const Bt = () => {},
  Gc = /\/$/,
  ea = (e) => e.replace(Gc, "");
function jn(e, t, n = "/") {
  let r,
    o = {},
    s = "",
    i = "";
  const l = t.indexOf("?"),
    c = t.indexOf("#", l > -1 ? l : 0);
  return (
    l > -1 &&
      ((r = t.slice(0, l)),
      (s = t.slice(l + 1, c > -1 ? c : t.length)),
      (o = e(s))),
    c > -1 && ((r = r || t.slice(0, c)), (i = t.slice(c, t.length))),
    (r = oa(r != null ? r : t, n)),
    { fullPath: r + (s && "?") + s + i, path: r, query: o, hash: i }
  );
}
function ta(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function ao(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function na(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1;
  return (
    r > -1 &&
    r === o &&
    At(t.matched[r], n.matched[o]) &&
    Os(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function At(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Os(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!ra(e[n], t[n])) return !1;
  return !0;
}
function ra(e, t) {
  return Array.isArray(e) ? uo(e, t) : Array.isArray(t) ? uo(t, e) : e === t;
}
function uo(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function oa(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/");
  let o = n.length - 1,
    s,
    i;
  for (s = 0; s < r.length; s++)
    if (((i = r[s]), !(o === 1 || i === ".")))
      if (i === "..") o--;
      else break;
  return (
    n.slice(0, o).join("/") +
    "/" +
    r.slice(s - (s === r.length ? 1 : 0)).join("/")
  );
}
var Yt;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(Yt || (Yt = {}));
var zt;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(zt || (zt = {}));
function sa(e) {
  if (!e)
    if (xt) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ea(e);
}
const ia = /^[^#]+#/;
function la(e, t) {
  return e.replace(ia, "#") + t;
}
function ca(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Sn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function aa(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!o) return;
    t = ca(o, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function fo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const sr = new Map();
function ua(e, t) {
  sr.set(e, t);
}
function fa(e) {
  const t = sr.get(e);
  return sr.delete(e), t;
}
let da = () => location.protocol + "//" + location.host;
function Ts(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf("#");
  if (s > -1) {
    let l = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      c = o.slice(l);
    return c[0] !== "/" && (c = "/" + c), ao(c, "");
  }
  return ao(n, e) + r + o;
}
function ha(e, t, n, r) {
  let o = [],
    s = [],
    i = null;
  const l = ({ state: h }) => {
    const _ = Ts(e, location),
      A = n.value,
      M = t.value;
    let P = 0;
    if (h) {
      if (((n.value = _), (t.value = h), i && i === A)) {
        i = null;
        return;
      }
      P = M ? h.position - M.position : 0;
    } else r(_);
    o.forEach((R) => {
      R(n.value, A, {
        delta: P,
        type: Yt.pop,
        direction: P ? (P > 0 ? zt.forward : zt.back) : zt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function u(h) {
    o.push(h);
    const _ = () => {
      const A = o.indexOf(h);
      A > -1 && o.splice(A, 1);
    };
    return s.push(_), _;
  }
  function f() {
    const { history: h } = window;
    !h.state || h.replaceState(Z({}, h.state, { scroll: Sn() }), "");
  }
  function p() {
    for (const h of s) h();
    (s = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", f);
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", f),
    { pauseListeners: c, listen: u, destroy: p }
  );
}
function ho(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? Sn() : null,
  };
}
function pa(e) {
  const { history: t, location: n } = window,
    r = { value: Ts(e, n) },
    o = { value: t.state };
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function s(c, u, f) {
    const p = e.indexOf("#"),
      h =
        p > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(p)) + c
          : da() + e + c;
    try {
      t[f ? "replaceState" : "pushState"](u, "", h), (o.value = u);
    } catch (_) {
      console.error(_), n[f ? "replace" : "assign"](h);
    }
  }
  function i(c, u) {
    const f = Z({}, t.state, ho(o.value.back, c, o.value.forward, !0), u, {
      position: o.value.position,
    });
    s(c, f, !0), (r.value = c);
  }
  function l(c, u) {
    const f = Z({}, o.value, t.state, { forward: c, scroll: Sn() });
    s(f.current, f, !0);
    const p = Z({}, ho(r.value, c, null), { position: f.position + 1 }, u);
    s(c, p, !1), (r.value = c);
  }
  return { location: r, state: o, push: l, replace: i };
}
function ga(e) {
  e = sa(e);
  const t = pa(e),
    n = ha(e, t.state, t.location, t.replace);
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s);
  }
  const o = Z(
    { location: "", base: e, go: r, createHref: la.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  );
}
function ma(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Ms(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Qe = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Is = Tt("nf");
var po;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(po || (po = {}));
function Rt(e, t) {
  return Z(new Error(), { type: e, [Is]: !0 }, t);
}
function Je(e, t) {
  return e instanceof Error && Is in e && (t == null || !!(e.type & t));
}
const go = "[^/]+?",
  ba = { sensitive: !1, strict: !1, start: !0, end: !0 },
  ya = /[.+*?^${}()[\]/\\]/g;
function wa(e, t) {
  const n = Z({}, ba, t),
    r = [];
  let o = n.start ? "^" : "";
  const s = [];
  for (const u of e) {
    const f = u.length ? [] : [90];
    n.strict && !u.length && (o += "/");
    for (let p = 0; p < u.length; p++) {
      const h = u[p];
      let _ = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0)
        p || (o += "/"), (o += h.value.replace(ya, "\\$&")), (_ += 40);
      else if (h.type === 1) {
        const { value: A, repeatable: M, optional: P, regexp: R } = h;
        s.push({ name: A, repeatable: M, optional: P });
        const j = R || go;
        if (j !== go) {
          _ += 10;
          try {
            new RegExp(`(${j})`);
          } catch (W) {
            throw new Error(
              `Invalid custom RegExp for param "${A}" (${j}): ` + W.message
            );
          }
        }
        let D = M ? `((?:${j})(?:/(?:${j}))*)` : `(${j})`;
        p || (D = P && u.length < 2 ? `(?:/${D})` : "/" + D),
          P && (D += "?"),
          (o += D),
          (_ += 20),
          P && (_ += -8),
          M && (_ += -20),
          j === ".*" && (_ += -50);
      }
      f.push(_);
    }
    r.push(f);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function l(u) {
    const f = u.match(i),
      p = {};
    if (!f) return null;
    for (let h = 1; h < f.length; h++) {
      const _ = f[h] || "",
        A = s[h - 1];
      p[A.name] = _ && A.repeatable ? _.split("/") : _;
    }
    return p;
  }
  function c(u) {
    let f = "",
      p = !1;
    for (const h of e) {
      (!p || !f.endsWith("/")) && (f += "/"), (p = !1);
      for (const _ of h)
        if (_.type === 0) f += _.value;
        else if (_.type === 1) {
          const { value: A, repeatable: M, optional: P } = _,
            R = A in u ? u[A] : "";
          if (Array.isArray(R) && !M)
            throw new Error(
              `Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`
            );
          const j = Array.isArray(R) ? R.join("/") : R;
          if (!j)
            if (P)
              h.length < 2 &&
                e.length > 1 &&
                (f.endsWith("/") ? (f = f.slice(0, -1)) : (p = !0));
            else throw new Error(`Missing required param "${A}"`);
          f += j;
        }
    }
    return f;
  }
  return { re: i, score: r, keys: s, parse: l, stringify: c };
}
function _a(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function xa(e, t) {
  let n = 0;
  const r = e.score,
    o = t.score;
  for (; n < r.length && n < o.length; ) {
    const s = _a(r[n], o[n]);
    if (s) return s;
    n++;
  }
  return o.length - r.length;
}
const va = { type: 0, value: "" },
  Ea = /[a-zA-Z0-9_]/;
function Ca(e) {
  if (!e) return [[]];
  if (e === "/") return [[va]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(_) {
    throw new Error(`ERR (${n})/"${u}": ${_}`);
  }
  let n = 0,
    r = n;
  const o = [];
  let s;
  function i() {
    s && o.push(s), (s = []);
  }
  let l = 0,
    c,
    u = "",
    f = "";
  function p() {
    !u ||
      (n === 0
        ? s.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (s.length > 1 &&
            (c === "*" || c === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          s.push({
            type: 1,
            value: u,
            regexp: f,
            repeatable: c === "*" || c === "+",
            optional: c === "*" || c === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function h() {
    u += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (u && p(), i()) : c === ":" ? (p(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Ea.test(c)
          ? h()
          : (p(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? f[f.length - 1] == "\\"
            ? (f = f.slice(0, -1) + c)
            : (n = 3)
          : (f += c);
        break;
      case 3:
        p(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (f = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), p(), i(), o;
}
function ka(e, t, n) {
  const r = wa(Ca(e.path), n),
    o = Z(r, { record: e, parent: t, children: [], alias: [] });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function Aa(e, t) {
  const n = [],
    r = new Map();
  t = bo({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(f) {
    return r.get(f);
  }
  function s(f, p, h) {
    const _ = !h,
      A = Pa(f);
    A.aliasOf = h && h.record;
    const M = bo(t, f),
      P = [A];
    if ("alias" in f) {
      const D = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const W of D)
        P.push(
          Z({}, A, {
            components: h ? h.record.components : A.components,
            path: W,
            aliasOf: h ? h.record : A,
          })
        );
    }
    let R, j;
    for (const D of P) {
      const { path: W } = D;
      if (p && W[0] !== "/") {
        const se = p.record.path,
          de = se[se.length - 1] === "/" ? "" : "/";
        D.path = p.record.path + (W && de + W);
      }
      if (
        ((R = ka(D, p, M)),
        h
          ? h.alias.push(R)
          : ((j = j || R),
            j !== R && j.alias.push(R),
            _ && f.name && !mo(R) && i(f.name)),
        "children" in A)
      ) {
        const se = A.children;
        for (let de = 0; de < se.length; de++)
          s(se[de], R, h && h.children[de]);
      }
      (h = h || R), c(R);
    }
    return j
      ? () => {
          i(j);
        }
      : Bt;
  }
  function i(f) {
    if (Ms(f)) {
      const p = r.get(f);
      p &&
        (r.delete(f),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(i),
        p.alias.forEach(i));
    } else {
      const p = n.indexOf(f);
      p > -1 &&
        (n.splice(p, 1),
        f.record.name && r.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(f) {
    let p = 0;
    for (
      ;
      p < n.length &&
      xa(f, n[p]) >= 0 &&
      (f.record.path !== n[p].record.path || !Fs(f, n[p]));

    )
      p++;
    n.splice(p, 0, f), f.record.name && !mo(f) && r.set(f.record.name, f);
  }
  function u(f, p) {
    let h,
      _ = {},
      A,
      M;
    if ("name" in f && f.name) {
      if (((h = r.get(f.name)), !h)) throw Rt(1, { location: f });
      (M = h.record.name),
        (_ = Z(
          Ra(
            p.params,
            h.keys.filter((j) => !j.optional).map((j) => j.name)
          ),
          f.params
        )),
        (A = h.stringify(_));
    } else if ("path" in f)
      (A = f.path),
        (h = n.find((j) => j.re.test(A))),
        h && ((_ = h.parse(A)), (M = h.record.name));
    else {
      if (((h = p.name ? r.get(p.name) : n.find((j) => j.re.test(p.path))), !h))
        throw Rt(1, { location: f, currentLocation: p });
      (M = h.record.name),
        (_ = Z({}, p.params, f.params)),
        (A = h.stringify(_));
    }
    const P = [];
    let R = h;
    for (; R; ) P.unshift(R.record), (R = R.parent);
    return { name: M, path: A, params: _, matched: P, meta: Oa(P) };
  }
  return (
    e.forEach((f) => s(f)),
    {
      addRoute: s,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: o,
    }
  );
}
function Ra(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Pa(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Sa(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e ? e.components || {} : { default: e.component },
  };
}
function Sa(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
  return t;
}
function mo(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Oa(e) {
  return e.reduce((t, n) => Z(t, n.meta), {});
}
function bo(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Fs(e, t) {
  return t.children.some((n) => n === e || Fs(e, n));
}
const Ns = /#/g,
  Ta = /&/g,
  Ma = /\//g,
  Ia = /=/g,
  Fa = /\?/g,
  Ls = /\+/g,
  Na = /%5B/g,
  La = /%5D/g,
  js = /%5E/g,
  ja = /%60/g,
  $s = /%7B/g,
  $a = /%7C/g,
  Hs = /%7D/g,
  Ha = /%20/g;
function Ar(e) {
  return encodeURI("" + e)
    .replace($a, "|")
    .replace(Na, "[")
    .replace(La, "]");
}
function Ba(e) {
  return Ar(e).replace($s, "{").replace(Hs, "}").replace(js, "^");
}
function ir(e) {
  return Ar(e)
    .replace(Ls, "%2B")
    .replace(Ha, "+")
    .replace(Ns, "%23")
    .replace(Ta, "%26")
    .replace(ja, "`")
    .replace($s, "{")
    .replace(Hs, "}")
    .replace(js, "^");
}
function za(e) {
  return ir(e).replace(Ia, "%3D");
}
function Ua(e) {
  return Ar(e).replace(Ns, "%23").replace(Fa, "%3F");
}
function Da(e) {
  return e == null ? "" : Ua(e).replace(Ma, "%2F");
}
function pn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Ka(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(Ls, " "),
      i = s.indexOf("="),
      l = pn(i < 0 ? s : s.slice(0, i)),
      c = i < 0 ? null : pn(s.slice(i + 1));
    if (l in t) {
      let u = t[l];
      Array.isArray(u) || (u = t[l] = [u]), u.push(c);
    } else t[l] = c;
  }
  return t;
}
function yo(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = za(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Array.isArray(r) ? r.map((s) => s && ir(s)) : [r && ir(r)]).forEach(
      (s) => {
        s !== void 0 &&
          ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
      }
    );
  }
  return t;
}
function qa(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Array.isArray(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
function It() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r);
        o > -1 && e.splice(o, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function Ge(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
  return () =>
    new Promise((i, l) => {
      const c = (p) => {
          p === !1
            ? l(Rt(4, { from: n, to: t }))
            : p instanceof Error
            ? l(p)
            : ma(p)
            ? l(Rt(2, { from: t, to: p }))
            : (s &&
                r.enterCallbacks[o] === s &&
                typeof p == "function" &&
                s.push(p),
              i());
        },
        u = e.call(r && r.instances[o], t, n, c);
      let f = Promise.resolve(u);
      e.length < 3 && (f = f.then(c)), f.catch((p) => l(p));
    });
}
function $n(e, t, n, r) {
  const o = [];
  for (const s of e)
    for (const i in s.components) {
      let l = s.components[i];
      if (!(t !== "beforeRouteEnter" && !s.instances[i]))
        if (Wa(l)) {
          const u = (l.__vccOpts || l)[t];
          u && o.push(Ge(u, n, r, s, i));
        } else {
          let c = l();
          o.push(() =>
            c.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${s.path}"`)
                );
              const f = Zc(u) ? u.default : u;
              s.components[i] = f;
              const h = (f.__vccOpts || f)[t];
              return h && Ge(h, n, r, s, i)();
            })
          );
        }
    }
  return o;
}
function Wa(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function wo(e) {
  const t = rt(kr),
    n = rt(Ss),
    r = Be(() => t.resolve(Lt(e.to))),
    o = Be(() => {
      const { matched: c } = r.value,
        { length: u } = c,
        f = c[u - 1],
        p = n.matched;
      if (!f || !p.length) return -1;
      const h = p.findIndex(At.bind(null, f));
      if (h > -1) return h;
      const _ = _o(c[u - 2]);
      return u > 1 && _o(f) === _ && p[p.length - 1].path !== _
        ? p.findIndex(At.bind(null, c[u - 2]))
        : h;
    }),
    s = Be(() => o.value > -1 && Ja(n.params, r.value.params)),
    i = Be(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        Os(n.params, r.value.params)
    );
  function l(c = {}) {
    return Qa(c)
      ? t[Lt(e.replace) ? "replace" : "push"](Lt(e.to)).catch(Bt)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Be(() => r.value.href),
    isActive: s,
    isExactActive: i,
    navigate: l,
  };
}
const Va = is({
    name: "RouterLink",
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: wo,
    setup(e, { slots: t }) {
      const n = Qt(wo(e)),
        { options: r } = rt(kr),
        o = Be(() => ({
          [xo(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [xo(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const s = t.default && t.default(n);
        return e.custom
          ? s
          : ks(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s
            );
      };
    },
  }),
  Ya = Va;
function Qa(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Ja(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n];
    if (typeof r == "string") {
      if (r !== o) return !1;
    } else if (
      !Array.isArray(o) ||
      o.length !== r.length ||
      r.some((s, i) => s !== o[i])
    )
      return !1;
  }
  return !0;
}
function _o(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const xo = (e, t, n) => (e != null ? e : t != null ? t : n),
  Xa = is({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = rt(or),
        o = Be(() => e.route || r.value),
        s = rt(co, 0),
        i = Be(() => o.value.matched[s]);
      on(co, s + 1), on(Xc, i), on(or, o);
      const l = qn();
      return (
        sn(
          () => [l.value, i.value, e.name],
          ([c, u, f], [p, h, _]) => {
            u &&
              ((u.instances[f] = c),
              h &&
                h !== u &&
                c &&
                c === p &&
                (u.leaveGuards.size || (u.leaveGuards = h.leaveGuards),
                u.updateGuards.size || (u.updateGuards = h.updateGuards))),
              c &&
                u &&
                (!h || !At(u, h) || !p) &&
                (u.enterCallbacks[f] || []).forEach((A) => A(c));
          },
          { flush: "post" }
        ),
        () => {
          const c = o.value,
            u = i.value,
            f = u && u.components[e.name],
            p = e.name;
          if (!f) return vo(n.default, { Component: f, route: c });
          const h = u.props[e.name],
            _ = h
              ? h === !0
                ? c.params
                : typeof h == "function"
                ? h(c)
                : h
              : null,
            M = ks(
              f,
              Z({}, _, t, {
                onVnodeUnmounted: (P) => {
                  P.component.isUnmounted && (u.instances[p] = null);
                },
                ref: l,
              })
            );
          return vo(n.default, { Component: M, route: c }) || M;
        }
      );
    },
  });
function vo(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Za = Xa;
function Ga(e) {
  const t = Aa(e.routes, e),
    n = e.parseQuery || Ka,
    r = e.stringifyQuery || yo,
    o = e.history,
    s = It(),
    i = It(),
    l = It(),
    c = Pi(Qe);
  let u = Qe;
  xt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const f = Ln.bind(null, (m) => "" + m),
    p = Ln.bind(null, Da),
    h = Ln.bind(null, pn);
  function _(m, O) {
    let C, T;
    return (
      Ms(m) ? ((C = t.getRecordMatcher(m)), (T = O)) : (T = m), t.addRoute(T, C)
    );
  }
  function A(m) {
    const O = t.getRecordMatcher(m);
    O && t.removeRoute(O);
  }
  function M() {
    return t.getRoutes().map((m) => m.record);
  }
  function P(m) {
    return !!t.getRecordMatcher(m);
  }
  function R(m, O) {
    if (((O = Z({}, O || c.value)), typeof m == "string")) {
      const H = jn(n, m, O.path),
        a = t.resolve({ path: H.path }, O),
        d = o.createHref(H.fullPath);
      return Z(H, a, {
        params: h(a.params),
        hash: pn(H.hash),
        redirectedFrom: void 0,
        href: d,
      });
    }
    let C;
    if ("path" in m) C = Z({}, m, { path: jn(n, m.path, O.path).path });
    else {
      const H = Z({}, m.params);
      for (const a in H) H[a] == null && delete H[a];
      (C = Z({}, m, { params: p(m.params) })), (O.params = p(O.params));
    }
    const T = t.resolve(C, O),
      Q = m.hash || "";
    T.params = f(h(T.params));
    const te = ta(r, Z({}, m, { hash: Ba(Q), path: T.path })),
      B = o.createHref(te);
    return Z(
      { fullPath: te, hash: Q, query: r === yo ? qa(m.query) : m.query || {} },
      T,
      { redirectedFrom: void 0, href: B }
    );
  }
  function j(m) {
    return typeof m == "string" ? jn(n, m, c.value.path) : Z({}, m);
  }
  function D(m, O) {
    if (u !== m) return Rt(8, { from: O, to: m });
  }
  function W(m) {
    return ye(m);
  }
  function se(m) {
    return W(Z(j(m), { replace: !0 }));
  }
  function de(m) {
    const O = m.matched[m.matched.length - 1];
    if (O && O.redirect) {
      const { redirect: C } = O;
      let T = typeof C == "function" ? C(m) : C;
      return (
        typeof T == "string" &&
          ((T = T.includes("?") || T.includes("#") ? (T = j(T)) : { path: T }),
          (T.params = {})),
        Z({ query: m.query, hash: m.hash, params: m.params }, T)
      );
    }
  }
  function ye(m, O) {
    const C = (u = R(m)),
      T = c.value,
      Q = m.state,
      te = m.force,
      B = m.replace === !0,
      H = de(C);
    if (H) return ye(Z(j(H), { state: Q, force: te, replace: B }), O || C);
    const a = C;
    a.redirectedFrom = O;
    let d;
    return (
      !te &&
        na(r, T, C) &&
        ((d = Rt(16, { to: a, from: T })), gt(T, T, !0, !1)),
      (d ? Promise.resolve(d) : ne(a, T))
        .catch((g) => (Je(g) ? (Je(g, 2) ? g : we(g)) : ee(g, a, T)))
        .then((g) => {
          if (g) {
            if (Je(g, 2))
              return ye(
                Z(j(g.to), { state: Q, force: te, replace: B }),
                O || a
              );
          } else g = ue(a, T, !0, B, Q);
          return oe(a, T, g), g;
        })
    );
  }
  function z(m, O) {
    const C = D(m, O);
    return C ? Promise.reject(C) : Promise.resolve();
  }
  function ne(m, O) {
    let C;
    const [T, Q, te] = eu(m, O);
    C = $n(T.reverse(), "beforeRouteLeave", m, O);
    for (const H of T)
      H.leaveGuards.forEach((a) => {
        C.push(Ge(a, m, O));
      });
    const B = z.bind(null, m, O);
    return (
      C.push(B),
      bt(C)
        .then(() => {
          C = [];
          for (const H of s.list()) C.push(Ge(H, m, O));
          return C.push(B), bt(C);
        })
        .then(() => {
          C = $n(Q, "beforeRouteUpdate", m, O);
          for (const H of Q)
            H.updateGuards.forEach((a) => {
              C.push(Ge(a, m, O));
            });
          return C.push(B), bt(C);
        })
        .then(() => {
          C = [];
          for (const H of m.matched)
            if (H.beforeEnter && !O.matched.includes(H))
              if (Array.isArray(H.beforeEnter))
                for (const a of H.beforeEnter) C.push(Ge(a, m, O));
              else C.push(Ge(H.beforeEnter, m, O));
          return C.push(B), bt(C);
        })
        .then(
          () => (
            m.matched.forEach((H) => (H.enterCallbacks = {})),
            (C = $n(te, "beforeRouteEnter", m, O)),
            C.push(B),
            bt(C)
          )
        )
        .then(() => {
          C = [];
          for (const H of i.list()) C.push(Ge(H, m, O));
          return C.push(B), bt(C);
        })
        .catch((H) => (Je(H, 8) ? H : Promise.reject(H)))
    );
  }
  function oe(m, O, C) {
    for (const T of l.list()) T(m, O, C);
  }
  function ue(m, O, C, T, Q) {
    const te = D(m, O);
    if (te) return te;
    const B = O === Qe,
      H = xt ? history.state : {};
    C &&
      (T || B
        ? o.replace(m.fullPath, Z({ scroll: B && H && H.scroll }, Q))
        : o.push(m.fullPath, Q)),
      (c.value = m),
      gt(m, O, C, B),
      we();
  }
  let fe;
  function Se() {
    fe ||
      (fe = o.listen((m, O, C) => {
        const T = R(m),
          Q = de(T);
        if (Q) {
          ye(Z(Q, { replace: !0 }), T).catch(Bt);
          return;
        }
        u = T;
        const te = c.value;
        xt && ua(fo(te.fullPath, C.delta), Sn()),
          ne(T, te)
            .catch((B) =>
              Je(B, 12)
                ? B
                : Je(B, 2)
                ? (ye(B.to, T)
                    .then((H) => {
                      Je(H, 20) &&
                        !C.delta &&
                        C.type === Yt.pop &&
                        o.go(-1, !1);
                    })
                    .catch(Bt),
                  Promise.reject())
                : (C.delta && o.go(-C.delta, !1), ee(B, T, te))
            )
            .then((B) => {
              (B = B || ue(T, te, !1)),
                B &&
                  (C.delta
                    ? o.go(-C.delta, !1)
                    : C.type === Yt.pop && Je(B, 20) && o.go(-1, !1)),
                oe(T, te, B);
            })
            .catch(Bt);
      }));
  }
  let Ve = It(),
    pt = It(),
    ie;
  function ee(m, O, C) {
    we(m);
    const T = pt.list();
    return (
      T.length ? T.forEach((Q) => Q(m, O, C)) : console.error(m),
      Promise.reject(m)
    );
  }
  function Y() {
    return ie && c.value !== Qe
      ? Promise.resolve()
      : new Promise((m, O) => {
          Ve.add([m, O]);
        });
  }
  function we(m) {
    return (
      ie ||
        ((ie = !m),
        Se(),
        Ve.list().forEach(([O, C]) => (m ? C(m) : O())),
        Ve.reset()),
      m
    );
  }
  function gt(m, O, C, T) {
    const { scrollBehavior: Q } = e;
    if (!xt || !Q) return Promise.resolve();
    const te =
      (!C && fa(fo(m.fullPath, 0))) ||
      ((T || !C) && history.state && history.state.scroll) ||
      null;
    return Vo()
      .then(() => Q(m, O, te))
      .then((B) => B && aa(B))
      .catch((B) => ee(B, m, O));
  }
  const Ue = (m) => o.go(m);
  let Ne;
  const Ce = new Set();
  return {
    currentRoute: c,
    addRoute: _,
    removeRoute: A,
    hasRoute: P,
    getRoutes: M,
    resolve: R,
    options: e,
    push: W,
    replace: se,
    go: Ue,
    back: () => Ue(-1),
    forward: () => Ue(1),
    beforeEach: s.add,
    beforeResolve: i.add,
    afterEach: l.add,
    onError: pt.add,
    isReady: Y,
    install(m) {
      const O = this;
      m.component("RouterLink", Ya),
        m.component("RouterView", Za),
        (m.config.globalProperties.$router = O),
        Object.defineProperty(m.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => Lt(c),
        }),
        xt &&
          !Ne &&
          c.value === Qe &&
          ((Ne = !0), W(o.location).catch((Q) => {}));
      const C = {};
      for (const Q in Qe) C[Q] = Be(() => c.value[Q]);
      m.provide(kr, O), m.provide(Ss, Qt(C)), m.provide(or, c);
      const T = m.unmount;
      Ce.add(m),
        (m.unmount = function () {
          Ce.delete(m),
            Ce.size < 1 &&
              ((u = Qe),
              fe && fe(),
              (fe = null),
              (c.value = Qe),
              (Ne = !1),
              (ie = !1)),
            T();
        });
    },
  };
}
function bt(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function eu(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < s; i++) {
    const l = t.matched[i];
    l && (e.matched.find((u) => At(u, l)) ? r.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((u) => At(u, c)) || o.push(c));
  }
  return [n, r, o];
}
const tu = Ga({ history: ga("/"), routes: [] });
const Bs = hc(Jc);
Bs.use(tu);
Bs.mount("#app");
