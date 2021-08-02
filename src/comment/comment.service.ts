import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDateColumn, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
import synthesize from '../helpers/text-to-speech/textToSpeech'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(createComment: CreateCommentDto): Promise<any>{
        return await this.commentRepository.insert(createComment);
    }
    
    async findAll(){
        return await this.commentRepository.find();
    }

    async tts(text: string){
        return await synthesize(text);
    }
}
