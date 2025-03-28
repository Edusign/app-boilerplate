export class WebhookError extends Error {
    code = 500;

    constructor(message: string, code: number = 500) {
        super(message);
        this.name = "WebhookError";
        this.code = code;
    }
}