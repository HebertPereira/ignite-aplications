import { Readable } from "node:stream";
import nodeConsoleLoadingBar from "./nodeConsoleLoadingBar.js";

export class OneTohundredStream extends Readable {
  index = 1;

  _read() {
    const acc = this.index++;

    setTimeout(() => {
      if (acc > 100) {
        this.push(null);
      } else {
        console.clear();

        const buf = Buffer.from(String(nodeConsoleLoadingBar(acc, 5)));

        this.push(buf);
      }
    }, 50);
  }
}

new OneTohundredStream().pipe(process.stdout);
