import { IsNumber, IsString, Max, Min } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  DB_NAME: string;
  @IsString()
  DB_USERNAME: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_HOST: string;
  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  JWT_SECRET: string;
}
