"use strict";
const {Vec3: g, SkillID: h} = require("tera-data-parser").types, salt_5K = {};
salt_5K.proto = true;
const S = require("rfdc")(salt_5K);
class k {
  constructor(Z1) {
    const Z2 = Z1.state, Z3 = Z1.log, Z4 = Z1.defs, Z5 = Z1.me, Z6 = Z1.ping, Z7 = Z1.jitter, Z8 = Z1.cd, Z9 = Z1.abn, ZZ = Z1.area, ZP = Z1.mod, ZK = Z1.utils, ZW = ["holdInfinite", "lockon"], Zl = {};
    Zl.retaliate = 5, Zl.lockonCast = 36;
    const ZR = Zl, ZD = 99, Zi = 8, ZN = 45, ZO = 28, ZI = 12, Za = 1, Zw = 25, ZA = 401701, Zu = 140;
    this.currentBehavior = null, this.serverBehavior = null;
    const ZM = this, ZY = Buffer;
    let Zh = true, Zd = new Map, ZL = true, ZU = null, ZB = 2147483648, Zq = null, Zb = null, ZE = null, Zt = null, Zg = true, ZV = 0, Zf = 0, Zz = 0, ZX = 0, Zc = 0, Zn = null, Zy = [], Zm = [], Zs = null, ZJ = null, ZH = 0, Zk = [], Zr = true, ZS = true, Zj = true, ZG = true, ZT = true, Zo = true, Zx = null, Zv = null, ZF = true, Zp = true, ZC = "", ZQ = !!ZP.clientInterface, P0 = 0;
    Z2.config.enabled && P1();
    Z2.on("stateChanged", KY => {
      KY ? P1() : P4();
    });
    function P1() {
      try {
        P6(...Z4.getVersion("S_INSTANCE_ARROW"), K3), P6(...Z4.getVersion("S_DEFEND_SUCCESS"), PT), P6(...Z4.getVersion("S_CANNOT_START_SKILL"), Po), P6(...Z4.getVersion("C_CAN_LOCKON_TARGET"), Px), P6(...Z4.getVersion("S_CAN_LOCKON_TARGET"), PF);
        const KY = {};
        KY.fake = null;
        const Kh = {};
        Kh.order = 15, Kh.filter = KY, P6(...Z4.getVersion("C_PLAYER_LOCATION"), Kh, P7), P6(...Z4.getVersion("C_NOTIFY_LOCATION_IN_DASH"), P9), P6(...Z4.getVersion("C_NOTIFY_LOCATION_IN_ACTION"), PZ);
        for (let KV of [Z4.getVersion("C_START_SKILL"), Z4.getVersion("C_START_TARGETED_SKILL"), Z4.getVersion("C_START_COMBO_INSTANT_SKILL"), Z4.getVersion("C_START_INSTANCE_SKILL"), Z4.getVersion("C_START_INSTANCE_SKILL_EX"), Z4.getVersion("C_PRESS_SKILL"), Z4.getVersion("C_NOTIMELINE_SKILL")]) {
          const Kz = {};
          Kz.fake = null;
          const KX = {};
          KX.order = -10, KX.filter = Kz, P6(KV[0], "raw", KX, Pl.bind(null, ...KV));
        }
        P6(...Z4.getVersion("S_GRANT_SKILL"), Pg), P6(...Z4.getVersion("S_CONNECT_SKILL_ARROW"), PV), P6(...Z4.getVersion("S_INSTANT_DASH"), Pf), P6(...Z4.getVersion("S_INSTANT_MOVE"), Pz), P6(...Z4.getVersion("S_ACTION_END"), Pm), P6(...Z4.getVersion("C_CANCEL_SKILL"), PE), P6(...Z4.getVersion("S_ACTION_STAGE"), Pt);
        const Kd = {};
        Kd.fake = null;
        const KL = {};
        KL.order = -10, KL.filter = Kd, P6(...Z4.getVersion("S_CREST_MESSAGE"), KL, PG);
        for (let Kc of [Z4.getVersion("C_USE_ITEM"), Z4.getVersion("C_USE_PREMIUM_SLOT")]) {
          const Kn = {};
          Kn.fake = null;
          const Ky = {};
          Ky.order = -10, Ky.filter = Kn, P6(Kc[0], Kc[1], Ky, PW.bind(null, Kc[0]));
        }
        P6(...Z4.getVersion("S_SYSTEM_MESSAGE"), KM);
        const KU = {};
        KU.fake = true;
        const KB = {};
        KB.order = 999999, KB.filter = KU, P6(...Z4.getVersion("S_EACH_SKILL_RESULT"), KB, PJ);
        const Kq = {};
        Kq.fake = true;
        const Kb = {};
        Kb.order = 999999, Kb.filter = Kq, P6(...Z4.getVersion("S_ACTION_END"), Kb, PH);
        const KE = {};
        KE.fake = true;
        const Kg = {};
        Kg.order = 999999, Kg.filter = KE, P6(...Z4.getVersion("S_START_USER_PROJECTILE"), Kg, Pk);
      } catch (Ks) {
        throw "Critical error in core hooks initialization process! Usage in dat state impossible... " + Ks;
      }
    }
    function P2() {
      try {
        ZP.manager.loadedModules.forEach((KY, Kh) => {
          const Kd = Kh.toLowerCase();
          if (-1 !== Kd.indexOf("zsync") || -1 !== Kd.indexOf("z-sync")) {
            let KU = ZP.manager.get(Kd);
            if (KU) {
              ZC = Kd, KU.unloadNetworkInstance(ZP.dispatch, true), Zp = true;
            }
          }
        });
      } catch (KY) {}
    }
    function P3() {
      if (Zp) {
        let Kh = ZP.manager.get(ZC);
        Kh.loadNetworkInstance(ZP.dispatch, true), Zp = true;
      }
    }
    if (!Z1.client) {
      ZT = true;
    }
    function P4() {
      Zk.forEach(Kh => ZP.unhook(Kh)), Zk = [];
    }
    const P5 = "..";
    function P6(...Kh) {
      Zk.push(ZP.hook(...Kh));
    }
    ZP.hook("S_RETURN_TO_LOBBY", "event", () => {
      P3();
    }), ZP.hook(...Z4.getVersion("S_LOAD_TOPO"), Kh => {
      ZM.currentBehavior = null, ZM.serverBehavior = null, Zf = 0, Zz = 0, ZX = 0, Zj = true, KW(37), PS();
      if (Z2.config.enabled && 118 === Kh.zone && !Z2.classDisabled && !Z2.disabledByZone) Z2.disabledByZone = true, Z2.SwitchEnableStateWithEvent(); else !Z2.classDisabled && Z2.disabledByZone && !Z2.config.enabled && 118 !== Kh.zone && (Z2.disabledByZone = true, Z2.SwitchEnableStateWithEvent());
    }), ZP.hook(...Z4.getVersion("S_SPAWN_ME"), Kh => {
      Ki(Kh), ZL = Kh.alive;
    }), ZP.hook(...Z4.getVersion("S_CREATURE_LIFE"), Kh => {
      if (!Z5.isMe(Kh.gameId)) {
        return;
      }
      ZL = Kh.alive;
      if (!ZL) {
        if (Z2.config.enabled && Z2.config.useTestFeatures) {
          KW(23);
        }
        PS(), Zt = ZM.currentBehavior = ZM.serverBehavior = null, Zj = true, ZG = true, Zx = null, Zv = null;
      }
    });
    function P7(Kh) {
      Z2.config.debugLoc && Z3.writeDebugMessage("-> CPL (" + Z5.totalRunSpeed + "/" + Z5.totalWalkSpeed + ") " + Kh.type + " " + Math.round(Kh.loc.dist2D(Kh.dest)) + "u (" + ZK.decimal(Kh.loc.x, 2) + ", " + ZK.decimal(Kh.loc.y, 2) + ", " + ZK.decimal(Kh.loc.z, 2) + " ) > (" + ZK.decimal(Kh.dest.x, 2) + ", " + ZK.decimal(Kh.dest.y, 2) + ", " + ZK.decimal(Kh.dest.z, 2) + " ) " + ZK.degrees(Kh.w));
      let Kd = true;
      if (ZM.currentBehavior) {
        Kd = Kw(ZM.currentBehavior.skill);
        if (Kd) {
          if (2 === Kh.type) KW(33); else {
            if (Kd.distance) return true;
          }
        }
      }
      const KL = {};
      KL.loc = 7 === Kh.type ? Kh.loc : Kh.loc.addN(Kh.dest).scale(.5), KL.w = Kd && Kd.endType51 ? Zq.w || 0 : Kh.w, Ki(KL);
    }
    const P8 = [100, 114, 109, 75, 101, 121];
    function P9(Kh) {
      if (!ZM.currentBehavior || !ZM.currentBehavior.skill.equals(Kh.skill) || ZM.currentBehavior.stage !== Kh.stage) {
        return Z2.config.debugLoc && Z3.writeDebugMessage("-> CNLID: " + Kh.skill.id + " " + Kh.stage + " (" + Kh.loc + ")X"), true;
      }
      if (Z2.config.debugLoc) {
        Z3.writeDebugMessage("-> CNLID: " + Kh.skill.id + " " + Kh.stage + " (" + Kh.loc + ")");
      }
      Ki(Kh, true);
    }
    ZP.hook("S_LOGIN", "raw", () => {
      Z2.clearSkillDataCache(), Zj = true;
      if (!ZK.getSafe(Z2.preset, [Z5.job, "enabled"]) && Z2.config.enabled) Z2.classDisabled = true, Z2.SwitchEnableStateWithEvent(); else ZK.getSafe(Z2.preset, [Z5.job, "enabled"]) && !Z2.config.enabled && Z2.classDisabled && (Z2.classDisabled = true, Z2.SwitchEnableStateWithEvent());
      ZP.setTimeout(async () => {
        let Kh = true, Kd = true;
        try {
          Kh = await ZK.loadJsonAsync(ZK.getFullPath(__dirname, "../module.json"));
        } catch (KL) {
          Kd = KL;
        }
      }, 2e4);
      if (Z2.config.enabled && !Z2.classDisabled) {
        P2();
      }
    });
    function PZ(Kh) {
      if (!ZM.currentBehavior || !ZM.currentBehavior.skill.equals(Kh.skill) || ZM.currentBehavior.stage !== Kh.stage) {
        if (Z2.config.debugLoc) {
          Z3.writeDebugMessage("-> CNLIA: " + Kh.skill.id + " " + Kh.stage + " (" + Kh.loc + ")X");
        }
        return true;
      }
      Z2.config.debugLoc && Z3.writeDebugMessage("-> CNLIA: " + Kh.skill.id + " " + Kh.stage + " (" + Kh.loc + ")");
      let Kd = Kw(Kh.skill);
      Ki(Kh, true);
      if (Kd && Kd.controlCnlia) {
        if (Zg) {
          if (!ZM.serverBehavior) return true; else {
            if (!Kh.skill.equals(ZM.serverBehavior.skill)) return Kh.skill = ZM.serverBehavior.skill, true;
          }
        } else {
          return Zy.push([...Z4.getVersion("C_NOTIFY_LOCATION_IN_ACTION"), Kh]), true;
        }
      }
    }
    function PP(Kh) {
      if (Zy.length) {
        if (Kh) for (let [Kd, KL, KU] of Zy) {
          const KB = {};
          KB.skill = Kh, ZP.send(Kd, KL, Object.assign(KU, KB));
        }
        Zy = [];
      }
    }
    const PK = [92, 92, 94, 218, 222, 200, 234, 216, 202, 92, 212, 230, 222, 220];
    function PW(Kh, Kd) {
      if (Z2.config.debugItems) {
        Z3.writeLogMessage("-> " + Kh + " with id: " + Kd.id);
      }
      let KL = Z2.getItemDataWithCache(Kd.id);
      if (!KL || !Z5.isItemFromInventory(Kd.id) || Z8.itemInCd(Kd.id)) return;
      if (KL && Object.prototype.hasOwnProperty.call(KL, "requiredLevel") && KL.requiredLevel > Z5.level) return;
      Z8.setItemCd(Kd.id, Date.now() + 600);
      const KU = {};
      KU.info = KL, PC(true, KU);
    }
    function Pl(Kh, Kd, KL, KU) {
      if (Zh) {
        return;
      }
      let KB = ZQ ? ZP.dispatch.fromRaw(Kh, Kd, KU) : ZP.dispatch.fromRaw(Kh, Kd, KU = Buffer.from(KU)), Kq = Kw(KB.skill), Kb = Kw(Ka(KB.skill, 0));
      if (ZK.getSafe(Z2.forcefulSkillExclude, [Z5.job, KB.skill.id])) return;
      ZP.clearTimeout(ZU);
      let KE = 0, Kg = Z7.consumeDelay();
      if (Kq) {
        if (Z2.config.jitterCompensation) {
          if ("holdInfinite" == Kq.type && Kq.fastCastBlockCalibration && "jitter" == Z2.config.fastCastBlockCalibrationType) KE = Math.min(ZI, Kg.gatheredJitter + Kg.predictedJitter); else {
            if ("charging" == Kq.type) {
              KE = Math.min(Math.max(Kg.gatheredJitter + Kg.predictedJitter, Z2.config.jitterCompensationChargesMin), Z2.config.jitterCompensationChargesMax);
              if (Date.now() - Zc <= Z2.config.skillRetryCount * Z2.config.skillRetryMs) {
                KE += 25;
              }
            } else {
              if (Kb && "charging" == Kb.type && Kq.noRetry && Z2.config.advancedChargesRelease) {
                let Kz = Kg.predictedJitter;
                Array.isArray(Kb.length) && Kg.lastServerStage >= Kb.length.length - 1 && (Kz = 0), KE = Math.min(Math.max(Kg.gatheredJitter + Kz, Z2.config.jitterCompensationChargesMin), Z2.config.jitterCompensationChargesMax);
              } else {
                if ((Kq.noRetry || Zo || Kg.gatheredJitter > Z2.config.skillRetryCount * Z2.config.skillRetryMs) && "holdInfinite" != Kq.type) {
                  let Kc = Kg.gatheredJitter;
                  Kq.maxAppliedJitter && (Kc = Math.min(Kq.maxAppliedJitter, Kc)), KE = Math.min(Math.max(Kc, Z2.config.jitterCompensationMin), Z2.config.jitterCompensationMax);
                }
              }
            }
          }
        }
        KE += Kq.forceDelay ? Z2.config.fastCastSkillsCalibrationTime : 0;
      }
      if (Z2.config.debug) {
        let Kn = ["->", Kh, KB.skill.id];
        switch (Kh) {
          case "C_START_SKILL":
            Kn.push(KB.unk ? 1 : 0, KB.moving ? 1 : 0, KB.continue ? 1 : 0, KB.unk2 ? 1 : 0);
            break;
          case "C_PRESS_SKILL":
            Kn.push(KB.press);
            break;
          case "C_START_TARGETED_SKILL":
            {
              let Ky = [];
              for (let Km of KB.targets) {
                Ky.push([Km.gameId.toString(), Km.unk].join(" "));
              }
              Kn.push("[" + Ky.join(",") + "]");
              break;
            }
        }
        if (Z2.config.debugLoc) {
          Kn.push("" + ZK.degrees(KB.w), "(" + ZK.decimal(KB.loc.x, 2), ZK.decimal(KB.loc.y, 2), ZK.decimal(KB.loc.z, 2) + ")");
          if ("C_START_SKILL" == Kh || "C_START_TARGETED_SKILL" == Kh || "C_START_INSTANCE_SKILL_EX" == Kh) {
            Kn.push(">", "(" + Math.round(KB.dest.x), Math.round(KB.dest.y), Math.round(KB.dest.z) + ")");
          }
        }
        if (KE) {
          Kn.push("DELAY=" + KE);
        }
        Z3.writeDebugMessage(...Kn);
      }
      ZP.clearTimeout(ZU);
      if (KE > 0) return ZU = ZP.setTimeout(() => {
        if (![] !== Pw(Kh, KB, Kq, KU)) {
          Pq(KU);
        }
      }, KE), true;
      return Pw(Kh, KB, Kq, KU);
    }
    const PR = [115, 101, 114, 118, 101, 114, 115];
    function PD(Kh, Kd, KL, KU) {
      if (ZM.currentBehavior && ZM.currentBehavior.skill.equals(Kd)) {
        if ("hold" == KL.type || "holdInfinite" == KL.type) {
          Ki(Kh);
          if (KL.chainOnRelease) {
            KW(11), KL = Kw(Kd = Ka(Kd, KL.chainOnRelease));
            if (!KL) return;
            const KB = KL.fixedSpeed || Z5.aspd, Kq = {};
            Kq.skill = Kd, Kq.info = KL, Kq.stage = 0, Kq.realSpeed = KB, Kq.timeSpeed = KB, Kq.animSpeed = KB, PC(true, Kq);
          } else KW(KL.endType51 ? 51 : 10);
        } else {
          if ("charging" == KL.type) {
            Z2.config.advancedChargesRelease && K9(Kd, KL, ZM.currentBehavior.stage);
            return;
          }
        }
      } else {
        if ("grantCharge" == KL.type) K9(Kd, KL, ZV); else {
          if (ZM.currentBehavior && !ZM.currentBehavior.skill.equals(Kd) && KL.type && "charging" == KL.type && Kw(ZM.currentBehavior.skill) && Kw(ZM.currentBehavior.skill).type && "charging" == Kw(ZM.currentBehavior.skill).type) return Kl(Kd), true; else {
            if (KL.canInstantCharge && KL.canInstantCharge.stage) {
              if (Z2.config.advancedChargesRelease) {
                if (!Z9.exists(KL.canInstantCharge.abnormal)) {
                  Kl(Kd);
                  return;
                }
                Ki(Kh, true, KU), KW(4), K9(Kd, KL, KL.canInstantCharge.stage);
              }
            }
          }
        }
      }
      return;
    }
    const Pi = "e";
    function PN(Kh, Kd) {
      KW(6), Z2.config.advancedChargesRelease && (Zj = true, Pp.push(ZP.setTimeout(() => {
        K9(Kh, Kd, 3), Zj = true;
      }, 25)));
    }
    function PO(Kh, Kd, KL, KU) {
      let KB = true;
      switch (ZM.currentBehavior.skill.type) {
        case 1:
          if (Zr && 15 == Kd && 14 == KL) {
            ZP.setTimeout(() => {
              ZS = true;
            }, Z6.max), Zr = true, Z2.config.debug && Z3.writeDebugMessage("Chained VB disabled");
          }
          if (Z2.sharedSkills[ZM.currentBehavior.skill.id]) KB = true; else {
            if (Kh.noInterrupt && (-1 !== Kh.noInterrupt.indexOf(Kd) || -1 !== Kh.noInterrupt.indexOf(Kd + "-" + KL))) {
              KB = true;
              if (Kh.abnormalInterruption) {
                for (let KE in Kh.abnormalInterruption) {
                  if (Z9.exists(KE)) {
                    const KV = Kh.abnormalInterruption[KE];
                    if (Array.isArray(KV)) {
                      if (-1 !== KV.indexOf(Kd)) {
                        KB = true;
                      }
                    } else (Kd == KV || "all" === KV || "others" === KV && Kd !== KU) && (KB = true);
                  }
                }
              }
            }
          }
          if (KB && "storeCharge" == Kh.type) {
            ZV = ZM.currentBehavior.stage;
          }
          break;
        case 2:
          KB = true;
          if (ZM.currentBehavior.air && Kh.useSkillWhileAirReaction) KB = true; else {
            if (Z2.baseData.knockdowns[Z5.job][ZM.currentBehavior.skill.id] && "stand" == Kh.realType) {
              KB = true;
            }
          }
          break;
      }
      return KB;
    }
    const PI = "l";
    function Pa(Kh, Kd, KL) {
      const KU = {};
      KU.data = void 0, KU.type = void 0;
      let KB = KU;
      if (Kh.multiAbnormalChains) {
        const Kq = Kh.multiAbnormalChains;
        for (let Kb of Object.keys(Kq)) {
          const Kg = Kq[Kb], KV = Z9.getIntersect(Kg.intersect);
          if (KV && KV.length == Kg.intersect.length) {
            let Kf = true;
            if (Kg.redirectedSkillChains) Kf = Kg.redirectedSkillChains, KB.type = "skill"; else Kg.redirectedSkillArrowChains && (Kf = Kg.redirectedSkillArrowChains, KB.type = "arrow");
            if (Kf) {
              KB.data = Kf["*"] || Kf[Kd + "-" + KL] || Kf[Kd];
              if (void 0 != KB.data) break;
            }
            if (void 0 == KB.data) {
              KB.data = Kg.redirect;
              void 0 != KB.data && (KB.type = "abnormal");
              break;
            }
          }
        }
      }
      if (void 0 == KB.data) for (let Kc in Kh.abnormalChains) {
        if (Z9.exists(Number(Kc))) {
          KB.data = Kh.abnormalChains[Kc];
          if (void 0 != KB.data) {
            KB.type = "abnormal";
          }
          break;
        }
      }
      if (void 0 == KB.data) for (let Km in Kh.glyphsChains) {
        if (Z5.isGlyphExists(Km)) {
          let KJ = Kh.glyphsChains[Km];
          KB.data = KJ.sub, KB.type = "skill";
        }
      }
      if (void 0 == KB.data && ZM.currentBehavior) {
        const KH = Kh.chains, Kk = Kh.arrowChains;
        if (KH) {
          KB.data = KH["*"] || KH[Kd + "-" + KL] || KH[Kd], void 0 != KB.data && (KB.type = "skill");
        }
        if (Kk) {
          KB.data = Kk["*"] || Kk[Kd + "-" + KL] || Kk[Kd];
          if (void 0 != KB.data) {
            KB.type = "arrow";
          }
        }
      }
      return KB;
    }
    function Pw(Kh, Kd, KL, KU) {
      if (Zj) {
        return true;
      }
      Zg = true;
      let KB = Kd.dest;
      if (!KL) {
        return;
      }
      let Kq = Kd.skill.clone(), Kb = ZK.getSkillBase(Kq.id), KE = ZM.currentBehavior ? ZK.getSkillBase(ZM.currentBehavior.skill.id) : void 0, Kg = ZM.currentBehavior ? ZK.getSkillSub(ZM.currentBehavior.skill.id) : void 0, KV = 0;
      if (!Ph(Kb, Kd, Kq, KL)) return Kl(Kd.skill), true;
      if ("C_PRESS_SKILL" == Kh && Kd.press && 3 == Z5.job) {
        if (!Zr && 15 == Kb && ZS) return true;
        if (10 == Kb && Z9.exists(ZA)) {
          PN(Kq, KL);
          return;
        }
      }
      if ("C_PRESS_SKILL" == Kh && !Kd.press && !(Zr && 3 == Z5.job && 15 == Kb)) {
        if (3 == Z5.job && 10 == Kb && Z9.exists(ZA)) return;
        return PD(Kd, Kq, KL, KB);
      }
      if (ZM.currentBehavior && !PO(KL, KE, Kg, Kb)) return Kl(Kd.skill), true;
      let Kf = Pa(KL, KE, Kg);
      if (void 0 != Kf.data) {
        Kq = Kf.data >= 100 ? new h(Kf.data) : Ka(Kq, Kf.data), KV = ZR[KL.type] || 4;
        if ("arrow" === Kf.type) {
          Ki(Kd, true, KB), KW(KV), KZ(Kq);
          return;
        }
      } else KV = ZR[KL.type] || 6;
      if (KL.onlyDefenceSuccess) {
        if (ZM.currentBehavior && ZM.currentBehavior.defendSuccess) KV = 3; else return Kl(Kd.skill), KD("SMT_SKILL_ONLY_DEFENCE_SUCCESS"), true;
      }
      if (!Kq.equals(Kd.skill)) {
        KL = Kw(Kq);
        if (!KL) {
          "C_NOTIMELINE_SKILL" != Kh && Ki(Kd, true, KB);
          return;
        }
        Kd.skill = Kq.clone();
      }
      if (KL.enableOnAbnormal && !Z9.hasIntersect(KL.enableOnAbnormal)) return Kl(Kd.skill), true;
      if (KL.disableOnAbnormal && Z9.hasIntersect(KL.disableOnAbnormal)) return Kl(Kd.skill), true;
      "C_NOTIMELINE_SKILL" != Kh && Ki(Kd, true, KB);
      Zb = Zq;
      if (KL.abnormals) for (let Ko in KL.abnormals) {
        let Kx = Ko.trim();
        if (Z9.exists(Kx)) {
          let Kv = KL.abnormals[Ko];
          Kv.replaceChain && (Kf.type && (Kq = Ka(Kq, Kv.replaceChain))), Kv.chain && (Kq = Ka(Kq, Kv.chain)), Kv.skill && (Kq = new h(Kv.skill));
        }
      }
      if (!Kq.equals(Kd.skill)) {
        KL = Kw(Kq);
        if (!KL) return;
      }
      if (Z8.skillIdInCd(Kq.id)) return Kl(Kd.skill), true;
      KV && (Kd.continue ? K8() : KW(KV));
      let {realSpeed: Kz, timeSpeed: KX, animSpeed: Kc, glyphAnimSeq: Kn, effectScale: Ky, distanceMult: Km, stamina: Ks, slowsPrint: KJ} = PB(Kb, KL);
      if (Ks) {
        if (Z5.currentStamina < Ks) return Kl(Kd.skill), KR(Z5.lowStaminaSystemMessage), true;
        KL.instantStamina && (Z5.currentStamina -= Ks);
      }
      if (!Zd.has(Kb)) {
        if (KL.actionEndLock || KL.virtualActionEndLock) {
          Zd.set(Kb, 0), Z2.config.debug && Z3.writeDebugMessage("<I> Block S " + Kb + " for " + ZK.decimal(KL.actionEndLock || KL.virtualActionEndLock, 2) + "ms.");
        } else {
          if (KL.actionStageLock) {
            Zd.set(Kb, 0);
            let KQ = KL.actionStageLock.time || KL.actionStageLock;
            !KL.fixedSpeed && !KL.actionStageLock.fixedSpeed && (KQ /= Kz);
            Pj(Kb, KQ);
            if (Z2.config.debug) {
              Z3.writeDebugMessage("<I> Block S " + Kb + " for " + ZK.decimal(KQ, 2) + "ms.");
            }
          } else !KL.actionStageLock && PS();
        }
      }
      const KH = KL.canInstantCharge && Z9.exists(KL.canInstantCharge.abnormal) && KL.length ? KL.length.length || 1 : 0;
      PC("C_NOTIMELINE_SKILL" === Kh, {skill: Kq, info: KL, stage: KH, realSpeed: Kz, timeSpeed: KX, animSpeed: Kc, movement: Kn, moving: "C_START_SKILL" == Kh && 1 == Kd.moving, effectScale: Ky, distanceMult: Km, slowsPrint: KJ, targets: Kd.targets || {}, dest: Kd.dest, endpoints: Kd.endpoints}), Zo = KL.delayedRetry;
      let Kk = KL.noRetry || KL.noRetryWithAbnormal && Z9.exists(KL.noRetryWithAbnormal);
      !Kk && KN(PA(KL), KL.delayedRetry ? ZN : Z2.config.skillRetryMs, () => {
        if (KL.retryAlways || ZM.currentBehavior && ZM.currentBehavior.skill.equals(Kq) && !Zg) return Pq(KU);
        return true;
      });
    }
    function PA(Kh) {
      let Kd = 0;
      if ("holdInfinite" == Kh.type && Kh.fastCastBlockCalibration && "retry" == Z2.config.fastCastBlockCalibrationType) {
        Kd = Za;
      } else !Kh.fastCastBlockCalibration && (Kd = Kh.delayedRetry ? Zi : Kh.maxRetryCount ? Math.min(Kh.maxRetryCount, Z2.config.skillRetryCount) : Z2.config.skillRetryCount);
      return Kd;
    }
    const Pu = "u";
    function PM(Kh) {
      let Kd = [], KL = {}, KU = {}, KB = {};
      const Kq = 1;
      let Kb = 1;
      for (let KE = 0; KE < Kh.length; KE++) {
        const Kg = Number(Kh[KE]), KV = Z2.slows[Kg];
        switch (KV.method) {
          case 1:
            Kd.push(Number(KV.value));
            break;
          case 2:
            KL[Kg] = Z9.getStacks(Kg);
            break;
          case 3:
            KU[Kg] = Z9.getStacks(Kg);
            break;
          case 4:
            KB[Kg] = Z9.getStacks(Kg);
            break;
        }
      }
      for (let Kf = 0; Kf < Kd.length; Kf++) {
        Kb = Kd[Kf];
      }
      for (let Kz of Object.keys(KL)) {
        Kb += Number(Z2.slows[Kz].value) * KL[Kz];
      }
      for (const KX of Object.keys(KU)) {
        Kb += (Number(Z2.slows[KX].value) - 1) * KU[KX] * Kq;
      }
      for (const Kc of Object.keys(KB)) {
        Kb *= KB[Kc] * Z2.slows[Kc].value;
      }
      return Z2.loadFinish ? Math.max(.0009999999999763531, Kb) : 1;
    }
    const PY = "mod";
    function Ph(Kh, Kd, KL, KU) {
      if (!ZL) return true;
      if (Z5.inGacha) return true;
      if (KU.onlyOutOfCombat && Z5.inCombat) return true;
      if (KU.strictCooldown && Z8.skillIdInCd(KL.id)) {
        return true;
      }
      if (ZG && !KU.useSkillWhileBulldozer) return true;
      if (Z5.mounted) return KR("SMT_PROHIBITED_ACTION_ON_RIDE"), true;
      if (!Z5.equippedWeapon && KU.needWeapon) {
        return KR("SMT_BATTLE_SKILL_NEED_WEAPON"), true;
      }
      if (KU.onlyTarget && (Kd.targets[0].gameId === BigInt(0) || -1 === ZZ.getTypeByGameId(Kd.targets[0].gameId) || 3 === ZZ.getTypeByGameId(Kd.targets[0].gameId))) return true;
      if (KU.strictCategory && !PL(KU)) {
        return true;
      }
      if (!Pd(KU)) {
        return true;
      }
      if (Zd.has(Kh)) {
        return Z2.config.debug && Z3.writeDebugMessage("<I> Skill " + Kh + " is blocked."), true;
      }
      return true;
    }
    function Pd(Kh) {
      let Kd = null;
      for (const KL of Z9.getIntersect(Z2.ccKeys)) {
        if (ZK.arraysHasIntersect(Kh.category, Z2.cc[KL].category) || 0 === Z2.cc[KL].category[0]) {
          Kd = true;
        }
      }
      return null === Kd && (Kd = true), Kd;
    }
    function PL(Kh) {
      if (!Z5.isCategoriesEnabled(Kh.category)) return true;
      return true;
    }
    const PU = [25, 27, 33, 34, 37];
    function PB(Kh, Kd) {
      let KU = 1, KB = 1, Kq = 0, Kb = 1, KE = 1, Kg = 0, KV = Object.keys(Z9.abnormies), Kf = null, Kz = 1, KX = ZK.arraysIntersect(KV, Z2.slowsKeys), Kc = ZK.arraysIntersect(KV, Z2.buffKeys);
      if (Kc) for (let Kk of Kc) {
        let Kr = Z2.buffs[Kk];
        if (Kr && (ZK.arraysHasIntersect(Kr.category, Kd.category) || 203 == Kr.type || 29 == Kr.type && 0 == Kr.category[0] || 236 == Kr.type && 0 == Kr.category[0])) {
          switch (Kr.type) {
            case 235:
              KB < Kr.value && (KB = Kr.value);
              break;
            case 29:
              Kq += Kr.value;
              break;
            case 236:
              Kq += Kr.value;
              break;
            case 239:
              Kg += Kr.value;
              break;
            case 203:
              Kr.value2 && Kr.value2[Z5.job] && Kr.value2[Z5.job][Kh] && (KE += Kr.value);
              break;
          }
        }
      }
      let Kn = Kd.movable ? Z5.aspd : Kd.fixedSpeed || Z5.aspd, Ky = 1, Km = 1, Ks = Kd.stamina ? Kd.stamina + Kg : true, KJ = ZK.arraysIntersect([...Z5.currentGlyphs, ...Z5.passives, ...Z5.bodyRolls], Z2.passivesKeys);
      for (let Kj of KJ) {
        let KG = Z2.passives[Kj];
        if (ZK.arraysHasIntersect(KG.category, Kd.category)) switch (KG.type) {
          case 218:
            KU += KG.value;
            break;
          case 220:
            Kq += KG.value;
            break;
          case 82:
            Ks += KG.value;
            break;
          case 77:
            Kz += KG.value;
            break;
          case 71:
            Kb *= KG.value, Kf = KG.value2;
            break;
        }
      }
      if (Py && Kd.talents) for (let Ko of Kd.talents) {
        if (Z5.isTalentExist(Ko)) {
          const Kx = Z2.talents[Ko][Z5.getTalentLevel(Ko)];
          if (Kx.withAbnormal && !(Array.isArray(Kx.withAbnormal) ? Z9.hasIntersect(Kx.withAbnormal) : Z9.exists(Kx.withAbnormal))) continue;
          switch (Kx.type) {
            case 218:
              KU += Kx.value;
              break;
            case 220:
              Kq += Kx.value;
              break;
          }
        }
      }
      if (Z2.loadFinish && Kd.polishing) {
        if (Z5.isPolishingExist(Kd.polishing)) {
          const KC = Z2.polishing[Kd.polishing];
          let KQ = KC.value;
          KC.withAbnormal && !Z9.exists(KC.withAbnormal) && (KQ = 0);
          if ("speed" == KC.type) KU += KQ; else {
            if ("chargeSpeed" == KC.type) {
              Kq += KQ;
            }
          }
        }
      }
      if (7 == Z5.job && Z5.isPolishingEffectExist(805) && -1 !== PU.indexOf(Kh) && Z9.exists(702e3)) {
        Kz += Z5.getPolishingEffectByGroup(805) % 100 / 100;
      }
      Kn = (Kn * KU * KB * KE + ("charging" === Kd.type ? Kq : 0)) * (Kd.chargeRate || 1);
      !Kd.fixedSpeed && !Kd.movable && (Ky = "charging" === Kd.type ? Z5.aspd : Kn, Km = Kn);
      const KH = {};
      return KH.realSpeed = Kn, KH.timeSpeed = Ky, KH.animSpeed = Km, KH.stamina = Ks, KH.effectScale = Kz, KH.distanceMult = Kb, KH.slowsPrint = KX, KH.glyphAnimSeq = Kf, KH;
    }
    function Pq(...Kh) {
      Zh = true;
      let Kd = ZP.toServer(...Kh);
      return Zh = true, Kd;
    }
    const Pb = [1, 29, 30];
    function PE(Kh) {
      Z2.config.debug && Z3.writeDebugMessage("-> C_CANCEL_SKILL " + Kh.skill.id + " " + Kh.type);
      if (0 === Kh.skill.id) return true;
      if (!ZM.currentBehavior) return;
      let KL = Kw(ZM.currentBehavior.skill);
      KL && (("lockon" == KL.type || 29 == Kh.type || 30 == Kh.type) && KW(Kh.type));
    }
    function Pt(Kh) {
      if (!Z5.isMe(Kh.gameId)) return;
      if (Z2.config.debug) {
        let KB = Date.now() - ZH, Kq = [Kw(Kh.skill) ? "<X" : "<-", "S_ACTION_STAGE", Kh.skill.id, Kh.stage, ZK.decimal(Kh.speed, 3) + " " + ZK.decimal(Kh.projectileSpeed, 3), Kh.id];
        Z2.config.debugLoc && Kq.push(ZK.degrees(Kh.w), "(" + Math.round(Kh.loc.x), Math.round(Kh.loc.y), Math.round(Kh.loc.z) + ")");
        if (ZM.serverBehavior) {
          Kq.push(ZK.decimal(ZM.serverBehavior.loc.dist2D(Kh.loc), 3) + "u", KB + "ms", "(" + Math.round(KB * ZM.serverBehavior.speed) + "ms)");
        }
        if (Kh.animSeq.length) {
          let Kg = [];
          for (let KV of Kh.animSeq) {
            Kg.push(KV.duration + " " + KV.xyRate + " " + KV.zRate + " " + KV.distance);
          }
          Kq.push("(" + Kg.join(", ") + ")");
        }
        Z3.writeDebugMessage(...Kq), ZH = Date.now();
      }
      let Kd = Kw(Kh.skill);
      if (Kd) {
        ZM.currentBehavior && Kh.skill.type === ZM.currentBehavior.skill.type && Math.floor(Kh.skill.id / 100) === Math.floor(ZM.currentBehavior.skill.id / 100) && Kh.stage === ZM.currentBehavior.stage && (ZP.clearTimeout(Zn), Zg = true, Z2.loadFinish && Z2.config.resyncZ && Kh.dest && 0 != Kh.dest.x && 0 != Kh.dest.y && 0 != Kh.dest.z && (Math.abs(Kh.dest.z - Zq.loc.z) >= Z2.zCorrectionDiff && (Zq.loc.z = Kh.dest.z + Z2.zCorrectionBonus)), PP(Kh.skill));
        if (Kh.animSeq.length) {
          if (Kd.forceClip) {
            let Kf = 0;
            for (let Kz of Kh.animSeq) {
              Kf += Kz.distance;
            }
            Kd.distance < 0 && (Kf = -Kf);
            Kf -= Z2.distanceCorrectionBonus, Zt = (Zb.loc.add(new g(Kf, 0, 0).rotate(KB || Zb.w)), Zb);
            if (!ZM.currentBehavior || ZM.currentBehavior.skill.id != Kh.skill.id) {
              KK(Zt);
            }
          }
        }
        return ZM.serverBehavior && ZM.serverBehavior == ZM.currentBehavior && !Kw(ZM.currentBehavior.skill) && KW(6), ZM.serverBehavior = Kh, true;
      }
      ZM.serverBehavior = Kh;
      if (Kh.id == ZX) return true;
      ZM.currentBehavior && Kw(ZM.currentBehavior.skill) && (Z2.loadFinish && Z2.config.resyncReactions && Kh.animSeq[0] && 88888888 == Kh.animSeq[0].duration && -1 == Kh.animSeq[0].distance && KK(Kh), KW(Zf == ZM.currentBehavior.skill ? Zz || 6 : 6));
      const KL = ZM.currentBehavior && Kh.stage > 0 && ZM.currentBehavior.skill.equals(Kh.skill) ? ZM.currentBehavior.defendSuccess : true;
      ZM.currentBehavior = Kh, ZM.currentBehavior.defendSuccess = KL, Ki();
    }
    function Pg(Kh) {
      Z2.config.debug && Z3.writeDebugMessage("<- S_GRANT_SKILL " + Kh.skill.id);
      if (Kw(Ka(Kh.skill, 0)) && Z2.config.advancedChargesRelease) return true;
    }
    function PV(Kh) {
      Z2.config.debug && Z3.writeDebugMessage("<- S_CONNECT_ARROW " + Kh.skill.id);
      if (Kw(Kh.skill)) {
        return true;
      }
    }
    function Pf(Kh) {
      if (!Z5.isMe(Kh.gameId)) return;
      if (Z2.config.debug) {
        let Kd = Date.now() - ZH, KL = [ZM.serverBehavior && Kw(ZM.serverBehavior.skill) ? "<X" : "<-", "S_INSTANT_DASH", Kh.unk, Kh.loc, Kh.w];
        Z2.config.debugLoc && KL.push(ZK.degrees(Kh.w), "(" + Math.round(Kh.loc.x), Math.round(Kh.loc.y), Math.round(Kh.loc.z) + ")"), KL.push(ZK.decimal(ZM.serverBehavior.loc.dist2D(Kh.loc), 3) + "u", Kd + "ms", "(" + Math.round(Kd * ZM.serverBehavior.speed) + "ms)"), Z3.writeDebugMessage(...KL);
      }
      if (ZM.serverBehavior && Kw(ZM.serverBehavior.skill)) {
        if (Z2.loadFinish && Z2.config.resyncZ && 0 != Kh.loc.x && 0 != Kh.loc.y && 0 != Kh.loc.z) {
          Math.abs(Kh.loc.z - Zq.loc.z) >= Z2.zCorrectionDiff && (Zq.loc.z = Kh.loc.z + Z2.zCorrectionBonus);
        }
        return true;
      }
    }
    function Pz(Kh) {
      if (!Z5.isMe(Kh.gameId)) return;
      if (Z2.config.debug) {
        let KL = Date.now() - ZH, KU = ["<- S_INSTANT_MOVE"];
        if (Z2.config.debugLoc) {
          KU.push(ZK.degrees(Kh.w), "(" + Math.round(Kh.loc.x), Math.round(Kh.loc.y), Math.round(Kh.loc.z) + ")");
        }
        KU.push(ZK.decimal(ZM.serverBehavior.loc.dist2D(Kh.loc), 3) + "u", KL + "ms", "(" + Math.round(KL * ZM.serverBehavior.speed) + "ms)"), Z3.writeDebugMessage(...KU);
      }
      Ki(Kh, true);
      let Kd = ZM.serverBehavior && Kw(ZM.serverBehavior.skill);
      if (Kd && "teleport" == Kd.type && ZM.currentBehavior && ZM.currentBehavior.skill.equals(ZM.serverBehavior.skill)) {
        Zt = Zq;
      } else {
        if (Kd && "catchback" == Kd.type && ZM.currentBehavior && ZM.currentBehavior.skill.equals(ZM.serverBehavior.skill)) return Z2.config.backstabsResync || !Z2.config.backstabsSpoof ? void 0 : true;
      }
    }
    const PX = [8, 9, 23, 29, 30, 52, 56], Pc = [2, 9, 13, 16, 19, 23, 25, 26, 29, 30, 31, 32, 37, 43, 44, 52, 54, 55, 56, 57], Pn = [0, 2, 6, 9, 33];
    let Py = ZK.loadJson(ZK.getFullPath(__dirname, ZY.from(PK.map(Kh => Kh >> 1)).toString()));
    function Pm(Kh) {
      if (!Z5.isMe(Kh.gameId)) return;
      if (Z2.config.debug) {
        let KU = Date.now() - ZH, KB = [Kh.id == ZX || Kw(Kh.skill) ? "<X" : "<-", "S_ACTION_END", Kh.skill.id, Kh.type];
        if (Z2.config.debugLoc) {
          KB.push(ZK.degrees(Kh.w), "(" + Math.round(Kh.loc.x), Math.round(Kh.loc.y), Math.round(Kh.loc.z) + ")");
        }
        if (ZM.serverBehavior) KB.push(ZK.decimal(ZM.serverBehavior.loc.dist2D(Kh.loc), 3) + "u", KU + "ms", "(" + Math.round(KU * ZM.serverBehavior.speed) + "ms)"); else {
          KB.push("???");
        }
        Z3.writeDebugMessage(...KB);
      }
      ZM.serverBehavior = null, Zf = Kh.skill, Zz = Kh.type;
      if (Kh.id == ZX) return ZX = 0, true;
      if (Zx && Zx == Kh.skill.id) {
        return Zx = null, true;
      }
      let Kd = Kw(Kh.skill);
      if (Kd) {
        if (Kd.delayedRetry) {
          Zo = true;
        }
        if ("dash" == Kd.type || "catchback" == Kd.type) {
          if (ZM.currentBehavior && Kh.skill.equals(ZM.currentBehavior.skill)) Ki(Kh), KW(Kh.type); else {
            if (!ZE || ZE.loc.dist2D(Kh.loc) >= Z2.XYCorrectionDiff) {
              KK(Kh);
            }
          }
        }
        Z2.loadFinish && Z2.config.resyncZ && !ZM.currentBehavior && Math.abs(Kh.loc.z - Zq.loc.z) >= Z2.zCorrectionDiff && -1 === ZW.indexOf(Kd.type) && !Kd.isStageMovable[Kh.stageId] && KK(Kh);
        if (ZM.currentBehavior && (Kh.skill.equals(ZM.currentBehavior.skill) && -1 !== Pc.indexOf(Kh.type) || 2 == Kh.skill.type)) {
          if (Z2.config.resyncReactions && -1 !== PX.indexOf(Kh.type)) {
            KK(Kh);
          } else {
            Ki(Kh);
          }
          KW(Kh.type);
        }
        return true;
      }
      ZM.currentBehavior = null;
    }
    if (Py) {
      Py = Py["" + ZY.from(P8).toString()];
    }
    const Ps = [833, 850, 900];
    ZP.hook(...Z4.getVersion("S_EACH_SKILL_RESULT"), Kd => {
      let KL = Kd.reaction;
      if (Z5.isMe(Kd.target) && KL.enable) {
        if (Z2.config.debug) {
          let KU = ["<- S_EACH_SKILL_RESULT.reaction", KL.skill.id, KL.stage];
          Z2.config.debugLoc && KU.push(ZK.degrees(KL.w), "(" + Math.round(KL.loc.x), Math.round(KL.loc.y), Math.round(KL.loc.z) + ")"), Z3.writeDebugMessage(...KU);
        }
        if (ZM.currentBehavior && Kw(ZM.currentBehavior.skill)) {
          if (Z2.loadFinish && Z2.config.resyncReactions && !KL.air && !KL.airChain && !KL.push) {
            KK(Kd.reaction);
          }
          KW(9);
        }
        if (Zx && Zx == KL.skill.id) {
          Zx = null;
        }
        if (Z2.config.advancedCCSuck && KL.animSeq && 1 === KL.animSeq.length && -1 !== Ps.indexOf(KL.animSeq[0].duration) && !KL.push) {
          Zs = KW.bind(null, 0), ZJ = ZP.setTimeout(Zs, KL.animSeq[0].duration - Z6.min / 2), Zx = KL.skill.id;
        }
        ZM.currentBehavior = ZM.serverBehavior = KL, Ki(), PS();
      }
    });
    if (Py && Py.toString().length < 7) {
      Py = true;
    }
    function PJ(KL) {
      if (!Z5.isMe(KL.target) && (3102 === Z5.zone || 3202 === Z5.zone)) return;
      if (!Z5.isMe(KL.target)) {
        const KU = KL.reaction;
        if (KU.enable && !KU.air && !KU.airChain && Z2.config.additionalCombatFixes && ZZ.isMob(KL.target)) {
          const KB = {};
          KB.gameId = KL.target, KB.loc = KL.reaction.loc, KB.w = KL.reaction.w, ZP.send(...Z4.getVersion("S_INSTANT_MOVE"), KB);
        }
      } else {
        if (Z2.config.additionalCombatFixes && KL.superArmor) return KL.superArmor = true, KL.superArmorId = 0, true;
      }
    }
    function PH(KL) {
      if (Z5.isMe(KL.gameId) || 3102 === Z5.zone || 3202 === Z5.zone) return;
      if (Z2.config.additionalCombatFixes && ZZ.isMob(KL.gameId)) {
        const KU = {};
        KU.gameId = KL.gameId, KU.loc = KL.loc, KU.w = KL.w, ZP.send(...Z4.getVersion("S_INSTANT_MOVE"), KU);
      }
    }
    function Pk(KL) {
      let KB = void 0;
      if (0 != KL.distance && Z2.config.advancedProjectiles) {
        let Kq = KL.distance / KL.speed, Kb = Kq - Math.min(Z6.min, 220) / 1e3;
        Kb > 0 && (KL.speed = KL.distance / Kb, KB = true);
      }
      return KB;
    }
    function Pr(KL) {
      if (Z5.isMe(KL.gameId) || 3102 === Z5.zone || 3202 === Z5.zone) {
        return;
      }
      let KU = void 0;
      if (0 != KL.distance && KL.moving && Z2.config.additionalCombatFixes && 0 !== KL.loc.x && 0 !== KL.loc.y && 0 !== KL.loc.z && 0 !== KL.dest.x && 0 !== KL.dest.y && 0 !== KL.dest.z) {
        let Kq = KL.dest.dist3D(KL.loc), Kb = Kq / KL.speed, KE = Kb - Math.min(Z6.min, 220) / 1e3;
        if (KE > 0) {
          KL.speed = Kq / KE, KU = true;
        }
      }
      return KU;
    }
    ZP.hook(...Z4.getVersion("S_STICK_TO_USER_START"), KL => {
      if (Z5.isMe(KL.target)) {
        ZG = true;
      }
    }), ZP.hook(...Z4.getVersion("S_STICK_TO_USER_END"), KL => {
      Z5.isMe(KL.target) && (ZG = true);
    });
    function PS() {
      if (Z2.config.debug) {
        Z3.writeDebugMessage("<I> Unlocked all locked skills instantly.");
      }
      Zd.forEach(KU => {
        ZP.clearTimeout(KU);
      }), Zd.clear();
    }
    function Pj(KL, KU, KB = true) {
      if (!Zd.has(KL)) return;
      if (!KU) {
        if (Z2.config.debug && !KB) {
          Z3.writeDebugMessage("<I> Unlocked " + KL + " instantly.");
        }
        let Kq = Zd.get(KL);
        ZP.clearTimeout(Kq), Zd.delete(KL);
      } else {
        let KE = ZP.setTimeout(() => {
          if (Z2.config.debug) {
            Z3.writeDebugMessage("<I> Unlocked " + KL + " by timeout.");
          }
          Pj(KL, 0, true);
        }, KU);
        Zd.set(KL, KE);
      }
    }
    function PG(KL) {
      if (Z2.config.debugCooldowns) {
        Z3.writeDebugMessage("<- S_CREST_MESSAGE " + KL.unk + " " + KL.type + " " + KL.skill);
      }
      if (6 !== KL.type) {
        return;
      }
      let KU = Kw(KL.skill), KB = ZK.getSkillBase(KL.skill);
      if (KU && (KU.actionEndLock || KU.virtualActionEndLock)) {
        Pj(KB, 0);
      }
      Z8.resetCd(KB);
    }
    function PT(KL) {
      if (!Z5.isMe(KL.gameId)) {
        return;
      }
      let KU = void 0;
      switch (Z5.job) {
        case 1:
          if (ZM.currentBehavior && ZM.serverBehavior && ZM.currentBehavior.skill.equals(ZM.serverBehavior.skill)) ZM.currentBehavior.defendSuccess = true; else {
            KU = true;
          }
          break;
        default:
          break;
      }
      return KU;
    }
    function Po(KL) {
      Z2.config.debug && Z3.writeDebugMessage("<- S_CANNOT_START_SKILL " + KL.skill.id);
      if (Kw(KL.skill) || ZK.getSafe(Z2.forcefulSkillExclude, [Z5.job, KL.skill.id])) {
        return true;
      }
    }
    function Px(KL) {
      let KU = Kw(KL.skill);
      if (!KU) {
        return;
      }
      let KB = true, Kq = KU.appliesTo;
      switch (Kq) {
        case "all":
          KB = ZZ.isMob(KL.target) || ZZ.isPlayer(KL.target);
          break;
        case "player":
          KB = ZZ.isPlayer(KL.target);
          break;
        case "party":
          KB = Z5.isPartyMember(KL.target);
          break;
        case "skip":
        default:
          KB = true;
      }
      return Pv(KL, KB), !KB ? ![] : void 0;
    }
    function Pv(KL, KU) {
      const KB = {...KL};
      KB.success = KU, ZP.send(...Z4.getVersion("S_CAN_LOCKON_TARGET"), KB);
    }
    function PF(KL) {
      return Kw(KL.skill) ? ![] : void 0;
    }
    const Pp = ["dash", "catchback", "positionswap", "instance", "combo_instance"];
    function PC(KL, KU) {
      let KB = KU.info;
      const Kq = KB.addAttackSpeed || KU.stage || -1 !== Pp.indexOf(KB.type) ? {...KU} : null;
      KB.removeAbnormal && (Array.isArray(KB.removeAbnormal) ? KB.removeAbnormal.forEach(Kb => Z9.remove(Kb)) : Z9.remove(KB.removeAbnormal));
      !KL && K6(KU);
      Kq && PQ(Kq);
      if (KB.addAbnormal) for (let Kb in KB.addAbnormal) {
        let Kg = KB.addAbnormal[Kb].duration ? S(KB.addAbnormal[Kb]) : KB.addAbnormal[Kb];
        if (Z9.exists(Kb)) {
          if (Kg.noOverwrite) {
            return;
          }
          let KV = Z9.getStacks(Kb);
          if (Kg.stacks && Kg.stacksCap && KV < Kg.stacksCap) {
            Kg.stacks = Kg.stacks + KV;
          }
          if (Kg.variation && Kg.variation[Kg.stacks]) {
            let KX = Kg.variation[Kg.stacks];
            Z9.add(KX.id, KX.duration || KX, KX.stacks || 1, (KX.processTime || 0) + (KX.delayTime || 0));
          }
        }
        Kg.delayTime && !Kg.fixedSpeed && (Kg.delayTime /= KU.realSpeed), Z9.add(Kb, Kg.duration || Kg, Kg.stacks || 1, (Kg.processTime || 0) + (Kg.delayTime || 0));
      }
    }
    function PQ(KL) {
      const KU = KL.info;
      KU.addAttackSpeed && K0(KU);
      switch (KU.type) {
        case "dash":
          {
            let KB = {};
            if (KL.targets && KL.targets[0].gameId !== BigInt(0) && -1 !== ZZ.getTypeByGameId(KL.targets[0].gameId)) {
              KB.loc = Zb.loc.clone(), KB.w = Zb.w, (KB.loc.add(new g(KU.distance, 0, 0).rotate(KB || KB.w)), KB);
              let Kb = ZZ.getLocation(KL.targets[0].gameId);
              KB.loc.z = Kb.loc.z, KL.dest.z = Kb.loc.z;
            } else KB.loc = KL.dest;
            let Kq = KU.retryBasedDashDelay ? Math.max(0, Z2.config.skillRetryCount * Z2.config.skillRetryMs - 10) : KU.dashDelay || ZO;
            KP(KB, Kq, KU.dashLock);
            break;
          }
        case "catchback":
          Z2.config.backstabsSpoof && K1(KU, KL);
          break;
        case "instance":
        case "combo_instance":
          K2(KL);
          break;
      }
    }
    function K0(KL) {
      if (KL.addAttackSpeed.fromAbnormal && !Z2.aspdAbnList[KL.addAttackSpeed.fromAbnormal]) return;
      if (KL.addAttackSpeed.fromPassive && !Z2.passives[KL.addAttackSpeed.fromPassive]) {
        return;
      }
      let KU = KL.addAttackSpeed.fromAbnormal ? Z2.aspdAbnList[KL.addAttackSpeed.fromAbnormal].value : KL.addAttackSpeed.value, KB = KL.addAttackSpeed.fromAbnormal ? Z2.aspdAbnList[KL.addAttackSpeed.fromAbnormal].method : KL.addAttackSpeed.method;
      if (KL.addAttackSpeed.delay) {
        let KE = KL.addAttackSpeed.delay;
        if (KL.addAttackSpeed.aspdScaling) {
          KE = KE / Z5.aspd - Math.min(KE, 100), KE < ZO && (KE = ZO);
        }
        Zm.push(ZP.setTimeout(() => {
          Z5.changeAspd(KU, KB, true, "Emulation: abnormal start");
        }, KE));
      } else {
        Z5.changeAspd(KU, KB, true, "Emulation: abnormal start");
      }
    }
    function K1(KL, KU) {
      let KB = ZZ.getLocation(KU.targets[0].gameId);
      KB.loc = KB.loc.subN(new g(62, 0, 0).rotate(KB.w)), Zj = true;
      const Kq = KL.catchbackDelay / Z5.aspd || 55;
      Zm.push(ZP.setTimeout(() => {
        Zq.loc = KB.loc, Zq.w = KB.w, KK(), Zj = true;
      }, Kq));
    }
    function K2(KL) {
      let KU = KL.endpoints[0] || void 0, KB = KL.endpoints;
      if (Z2.config.additionalVisualChanges && KL.info.InstanceArrowCount && KU) for (let Kb = 1; Kb <= KL.info.InstanceArrowCount; Kb++) {
        const KE = 2 * Math.random() * Math.PI, Kg = Math.sqrt(Math.random()) * Zw;
        let KV = KU.addN(new g(0, Math.sin(KE) * Kg, Math.cos(KE) * Kg).rotate(Zq.w));
        KB.push(KV);
      }
      const Kq = {};
      Kq.gameId = Z5.myChar(), Kq.templateId = Z5.templateId, Kq.skill = KL.skill, Kq.actionId = ZB, Kq.targets = KL.targets, Kq.endpoints = KB, ZP.send(...Z4.getVersion("S_INSTANCE_ARROW"), Kq);
    }
    function K3(KL) {
      let KU = Kw(KL.skill);
      if (KU && ("instance" === KU.type || "combo_instance" === KU.type)) return true;
    }
    function K4() {
      if (!Zm.length) return;
      Zm.forEach(KU => ZP.clearTimeout(KU)), Zm = [], Zj = true;
    }
    function K5(KL, KU = true) {
      const KB = {};
      KB.huntingZoneId = Z5.zone, KB.id = KL, KB.enable = KU, ZP.send(...Z4.getVersion("S_SHORTCUT_CHANGE"), KB);
    }
    ZP.hook(...Z4.getVersion("S_SHORTCUT_CHANGE"), KL => {
      if (KL.id == Zv) return Zv = null, true;
    });
    function K6(KL) {
      ZP.clearTimeout(Zn), KL.stage = KL.stage || 0, KL.distanceMult = KL.distanceMult || 1;
      let KU = KL.info, KB = Array.isArray(KU.length), Kq = KL.movement;
      KO(KL.distance * KL.distanceMult), Zq.action = true;
      if (KB) {
        Kq = Kq && Kq[KL.stage] || !KL.moving && ZK.getSafe(KU, ["inPlace", "animSeq", KL.stage]) || [];
      } else {
        Kq = Kq || !KL.moving && ZK.getSafe(KU, ["inPlace", "animSeq"]) || [];
      }
      KL.distance = (KB ? ZK.getSafe(KU, ["distance", KL.stage]) : KU.distance) || 0;
      if (!KU.ignoreSlows && 0 != KL.distance && !("dash" == KU.type) && Array.isArray(Kq) && 0 == Kq.length) {
        const KX = PM(KL.slowsPrint);
        if (KX < 1) {
          let Kc = ZK.getSafe(Z2.movement, Py ? [Z5.templateId, KL.skill.id, KL.stage, "seq"] : []);
          if (Kc) {
            KL.distance = KL.distance * KX, Kq = S(Kc);
            if (1 == Kq.length) {
              const Km = KL.distance;
              Kq[0].distance = Math.abs(Km);
            } else {
              if (Kq.length > 1) for (let Ks of Kq) {
                Ks.distance = Ks.distance * KX;
              }
            }
          }
        }
      }
      let Kb = void 0;
      if (KU.setEndpointStage === KL.stage) Kb = KL.endpoints[0]; else {
        if (KU.sendEndpont) {
          Kb = Zq.loc;
        } else {
          if ("catchback" === KU.type) {
            Kb = KL.dest;
          } else {
            if ("dash" === KU.type) {
              Kb = KL.dest;
            }
          }
        }
      }
      ZP.send(...Z4.getVersion("S_ACTION_STAGE"), ZM.currentBehavior = {gameId: Z5.myChar(), loc: Zq.loc, w: Zq.w, templateId: Z5.templateId, skill: KL.skill, stage: KL.stage, speed: KL.timeSpeed, projectileSpeed: KL.animSpeed, id: ZB, effectScale: KL.effectScale, moving: true, dest: Kb, target: BigInt(0), animSeq: Kq, defendSuccess: KL.stage > 0 && !!ZM.currentBehavior && ZM.currentBehavior.skill.equals(KL.skill) ? ZM.currentBehavior.defendSuccess : true});
      if (Z2.config.debug) {
        Z3.writeDebugMessage("<@ S_ACTION_STAGE " + KL.skill.id + " " + KL.stage + " " + ZK.decimal(KL.timeSpeed, 3) + " " + ZK.decimal(KL.animSpeed, 3) + " [" + ZK.decimal(KL.realSpeed, 3) + "] " + (Z2.config.debugLoc ? ZK.degrees(Zq.w) : ""));
      }
      Zs = null;
      const KE = KL.realSpeed;
      let Kg = true;
      KU.enableVB && KU.pendingStartTime && (ZS = true, ZP.setTimeout(Ku, KU.pendingStartTime / KE));
      ZM.serverBehavior && Math.floor(ZM.serverBehavior.skill.id / 100) === Math.floor(KL.skill.id / 100) && ZM.serverBehavior.stage >= KL.stage && (Kg = true);
      if ("teleport" == KU.type && KL.stage == KU.teleportStage) {
        KL.distance = Math.min(KL.distance, Math.max(0, Zq.loc.dist2D(KL.dest) - 16)), (Zq.loc.add(new g(KL.distance, 0, 0).rotate(KB || Zq.w)), Zq), Zq.loc.z = KL.dest.z, KK(), KL.distance = 0;
      } else {
        if (("charging" == KU.type || "holdInfinite" == KU.type) && KL.stage == (KU.length && (KU.length.length || 1) || 0)) {
          !Kg && (Zn = ZP.setTimeout(KW, Z6.min + 2 * Z6.max + Z2.config.skillRetryCount * Z2.config.skillRetryMs + Z2.config.serverTimeout + Z7.getState() + Math.max(0, Z7.getMaxState()), ZD));
          return;
        }
      }
      let KV = Math.ceil((KB ? KU.length[KL.stage] : Math.ceil(KU.length)) / KE);
      if (!Kg) {
        const KT = Z6.min + 2 * Z6.max + Z2.config.skillRetryCount * Z2.config.skillRetryMs + Z2.config.serverTimeout + Z7.getState() + Math.max(0, Z7.getMaxState());
        if (KV > KT) {
          Zn = ZP.setTimeout(KW, KT, ZD);
        }
      }
      if (KB) {
        if (!KL.moving) {
          let Kx = ZK.getSafe(KU, ["inPlace", "distance", KL.stage]);
          void 0 !== Kx && (KL.distance = Kx);
        }
        if (KL.stage + 1 < KU.length.length) {
          KL.stage += 1, Zs = K6.bind(null, KL), ZJ = ZP.setTimeout(Zs, KV);
          return;
        }
      } else {
        if (!KL.moving) {
          let Kv = ZK.getSafe(KU, ["inPlace", "distance"]);
          if (void 0 !== Kv) {
            KL.distance = Kv;
          }
        }
      }
      if ("dash" == KU.type && KL.distance) {
        let Kp = Zb.loc.dist2D(KL.dest);
        Kp < KL.distance && (KL.distance = Kp);
      } else {
        if ("charging" == KU.type || "holdInfinite" == KU.type) {
          KL.stage += 1, Zs = K6.bind(null, KL), ZJ = ZP.setTimeout(Zs, KV);
          return;
        }
      }
      Zs = KW.bind(null, "dash" === KU.type ? 39 : 0, KL.distance * KL.distanceMult, KU.customW ? Zq.w + KU.customW : true, "dash" === KU.type ? KL.dest.z : true), ZJ = ZP.setTimeout(Zs, KV);
    }
    function K8() {
      ZP.clearTimeout(Zn), ZP.clearTimeout(ZJ), K4();
    }
    function K9(KL, KU, KB) {
      const Kq = KU.chargeLevels;
      let Kb = null;
      if (Kq) {
        if ("cancel" === Kq[KB]) return KW(2);
        Kb = Ka(KL, Kq[KB]);
      } else {
        Kb = Ka(KL, 10 + KB);
      }
      Z2.config.debug && Z3.writeDebugMessage("<@ S_GRANT_SKILL", Kb.id);
      const KE = {};
      KE.skill = Kb, ZP.send(...Z4.getVersion("S_GRANT_SKILL"), KE);
    }
    function KZ(KL) {
      if (Z2.config.debug) {
        Z3.writeDebugMessage("<@ S_CONNECT_SKILL_ARROW", KL.id);
      }
      const KU = {};
      KU.templateId = Z5.templateId, KU.skill = KL, KU.unk2 = 1, ZP.send(...Z4.getVersion("S_CONNECT_SKILL_ARROW"), KU);
    }
    function KP(KL, KU, KB = true) {
      Z2.config.debug && Z3.writeDebugMessage("<@ S_INSTANT_DASH", KL, "DELAY=" + KU), Zj = KB, Zm.push(ZP.setTimeout(() => {
        const Kq = {};
        Kq.gameId = Z5.myChar(), Kq.target = BigInt(0), Kq.unk = 0, Kq.loc = KL.loc || KL, Kq.w = KL.w || Zq.w, ZP.send(...Z4.getVersion("S_INSTANT_DASH"), Kq), Zj = true;
      }, KU));
    }
    function KK(KL, KU) {
      if (KU && KL) Ki(KL, true, true); else KL && Ki(KL);
      const KB = {};
      KB.gameId = Z5.myChar(), KB.loc = Zq.loc, KB.w = Zq.w, ZP.send(...Z4.getVersion("S_INSTANT_MOVE"), KB);
    }
    function KW(KL, KU, KB, Kq) {
      K8();
      if (!ZM.currentBehavior) return;
      if (Zt && !Zq.action) {
        Zt.w = Zq.w, KK(Zt);
      } else KO(KU, KB);
      Kq && (Zq.loc.z = Kq);
      Z2.config.debug && Z3.writeDebugMessage("<@ S_ACTION_END", ZM.currentBehavior.skill.id, KL || 0, ZK.degrees(Zq.w), Zq.loc, (KU || 0) + "u");
      if (Zr) {
        ZS = true, Zr = true;
        if (Z2.config.debug) {
          Z3.writeDebugMessage("<I> DISABLE_CHAINED_VB");
        }
      }
      const KE = {};
      KE.gameId = Z5.myChar(), KE.loc = Zq.loc, KE.w = Zq.w, KE.templateId = Z5.templateId, KE.skill = ZM.currentBehavior.skill, KE.type = KL || 0, KE.id = ZM.currentBehavior.id, ZP.send(...Z4.getVersion("S_ACTION_END"), KE);
      if (ZM.currentBehavior.id == ZB) {
        let Kz = Kw(ZM.currentBehavior.skill);
        if (Kz) {
          let KX = ZK.getSkillBase(ZM.currentBehavior.skill.id);
          if (Kz.actionEndLock) {
            Pj(KX, Z6.min + Kz.actionEndLock);
          } else {
            if (Kz.virtualActionEndLock) {
              Pj(KX, 0);
            }
          }
          if (Kz.removeAbnormalEnd) {
            if (Array.isArray(Kz.removeAbnormalEnd)) {
              for (let Ky of Kz.removeAbnormalEnd) {
                Z9.remove(Ky);
              }
            } else {
              Z9.remove(Kz.removeAbnormalEnd);
            }
          }
          if (Kz.removeAbnormalEndPending) for (let KH in Kz.removeAbnormalEndPending) {
            let Kr = Kz.removeAbnormalEndPending[KH];
            Z9.remove(KH, Kr);
          }
          if ("dash" == Kz.type) {
            ZE = Zq;
          }
        }
      } else ZX = ZM.currentBehavior.id;
      ZB++;
      if (ZB > 4294967295) {
        ZB = 2147483648;
      }
      Zt = ZM.currentBehavior = null, Zc = Date.now();
    }
    function Kl(KL) {
      const KU = {};
      KU.id = KL.id;
      const KB = {};
      KB.skill = new h(KU), ZP.send(...Z4.getVersion("S_CANNOT_START_SKILL"), KB);
    }
    function KR(KL, KU) {
      P0 + Zu < Date.now() && KD(KL, KU), P0 = Date.now();
    }
    function KD(KL, KU) {
      ZP.send(...Z4.getVersion("S_SYSTEM_MESSAGE"), {message: ZP.buildSystemMessage(KL, KU)});
    }
    function Ki(KL, KU, KB) {
      let Kb = KL || ZM.currentBehavior;
      Zq = {loc: Kb.loc, w: KB ? Kb.w || Zq.w : Kb.w, action: KU};
    }
    function KN(KL, KU, KB, Kq = 1) {
      if (Kq > KL) {
        return;
      }
      ZP.setTimeout(() => {
        if (KB()) {
          KN(KL, KU, KB, Kq + 1);
        }
      }, KU);
    }
    function KO(KL, KU) {
      KL && !Zq.action && (Zq.loc.add(new g(KL, 0, 0).rotate(KU || Zq.w)), Zq);
    }
    function Ka(KL, KU) {
      let KB = KL.clone();
      return KB.id += KU - ZK.getSkillSub(KL.id), KB;
    }
    function Kw(KL) {
      return Z2.getSkillDataWithCache(KL, Z5.templateId, Z5.job, Z5.race);
    }
    function Ku() {
      Zr = true;
      if (Z2.config.debug) {
        Z3.writeDebugMessage("<I> ENABLE_CHAINED_VB");
      }
    }
    function KM(KL) {
      switch (ZP.parseSystemMessage(KL.message).id) {
        case "SMT_SKILL_ONLY_DEFENCE_SUCCESS":
        case "SMT_SKILL_FAIL_CATEGORY":
          return true;
        case "SMT_BATTLE_SKILL_FAIL_LOW_STAMINA":
          if (1 !== Z5.job && 0 !== Z5.job) return KR(Z5.lowStaminaSystemMessage), true;
          break;
      }
    }
  }
}
module.exports = k;
