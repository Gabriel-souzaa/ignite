import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    educator: "Dani",
    duration: 10,
    name: "Nodejs",
  });

  CreateCourseService.execute({
    educator: "Diego",
    name: "React",
  });

  return response.send();
}
