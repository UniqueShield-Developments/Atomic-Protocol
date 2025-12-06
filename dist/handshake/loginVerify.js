"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const types_1 = require("../types");
const logger_1 = require("../utils/logger");
exports.default = (client) => {
    const getDER = (b64) => crypto.createPublicKey({ key: Buffer.from(b64, 'base64'), format: 'der', type: 'spki' });
    client.decodeLoginJWT = (authTokens, skinTokens) => {
        const { key, data } = verifyAuth(authTokens);
        const pubKey = getDER(key);
        const skinData = (0, jsonwebtoken_1.verify)(skinTokens, pubKey, { algorithms: ['ES384'] });
        return { key, userData: data, skinData };
    };
    client.encodeLoginJWT = (localChain, mojangChain) => {
        const chains = [];
        chains.push(localChain);
        for (const chain of mojangChain) {
            chains.push(chain);
        }
        return chains;
    };
    function verifyAuth(chain) {
        let data = {};
        let didVerify = false;
        let pubKey = getDER(getX5U(chain[0]));
        let finalKey = null;
        for (const token of chain) {
            const decoded = (0, jsonwebtoken_1.verify)(token, pubKey, { algorithms: ['ES384'] });
            const x5u = getX5U(token);
            if (x5u === types_1.PUBLIC_KEY && !data.extraData?.XUID) {
                didVerify = true;
                logger_1.Logger.debug(`Verified Client With Mojang Key: ${x5u}`, config_1.config.debug);
            }
            pubKey = decoded.identityPublicKey ? getDER(decoded.identityPublicKey) : x5u;
            finalKey = decoded.identityPublicKey || finalKey; // non pem
            data = { ...data, ...decoded };
        }
        if (!didVerify)
            client.disconnect('disconnectionScreen.notAuthenticated');
        return { key: finalKey, data };
    }
};
function getX5U(token) {
    const [header] = token.split('.');
    const hdec = Buffer.from(header, 'base64').toString('utf-8');
    const hjson = JSON.parse(hdec);
    return hjson.x5u;
}
