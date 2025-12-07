import "colors"

export class Logger {
    private static tag = "Atomic"

    private static label(): string {
        return `[${this.tag}]`
    }

    private static debugLabel(): string {
        return `[DEBUG]`.gray
    }

    private static timestamp(): string {
        const now = new Date().toLocaleString()
        return now.gray
    }

    static log(message: string) {
        console.log(`${this.timestamp()} ${this.label()} ${message.white}`)
    }

    static warn(message: string) {
        console.warn(`${this.timestamp()} ${this.label()} ${message.yellow}`)
    }

    static error(message: string) {
        console.error(`${this.timestamp()} ${this.label()} ${message.red}`)
    }

    static success(message: string) {
        console.log(`${this.timestamp()} ${this.label()} ${message.green}`)
    }

    static debug(message: string, debug = false) {
        if (!debug) return
        console.log(`${this.timestamp()} ${this.label()} ${this.debugLabel()} ${message.cyan}`)
    }
}
