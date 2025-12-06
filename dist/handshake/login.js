"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const functions_1 = require("../lib/functions");
const types_1 = require("../types");
exports.default = (client, options) => {
    const skinData = require("../config/steve.json");
    client.createClientChain = () => {
        const privateKey = client.ecdhKeyPair.privateKey;
        client.clientIdentityChain = (0, jsonwebtoken_1.sign)({
            identityPublicKey: types_1.PUBLIC_KEY,
            certificateAuthority: true
        }, privateKey, {
            algorithm: 'ES384',
            header: { x5u: client.clientX509, alg: "ES384" }
        });
        client.createClientUserChain(privateKey);
    };
    client.createClientUserChain = (privateKey) => {
        let payload = {
            ...skinData,
            ClientRandomId: Date.now(),
            CurrentInputMode: 1,
            DefaultInputMode: 1,
            DeviceId: (0, functions_1.nextUUID)(),
            DeviceModel: config_1.config.deviceModel,
            DeviceOS: client.session?.deviceOS || 7,
            GameVersion: config_1.config.minecraftVersion,
            GuiScale: -1,
            LanguageCode: 'en_GB',
            GraphicsMode: 1,
            PlatformOfflineId: '',
            PlatformOnlineId: '',
            PlayFabId: (0, functions_1.nextUUID)().replace(/-/g, '').slice(0, 16).toLowerCase(),
            SelfSignedId: (0, functions_1.nextUUID)(),
            ServerAddress: `${options.host}:${options.port}`,
            ThirdPartyName: client.profile.name,
            ThirdPartyNameOnly: undefined,
            UIProfile: 0,
            IsEditorMode: false,
            TrustedSkin: false,
            OverrideSkin: false,
            CompatibleWithClientSideChunkGen: false,
            MaxViewDistance: 0,
            MemoryTier: 0,
            PlatformType: 0
        };
        const customPayload = options.skinData || {};
        payload = { ...payload, ...customPayload };
        payload.ServerAddress = `${options.host}:${options.port}`;
        client.clientUserChain = (0, jsonwebtoken_1.sign)(payload, privateKey, {
            algorithm: "ES384",
            header: {
                x5u: client.clientX509,
                alg: "ES384",
            },
            noTimestamp: true
        });
    };
};
