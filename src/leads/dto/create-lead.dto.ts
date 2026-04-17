import { 
    IsEmail, 
    IsEnum, 
    IsNumber, 
    IsOptional, 
    IsString, 
    IsNotEmpty 
  } from 'class-validator';

  import { LeadStatus } from '../../generated/prisma/client';
import { Type } from 'class-transformer';
  
  export class CreateLeadDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
  
    @IsEmail({}, { message: 'Invalid email address' })
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    company?: string;
  
    @IsEnum(LeadStatus, { message: 'Invalid status value' })
    @IsOptional()
    status?: LeadStatus;
  
    @IsNumber({}, { message: 'Value must be a number' })
    @IsOptional()
    @Type(() => Number)
    value?: number;
  
    @IsString()
    @IsOptional()
    notes?: string;
  }