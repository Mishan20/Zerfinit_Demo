import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { LocalFileService } from '../../app/services/localFileServiceInterface';
import { LocalFileServiceImpl } from '../../frameworks/services/localFileService';
import { streamVideoU } from '../../app/usecases/videoStream/stream';

const videoStreamController = (
  localFileServiceInterface: LocalFileService,
  localFileServiceImpl: LocalFileServiceImpl
) => {
  const cloudService = localFileServiceInterface(localFileServiceImpl());

  const streamVideo = asyncHandler(async (req: Request, res: Response) => {
    const videoFileId = req.params.videoFileId;
    const videoUrl = await streamVideoU(videoFileId, cloudService);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved video url',
      data: videoUrl
    });
     
  });
  return {
    streamVideo
  };
};

export default videoStreamController;
