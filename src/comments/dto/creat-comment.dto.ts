import { 
    IsString, 
    IsNotEmpty, 
    IsUUID, 
    MinLength, 
    MaxLength 
  } from 'class-validator';
  
  export class CreateCommentDto { 
    @IsString()
    @IsNotEmpty({ message: 'Comment text cannot be empty' })
    @MinLength(1, { message: 'Comment is too short' })
    @MaxLength(500, { message: 'Comment is too long (max 500 characters)' })
    text: string;
  
  }