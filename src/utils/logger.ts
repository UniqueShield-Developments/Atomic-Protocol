import "colors"

export class Logger {
    static tag = "Atomic"

    static purpleLabel() {
        return `[${this.tag}]`.magenta
    }

    static debugLabel() {
        return `[DEBUG]`.gray
    }

    static timestamp() {
        const now = new Date().toLocaleString()
        return now.gray
    }

    static log(message) {
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${message.white}`)
    }

    static warn(message) {
        console.warn(`${this.timestamp()} ${this.purpleLabel()} ${message.yellow}`)
    }

    static error(message) {
        console.error(`${this.timestamp()} ${this.purpleLabel()} ${message.red}`)
    }

    static success(message) {
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${message.green}`)
    }

    static debug(message, debug = false) {
        if (!debug) return
        console.log(`${this.timestamp()} ${this.purpleLabel()} ${this.debugLabel()} ${message.cyan}`)
    }
}
