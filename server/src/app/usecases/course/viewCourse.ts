import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { LocalFileService } from '@src/app/services/localFileServiceInterface';

export const getCourseByInstructorU = async (
  instructorId: string | undefined,
  cloudService: ReturnType<LocalFileService>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!instructorId && instructorId !== '') {
    throw new AppError(
      'Please provide an instructor id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const courses = await courseDbRepository.getCourseByInstructorId(
    instructorId
  );
  await Promise.all(
    courses.map(async (course) => {
      if (course.thumbnail) {
        course.thumbnailUrl = await cloudService.getFile(course.thumbnail.key);
      }
    })
  );

  return courses;
};
