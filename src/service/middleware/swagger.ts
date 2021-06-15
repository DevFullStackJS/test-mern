import * as path from 'path';

const expressJSDocSwagger = require('express-jsdoc-swagger');

class SwaggerMiddleware {
  private options = {
    info: {
      version: '1.0.0',
      title: 'bo API',
    },
    description: 'API bo',
    filesPattern: [
      './infrastructure/route/**/*.ts',
      './infrastructure/route/**/*.js',
      './infrastructure/route/*.ts',
      './infrastructure/route/*.js',
      './data/dto/**/*.ts',
      './data/dto/**/*.js',
    ],
    security: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    baseDir: path.resolve(__dirname, '../..'),
    swaggerUIPath: '/api-docs',
    apiDocsPath: '/v1/api-docs',
  };

  public init(app): void {
    expressJSDocSwagger(app)(this.options);
  }
}

export default new SwaggerMiddleware();
