"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const gradient_string_1 = __importDefault(require("gradient-string"));
class Logger {
    static purpleLabel() {
        const colors = ["#d6b3ff", "#b57cff", "#8e44ff", "#5a1aff"];
        return (0, gradient_string_1.default)(colors)(`[${this.tag}]`);
    }
    static debugLabel() {
        const colors = ["#2d2e2eff", "#494949ff", "rgba(129, 131, 131, 1)", "#c4c3c3ff"];
        return (0, gradient_string_1.default)(colors)(`[DEBUG]`);
    }
    static timestamp() {
        const now = new Date().toLocaleString();
        return chalk_1.default.gray(now);
    }
    static log(message) {
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${chalk_1.default.whiteBright(message)}`);
    }
    static warn(message) {
        console.warn(`${this.timestamp()} ${this.purpleLabel()} ${chalk_1.default.yellow(message)}`);
    }
    static error(message) {
        console.error(`${this.timestamp()} ${this.purpleLabel()} ${chalk_1.default.redBright(message)}`);
    }
    static success(message) {
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${chalk_1.default.greenBright(message)}`);
    }
    static debug(message, debug = false) {
        if (!debug)
            return;
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${this.debugLabel()} ${chalk_1.default.hex("#a3f3ff")(message)}`);
    }
}
exports.Logger = Logger;
Logger.tag = "Atomic";
