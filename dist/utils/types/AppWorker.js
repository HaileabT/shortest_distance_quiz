export class AppWorker extends Worker {
    constructor(script, options) {
        super(script, options);
    }
    sendMessage(message) {
        return new Promise((resolve, reject) => {
            this.postMessage(message);
            this.onmessage = (e) => {
                resolve(e.data);
            };
            this.onerror = (e) => {
                reject(e);
            };
            this.onmessageerror = (e) => {
                reject(e);
            };
        });
    }
}
