import "colors";
export declare class Logger {
    private static tag;
    private static label;
    private static debugLabel;
    private static timestamp;
    static log(message: string): void;
    static warn(message: string): void;
    static error(message: string): void;
    static success(message: string): void;
    static debug(message: string, debug?: boolean): void;
}
