import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración sea global
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGO_DB_USER')}:${configService.get<string>('MONGO_DB_KEY')}@${configService.get<string>('MONGO_DB_CLUSTER')}.k14y9.mongodb.net/${configService.get<string>('DATA_BASE')}`
      }),
    }),
    ProductModule,
    OrderModule,
    UserModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
