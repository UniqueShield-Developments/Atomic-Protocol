"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
require("colors");
class Logger {
    static label() {
        return `[${this.tag}]`;
    }
    static debugLabel() {
        return `[DEBUG]`.gray;
    }
    static timestamp() {
        const now = new Date().toLocaleString();
        return now.gray;
    }
    static log(message) {
        console.log(`${this.timestamp()} ${this.label()} ${message.white}`);
    }
    static warn(message) {
        console.warn(`${this.timestamp()} ${this.label()} ${message.yellow}`);
    }
    static error(message) {
        console.error(`${this.timestamp()} ${this.label()} ${message.red}`);
    }
    static success(message) {
        console.log(`${this.timestamp()} ${this.label()} ${message.green}`);
    }
    static debug(message, debug = false) {
        if (!debug)
            return;
        console.log(`${this.timestamp()} ${this.label()} ${this.debugLabel()} ${message.cyan}`);
    }
}
exports.Logger = Logger;
Logger.tag = "Atomic";
