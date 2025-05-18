import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CourseDbRepositoryInterface } from '../../repositories/courseDbRepository';
import { LocalFileService } from '@src/app/services/localFileServiceInterface';

export const getRecommendedCourseByStudentU = async (
  studentId: string,
  cloudService: ReturnType<LocalFileService>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!studentId) {
    throw new AppError(
      'Please provide a valid student id ',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  const courses =
    await courseDbRepository.getRecommendedCourseByStudentInterest(studentId);
  await Promise.all(
    courses.map(async (course) => {
      course.media={thumbnailUrl:"",profileUrl:""}
      if (course.course) {
        course.media.thumbnailUrl = await cloudService.getFile(course.course.thumbnailKey);
      }
      if (course.instructor) {
        course.media.profileUrl = await cloudService.getFile(course.instructor.profileKey);
      }
    })
  );

  return courses;
};

export const getTrendingCourseU = async (
  cloudService: ReturnType<LocalFileService>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  const courses = await courseDbRepository.getTrendingCourse();
  await Promise.all(
    courses.map(async (course) => {
      if (course.thumbnail) {
        course.thumbnailUrl = await cloudService.getFile(course.thumbnail.key);
      }
      if (course.instructorProfile) {
        course.profileUrl = await cloudService.getFile(course.instructorProfile.key);
      }
    })
  );
  return courses;
};
