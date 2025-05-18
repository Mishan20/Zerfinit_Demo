import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { LocalFileService } from '../../services/localFileServiceInterface';

export const streamVideoU = async (
  fileKey: string,
  cloudService: ReturnType<LocalFileService>
) => {
  if (!fileKey) {
    throw new AppError('File key not found', HttpStatusCodes.BAD_REQUEST);
  }
  const stream = await cloudService.getCloudFrontUrl(fileKey);
  return stream;
};
