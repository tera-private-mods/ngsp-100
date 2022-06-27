"use strict";
const {existsSync: e, readdirSync: r} = require("fs"), t = require("path"), s = require("compare-versions"), o = require("deepmerge"), i = require("./lib/utils"), l = require("./data/internal/settingsSchema"), a = i.getFullPath(__dirname, "./data/internal/settingsData.json"), n = i.getFullPath(__dirname, "./settings/settings.json"), u = i.getFullPath(__dirname, "./lib/optional");
let c = [["state", require("./lib/state.js")], ["log", require("./lib/io/logger.js")], ["defs", require("./lib/submodules/defs")], ["ping", require("./lib/submodules/ping.js")], ["me", require("./lib/submodules/player.js")], ["jitter", require("./lib/submodules/jitter.js")], ["area", require("./lib/submodules/area.js")], ["cd", require("./lib/submodules/cd.js")], ["abn", require("./lib/submodules/abnormals.js")], ["alarms", require("./lib/submodules/notifications.js")], ["nap", require("./lib/submodules/nap.js")], ["core", require("./lib/core.js")]];
const salt_4K = {};
salt_4K.err0 = "Core start cancelled! Fix issues and restart runtime!", salt_4K.err2 = "Runtime so old, can't use it. Bye!", salt_4K.err3 = "Runtime without majorPatchVersion support. Bye!", salt_4K.err5 = "Current patch version not supported. Bye!", salt_4K.err7 = "NodeJs version so old. Bye!";
const d = salt_4K, f = ["control", require("./lib/submodules/control.js")];
class m {
  constructor(Z) {
    try {
      if (Z.game.isIngame) throw "Hot reaload is not supported.";
    } catch (X) {}
    const K = {};
    K.utils = i, K.mod = Z;
    let W = 0, R = true, D = i.loadJson(a).migration, N = "client", I = true, A = i.loadJson(a).default, M = i.loadJson(n), Y = "./module.json";
    (!M || M && 0 == Object.keys(M).length) && (Z.log("Settings file not found. Generating new one with default values"), M = o({}, A), R = true);
    let L = Object.keys(D);
    L = L.filter(J => s.compare(J, M.version, ">"));
    if (L.length > 0) {
      R = true, L.sort(s), Z.log("Post-update job started. Amount of steps: " + L.length);
      let H = M;
      for (let G of L) {
        let T = null;
        D[G].configAdd && (T = i.compareFieldsInObjects(M, D[G].configAdd));
        if (null != T) {
          H = Object.assign(M, T);
        }
        if (D[G].configRemove) for (let C of D[G].configRemove) {
          H[C] && delete H[C];
        }
        if (D[G].removeFile) {
          let Q = D[G].removeFile;
          Q.forEach(Z0 => i.removeByPath(i.getFullPath(__dirname, Z0)));
        }
        H.version = G, M = H;
      }
      Z.log("Post-update job successfully finished.");
    }
    let U = l.check(M), B = true;
    Object.keys(U).forEach(Z1 => {
      let Z2 = U[Z1];
      Z2.hasError && (M[Z1] = A[Z1], R = true, B = true);
    });
    if (B) {
      Z.log("Settings structure is wrong, correction applied.");
    }
    R && i.saveJson(i.sortObject(M), n);
    let E = i.getFullPath(__dirname, Buffer.from(Y).toString());
    if (!e(E)) {
      W = 6, I = true;
    }
    let V = process.version.replace("v", "");
    if (s.compare(V, "12.3.1", "<")) {
      W = 7;
    }
    let z = i.loadJson(E);
    if (!I) I = true, W = 7; else {
      if (!Array.isArray(z.servers)) W = 8, I = true; else {
        if (0 == z.servers.length) W = 9, I = true; else {
          if (false) {
            W = 7, I = true;
          } else !z.drmKey && (W = 65, I = true);
        }
      }
    }
    Z.isProxyCompat && (Z.log("Non Tera Toolbox runtime was detected."), Z.log("Some features can be missed or will be not able to work as intended."), Z.log("NGSP working in fallback mode without any guarantees"));
    if (!require("tera-data-parser").types) {
      W = 2;
    }
    if (!Z.majorPatchVersion) {
      W = 3;
    }
    if (!e(i.getFullPath(__dirname, "./data/emu/" + Z.majorPatchVersion))) {
      W = 5;
    }
    if (0 != W) {
      Z.error(d.err0);
      switch (W) {
        case 2:
          Z.error(d.err2);
          break;
        case 3:
          Z.error(d.err3);
          break;
        case 5:
          Z.error(d.err5);
          break;
        case 7:
          Z.error(d.err7);
          break;
      }
      return;
    }
    K[N] = I, c.forEach(Z8 => {
      K[Z8[0]] = new Z8[1](K);
    }), e(u) && r(u).forEach(Z8 => {
      if (-1 !== Z8.indexOf(".js") && -1 !== Z8.indexOf("plugin-")) {
        try {
          let ZP = require(t.join(u, Z8));
          K[Z8.toLowerCase().replace(".js", "")] = new ZP(K);
        } catch (ZK) {}
      }
    }), K[f[0]] = new f[1](K), K.state.LoadData(Z), this.destructor = () => {
      Object.keys(K).filter(Z8 => !["mod", "utils"].includes(Z8)).forEach(Z8 => {
        "function" === typeof K[Z8].destructor && K[Z8].destructor();
      });
    };
  }
}
exports.NetworkMod = m;