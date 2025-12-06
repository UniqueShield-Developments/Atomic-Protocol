"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.config = void 0;
exports.config = {
    debug: false,
    protocol: 860,
    minecraftVersion: "1.21.124",
    deviceModel: "AtomicTS",
    connectTimeout: 9000,
    autoInitPlayer: true,
    ignoredPackets: [
        0x91
    ],
    parties: {
        xbox: "http://xboxlive.com",
        realm: "https://pocket.realms.minecraft.net/"
    },
    realmHeaders: {
        "Cache-Control": "no-cache",
        Charset: "utf-8",
        "Content-Type": "application/json",
        "Client-Version": "1.21.124",
        "User-Agent": "MCPE/UWP",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip, deflate, br"
    },
    endpoints: {
        worlds: "https://pocket.realms.minecraft.net/worlds",
        address: (realmId) => `https://pocket.realms.minecraft.net/worlds/${realmId}/join`,
        acceptInvite: (code) => `https://bedrock.frontendlegacy.realms.minecraft-services.net/invites/v1/link/accept/${code}`
    }
};
exports.defaultOptions = {
    transport: "raknet",
    version: exports.config.minecraftVersion,
    autoInitPlayer: true,
    connectTimeout: 9000,
    packets: [],
};
