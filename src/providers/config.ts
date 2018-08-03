import { Injectable } from '@nestjs/common';

import * as convict from 'convict';
import * as path from 'path';
import { schema } from 'config/schema';

const CONFIG_PATH = process.cwd() + '/src/config';

@Injectable()
export class Config {

  private config: convict;

  constructor() {
    this.config = convict(schema);
    this.config.loadFile([path.join(CONFIG_PATH, 'base.json'), path.join(CONFIG_PATH, `${this.config.get('env')}.json`)]);
  }

  public get(key: string) {
    return this.config.get(key);
  }

  public versionPath() {
    return `v${this.get('api.version')}`;
  }

  public set(key: string, value: any) {
    return this.config.set(key, value);
  }

  public has(key: string) {
    return this.config.has(key);
  }
}
