"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Customer_Freelancer')
        .setDescription(`Այստեղ user-ի համար ունենք 3 role -> ADMIN(0), CUSTOMER(1), FREELANCER(2)
    \n\n ինչպես նաև job-ի համար ունենք 3 status -> START(0), PROCESS(1), FINISHED(2)
    `)
        .setVersion('')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map