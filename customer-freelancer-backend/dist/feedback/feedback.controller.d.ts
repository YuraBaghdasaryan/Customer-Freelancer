import { FeedbackService } from './feedback.service';
import { Response } from 'express';
import { CreateFeedbackDto } from './dto/CreateFeedbackDto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(jobId: number, createFeedbackDto: CreateFeedbackDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
