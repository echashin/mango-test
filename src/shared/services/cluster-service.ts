import { Injectable } from '@nestjs/common';
import cluster from 'cluster';
import os from 'os';

const avialableCPUs: number = os.cpus().length;
const maxCPU: number = Number.parseInt(process.env.MAX_CPU);

const numCPUs: number = avialableCPUs > maxCPU ? maxCPU : os.cpus().length;

@Injectable()
export class ClusterService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      // eslint-disable-next-line no-console
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i: number = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/no-unused-vars
      cluster.on('exit', (worker, code, signal) => {
        // eslint-disable-next-line no-console
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
