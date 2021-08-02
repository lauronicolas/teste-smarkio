import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './interface/comment.interface';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    async create(@Body() createComment: CreateCommentDto, @Res() resp: Response): Promise<Response> {
        if (!createComment || createComment.comment === '') {
            return resp.status(400).json({
                message: "Bad Request"
            })    
        }
        await this.commentService.create(createComment);
        return resp.status(201).send();
    }

    @Get()
    async findAll(@Res() resp: Response): Promise<Response<Comment[]>>{
        const comments = await this.commentService.findAll();
        return resp.status(200).json(comments)
    }

    @Post('play')
    async createAudio(@Body() body, @Res() resp: Response): Promise<Response<object>>{
        if (!body || body.comment === '') {
            return resp.status(400).json({
                message: "Bad Request"
            })    
        }
        
        const audioPath = await this.commentService.tts(body.comment);
        return resp.status(201).json({
            path: audioPath
        });
    }

}
