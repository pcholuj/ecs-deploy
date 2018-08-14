import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import * as plugins from 'plugins';
import { Config } from 'providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get('Config') as Config;

  // load plugins
  for (const i in plugins) {
    if (!plugins.hasOwnProperty(i)) {
      continue;
    }

    plugins[i](app, config);
  }

  app.setGlobalPrefix(config.versionPath());
  await app.listen(config.get('api.port') || 3000);
}
bootstrap();
