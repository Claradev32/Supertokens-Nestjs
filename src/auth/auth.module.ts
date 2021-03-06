
import {
    MiddlewareConsumer,
    Module,
    NestModule,
    DynamicModule,
} from '@nestjs/common';

import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { AuthService } from './service/auth.service';


@Module({
    providers: [AuthService],
    exports: [],
    controllers: [],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
    }

    static forRoot({ connectionURI, apiKey, appInfo }: AuthModuleConfig): DynamicModule {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                    },
                    provide: ConfigInjectionToken,
                },
            ],
            exports: [],
            imports: [],
            module: AuthModule,
        };
    }
}