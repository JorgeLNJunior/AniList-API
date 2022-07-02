import { Module } from '@nestjs/common'
import { ConfigModule as Config } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validationSchema: Joi.object({
        ADMIN_EMAIL: Joi.string().email().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        AUTH_TOKEN_SECRET: Joi.string().required(),
        AUTH_TOKEN_EXPIRES_IN: Joi.string().required(),
        EMAIL_ACTIVATION_TOKEN_SECRET: Joi.string().required(),
        EMAIL_ACTIVATION_TOKEN_EXPIRES_IN: Joi.string().required(),
        EMAIL_ACTIVATION_URL: Joi.string().required(),
        MAIL_SERVICE: Joi.string().valid('fake', 'sendgrid').required(),
        STORAGE: Joi.string().valid('local', 'cloudinary').required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().optional().allow(''),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_MIGRATE: Joi.boolean().required(),
        CLOUDINARY_NAME: Joi.string().optional().allow(''),
        CLOUDINARY_KEY: Joi.string().optional().allow(''),
        CLOUDINARY_SECRET: Joi.string().optional().allow(''),
        SENDGRID_SENDER: Joi.string().email().optional().allow(''),
        SENDGRID_API_KEY: Joi.string().optional().allow(''),
        PORT: Joi.number().optional(),
        RUN_SEEDS: Joi.boolean().optional()
      })
    })
  ]
})
export class ConfigModule {}
