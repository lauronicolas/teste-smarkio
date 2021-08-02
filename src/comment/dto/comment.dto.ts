import { IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  id: string;

  @IsString()
  comment: string;
}