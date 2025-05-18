import { LocalFileServiceImpl } from "../../frameworks/services/localFileService";

export const localFileServiceInterface = (service:ReturnType<LocalFileServiceImpl>) =>{
   
    const upload = async(file:Express.Multer.File) => await service.uploadFile(file)

    const uploadAndGetUrl = async (file:Express.Multer.File) => await service.uploadAndGetUrl(file)

    const getFile = async(fileKey:string) =>await service.getFile(fileKey)

    const getVideoStream = async(fileKey:string)=>await service.getVideoStream(fileKey)

    const getCloudFrontUrl = async (fileKey:string)=> await service.getCloudFrontUrl(fileKey)

    const removeFile = async(fileKey:string)=> await service.removeFile(fileKey)

    return {
        upload,
        uploadAndGetUrl,
        getFile,
        getVideoStream,
        getCloudFrontUrl,
        removeFile
    }
}

export type LocalFileService = typeof localFileServiceInterface