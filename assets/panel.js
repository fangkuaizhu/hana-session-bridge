var kv = { exports: {} }, Tg = {};
var XE;
function GT() {
  if (XE) return Tg;
  XE = 1;
  var b = /* @__PURE__ */ Symbol.for("react.transitional.element"), z = /* @__PURE__ */ Symbol.for("react.fragment");
  function F(E, ne, ce) {
    var ye = null;
    if (ce !== void 0 && (ye = "" + ce), ne.key !== void 0 && (ye = "" + ne.key), "key" in ne) {
      ce = {};
      for (var $ in ne)
        $ !== "key" && (ce[$] = ne[$]);
    } else ce = ne;
    return ne = ce.ref, {
      $$typeof: b,
      type: E,
      key: ye,
      ref: ne !== void 0 ? ne : null,
      props: ce
    };
  }
  return Tg.Fragment = z, Tg.jsx = F, Tg.jsxs = F, Tg;
}
var Ag = {}, Wv = { exports: {} }, We = {};
var QE;
function LT() {
  if (QE) return We;
  QE = 1;
  var b = /* @__PURE__ */ Symbol.for("react.transitional.element"), z = /* @__PURE__ */ Symbol.for("react.portal"), F = /* @__PURE__ */ Symbol.for("react.fragment"), E = /* @__PURE__ */ Symbol.for("react.strict_mode"), ne = /* @__PURE__ */ Symbol.for("react.profiler"), ce = /* @__PURE__ */ Symbol.for("react.consumer"), ye = /* @__PURE__ */ Symbol.for("react.context"), $ = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), V = /* @__PURE__ */ Symbol.for("react.memo"), re = /* @__PURE__ */ Symbol.for("react.lazy"), j = /* @__PURE__ */ Symbol.for("react.activity"), A = Symbol.iterator;
  function te(S) {
    return S === null || typeof S != "object" ? null : (S = A && S[A] || S["@@iterator"], typeof S == "function" ? S : null);
  }
  var de = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Je = Object.assign, tt = {};
  function Ke(S, q, ae) {
    this.props = S, this.context = q, this.refs = tt, this.updater = ae || de;
  }
  Ke.prototype.isReactComponent = {}, Ke.prototype.setState = function(S, q) {
    if (typeof S != "object" && typeof S != "function" && S != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, S, q, "setState");
  }, Ke.prototype.forceUpdate = function(S) {
    this.updater.enqueueForceUpdate(this, S, "forceUpdate");
  };
  function Ft() {
  }
  Ft.prototype = Ke.prototype;
  function pt(S, q, ae) {
    this.props = S, this.context = q, this.refs = tt, this.updater = ae || de;
  }
  var $e = pt.prototype = new Ft();
  $e.constructor = pt, Je($e, Ke.prototype), $e.isPureReactComponent = !0;
  var st = Array.isArray;
  function Nt() {
  }
  var Ae = { H: null, A: null, T: null, S: null }, Ye = Object.prototype.hasOwnProperty;
  function Fe(S, q, ae) {
    var le = ae.ref;
    return {
      $$typeof: b,
      type: S,
      key: q,
      ref: le !== void 0 ? le : null,
      props: ae
    };
  }
  function ge(S, q) {
    return Fe(S.type, q, S.props);
  }
  function Gt(S) {
    return typeof S == "object" && S !== null && S.$$typeof === b;
  }
  function Te(S) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + S.replace(/[=:]/g, function(ae) {
      return q[ae];
    });
  }
  var Xe = /\/+/g;
  function Kt(S, q) {
    return typeof S == "object" && S !== null && S.key != null ? Te("" + S.key) : q.toString(36);
  }
  function Lt(S) {
    switch (S.status) {
      case "fulfilled":
        return S.value;
      case "rejected":
        throw S.reason;
      default:
        switch (typeof S.status == "string" ? S.then(Nt, Nt) : (S.status = "pending", S.then(
          function(q) {
            S.status === "pending" && (S.status = "fulfilled", S.value = q);
          },
          function(q) {
            S.status === "pending" && (S.status = "rejected", S.reason = q);
          }
        )), S.status) {
          case "fulfilled":
            return S.value;
          case "rejected":
            throw S.reason;
        }
    }
    throw S;
  }
  function U(S, q, ae, le, _e) {
    var Qe = typeof S;
    (Qe === "undefined" || Qe === "boolean") && (S = null);
    var Me = !1;
    if (S === null) Me = !0;
    else
      switch (Qe) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (S.$$typeof) {
            case b:
            case z:
              Me = !0;
              break;
            case re:
              return Me = S._init, U(
                Me(S._payload),
                q,
                ae,
                le,
                _e
              );
          }
      }
    if (Me)
      return _e = _e(S), Me = le === "" ? "." + Kt(S, 0) : le, st(_e) ? (ae = "", Me != null && (ae = Me.replace(Xe, "$&/") + "/"), U(_e, q, ae, "", function(wa) {
        return wa;
      })) : _e != null && (Gt(_e) && (_e = ge(
        _e,
        ae + (_e.key == null || S && S.key === _e.key ? "" : ("" + _e.key).replace(
          Xe,
          "$&/"
        ) + "/") + Me
      )), q.push(_e)), 1;
    Me = 0;
    var $t = le === "" ? "." : le + ":";
    if (st(S))
      for (var bt = 0; bt < S.length; bt++)
        le = S[bt], Qe = $t + Kt(le, bt), Me += U(
          le,
          q,
          ae,
          Qe,
          _e
        );
    else if (bt = te(S), typeof bt == "function")
      for (S = bt.call(S), bt = 0; !(le = S.next()).done; )
        le = le.value, Qe = $t + Kt(le, bt++), Me += U(
          le,
          q,
          ae,
          Qe,
          _e
        );
    else if (Qe === "object") {
      if (typeof S.then == "function")
        return U(
          Lt(S),
          q,
          ae,
          le,
          _e
        );
      throw q = String(S), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Me;
  }
  function J(S, q, ae) {
    if (S == null) return S;
    var le = [], _e = 0;
    return U(S, le, "", "", function(Qe) {
      return q.call(ae, Qe, _e++);
    }), le;
  }
  function ie(S) {
    if (S._status === -1) {
      var q = S._result;
      q = q(), q.then(
        function(ae) {
          (S._status === 0 || S._status === -1) && (S._status = 1, S._result = ae);
        },
        function(ae) {
          (S._status === 0 || S._status === -1) && (S._status = 2, S._result = ae);
        }
      ), S._status === -1 && (S._status = 0, S._result = q);
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var Oe = typeof reportError == "function" ? reportError : function(S) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof S == "object" && S !== null && typeof S.message == "string" ? String(S.message) : String(S),
        error: S
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", S);
      return;
    }
    console.error(S);
  }, Ue = {
    map: J,
    forEach: function(S, q, ae) {
      J(
        S,
        function() {
          q.apply(this, arguments);
        },
        ae
      );
    },
    count: function(S) {
      var q = 0;
      return J(S, function() {
        q++;
      }), q;
    },
    toArray: function(S) {
      return J(S, function(q) {
        return q;
      }) || [];
    },
    only: function(S) {
      if (!Gt(S))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return S;
    }
  };
  return We.Activity = j, We.Children = Ue, We.Component = Ke, We.Fragment = F, We.Profiler = ne, We.PureComponent = pt, We.StrictMode = E, We.Suspense = P, We.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ae, We.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(S) {
      return Ae.H.useMemoCache(S);
    }
  }, We.cache = function(S) {
    return function() {
      return S.apply(null, arguments);
    };
  }, We.cacheSignal = function() {
    return null;
  }, We.cloneElement = function(S, q, ae) {
    if (S == null)
      throw Error(
        "The argument must be a React element, but you passed " + S + "."
      );
    var le = Je({}, S.props), _e = S.key;
    if (q != null)
      for (Qe in q.key !== void 0 && (_e = "" + q.key), q)
        !Ye.call(q, Qe) || Qe === "key" || Qe === "__self" || Qe === "__source" || Qe === "ref" && q.ref === void 0 || (le[Qe] = q[Qe]);
    var Qe = arguments.length - 2;
    if (Qe === 1) le.children = ae;
    else if (1 < Qe) {
      for (var Me = Array(Qe), $t = 0; $t < Qe; $t++)
        Me[$t] = arguments[$t + 2];
      le.children = Me;
    }
    return Fe(S.type, _e, le);
  }, We.createContext = function(S) {
    return S = {
      $$typeof: ye,
      _currentValue: S,
      _currentValue2: S,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, S.Provider = S, S.Consumer = {
      $$typeof: ce,
      _context: S
    }, S;
  }, We.createElement = function(S, q, ae) {
    var le, _e = {}, Qe = null;
    if (q != null)
      for (le in q.key !== void 0 && (Qe = "" + q.key), q)
        Ye.call(q, le) && le !== "key" && le !== "__self" && le !== "__source" && (_e[le] = q[le]);
    var Me = arguments.length - 2;
    if (Me === 1) _e.children = ae;
    else if (1 < Me) {
      for (var $t = Array(Me), bt = 0; bt < Me; bt++)
        $t[bt] = arguments[bt + 2];
      _e.children = $t;
    }
    if (S && S.defaultProps)
      for (le in Me = S.defaultProps, Me)
        _e[le] === void 0 && (_e[le] = Me[le]);
    return Fe(S, Qe, _e);
  }, We.createRef = function() {
    return { current: null };
  }, We.forwardRef = function(S) {
    return { $$typeof: $, render: S };
  }, We.isValidElement = Gt, We.lazy = function(S) {
    return {
      $$typeof: re,
      _payload: { _status: -1, _result: S },
      _init: ie
    };
  }, We.memo = function(S, q) {
    return {
      $$typeof: V,
      type: S,
      compare: q === void 0 ? null : q
    };
  }, We.startTransition = function(S) {
    var q = Ae.T, ae = {};
    Ae.T = ae;
    try {
      var le = S(), _e = Ae.S;
      _e !== null && _e(ae, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(Nt, Oe);
    } catch (Qe) {
      Oe(Qe);
    } finally {
      q !== null && ae.types !== null && (q.types = ae.types), Ae.T = q;
    }
  }, We.unstable_useCacheRefresh = function() {
    return Ae.H.useCacheRefresh();
  }, We.use = function(S) {
    return Ae.H.use(S);
  }, We.useActionState = function(S, q, ae) {
    return Ae.H.useActionState(S, q, ae);
  }, We.useCallback = function(S, q) {
    return Ae.H.useCallback(S, q);
  }, We.useContext = function(S) {
    return Ae.H.useContext(S);
  }, We.useDebugValue = function() {
  }, We.useDeferredValue = function(S, q) {
    return Ae.H.useDeferredValue(S, q);
  }, We.useEffect = function(S, q) {
    return Ae.H.useEffect(S, q);
  }, We.useEffectEvent = function(S) {
    return Ae.H.useEffectEvent(S);
  }, We.useId = function() {
    return Ae.H.useId();
  }, We.useImperativeHandle = function(S, q, ae) {
    return Ae.H.useImperativeHandle(S, q, ae);
  }, We.useInsertionEffect = function(S, q) {
    return Ae.H.useInsertionEffect(S, q);
  }, We.useLayoutEffect = function(S, q) {
    return Ae.H.useLayoutEffect(S, q);
  }, We.useMemo = function(S, q) {
    return Ae.H.useMemo(S, q);
  }, We.useOptimistic = function(S, q) {
    return Ae.H.useOptimistic(S, q);
  }, We.useReducer = function(S, q, ae) {
    return Ae.H.useReducer(S, q, ae);
  }, We.useRef = function(S) {
    return Ae.H.useRef(S);
  }, We.useState = function(S) {
    return Ae.H.useState(S);
  }, We.useSyncExternalStore = function(S, q, ae) {
    return Ae.H.useSyncExternalStore(
      S,
      q,
      ae
    );
  }, We.useTransition = function() {
    return Ae.H.useTransition();
  }, We.version = "19.2.8", We;
}
var _g = { exports: {} };
_g.exports;
var VE;
function XT() {
  return VE || (VE = 1, (function(b, z) {
    process.env.NODE_ENV !== "production" && (function() {
      function F(g, N) {
        Object.defineProperty(ce.prototype, g, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              N[0],
              N[1]
            );
          }
        });
      }
      function E(g) {
        return g === null || typeof g != "object" ? null : (g = Ci && g[Ci] || g["@@iterator"], typeof g == "function" ? g : null);
      }
      function ne(g, N) {
        g = (g = g.constructor) && (g.displayName || g.name) || "ReactClass";
        var ue = g + "." + N;
        Ui[ue] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          N,
          g
        ), Ui[ue] = !0);
      }
      function ce(g, N, ue) {
        this.props = g, this.context = N, this.refs = Et, this.updater = ue || Ga;
      }
      function ye() {
      }
      function $(g, N, ue) {
        this.props = g, this.context = N, this.refs = Et, this.updater = ue || Ga;
      }
      function P() {
      }
      function V(g) {
        return "" + g;
      }
      function re(g) {
        try {
          V(g);
          var N = !1;
        } catch {
          N = !0;
        }
        if (N) {
          N = console;
          var ue = N.error, oe = typeof Symbol == "function" && Symbol.toStringTag && g[Symbol.toStringTag] || g.constructor.name || "Object";
          return ue.call(
            N,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            oe
          ), V(g);
        }
      }
      function j(g) {
        if (g == null) return null;
        if (typeof g == "function")
          return g.$$typeof === gs ? null : g.displayName || g.name || null;
        if (typeof g == "string") return g;
        switch (g) {
          case S:
            return "Fragment";
          case ae:
            return "Profiler";
          case q:
            return "StrictMode";
          case Me:
            return "Suspense";
          case $t:
            return "SuspenseList";
          case he:
            return "Activity";
        }
        if (typeof g == "object")
          switch (typeof g.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), g.$$typeof) {
            case Ue:
              return "Portal";
            case _e:
              return g.displayName || "Context";
            case le:
              return (g._context.displayName || "Context") + ".Consumer";
            case Qe:
              var N = g.render;
              return g = g.displayName, g || (g = N.displayName || N.name || "", g = g !== "" ? "ForwardRef(" + g + ")" : "ForwardRef"), g;
            case bt:
              return N = g.displayName || null, N !== null ? N : j(g.type) || "Memo";
            case wa:
              N = g._payload, g = g._init;
              try {
                return j(g(N));
              } catch {
              }
          }
        return null;
      }
      function A(g) {
        if (g === S) return "<>";
        if (typeof g == "object" && g !== null && g.$$typeof === wa)
          return "<...>";
        try {
          var N = j(g);
          return N ? "<" + N + ">" : "<...>";
        } catch {
          return "<...>";
        }
      }
      function te() {
        var g = ve.A;
        return g === null ? null : g.getOwner();
      }
      function de() {
        return Error("react-stack-top-frame");
      }
      function Je(g) {
        if (Hi.call(g, "key")) {
          var N = Object.getOwnPropertyDescriptor(g, "key").get;
          if (N && N.isReactWarning) return !1;
        }
        return g.key !== void 0;
      }
      function tt(g, N) {
        function ue() {
          Ac || (Ac = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            N
          ));
        }
        ue.isReactWarning = !0, Object.defineProperty(g, "key", {
          get: ue,
          configurable: !0
        });
      }
      function Ke() {
        var g = j(this.type);
        return ud[g] || (ud[g] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), g = this.props.ref, g !== void 0 ? g : null;
      }
      function Ft(g, N, ue, oe, Se, Ne) {
        var be = ue.ref;
        return g = {
          $$typeof: Oe,
          type: g,
          key: N,
          props: ue,
          _owner: oe
        }, (be !== void 0 ? be : null) !== null ? Object.defineProperty(g, "ref", {
          enumerable: !1,
          get: Ke
        }) : Object.defineProperty(g, "ref", { enumerable: !1, value: null }), g._store = {}, Object.defineProperty(g._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(g, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.defineProperty(g, "_debugStack", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: Se
        }), Object.defineProperty(g, "_debugTask", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: Ne
        }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
      }
      function pt(g, N) {
        return N = Ft(
          g.type,
          N,
          g.props,
          g._owner,
          g._debugStack,
          g._debugTask
        ), g._store && (N._store.validated = g._store.validated), N;
      }
      function $e(g) {
        st(g) ? g._store && (g._store.validated = 1) : typeof g == "object" && g !== null && g.$$typeof === wa && (g._payload.status === "fulfilled" ? st(g._payload.value) && g._payload.value._store && (g._payload.value._store.validated = 1) : g._store && (g._store.validated = 1));
      }
      function st(g) {
        return typeof g == "object" && g !== null && g.$$typeof === Oe;
      }
      function Nt(g) {
        var N = { "=": "=0", ":": "=2" };
        return "$" + g.replace(/[=:]/g, function(ue) {
          return N[ue];
        });
      }
      function Ae(g, N) {
        return typeof g == "object" && g !== null && g.key != null ? (re(g.key), Nt("" + g.key)) : N.toString(36);
      }
      function Ye(g) {
        switch (g.status) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
          default:
            switch (typeof g.status == "string" ? g.then(P, P) : (g.status = "pending", g.then(
              function(N) {
                g.status === "pending" && (g.status = "fulfilled", g.value = N);
              },
              function(N) {
                g.status === "pending" && (g.status = "rejected", g.reason = N);
              }
            )), g.status) {
              case "fulfilled":
                return g.value;
              case "rejected":
                throw g.reason;
            }
        }
        throw g;
      }
      function Fe(g, N, ue, oe, Se) {
        var Ne = typeof g;
        (Ne === "undefined" || Ne === "boolean") && (g = null);
        var be = !1;
        if (g === null) be = !0;
        else
          switch (Ne) {
            case "bigint":
            case "string":
            case "number":
              be = !0;
              break;
            case "object":
              switch (g.$$typeof) {
                case Oe:
                case Ue:
                  be = !0;
                  break;
                case wa:
                  return be = g._init, Fe(
                    be(g._payload),
                    N,
                    ue,
                    oe,
                    Se
                  );
              }
          }
        if (be) {
          be = g, Se = Se(be);
          var it = oe === "" ? "." + Ae(be, 0) : oe;
          return Tc(Se) ? (ue = "", it != null && (ue = it.replace(id, "$&/") + "/"), Fe(Se, N, ue, "", function(la) {
            return la;
          })) : Se != null && (st(Se) && (Se.key != null && (be && be.key === Se.key || re(Se.key)), ue = pt(
            Se,
            ue + (Se.key == null || be && be.key === Se.key ? "" : ("" + Se.key).replace(
              id,
              "$&/"
            ) + "/") + it
          ), oe !== "" && be != null && st(be) && be.key == null && be._store && !be._store.validated && (ue._store.validated = 2), Se = ue), N.push(Se)), 1;
        }
        if (be = 0, it = oe === "" ? "." : oe + ":", Tc(g))
          for (var Ve = 0; Ve < g.length; Ve++)
            oe = g[Ve], Ne = it + Ae(oe, Ve), be += Fe(
              oe,
              N,
              ue,
              Ne,
              Se
            );
        else if (Ve = E(g), typeof Ve == "function")
          for (Ve === g.entries && (Hn || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Hn = !0), g = Ve.call(g), Ve = 0; !(oe = g.next()).done; )
            oe = oe.value, Ne = it + Ae(oe, Ve++), be += Fe(
              oe,
              N,
              ue,
              Ne,
              Se
            );
        else if (Ne === "object") {
          if (typeof g.then == "function")
            return Fe(
              Ye(g),
              N,
              ue,
              oe,
              Se
            );
          throw N = String(g), Error(
            "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return be;
      }
      function ge(g, N, ue) {
        if (g == null) return g;
        var oe = [], Se = 0;
        return Fe(g, oe, "", "", function(Ne) {
          return N.call(ue, Ne, Se++);
        }), oe;
      }
      function Gt(g) {
        if (g._status === -1) {
          var N = g._ioInfo;
          N != null && (N.start = N.end = performance.now()), N = g._result;
          var ue = N();
          if (ue.then(
            function(Se) {
              if (g._status === 0 || g._status === -1) {
                g._status = 1, g._result = Se;
                var Ne = g._ioInfo;
                Ne != null && (Ne.end = performance.now()), ue.status === void 0 && (ue.status = "fulfilled", ue.value = Se);
              }
            },
            function(Se) {
              if (g._status === 0 || g._status === -1) {
                g._status = 2, g._result = Se;
                var Ne = g._ioInfo;
                Ne != null && (Ne.end = performance.now()), ue.status === void 0 && (ue.status = "rejected", ue.reason = Se);
              }
            }
          ), N = g._ioInfo, N != null) {
            N.value = ue;
            var oe = ue.displayName;
            typeof oe == "string" && (N.name = oe);
          }
          g._status === -1 && (g._status = 0, g._result = ue);
        }
        if (g._status === 1)
          return N = g._result, N === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            N
          ), "default" in N || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            N
          ), N.default;
        throw g._result;
      }
      function Te() {
        var g = ve.H;
        return g === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), g;
      }
      function Xe() {
        ve.asyncTransitions--;
      }
      function Kt(g) {
        if (Oc === null)
          try {
            var N = ("require" + Math.random()).slice(0, 7);
            Oc = (b && b[N]).call(
              b,
              "timers"
            ).setImmediate;
          } catch {
            Oc = function(oe) {
              vs === !1 && (vs = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var Se = new MessageChannel();
              Se.port1.onmessage = oe, Se.port2.postMessage(void 0);
            };
          }
        return Oc(g);
      }
      function Lt(g) {
        return 1 < g.length && typeof AggregateError == "function" ? new AggregateError(g) : g[0];
      }
      function U(g, N) {
        N !== hn - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), hn = N;
      }
      function J(g, N, ue) {
        var oe = ve.actQueue;
        if (oe !== null)
          if (oe.length !== 0)
            try {
              ie(oe), Kt(function() {
                return J(g, N, ue);
              });
              return;
            } catch (Se) {
              ve.thrownErrors.push(Se);
            }
          else ve.actQueue = null;
        0 < ve.thrownErrors.length ? (oe = Lt(ve.thrownErrors), ve.thrownErrors.length = 0, ue(oe)) : N(g);
      }
      function ie(g) {
        if (!La) {
          La = !0;
          var N = 0;
          try {
            for (; N < g.length; N++) {
              var ue = g[N];
              do {
                ve.didUsePromise = !1;
                var oe = ue(!1);
                if (oe !== null) {
                  if (ve.didUsePromise) {
                    g[N] = ue, g.splice(0, N);
                    return;
                  }
                  ue = oe;
                } else break;
              } while (!0);
            }
            g.length = 0;
          } catch (Se) {
            g.splice(0, N + 1), ve.thrownErrors.push(Se);
          } finally {
            La = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var Oe = /* @__PURE__ */ Symbol.for("react.transitional.element"), Ue = /* @__PURE__ */ Symbol.for("react.portal"), S = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), ae = /* @__PURE__ */ Symbol.for("react.profiler"), le = /* @__PURE__ */ Symbol.for("react.consumer"), _e = /* @__PURE__ */ Symbol.for("react.context"), Qe = /* @__PURE__ */ Symbol.for("react.forward_ref"), Me = /* @__PURE__ */ Symbol.for("react.suspense"), $t = /* @__PURE__ */ Symbol.for("react.suspense_list"), bt = /* @__PURE__ */ Symbol.for("react.memo"), wa = /* @__PURE__ */ Symbol.for("react.lazy"), he = /* @__PURE__ */ Symbol.for("react.activity"), Ci = Symbol.iterator, Ui = {}, Ga = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(g) {
          ne(g, "forceUpdate");
        },
        enqueueReplaceState: function(g) {
          ne(g, "replaceState");
        },
        enqueueSetState: function(g) {
          ne(g, "setState");
        }
      }, ou = Object.assign, Et = {};
      Object.freeze(Et), ce.prototype.isReactComponent = {}, ce.prototype.setState = function(g, N) {
        if (typeof g != "object" && typeof g != "function" && g != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, g, N, "setState");
      }, ce.prototype.forceUpdate = function(g) {
        this.updater.enqueueForceUpdate(this, g, "forceUpdate");
      };
      var ta = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (Ni in ta)
        ta.hasOwnProperty(Ni) && F(Ni, ta[Ni]);
      ye.prototype = ce.prototype, ta = $.prototype = new ye(), ta.constructor = $, ou(ta, ce.prototype), ta.isPureReactComponent = !0;
      var Tc = Array.isArray, gs = /* @__PURE__ */ Symbol.for("react.client.reference"), ve = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, Hi = Object.prototype.hasOwnProperty, fu = console.createTask ? console.createTask : function() {
        return null;
      };
      ta = {
        react_stack_bottom_frame: function(g) {
          return g();
        }
      };
      var Ac, bl, ud = {}, xo = ta.react_stack_bottom_frame.bind(
        ta,
        de
      )(), jo = fu(A(de)), Hn = !1, id = /\/+/g, Bo = typeof reportError == "function" ? reportError : function(g) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var N = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
            error: g
          });
          if (!window.dispatchEvent(N)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", g);
          return;
        }
        console.error(g);
      }, vs = !1, Oc = null, hn = 0, Rl = !1, La = !1, Nl = typeof queueMicrotask == "function" ? function(g) {
        queueMicrotask(function() {
          return queueMicrotask(g);
        });
      } : Kt;
      ta = Object.freeze({
        __proto__: null,
        c: function(g) {
          return Te().useMemoCache(g);
        }
      });
      var Ni = {
        map: ge,
        forEach: function(g, N, ue) {
          ge(
            g,
            function() {
              N.apply(this, arguments);
            },
            ue
          );
        },
        count: function(g) {
          var N = 0;
          return ge(g, function() {
            N++;
          }), N;
        },
        toArray: function(g) {
          return ge(g, function(N) {
            return N;
          }) || [];
        },
        only: function(g) {
          if (!st(g))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return g;
        }
      };
      z.Activity = he, z.Children = Ni, z.Component = ce, z.Fragment = S, z.Profiler = ae, z.PureComponent = $, z.StrictMode = q, z.Suspense = Me, z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ve, z.__COMPILER_RUNTIME = ta, z.act = function(g) {
        var N = ve.actQueue, ue = hn;
        hn++;
        var oe = ve.actQueue = N !== null ? N : [], Se = !1;
        try {
          var Ne = g();
        } catch (Ve) {
          ve.thrownErrors.push(Ve);
        }
        if (0 < ve.thrownErrors.length)
          throw U(N, ue), g = Lt(ve.thrownErrors), ve.thrownErrors.length = 0, g;
        if (Ne !== null && typeof Ne == "object" && typeof Ne.then == "function") {
          var be = Ne;
          return Nl(function() {
            Se || Rl || (Rl = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(Ve, la) {
              Se = !0, be.then(
                function(mn) {
                  if (U(N, ue), ue === 0) {
                    try {
                      ie(oe), Kt(function() {
                        return J(
                          mn,
                          Ve,
                          la
                        );
                      });
                    } catch (qo) {
                      ve.thrownErrors.push(qo);
                    }
                    if (0 < ve.thrownErrors.length) {
                      var xi = Lt(
                        ve.thrownErrors
                      );
                      ve.thrownErrors.length = 0, la(xi);
                    }
                  } else Ve(mn);
                },
                function(mn) {
                  U(N, ue), 0 < ve.thrownErrors.length && (mn = Lt(
                    ve.thrownErrors
                  ), ve.thrownErrors.length = 0), la(mn);
                }
              );
            }
          };
        }
        var it = Ne;
        if (U(N, ue), ue === 0 && (ie(oe), oe.length !== 0 && Nl(function() {
          Se || Rl || (Rl = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ve.actQueue = null), 0 < ve.thrownErrors.length)
          throw g = Lt(ve.thrownErrors), ve.thrownErrors.length = 0, g;
        return {
          then: function(Ve, la) {
            Se = !0, ue === 0 ? (ve.actQueue = oe, Kt(function() {
              return J(
                it,
                Ve,
                la
              );
            })) : Ve(it);
          }
        };
      }, z.cache = function(g) {
        return function() {
          return g.apply(null, arguments);
        };
      }, z.cacheSignal = function() {
        return null;
      }, z.captureOwnerStack = function() {
        var g = ve.getCurrentStack;
        return g === null ? null : g();
      }, z.cloneElement = function(g, N, ue) {
        if (g == null)
          throw Error(
            "The argument must be a React element, but you passed " + g + "."
          );
        var oe = ou({}, g.props), Se = g.key, Ne = g._owner;
        if (N != null) {
          var be;
          e: {
            if (Hi.call(N, "ref") && (be = Object.getOwnPropertyDescriptor(
              N,
              "ref"
            ).get) && be.isReactWarning) {
              be = !1;
              break e;
            }
            be = N.ref !== void 0;
          }
          be && (Ne = te()), Je(N) && (re(N.key), Se = "" + N.key);
          for (it in N)
            !Hi.call(N, it) || it === "key" || it === "__self" || it === "__source" || it === "ref" && N.ref === void 0 || (oe[it] = N[it]);
        }
        var it = arguments.length - 2;
        if (it === 1) oe.children = ue;
        else if (1 < it) {
          be = Array(it);
          for (var Ve = 0; Ve < it; Ve++)
            be[Ve] = arguments[Ve + 2];
          oe.children = be;
        }
        for (oe = Ft(
          g.type,
          Se,
          oe,
          Ne,
          g._debugStack,
          g._debugTask
        ), Se = 2; Se < arguments.length; Se++)
          $e(arguments[Se]);
        return oe;
      }, z.createContext = function(g) {
        return g = {
          $$typeof: _e,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, g.Provider = g, g.Consumer = {
          $$typeof: le,
          _context: g
        }, g._currentRenderer = null, g._currentRenderer2 = null, g;
      }, z.createElement = function(g, N, ue) {
        for (var oe = 2; oe < arguments.length; oe++)
          $e(arguments[oe]);
        oe = {};
        var Se = null;
        if (N != null)
          for (Ve in bl || !("__self" in N) || "key" in N || (bl = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), Je(N) && (re(N.key), Se = "" + N.key), N)
            Hi.call(N, Ve) && Ve !== "key" && Ve !== "__self" && Ve !== "__source" && (oe[Ve] = N[Ve]);
        var Ne = arguments.length - 2;
        if (Ne === 1) oe.children = ue;
        else if (1 < Ne) {
          for (var be = Array(Ne), it = 0; it < Ne; it++)
            be[it] = arguments[it + 2];
          Object.freeze && Object.freeze(be), oe.children = be;
        }
        if (g && g.defaultProps)
          for (Ve in Ne = g.defaultProps, Ne)
            oe[Ve] === void 0 && (oe[Ve] = Ne[Ve]);
        Se && tt(
          oe,
          typeof g == "function" ? g.displayName || g.name || "Unknown" : g
        );
        var Ve = 1e4 > ve.recentlyCreatedOwnerStacks++;
        return Ft(
          g,
          Se,
          oe,
          te(),
          Ve ? Error("react-stack-top-frame") : xo,
          Ve ? fu(A(g)) : jo
        );
      }, z.createRef = function() {
        var g = { current: null };
        return Object.seal(g), g;
      }, z.forwardRef = function(g) {
        g != null && g.$$typeof === bt ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof g != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          g === null ? "null" : typeof g
        ) : g.length !== 0 && g.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          g.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), g != null && g.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var N = { $$typeof: Qe, render: g }, ue;
        return Object.defineProperty(N, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return ue;
          },
          set: function(oe) {
            ue = oe, g.name || g.displayName || (Object.defineProperty(g, "name", { value: oe }), g.displayName = oe);
          }
        }), N;
      }, z.isValidElement = st, z.lazy = function(g) {
        g = { _status: -1, _result: g };
        var N = {
          $$typeof: wa,
          _payload: g,
          _init: Gt
        }, ue = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        return g._ioInfo = ue, N._debugInfo = [{ awaited: ue }], N;
      }, z.memo = function(g, N) {
        g == null && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          g === null ? "null" : typeof g
        ), N = {
          $$typeof: bt,
          type: g,
          compare: N === void 0 ? null : N
        };
        var ue;
        return Object.defineProperty(N, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return ue;
          },
          set: function(oe) {
            ue = oe, g.name || g.displayName || (Object.defineProperty(g, "name", { value: oe }), g.displayName = oe);
          }
        }), N;
      }, z.startTransition = function(g) {
        var N = ve.T, ue = {};
        ue._updatedFibers = /* @__PURE__ */ new Set(), ve.T = ue;
        try {
          var oe = g(), Se = ve.S;
          Se !== null && Se(ue, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && (ve.asyncTransitions++, oe.then(Xe, Xe), oe.then(P, Bo));
        } catch (Ne) {
          Bo(Ne);
        } finally {
          N === null && ue._updatedFibers && (g = ue._updatedFibers.size, ue._updatedFibers.clear(), 10 < g && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), N !== null && ue.types !== null && (N.types !== null && N.types !== ue.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), N.types = ue.types), ve.T = N;
        }
      }, z.unstable_useCacheRefresh = function() {
        return Te().useCacheRefresh();
      }, z.use = function(g) {
        return Te().use(g);
      }, z.useActionState = function(g, N, ue) {
        return Te().useActionState(
          g,
          N,
          ue
        );
      }, z.useCallback = function(g, N) {
        return Te().useCallback(g, N);
      }, z.useContext = function(g) {
        var N = Te();
        return g.$$typeof === le && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), N.useContext(g);
      }, z.useDebugValue = function(g, N) {
        return Te().useDebugValue(g, N);
      }, z.useDeferredValue = function(g, N) {
        return Te().useDeferredValue(g, N);
      }, z.useEffect = function(g, N) {
        return g == null && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), Te().useEffect(g, N);
      }, z.useEffectEvent = function(g) {
        return Te().useEffectEvent(g);
      }, z.useId = function() {
        return Te().useId();
      }, z.useImperativeHandle = function(g, N, ue) {
        return Te().useImperativeHandle(g, N, ue);
      }, z.useInsertionEffect = function(g, N) {
        return g == null && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), Te().useInsertionEffect(g, N);
      }, z.useLayoutEffect = function(g, N) {
        return g == null && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), Te().useLayoutEffect(g, N);
      }, z.useMemo = function(g, N) {
        return Te().useMemo(g, N);
      }, z.useOptimistic = function(g, N) {
        return Te().useOptimistic(g, N);
      }, z.useReducer = function(g, N, ue) {
        return Te().useReducer(g, N, ue);
      }, z.useRef = function(g) {
        return Te().useRef(g);
      }, z.useState = function(g) {
        return Te().useState(g);
      }, z.useSyncExternalStore = function(g, N, ue) {
        return Te().useSyncExternalStore(
          g,
          N,
          ue
        );
      }, z.useTransition = function() {
        return Te().useTransition();
      }, z.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(_g, _g.exports)), _g.exports;
}
var ZE;
function _m() {
  return ZE || (ZE = 1, process.env.NODE_ENV === "production" ? Wv.exports = LT() : Wv.exports = XT()), Wv.exports;
}
var JE;
function QT() {
  return JE || (JE = 1, process.env.NODE_ENV !== "production" && (function() {
    function b(S) {
      if (S == null) return null;
      if (typeof S == "function")
        return S.$$typeof === Gt ? null : S.displayName || S.name || null;
      if (typeof S == "string") return S;
      switch (S) {
        case tt:
          return "Fragment";
        case Ft:
          return "Profiler";
        case Ke:
          return "StrictMode";
        case Nt:
          return "Suspense";
        case Ae:
          return "SuspenseList";
        case ge:
          return "Activity";
      }
      if (typeof S == "object")
        switch (typeof S.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), S.$$typeof) {
          case Je:
            return "Portal";
          case $e:
            return S.displayName || "Context";
          case pt:
            return (S._context.displayName || "Context") + ".Consumer";
          case st:
            var q = S.render;
            return S = S.displayName, S || (S = q.displayName || q.name || "", S = S !== "" ? "ForwardRef(" + S + ")" : "ForwardRef"), S;
          case Ye:
            return q = S.displayName || null, q !== null ? q : b(S.type) || "Memo";
          case Fe:
            q = S._payload, S = S._init;
            try {
              return b(S(q));
            } catch {
            }
        }
      return null;
    }
    function z(S) {
      return "" + S;
    }
    function F(S) {
      try {
        z(S);
        var q = !1;
      } catch {
        q = !0;
      }
      if (q) {
        q = console;
        var ae = q.error, le = typeof Symbol == "function" && Symbol.toStringTag && S[Symbol.toStringTag] || S.constructor.name || "Object";
        return ae.call(
          q,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          le
        ), z(S);
      }
    }
    function E(S) {
      if (S === tt) return "<>";
      if (typeof S == "object" && S !== null && S.$$typeof === Fe)
        return "<...>";
      try {
        var q = b(S);
        return q ? "<" + q + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function ne() {
      var S = Te.A;
      return S === null ? null : S.getOwner();
    }
    function ce() {
      return Error("react-stack-top-frame");
    }
    function ye(S) {
      if (Xe.call(S, "key")) {
        var q = Object.getOwnPropertyDescriptor(S, "key").get;
        if (q && q.isReactWarning) return !1;
      }
      return S.key !== void 0;
    }
    function $(S, q) {
      function ae() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          q
        ));
      }
      ae.isReactWarning = !0, Object.defineProperty(S, "key", {
        get: ae,
        configurable: !0
      });
    }
    function P() {
      var S = b(this.type);
      return J[S] || (J[S] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), S = this.props.ref, S !== void 0 ? S : null;
    }
    function V(S, q, ae, le, _e, Qe) {
      var Me = ae.ref;
      return S = {
        $$typeof: de,
        type: S,
        key: q,
        props: ae,
        _owner: le
      }, (Me !== void 0 ? Me : null) !== null ? Object.defineProperty(S, "ref", {
        enumerable: !1,
        get: P
      }) : Object.defineProperty(S, "ref", { enumerable: !1, value: null }), S._store = {}, Object.defineProperty(S._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(S, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(S, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: _e
      }), Object.defineProperty(S, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Qe
      }), Object.freeze && (Object.freeze(S.props), Object.freeze(S)), S;
    }
    function re(S, q, ae, le, _e, Qe) {
      var Me = q.children;
      if (Me !== void 0)
        if (le)
          if (Kt(Me)) {
            for (le = 0; le < Me.length; le++)
              j(Me[le]);
            Object.freeze && Object.freeze(Me);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else j(Me);
      if (Xe.call(q, "key")) {
        Me = b(S);
        var $t = Object.keys(q).filter(function(wa) {
          return wa !== "key";
        });
        le = 0 < $t.length ? "{key: someKey, " + $t.join(": ..., ") + ": ...}" : "{key: someKey}", Ue[Me + le] || ($t = 0 < $t.length ? "{" + $t.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          le,
          Me,
          $t,
          Me
        ), Ue[Me + le] = !0);
      }
      if (Me = null, ae !== void 0 && (F(ae), Me = "" + ae), ye(q) && (F(q.key), Me = "" + q.key), "key" in q) {
        ae = {};
        for (var bt in q)
          bt !== "key" && (ae[bt] = q[bt]);
      } else ae = q;
      return Me && $(
        ae,
        typeof S == "function" ? S.displayName || S.name || "Unknown" : S
      ), V(
        S,
        Me,
        ae,
        ne(),
        _e,
        Qe
      );
    }
    function j(S) {
      A(S) ? S._store && (S._store.validated = 1) : typeof S == "object" && S !== null && S.$$typeof === Fe && (S._payload.status === "fulfilled" ? A(S._payload.value) && S._payload.value._store && (S._payload.value._store.validated = 1) : S._store && (S._store.validated = 1));
    }
    function A(S) {
      return typeof S == "object" && S !== null && S.$$typeof === de;
    }
    var te = _m(), de = /* @__PURE__ */ Symbol.for("react.transitional.element"), Je = /* @__PURE__ */ Symbol.for("react.portal"), tt = /* @__PURE__ */ Symbol.for("react.fragment"), Ke = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ft = /* @__PURE__ */ Symbol.for("react.profiler"), pt = /* @__PURE__ */ Symbol.for("react.consumer"), $e = /* @__PURE__ */ Symbol.for("react.context"), st = /* @__PURE__ */ Symbol.for("react.forward_ref"), Nt = /* @__PURE__ */ Symbol.for("react.suspense"), Ae = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ye = /* @__PURE__ */ Symbol.for("react.memo"), Fe = /* @__PURE__ */ Symbol.for("react.lazy"), ge = /* @__PURE__ */ Symbol.for("react.activity"), Gt = /* @__PURE__ */ Symbol.for("react.client.reference"), Te = te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Xe = Object.prototype.hasOwnProperty, Kt = Array.isArray, Lt = console.createTask ? console.createTask : function() {
      return null;
    };
    te = {
      react_stack_bottom_frame: function(S) {
        return S();
      }
    };
    var U, J = {}, ie = te.react_stack_bottom_frame.bind(
      te,
      ce
    )(), Oe = Lt(E(ce)), Ue = {};
    Ag.Fragment = tt, Ag.jsx = function(S, q, ae) {
      var le = 1e4 > Te.recentlyCreatedOwnerStacks++;
      return re(
        S,
        q,
        ae,
        !1,
        le ? Error("react-stack-top-frame") : ie,
        le ? Lt(E(S)) : Oe
      );
    }, Ag.jsxs = function(S, q, ae) {
      var le = 1e4 > Te.recentlyCreatedOwnerStacks++;
      return re(
        S,
        q,
        ae,
        !0,
        le ? Error("react-stack-top-frame") : ie,
        le ? Lt(E(S)) : Oe
      );
    };
  })()), Ag;
}
var KE;
function VT() {
  return KE || (KE = 1, process.env.NODE_ENV === "production" ? kv.exports = GT() : kv.exports = QT()), kv.exports;
}
var ee = VT(), Dt = _m(), Fv = { exports: {} }, Og = {}, Iv = { exports: {} }, RS = {};
var $E;
function ZT() {
  return $E || ($E = 1, (function(b) {
    function z(U, J) {
      var ie = U.length;
      U.push(J);
      e: for (; 0 < ie; ) {
        var Oe = ie - 1 >>> 1, Ue = U[Oe];
        if (0 < ne(Ue, J))
          U[Oe] = J, U[ie] = Ue, ie = Oe;
        else break e;
      }
    }
    function F(U) {
      return U.length === 0 ? null : U[0];
    }
    function E(U) {
      if (U.length === 0) return null;
      var J = U[0], ie = U.pop();
      if (ie !== J) {
        U[0] = ie;
        e: for (var Oe = 0, Ue = U.length, S = Ue >>> 1; Oe < S; ) {
          var q = 2 * (Oe + 1) - 1, ae = U[q], le = q + 1, _e = U[le];
          if (0 > ne(ae, ie))
            le < Ue && 0 > ne(_e, ae) ? (U[Oe] = _e, U[le] = ie, Oe = le) : (U[Oe] = ae, U[q] = ie, Oe = q);
          else if (le < Ue && 0 > ne(_e, ie))
            U[Oe] = _e, U[le] = ie, Oe = le;
          else break e;
        }
      }
      return J;
    }
    function ne(U, J) {
      var ie = U.sortIndex - J.sortIndex;
      return ie !== 0 ? ie : U.id - J.id;
    }
    if (b.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ce = performance;
      b.unstable_now = function() {
        return ce.now();
      };
    } else {
      var ye = Date, $ = ye.now();
      b.unstable_now = function() {
        return ye.now() - $;
      };
    }
    var P = [], V = [], re = 1, j = null, A = 3, te = !1, de = !1, Je = !1, tt = !1, Ke = typeof setTimeout == "function" ? setTimeout : null, Ft = typeof clearTimeout == "function" ? clearTimeout : null, pt = typeof setImmediate < "u" ? setImmediate : null;
    function $e(U) {
      for (var J = F(V); J !== null; ) {
        if (J.callback === null) E(V);
        else if (J.startTime <= U)
          E(V), J.sortIndex = J.expirationTime, z(P, J);
        else break;
        J = F(V);
      }
    }
    function st(U) {
      if (Je = !1, $e(U), !de)
        if (F(P) !== null)
          de = !0, Nt || (Nt = !0, Te());
        else {
          var J = F(V);
          J !== null && Lt(st, J.startTime - U);
        }
    }
    var Nt = !1, Ae = -1, Ye = 5, Fe = -1;
    function ge() {
      return tt ? !0 : !(b.unstable_now() - Fe < Ye);
    }
    function Gt() {
      if (tt = !1, Nt) {
        var U = b.unstable_now();
        Fe = U;
        var J = !0;
        try {
          e: {
            de = !1, Je && (Je = !1, Ft(Ae), Ae = -1), te = !0;
            var ie = A;
            try {
              t: {
                for ($e(U), j = F(P); j !== null && !(j.expirationTime > U && ge()); ) {
                  var Oe = j.callback;
                  if (typeof Oe == "function") {
                    j.callback = null, A = j.priorityLevel;
                    var Ue = Oe(
                      j.expirationTime <= U
                    );
                    if (U = b.unstable_now(), typeof Ue == "function") {
                      j.callback = Ue, $e(U), J = !0;
                      break t;
                    }
                    j === F(P) && E(P), $e(U);
                  } else E(P);
                  j = F(P);
                }
                if (j !== null) J = !0;
                else {
                  var S = F(V);
                  S !== null && Lt(
                    st,
                    S.startTime - U
                  ), J = !1;
                }
              }
              break e;
            } finally {
              j = null, A = ie, te = !1;
            }
            J = void 0;
          }
        } finally {
          J ? Te() : Nt = !1;
        }
      }
    }
    var Te;
    if (typeof pt == "function")
      Te = function() {
        pt(Gt);
      };
    else if (typeof MessageChannel < "u") {
      var Xe = new MessageChannel(), Kt = Xe.port2;
      Xe.port1.onmessage = Gt, Te = function() {
        Kt.postMessage(null);
      };
    } else
      Te = function() {
        Ke(Gt, 0);
      };
    function Lt(U, J) {
      Ae = Ke(function() {
        U(b.unstable_now());
      }, J);
    }
    b.unstable_IdlePriority = 5, b.unstable_ImmediatePriority = 1, b.unstable_LowPriority = 4, b.unstable_NormalPriority = 3, b.unstable_Profiling = null, b.unstable_UserBlockingPriority = 2, b.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, b.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ye = 0 < U ? Math.floor(1e3 / U) : 5;
    }, b.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, b.unstable_next = function(U) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = A;
      }
      var ie = A;
      A = J;
      try {
        return U();
      } finally {
        A = ie;
      }
    }, b.unstable_requestPaint = function() {
      tt = !0;
    }, b.unstable_runWithPriority = function(U, J) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var ie = A;
      A = U;
      try {
        return J();
      } finally {
        A = ie;
      }
    }, b.unstable_scheduleCallback = function(U, J, ie) {
      var Oe = b.unstable_now();
      switch (typeof ie == "object" && ie !== null ? (ie = ie.delay, ie = typeof ie == "number" && 0 < ie ? Oe + ie : Oe) : ie = Oe, U) {
        case 1:
          var Ue = -1;
          break;
        case 2:
          Ue = 250;
          break;
        case 5:
          Ue = 1073741823;
          break;
        case 4:
          Ue = 1e4;
          break;
        default:
          Ue = 5e3;
      }
      return Ue = ie + Ue, U = {
        id: re++,
        callback: J,
        priorityLevel: U,
        startTime: ie,
        expirationTime: Ue,
        sortIndex: -1
      }, ie > Oe ? (U.sortIndex = ie, z(V, U), F(P) === null && U === F(V) && (Je ? (Ft(Ae), Ae = -1) : Je = !0, Lt(st, ie - Oe))) : (U.sortIndex = Ue, z(P, U), de || te || (de = !0, Nt || (Nt = !0, Te()))), U;
    }, b.unstable_shouldYield = ge, b.unstable_wrapCallback = function(U) {
      var J = A;
      return function() {
        var ie = A;
        A = J;
        try {
          return U.apply(this, arguments);
        } finally {
          A = ie;
        }
      };
    };
  })(RS)), RS;
}
var _S = {};
var kE;
function JT() {
  return kE || (kE = 1, (function(b) {
    process.env.NODE_ENV !== "production" && (function() {
      function z() {
        if (st = !1, Fe) {
          var U = b.unstable_now();
          Te = U;
          var J = !0;
          try {
            e: {
              pt = !1, $e && ($e = !1, Ae(ge), ge = -1), Ft = !0;
              var ie = Ke;
              try {
                t: {
                  for (ye(U), tt = E(te); tt !== null && !(tt.expirationTime > U && P()); ) {
                    var Oe = tt.callback;
                    if (typeof Oe == "function") {
                      tt.callback = null, Ke = tt.priorityLevel;
                      var Ue = Oe(
                        tt.expirationTime <= U
                      );
                      if (U = b.unstable_now(), typeof Ue == "function") {
                        tt.callback = Ue, ye(U), J = !0;
                        break t;
                      }
                      tt === E(te) && ne(te), ye(U);
                    } else ne(te);
                    tt = E(te);
                  }
                  if (tt !== null) J = !0;
                  else {
                    var S = E(de);
                    S !== null && V(
                      $,
                      S.startTime - U
                    ), J = !1;
                  }
                }
                break e;
              } finally {
                tt = null, Ke = ie, Ft = !1;
              }
              J = void 0;
            }
          } finally {
            J ? Xe() : Fe = !1;
          }
        }
      }
      function F(U, J) {
        var ie = U.length;
        U.push(J);
        e: for (; 0 < ie; ) {
          var Oe = ie - 1 >>> 1, Ue = U[Oe];
          if (0 < ce(Ue, J))
            U[Oe] = J, U[ie] = Ue, ie = Oe;
          else break e;
        }
      }
      function E(U) {
        return U.length === 0 ? null : U[0];
      }
      function ne(U) {
        if (U.length === 0) return null;
        var J = U[0], ie = U.pop();
        if (ie !== J) {
          U[0] = ie;
          e: for (var Oe = 0, Ue = U.length, S = Ue >>> 1; Oe < S; ) {
            var q = 2 * (Oe + 1) - 1, ae = U[q], le = q + 1, _e = U[le];
            if (0 > ce(ae, ie))
              le < Ue && 0 > ce(_e, ae) ? (U[Oe] = _e, U[le] = ie, Oe = le) : (U[Oe] = ae, U[q] = ie, Oe = q);
            else if (le < Ue && 0 > ce(_e, ie))
              U[Oe] = _e, U[le] = ie, Oe = le;
            else break e;
          }
        }
        return J;
      }
      function ce(U, J) {
        var ie = U.sortIndex - J.sortIndex;
        return ie !== 0 ? ie : U.id - J.id;
      }
      function ye(U) {
        for (var J = E(de); J !== null; ) {
          if (J.callback === null) ne(de);
          else if (J.startTime <= U)
            ne(de), J.sortIndex = J.expirationTime, F(te, J);
          else break;
          J = E(de);
        }
      }
      function $(U) {
        if ($e = !1, ye(U), !pt)
          if (E(te) !== null)
            pt = !0, Fe || (Fe = !0, Xe());
          else {
            var J = E(de);
            J !== null && V(
              $,
              J.startTime - U
            );
          }
      }
      function P() {
        return st ? !0 : !(b.unstable_now() - Te < Gt);
      }
      function V(U, J) {
        ge = Nt(function() {
          U(b.unstable_now());
        }, J);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), b.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var re = performance;
        b.unstable_now = function() {
          return re.now();
        };
      } else {
        var j = Date, A = j.now();
        b.unstable_now = function() {
          return j.now() - A;
        };
      }
      var te = [], de = [], Je = 1, tt = null, Ke = 3, Ft = !1, pt = !1, $e = !1, st = !1, Nt = typeof setTimeout == "function" ? setTimeout : null, Ae = typeof clearTimeout == "function" ? clearTimeout : null, Ye = typeof setImmediate < "u" ? setImmediate : null, Fe = !1, ge = -1, Gt = 5, Te = -1;
      if (typeof Ye == "function")
        var Xe = function() {
          Ye(z);
        };
      else if (typeof MessageChannel < "u") {
        var Kt = new MessageChannel(), Lt = Kt.port2;
        Kt.port1.onmessage = z, Xe = function() {
          Lt.postMessage(null);
        };
      } else
        Xe = function() {
          Nt(z, 0);
        };
      b.unstable_IdlePriority = 5, b.unstable_ImmediatePriority = 1, b.unstable_LowPriority = 4, b.unstable_NormalPriority = 3, b.unstable_Profiling = null, b.unstable_UserBlockingPriority = 2, b.unstable_cancelCallback = function(U) {
        U.callback = null;
      }, b.unstable_forceFrameRate = function(U) {
        0 > U || 125 < U ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Gt = 0 < U ? Math.floor(1e3 / U) : 5;
      }, b.unstable_getCurrentPriorityLevel = function() {
        return Ke;
      }, b.unstable_next = function(U) {
        switch (Ke) {
          case 1:
          case 2:
          case 3:
            var J = 3;
            break;
          default:
            J = Ke;
        }
        var ie = Ke;
        Ke = J;
        try {
          return U();
        } finally {
          Ke = ie;
        }
      }, b.unstable_requestPaint = function() {
        st = !0;
      }, b.unstable_runWithPriority = function(U, J) {
        switch (U) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            U = 3;
        }
        var ie = Ke;
        Ke = U;
        try {
          return J();
        } finally {
          Ke = ie;
        }
      }, b.unstable_scheduleCallback = function(U, J, ie) {
        var Oe = b.unstable_now();
        switch (typeof ie == "object" && ie !== null ? (ie = ie.delay, ie = typeof ie == "number" && 0 < ie ? Oe + ie : Oe) : ie = Oe, U) {
          case 1:
            var Ue = -1;
            break;
          case 2:
            Ue = 250;
            break;
          case 5:
            Ue = 1073741823;
            break;
          case 4:
            Ue = 1e4;
            break;
          default:
            Ue = 5e3;
        }
        return Ue = ie + Ue, U = {
          id: Je++,
          callback: J,
          priorityLevel: U,
          startTime: ie,
          expirationTime: Ue,
          sortIndex: -1
        }, ie > Oe ? (U.sortIndex = ie, F(de, U), E(te) === null && U === E(de) && ($e ? (Ae(ge), ge = -1) : $e = !0, V($, ie - Oe))) : (U.sortIndex = Ue, F(te, U), pt || Ft || (pt = !0, Fe || (Fe = !0, Xe()))), U;
      }, b.unstable_shouldYield = P, b.unstable_wrapCallback = function(U) {
        var J = Ke;
        return function() {
          var ie = Ke;
          Ke = J;
          try {
            return U.apply(this, arguments);
          } finally {
            Ke = ie;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(_S)), _S;
}
var WE;
function r2() {
  return WE || (WE = 1, process.env.NODE_ENV === "production" ? Iv.exports = ZT() : Iv.exports = JT()), Iv.exports;
}
var Pv = { exports: {} }, qa = {};
var FE;
function KT() {
  if (FE) return qa;
  FE = 1;
  var b = _m();
  function z(P) {
    var V = "https://react.dev/errors/" + P;
    if (1 < arguments.length) {
      V += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var re = 2; re < arguments.length; re++)
        V += "&args[]=" + encodeURIComponent(arguments[re]);
    }
    return "Minified React error #" + P + "; visit " + V + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function F() {
  }
  var E = {
    d: {
      f: F,
      r: function() {
        throw Error(z(522));
      },
      D: F,
      C: F,
      L: F,
      m: F,
      X: F,
      S: F,
      M: F
    },
    p: 0,
    findDOMNode: null
  }, ne = /* @__PURE__ */ Symbol.for("react.portal");
  function ce(P, V, re) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ne,
      key: j == null ? null : "" + j,
      children: P,
      containerInfo: V,
      implementation: re
    };
  }
  var ye = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function $(P, V) {
    if (P === "font") return "";
    if (typeof V == "string")
      return V === "use-credentials" ? V : "";
  }
  return qa.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, qa.createPortal = function(P, V) {
    var re = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!V || V.nodeType !== 1 && V.nodeType !== 9 && V.nodeType !== 11)
      throw Error(z(299));
    return ce(P, V, null, re);
  }, qa.flushSync = function(P) {
    var V = ye.T, re = E.p;
    try {
      if (ye.T = null, E.p = 2, P) return P();
    } finally {
      ye.T = V, E.p = re, E.d.f();
    }
  }, qa.preconnect = function(P, V) {
    typeof P == "string" && (V ? (V = V.crossOrigin, V = typeof V == "string" ? V === "use-credentials" ? V : "" : void 0) : V = null, E.d.C(P, V));
  }, qa.prefetchDNS = function(P) {
    typeof P == "string" && E.d.D(P);
  }, qa.preinit = function(P, V) {
    if (typeof P == "string" && V && typeof V.as == "string") {
      var re = V.as, j = $(re, V.crossOrigin), A = typeof V.integrity == "string" ? V.integrity : void 0, te = typeof V.fetchPriority == "string" ? V.fetchPriority : void 0;
      re === "style" ? E.d.S(
        P,
        typeof V.precedence == "string" ? V.precedence : void 0,
        {
          crossOrigin: j,
          integrity: A,
          fetchPriority: te
        }
      ) : re === "script" && E.d.X(P, {
        crossOrigin: j,
        integrity: A,
        fetchPriority: te,
        nonce: typeof V.nonce == "string" ? V.nonce : void 0
      });
    }
  }, qa.preinitModule = function(P, V) {
    if (typeof P == "string")
      if (typeof V == "object" && V !== null) {
        if (V.as == null || V.as === "script") {
          var re = $(
            V.as,
            V.crossOrigin
          );
          E.d.M(P, {
            crossOrigin: re,
            integrity: typeof V.integrity == "string" ? V.integrity : void 0,
            nonce: typeof V.nonce == "string" ? V.nonce : void 0
          });
        }
      } else V == null && E.d.M(P);
  }, qa.preload = function(P, V) {
    if (typeof P == "string" && typeof V == "object" && V !== null && typeof V.as == "string") {
      var re = V.as, j = $(re, V.crossOrigin);
      E.d.L(P, re, {
        crossOrigin: j,
        integrity: typeof V.integrity == "string" ? V.integrity : void 0,
        nonce: typeof V.nonce == "string" ? V.nonce : void 0,
        type: typeof V.type == "string" ? V.type : void 0,
        fetchPriority: typeof V.fetchPriority == "string" ? V.fetchPriority : void 0,
        referrerPolicy: typeof V.referrerPolicy == "string" ? V.referrerPolicy : void 0,
        imageSrcSet: typeof V.imageSrcSet == "string" ? V.imageSrcSet : void 0,
        imageSizes: typeof V.imageSizes == "string" ? V.imageSizes : void 0,
        media: typeof V.media == "string" ? V.media : void 0
      });
    }
  }, qa.preloadModule = function(P, V) {
    if (typeof P == "string")
      if (V) {
        var re = $(V.as, V.crossOrigin);
        E.d.m(P, {
          as: typeof V.as == "string" && V.as !== "script" ? V.as : void 0,
          crossOrigin: re,
          integrity: typeof V.integrity == "string" ? V.integrity : void 0
        });
      } else E.d.m(P);
  }, qa.requestFormReset = function(P) {
    E.d.r(P);
  }, qa.unstable_batchedUpdates = function(P, V) {
    return P(V);
  }, qa.useFormState = function(P, V, re) {
    return ye.H.useFormState(P, V, re);
  }, qa.useFormStatus = function() {
    return ye.H.useHostTransitionStatus();
  }, qa.version = "19.2.8", qa;
}
var Ya = {};
var IE;
function $T() {
  return IE || (IE = 1, process.env.NODE_ENV !== "production" && (function() {
    function b() {
    }
    function z(j) {
      return "" + j;
    }
    function F(j, A, te) {
      var de = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        z(de);
        var Je = !1;
      } catch {
        Je = !0;
      }
      return Je && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && de[Symbol.toStringTag] || de.constructor.name || "Object"
      ), z(de)), {
        $$typeof: V,
        key: de == null ? null : "" + de,
        children: j,
        containerInfo: A,
        implementation: te
      };
    }
    function E(j, A) {
      if (j === "font") return "";
      if (typeof A == "string")
        return A === "use-credentials" ? A : "";
    }
    function ne(j) {
      return j === null ? "`null`" : j === void 0 ? "`undefined`" : j === "" ? "an empty string" : 'something with type "' + typeof j + '"';
    }
    function ce(j) {
      return j === null ? "`null`" : j === void 0 ? "`undefined`" : j === "" ? "an empty string" : typeof j == "string" ? JSON.stringify(j) : typeof j == "number" ? "`" + j + "`" : 'something with type "' + typeof j + '"';
    }
    function ye() {
      var j = re.H;
      return j === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), j;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var $ = _m(), P = {
      d: {
        f: b,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: b,
        C: b,
        L: b,
        m: b,
        X: b,
        S: b,
        M: b
      },
      p: 0,
      findDOMNode: null
    }, V = /* @__PURE__ */ Symbol.for("react.portal"), re = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), Ya.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P, Ya.createPortal = function(j, A) {
      var te = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return F(j, A, null, te);
    }, Ya.flushSync = function(j) {
      var A = re.T, te = P.p;
      try {
        if (re.T = null, P.p = 2, j)
          return j();
      } finally {
        re.T = A, P.p = te, P.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, Ya.preconnect = function(j, A) {
      typeof j == "string" && j ? A != null && typeof A != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        ce(A)
      ) : A != null && typeof A.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        ne(A.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ne(j)
      ), typeof j == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, P.d.C(j, A));
    }, Ya.prefetchDNS = function(j) {
      if (typeof j != "string" || !j)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          ne(j)
        );
      else if (1 < arguments.length) {
        var A = arguments[1];
        typeof A == "object" && A.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          ce(A)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          ce(A)
        );
      }
      typeof j == "string" && P.d.D(j);
    }, Ya.preinit = function(j, A) {
      if (typeof j == "string" && j ? A == null || typeof A != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        ce(A)
      ) : A.as !== "style" && A.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        ce(A.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ne(j)
      ), typeof j == "string" && A && typeof A.as == "string") {
        var te = A.as, de = E(te, A.crossOrigin), Je = typeof A.integrity == "string" ? A.integrity : void 0, tt = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
        te === "style" ? P.d.S(
          j,
          typeof A.precedence == "string" ? A.precedence : void 0,
          {
            crossOrigin: de,
            integrity: Je,
            fetchPriority: tt
          }
        ) : te === "script" && P.d.X(j, {
          crossOrigin: de,
          integrity: Je,
          fetchPriority: tt,
          nonce: typeof A.nonce == "string" ? A.nonce : void 0
        });
      }
    }, Ya.preinitModule = function(j, A) {
      var te = "";
      typeof j == "string" && j || (te += " The `href` argument encountered was " + ne(j) + "."), A !== void 0 && typeof A != "object" ? te += " The `options` argument encountered was " + ne(A) + "." : A && "as" in A && A.as !== "script" && (te += " The `as` option encountered was " + ce(A.as) + "."), te ? console.error(
        "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
        te
      ) : (te = A && typeof A.as == "string" ? A.as : "script", te) === "script" || (te = ce(te), console.error(
        'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
        te,
        j
      )), typeof j == "string" && (typeof A == "object" && A !== null ? (A.as == null || A.as === "script") && (te = E(
        A.as,
        A.crossOrigin
      ), P.d.M(j, {
        crossOrigin: te,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      })) : A == null && P.d.M(j));
    }, Ya.preload = function(j, A) {
      var te = "";
      if (typeof j == "string" && j || (te += " The `href` argument encountered was " + ne(j) + "."), A == null || typeof A != "object" ? te += " The `options` argument encountered was " + ne(A) + "." : typeof A.as == "string" && A.as || (te += " The `as` option encountered was " + ne(A.as) + "."), te && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        te
      ), typeof j == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
        te = A.as;
        var de = E(
          te,
          A.crossOrigin
        );
        P.d.L(j, te, {
          crossOrigin: de,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0,
          nonce: typeof A.nonce == "string" ? A.nonce : void 0,
          type: typeof A.type == "string" ? A.type : void 0,
          fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
          referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
          imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
          imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
          media: typeof A.media == "string" ? A.media : void 0
        });
      }
    }, Ya.preloadModule = function(j, A) {
      var te = "";
      typeof j == "string" && j || (te += " The `href` argument encountered was " + ne(j) + "."), A !== void 0 && typeof A != "object" ? te += " The `options` argument encountered was " + ne(A) + "." : A && "as" in A && typeof A.as != "string" && (te += " The `as` option encountered was " + ne(A.as) + "."), te && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        te
      ), typeof j == "string" && (A ? (te = E(
        A.as,
        A.crossOrigin
      ), P.d.m(j, {
        as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
        crossOrigin: te,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0
      })) : P.d.m(j));
    }, Ya.requestFormReset = function(j) {
      P.d.r(j);
    }, Ya.unstable_batchedUpdates = function(j, A) {
      return j(A);
    }, Ya.useFormState = function(j, A, te) {
      return ye().useFormState(j, A, te);
    }, Ya.useFormStatus = function() {
      return ye().useHostTransitionStatus();
    }, Ya.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Ya;
}
var PE;
function d2() {
  if (PE) return Pv.exports;
  PE = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (z) {
        console.error(z);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (b(), Pv.exports = KT()) : Pv.exports = $T(), Pv.exports;
}
var e2;
function kT() {
  if (e2) return Og;
  e2 = 1;
  var b = r2(), z = _m(), F = d2();
  function E(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function ne(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ce(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, (n.flags & 4098) !== 0 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function ye(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function $(l) {
    if (l.tag === 31) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function P(l) {
    if (ce(l) !== l)
      throw Error(E(188));
  }
  function V(l) {
    var n = l.alternate;
    if (!n) {
      if (n = ce(l), n === null) throw Error(E(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (c = s.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return P(s), l;
          if (r === c) return P(s), n;
          r = r.sibling;
        }
        throw Error(E(188));
      }
      if (u.return !== c.return) u = s, c = r;
      else {
        for (var m = !1, v = s.child; v; ) {
          if (v === u) {
            m = !0, u = s, c = r;
            break;
          }
          if (v === c) {
            m = !0, c = s, u = r;
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = r.child; v; ) {
            if (v === u) {
              m = !0, u = r, c = s;
              break;
            }
            if (v === c) {
              m = !0, c = r, u = s;
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(E(189));
        }
      }
      if (u.alternate !== c) throw Error(E(190));
    }
    if (u.tag !== 3) throw Error(E(188));
    return u.stateNode.current === u ? l : n;
  }
  function re(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = re(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var j = Object.assign, A = /* @__PURE__ */ Symbol.for("react.element"), te = /* @__PURE__ */ Symbol.for("react.transitional.element"), de = /* @__PURE__ */ Symbol.for("react.portal"), Je = /* @__PURE__ */ Symbol.for("react.fragment"), tt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ke = /* @__PURE__ */ Symbol.for("react.profiler"), Ft = /* @__PURE__ */ Symbol.for("react.consumer"), pt = /* @__PURE__ */ Symbol.for("react.context"), $e = /* @__PURE__ */ Symbol.for("react.forward_ref"), st = /* @__PURE__ */ Symbol.for("react.suspense"), Nt = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ae = /* @__PURE__ */ Symbol.for("react.memo"), Ye = /* @__PURE__ */ Symbol.for("react.lazy"), Fe = /* @__PURE__ */ Symbol.for("react.activity"), ge = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Gt = Symbol.iterator;
  function Te(l) {
    return l === null || typeof l != "object" ? null : (l = Gt && l[Gt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Xe = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Kt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Xe ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Je:
        return "Fragment";
      case Ke:
        return "Profiler";
      case tt:
        return "StrictMode";
      case st:
        return "Suspense";
      case Nt:
        return "SuspenseList";
      case Fe:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case de:
          return "Portal";
        case pt:
          return l.displayName || "Context";
        case Ft:
          return (l._context.displayName || "Context") + ".Consumer";
        case $e:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ae:
          return n = l.displayName || null, n !== null ? n : Kt(l.type) || "Memo";
        case Ye:
          n = l._payload, l = l._init;
          try {
            return Kt(l(n));
          } catch {
          }
      }
    return null;
  }
  var Lt = Array.isArray, U = z.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = F.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Oe = [], Ue = -1;
  function S(l) {
    return { current: l };
  }
  function q(l) {
    0 > Ue || (l.current = Oe[Ue], Oe[Ue] = null, Ue--);
  }
  function ae(l, n) {
    Ue++, Oe[Ue] = l.current, l.current = n;
  }
  var le = S(null), _e = S(null), Qe = S(null), Me = S(null);
  function $t(l, n) {
    switch (ae(Qe, n), ae(_e, l), ae(le, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? G0(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = G0(n), l = gp(n, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    q(le), ae(le, l);
  }
  function bt() {
    q(le), q(_e), q(Qe);
  }
  function wa(l) {
    l.memoizedState !== null && ae(Me, l);
    var n = le.current, u = gp(n, l.type);
    n !== u && (ae(_e, l), ae(le, u));
  }
  function he(l) {
    _e.current === l && (q(le), q(_e)), Me.current === l && (q(Me), Ur._currentValue = ie);
  }
  var Ci, Ui;
  function Ga(l) {
    if (Ci === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        Ci = n && n[1] || "", Ui = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ci + l + Ui;
  }
  var ou = !1;
  function Et(l, n) {
    if (!l || ou) return "";
    ou = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var W = function() {
                throw Error();
              };
              if (Object.defineProperty(W.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(W, []);
                } catch (Q) {
                  var w = Q;
                }
                Reflect.construct(l, [], W);
              } else {
                try {
                  W.call();
                } catch (Q) {
                  w = Q;
                }
                l.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Q) {
                w = Q;
              }
              (W = l()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (Q) {
            if (Q && w && typeof Q.stack == "string")
              return [Q.stack, w.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = c.DetermineComponentFrameRoot(), m = r[0], v = r[1];
      if (m && v) {
        var _ = m.split(`
`), Y = v.split(`
`);
        for (s = c = 0; c < _.length && !_[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; s < Y.length && !Y[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (c === _.length || s === Y.length)
          for (c = _.length - 1, s = Y.length - 1; 1 <= c && 0 <= s && _[c] !== Y[s]; )
            s--;
        for (; 1 <= c && 0 <= s; c--, s--)
          if (_[c] !== Y[s]) {
            if (c !== 1 || s !== 1)
              do
                if (c--, s--, 0 > s || _[c] !== Y[s]) {
                  var Z = `
` + _[c].replace(" at new ", " at ");
                  return l.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", l.displayName)), Z;
                }
              while (1 <= c && 0 <= s);
            break;
          }
      }
    } finally {
      ou = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Ga(u) : "";
  }
  function ta(l, n) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ga(l.type);
      case 16:
        return Ga("Lazy");
      case 13:
        return l.child !== n && n !== null ? Ga("Suspense Fallback") : Ga("Suspense");
      case 19:
        return Ga("SuspenseList");
      case 0:
      case 15:
        return Et(l.type, !1);
      case 11:
        return Et(l.type.render, !1);
      case 1:
        return Et(l.type, !0);
      case 31:
        return Ga("Activity");
      default:
        return "";
    }
  }
  function Tc(l) {
    try {
      var n = "", u = null;
      do
        n += ta(l, u), u = l, l = l.return;
      while (l);
      return n;
    } catch (c) {
      return `
Error generating stack: ` + c.message + `
` + c.stack;
    }
  }
  var gs = Object.prototype.hasOwnProperty, ve = b.unstable_scheduleCallback, Hi = b.unstable_cancelCallback, fu = b.unstable_shouldYield, Ac = b.unstable_requestPaint, bl = b.unstable_now, ud = b.unstable_getCurrentPriorityLevel, xo = b.unstable_ImmediatePriority, jo = b.unstable_UserBlockingPriority, Hn = b.unstable_NormalPriority, id = b.unstable_LowPriority, Bo = b.unstable_IdlePriority, vs = b.log, Oc = b.unstable_setDisableYieldValue, hn = null, Rl = null;
  function La(l) {
    if (typeof vs == "function" && Oc(l), Rl && typeof Rl.setStrictMode == "function")
      try {
        Rl.setStrictMode(hn, l);
      } catch {
      }
  }
  var Nl = Math.clz32 ? Math.clz32 : N, Ni = Math.log, g = Math.LN2;
  function N(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Ni(l) / g | 0) | 0;
  }
  var ue = 256, oe = 262144, Se = 4194304;
  function Ne(l) {
    var n = l & 42;
    if (n !== 0) return n;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function be(l, n, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var s = 0, r = l.suspendedLanes, m = l.pingedLanes;
    l = l.warmLanes;
    var v = c & 134217727;
    return v !== 0 ? (c = v & ~r, c !== 0 ? s = Ne(c) : (m &= v, m !== 0 ? s = Ne(m) : u || (u = v & ~l, u !== 0 && (s = Ne(u))))) : (v = c & ~r, v !== 0 ? s = Ne(v) : m !== 0 ? s = Ne(m) : u || (u = c & ~l, u !== 0 && (s = Ne(u)))), s === 0 ? 0 : n !== 0 && n !== s && (n & r) === 0 && (r = s & -s, u = n & -n, r >= u || r === 32 && (u & 4194048) !== 0) ? n : s;
  }
  function it(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function Ve(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function la() {
    var l = Se;
    return Se <<= 1, (Se & 62914560) === 0 && (Se = 4194304), l;
  }
  function mn(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function xi(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function qo(l, n, u, c, s, r) {
    var m = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var v = l.entanglements, _ = l.expirationTimes, Y = l.hiddenUpdates;
    for (u = m & ~u; 0 < u; ) {
      var Z = 31 - Nl(u), W = 1 << Z;
      v[Z] = 0, _[Z] = -1;
      var w = Y[Z];
      if (w !== null)
        for (Y[Z] = null, Z = 0; Z < w.length; Z++) {
          var Q = w[Z];
          Q !== null && (Q.lane &= -536870913);
        }
      u &= ~W;
    }
    c !== 0 && Ss(l, c, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(m & ~n));
  }
  function Ss(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Nl(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 261930;
  }
  function su(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Nl(u), s = 1 << c;
      s & n | l[c] & n && (l[c] |= n), u &= ~s;
    }
  }
  function Xa(l, n) {
    var u = n & -n;
    return u = (u & 42) !== 0 ? 1 : cd(u), (u & (l.suspendedLanes | n)) !== 0 ? 0 : u;
  }
  function cd(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Dm(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function od() {
    var l = J.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Hr(l.type));
  }
  function zm(l, n) {
    var u = J.p;
    try {
      return J.p = l, n();
    } finally {
      J.p = u;
    }
  }
  var Nn = Math.random().toString(36).slice(2), xt = "__reactFiber$" + Nn, ra = "__reactProps$" + Nn, ji = "__reactContainer$" + Nn, fd = "__reactEvents$" + Nn, Mm = "__reactListeners$" + Nn, zg = "__reactHandles$" + Nn, Cm = "__reactResources$" + Nn, ru = "__reactMarker$" + Nn;
  function sd(l) {
    delete l[xt], delete l[ra], delete l[fd], delete l[Mm], delete l[zg];
  }
  function Rc(l) {
    var n = l[xt];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[ji] || u[xt]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = eu(l); l !== null; ) {
            if (u = l[xt]) return u;
            l = eu(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function _c(l) {
    if (l = l[xt] || l[ji]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function Yo(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(E(33));
  }
  function Dc(l) {
    var n = l[Cm];
    return n || (n = l[Cm] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function zt(l) {
    l[ru] = !0;
  }
  var zc = /* @__PURE__ */ new Set(), Bi = {};
  function qi(l, n) {
    du(l, n), du(l + "Capture", n);
  }
  function du(l, n) {
    for (Bi[l] = n, l = 0; l < n.length; l++)
      zc.add(n[l]);
  }
  var rd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), dd = {}, wo = {};
  function Go(l) {
    return gs.call(wo, l) ? !0 : gs.call(dd, l) ? !1 : rd.test(l) ? wo[l] = !0 : (dd[l] = !0, !1);
  }
  function Lo(l, n, u) {
    if (Go(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function hd(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function ei(l, n, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + c);
    }
  }
  function Qa(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function md(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Um(l, n, u) {
    var c = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    );
    if (!l.hasOwnProperty(n) && typeof c < "u" && typeof c.get == "function" && typeof c.set == "function") {
      var s = c.get, r = c.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          u = "" + m, r.call(this, m);
        }
      }), Object.defineProperty(l, n, {
        enumerable: c.enumerable
      }), {
        getValue: function() {
          return u;
        },
        setValue: function(m) {
          u = "" + m;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function yd(l) {
    if (!l._valueTracker) {
      var n = md(l) ? "checked" : "value";
      l._valueTracker = Um(
        l,
        n,
        "" + l[n]
      );
    }
  }
  function Hm(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = md(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function bs(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var e1 = /[\n"\\]/g;
  function Va(l) {
    return l.replace(
      e1,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Es(l, n, u, c, s, r, m, v) {
    l.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.type = m : l.removeAttribute("type"), n != null ? m === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + Qa(n)) : l.value !== "" + Qa(n) && (l.value = "" + Qa(n)) : m !== "submit" && m !== "reset" || l.removeAttribute("value"), n != null ? Mc(l, m, Qa(n)) : u != null ? Mc(l, m, Qa(u)) : c != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? l.name = "" + Qa(v) : l.removeAttribute("name");
  }
  function Ts(l, n, u, c, s, r, m, v) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null)) {
        yd(l);
        return;
      }
      u = u != null ? "" + Qa(u) : "", n = n != null ? "" + Qa(n) : u, v || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? s, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = v ? l.checked : !!c, l.defaultChecked = !!c, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (l.name = m), yd(l);
  }
  function Mc(l, n, u) {
    n === "number" && bs(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function Xo(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + Qa(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, c && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Nm(l, n, u) {
    if (n != null && (n = "" + Qa(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + Qa(u) : "";
  }
  function xm(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(E(92));
        if (Lt(c)) {
          if (1 < c.length) throw Error(E(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = Qa(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c), yd(l);
  }
  function hu(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var Mg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cg(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || Mg.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function Ug(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(E(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var s in n)
        c = n[s], n.hasOwnProperty(s) && u[s] !== c && Cg(l, s, c);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && Cg(l, r, n[r]);
  }
  function jm(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var t1 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), As = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yn(l) {
    return As.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function xn() {
  }
  var pd = null;
  function gd(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var mu = null, Cc = null;
  function Os(l) {
    var n = _c(l);
    if (n && (l = n.stateNode)) {
      var u = l[ra] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (Es(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + Va(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var s = c[ra] || null;
                if (!s) throw Error(E(90));
                Es(
                  c,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && Hm(c);
          }
          break e;
        case "textarea":
          Nm(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && Xo(l, !!u.multiple, n, !1);
      }
    }
  }
  var Qo = !1;
  function Bm(l, n, u) {
    if (Qo) return l(n, u);
    Qo = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (Qo = !1, (mu !== null || Cc !== null) && (_f(), mu && (n = mu, l = Cc, Cc = mu = null, Os(n), l)))
        for (n = 0; n < l.length; n++) Os(l[n]);
    }
  }
  function xl(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[ra] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        E(231, n, typeof u)
      );
    return u;
  }
  var ti = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Rs = !1;
  if (ti)
    try {
      var Vo = {};
      Object.defineProperty(Vo, "passive", {
        get: function() {
          Rs = !0;
        }
      }), window.addEventListener("test", Vo, Vo), window.removeEventListener("test", Vo, Vo);
    } catch {
      Rs = !1;
    }
  var li = null, qm = null, vd = null;
  function Ym() {
    if (vd) return vd;
    var l, n = qm, u = n.length, c, s = "value" in li ? li.value : li.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var m = u - l;
    for (c = 1; c <= m && n[u - c] === s[r - c]; c++) ;
    return vd = s.slice(l, 1 < c ? 1 - c : void 0);
  }
  function Sd(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function _s() {
    return !0;
  }
  function Hg() {
    return !1;
  }
  function kl(l) {
    function n(u, c, s, r, m) {
      this._reactName = u, this._targetInst = s, this.type = c, this.nativeEvent = r, this.target = m, this.currentTarget = null;
      for (var v in l)
        l.hasOwnProperty(v) && (u = l[v], this[v] = u ? u(r) : r[v]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? _s : Hg, this.isPropagationStopped = Hg, this;
    }
    return j(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = _s);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = _s);
      },
      persist: function() {
      },
      isPersistent: _s
    }), n;
  }
  var Yi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ds = kl(Yi), Zo = j({}, Yi, { view: 0, detail: 0 }), l1 = kl(Zo), wm, Gm, zs, bd = j({}, Zo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: pn,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== zs && (zs && l.type === "mousemove" ? (wm = l.screenX - zs.screenX, Gm = l.screenY - zs.screenY) : Gm = wm = 0, zs = l), wm);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Gm;
    }
  }), Jo = kl(bd), Ng = j({}, bd, { dataTransfer: 0 }), xg = kl(Ng), jg = j({}, Zo, { relatedTarget: 0 }), Ed = kl(jg), Lm = j({}, Yi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Bg = kl(Lm), Uc = j({}, Yi, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Hc = kl(Uc), jn = j({}, Yi, { data: 0 }), qg = kl(jn), Xm = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, yu = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Yg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Bn(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = Yg[l]) ? !!n[l] : !1;
  }
  function pn() {
    return Bn;
  }
  var Td = j({}, Zo, {
    key: function(l) {
      if (l.key) {
        var n = Xm[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = Sd(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? yu[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: pn,
    charCode: function(l) {
      return l.type === "keypress" ? Sd(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Sd(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Ad = kl(Td), Qm = j({}, bd, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), qn = kl(Qm), a1 = j({}, Zo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: pn
  }), wg = kl(a1), Gg = j({}, Yi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), n1 = kl(Gg), Vm = j({}, bd, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), u1 = kl(Vm), Lg = j({}, Yi, {
    newState: 0,
    oldState: 0
  }), Zm = kl(Lg), Od = [9, 13, 27, 32], Ko = ti && "CompositionEvent" in window, Nc = null;
  ti && "documentMode" in document && (Nc = document.documentMode);
  var aa = ti && "TextEvent" in window && !Nc, Jm = ti && (!Ko || Nc && 8 < Nc && 11 >= Nc), Ms = " ", wi = !1;
  function Rd(l, n) {
    switch (l) {
      case "keyup":
        return Od.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Km(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var xc = !1;
  function Xg(l, n) {
    switch (l) {
      case "compositionend":
        return Km(n);
      case "keypress":
        return n.which !== 32 ? null : (wi = !0, Ms);
      case "textInput":
        return l = n.data, l === Ms && wi ? null : l;
      default:
        return null;
    }
  }
  function i1(l, n) {
    if (xc)
      return l === "compositionend" || !Ko && Rd(l, n) ? (l = Ym(), vd = qm = li = null, xc = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Jm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var $m = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function pu(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!$m[l.type] : n === "textarea";
  }
  function km(l, n, u, c) {
    mu ? Cc ? Cc.push(c) : Cc = [c] : mu = c, n = Rr(n, "onChange"), 0 < n.length && (u = new Ds(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var jc = null, Gi = null;
  function Bc(l) {
    q0(l, 0);
  }
  function $o(l) {
    var n = Yo(l);
    if (Hm(n)) return l;
  }
  function Wm(l, n) {
    if (l === "change") return n;
  }
  var _d = !1;
  if (ti) {
    var da;
    if (ti) {
      var Yn = "oninput" in document;
      if (!Yn) {
        var Fm = document.createElement("div");
        Fm.setAttribute("oninput", "return;"), Yn = typeof Fm.oninput == "function";
      }
      da = Yn;
    } else da = !1;
    _d = da && (!document.documentMode || 9 < document.documentMode);
  }
  function Dd() {
    jc && (jc.detachEvent("onpropertychange", zd), Gi = jc = null);
  }
  function zd(l) {
    if (l.propertyName === "value" && $o(Gi)) {
      var n = [];
      km(
        n,
        Gi,
        l,
        gd(l)
      ), Bm(Bc, n);
    }
  }
  function Qg(l, n, u) {
    l === "focusin" ? (Dd(), jc = n, Gi = u, jc.attachEvent("onpropertychange", zd)) : l === "focusout" && Dd();
  }
  function Vg(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return $o(Gi);
  }
  function Li(l, n) {
    if (l === "click") return $o(n);
  }
  function qc(l, n) {
    if (l === "input" || l === "change")
      return $o(n);
  }
  function Zg(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var na = typeof Object.is == "function" ? Object.is : Zg;
  function gn(l, n) {
    if (na(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var s = u[c];
      if (!gs.call(n, s) || !na(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Im(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Pm(l, n) {
    var u = Im(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Im(u);
    }
  }
  function Yc(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Yc(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Xi(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = bs(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = bs(l.document);
    }
    return n;
  }
  function Cs(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var Us = ti && "documentMode" in document && 11 >= document.documentMode, Qi = null, ko = null, vn = null, wn = !1;
  function Md(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    wn || Qi == null || Qi !== bs(c) || (c = Qi, "selectionStart" in c && Cs(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), vn && gn(vn, c) || (vn = c, c = Rr(ko, "onSelect"), 0 < c.length && (n = new Ds(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = Qi)));
  }
  function ai(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var Gn = {
    animationend: ai("Animation", "AnimationEnd"),
    animationiteration: ai("Animation", "AnimationIteration"),
    animationstart: ai("Animation", "AnimationStart"),
    transitionrun: ai("Transition", "TransitionRun"),
    transitionstart: ai("Transition", "TransitionStart"),
    transitioncancel: ai("Transition", "TransitionCancel"),
    transitionend: ai("Transition", "TransitionEnd")
  }, Wo = {}, Vi = {};
  ti && (Vi = document.createElement("div").style, "AnimationEvent" in window || (delete Gn.animationend.animation, delete Gn.animationiteration.animation, delete Gn.animationstart.animation), "TransitionEvent" in window || delete Gn.transitionend.transition);
  function Ot(l) {
    if (Wo[l]) return Wo[l];
    if (!Gn[l]) return l;
    var n = Gn[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in Vi)
        return Wo[l] = n[u];
    return l;
  }
  var Hs = Ot("animationend"), ey = Ot("animationiteration"), Cd = Ot("animationstart"), wc = Ot("transitionrun"), Ns = Ot("transitionstart"), gu = Ot("transitioncancel"), Jg = Ot("transitionend"), vu = /* @__PURE__ */ new Map(), Fo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fo.push("scrollEnd");
  function ha(l, n) {
    vu.set(l, n), qi(n, [l]);
  }
  var Gc = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, It = [], jl = 0, Sn = 0;
  function Za() {
    for (var l = jl, n = Sn = jl = 0; n < l; ) {
      var u = It[n];
      It[n++] = null;
      var c = It[n];
      It[n++] = null;
      var s = It[n];
      It[n++] = null;
      var r = It[n];
      if (It[n++] = null, c !== null && s !== null) {
        var m = c.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
      }
      r !== 0 && Ud(u, s, r);
    }
  }
  function Ja(l, n, u, c) {
    It[jl++] = l, It[jl++] = n, It[jl++] = u, It[jl++] = c, Sn |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function bn(l, n, u, c) {
    return Ja(l, n, u, c), xs(l);
  }
  function ni(l, n) {
    return Ja(l, null, null, n), xs(l);
  }
  function Ud(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, c = r.alternate, c !== null && (c.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    return l.tag === 3 ? (r = l.stateNode, s && n !== null && (s = 31 - Nl(u), l = r.hiddenUpdates, c = l[s], c === null ? l[s] = [n] : c.push(n), n.lane = u | 536870912), r) : null;
  }
  function xs(l) {
    if (50 < Rf)
      throw Rf = 0, pr = null, Error(E(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ma = {};
  function Kg(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function fl(l, n, u, c) {
    return new Kg(l, n, u, c);
  }
  function Lc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function ui(l, n) {
    var u = l.alternate;
    return u === null ? (u = fl(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function ty(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function Hd(l, n, u, c, s, r) {
    var m = 0;
    if (c = l, typeof l == "function") Lc(l) && (m = 1);
    else if (typeof l == "string")
      m = Op(
        l,
        u,
        le.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case Fe:
          return l = fl(31, u, n, s), l.elementType = Fe, l.lanes = r, l;
        case Je:
          return ii(u.children, s, r, n);
        case tt:
          m = 8, s |= 24;
          break;
        case Ke:
          return l = fl(12, u, n, s | 2), l.elementType = Ke, l.lanes = r, l;
        case st:
          return l = fl(13, u, n, s), l.elementType = st, l.lanes = r, l;
        case Nt:
          return l = fl(19, u, n, s), l.elementType = Nt, l.lanes = r, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case pt:
                m = 10;
                break e;
              case Ft:
                m = 9;
                break e;
              case $e:
                m = 11;
                break e;
              case Ae:
                m = 14;
                break e;
              case Ye:
                m = 16, c = null;
                break e;
            }
          m = 29, u = Error(
            E(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = fl(m, u, n, s), n.elementType = l, n.type = c, n.lanes = r, n;
  }
  function ii(l, n, u, c) {
    return l = fl(7, l, c, n), l.lanes = u, l;
  }
  function Io(l, n, u) {
    return l = fl(6, l, null, n), l.lanes = u, l;
  }
  function ly(l) {
    var n = fl(18, null, null, 0);
    return n.stateNode = l, n;
  }
  function Nd(l, n, u) {
    return n = fl(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var ay = /* @__PURE__ */ new WeakMap();
  function Ka(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = ay.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: Tc(n)
      }, ay.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: Tc(n)
    };
  }
  var $a = [], Xc = 0, js = null, ml = 0, za = [], ya = 0, Ln = null, Ma = 1, Xn = "";
  function En(l, n) {
    $a[Xc++] = ml, $a[Xc++] = js, js = l, ml = n;
  }
  function ny(l, n, u) {
    za[ya++] = Ma, za[ya++] = Xn, za[ya++] = Ln, Ln = l;
    var c = Ma;
    l = Xn;
    var s = 32 - Nl(c) - 1;
    c &= ~(1 << s), u += 1;
    var r = 32 - Nl(n) + s;
    if (30 < r) {
      var m = s - s % 5;
      r = (c & (1 << m) - 1).toString(32), c >>= m, s -= m, Ma = 1 << 32 - Nl(n) + s | u << s | c, Xn = r + l;
    } else
      Ma = 1 << r | u << s | c, Xn = l;
  }
  function Po(l) {
    l.return !== null && (En(l, 1), ny(l, 1, 0));
  }
  function xd(l) {
    for (; l === js; )
      js = $a[--Xc], $a[Xc] = null, ml = $a[--Xc], $a[Xc] = null;
    for (; l === Ln; )
      Ln = za[--ya], za[ya] = null, Xn = za[--ya], za[ya] = null, Ma = za[--ya], za[ya] = null;
  }
  function Bs(l, n) {
    za[ya++] = Ma, za[ya++] = Xn, za[ya++] = Ln, Ma = n.id, Xn = n.overflow, Ln = l;
  }
  var Bl = null, Xt = null, rt = !1, Su = null, _l = !1, bu = Error(E(519));
  function Tn(l) {
    var n = Error(
      E(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw tf(Ka(n, l)), bu;
  }
  function qs(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[xt] = l, n[ra] = c, u) {
      case "dialog":
        ft("cancel", n), ft("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        ft("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < Uf.length; u++)
          ft(Uf[u], n);
        break;
      case "source":
        ft("error", n);
        break;
      case "img":
      case "image":
      case "link":
        ft("error", n), ft("load", n);
        break;
      case "details":
        ft("toggle", n);
        break;
      case "input":
        ft("invalid", n), Ts(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        );
        break;
      case "select":
        ft("invalid", n);
        break;
      case "textarea":
        ft("invalid", n), xm(n, c.value, c.defaultValue, c.children);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || hp(n.textContent, u) ? (c.popover != null && (ft("beforetoggle", n), ft("toggle", n)), c.onScroll != null && ft("scroll", n), c.onScrollEnd != null && ft("scrollend", n), c.onClick != null && (n.onclick = xn), n = !0) : n = !1, n || Tn(l, !0);
  }
  function ef(l) {
    for (Bl = l.return; Bl; )
      switch (Bl.tag) {
        case 5:
        case 31:
        case 13:
          _l = !1;
          return;
        case 27:
        case 3:
          _l = !0;
          return;
        default:
          Bl = Bl.return;
      }
  }
  function Eu(l) {
    if (l !== Bl) return !1;
    if (!rt) return ef(l), rt = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Nf(l.type, l.memoizedProps)), u = !u), u && Xt && Tn(l), ef(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(E(317));
      Xt = qh(l);
    } else if (n === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(E(317));
      Xt = qh(l);
    } else
      n === 27 ? (n = Xt, Pn(l.type) ? (l = zr, zr = null, Xt = l) : Xt = n) : Xt = Bl ? Ra(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Zi() {
    Xt = Bl = null, rt = !1;
  }
  function uy() {
    var l = Su;
    return l !== null && (cl === null ? cl = l : cl.push.apply(
      cl,
      l
    ), Su = null), l;
  }
  function tf(l) {
    Su === null ? Su = [l] : Su.push(l);
  }
  var jd = S(null), ci = null, Qn = null;
  function pa(l, n, u) {
    ae(jd, n._currentValue), n._currentValue = u;
  }
  function Vn(l) {
    l._currentValue = jd.current, q(jd);
  }
  function Bd(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Tu(l, n, u, c) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var m = s.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var v = r;
          r = s;
          for (var _ = 0; _ < n.length; _++)
            if (v.context === n[_]) {
              r.lanes |= u, v = r.alternate, v !== null && (v.lanes |= u), Bd(
                r.return,
                u,
                l
              ), c || (m = null);
              break e;
            }
          r = v.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(E(341));
        m.lanes |= u, r = m.alternate, r !== null && (r.lanes |= u), Bd(m, u, l), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === l) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function ql(l, n, u, c) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if ((s.flags & 524288) !== 0) r = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(E(387));
        if (m = m.memoizedProps, m !== null) {
          var v = s.type;
          na(s.pendingProps.value, m.value) || (l !== null ? l.push(v) : l = [v]);
        }
      } else if (s === Me.current) {
        if (m = s.alternate, m === null) throw Error(E(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(Ur) : l = [Ur]);
      }
      s = s.return;
    }
    l !== null && Tu(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function Qc(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!na(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function we(l) {
    ci = l, Qn = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function I(l) {
    return Ys(ci, l);
  }
  function oi(l, n) {
    return ci === null && we(l), Ys(l, n);
  }
  function Ys(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, Qn === null) {
      if (l === null) throw Error(E(308));
      Qn = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else Qn = Qn.next = n;
    return u;
  }
  var sl = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, iy = b.unstable_scheduleCallback, cy = b.unstable_NormalPriority, yl = {
    $$typeof: pt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ws() {
    return {
      controller: new sl(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Gs(l) {
    l.refCount--, l.refCount === 0 && iy(cy, function() {
      l.controller.abort();
    });
  }
  var Vc = null, Ls = 0, Ji = 0, El = null;
  function Mt(l, n) {
    if (Vc === null) {
      var u = Vc = [];
      Ls = 0, Ji = Mh(), El = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return Ls++, n.then(Xs, Xs), n;
  }
  function Xs() {
    if (--Ls === 0 && Vc !== null) {
      El !== null && (El.status = "fulfilled");
      var l = Vc;
      Vc = null, Ji = 0, El = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function Qs(l, n) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (c.status = "rejected", c.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), c;
  }
  var fi = U.S;
  U.S = function(l, n) {
    ep = bl(), typeof n == "object" && n !== null && typeof n.then == "function" && Mt(l, n), fi !== null && fi(l, n);
  };
  var ka = S(null);
  function Wa() {
    var l = ka.current;
    return l !== null ? l : Bt.pooledCache;
  }
  function lf(l, n) {
    n === null ? ae(ka, ka.current) : ae(ka, n.pool);
  }
  function Zc() {
    var l = Wa();
    return l === null ? null : { parent: yl._currentValue, pool: l };
  }
  var Ki = Error(E(460)), Jc = Error(E(474)), af = Error(E(542)), Kc = { then: function() {
  } };
  function oy(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function fy(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(xn, xn), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, qd(l), l;
      default:
        if (typeof n.status == "string") n.then(xn, xn);
        else {
          if (l = Bt, l !== null && 100 < l.shellSuspendCounter)
            throw Error(E(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, qd(l), l;
        }
        throw ki = n, Ki;
    }
  }
  function $i(l) {
    try {
      var n = l._init;
      return n(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (ki = u, Ki) : u;
    }
  }
  var ki = null;
  function sy() {
    if (ki === null) throw Error(E(459));
    var l = ki;
    return ki = null, l;
  }
  function qd(l) {
    if (l === Ki || l === af)
      throw Error(E(483));
  }
  var Wi = null, $c = 0;
  function Vs(l) {
    var n = $c;
    return $c += 1, Wi === null && (Wi = []), fy(Wi, l, n);
  }
  function nf(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function Zs(l, n) {
    throw n.$$typeof === A ? Error(E(525)) : (l = Object.prototype.toString.call(n), Error(
      E(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function $g(l) {
    function n(x, C) {
      if (l) {
        var B = x.deletions;
        B === null ? (x.deletions = [C], x.flags |= 16) : B.push(C);
      }
    }
    function u(x, C) {
      if (!l) return null;
      for (; C !== null; )
        n(x, C), C = C.sibling;
      return null;
    }
    function c(x) {
      for (var C = /* @__PURE__ */ new Map(); x !== null; )
        x.key !== null ? C.set(x.key, x) : C.set(x.index, x), x = x.sibling;
      return C;
    }
    function s(x, C) {
      return x = ui(x, C), x.index = 0, x.sibling = null, x;
    }
    function r(x, C, B) {
      return x.index = B, l ? (B = x.alternate, B !== null ? (B = B.index, B < C ? (x.flags |= 67108866, C) : B) : (x.flags |= 67108866, C)) : (x.flags |= 1048576, C);
    }
    function m(x) {
      return l && x.alternate === null && (x.flags |= 67108866), x;
    }
    function v(x, C, B, k) {
      return C === null || C.tag !== 6 ? (C = Io(B, x.mode, k), C.return = x, C) : (C = s(C, B), C.return = x, C);
    }
    function _(x, C, B, k) {
      var De = B.type;
      return De === Je ? Z(
        x,
        C,
        B.props.children,
        k,
        B.key
      ) : C !== null && (C.elementType === De || typeof De == "object" && De !== null && De.$$typeof === Ye && $i(De) === C.type) ? (C = s(C, B.props), nf(C, B), C.return = x, C) : (C = Hd(
        B.type,
        B.key,
        B.props,
        null,
        x.mode,
        k
      ), nf(C, B), C.return = x, C);
    }
    function Y(x, C, B, k) {
      return C === null || C.tag !== 4 || C.stateNode.containerInfo !== B.containerInfo || C.stateNode.implementation !== B.implementation ? (C = Nd(B, x.mode, k), C.return = x, C) : (C = s(C, B.children || []), C.return = x, C);
    }
    function Z(x, C, B, k, De) {
      return C === null || C.tag !== 7 ? (C = ii(
        B,
        x.mode,
        k,
        De
      ), C.return = x, C) : (C = s(C, B), C.return = x, C);
    }
    function W(x, C, B) {
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return C = Io(
          "" + C,
          x.mode,
          B
        ), C.return = x, C;
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case te:
            return B = Hd(
              C.type,
              C.key,
              C.props,
              null,
              x.mode,
              B
            ), nf(B, C), B.return = x, B;
          case de:
            return C = Nd(
              C,
              x.mode,
              B
            ), C.return = x, C;
          case Ye:
            return C = $i(C), W(x, C, B);
        }
        if (Lt(C) || Te(C))
          return C = ii(
            C,
            x.mode,
            B,
            null
          ), C.return = x, C;
        if (typeof C.then == "function")
          return W(x, Vs(C), B);
        if (C.$$typeof === pt)
          return W(
            x,
            oi(x, C),
            B
          );
        Zs(x, C);
      }
      return null;
    }
    function w(x, C, B, k) {
      var De = C !== null ? C.key : null;
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return De !== null ? null : v(x, C, "" + B, k);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case te:
            return B.key === De ? _(x, C, B, k) : null;
          case de:
            return B.key === De ? Y(x, C, B, k) : null;
          case Ye:
            return B = $i(B), w(x, C, B, k);
        }
        if (Lt(B) || Te(B))
          return De !== null ? null : Z(x, C, B, k, null);
        if (typeof B.then == "function")
          return w(
            x,
            C,
            Vs(B),
            k
          );
        if (B.$$typeof === pt)
          return w(
            x,
            C,
            oi(x, B),
            k
          );
        Zs(x, B);
      }
      return null;
    }
    function Q(x, C, B, k, De) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return x = x.get(B) || null, v(C, x, "" + k, De);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case te:
            return x = x.get(
              k.key === null ? B : k.key
            ) || null, _(C, x, k, De);
          case de:
            return x = x.get(
              k.key === null ? B : k.key
            ) || null, Y(C, x, k, De);
          case Ye:
            return k = $i(k), Q(
              x,
              C,
              B,
              k,
              De
            );
        }
        if (Lt(k) || Te(k))
          return x = x.get(B) || null, Z(C, x, k, De, null);
        if (typeof k.then == "function")
          return Q(
            x,
            C,
            B,
            Vs(k),
            De
          );
        if (k.$$typeof === pt)
          return Q(
            x,
            C,
            B,
            oi(C, k),
            De
          );
        Zs(C, k);
      }
      return null;
    }
    function pe(x, C, B, k) {
      for (var De = null, vt = null, Ee = C, Ze = C = 0, Pe = null; Ee !== null && Ze < B.length; Ze++) {
        Ee.index > Ze ? (Pe = Ee, Ee = null) : Pe = Ee.sibling;
        var At = w(
          x,
          Ee,
          B[Ze],
          k
        );
        if (At === null) {
          Ee === null && (Ee = Pe);
          break;
        }
        l && Ee && At.alternate === null && n(x, Ee), C = r(At, C, Ze), vt === null ? De = At : vt.sibling = At, vt = At, Ee = Pe;
      }
      if (Ze === B.length)
        return u(x, Ee), rt && En(x, Ze), De;
      if (Ee === null) {
        for (; Ze < B.length; Ze++)
          Ee = W(x, B[Ze], k), Ee !== null && (C = r(
            Ee,
            C,
            Ze
          ), vt === null ? De = Ee : vt.sibling = Ee, vt = Ee);
        return rt && En(x, Ze), De;
      }
      for (Ee = c(Ee); Ze < B.length; Ze++)
        Pe = Q(
          Ee,
          x,
          Ze,
          B[Ze],
          k
        ), Pe !== null && (l && Pe.alternate !== null && Ee.delete(
          Pe.key === null ? Ze : Pe.key
        ), C = r(
          Pe,
          C,
          Ze
        ), vt === null ? De = Pe : vt.sibling = Pe, vt = Pe);
      return l && Ee.forEach(function(lu) {
        return n(x, lu);
      }), rt && En(x, Ze), De;
    }
    function He(x, C, B, k) {
      if (B == null) throw Error(E(151));
      for (var De = null, vt = null, Ee = C, Ze = C = 0, Pe = null, At = B.next(); Ee !== null && !At.done; Ze++, At = B.next()) {
        Ee.index > Ze ? (Pe = Ee, Ee = null) : Pe = Ee.sibling;
        var lu = w(x, Ee, At.value, k);
        if (lu === null) {
          Ee === null && (Ee = Pe);
          break;
        }
        l && Ee && lu.alternate === null && n(x, Ee), C = r(lu, C, Ze), vt === null ? De = lu : vt.sibling = lu, vt = lu, Ee = Pe;
      }
      if (At.done)
        return u(x, Ee), rt && En(x, Ze), De;
      if (Ee === null) {
        for (; !At.done; Ze++, At = B.next())
          At = W(x, At.value, k), At !== null && (C = r(At, C, Ze), vt === null ? De = At : vt.sibling = At, vt = At);
        return rt && En(x, Ze), De;
      }
      for (Ee = c(Ee); !At.done; Ze++, At = B.next())
        At = Q(Ee, x, Ze, At.value, k), At !== null && (l && At.alternate !== null && Ee.delete(At.key === null ? Ze : At.key), C = r(At, C, Ze), vt === null ? De = At : vt.sibling = At, vt = At);
      return l && Ee.forEach(function(I0) {
        return n(x, I0);
      }), rt && En(x, Ze), De;
    }
    function Yt(x, C, B, k) {
      if (typeof B == "object" && B !== null && B.type === Je && B.key === null && (B = B.props.children), typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case te:
            e: {
              for (var De = B.key; C !== null; ) {
                if (C.key === De) {
                  if (De = B.type, De === Je) {
                    if (C.tag === 7) {
                      u(
                        x,
                        C.sibling
                      ), k = s(
                        C,
                        B.props.children
                      ), k.return = x, x = k;
                      break e;
                    }
                  } else if (C.elementType === De || typeof De == "object" && De !== null && De.$$typeof === Ye && $i(De) === C.type) {
                    u(
                      x,
                      C.sibling
                    ), k = s(C, B.props), nf(k, B), k.return = x, x = k;
                    break e;
                  }
                  u(x, C);
                  break;
                } else n(x, C);
                C = C.sibling;
              }
              B.type === Je ? (k = ii(
                B.props.children,
                x.mode,
                k,
                B.key
              ), k.return = x, x = k) : (k = Hd(
                B.type,
                B.key,
                B.props,
                null,
                x.mode,
                k
              ), nf(k, B), k.return = x, x = k);
            }
            return m(x);
          case de:
            e: {
              for (De = B.key; C !== null; ) {
                if (C.key === De)
                  if (C.tag === 4 && C.stateNode.containerInfo === B.containerInfo && C.stateNode.implementation === B.implementation) {
                    u(
                      x,
                      C.sibling
                    ), k = s(C, B.children || []), k.return = x, x = k;
                    break e;
                  } else {
                    u(x, C);
                    break;
                  }
                else n(x, C);
                C = C.sibling;
              }
              k = Nd(B, x.mode, k), k.return = x, x = k;
            }
            return m(x);
          case Ye:
            return B = $i(B), Yt(
              x,
              C,
              B,
              k
            );
        }
        if (Lt(B))
          return pe(
            x,
            C,
            B,
            k
          );
        if (Te(B)) {
          if (De = Te(B), typeof De != "function") throw Error(E(150));
          return B = De.call(B), He(
            x,
            C,
            B,
            k
          );
        }
        if (typeof B.then == "function")
          return Yt(
            x,
            C,
            Vs(B),
            k
          );
        if (B.$$typeof === pt)
          return Yt(
            x,
            C,
            oi(x, B),
            k
          );
        Zs(x, B);
      }
      return typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint" ? (B = "" + B, C !== null && C.tag === 6 ? (u(x, C.sibling), k = s(C, B), k.return = x, x = k) : (u(x, C), k = Io(B, x.mode, k), k.return = x, x = k), m(x)) : u(x, C);
    }
    return function(x, C, B, k) {
      try {
        $c = 0;
        var De = Yt(
          x,
          C,
          B,
          k
        );
        return Wi = null, De;
      } catch (Ee) {
        if (Ee === Ki || Ee === af) throw Ee;
        var vt = fl(29, Ee, null, x.mode);
        return vt.lanes = k, vt.return = x, vt;
      }
    };
  }
  var Fi = $g(!0), ry = $g(!1), si = !1;
  function Js(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Yd(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ri(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Fa(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (Tt & 2) !== 0) {
      var s = c.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), c.pending = n, n = xs(l), Ud(l, null, u), n;
    }
    return Ja(l, c, n, u), xs(l);
  }
  function Ii(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, su(l, u);
    }
  }
  function wd(l, n) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var m = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = m : r = r.next = m, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var dy = !1;
  function Pi() {
    if (dy) {
      var l = El;
      if (l !== null) throw l;
    }
  }
  function Au(l, n, u, c) {
    dy = !1;
    var s = l.updateQueue;
    si = !1;
    var r = s.firstBaseUpdate, m = s.lastBaseUpdate, v = s.shared.pending;
    if (v !== null) {
      s.shared.pending = null;
      var _ = v, Y = _.next;
      _.next = null, m === null ? r = Y : m.next = Y, m = _;
      var Z = l.alternate;
      Z !== null && (Z = Z.updateQueue, v = Z.lastBaseUpdate, v !== m && (v === null ? Z.firstBaseUpdate = Y : v.next = Y, Z.lastBaseUpdate = _));
    }
    if (r !== null) {
      var W = s.baseState;
      m = 0, Z = Y = _ = null, v = r;
      do {
        var w = v.lane & -536870913, Q = w !== v.lane;
        if (Q ? (ct & w) === w : (c & w) === w) {
          w !== 0 && w === Ji && (dy = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var pe = l, He = v;
            w = n;
            var Yt = u;
            switch (He.tag) {
              case 1:
                if (pe = He.payload, typeof pe == "function") {
                  W = pe.call(Yt, W, w);
                  break e;
                }
                W = pe;
                break e;
              case 3:
                pe.flags = pe.flags & -65537 | 128;
              case 0:
                if (pe = He.payload, w = typeof pe == "function" ? pe.call(Yt, W, w) : pe, w == null) break e;
                W = j({}, W, w);
                break e;
              case 2:
                si = !0;
            }
          }
          w = v.callback, w !== null && (l.flags |= 64, Q && (l.flags |= 8192), Q = s.callbacks, Q === null ? s.callbacks = [w] : Q.push(w));
        } else
          Q = {
            lane: w,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, Z === null ? (Y = Z = Q, _ = W) : Z = Z.next = Q, m |= w;
        if (v = v.next, v === null) {
          if (v = s.shared.pending, v === null)
            break;
          Q = v, v = Q.next, Q.next = null, s.lastBaseUpdate = Q, s.shared.pending = null;
        }
      } while (!0);
      Z === null && (_ = W), s.baseState = _, s.firstBaseUpdate = Y, s.lastBaseUpdate = Z, r === null && (s.shared.lanes = 0), Fn |= m, l.lanes = m, l.memoizedState = W;
    }
  }
  function Gd(l, n) {
    if (typeof l != "function")
      throw Error(E(191, l));
    l.call(n);
  }
  function ec(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Gd(u[l], n);
  }
  var Dl = S(null), kc = S(0);
  function kg(l, n) {
    l = Wn, ae(kc, l), ae(Dl, n), Wn = l | n.baseLanes;
  }
  function Ks() {
    ae(kc, Wn), ae(Dl, Dl.current);
  }
  function uf() {
    Wn = kc.current, q(Dl), q(kc);
  }
  var ga = S(null), Ia = null;
  function Ou(l) {
    var n = l.alternate;
    ae(Pt, Pt.current & 1), ae(ga, l), Ia === null && (n === null || Dl.current !== null || n.memoizedState !== null) && (Ia = l);
  }
  function cf(l) {
    ae(Pt, Pt.current), ae(ga, l), Ia === null && (Ia = l);
  }
  function Ld(l) {
    l.tag === 22 ? (ae(Pt, Pt.current), ae(ga, l), Ia === null && (Ia = l)) : Zn();
  }
  function Zn() {
    ae(Pt, Pt.current), ae(ga, ga.current);
  }
  function va(l) {
    q(ga), Ia === l && (Ia = null), q(Pt);
  }
  var Pt = S(0);
  function of(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || _n(u) || dc(u)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Ru = 0, ke = null, Ct = null, pl = null, Wc = !1, Fc = !1, di = !1, $s = 0, ff = 0, tc = null, Wg = 0;
  function ul() {
    throw Error(E(321));
  }
  function hi(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!na(l[u], n[u])) return !1;
    return !0;
  }
  function ks(l, n, u, c, s, r) {
    return Ru = r, ke = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, U.H = l === null || l.memoizedState === null ? n0 : nh, di = !1, r = u(c, s), di = !1, Fc && (r = Fg(
      n,
      u,
      c,
      s
    )), Xd(l), r;
  }
  function Xd(l) {
    U.H = nr;
    var n = Ct !== null && Ct.next !== null;
    if (Ru = 0, pl = Ct = ke = null, Wc = !1, ff = 0, tc = null, n) throw Error(E(300));
    l === null || gl || (l = l.dependencies, l !== null && Qc(l) && (gl = !0));
  }
  function Fg(l, n, u, c) {
    ke = l;
    var s = 0;
    do {
      if (Fc && (tc = null), ff = 0, Fc = !1, 25 <= s) throw Error(E(301));
      if (s += 1, pl = Ct = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      U.H = u0, r = n(u, c);
    } while (Fc);
    return r;
  }
  function c1() {
    var l = U.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? Pc(n) : n, l = l.useState()[0], (Ct !== null ? Ct.memoizedState : null) !== l && (ke.flags |= 1024), n;
  }
  function Qd() {
    var l = $s !== 0;
    return $s = 0, l;
  }
  function Ic(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function Ws(l) {
    if (Wc) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      Wc = !1;
    }
    Ru = 0, pl = Ct = ke = null, Fc = !1, ff = $s = 0, tc = null;
  }
  function Yl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return pl === null ? ke.memoizedState = pl = l : pl = pl.next = l, pl;
  }
  function rl() {
    if (Ct === null) {
      var l = ke.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Ct.next;
    var n = pl === null ? ke.memoizedState : pl.next;
    if (n !== null)
      pl = n, Ct = l;
    else {
      if (l === null)
        throw ke.alternate === null ? Error(E(467)) : Error(E(310));
      Ct = l, l = {
        memoizedState: Ct.memoizedState,
        baseState: Ct.baseState,
        baseQueue: Ct.baseQueue,
        queue: Ct.queue,
        next: null
      }, pl === null ? ke.memoizedState = pl = l : pl = pl.next = l;
    }
    return pl;
  }
  function Fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pc(l) {
    var n = ff;
    return ff += 1, tc === null && (tc = []), l = fy(tc, l, n), n = ke, (pl === null ? n.memoizedState : pl.next) === null && (n = n.alternate, U.H = n === null || n.memoizedState === null ? n0 : nh), l;
  }
  function sf(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Pc(l);
      if (l.$$typeof === pt) return I(l);
    }
    throw Error(E(438, String(l)));
  }
  function Vd(l) {
    var n = null, u = ke.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = ke.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = Fs(), ke.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = ge;
    return n.index++, u;
  }
  function _u(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function Du(l) {
    var n = rl();
    return Zd(n, Ct, l);
  }
  function Zd(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(E(311));
    c.lastRenderedReducer = u;
    var s = l.baseQueue, r = c.pending;
    if (r !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = r.next, r.next = m;
      }
      n.baseQueue = s = r, c.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var v = m = null, _ = null, Y = n, Z = !1;
      do {
        var W = Y.lane & -536870913;
        if (W !== Y.lane ? (ct & W) === W : (Ru & W) === W) {
          var w = Y.revertLane;
          if (w === 0)
            _ !== null && (_ = _.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }), W === Ji && (Z = !0);
          else if ((Ru & w) === w) {
            Y = Y.next, w === Ji && (Z = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: Y.revertLane,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }, _ === null ? (v = _ = W, m = r) : _ = _.next = W, ke.lanes |= w, Fn |= w;
          W = Y.action, di && u(r, W), r = Y.hasEagerState ? Y.eagerState : u(r, W);
        } else
          w = {
            lane: W,
            revertLane: Y.revertLane,
            gesture: Y.gesture,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null
          }, _ === null ? (v = _ = w, m = r) : _ = _.next = w, ke.lanes |= W, Fn |= W;
        Y = Y.next;
      } while (Y !== null && Y !== n);
      if (_ === null ? m = r : _.next = v, !na(r, l.memoizedState) && (gl = !0, Z && (u = El, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = m, l.baseQueue = _, c.lastRenderedState = r;
    }
    return s === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Jd(l) {
    var n = rl(), u = n.queue;
    if (u === null) throw Error(E(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var m = s = s.next;
      do
        r = l(r, m.action), m = m.next;
      while (m !== s);
      na(r, n.memoizedState) || (gl = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, c];
  }
  function hy(l, n, u) {
    var c = ke, s = rl(), r = rt;
    if (r) {
      if (u === void 0) throw Error(E(407));
      u = u();
    } else u = n();
    var m = !na(
      (Ct || s).memoizedState,
      u
    );
    if (m && (s.memoizedState = u, gl = !0), s = s.queue, Fd(Kd.bind(null, c, s, l), [
      l
    ]), s.getSnapshot !== n || m || pl !== null && pl.memoizedState.tag & 1) {
      if (c.flags |= 2048, to(
        9,
        { destroy: void 0 },
        my.bind(
          null,
          c,
          s,
          u,
          n
        ),
        null
      ), Bt === null) throw Error(E(349));
      r || (Ru & 127) !== 0 || Is(c, n, u);
    }
    return u;
  }
  function Is(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = ke.updateQueue, n === null ? (n = Fs(), ke.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function my(l, n, u, c) {
    n.value = u, n.getSnapshot = c, $d(n) && kd(l);
  }
  function Kd(l, n, u) {
    return u(function() {
      $d(n) && kd(l);
    });
  }
  function $d(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !na(l, u);
    } catch {
      return !0;
    }
  }
  function kd(l) {
    var n = ni(l, 2);
    n !== null && Oa(n, l, 2);
  }
  function yy(l) {
    var n = Yl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), di) {
        La(!0);
        try {
          u();
        } finally {
          La(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _u,
      lastRenderedState: l
    }, n;
  }
  function wl(l, n, u, c) {
    return l.baseState = u, Zd(
      l,
      Ct,
      typeof c == "function" ? c : _u
    );
  }
  function Ig(l, n, u, c, s) {
    if (ar(l)) throw Error(E(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          r.listeners.push(m);
        }
      };
      U.T !== null ? u(!0) : r.isTransition = !1, c(r), u = n.pending, u === null ? (r.next = n.pending = r, py(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function py(l, n) {
    var u = n.action, c = n.payload, s = l.state;
    if (n.isTransition) {
      var r = U.T, m = {};
      U.T = m;
      try {
        var v = u(s, c), _ = U.S;
        _ !== null && _(m, v), gy(l, n, v);
      } catch (Y) {
        eo(l, n, Y);
      } finally {
        r !== null && m.types !== null && (r.types = m.types), U.T = r;
      }
    } else
      try {
        r = u(s, c), gy(l, n, r);
      } catch (Y) {
        eo(l, n, Y);
      }
  }
  function gy(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        vy(l, n, c);
      },
      function(c) {
        return eo(l, n, c);
      }
    ) : vy(l, n, u);
  }
  function vy(l, n, u) {
    n.status = "fulfilled", n.value = u, Sy(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, py(l, u)));
  }
  function eo(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, Sy(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function Sy(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function Ps(l, n) {
    return n;
  }
  function by(l, n) {
    if (rt) {
      var u = Bt.formState;
      if (u !== null) {
        e: {
          var c = ke;
          if (rt) {
            if (Xt) {
              t: {
                for (var s = Xt, r = _l; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break t;
                  }
                  if (s = Ra(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Xt = Ra(
                  s.nextSibling
                ), c = s.data === "F!";
                break e;
              }
            }
            Tn(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = Yl(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ps,
      lastRenderedState: n
    }, u.queue = c, u = lh.bind(
      null,
      ke,
      c
    ), c.dispatch = u, c = yy(!1), r = lc.bind(
      null,
      ke,
      !1,
      c.queue
    ), c = Yl(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = s, u = Ig.bind(
      null,
      ke,
      s,
      r,
      u
    ), s.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function Pg(l) {
    var n = rl();
    return er(n, Ct, l);
  }
  function er(l, n, u) {
    if (n = Zd(
      l,
      n,
      Ps
    )[0], l = Du(_u)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var c = Pc(n);
      } catch (m) {
        throw m === Ki ? af : m;
      }
    else c = n;
    n = rl();
    var s = n.queue, r = s.dispatch;
    return u !== n.memoizedState && (ke.flags |= 2048, to(
      9,
      { destroy: void 0 },
      Ey.bind(null, s, u),
      null
    )), [c, r, l];
  }
  function Ey(l, n) {
    l.action = n;
  }
  function Ty(l) {
    var n = rl(), u = Ct;
    if (u !== null)
      return er(n, u, l);
    rl(), n = n.memoizedState, u = rl();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function to(l, n, u, c) {
    return l = { tag: l, create: u, deps: c, inst: n, next: null }, n = ke.updateQueue, n === null && (n = Fs(), ke.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function Ay() {
    return rl().memoizedState;
  }
  function rf(l, n, u, c) {
    var s = Yl();
    ke.flags |= l, s.memoizedState = to(
      1 | n,
      { destroy: void 0 },
      u,
      c === void 0 ? null : c
    );
  }
  function df(l, n, u, c) {
    var s = rl();
    c = c === void 0 ? null : c;
    var r = s.memoizedState.inst;
    Ct !== null && c !== null && hi(c, Ct.memoizedState.deps) ? s.memoizedState = to(n, r, u, c) : (ke.flags |= l, s.memoizedState = to(
      1 | n,
      r,
      u,
      c
    ));
  }
  function Wd(l, n) {
    rf(8390656, 8, l, n);
  }
  function Fd(l, n) {
    df(2048, 8, l, n);
  }
  function Oy(l) {
    ke.flags |= 4;
    var n = ke.updateQueue;
    if (n === null)
      n = Fs(), ke.updateQueue = n, n.events = [l];
    else {
      var u = n.events;
      u === null ? n.events = [l] : u.push(l);
    }
  }
  function tr(l) {
    var n = rl().memoizedState;
    return Oy({ ref: n, nextImpl: l }), function() {
      if ((Tt & 2) !== 0) throw Error(E(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Id(l, n) {
    return df(4, 2, l, n);
  }
  function Ry(l, n) {
    return df(4, 4, l, n);
  }
  function Pd(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function _y(l, n, u) {
    u = u != null ? u.concat([l]) : null, df(4, 4, Pd.bind(null, n, l), u);
  }
  function Jn() {
  }
  function eh(l, n) {
    var u = rl();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && hi(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function e0(l, n) {
    var u = rl();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && hi(n, c[1]))
      return c[0];
    if (c = l(), di) {
      La(!0);
      try {
        l();
      } finally {
        La(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function lr(l, n, u) {
    return u === void 0 || (Ru & 1073741824) !== 0 && (ct & 261930) === 0 ? l.memoizedState = n : (l.memoizedState = u, l = y0(), ke.lanes |= l, Fn |= l, u);
  }
  function zu(l, n, u, c) {
    return na(u, n) ? u : Dl.current !== null ? (l = lr(l, u, c), na(l, n) || (gl = !0), l) : (Ru & 42) === 0 || (Ru & 1073741824) !== 0 && (ct & 261930) === 0 ? (gl = !0, l.memoizedState = u) : (l = y0(), ke.lanes |= l, Fn |= l, n);
  }
  function th(l, n, u, c, s) {
    var r = J.p;
    J.p = r !== 0 && 8 > r ? r : 8;
    var m = U.T, v = {};
    U.T = v, lc(l, !1, n, u);
    try {
      var _ = s(), Y = U.S;
      if (Y !== null && Y(v, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var Z = Qs(
          _,
          c
        );
        mi(
          l,
          n,
          Z,
          Na(l)
        );
      } else
        mi(
          l,
          n,
          c,
          Na(l)
        );
    } catch (W) {
      mi(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Na()
      );
    } finally {
      J.p = r, m !== null && v.types !== null && (m.types = v.types), U.T = m;
    }
  }
  function t0() {
  }
  function hf(l, n, u, c) {
    if (l.tag !== 5) throw Error(E(476));
    var s = mf(l).queue;
    th(
      l,
      s,
      n,
      ie,
      u === null ? t0 : function() {
        return jt(l), u(c);
      }
    );
  }
  function mf(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _u,
        lastRenderedState: ie
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _u,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function jt(l) {
    var n = mf(l);
    n.next === null && (n = l.alternate.memoizedState), mi(
      l,
      n.next.queue,
      {},
      Na()
    );
  }
  function Dy() {
    return I(Ur);
  }
  function l0() {
    return rl().memoizedState;
  }
  function zy() {
    return rl().memoizedState;
  }
  function Mu(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = Na();
          l = ri(u);
          var c = Fa(n, l, u);
          c !== null && (Oa(c, n, u), Ii(c, n, u)), n = { cache: ws() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function a0(l, n, u) {
    var c = Na();
    u = {
      lane: c,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ar(l) ? ah(n, u) : (u = bn(l, n, u, c), u !== null && (Oa(u, l, c), My(u, n, c)));
  }
  function lh(l, n, u) {
    var c = Na();
    mi(l, n, u, c);
  }
  function mi(l, n, u, c) {
    var s = {
      lane: c,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ar(l)) ah(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var m = n.lastRenderedState, v = r(m, u);
          if (s.hasEagerState = !0, s.eagerState = v, na(v, m))
            return Ja(l, n, s, 0), Bt === null && Za(), !1;
        } catch {
        }
      if (u = bn(l, n, s, c), u !== null)
        return Oa(u, l, c), My(u, n, c), !0;
    }
    return !1;
  }
  function lc(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: Mh(),
      gesture: null,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ar(l)) {
      if (n) throw Error(E(479));
    } else
      n = bn(
        l,
        u,
        c,
        2
      ), n !== null && Oa(n, l, 2);
  }
  function ar(l) {
    var n = l.alternate;
    return l === ke || n !== null && n === ke;
  }
  function ah(l, n) {
    Fc = Wc = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function My(l, n, u) {
    if ((u & 4194048) !== 0) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, su(l, u);
    }
  }
  var nr = {
    readContext: I,
    use: sf,
    useCallback: ul,
    useContext: ul,
    useEffect: ul,
    useImperativeHandle: ul,
    useLayoutEffect: ul,
    useInsertionEffect: ul,
    useMemo: ul,
    useReducer: ul,
    useRef: ul,
    useState: ul,
    useDebugValue: ul,
    useDeferredValue: ul,
    useTransition: ul,
    useSyncExternalStore: ul,
    useId: ul,
    useHostTransitionStatus: ul,
    useFormState: ul,
    useActionState: ul,
    useOptimistic: ul,
    useMemoCache: ul,
    useCacheRefresh: ul
  };
  nr.useEffectEvent = ul;
  var n0 = {
    readContext: I,
    use: sf,
    useCallback: function(l, n) {
      return Yl().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: I,
    useEffect: Wd,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, rf(
        4194308,
        4,
        Pd.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return rf(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      rf(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = Yl();
      n = n === void 0 ? null : n;
      var c = l();
      if (di) {
        La(!0);
        try {
          l();
        } finally {
          La(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = Yl();
      if (u !== void 0) {
        var s = u(n);
        if (di) {
          La(!0);
          try {
            u(n);
          } finally {
            La(!1);
          }
        }
      } else s = n;
      return c.memoizedState = c.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, c.queue = l, l = l.dispatch = a0.bind(
        null,
        ke,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = Yl();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = yy(l);
      var n = l.queue, u = lh.bind(null, ke, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Jn,
    useDeferredValue: function(l, n) {
      var u = Yl();
      return lr(u, l, n);
    },
    useTransition: function() {
      var l = yy(!1);
      return l = th.bind(
        null,
        ke,
        l.queue,
        !0,
        !1
      ), Yl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = ke, s = Yl();
      if (rt) {
        if (u === void 0)
          throw Error(E(407));
        u = u();
      } else {
        if (u = n(), Bt === null)
          throw Error(E(349));
        (ct & 127) !== 0 || Is(c, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, Wd(Kd.bind(null, c, r, l), [
        l
      ]), c.flags |= 2048, to(
        9,
        { destroy: void 0 },
        my.bind(
          null,
          c,
          r,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = Yl(), n = Bt.identifierPrefix;
      if (rt) {
        var u = Xn, c = Ma;
        u = (c & ~(1 << 32 - Nl(c) - 1)).toString(32) + u, n = "_" + n + "R_" + u, u = $s++, 0 < u && (n += "H" + u.toString(32)), n += "_";
      } else
        u = Wg++, n = "_" + n + "r_" + u.toString(32) + "_";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: Dy,
    useFormState: by,
    useActionState: by,
    useOptimistic: function(l) {
      var n = Yl();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = lc.bind(
        null,
        ke,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: Vd,
    useCacheRefresh: function() {
      return Yl().memoizedState = Mu.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(l) {
      var n = Yl(), u = { impl: l };
      return n.memoizedState = u, function() {
        if ((Tt & 2) !== 0)
          throw Error(E(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, nh = {
    readContext: I,
    use: sf,
    useCallback: eh,
    useContext: I,
    useEffect: Fd,
    useImperativeHandle: _y,
    useInsertionEffect: Id,
    useLayoutEffect: Ry,
    useMemo: e0,
    useReducer: Du,
    useRef: Ay,
    useState: function() {
      return Du(_u);
    },
    useDebugValue: Jn,
    useDeferredValue: function(l, n) {
      var u = rl();
      return zu(
        u,
        Ct.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Du(_u)[0], n = rl().memoizedState;
      return [
        typeof l == "boolean" ? l : Pc(l),
        n
      ];
    },
    useSyncExternalStore: hy,
    useId: l0,
    useHostTransitionStatus: Dy,
    useFormState: Pg,
    useActionState: Pg,
    useOptimistic: function(l, n) {
      var u = rl();
      return wl(u, Ct, l, n);
    },
    useMemoCache: Vd,
    useCacheRefresh: zy
  };
  nh.useEffectEvent = tr;
  var u0 = {
    readContext: I,
    use: sf,
    useCallback: eh,
    useContext: I,
    useEffect: Fd,
    useImperativeHandle: _y,
    useInsertionEffect: Id,
    useLayoutEffect: Ry,
    useMemo: e0,
    useReducer: Jd,
    useRef: Ay,
    useState: function() {
      return Jd(_u);
    },
    useDebugValue: Jn,
    useDeferredValue: function(l, n) {
      var u = rl();
      return Ct === null ? lr(u, l, n) : zu(
        u,
        Ct.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Jd(_u)[0], n = rl().memoizedState;
      return [
        typeof l == "boolean" ? l : Pc(l),
        n
      ];
    },
    useSyncExternalStore: hy,
    useId: l0,
    useHostTransitionStatus: Dy,
    useFormState: Ty,
    useActionState: Ty,
    useOptimistic: function(l, n) {
      var u = rl();
      return Ct !== null ? wl(u, Ct, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Vd,
    useCacheRefresh: zy
  };
  u0.useEffectEvent = tr;
  function lo(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : j({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var An = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = Na(), s = ri(c);
      s.payload = n, u != null && (s.callback = u), n = Fa(l, s, c), n !== null && (Oa(n, l, c), Ii(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = Na(), s = ri(c);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = Fa(l, s, c), n !== null && (Oa(n, l, c), Ii(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = Na(), c = ri(u);
      c.tag = 2, n != null && (c.callback = n), n = Fa(l, c, u), n !== null && (Oa(n, l, u), Ii(n, l, u));
    }
  };
  function Cy(l, n, u, c, s, r, m) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, r, m) : n.prototype && n.prototype.isPureReactComponent ? !gn(u, c) || !gn(s, r) : !0;
  }
  function i0(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && An.enqueueReplaceState(n, n.state, null);
  }
  function ac(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = j({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  function uh(l) {
    Gc(l);
  }
  function Uy(l) {
    console.error(l);
  }
  function ih(l) {
    Gc(l);
  }
  function yf(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function ur(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Hy(l, n, u) {
    return u = ri(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      yf(l, n);
    }, u;
  }
  function Ny(l) {
    return l = ri(l), l.tag = 3, l;
  }
  function xy(l, n, u, c) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = c.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        ur(n, u, c);
      };
    }
    var m = u.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (l.callback = function() {
      ur(n, u, c), typeof s != "function" && (el === null ? el = /* @__PURE__ */ new Set([this]) : el.add(this));
      var v = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function o1(l, n, u, c, s) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && ql(
        n,
        u,
        s,
        !0
      ), u = ga.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return Ia === null ? Rh() : u.alternate === null && Vt === 0 && (Vt = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, c === Kc ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), Sr(l, c, s)), !1;
          case 22:
            return u.flags |= 65536, c === Kc ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), Sr(l, c, s)), !1;
        }
        throw Error(E(435, u.tag));
      }
      return Sr(l, c, s), Rh(), !1;
    }
    if (rt)
      return n = ga.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = s, c !== bu && (l = Error(E(422), { cause: c }), tf(Ka(l, u)))) : (c !== bu && (n = Error(E(423), {
        cause: c
      }), tf(
        Ka(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, c = Ka(c, u), s = Hy(
        l.stateNode,
        c,
        s
      ), wd(l, s), Vt !== 4 && (Vt = 2)), !1;
    var r = Error(E(520), { cause: c });
    if (r = Ka(r, u), yr === null ? yr = [r] : yr.push(r), Vt !== 4 && (Vt = 2), n === null) return !0;
    c = Ka(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = Hy(u.stateNode, c, l), wd(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (el === null || !el.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = Ny(s), xy(
              s,
              l,
              u,
              c
            ), wd(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var ch = Error(E(461)), gl = !1;
  function kt(l, n, u, c) {
    n.child = l === null ? ry(n, null, u, c) : Fi(
      n,
      l.child,
      u,
      c
    );
  }
  function jy(l, n, u, c, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in c) {
      var m = {};
      for (var v in c)
        v !== "ref" && (m[v] = c[v]);
    } else m = c;
    return we(n), c = ks(
      l,
      n,
      u,
      m,
      r,
      s
    ), v = Qd(), l !== null && !gl ? (Ic(l, n, s), tn(l, n, s)) : (rt && v && Po(n), n.flags |= 1, kt(l, n, c, s), n.child);
  }
  function By(l, n, u, c, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !Lc(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, qy(
        l,
        n,
        r,
        c,
        s
      )) : (l = Hd(
        u.type,
        null,
        c,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !sh(l, s)) {
      var m = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : gn, u(m, c) && l.ref === n.ref)
        return tn(l, n, s);
    }
    return n.flags |= 1, l = ui(r, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function qy(l, n, u, c, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (gn(r, c) && l.ref === n.ref)
        if (gl = !1, n.pendingProps = c = r, sh(l, s))
          (l.flags & 131072) !== 0 && (gl = !0);
        else
          return n.lanes = l.lanes, tn(l, n, s);
    }
    return oh(
      l,
      n,
      u,
      c,
      s
    );
  }
  function c0(l, n, u, c) {
    var s = c.children, r = l !== null ? l.memoizedState : null;
    if (l === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), c.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | u : u, l !== null) {
          for (c = n.child = l.child, s = 0; c !== null; )
            s = s | c.lanes | c.childLanes, c = c.sibling;
          c = s & ~r;
        } else c = 0, n.child = null;
        return Sa(
          l,
          n,
          r,
          u,
          c
        );
      }
      if ((u & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && lf(
          n,
          r !== null ? r.cachePool : null
        ), r !== null ? kg(n, r) : Ks(), Ld(n);
      else
        return c = n.lanes = 536870912, Sa(
          l,
          n,
          r !== null ? r.baseLanes | u : u,
          u,
          c
        );
    } else
      r !== null ? (lf(n, r.cachePool), kg(n, r), Zn(), n.memoizedState = null) : (l !== null && lf(n, null), Ks(), Zn());
    return kt(l, n, s, u), n.child;
  }
  function nc(l, n) {
    return l !== null && l.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Sa(l, n, u, c, s) {
    var r = Wa();
    return r = r === null ? null : { parent: yl._currentValue, pool: r }, n.memoizedState = {
      baseLanes: u,
      cachePool: r
    }, l !== null && lf(n, null), Ks(), Ld(n), l !== null && ql(l, n, c, !0), n.childLanes = s, null;
  }
  function ir(l, n) {
    return n = fr(
      { mode: n.mode, children: n.children },
      l.mode
    ), n.ref = l.ref, l.child = n, n.return = l, n;
  }
  function ba(l, n, u) {
    return Fi(n, l.child, null, u), l = ir(n, n.pendingProps), l.flags |= 2, va(n), n.memoizedState = null, l;
  }
  function o0(l, n, u) {
    var c = n.pendingProps, s = (n.flags & 128) !== 0;
    if (n.flags &= -129, l === null) {
      if (rt) {
        if (c.mode === "hidden")
          return l = ir(n, c), n.lanes = 536870912, nc(null, l);
        if (cf(n), (l = Xt) ? (l = Q0(
          l,
          _l
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (n.memoizedState = {
          dehydrated: l,
          treeContext: Ln !== null ? { id: Ma, overflow: Xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = ly(l), u.return = n, n.child = u, Bl = n, Xt = null)) : l = null, l === null) throw Tn(n);
        return n.lanes = 536870912, null;
      }
      return ir(n, c);
    }
    var r = l.memoizedState;
    if (r !== null) {
      var m = r.dehydrated;
      if (cf(n), s)
        if (n.flags & 256)
          n.flags &= -257, n = ba(
            l,
            n,
            u
          );
        else if (n.memoizedState !== null)
          n.child = l.child, n.flags |= 128, n = null;
        else throw Error(E(558));
      else if (gl || ql(l, n, u, !1), s = (u & l.childLanes) !== 0, gl || s) {
        if (c = Bt, c !== null && (m = Xa(c, u), m !== 0 && m !== r.retryLane))
          throw r.retryLane = m, ni(l, m), Oa(c, l, m), ch;
        Rh(), n = ba(
          l,
          n,
          u
        );
      } else
        l = r.treeContext, Xt = Ra(m.nextSibling), Bl = n, rt = !0, Su = null, _l = !1, l !== null && Bs(n, l), n = ir(n, c), n.flags |= 4096;
      return n;
    }
    return l = ui(l.child, {
      mode: c.mode,
      children: c.children
    }), l.ref = n.ref, n.child = l, l.return = n, l;
  }
  function Pa(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(E(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function oh(l, n, u, c, s) {
    return we(n), u = ks(
      l,
      n,
      u,
      c,
      void 0,
      s
    ), c = Qd(), l !== null && !gl ? (Ic(l, n, s), tn(l, n, s)) : (rt && c && Po(n), n.flags |= 1, kt(l, n, u, s), n.child);
  }
  function uc(l, n, u, c, s, r) {
    return we(n), n.updateQueue = null, u = Fg(
      n,
      c,
      u,
      s
    ), Xd(l), c = Qd(), l !== null && !gl ? (Ic(l, n, r), tn(l, n, r)) : (rt && c && Po(n), n.flags |= 1, kt(l, n, u, r), n.child);
  }
  function Yy(l, n, u, c, s) {
    if (we(n), n.stateNode === null) {
      var r = ma, m = u.contextType;
      typeof m == "object" && m !== null && (r = I(m)), r = new u(c, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = An, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = c, r.state = n.memoizedState, r.refs = {}, Js(n), m = u.contextType, r.context = typeof m == "object" && m !== null ? I(m) : ma, r.state = n.memoizedState, m = u.getDerivedStateFromProps, typeof m == "function" && (lo(
        n,
        u,
        m,
        c
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (m = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), m !== r.state && An.enqueueReplaceState(r, r.state, null), Au(n, c, r, s), Pi(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      r = n.stateNode;
      var v = n.memoizedProps, _ = ac(u, v);
      r.props = _;
      var Y = r.context, Z = u.contextType;
      m = ma, typeof Z == "object" && Z !== null && (m = I(Z));
      var W = u.getDerivedStateFromProps;
      Z = typeof W == "function" || typeof r.getSnapshotBeforeUpdate == "function", v = n.pendingProps !== v, Z || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (v || Y !== m) && i0(
        n,
        r,
        c,
        m
      ), si = !1;
      var w = n.memoizedState;
      r.state = w, Au(n, c, r, s), Pi(), Y = n.memoizedState, v || w !== Y || si ? (typeof W == "function" && (lo(
        n,
        u,
        W,
        c
      ), Y = n.memoizedState), (_ = si || Cy(
        n,
        u,
        _,
        c,
        w,
        Y,
        m
      )) ? (Z || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = Y), r.props = c, r.state = Y, r.context = m, c = _) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      r = n.stateNode, Yd(l, n), m = n.memoizedProps, Z = ac(u, m), r.props = Z, W = n.pendingProps, w = r.context, Y = u.contextType, _ = ma, typeof Y == "object" && Y !== null && (_ = I(Y)), v = u.getDerivedStateFromProps, (Y = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m !== W || w !== _) && i0(
        n,
        r,
        c,
        _
      ), si = !1, w = n.memoizedState, r.state = w, Au(n, c, r, s), Pi();
      var Q = n.memoizedState;
      m !== W || w !== Q || si || l !== null && l.dependencies !== null && Qc(l.dependencies) ? (typeof v == "function" && (lo(
        n,
        u,
        v,
        c
      ), Q = n.memoizedState), (Z = si || Cy(
        n,
        u,
        Z,
        c,
        w,
        Q,
        _
      ) || l !== null && l.dependencies !== null && Qc(l.dependencies)) ? (Y || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(c, Q, _), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        c,
        Q,
        _
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && w === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && w === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = Q), r.props = c, r.state = Q, r.context = _, c = Z) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && w === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && w === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return r = c, Pa(l, n), c = (n.flags & 128) !== 0, r || c ? (r = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && c ? (n.child = Fi(
      n,
      l.child,
      null,
      s
    ), n.child = Fi(
      n,
      null,
      u,
      s
    )) : kt(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = tn(
      l,
      n,
      s
    ), l;
  }
  function Kn(l, n, u, c) {
    return Zi(), n.flags |= 256, kt(l, n, u, c), n.child;
  }
  var cr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function or(l) {
    return { baseLanes: l, cachePool: Zc() };
  }
  function en(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= Aa), l;
  }
  function wy(l, n, u) {
    var c = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, m;
    if ((m = r) || (m = l !== null && l.memoizedState === null ? !1 : (Pt.current & 2) !== 0), m && (s = !0, n.flags &= -129), m = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (rt) {
        if (s ? Ou(n) : Zn(), (l = Xt) ? (l = Q0(
          l,
          _l
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (n.memoizedState = {
          dehydrated: l,
          treeContext: Ln !== null ? { id: Ma, overflow: Xn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = ly(l), u.return = n, n.child = u, Bl = n, Xt = null)) : l = null, l === null) throw Tn(n);
        return dc(l) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var v = c.children;
      return c = c.fallback, s ? (Zn(), s = n.mode, v = fr(
        { mode: "hidden", children: v },
        s
      ), c = ii(
        c,
        s,
        u,
        null
      ), v.return = n, c.return = n, v.sibling = c, n.child = v, c = n.child, c.memoizedState = or(u), c.childLanes = en(
        l,
        m,
        u
      ), n.memoizedState = cr, nc(null, c)) : (Ou(n), ic(n, v));
    }
    var _ = l.memoizedState;
    if (_ !== null && (v = _.dehydrated, v !== null)) {
      if (r)
        n.flags & 256 ? (Ou(n), n.flags &= -257, n = ao(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (Zn(), n.child = l.child, n.flags |= 128, n = null) : (Zn(), v = c.fallback, s = n.mode, c = fr(
          { mode: "visible", children: c.children },
          s
        ), v = ii(
          v,
          s,
          u,
          null
        ), v.flags |= 2, c.return = n, v.return = n, c.sibling = v, n.child = c, Fi(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = or(u), c.childLanes = en(
          l,
          m,
          u
        ), n.memoizedState = cr, n = nc(null, c));
      else if (Ou(n), dc(v)) {
        if (m = v.nextSibling && v.nextSibling.dataset, m) var Y = m.dgst;
        m = Y, c = Error(E(419)), c.stack = "", c.digest = m, tf({ value: c, source: null, stack: null }), n = ao(
          l,
          n,
          u
        );
      } else if (gl || ql(l, n, u, !1), m = (u & l.childLanes) !== 0, gl || m) {
        if (m = Bt, m !== null && (c = Xa(m, u), c !== 0 && c !== _.retryLane))
          throw _.retryLane = c, ni(l, c), Oa(m, l, c), ch;
        _n(v) || Rh(), n = ao(
          l,
          n,
          u
        );
      } else
        _n(v) ? (n.flags |= 192, n.child = l.child, n = null) : (l = _.treeContext, Xt = Ra(
          v.nextSibling
        ), Bl = n, rt = !0, Su = null, _l = !1, l !== null && Bs(n, l), n = ic(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (Zn(), v = c.fallback, s = n.mode, _ = l.child, Y = _.sibling, c = ui(_, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = _.subtreeFlags & 65011712, Y !== null ? v = ui(
      Y,
      v
    ) : (v = ii(
      v,
      s,
      u,
      null
    ), v.flags |= 2), v.return = n, c.return = n, c.sibling = v, n.child = c, nc(null, c), c = n.child, v = l.child.memoizedState, v === null ? v = or(u) : (s = v.cachePool, s !== null ? (_ = yl._currentValue, s = s.parent !== _ ? { parent: _, pool: _ } : s) : s = Zc(), v = {
      baseLanes: v.baseLanes | u,
      cachePool: s
    }), c.memoizedState = v, c.childLanes = en(
      l,
      m,
      u
    ), n.memoizedState = cr, nc(l.child, c)) : (Ou(n), u = l.child, l = u.sibling, u = ui(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (m = n.deletions, m === null ? (n.deletions = [l], n.flags |= 16) : m.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function ic(l, n) {
    return n = fr(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function fr(l, n) {
    return l = fl(22, l, null, n), l.lanes = 0, l;
  }
  function ao(l, n, u) {
    return Fi(n, l.child, null, u), l = ic(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function no(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), Bd(l.return, n, u);
  }
  function fh(l, n, u, c, s, r) {
    var m = l.memoizedState;
    m === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: s,
      treeForkCount: r
    } : (m.isBackwards = n, m.rendering = null, m.renderingStartTime = 0, m.last = c, m.tail = u, m.tailMode = s, m.treeForkCount = r);
  }
  function Gy(l, n, u) {
    var c = n.pendingProps, s = c.revealOrder, r = c.tail;
    c = c.children;
    var m = Pt.current, v = (m & 2) !== 0;
    if (v ? (m = m & 1 | 2, n.flags |= 128) : m &= 1, ae(Pt, m), kt(l, n, c, u), c = rt ? ml : 0, !v && l !== null && (l.flags & 128) !== 0)
      e: for (l = n.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && no(l, u, n);
        else if (l.tag === 19)
          no(l, u, n);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === n) break e;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === n)
            break e;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && of(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), fh(
          n,
          !1,
          s,
          u,
          r,
          c
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && of(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        fh(
          n,
          !0,
          u,
          null,
          r,
          c
        );
        break;
      case "together":
        fh(
          n,
          !1,
          null,
          null,
          void 0,
          c
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function tn(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), Fn |= n.lanes, (u & n.childLanes) === 0)
      if (l !== null) {
        if (ql(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(E(153));
    if (n.child !== null) {
      for (l = n.child, u = ui(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = ui(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function sh(l, n) {
    return (l.lanes & n) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Qc(l)));
  }
  function rh(l, n, u) {
    switch (n.tag) {
      case 3:
        $t(n, n.stateNode.containerInfo), pa(n, yl, l.memoizedState.cache), Zi();
        break;
      case 27:
      case 5:
        wa(n);
        break;
      case 4:
        $t(n, n.stateNode.containerInfo);
        break;
      case 10:
        pa(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, cf(n), null;
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (Ou(n), n.flags |= 128, null) : (u & n.child.childLanes) !== 0 ? wy(l, n, u) : (Ou(n), l = tn(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        Ou(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (ql(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), s) {
          if (c)
            return Gy(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), ae(Pt, Pt.current), c) break;
        return null;
      case 22:
        return n.lanes = 0, c0(
          l,
          n,
          u,
          n.pendingProps
        );
      case 24:
        pa(n, yl, l.memoizedState.cache);
    }
    return tn(l, n, u);
  }
  function Ly(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        gl = !0;
      else {
        if (!sh(l, u) && (n.flags & 128) === 0)
          return gl = !1, rh(
            l,
            n,
            u
          );
        gl = (l.flags & 131072) !== 0;
      }
    else
      gl = !1, rt && (n.flags & 1048576) !== 0 && ny(n, ml, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var c = n.pendingProps;
          if (l = $i(n.elementType), n.type = l, typeof l == "function")
            Lc(l) ? (c = ac(l, c), n.tag = 1, n = Yy(
              null,
              n,
              l,
              c,
              u
            )) : (n.tag = 0, n = oh(
              null,
              n,
              l,
              c,
              u
            ));
          else {
            if (l != null) {
              var s = l.$$typeof;
              if (s === $e) {
                n.tag = 11, n = jy(
                  null,
                  n,
                  l,
                  c,
                  u
                );
                break e;
              } else if (s === Ae) {
                n.tag = 14, n = By(
                  null,
                  n,
                  l,
                  c,
                  u
                );
                break e;
              }
            }
            throw n = Kt(l) || l, Error(E(306, n, ""));
          }
        }
        return n;
      case 0:
        return oh(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, s = ac(
          c,
          n.pendingProps
        ), Yy(
          l,
          n,
          c,
          s,
          u
        );
      case 3:
        e: {
          if ($t(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(E(387));
          c = n.pendingProps;
          var r = n.memoizedState;
          s = r.element, Yd(l, n), Au(n, c, null, u);
          var m = n.memoizedState;
          if (c = m.cache, pa(n, yl, c), c !== r.cache && Tu(
            n,
            [yl],
            u,
            !0
          ), Pi(), c = m.element, r.isDehydrated)
            if (r = {
              element: c,
              isDehydrated: !1,
              cache: m.cache
            }, n.updateQueue.baseState = r, n.memoizedState = r, n.flags & 256) {
              n = Kn(
                l,
                n,
                c,
                u
              );
              break e;
            } else if (c !== s) {
              s = Ka(
                Error(E(424)),
                n
              ), tf(s), n = Kn(
                l,
                n,
                c,
                u
              );
              break e;
            } else
              for (l = n.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, Xt = Ra(l.firstChild), Bl = n, rt = !0, Su = null, _l = !0, u = ry(
                n,
                null,
                c,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Zi(), c === s) {
              n = tn(
                l,
                n,
                u
              );
              break e;
            }
            kt(l, n, c, u);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Pa(l, n), l === null ? (u = qf(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : rt || (u = n.type, l = n.pendingProps, c = rc(
          Qe.current
        ).createElement(u), c[xt] = n, c[ra] = l, Wl(c, u, l), zt(c), n.stateNode = c) : n.memoizedState = qf(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return wa(n), l === null && rt && (c = n.stateNode = jf(
          n.type,
          n.pendingProps,
          Qe.current
        ), Bl = n, _l = !0, s = Xt, Pn(n.type) ? (zr = s, Xt = Ra(c.firstChild)) : Xt = s), kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), Pa(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && rt && ((s = c = Xt) && (c = r1(
          c,
          n.type,
          n.pendingProps,
          _l
        ), c !== null ? (n.stateNode = c, Bl = n, Xt = Ra(c.firstChild), _l = !1, s = !0) : s = !1), s || Tn(n)), wa(n), s = n.type, r = n.pendingProps, m = l !== null ? l.memoizedProps : null, c = r.children, Nf(s, r) ? c = null : m !== null && Nf(s, m) && (n.flags |= 32), n.memoizedState !== null && (s = ks(
          l,
          n,
          c1,
          null,
          null,
          u
        ), Ur._currentValue = s), Pa(l, n), kt(l, n, c, u), n.child;
      case 6:
        return l === null && rt && ((l = u = Xt) && (u = lt(
          u,
          n.pendingProps,
          _l
        ), u !== null ? (n.stateNode = u, Bl = n, Xt = null, l = !0) : l = !1), l || Tn(n)), null;
      case 13:
        return wy(l, n, u);
      case 4:
        return $t(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = Fi(
          n,
          null,
          c,
          u
        ) : kt(l, n, c, u), n.child;
      case 11:
        return jy(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return kt(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, pa(n, n.type, c.value), kt(l, n, c.children, u), n.child;
      case 9:
        return s = n.type._context, c = n.pendingProps.children, we(n), s = I(s), c = c(s), n.flags |= 1, kt(l, n, c, u), n.child;
      case 14:
        return By(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return qy(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Gy(l, n, u);
      case 31:
        return o0(l, n, u);
      case 22:
        return c0(
          l,
          n,
          u,
          n.pendingProps
        );
      case 24:
        return we(n), c = I(yl), l === null ? (s = Wa(), s === null && (s = Bt, r = ws(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = { parent: c, cache: s }, Js(n), pa(n, yl, s)) : ((l.lanes & u) !== 0 && (Yd(l, n), Au(n, null, null, u), Pi()), s = l.memoizedState, r = n.memoizedState, s.parent !== c ? (s = { parent: c, cache: c }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), pa(n, yl, c)) : (c = r.cache, pa(n, yl, c), c !== s.cache && Tu(
          n,
          [yl],
          u,
          !0
        ))), kt(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(E(156, n.tag));
  }
  function Cu(l) {
    l.flags |= 4;
  }
  function Xy(l, n, u, c, s) {
    if ((n = (l.mode & 32) !== 0) && (n = !1), n) {
      if (l.flags |= 16777216, (s & 335544128) === s)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (v0()) l.flags |= 8192;
        else
          throw ki = Kc, Jc;
    } else l.flags &= -16777217;
  }
  function Qy(l, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ja(n))
      if (v0()) l.flags |= 8192;
      else
        throw ki = Kc, Jc;
  }
  function ua(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? la() : 536870912, l.lanes |= n, il |= n);
  }
  function pf(l, n) {
    if (!rt)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function qe(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags & 65011712, c |= s.flags & 65011712, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags, c |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function f0(l, n, u) {
    var c = n.pendingProps;
    switch (xd(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return qe(n), null;
      case 1:
        return qe(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), Vn(yl), bt(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Eu(n) ? Cu(n) : l === null || l.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, uy())), qe(n), null;
      case 26:
        var s = n.type, r = n.memoizedState;
        return l === null ? (Cu(n), r !== null ? (qe(n), Qy(n, r)) : (qe(n), Xy(
          n,
          s,
          null,
          c,
          u
        ))) : r ? r !== l.memoizedState ? (Cu(n), qe(n), Qy(n, r)) : (qe(n), n.flags &= -16777217) : (l = l.memoizedProps, l !== c && Cu(n), qe(n), Xy(
          n,
          s,
          l,
          c,
          u
        )), null;
      case 27:
        if (he(n), u = Qe.current, s = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && Cu(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(E(166));
            return qe(n), null;
          }
          l = le.current, Eu(n) ? qs(n) : (l = jf(s, c, u), n.stateNode = l, Cu(n));
        }
        return qe(n), null;
      case 5:
        if (he(n), s = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && Cu(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(E(166));
            return qe(n), null;
          }
          if (r = le.current, Eu(n))
            qs(n);
          else {
            var m = rc(
              Qe.current
            );
            switch (r) {
              case 1:
                r = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                r = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    r = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    r = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    r = m.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof c.is == "string" ? m.createElement("select", {
                      is: c.is
                    }) : m.createElement("select"), c.multiple ? r.multiple = !0 : c.size && (r.size = c.size);
                    break;
                  default:
                    r = typeof c.is == "string" ? m.createElement(s, { is: c.is }) : m.createElement(s);
                }
            }
            r[xt] = n, r[ra] = c;
            e: for (m = n.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                r.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === n) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === n)
                  break e;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            n.stateNode = r;
            e: switch (Wl(r, s, c), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                c = !!c.autoFocus;
                break e;
              case "img":
                c = !0;
                break e;
              default:
                c = !1;
            }
            c && Cu(n);
          }
        }
        return qe(n), Xy(
          n,
          n.type,
          l === null ? null : l.memoizedProps,
          n.pendingProps,
          u
        ), null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && Cu(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(E(166));
          if (l = Qe.current, Eu(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, s = Bl, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  c = s.memoizedProps;
              }
            l[xt] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || hp(l.nodeValue, u)), l || Tn(n, !0);
          } else
            l = rc(l).createTextNode(
              c
            ), l[xt] = n, n.stateNode = l;
        }
        return qe(n), null;
      case 31:
        if (u = n.memoizedState, l === null || l.memoizedState !== null) {
          if (c = Eu(n), u !== null) {
            if (l === null) {
              if (!c) throw Error(E(318));
              if (l = n.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(E(557));
              l[xt] = n;
            } else
              Zi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            qe(n), l = !1;
          } else
            u = uy(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return n.flags & 256 ? (va(n), n) : (va(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(E(558));
        }
        return qe(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = Eu(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(E(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(E(317));
              s[xt] = n;
            } else
              Zi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            qe(n), s = !1;
          } else
            s = uy(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return n.flags & 256 ? (va(n), n) : (va(n), null);
        }
        return va(n), (n.flags & 128) !== 0 ? (n.lanes = u, n) : (u = c !== null, l = l !== null && l.memoizedState !== null, u && (c = n.child, s = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (s = c.alternate.memoizedState.cachePool.pool), r = null, c.memoizedState !== null && c.memoizedState.cachePool !== null && (r = c.memoizedState.cachePool.pool), r !== s && (c.flags |= 2048)), u !== l && u && (n.child.flags |= 8192), ua(n, n.updateQueue), qe(n), null);
      case 4:
        return bt(), l === null && Hf(n.stateNode.containerInfo), qe(n), null;
      case 10:
        return Vn(n.type), qe(n), null;
      case 19:
        if (q(Pt), c = n.memoizedState, c === null) return qe(n), null;
        if (s = (n.flags & 128) !== 0, r = c.rendering, r === null)
          if (s) pf(c, !1);
          else {
            if (Vt !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = n.child; l !== null; ) {
                if (r = of(l), r !== null) {
                  for (n.flags |= 128, pf(c, !1), l = r.updateQueue, n.updateQueue = l, ua(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    ty(u, l), u = u.sibling;
                  return ae(
                    Pt,
                    Pt.current & 1 | 2
                  ), rt && En(n, c.treeForkCount), n.child;
                }
                l = l.sibling;
              }
            c.tail !== null && bl() > Rt && (n.flags |= 128, s = !0, pf(c, !1), n.lanes = 4194304);
          }
        else {
          if (!s)
            if (l = of(r), l !== null) {
              if (n.flags |= 128, s = !0, l = l.updateQueue, n.updateQueue = l, ua(n, l), pf(c, !0), c.tail === null && c.tailMode === "hidden" && !r.alternate && !rt)
                return qe(n), null;
            } else
              2 * bl() - c.renderingStartTime > Rt && u !== 536870912 && (n.flags |= 128, s = !0, pf(c, !1), n.lanes = 4194304);
          c.isBackwards ? (r.sibling = n.child, n.child = r) : (l = c.last, l !== null ? l.sibling = r : n.child = r, c.last = r);
        }
        return c.tail !== null ? (l = c.tail, c.rendering = l, c.tail = l.sibling, c.renderingStartTime = bl(), l.sibling = null, u = Pt.current, ae(
          Pt,
          s ? u & 1 | 2 : u & 1
        ), rt && En(n, c.treeForkCount), l) : (qe(n), null);
      case 22:
      case 23:
        return va(n), uf(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? (u & 536870912) !== 0 && (n.flags & 128) === 0 && (qe(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : qe(n), u = n.updateQueue, u !== null && ua(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && q(ka), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), Vn(yl), qe(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(E(156, n.tag));
  }
  function s0(l, n) {
    switch (xd(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return Vn(yl), bt(), l = n.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return he(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (va(n), n.alternate === null)
            throw Error(E(340));
          Zi();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 13:
        if (va(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(E(340));
          Zi();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return q(Pt), null;
      case 4:
        return bt(), null;
      case 10:
        return Vn(n.type), null;
      case 22:
      case 23:
        return va(n), uf(), l !== null && q(ka), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return Vn(yl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function r0(l, n) {
    switch (xd(n), n.tag) {
      case 3:
        Vn(yl), bt();
        break;
      case 26:
      case 27:
      case 5:
        he(n);
        break;
      case 4:
        bt();
        break;
      case 31:
        n.memoizedState !== null && va(n);
        break;
      case 13:
        va(n);
        break;
      case 19:
        q(Pt);
        break;
      case 10:
        Vn(n.type);
        break;
      case 22:
      case 23:
        va(n), uf(), l !== null && q(ka);
        break;
      case 24:
        Vn(yl);
    }
  }
  function On(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var s = c.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var r = u.create, m = u.inst;
            c = r(), m.destroy = c;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (v) {
      Ht(n, n.return, v);
    }
  }
  function ln(l, n, u) {
    try {
      var c = n.updateQueue, s = c !== null ? c.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        c = r;
        do {
          if ((c.tag & l) === l) {
            var m = c.inst, v = m.destroy;
            if (v !== void 0) {
              m.destroy = void 0, s = n;
              var _ = u, Y = v;
              try {
                Y();
              } catch (Z) {
                Ht(
                  s,
                  _,
                  Z
                );
              }
            }
          }
          c = c.next;
        } while (c !== r);
      }
    } catch (Z) {
      Ht(n, n.return, Z);
    }
  }
  function dh(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        ec(n, u);
      } catch (c) {
        Ht(l, l.return, c);
      }
    }
  }
  function cc(l, n, u) {
    u.props = ac(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      Ht(l, n, c);
    }
  }
  function Uu(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var c = l.stateNode;
            break;
          case 30:
            c = l.stateNode;
            break;
          default:
            c = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(c) : u.current = c;
      }
    } catch (s) {
      Ht(l, n, s);
    }
  }
  function $n(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (s) {
          Ht(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          Ht(l, n, s);
        }
      else u.current = null;
  }
  function Vy(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (s) {
      Ht(l, l.return, s);
    }
  }
  function hh(l, n, u) {
    try {
      var c = l.stateNode;
      yp(c, l.type, u, n), c[ra] = n;
    } catch (s) {
      Ht(l, l.return, s);
    }
  }
  function Zy(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Pn(l.type) || l.tag === 4;
  }
  function gf(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Zy(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Pn(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function vf(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = xn));
    else if (c !== 4 && (c === 27 && Pn(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for (vf(l, n, u), l = l.sibling; l !== null; )
        vf(l, n, u), l = l.sibling;
  }
  function Sf(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && Pn(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (Sf(l, n, u), l = l.sibling; l !== null; )
        Sf(l, n, u), l = l.sibling;
  }
  function Jy(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, s = n.attributes; s.length; )
        n.removeAttributeNode(s[0]);
      Wl(n, c, u), n[xt] = l, n[ra] = u;
    } catch (r) {
      Ht(l, l.return, r);
    }
  }
  var yi = !1, Tl = !1, mh = !1, Ky = typeof WeakSet == "function" ? WeakSet : Set, Gl = null;
  function bf(l, n) {
    if (l = l.containerInfo, xh = Ml, l = Xi(l), Cs(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var s = c.anchorOffset, r = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break e;
            }
            var m = 0, v = -1, _ = -1, Y = 0, Z = 0, W = l, w = null;
            t: for (; ; ) {
              for (var Q; W !== u || s !== 0 && W.nodeType !== 3 || (v = m + s), W !== r || c !== 0 && W.nodeType !== 3 || (_ = m + c), W.nodeType === 3 && (m += W.nodeValue.length), (Q = W.firstChild) !== null; )
                w = W, W = Q;
              for (; ; ) {
                if (W === l) break t;
                if (w === u && ++Y === s && (v = m), w === r && ++Z === c && (_ = m), (Q = W.nextSibling) !== null) break;
                W = w, w = W.parentNode;
              }
              W = Q;
            }
            u = v === -1 || _ === -1 ? null : { start: v, end: _ };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (jh = { focusedElem: l, selectionRange: u }, Ml = !1, Gl = n; Gl !== null; )
      if (n = Gl, l = n.child, (n.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = n, Gl = l;
      else
        for (; Gl !== null; ) {
          switch (n = Gl, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = n.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (u = 0; u < l.length; u++)
                  s = l[u], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, c = u.stateNode;
                try {
                  var pe = ac(
                    u.type,
                    s
                  );
                  l = c.getSnapshotBeforeUpdate(
                    pe,
                    r
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (He) {
                  Ht(
                    u,
                    u.return,
                    He
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  Dr(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Dr(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(E(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, Gl = l;
            break;
          }
          Gl = n.return;
        }
  }
  function sr(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        pi(l, u), c & 4 && On(5, u);
        break;
      case 1:
        if (pi(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (m) {
              Ht(u, u.return, m);
            }
          else {
            var s = ac(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              Ht(
                u,
                u.return,
                m
              );
            }
          }
        c & 64 && dh(u), c & 512 && Uu(u, u.return);
        break;
      case 3:
        if (pi(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            ec(l, n);
          } catch (m) {
            Ht(u, u.return, m);
          }
        }
        break;
      case 27:
        n === null && c & 4 && Jy(u);
      case 26:
      case 5:
        pi(l, u), n === null && c & 4 && Vy(u), c & 512 && Uu(u, u.return);
        break;
      case 12:
        pi(l, u);
        break;
      case 31:
        pi(l, u), c & 4 && d0(l, u);
        break;
      case 13:
        pi(l, u), c & 4 && Wy(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = an.bind(
          null,
          u
        ), xf(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || yi, !c) {
          n = n !== null && n.memoizedState !== null || Tl, s = yi;
          var r = Tl;
          yi = c, (Tl = n) && !r ? kn(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : pi(l, u), yi = s, Tl = r;
        }
        break;
      case 30:
        break;
      default:
        pi(l, u);
    }
  }
  function $y(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, $y(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && sd(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Qt = null, Ea = !1;
  function Hu(l, n, u) {
    for (u = u.child; u !== null; )
      ky(l, n, u), u = u.sibling;
  }
  function ky(l, n, u) {
    if (Rl && typeof Rl.onCommitFiberUnmount == "function")
      try {
        Rl.onCommitFiberUnmount(hn, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Tl || $n(u, n), Hu(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Tl || $n(u, n);
        var c = Qt, s = Ea;
        Pn(u.type) && (Qt = u.stateNode, Ea = !1), Hu(
          l,
          n,
          u
        ), ho(u.stateNode), Qt = c, Ea = s;
        break;
      case 5:
        Tl || $n(u, n);
      case 6:
        if (c = Qt, s = Ea, Qt = null, Hu(
          l,
          n,
          u
        ), Qt = c, Ea = s, Qt !== null)
          if (Ea)
            try {
              (Qt.nodeType === 9 ? Qt.body : Qt.nodeName === "HTML" ? Qt.ownerDocument.body : Qt).removeChild(u.stateNode);
            } catch (r) {
              Ht(
                u,
                n,
                r
              );
            }
          else
            try {
              Qt.removeChild(u.stateNode);
            } catch (r) {
              Ht(
                u,
                n,
                r
              );
            }
        break;
      case 18:
        Qt !== null && (Ea ? (l = Qt, Sp(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), Zf(l)) : Sp(Qt, u.stateNode));
        break;
      case 4:
        c = Qt, s = Ea, Qt = u.stateNode.containerInfo, Ea = !0, Hu(
          l,
          n,
          u
        ), Qt = c, Ea = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ln(2, u, n), Tl || ln(4, u, n), Hu(
          l,
          n,
          u
        );
        break;
      case 1:
        Tl || ($n(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && cc(
          u,
          n,
          c
        )), Hu(
          l,
          n,
          u
        );
        break;
      case 21:
        Hu(
          l,
          n,
          u
        );
        break;
      case 22:
        Tl = (c = Tl) || u.memoizedState !== null, Hu(
          l,
          n,
          u
        ), Tl = c;
        break;
      default:
        Hu(
          l,
          n,
          u
        );
    }
  }
  function d0(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Zf(l);
      } catch (u) {
        Ht(n, n.return, u);
      }
    }
  }
  function Wy(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Zf(l);
      } catch (u) {
        Ht(n, n.return, u);
      }
  }
  function rr(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new Ky()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new Ky()), n;
      default:
        throw Error(E(435, l.tag));
    }
  }
  function dr(l, n) {
    var u = rr(l);
    n.forEach(function(c) {
      if (!u.has(c)) {
        u.add(c);
        var s = N0.bind(null, l, c);
        c.then(s, s);
      }
    });
  }
  function Ta(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var s = u[c], r = l, m = n, v = m;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Pn(v.type)) {
                Qt = v.stateNode, Ea = !1;
                break e;
              }
              break;
            case 5:
              Qt = v.stateNode, Ea = !1;
              break e;
            case 3:
            case 4:
              Qt = v.stateNode.containerInfo, Ea = !0;
              break e;
          }
          v = v.return;
        }
        if (Qt === null) throw Error(E(160));
        ky(r, m, s), Qt = null, Ea = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        yh(n, l), n = n.sibling;
  }
  var Ie = null;
  function yh(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ta(n, l), Ca(l), c & 4 && (ln(3, l, l.return), On(3, l), ln(5, l, l.return));
        break;
      case 1:
        Ta(n, l), Ca(l), c & 512 && (Tl || u === null || $n(u, u.return)), c & 64 && yi && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var s = Ie;
        if (Ta(n, l), Ca(l), c & 512 && (Tl || u === null || $n(u, u.return)), c & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  t: switch (c) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[ru] || r[xt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(c), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), Wl(r, c, u), r[xt] = l, zt(r), c = r;
                      break e;
                    case "link":
                      var m = Ap(
                        "link",
                        "href",
                        s
                      ).get(c + (u.href || ""));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (r = m[v], r.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), Wl(r, c, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (m = Ap(
                        "meta",
                        "content",
                        s
                      ).get(c + (u.content || ""))) {
                        for (v = 0; v < m.length; v++)
                          if (r = m[v], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            m.splice(v, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), Wl(r, c, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(E(468, c));
                  }
                  r[xt] = l, zt(r), c = r;
                }
                l.stateNode = c;
              } else
                Gh(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Tp(
                s,
                c,
                l.memoizedProps
              );
          else
            r !== c ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, c === null ? Gh(
              s,
              l.type,
              l.stateNode
            ) : Tp(
              s,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && hh(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        Ta(n, l), Ca(l), c & 512 && (Tl || u === null || $n(u, u.return)), u !== null && c & 4 && hh(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (Ta(n, l), Ca(l), c & 512 && (Tl || u === null || $n(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            hu(s, "");
          } catch (pe) {
            Ht(l, l.return, pe);
          }
        }
        c & 4 && l.stateNode != null && (s = l.memoizedProps, hh(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), c & 1024 && (mh = !0);
        break;
      case 6:
        if (Ta(n, l), Ca(l), c & 4) {
          if (l.stateNode === null)
            throw Error(E(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (pe) {
            Ht(l, l.return, pe);
          }
        }
        break;
      case 3:
        if (Gf = null, s = Ie, Ie = ia(n.containerInfo), Ta(n, l), Ie = s, Ca(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Zf(n.containerInfo);
          } catch (pe) {
            Ht(l, l.return, pe);
          }
        mh && (mh = !1, Fy(l));
        break;
      case 4:
        c = Ie, Ie = ia(
          l.stateNode.containerInfo
        ), Ta(n, l), Ca(l), Ie = c;
        break;
      case 12:
        Ta(n, l), Ca(l);
        break;
      case 31:
        Ta(n, l), Ca(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, dr(l, c)));
        break;
      case 13:
        Ta(n, l), Ca(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (In = bl()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, dr(l, c)));
        break;
      case 22:
        s = l.memoizedState !== null;
        var _ = u !== null && u.memoizedState !== null, Y = yi, Z = Tl;
        if (yi = Y || s, Tl = Z || _, Ta(n, l), Tl = Z, yi = Y, Ca(l), c & 8192)
          e: for (n = l.stateNode, n._visibility = s ? n._visibility & -2 : n._visibility | 1, s && (u === null || _ || yi || Tl || uo(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                _ = u = n;
                try {
                  if (r = _.stateNode, s)
                    m = r.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    v = _.stateNode;
                    var W = _.memoizedProps.style, w = W != null && W.hasOwnProperty("display") ? W.display : null;
                    v.style.display = w == null || typeof w == "boolean" ? "" : ("" + w).trim();
                  }
                } catch (pe) {
                  Ht(_, _.return, pe);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                _ = n;
                try {
                  _.stateNode.nodeValue = s ? "" : _.memoizedProps;
                } catch (pe) {
                  Ht(_, _.return, pe);
                }
              }
            } else if (n.tag === 18) {
              if (u === null) {
                _ = n;
                try {
                  var Q = _.stateNode;
                  s ? vl(Q, !0) : vl(_.stateNode, !1);
                } catch (pe) {
                  Ht(_, _.return, pe);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, dr(l, u))));
        break;
      case 19:
        Ta(n, l), Ca(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, dr(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ta(n, l), Ca(l);
    }
  }
  function Ca(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if (Zy(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(E(160));
        switch (u.tag) {
          case 27:
            var s = u.stateNode, r = gf(l);
            Sf(l, r, s);
            break;
          case 5:
            var m = u.stateNode;
            u.flags & 32 && (hu(m, ""), u.flags &= -33);
            var v = gf(l);
            Sf(l, v, m);
            break;
          case 3:
          case 4:
            var _ = u.stateNode.containerInfo, Y = gf(l);
            vf(
              l,
              Y,
              _
            );
            break;
          default:
            throw Error(E(161));
        }
      } catch (Z) {
        Ht(l, l.return, Z);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function Fy(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        Fy(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function pi(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        sr(l, n.alternate, n), n = n.sibling;
  }
  function uo(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ln(4, n, n.return), uo(n);
          break;
        case 1:
          $n(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && cc(
            n,
            n.return,
            u
          ), uo(n);
          break;
        case 27:
          ho(n.stateNode);
        case 26:
        case 5:
          $n(n, n.return), uo(n);
          break;
        case 22:
          n.memoizedState === null && uo(n);
          break;
        case 30:
          uo(n);
          break;
        default:
          uo(n);
      }
      l = l.sibling;
    }
  }
  function kn(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, s = l, r = n, m = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          kn(
            s,
            r,
            u
          ), On(4, r);
          break;
        case 1:
          if (kn(
            s,
            r,
            u
          ), c = r, s = c.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (Y) {
              Ht(c, c.return, Y);
            }
          if (c = r, s = c.updateQueue, s !== null) {
            var v = c.stateNode;
            try {
              var _ = s.shared.hiddenCallbacks;
              if (_ !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < _.length; s++)
                  Gd(_[s], v);
            } catch (Y) {
              Ht(c, c.return, Y);
            }
          }
          u && m & 64 && dh(r), Uu(r, r.return);
          break;
        case 27:
          Jy(r);
        case 26:
        case 5:
          kn(
            s,
            r,
            u
          ), u && c === null && m & 4 && Vy(r), Uu(r, r.return);
          break;
        case 12:
          kn(
            s,
            r,
            u
          );
          break;
        case 31:
          kn(
            s,
            r,
            u
          ), u && m & 4 && d0(s, r);
          break;
        case 13:
          kn(
            s,
            r,
            u
          ), u && m & 4 && Wy(s, r);
          break;
        case 22:
          r.memoizedState === null && kn(
            s,
            r,
            u
          ), Uu(r, r.return);
          break;
        case 30:
          break;
        default:
          kn(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function ph(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Gs(u));
  }
  function gh(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && Gs(l));
  }
  function Rn(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Ef(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function Ef(l, n, u, c) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Rn(
          l,
          n,
          u,
          c
        ), s & 2048 && On(9, n);
        break;
      case 1:
        Rn(
          l,
          n,
          u,
          c
        );
        break;
      case 3:
        Rn(
          l,
          n,
          u,
          c
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && Gs(l)));
        break;
      case 12:
        if (s & 2048) {
          Rn(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, m = r.id, v = r.onPostCommit;
            typeof v == "function" && v(
              m,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (_) {
            Ht(n, n.return, _);
          }
        } else
          Rn(
            l,
            n,
            u,
            c
          );
        break;
      case 31:
        Rn(
          l,
          n,
          u,
          c
        );
        break;
      case 13:
        Rn(
          l,
          n,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, m = n.alternate, n.memoizedState !== null ? r._visibility & 2 ? Rn(
          l,
          n,
          u,
          c
        ) : hr(l, n) : r._visibility & 2 ? Rn(
          l,
          n,
          u,
          c
        ) : (r._visibility |= 2, Tf(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && ph(m, n);
        break;
      case 24:
        Rn(
          l,
          n,
          u,
          c
        ), s & 2048 && gh(n.alternate, n);
        break;
      default:
        Rn(
          l,
          n,
          u,
          c
        );
    }
  }
  function Tf(l, n, u, c, s) {
    for (s = s && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var r = l, m = n, v = u, _ = c, Y = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Tf(
            r,
            m,
            v,
            _,
            s
          ), On(8, m);
          break;
        case 23:
          break;
        case 22:
          var Z = m.stateNode;
          m.memoizedState !== null ? Z._visibility & 2 ? Tf(
            r,
            m,
            v,
            _,
            s
          ) : hr(
            r,
            m
          ) : (Z._visibility |= 2, Tf(
            r,
            m,
            v,
            _,
            s
          )), s && Y & 2048 && ph(
            m.alternate,
            m
          );
          break;
        case 24:
          Tf(
            r,
            m,
            v,
            _,
            s
          ), s && Y & 2048 && gh(m.alternate, m);
          break;
        default:
          Tf(
            r,
            m,
            v,
            _,
            s
          );
      }
      n = n.sibling;
    }
  }
  function hr(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, s = c.flags;
        switch (c.tag) {
          case 22:
            hr(u, c), s & 2048 && ph(
              c.alternate,
              c
            );
            break;
          case 24:
            hr(u, c), s & 2048 && gh(c.alternate, c);
            break;
          default:
            hr(u, c);
        }
        n = n.sibling;
      }
  }
  var Ua = 8192;
  function Nu(l, n, u) {
    if (l.subtreeFlags & Ua)
      for (l = l.child; l !== null; )
        h0(
          l,
          n,
          u
        ), l = l.sibling;
  }
  function h0(l, n, u) {
    switch (l.tag) {
      case 26:
        Nu(
          l,
          n,
          u
        ), l.flags & Ua && l.memoizedState !== null && Yu(
          u,
          Ie,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Nu(
          l,
          n,
          u
        );
        break;
      case 3:
      case 4:
        var c = Ie;
        Ie = ia(l.stateNode.containerInfo), Nu(
          l,
          n,
          u
        ), Ie = c;
        break;
      case 22:
        l.memoizedState === null && (c = l.alternate, c !== null && c.memoizedState !== null ? (c = Ua, Ua = 16777216, Nu(
          l,
          n,
          u
        ), Ua = c) : Nu(
          l,
          n,
          u
        ));
        break;
      default:
        Nu(
          l,
          n,
          u
        );
    }
  }
  function vh(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function Af(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Gl = c, Sh(
            c,
            l
          );
        }
      vh(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Iy(l), l = l.sibling;
  }
  function Iy(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Af(l), l.flags & 2048 && ln(9, l, l.return);
        break;
      case 3:
        Af(l);
        break;
      case 12:
        Af(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, mr(l)) : Af(l);
        break;
      default:
        Af(l);
    }
  }
  function mr(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Gl = c, Sh(
            c,
            l
          );
        }
      vh(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          ln(8, n, n.return), mr(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, mr(n));
          break;
        default:
          mr(n);
      }
      l = l.sibling;
    }
  }
  function Sh(l, n) {
    for (; Gl !== null; ) {
      var u = Gl;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ln(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          Gs(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, Gl = c;
      else
        e: for (u = l; Gl !== null; ) {
          c = Gl;
          var s = c.sibling, r = c.return;
          if ($y(c), c === u) {
            Gl = null;
            break e;
          }
          if (s !== null) {
            s.return = r, Gl = s;
            break e;
          }
          Gl = r;
        }
    }
  }
  var m0 = {
    getCacheForType: function(l) {
      var n = I(yl), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return I(yl).controller.signal;
    }
  }, Py = typeof WeakMap == "function" ? WeakMap : Map, Tt = 0, Bt = null, dt = null, ct = 0, Ut = 0, je = null, xu = !1, oc = !1, bh = !1, Wn = 0, Vt = 0, Fn = 0, io = 0, Eh = 0, Aa = 0, il = 0, yr = null, cl = null, Th = !1, In = 0, ep = 0, Rt = 1 / 0, Of = null, el = null, zl = 0, gi = null, fc = null, ju = 0, Ha = 0, Ah = null, Oh = null, Rf = 0, pr = null;
  function Na() {
    return (Tt & 2) !== 0 && ct !== 0 ? ct & -ct : U.T !== null ? Mh() : od();
  }
  function y0() {
    if (Aa === 0)
      if ((ct & 536870912) === 0 || rt) {
        var l = oe;
        oe <<= 1, (oe & 3932160) === 0 && (oe = 262144), Aa = l;
      } else Aa = 536870912;
    return l = ga.current, l !== null && (l.flags |= 32), Aa;
  }
  function Oa(l, n, u) {
    (l === Bt && (Ut === 2 || Ut === 9) || l.cancelPendingCommit !== null) && (Bu(l, 0), vi(
      l,
      ct,
      Aa,
      !1
    )), xi(l, u), ((Tt & 2) === 0 || l !== Bt) && (l === Bt && ((Tt & 2) === 0 && (io |= u), Vt === 4 && vi(
      l,
      ct,
      Aa,
      !1
    )), qu(l));
  }
  function p0(l, n, u) {
    if ((Tt & 6) !== 0) throw Error(E(327));
    var c = !u && (n & 127) === 0 && (n & l.expiredLanes) === 0 || it(l, n), s = c ? E0(l, n) : _h(l, n, !0), r = c;
    do {
      if (s === 0) {
        oc && !c && vi(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, r && !g0(u)) {
          s = _h(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var m = 0;
          else
            m = l.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            n = m;
            e: {
              var v = l;
              s = yr;
              var _ = v.current.memoizedState.isDehydrated;
              if (_ && (Bu(v, m).flags |= 256), m = _h(
                v,
                m,
                !1
              ), m !== 2) {
                if (bh && !_) {
                  v.errorRecoveryDisabledLanes |= r, io |= r, s = 4;
                  break e;
                }
                r = cl, cl = s, r !== null && (cl === null ? cl = r : cl.push.apply(
                  cl,
                  r
                ));
              }
              s = m;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Bu(l, 0), vi(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, r = s, r) {
            case 0:
            case 1:
              throw Error(E(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              vi(
                c,
                n,
                Aa,
                !xu
              );
              break e;
            case 2:
              cl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(E(329));
          }
          if ((n & 62914560) === n && (s = In + 300 - bl(), 10 < s)) {
            if (vi(
              c,
              n,
              Aa,
              !xu
            ), be(c, 0, !0) !== 0) break e;
            ju = n, c.timeoutHandle = _r(
              gr.bind(
                null,
                c,
                u,
                cl,
                Of,
                Th,
                n,
                Aa,
                io,
                il,
                xu,
                r,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          gr(
            c,
            u,
            cl,
            Of,
            Th,
            n,
            Aa,
            io,
            il,
            xu,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    qu(l);
  }
  function gr(l, n, u, c, s, r, m, v, _, Y, Z, W, w, Q) {
    if (l.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: xn
      }, h0(
        n,
        r,
        W
      );
      var pe = (r & 62914560) === r ? In - bl() : (r & 4194048) === r ? ep - bl() : 0;
      if (pe = Rp(
        W,
        pe
      ), pe !== null) {
        ju = r, l.cancelPendingCommit = pe(
          R0.bind(
            null,
            l,
            n,
            r,
            u,
            c,
            s,
            m,
            v,
            _,
            Z,
            W,
            null,
            w,
            Q
          )
        ), vi(l, r, m, !Y);
        return;
      }
    }
    R0(
      l,
      n,
      r,
      u,
      c,
      s,
      m,
      v,
      _
    );
  }
  function g0(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var s = u[c], r = s.getSnapshot;
          s = s.value;
          try {
            if (!na(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function vi(l, n, u, c) {
    n &= ~Eh, n &= ~io, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Nl(s), m = 1 << r;
      c[r] = -1, s &= ~m;
    }
    u !== 0 && Ss(l, u, n);
  }
  function _f() {
    return (Tt & 6) === 0 ? (bi(0), !1) : !0;
  }
  function tp() {
    if (dt !== null) {
      if (Ut === 0)
        var l = dt.return;
      else
        l = dt, Qn = ci = null, Ws(l), Wi = null, $c = 0, l = dt;
      for (; l !== null; )
        r0(l.alternate, l), l = l.return;
      dt = null;
    }
  }
  function Bu(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, L0(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ju = 0, tp(), Bt = l, dt = u = ui(l.current, null), ct = n, Ut = 0, je = null, xu = !1, oc = it(l, n), bh = !1, il = Aa = Eh = io = Fn = Vt = 0, cl = yr = null, Th = !1, (n & 8) !== 0 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var s = 31 - Nl(c), r = 1 << s;
        n |= l[s], c &= ~r;
      }
    return Wn = n, Za(), u;
  }
  function Df(l, n) {
    ke = null, U.H = nr, n === Ki || n === af ? (n = sy(), Ut = 3) : n === Jc ? (n = sy(), Ut = 4) : Ut = n === ch ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, je = n, dt === null && (Vt = 1, yf(
      l,
      Ka(n, l.current)
    ));
  }
  function v0() {
    var l = ga.current;
    return l === null ? !0 : (ct & 4194048) === ct ? Ia === null : (ct & 62914560) === ct || (ct & 536870912) !== 0 ? l === Ia : !1;
  }
  function S0() {
    var l = U.H;
    return U.H = nr, l === null ? nr : l;
  }
  function b0() {
    var l = U.A;
    return U.A = m0, l;
  }
  function Rh() {
    Vt = 4, xu || (ct & 4194048) !== ct && ga.current !== null || (oc = !0), (Fn & 134217727) === 0 && (io & 134217727) === 0 || Bt === null || vi(
      Bt,
      ct,
      Aa,
      !1
    );
  }
  function _h(l, n, u) {
    var c = Tt;
    Tt |= 2;
    var s = S0(), r = b0();
    (Bt !== l || ct !== n) && (Of = null, Bu(l, n)), n = !1;
    var m = Vt;
    e: do
      try {
        if (Ut !== 0 && dt !== null) {
          var v = dt, _ = je;
          switch (Ut) {
            case 8:
              tp(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ga.current === null && (n = !0);
              var Y = Ut;
              if (Ut = 0, je = null, co(l, v, _, Y), u && oc) {
                m = 0;
                break e;
              }
              break;
            default:
              Y = Ut, Ut = 0, je = null, co(l, v, _, Y);
          }
        }
        f1(), m = Vt;
        break;
      } catch (Z) {
        Df(l, Z);
      }
    while (!0);
    return n && l.shellSuspendCounter++, Qn = ci = null, Tt = c, U.H = s, U.A = r, dt === null && (Bt = null, ct = 0, Za()), m;
  }
  function f1() {
    for (; dt !== null; ) T0(dt);
  }
  function E0(l, n) {
    var u = Tt;
    Tt |= 2;
    var c = S0(), s = b0();
    Bt !== l || ct !== n ? (Of = null, Rt = bl() + 500, Bu(l, n)) : oc = it(
      l,
      n
    );
    e: do
      try {
        if (Ut !== 0 && dt !== null) {
          n = dt;
          var r = je;
          t: switch (Ut) {
            case 1:
              Ut = 0, je = null, co(l, n, r, 1);
              break;
            case 2:
            case 9:
              if (oy(r)) {
                Ut = 0, je = null, A0(n);
                break;
              }
              n = function() {
                Ut !== 2 && Ut !== 9 || Bt !== l || (Ut = 7), qu(l);
              }, r.then(n, n);
              break e;
            case 3:
              Ut = 7;
              break e;
            case 4:
              Ut = 5;
              break e;
            case 7:
              oy(r) ? (Ut = 0, je = null, A0(n)) : (Ut = 0, je = null, co(l, n, r, 7));
              break;
            case 5:
              var m = null;
              switch (dt.tag) {
                case 26:
                  m = dt.memoizedState;
                case 5:
                case 27:
                  var v = dt;
                  if (m ? ja(m) : v.stateNode.complete) {
                    Ut = 0, je = null;
                    var _ = v.sibling;
                    if (_ !== null) dt = _;
                    else {
                      var Y = v.return;
                      Y !== null ? (dt = Y, vr(Y)) : dt = null;
                    }
                    break t;
                  }
              }
              Ut = 0, je = null, co(l, n, r, 5);
              break;
            case 6:
              Ut = 0, je = null, co(l, n, r, 6);
              break;
            case 8:
              tp(), Vt = 6;
              break e;
            default:
              throw Error(E(462));
          }
        }
        sc();
        break;
      } catch (Z) {
        Df(l, Z);
      }
    while (!0);
    return Qn = ci = null, U.H = c, U.A = s, Tt = u, dt !== null ? 0 : (Bt = null, ct = 0, Za(), Vt);
  }
  function sc() {
    for (; dt !== null && !fu(); )
      T0(dt);
  }
  function T0(l) {
    var n = Ly(l.alternate, l, Wn);
    l.memoizedProps = l.pendingProps, n === null ? vr(l) : dt = n;
  }
  function A0(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = uc(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          ct
        );
        break;
      case 11:
        n = uc(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          ct
        );
        break;
      case 5:
        Ws(n);
      default:
        r0(u, n), n = dt = ty(n, Wn), n = Ly(u, n, Wn);
    }
    l.memoizedProps = l.pendingProps, n === null ? vr(l) : dt = n;
  }
  function co(l, n, u, c) {
    Qn = ci = null, Ws(n), Wi = null, $c = 0;
    var s = n.return;
    try {
      if (o1(
        l,
        s,
        n,
        u,
        ct
      )) {
        Vt = 1, yf(
          l,
          Ka(u, l.current)
        ), dt = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw dt = s, r;
      Vt = 1, yf(
        l,
        Ka(u, l.current)
      ), dt = null;
      return;
    }
    n.flags & 32768 ? (rt || c === 1 ? l = !0 : oc || (ct & 536870912) !== 0 ? l = !1 : (xu = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = ga.current, c !== null && c.tag === 13 && (c.flags |= 16384))), O0(n, l)) : vr(n);
  }
  function vr(l) {
    var n = l;
    do {
      if ((n.flags & 32768) !== 0) {
        O0(
          n,
          xu
        );
        return;
      }
      l = n.return;
      var u = f0(
        n.alternate,
        n,
        Wn
      );
      if (u !== null) {
        dt = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        dt = n;
        return;
      }
      dt = n = l;
    } while (n !== null);
    Vt === 0 && (Vt = 5);
  }
  function O0(l, n) {
    do {
      var u = s0(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, dt = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        dt = l;
        return;
      }
      dt = l = u;
    } while (l !== null);
    Vt = 6, dt = null;
  }
  function R0(l, n, u, c, s, r, m, v, _) {
    l.cancelPendingCommit = null;
    do
      zf();
    while (zl !== 0);
    if ((Tt & 6) !== 0) throw Error(E(327));
    if (n !== null) {
      if (n === l.current) throw Error(E(177));
      if (r = n.lanes | n.childLanes, r |= Sn, qo(
        l,
        u,
        r,
        m,
        v,
        _
      ), l === Bt && (dt = Bt = null, ct = 0), fc = n, gi = l, ju = u, Ha = r, Ah = s, Oh = c, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, x0(Hn, function() {
        return C0(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || c) {
        c = U.T, U.T = null, s = J.p, J.p = 2, m = Tt, Tt |= 4;
        try {
          bf(l, n, u);
        } finally {
          Tt = m, J.p = s, U.T = c;
        }
      }
      zl = 1, _0(), D0(), z0();
    }
  }
  function _0() {
    if (zl === 1) {
      zl = 0;
      var l = gi, n = fc, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = U.T, U.T = null;
        var c = J.p;
        J.p = 2;
        var s = Tt;
        Tt |= 4;
        try {
          yh(n, l);
          var r = jh, m = Xi(l.containerInfo), v = r.focusedElem, _ = r.selectionRange;
          if (m !== v && v && v.ownerDocument && Yc(
            v.ownerDocument.documentElement,
            v
          )) {
            if (_ !== null && Cs(v)) {
              var Y = _.start, Z = _.end;
              if (Z === void 0 && (Z = Y), "selectionStart" in v)
                v.selectionStart = Y, v.selectionEnd = Math.min(
                  Z,
                  v.value.length
                );
              else {
                var W = v.ownerDocument || document, w = W && W.defaultView || window;
                if (w.getSelection) {
                  var Q = w.getSelection(), pe = v.textContent.length, He = Math.min(_.start, pe), Yt = _.end === void 0 ? He : Math.min(_.end, pe);
                  !Q.extend && He > Yt && (m = Yt, Yt = He, He = m);
                  var x = Pm(
                    v,
                    He
                  ), C = Pm(
                    v,
                    Yt
                  );
                  if (x && C && (Q.rangeCount !== 1 || Q.anchorNode !== x.node || Q.anchorOffset !== x.offset || Q.focusNode !== C.node || Q.focusOffset !== C.offset)) {
                    var B = W.createRange();
                    B.setStart(x.node, x.offset), Q.removeAllRanges(), He > Yt ? (Q.addRange(B), Q.extend(C.node, C.offset)) : (B.setEnd(C.node, C.offset), Q.addRange(B));
                  }
                }
              }
            }
            for (W = [], Q = v; Q = Q.parentNode; )
              Q.nodeType === 1 && W.push({
                element: Q,
                left: Q.scrollLeft,
                top: Q.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < W.length; v++) {
              var k = W[v];
              k.element.scrollLeft = k.left, k.element.scrollTop = k.top;
            }
          }
          Ml = !!xh, jh = xh = null;
        } finally {
          Tt = s, J.p = c, U.T = u;
        }
      }
      l.current = n, zl = 2;
    }
  }
  function D0() {
    if (zl === 2) {
      zl = 0;
      var l = gi, n = fc, u = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || u) {
        u = U.T, U.T = null;
        var c = J.p;
        J.p = 2;
        var s = Tt;
        Tt |= 4;
        try {
          sr(l, n.alternate, n);
        } finally {
          Tt = s, J.p = c, U.T = u;
        }
      }
      zl = 3;
    }
  }
  function z0() {
    if (zl === 4 || zl === 3) {
      zl = 0, Ac();
      var l = gi, n = fc, u = ju, c = Oh;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? zl = 5 : (zl = 0, fc = gi = null, M0(l, l.pendingLanes));
      var s = l.pendingLanes;
      if (s === 0 && (el = null), Dm(u), n = n.stateNode, Rl && typeof Rl.onCommitFiberRoot == "function")
        try {
          Rl.onCommitFiberRoot(
            hn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        n = U.T, s = J.p, J.p = 2, U.T = null;
        try {
          for (var r = l.onRecoverableError, m = 0; m < c.length; m++) {
            var v = c[m];
            r(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          U.T = n, J.p = s;
        }
      }
      (ju & 3) !== 0 && zf(), qu(l), s = l.pendingLanes, (u & 261930) !== 0 && (s & 42) !== 0 ? l === pr ? Rf++ : (Rf = 0, pr = l) : Rf = 0, bi(0);
    }
  }
  function M0(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, Gs(n)));
  }
  function zf() {
    return _0(), D0(), z0(), C0();
  }
  function C0() {
    if (zl !== 5) return !1;
    var l = gi, n = Ha;
    Ha = 0;
    var u = Dm(ju), c = U.T, s = J.p;
    try {
      J.p = 32 > u ? 32 : u, U.T = null, u = Ah, Ah = null;
      var r = gi, m = ju;
      if (zl = 0, fc = gi = null, ju = 0, (Tt & 6) !== 0) throw Error(E(331));
      var v = Tt;
      if (Tt |= 4, Iy(r.current), Ef(
        r,
        r.current,
        m,
        u
      ), Tt = v, bi(0, !1), Rl && typeof Rl.onPostCommitFiberRoot == "function")
        try {
          Rl.onPostCommitFiberRoot(hn, r);
        } catch {
        }
      return !0;
    } finally {
      J.p = s, U.T = c, M0(l, n);
    }
  }
  function U0(l, n, u) {
    n = Ka(u, n), n = Hy(l.stateNode, n, 2), l = Fa(l, n, 2), l !== null && (xi(l, 2), qu(l));
  }
  function Ht(l, n, u) {
    if (l.tag === 3)
      U0(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          U0(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (el === null || !el.has(c))) {
            l = Ka(u, l), u = Ny(2), c = Fa(n, u, 2), c !== null && (xy(
              u,
              c,
              n,
              l
            ), xi(c, 2), qu(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function Sr(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new Py();
      var s = /* @__PURE__ */ new Set();
      c.set(n, s);
    } else
      s = c.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), c.set(n, s));
    s.has(u) || (bh = !0, s.add(u), l = lp.bind(null, l, n, u), n.then(l, l));
  }
  function lp(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, Bt === l && (ct & u) === u && (Vt === 4 || Vt === 3 && (ct & 62914560) === ct && 300 > bl() - In ? (Tt & 2) === 0 && Bu(l, 0) : Eh |= u, il === ct && (il = 0)), qu(l);
  }
  function H0(l, n) {
    n === 0 && (n = la()), l = ni(l, n), l !== null && (xi(l, n), qu(l));
  }
  function an(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), H0(l, u);
  }
  function N0(l, n) {
    var u = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var c = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(E(314));
    }
    c !== null && c.delete(n), H0(l, u);
  }
  function x0(l, n) {
    return ve(l, n);
  }
  var Mf = null, oo = null, ap = !1, Dh = !1, np = !1, Si = 0;
  function qu(l) {
    l !== oo && l.next === null && (oo === null ? Mf = oo = l : oo = oo.next = l), Dh = !0, ap || (ap = !0, Er());
  }
  function bi(l, n) {
    if (!np && Dh) {
      np = !0;
      do
        for (var u = !1, c = Mf; c !== null; ) {
          if (l !== 0) {
            var s = c.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var m = c.suspendedLanes, v = c.pingedLanes;
              r = (1 << 31 - Nl(42 | l) + 1) - 1, r &= s & ~(m & ~v), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, fo(c, r));
          } else
            r = ct, r = be(
              c,
              c === Bt ? r : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), (r & 3) === 0 || it(c, r) || (u = !0, fo(c, r));
          c = c.next;
        }
      while (u);
      np = !1;
    }
  }
  function zh() {
    up();
  }
  function up() {
    Dh = ap = !1;
    var l = 0;
    Si !== 0 && s1() && (l = Si);
    for (var n = bl(), u = null, c = Mf; c !== null; ) {
      var s = c.next, r = ip(c, n);
      r === 0 ? (c.next = null, u === null ? Mf = s : u.next = s, s === null && (oo = u)) : (u = c, (l !== 0 || (r & 3) !== 0) && (Dh = !0)), c = s;
    }
    zl !== 0 && zl !== 5 || bi(l), Si !== 0 && (Si = 0);
  }
  function ip(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var m = 31 - Nl(r), v = 1 << m, _ = s[m];
      _ === -1 ? ((v & u) === 0 || (v & c) !== 0) && (s[m] = Ve(v, n)) : _ <= n && (l.expiredLanes |= v), r &= ~v;
    }
    if (n = Bt, u = ct, u = be(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === n && (Ut === 2 || Ut === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && Hi(c), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || it(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && Hi(c), Dm(u)) {
        case 2:
        case 8:
          u = jo;
          break;
        case 32:
          u = Hn;
          break;
        case 268435456:
          u = Bo;
          break;
        default:
          u = Hn;
      }
      return c = br.bind(null, l), u = ve(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && Hi(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function br(l, n) {
    if (zl !== 0 && zl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (zf() && l.callbackNode !== u)
      return null;
    var c = ct;
    return c = be(
      l,
      l === Bt ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (p0(l, c, n), ip(l, bl()), l.callbackNode != null && l.callbackNode === u ? br.bind(null, l) : null);
  }
  function fo(l, n) {
    if (zf()) return null;
    p0(l, n, !0);
  }
  function Er() {
    X0(function() {
      (Tt & 6) !== 0 ? ve(
        xo,
        zh
      ) : up();
    });
  }
  function Mh() {
    if (Si === 0) {
      var l = Ji;
      l === 0 && (l = ue, ue <<= 1, (ue & 261888) === 0 && (ue = 256)), Si = l;
    }
    return Si;
  }
  function j0(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : yn("" + l);
  }
  function so(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Tr(l, n, u, c, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = j0(
        (s[ra] || null).action
      ), m = c.submitter;
      m && (n = (n = m[ra] || null) ? j0(n.formAction) : m.getAttribute("formAction"), n !== null && (r = n, m = null));
      var v = new Ds(
        "action",
        "action",
        null,
        c,
        s
      );
      l.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (Si !== 0) {
                  var _ = m ? so(s, m) : new FormData(s);
                  hf(
                    u,
                    {
                      pending: !0,
                      data: _,
                      method: s.method,
                      action: r
                    },
                    null,
                    _
                  );
                }
              } else
                typeof r == "function" && (v.preventDefault(), _ = m ? so(s, m) : new FormData(s), hf(
                  u,
                  {
                    pending: !0,
                    data: _,
                    method: s.method,
                    action: r
                  },
                  r,
                  _
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Ch = 0; Ch < Fo.length; Ch++) {
    var Cf = Fo[Ch], cp = Cf.toLowerCase(), op = Cf[0].toUpperCase() + Cf.slice(1);
    ha(
      cp,
      "on" + op
    );
  }
  ha(Hs, "onAnimationEnd"), ha(ey, "onAnimationIteration"), ha(Cd, "onAnimationStart"), ha("dblclick", "onDoubleClick"), ha("focusin", "onFocus"), ha("focusout", "onBlur"), ha(wc, "onTransitionRun"), ha(Ns, "onTransitionStart"), ha(gu, "onTransitionCancel"), ha(Jg, "onTransitionEnd"), du("onMouseEnter", ["mouseout", "mouseover"]), du("onMouseLeave", ["mouseout", "mouseover"]), du("onPointerEnter", ["pointerout", "pointerover"]), du("onPointerLeave", ["pointerout", "pointerover"]), qi(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), qi(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), qi("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), qi(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), qi(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), qi(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Uf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), B0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Uf)
  );
  function q0(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], s = c.event;
      c = c.listeners;
      e: {
        var r = void 0;
        if (n)
          for (var m = c.length - 1; 0 <= m; m--) {
            var v = c[m], _ = v.instance, Y = v.currentTarget;
            if (v = v.listener, _ !== r && s.isPropagationStopped())
              break e;
            r = v, s.currentTarget = Y;
            try {
              r(s);
            } catch (Z) {
              Gc(Z);
            }
            s.currentTarget = null, r = _;
          }
        else
          for (m = 0; m < c.length; m++) {
            if (v = c[m], _ = v.instance, Y = v.currentTarget, v = v.listener, _ !== r && s.isPropagationStopped())
              break e;
            r = v, s.currentTarget = Y;
            try {
              r(s);
            } catch (Z) {
              Gc(Z);
            }
            s.currentTarget = null, r = _;
          }
      }
    }
  }
  function ft(l, n) {
    var u = n[fd];
    u === void 0 && (u = n[fd] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (Ar(n, l, 2, !1), u.add(c));
  }
  function fp(l, n, u) {
    var c = 0;
    n && (c |= 4), Ar(
      u,
      l,
      c,
      n
    );
  }
  var Uh = "_reactListening" + Math.random().toString(36).slice(2);
  function Hf(l) {
    if (!l[Uh]) {
      l[Uh] = !0, zc.forEach(function(u) {
        u !== "selectionchange" && (B0.has(u) || fp(u, !1, l), fp(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[Uh] || (n[Uh] = !0, fp("selectionchange", !1, n));
    }
  }
  function Ar(l, n, u, c) {
    switch (Hr(n)) {
      case 2:
        var s = wu;
        break;
      case 8:
        s = Gu;
        break;
      default:
        s = Fl;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !Rs || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), c ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function sp(l, n, u, c, s) {
    var r = c;
    if ((n & 1) === 0 && (n & 2) === 0 && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var m = c.tag;
        if (m === 3 || m === 4) {
          var v = c.stateNode.containerInfo;
          if (v === s) break;
          if (m === 4)
            for (m = c.return; m !== null; ) {
              var _ = m.tag;
              if ((_ === 3 || _ === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (m = Rc(v), m === null) return;
            if (_ = m.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              c = r = m;
              continue e;
            }
            v = v.parentNode;
          }
        }
        c = c.return;
      }
    Bm(function() {
      var Y = r, Z = gd(u), W = [];
      e: {
        var w = vu.get(l);
        if (w !== void 0) {
          var Q = Ds, pe = l;
          switch (l) {
            case "keypress":
              if (Sd(u) === 0) break e;
            case "keydown":
            case "keyup":
              Q = Ad;
              break;
            case "focusin":
              pe = "focus", Q = Ed;
              break;
            case "focusout":
              pe = "blur", Q = Ed;
              break;
            case "beforeblur":
            case "afterblur":
              Q = Ed;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Q = Jo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Q = xg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Q = wg;
              break;
            case Hs:
            case ey:
            case Cd:
              Q = Bg;
              break;
            case Jg:
              Q = n1;
              break;
            case "scroll":
            case "scrollend":
              Q = l1;
              break;
            case "wheel":
              Q = u1;
              break;
            case "copy":
            case "cut":
            case "paste":
              Q = Hc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Q = qn;
              break;
            case "toggle":
            case "beforetoggle":
              Q = Zm;
          }
          var He = (n & 4) !== 0, Yt = !He && (l === "scroll" || l === "scrollend"), x = He ? w !== null ? w + "Capture" : null : w;
          He = [];
          for (var C = Y, B; C !== null; ) {
            var k = C;
            if (B = k.stateNode, k = k.tag, k !== 5 && k !== 26 && k !== 27 || B === null || x === null || (k = xl(C, x), k != null && He.push(
              Or(C, k, B)
            )), Yt) break;
            C = C.return;
          }
          0 < He.length && (w = new Q(
            w,
            pe,
            null,
            u,
            Z
          ), W.push({ event: w, listeners: He }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (w = l === "mouseover" || l === "pointerover", Q = l === "mouseout" || l === "pointerout", w && u !== pd && (pe = u.relatedTarget || u.fromElement) && (Rc(pe) || pe[ji]))
            break e;
          if ((Q || w) && (w = Z.window === Z ? Z : (w = Z.ownerDocument) ? w.defaultView || w.parentWindow : window, Q ? (pe = u.relatedTarget || u.toElement, Q = Y, pe = pe ? Rc(pe) : null, pe !== null && (Yt = ce(pe), He = pe.tag, pe !== Yt || He !== 5 && He !== 27 && He !== 6) && (pe = null)) : (Q = null, pe = Y), Q !== pe)) {
            if (He = Jo, k = "onMouseLeave", x = "onMouseEnter", C = "mouse", (l === "pointerout" || l === "pointerover") && (He = qn, k = "onPointerLeave", x = "onPointerEnter", C = "pointer"), Yt = Q == null ? w : Yo(Q), B = pe == null ? w : Yo(pe), w = new He(
              k,
              C + "leave",
              Q,
              u,
              Z
            ), w.target = Yt, w.relatedTarget = B, k = null, Rc(Z) === Y && (He = new He(
              x,
              C + "enter",
              pe,
              u,
              Z
            ), He.target = B, He.relatedTarget = Yt, k = He), Yt = k, Q && pe)
              t: {
                for (He = Y0, x = Q, C = pe, B = 0, k = x; k; k = He(k))
                  B++;
                k = 0;
                for (var De = C; De; De = He(De))
                  k++;
                for (; 0 < B - k; )
                  x = He(x), B--;
                for (; 0 < k - B; )
                  C = He(C), k--;
                for (; B--; ) {
                  if (x === C || C !== null && x === C.alternate) {
                    He = x;
                    break t;
                  }
                  x = He(x), C = He(C);
                }
                He = null;
              }
            else He = null;
            Q !== null && Hh(
              W,
              w,
              Q,
              He,
              !1
            ), pe !== null && Yt !== null && Hh(
              W,
              Yt,
              pe,
              He,
              !0
            );
          }
        }
        e: {
          if (w = Y ? Yo(Y) : window, Q = w.nodeName && w.nodeName.toLowerCase(), Q === "select" || Q === "input" && w.type === "file")
            var vt = Wm;
          else if (pu(w))
            if (_d)
              vt = qc;
            else {
              vt = Vg;
              var Ee = Qg;
            }
          else
            Q = w.nodeName, !Q || Q.toLowerCase() !== "input" || w.type !== "checkbox" && w.type !== "radio" ? Y && jm(Y.elementType) && (vt = Wm) : vt = Li;
          if (vt && (vt = vt(l, Y))) {
            km(
              W,
              vt,
              u,
              Z
            );
            break e;
          }
          Ee && Ee(l, w, Y), l === "focusout" && Y && w.type === "number" && Y.memoizedProps.value != null && Mc(w, "number", w.value);
        }
        switch (Ee = Y ? Yo(Y) : window, l) {
          case "focusin":
            (pu(Ee) || Ee.contentEditable === "true") && (Qi = Ee, ko = Y, vn = null);
            break;
          case "focusout":
            vn = ko = Qi = null;
            break;
          case "mousedown":
            wn = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            wn = !1, Md(W, u, Z);
            break;
          case "selectionchange":
            if (Us) break;
          case "keydown":
          case "keyup":
            Md(W, u, Z);
        }
        var Ze;
        if (Ko)
          e: {
            switch (l) {
              case "compositionstart":
                var Pe = "onCompositionStart";
                break e;
              case "compositionend":
                Pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Pe = "onCompositionUpdate";
                break e;
            }
            Pe = void 0;
          }
        else
          xc ? Rd(l, u) && (Pe = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (Jm && u.locale !== "ko" && (xc || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && xc && (Ze = Ym()) : (li = Z, qm = "value" in li ? li.value : li.textContent, xc = !0)), Ee = Rr(Y, Pe), 0 < Ee.length && (Pe = new qg(
          Pe,
          l,
          null,
          u,
          Z
        ), W.push({ event: Pe, listeners: Ee }), Ze ? Pe.data = Ze : (Ze = Km(u), Ze !== null && (Pe.data = Ze)))), (Ze = aa ? Xg(l, u) : i1(l, u)) && (Pe = Rr(Y, "onBeforeInput"), 0 < Pe.length && (Ee = new qg(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          Z
        ), W.push({
          event: Ee,
          listeners: Pe
        }), Ee.data = Ze)), Tr(
          W,
          l,
          Y,
          u,
          Z
        );
      }
      q0(W, n);
    });
  }
  function Or(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function Rr(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var s = l, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = xl(l, u), s != null && c.unshift(
        Or(l, s, r)
      ), s = xl(l, n), s != null && c.push(
        Or(l, s, r)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function Y0(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Hh(l, n, u, c, s) {
    for (var r = n._reactName, m = []; u !== null && u !== c; ) {
      var v = u, _ = v.alternate, Y = v.stateNode;
      if (v = v.tag, _ !== null && _ === c) break;
      v !== 5 && v !== 26 && v !== 27 || Y === null || (_ = Y, s ? (Y = xl(u, r), Y != null && m.unshift(
        Or(u, Y, _)
      )) : s || (Y = xl(u, r), Y != null && m.push(
        Or(u, Y, _)
      ))), u = u.return;
    }
    m.length !== 0 && l.push({ event: n, listeners: m });
  }
  var w0 = /\r\n?/g, rp = /\u0000|\uFFFD/g;
  function dp(l) {
    return (typeof l == "string" ? l : "" + l).replace(w0, `
`).replace(rp, "");
  }
  function hp(l, n) {
    return n = dp(n), dp(l) === n;
  }
  function qt(l, n, u, c, s, r) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || hu(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && hu(l, "" + c);
        break;
      case "className":
        hd(l, "class", c);
        break;
      case "tabIndex":
        hd(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hd(l, u, c);
        break;
      case "style":
        Ug(l, c, r);
        break;
      case "data":
        if (n !== "object") {
          hd(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = yn("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && qt(l, n, "name", s.name, s, null), qt(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), qt(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), qt(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (qt(l, n, "encType", s.encType, s, null), qt(l, n, "method", s.method, s, null), qt(l, n, "target", s.target, s, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = yn("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = xn);
        break;
      case "onScroll":
        c != null && ft("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ft("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(E(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(E(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = yn("" + c), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        ft("beforetoggle", l), ft("toggle", l), Lo(l, "popover", c);
        break;
      case "xlinkActuate":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        ei(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        ei(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        ei(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        ei(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        Lo(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = t1.get(u) || u, Lo(l, u, c));
    }
  }
  function mp(l, n, u, c, s, r) {
    switch (u) {
      case "style":
        Ug(l, c, r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(E(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(E(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? hu(l, c) : (typeof c == "number" || typeof c == "bigint") && hu(l, "" + c);
        break;
      case "onScroll":
        c != null && ft("scroll", l);
        break;
      case "onScrollEnd":
        c != null && ft("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = xn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Bi.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[ra] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof c == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, s);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : Lo(l, u, c);
          }
    }
  }
  function Wl(l, n, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ft("error", l), ft("load", l);
        var c = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var m = u[r];
            if (m != null)
              switch (r) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(E(137, n));
                default:
                  qt(l, n, r, m, u, null);
              }
          }
        s && qt(l, n, "srcSet", u.srcSet, u, null), c && qt(l, n, "src", u.src, u, null);
        return;
      case "input":
        ft("invalid", l);
        var v = r = m = s = null, _ = null, Y = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var Z = u[c];
            if (Z != null)
              switch (c) {
                case "name":
                  s = Z;
                  break;
                case "type":
                  m = Z;
                  break;
                case "checked":
                  _ = Z;
                  break;
                case "defaultChecked":
                  Y = Z;
                  break;
                case "value":
                  r = Z;
                  break;
                case "defaultValue":
                  v = Z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Z != null)
                    throw Error(E(137, n));
                  break;
                default:
                  qt(l, n, c, Z, u, null);
              }
          }
        Ts(
          l,
          r,
          v,
          _,
          Y,
          m,
          s,
          !1
        );
        return;
      case "select":
        ft("invalid", l), c = m = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (v = u[s], v != null))
            switch (s) {
              case "value":
                r = v;
                break;
              case "defaultValue":
                m = v;
                break;
              case "multiple":
                c = v;
              default:
                qt(l, n, s, v, u, null);
            }
        n = r, u = m, l.multiple = !!c, n != null ? Xo(l, !!c, n, !1) : u != null && Xo(l, !!c, u, !0);
        return;
      case "textarea":
        ft("invalid", l), r = s = c = null;
        for (m in u)
          if (u.hasOwnProperty(m) && (v = u[m], v != null))
            switch (m) {
              case "value":
                c = v;
                break;
              case "defaultValue":
                s = v;
                break;
              case "children":
                r = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(E(91));
                break;
              default:
                qt(l, n, m, v, u, null);
            }
        xm(l, c, s, r);
        return;
      case "option":
        for (_ in u)
          u.hasOwnProperty(_) && (c = u[_], c != null) && (_ === "selected" ? l.selected = c && typeof c != "function" && typeof c != "symbol" : qt(l, n, _, c, u, null));
        return;
      case "dialog":
        ft("beforetoggle", l), ft("toggle", l), ft("cancel", l), ft("close", l);
        break;
      case "iframe":
      case "object":
        ft("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < Uf.length; c++)
          ft(Uf[c], l);
        break;
      case "image":
        ft("error", l), ft("load", l);
        break;
      case "details":
        ft("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        ft("error", l), ft("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Y in u)
          if (u.hasOwnProperty(Y) && (c = u[Y], c != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(E(137, n));
              default:
                qt(l, n, Y, c, u, null);
            }
        return;
      default:
        if (jm(n)) {
          for (Z in u)
            u.hasOwnProperty(Z) && (c = u[Z], c !== void 0 && mp(
              l,
              n,
              Z,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (v in u)
      u.hasOwnProperty(v) && (c = u[v], c != null && qt(l, n, v, c, u, null));
  }
  function yp(l, n, u, c) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, m = null, v = null, _ = null, Y = null, Z = null;
        for (Q in u) {
          var W = u[Q];
          if (u.hasOwnProperty(Q) && W != null)
            switch (Q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = W;
              default:
                c.hasOwnProperty(Q) || qt(l, n, Q, null, c, W);
            }
        }
        for (var w in c) {
          var Q = c[w];
          if (W = u[w], c.hasOwnProperty(w) && (Q != null || W != null))
            switch (w) {
              case "type":
                r = Q;
                break;
              case "name":
                s = Q;
                break;
              case "checked":
                Y = Q;
                break;
              case "defaultChecked":
                Z = Q;
                break;
              case "value":
                m = Q;
                break;
              case "defaultValue":
                v = Q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(E(137, n));
                break;
              default:
                Q !== W && qt(
                  l,
                  n,
                  w,
                  Q,
                  c,
                  W
                );
            }
        }
        Es(
          l,
          m,
          v,
          _,
          Y,
          Z,
          r,
          s
        );
        return;
      case "select":
        Q = m = v = w = null;
        for (r in u)
          if (_ = u[r], u.hasOwnProperty(r) && _ != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                Q = _;
              default:
                c.hasOwnProperty(r) || qt(
                  l,
                  n,
                  r,
                  null,
                  c,
                  _
                );
            }
        for (s in c)
          if (r = c[s], _ = u[s], c.hasOwnProperty(s) && (r != null || _ != null))
            switch (s) {
              case "value":
                w = r;
                break;
              case "defaultValue":
                v = r;
                break;
              case "multiple":
                m = r;
              default:
                r !== _ && qt(
                  l,
                  n,
                  s,
                  r,
                  c,
                  _
                );
            }
        n = v, u = m, c = Q, w != null ? Xo(l, !!u, w, !1) : !!c != !!u && (n != null ? Xo(l, !!u, n, !0) : Xo(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        Q = w = null;
        for (v in u)
          if (s = u[v], u.hasOwnProperty(v) && s != null && !c.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                qt(l, n, v, null, c, s);
            }
        for (m in c)
          if (s = c[m], r = u[m], c.hasOwnProperty(m) && (s != null || r != null))
            switch (m) {
              case "value":
                w = s;
                break;
              case "defaultValue":
                Q = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(E(91));
                break;
              default:
                s !== r && qt(l, n, m, s, c, r);
            }
        Nm(l, w, Q);
        return;
      case "option":
        for (var pe in u)
          w = u[pe], u.hasOwnProperty(pe) && w != null && !c.hasOwnProperty(pe) && (pe === "selected" ? l.selected = !1 : qt(
            l,
            n,
            pe,
            null,
            c,
            w
          ));
        for (_ in c)
          w = c[_], Q = u[_], c.hasOwnProperty(_) && w !== Q && (w != null || Q != null) && (_ === "selected" ? l.selected = w && typeof w != "function" && typeof w != "symbol" : qt(
            l,
            n,
            _,
            w,
            c,
            Q
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var He in u)
          w = u[He], u.hasOwnProperty(He) && w != null && !c.hasOwnProperty(He) && qt(l, n, He, null, c, w);
        for (Y in c)
          if (w = c[Y], Q = u[Y], c.hasOwnProperty(Y) && w !== Q && (w != null || Q != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(E(137, n));
                break;
              default:
                qt(
                  l,
                  n,
                  Y,
                  w,
                  c,
                  Q
                );
            }
        return;
      default:
        if (jm(n)) {
          for (var Yt in u)
            w = u[Yt], u.hasOwnProperty(Yt) && w !== void 0 && !c.hasOwnProperty(Yt) && mp(
              l,
              n,
              Yt,
              void 0,
              c,
              w
            );
          for (Z in c)
            w = c[Z], Q = u[Z], !c.hasOwnProperty(Z) || w === Q || w === void 0 && Q === void 0 || mp(
              l,
              n,
              Z,
              w,
              c,
              Q
            );
          return;
        }
    }
    for (var x in u)
      w = u[x], u.hasOwnProperty(x) && w != null && !c.hasOwnProperty(x) && qt(l, n, x, null, c, w);
    for (W in c)
      w = c[W], Q = u[W], !c.hasOwnProperty(W) || w === Q || w == null && Q == null || qt(l, n, W, w, c, Q);
  }
  function Nh(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function pp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, n = 0, u = performance.getEntriesByType("resource"), c = 0; c < u.length; c++) {
        var s = u[c], r = s.transferSize, m = s.initiatorType, v = s.duration;
        if (r && v && Nh(m)) {
          for (m = 0, v = s.responseEnd, c += 1; c < u.length; c++) {
            var _ = u[c], Y = _.startTime;
            if (Y > v) break;
            var Z = _.transferSize, W = _.initiatorType;
            Z && Nh(W) && (_ = _.responseEnd, m += Z * (_ < v ? 1 : (v - Y) / (_ - Y)));
          }
          if (--c, n += 8 * (r + m) / (s.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return n / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var xh = null, jh = null;
  function rc(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function G0(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function gp(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function Nf(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Bh = null;
  function s1() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Bh ? !1 : (Bh = l, !0) : (Bh = null, !1);
  }
  var _r = typeof setTimeout == "function" ? setTimeout : void 0, L0 = typeof clearTimeout == "function" ? clearTimeout : void 0, ro = typeof Promise == "function" ? Promise : void 0, X0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof ro < "u" ? function(l) {
    return ro.resolve(null).then(l).catch(vp);
  } : _r;
  function vp(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Pn(l) {
    return l === "head";
  }
  function Sp(l, n) {
    var u = n, c = 0;
    do {
      var s = u.nextSibling;
      if (l.removeChild(u), s && s.nodeType === 8)
        if (u = s.data, u === "/$" || u === "/&") {
          if (c === 0) {
            l.removeChild(s), Zf(n);
            return;
          }
          c--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          c++;
        else if (u === "html")
          ho(l.ownerDocument.documentElement);
        else if (u === "head") {
          u = l.ownerDocument.head, ho(u);
          for (var r = u.firstChild; r; ) {
            var m = r.nextSibling, v = r.nodeName;
            r[ru] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && r.rel.toLowerCase() === "stylesheet" || u.removeChild(r), r = m;
          }
        } else
          u === "body" && ho(l.ownerDocument.body);
      u = s;
    } while (u);
    Zf(n);
  }
  function vl(l, n) {
    var u = l;
    l = 0;
    do {
      var c = u.nextSibling;
      if (u.nodeType === 1 ? n ? (u._stashedDisplay = u.style.display, u.style.display = "none") : (u.style.display = u._stashedDisplay || "", u.getAttribute("style") === "" && u.removeAttribute("style")) : u.nodeType === 3 && (n ? (u._stashedText = u.nodeValue, u.nodeValue = "") : u.nodeValue = u._stashedText || ""), c && c.nodeType === 8)
        if (u = c.data, u === "/$") {
          if (l === 0) break;
          l--;
        } else
          u !== "$" && u !== "$?" && u !== "$~" && u !== "$!" || l++;
      u = c;
    } while (u);
  }
  function Dr(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Dr(u), sd(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function r1(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[ru])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = Ra(l.nextSibling), l === null) break;
    }
    return null;
  }
  function lt(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Ra(l.nextSibling), l === null)) return null;
    return l;
  }
  function Q0(l, n) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !n || (l = Ra(l.nextSibling), l === null)) return null;
    return l;
  }
  function _n(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function dc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function xf(l, n) {
    var u = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = n;
    else if (l.data !== "$?" || u.readyState !== "loading")
      n();
    else {
      var c = function() {
        n(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function Ra(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return l;
  }
  var zr = null;
  function qh(l) {
    l = l.nextSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (n === 0)
            return Ra(l.nextSibling);
          n--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || n++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function eu(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?" || u === "$~" || u === "&") {
          if (n === 0) return l;
          n--;
        } else u !== "/$" && u !== "/&" || n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function jf(l, n, u) {
    switch (n = rc(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(E(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(E(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(E(454));
        return l;
      default:
        throw Error(E(451));
    }
  }
  function ho(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    sd(l);
  }
  var xa = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Set();
  function ia(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var tu = J.d;
  J.d = {
    f: d1,
    r: V0,
    D: X,
    C: _t,
    L: h1,
    m: bp,
    X: Ei,
    S: Ep,
    M: hc
  };
  function d1() {
    var l = tu.f(), n = _f();
    return l || n;
  }
  function V0(l) {
    var n = _c(l);
    n !== null && n.tag === 5 && n.type === "form" ? jt(n) : tu.r(l);
  }
  var Bf = typeof document > "u" ? null : document;
  function Al(l, n, u) {
    var c = Bf;
    if (c && typeof n == "string" && n) {
      var s = Va(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), Mr.has(s) || (Mr.add(s), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(s) === null && (n = c.createElement("link"), Wl(n, "link", l), zt(n), c.head.appendChild(n)));
    }
  }
  function X(l) {
    tu.D(l), Al("dns-prefetch", l, null);
  }
  function _t(l, n) {
    tu.C(l, n), Al("preconnect", l, n);
  }
  function h1(l, n, u) {
    tu.L(l, n, u);
    var c = Bf;
    if (c && l && n) {
      var s = 'link[rel="preload"][as="' + Va(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + Va(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + Va(
        u.imageSizes
      ) + '"]')) : s += '[href="' + Va(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = nn(l);
          break;
        case "script":
          r = mo(l);
      }
      xa.has(r) || (l = j(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), xa.set(r, l), c.querySelector(s) !== null || n === "style" && c.querySelector(mc(r)) || n === "script" && c.querySelector(wf(r)) || (n = c.createElement("link"), Wl(n, "link", l), zt(n), c.head.appendChild(n)));
    }
  }
  function bp(l, n) {
    tu.m(l, n);
    var u = Bf;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + Va(c) + '"][href="' + Va(l) + '"]', r = s;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = mo(l);
      }
      if (!xa.has(r) && (l = j({ rel: "modulepreload", href: l }, n), xa.set(r, l), u.querySelector(s) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(wf(r)))
              return;
        }
        c = u.createElement("link"), Wl(c, "link", l), zt(c), u.head.appendChild(c);
      }
    }
  }
  function Ep(l, n, u) {
    tu.S(l, n, u);
    var c = Bf;
    if (c && l) {
      var s = Dc(c).hoistableStyles, r = nn(l);
      n = n || "default";
      var m = s.get(r);
      if (!m) {
        var v = { loading: 0, preload: null };
        if (m = c.querySelector(
          mc(r)
        ))
          v.loading = 5;
        else {
          l = j(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = xa.get(r)) && Yh(l, u);
          var _ = m = c.createElement("link");
          zt(_), Wl(_, "link", l), _._p = new Promise(function(Y, Z) {
            _.onload = Y, _.onerror = Z;
          }), _.addEventListener("load", function() {
            v.loading |= 1;
          }), _.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, Cr(m, n, c);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: v
        }, s.set(r, m);
      }
    }
  }
  function Ei(l, n) {
    tu.X(l, n);
    var u = Bf;
    if (u && l) {
      var c = Dc(u).hoistableScripts, s = mo(l), r = c.get(s);
      r || (r = u.querySelector(wf(s)), r || (l = j({ src: l, async: !0 }, n), (n = xa.get(s)) && wh(l, n), r = u.createElement("script"), zt(r), Wl(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function hc(l, n) {
    tu.M(l, n);
    var u = Bf;
    if (u && l) {
      var c = Dc(u).hoistableScripts, s = mo(l), r = c.get(s);
      r || (r = u.querySelector(wf(s)), r || (l = j({ src: l, async: !0, type: "module" }, n), (n = xa.get(s)) && wh(l, n), r = u.createElement("script"), zt(r), Wl(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function qf(l, n, u, c) {
    var s = (s = Qe.current) ? ia(s) : null;
    if (!s) throw Error(E(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = nn(u.href), u = Dc(
          s
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = nn(u.href);
          var r = Dc(
            s
          ).hoistableStyles, m = r.get(l);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, m), (r = s.querySelector(
            mc(l)
          )) && !r._p && (m.instance = r, m.state.loading = 5), xa.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, xa.set(l, u), r || Z0(
            s,
            l,
            u,
            m.state
          ))), n && c === null)
            throw Error(E(528, ""));
          return m;
        }
        if (n && c !== null)
          throw Error(E(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = mo(u), u = Dc(
          s
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(E(444, l));
    }
  }
  function nn(l) {
    return 'href="' + Va(l) + '"';
  }
  function mc(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Yf(l) {
    return j({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Z0(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), Wl(n, "link", u), zt(n), l.head.appendChild(n));
  }
  function mo(l) {
    return '[src="' + Va(l) + '"]';
  }
  function wf(l) {
    return "script[async]" + l;
  }
  function Tp(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + Va(u.href) + '"]'
          );
          if (c)
            return n.instance = c, zt(c), c;
          var s = j({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), zt(c), Wl(c, "style", s), Cr(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          s = nn(u.href);
          var r = l.querySelector(
            mc(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, zt(r), r;
          c = Yf(u), (s = xa.get(s)) && Yh(c, s), r = (l.ownerDocument || l).createElement("link"), zt(r);
          var m = r;
          return m._p = new Promise(function(v, _) {
            m.onload = v, m.onerror = _;
          }), Wl(r, "link", c), n.state.loading |= 4, Cr(r, u.precedence, l), n.instance = r;
        case "script":
          return r = mo(u.src), (s = l.querySelector(
            wf(r)
          )) ? (n.instance = s, zt(s), s) : (c = u, (s = xa.get(r)) && (c = j({}, u), wh(c, s)), l = l.ownerDocument || l, s = l.createElement("script"), zt(s), Wl(s, "link", c), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(E(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (c = n.instance, n.state.loading |= 4, Cr(c, u.precedence, l));
    return n.instance;
  }
  function Cr(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = c.length ? c[c.length - 1] : null, r = s, m = 0; m < c.length; m++) {
      var v = c[m];
      if (v.dataset.precedence === n) r = v;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function Yh(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function wh(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var Gf = null;
  function Ap(l, n, u) {
    if (Gf === null) {
      var c = /* @__PURE__ */ new Map(), s = Gf = /* @__PURE__ */ new Map();
      s.set(u, c);
    } else
      s = Gf, c = s.get(u), c || (c = /* @__PURE__ */ new Map(), s.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[ru] || r[xt] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = r.getAttribute(n) || "";
        m = l + m;
        var v = c.get(m);
        v ? v.push(r) : c.set(m, [r]);
      }
    }
    return c;
  }
  function Gh(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function Op(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        return n.rel === "stylesheet" ? (l = n.disabled, typeof n.precedence == "string" && l == null) : !0;
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function ja(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Yu(l, n, u, c) {
    if (u.type === "stylesheet" && (typeof c.media != "string" || matchMedia(c.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var s = nn(c.href), r = n.querySelector(
          mc(s)
        );
        if (r) {
          n = r._p, n !== null && typeof n == "object" && typeof n.then == "function" && (l.count++, l = Lh.bind(l), n.then(l, l)), u.state.loading |= 4, u.instance = r, zt(r);
          return;
        }
        r = n.ownerDocument || n, c = Yf(c), (s = xa.get(s)) && Yh(c, s), r = r.createElement("link"), zt(r);
        var m = r;
        m._p = new Promise(function(v, _) {
          m.onload = v, m.onerror = _;
        }), Wl(r, "link", c), u.instance = r;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, n), (n = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = Lh.bind(l), n.addEventListener("load", u), n.addEventListener("error", u));
    }
  }
  var un = 0;
  function Rp(l, n) {
    return l.stylesheets && l.count === 0 && Qh(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var c = setTimeout(function() {
        if (l.stylesheets && Qh(l, l.stylesheets), l.unsuspend) {
          var r = l.unsuspend;
          l.unsuspend = null, r();
        }
      }, 6e4 + n);
      0 < l.imgBytes && un === 0 && (un = 62500 * pp());
      var s = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Qh(l, l.stylesheets), l.unsuspend)) {
            var r = l.unsuspend;
            l.unsuspend = null, r();
          }
        },
        (l.imgBytes > un ? 50 : 800) + n
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(c), clearTimeout(s);
      };
    } : null;
  }
  function Lh() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Qh(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Xh = null;
  function Qh(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Xh = /* @__PURE__ */ new Map(), n.forEach(Ll, l), Xh = null, Lh.call(l));
  }
  function Ll(l, n) {
    if (!(n.state.loading & 4)) {
      var u = Xh.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Xh.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var m = s[r];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (u.set(m.dataset.precedence, m), c = m);
        }
        c && u.set(null, c);
      }
      s = n.instance, m = s.getAttribute("data-precedence"), r = u.get(m) || c, r === c && u.set(null, s), u.set(m, s), this.count++, c = Lh.bind(this), s.addEventListener("load", c), s.addEventListener("error", c), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var Ur = {
    $$typeof: pt,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0
  };
  function _p(l, n, u, c, s, r, m, v, _) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = c, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Vh(l, n, u, c, s, r, m, v, _, Y, Z, W) {
    return l = new _p(
      l,
      n,
      u,
      m,
      _,
      Y,
      Z,
      W,
      v
    ), n = 1, r === !0 && (n |= 24), r = fl(3, null, null, n), l.current = r, r.stateNode = l, n = ws(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, Js(r), l;
  }
  function yo(l) {
    return l ? (l = ma, l) : ma;
  }
  function J0(l, n, u, c, s, r) {
    s = yo(s), c.context === null ? c.context = s : c.pendingContext = s, c = ri(n), c.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (c.callback = r), u = Fa(l, c, n), u !== null && (Oa(u, l, n), Ii(u, l, n));
  }
  function Zh(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function Dp(l, n) {
    Zh(l, n), (l = l.alternate) && Zh(l, n);
  }
  function K0(l) {
    if (l.tag === 13 || l.tag === 31) {
      var n = ni(l, 67108864);
      n !== null && Oa(n, l, 67108864), Dp(l, 67108864);
    }
  }
  function po(l) {
    if (l.tag === 13 || l.tag === 31) {
      var n = Na();
      n = cd(n);
      var u = ni(l, n);
      u !== null && Oa(u, l, n), Dp(l, n);
    }
  }
  var Ml = !0;
  function wu(l, n, u, c) {
    var s = U.T;
    U.T = null;
    var r = J.p;
    try {
      J.p = 2, Fl(l, n, u, c);
    } finally {
      J.p = r, U.T = s;
    }
  }
  function Gu(l, n, u, c) {
    var s = U.T;
    U.T = null;
    var r = J.p;
    try {
      J.p = 8, Fl(l, n, u, c);
    } finally {
      J.p = r, U.T = s;
    }
  }
  function Fl(l, n, u, c) {
    if (Ml) {
      var s = zp(c);
      if (s === null)
        sp(
          l,
          n,
          c,
          Jh,
          u
        ), Ti(l, c);
      else if (m1(
        s,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (Ti(l, c), n & 4 && -1 < _a.indexOf(l)) {
        for (; s !== null; ) {
          var r = _c(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var m = Ne(r.pendingLanes);
                  if (m !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var _ = 1 << 31 - Nl(m);
                      v.entanglements[1] |= _, m &= ~_;
                    }
                    qu(r), (Tt & 6) === 0 && (Rt = bl() + 500, bi(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = ni(r, 2), v !== null && Oa(v, r, 2), _f(), Dp(r, 2);
            }
          if (r = zp(c), r === null && sp(
            l,
            n,
            c,
            Jh,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && c.stopPropagation();
      } else
        sp(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function zp(l) {
    return l = gd(l), Lf(l);
  }
  var Jh = null;
  function Lf(l) {
    if (Jh = null, l = Rc(l), l !== null) {
      var n = ce(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = ye(n), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = $(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Jh = l, null;
  }
  function Hr(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ud()) {
          case xo:
            return 2;
          case jo:
            return 8;
          case Hn:
          case id:
            return 32;
          case Bo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Xf = !1, Cl = null, Il = null, ca = null, yc = /* @__PURE__ */ new Map(), Dn = /* @__PURE__ */ new Map(), tl = [], _a = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ti(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        Cl = null;
        break;
      case "dragenter":
      case "dragleave":
        Il = null;
        break;
      case "mouseover":
      case "mouseout":
        ca = null;
        break;
      case "pointerover":
      case "pointerout":
        yc.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Dn.delete(n.pointerId);
    }
  }
  function go(l, n, u, c, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = _c(n), n !== null && K0(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function m1(l, n, u, c, s) {
    switch (n) {
      case "focusin":
        return Cl = go(
          Cl,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "dragenter":
        return Il = go(
          Il,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "mouseover":
        return ca = go(
          ca,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return yc.set(
          r,
          go(
            yc.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, Dn.set(
          r,
          go(
            Dn.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
    }
    return !1;
  }
  function $0(l) {
    var n = Rc(l.target);
    if (n !== null) {
      var u = ce(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = ye(u), n !== null) {
            l.blockedOn = n, zm(l.priority, function() {
              po(u);
            });
            return;
          }
        } else if (n === 31) {
          if (n = $(u), n !== null) {
            l.blockedOn = n, zm(l.priority, function() {
              po(u);
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Nr(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = zp(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        pd = c, u.target.dispatchEvent(c), pd = null;
      } else
        return n = _c(u), n !== null && K0(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function Qf(l, n, u) {
    Nr(l) && u.delete(n);
  }
  function k0() {
    Xf = !1, Cl !== null && Nr(Cl) && (Cl = null), Il !== null && Nr(Il) && (Il = null), ca !== null && Nr(ca) && (ca = null), yc.forEach(Qf), Dn.forEach(Qf);
  }
  function Lu(l, n) {
    l.blockedOn === n && (l.blockedOn = null, Xf || (Xf = !0, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      k0
    )));
  }
  var Vf = null;
  function W0(l) {
    Vf !== l && (Vf = l, b.unstable_scheduleCallback(
      b.unstable_NormalPriority,
      function() {
        Vf === l && (Vf = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], s = l[n + 2];
          if (typeof c != "function") {
            if (Lf(c || u) === null)
              continue;
            break;
          }
          var r = _c(u);
          r !== null && (l.splice(n, 3), n -= 3, hf(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: c
            },
            c,
            s
          ));
        }
      }
    ));
  }
  function Zf(l) {
    function n(_) {
      return Lu(_, l);
    }
    Cl !== null && Lu(Cl, l), Il !== null && Lu(Il, l), ca !== null && Lu(ca, l), yc.forEach(n), Dn.forEach(n);
    for (var u = 0; u < tl.length; u++) {
      var c = tl[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < tl.length && (u = tl[0], u.blockedOn === null); )
      $0(u), u.blockedOn === null && tl.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var s = u[c], r = u[c + 1], m = s[ra] || null;
        if (typeof r == "function")
          m || W0(u);
        else if (m) {
          var v = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, m = r[ra] || null)
              v = m.formAction;
            else if (Lf(s) !== null) continue;
          } else v = m.action;
          typeof v == "function" ? u[c + 1] = v : (u.splice(c, 3), c -= 3), W0(u);
        }
      }
  }
  function Mp() {
    function l(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(m) {
            return s = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      s !== null && (s(), s = null), c || setTimeout(u, 20);
    }
    function u() {
      if (!c && !navigation.transition) {
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var c = !1, s = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(u, 100), function() {
        c = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), s !== null && (s(), s = null);
      };
    }
  }
  function Kh(l) {
    this._internalRoot = l;
  }
  $h.prototype.render = Kh.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(E(409));
    var u = n.current, c = Na();
    J0(u, c, l, n, null, null);
  }, $h.prototype.unmount = Kh.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      J0(l.current, 2, null, l, null, null), _f(), n[ji] = null;
    }
  };
  function $h(l) {
    this._internalRoot = l;
  }
  $h.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = od();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < tl.length && n !== 0 && n < tl[u].priority; u++) ;
      tl.splice(u, 0, l), u === 0 && $0(l);
    }
  };
  var Cp = z.version;
  if (Cp !== "19.2.8")
    throw Error(
      E(
        527,
        Cp,
        "19.2.8"
      )
    );
  J.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(E(188)) : (l = Object.keys(l).join(","), Error(E(268, l)));
    return l = V(n), l = l !== null ? re(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var F0 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xr.isDisabled && xr.supportsFiber)
      try {
        hn = xr.inject(
          F0
        ), Rl = xr;
      } catch {
      }
  }
  return Og.createRoot = function(l, n) {
    if (!ne(l)) throw Error(E(299));
    var u = !1, c = "", s = uh, r = Uy, m = ih;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError)), n = Vh(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      null,
      s,
      r,
      m,
      Mp
    ), l[ji] = n.current, Hf(l), new Kh(n);
  }, Og.hydrateRoot = function(l, n, u) {
    if (!ne(l)) throw Error(E(299));
    var c = !1, s = "", r = uh, m = Uy, v = ih, _ = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (m = u.onCaughtError), u.onRecoverableError !== void 0 && (v = u.onRecoverableError), u.formState !== void 0 && (_ = u.formState)), n = Vh(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      s,
      _,
      r,
      m,
      v,
      Mp
    ), n.context = yo(null), u = n.current, c = Na(), c = cd(c), s = ri(c), s.callback = null, Fa(u, s, c), u = c, n.current.lanes = u, xi(n, u), qu(n), l[ji] = n.current, Hf(l), new $h(n);
  }, Og.version = "19.2.8", Og;
}
var Rg = {};
var t2;
function WT() {
  return t2 || (t2 = 1, process.env.NODE_ENV !== "production" && (function() {
    function b(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function z(e, t, a, i) {
      if (a >= t.length) return i;
      var o = t[a], f = Al(e) ? e.slice() : lt({}, e);
      return f[o] = z(e[o], t, a + 1, i), f;
    }
    function F(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return E(e, t, a, 0);
      }
    }
    function E(e, t, a, i) {
      var o = t[i], f = Al(e) ? e.slice() : lt({}, e);
      return i + 1 === t.length ? (f[a[i]] = f[o], Al(f) ? f.splice(o, 1) : delete f[o]) : f[o] = E(
        e[o],
        t,
        a,
        i + 1
      ), f;
    }
    function ne(e, t, a) {
      var i = t[a], o = Al(e) ? e.slice() : lt({}, e);
      return a + 1 === t.length ? (Al(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = ne(e[i], t, a + 1), o);
    }
    function ce() {
      return !1;
    }
    function ye() {
      return null;
    }
    function $() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function P() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function V() {
    }
    function re() {
    }
    function j(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function A(e, t, a, i) {
      return new i1(e, t, a, i);
    }
    function te(e, t) {
      e.context === kf && (Hh(e.current, 2, t, e, null, null), ln());
    }
    function de(e, t) {
      if (Vu !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, rr(), Xg(
          e.current,
          t,
          a
        ), ln();
      }
    }
    function Je(e) {
      Vu = e;
    }
    function tt(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ke(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function Ft(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function pt(e) {
      if (e.tag === 31) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function $e(e) {
      if (Ke(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function st(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Ke(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return $e(o), e;
            if (f === i) return $e(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, a = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function Nt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = Nt(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function Ae(e) {
      return e === null || typeof e != "object" ? null : (e = V0 && e[V0] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function Ye(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Bf ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case xf:
          return "Fragment";
        case zr:
          return "Profiler";
        case Ra:
          return "StrictMode";
        case ho:
          return "Suspense";
        case xa:
          return "SuspenseList";
        case tu:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case dc:
            return "Portal";
          case eu:
            return e.displayName || "Context";
          case qh:
            return (e._context.displayName || "Context") + ".Consumer";
          case jf:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case Mr:
            return t = e.displayName || null, t !== null ? t : Ye(e.type) || "Memo";
          case ia:
            t = e._payload, e = e._init;
            try {
              return Ye(e(t));
            } catch {
            }
        }
      return null;
    }
    function Fe(e) {
      return typeof e.tag == "number" ? ge(e) : typeof e.name == "string" ? e.name : null;
    }
    function ge(e) {
      var t = e.type;
      switch (e.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return t.displayName || "Context";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Ye(t);
        case 8:
          return t === Ra ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return ge(e.return);
      }
      return null;
    }
    function Gt(e) {
      return { current: e };
    }
    function Te(e, t) {
      0 > Ei ? console.error("Unexpected pop.") : (t !== Ep[Ei] && console.error("Unexpected Fiber popped."), e.current = bp[Ei], bp[Ei] = null, Ep[Ei] = null, Ei--);
    }
    function Xe(e, t, a) {
      Ei++, bp[Ei] = e.current, Ep[Ei] = a, e.current = t;
    }
    function Kt(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function Lt(e, t) {
      Xe(nn, t, e), Xe(qf, e, e), Xe(hc, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? g0(t) : Uo;
          break;
        default:
          if (a = t.tagName, t = t.namespaceURI)
            t = g0(t), t = vi(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = Om;
                break;
              case "math":
                t = Xv;
                break;
              default:
                t = Uo;
            }
      }
      a = a.toLowerCase(), a = Hm(null, a), a = {
        context: t,
        ancestorInfo: a
      }, Te(hc, e), Xe(hc, a, e);
    }
    function U(e) {
      Te(hc, e), Te(qf, e), Te(nn, e);
    }
    function J() {
      return Kt(hc.current);
    }
    function ie(e) {
      e.memoizedState !== null && Xe(mc, e, e);
      var t = Kt(hc.current), a = e.type, i = vi(t.context, a);
      a = Hm(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (Xe(qf, e, e), Xe(hc, i, e));
    }
    function Oe(e) {
      qf.current === e && (Te(hc, e), Te(qf, e)), mc.current === e && (Te(mc, e), Sg._currentValue = ad);
    }
    function Ue() {
    }
    function S() {
      if (Yf === 0) {
        Z0 = console.log, mo = console.info, wf = console.warn, Tp = console.error, Cr = console.group, Yh = console.groupCollapsed, wh = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Ue,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      Yf++;
    }
    function q() {
      if (Yf--, Yf === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: lt({}, e, { value: Z0 }),
          info: lt({}, e, { value: mo }),
          warn: lt({}, e, { value: wf }),
          error: lt({}, e, { value: Tp }),
          group: lt({}, e, { value: Cr }),
          groupCollapsed: lt({}, e, { value: Yh }),
          groupEnd: lt({}, e, { value: wh })
        });
      }
      0 > Yf && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function ae(e) {
      var t = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith(`Error: react-stack-top-frame
`) && (e = e.slice(29)), t = e.indexOf(`
`), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf(
        `
`,
        t
      )), t !== -1)
        e = e.slice(0, t);
      else return "";
      return e;
    }
    function le(e) {
      if (Gf === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          Gf = t && t[1] || "", Ap = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Gf + e + Ap;
    }
    function _e(e, t) {
      if (!e || Gh) return "";
      var a = Op.get(e);
      if (a !== void 0) return a;
      Gh = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = X.H, X.H = null, S();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var O = function() {
                  throw Error();
                };
                if (Object.defineProperty(O.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(O, []);
                  } catch (fe) {
                    var G = fe;
                  }
                  Reflect.construct(e, [], O);
                } else {
                  try {
                    O.call();
                  } catch (fe) {
                    G = fe;
                  }
                  e.call(O.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (fe) {
                  G = fe;
                }
                (O = e()) && typeof O.catch == "function" && O.catch(function() {
                });
              }
            } catch (fe) {
              if (fe && G && typeof fe.stack == "string")
                return [fe.stack, G.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], y = d[1];
        if (h && y) {
          var p = h.split(`
`), M = y.split(`
`);
          for (d = f = 0; f < p.length && !p[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < M.length && !M[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === p.length || d === M.length)
            for (f = p.length - 1, d = M.length - 1; 1 <= f && 0 <= d && p[f] !== M[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (p[f] !== M[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || p[f] !== M[d]) {
                    var H = `
` + p[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), typeof e == "function" && Op.set(e, H), H;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        Gh = !1, X.H = i, q(), Error.prepareStackTrace = a;
      }
      return p = (p = e ? e.displayName || e.name : "") ? le(p) : "", typeof e == "function" && Op.set(e, p), p;
    }
    function Qe(e, t) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return le(e.type);
        case 16:
          return le("Lazy");
        case 13:
          return e.child !== t && t !== null ? le("Suspense Fallback") : le("Suspense");
        case 19:
          return le("SuspenseList");
        case 0:
        case 15:
          return _e(e.type, !1);
        case 11:
          return _e(e.type.render, !1);
        case 1:
          return _e(e.type, !0);
        case 31:
          return le("Activity");
        default:
          return "";
      }
    }
    function Me(e) {
      try {
        var t = "", a = null;
        do {
          t += Qe(e, a);
          var i = e._debugInfo;
          if (i)
            for (var o = i.length - 1; 0 <= o; o--) {
              var f = i[o];
              if (typeof f.name == "string") {
                var d = t;
                e: {
                  var h = f.name, y = f.env, p = f.debugLocation;
                  if (p != null) {
                    var M = ae(p), H = M.lastIndexOf(`
`), O = H === -1 ? M : M.slice(H + 1);
                    if (O.indexOf(h) !== -1) {
                      var G = `
` + O;
                      break e;
                    }
                  }
                  G = le(
                    h + (y ? " [" + y + "]" : "")
                  );
                }
                t = d + G;
              }
            }
          a = e, e = e.return;
        } while (e);
        return t;
      } catch (fe) {
        return `
Error generating stack: ` + fe.message + `
` + fe.stack;
      }
    }
    function $t(e) {
      return (e = e ? e.displayName || e.name : "") ? le(e) : "";
    }
    function bt() {
      if (ja === null) return null;
      var e = ja._debugOwner;
      return e != null ? Fe(e) : null;
    }
    function wa() {
      if (ja === null) return "";
      var e = ja;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += le(e.type);
            break;
          case 13:
            t += le("Suspense");
            break;
          case 19:
            t += le("SuspenseList");
            break;
          case 31:
            t += le("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += $t(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += $t(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var a = e;
            e = a._debugOwner;
            var i = a._debugStack;
            if (e && i) {
              var o = ae(i);
              o !== "" && (t += `
` + o);
            }
          } else if (e.debugStack != null) {
            var f = e.debugStack;
            (e = e.owner) && f && (t += `
` + ae(f));
          } else break;
        var d = t;
      } catch (h) {
        d = `
Error generating stack: ` + h.message + `
` + h.stack;
      }
      return d;
    }
    function he(e, t, a, i, o, f, d) {
      var h = ja;
      Ci(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, a, i, o, f, d)
        ) : t(a, i, o, f, d);
      } finally {
        Ci(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function Ci(e) {
      X.getCurrentStack = e === null ? null : wa, Yu = !1, ja = e;
    }
    function Ui(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function Ga(e) {
      try {
        return ou(e), !1;
      } catch {
        return !0;
      }
    }
    function ou(e) {
      return "" + e;
    }
    function Et(e, t) {
      if (Ga(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          Ui(e)
        ), ou(e);
    }
    function ta(e, t) {
      if (Ga(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          Ui(e)
        ), ou(e);
    }
    function Tc(e) {
      if (Ga(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          Ui(e)
        ), ou(e);
    }
    function gs(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        po = t.inject(e), Ml = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %o.", a);
      }
      return !!t.checkDCE;
    }
    function ve(e) {
      if (typeof Dp == "function" && K0(e), Ml && typeof Ml.setStrictMode == "function")
        try {
          Ml.setStrictMode(po, e);
        } catch (t) {
          wu || (wu = !0, console.error(
            "React instrumentation encountered an error: %o",
            t
          ));
        }
    }
    function Hi(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (zp(e) / Jh | 0) | 0;
    }
    function fu(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function Ac(e, t, a) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = fu(i) : (d &= h, d !== 0 ? o = fu(d) : a || (a = h & ~e, a !== 0 && (o = fu(a))))) : (h = i & ~f, h !== 0 ? o = fu(h) : d !== 0 ? o = fu(d) : a || (a = i & ~e, a !== 0 && (o = fu(a)))), o === 0 ? 0 : t !== 0 && t !== o && (t & f) === 0 && (f = o & -o, a = t & -t, f >= a || f === 32 && (a & 4194048) !== 0) ? t : o;
    }
    function bl(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function ud(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function xo() {
      var e = Xf;
      return Xf <<= 1, (Xf & 62914560) === 0 && (Xf = 4194304), e;
    }
    function jo(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function Hn(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function id(e, t, a, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, y = e.expirationTimes, p = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var M = 31 - Fl(a), H = 1 << M;
        h[M] = 0, y[M] = -1;
        var O = p[M];
        if (O !== null)
          for (p[M] = null, M = 0; M < O.length; M++) {
            var G = O[M];
            G !== null && (G.lane &= -536870913);
          }
        a &= ~H;
      }
      i !== 0 && Bo(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function Bo(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - Fl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 261930;
    }
    function vs(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - Fl(a), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), a &= ~o;
      }
    }
    function Oc(e, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : hn(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
    }
    function hn(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Rl(e, t, a) {
      if (Gu)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - Fl(a), o = 1 << i;
          e[i].add(t), a &= ~o;
        }
    }
    function La(e, t) {
      if (Gu)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - Fl(t);
          e = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function Nl(e) {
      return e &= -e, Cl < e ? Il < e ? (e & 134217727) !== 0 ? ca : yc : Il : Cl;
    }
    function Ni() {
      var e = _t.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? ca : xh(e.type));
    }
    function g(e, t) {
      var a = _t.p;
      try {
        return _t.p = e, t();
      } finally {
        _t.p = a;
      }
    }
    function N(e) {
      delete e[tl], delete e[_a], delete e[go], delete e[m1], delete e[$0];
    }
    function ue(e) {
      var t = e[tl];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ti] || a[tl]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = oo(e); e !== null; ) {
              if (a = e[tl])
                return a;
              e = oo(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function oe(e) {
      if (e = e[tl] || e[Ti]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function Se(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function Ne(e) {
      var t = e[Nr];
      return t || (t = e[Nr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function be(e) {
      e[Qf] = !0;
    }
    function it(e, t) {
      Ve(e, t), Ve(e + "Capture", t);
    }
    function Ve(e, t) {
      Lu[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Lu[e] = t;
      var a = e.toLowerCase();
      for (Vf[a] = e, e === "onDoubleClick" && (Vf.ondblclick = e), e = 0; e < t.length; e++)
        k0.add(t[e]);
    }
    function la(e, t) {
      W0[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function mn(e) {
      return un.call(Kh, e) ? !0 : un.call(Mp, e) ? !1 : Zf.test(e) ? Kh[e] = !0 : (Mp[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function xi(e, t, a) {
      if (mn(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (Et(a, t), e === "" + a ? a : e);
      }
    }
    function qo(e, t, a) {
      if (mn(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          Et(a, t), e.setAttribute(t, "" + a);
        }
    }
    function Ss(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        Et(a, t), e.setAttribute(t, "" + a);
      }
    }
    function su(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        Et(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function Xa(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Tc(e), e;
        default:
          return "";
      }
    }
    function cd(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Dm(e, t, a) {
      var i = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
        var o = i.get, f = i.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            Tc(d), a = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: i.enumerable
        }), {
          getValue: function() {
            return a;
          },
          setValue: function(d) {
            Tc(d), a = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function od(e) {
      if (!e._valueTracker) {
        var t = cd(e) ? "checked" : "value";
        e._valueTracker = Dm(
          e,
          t,
          "" + e[t]
        );
      }
    }
    function zm(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = cd(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function Nn(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function xt(e) {
      return e.replace(
        $h,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function ra(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || F0 || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        bt() || "A component",
        t.type
      ), F0 = !0), t.value === void 0 || t.defaultValue === void 0 || Cp || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        bt() || "A component",
        t.type
      ), Cp = !0);
    }
    function ji(e, t, a, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (Et(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Xa(t)) : e.value !== "" + Xa(t) && (e.value = "" + Xa(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Mm(e, d, Xa(t)) : a != null ? Mm(e, d, Xa(a)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (Et(h, "name"), e.name = "" + Xa(h)) : e.removeAttribute("name");
    }
    function fd(e, t, a, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (Et(f, "type"), e.type = f), t != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || t != null)) {
          od(e);
          return;
        }
        a = a != null ? "" + Xa(a) : "", t = t != null ? "" + Xa(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (Et(d, "name"), e.name = d), od(e);
    }
    function Mm(e, t, a) {
      t === "number" && Nn(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function zg(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? Dr.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || l || (l = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || n || (n = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || xr || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), xr = !0);
    }
    function Cm() {
      var e = bt();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function ru(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < a.length; o++)
          t["$" + a[o]] = !0;
        for (a = 0; a < e.length; a++)
          o = t.hasOwnProperty("$" + e[a].value), e[a].selected !== o && (e[a].selected = o), o && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + Xa(a), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === a) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function sd(e, t) {
      for (e = 0; e < c.length; e++) {
        var a = c[e];
        if (t[a] != null) {
          var i = Al(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            Cm()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            Cm()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || u || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), u = !0);
    }
    function Rc(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || s || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        bt() || "A component"
      ), s = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function _c(e, t, a) {
      if (t != null && (t = "" + Xa(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + Xa(a) : "";
    }
    function Yo(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (Al(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = Xa(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i), od(e);
    }
    function Dc(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Dc(e.children[0], t) : e;
    }
    function zt(e) {
      return "  " + "  ".repeat(e);
    }
    function zc(e) {
      return "+ " + "  ".repeat(e);
    }
    function Bi(e) {
      return "- " + "  ".repeat(e);
    }
    function qi(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 31:
          return "Activity";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function du(e, t) {
      return r.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function rd(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return zc(a) + du(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), zc(a) + du(e, i) + `
` + Bi(a) + du(t, i) + `
`;
      }
      return zt(a) + du(e, i) + `
`;
    }
    function dd(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function wo(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (Al(e)) return "[...]";
          if (e.$$typeof === _n)
            return (t = Ye(e.type)) ? "<" + t + ">" : "<...>";
          var a = dd(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = wo(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function Go(e, t) {
      return typeof e != "string" || r.test(e) ? "{" + wo(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function Lo(e, t, a) {
      var i = 120 - a.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = Go(
            t[f],
            120 - a.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + o.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function hd(e, t, a) {
      var i = "", o = lt({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = wo(e[f], d);
          t.hasOwnProperty(f) ? (d = wo(t[f], d), i += zc(a) + f + ": " + h + `
`, i += Bi(a) + f + ": " + d + `
`) : i += zc(a) + f + ": " + h + `
`;
        }
      for (var y in o)
        o.hasOwnProperty(y) && (e = wo(
          o[y],
          120 - 2 * a - y.length - 2
        ), i += Bi(a) + y + ": " + e + `
`);
      return i;
    }
    function ei(e, t, a, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (p in a)
        a.hasOwnProperty(p) && f.set(
          p.toLowerCase(),
          p
        );
      if (f.size === 1 && f.has("children"))
        o += Lo(
          e,
          t,
          zt(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, y = f.get(d.toLowerCase());
            if (y !== void 0) {
              f.delete(d.toLowerCase());
              var p = t[d];
              y = a[y];
              var M = Go(
                p,
                h
              );
              h = Go(
                y,
                h
              ), typeof p == "object" && p !== null && typeof y == "object" && y !== null && dd(p) === "Object" && dd(y) === "Object" && (2 < Object.keys(p).length || 2 < Object.keys(y).length || -1 < M.indexOf("...") || -1 < h.indexOf("...")) ? o += zt(i + 1) + d + `={{
` + hd(
                p,
                y,
                i + 2
              ) + zt(i + 1) + `}}
` : (o += zc(i + 1) + d + "=" + M + `
`, o += Bi(i + 1) + d + "=" + h + `
`);
            } else
              o += zt(i + 1) + d + "=" + Go(t[d], h) + `
`;
          }
        f.forEach(function(H) {
          if (H !== "children") {
            var O = 120 - 2 * (i + 1) - H.length - 1;
            o += Bi(i + 1) + H + "=" + Go(a[H], O) + `
`;
          }
        }), o = o === "" ? zt(i) + "<" + e + `>
` : zt(i) + "<" + e + `
` + o + zt(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += rd(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + rd("" + t, null, i + 1) : o + rd("" + t, void 0, i + 1)), o;
    }
    function Qa(e, t) {
      var a = qi(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += Qa(e, t), e = e.sibling;
        return a;
      }
      return zt(t) + "<" + a + `>
`;
    }
    function md(e, t) {
      var a = Dc(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return zt(t) + `...
` + md(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (a += zt(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = rd(o, e.serverProps, t), t++;
      else if (f = qi(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (p in o)
            if (o.hasOwnProperty(p) && p !== "children") {
              var y = Go(o[p], 15);
              if (d -= p.length + y.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + p + "=" + y;
            }
          i = zt(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = Lo(
            f,
            o,
            zc(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = ei(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var p = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (p += md(d, t), f++) : p += Qa(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (p += zt(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], p = typeof f == "string" ? p + (Bi(t) + du(f, 120 - 2 * t) + `
`) : p + Lo(
          f.type,
          f.props,
          Bi(t)
        );
      return a + i + p;
    }
    function Um(e) {
      try {
        return `

` + md(e, 0);
      } catch {
        return "";
      }
    }
    function yd(e, t, a) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? Um(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function Hm(e, t) {
      var a = lt({}, e || Z), i = { tag: t };
      return v.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), _.indexOf(t) !== -1 && (a.pTagInButtonScope = null), m.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function bs(e, t, a) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          if (a) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!a) return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return Y.indexOf(t) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
        case "head":
          return a || t === null;
        case "html":
          return a && t === "#document" || t === null;
        case "body":
          return a && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function e1(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function Va(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function Es(e, t) {
      t = t || Z;
      var a = t.current;
      if (t = (a = bs(
        e,
        a && a.tag,
        t.implicitRootScope
      ) ? null : a) ? null : e1(e, t), t = a || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!a) + "|" + e + "|" + i, W[t]) return !1;
      W[t] = !0;
      var o = (t = ja) ? Va(t.return, i) : null, f = t !== null && o !== null ? yd(o, t, null) : "", d = "<" + e + ">";
      return a ? (a = "", i === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || he(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function Ts(e, t, a) {
      if (a || bs("#text", t, !1))
        return !0;
      if (a = "#text|" + t, W[a]) return !1;
      W[a] = !0;
      var i = (a = ja) ? Va(a, t) : null;
      return a = a !== null && i !== null ? yd(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function Mc(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function Xo(e) {
      return e.replace(x, function(t, a) {
        return a.toUpperCase();
      });
    }
    function Nm(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? B.hasOwnProperty(t) && B[t] || (B[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        Xo(t.replace(Yt, "ms-"))
      )) : He.test(t) ? B.hasOwnProperty(t) && B[t] || (B[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !C.test(a) || k.hasOwnProperty(a) && k[a] || (k[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(C, "")
      )), typeof a == "number" && (isNaN(a) ? De || (De = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || vt || (vt = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ee.has(t) ? t === "float" ? e.cssFloat = a : (ta(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function xm(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = w[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (o = w[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var y in t)
            for (o = w[y] || [y], f = 0; f < o.length; f++)
              h[o[f]] = y;
          y = {};
          for (var p in i)
            if (o = i[p], (f = h[p]) && o !== f && (d = o + "," + f, !y[d])) {
              y[d] = !0, d = console;
              var M = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                M == null || typeof M == "boolean" || M === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var H in a)
          !a.hasOwnProperty(H) || t != null && t.hasOwnProperty(H) || (H.indexOf("--") === 0 ? e.setProperty(H, "") : H === "float" ? e.cssFloat = "" : e[H] = "");
        for (var O in t)
          p = t[O], t.hasOwnProperty(O) && a[O] !== p && Nm(e, O, p);
      } else
        for (i in t)
          t.hasOwnProperty(i) && Nm(e, i, t[i]);
    }
    function hu(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function Mg(e) {
      return At.get(e) || e;
    }
    function Cg(e, t) {
      if (un.call(kh, t) && kh[t])
        return !0;
      if (S2.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = I0.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), kh[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), kh[t] = !0;
      }
      if (v2.test(t)) {
        if (e = t.toLowerCase(), e = I0.hasOwnProperty(e) ? e : null, e == null) return kh[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), kh[t] = !0);
      }
      return !0;
    }
    function Ug(e, t) {
      var a = [], i;
      for (i in t)
        Cg(e, i) || a.push(i);
      t = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function jm(e, t, a, i) {
      if (un.call(cn, t) && cn[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), cn[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), cn[t] = !0;
        if (NS.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), cn[t] = !0;
      } else if (NS.test(t))
        return b2.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), cn[t] = !0;
      if (E2.test(t) || T2.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), cn[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), cn[t] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), cn[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), cn[t] = !0;
      if (lu.hasOwnProperty(o)) {
        if (o = lu[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), cn[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), cn[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), cn[t] = !0);
          }
        case "function":
        case "symbol":
          return cn[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), cn[t] = !0;
          }
      }
      return !0;
    }
    function t1(e, t, a) {
      var i = [], o;
      for (o in t)
        jm(e, o, t[o], a) || i.push(o);
      t = i.map(function(f) {
        return "`" + f + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function As(e) {
      return A2.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function yn() {
    }
    function xn(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function pd(e) {
      var t = oe(e);
      if (t && (e = t.stateNode)) {
        var a = e[_a] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (ji(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (Et(t, "name"), a = a.querySelectorAll(
                'input[name="' + xt(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var o = i[_a] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  ji(
                    i,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && zm(i);
            }
            break e;
          case "textarea":
            _c(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && ru(e, !!a.multiple, t, !1);
        }
      }
    }
    function gd(e, t, a) {
      if (y1) return e(t, a);
      y1 = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (y1 = !1, (Wh !== null || Fh !== null) && (ln(), Wh && (t = Wh, e = Fh, Fh = Wh = null, pd(t), e)))
          for (t = 0; t < e.length; t++) pd(e[t]);
      }
    }
    function mu(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[_a] || null;
      if (i === null) return null;
      a = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function Cc() {
      if (P0) return P0;
      var e, t = g1, a = t.length, i, o = "value" in Jf ? Jf.value : Jf.textContent, f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[f - i]; i++) ;
      return P0 = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Os(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Qo() {
      return !0;
    }
    function Bm() {
      return !1;
    }
    function xl(e) {
      function t(a, i, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Qo : Bm, this.isPropagationStopped = Bm, this;
      }
      return lt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Qo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Qo);
        },
        persist: function() {
        },
        isPersistent: Qo
      }), t;
    }
    function ti(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = B2[e]) ? !!t[e] : !1;
    }
    function Rs() {
      return ti;
    }
    function Vo(e, t) {
      switch (e) {
        case "keyup":
          return $2.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== qS;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function li(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function qm(e, t) {
      switch (e) {
        case "compositionend":
          return li(t);
        case "keypress":
          return t.which !== wS ? null : (LS = !0, GS);
        case "textInput":
          return e = t.data, e === GS && LS ? null : e;
        default:
          return null;
      }
    }
    function vd(e, t) {
      if (Ih)
        return e === "compositionend" || !E1 && Vo(e, t) ? (e = Cc(), P0 = g1 = Jf = null, Ih = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return YS && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function Ym(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!W2[e.type] : t === "textarea";
    }
    function Sd(e) {
      if (!pc) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function _s(e, t, a, i) {
      Wh ? Fh ? Fh.push(i) : Fh = [i] : Wh = i, t = Fn(t, "onChange"), 0 < t.length && (a = new ev(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function Hg(e) {
      Ut(e, 0);
    }
    function kl(e) {
      var t = Se(e);
      if (zm(t)) return e;
    }
    function Yi(e, t) {
      if (e === "change") return t;
    }
    function Ds() {
      Bp && (Bp.detachEvent("onpropertychange", Zo), qp = Bp = null);
    }
    function Zo(e) {
      if (e.propertyName === "value" && kl(qp)) {
        var t = [];
        _s(
          t,
          qp,
          e,
          xn(e)
        ), gd(Hg, t);
      }
    }
    function l1(e, t, a) {
      e === "focusin" ? (Ds(), Bp = t, qp = a, Bp.attachEvent("onpropertychange", Zo)) : e === "focusout" && Ds();
    }
    function wm(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return kl(qp);
    }
    function Gm(e, t) {
      if (e === "click") return kl(t);
    }
    function zs(e, t) {
      if (e === "input" || e === "change")
        return kl(t);
    }
    function bd(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function Jo(e, t) {
      if (on(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var o = a[i];
        if (!un.call(t, o) || !on(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function Ng(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function xg(e, t) {
      var a = Ng(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = Ng(a);
      }
    }
    function jg(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? jg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function Ed(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = Nn(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = Nn(e.document);
      }
      return t;
    }
    function Lm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Bg(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      A1 || Ph == null || Ph !== Nn(i) || (i = Ph, "selectionStart" in i && Lm(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Yp && Jo(Yp, i) || (Yp = i, i = Fn(T1, "onSelect"), 0 < i.length && (t = new ev(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = Ph)));
    }
    function Uc(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function Hc(e) {
      if (O1[e]) return O1[e];
      if (!em[e]) return e;
      var t = em[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in QS)
          return O1[e] = t[a];
      return e;
    }
    function jn(e, t) {
      $S.set(e, t), it(t, [e]);
    }
    function qg(e) {
      for (var t = lv, a = 0; a < e.length; a++) {
        var i = e[a];
        if (typeof i == "object" && i !== null)
          if (Al(i) && i.length === 2 && typeof i[0] == "string") {
            if (t !== lv && t !== M1)
              return D1;
            t = M1;
          } else return D1;
        else {
          if (typeof i == "function" || typeof i == "string" && 50 < i.length || t !== lv && t !== z1)
            return D1;
          t = z1;
        }
      }
      return t;
    }
    function Xm(e, t, a, i) {
      for (var o in e)
        un.call(e, o) && o[0] !== "_" && yu(o, e[o], t, a, i);
    }
    function yu(e, t, a, i, o) {
      switch (typeof t) {
        case "object":
          if (t === null) {
            t = "null";
            break;
          } else {
            if (t.$$typeof === _n) {
              var f = Ye(t.type) || "…", d = t.key;
              t = t.props;
              var h = Object.keys(t), y = h.length;
              if (d == null && y === 0) {
                t = "<" + f + " />";
                break;
              }
              if (3 > i || y === 1 && h[0] === "children" && d == null) {
                t = "<" + f + " … />";
                break;
              }
              a.push([
                o + "  ".repeat(i) + e,
                "<" + f
              ]), d !== null && yu(
                "key",
                d,
                a,
                i + 1,
                o
              ), e = !1;
              for (var p in t)
                p === "children" ? t.children != null && (!Al(t.children) || 0 < t.children.length) && (e = !0) : un.call(t, p) && p[0] !== "_" && yu(
                  p,
                  t[p],
                  a,
                  i + 1,
                  o
                );
              a.push([
                "",
                e ? ">…</" + f + ">" : "/>"
              ]);
              return;
            }
            if (f = Object.prototype.toString.call(t), f = f.slice(8, f.length - 1), f === "Array") {
              if (p = qg(t), p === z1 || p === lv) {
                t = JSON.stringify(t);
                break;
              } else if (p === M1) {
                for (a.push([
                  o + "  ".repeat(i) + e,
                  ""
                ]), e = 0; e < t.length; e++)
                  f = t[e], yu(
                    f[0],
                    f[1],
                    a,
                    i + 1,
                    o
                  );
                return;
              }
            }
            if (f === "Promise") {
              if (t.status === "fulfilled") {
                if (f = a.length, yu(
                  e,
                  t.value,
                  a,
                  i,
                  o
                ), a.length > f) {
                  a = a[f], a[1] = "Promise<" + (a[1] || "Object") + ">";
                  return;
                }
              } else if (t.status === "rejected" && (f = a.length, yu(
                e,
                t.reason,
                a,
                i,
                o
              ), a.length > f)) {
                a = a[f], a[1] = "Rejected Promise<" + a[1] + ">";
                return;
              }
              a.push([
                "  ".repeat(i) + e,
                "Promise"
              ]);
              return;
            }
            f === "Object" && (p = Object.getPrototypeOf(t)) && typeof p.constructor == "function" && (f = p.constructor.name), a.push([
              o + "  ".repeat(i) + e,
              f === "Object" ? 3 > i ? "" : "…" : f
            ]), 3 > i && Xm(t, a, i + 1, o);
            return;
          }
        case "function":
          t = t.name === "" ? "() => {}" : t.name + "() {}";
          break;
        case "string":
          t = t === aT ? "…" : JSON.stringify(t);
          break;
        case "undefined":
          t = "undefined";
          break;
        case "boolean":
          t = t ? "true" : "false";
          break;
        default:
          t = String(t);
      }
      a.push([
        o + "  ".repeat(i) + e,
        t
      ]);
    }
    function Yg(e, t, a, i) {
      var o = !0;
      for (d in e)
        d in t || (a.push([
          av + "  ".repeat(i) + d,
          "…"
        ]), o = !1);
      for (var f in t)
        if (f in e) {
          var d = e[f], h = t[f];
          if (d !== h) {
            if (i === 0 && f === "children")
              o = "  ".repeat(i) + f, a.push(
                [av + o, "…"],
                [nv + o, "…"]
              );
            else {
              if (!(3 <= i)) {
                if (typeof d == "object" && typeof h == "object" && d !== null && h !== null && d.$$typeof === h.$$typeof)
                  if (h.$$typeof === _n) {
                    if (d.type === h.type && d.key === h.key) {
                      d = Ye(h.type) || "…", o = "  ".repeat(i) + f, d = "<" + d + " … />", a.push(
                        [av + o, d],
                        [nv + o, d]
                      ), o = !1;
                      continue;
                    }
                  } else {
                    var y = Object.prototype.toString.call(d), p = Object.prototype.toString.call(h);
                    if (y === p && (p === "[object Object]" || p === "[object Array]")) {
                      y = [
                        FS + "  ".repeat(i) + f,
                        p === "[object Array]" ? "Array" : ""
                      ], a.push(y), p = a.length, Yg(
                        d,
                        h,
                        a,
                        i + 1
                      ) ? p === a.length && (y[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : o = !1;
                      continue;
                    }
                  }
                else if (typeof d == "function" && typeof h == "function" && d.name === h.name && d.length === h.length && (y = Function.prototype.toString.call(d), p = Function.prototype.toString.call(h), y === p)) {
                  d = h.name === "" ? "() => {}" : h.name + "() {}", a.push([
                    FS + "  ".repeat(i) + f,
                    d + " Referentially unequal function closure. Consider memoization."
                  ]);
                  continue;
                }
              }
              yu(f, d, a, i, av), yu(f, h, a, i, nv);
            }
            o = !1;
          }
        } else
          a.push([
            nv + "  ".repeat(i) + f,
            "…"
          ]), o = !1;
      return o;
    }
    function Bn(e) {
      gt = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
    }
    function pn(e, t, a, i) {
      ll && ($f.start = t, $f.end = a, vo.color = "warning", vo.tooltipText = i, vo.properties = null, (e = e._debugTask) ? e.run(
        performance.measure.bind(
          performance,
          i,
          $f
        )
      ) : performance.measure(i, $f));
    }
    function Td(e, t, a) {
      pn(e, t, a, "Reconnect");
    }
    function Ad(e, t, a, i, o) {
      var f = ge(e);
      if (f !== null && ll) {
        var d = e.alternate, h = e.actualDuration;
        if (d === null || d.child !== e.child)
          for (var y = e.child; y !== null; y = y.sibling)
            h -= y.actualDuration;
        i = 0.5 > h ? i ? "tertiary-light" : "primary-light" : 10 > h ? i ? "tertiary" : "primary" : 100 > h ? i ? "tertiary-dark" : "primary-dark" : "error";
        var p = e.memoizedProps;
        h = e._debugTask, p !== null && d !== null && d.memoizedProps !== p ? (y = [nT], p = Yg(
          d.memoizedProps,
          p,
          y,
          0
        ), 1 < y.length && (p && !Kf && (d.lanes & o) === 0 && 100 < e.actualDuration ? (Kf = !0, y[0] = uT, vo.color = "warning", vo.tooltipText = IS) : (vo.color = i, vo.tooltipText = f), vo.properties = y, $f.start = t, $f.end = a, h != null ? h.run(
          performance.measure.bind(
            performance,
            "​" + f,
            $f
          )
        ) : performance.measure(
          "​" + f,
          $f
        ))) : h != null ? h.run(
          console.timeStamp.bind(
            console,
            f,
            t,
            a,
            Xu,
            void 0,
            i
          )
        ) : console.timeStamp(
          f,
          t,
          a,
          Xu,
          void 0,
          i
        );
      }
    }
    function Qm(e, t, a, i) {
      if (ll) {
        var o = ge(e);
        if (o !== null) {
          for (var f = null, d = [], h = 0; h < i.length; h++) {
            var y = i[h];
            f == null && y.source !== null && (f = y.source._debugTask), y = y.value, d.push([
              "Error",
              typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y)
            ]);
          }
          e.key !== null && yu("key", e.key, d, 0, ""), e.memoizedProps !== null && Xm(e.memoizedProps, d, 0, ""), f == null && (f = e._debugTask), e = {
            start: t,
            end: a,
            detail: {
              devtools: {
                color: "error",
                track: Xu,
                tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
                properties: d
              }
            }
          }, f ? f.run(
            performance.measure.bind(performance, "​" + o, e)
          ) : performance.measure("​" + o, e);
        }
      }
    }
    function qn(e, t, a, i, o) {
      if (o !== null) {
        if (ll) {
          var f = ge(e);
          if (f !== null) {
            i = [];
            for (var d = 0; d < o.length; d++) {
              var h = o[d].value;
              i.push([
                "Error",
                typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
              ]);
            }
            e.key !== null && yu("key", e.key, i, 0, ""), e.memoizedProps !== null && Xm(e.memoizedProps, i, 0, ""), t = {
              start: t,
              end: a,
              detail: {
                devtools: {
                  color: "error",
                  track: Xu,
                  tooltipText: "A lifecycle or effect errored",
                  properties: i
                }
              }
            }, (e = e._debugTask) ? e.run(
              performance.measure.bind(
                performance,
                "​" + f,
                t
              )
            ) : performance.measure("​" + f, t);
          }
        }
      } else
        f = ge(e), f !== null && ll && (o = 1 > i ? "secondary-light" : 100 > i ? "secondary" : 500 > i ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(
          console.timeStamp.bind(
            console,
            f,
            t,
            a,
            Xu,
            void 0,
            o
          )
        ) : console.timeStamp(
          f,
          t,
          a,
          Xu,
          void 0,
          o
        ));
    }
    function a1(e, t, a, i) {
      if (ll && !(t <= e)) {
        var o = (a & 738197653) === a ? "tertiary-dark" : "primary-dark";
        a = (a & 536870912) === a ? "Prepared" : (a & 201326741) === a ? "Hydrated" : "Render", i ? i.run(
          console.timeStamp.bind(
            console,
            a,
            e,
            t,
            gt,
            mt,
            o
          )
        ) : console.timeStamp(
          a,
          e,
          t,
          gt,
          mt,
          o
        );
      }
    }
    function wg(e, t, a, i) {
      !ll || t <= e || (a = (a & 738197653) === a ? "tertiary-dark" : "primary-dark", i ? i.run(
        console.timeStamp.bind(
          console,
          "Prewarm",
          e,
          t,
          gt,
          mt,
          a
        )
      ) : console.timeStamp(
        "Prewarm",
        e,
        t,
        gt,
        mt,
        a
      ));
    }
    function Gg(e, t, a, i) {
      !ll || t <= e || (a = (a & 738197653) === a ? "tertiary-dark" : "primary-dark", i ? i.run(
        console.timeStamp.bind(
          console,
          "Suspended",
          e,
          t,
          gt,
          mt,
          a
        )
      ) : console.timeStamp(
        "Suspended",
        e,
        t,
        gt,
        mt,
        a
      ));
    }
    function n1(e, t, a, i, o, f) {
      if (ll && !(t <= e)) {
        a = [];
        for (var d = 0; d < i.length; d++) {
          var h = i[d].value;
          a.push([
            "Recoverable Error",
            typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
          ]);
        }
        e = {
          start: e,
          end: t,
          detail: {
            devtools: {
              color: "primary-dark",
              track: gt,
              trackGroup: mt,
              tooltipText: o ? "Hydration Failed" : "Recovered after Error",
              properties: a
            }
          }
        }, f ? f.run(
          performance.measure.bind(performance, "Recovered", e)
        ) : performance.measure("Recovered", e);
      }
    }
    function Vm(e, t, a, i) {
      !ll || t <= e || (i ? i.run(
        console.timeStamp.bind(
          console,
          "Errored",
          e,
          t,
          gt,
          mt,
          "error"
        )
      ) : console.timeStamp(
        "Errored",
        e,
        t,
        gt,
        mt,
        "error"
      ));
    }
    function u1(e, t, a, i) {
      !ll || t <= e || (i ? i.run(
        console.timeStamp.bind(
          console,
          a,
          e,
          t,
          gt,
          mt,
          "secondary-light"
        )
      ) : console.timeStamp(
        a,
        e,
        t,
        gt,
        mt,
        "secondary-light"
      ));
    }
    function Lg(e, t, a, i, o) {
      if (ll && !(t <= e)) {
        for (var f = [], d = 0; d < a.length; d++) {
          var h = a[d].value;
          f.push([
            "Error",
            typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
          ]);
        }
        e = {
          start: e,
          end: t,
          detail: {
            devtools: {
              color: "error",
              track: gt,
              trackGroup: mt,
              tooltipText: i ? "Remaining Effects Errored" : "Commit Errored",
              properties: f
            }
          }
        }, o ? o.run(
          performance.measure.bind(performance, "Errored", e)
        ) : performance.measure("Errored", e);
      }
    }
    function Zm(e, t, a) {
      !ll || t <= e || console.timeStamp(
        "Animating",
        e,
        t,
        gt,
        mt,
        "secondary-dark"
      );
    }
    function Od() {
      for (var e = tm, t = C1 = tm = 0; t < e; ) {
        var a = Qu[t];
        Qu[t++] = null;
        var i = Qu[t];
        Qu[t++] = null;
        var o = Qu[t];
        Qu[t++] = null;
        var f = Qu[t];
        if (Qu[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && Jm(a, o, f);
      }
    }
    function Ko(e, t, a, i) {
      Qu[tm++] = e, Qu[tm++] = t, Qu[tm++] = a, Qu[tm++] = i, C1 |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function Nc(e, t, a, i) {
      return Ko(e, t, a, i), Ms(e);
    }
    function aa(e, t) {
      return Ko(e, null, null, t), Ms(e);
    }
    function Jm(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= a, i = f.alternate, i !== null && (i.childLanes |= a), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & wp || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - Fl(a), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = a | 536870912), f) : null;
    }
    function Ms(e) {
      if (dg > ET)
        throw Fr = dg = 0, hg = fS = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Fr > TT && (Fr = 0, hg = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && (e.flags & 4098) !== 0 && Rn(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && (t.flags & 4098) !== 0 && Rn(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function wi(e) {
      if (Vu === null) return e;
      var t = Vu(e);
      return t === void 0 ? e : t.current;
    }
    function Rd(e) {
      if (Vu === null) return e;
      var t = Vu(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = wi(e.render), e.render !== t) ? (t = { $$typeof: jf, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function Km(e, t) {
      if (Vu === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === ia) && (i = !0);
          break;
        case 11:
          (o === jf || o === ia) && (i = !0);
          break;
        case 14:
        case 15:
          (o === Mr || o === ia) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = Vu(a), e !== void 0 && e === Vu(t)));
    }
    function xc(e) {
      Vu !== null && typeof WeakSet == "function" && (lm === null && (lm = /* @__PURE__ */ new WeakSet()), lm.add(e));
    }
    function Xg(e, t, a) {
      do {
        var i = e, o = i.alternate, f = i.child, d = i.sibling, h = i.tag;
        i = i.type;
        var y = null;
        switch (h) {
          case 0:
          case 15:
          case 1:
            y = i;
            break;
          case 11:
            y = i.render;
        }
        if (Vu === null)
          throw Error("Expected resolveFamily to be set during hot reload.");
        var p = !1;
        if (i = !1, y !== null && (y = Vu(y), y !== void 0 && (a.has(y) ? i = !0 : t.has(y) && (h === 1 ? i = !0 : p = !0))), lm !== null && (lm.has(e) || o !== null && lm.has(o)) && (i = !0), i && (e._debugNeedsRemount = !0), (i || p) && (o = aa(e, 2), o !== null && qe(o, e, 2)), f === null || i || Xg(
          f,
          t,
          a
        ), d === null) break;
        e = d;
      } while (!0);
    }
    function i1(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, PS || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function $m(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function pu(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = A(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugStack = e._debugStack, a._debugTask = e._debugTask, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = wi(e.type);
          break;
        case 1:
          a.type = wi(e.type);
          break;
        case 11:
          a.type = Rd(e.type);
      }
      return a;
    }
    function km(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function jc(e, t, a, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        $m(e) && (d = 1), h = wi(h);
      else if (typeof e == "string")
        d = J(), d = q0(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case tu:
            return t = A(31, a, t, o), t.elementType = tu, t.lanes = f, t;
          case xf:
            return Bc(
              a.children,
              o,
              f,
              t
            );
          case Ra:
            d = 8, o |= Ba, o |= Ai;
            break;
          case zr:
            return e = a, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = A(12, e, t, i | at), t.elementType = zr, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case ho:
            return t = A(13, a, t, o), t.elementType = ho, t.lanes = f, t;
          case xa:
            return t = A(19, a, t, o), t.elementType = xa, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case eu:
                  d = 10;
                  break e;
                case qh:
                  d = 9;
                  break e;
                case jf:
                  d = 11, h = Rd(h);
                  break e;
                case Mr:
                  d = 14;
                  break e;
                case ia:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : Al(e) ? a = "array" : e !== void 0 && e.$$typeof === _n ? (a = "<" + (Ye(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? Fe(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = A(d, a, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function Gi(e, t, a) {
      return t = jc(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function Bc(e, t, a, i) {
      return e = A(7, e, i, t), e.lanes = a, e;
    }
    function $o(e, t, a) {
      return e = A(6, e, null, t), e.lanes = a, e;
    }
    function Wm(e) {
      var t = A(18, null, null, Be);
      return t.stateNode = e, t;
    }
    function _d(e, t, a) {
      return t = A(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function da(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = U1.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: Me(t)
        }, U1.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Me(t)
      };
    }
    function Yn(e, t) {
      Li(), am[nm++] = Gp, am[nm++] = uv, uv = e, Gp = t;
    }
    function Fm(e, t, a) {
      Li(), Zu[Ju++] = bo, Zu[Ju++] = Eo, Zu[Ju++] = Br, Br = e;
      var i = bo;
      e = Eo;
      var o = 32 - Fl(i) - 1;
      i &= ~(1 << o), a += 1;
      var f = 32 - Fl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, bo = 1 << 32 - Fl(t) + o | a << o | i, Eo = f + e;
      } else
        bo = 1 << f | a << o | i, Eo = e;
    }
    function Dd(e) {
      Li(), e.return !== null && (Yn(e, 1), Fm(e, 1, 0));
    }
    function zd(e) {
      for (; e === uv; )
        uv = am[--nm], am[nm] = null, Gp = am[--nm], am[nm] = null;
      for (; e === Br; )
        Br = Zu[--Ju], Zu[Ju] = null, Eo = Zu[--Ju], Zu[Ju] = null, bo = Zu[--Ju], Zu[Ju] = null;
    }
    function Qg() {
      return Li(), Br !== null ? { id: bo, overflow: Eo } : null;
    }
    function Vg(e, t) {
      Li(), Zu[Ju++] = bo, Zu[Ju++] = Eo, Zu[Ju++] = Br, bo = t.id, Eo = t.overflow, Br = e;
    }
    function Li() {
      ht || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function qc(e, t) {
      if (e.return === null) {
        if (au === null)
          au = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (au.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          au.distanceFromLeaf > t && (au.distanceFromLeaf = t);
        }
        return au;
      }
      var a = qc(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function Zg() {
      ht && console.error(
        "We should not be hydrating here. This is a bug in React. Please file a bug."
      );
    }
    function na(e, t) {
      gc || (e = qc(e, 0), e.serverProps = null, t !== null && (t = N0(t), e.serverTail.push(t)));
    }
    function gn(e) {
      var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : !1, a = "", i = au;
      throw i !== null && (au = null, a = Um(i)), Us(
        da(
          Error(
            "Hydration failed because the server rendered " + (t ? "text" : "HTML") + ` didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + a
          ),
          e
        )
      ), H1;
    }
    function Im(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[tl] = e, t[_a] = i, Aa(a, i), a) {
        case "dialog":
          je("cancel", t), je("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          je("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < mg.length; a++)
            je(mg[a], t);
          break;
        case "source":
          je("error", t);
          break;
        case "img":
        case "image":
        case "link":
          je("error", t), je("load", t);
          break;
        case "details":
          je("toggle", t);
          break;
        case "input":
          la("input", i), je("invalid", t), ra(t, i), fd(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          );
          break;
        case "option":
          zg(t, i);
          break;
        case "select":
          la("select", i), je("invalid", t), sd(t, i);
          break;
        case "textarea":
          la("textarea", i), je("invalid", t), Rc(t, i), Yo(
            t,
            i.value,
            i.defaultValue,
            i.children
          );
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || ep(t.textContent, a) ? (i.popover != null && (je("beforetoggle", t), je("toggle", t)), i.onScroll != null && je("scroll", t), i.onScrollEnd != null && je("scrollend", t), i.onClick != null && (t.onclick = yn), t = !0) : t = !1, t || gn(e, !0);
    }
    function Pm(e) {
      for (Da = e.return; Da; )
        switch (Da.tag) {
          case 5:
          case 31:
          case 13:
            Ku = !1;
            return;
          case 27:
          case 3:
            Ku = !0;
            return;
          default:
            Da = Da.return;
        }
    }
    function Yc(e) {
      if (e !== Da) return !1;
      if (!ht)
        return Pm(e), ht = !0, !1;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || _f(e.type, e.memoizedProps)), a = !a), a && al) {
        for (a = al; a; ) {
          var i = qc(e, 0), o = N0(a);
          i.serverTail.push(o), a = o.type === "Suspense" ? Mf(a) : an(a.nextSibling);
        }
        gn(e);
      }
      if (Pm(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        al = Mf(e);
      } else if (t === 31) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        al = Mf(e);
      } else
        t === 27 ? (t = al, sc(e.type) ? (e = ES, ES = null, al = e) : al = t) : al = Da ? an(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Xi() {
      al = Da = null, gc = ht = !1;
    }
    function Cs() {
      var e = Wf;
      return e !== null && (dn === null ? dn = e : dn.push.apply(
        dn,
        e
      ), Wf = null), e;
    }
    function Us(e) {
      Wf === null ? Wf = [e] : Wf.push(e);
    }
    function Qi() {
      var e = au;
      if (e !== null) {
        au = null;
        for (var t = Um(e); 0 < e.children.length; )
          e = e.children[0];
        he(e.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            t
          );
        });
      }
    }
    function ko() {
      um = iv = null, im = !1;
    }
    function vn(e, t, a) {
      Xe(N1, t._currentValue, e), t._currentValue = a, Xe(x1, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== tb && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = tb;
    }
    function wn(e, t) {
      e._currentValue = N1.current;
      var a = x1.current;
      Te(x1, t), e._currentRenderer = a, Te(N1, t);
    }
    function Md(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function ai(e, t, a, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          e: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var y = 0; y < t.length; y++)
              if (h.context === t[y]) {
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), Md(
                  f.return,
                  a,
                  e
                ), i || (d = null);
                break e;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), Md(
            d,
            a,
            e
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function Gn(e, t, a, i) {
      e = null;
      for (var o = t, f = !1; o !== null; ) {
        if (!f) {
          if ((o.flags & 524288) !== 0) f = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            on(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === mc.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Sg) : e = [Sg]);
        }
        o = o.return;
      }
      e !== null && ai(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Wo(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!on(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function Vi(e) {
      iv = e, um = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function Ot(e) {
      return im && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), ey(iv, e);
    }
    function Hs(e, t) {
      return iv === null && Vi(e), ey(e, t);
    }
    function ey(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, um === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        um = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else um = um.next = t;
      return a;
    }
    function Cd() {
      return {
        controller: new oT(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function wc(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function Ns(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && fT(sT, function() {
        e.controller.abort();
      });
    }
    function gu(e, t, a) {
      (e & 127) !== 0 ? 0 > vc && (vc = Ql(), Xp = cv(t), j1 = t, a != null && (B1 = ge(a)), (St & (ea | iu)) !== sa && (Sl = !0, If = Lp), e = Df(), t = Bu(), e !== cm || t !== Qp ? cm = -1.1 : t !== null && (If = Lp), wr = e, Qp = t) : (e & 4194048) !== 0 && 0 > $u && ($u = Ql(), Vp = cv(t), lb = t, a != null && (ab = ge(a)), 0 > Ro) && (e = Df(), t = Bu(), (e !== es || t !== Gr) && (es = -1.1), Pf = e, Gr = t);
    }
    function Jg(e) {
      if (0 > vc) {
        vc = Ql(), Xp = e._debugTask != null ? e._debugTask : null, (St & (ea | iu)) !== sa && (If = Lp);
        var t = Df(), a = Bu();
        t !== cm || a !== Qp ? cm = -1.1 : a !== null && (If = Lp), wr = t, Qp = a;
      }
      0 > $u && ($u = Ql(), Vp = e._debugTask != null ? e._debugTask : null, 0 > Ro) && (e = Df(), t = Bu(), (e !== es || t !== Gr) && (es = -1.1), Pf = e, Gr = t);
    }
    function vu() {
      var e = qr;
      return qr = 0, e;
    }
    function Fo(e) {
      var t = qr;
      return qr = e, t;
    }
    function ha(e) {
      var t = qr;
      return qr += e, t;
    }
    function Gc() {
      xe = Ce = -1.1;
    }
    function It() {
      var e = Ce;
      return Ce = -1.1, e;
    }
    function jl(e) {
      0 <= e && (Ce = e);
    }
    function Sn() {
      var e = dl;
      return dl = -0, e;
    }
    function Za(e) {
      0 <= e && (dl = e);
    }
    function Ja() {
      var e = ol;
      return ol = null, e;
    }
    function bn() {
      var e = Sl;
      return Sl = !1, e;
    }
    function ni(e) {
      fn = Ql(), 0 > e.actualStartTime && (e.actualStartTime = fn);
    }
    function Ud(e) {
      if (0 <= fn) {
        var t = Ql() - fn;
        e.actualDuration += t, e.selfBaseDuration = t, fn = -1;
      }
    }
    function xs(e) {
      if (0 <= fn) {
        var t = Ql() - fn;
        e.actualDuration += t, fn = -1;
      }
    }
    function ma() {
      if (0 <= fn) {
        var e = Ql(), t = e - fn;
        fn = -1, qr += t, dl += t, xe = e;
      }
    }
    function Kg(e) {
      ol === null && (ol = []), ol.push(e), Ao === null && (Ao = []), Ao.push(e);
    }
    function fl() {
      fn = Ql(), 0 > Ce && (Ce = fn);
    }
    function Lc(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ui(e, t) {
      if (Jp === null) {
        var a = Jp = [];
        Y1 = 0, Lr = Py(), om = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return Y1++, t.then(ty, ty), t;
    }
    function ty() {
      if (--Y1 === 0 && (-1 < $u || (Ro = -1.1), Jp !== null)) {
        om !== null && (om.status = "fulfilled");
        var e = Jp;
        Jp = null, Lr = 0, om = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Hd(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), i;
    }
    function ii() {
      var e = Xr.current;
      return e !== null ? e : Jt.pooledCache;
    }
    function Io(e, t) {
      t === null ? Xe(Xr, Xr.current, e) : Xe(Xr, t.pool, e);
    }
    function ly() {
      var e = ii();
      return e === null ? null : { parent: Xl._currentValue, pool: e };
    }
    function Nd() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function ay(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Ka(e, t, a) {
      X.actQueue !== null && (X.didUsePromise = !0);
      var i = e.thenables;
      if (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(yn, yn), t = a), t._debugInfo === void 0) {
        e = performance.now(), i = t.displayName;
        var o = {
          name: typeof i == "string" ? i : "Promise",
          start: e,
          end: e,
          value: t
        };
        t._debugInfo = [{ awaited: o }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
          o.end = performance.now();
        }, t.then(e, e));
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, js(e), e;
        default:
          if (typeof t.status == "string")
            t.then(yn, yn);
          else {
            if (e = Jt, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(f) {
                if (t.status === "pending") {
                  var d = t;
                  d.status = "fulfilled", d.value = f;
                }
              },
              function(f) {
                if (t.status === "pending") {
                  var d = t;
                  d.status = "rejected", d.reason = f;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, js(e), e;
          }
          throw Vr = t, Pp = !0, fm;
      }
    }
    function $a(e) {
      try {
        return yT(e);
      } catch (t) {
        throw t !== null && typeof t == "object" && typeof t.then == "function" ? (Vr = t, Pp = !0, fm) : t;
      }
    }
    function Xc() {
      if (Vr === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Vr;
      return Vr = null, Pp = !1, e;
    }
    function js(e) {
      if (e === fm || e === yv)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function ml(e) {
      var t = nt;
      return e != null && (nt = t === null ? e : t.concat(e)), t;
    }
    function za() {
      var e = nt;
      if (e != null) {
        for (var t = e.length - 1; 0 <= t; t--)
          if (e[t].name != null) {
            var a = e[t].debugTask;
            if (a != null) return a;
          }
      }
      return null;
    }
    function ya(e, t, a) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = Gi(e, a.mode, 0), t._debugInfo = nt, t.return = a), he(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function Ln(e) {
      var t = eg;
      return eg += 1, sm === null && (sm = Nd()), Ka(sm, e, t);
    }
    function Ma(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Xn(e, t) {
      throw t.$$typeof === Q0 ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function En(e, t) {
      var a = za();
      a !== null ? a.run(
        Xn.bind(null, e, t)
      ) : Xn(e, t);
    }
    function ny(e, t) {
      var a = ge(e) || "Component";
      Ab[a] || (Ab[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        a,
        t,
        a
      ));
    }
    function Po(e, t) {
      var a = za();
      a !== null ? a.run(
        ny.bind(null, e, t)
      ) : ny(e, t);
    }
    function xd(e, t) {
      var a = ge(e) || "Component";
      Ob[a] || (Ob[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function Bs(e, t) {
      var a = za();
      a !== null ? a.run(
        xd.bind(null, e, t)
      ) : xd(e, t);
    }
    function Bl(e) {
      function t(T, R) {
        if (e) {
          var D = T.deletions;
          D === null ? (T.deletions = [R], T.flags |= 16) : D.push(R);
        }
      }
      function a(T, R) {
        if (!e) return null;
        for (; R !== null; )
          t(T, R), R = R.sibling;
        return null;
      }
      function i(T) {
        for (var R = /* @__PURE__ */ new Map(); T !== null; )
          T.key !== null ? R.set(T.key, T) : R.set(T.index, T), T = T.sibling;
        return R;
      }
      function o(T, R) {
        return T = pu(T, R), T.index = 0, T.sibling = null, T;
      }
      function f(T, R, D) {
        return T.index = D, e ? (D = T.alternate, D !== null ? (D = D.index, D < R ? (T.flags |= 67108866, R) : D) : (T.flags |= 67108866, R)) : (T.flags |= 1048576, R);
      }
      function d(T) {
        return e && T.alternate === null && (T.flags |= 67108866), T;
      }
      function h(T, R, D, K) {
        return R === null || R.tag !== 6 ? (R = $o(
          D,
          T.mode,
          K
        ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = nt, R) : (R = o(R, D), R.return = T, R._debugInfo = nt, R);
      }
      function y(T, R, D, K) {
        var se = D.type;
        return se === xf ? (R = M(
          T,
          R,
          D.props.children,
          K,
          D.key
        ), ya(D, R, T), R) : R !== null && (R.elementType === se || Km(R, D) || typeof se == "object" && se !== null && se.$$typeof === ia && $a(se) === R.type) ? (R = o(R, D.props), Ma(R, D), R.return = T, R._debugOwner = D._owner, R._debugInfo = nt, R) : (R = Gi(D, T.mode, K), Ma(R, D), R.return = T, R._debugInfo = nt, R);
      }
      function p(T, R, D, K) {
        return R === null || R.tag !== 4 || R.stateNode.containerInfo !== D.containerInfo || R.stateNode.implementation !== D.implementation ? (R = _d(D, T.mode, K), R.return = T, R._debugInfo = nt, R) : (R = o(R, D.children || []), R.return = T, R._debugInfo = nt, R);
      }
      function M(T, R, D, K, se) {
        return R === null || R.tag !== 7 ? (R = Bc(
          D,
          T.mode,
          K,
          se
        ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = nt, R) : (R = o(R, D), R.return = T, R._debugInfo = nt, R);
      }
      function H(T, R, D) {
        if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
          return R = $o(
            "" + R,
            T.mode,
            D
          ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = nt, R;
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case _n:
              return D = Gi(
                R,
                T.mode,
                D
              ), Ma(D, R), D.return = T, T = ml(R._debugInfo), D._debugInfo = nt, nt = T, D;
            case dc:
              return R = _d(
                R,
                T.mode,
                D
              ), R.return = T, R._debugInfo = nt, R;
            case ia:
              var K = ml(R._debugInfo);
              return R = $a(R), T = H(T, R, D), nt = K, T;
          }
          if (Al(R) || Ae(R))
            return D = Bc(
              R,
              T.mode,
              D,
              null
            ), D.return = T, D._debugOwner = T, D._debugTask = T._debugTask, T = ml(R._debugInfo), D._debugInfo = nt, nt = T, D;
          if (typeof R.then == "function")
            return K = ml(R._debugInfo), T = H(
              T,
              Ln(R),
              D
            ), nt = K, T;
          if (R.$$typeof === eu)
            return H(
              T,
              Hs(T, R),
              D
            );
          En(T, R);
        }
        return typeof R == "function" && Po(T, R), typeof R == "symbol" && Bs(T, R), null;
      }
      function O(T, R, D, K) {
        var se = R !== null ? R.key : null;
        if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
          return se !== null ? null : h(T, R, "" + D, K);
        if (typeof D == "object" && D !== null) {
          switch (D.$$typeof) {
            case _n:
              return D.key === se ? (se = ml(D._debugInfo), T = y(
                T,
                R,
                D,
                K
              ), nt = se, T) : null;
            case dc:
              return D.key === se ? p(T, R, D, K) : null;
            case ia:
              return se = ml(D._debugInfo), D = $a(D), T = O(
                T,
                R,
                D,
                K
              ), nt = se, T;
          }
          if (Al(D) || Ae(D))
            return se !== null ? null : (se = ml(D._debugInfo), T = M(
              T,
              R,
              D,
              K,
              null
            ), nt = se, T);
          if (typeof D.then == "function")
            return se = ml(D._debugInfo), T = O(
              T,
              R,
              Ln(D),
              K
            ), nt = se, T;
          if (D.$$typeof === eu)
            return O(
              T,
              R,
              Hs(T, D),
              K
            );
          En(T, D);
        }
        return typeof D == "function" && Po(T, D), typeof D == "symbol" && Bs(T, D), null;
      }
      function G(T, R, D, K, se) {
        if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
          return T = T.get(D) || null, h(R, T, "" + K, se);
        if (typeof K == "object" && K !== null) {
          switch (K.$$typeof) {
            case _n:
              return D = T.get(
                K.key === null ? D : K.key
              ) || null, T = ml(K._debugInfo), R = y(
                R,
                D,
                K,
                se
              ), nt = T, R;
            case dc:
              return T = T.get(
                K.key === null ? D : K.key
              ) || null, p(R, T, K, se);
            case ia:
              var Le = ml(K._debugInfo);
              return K = $a(K), R = G(
                T,
                R,
                D,
                K,
                se
              ), nt = Le, R;
          }
          if (Al(K) || Ae(K))
            return D = T.get(D) || null, T = ml(K._debugInfo), R = M(
              R,
              D,
              K,
              se,
              null
            ), nt = T, R;
          if (typeof K.then == "function")
            return Le = ml(K._debugInfo), R = G(
              T,
              R,
              D,
              Ln(K),
              se
            ), nt = Le, R;
          if (K.$$typeof === eu)
            return G(
              T,
              R,
              D,
              Hs(R, K),
              se
            );
          En(R, K);
        }
        return typeof K == "function" && Po(R, K), typeof K == "symbol" && Bs(R, K), null;
      }
      function fe(T, R, D, K) {
        if (typeof D != "object" || D === null) return K;
        switch (D.$$typeof) {
          case _n:
          case dc:
            re(T, R, D);
            var se = D.key;
            if (typeof se != "string") break;
            if (K === null) {
              K = /* @__PURE__ */ new Set(), K.add(se);
              break;
            }
            if (!K.has(se)) {
              K.add(se);
              break;
            }
            he(R, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                se
              );
            });
            break;
          case ia:
            D = $a(D), fe(T, R, D, K);
        }
        return K;
      }
      function me(T, R, D, K) {
        for (var se = null, Le = null, ze = null, Re = R, et = R = 0, nl = null; Re !== null && et < D.length; et++) {
          Re.index > et ? (nl = Re, Re = null) : nl = Re.sibling;
          var Hl = O(
            T,
            Re,
            D[et],
            K
          );
          if (Hl === null) {
            Re === null && (Re = nl);
            break;
          }
          se = fe(
            T,
            Hl,
            D[et],
            se
          ), e && Re && Hl.alternate === null && t(T, Re), R = f(Hl, R, et), ze === null ? Le = Hl : ze.sibling = Hl, ze = Hl, Re = nl;
        }
        if (et === D.length)
          return a(T, Re), ht && Yn(T, et), Le;
        if (Re === null) {
          for (; et < D.length; et++)
            Re = H(T, D[et], K), Re !== null && (se = fe(
              T,
              Re,
              D[et],
              se
            ), R = f(
              Re,
              R,
              et
            ), ze === null ? Le = Re : ze.sibling = Re, ze = Re);
          return ht && Yn(T, et), Le;
        }
        for (Re = i(Re); et < D.length; et++)
          nl = G(
            Re,
            T,
            et,
            D[et],
            K
          ), nl !== null && (se = fe(
            T,
            nl,
            D[et],
            se
          ), e && nl.alternate !== null && Re.delete(
            nl.key === null ? et : nl.key
          ), R = f(
            nl,
            R,
            et
          ), ze === null ? Le = nl : ze.sibling = nl, ze = nl);
        return e && Re.forEach(function(No) {
          return t(T, No);
        }), ht && Yn(T, et), Le;
      }
      function Wt(T, R, D, K) {
        if (D == null)
          throw Error("An iterable object provided no iterator.");
        for (var se = null, Le = null, ze = R, Re = R = 0, et = null, nl = null, Hl = D.next(); ze !== null && !Hl.done; Re++, Hl = D.next()) {
          ze.index > Re ? (et = ze, ze = null) : et = ze.sibling;
          var No = O(T, ze, Hl.value, K);
          if (No === null) {
            ze === null && (ze = et);
            break;
          }
          nl = fe(
            T,
            No,
            Hl.value,
            nl
          ), e && ze && No.alternate === null && t(T, ze), R = f(No, R, Re), Le === null ? se = No : Le.sibling = No, Le = No, ze = et;
        }
        if (Hl.done)
          return a(T, ze), ht && Yn(T, Re), se;
        if (ze === null) {
          for (; !Hl.done; Re++, Hl = D.next())
            ze = H(T, Hl.value, K), ze !== null && (nl = fe(
              T,
              ze,
              Hl.value,
              nl
            ), R = f(
              ze,
              R,
              Re
            ), Le === null ? se = ze : Le.sibling = ze, Le = ze);
          return ht && Yn(T, Re), se;
        }
        for (ze = i(ze); !Hl.done; Re++, Hl = D.next())
          et = G(
            ze,
            T,
            Re,
            Hl.value,
            K
          ), et !== null && (nl = fe(
            T,
            et,
            Hl.value,
            nl
          ), e && et.alternate !== null && ze.delete(
            et.key === null ? Re : et.key
          ), R = f(
            et,
            R,
            Re
          ), Le === null ? se = et : Le.sibling = et, Le = et);
        return e && ze.forEach(function(wT) {
          return t(T, wT);
        }), ht && Yn(T, Re), se;
      }
      function yt(T, R, D, K) {
        if (typeof D == "object" && D !== null && D.type === xf && D.key === null && (ya(D, null, T), D = D.props.children), typeof D == "object" && D !== null) {
          switch (D.$$typeof) {
            case _n:
              var se = ml(D._debugInfo);
              e: {
                for (var Le = D.key; R !== null; ) {
                  if (R.key === Le) {
                    if (Le = D.type, Le === xf) {
                      if (R.tag === 7) {
                        a(
                          T,
                          R.sibling
                        ), K = o(
                          R,
                          D.props.children
                        ), K.return = T, K._debugOwner = D._owner, K._debugInfo = nt, ya(D, K, T), T = K;
                        break e;
                      }
                    } else if (R.elementType === Le || Km(
                      R,
                      D
                    ) || typeof Le == "object" && Le !== null && Le.$$typeof === ia && $a(Le) === R.type) {
                      a(
                        T,
                        R.sibling
                      ), K = o(R, D.props), Ma(K, D), K.return = T, K._debugOwner = D._owner, K._debugInfo = nt, T = K;
                      break e;
                    }
                    a(T, R);
                    break;
                  } else t(T, R);
                  R = R.sibling;
                }
                D.type === xf ? (K = Bc(
                  D.props.children,
                  T.mode,
                  K,
                  D.key
                ), K.return = T, K._debugOwner = T, K._debugTask = T._debugTask, K._debugInfo = nt, ya(D, K, T), T = K) : (K = Gi(
                  D,
                  T.mode,
                  K
                ), Ma(K, D), K.return = T, K._debugInfo = nt, T = K);
              }
              return T = d(T), nt = se, T;
            case dc:
              e: {
                for (se = D, D = se.key; R !== null; ) {
                  if (R.key === D)
                    if (R.tag === 4 && R.stateNode.containerInfo === se.containerInfo && R.stateNode.implementation === se.implementation) {
                      a(
                        T,
                        R.sibling
                      ), K = o(
                        R,
                        se.children || []
                      ), K.return = T, T = K;
                      break e;
                    } else {
                      a(T, R);
                      break;
                    }
                  else t(T, R);
                  R = R.sibling;
                }
                K = _d(
                  se,
                  T.mode,
                  K
                ), K.return = T, T = K;
              }
              return d(T);
            case ia:
              return se = ml(D._debugInfo), D = $a(D), T = yt(
                T,
                R,
                D,
                K
              ), nt = se, T;
          }
          if (Al(D))
            return se = ml(D._debugInfo), T = me(
              T,
              R,
              D,
              K
            ), nt = se, T;
          if (Ae(D)) {
            if (se = ml(D._debugInfo), Le = Ae(D), typeof Le != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var ze = Le.call(D);
            return ze === D ? (T.tag !== 0 || Object.prototype.toString.call(T.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(ze) !== "[object Generator]") && (Eb || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), Eb = !0) : D.entries !== Le || X1 || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), X1 = !0), T = Wt(
              T,
              R,
              ze,
              K
            ), nt = se, T;
          }
          if (typeof D.then == "function")
            return se = ml(D._debugInfo), T = yt(
              T,
              R,
              Ln(D),
              K
            ), nt = se, T;
          if (D.$$typeof === eu)
            return yt(
              T,
              R,
              Hs(T, D),
              K
            );
          En(T, D);
        }
        return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (se = "" + D, R !== null && R.tag === 6 ? (a(
          T,
          R.sibling
        ), K = o(R, se), K.return = T, T = K) : (a(T, R), K = $o(
          se,
          T.mode,
          K
        ), K.return = T, K._debugOwner = T, K._debugTask = T._debugTask, K._debugInfo = nt, T = K), d(T)) : (typeof D == "function" && Po(T, D), typeof D == "symbol" && Bs(T, D), a(T, R));
      }
      return function(T, R, D, K) {
        var se = nt;
        nt = null;
        try {
          eg = 0;
          var Le = yt(
            T,
            R,
            D,
            K
          );
          return sm = null, Le;
        } catch (nl) {
          if (nl === fm || nl === yv) throw nl;
          var ze = A(29, nl, null, T.mode);
          ze.lanes = K, ze.return = T;
          var Re = ze._debugInfo = nt;
          if (ze._debugOwner = T._debugOwner, ze._debugTask = T._debugTask, Re != null) {
            for (var et = Re.length - 1; 0 <= et; et--)
              if (typeof Re[et].stack == "string") {
                ze._debugOwner = Re[et], ze._debugTask = Re[et].debugTask;
                break;
              }
          }
          return ze;
        } finally {
          nt = se;
        }
      };
    }
    function Xt(e, t) {
      var a = Al(e);
      return e = !a && typeof Ae(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function rt(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Su(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function _l(e) {
      return {
        lane: e,
        tag: _b,
        payload: null,
        callback: null,
        next: null
      };
    }
    function bu(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, V1 === i && !Mb) {
        var o = ge(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), Mb = !0;
      }
      return (St & ea) !== sa ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = Ms(e), Jm(e, null, a), t) : (Ko(e, i, t, a), Ms(e));
    }
    function Tn(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, vs(e, a);
      }
    }
    function qs(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function ef() {
      if (Z1) {
        var e = om;
        if (e !== null) throw e;
      }
    }
    function Eu(e, t, a, i) {
      Z1 = !1;
      var o = e.updateQueue;
      ts = !1, V1 = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var y = h, p = y.next;
        y.next = null, d === null ? f = p : d.next = p, d = y;
        var M = e.alternate;
        M !== null && (M = M.updateQueue, h = M.lastBaseUpdate, h !== d && (h === null ? M.firstBaseUpdate = p : h.next = p, M.lastBaseUpdate = y));
      }
      if (f !== null) {
        var H = o.baseState;
        d = 0, M = p = y = null, h = f;
        do {
          var O = h.lane & -536870913, G = O !== h.lane;
          if (G ? (ut & O) === O : (i & O) === O) {
            O !== 0 && O === Lr && (Z1 = !0), M !== null && (M = M.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              O = e;
              var fe = h, me = t, Wt = a;
              switch (fe.tag) {
                case Db:
                  if (fe = fe.payload, typeof fe == "function") {
                    im = !0;
                    var yt = fe.call(
                      Wt,
                      H,
                      me
                    );
                    if (O.mode & Ba) {
                      ve(!0);
                      try {
                        fe.call(Wt, H, me);
                      } finally {
                        ve(!1);
                      }
                    }
                    im = !1, H = yt;
                    break e;
                  }
                  H = fe;
                  break e;
                case Q1:
                  O.flags = O.flags & -65537 | 128;
                case _b:
                  if (yt = fe.payload, typeof yt == "function") {
                    if (im = !0, fe = yt.call(
                      Wt,
                      H,
                      me
                    ), O.mode & Ba) {
                      ve(!0);
                      try {
                        yt.call(Wt, H, me);
                      } finally {
                        ve(!1);
                      }
                    }
                    im = !1;
                  } else fe = yt;
                  if (fe == null) break e;
                  H = lt({}, H, fe);
                  break e;
                case zb:
                  ts = !0;
              }
            }
            O = h.callback, O !== null && (e.flags |= 64, G && (e.flags |= 8192), G = o.callbacks, G === null ? o.callbacks = [O] : G.push(O));
          } else
            G = {
              lane: O,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, M === null ? (p = M = G, y = H) : M = M.next = G, d |= O;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            G = h, h = G.next, G.next = null, o.lastBaseUpdate = G, o.shared.pending = null;
          }
        } while (!0);
        M === null && (y = H), o.baseState = y, o.firstBaseUpdate = p, o.lastBaseUpdate = M, f === null && (o.shared.lanes = 0), ns |= d, e.lanes = d, e.memoizedState = H;
      }
      V1 = null;
    }
    function Zi(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function uy(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          Zi(a[e], t);
    }
    function tf(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          Zi(a[e], t);
    }
    function jd(e, t) {
      var a = bc;
      Xe(gv, a, e), Xe(rm, t, e), bc = a | t.baseLanes;
    }
    function ci(e) {
      Xe(gv, bc, e), Xe(
        rm,
        rm.current,
        e
      );
    }
    function Qn(e) {
      bc = gv.current, Te(rm, e), Te(gv, e);
    }
    function pa(e) {
      var t = e.alternate;
      Xe(
        Ul,
        Ul.current & dm,
        e
      ), Xe(nu, e, e), ku === null && (t === null || rm.current !== null || t.memoizedState !== null) && (ku = e);
    }
    function Vn(e) {
      Xe(Ul, Ul.current, e), Xe(nu, e, e), ku === null && (ku = e);
    }
    function Bd(e) {
      e.tag === 22 ? (Xe(Ul, Ul.current, e), Xe(nu, e, e), ku === null && (ku = e)) : Tu(e);
    }
    function Tu(e) {
      Xe(Ul, Ul.current, e), Xe(
        nu,
        nu.current,
        e
      );
    }
    function ql(e) {
      Te(nu, e), ku === e && (ku = null), Te(Ul, e);
    }
    function Qc(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || Sr(a) || lp(a)))
            return t;
        } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function we() {
      var e = L;
      Fu === null ? Fu = [e] : Fu.push(e);
    }
    function I() {
      var e = L;
      if (Fu !== null && (zo++, Fu[zo] !== e)) {
        var t = ge(Ge);
        if (!Cb.has(t) && (Cb.add(t), Fu !== null)) {
          for (var a = "", i = 0; i <= zo; i++) {
            var o = Fu[i], f = i === zo ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function oi(e) {
      e == null || Al(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        L,
        typeof e
      );
    }
    function Ys() {
      var e = ge(Ge);
      Hb.has(e) || (Hb.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function sl() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function iy(e, t) {
      if (ag) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          L
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        L,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!on(e[a], t[a])) return !1;
      return !0;
    }
    function cy(e, t, a, i, o, f) {
      _o = f, Ge = t, Fu = e !== null ? e._debugHookTypes : null, zo = -1, ag = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = ge(Ge), J1.has(f) || (J1.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, X.H = e !== null && e.memoizedState !== null ? $1 : Fu !== null ? Nb : K1, Jr = f = (t.mode & Ba) !== Be;
      var d = w1(a, i, o);
      if (Jr = !1, mm && (d = ws(
        t,
        a,
        i,
        o
      )), f) {
        ve(!0);
        try {
          d = ws(
            t,
            a,
            i,
            o
          );
        } finally {
          ve(!1);
        }
      }
      return yl(e, t), d;
    }
    function yl(e, t) {
      t._debugHookTypes = Fu, t.dependencies === null ? Do !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Do
      }) : t.dependencies._debugThenableState = Do, X.H = ng;
      var a = Zt !== null && Zt.next !== null;
      if (_o = 0, Fu = L = Vl = Zt = Ge = null, zo = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), Sv = !1, lg = 0, Do = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || Zl || (e = e.dependencies, e !== null && Wo(e) && (Zl = !0)), Pp ? (Pp = !1, e = !0) : e = !1, e && (t = ge(t) || "Unknown", Ub.has(t) || J1.has(t) || (Ub.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function ws(e, t, a, i) {
      Ge = e;
      var o = 0;
      do {
        if (mm && (Do = null), lg = 0, mm = !1, o >= gT)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, ag = !1, Vl = Zt = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        zo = -1, X.H = xb, f = w1(t, a, i);
      } while (mm);
      return f;
    }
    function Gs() {
      var e = X.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Qs(t) : t, e = e.useState()[0], (Zt !== null ? Zt.memoizedState : null) !== e && (Ge.flags |= 1024), t;
    }
    function Vc() {
      var e = bv !== 0;
      return bv = 0, e;
    }
    function Ls(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & Ai) !== Be ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~a;
    }
    function Ji(e) {
      if (Sv) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Sv = !1;
      }
      _o = 0, Fu = Vl = Zt = Ge = null, zo = -1, L = null, mm = !1, lg = bv = 0, Do = null;
    }
    function El() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Vl === null ? Ge.memoizedState = Vl = e : Vl = Vl.next = e, Vl;
    }
    function Mt() {
      if (Zt === null) {
        var e = Ge.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Zt.next;
      var t = Vl === null ? Ge.memoizedState : Vl.next;
      if (t !== null)
        Vl = t, Zt = e;
      else {
        if (e === null)
          throw Ge.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        Zt = e, e = {
          memoizedState: Zt.memoizedState,
          baseState: Zt.baseState,
          baseQueue: Zt.baseQueue,
          queue: Zt.queue,
          next: null
        }, Vl === null ? Ge.memoizedState = Vl = e : Vl = Vl.next = e;
      }
      return Vl;
    }
    function Xs() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Qs(e) {
      var t = lg;
      return lg += 1, Do === null && (Do = Nd()), e = Ka(Do, e, t), t = Ge, (Vl === null ? t.memoizedState : Vl.next) === null && (t = t.alternate, X.H = t !== null && t.memoizedState !== null ? $1 : K1), e;
    }
    function fi(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Qs(e);
        if (e.$$typeof === eu) return Ot(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function ka(e) {
      var t = null, a = Ge.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = Ge.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = Xs(), Ge.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || ag)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = d1;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function Wa(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function lf(e, t, a) {
      var i = El();
      if (a !== void 0) {
        var o = a(t);
        if (Jr) {
          ve(!0);
          try {
            a(t);
          } finally {
            ve(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = c1.bind(
        null,
        Ge,
        e
      ), [i.memoizedState, e];
    }
    function Zc(e) {
      var t = Mt();
      return Ki(t, Zt, e);
    }
    function Ki(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
      var o = e.baseQueue, f = i.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        t.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = o = f, i.pending = null;
      }
      if (f = e.baseState, o === null) e.memoizedState = f;
      else {
        t = o.next;
        var h = d = null, y = null, p = t, M = !1;
        do {
          var H = p.lane & -536870913;
          if (H !== p.lane ? (ut & H) === H : (_o & H) === H) {
            var O = p.revertLane;
            if (O === 0)
              y !== null && (y = y.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }), H === Lr && (M = !0);
            else if ((_o & O) === O) {
              p = p.next, O === Lr && (M = !0);
              continue;
            } else
              H = {
                lane: 0,
                revertLane: p.revertLane,
                gesture: null,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }, y === null ? (h = y = H, d = f) : y = y.next = H, Ge.lanes |= O, ns |= O;
            H = p.action, Jr && a(f, H), f = p.hasEagerState ? p.eagerState : a(f, H);
          } else
            O = {
              lane: H,
              revertLane: p.revertLane,
              gesture: p.gesture,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, y === null ? (h = y = O, d = f) : y = y.next = O, Ge.lanes |= H, ns |= H;
          p = p.next;
        } while (p !== null && p !== t);
        if (y === null ? d = f : y.next = h, !on(f, e.memoizedState) && (Zl = !0, M && (a = om, a !== null)))
          throw a;
        e.memoizedState = f, e.baseState = d, e.baseQueue = y, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function Jc(e) {
      var t = Mt(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, o = a.pending, f = t.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        on(f, t.memoizedState) || (Zl = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), a.lastRenderedState = f;
      }
      return [f, i];
    }
    function af(e, t, a) {
      var i = Ge, o = El();
      if (ht) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        hm || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), hm = !0);
      } else {
        if (f = t(), hm || (a = t(), on(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), hm = !0)), Jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (ut & 127) !== 0 || oy(i, t, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: t }, o.queue = a, kc(
        $i.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, Au(
        Wu | rn,
        { destroy: void 0 },
        fy.bind(
          null,
          i,
          a,
          f,
          t
        ),
        null
      ), f;
    }
    function Kc(e, t, a) {
      var i = Ge, o = Mt(), f = ht;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !hm) {
        var d = t();
        on(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), hm = !0);
      }
      (d = !on(
        (Zt || o).memoizedState,
        a
      )) && (o.memoizedState = a, Zl = !0), o = o.queue;
      var h = $i.bind(null, i, o, e);
      if (Dl(2048, rn, h, [e]), o.getSnapshot !== t || d || Vl !== null && Vl.memoizedState.tag & Wu) {
        if (i.flags |= 2048, Au(
          Wu | rn,
          { destroy: void 0 },
          fy.bind(
            null,
            i,
            o,
            a,
            t
          ),
          null
        ), Jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (_o & 127) !== 0 || oy(i, t, a);
      }
      return a;
    }
    function oy(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ge.updateQueue, t === null ? (t = Xs(), Ge.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function fy(e, t, a, i) {
      t.value = a, t.getSnapshot = i, ki(t) && sy(e);
    }
    function $i(e, t, a) {
      return a(function() {
        ki(t) && (gu(2, "updateSyncExternalStore()", e), sy(e));
      });
    }
    function ki(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !on(e, a);
      } catch {
        return !0;
      }
    }
    function sy(e) {
      var t = aa(e, 2);
      t !== null && qe(t, e, 2);
    }
    function qd(e) {
      var t = El();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Jr) {
          ve(!0);
          try {
            a();
          } finally {
            ve(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wa,
        lastRenderedState: e
      }, t;
    }
    function Wi(e) {
      e = qd(e);
      var t = e.queue, a = Qd.bind(null, Ge, t);
      return t.dispatch = a, [e.memoizedState, a];
    }
    function $c(e) {
      var t = El();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Ws.bind(
        null,
        Ge,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function Vs(e, t) {
      var a = Mt();
      return nf(a, Zt, e, t);
    }
    function nf(e, t, a, i) {
      return e.baseState = a, Ki(
        e,
        Zt,
        typeof i == "function" ? i : Wa
      );
    }
    function Zs(e, t) {
      var a = Mt();
      return Zt !== null ? nf(a, Zt, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function $g(e, t, a, i, o) {
      if (Yl(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var f = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        X.T !== null ? a(!0) : f.isTransition = !1, i(f), a = t.pending, a === null ? (f.next = t.pending = f, Fi(t, f)) : (f.next = a.next, t.pending = a.next = f);
      }
    }
    function Fi(e, t) {
      var a = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = X.T, d = {};
        d._updatedFibers = /* @__PURE__ */ new Set(), X.T = d;
        try {
          var h = a(o, i), y = X.S;
          y !== null && y(d, h), ry(e, t, h);
        } catch (p) {
          Js(e, t, p);
        } finally {
          f !== null && d.types !== null && (f.types !== null && f.types !== d.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), f.types = d.types), X.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, i), ry(e, t, d);
        } catch (p) {
          Js(e, t, p);
        }
    }
    function ry(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (X.asyncTransitions++, a.then(Wc, Wc), a.then(
        function(i) {
          si(e, t, i);
        },
        function(i) {
          return Js(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : si(e, t, a);
    }
    function si(e, t, a) {
      t.status = "fulfilled", t.value = a, Yd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Fi(e, a)));
    }
    function Js(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, Yd(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function Yd(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function ri(e, t) {
      return t;
    }
    function Fa(e, t) {
      if (ht) {
        var a = Jt.formState;
        if (a !== null) {
          e: {
            var i = Ge;
            if (ht) {
              if (al) {
                t: {
                  for (var o = al, f = Ku; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = an(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === gS || f === SE ? o : null;
                }
                if (o) {
                  al = an(
                    o.nextSibling
                  ), i = o.data === gS;
                  break e;
                }
              }
              gn(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = El(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ri,
        lastRenderedState: t
      }, a.queue = i, a = Qd.bind(
        null,
        Ge,
        i
      ), i.dispatch = a, i = qd(!1), f = Ws.bind(
        null,
        Ge,
        !1,
        i.queue
      ), i = El(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, a = $g.bind(
        null,
        Ge,
        o,
        f,
        a
      ), o.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function Ii(e) {
      var t = Mt();
      return wd(t, Zt, e);
    }
    function wd(e, t, a) {
      if (t = Ki(
        e,
        t,
        ri
      )[0], e = Zc(Wa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = Qs(t);
        } catch (d) {
          throw d === fm ? yv : d;
        }
      else i = t;
      t = Mt();
      var o = t.queue, f = o.dispatch;
      return a !== t.memoizedState && (Ge.flags |= 2048, Au(
        Wu | rn,
        { destroy: void 0 },
        dy.bind(null, o, a),
        null
      )), [i, f, e];
    }
    function dy(e, t) {
      e.action = t;
    }
    function Pi(e) {
      var t = Mt(), a = Zt;
      if (a !== null)
        return wd(t, a, e);
      Mt(), t = t.memoizedState, a = Mt();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function Au(e, t, a, i) {
      return e = { tag: e, create: a, deps: i, inst: t, next: null }, t = Ge.updateQueue, t === null && (t = Xs(), Ge.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function Gd(e) {
      var t = El();
      return e = { current: e }, t.memoizedState = e;
    }
    function ec(e, t, a, i) {
      var o = El();
      Ge.flags |= e, o.memoizedState = Au(
        Wu | t,
        { destroy: void 0 },
        a,
        i === void 0 ? null : i
      );
    }
    function Dl(e, t, a, i) {
      var o = Mt();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      Zt !== null && i !== null && iy(i, Zt.memoizedState.deps) ? o.memoizedState = Au(t, f, a, i) : (Ge.flags |= e, o.memoizedState = Au(
        Wu | t,
        f,
        a,
        i
      ));
    }
    function kc(e, t) {
      (Ge.mode & Ai) !== Be ? ec(276826112, rn, e, t) : ec(8390656, rn, e, t);
    }
    function kg(e) {
      Ge.flags |= 4;
      var t = Ge.updateQueue;
      if (t === null)
        t = Xs(), Ge.updateQueue = t, t.events = [e];
      else {
        var a = t.events;
        a === null ? t.events = [e] : a.push(e);
      }
    }
    function Ks(e) {
      var t = El(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((St & ea) !== sa)
          throw Error(
            "A function wrapped in useEffectEvent can't be called during rendering."
          );
        return a.impl.apply(void 0, arguments);
      };
    }
    function uf(e) {
      var t = Mt().memoizedState;
      return kg({ ref: t, nextImpl: e }), function() {
        if ((St & ea) !== sa)
          throw Error(
            "A function wrapped in useEffectEvent can't be called during rendering."
          );
        return t.impl.apply(void 0, arguments);
      };
    }
    function ga(e, t) {
      var a = 4194308;
      return (Ge.mode & Ai) !== Be && (a |= 134217728), ec(a, uu, e, t);
    }
    function Ia(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function Ou(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (Ge.mode & Ai) !== Be && (i |= 134217728), ec(
        i,
        uu,
        Ia.bind(null, t, e),
        a
      );
    }
    function cf(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, Dl(
        4,
        uu,
        Ia.bind(null, t, e),
        a
      );
    }
    function Ld(e, t) {
      return El().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function Zn(e, t) {
      var a = Mt();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && iy(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function va(e, t) {
      var a = El();
      t = t === void 0 ? null : t;
      var i = e();
      if (Jr) {
        ve(!0);
        try {
          e();
        } finally {
          ve(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function Pt(e, t) {
      var a = Mt();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && iy(t, i[1]))
        return i[0];
      if (i = e(), Jr) {
        ve(!0);
        try {
          e();
        } finally {
          ve(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function of(e, t) {
      var a = El();
      return Ct(a, e, t);
    }
    function Ru(e, t) {
      var a = Mt();
      return pl(
        a,
        Zt.memoizedState,
        e,
        t
      );
    }
    function ke(e, t) {
      var a = Mt();
      return Zt === null ? Ct(a, e, t) : pl(
        a,
        Zt.memoizedState,
        e,
        t
      );
    }
    function Ct(e, t, a) {
      return a === void 0 || (_o & 1073741824) !== 0 && (ut & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = pf(), Ge.lanes |= e, ns |= e, a);
    }
    function pl(e, t, a, i) {
      return on(a, t) ? a : rm.current !== null ? (e = Ct(e, a, i), on(e, t) || (Zl = !0), e) : (_o & 42) === 0 || (_o & 1073741824) !== 0 && (ut & 261930) === 0 ? (Zl = !0, e.memoizedState = a) : (e = pf(), Ge.lanes |= e, ns |= e, t);
    }
    function Wc() {
      X.asyncTransitions--;
    }
    function Fc(e, t, a, i, o) {
      var f = _t.p;
      _t.p = f !== 0 && f < Il ? f : Il;
      var d = X.T, h = {};
      h._updatedFibers = /* @__PURE__ */ new Set(), X.T = h, Ws(e, !1, t, a);
      try {
        var y = o(), p = X.S;
        if (p !== null && p(h, y), y !== null && typeof y == "object" && typeof y.then == "function") {
          X.asyncTransitions++, y.then(Wc, Wc);
          var M = Hd(
            y,
            i
          );
          Ic(
            e,
            t,
            M,
            ua(e)
          );
        } else
          Ic(
            e,
            t,
            i,
            ua(e)
          );
      } catch (H) {
        Ic(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: H },
          ua(e)
        );
      } finally {
        _t.p = f, d !== null && h.types !== null && (d.types !== null && d.types !== h.types && console.error(
          "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
        ), d.types = h.types), X.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function di(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = $s(e).queue;
      Jg(e), Fc(
        e,
        o,
        t,
        ad,
        a === null ? V : function() {
          return ff(e), a(i);
        }
      );
    }
    function $s(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ad,
        baseState: ad,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Wa,
          lastRenderedState: ad
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Wa,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function ff(e) {
      X.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = $s(e);
      t.next === null && (t = e.alternate.memoizedState), Ic(
        e,
        t.next.queue,
        {},
        ua(e)
      );
    }
    function tc() {
      var e = qd(!1);
      return e = Fc.bind(
        null,
        Ge,
        e.queue,
        !0,
        !1
      ), El().memoizedState = e, [!1, e];
    }
    function Wg() {
      var e = Zc(Wa)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Qs(e),
        t
      ];
    }
    function ul() {
      var e = Jc(Wa)[0], t = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Qs(e),
        t
      ];
    }
    function hi() {
      return Ot(Sg);
    }
    function ks() {
      var e = El(), t = Jt.identifierPrefix;
      if (ht) {
        var a = Eo, i = bo;
        a = (i & ~(1 << 32 - Fl(i) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = bv++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = pT++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    }
    function Xd() {
      return El().memoizedState = Fg.bind(
        null,
        Ge
      );
    }
    function Fg(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = ua(a), o = _l(i), f = bu(a, o, i);
            f !== null && (gu(i, "refresh()", e), qe(f, a, i), Tn(f, a, i)), e = Cd(), t != null && f !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), o.payload = { cache: e };
            return;
        }
        a = a.return;
      }
    }
    function c1(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = ua(e);
      var o = {
        lane: i,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      Yl(e) ? rl(t, o) : (o = Nc(e, t, o, i), o !== null && (gu(i, "dispatch()", e), qe(o, e, i), Fs(o, t, i)));
    }
    function Qd(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = ua(e), Ic(e, t, a, i) && gu(i, "setState()", e);
    }
    function Ic(e, t, a, i) {
      var o = {
        lane: i,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Yl(e)) rl(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = X.H;
          X.H = Ri;
          try {
            var h = t.lastRenderedState, y = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = y, on(y, h))
              return Ko(e, t, o, 0), Jt === null && Od(), !1;
          } catch {
          } finally {
            X.H = d;
          }
        }
        if (a = Nc(e, t, o, i), a !== null)
          return qe(a, e, i), Fs(a, t, i), !0;
      }
      return !1;
    }
    function Ws(e, t, a, i) {
      if (X.T === null && Lr === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: Py(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Yl(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = Nc(
          e,
          a,
          i,
          2
        ), t !== null && (gu(2, "setOptimistic()", e), qe(t, e, 2));
    }
    function Yl(e) {
      var t = e.alternate;
      return e === Ge || t !== null && t === Ge;
    }
    function rl(e, t) {
      mm = Sv = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Fs(e, t, a) {
      if ((a & 4194048) !== 0) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, vs(e, a);
      }
    }
    function Pc(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        Zb.has(t) || (Zb.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function sf(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      if (e.mode & Ba) {
        ve(!0);
        try {
          f = a(i, o);
        } finally {
          ve(!1);
        }
      }
      f === void 0 && (t = Ye(t) || "Component", Lb.has(t) || (Lb.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : lt({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function Vd(e, t, a, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & Ba) {
          ve(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            ve(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Ye(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Jo(a, i) || !Jo(o, f) : !0;
    }
    function _u(e, t, a, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o && (e = ge(e) || "Component", Bb.has(e) || (Bb.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), k1.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function Du(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = lt({}, a));
        for (var o in e)
          a[o] === void 0 && (a[o] = e[o]);
      }
      return a;
    }
    function Zd(e) {
      _1(e), console.warn(
        `%s

%s
`,
        ym ? "An error occurred in the <" + ym + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function Jd(e) {
      var t = ym ? "The above error occurred in the <" + ym + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((W1 || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          a
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          DE + " " + e[0],
          zE,
          Zv + i + Zv,
          ME
        ) : e.splice(
          0,
          0,
          DE,
          zE,
          Zv + i + Zv,
          ME
        ), e.unshift(console), i = qT.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          a
        );
    }
    function hy(e) {
      _1(e);
    }
    function Is(e, t) {
      try {
        ym = t.source ? ge(t.source) : null, W1 = null;
        var a = t.value;
        if (X.actQueue !== null)
          X.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function my(e, t, a) {
      try {
        ym = a.source ? ge(a.source) : null, W1 = ge(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function Kd(e, t, a) {
      return a = _l(a), a.tag = Q1, a.payload = { element: null }, a.callback = function() {
        he(t.source, Is, e, t);
      }, a;
    }
    function $d(e) {
      return e = _l(e), e.tag = Q1, e;
    }
    function kd(e, t, a, i) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          xc(a), he(
            i.source,
            my,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        xc(a), he(
          i.source,
          my,
          t,
          a,
          i
        ), typeof o != "function" && (is === null ? is = /* @__PURE__ */ new Set([this]) : is.add(this)), dT(this, i), typeof o == "function" || (a.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          ge(a) || "Unknown"
        );
      });
    }
    function yy(e, t, a, i, o) {
      if (a.flags |= 32768, Gu && Ef(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && Gn(
          t,
          a,
          o,
          !0
        ), ht && (gc = !0), a = nu.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return ku === null ? vf() : a.alternate === null && hl === Co && (hl = Av), a.flags &= -257, a.flags |= 65536, a.lanes = o, i === pv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), yh(e, i, o)), !1;
            case 22:
              return a.flags |= 65536, i === pv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), yh(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return yh(e, i, o), vf(), !1;
      }
      if (ht)
        return gc = !0, t = nu.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== H1 && Us(
          da(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== H1 && Us(
          da(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = da(i, a), o = Kd(
          e.stateNode,
          i,
          o
        ), qs(e, o), hl !== ls && (hl = Kr)), !1;
      var f = da(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (sg === null ? sg = [f] : sg.push(f), hl !== ls && (hl = Kr), t === null) return !0;
      i = da(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = o & -o, a.lanes |= e, e = Kd(
              a.stateNode,
              i,
              e
            ), qs(a, e), !1;
          case 1:
            if (t = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (is === null || !is.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = $d(o), kd(
                o,
                e,
                a,
                i
              ), qs(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function wl(e, t, a, i) {
      t.child = e === null ? Rb(t, null, a, i) : Zr(
        t,
        e.child,
        a,
        i
      );
    }
    function Ig(e, t, a, i, o) {
      a = a.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return Vi(t), i = cy(
        e,
        t,
        a,
        d,
        f,
        o
      ), h = Vc(), e !== null && !Zl ? (Ls(e, t, o), Jn(e, t, o)) : (ht && h && Dd(t), t.flags |= 1, wl(e, t, i, o), t.child);
    }
    function py(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        return typeof f == "function" && !$m(f) && f.defaultProps === void 0 && a.compare === null ? (a = wi(f), t.tag = 15, t.type = a, rf(t, f), gy(
          e,
          t,
          a,
          i,
          o
        )) : (e = jc(
          a.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !eh(e, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Jo, a(d, i) && e.ref === t.ref)
          return Jn(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = pu(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function gy(e, t, a, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (Jo(f, i) && e.ref === t.ref && t.type === e.type)
          if (Zl = !1, t.pendingProps = i = f, eh(e, o))
            (e.flags & 131072) !== 0 && (Zl = !0);
          else
            return t.lanes = e.lanes, Jn(e, t, o);
      }
      return Ey(
        e,
        t,
        a,
        i,
        o
      );
    }
    function vy(e, t, a, i) {
      var o = i.children, f = e !== null ? e.memoizedState : null;
      if (e === null && t.stateNode === null && (t.stateNode = {
        _visibility: wp,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), i.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (f = f !== null ? f.baseLanes | a : a, e !== null) {
            for (i = t.child = e.child, o = 0; i !== null; )
              o = o | i.lanes | i.childLanes, i = i.sibling;
            i = o & ~f;
          } else i = 0, t.child = null;
          return Sy(
            e,
            t,
            f,
            a,
            i
          );
        }
        if ((a & 536870912) !== 0)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Io(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? jd(t, f) : ci(t), Bd(t);
        else
          return i = t.lanes = 536870912, Sy(
            e,
            t,
            f !== null ? f.baseLanes | a : a,
            a,
            i
          );
      } else
        f !== null ? (Io(t, f.cachePool), jd(t, f), Tu(t), t.memoizedState = null) : (e !== null && Io(t, null), ci(t), Tu(t));
      return wl(e, t, o, a), t.child;
    }
    function eo(e, t) {
      return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: wp,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling;
    }
    function Sy(e, t, a, i, o) {
      var f = ii();
      return f = f === null ? null : {
        parent: Xl._currentValue,
        pool: f
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: f
      }, e !== null && Io(t, null), ci(t), Bd(t), e !== null && Gn(e, t, i, !0), t.childLanes = o, null;
    }
    function Ps(e, t) {
      var a = t.hidden;
      return a !== void 0 && console.error(
        `<Activity> doesn't accept a hidden prop. Use mode="hidden" instead.
- <Activity %s>
+ <Activity %s>`,
        a === !0 ? "hidden" : a === !1 ? "hidden={false}" : "hidden={...}",
        a ? 'mode="hidden"' : 'mode="visible"'
      ), t = tr(
        { mode: t.mode, children: t.children },
        e.mode
      ), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function by(e, t, a) {
      return Zr(t, e.child, null, a), e = Ps(
        t,
        t.pendingProps
      ), e.flags |= 2, ql(t), t.memoizedState = null, e;
    }
    function Pg(e, t, a) {
      var i = t.pendingProps, o = (t.flags & 128) !== 0;
      if (t.flags &= -129, e === null) {
        if (ht) {
          if (i.mode === "hidden")
            return e = Ps(t, i), t.lanes = 536870912, eo(null, e);
          if (Vn(t), (e = al) ? (a = Ht(
            e,
            Ku
          ), a = a !== null && a.data === Pr ? a : null, a !== null && (i = {
            dehydrated: a,
            treeContext: Qg(),
            retryLane: 536870912,
            hydrationErrors: null
          }, t.memoizedState = i, i = Wm(a), i.return = t, t.child = i, Da = t, al = null)) : a = null, a === null)
            throw na(t, e), gn(t);
          return t.lanes = 536870912, null;
        }
        return Ps(t, i);
      }
      var f = e.memoizedState;
      if (f !== null) {
        var d = f.dehydrated;
        if (Vn(t), o)
          if (t.flags & 256)
            t.flags &= -257, t = by(
              e,
              t,
              a
            );
          else if (t.memoizedState !== null)
            t.child = e.child, t.flags |= 128, t = null;
          else
            throw Error(
              "Client rendering an Activity suspended it again. This is a bug in React."
            );
        else if (Zg(), (a & 536870912) !== 0 && gf(t), Zl || Gn(
          e,
          t,
          a,
          !1
        ), o = (a & e.childLanes) !== 0, Zl || o) {
          if (i = Jt, i !== null && (d = Oc(
            i,
            a
          ), d !== 0 && d !== f.retryLane))
            throw f.retryLane = d, aa(e, d), qe(i, e, d), F1;
          vf(), t = by(
            e,
            t,
            a
          );
        } else
          e = f.treeContext, al = an(
            d.nextSibling
          ), Da = t, ht = !0, Wf = null, gc = !1, au = null, Ku = !1, e !== null && Vg(t, e), t = Ps(t, i), t.flags |= 4096;
        return t;
      }
      return f = e.child, i = { mode: i.mode, children: i.children }, (a & 536870912) !== 0 && (a & e.lanes) !== 0 && gf(t), e = pu(f, i), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function er(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function Ey(e, t, a, i, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = Ye(a) || "Unknown";
        Jb[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), Jb[f] = !0);
      }
      return t.mode & Ba && Oi.recordLegacyContextWarning(
        t,
        null
      ), e === null && (rf(t, t.type), a.contextTypes && (f = Ye(a) || "Unknown", $b[f] || ($b[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), Vi(t), a = cy(
        e,
        t,
        a,
        i,
        void 0,
        o
      ), i = Vc(), e !== null && !Zl ? (Ls(e, t, o), Jn(e, t, o)) : (ht && i && Dd(t), t.flags |= 1, wl(e, t, a, o), t.child);
    }
    function Ty(e, t, a, i, o, f) {
      return Vi(t), zo = -1, ag = e !== null && e.type !== t.type, t.updateQueue = null, a = ws(
        t,
        i,
        a,
        o
      ), yl(e, t), i = Vc(), e !== null && !Zl ? (Ls(e, t, f), Jn(e, t, f)) : (ht && i && Dd(t), t.flags |= 1, wl(e, t, a, f), t.child);
    }
    function to(e, t, a, i, o) {
      switch (ye(t)) {
        case !1:
          var f = t.stateNode, d = new t.type(
            t.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (t.lanes |= h, d = Jt, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = $d(h), kd(
            h,
            d,
            t,
            da(f, t)
          ), qs(t, h);
      }
      if (Vi(t), t.stateNode === null) {
        if (d = kf, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== eu) && !Vb.has(a) && (Vb.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === qh ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Ye(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = Ot(f)), f = new a(i, d), t.mode & Ba) {
          ve(!0);
          try {
            f = new a(i, d);
          } finally {
            ve(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = k1, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = jb, typeof a.getDerivedStateFromProps == "function" && d === null && (d = Ye(a) || "Component", qb.has(d) || (qb.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var y = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? y = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (y = "UNSAFE_componentWillUpdate"), d !== null || h !== null || y !== null) {
            f = Ye(a) || "Component";
            var p = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            wb.has(f) || (wb.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              p,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              y !== null ? `
  ` + y : ""
            ));
          }
        }
        f = t.stateNode, d = Ye(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !Qb.has(a) && (Qb.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !Xb.has(a) && (Xb.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Ye(a) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== i, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || Yb.has(a) || (Yb.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Ye(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || Al(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, rt(t), d = a.contextType, f.context = typeof d == "object" && d !== null ? Ot(d) : kf, f.state === i && (d = Ye(a) || "Component", Gb.has(d) || (Gb.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & Ba && Oi.recordLegacyContextWarning(
          t,
          f
        ), Oi.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (sf(
          t,
          a,
          d,
          i
        ), f.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          ge(t) || "Component"
        ), k1.enqueueReplaceState(
          f,
          f.state,
          null
        )), Eu(t, i, f, o), ef(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ai) !== Be && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var M = t.memoizedProps;
        h = Du(a, M), f.props = h;
        var H = f.context;
        y = a.contextType, d = kf, typeof y == "object" && y !== null && (d = Ot(y)), p = a.getDerivedStateFromProps, y = typeof p == "function" || typeof f.getSnapshotBeforeUpdate == "function", M = t.pendingProps !== M, y || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (M || H !== d) && _u(
          t,
          f,
          i,
          d
        ), ts = !1;
        var O = t.memoizedState;
        f.state = O, Eu(t, i, f, o), ef(), H = t.memoizedState, M || O !== H || ts ? (typeof p == "function" && (sf(
          t,
          a,
          p,
          i
        ), H = t.memoizedState), (h = ts || Vd(
          t,
          a,
          h,
          i,
          O,
          H,
          d
        )) ? (y || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ai) !== Be && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ai) !== Be && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = H), f.props = i, f.state = H, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ai) !== Be && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, Su(e, t), d = t.memoizedProps, y = Du(a, d), f.props = y, p = t.pendingProps, O = f.context, H = a.contextType, h = kf, typeof H == "object" && H !== null && (h = Ot(H)), M = a.getDerivedStateFromProps, (H = typeof M == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== p || O !== h) && _u(
          t,
          f,
          i,
          h
        ), ts = !1, O = t.memoizedState, f.state = O, Eu(t, i, f, o), ef();
        var G = t.memoizedState;
        d !== p || O !== G || ts || e !== null && e.dependencies !== null && Wo(e.dependencies) ? (typeof M == "function" && (sf(
          t,
          a,
          M,
          i
        ), G = t.memoizedState), (y = ts || Vd(
          t,
          a,
          y,
          i,
          O,
          G,
          h
        ) || e !== null && e.dependencies !== null && Wo(e.dependencies)) ? (H || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, G, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          G,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = G), f.props = i, f.state = G, f.context = h, f = y) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, er(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, Ci(t), d && typeof a.getDerivedStateFromError != "function")
          a = null, fn = -1;
        else if (a = rb(h), t.mode & Ba) {
          ve(!0);
          try {
            rb(h);
          } finally {
            ve(!1);
          }
        }
        t.flags |= 1, e !== null && d ? (t.child = Zr(
          t,
          e.child,
          null,
          o
        ), t.child = Zr(
          t,
          null,
          a,
          o
        )) : wl(e, t, a, o), t.memoizedState = h.state, e = t.child;
      } else
        e = Jn(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (pm || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        ge(t) || "a component"
      ), pm = !0), e;
    }
    function Ay(e, t, a, i) {
      return Xi(), t.flags |= 256, wl(e, t, a, i), t.child;
    }
    function rf(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = Ye(t) || "Unknown", kb[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), kb[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = Ye(t) || "Unknown", Kb[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), Kb[t] = !0));
    }
    function df(e) {
      return { baseLanes: e, cachePool: ly() };
    }
    function Wd(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Cn), e;
    }
    function Fd(e, t, a) {
      var i, o = t.pendingProps;
      ce(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (Ul.current & tg) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (ht) {
          if (f ? pa(t) : Tu(t), (e = al) ? (a = Ht(
            e,
            Ku
          ), a = a !== null && a.data !== Pr ? a : null, a !== null && (i = {
            dehydrated: a,
            treeContext: Qg(),
            retryLane: 536870912,
            hydrationErrors: null
          }, t.memoizedState = i, i = Wm(a), i.return = t, t.child = i, Da = t, al = null)) : a = null, a === null)
            throw na(t, e), gn(t);
          return lp(a) ? t.lanes = 32 : t.lanes = 536870912, null;
        }
        var h = o.children;
        if (o = o.fallback, f) {
          Tu(t);
          var y = t.mode;
          return h = tr(
            { mode: "hidden", children: h },
            y
          ), o = Bc(
            o,
            y,
            a,
            null
          ), h.return = t, o.return = t, h.sibling = o, t.child = h, o = t.child, o.memoizedState = df(a), o.childLanes = Wd(
            e,
            i,
            a
          ), t.memoizedState = I1, eo(
            null,
            o
          );
        }
        return pa(t), Oy(
          t,
          h
        );
      }
      var p = e.memoizedState;
      if (p !== null) {
        var M = p.dehydrated;
        if (M !== null) {
          if (d)
            t.flags & 256 ? (pa(t), t.flags &= -257, t = Id(
              e,
              t,
              a
            )) : t.memoizedState !== null ? (Tu(t), t.child = e.child, t.flags |= 128, t = null) : (Tu(t), h = o.fallback, y = t.mode, o = tr(
              {
                mode: "visible",
                children: o.children
              },
              y
            ), h = Bc(
              h,
              y,
              a,
              null
            ), h.flags |= 2, o.return = t, h.return = t, o.sibling = h, t.child = o, Zr(
              t,
              e.child,
              null,
              a
            ), o = t.child, o.memoizedState = df(a), o.childLanes = Wd(
              e,
              i,
              a
            ), t.memoizedState = I1, t = eo(
              null,
              o
            ));
          else if (pa(t), Zg(), (a & 536870912) !== 0 && gf(t), lp(
            M
          )) {
            if (i = M.nextSibling && M.nextSibling.dataset, i) {
              h = i.dgst;
              var H = i.msg;
              y = i.stck;
              var O = i.cstck;
            }
            f = H, i = h, o = y, M = O, h = f, y = M, h = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), h.stack = o || "", h.digest = i, i = y === void 0 ? null : y, o = {
              value: h,
              source: null,
              stack: i
            }, typeof i == "string" && U1.set(
              h,
              o
            ), Us(o), t = Id(
              e,
              t,
              a
            );
          } else if (Zl || Gn(
            e,
            t,
            a,
            !1
          ), i = (a & e.childLanes) !== 0, Zl || i) {
            if (i = Jt, i !== null && (o = Oc(
              i,
              a
            ), o !== 0 && o !== p.retryLane))
              throw p.retryLane = o, aa(
                e,
                o
              ), qe(
                i,
                e,
                o
              ), F1;
            Sr(
              M
            ) || vf(), t = Id(
              e,
              t,
              a
            );
          } else
            Sr(
              M
            ) ? (t.flags |= 192, t.child = e.child, t = null) : (e = p.treeContext, al = an(
              M.nextSibling
            ), Da = t, ht = !0, Wf = null, gc = !1, au = null, Ku = !1, e !== null && Vg(t, e), t = Oy(
              t,
              o.children
            ), t.flags |= 4096);
          return t;
        }
      }
      return f ? (Tu(t), h = o.fallback, y = t.mode, O = e.child, M = O.sibling, o = pu(
        O,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = O.subtreeFlags & 65011712, M !== null ? h = pu(
        M,
        h
      ) : (h = Bc(
        h,
        y,
        a,
        null
      ), h.flags |= 2), h.return = t, o.return = t, o.sibling = h, t.child = o, eo(null, o), o = t.child, h = e.child.memoizedState, h === null ? h = df(a) : (y = h.cachePool, y !== null ? (O = Xl._currentValue, y = y.parent !== O ? { parent: O, pool: O } : y) : y = ly(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: y
      }), o.memoizedState = h, o.childLanes = Wd(
        e,
        i,
        a
      ), t.memoizedState = I1, eo(
        e.child,
        o
      )) : (p !== null && (a & 62914560) === a && (a & e.lanes) !== 0 && gf(t), pa(t), a = e.child, e = a.sibling, a = pu(a, {
        mode: "visible",
        children: o.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function Oy(e, t) {
      return t = tr(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function tr(e, t) {
      return e = A(22, e, null, t), e.lanes = 0, e;
    }
    function Id(e, t, a) {
      return Zr(t, e.child, null, a), e = Oy(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function Ry(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Md(
        e.return,
        t,
        a
      );
    }
    function Pd(e, t, a, i, o, f) {
      var d = e.memoizedState;
      d === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o,
        treeForkCount: f
      } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = i, d.tail = a, d.tailMode = o, d.treeForkCount = f);
    }
    function _y(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail, d = i.children, h = Ul.current;
      if ((i = (h & tg) !== 0) ? (h = h & dm | tg, t.flags |= 128) : h &= dm, Xe(Ul, h, t), h = o ?? "null", o !== "forwards" && o !== "unstable_legacy-backwards" && o !== "together" && o !== "independent" && !Wb[h])
        if (Wb[h] = !0, o == null)
          console.error(
            'The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".'
          );
        else if (o === "backwards")
          console.error(
            'The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.'
          );
        else if (typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
            case "independent":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',
            o
          );
      h = f ?? "null", Tv[h] || (f == null ? (o === "forwards" || o === "backwards" || o === "unstable_legacy-backwards") && (Tv[h] = !0, console.error(
        'The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".'
      )) : f !== "visible" && f !== "collapsed" && f !== "hidden" ? (Tv[h] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && o !== "unstable_legacy-backwards" && (Tv[h] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards" || o === "unstable_legacy-backwards") && d !== void 0 && d !== null && d !== !1)
        if (Al(d)) {
          for (h = 0; h < d.length; h++)
            if (!Xt(
              d[h],
              h
            ))
              break e;
        } else if (h = Ae(d), typeof h == "function") {
          if (h = h.call(d))
            for (var y = h.next(), p = 0; !y.done; y = h.next()) {
              if (!Xt(y.value, p)) break e;
              p++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (wl(e, t, d, a), ht ? (Li(), d = Gp) : d = 0, !i && e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && Ry(e, a, t);
          else if (e.tag === 19)
            Ry(e, a, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      switch (o) {
        case "forwards":
          for (a = t.child, o = null; a !== null; )
            e = a.alternate, e !== null && Qc(e) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = t.child, t.child = null) : (o = a.sibling, a.sibling = null), Pd(
            t,
            !1,
            o,
            a,
            f,
            d
          );
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && Qc(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = a, a = o, o = e;
          }
          Pd(
            t,
            !0,
            a,
            null,
            f,
            d
          );
          break;
        case "together":
          Pd(
            t,
            !1,
            null,
            null,
            void 0,
            d
          );
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Jn(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), fn = -1, ns |= t.lanes, (a & t.childLanes) === 0)
        if (e !== null) {
          if (Gn(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = pu(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = pu(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function eh(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Wo(e)));
    }
    function e0(e, t, a) {
      switch (t.tag) {
        case 3:
          Lt(
            t,
            t.stateNode.containerInfo
          ), vn(
            t,
            Xl,
            e.memoizedState.cache
          ), Xi();
          break;
        case 27:
        case 5:
          ie(t);
          break;
        case 4:
          Lt(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          vn(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          (a & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 31:
          if (t.memoizedState !== null)
            return t.flags |= 128, Vn(t), null;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (pa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Fd(
              e,
              t,
              a
            ) : (pa(t), e = Jn(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          pa(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (Gn(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), o) {
            if (i)
              return _y(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Xe(
            Ul,
            Ul.current,
            t
          ), i) break;
          return null;
        case 22:
          return t.lanes = 0, vy(
            e,
            t,
            a,
            t.pendingProps
          );
        case 24:
          vn(
            t,
            Xl,
            e.memoizedState.cache
          );
      }
      return Jn(e, t, a);
    }
    function lr(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = jc(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), a._debugStack = t._debugStack, a._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          Zl = !0;
        else {
          if (!eh(e, a) && (t.flags & 128) === 0)
            return Zl = !1, e0(
              e,
              t,
              a
            );
          Zl = (e.flags & 131072) !== 0;
        }
      else
        Zl = !1, (i = ht) && (Li(), i = (t.flags & 1048576) !== 0), i && (i = t.index, Li(), Fm(t, Gp, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = $a(t.elementType), t.type = e, typeof e == "function")
            $m(e) ? (i = Du(
              e,
              i
            ), t.tag = 1, t.type = e = wi(e), t = to(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, rf(t, e), t.type = e = wi(e), t = Ey(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === jf) {
                t.tag = 11, t.type = e = Rd(e), t = Ig(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (o === Mr) {
                t.tag = 14, t = py(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === ia && (t = " Did you wrap a component in React.lazy() more than once?"), a = Ye(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + a + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return Ey(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, o = Du(
            i,
            t.pendingProps
          ), to(
            e,
            t,
            i,
            o,
            a
          );
        case 3:
          e: {
            if (Lt(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, Su(e, t), Eu(t, i, null, a);
            var d = t.memoizedState;
            if (i = d.cache, vn(t, Xl, i), i !== f.cache && ai(
              t,
              [Xl],
              a,
              !0
            ), ef(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = Ay(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else if (i !== o) {
                o = da(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Us(o), t = Ay(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else
                for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, al = an(e.firstChild), Da = t, ht = !0, Wf = null, gc = !1, au = null, Ku = !0, a = Rb(
                  t,
                  null,
                  i,
                  a
                ), t.child = a; a; )
                  a.flags = a.flags & -3 | 4096, a = a.sibling;
            else {
              if (Xi(), i === o) {
                t = Jn(
                  e,
                  t,
                  a
                );
                break e;
              }
              wl(
                e,
                t,
                i,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return er(e, t), e === null ? (a = ip(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = a : ht || (a = t.type, e = t.pendingProps, i = Kt(
            nn.current
          ), i = gr(
            i
          ).createElement(a), i[tl] = t, i[_a] = e, el(i, a, e), be(i), t.stateNode = i) : t.memoizedState = ip(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return ie(t), e === null && ht && (i = Kt(nn.current), o = J(), i = t.stateNode = Si(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), gc || (o = Na(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (qc(t, 0).serverProps = o)), Da = t, Ku = !0, o = al, sc(t.type) ? (ES = o, al = an(
            i.firstChild
          )) : al = o), wl(
            e,
            t,
            t.pendingProps.children,
            a
          ), er(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && ht && (f = J(), i = Es(
            t.type,
            f.ancestorInfo
          ), o = al, (d = !o) || (d = C0(
            o,
            t.type,
            t.pendingProps,
            Ku
          ), d !== null ? (t.stateNode = d, gc || (f = Na(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (qc(t, 0).serverProps = f)), Da = t, al = an(
            d.firstChild
          ), Ku = !1, f = !0) : f = !1, d = !f), d && (i && na(t, o), gn(t))), ie(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, _f(o, f) ? i = null : d !== null && _f(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = cy(
            e,
            t,
            Gs,
            null,
            null,
            a
          ), Sg._currentValue = o), er(e, t), wl(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && ht && (a = t.pendingProps, e = J(), i = e.ancestorInfo.current, a = i != null ? Ts(
            a,
            i.tag,
            e.ancestorInfo.implicitRootScope
          ) : !0, e = al, (i = !e) || (i = U0(
            e,
            t.pendingProps,
            Ku
          ), i !== null ? (t.stateNode = i, Da = t, al = null, i = !0) : i = !1, i = !i), i && (a && na(t, e), gn(t))), null;
        case 13:
          return Fd(e, t, a);
        case 4:
          return Lt(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = Zr(
            t,
            null,
            i,
            a
          ) : wl(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return Ig(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return wl(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return wl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, wl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || Fb || (Fb = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), vn(t, i, f), wl(
            e,
            t,
            o.children,
            a
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), Vi(t), o = Ot(o), i = w1(
            i,
            o,
            void 0
          ), t.flags |= 1, wl(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return py(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return gy(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return _y(
            e,
            t,
            a
          );
        case 31:
          return Pg(e, t, a);
        case 22:
          return vy(
            e,
            t,
            a,
            t.pendingProps
          );
        case 24:
          return Vi(t), i = Ot(Xl), e === null ? (o = ii(), o === null && (o = Jt, f = Cd(), o.pooledCache = f, wc(f), f !== null && (o.pooledCacheLanes |= a), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, rt(t), vn(t, Xl, o)) : ((e.lanes & a) !== 0 && (Su(e, t), Eu(t, null, null, a), ef()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), vn(t, Xl, i)) : (i = f.cache, vn(t, Xl, i), i !== o.cache && ai(
            t,
            [Xl],
            a,
            !0
          ))), wl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function zu(e) {
      e.flags |= 4;
    }
    function th(e, t, a, i, o) {
      if ((t = (e.mode & cT) !== Be) && (t = !1), t) {
        if (e.flags |= 16777216, (o & 335544128) === o)
          if (e.stateNode.complete) e.flags |= 8192;
          else if (Vy()) e.flags |= 8192;
          else
            throw Vr = pv, L1;
      } else e.flags &= -16777217;
    }
    function t0(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & Iu) !== ld)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !ft(t))
        if (Vy()) e.flags |= 8192;
        else
          throw Vr = pv, L1;
    }
    function hf(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? xo() : 536870912, e.lanes |= t, Wr |= t);
    }
    function mf(e, t) {
      if (!ht)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function jt(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & at) !== Be) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & at) !== Be) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          a |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function Dy(e, t, a) {
      var i = t.pendingProps;
      switch (zd(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return jt(t), null;
        case 1:
          return jt(t), null;
        case 3:
          return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), wn(Xl, t), U(t), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Yc(t) ? (Qi(), zu(t)) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Cs())), jt(t), null;
        case 26:
          var o = t.type, f = t.memoizedState;
          return e === null ? (zu(t), f !== null ? (jt(t), t0(
            t,
            f
          )) : (jt(t), th(
            t,
            o,
            null,
            i,
            a
          ))) : f ? f !== e.memoizedState ? (zu(t), jt(t), t0(
            t,
            f
          )) : (jt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && zu(t), jt(t), th(
            t,
            o,
            e,
            i,
            a
          )), null;
        case 27:
          if (Oe(t), a = Kt(nn.current), o = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && zu(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return jt(t), null;
            }
            e = J(), Yc(t) ? Im(t) : (e = Si(
              o,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, zu(t));
          }
          return jt(t), null;
        case 5:
          if (Oe(t), o = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && zu(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return jt(t), null;
            }
            var d = J();
            if (Yc(t))
              Im(t);
            else {
              switch (f = Kt(nn.current), Es(o, d.ancestorInfo), d = d.context, f = gr(f), d) {
                case Om:
                  f = f.createElementNS(
                    Pe,
                    o
                  );
                  break;
                case Xv:
                  f = f.createElementNS(
                    Ze,
                    o
                  );
                  break;
                default:
                  switch (o) {
                    case "svg":
                      f = f.createElementNS(
                        Pe,
                        o
                      );
                      break;
                    case "math":
                      f = f.createElementNS(
                        Ze,
                        o
                      );
                      break;
                    case "script":
                      f = f.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                        f.firstChild
                      );
                      break;
                    case "select":
                      f = typeof i.is == "string" ? f.createElement("select", {
                        is: i.is
                      }) : f.createElement("select"), i.multiple ? f.multiple = !0 : i.size && (f.size = i.size);
                      break;
                    default:
                      f = typeof i.is == "string" ? f.createElement(o, {
                        is: i.is
                      }) : f.createElement(o), o.indexOf("-") === -1 && (o !== o.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        o
                      ), Object.prototype.toString.call(f) !== "[object HTMLUnknownElement]" || un.call(EE, o) || (EE[o] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        o
                      )));
                  }
              }
              f[tl] = t, f[_a] = i;
              e: for (d = t.child; d !== null; ) {
                if (d.tag === 5 || d.tag === 6)
                  f.appendChild(d.stateNode);
                else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                  d.child.return = d, d = d.child;
                  continue;
                }
                if (d === t) break e;
                for (; d.sibling === null; ) {
                  if (d.return === null || d.return === t)
                    break e;
                  d = d.return;
                }
                d.sibling.return = d.return, d = d.sibling;
              }
              t.stateNode = f;
              e: switch (el(f, o, i), o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  i = !!i.autoFocus;
                  break e;
                case "img":
                  i = !0;
                  break e;
                default:
                  i = !1;
              }
              i && zu(t);
            }
          }
          return jt(t), th(
            t,
            t.type,
            e === null ? null : e.memoizedProps,
            t.pendingProps,
            a
          ), null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && zu(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = Kt(nn.current), a = J(), Yc(t)) {
              if (e = t.stateNode, a = t.memoizedProps, o = !gc, i = null, f = Da, f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = x0(
                      e,
                      a,
                      i
                    ), o !== null && (qc(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = x0(
                      e,
                      a,
                      i
                    ), o !== null && (qc(
                      t,
                      0
                    ).serverProps = o));
                }
              e[tl] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || ep(e.nodeValue, a)), e || gn(t, !0);
            } else
              o = a.ancestorInfo.current, o != null && Ts(
                i,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), e = gr(e).createTextNode(
                i
              ), e[tl] = t, t.stateNode = e;
          }
          return jt(t), null;
        case 31:
          if (a = t.memoizedState, e === null || e.memoizedState !== null) {
            if (i = Yc(t), a !== null) {
              if (e === null) {
                if (!i)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e)
                  throw Error(
                    "Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                e[tl] = t, jt(t), (t.mode & at) !== Be && a !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
              } else
                Qi(), Xi(), (t.flags & 128) === 0 && (a = t.memoizedState = null), t.flags |= 4, jt(t), (t.mode & at) !== Be && a !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
              e = !1;
            } else
              a = Cs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
            if (!e)
              return t.flags & 256 ? (ql(t), t) : (ql(t), null);
            if ((t.flags & 128) !== 0)
              throw Error(
                "Client rendering an Activity suspended it again. This is a bug in React."
              );
          }
          return jt(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = i, f = Yc(t), o !== null && o.dehydrated !== null) {
              if (e === null) {
                if (!f)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (f = t.memoizedState, f = f !== null ? f.dehydrated : null, !f)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                f[tl] = t, jt(t), (t.mode & at) !== Be && o !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                Qi(), Xi(), (t.flags & 128) === 0 && (o = t.memoizedState = null), t.flags |= 4, jt(t), (t.mode & at) !== Be && o !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = Cs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (ql(t), t) : (ql(t), null);
          }
          return ql(t), (t.flags & 128) !== 0 ? (t.lanes = a, (t.mode & at) !== Be && Lc(t), t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), hf(t, t.updateQueue), jt(t), (t.mode & at) !== Be && a && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return U(t), e === null && oc(
            t.stateNode.containerInfo
          ), jt(t), null;
        case 10:
          return wn(t.type, t), jt(t), null;
        case 19:
          if (Te(Ul, t), i = t.memoizedState, i === null) return jt(t), null;
          if (o = (t.flags & 128) !== 0, f = i.rendering, f === null)
            if (o) mf(i, !1);
            else {
              if (hl !== Co || e !== null && (e.flags & 128) !== 0)
                for (e = t.child; e !== null; ) {
                  if (f = Qc(e), f !== null) {
                    for (t.flags |= 128, mf(i, !1), e = f.updateQueue, t.updateQueue = e, hf(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                      km(a, e), a = a.sibling;
                    return Xe(
                      Ul,
                      Ul.current & dm | tg,
                      t
                    ), ht && Yn(t, i.treeForkCount), t.child;
                  }
                  e = e.sibling;
                }
              i.tail !== null && Ll() > Mv && (t.flags |= 128, o = !0, mf(i, !1), t.lanes = 4194304);
            }
          else {
            if (!o)
              if (e = Qc(f), e !== null) {
                if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, hf(t, e), mf(i, !0), i.tail === null && i.tailMode === "hidden" && !f.alternate && !ht)
                  return jt(t), null;
              } else
                2 * Ll() - i.renderingStartTime > Mv && a !== 536870912 && (t.flags |= 128, o = !0, mf(i, !1), t.lanes = 4194304);
            i.isBackwards ? (f.sibling = t.child, t.child = f) : (e = i.last, e !== null ? e.sibling = f : t.child = f, i.last = f);
          }
          return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Ll(), e.sibling = null, a = Ul.current, a = o ? a & dm | tg : a & dm, Xe(Ul, a, t), ht && Yn(t, i.treeForkCount), e) : (jt(t), null);
        case 22:
        case 23:
          return ql(t), Qn(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (jt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jt(t), a = t.updateQueue, a !== null && hf(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && Te(Xr, t), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), wn(Xl, t), jt(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function l0(e, t) {
      switch (zd(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & at) !== Be && Lc(t), t) : null;
        case 3:
          return wn(Xl, t), U(t), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Oe(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (ql(t), t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Xi();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & at) !== Be && Lc(t), t) : null;
        case 13:
          if (ql(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Xi();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & at) !== Be && Lc(t), t) : null;
        case 19:
          return Te(Ul, t), null;
        case 4:
          return U(t), null;
        case 10:
          return wn(t.type, t), null;
        case 22:
        case 23:
          return ql(t), Qn(t), e !== null && Te(Xr, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & at) !== Be && Lc(t), t) : null;
        case 24:
          return wn(Xl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function zy(e, t) {
      switch (zd(t), t.tag) {
        case 3:
          wn(Xl, t), U(t);
          break;
        case 26:
        case 27:
        case 5:
          Oe(t);
          break;
        case 4:
          U(t);
          break;
        case 31:
          t.memoizedState !== null && ql(t);
          break;
        case 13:
          ql(t);
          break;
        case 19:
          Te(Ul, t);
          break;
        case 10:
          wn(t.type, t);
          break;
        case 22:
        case 23:
          ql(t), Qn(t), e !== null && Te(Xr, t);
          break;
        case 24:
          wn(Xl, t);
      }
    }
    function Mu(e) {
      return (e.mode & at) !== Be;
    }
    function a0(e, t) {
      Mu(e) ? (fl(), mi(t, e), ma()) : mi(t, e);
    }
    function lh(e, t, a) {
      Mu(e) ? (fl(), lc(
        a,
        e,
        t
      ), ma()) : lc(
        a,
        e,
        t
      );
    }
    function mi(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          a = o;
          do {
            if ((a.tag & e) === e && (i = void 0, (e & sn) !== vv && (Em = !0), i = he(
              t,
              hT,
              a
            ), (e & sn) !== vv && (Em = !1), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = (a.tag & uu) !== 0 ? "useLayoutEffect" : (a.tag & sn) !== 0 ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, he(
                t,
                function(h, y) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    y
                  );
                },
                f,
                d
              );
            }
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        Ie(t, t.return, h);
      }
    }
    function lc(e, t, a) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & sn) !== vv && (Em = !0), o = t, he(
                o,
                mT,
                o,
                a,
                h
              ), (e & sn) !== vv && (Em = !1));
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (y) {
        Ie(t, t.return, y);
      }
    }
    function ar(e, t) {
      Mu(e) ? (fl(), mi(t, e), ma()) : mi(t, e);
    }
    function ah(e, t, a) {
      Mu(e) ? (fl(), lc(
        a,
        e,
        t
      ), ma()) : lc(
        a,
        e,
        t
      );
    }
    function My(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || pm || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          ge(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          ge(e) || "instance"
        ));
        try {
          he(
            e,
            tf,
            t,
            a
          );
        } catch (i) {
          Ie(e, e.return, i);
        }
      }
    }
    function nr(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function n0(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || pm || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        ge(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        ge(e) || "instance"
      ));
      try {
        var o = Du(
          e.type,
          a
        ), f = he(
          e,
          nr,
          t,
          o,
          i
        );
        a = Ib, f !== void 0 || a.has(e.type) || (a.add(e.type), he(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            ge(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        Ie(e, e.return, d);
      }
    }
    function nh(e, t, a) {
      a.props = Du(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, Mu(e) ? (fl(), he(
        e,
        gb,
        e,
        t,
        a
      ), ma()) : he(
        e,
        gb,
        e,
        t,
        a
      );
    }
    function u0(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        if (typeof t == "function")
          if (Mu(e))
            try {
              fl(), e.refCleanup = t(a);
            } finally {
              ma();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            ge(e)
          ), t.current = a;
      }
    }
    function lo(e, t) {
      try {
        he(e, u0, e);
      } catch (a) {
        Ie(e, t, a);
      }
    }
    function An(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (Mu(e))
              try {
                fl(), he(e, i);
              } finally {
                ma(e);
              }
            else he(e, i);
          } catch (o) {
            Ie(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (Mu(e))
              try {
                fl(), he(e, a, null);
              } finally {
                ma(e);
              }
            else he(e, a, null);
          } catch (o) {
            Ie(e, t, o);
          }
        else a.current = null;
    }
    function Cy(e, t, a, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", dv && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(f, t, i, a);
    }
    function i0(e, t, a, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", dv && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        a
      );
    }
    function ac(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        he(
          e,
          S0,
          i,
          t,
          a,
          e
        );
      } catch (o) {
        Ie(e, e.return, o);
      }
    }
    function uh(e, t, a) {
      try {
        he(
          e,
          Rh,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        Ie(e, e.return, i);
      }
    }
    function Uy(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sc(e.type) || e.tag === 4;
    }
    function ih(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Uy(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && sc(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function yf(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (E0(a), (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t)) : (E0(a), t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = yn));
      else if (i !== 4 && (i === 27 && sc(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
        for (yf(e, t, a), e = e.sibling; e !== null; )
          yf(e, t, a), e = e.sibling;
    }
    function ur(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && (i === 27 && sc(e.type) && (a = e.stateNode), e = e.child, e !== null))
        for (ur(e, t, a), e = e.sibling; e !== null; )
          ur(e, t, a), e = e.sibling;
    }
    function Hy(e) {
      for (var t, a = e.return; a !== null; ) {
        if (Uy(a)) {
          t = a;
          break;
        }
        a = a.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, a = ih(e), ur(
            e,
            a,
            t
          );
          break;
        case 5:
          a = t.stateNode, t.flags & 32 && (_h(a), t.flags &= -33), t = ih(e), ur(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, a = ih(e), yf(
            e,
            a,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function Ny(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        he(
          e,
          qu,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        Ie(e, e.return, i);
      }
    }
    function xy(e, t) {
      return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 ? e.memoizedState.isDehydrated && (t.flags & 256) === 0 : !1;
    }
    function o1(e, t) {
      if (e = e.containerInfo, vS = Jv, e = Ed(e), Lm(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, y = -1, p = 0, M = 0, H = e, O = null;
              t: for (; ; ) {
                for (var G; H !== a || o !== 0 && H.nodeType !== 3 || (h = d + o), H !== f || i !== 0 && H.nodeType !== 3 || (y = d + i), H.nodeType === 3 && (d += H.nodeValue.length), (G = H.firstChild) !== null; )
                  O = H, H = G;
                for (; ; ) {
                  if (H === e) break t;
                  if (O === a && ++p === o && (h = d), O === f && ++M === i && (y = d), (G = H.nextSibling) !== null) break;
                  H = O, O = H.parentNode;
                }
                H = G;
              }
              a = h === -1 || y === -1 ? null : { start: h, end: y };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (SS = {
        focusedElem: e,
        selectionRange: a
      }, Jv = !1, fa = t; fa !== null; )
        if (t = fa, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
          e.return = t, fa = e;
        else
          for (; fa !== null; ) {
            switch (e = t = fa, a = e.alternate, o = e.flags, e.tag) {
              case 0:
                if ((o & 4) !== 0 && (e = e.updateQueue, e = e !== null ? e.events : null, e !== null))
                  for (a = 0; a < e.length; a++)
                    o = e[a], o.ref.impl = o.nextImpl;
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && a !== null && n0(e, a);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    zf(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        zf(e);
                        break;
                      default:
                        e.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((o & 1024) !== 0)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, fa = e;
              break;
            }
            fa = t.return;
          }
    }
    function ch(e, t, a) {
      var i = It(), o = Sn(), f = Ja(), d = bn(), h = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Pa(e, a), h & 4 && a0(a, uu | Wu);
          break;
        case 1:
          if (Pa(e, a), h & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || pm || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ge(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ge(a) || "instance"
              )), Mu(a) ? (fl(), he(
                a,
                G1,
                a,
                e
              ), ma()) : he(
                a,
                G1,
                a,
                e
              );
            else {
              var y = Du(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || pm || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ge(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ge(a) || "instance"
              )), Mu(a) ? (fl(), he(
                a,
                mb,
                a,
                e,
                y,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), ma()) : he(
                a,
                mb,
                a,
                e,
                y,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          h & 64 && My(a), h & 512 && lo(a, a.return);
          break;
        case 3:
          if (t = vu(), Pa(e, a), h & 64 && (h = a.updateQueue, h !== null)) {
            if (y = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  y = a.child.stateNode;
                  break;
                case 1:
                  y = a.child.stateNode;
              }
            try {
              he(
                a,
                tf,
                h,
                y
              );
            } catch (M) {
              Ie(a, a.return, M);
            }
          }
          e.effectDuration += Fo(t);
          break;
        case 27:
          t === null && h & 4 && Ny(a);
        case 26:
        case 5:
          if (Pa(e, a), t === null) {
            if (h & 4) ac(a);
            else if (h & 64) {
              e = a.type, t = a.memoizedProps, y = a.stateNode;
              try {
                he(
                  a,
                  b0,
                  y,
                  e,
                  t,
                  a
                );
              } catch (M) {
                Ie(
                  a,
                  a.return,
                  M
                );
              }
            }
          }
          h & 512 && lo(a, a.return);
          break;
        case 12:
          if (h & 4) {
            h = vu(), Pa(e, a), e = a.stateNode, e.effectDuration += ha(h);
            try {
              he(
                a,
                Cy,
                a,
                t,
                Ff,
                e.effectDuration
              );
            } catch (M) {
              Ie(a, a.return, M);
            }
          } else Pa(e, a);
          break;
        case 31:
          Pa(e, a), h & 4 && By(e, a);
          break;
        case 13:
          Pa(e, a), h & 4 && qy(e, a), h & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (h = pi.bind(
            null,
            a
          ), H0(e, h))));
          break;
        case 22:
          if (h = a.memoizedState !== null || Mo, !h) {
            t = t !== null && t.memoizedState !== null || Jl, y = Mo;
            var p = Jl;
            Mo = h, (Jl = t) && !p ? (Kn(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ), (a.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && Td(
              a,
              Ce,
              xe
            )) : Pa(e, a), Mo = y, Jl = p;
          }
          break;
        case 30:
          break;
        default:
          Pa(e, a);
      }
      (a.mode & at) !== Be && 0 <= Ce && 0 <= xe && ((Sl || 0.05 < dl) && qn(
        a,
        Ce,
        xe,
        dl,
        ol
      ), a.alternate === null && a.return !== null && a.return.alternate !== null && 0.05 < xe - Ce && (xy(
        a.return.alternate,
        a.return
      ) || pn(
        a,
        Ce,
        xe,
        "Mount"
      ))), jl(i), Za(o), ol = f, Sl = d;
    }
    function gl(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, gl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && N(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function kt(e, t, a) {
      for (a = a.child; a !== null; )
        jy(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function jy(e, t, a) {
      if (Ml && typeof Ml.onCommitFiberUnmount == "function")
        try {
          Ml.onCommitFiberUnmount(po, a);
        } catch (p) {
          wu || (wu = !0, console.error(
            "React instrumentation encountered an error: %o",
            p
          ));
        }
      var i = It(), o = Sn(), f = Ja(), d = bn();
      switch (a.tag) {
        case 26:
          Jl || An(a, t), kt(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (e = a.stateNode, e.parentNode.removeChild(e));
          break;
        case 27:
          Jl || An(a, t);
          var h = Kl, y = zn;
          sc(a.type) && (Kl = a.stateNode, zn = !1), kt(
            e,
            t,
            a
          ), he(
            a,
            bi,
            a.stateNode
          ), Kl = h, zn = y;
          break;
        case 5:
          Jl || An(a, t);
        case 6:
          if (h = Kl, y = zn, Kl = null, kt(
            e,
            t,
            a
          ), Kl = h, zn = y, Kl !== null)
            if (zn)
              try {
                he(
                  a,
                  A0,
                  Kl,
                  a.stateNode
                );
              } catch (p) {
                Ie(
                  a,
                  t,
                  p
                );
              }
            else
              try {
                he(
                  a,
                  T0,
                  Kl,
                  a.stateNode
                );
              } catch (p) {
                Ie(
                  a,
                  t,
                  p
                );
              }
          break;
        case 18:
          Kl !== null && (zn ? (e = Kl, co(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            a.stateNode
          ), ro(e)) : co(Kl, a.stateNode));
          break;
        case 4:
          h = Kl, y = zn, Kl = a.stateNode.containerInfo, zn = !0, kt(
            e,
            t,
            a
          ), Kl = h, zn = y;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          lc(
            sn,
            a,
            t
          ), Jl || lh(
            a,
            t,
            uu
          ), kt(
            e,
            t,
            a
          );
          break;
        case 1:
          Jl || (An(a, t), h = a.stateNode, typeof h.componentWillUnmount == "function" && nh(
            a,
            t,
            h
          )), kt(
            e,
            t,
            a
          );
          break;
        case 21:
          kt(
            e,
            t,
            a
          );
          break;
        case 22:
          Jl = (h = Jl) || a.memoizedState !== null, kt(
            e,
            t,
            a
          ), Jl = h;
          break;
        default:
          kt(
            e,
            t,
            a
          );
      }
      (a.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        a,
        Ce,
        xe,
        dl,
        ol
      ), jl(i), Za(o), ol = f, Sl = d;
    }
    function By(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
        e = e.dehydrated;
        try {
          he(
            t,
            Dh,
            e
          );
        } catch (a) {
          Ie(t, t.return, a);
        }
      }
    }
    function qy(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          he(
            t,
            np,
            e
          );
        } catch (a) {
          Ie(t, t.return, a);
        }
    }
    function c0(e) {
      switch (e.tag) {
        case 31:
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Pb()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Pb()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function nc(e, t) {
      var a = c0(e);
      t.forEach(function(i) {
        if (!a.has(i)) {
          if (a.add(i), Gu)
            if (gm !== null && vm !== null)
              Ef(vm, gm);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          var o = uo.bind(null, e, i);
          i.then(o, o);
        }
      });
    }
    function Sa(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = e, f = t, d = a[i], h = It(), y = f;
          e: for (; y !== null; ) {
            switch (y.tag) {
              case 27:
                if (sc(y.type)) {
                  Kl = y.stateNode, zn = !1;
                  break e;
                }
                break;
              case 5:
                Kl = y.stateNode, zn = !1;
                break e;
              case 3:
              case 4:
                Kl = y.stateNode.containerInfo, zn = !0;
                break e;
            }
            y = y.return;
          }
          if (Kl === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          jy(o, f, d), Kl = null, zn = !1, (d.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && pn(
            d,
            Ce,
            xe,
            "Unmount"
          ), jl(h), o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; )
          ir(t, e), t = t.sibling;
    }
    function ir(e, t) {
      var a = It(), i = Sn(), o = Ja(), f = bn(), d = e.alternate, h = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Sa(t, e), ba(e), h & 4 && (lc(
            sn | Wu,
            e,
            e.return
          ), mi(sn | Wu, e), lh(
            e,
            e.return,
            uu | Wu
          ));
          break;
        case 1:
          if (Sa(t, e), ba(e), h & 512 && (Jl || d === null || An(d, d.return)), h & 64 && Mo && (h = e.updateQueue, h !== null && (d = h.callbacks, d !== null))) {
            var y = h.shared.hiddenCallbacks;
            h.shared.hiddenCallbacks = y === null ? d : y.concat(d);
          }
          break;
        case 26:
          if (y = _i, Sa(t, e), ba(e), h & 512 && (Jl || d === null || An(d, d.return)), h & 4) {
            var p = d !== null ? d.memoizedState : null;
            if (h = e.memoizedState, d === null)
              if (h === null)
                if (e.stateNode === null) {
                  e: {
                    h = e.type, d = e.memoizedProps, y = y.ownerDocument || y;
                    t: switch (h) {
                      case "title":
                        p = y.getElementsByTagName(
                          "title"
                        )[0], (!p || p[Qf] || p[tl] || p.namespaceURI === Pe || p.hasAttribute("itemprop")) && (p = y.createElement(h), y.head.insertBefore(
                          p,
                          y.querySelector(
                            "head > title"
                          )
                        )), el(p, h, d), p[tl] = e, be(p), h = p;
                        break e;
                      case "link":
                        var M = Uf(
                          "link",
                          "href",
                          y
                        ).get(h + (d.href || ""));
                        if (M) {
                          for (var H = 0; H < M.length; H++)
                            if (p = M[H], p.getAttribute("href") === (d.href == null || d.href === "" ? null : d.href) && p.getAttribute("rel") === (d.rel == null ? null : d.rel) && p.getAttribute("title") === (d.title == null ? null : d.title) && p.getAttribute("crossorigin") === (d.crossOrigin == null ? null : d.crossOrigin)) {
                              M.splice(H, 1);
                              break t;
                            }
                        }
                        p = y.createElement(h), el(p, h, d), y.head.appendChild(
                          p
                        );
                        break;
                      case "meta":
                        if (M = Uf(
                          "meta",
                          "content",
                          y
                        ).get(h + (d.content || ""))) {
                          for (H = 0; H < M.length; H++)
                            if (p = M[H], Et(
                              d.content,
                              "content"
                            ), p.getAttribute("content") === (d.content == null ? null : "" + d.content) && p.getAttribute("name") === (d.name == null ? null : d.name) && p.getAttribute("property") === (d.property == null ? null : d.property) && p.getAttribute("http-equiv") === (d.httpEquiv == null ? null : d.httpEquiv) && p.getAttribute("charset") === (d.charSet == null ? null : d.charSet)) {
                              M.splice(H, 1);
                              break t;
                            }
                        }
                        p = y.createElement(h), el(p, h, d), y.head.appendChild(
                          p
                        );
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + h + '". This is a bug in React.'
                        );
                    }
                    p[tl] = e, be(p), h = p;
                  }
                  e.stateNode = h;
                } else
                  B0(
                    y,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = Ch(
                  y,
                  h,
                  e.memoizedProps
                );
            else
              p !== h ? (p === null ? d.stateNode !== null && (d = d.stateNode, d.parentNode.removeChild(d)) : p.count--, h === null ? B0(
                y,
                e.type,
                e.stateNode
              ) : Ch(
                y,
                h,
                e.memoizedProps
              )) : h === null && e.stateNode !== null && uh(
                e,
                e.memoizedProps,
                d.memoizedProps
              );
          }
          break;
        case 27:
          Sa(t, e), ba(e), h & 512 && (Jl || d === null || An(d, d.return)), d !== null && h & 4 && uh(
            e,
            e.memoizedProps,
            d.memoizedProps
          );
          break;
        case 5:
          if (Sa(t, e), ba(e), h & 512 && (Jl || d === null || An(d, d.return)), e.flags & 32) {
            y = e.stateNode;
            try {
              he(
                e,
                _h,
                y
              );
            } catch (me) {
              Ie(e, e.return, me);
            }
          }
          h & 4 && e.stateNode != null && (y = e.memoizedProps, uh(
            e,
            y,
            d !== null ? d.memoizedProps : y
          )), h & 1024 && (P1 = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (Sa(t, e), ba(e), h & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            h = e.memoizedProps, d = d !== null ? d.memoizedProps : h, y = e.stateNode;
            try {
              he(
                e,
                f1,
                y,
                d,
                h
              );
            } catch (me) {
              Ie(e, e.return, me);
            }
          }
          break;
        case 3:
          if (y = vu(), Qv = null, p = _i, _i = zh(t.containerInfo), Sa(t, e), _i = p, ba(e), h & 4 && d !== null && d.memoizedState.isDehydrated)
            try {
              he(
                e,
                ap,
                t.containerInfo
              );
            } catch (me) {
              Ie(e, e.return, me);
            }
          P1 && (P1 = !1, o0(e)), t.effectDuration += Fo(
            y
          );
          break;
        case 4:
          h = _i, _i = zh(
            e.stateNode.containerInfo
          ), Sa(t, e), ba(e), _i = h;
          break;
        case 12:
          h = vu(), Sa(t, e), ba(e), e.stateNode.effectDuration += ha(h);
          break;
        case 31:
          Sa(t, e), ba(e), h & 4 && (h = e.updateQueue, h !== null && (e.updateQueue = null, nc(e, h)));
          break;
        case 13:
          Sa(t, e), ba(e), e.child.flags & 8192 && e.memoizedState !== null != (d !== null && d.memoizedState !== null) && (zv = Ll()), h & 4 && (h = e.updateQueue, h !== null && (e.updateQueue = null, nc(e, h)));
          break;
        case 22:
          y = e.memoizedState !== null;
          var O = d !== null && d.memoizedState !== null, G = Mo, fe = Jl;
          if (Mo = G || y, Jl = fe || O, Sa(t, e), Jl = fe, Mo = G, O && !y && !G && !fe && (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && Td(
            e,
            Ce,
            xe
          ), ba(e), h & 8192)
            e: for (t = e.stateNode, t._visibility = y ? t._visibility & ~wp : t._visibility | wp, !y || d === null || O || Mo || Jl || (uc(e), (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && pn(
              e,
              Ce,
              xe,
              "Disconnect"
            )), d = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (d === null) {
                  O = d = t;
                  try {
                    p = O.stateNode, y ? he(
                      O,
                      R0,
                      p
                    ) : he(
                      O,
                      z0,
                      O.stateNode,
                      O.memoizedProps
                    );
                  } catch (me) {
                    Ie(O, O.return, me);
                  }
                }
              } else if (t.tag === 6) {
                if (d === null) {
                  O = t;
                  try {
                    M = O.stateNode, y ? he(
                      O,
                      _0,
                      M
                    ) : he(
                      O,
                      M0,
                      M,
                      O.memoizedProps
                    );
                  } catch (me) {
                    Ie(O, O.return, me);
                  }
                }
              } else if (t.tag === 18) {
                if (d === null) {
                  O = t;
                  try {
                    H = O.stateNode, y ? he(
                      O,
                      O0,
                      H
                    ) : he(
                      O,
                      D0,
                      O.stateNode
                    );
                  } catch (me) {
                    Ie(O, O.return, me);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                d === t && (d = null), t = t.return;
              }
              d === t && (d = null), t.sibling.return = t.return, t = t.sibling;
            }
          h & 4 && (h = e.updateQueue, h !== null && (d = h.retryQueue, d !== null && (h.retryQueue = null, nc(e, d))));
          break;
        case 19:
          Sa(t, e), ba(e), h & 4 && (h = e.updateQueue, h !== null && (e.updateQueue = null, nc(e, h)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Sa(t, e), ba(e);
      }
      (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && ((Sl || 0.05 < dl) && qn(
        e,
        Ce,
        xe,
        dl,
        ol
      ), e.alternate === null && e.return !== null && e.return.alternate !== null && 0.05 < xe - Ce && (xy(
        e.return.alternate,
        e.return
      ) || pn(
        e,
        Ce,
        xe,
        "Mount"
      ))), jl(a), Za(i), ol = o, Sl = f;
    }
    function ba(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          he(e, Hy, e);
        } catch (a) {
          Ie(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function o0(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          o0(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function Pa(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          ch(e, t.alternate, t), t = t.sibling;
    }
    function oh(e) {
      var t = It(), a = Sn(), i = Ja(), o = bn();
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          lh(
            e,
            e.return,
            uu
          ), uc(e);
          break;
        case 1:
          An(e, e.return);
          var f = e.stateNode;
          typeof f.componentWillUnmount == "function" && nh(
            e,
            e.return,
            f
          ), uc(e);
          break;
        case 27:
          he(
            e,
            bi,
            e.stateNode
          );
        case 26:
        case 5:
          An(e, e.return), uc(e);
          break;
        case 22:
          e.memoizedState === null && uc(e);
          break;
        case 30:
          uc(e);
          break;
        default:
          uc(e);
      }
      (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        e,
        Ce,
        xe,
        dl,
        ol
      ), jl(t), Za(a), ol = i, Sl = o;
    }
    function uc(e) {
      for (e = e.child; e !== null; )
        oh(e), e = e.sibling;
    }
    function Yy(e, t, a, i) {
      var o = It(), f = Sn(), d = Ja(), h = bn(), y = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Kn(
            e,
            a,
            i
          ), a0(a, uu);
          break;
        case 1:
          if (Kn(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && he(
            a,
            G1,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              he(
                a,
                uy,
                t,
                e
              );
            } catch (p) {
              Ie(a, a.return, p);
            }
          }
          i && y & 64 && My(a), lo(a, a.return);
          break;
        case 27:
          Ny(a);
        case 26:
        case 5:
          Kn(
            e,
            a,
            i
          ), i && t === null && y & 4 && ac(a), lo(a, a.return);
          break;
        case 12:
          if (i && y & 4) {
            y = vu(), Kn(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += ha(y);
            try {
              he(
                a,
                Cy,
                a,
                t,
                Ff,
                i.effectDuration
              );
            } catch (p) {
              Ie(a, a.return, p);
            }
          } else
            Kn(
              e,
              a,
              i
            );
          break;
        case 31:
          Kn(
            e,
            a,
            i
          ), i && y & 4 && By(e, a);
          break;
        case 13:
          Kn(
            e,
            a,
            i
          ), i && y & 4 && qy(e, a);
          break;
        case 22:
          a.memoizedState === null && Kn(
            e,
            a,
            i
          ), lo(a, a.return);
          break;
        case 30:
          break;
        default:
          Kn(
            e,
            a,
            i
          );
      }
      (a.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        a,
        Ce,
        xe,
        dl,
        ol
      ), jl(o), Za(f), ol = d, Sl = h;
    }
    function Kn(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        Yy(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function cr(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && wc(e), a != null && Ns(a));
    }
    function or(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (wc(t), e != null && Ns(e));
    }
    function en(e, t, a, i, o) {
      if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child))
        for (t = t.child; t !== null; ) {
          var f = t.sibling;
          wy(
            e,
            t,
            a,
            i,
            f !== null ? f.actualStartTime : o
          ), t = f;
        }
    }
    function wy(e, t, a, i, o) {
      var f = It(), d = Sn(), h = Ja(), y = bn(), p = Kf, M = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          (t.mode & at) !== Be && 0 < t.actualStartTime && (t.flags & 1) !== 0 && Ad(
            t,
            t.actualStartTime,
            o,
            Pl,
            a
          ), en(
            e,
            t,
            a,
            i,
            o
          ), M & 2048 && ar(t, rn | Wu);
          break;
        case 1:
          (t.mode & at) !== Be && 0 < t.actualStartTime && ((t.flags & 128) !== 0 ? Qm(
            t,
            t.actualStartTime,
            o,
            []
          ) : (t.flags & 1) !== 0 && Ad(
            t,
            t.actualStartTime,
            o,
            Pl,
            a
          )), en(
            e,
            t,
            a,
            i,
            o
          );
          break;
        case 3:
          var H = vu(), O = Pl;
          Pl = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) === 0, en(
            e,
            t,
            a,
            i,
            o
          ), Pl = O, M & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), i = t.memoizedState.cache, i !== a && (wc(i), a != null && Ns(a))), e.passiveEffectDuration += Fo(
            H
          );
          break;
        case 12:
          if (M & 2048) {
            M = vu(), en(
              e,
              t,
              a,
              i,
              o
            ), e = t.stateNode, e.passiveEffectDuration += ha(M);
            try {
              he(
                t,
                i0,
                t,
                t.alternate,
                Ff,
                e.passiveEffectDuration
              );
            } catch (G) {
              Ie(t, t.return, G);
            }
          } else
            en(
              e,
              t,
              a,
              i,
              o
            );
          break;
        case 31:
          M = Pl, H = t.alternate !== null ? t.alternate.memoizedState : null, O = t.memoizedState, H !== null && O === null ? (O = t.deletions, O !== null && 0 < O.length && O[0].tag === 18 ? (Pl = !1, H = H.hydrationErrors, H !== null && Qm(
            t,
            t.actualStartTime,
            o,
            H
          )) : Pl = !0) : Pl = !1, en(
            e,
            t,
            a,
            i,
            o
          ), Pl = M;
          break;
        case 13:
          M = Pl, H = t.alternate !== null ? t.alternate.memoizedState : null, O = t.memoizedState, H === null || H.dehydrated === null || O !== null && O.dehydrated !== null ? Pl = !1 : (O = t.deletions, O !== null && 0 < O.length && O[0].tag === 18 ? (Pl = !1, H = H.hydrationErrors, H !== null && Qm(
            t,
            t.actualStartTime,
            o,
            H
          )) : Pl = !0), en(
            e,
            t,
            a,
            i,
            o
          ), Pl = M;
          break;
        case 23:
          break;
        case 22:
          O = t.stateNode, H = t.alternate, t.memoizedState !== null ? O._visibility & So ? en(
            e,
            t,
            a,
            i,
            o
          ) : ao(
            e,
            t,
            a,
            i,
            o
          ) : O._visibility & So ? en(
            e,
            t,
            a,
            i,
            o
          ) : (O._visibility |= So, ic(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child),
            o
          ), (t.mode & at) === Be || Pl || (e = t.actualStartTime, 0 <= e && 0.05 < o - e && Td(t, e, o), 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && Td(
            t,
            Ce,
            xe
          ))), M & 2048 && cr(
            H,
            t
          );
          break;
        case 24:
          en(
            e,
            t,
            a,
            i,
            o
          ), M & 2048 && or(t.alternate, t);
          break;
        default:
          en(
            e,
            t,
            a,
            i,
            o
          );
      }
      (t.mode & at) !== Be && ((e = !Pl && t.alternate === null && t.return !== null && t.return.alternate !== null) && (a = t.actualStartTime, 0 <= a && 0.05 < o - a && pn(
        t,
        a,
        o,
        "Mount"
      )), 0 <= Ce && 0 <= xe && ((Sl || 0.05 < dl) && qn(
        t,
        Ce,
        xe,
        dl,
        ol
      ), e && 0.05 < xe - Ce && pn(
        t,
        Ce,
        xe,
        "Mount"
      ))), jl(f), Za(d), ol = h, Sl = y, Kf = p;
    }
    function ic(e, t, a, i, o, f) {
      for (o = o && ((t.subtreeFlags & 10256) !== 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)), t = t.child; t !== null; ) {
        var d = t.sibling;
        fr(
          e,
          t,
          a,
          i,
          o,
          d !== null ? d.actualStartTime : f
        ), t = d;
      }
    }
    function fr(e, t, a, i, o, f) {
      var d = It(), h = Sn(), y = Ja(), p = bn(), M = Kf;
      o && (t.mode & at) !== Be && 0 < t.actualStartTime && (t.flags & 1) !== 0 && Ad(
        t,
        t.actualStartTime,
        f,
        Pl,
        a
      );
      var H = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ic(
            e,
            t,
            a,
            i,
            o,
            f
          ), ar(t, rn);
          break;
        case 23:
          break;
        case 22:
          var O = t.stateNode;
          t.memoizedState !== null ? O._visibility & So ? ic(
            e,
            t,
            a,
            i,
            o,
            f
          ) : ao(
            e,
            t,
            a,
            i,
            f
          ) : (O._visibility |= So, ic(
            e,
            t,
            a,
            i,
            o,
            f
          )), o && H & 2048 && cr(
            t.alternate,
            t
          );
          break;
        case 24:
          ic(
            e,
            t,
            a,
            i,
            o,
            f
          ), o && H & 2048 && or(t.alternate, t);
          break;
        default:
          ic(
            e,
            t,
            a,
            i,
            o,
            f
          );
      }
      (t.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        t,
        Ce,
        xe,
        dl,
        ol
      ), jl(d), Za(h), ol = y, Sl = p, Kf = M;
    }
    function ao(e, t, a, i, o) {
      if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child))
        for (var f = t.child; f !== null; ) {
          t = f.sibling;
          var d = e, h = a, y = i, p = t !== null ? t.actualStartTime : o, M = Kf;
          (f.mode & at) !== Be && 0 < f.actualStartTime && (f.flags & 1) !== 0 && Ad(
            f,
            f.actualStartTime,
            p,
            Pl,
            h
          );
          var H = f.flags;
          switch (f.tag) {
            case 22:
              ao(
                d,
                f,
                h,
                y,
                p
              ), H & 2048 && cr(f.alternate, f);
              break;
            case 24:
              ao(
                d,
                f,
                h,
                y,
                p
              ), H & 2048 && or(f.alternate, f);
              break;
            default:
              ao(
                d,
                f,
                h,
                y,
                p
              );
          }
          Kf = M, f = t;
        }
    }
    function no(e, t, a) {
      if (e.subtreeFlags & ug)
        for (e = e.child; e !== null; )
          fh(
            e,
            t,
            a
          ), e = e.sibling;
    }
    function fh(e, t, a) {
      switch (e.tag) {
        case 26:
          no(
            e,
            t,
            a
          ), e.flags & ug && e.memoizedState !== null && fp(
            a,
            _i,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          no(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          var i = _i;
          _i = zh(
            e.stateNode.containerInfo
          ), no(
            e,
            t,
            a
          ), _i = i;
          break;
        case 22:
          e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = ug, ug = 16777216, no(
            e,
            t,
            a
          ), ug = i) : no(
            e,
            t,
            a
          ));
          break;
        default:
          no(
            e,
            t,
            a
          );
      }
    }
    function Gy(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function tn(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a], o = It();
            fa = i, Cu(
              i,
              e
            ), (i.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && pn(
              i,
              Ce,
              xe,
              "Unmount"
            ), jl(o);
          }
        Gy(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          sh(e), e = e.sibling;
    }
    function sh(e) {
      var t = It(), a = Sn(), i = Ja(), o = bn();
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          tn(e), e.flags & 2048 && ah(
            e,
            e.return,
            rn | Wu
          );
          break;
        case 3:
          var f = vu();
          tn(e), e.stateNode.passiveEffectDuration += Fo(f);
          break;
        case 12:
          f = vu(), tn(e), e.stateNode.passiveEffectDuration += ha(f);
          break;
        case 22:
          f = e.stateNode, e.memoizedState !== null && f._visibility & So && (e.return === null || e.return.tag !== 13) ? (f._visibility &= ~So, rh(e), (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && pn(
            e,
            Ce,
            xe,
            "Disconnect"
          )) : tn(e);
          break;
        default:
          tn(e);
      }
      (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        e,
        Ce,
        xe,
        dl,
        ol
      ), jl(t), Za(a), Sl = o, ol = i;
    }
    function rh(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a], o = It();
            fa = i, Cu(
              i,
              e
            ), (i.mode & at) !== Be && 0 <= Ce && 0 <= xe && 0.05 < xe - Ce && pn(
              i,
              Ce,
              xe,
              "Unmount"
            ), jl(o);
          }
        Gy(e);
      }
      for (e = e.child; e !== null; )
        Ly(e), e = e.sibling;
    }
    function Ly(e) {
      var t = It(), a = Sn(), i = Ja(), o = bn();
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ah(
            e,
            e.return,
            rn
          ), rh(e);
          break;
        case 22:
          var f = e.stateNode;
          f._visibility & So && (f._visibility &= ~So, rh(e));
          break;
        default:
          rh(e);
      }
      (e.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
        e,
        Ce,
        xe,
        dl,
        ol
      ), jl(t), Za(a), Sl = o, ol = i;
    }
    function Cu(e, t) {
      for (; fa !== null; ) {
        var a = fa, i = a, o = t, f = It(), d = Sn(), h = Ja(), y = bn();
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            ah(
              i,
              o,
              rn
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (o = i.memoizedState.cachePool.pool, o != null && wc(o));
            break;
          case 24:
            Ns(i.memoizedState.cache);
        }
        if ((i.mode & at) !== Be && 0 <= Ce && 0 <= xe && (Sl || 0.05 < dl) && qn(
          i,
          Ce,
          xe,
          dl,
          ol
        ), jl(f), Za(d), Sl = y, ol = h, i = a.child, i !== null) i.return = a, fa = i;
        else
          e: for (a = e; fa !== null; ) {
            if (i = fa, f = i.sibling, d = i.return, gl(i), i === a) {
              fa = null;
              break e;
            }
            if (f !== null) {
              f.return = d, fa = f;
              break e;
            }
            fa = d;
          }
      }
    }
    function Xy() {
      ST.forEach(function(e) {
        return e();
      });
    }
    function Qy() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || X.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function ua(e) {
      if ((St & ea) !== sa && ut !== 0)
        return ut & -ut;
      var t = X.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), Py()) : Ni();
    }
    function pf() {
      if (Cn === 0)
        if ((ut & 536870912) === 0 || ht) {
          var e = Hr;
          Hr <<= 1, (Hr & 3932160) === 0 && (Hr = 262144), Cn = e;
        } else Cn = 536870912;
      return e = nu.current, e !== null && (e.flags |= 32), Cn;
    }
    function qe(e, t, a) {
      if (Em && console.error("useInsertionEffect must not schedule updates."), sS && (Hv = !0), (e === Jt && (wt === $r || wt === kr) || e.cancelPendingCommit !== null) && (Uu(e, 0), On(
        e,
        ut,
        Cn,
        !1
      )), Hn(e, a), (St & ea) !== sa && e === Jt) {
        if (Yu)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = ot && ge(ot) || "Unknown", mE.has(e) || (mE.add(e), t = ge(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              hE || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), hE = !0);
          }
      } else
        Gu && Rl(e, t, a), hr(t), e === Jt && ((St & ea) === sa && (us |= a), hl === ls && On(
          e,
          ut,
          Cn,
          !1
        )), Ua(e);
    }
    function f0(e, t, a) {
      if ((St & (ea | iu)) !== sa)
        throw Error("Should not already be working.");
      if (ut !== 0 && ot !== null) {
        var i = ot, o = Ll();
        switch (ib) {
          case og:
          case $r:
            var f = Zp;
            ll && ((i = i._debugTask) ? i.run(
              console.timeStamp.bind(
                console,
                "Suspended",
                f,
                o,
                Xu,
                void 0,
                "primary-light"
              )
            ) : console.timeStamp(
              "Suspended",
              f,
              o,
              Xu,
              void 0,
              "primary-light"
            ));
            break;
          case kr:
            f = Zp, ll && ((i = i._debugTask) ? i.run(
              console.timeStamp.bind(
                console,
                "Action",
                f,
                o,
                Xu,
                void 0,
                "primary-light"
              )
            ) : console.timeStamp(
              "Action",
              f,
              o,
              Xu,
              void 0,
              "primary-light"
            ));
            break;
          default:
            ll && (i = o - Zp, 3 > i || console.timeStamp(
              "Blocked",
              Zp,
              o,
              Xu,
              void 0,
              5 > i ? "primary-light" : 10 > i ? "primary" : 100 > i ? "primary-dark" : "error"
            ));
        }
      }
      f = (a = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || bl(e, t)) ? yi(e, t) : Sf(e, t, !0);
      var d = a;
      do {
        if (f === Co) {
          Sm && !a && On(e, t, 0, !1), t = wt, Zp = Ql(), ib = t;
          break;
        } else {
          if (i = Ll(), o = e.current.alternate, d && !r0(o)) {
            Bn(t), o = oa, f = i, !ll || f <= o || (Ol ? Ol.run(
              console.timeStamp.bind(
                console,
                "Teared Render",
                o,
                f,
                gt,
                mt,
                "error"
              )
            ) : console.timeStamp(
              "Teared Render",
              o,
              f,
              gt,
              mt,
              "error"
            )), cc(t, i), f = Sf(e, t, !1), d = !1;
            continue;
          }
          if (f === Kr) {
            if (d = t, e.errorRecoveryDisabledLanes & d)
              var h = 0;
            else
              h = e.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
            if (h !== 0) {
              Bn(t), Vm(
                oa,
                i,
                t,
                Ol
              ), cc(t, i), t = h;
              e: {
                i = e, f = d, d = sg;
                var y = i.current.memoizedState.isDehydrated;
                if (y && (Uu(i, h).flags |= 256), h = Sf(
                  i,
                  h,
                  !1
                ), h !== Kr) {
                  if (lS && !y) {
                    i.errorRecoveryDisabledLanes |= f, us |= f, f = ls;
                    break e;
                  }
                  i = dn, dn = d, i !== null && (dn === null ? dn = i : dn.push.apply(
                    dn,
                    i
                  ));
                }
                f = h;
              }
              if (d = !1, f !== Kr) continue;
              i = Ll();
            }
          }
          if (f === cg) {
            Bn(t), Vm(
              oa,
              i,
              t,
              Ol
            ), cc(t, i), Uu(e, 0), On(e, t, 0, !0);
            break;
          }
          e: {
            switch (a = e, f) {
              case Co:
              case cg:
                throw Error("Root did not complete. This is a bug in React.");
              case ls:
                if ((t & 4194048) !== t) break;
              case Ov:
                Bn(t), wg(
                  oa,
                  i,
                  t,
                  Ol
                ), cc(t, i), o = t, (o & 127) !== 0 ? fv = i : (o & 4194048) !== 0 && (sv = i), On(
                  a,
                  t,
                  Cn,
                  !as
                );
                break e;
              case Kr:
                dn = null;
                break;
              case Av:
              case eE:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (X.actQueue !== null)
              Qt(
                a,
                o,
                t,
                dn,
                rg,
                Dv,
                Cn,
                us,
                Wr,
                f,
                null,
                null,
                oa,
                i
              );
            else {
              if ((t & 62914560) === t && (d = zv + aE - Ll(), 10 < d)) {
                if (On(
                  a,
                  t,
                  Cn,
                  !as
                ), Ac(a, 0, !0) !== 0) break e;
                Di = t, a.timeoutHandle = TE(
                  s0.bind(
                    null,
                    a,
                    o,
                    dn,
                    rg,
                    Dv,
                    t,
                    Cn,
                    us,
                    Wr,
                    as,
                    f,
                    "Throttled",
                    oa,
                    i
                  ),
                  d
                );
                break e;
              }
              s0(
                a,
                o,
                dn,
                rg,
                Dv,
                t,
                Cn,
                us,
                Wr,
                as,
                f,
                null,
                oa,
                i
              );
            }
          }
        }
        break;
      } while (!0);
      Ua(e);
    }
    function s0(e, t, a, i, o, f, d, h, y, p, M, H, O, G) {
      e.timeoutHandle = td;
      var fe = t.subtreeFlags, me = null;
      if ((fe & 8192 || (fe & 16785408) === 16785408) && (me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: yn
      }, fh(t, f, me), fe = (f & 62914560) === f ? zv - Ll() : (f & 4194048) === f ? lE - Ll() : 0, fe = Uh(me, fe), fe !== null)) {
        Di = f, e.cancelPendingCommit = fe(
          Qt.bind(
            null,
            e,
            t,
            f,
            a,
            i,
            o,
            d,
            h,
            y,
            M,
            me,
            me.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < me.count ? 0 < me.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : me.imgCount === 1 ? "Suspended on an Image" : 0 < me.imgCount ? "Suspended on Images" : null,
            O,
            G
          )
        ), On(
          e,
          f,
          d,
          !p
        );
        return;
      }
      Qt(
        e,
        t,
        f,
        a,
        i,
        o,
        d,
        h,
        y,
        M,
        me,
        H,
        O,
        G
      );
    }
    function r0(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var o = a[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!on(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function On(e, t, a, i) {
      t &= ~aS, t &= ~us, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - Fl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      a !== 0 && Bo(e, a, t);
    }
    function ln() {
      return (St & (ea | iu)) === sa ? (Nu(0), !1) : !0;
    }
    function dh() {
      if (ot !== null) {
        if (wt === Mn)
          var e = ot.return;
        else
          e = ot, ko(), Ji(e), sm = null, eg = 0, e = ot;
        for (; e !== null; )
          zy(e.alternate, e), e = e.return;
        ot = null;
      }
    }
    function cc(e, t) {
      (e & 127) !== 0 && (Yr = t), (e & 4194048) !== 0 && (Oo = t), (e & 62914560) !== 0 && (nb = t), (e & 2080374784) !== 0 && (ub = t);
    }
    function Uu(e, t) {
      ll && (console.timeStamp(
        "Blocking Track",
        3e-3,
        3e-3,
        "Blocking",
        mt,
        "primary-light"
      ), console.timeStamp(
        "Transition Track",
        3e-3,
        3e-3,
        "Transition",
        mt,
        "primary-light"
      ), console.timeStamp(
        "Suspense Track",
        3e-3,
        3e-3,
        "Suspense",
        mt,
        "primary-light"
      ), console.timeStamp(
        "Idle Track",
        3e-3,
        3e-3,
        "Idle",
        mt,
        "primary-light"
      ));
      var a = oa;
      if (oa = Ql(), ut !== 0 && 0 < a) {
        if (Bn(ut), hl === Av || hl === ls)
          wg(
            a,
            oa,
            t,
            Ol
          );
        else {
          var i = oa, o = Ol;
          if (ll && !(i <= a)) {
            var f = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", d = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
            o ? o.run(
              console.timeStamp.bind(
                console,
                d,
                a,
                i,
                gt,
                mt,
                f
              )
            ) : console.timeStamp(
              d,
              a,
              i,
              gt,
              mt,
              f
            );
          }
        }
        cc(ut, oa);
      }
      if (a = Ol, Ol = null, (t & 127) !== 0) {
        Ol = Xp, o = 0 <= vc && vc < Yr ? Yr : vc, i = 0 <= wr && wr < Yr ? Yr : wr, f = 0 <= i ? i : 0 <= o ? o : oa, 0 <= fv ? (Bn(2), Gg(
          fv,
          f,
          t,
          a
        )) : rv & 127, a = o;
        var h = i, y = Qp, p = 0 < cm, M = If === Lp, H = If === ov;
        if (o = oa, i = Xp, f = j1, d = B1, ll) {
          if (gt = "Blocking", 0 < a ? a > o && (a = o) : a = o, 0 < h ? h > a && (h = a) : h = a, y !== null && a > h) {
            var O = p ? "secondary-light" : "warning";
            i ? i.run(
              console.timeStamp.bind(
                console,
                p ? "Consecutive" : "Event: " + y,
                h,
                a,
                gt,
                mt,
                O
              )
            ) : console.timeStamp(
              p ? "Consecutive" : "Event: " + y,
              h,
              a,
              gt,
              mt,
              O
            );
          }
          o > a && (h = M ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", M = H ? "Promise Resolved" : M ? "Cascading Update" : 5 < o - a ? "Update Blocked" : "Update", H = [], d != null && H.push(["Component name", d]), f != null && H.push(["Method name", f]), a = {
            start: a,
            end: o,
            detail: {
              devtools: {
                properties: H,
                track: gt,
                trackGroup: mt,
                color: h
              }
            }
          }, i ? i.run(
            performance.measure.bind(
              performance,
              M,
              a
            )
          ) : performance.measure(M, a));
        }
        vc = -1.1, If = 0, B1 = j1 = null, fv = -1.1, cm = wr, wr = -1.1, Yr = Ql();
      }
      if ((t & 4194048) !== 0 && (Ol = Vp, o = 0 <= Ro && Ro < Oo ? Oo : Ro, a = 0 <= $u && $u < Oo ? Oo : $u, i = 0 <= Pf && Pf < Oo ? Oo : Pf, f = 0 <= i ? i : 0 <= a ? a : oa, 0 <= sv ? (Bn(256), Gg(
        sv,
        f,
        t,
        Ol
      )) : rv & 4194048, H = i, h = Gr, y = 0 < es, p = q1 === ov, f = oa, i = Vp, d = lb, M = ab, ll && (gt = "Transition", 0 < a ? a > f && (a = f) : a = f, 0 < o ? o > a && (o = a) : o = a, 0 < H ? H > o && (H = o) : H = o, o > H && h !== null && (O = y ? "secondary-light" : "warning", i ? i.run(
        console.timeStamp.bind(
          console,
          y ? "Consecutive" : "Event: " + h,
          H,
          o,
          gt,
          mt,
          O
        )
      ) : console.timeStamp(
        y ? "Consecutive" : "Event: " + h,
        H,
        o,
        gt,
        mt,
        O
      )), a > o && (i ? i.run(
        console.timeStamp.bind(
          console,
          "Action",
          o,
          a,
          gt,
          mt,
          "primary-dark"
        )
      ) : console.timeStamp(
        "Action",
        o,
        a,
        gt,
        mt,
        "primary-dark"
      )), f > a && (o = p ? "Promise Resolved" : 5 < f - a ? "Update Blocked" : "Update", H = [], M != null && H.push(["Component name", M]), d != null && H.push(["Method name", d]), a = {
        start: a,
        end: f,
        detail: {
          devtools: {
            properties: H,
            track: gt,
            trackGroup: mt,
            color: "primary-light"
          }
        }
      }, i ? i.run(
        performance.measure.bind(
          performance,
          o,
          a
        )
      ) : performance.measure(o, a))), $u = Ro = -1.1, q1 = 0, sv = -1.1, es = Pf, Pf = -1.1, Oo = Ql()), (t & 62914560) !== 0 && (rv & 62914560) !== 0 && (Bn(4194304), Zm(nb, oa)), (t & 2080374784) !== 0 && (rv & 2080374784) !== 0 && (Bn(268435456), Zm(ub, oa)), a = e.timeoutHandle, a !== td && (e.timeoutHandle = td, HT(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Di = 0, dh(), Jt = e, ot = a = pu(
        e.current,
        null
      ), ut = t, wt = Mn, cu = null, as = !1, Sm = bl(e, t), lS = !1, hl = Co, Wr = Cn = aS = us = ns = 0, dn = sg = null, Dv = !1, (t & 8) !== 0 && (t |= t & 32), i = e.entangledLanes, i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; )
          o = 31 - Fl(i), f = 1 << o, t |= e[o], i &= ~f;
      return bc = t, Od(), e = WS(), 1e3 < e - kS && (X.recentlyCreatedOwnerStacks = 0, kS = e), Oi.discardPendingWarnings(), a;
    }
    function $n(e, t) {
      Ge = null, X.H = ng, X.getCurrentStack = null, Yu = !1, ja = null, t === fm || t === yv ? (t = Xc(), wt = og) : t === L1 ? (t = Xc(), wt = tE) : wt = t === F1 ? tS : t !== null && typeof t == "object" && typeof t.then == "function" ? fg : Rv, cu = t;
      var a = ot;
      a === null ? (hl = cg, Is(
        e,
        da(t, e.current)
      )) : a.mode & at && Ud(a);
    }
    function Vy() {
      var e = nu.current;
      return e === null ? !0 : (ut & 4194048) === ut ? ku === null : (ut & 62914560) === ut || (ut & 536870912) !== 0 ? e === ku : !1;
    }
    function hh() {
      var e = X.H;
      return X.H = ng, e === null ? ng : e;
    }
    function Zy() {
      var e = X.A;
      return X.A = vT, e;
    }
    function gf(e) {
      Ol === null && (Ol = e._debugTask == null ? null : e._debugTask);
    }
    function vf() {
      hl = ls, as || (ut & 4194048) !== ut && nu.current !== null || (Sm = !0), (ns & 134217727) === 0 && (us & 134217727) === 0 || Jt === null || On(
        Jt,
        ut,
        Cn,
        !1
      );
    }
    function Sf(e, t, a) {
      var i = St;
      St |= ea;
      var o = hh(), f = Zy();
      if (Jt !== e || ut !== t) {
        if (Gu) {
          var d = e.memoizedUpdaters;
          0 < d.size && (Ef(e, ut), d.clear()), La(e, t);
        }
        rg = null, Uu(e, t);
      }
      t = !1, d = hl;
      e: do
        try {
          if (wt !== Mn && ot !== null) {
            var h = ot, y = cu;
            switch (wt) {
              case tS:
                dh(), d = Ov;
                break e;
              case og:
              case $r:
              case kr:
              case fg:
                nu.current === null && (t = !0);
                var p = wt;
                if (wt = Mn, cu = null, bf(e, h, y, p), a && Sm) {
                  d = Co;
                  break e;
                }
                break;
              default:
                p = wt, wt = Mn, cu = null, bf(e, h, y, p);
            }
          }
          Jy(), d = hl;
          break;
        } catch (M) {
          $n(e, M);
        }
      while (!0);
      return t && e.shellSuspendCounter++, ko(), St = i, X.H = o, X.A = f, ot === null && (Jt = null, ut = 0, Od()), d;
    }
    function Jy() {
      for (; ot !== null; ) mh(ot);
    }
    function yi(e, t) {
      var a = St;
      St |= ea;
      var i = hh(), o = Zy();
      if (Jt !== e || ut !== t) {
        if (Gu) {
          var f = e.memoizedUpdaters;
          0 < f.size && (Ef(e, ut), f.clear()), La(e, t);
        }
        rg = null, Mv = Ll() + nE, Uu(e, t);
      } else
        Sm = bl(
          e,
          t
        );
      e: do
        try {
          if (wt !== Mn && ot !== null)
            t: switch (t = ot, f = cu, wt) {
              case Rv:
                wt = Mn, cu = null, bf(
                  e,
                  t,
                  f,
                  Rv
                );
                break;
              case $r:
              case kr:
                if (ay(f)) {
                  wt = Mn, cu = null, Ky(t);
                  break;
                }
                t = function() {
                  wt !== $r && wt !== kr || Jt !== e || (wt = _v), Ua(e);
                }, f.then(t, t);
                break e;
              case og:
                wt = _v;
                break e;
              case tE:
                wt = eS;
                break e;
              case _v:
                ay(f) ? (wt = Mn, cu = null, Ky(t)) : (wt = Mn, cu = null, bf(
                  e,
                  t,
                  f,
                  _v
                ));
                break;
              case eS:
                var d = null;
                switch (ot.tag) {
                  case 26:
                    d = ot.memoizedState;
                  case 5:
                  case 27:
                    var h = ot;
                    if (d ? ft(d) : h.stateNode.complete) {
                      wt = Mn, cu = null;
                      var y = h.sibling;
                      if (y !== null) ot = y;
                      else {
                        var p = h.return;
                        p !== null ? (ot = p, sr(p)) : ot = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                wt = Mn, cu = null, bf(
                  e,
                  t,
                  f,
                  eS
                );
                break;
              case fg:
                wt = Mn, cu = null, bf(
                  e,
                  t,
                  f,
                  fg
                );
                break;
              case tS:
                dh(), hl = Ov;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          X.actQueue !== null ? Jy() : Tl();
          break;
        } catch (M) {
          $n(e, M);
        }
      while (!0);
      return ko(), X.H = i, X.A = o, St = a, ot !== null ? Co : (Jt = null, ut = 0, Od(), hl);
    }
    function Tl() {
      for (; ot !== null && !Xh(); )
        mh(ot);
    }
    function mh(e) {
      var t = e.alternate;
      (e.mode & at) !== Be ? (ni(e), t = he(
        e,
        lr,
        t,
        e,
        bc
      ), Ud(e)) : t = he(
        e,
        lr,
        t,
        e,
        bc
      ), e.memoizedProps = e.pendingProps, t === null ? sr(e) : ot = t;
    }
    function Ky(e) {
      var t = he(e, Gl, e);
      e.memoizedProps = e.pendingProps, t === null ? sr(e) : ot = t;
    }
    function Gl(e) {
      var t = e.alternate, a = (e.mode & at) !== Be;
      switch (a && ni(e), e.tag) {
        case 15:
        case 0:
          t = Ty(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            ut
          );
          break;
        case 11:
          t = Ty(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            ut
          );
          break;
        case 5:
          Ji(e);
        default:
          zy(t, e), e = ot = km(e, bc), t = lr(t, e, bc);
      }
      return a && Ud(e), t;
    }
    function bf(e, t, a, i) {
      ko(), Ji(t), sm = null, eg = 0;
      var o = t.return;
      try {
        if (yy(
          e,
          o,
          t,
          a,
          ut
        )) {
          hl = cg, Is(
            e,
            da(a, e.current)
          ), ot = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw ot = o, f;
        hl = cg, Is(
          e,
          da(a, e.current)
        ), ot = null;
        return;
      }
      t.flags & 32768 ? (ht || i === Rv ? e = !0 : Sm || (ut & 536870912) !== 0 ? e = !1 : (as = e = !0, (i === $r || i === kr || i === og || i === fg) && (i = nu.current, i !== null && i.tag === 13 && (i.flags |= 16384))), $y(t, e)) : sr(t);
    }
    function sr(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          $y(
            t,
            as
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, ni(t), a = he(
          t,
          Dy,
          a,
          t,
          bc
        ), (t.mode & at) !== Be && xs(t), a !== null) {
          ot = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          ot = t;
          return;
        }
        ot = t = e;
      } while (t !== null);
      hl === Co && (hl = eE);
    }
    function $y(e, t) {
      do {
        var a = l0(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, ot = a;
          return;
        }
        if ((e.mode & at) !== Be) {
          xs(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          ot = e;
          return;
        }
        ot = e = a;
      } while (e !== null);
      hl = Ov, ot = null;
    }
    function Qt(e, t, a, i, o, f, d, h, y, p, M, H, O, G) {
      e.cancelPendingCommit = null;
      do
        rr();
      while ($l !== cs);
      if (Oi.flushLegacyContextWarning(), Oi.flushPendingUnsafeLifecycleWarnings(), (St & (ea | iu)) !== sa)
        throw Error("Should not already be working.");
      if (Bn(a), p === Kr ? Vm(
        O,
        G,
        a,
        Ol
      ) : i !== null ? n1(
        O,
        G,
        a,
        i,
        t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) !== 0,
        Ol
      ) : a1(
        O,
        G,
        a,
        Ol
      ), t !== null) {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= C1, id(
          e,
          a,
          f,
          d,
          h,
          y
        ), e === Jt && (ot = Jt = null, ut = 0), bm = t, os = e, Di = a, iS = f, oS = o, sE = i, cS = G, rE = H, zi = Cv, dE = null, t.actualDuration !== 0 || (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Tf(yo, function() {
          return gg = window.event, zi === Cv && (zi = uS), dr(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), Ao = null, Ff = Ql(), H !== null && u1(
          G,
          Ff,
          H,
          Ol
        ), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
          i = X.T, X.T = null, o = _t.p, _t.p = Cl, d = St, St |= iu;
          try {
            o1(e, t, a);
          } finally {
            St = d, _t.p = o, X.T = i;
          }
        }
        $l = iE, Ea(), Hu(), ky();
      }
    }
    function Ea() {
      if ($l === iE) {
        $l = cs;
        var e = os, t = bm, a = Di, i = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || i) {
          i = X.T, X.T = null;
          var o = _t.p;
          _t.p = Cl;
          var f = St;
          St |= iu;
          try {
            gm = a, vm = e, Gc(), ir(t, e), vm = gm = null, a = SS;
            var d = Ed(e.containerInfo), h = a.focusedElem, y = a.selectionRange;
            if (d !== h && h && h.ownerDocument && jg(
              h.ownerDocument.documentElement,
              h
            )) {
              if (y !== null && Lm(h)) {
                var p = y.start, M = y.end;
                if (M === void 0 && (M = p), "selectionStart" in h)
                  h.selectionStart = p, h.selectionEnd = Math.min(
                    M,
                    h.value.length
                  );
                else {
                  var H = h.ownerDocument || document, O = H && H.defaultView || window;
                  if (O.getSelection) {
                    var G = O.getSelection(), fe = h.textContent.length, me = Math.min(
                      y.start,
                      fe
                    ), Wt = y.end === void 0 ? me : Math.min(y.end, fe);
                    !G.extend && me > Wt && (d = Wt, Wt = me, me = d);
                    var yt = xg(
                      h,
                      me
                    ), T = xg(
                      h,
                      Wt
                    );
                    if (yt && T && (G.rangeCount !== 1 || G.anchorNode !== yt.node || G.anchorOffset !== yt.offset || G.focusNode !== T.node || G.focusOffset !== T.offset)) {
                      var R = H.createRange();
                      R.setStart(yt.node, yt.offset), G.removeAllRanges(), me > Wt ? (G.addRange(R), G.extend(T.node, T.offset)) : (R.setEnd(T.node, T.offset), G.addRange(R));
                    }
                  }
                }
              }
              for (H = [], G = h; G = G.parentNode; )
                G.nodeType === 1 && H.push({
                  element: G,
                  left: G.scrollLeft,
                  top: G.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < H.length; h++) {
                var D = H[h];
                D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
              }
            }
            Jv = !!vS, SS = vS = null;
          } finally {
            St = f, _t.p = o, X.T = i;
          }
        }
        e.current = t, $l = cE;
      }
    }
    function Hu() {
      if ($l === cE) {
        $l = cs;
        var e = dE;
        if (e !== null) {
          Ff = Ql();
          var t = To, a = Ff;
          !ll || a <= t || console.timeStamp(
            e,
            t,
            a,
            gt,
            mt,
            "secondary-light"
          );
        }
        e = os, t = bm, a = Di;
        var i = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || i) {
          i = X.T, X.T = null;
          var o = _t.p;
          _t.p = Cl;
          var f = St;
          St |= iu;
          try {
            gm = a, vm = e, Gc(), ch(
              e,
              t.alternate,
              t
            ), vm = gm = null;
          } finally {
            St = f, _t.p = o, X.T = i;
          }
        }
        e = cS, t = rE, To = Ql(), e = t === null ? e : Ff, t = To, a = zi === nS, i = Ol, Ao !== null ? Lg(
          e,
          t,
          Ao,
          !1,
          i
        ) : !ll || t <= e || (i ? i.run(
          console.timeStamp.bind(
            console,
            a ? "Commit Interrupted View Transition" : "Commit",
            e,
            t,
            gt,
            mt,
            a ? "error" : "secondary-dark"
          )
        ) : console.timeStamp(
          a ? "Commit Interrupted View Transition" : "Commit",
          e,
          t,
          gt,
          mt,
          a ? "error" : "secondary-dark"
        )), $l = oE;
      }
    }
    function ky() {
      if ($l === fE || $l === oE) {
        if ($l === fE) {
          var e = To;
          To = Ql();
          var t = To, a = zi === nS;
          !ll || t <= e || console.timeStamp(
            a ? "Interrupted View Transition" : "Starting Animation",
            e,
            t,
            gt,
            mt,
            a ? " error" : "secondary-light"
          ), zi !== nS && (zi = uE);
        }
        $l = cs, Qh(), e = os;
        var i = bm;
        t = Di, a = sE;
        var o = i.actualDuration !== 0 || (i.subtreeFlags & 10256) !== 0 || (i.flags & 10256) !== 0;
        o ? $l = Uv : ($l = cs, bm = os = null, Wy(
          e,
          e.pendingLanes
        ), Fr = 0, hg = null);
        var f = e.pendingLanes;
        if (f === 0 && (is = null), o || gh(e), f = Nl(t), i = i.stateNode, Ml && typeof Ml.onCommitFiberRoot == "function")
          try {
            var d = (i.current.flags & 128) === 128;
            switch (f) {
              case Cl:
                var h = _p;
                break;
              case Il:
                h = Vh;
                break;
              case ca:
                h = yo;
                break;
              case yc:
                h = Zh;
                break;
              default:
                h = yo;
            }
            Ml.onCommitFiberRoot(
              po,
              i,
              h,
              d
            );
          } catch (H) {
            wu || (wu = !0, console.error(
              "React instrumentation encountered an error: %o",
              H
            ));
          }
        if (Gu && e.memoizedUpdaters.clear(), Xy(), a !== null) {
          d = X.T, h = _t.p, _t.p = Cl, X.T = null;
          try {
            var y = e.onRecoverableError;
            for (i = 0; i < a.length; i++) {
              var p = a[i], M = d0(p.stack);
              he(
                p.source,
                y,
                p.value,
                M
              );
            }
          } finally {
            X.T = d, _t.p = h;
          }
        }
        (Di & 3) !== 0 && rr(), Ua(e), f = e.pendingLanes, (t & 261930) !== 0 && (f & 42) !== 0 ? (hv = !0, e === fS ? dg++ : (dg = 0, fS = e)) : dg = 0, o || cc(t, To), Nu(0);
      }
    }
    function d0(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function Wy(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ns(t)));
    }
    function rr() {
      return Ea(), Hu(), ky(), dr();
    }
    function dr() {
      if ($l !== Uv) return !1;
      var e = os, t = iS;
      iS = 0;
      var a = Nl(Di), i = ca > a ? ca : a;
      a = X.T;
      var o = _t.p;
      try {
        _t.p = i, X.T = null;
        var f = oS;
        oS = null, i = os;
        var d = Di;
        if ($l = cs, bm = os = null, Di = 0, (St & (ea | iu)) !== sa)
          throw Error("Cannot flush passive effects while already rendering.");
        Bn(d), sS = !0, Hv = !1;
        var h = 0;
        if (Ao = null, h = Ll(), zi === uE)
          Zm(
            To,
            h,
            rT
          );
        else {
          var y = To, p = h, M = zi === uS;
          !ll || p <= y || (Ol ? Ol.run(
            console.timeStamp.bind(
              console,
              M ? "Waiting for Paint" : "Waiting",
              y,
              p,
              gt,
              mt,
              "secondary-light"
            )
          ) : console.timeStamp(
            M ? "Waiting for Paint" : "Waiting",
            y,
            p,
            gt,
            mt,
            "secondary-light"
          ));
        }
        y = St, St |= iu;
        var H = i.current;
        Gc(), sh(H);
        var O = i.current;
        H = cS, Gc(), wy(
          i,
          O,
          d,
          f,
          H
        ), gh(i), St = y;
        var G = Ll();
        if (O = h, H = Ol, Ao !== null ? Lg(
          O,
          G,
          Ao,
          !0,
          H
        ) : !ll || G <= O || (H ? H.run(
          console.timeStamp.bind(
            console,
            "Remaining Effects",
            O,
            G,
            gt,
            mt,
            "secondary-dark"
          )
        ) : console.timeStamp(
          "Remaining Effects",
          O,
          G,
          gt,
          mt,
          "secondary-dark"
        )), cc(d, G), Nu(0, !1), Hv ? i === hg ? Fr++ : (Fr = 0, hg = i) : Fr = 0, Hv = sS = !1, Ml && typeof Ml.onPostCommitFiberRoot == "function")
          try {
            Ml.onPostCommitFiberRoot(po, i);
          } catch (me) {
            wu || (wu = !0, console.error(
              "React instrumentation encountered an error: %o",
              me
            ));
          }
        var fe = i.current.stateNode;
        return fe.effectDuration = 0, fe.passiveEffectDuration = 0, !0;
      } finally {
        _t.p = o, X.T = a, Wy(e, t);
      }
    }
    function Ta(e, t, a) {
      t = da(a, t), Kg(t), t = Kd(e.stateNode, t, 2), e = bu(e, t, 2), e !== null && (Hn(e, 2), Ua(e));
    }
    function Ie(e, t, a) {
      if (Em = !1, e.tag === 3)
        Ta(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            Ta(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (is === null || !is.has(i))) {
              e = da(a, e), Kg(e), a = $d(2), i = bu(t, a, 2), i !== null && (kd(
                a,
                i,
                t,
                e
              ), Hn(i, 2), Ua(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function yh(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new bT();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(a) || (lS = !0, o.add(a), i = Ca.bind(null, e, t, a), Gu && Ef(e, a), t.then(i, i));
    }
    function Ca(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, (a & 127) !== 0 ? 0 > vc && (Yr = vc = Ql(), Xp = cv("Promise Resolved"), If = ov) : (a & 4194048) !== 0 && 0 > $u && (Oo = $u = Ql(), Vp = cv("Promise Resolved"), q1 = ov), Qy() && X.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), Jt === e && (ut & a) === a && (hl === ls || hl === Av && (ut & 62914560) === ut && Ll() - zv < aE ? (St & ea) === sa && Uu(e, 0) : aS |= a, Wr === ut && (Wr = 0)), Ua(e);
    }
    function Fy(e, t) {
      t === 0 && (t = xo()), e = aa(e, t), e !== null && (Hn(e, t), Ua(e));
    }
    function pi(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Fy(e, a);
    }
    function uo(e, t) {
      var a = 0;
      switch (e.tag) {
        case 31:
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), Fy(e, a);
    }
    function kn(e, t, a) {
      if ((t.subtreeFlags & 67117056) !== 0)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === Ra;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && he(
            o,
            ph,
            i,
            o
          ) : kn(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? he(
            o,
            ph,
            i,
            o
          ) : o.subtreeFlags & 67108864 && he(
            o,
            kn,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function ph(e, t) {
      ve(!0);
      try {
        oh(t), Ly(t), Yy(e, t.alternate, t, !1), fr(e, t, 0, null, !1, 0);
      } finally {
        ve(!1);
      }
    }
    function gh(e) {
      var t = !0;
      e.current.mode & (Ba | Ai) || (t = !1), kn(
        e,
        e.current,
        t
      );
    }
    function Rn(e) {
      if ((St & ea) === sa) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = ge(e) || "ReactComponent", Nv !== null) {
            if (Nv.has(t)) return;
            Nv.add(t);
          } else Nv = /* @__PURE__ */ new Set([t]);
          he(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function Ef(e, t) {
      Gu && e.memoizedUpdaters.forEach(function(a) {
        Rl(e, a, t);
      });
    }
    function Tf(e, t) {
      var a = X.actQueue;
      return a !== null ? (a.push(t), AT) : Rp(e, t);
    }
    function hr(e) {
      Qy() && X.actQueue === null && he(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          ge(e)
        );
      });
    }
    function Ua(e) {
      e !== Tm && e.next === null && (Tm === null ? xv = Tm = e : Tm = Tm.next = e), jv = !0, X.actQueue !== null ? dS || (dS = !0, m0()) : rS || (rS = !0, m0());
    }
    function Nu(e, t) {
      if (!hS && jv) {
        hS = !0;
        do
          for (var a = !1, i = xv; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - Fl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, mr(i, f));
            } else
              f = ut, f = Ac(
                i,
                i === Jt ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== td
              ), (f & 3) === 0 || bl(i, f) || (a = !0, mr(i, f));
            i = i.next;
          }
        while (a);
        hS = !1;
      }
    }
    function h0() {
      gg = window.event, vh();
    }
    function vh() {
      jv = dS = rS = !1;
      var e = 0;
      fs !== 0 && tp() && (e = fs);
      for (var t = Ll(), a = null, i = xv; i !== null; ) {
        var o = i.next, f = Af(i, t);
        f === 0 ? (i.next = null, a === null ? xv = o : a.next = o, o === null && (Tm = a)) : (a = i, (e !== 0 || (f & 3) !== 0) && (jv = !0)), i = o;
      }
      $l !== cs && $l !== Uv || Nu(e), fs !== 0 && (fs = 0);
    }
    function Af(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - Fl(f), h = 1 << d, y = o[d];
        y === -1 ? ((h & a) === 0 || (h & i) !== 0) && (o[d] = ud(h, t)) : y <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = Jt, a = ut, a = Ac(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== td
      ), i = e.callbackNode, a === 0 || e === t && (wt === $r || wt === kr) || e.cancelPendingCommit !== null)
        return i !== null && Sh(i), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || bl(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || X.actQueue !== null && i !== mS)
          Sh(i);
        else return t;
        switch (Nl(a)) {
          case Cl:
          case Il:
            a = Vh;
            break;
          case ca:
            a = yo;
            break;
          case yc:
            a = Zh;
            break;
          default:
            a = yo;
        }
        return i = Iy.bind(null, e), X.actQueue !== null ? (X.actQueue.push(i), a = mS) : a = Rp(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && Sh(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Iy(e, t) {
      if (hv = dv = !1, gg = window.event, $l !== cs && $l !== Uv)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (zi === Cv && (zi = uS), rr() && e.callbackNode !== a)
        return null;
      var i = ut;
      return i = Ac(
        e,
        e === Jt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== td
      ), i === 0 ? null : (f0(
        e,
        i,
        t
      ), Af(e, Ll()), e.callbackNode != null && e.callbackNode === a ? Iy.bind(null, e) : null);
    }
    function mr(e, t) {
      if (rr()) return null;
      dv = hv, hv = !1, f0(e, t, !0);
    }
    function Sh(e) {
      e !== mS && e !== null && Lh(e);
    }
    function m0() {
      X.actQueue !== null && X.actQueue.push(function() {
        return vh(), null;
      }), NT(function() {
        (St & (ea | iu)) !== sa ? Rp(
          _p,
          h0
        ) : vh();
      });
    }
    function Py() {
      if (fs === 0) {
        var e = Lr;
        e === 0 && (e = Lf, Lf <<= 1, (Lf & 261888) === 0 && (Lf = 256)), fs = e;
      }
      return fs;
    }
    function Tt(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Et(e, "action"), As("" + e));
    }
    function Bt(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function dt(e, t, a, i, o) {
      if (t === "submit" && a && a.stateNode === o) {
        var f = Tt(
          (o[_a] || null).action
        ), d = i.submitter;
        d && (t = (t = d[_a] || null) ? Tt(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new ev(
          "action",
          "action",
          null,
          i,
          o
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (fs !== 0) {
                    var y = d ? Bt(
                      o,
                      d
                    ) : new FormData(o), p = {
                      pending: !0,
                      data: y,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(p), di(
                      a,
                      p,
                      null,
                      y
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), y = d ? Bt(
                    o,
                    d
                  ) : new FormData(o), p = {
                    pending: !0,
                    data: y,
                    method: o.method,
                    action: f
                  }, Object.freeze(p), di(
                    a,
                    p,
                    f,
                    y
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function ct(e, t, a) {
      e.currentTarget = a;
      try {
        t(e);
      } catch (i) {
        _1(i);
      }
      e.currentTarget = null;
    }
    function Ut(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], y = h.instance, p = h.currentTarget;
              if (h = h.listener, y !== o && f.isPropagationStopped())
                break e;
              y !== null ? he(
                y,
                ct,
                f,
                h,
                p
              ) : ct(f, h, p), o = y;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], y = h.instance, p = h.currentTarget, h = h.listener, y !== o && f.isPropagationStopped())
                break e;
              y !== null ? he(
                y,
                ct,
                f,
                h,
                p
              ) : ct(f, h, p), o = y;
            }
        }
      }
    }
    function je(e, t) {
      yS.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[go];
      a === void 0 && (a = t[go] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (bh(t, e, 2, !1), a.add(i));
    }
    function xu(e, t, a) {
      yS.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), bh(
        a,
        e,
        i,
        t
      );
    }
    function oc(e) {
      if (!e[Bv]) {
        e[Bv] = !0, k0.forEach(function(a) {
          a !== "selectionchange" && (yS.has(a) || xu(a, !1, e), xu(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Bv] || (t[Bv] = !0, xu("selectionchange", !1, t));
      }
    }
    function bh(e, t, a, i) {
      switch (xh(t)) {
        case Cl:
          var o = mp;
          break;
        case Il:
          o = Wl;
          break;
        default:
          o = yp;
      }
      a = o.bind(
        null,
        t,
        a,
        e
      ), o = void 0, !p1 || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, a, !0) : o !== void 0 ? e.addEventListener(t, a, {
        passive: o
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function Wn(e, t, a, i, o) {
      var f = i;
      if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var y = d.tag;
                if ((y === 3 || y === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = ue(h), d === null) return;
              if (y = d.tag, y === 5 || y === 6 || y === 26 || y === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      gd(function() {
        var p = f, M = xn(a), H = [];
        e: {
          var O = $S.get(e);
          if (O !== void 0) {
            var G = ev, fe = e;
            switch (e) {
              case "keypress":
                if (Os(a) === 0) break e;
              case "keydown":
              case "keyup":
                G = Y2;
                break;
              case "focusin":
                fe = "focus", G = b1;
                break;
              case "focusout":
                fe = "blur", G = b1;
                break;
              case "beforeblur":
              case "afterblur":
                G = b1;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                G = xS;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                G = _2;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                G = L2;
                break;
              case VS:
              case ZS:
              case JS:
                G = M2;
                break;
              case KS:
                G = Q2;
                break;
              case "scroll":
              case "scrollend":
                G = O2;
                break;
              case "wheel":
                G = Z2;
                break;
              case "copy":
              case "cut":
              case "paste":
                G = U2;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                G = BS;
                break;
              case "toggle":
              case "beforetoggle":
                G = K2;
            }
            var me = (t & 4) !== 0, Wt = !me && (e === "scroll" || e === "scrollend"), yt = me ? O !== null ? O + "Capture" : null : O;
            me = [];
            for (var T = p, R; T !== null; ) {
              var D = T;
              if (R = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || R === null || yt === null || (D = mu(T, yt), D != null && me.push(
                Vt(
                  T,
                  D,
                  R
                )
              )), Wt) break;
              T = T.return;
            }
            0 < me.length && (O = new G(
              O,
              fe,
              null,
              a,
              M
            ), H.push({
              event: O,
              listeners: me
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (O = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", O && a !== Up && (fe = a.relatedTarget || a.fromElement) && (ue(fe) || fe[Ti]))
              break e;
            if ((G || O) && (O = M.window === M ? M : (O = M.ownerDocument) ? O.defaultView || O.parentWindow : window, G ? (fe = a.relatedTarget || a.toElement, G = p, fe = fe ? ue(fe) : null, fe !== null && (Wt = Ke(fe), me = fe.tag, fe !== Wt || me !== 5 && me !== 27 && me !== 6) && (fe = null)) : (G = null, fe = p), G !== fe)) {
              if (me = xS, D = "onMouseLeave", yt = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (me = BS, D = "onPointerLeave", yt = "onPointerEnter", T = "pointer"), Wt = G == null ? O : Se(G), R = fe == null ? O : Se(fe), O = new me(
                D,
                T + "leave",
                G,
                a,
                M
              ), O.target = Wt, O.relatedTarget = R, D = null, ue(M) === p && (me = new me(
                yt,
                T + "enter",
                fe,
                a,
                M
              ), me.target = R, me.relatedTarget = Wt, D = me), Wt = D, G && fe)
                t: {
                  for (me = io, yt = G, T = fe, R = 0, D = yt; D; D = me(D))
                    R++;
                  D = 0;
                  for (var K = T; K; K = me(K))
                    D++;
                  for (; 0 < R - D; )
                    yt = me(yt), R--;
                  for (; 0 < D - R; )
                    T = me(T), D--;
                  for (; R--; ) {
                    if (yt === T || T !== null && yt === T.alternate) {
                      me = yt;
                      break t;
                    }
                    yt = me(yt), T = me(T);
                  }
                  me = null;
                }
              else me = null;
              G !== null && Eh(
                H,
                O,
                G,
                me,
                !1
              ), fe !== null && Wt !== null && Eh(
                H,
                Wt,
                fe,
                me,
                !0
              );
            }
          }
          e: {
            if (O = p ? Se(p) : window, G = O.nodeName && O.nodeName.toLowerCase(), G === "select" || G === "input" && O.type === "file")
              var se = Yi;
            else if (Ym(O))
              if (XS)
                se = zs;
              else {
                se = wm;
                var Le = l1;
              }
            else
              G = O.nodeName, !G || G.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? p && hu(p.elementType) && (se = Yi) : se = Gm;
            if (se && (se = se(e, p))) {
              _s(
                H,
                se,
                a,
                M
              );
              break e;
            }
            Le && Le(e, O, p), e === "focusout" && p && O.type === "number" && p.memoizedProps.value != null && Mm(O, "number", O.value);
          }
          switch (Le = p ? Se(p) : window, e) {
            case "focusin":
              (Ym(Le) || Le.contentEditable === "true") && (Ph = Le, T1 = p, Yp = null);
              break;
            case "focusout":
              Yp = T1 = Ph = null;
              break;
            case "mousedown":
              A1 = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              A1 = !1, Bg(
                H,
                a,
                M
              );
              break;
            case "selectionchange":
              if (F2) break;
            case "keydown":
            case "keyup":
              Bg(
                H,
                a,
                M
              );
          }
          var ze;
          if (E1)
            e: {
              switch (e) {
                case "compositionstart":
                  var Re = "onCompositionStart";
                  break e;
                case "compositionend":
                  Re = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  Re = "onCompositionUpdate";
                  break e;
              }
              Re = void 0;
            }
          else
            Ih ? Vo(e, a) && (Re = "onCompositionEnd") : e === "keydown" && a.keyCode === qS && (Re = "onCompositionStart");
          Re && (YS && a.locale !== "ko" && (Ih || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && Ih && (ze = Cc()) : (Jf = M, g1 = "value" in Jf ? Jf.value : Jf.textContent, Ih = !0)), Le = Fn(
            p,
            Re
          ), 0 < Le.length && (Re = new jS(
            Re,
            e,
            null,
            a,
            M
          ), H.push({
            event: Re,
            listeners: Le
          }), ze ? Re.data = ze : (ze = li(a), ze !== null && (Re.data = ze)))), (ze = k2 ? qm(e, a) : vd(e, a)) && (Re = Fn(
            p,
            "onBeforeInput"
          ), 0 < Re.length && (Le = new N2(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            M
          ), H.push({
            event: Le,
            listeners: Re
          }), Le.data = ze)), dt(
            H,
            e,
            p,
            a,
            M
          );
        }
        Ut(H, t);
      });
    }
    function Vt(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Fn(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = mu(e, a), o != null && i.unshift(
          Vt(e, o, f)
        ), o = mu(e, t), o != null && i.push(
          Vt(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function io(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Eh(e, t, a, i, o) {
      for (var f = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, y = h.alternate, p = h.stateNode;
        if (h = h.tag, y !== null && y === i) break;
        h !== 5 && h !== 26 && h !== 27 || p === null || (y = p, o ? (p = mu(a, f), p != null && d.unshift(
          Vt(a, p, y)
        )) : o || (p = mu(a, f), p != null && d.push(
          Vt(a, p, y)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function Aa(e, t) {
      Ug(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || HS || (HS = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Lu,
        possibleRegistrationNames: Vf
      };
      hu(e) || typeof t.is == "string" || t1(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function il(e, t, a, i) {
      t !== a && (a = In(a), In(t) !== a && (i[e] = t));
    }
    function yr(e, t, a) {
      t.forEach(function(i) {
        a[gi(i)] = i === "style" ? fc(e) : e.getAttribute(i);
      });
    }
    function cl(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function Th(e, t) {
      return e = e.namespaceURI === Ze || e.namespaceURI === Pe ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function In(e) {
      return Ga(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        Ui(e)
      ), ou(e)), (typeof e == "string" ? e : "" + e).replace(OT, `
`).replace(RT, "");
    }
    function ep(e, t) {
      return t = In(t), In(e) === t;
    }
    function Rt(e, t, a, i, o, f) {
      switch (a) {
        case "children":
          typeof i == "string" ? (Ts(i, t, !1), t === "body" || t === "textarea" && i === "" || Mc(e, i)) : (typeof i == "number" || typeof i == "bigint") && (Ts("" + i, t, !1), t !== "body" && Mc(e, "" + i));
          break;
        case "className":
          Ss(e, "class", i);
          break;
        case "tabIndex":
          Ss(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Ss(e, a, i);
          break;
        case "style":
          xm(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            Ss(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          Et(i, a), i = As("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || wv || (wv = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || Yv || (Yv = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || qv ? t !== "button" || o.type == null || o.type === "submit" || qv ? typeof i == "function" && (o.name == null || gE || (gE = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || wv || (wv = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || Yv || (Yv = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (qv = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (qv = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (t !== "input" && Rt(e, t, "name", o.name, o, null), Rt(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), Rt(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), Rt(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (Rt(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), Rt(e, t, "method", o.method, o, null), Rt(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          Et(i, a), i = As("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && cl(a, i), e.onclick = yn);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && cl(a, i), je("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && cl(a, i), je("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          Et(i, a), a = As("" + i), e.setAttributeNS(Ir, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (Et(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || Gv[a] || (Gv[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (Et(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (Et(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (Et(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          je("beforetoggle", e), je("toggle", e), qo(e, "popover", i);
          break;
        case "xlinkActuate":
          su(
            e,
            Ir,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          su(
            e,
            Ir,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          su(
            e,
            Ir,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          su(
            e,
            Ir,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          su(
            e,
            Ir,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          su(
            e,
            Ir,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          su(
            e,
            pS,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          su(
            e,
            pS,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          su(
            e,
            pS,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), qo(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          vE || i == null || typeof i != "object" || (vE = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = Mg(a), qo(e, a, i)) : Lu.hasOwnProperty(a) && i != null && typeof i != "function" && cl(a, i);
      }
    }
    function Of(e, t, a, i, o, f) {
      switch (a) {
        case "style":
          xm(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? Mc(e, i) : (typeof i == "number" || typeof i == "bigint") && Mc(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && cl(a, i), je("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && cl(a, i), je("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && cl(a, i), e.onclick = yn);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Lu.hasOwnProperty(a))
            i != null && typeof i != "function" && cl(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), t = a.slice(2, o ? a.length - 7 : void 0), f = e[_a] || null, f = f != null ? f[a] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, o);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : qo(e, a, i);
            }
      }
    }
    function el(e, t, a) {
      switch (Aa(t, a), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          je("error", e), je("load", e);
          var i = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
              if (d != null)
                switch (f) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    Rt(e, t, f, d, a, null);
                }
            }
          o && Rt(e, t, "srcSet", a.srcSet, a, null), i && Rt(e, t, "src", a.src, a, null);
          return;
        case "input":
          la("input", a), je("invalid", e);
          var h = f = d = o = null, y = null, p = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var M = a[i];
              if (M != null)
                switch (i) {
                  case "name":
                    o = M;
                    break;
                  case "type":
                    d = M;
                    break;
                  case "checked":
                    y = M;
                    break;
                  case "defaultChecked":
                    p = M;
                    break;
                  case "value":
                    f = M;
                    break;
                  case "defaultValue":
                    h = M;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (M != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    Rt(e, t, i, M, a, null);
                }
            }
          ra(e, a), fd(
            e,
            f,
            h,
            y,
            p,
            d,
            o,
            !1
          );
          return;
        case "select":
          la("select", a), je("invalid", e), i = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  Rt(
                    e,
                    t,
                    o,
                    h,
                    a,
                    null
                  );
              }
          sd(e, a), t = f, a = d, e.multiple = !!i, t != null ? ru(e, !!i, t, !1) : a != null && ru(e, !!i, a, !0);
          return;
        case "textarea":
          la("textarea", a), je("invalid", e), f = o = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  Rt(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          Rc(e, a), Yo(e, i, o, f);
          return;
        case "option":
          zg(e, a);
          for (y in a)
            a.hasOwnProperty(y) && (i = a[y], i != null) && (y === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Rt(e, t, y, i, a, null));
          return;
        case "dialog":
          je("beforetoggle", e), je("toggle", e), je("cancel", e), je("close", e);
          break;
        case "iframe":
        case "object":
          je("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < mg.length; i++)
            je(mg[i], e);
          break;
        case "image":
          je("error", e), je("load", e);
          break;
        case "details":
          je("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          je("error", e), je("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (p in a)
            if (a.hasOwnProperty(p) && (i = a[p], i != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  Rt(e, t, p, i, a, null);
              }
          return;
        default:
          if (hu(t)) {
            for (M in a)
              a.hasOwnProperty(M) && (i = a[M], i !== void 0 && Of(
                e,
                t,
                M,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && Rt(e, t, h, i, a, null));
    }
    function zl(e, t, a, i) {
      switch (Aa(t, i), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o = null, f = null, d = null, h = null, y = null, p = null, M = null;
          for (G in a) {
            var H = a[G];
            if (a.hasOwnProperty(G) && H != null)
              switch (G) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  y = H;
                default:
                  i.hasOwnProperty(G) || Rt(
                    e,
                    t,
                    G,
                    null,
                    i,
                    H
                  );
              }
          }
          for (var O in i) {
            var G = i[O];
            if (H = a[O], i.hasOwnProperty(O) && (G != null || H != null))
              switch (O) {
                case "type":
                  f = G;
                  break;
                case "name":
                  o = G;
                  break;
                case "checked":
                  p = G;
                  break;
                case "defaultChecked":
                  M = G;
                  break;
                case "value":
                  d = G;
                  break;
                case "defaultValue":
                  h = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  G !== H && Rt(
                    e,
                    t,
                    O,
                    G,
                    i,
                    H
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || pE || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), pE = !0), !t || i || yE || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), yE = !0), ji(
            e,
            d,
            h,
            y,
            p,
            M,
            f,
            o
          );
          return;
        case "select":
          G = d = h = O = null;
          for (f in a)
            if (y = a[f], a.hasOwnProperty(f) && y != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  G = y;
                default:
                  i.hasOwnProperty(f) || Rt(
                    e,
                    t,
                    f,
                    null,
                    i,
                    y
                  );
              }
          for (o in i)
            if (f = i[o], y = a[o], i.hasOwnProperty(o) && (f != null || y != null))
              switch (o) {
                case "value":
                  O = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== y && Rt(
                    e,
                    t,
                    o,
                    f,
                    i,
                    y
                  );
              }
          i = h, t = d, a = G, O != null ? ru(e, !!t, O, !1) : !!a != !!t && (i != null ? ru(e, !!t, i, !0) : ru(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          G = O = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Rt(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = a[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  O = o;
                  break;
                case "defaultValue":
                  G = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && Rt(e, t, d, o, i, f);
              }
          _c(e, O, G);
          return;
        case "option":
          for (var fe in a)
            O = a[fe], a.hasOwnProperty(fe) && O != null && !i.hasOwnProperty(fe) && (fe === "selected" ? e.selected = !1 : Rt(
              e,
              t,
              fe,
              null,
              i,
              O
            ));
          for (y in i)
            O = i[y], G = a[y], i.hasOwnProperty(y) && O !== G && (O != null || G != null) && (y === "selected" ? e.selected = O && typeof O != "function" && typeof O != "symbol" : Rt(
              e,
              t,
              y,
              O,
              i,
              G
            ));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var me in a)
            O = a[me], a.hasOwnProperty(me) && O != null && !i.hasOwnProperty(me) && Rt(
              e,
              t,
              me,
              null,
              i,
              O
            );
          for (p in i)
            if (O = i[p], G = a[p], i.hasOwnProperty(p) && O !== G && (O != null || G != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (O != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Rt(
                    e,
                    t,
                    p,
                    O,
                    i,
                    G
                  );
              }
          return;
        default:
          if (hu(t)) {
            for (var Wt in a)
              O = a[Wt], a.hasOwnProperty(Wt) && O !== void 0 && !i.hasOwnProperty(Wt) && Of(
                e,
                t,
                Wt,
                void 0,
                i,
                O
              );
            for (M in i)
              O = i[M], G = a[M], !i.hasOwnProperty(M) || O === G || O === void 0 && G === void 0 || Of(
                e,
                t,
                M,
                O,
                i,
                G
              );
            return;
          }
      }
      for (var yt in a)
        O = a[yt], a.hasOwnProperty(yt) && O != null && !i.hasOwnProperty(yt) && Rt(e, t, yt, null, i, O);
      for (H in i)
        O = i[H], G = a[H], !i.hasOwnProperty(H) || O === G || O == null && G == null || Rt(e, t, H, O, i, G);
    }
    function gi(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function fc(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function ju(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (ta(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || Ee.has(f) ? (ta(d, f), i += o + f.replace(Q, "-$1").toLowerCase().replace(pe, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(Q, "-$1").toLowerCase().replace(pe, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = In(i), In(t) !== i && (a.style = fc(e)));
      }
    }
    function Ha(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (Et(i, t), e === "" + i)
              return;
        }
      il(t, e, i, f);
    }
    function Ah(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      il(t, e, i, f);
    }
    function Oh(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (Et(i, a), e === "" + i)
              return;
        }
      il(t, e, i, f);
    }
    function Rf(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (Et(i, t), e === "" + i))
              return;
        }
      il(t, e, i, f);
    }
    function pr(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (Et(i, t), a = As("" + i), e === a)
              return;
        }
      il(t, e, i, f);
    }
    function Na(e, t, a, i) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if (hu(t)) {
        for (var y in a)
          if (a.hasOwnProperty(y)) {
            var p = a[y];
            if (p != null) {
              if (Lu.hasOwnProperty(y))
                typeof p != "function" && cl(y, p);
              else if (a.suppressHydrationWarning !== !0)
                switch (y) {
                  case "children":
                    typeof p != "string" && typeof p != "number" || il(
                      "children",
                      e.textContent,
                      p,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, p = p ? p.__html : void 0, p != null && (p = Th(e, p), il(
                      y,
                      d,
                      p,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(y), ju(e, p, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(y.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      y
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = xi(
                      e,
                      "class",
                      p
                    ), il(
                      "className",
                      d,
                      p,
                      o
                    );
                    continue;
                  default:
                    i.context === Uo && t !== "svg" && t !== "math" ? f.delete(y.toLowerCase()) : f.delete(y), d = xi(
                      e,
                      y,
                      p
                    ), il(
                      y,
                      d,
                      p,
                      o
                    );
                }
            }
          }
      } else
        for (p in a)
          if (a.hasOwnProperty(p) && (y = a[p], y != null)) {
            if (Lu.hasOwnProperty(p))
              typeof y != "function" && cl(p, y);
            else if (a.suppressHydrationWarning !== !0)
              switch (p) {
                case "children":
                  typeof y != "string" && typeof y != "number" || il(
                    "children",
                    e.textContent,
                    y,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, y = y ? y.__html : void 0, y != null && (y = Th(e, y), d !== y && (o[p] = { __html: d }));
                  continue;
                case "className":
                  Ha(
                    e,
                    p,
                    "class",
                    y,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  Ha(
                    e,
                    p,
                    "tabindex",
                    y,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(p), ju(e, y, o);
                  continue;
                case "multiple":
                  f.delete(p), il(
                    p,
                    e.multiple,
                    y,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(p), il(
                    p,
                    e.muted,
                    y,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), il(
                    p,
                    e.autofocus,
                    y,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(p), d = e.getAttribute("data"), il(
                      p,
                      d,
                      y,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(y !== "" || t === "a" && p === "href" || t === "object" && p === "data")) {
                    console.error(
                      p === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      p,
                      p
                    );
                    continue;
                  }
                  pr(
                    e,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(p), typeof y == "function") {
                    f.delete(p.toLowerCase()), p === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === _T) {
                    f.delete(p.toLowerCase()), il(
                      p,
                      "function",
                      y,
                      o
                    );
                    continue;
                  }
                  pr(
                    e,
                    p,
                    p.toLowerCase(),
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  pr(
                    e,
                    p,
                    "xlink:href",
                    y,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  Oh(
                    e,
                    p,
                    "contenteditable",
                    y,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  Oh(
                    e,
                    p,
                    "spellcheck",
                    y,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  Oh(
                    e,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  Ah(
                    e,
                    p,
                    p.toLowerCase(),
                    y,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var M = d = p, H = o;
                    if (f.delete(M), h = h.getAttribute(M), h === null)
                      switch (typeof y) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (y === !1) break e;
                      }
                    else if (y != null)
                      switch (typeof y) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (y === !0 && h === "") break e;
                          break;
                        default:
                          if (Et(y, d), h === "" + y)
                            break e;
                      }
                    il(
                      d,
                      h,
                      y,
                      H
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, M = d = p, H = o, f.delete(M), h = h.getAttribute(M), h === null)
                      switch (typeof y) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(y) || 1 > y) break e;
                      }
                    else if (y != null)
                      switch (typeof y) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(y) || 1 > y) && (Et(y, d), h === "" + y))
                            break e;
                      }
                    il(
                      d,
                      h,
                      y,
                      H
                    );
                  }
                  continue;
                case "rowSpan":
                  Rf(
                    e,
                    p,
                    "rowspan",
                    y,
                    f,
                    o
                  );
                  continue;
                case "start":
                  Rf(
                    e,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  Ha(
                    e,
                    p,
                    "x-height",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  Ha(
                    e,
                    p,
                    "xlink:actuate",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  Ha(
                    e,
                    p,
                    "xlink:arcrole",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  Ha(
                    e,
                    p,
                    "xlink:role",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  Ha(
                    e,
                    p,
                    "xlink:show",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  Ha(
                    e,
                    p,
                    "xlink:title",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  Ha(
                    e,
                    p,
                    "xlink:type",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  Ha(
                    e,
                    p,
                    "xml:base",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  Ha(
                    e,
                    p,
                    "xml:lang",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  Ha(
                    e,
                    p,
                    "xml:space",
                    y,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  y !== "" || Gv[p] || (Gv[p] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    p
                  )), Ah(
                    e,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < p.length) || p[0] !== "o" && p[0] !== "O" || p[1] !== "n" && p[1] !== "N") {
                    h = Mg(p), d = !1, i.context === Uo && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (M = p.toLowerCase(), M = lu.hasOwnProperty(
                      M
                    ) && lu[M] || null, M !== null && M !== p && (d = !0, f.delete(M)), f.delete(h));
                    e: if (M = e, H = h, h = y, mn(H))
                      if (M.hasAttribute(H))
                        M = M.getAttribute(
                          H
                        ), Et(
                          h,
                          H
                        ), h = M === "" + h ? h : M;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (M = H.toLowerCase().slice(0, 5), M !== "data-" && M !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || il(
                      p,
                      h,
                      y,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && yr(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function y0(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function Oa(e) {
      switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function p0() {
      if (typeof performance.getEntriesByType == "function") {
        for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), i = 0; i < a.length; i++) {
          var o = a[i], f = o.transferSize, d = o.initiatorType, h = o.duration;
          if (f && h && Oa(d)) {
            for (d = 0, h = o.responseEnd, i += 1; i < a.length; i++) {
              var y = a[i], p = y.startTime;
              if (p > h) break;
              var M = y.transferSize, H = y.initiatorType;
              M && Oa(H) && (y = y.responseEnd, d += M * (y < h ? 1 : (h - p) / (y - p)));
            }
            if (--i, t += 8 * (f + d) / (o.duration / 1e3), e++, 10 < e) break;
          }
        }
        if (0 < e) return t / e / 1e6;
      }
      return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
    }
    function gr(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function g0(e) {
      switch (e) {
        case Pe:
          return Om;
        case Ze:
          return Xv;
        default:
          return Uo;
      }
    }
    function vi(e, t) {
      if (e === Uo)
        switch (t) {
          case "svg":
            return Om;
          case "math":
            return Xv;
          default:
            return Uo;
        }
      return e === Om && t === "foreignObject" ? Uo : e;
    }
    function _f(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function tp() {
      var e = window.event;
      return e && e.type === "popstate" ? e === bS ? !1 : (bS = e, !0) : (bS = null, !1);
    }
    function Bu() {
      var e = window.event;
      return e && e !== gg ? e.type : null;
    }
    function Df() {
      var e = window.event;
      return e && e !== gg ? e.timeStamp : -1.1;
    }
    function v0(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function S0(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function b0() {
    }
    function Rh(e, t, a, i) {
      zl(e, t, a, i), e[_a] = i;
    }
    function _h(e) {
      Mc(e, "");
    }
    function f1(e, t, a) {
      e.nodeValue = a;
    }
    function E0(e) {
      if (!e.__reactWarnedAboutChildrenConflict) {
        var t = e[_a] || null;
        if (t !== null) {
          var a = oe(e);
          a !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, he(a, function() {
            console.error(
              'Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "children" text content using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.'
            );
          })) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, he(a, function() {
            console.error(
              'Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "dangerouslySetInnerHTML" using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.'
            );
          })));
        }
      }
    }
    function sc(e) {
      return e === "head";
    }
    function T0(e, t) {
      e.removeChild(t);
    }
    function A0(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function co(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === 8)
          if (a = o.data, a === pg || a === Lv) {
            if (i === 0) {
              e.removeChild(o), ro(t);
              return;
            }
            i--;
          } else if (a === yg || a === ss || a === ed || a === Am || a === Pr)
            i++;
          else if (a === zT)
            bi(
              e.ownerDocument.documentElement
            );
          else if (a === CT) {
            a = e.ownerDocument.head, bi(a);
            for (var f = a.firstChild; f; ) {
              var d = f.nextSibling, h = f.nodeName;
              f[Qf] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && f.rel.toLowerCase() === "stylesheet" || a.removeChild(f), f = d;
            }
          } else
            a === MT && bi(e.ownerDocument.body);
        a = o;
      } while (a);
      ro(t);
    }
    function vr(e, t) {
      var a = e;
      e = 0;
      do {
        var i = a.nextSibling;
        if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), i && i.nodeType === 8)
          if (a = i.data, a === pg) {
            if (e === 0) break;
            e--;
          } else
            a !== yg && a !== ss && a !== ed && a !== Am || e++;
        a = i;
      } while (a);
    }
    function O0(e) {
      vr(e, !0);
    }
    function R0(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function _0(e) {
      e.nodeValue = "";
    }
    function D0(e) {
      vr(e, !1);
    }
    function z0(e, t) {
      t = t[UT], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function M0(e, t) {
      e.nodeValue = t;
    }
    function zf(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            zf(a), N(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function C0(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var o = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[Qf])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (f = e.getAttribute("src"), (f !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          Et(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = an(e.nextSibling), e === null) break;
      }
      return null;
    }
    function U0(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = an(e.nextSibling), e === null)) return null;
      return e;
    }
    function Ht(e, t) {
      for (; e.nodeType !== 8; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = an(e.nextSibling), e === null)) return null;
      return e;
    }
    function Sr(e) {
      return e.data === ss || e.data === ed;
    }
    function lp(e) {
      return e.data === Am || e.data === ss && e.ownerDocument.readyState !== bE;
    }
    function H0(e, t) {
      var a = e.ownerDocument;
      if (e.data === ed)
        e._reactRetry = t;
      else if (e.data !== ss || a.readyState !== bE)
        t();
      else {
        var i = function() {
          t(), a.removeEventListener("DOMContentLoaded", i);
        };
        a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function an(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === yg || t === Am || t === ss || t === ed || t === Pr || t === gS || t === SE)
            break;
          if (t === pg || t === Lv)
            return null;
        }
      }
      return e;
    }
    function N0(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          a[gi(f.name)] = f.name.toLowerCase() === "style" ? fc(e) : f.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? e.data === Pr ? { type: "Activity", props: {} } : { type: "Suspense", props: {} } : e.nodeValue;
    }
    function x0(e, t, a) {
      return a === null || a[DT] !== !0 ? (e.nodeValue === t ? e = null : (t = In(t), e = In(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function Mf(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === pg || a === Lv) {
            if (t === 0)
              return an(e.nextSibling);
            t--;
          } else
            a !== yg && a !== Am && a !== ss && a !== ed && a !== Pr || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function oo(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === yg || a === Am || a === ss || a === ed || a === Pr) {
            if (t === 0) return e;
            t--;
          } else
            a !== pg && a !== Lv || t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function ap(e) {
      ro(e);
    }
    function Dh(e) {
      ro(e);
    }
    function np(e) {
      ro(e);
    }
    function Si(e, t, a, i, o) {
      switch (o && Es(e, i.ancestorInfo), t = gr(a), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function qu(e, t, a, i) {
      if (!a[Ti] && oe(a)) {
        var o = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      el(a, e, t), a[tl] = i, a[_a] = t;
    }
    function bi(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      N(e);
    }
    function zh(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function up(e, t, a) {
      var i = Rm;
      if (i && typeof t == "string" && t) {
        var o = xt(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), _E.has(o) || (_E.add(o), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), el(t, "link", e), be(t), i.head.appendChild(t)));
      }
    }
    function ip(e, t, a, i) {
      var o = (o = nn.current) ? zh(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = fo(a.href), t = Ne(o).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = fo(a.href);
            var f = Ne(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: ld, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              Er(e)
            )) && !f._p && (d.instance = f, d.state.loading = vg | Iu), !Pu.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Pu.set(e, h), f || j0(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + br(t) + `
  + ` + br(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + br(t) + `
  + ` + br(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = so(a), t = Ne(o).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function br(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : un.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : un.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : un.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function fo(e) {
      return 'href="' + xt(e) + '"';
    }
    function Er(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Mh(e) {
      return lt({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function j0(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = vg : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= vg;
      }), t.addEventListener("error", function() {
        return i.loading |= OE;
      }), el(t, "link", a), be(t), e.head.appendChild(t));
    }
    function so(e) {
      return '[src="' + xt(e) + '"]';
    }
    function Tr(e) {
      return "script[async]" + e;
    }
    function Ch(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + xt(a.href) + '"]'
            );
            if (i)
              return t.instance = i, be(i), i;
            var o = lt({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), be(i), el(i, "style", o), Cf(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            o = fo(a.href);
            var f = e.querySelector(
              Er(o)
            );
            if (f)
              return t.state.loading |= Iu, t.instance = f, be(f), f;
            i = Mh(a), (o = Pu.get(o)) && cp(i, o), f = (e.ownerDocument || e).createElement("link"), be(f);
            var d = f;
            return d._p = new Promise(function(h, y) {
              d.onload = h, d.onerror = y;
            }), el(f, "link", i), t.state.loading |= Iu, Cf(f, a.precedence, e), t.instance = f;
          case "script":
            return f = so(a.src), (o = e.querySelector(
              Tr(f)
            )) ? (t.instance = o, be(o), o) : (i = a, (o = Pu.get(f)) && (i = lt({}, a), op(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), be(o), el(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & Iu) === ld && (i = t.instance, t.state.loading |= Iu, Cf(i, a.precedence, e));
      return t.instance;
    }
    function Cf(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function cp(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function op(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function Uf(e, t, a) {
      if (Qv === null) {
        var i = /* @__PURE__ */ new Map(), o = Qv = /* @__PURE__ */ new Map();
        o.set(a, i);
      } else
        o = Qv, i = o.get(a), i || (i = /* @__PURE__ */ new Map(), o.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[Qf] || f[tl] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== Pe) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function B0(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function q0(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === Om || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var o = t.onError, f = t.disabled;
              a = [], t.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = y0(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                f,
                o
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          return t.rel === "stylesheet" ? (e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
            'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
          ), typeof e == "string" && t == null) : !0;
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function ft(e) {
      return !(e.type === "stylesheet" && (e.state.loading & RE) === ld);
    }
    function fp(e, t, a, i) {
      if (a.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (a.state.loading & Iu) === ld) {
        if (a.instance === null) {
          var o = fo(i.href), f = t.querySelector(
            Er(o)
          );
          if (f) {
            t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Hf.bind(e), t.then(e, e)), a.state.loading |= Iu, a.instance = f, be(f);
            return;
          }
          f = t.ownerDocument || t, i = Mh(i), (o = Pu.get(o)) && cp(i, o), f = f.createElement("link"), be(f);
          var d = f;
          d._p = new Promise(function(h, y) {
            d.onload = h, d.onerror = y;
          }), el(f, "link", i), a.instance = f;
        }
        e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & RE) === ld && (e.count++, a = Hf.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
      }
    }
    function Uh(e, t) {
      return e.stylesheets && e.count === 0 && Ar(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
        var i = setTimeout(function() {
          if (e.stylesheets && Ar(e, e.stylesheets), e.unsuspend) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        }, xT + t);
        0 < e.imgBytes && TS === 0 && (TS = 125 * p0() * BT);
        var o = setTimeout(
          function() {
            if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ar(e, e.stylesheets), e.unsuspend)) {
              var f = e.unsuspend;
              e.unsuspend = null, f();
            }
          },
          (e.imgBytes > TS ? 50 : jT) + t
        );
        return e.unsuspend = a, function() {
          e.unsuspend = null, clearTimeout(i), clearTimeout(o);
        };
      } : null;
    }
    function Hf() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets)
          Ar(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function Ar(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, Vv = /* @__PURE__ */ new Map(), t.forEach(sp, e), Vv = null, Hf.call(e));
    }
    function sp(e, t) {
      if (!(t.state.loading & Iu)) {
        var a = Vv.get(e);
        if (a) var i = a.get(AS);
        else {
          a = /* @__PURE__ */ new Map(), Vv.set(e, a);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(AS, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || i, f === i && a.set(AS, o), a.set(d, o), this.count++, i = Hf.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= Iu;
      }
    }
    function Or(e, t, a, i, o, f, d, h, y) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = td, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = jo(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jo(0), this.hiddenUpdates = jo(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function Rr(e, t, a, i, o, f, d, h, y, p, M, H) {
      return e = new Or(
        e,
        t,
        a,
        d,
        y,
        p,
        M,
        H,
        h
      ), t = iT, f === !0 && (t |= Ba | Ai), t |= at, f = A(3, null, null, t), e.current = f, f.stateNode = e, t = Cd(), wc(t), e.pooledCache = t, wc(t), f.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, rt(f), e;
    }
    function Y0(e) {
      return e ? (e = kf, e) : kf;
    }
    function Hh(e, t, a, i, o, f) {
      if (Ml && typeof Ml.onScheduleFiberRoot == "function")
        try {
          Ml.onScheduleFiberRoot(po, i, a);
        } catch (d) {
          wu || (wu = !0, console.error(
            "React instrumentation encountered an error: %o",
            d
          ));
        }
      o = Y0(o), i.context === null ? i.context = o : i.pendingContext = o, Yu && ja !== null && !CE && (CE = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        ge(ja) || "Unknown"
      )), i = _l(t), i.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), a = bu(e, i, t), a !== null && (gu(t, "root.render()", null), qe(a, e, t), Tn(a, e, t));
    }
    function w0(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function rp(e, t) {
      w0(e, t), (e = e.alternate) && w0(e, t);
    }
    function dp(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = aa(e, 67108864);
        t !== null && qe(t, e, 67108864), rp(e, 67108864);
      }
    }
    function hp(e) {
      if (e.tag === 13 || e.tag === 31) {
        var t = ua(e);
        t = hn(t);
        var a = aa(e, t);
        a !== null && qe(a, e, t), rp(e, t);
      }
    }
    function qt() {
      return ja;
    }
    function mp(e, t, a, i) {
      var o = X.T;
      X.T = null;
      var f = _t.p;
      try {
        _t.p = Cl, yp(e, t, a, i);
      } finally {
        _t.p = f, X.T = o;
      }
    }
    function Wl(e, t, a, i) {
      var o = X.T;
      X.T = null;
      var f = _t.p;
      try {
        _t.p = Il, yp(e, t, a, i);
      } finally {
        _t.p = f, X.T = o;
      }
    }
    function yp(e, t, a, i) {
      if (Jv) {
        var o = Nh(i);
        if (o === null)
          Wn(
            e,
            t,
            i,
            Kv,
            a
          ), jh(e, i);
        else if (G0(
          o,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (jh(e, i), t & 4 && -1 < YT.indexOf(e)) {
          for (; o !== null; ) {
            var f = oe(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = fu(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var y = 1 << 31 - Fl(d);
                        h.entanglements[1] |= y, d &= ~y;
                      }
                      Ua(f), (St & (ea | iu)) === sa && (Mv = Ll() + nE, Nu(0));
                    }
                  }
                  break;
                case 31:
                case 13:
                  h = aa(f, 2), h !== null && qe(h, f, 2), ln(), rp(f, 2);
              }
            if (f = Nh(i), f === null && Wn(
              e,
              t,
              i,
              Kv,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          Wn(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function Nh(e) {
      return e = xn(e), pp(e);
    }
    function pp(e) {
      if (Kv = null, e = ue(e), e !== null) {
        var t = Ke(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = Ft(t), e !== null) return e;
            e = null;
          } else if (a === 31) {
            if (e = pt(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return Kv = e, null;
    }
    function xh(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Cl;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Il;
        case "message":
          switch (Ur()) {
            case _p:
              return Cl;
            case Vh:
              return Il;
            case yo:
            case J0:
              return ca;
            case Zh:
              return yc;
            default:
              return ca;
          }
        default:
          return ca;
      }
    }
    function jh(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          rs = null;
          break;
        case "dragenter":
        case "dragleave":
          ds = null;
          break;
        case "mouseover":
        case "mouseout":
          hs = null;
          break;
        case "pointerover":
        case "pointerout":
          bg.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Eg.delete(t.pointerId);
      }
    }
    function rc(e, t, a, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = oe(t), t !== null && dp(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function G0(e, t, a, i, o) {
      switch (t) {
        case "focusin":
          return rs = rc(
            rs,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "dragenter":
          return ds = rc(
            ds,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "mouseover":
          return hs = rc(
            hs,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return bg.set(
            f,
            rc(
              bg.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, Eg.set(
            f,
            rc(
              Eg.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function gp(e) {
      var t = ue(e.target);
      if (t !== null) {
        var a = Ke(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = Ft(a), t !== null) {
              e.blockedOn = t, g(e.priority, function() {
                hp(a);
              });
              return;
            }
          } else if (t === 31) {
            if (t = pt(a), t !== null) {
              e.blockedOn = t, g(e.priority, function() {
                hp(a);
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Nf(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Nh(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), o = i;
          Up !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), Up = o, a.target.dispatchEvent(i), Up === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), Up = null;
        } else
          return t = oe(a), t !== null && dp(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function Bh(e, t, a) {
      Nf(e) && a.delete(t);
    }
    function s1() {
      OS = !1, rs !== null && Nf(rs) && (rs = null), ds !== null && Nf(ds) && (ds = null), hs !== null && Nf(hs) && (hs = null), bg.forEach(Bh), Eg.forEach(Bh);
    }
    function _r(e, t) {
      e.blockedOn === t && (e.blockedOn = null, OS || (OS = !0, vl.unstable_scheduleCallback(
        vl.unstable_NormalPriority,
        s1
      )));
    }
    function L0(e) {
      $v !== e && ($v = e, vl.unstable_scheduleCallback(
        vl.unstable_NormalPriority,
        function() {
          $v === e && ($v = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (pp(i || a) === null)
                continue;
              break;
            }
            var f = oe(a);
            f !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: i
            }, Object.freeze(a), di(
              f,
              a,
              i,
              o
            ));
          }
        }
      ));
    }
    function ro(e) {
      function t(y) {
        return _r(y, e);
      }
      rs !== null && _r(rs, e), ds !== null && _r(ds, e), hs !== null && _r(hs, e), bg.forEach(t), Eg.forEach(t);
      for (var a = 0; a < ms.length; a++) {
        var i = ms[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < ms.length && (a = ms[0], a.blockedOn === null); )
        gp(a), a.blockedOn === null && ms.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var o = a[i], f = a[i + 1], d = o[_a] || null;
          if (typeof f == "function")
            d || L0(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[_a] || null)
                h = d.formAction;
              else if (pp(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), L0(a);
          }
        }
    }
    function X0() {
      function e(f) {
        f.canIntercept && f.info === "react-transition" && f.intercept({
          handler: function() {
            return new Promise(function(d) {
              return o = d;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function t() {
        o !== null && (o(), o = null), i || setTimeout(a, 20);
      }
      function a() {
        if (!i && !navigation.transition) {
          var f = navigation.currentEntry;
          f && f.url != null && navigation.navigate(f.url, {
            state: f.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var i = !1, o = null;
        return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
          i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener(
            "navigatesuccess",
            t
          ), navigation.removeEventListener(
            "navigateerror",
            t
          ), o !== null && (o(), o = null);
        };
      }
    }
    function vp(e) {
      this._internalRoot = e;
    }
    function Pn(e) {
      this._internalRoot = e;
    }
    function Sp(e) {
      e[Ti] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var vl = r2(), Dr = _m(), r1 = d2(), lt = Object.assign, Q0 = /* @__PURE__ */ Symbol.for("react.element"), _n = /* @__PURE__ */ Symbol.for("react.transitional.element"), dc = /* @__PURE__ */ Symbol.for("react.portal"), xf = /* @__PURE__ */ Symbol.for("react.fragment"), Ra = /* @__PURE__ */ Symbol.for("react.strict_mode"), zr = /* @__PURE__ */ Symbol.for("react.profiler"), qh = /* @__PURE__ */ Symbol.for("react.consumer"), eu = /* @__PURE__ */ Symbol.for("react.context"), jf = /* @__PURE__ */ Symbol.for("react.forward_ref"), ho = /* @__PURE__ */ Symbol.for("react.suspense"), xa = /* @__PURE__ */ Symbol.for("react.suspense_list"), Mr = /* @__PURE__ */ Symbol.for("react.memo"), ia = /* @__PURE__ */ Symbol.for("react.lazy"), tu = /* @__PURE__ */ Symbol.for("react.activity"), d1 = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), V0 = Symbol.iterator, Bf = /* @__PURE__ */ Symbol.for("react.client.reference"), Al = Array.isArray, X = Dr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _t = r1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, h1 = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), bp = [], Ep = [], Ei = -1, hc = Gt(null), qf = Gt(null), nn = Gt(null), mc = Gt(null), Yf = 0, Z0, mo, wf, Tp, Cr, Yh, wh;
    Ue.__reactDisabledLog = !0;
    var Gf, Ap, Gh = !1, Op = new (typeof WeakMap == "function" ? WeakMap : Map)(), ja = null, Yu = !1, un = Object.prototype.hasOwnProperty, Rp = vl.unstable_scheduleCallback, Lh = vl.unstable_cancelCallback, Xh = vl.unstable_shouldYield, Qh = vl.unstable_requestPaint, Ll = vl.unstable_now, Ur = vl.unstable_getCurrentPriorityLevel, _p = vl.unstable_ImmediatePriority, Vh = vl.unstable_UserBlockingPriority, yo = vl.unstable_NormalPriority, J0 = vl.unstable_LowPriority, Zh = vl.unstable_IdlePriority, Dp = vl.log, K0 = vl.unstable_setDisableYieldValue, po = null, Ml = null, wu = !1, Gu = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Fl = Math.clz32 ? Math.clz32 : Hi, zp = Math.log, Jh = Math.LN2, Lf = 256, Hr = 262144, Xf = 4194304, Cl = 2, Il = 8, ca = 32, yc = 268435456, Dn = Math.random().toString(36).slice(2), tl = "__reactFiber$" + Dn, _a = "__reactProps$" + Dn, Ti = "__reactContainer$" + Dn, go = "__reactEvents$" + Dn, m1 = "__reactListeners$" + Dn, $0 = "__reactHandles$" + Dn, Nr = "__reactResources$" + Dn, Qf = "__reactMarker$" + Dn, k0 = /* @__PURE__ */ new Set(), Lu = {}, Vf = {}, W0 = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Zf = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Mp = {}, Kh = {}, $h = /[\n"\\]/g, Cp = !1, F0 = !1, xr = !1, l = !1, n = !1, u = !1, c = ["value", "defaultValue"], s = !1, r = /["'&<>\n\t]|^\s|\s$/, m = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), v = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), _ = v.concat(["button"]), Y = "dd dt li option optgroup p rp rt".split(" "), Z = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, W = {}, w = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, Q = /([A-Z])/g, pe = /^ms-/, He = /^(?:webkit|moz|o)[A-Z]/, Yt = /^-ms-/, x = /-(.)/g, C = /;\s*$/, B = {}, k = {}, De = !1, vt = !1, Ee = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), Ze = "http://www.w3.org/1998/Math/MathML", Pe = "http://www.w3.org/2000/svg", At = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), lu = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, I0 = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0,
      "aria-braillelabel": 0,
      "aria-brailleroledescription": 0,
      "aria-colindextext": 0,
      "aria-rowindextext": 0
    }, kh = {}, v2 = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), S2 = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), HS = !1, cn = {}, NS = /^on./, b2 = /^on[^A-Z]/, E2 = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), T2 = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), A2 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Up = null, Wh = null, Fh = null, y1 = !1, pc = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), p1 = !1;
    if (pc)
      try {
        var Hp = {};
        Object.defineProperty(Hp, "passive", {
          get: function() {
            p1 = !0;
          }
        }), window.addEventListener("test", Hp, Hp), window.removeEventListener("test", Hp, Hp);
      } catch {
        p1 = !1;
      }
    var Jf = null, g1 = null, P0 = null, jr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ev = xl(jr), Np = lt({}, jr, { view: 0, detail: 0 }), O2 = xl(Np), v1, S1, xp, tv = lt({}, Np, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Rs,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== xp && (xp && e.type === "mousemove" ? (v1 = e.screenX - xp.screenX, S1 = e.screenY - xp.screenY) : S1 = v1 = 0, xp = e), v1);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : S1;
      }
    }), xS = xl(tv), R2 = lt({}, tv, { dataTransfer: 0 }), _2 = xl(R2), D2 = lt({}, Np, { relatedTarget: 0 }), b1 = xl(D2), z2 = lt({}, jr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), M2 = xl(z2), C2 = lt({}, jr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), U2 = xl(C2), H2 = lt({}, jr, { data: 0 }), jS = xl(
      H2
    ), N2 = jS, x2 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, j2 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, B2 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, q2 = lt({}, Np, {
      key: function(e) {
        if (e.key) {
          var t = x2[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Os(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? j2[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Rs,
      charCode: function(e) {
        return e.type === "keypress" ? Os(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Os(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Y2 = xl(q2), w2 = lt({}, tv, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), BS = xl(w2), G2 = lt({}, Np, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Rs
    }), L2 = xl(G2), X2 = lt({}, jr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Q2 = xl(X2), V2 = lt({}, tv, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), Z2 = xl(V2), J2 = lt({}, jr, {
      newState: 0,
      oldState: 0
    }), K2 = xl(J2), $2 = [9, 13, 27, 32], qS = 229, E1 = pc && "CompositionEvent" in window, jp = null;
    pc && "documentMode" in document && (jp = document.documentMode);
    var k2 = pc && "TextEvent" in window && !jp, YS = pc && (!E1 || jp && 8 < jp && 11 >= jp), wS = 32, GS = String.fromCharCode(wS), LS = !1, Ih = !1, W2 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, Bp = null, qp = null, XS = !1;
    pc && (XS = Sd("input") && (!document.documentMode || 9 < document.documentMode));
    var on = typeof Object.is == "function" ? Object.is : bd, F2 = pc && "documentMode" in document && 11 >= document.documentMode, Ph = null, T1 = null, Yp = null, A1 = !1, em = {
      animationend: Uc("Animation", "AnimationEnd"),
      animationiteration: Uc("Animation", "AnimationIteration"),
      animationstart: Uc("Animation", "AnimationStart"),
      transitionrun: Uc("Transition", "TransitionRun"),
      transitionstart: Uc("Transition", "TransitionStart"),
      transitioncancel: Uc("Transition", "TransitionCancel"),
      transitionend: Uc("Transition", "TransitionEnd")
    }, O1 = {}, QS = {};
    pc && (QS = document.createElement("div").style, "AnimationEvent" in window || (delete em.animationend.animation, delete em.animationiteration.animation, delete em.animationstart.animation), "TransitionEvent" in window || delete em.transitionend.transition);
    var VS = Hc("animationend"), ZS = Hc("animationiteration"), JS = Hc("animationstart"), I2 = Hc("transitionrun"), P2 = Hc("transitionstart"), eT = Hc("transitioncancel"), KS = Hc("transitionend"), $S = /* @__PURE__ */ new Map(), R1 = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    R1.push("scrollEnd");
    var kS = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var tT = performance, WS = function() {
        return tT.now();
      };
    else {
      var lT = Date;
      WS = function() {
        return lT.now();
      };
    }
    var _1 = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, aT = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", lv = 0, D1 = 1, z1 = 2, M1 = 3, av = "– ", nv = "+ ", FS = "  ", ll = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Xu = "Components ⚛", mt = "Scheduler ⚛", gt = "Blocking", Kf = !1, vo = {
      color: "primary",
      properties: null,
      tooltipText: "",
      track: Xu
    }, $f = {
      start: -0,
      end: -0,
      detail: { devtools: vo }
    }, nT = ["Changed Props", ""], IS = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", uT = ["Changed Props", IS], wp = 1, So = 2, Qu = [], tm = 0, C1 = 0, kf = {};
    Object.freeze(kf);
    var Vu = null, lm = null, Be = 0, iT = 1, at = 2, Ba = 8, Ai = 16, cT = 32, PS = !1;
    try {
      var eb = Object.preventExtensions({});
    } catch {
      PS = !0;
    }
    var U1 = /* @__PURE__ */ new WeakMap(), am = [], nm = 0, uv = null, Gp = 0, Zu = [], Ju = 0, Br = null, bo = 1, Eo = "", Da = null, al = null, ht = !1, gc = !1, au = null, Wf = null, Ku = !1, H1 = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), N1 = Gt(null), x1 = Gt(null), tb = {}, iv = null, um = null, im = !1, oT = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, fT = vl.unstable_scheduleCallback, sT = vl.unstable_NormalPriority, Xl = {
      $$typeof: eu,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, Ql = vl.unstable_now, cv = console.createTask ? console.createTask : function() {
      return null;
    }, Lp = 1, ov = 2, oa = -0, Ff = -0, To = -0, Ao = null, fn = -1.1, qr = -0, dl = -0, Ce = -1.1, xe = -1.1, ol = null, Sl = !1, Yr = -0, vc = -1.1, Xp = null, If = 0, j1 = null, B1 = null, wr = -1.1, Qp = null, cm = -1.1, fv = -1.1, Oo = -0, Ro = -1.1, $u = -1.1, q1 = 0, Vp = null, lb = null, ab = null, Pf = -1.1, Gr = null, es = -1.1, sv = -1.1, nb = -0, ub = -0, rv = 0, rT = null, ib = 0, Zp = -1.1, dv = !1, hv = !1, Jp = null, Y1 = 0, Lr = 0, om = null, cb = X.S;
    X.S = function(e, t) {
      if (lE = Ll(), typeof t == "object" && t !== null && typeof t.then == "function") {
        if (0 > Ro && 0 > $u) {
          Ro = Ql();
          var a = Df(), i = Bu();
          (a !== es || i !== Gr) && (es = -1.1), Pf = a, Gr = i;
        }
        ui(e, t);
      }
      cb !== null && cb(e, t);
    };
    var Xr = Gt(null), Oi = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, Kp = [], $p = [], kp = [], Wp = [], Fp = [], Ip = [], Qr = /* @__PURE__ */ new Set();
    Oi.recordUnsafeLifecycleWarnings = function(e, t) {
      Qr.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && Kp.push(e), e.mode & Ba && typeof t.UNSAFE_componentWillMount == "function" && $p.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && kp.push(e), e.mode & Ba && typeof t.UNSAFE_componentWillReceiveProps == "function" && Wp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Fp.push(e), e.mode & Ba && typeof t.UNSAFE_componentWillUpdate == "function" && Ip.push(e));
    }, Oi.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < Kp.length && (Kp.forEach(function(h) {
        e.add(
          ge(h) || "Component"
        ), Qr.add(h.type);
      }), Kp = []);
      var t = /* @__PURE__ */ new Set();
      0 < $p.length && ($p.forEach(function(h) {
        t.add(
          ge(h) || "Component"
        ), Qr.add(h.type);
      }), $p = []);
      var a = /* @__PURE__ */ new Set();
      0 < kp.length && (kp.forEach(function(h) {
        a.add(
          ge(h) || "Component"
        ), Qr.add(h.type);
      }), kp = []);
      var i = /* @__PURE__ */ new Set();
      0 < Wp.length && (Wp.forEach(
        function(h) {
          i.add(
            ge(h) || "Component"
          ), Qr.add(h.type);
        }
      ), Wp = []);
      var o = /* @__PURE__ */ new Set();
      0 < Fp.length && (Fp.forEach(function(h) {
        o.add(
          ge(h) || "Component"
        ), Qr.add(h.type);
      }), Fp = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < Ip.length && (Ip.forEach(function(h) {
        f.add(
          ge(h) || "Component"
        ), Qr.add(h.type);
      }), Ip = []), 0 < t.size) {
        var d = j(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = j(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = j(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = j(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = j(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = j(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var mv = /* @__PURE__ */ new Map(), ob = /* @__PURE__ */ new Set();
    Oi.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & Ba && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !ob.has(e.type) && (i = mv.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], mv.set(a, i)), i.push(e));
    }, Oi.flushLegacyContextWarning = function() {
      mv.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            a.add(ge(o) || "Component"), ob.add(o.type);
          });
          var i = j(a);
          he(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, Oi.discardPendingWarnings = function() {
      Kp = [], $p = [], kp = [], Wp = [], Fp = [], Ip = [], mv = /* @__PURE__ */ new Map();
    };
    var fb = {
      react_stack_bottom_frame: function(e, t, a) {
        var i = Yu;
        Yu = !0;
        try {
          return e(t, a);
        } finally {
          Yu = i;
        }
      }
    }, w1 = fb.react_stack_bottom_frame.bind(fb), sb = {
      react_stack_bottom_frame: function(e) {
        var t = Yu;
        Yu = !0;
        try {
          return e.render();
        } finally {
          Yu = t;
        }
      }
    }, rb = sb.react_stack_bottom_frame.bind(sb), db = {
      react_stack_bottom_frame: function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          Ie(e, e.return, a);
        }
      }
    }, G1 = db.react_stack_bottom_frame.bind(
      db
    ), hb = {
      react_stack_bottom_frame: function(e, t, a, i, o) {
        try {
          t.componentDidUpdate(a, i, o);
        } catch (f) {
          Ie(e, e.return, f);
        }
      }
    }, mb = hb.react_stack_bottom_frame.bind(
      hb
    ), yb = {
      react_stack_bottom_frame: function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, dT = yb.react_stack_bottom_frame.bind(
      yb
    ), pb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          Ie(e, t, i);
        }
      }
    }, gb = pb.react_stack_bottom_frame.bind(
      pb
    ), vb = {
      react_stack_bottom_frame: function(e) {
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, hT = vb.react_stack_bottom_frame.bind(vb), Sb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a();
        } catch (i) {
          Ie(e, t, i);
        }
      }
    }, mT = Sb.react_stack_bottom_frame.bind(Sb), bb = {
      react_stack_bottom_frame: function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, yT = bb.react_stack_bottom_frame.bind(bb), fm = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), L1 = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), yv = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), pv = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Vr = null, Pp = !1, sm = null, eg = 0, nt = null, X1, Eb = X1 = !1, Tb = {}, Ab = {}, Ob = {};
    re = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = ge(e), o = i || "null";
        if (!Tb[o]) {
          Tb[o] = !0, a = a._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = ge(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = ge(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), he(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var Zr = Bl(!0), Rb = Bl(!1), _b = 0, Db = 1, zb = 2, Q1 = 3, ts = !1, Mb = !1, V1 = null, Z1 = !1, rm = Gt(null), gv = Gt(0), nu = Gt(null), ku = null, dm = 1, tg = 2, Ul = Gt(0), vv = 0, Wu = 1, sn = 2, uu = 4, rn = 8, hm, Cb = /* @__PURE__ */ new Set(), Ub = /* @__PURE__ */ new Set(), J1 = /* @__PURE__ */ new Set(), Hb = /* @__PURE__ */ new Set(), _o = 0, Ge = null, Zt = null, Vl = null, Sv = !1, mm = !1, Jr = !1, bv = 0, lg = 0, Do = null, pT = 0, gT = 25, L = null, Fu = null, zo = -1, ag = !1, ng = {
      readContext: Ot,
      use: fi,
      useCallback: sl,
      useContext: sl,
      useEffect: sl,
      useImperativeHandle: sl,
      useLayoutEffect: sl,
      useInsertionEffect: sl,
      useMemo: sl,
      useReducer: sl,
      useRef: sl,
      useState: sl,
      useDebugValue: sl,
      useDeferredValue: sl,
      useTransition: sl,
      useSyncExternalStore: sl,
      useId: sl,
      useHostTransitionStatus: sl,
      useFormState: sl,
      useActionState: sl,
      useOptimistic: sl,
      useMemoCache: sl,
      useCacheRefresh: sl
    };
    ng.useEffectEvent = sl;
    var K1 = null, Nb = null, $1 = null, xb = null, Sc = null, Ri = null, Ev = null;
    K1 = {
      readContext: function(e) {
        return Ot(e);
      },
      use: fi,
      useCallback: function(e, t) {
        return L = "useCallback", we(), oi(t), Ld(e, t);
      },
      useContext: function(e) {
        return L = "useContext", we(), Ot(e);
      },
      useEffect: function(e, t) {
        return L = "useEffect", we(), oi(t), kc(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", we(), oi(a), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        L = "useInsertionEffect", we(), oi(t), ec(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", we(), oi(t), ga(e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", we(), oi(t);
        var a = X.H;
        X.H = Sc;
        try {
          return va(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", we();
        var i = X.H;
        X.H = Sc;
        try {
          return lf(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function(e) {
        return L = "useRef", we(), Gd(e);
      },
      useState: function(e) {
        L = "useState", we();
        var t = X.H;
        X.H = Sc;
        try {
          return Wi(e);
        } finally {
          X.H = t;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", we();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", we(), of(e, t);
      },
      useTransition: function() {
        return L = "useTransition", we(), tc();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", we(), af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", we(), ks();
      },
      useFormState: function(e, t) {
        return L = "useFormState", we(), Ys(), Fa(e, t);
      },
      useActionState: function(e, t) {
        return L = "useActionState", we(), Fa(e, t);
      },
      useOptimistic: function(e) {
        return L = "useOptimistic", we(), $c(e);
      },
      useHostTransitionStatus: hi,
      useMemoCache: ka,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", we(), Xd();
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", we(), Ks(e);
      }
    }, Nb = {
      readContext: function(e) {
        return Ot(e);
      },
      use: fi,
      useCallback: function(e, t) {
        return L = "useCallback", I(), Ld(e, t);
      },
      useContext: function(e) {
        return L = "useContext", I(), Ot(e);
      },
      useEffect: function(e, t) {
        return L = "useEffect", I(), kc(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", I(), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        L = "useInsertionEffect", I(), ec(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", I(), ga(e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", I();
        var a = X.H;
        X.H = Sc;
        try {
          return va(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", I();
        var i = X.H;
        X.H = Sc;
        try {
          return lf(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function(e) {
        return L = "useRef", I(), Gd(e);
      },
      useState: function(e) {
        L = "useState", I();
        var t = X.H;
        X.H = Sc;
        try {
          return Wi(e);
        } finally {
          X.H = t;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", I();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", I(), of(e, t);
      },
      useTransition: function() {
        return L = "useTransition", I(), tc();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", I(), af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", I(), ks();
      },
      useActionState: function(e, t) {
        return L = "useActionState", I(), Fa(e, t);
      },
      useFormState: function(e, t) {
        return L = "useFormState", I(), Ys(), Fa(e, t);
      },
      useOptimistic: function(e) {
        return L = "useOptimistic", I(), $c(e);
      },
      useHostTransitionStatus: hi,
      useMemoCache: ka,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", I(), Xd();
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", I(), Ks(e);
      }
    }, $1 = {
      readContext: function(e) {
        return Ot(e);
      },
      use: fi,
      useCallback: function(e, t) {
        return L = "useCallback", I(), Zn(e, t);
      },
      useContext: function(e) {
        return L = "useContext", I(), Ot(e);
      },
      useEffect: function(e, t) {
        L = "useEffect", I(), Dl(2048, rn, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", I(), cf(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return L = "useInsertionEffect", I(), Dl(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", I(), Dl(4, uu, e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", I();
        var a = X.H;
        X.H = Ri;
        try {
          return Pt(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", I();
        var i = X.H;
        X.H = Ri;
        try {
          return Zc(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function() {
        return L = "useRef", I(), Mt().memoizedState;
      },
      useState: function() {
        L = "useState", I();
        var e = X.H;
        X.H = Ri;
        try {
          return Zc(Wa);
        } finally {
          X.H = e;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", I();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", I(), Ru(e, t);
      },
      useTransition: function() {
        return L = "useTransition", I(), Wg();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", I(), Kc(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", I(), Mt().memoizedState;
      },
      useFormState: function(e) {
        return L = "useFormState", I(), Ys(), Ii(e);
      },
      useActionState: function(e) {
        return L = "useActionState", I(), Ii(e);
      },
      useOptimistic: function(e, t) {
        return L = "useOptimistic", I(), Vs(e, t);
      },
      useHostTransitionStatus: hi,
      useMemoCache: ka,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", I(), Mt().memoizedState;
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", I(), uf(e);
      }
    }, xb = {
      readContext: function(e) {
        return Ot(e);
      },
      use: fi,
      useCallback: function(e, t) {
        return L = "useCallback", I(), Zn(e, t);
      },
      useContext: function(e) {
        return L = "useContext", I(), Ot(e);
      },
      useEffect: function(e, t) {
        L = "useEffect", I(), Dl(2048, rn, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", I(), cf(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return L = "useInsertionEffect", I(), Dl(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", I(), Dl(4, uu, e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", I();
        var a = X.H;
        X.H = Ev;
        try {
          return Pt(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", I();
        var i = X.H;
        X.H = Ev;
        try {
          return Jc(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function() {
        return L = "useRef", I(), Mt().memoizedState;
      },
      useState: function() {
        L = "useState", I();
        var e = X.H;
        X.H = Ev;
        try {
          return Jc(Wa);
        } finally {
          X.H = e;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", I();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", I(), ke(e, t);
      },
      useTransition: function() {
        return L = "useTransition", I(), ul();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", I(), Kc(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", I(), Mt().memoizedState;
      },
      useFormState: function(e) {
        return L = "useFormState", I(), Ys(), Pi(e);
      },
      useActionState: function(e) {
        return L = "useActionState", I(), Pi(e);
      },
      useOptimistic: function(e, t) {
        return L = "useOptimistic", I(), Zs(e, t);
      },
      useHostTransitionStatus: hi,
      useMemoCache: ka,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", I(), Mt().memoizedState;
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", I(), uf(e);
      }
    }, Sc = {
      readContext: function(e) {
        return P(), Ot(e);
      },
      use: function(e) {
        return $(), fi(e);
      },
      useCallback: function(e, t) {
        return L = "useCallback", $(), we(), Ld(e, t);
      },
      useContext: function(e) {
        return L = "useContext", $(), we(), Ot(e);
      },
      useEffect: function(e, t) {
        return L = "useEffect", $(), we(), kc(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", $(), we(), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        L = "useInsertionEffect", $(), we(), ec(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", $(), we(), ga(e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", $(), we();
        var a = X.H;
        X.H = Sc;
        try {
          return va(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", $(), we();
        var i = X.H;
        X.H = Sc;
        try {
          return lf(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function(e) {
        return L = "useRef", $(), we(), Gd(e);
      },
      useState: function(e) {
        L = "useState", $(), we();
        var t = X.H;
        X.H = Sc;
        try {
          return Wi(e);
        } finally {
          X.H = t;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", $(), we();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", $(), we(), of(e, t);
      },
      useTransition: function() {
        return L = "useTransition", $(), we(), tc();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", $(), we(), af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", $(), we(), ks();
      },
      useFormState: function(e, t) {
        return L = "useFormState", $(), we(), Fa(e, t);
      },
      useActionState: function(e, t) {
        return L = "useActionState", $(), we(), Fa(e, t);
      },
      useOptimistic: function(e) {
        return L = "useOptimistic", $(), we(), $c(e);
      },
      useMemoCache: function(e) {
        return $(), ka(e);
      },
      useHostTransitionStatus: hi,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", we(), Xd();
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", $(), we(), Ks(e);
      }
    }, Ri = {
      readContext: function(e) {
        return P(), Ot(e);
      },
      use: function(e) {
        return $(), fi(e);
      },
      useCallback: function(e, t) {
        return L = "useCallback", $(), I(), Zn(e, t);
      },
      useContext: function(e) {
        return L = "useContext", $(), I(), Ot(e);
      },
      useEffect: function(e, t) {
        L = "useEffect", $(), I(), Dl(2048, rn, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", $(), I(), cf(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return L = "useInsertionEffect", $(), I(), Dl(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", $(), I(), Dl(4, uu, e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", $(), I();
        var a = X.H;
        X.H = Ri;
        try {
          return Pt(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", $(), I();
        var i = X.H;
        X.H = Ri;
        try {
          return Zc(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function() {
        return L = "useRef", $(), I(), Mt().memoizedState;
      },
      useState: function() {
        L = "useState", $(), I();
        var e = X.H;
        X.H = Ri;
        try {
          return Zc(Wa);
        } finally {
          X.H = e;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", $(), I();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", $(), I(), Ru(e, t);
      },
      useTransition: function() {
        return L = "useTransition", $(), I(), Wg();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", $(), I(), Kc(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", $(), I(), Mt().memoizedState;
      },
      useFormState: function(e) {
        return L = "useFormState", $(), I(), Ii(e);
      },
      useActionState: function(e) {
        return L = "useActionState", $(), I(), Ii(e);
      },
      useOptimistic: function(e, t) {
        return L = "useOptimistic", $(), I(), Vs(e, t);
      },
      useMemoCache: function(e) {
        return $(), ka(e);
      },
      useHostTransitionStatus: hi,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", I(), Mt().memoizedState;
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", $(), I(), uf(e);
      }
    }, Ev = {
      readContext: function(e) {
        return P(), Ot(e);
      },
      use: function(e) {
        return $(), fi(e);
      },
      useCallback: function(e, t) {
        return L = "useCallback", $(), I(), Zn(e, t);
      },
      useContext: function(e) {
        return L = "useContext", $(), I(), Ot(e);
      },
      useEffect: function(e, t) {
        L = "useEffect", $(), I(), Dl(2048, rn, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return L = "useImperativeHandle", $(), I(), cf(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return L = "useInsertionEffect", $(), I(), Dl(4, sn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return L = "useLayoutEffect", $(), I(), Dl(4, uu, e, t);
      },
      useMemo: function(e, t) {
        L = "useMemo", $(), I();
        var a = X.H;
        X.H = Ri;
        try {
          return Pt(e, t);
        } finally {
          X.H = a;
        }
      },
      useReducer: function(e, t, a) {
        L = "useReducer", $(), I();
        var i = X.H;
        X.H = Ri;
        try {
          return Jc(e, t, a);
        } finally {
          X.H = i;
        }
      },
      useRef: function() {
        return L = "useRef", $(), I(), Mt().memoizedState;
      },
      useState: function() {
        L = "useState", $(), I();
        var e = X.H;
        X.H = Ri;
        try {
          return Jc(Wa);
        } finally {
          X.H = e;
        }
      },
      useDebugValue: function() {
        L = "useDebugValue", $(), I();
      },
      useDeferredValue: function(e, t) {
        return L = "useDeferredValue", $(), I(), ke(e, t);
      },
      useTransition: function() {
        return L = "useTransition", $(), I(), ul();
      },
      useSyncExternalStore: function(e, t, a) {
        return L = "useSyncExternalStore", $(), I(), Kc(
          e,
          t,
          a
        );
      },
      useId: function() {
        return L = "useId", $(), I(), Mt().memoizedState;
      },
      useFormState: function(e) {
        return L = "useFormState", $(), I(), Pi(e);
      },
      useActionState: function(e) {
        return L = "useActionState", $(), I(), Pi(e);
      },
      useOptimistic: function(e, t) {
        return L = "useOptimistic", $(), I(), Zs(e, t);
      },
      useMemoCache: function(e) {
        return $(), ka(e);
      },
      useHostTransitionStatus: hi,
      useCacheRefresh: function() {
        return L = "useCacheRefresh", I(), Mt().memoizedState;
      },
      useEffectEvent: function(e) {
        return L = "useEffectEvent", $(), I(), uf(e);
      }
    };
    var jb = {}, Bb = /* @__PURE__ */ new Set(), qb = /* @__PURE__ */ new Set(), Yb = /* @__PURE__ */ new Set(), wb = /* @__PURE__ */ new Set(), Gb = /* @__PURE__ */ new Set(), Lb = /* @__PURE__ */ new Set(), Xb = /* @__PURE__ */ new Set(), Qb = /* @__PURE__ */ new Set(), Vb = /* @__PURE__ */ new Set(), Zb = /* @__PURE__ */ new Set();
    Object.freeze(jb);
    var k1 = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = ua(e), o = _l(i);
        o.payload = t, a != null && (Pc(a), o.callback = a), t = bu(e, o, i), t !== null && (gu(i, "this.setState()", e), qe(t, e, i), Tn(t, e, i));
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = ua(e), o = _l(i);
        o.tag = Db, o.payload = t, a != null && (Pc(a), o.callback = a), t = bu(e, o, i), t !== null && (gu(i, "this.replaceState()", e), qe(t, e, i), Tn(t, e, i));
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = ua(e), i = _l(a);
        i.tag = zb, t != null && (Pc(t), i.callback = t), t = bu(e, i, a), t !== null && (gu(a, "this.forceUpdate()", e), qe(t, e, a), Tn(t, e, a));
      }
    }, ym = null, W1 = null, F1 = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Zl = !1, Jb = {}, Kb = {}, $b = {}, kb = {}, pm = !1, Wb = {}, Tv = {}, I1 = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, Fb = !1, Ib = null;
    Ib = /* @__PURE__ */ new Set();
    var Mo = !1, Jl = !1, P1 = !1, Pb = typeof WeakSet == "function" ? WeakSet : Set, fa = null, gm = null, vm = null, Kl = null, zn = !1, _i = null, Pl = !1, ug = 8192, vT = {
      getCacheForType: function(e) {
        var t = Ot(Xl), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      cacheSignal: function() {
        return Ot(Xl).controller.signal;
      },
      getOwner: function() {
        return ja;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var ig = Symbol.for;
      ig("selector.component"), ig("selector.has_pseudo_class"), ig("selector.role"), ig("selector.test_id"), ig("selector.text");
    }
    var ST = [], bT = typeof WeakMap == "function" ? WeakMap : Map, sa = 0, ea = 2, iu = 4, Co = 0, cg = 1, Kr = 2, Av = 3, ls = 4, Ov = 6, eE = 5, St = sa, Jt = null, ot = null, ut = 0, Mn = 0, Rv = 1, $r = 2, og = 3, tE = 4, eS = 5, fg = 6, _v = 7, tS = 8, kr = 9, wt = Mn, cu = null, as = !1, Sm = !1, lS = !1, bc = 0, hl = Co, ns = 0, us = 0, aS = 0, Cn = 0, Wr = 0, sg = null, dn = null, Dv = !1, zv = 0, lE = 0, aE = 300, Mv = 1 / 0, nE = 500, rg = null, Ol = null, is = null, Cv = 0, nS = 1, uS = 2, uE = 3, cs = 0, iE = 1, cE = 2, oE = 3, fE = 4, Uv = 5, $l = 0, os = null, bm = null, Di = 0, iS = 0, cS = -0, oS = null, sE = null, rE = null, zi = Cv, dE = null, ET = 50, dg = 0, fS = null, sS = !1, Hv = !1, TT = 50, Fr = 0, hg = null, Em = !1, Nv = null, hE = !1, mE = /* @__PURE__ */ new Set(), AT = {}, xv = null, Tm = null, rS = !1, dS = !1, jv = !1, hS = !1, fs = 0, mS = {};
    (function() {
      for (var e = 0; e < R1.length; e++) {
        var t = R1[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), jn(a, "on" + t);
      }
      jn(VS, "onAnimationEnd"), jn(ZS, "onAnimationIteration"), jn(JS, "onAnimationStart"), jn("dblclick", "onDoubleClick"), jn("focusin", "onFocus"), jn("focusout", "onBlur"), jn(I2, "onTransitionRun"), jn(P2, "onTransitionStart"), jn(eT, "onTransitionCancel"), jn(KS, "onTransitionEnd");
    })(), Ve("onMouseEnter", ["mouseout", "mouseover"]), Ve("onMouseLeave", ["mouseout", "mouseover"]), Ve("onPointerEnter", ["pointerout", "pointerover"]), Ve("onPointerLeave", ["pointerout", "pointerover"]), it(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), it(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), it("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), it(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), it(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), it(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var mg = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), yS = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mg)
    ), Bv = "_reactListening" + Math.random().toString(36).slice(2), yE = !1, pE = !1, qv = !1, gE = !1, Yv = !1, wv = !1, vE = !1, Gv = {}, OT = /\r\n?/g, RT = /\u0000|\uFFFD/g, Ir = "http://www.w3.org/1999/xlink", pS = "http://www.w3.org/XML/1998/namespace", _T = "javascript:throw new Error('React form unexpectedly submitted.')", DT = "suppressHydrationWarning", Pr = "&", Lv = "/&", yg = "$", pg = "/$", ss = "$?", ed = "$~", Am = "$!", zT = "html", MT = "body", CT = "head", gS = "F!", SE = "F", bE = "loading", UT = "style", Uo = 0, Om = 1, Xv = 2, vS = null, SS = null, EE = { dialog: !0, webview: !0 }, bS = null, gg = void 0, TE = typeof setTimeout == "function" ? setTimeout : void 0, HT = typeof clearTimeout == "function" ? clearTimeout : void 0, td = -1, AE = typeof Promise == "function" ? Promise : void 0, NT = typeof queueMicrotask == "function" ? queueMicrotask : typeof AE < "u" ? function(e) {
      return AE.resolve(null).then(e).catch(v0);
    } : TE, ES = null, ld = 0, vg = 1, OE = 2, RE = 3, Iu = 4, Pu = /* @__PURE__ */ new Map(), _E = /* @__PURE__ */ new Set(), Ho = _t.d;
    _t.d = {
      f: function() {
        var e = Ho.f(), t = ln();
        return e || t;
      },
      r: function(e) {
        var t = oe(e);
        t !== null && t.tag === 5 && t.type === "form" ? ff(t) : Ho.r(e);
      },
      D: function(e) {
        Ho.D(e), up("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Ho.C(e, t), up("preconnect", e, t);
      },
      L: function(e, t, a) {
        Ho.L(e, t, a);
        var i = Rm;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + xt(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + xt(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + xt(
            a.imageSizes
          ) + '"]')) : o += '[href="' + xt(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = fo(e);
              break;
            case "script":
              f = so(e);
          }
          Pu.has(f) || (e = lt(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), Pu.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            Er(f)
          ) || t === "script" && i.querySelector(Tr(f)) || (t = i.createElement("link"), el(t, "link", e), be(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Ho.m(e, t);
        var a = Rm;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + xt(i) + '"][href="' + xt(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = so(e);
          }
          if (!Pu.has(f) && (e = lt({ rel: "modulepreload", href: e }, t), Pu.set(f, e), a.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(Tr(f)))
                  return;
            }
            i = a.createElement("link"), el(i, "link", e), be(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Ho.X(e, t);
        var a = Rm;
        if (a && e) {
          var i = Ne(a).hoistableScripts, o = so(e), f = i.get(o);
          f || (f = a.querySelector(
            Tr(o)
          ), f || (e = lt({ src: e, async: !0 }, t), (t = Pu.get(o)) && op(e, t), f = a.createElement("script"), be(f), el(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, a) {
        Ho.S(e, t, a);
        var i = Rm;
        if (i && e) {
          var o = Ne(i).hoistableStyles, f = fo(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: ld, preload: null };
            if (d = i.querySelector(
              Er(f)
            ))
              h.loading = vg | Iu;
            else {
              e = lt(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = Pu.get(f)) && cp(e, a);
              var y = d = i.createElement("link");
              be(y), el(y, "link", e), y._p = new Promise(function(p, M) {
                y.onload = p, y.onerror = M;
              }), y.addEventListener("load", function() {
                h.loading |= vg;
              }), y.addEventListener("error", function() {
                h.loading |= OE;
              }), h.loading |= Iu, Cf(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(e, t) {
        Ho.M(e, t);
        var a = Rm;
        if (a && e) {
          var i = Ne(a).hoistableScripts, o = so(e), f = i.get(o);
          f || (f = a.querySelector(
            Tr(o)
          ), f || (e = lt({ src: e, async: !0, type: "module" }, t), (t = Pu.get(o)) && op(e, t), f = a.createElement("script"), be(f), el(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var Rm = typeof document > "u" ? null : document, Qv = null, xT = 6e4, jT = 800, BT = 500, TS = 0, AS = null, Vv = null, ad = h1, Sg = {
      $$typeof: eu,
      Provider: null,
      Consumer: null,
      _currentValue: ad,
      _currentValue2: ad,
      _threadCount: 0
    }, DE = "%c%s%c", zE = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", ME = "", Zv = " ", qT = Function.prototype.bind, CE = !1, UE = null, HE = null, NE = null, xE = null, jE = null, BE = null, qE = null, YE = null, wE = null, GE = null;
    UE = function(e, t, a, i) {
      t = b(e, t), t !== null && (a = z(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = lt({}, e.memoizedProps), a = aa(e, 2), a !== null && qe(a, e, 2));
    }, HE = function(e, t, a) {
      t = b(e, t), t !== null && (a = ne(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = lt({}, e.memoizedProps), a = aa(e, 2), a !== null && qe(a, e, 2));
    }, NE = function(e, t, a, i) {
      t = b(e, t), t !== null && (a = F(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = lt({}, e.memoizedProps), a = aa(e, 2), a !== null && qe(a, e, 2));
    }, xE = function(e, t, a) {
      e.pendingProps = z(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && qe(t, e, 2);
    }, jE = function(e, t) {
      e.pendingProps = ne(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && qe(t, e, 2);
    }, BE = function(e, t, a) {
      e.pendingProps = F(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && qe(t, e, 2);
    }, qE = function(e) {
      var t = aa(e, 2);
      t !== null && qe(t, e, 2);
    }, YE = function(e) {
      var t = xo(), a = aa(e, t);
      a !== null && qe(a, e, t);
    }, wE = function(e) {
      ye = e;
    }, GE = function(e) {
      ce = e;
    };
    var Jv = !0, Kv = null, OS = !1, rs = null, ds = null, hs = null, bg = /* @__PURE__ */ new Map(), Eg = /* @__PURE__ */ new Map(), ms = [], YT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), $v = null;
    if (Pn.prototype.render = vp.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : tt(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = e;
      var i = t.current, o = ua(i);
      Hh(i, o, a, t, null, null);
    }, Pn.prototype.unmount = vp.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (St & (ea | iu)) !== sa && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), Hh(e.current, 2, null, e, null, null), ln(), t[Ti] = null;
      }
    }, Pn.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Ni();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < ms.length && t !== 0 && t < ms[a].priority; a++) ;
        ms.splice(a, 0, e), a === 0 && gp(e);
      }
    }, (function() {
      var e = Dr.version;
      if (e !== "19.2.8")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.2.8
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    })(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), _t.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = st(t), e = e !== null ? Nt(e) : null, e = e === null ? null : e.stateNode, e;
    }, !(function() {
      var e = {
        bundleType: 1,
        version: "19.2.8",
        rendererPackageName: "react-dom",
        currentDispatcherRef: X,
        reconcilerVersion: "19.2.8"
      };
      return e.overrideHookState = UE, e.overrideHookStateDeletePath = HE, e.overrideHookStateRenamePath = NE, e.overrideProps = xE, e.overridePropsDeletePath = jE, e.overridePropsRenamePath = BE, e.scheduleUpdate = qE, e.scheduleRetry = YE, e.setErrorHandler = wE, e.setSuspenseHandler = GE, e.scheduleRefresh = de, e.scheduleRoot = te, e.setRefreshHandler = Je, e.getCurrentFiber = qt, gs(e);
    })() && pc && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var LE = window.location.protocol;
      /^(https?|file):$/.test(LE) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (LE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    Rg.createRoot = function(e, t) {
      if (!tt(e))
        throw Error("Target container is not a DOM element.");
      Sp(e);
      var a = !1, i = "", o = Zd, f = Jd, d = hy;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === _n && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = Rr(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        null,
        o,
        f,
        d,
        X0
      ), e[Ti] = t.current, oc(e), new vp(t);
    }, Rg.hydrateRoot = function(e, t, a) {
      if (!tt(e))
        throw Error("Target container is not a DOM element.");
      Sp(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = Zd, d = Jd, h = hy, y = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.formState !== void 0 && (y = a.formState)), t = Rr(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        o,
        y,
        f,
        d,
        h,
        X0
      ), t.context = Y0(null), a = t.current, i = ua(a), i = hn(i), o = _l(i), o.callback = null, bu(a, o, i), gu(i, "hydrateRoot()", null), a = i, t.current.lanes = a, Hn(t, a), Ua(t), e[Ti] = t.current, oc(e), new Pn(t);
    }, Rg.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Rg;
}
var l2;
function FT() {
  if (l2) return Fv.exports;
  l2 = 1;
  function b() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(b);
      } catch (z) {
        console.error(z);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (b(), Fv.exports = kT()) : Fv.exports = WT(), Fv.exports;
}
var IT = FT();
const DS = "hana.plugin.ui", zS = 1, PT = "X-Hana-Plugin-Surface-Session", eA = "pluginSurfaceSession", h2 = {
  BAD_MESSAGE: "BAD_MESSAGE",
  UNSUPPORTED_VERSION: "UNSUPPORTED_VERSION"
}, nd = {
  TOAST_SHOW: "toast.show",
  EXTERNAL_OPEN: "external.open",
  RESOURCE_OPEN: "resource.open",
  RESOURCE_PICK: "resource.pick",
  RESOURCE_REQUEST_ACCESS: "resource.requestAccess",
  UI_RESIZE: "ui.resize",
  CLIPBOARD_WRITE_TEXT: "clipboard.writeText"
}, tA = /* @__PURE__ */ new Set([
  "event",
  "request",
  "response",
  "error"
]);
function a2(b) {
  return typeof b == "object" && b !== null;
}
function ys(b) {
  return {
    ok: !1,
    error: {
      code: h2.BAD_MESSAGE,
      message: b
    }
  };
}
function n2(b) {
  if (!a2(b))
    return ys("Plugin UI messages must be objects.");
  if (b.protocol !== DS)
    return ys("Plugin UI message protocol is missing or invalid.");
  if (b.version !== zS)
    return {
      ok: !1,
      error: {
        code: h2.UNSUPPORTED_VERSION,
        message: `Unsupported Plugin UI protocol version: ${String(b.version)}.`
      }
    };
  if (typeof b.kind != "string" || !tA.has(b.kind))
    return ys("Plugin UI message kind is missing or invalid.");
  if (typeof b.type != "string" || b.type.trim() === "")
    return ys("Plugin UI message type must be a non-empty string.");
  const z = b.kind;
  if (z !== "event" && (typeof b.id != "string" || b.id.trim() === ""))
    return ys(`Plugin UI ${z} messages must include a non-empty id.`);
  if (z === "error") {
    if (!a2(b.error))
      return ys("Plugin UI error messages must include an error object.");
    if (typeof b.error.code != "string" || b.error.code.trim() === "")
      return ys("Plugin UI error code must be a non-empty string.");
    if (typeof b.error.message != "string" || b.error.message.trim() === "")
      return ys("Plugin UI error message must be a non-empty string.");
  }
  return {
    ok: !0,
    value: b
  };
}
class u2 extends Error {
  name = "HanaPluginError";
  code;
  details;
  constructor(z) {
    super(z.message), this.code = z.code, this.details = z.details;
  }
}
let i2 = 0;
function lA() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : (i2 += 1, `hana-plugin-${Date.now()}-${i2}`);
}
function aA() {
  if (typeof window > "u")
    throw new Error("@hana/plugin-sdk requires a browser iframe window.");
  return window;
}
function nA(b) {
  if (!b)
    return null;
  try {
    return new URL(b).origin;
  } catch {
    return null;
  }
}
function uA(b, z) {
  if (z)
    return z;
  const F = new URLSearchParams(b.location.search).get("hana-host-origin");
  return F || (nA(b.document.referrer) ?? "*");
}
function iA(b) {
  const z = new URLSearchParams(b.location.search);
  return {
    theme: z.get("hana-theme") ?? void 0,
    cssUrl: z.get("hana-css") ?? void 0
  };
}
function c2(b, z, F) {
  return !(b.source !== z || F !== "*" && b.origin !== F);
}
function cA(b) {
  return typeof b == "string" ? { url: b } : b;
}
function oA(b) {
  return typeof b == "string" ? { text: b } : b;
}
function m2(b) {
  const z = /^\/api\/plugins\/([^/]+)(?:\/|$)/.exec(b.location.pathname || "");
  if (!z)
    throw new Error("Plugin asset URL helper requires an iframe route under /api/plugins/:pluginId/.");
  try {
    return decodeURIComponent(z[1]);
  } catch {
    throw new Error("Plugin asset URL helper could not decode the current plugin id.");
  }
}
function fA(b) {
  if (typeof b != "string" || b.length === 0)
    throw new Error("Invalid plugin asset path.");
  if (b.includes("\\") || b.includes("\0") || /^[a-z][a-z0-9+.-]*:/i.test(b))
    throw new Error("Invalid plugin asset path.");
  const z = b.replace(/^\/+/, "");
  if (!z || z.startsWith("./"))
    throw new Error("Invalid plugin asset path.");
  const F = z.split("/");
  if (F.some((E) => !E || E === "." || E === ".." || E.startsWith(".")))
    throw new Error("Invalid plugin asset path.");
  return F.map((E) => encodeURIComponent(E)).join("/");
}
function sA(b, z) {
  const F = m2(b), E = fA(z);
  return `${b.location.origin}/api/plugins/${encodeURIComponent(F)}/assets/${E}`;
}
function rA(b) {
  return new URLSearchParams(b.location.search).get(eA) || null;
}
function dA(b) {
  if (typeof b != "string" || b.length === 0)
    throw new Error("Invalid plugin API path.");
  const z = b.trim();
  if (!z || z.includes("\\") || z.includes("\0") || z.includes("#") || z.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(z))
    throw new Error("Invalid plugin API path.");
  const F = z.replace(/^\/+/, "");
  if (!F || F.startsWith("./") || F === "api/plugins" || F.startsWith("api/plugins/"))
    throw new Error("Invalid plugin API path. Use a route path relative to the current plugin.");
  const E = F.indexOf("?"), ne = E >= 0 ? F.slice(0, E) : F;
  if (!ne)
    throw new Error("Invalid plugin API path.");
  const ce = ne.split("/");
  for (const P of ce) {
    if (!P)
      throw new Error("Invalid plugin API path.");
    let V;
    try {
      V = decodeURIComponent(P);
    } catch {
      throw new Error("Invalid plugin API path.");
    }
    if (V === "." || V === ".." || V.includes("/") || V.includes("\\"))
      throw new Error("Invalid plugin API path.");
  }
  const ye = new URL(`http://hana.local/${F}`);
  return `${ce.map((P) => encodeURIComponent(decodeURIComponent(P))).join("/")}${ye.search}`;
}
function y2(b, z) {
  const F = m2(b), E = dA(z);
  return `${b.location.origin}/api/plugins/${encodeURIComponent(F)}/${E}`;
}
function hA(b, z, F) {
  const E = rA(b);
  if (!E)
    throw new Error("hana.api.fetch requires pluginSurfaceSession in the iframe URL.");
  const ne = b.fetch?.bind(b) ?? globalThis.fetch?.bind(globalThis);
  if (!ne)
    throw new Error("hana.api.fetch requires window.fetch.");
  const ce = F ?? {}, ye = new Headers(ce.headers);
  return ye.set(PT, E), ne(y2(b, z), {
    ...ce,
    headers: ye
  });
}
function mA(b = {}) {
  const z = b.targetWindow ?? aA(), F = b.parentWindow ?? z.parent, E = uA(z, b.targetOrigin), ne = b.requestTimeoutMs ?? 1e4, ce = b.idFactory ?? lA;
  let ye = iA(z);
  const $ = /* @__PURE__ */ new Set();
  function P(A) {
    F.postMessage(A, E);
  }
  function V(A, te) {
    const de = {
      protocol: DS,
      version: zS,
      kind: "event",
      type: A
    };
    te !== void 0 && (de.payload = te), P(de);
  }
  function re(A) {
    if (!c2(A, F, E))
      return;
    const te = n2(A.data);
    if (!te.ok)
      return;
    const de = te.value;
    if (de.kind !== "event" || de.type !== "hana.theme.changed" || typeof de.payload != "object" || de.payload === null)
      return;
    const Je = de.payload;
    ye = {
      theme: typeof Je.theme == "string" ? Je.theme : ye.theme,
      cssUrl: typeof Je.cssUrl == "string" ? Je.cssUrl : ye.cssUrl
    };
    for (const tt of $)
      tt(ye);
  }
  function j(A, te, de = {}) {
    const Je = ce(), tt = de.timeoutMs ?? ne;
    return new Promise((Ke, Ft) => {
      const pt = () => {
        z.removeEventListener("message", $e), z.clearTimeout(st);
      }, $e = (Ae) => {
        if (!c2(Ae, F, E))
          return;
        const Ye = n2(Ae.data);
        if (!Ye.ok)
          return;
        const Fe = Ye.value;
        Fe.id !== Je || Fe.type !== A || (Fe.kind === "response" && (pt(), Ke(Fe.payload)), Fe.kind === "error" && Fe.error && (pt(), Ft(new u2(Fe.error))));
      }, st = z.setTimeout(() => {
        pt(), Ft(new u2({
          code: "TIMEOUT",
          message: `Plugin host request timed out: ${A}.`
        }));
      }, tt);
      z.addEventListener("message", $e);
      const Nt = {
        protocol: DS,
        version: zS,
        id: Je,
        kind: "request",
        type: A
      };
      te !== void 0 && (Nt.payload = te), P(Nt);
    });
  }
  return {
    ready(A) {
      V("hana.ready", A);
    },
    assets: {
      url(A) {
        return sA(z, A);
      }
    },
    api: {
      url(A) {
        return y2(z, A);
      },
      fetch(A, te) {
        return hA(z, A, te);
      }
    },
    ui: {
      resize(A) {
        V(nd.UI_RESIZE, A);
      }
    },
    theme: {
      getSnapshot() {
        return { ...ye };
      },
      subscribe(A) {
        return $.size === 0 && z.addEventListener("message", re), $.add(A), A({ ...ye }), () => {
          $.delete(A), $.size === 0 && z.removeEventListener("message", re);
        };
      }
    },
    host: {
      request: j
    },
    toast: {
      show(A, te) {
        return j(nd.TOAST_SHOW, A, te);
      }
    },
    external: {
      open(A, te) {
        return j(nd.EXTERNAL_OPEN, cA(A), te);
      }
    },
    clipboard: {
      writeText(A, te) {
        return j(nd.CLIPBOARD_WRITE_TEXT, oA(A), te);
      }
    },
    resources: {
      open(A, te) {
        return j(nd.RESOURCE_OPEN, A, te);
      },
      pick(A = {}, te) {
        return j(nd.RESOURCE_PICK, A, te);
      },
      requestAccess(A, te) {
        return j(nd.RESOURCE_REQUEST_ACCESS, A, te);
      }
    }
  };
}
let o2 = null;
function Un() {
  return o2 ??= mA(), o2;
}
const p2 = {
  ready(b) {
    return Un().ready(b);
  },
  assets: {
    url(b) {
      return Un().assets.url(b);
    }
  },
  api: {
    url(b) {
      return Un().api.url(b);
    },
    fetch(b, z) {
      return Un().api.fetch(b, z);
    }
  },
  ui: {
    resize(b) {
      return Un().ui.resize(b);
    }
  },
  theme: {
    getSnapshot() {
      return Un().theme.getSnapshot();
    },
    subscribe(b) {
      return Un().theme.subscribe(b);
    }
  },
  host: {
    request(b, z, F) {
      return Un().host.request(b, z, F);
    }
  },
  toast: {
    show(b, z) {
      return Un().toast.show(b, z);
    }
  },
  external: {
    open(b, z) {
      return Un().external.open(b, z);
    }
  },
  clipboard: {
    writeText(b, z) {
      return Un().clipboard.writeText(b, z);
    }
  },
  resources: {
    open(b, z) {
      return Un().resources.open(b, z);
    },
    pick(b, z) {
      return Un().resources.pick(b, z);
    },
    requestAccess(b, z) {
      return Un().resources.requestAccess(b, z);
    }
  }
};
function Ec(...b) {
  return b.filter(Boolean).join(" ");
}
const f2 = {
  "warm-paper": {
    bg: "#F8F5ED",
    bgCard: "#FCFAF5",
    accent: "#537D96",
    accentHover: "#456A80",
    accentLight: "rgba(83, 125, 150, 0.08)",
    text: "#3B3D3F",
    textLight: "#6B6F73",
    textMuted: "#8E9196",
    border: "rgba(83, 125, 150, 0.22)",
    danger: "#8B3A3A"
  },
  contemplation: {
    bg: "#F3F5F7",
    bgCard: "#F8F9FB",
    accent: "#7E99A8",
    accentHover: "#6B8594",
    accentLight: "rgba(126, 153, 168, 0.08)",
    text: "#2C3238",
    textLight: "#5A6570",
    textMuted: "#869098",
    border: "rgba(126, 153, 168, 0.22)",
    danger: "#8B4040"
  },
  "grass-aroma": {
    bg: "#F5F8F3",
    bgCard: "#F9FBF7",
    accent: "#5BA88C",
    accentHover: "#4D9179",
    accentLight: "rgba(91, 168, 140, 0.08)",
    text: "#2E3832",
    textLight: "#5E6B63",
    textMuted: "#8A9490",
    border: "rgba(91, 168, 140, 0.22)",
    danger: "#8B4A3A"
  },
  "high-contrast": {
    bg: "#FAF9F6",
    bgCard: "#FDFCFA",
    accent: "#3A6B85",
    accentHover: "#2E5870",
    accentLight: "rgba(58, 107, 133, 0.08)",
    text: "#1A1C1E",
    textLight: "#4A4E52",
    textMuted: "#6B6F73",
    border: "rgba(58, 107, 133, 0.28)",
    danger: "#7A3030"
  },
  midnight: {
    bg: "#3B4A54",
    bgCard: "#445560",
    accent: "#C99AAF",
    accentHover: "#D8AFC0",
    accentLight: "rgba(201, 154, 175, 0.11)",
    text: "#E1EAF0",
    textLight: "#B7C5CE",
    textMuted: "#A3B5C0",
    border: "rgba(170, 121, 141, 0.16)",
    danger: "#C77070"
  },
  "midnight-contrast": {
    bg: "#26343D",
    bgCard: "#30414B",
    accent: "#E6B1C4",
    accentHover: "#F0C4D3",
    accentLight: "rgba(230, 177, 196, 0.14)",
    text: "#F0F6FA",
    textLight: "#D3E0E8",
    textMuted: "#B7C8D3",
    border: "rgba(230, 177, 196, 0.26)",
    danger: "#E28B8B"
  },
  absolutely: {
    bg: "#F4F3EE",
    bgCard: "#FAF9F5",
    accent: "#B5846E",
    accentHover: "#A27460",
    accentLight: "rgba(181, 132, 110, 0.08)",
    text: "#2D2B28",
    textLight: "#6B6864",
    textMuted: "#9B9793",
    border: "rgba(177, 173, 161, 0.28)",
    danger: "#8B3A3A"
  },
  delve: {
    bg: "#FFFFFF",
    bgCard: "#F7F7F8",
    accent: "#1A1A1A",
    accentHover: "#000000",
    accentLight: "rgba(0, 0, 0, 0.05)",
    text: "#1A1A1A",
    textLight: "#6E6E6E",
    textMuted: "#999999",
    border: "rgba(0, 0, 0, 0.10)",
    danger: "#8B3A3A"
  },
  "deep-think": {
    bg: "#FCFCFD",
    bgCard: "#F8F8FA",
    accent: "#636AE8",
    accentHover: "#5158D4",
    accentLight: "rgba(99, 106, 232, 0.06)",
    text: "#1D1D1F",
    textLight: "#65656B",
    textMuted: "#95959C",
    border: "rgba(0, 0, 0, 0.09)",
    danger: "#8B3A3A"
  },
  "new-warm-paper": {
    bg: "#F5EFE4",
    bgCard: "#FBF7EE",
    accent: "#537D96",
    accentHover: "#3F6179",
    accentLight: "rgba(83, 125, 150, 0.08)",
    text: "#2A2622",
    textLight: "#4A433C",
    textMuted: "#6B6158",
    border: "#D8CFBE",
    danger: "#8B2C1F"
  }
}, yA = {
  bg: "--hana-plugin-bg",
  bgCard: "--hana-plugin-bg-card",
  accent: "--hana-plugin-accent",
  accentHover: "--hana-plugin-accent-hover",
  accentLight: "--hana-plugin-accent-light",
  text: "--hana-plugin-text",
  textLight: "--hana-plugin-text-light",
  textMuted: "--hana-plugin-text-muted",
  border: "--hana-plugin-border",
  danger: "--hana-plugin-danger",
  radiusInput: "--hana-plugin-radius-input",
  radiusCard: "--hana-plugin-radius-card",
  fontUi: "--hana-plugin-font-ui",
  fontSerif: "--hana-plugin-font-serif",
  fontMono: "--hana-plugin-font-mono"
};
function pA({ mode: b = "inherit", theme: z, className: F, style: E, children: ne, "data-testid": ce = "hana-plugin-theme", ...ye }) {
  const $ = typeof z == "string" ? z : void 0, P = gA(b, z);
  return ee.jsx("div", { ...ye, "data-testid": ce, className: Ec("hana-plugin-theme", F), "data-hana-theme-mode": b, "data-hana-theme": b === "hana" ? $ : void 0, style: { ...P, ...E }, children: ne });
}
function gA(b, z) {
  if (b === "inherit")
    return {};
  const F = vA(b, z), E = {};
  for (const [ne, ce] of Object.entries(yA)) {
    const ye = F?.[ne];
    ye && (E[ce] = ye);
  }
  return E;
}
function vA(b, z) {
  if (typeof z == "string")
    return f2[z];
  if (z)
    return z;
  if (b === "hana")
    return f2["warm-paper"];
}
const Mi = Dt.forwardRef(function({ variant: z = "secondary", size: F = "md", loading: E = !1, iconLeft: ne, iconRight: ce, disabled: ye, className: $, children: P, type: V = "button", ...re }, j) {
  return ee.jsxs("button", { ...re, ref: j, type: V, disabled: ye || E, className: Ec("hana-plugin-button", `hana-plugin-button-${z}`, `hana-plugin-button-${F}`, E && "hana-plugin-button-loading", $), children: [E ? ee.jsx("span", { className: "hana-plugin-spinner", "aria-hidden": !0 }) : ne, P && ee.jsx("span", { className: "hana-plugin-button-label", children: P }), !E && ce] });
});
Dt.forwardRef(function({ label: z, size: F = "md", variant: E = "ghost", className: ne, children: ce, type: ye = "button", ...$ }, P) {
  return ee.jsx("button", { ...$, ref: P, type: ye, "aria-label": z, title: $.title || z, className: Ec("hana-plugin-icon-button", `hana-plugin-icon-button-${F}`, `hana-plugin-icon-button-${E}`, ne), children: ce });
});
const Dg = Dt.forwardRef(function({ label: z, hint: F, error: E, id: ne, className: ce, inputClassName: ye, ...$ }, P) {
  const V = Dt.useId(), re = ne || V;
  return ee.jsx(g2, { label: z, hint: F, error: E, htmlFor: re, className: ce, children: ee.jsx("input", { ...$, ref: P, id: re, "aria-invalid": !!E, className: Ec("hana-plugin-input", ye) }) });
});
Dt.forwardRef(function({ label: z, hint: F, error: E, id: ne, className: ce, textareaClassName: ye, rows: $ = 4, ...P }, V) {
  const re = Dt.useId(), j = ne || re;
  return ee.jsx(g2, { label: z, hint: F, error: E, htmlFor: j, className: ce, children: ee.jsx("textarea", { ...P, ref: V, id: j, rows: $, "aria-invalid": !!E, className: Ec("hana-plugin-textarea", ye) }) });
});
Dt.forwardRef(function({ checked: z, onChange: F, label: E, disabled: ne, className: ce, onClick: ye, type: $ = "button", ...P }, V) {
  const re = typeof E == "string" ? E : P["aria-label"];
  return ee.jsxs("span", { className: Ec("hana-plugin-switch-wrap", ce), children: [ee.jsx("button", { ...P, ref: V, type: $, role: "switch", "aria-checked": z, "aria-label": re, disabled: ne, className: Ec("hana-plugin-switch", z && "hana-plugin-switch-on"), onClick: (j) => {
    ye?.(j), !j.defaultPrevented && !ne && F?.(!z);
  }, children: ee.jsx("span", { className: "hana-plugin-switch-thumb", "aria-hidden": !0 }) }), E && ee.jsx("span", { className: "hana-plugin-switch-label", children: E })] });
});
function g2({ label: b, hint: z, error: F, htmlFor: E, className: ne, children: ce }) {
  return ee.jsxs("div", { className: Ec("hana-plugin-field", ne), children: [b && ee.jsx("label", { className: "hana-plugin-field-label", htmlFor: E, children: b }), z && ee.jsx("div", { className: "hana-plugin-field-hint", children: z }), ce, F && ee.jsx("div", { className: "hana-plugin-field-error", children: F })] });
}
function SA({ title: b, description: z, actions: F, footer: E, children: ne, className: ce, ...ye }) {
  return ee.jsxs("section", { ...ye, className: Ec("hana-plugin-card", ce), children: [(b || z || F) && ee.jsxs("header", { className: "hana-plugin-card-header", children: [ee.jsxs("div", { className: "hana-plugin-card-heading", children: [b && ee.jsx("h2", { className: "hana-plugin-card-title", children: b }), z && ee.jsx("p", { className: "hana-plugin-card-description", children: z })] }), F && ee.jsx("div", { className: "hana-plugin-card-actions", children: F })] }), ee.jsx("div", { className: "hana-plugin-card-body", children: ne }), E && ee.jsx("footer", { className: "hana-plugin-card-footer", children: E })] });
}
function CS({ icon: b, title: z, description: F, action: E, className: ne, ...ce }) {
  return ee.jsxs("div", { ...ce, className: Ec("hana-plugin-empty", ne), children: [b && ee.jsx("div", { className: "hana-plugin-empty-icon", children: b }), ee.jsx("div", { className: "hana-plugin-empty-title", children: z }), F && ee.jsx("div", { className: "hana-plugin-empty-description", children: F }), E && ee.jsx("div", { className: "hana-plugin-empty-action", children: E })] });
}
const MS = 1e3, US = {
  readonly: "只读",
  suggest: "建议",
  collaborate: "协作",
  full_control: "完全控制"
}, bA = ["readonly", "suggest", "collaborate", "full_control"];
function ps(b, z) {
  return p2.api.fetch(b, z);
}
function EA(b) {
  const z = new Date(b);
  return `${String(z.getHours()).padStart(2, "0")}:${String(z.getMinutes()).padStart(2, "0")}:${String(z.getSeconds()).padStart(2, "0")}`;
}
function TA() {
  const [b, z] = Dt.useState([]), [F, E] = Dt.useState(null), [ne, ce] = Dt.useState("none"), [ye, $] = Dt.useState(!0), [P, V] = Dt.useState(null), re = Dt.useCallback(async () => {
    try {
      const A = await ps("rooms");
      z(A.rooms ?? []), V(null);
    } catch (A) {
      V(A instanceof Error ? A.message : String(A));
    } finally {
      $(!1);
    }
  }, []);
  Dt.useEffect(() => {
    p2.ready(), re();
    const A = setInterval(re, MS * 3);
    return () => clearInterval(A);
  }, [re]);
  const j = Dt.useMemo(
    () => b.find((A) => A.roomId === F) ?? null,
    [b, F]
  );
  return /* @__PURE__ */ ee.jsxs(pA, { mode: "inherit", className: "sb-panel", children: [
    /* @__PURE__ */ ee.jsxs(
      SA,
      {
        title: "共享房间",
        description: "同一 Hana 实例上的实时会话共享",
        actions: /* @__PURE__ */ ee.jsxs(ee.Fragment, { children: [
          /* @__PURE__ */ ee.jsx(Mi, { variant: "ghost", onClick: () => ce("join"), children: "加入房间" }),
          /* @__PURE__ */ ee.jsx(Mi, { variant: "primary", onClick: () => ce("create"), children: "创建房间" })
        ] }),
        children: [
          P && /* @__PURE__ */ ee.jsx("div", { className: "sb-error", children: P }),
          ye && b.length === 0 ? /* @__PURE__ */ ee.jsx(CS, { title: "加载中…", description: "正在获取活跃房间" }) : j ? /* @__PURE__ */ ee.jsx(
            OA,
            {
              room: j,
              onBack: () => E(null),
              onRoomsChanged: re
            }
          ) : /* @__PURE__ */ ee.jsx(
            AA,
            {
              rooms: b,
              onOpen: (A) => E(A),
              onRoomsChanged: re
            }
          )
        ]
      }
    ),
    ne === "create" && /* @__PURE__ */ ee.jsx(
      CA,
      {
        onClose: () => ce("none"),
        onCreated: (A) => {
          ce("none"), E(A), re();
        }
      }
    ),
    ne === "join" && /* @__PURE__ */ ee.jsx(
      UA,
      {
        onClose: () => ce("none"),
        onJoined: (A) => {
          ce("none"), E(A), re();
        }
      }
    )
  ] });
}
function AA(b) {
  const { rooms: z, onOpen: F } = b;
  return z.length === 0 ? /* @__PURE__ */ ee.jsx(CS, { title: "暂无活跃房间", description: "点击右上角「创建房间」开始共享会话" }) : /* @__PURE__ */ ee.jsx("div", { className: "sb-room-list", children: z.map((E) => /* @__PURE__ */ ee.jsxs("button", { className: "sb-room-card", onClick: () => F(E.roomId), children: [
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-room-card-head", children: [
      /* @__PURE__ */ ee.jsx("span", { className: "sb-room-id", children: E.roomId }),
      /* @__PURE__ */ ee.jsx("span", { className: "sb-badge", children: US[E.permissionLevel] })
    ] }),
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-room-card-meta", children: [
      E.readableName ? /* @__PURE__ */ ee.jsx("span", { children: E.readableName }) : /* @__PURE__ */ ee.jsxs("span", { children: [
        "房主 ",
        E.hostId
      ] }),
      /* @__PURE__ */ ee.jsxs("span", { children: [
        E.participantCount,
        " 人"
      ] })
    ] })
  ] }, E.roomId)) });
}
function OA(b) {
  const { room: z, onBack: F, onRoomsChanged: E } = b, ne = z.roomId, [ce, ye] = Dt.useState(null), [$, P] = Dt.useState([]), [V, re] = Dt.useState(0), [j, A] = Dt.useState(""), [te, de] = Dt.useState(null), Je = Dt.useRef(null);
  Dt.useEffect(() => {
    let $e = !0;
    const st = async () => {
      try {
        const Ae = await ps(`rooms/${ne}`);
        $e && ye(Ae.room ?? null);
      } catch {
      }
    };
    st();
    const Nt = setInterval(st, MS * 3);
    return () => {
      $e = !1, clearInterval(Nt);
    };
  }, [ne]), Dt.useEffect(() => {
    let $e = !0;
    const st = async () => {
      try {
        const Ae = await ps(`rooms/${ne}/messages?since=${V}`);
        if (!$e) return;
        if (Ae.messages && Ae.messages.length > 0) {
          P((Fe) => [...Fe, ...Ae.messages]);
          const Ye = Math.max(...Ae.messages.map((Fe) => Fe.seq));
          re(Ye);
        }
      } catch {
      }
    };
    st();
    const Nt = setInterval(st, MS);
    return () => {
      $e = !1, clearInterval(Nt);
    };
  }, [ne, V]), Dt.useEffect(() => {
    Je.current && (Je.current.scrollTop = Je.current.scrollHeight);
  }, [$]);
  const tt = async () => {
    const $e = j.trim();
    if ($e) {
      try {
        await ps(`rooms/${ne}/suggest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: $e })
        }), A(""), de("建议已发送");
      } catch (st) {
        de(st instanceof Error ? st.message : String(st));
      }
      setTimeout(() => de(null), 3e3);
    }
  }, Ke = async ($e, st) => {
    await ps(`rooms/${ne}/${st ? "approve" : "reject"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: $e })
    }), E();
  }, Ft = async () => {
    await ps(`rooms/${ne}/leave`, { method: "POST" }), E(), F();
  }, pt = ce?.pendingJoinRequests ?? [];
  return /* @__PURE__ */ ee.jsxs("div", { className: "sb-room-view", children: [
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-room-view-head", children: [
      /* @__PURE__ */ ee.jsx(Mi, { variant: "ghost", onClick: F, children: "← 返回" }),
      /* @__PURE__ */ ee.jsx("span", { className: "sb-room-id", children: ne }),
      z.readableName ? /* @__PURE__ */ ee.jsx("span", { children: z.readableName }) : null,
      /* @__PURE__ */ ee.jsx("span", { className: "sb-badge", children: US[z.permissionLevel] }),
      /* @__PURE__ */ ee.jsx("span", { className: "sb-status-dot", title: "本地连接" }),
      /* @__PURE__ */ ee.jsx(Mi, { variant: "danger", onClick: Ft, children: "离开" })
    ] }),
    pt.length > 0 && /* @__PURE__ */ ee.jsxs("div", { className: "sb-approvals", children: [
      /* @__PURE__ */ ee.jsx("strong", { children: "加入请求" }),
      pt.map(($e) => /* @__PURE__ */ ee.jsxs("div", { className: "sb-approval-item", children: [
        /* @__PURE__ */ ee.jsxs("span", { children: [
          $e.userId,
          " 请求加入"
        ] }),
        /* @__PURE__ */ ee.jsx(Mi, { variant: "primary", onClick: () => Ke($e.userId, !0), children: "批准" }),
        /* @__PURE__ */ ee.jsx(Mi, { variant: "ghost", onClick: () => Ke($e.userId, !1), children: "拒绝" })
      ] }, $e.userId))
    ] }),
    te && /* @__PURE__ */ ee.jsx("div", { className: "sb-notice", children: te }),
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-room-body", children: [
      /* @__PURE__ */ ee.jsx(_A, { messages: $, scrollRef: Je }),
      /* @__PURE__ */ ee.jsx(zA, { room: z, detail: ce })
    ] }),
    /* @__PURE__ */ ee.jsx(MA, { value: j, onChange: A, onSend: tt })
  ] });
}
const RA = {
  user_message: "👤",
  agent_reply: "🤖",
  tool_call: "🔧",
  tool_result: "📦",
  suggestion: "💡",
  participant_join: "🟢",
  participant_leave: "🔴"
};
function _A(b) {
  const { messages: z, scrollRef: F } = b;
  return z.length === 0 ? /* @__PURE__ */ ee.jsx("div", { className: "sb-stream sb-empty-stream", children: /* @__PURE__ */ ee.jsx(CS, { title: "等待消息", description: "房主会话的消息将实时显示在这里" }) }) : /* @__PURE__ */ ee.jsx("div", { className: "sb-stream", ref: F, children: z.map((E) => /* @__PURE__ */ ee.jsx(DA, { msg: E }, E.seq)) });
}
function DA({ msg: b }) {
  const z = RA[b.type] ?? "•";
  let F = "";
  const E = b.payload;
  return b.type === "tool_call" ? F = `调用 ${String(E?.toolName ?? "unknown")}` : b.type === "tool_result" ? F = String(E?.output ?? "") : F = String(E?.text ?? ""), b.type === "participant_join" && (F = `${String(E?.userId ?? b.from)} 加入了房间`), b.type === "participant_leave" && (F = `${String(E?.userId ?? b.from)} 离开了房间`), /* @__PURE__ */ ee.jsxs("div", { className: `sb-bubble sb-bubble-${b.type}`, children: [
    /* @__PURE__ */ ee.jsx("span", { className: "sb-bubble-icon", children: z }),
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-bubble-body", children: [
      /* @__PURE__ */ ee.jsxs("div", { className: "sb-bubble-meta", children: [
        /* @__PURE__ */ ee.jsx("span", { className: "sb-bubble-from", children: b.from }),
        /* @__PURE__ */ ee.jsx("span", { className: "sb-bubble-time", children: EA(b.timestamp) })
      ] }),
      /* @__PURE__ */ ee.jsx("div", { className: "sb-bubble-content", children: F || "(空)" })
    ] })
  ] });
}
function zA(b) {
  const { room: z, detail: F } = b, E = F?.participants ?? [];
  return /* @__PURE__ */ ee.jsxs("aside", { className: "sb-participants", children: [
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-participants-title", children: [
      "参与者（",
      z.participantCount,
      "）"
    ] }),
    E.length === 0 ? /* @__PURE__ */ ee.jsx("div", { className: "sb-participants-empty", children: "暂无数据" }) : E.map((ne) => /* @__PURE__ */ ee.jsxs("div", { className: "sb-participant", children: [
      /* @__PURE__ */ ee.jsx("span", { className: "sb-participant-dot" }),
      /* @__PURE__ */ ee.jsxs("span", { className: "sb-participant-name", children: [
        ne.userId,
        ne.isHost ? " 👑" : ""
      ] })
    ] }, ne.userId))
  ] });
}
function MA(b) {
  const { value: z, onChange: F, onSend: E } = b;
  return /* @__PURE__ */ ee.jsxs("div", { className: "sb-inputbar", children: [
    /* @__PURE__ */ ee.jsx(
      Dg,
      {
        placeholder: "发送建议（会注入房主会话上下文）…",
        value: z,
        onChange: (ne) => F(ne.currentTarget.value),
        onKeyDown: (ne) => {
          ne.key === "Enter" && !ne.shiftKey && (ne.preventDefault(), E());
        }
      }
    ),
    /* @__PURE__ */ ee.jsx(Mi, { variant: "primary", onClick: E, children: "发送" })
  ] });
}
function CA(b) {
  const { onClose: z, onCreated: F } = b, [E, ne] = Dt.useState("suggest"), [ce, ye] = Dt.useState(""), [$, P] = Dt.useState(""), [V, re] = Dt.useState(!1), [j, A] = Dt.useState(null), te = async () => {
    re(!0), A(null);
    try {
      const de = { permissionLevel: E };
      ce && (de.password = ce), $ && (de.readableName = $);
      const Je = await ps("rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(de)
      });
      F(Je.roomId);
    } catch (de) {
      A(de instanceof Error ? de.message : String(de));
    } finally {
      re(!1);
    }
  };
  return /* @__PURE__ */ ee.jsx("div", { className: "sb-overlay", onClick: z, children: /* @__PURE__ */ ee.jsxs("div", { className: "sb-dialog", onClick: (de) => de.stopPropagation(), children: [
    /* @__PURE__ */ ee.jsx("h3", { children: "创建房间" }),
    /* @__PURE__ */ ee.jsx("label", { children: "权限级别" }),
    /* @__PURE__ */ ee.jsx("div", { className: "sb-perm-options", children: bA.map((de) => /* @__PURE__ */ ee.jsxs("label", { className: "sb-perm-option", children: [
      /* @__PURE__ */ ee.jsx(
        "input",
        {
          type: "radio",
          name: "perm",
          checked: E === de,
          onChange: () => ne(de)
        }
      ),
      US[de]
    ] }, de)) }),
    /* @__PURE__ */ ee.jsx(Dg, { label: "可读名称（可选）", value: $, onChange: (de) => P(de.currentTarget.value) }),
    /* @__PURE__ */ ee.jsx(Dg, { label: "密码（可选）", value: ce, onChange: (de) => ye(de.currentTarget.value) }),
    j && /* @__PURE__ */ ee.jsx("div", { className: "sb-error", children: j }),
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-dialog-actions", children: [
      /* @__PURE__ */ ee.jsx(Mi, { variant: "ghost", onClick: z, children: "取消" }),
      /* @__PURE__ */ ee.jsx(Mi, { variant: "primary", disabled: V, onClick: te, children: V ? "创建中…" : "创建" })
    ] })
  ] }) });
}
function UA(b) {
  const { onClose: z, onJoined: F } = b, [E, ne] = Dt.useState(""), [ce, ye] = Dt.useState(""), [$, P] = Dt.useState(!1), [V, re] = Dt.useState(null), j = async () => {
    const A = E.trim().toUpperCase();
    if (!/^[A-Z0-9]{8}$/.test(A)) {
      re("请输入 8 位房间码");
      return;
    }
    P(!0), re(null);
    try {
      const te = { roomId: A };
      ce && (te.password = ce), (await ps(`rooms/${A}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ce || void 0 })
      })).status === "joined" ? F(A) : re("加入请求已发送，等待房主批准");
    } catch (te) {
      re(te instanceof Error ? te.message : String(te));
    } finally {
      P(!1);
    }
  };
  return /* @__PURE__ */ ee.jsx("div", { className: "sb-overlay", onClick: z, children: /* @__PURE__ */ ee.jsxs("div", { className: "sb-dialog", onClick: (A) => A.stopPropagation(), children: [
    /* @__PURE__ */ ee.jsx("h3", { children: "加入房间" }),
    /* @__PURE__ */ ee.jsx(Dg, { label: "房间码", value: E, onChange: (A) => ne(A.currentTarget.value), placeholder: "如 A3K9X2M7" }),
    /* @__PURE__ */ ee.jsx(Dg, { label: "密码（可选）", value: ce, onChange: (A) => ye(A.currentTarget.value) }),
    V && /* @__PURE__ */ ee.jsx("div", { className: "sb-notice", children: V }),
    /* @__PURE__ */ ee.jsxs("div", { className: "sb-dialog-actions", children: [
      /* @__PURE__ */ ee.jsx(Mi, { variant: "ghost", onClick: z, children: "取消" }),
      /* @__PURE__ */ ee.jsx(Mi, { variant: "primary", disabled: $, onClick: j, children: $ ? "加入中…" : "加入" })
    ] })
  ] }) });
}
const s2 = document.getElementById("root");
s2 && IT.createRoot(s2).render(/* @__PURE__ */ ee.jsx(TA, {}));
