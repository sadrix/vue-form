var i = (e, r, s) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, s);
};
class n {
  constructor() {
    this.errors = {};
  }
  has(r) {
    return this.errors ? !!this.errors[r] : !1;
  }
  passed() {
    return Object.keys(this.errors).length === 0 && this.errors.constructor === Object;
  }
  set(r, s = []) {
    if (!s || s.length === 0)
      this.errors = r;
    else
      for (let t in r)
        s.includes(t) && (this.errors[t] = r[t]);
  }
  get(r) {
    return this.has(r) ? typeof this.errors[r] == "array" ? this.errors[r][0] : this.errors[r] : "";
  }
  add(r) {
    let s = new Object();
    s = Object.assign(this.errors, r), this.errors = s, console.log(this.errors);
  }
  clear(r) {
    if (typeof r == "string")
      this.errors[r] = [];
    else if (typeof r == "array")
      r.forEach((s) => {
        this.errors[s] = [];
      });
    else
      return this.errors = {};
  }
}
var o;
class h {
  constructor(r) {
    i(this, o, []);
    for (const [s, t] of Object.entries(r))
      ["errors", "__fields"].includes(s) || (this[s] = t, this.__fields.push(s));
    this.errors = new n();
  }
  has(r) {
    return this.__fields.includes(r);
  }
  get(r) {
    return this.has(r) ? this[r] : null;
  }
  all() {
    let r = {};
    return this.__fields.map((s) => {
      r[s] = this.get(s);
    }), r;
  }
  only(r) {
    let s = {};
    return typeof r == "string" ? s[r] = this.has(r) ? this[r] : null : r.map((t) => {
      this.has(t) && (s[t] = this.get(t));
    }), s;
  }
  except(r) {
    let s = {};
    return this.__fields.map((t) => {
      typeof r == "string" && (t !== r ? s[t] = this.get(t) : r.includes(t) || (s[t] = this.get(t)));
    }), s;
  }
}
o = new WeakMap();
const c = {
  install(e, r = "Form") {
    try {
      r = r || "Form", e.config.globalProperties[`$${r}`] = h, window[r] = h;
    } catch {
      console.warn("[Sadrix-Vue-Fomr]: propName is invalid: " + r);
    }
  }
};
export {
  c as default
};
