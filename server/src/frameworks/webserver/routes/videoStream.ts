import express from 'express';
import videoStreamController from '../../../adapters/controllers/videoStreamController';
import { localFileServiceImpl } from '../../../frameworks/services/localFileService';
import { localFileServiceInterface } from '../../../app/services/localFileServiceInterface';

const videoStreamRouter = () => {
  const router = express.Router();
  const controller = videoStreamController(localFileServiceInterface, localFileServiceImpl);

  router.get('/stream-video/:videoFileId', controller.streamVideo);

  return router
};
export default videoStreamRouter;
