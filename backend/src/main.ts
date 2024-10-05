import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger, format, transports } from 'winston';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // const logger = createLogger({
    //     level: 'info',
    //     format: format.combine(
    //         format.timestamp(),
    //         format.json()
    //     ),
    //     transports: [
    //         new transports.Console(),
    //         new transports.File({ filename: 'error.log', level: 'error' }),
    //         new transports.File({ filename: 'combined.log' })
    //     ],
    // });

    // app.useLogger(logger);

    app.enableCors(); // Enable CORS for frontend access
    await app.listen(3001); // NestJS runs on port 3001
}
bootstrap();