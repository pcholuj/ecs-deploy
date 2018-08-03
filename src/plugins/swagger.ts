import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Path from 'path';

export const swagger = (app, config) => {
  if (['test'].indexOf(process.env.NODE_ENV) > -1) {
    return;
  }

  const options = new DocumentBuilder()
    .setTitle('Workflows API')
    .setDescription('Worflows API documentation')
    .setVersion(config.get('api.version'))
    .setBasePath(config.versionPath())
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(Path.join(config.versionPath(), config.get('swagger.path')), app, document);
};
