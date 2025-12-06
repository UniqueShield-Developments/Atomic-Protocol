"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionAlgorithm = exports.PUBLIC_KEY = exports.clientStatus = void 0;
//Consts
exports.clientStatus = {
    Disconnected: 0,
    Connecting: 1,
    Authenticating: 2,
    Initializing: 3,
    Initialized: 4
};
exports.PUBLIC_KEY = 'MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAECRXueJeTDqNRRgJi/vlRufByu/2G0i2Ebt6YMar5QX/R0DIIyrJMcUpruK4QveTfJSTp3Shlq4Gk34cD/4GUWwkv0DVuzeuB+tXija7HBxii03NHDbPAD0AKnLr2wdAp';
var CompressionAlgorithm;
(function (CompressionAlgorithm) {
    CompressionAlgorithm["None"] = "none";
    CompressionAlgorithm["Zlib"] = "zlib";
    CompressionAlgorithm["Gzip"] = "gzip";
})(CompressionAlgorithm || (exports.CompressionAlgorithm = CompressionAlgorithm = {}));
