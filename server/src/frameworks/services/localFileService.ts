import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import util from 'util';

const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const localFileServiceImpl = () => {
  const uploadFile = async (file: Express.Multer.File) => {
    const key = randomFileName();
    const extension = path.extname(file.originalname);
    const fileName = `${key}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.promises.writeFile(filePath, file.buffer);

    return {
      name: file.originalname,
      key: fileName,
    };
  };

  const uploadAndGetUrl = async (file: Express.Multer.File) => {
    const uploaded = await uploadFile(file);

    // Example: build a URL for accessing files locally (customize as needed)
    const url = `/uploads/${uploaded.key}`;

    return {
      ...uploaded,
      url,
    };
  };

  const getFile = async (fileKey: string) => {
    const filePath = path.join(uploadDir, fileKey);
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }
    return filePath;
  };

  const getVideoStream = async (fileKey: string): Promise<NodeJS.ReadableStream> => {
    const filePath = await getFile(fileKey);
    return fs.createReadStream(filePath);
  };

  const getCloudFrontUrl = async (fileKey: string) => {
    // No CloudFront in local setup, return local path or a placeholder
    return `/uploads/${fileKey}`;
  };

  const removeFile = async (fileKey: string) => {
    const filePath = path.join(uploadDir, fileKey);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  };

  return {
    uploadFile,
    uploadAndGetUrl,
    getFile,
    getVideoStream,
    getCloudFrontUrl,
    removeFile,
  };
};

export type LocalFileServiceImpl = typeof localFileServiceImpl;
