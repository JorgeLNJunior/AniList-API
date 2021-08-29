import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationSchema: Joi.object({
        ADMIN_EMAIL: Joi.string().email().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRES: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        MAIL_SERVICE: Joi.string().valid('fake', 'sendgrid').required(),
        SENDGRID_SENDER: Joi.string().email().optional(),
        SENDGRID_API_KEY: Joi.string().optional(),
        STORAGE: Joi.string().valid('local', 'cloudinary').required(),
        CLOUDINARY_NAME: Joi.string().optional(),
        CLOUDINARY_KEY: Joi.string().optional(),
        CLOUDINARY_SECRET: Joi.string().optional(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_MIGRATE: Joi.boolean().required(),
        PORT: Joi.number().optional(),
      }),
    }),
  ],
})
export class ConfigModule {}
