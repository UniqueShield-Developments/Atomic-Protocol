"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const convert = (string) => {
    const [header, motd, protocol, version, playersOnline, playersMax, serverId, levelName, gamemode, gamemodeId, portV4, portV6] = string.split(';');
    return {
        header,
        motd,
        protocol,
        version,
        playersOnline,
        playersMax,
        serverId,
        levelName,
        gamemode,
        gamemodeId,
        portV4,
        portV6
    };
};
exports.convert = convert;
