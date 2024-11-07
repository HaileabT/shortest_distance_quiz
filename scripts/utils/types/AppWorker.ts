export class AppWorker extends Worker {
  constructor(script: URL | string, options: WorkerOptions) {
    super(script, options);
  }

  public sendMessage<T, R>(message: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.postMessage(message);

      this.onmessage = (e: MessageEvent<R>) => {
        resolve(e.data);
      };

      this.onerror = (e: ErrorEvent) => {
        reject(e);
      };

      this.onmessageerror = (e: MessageEvent) => {
        reject(e);
      };
    });
  }
}
