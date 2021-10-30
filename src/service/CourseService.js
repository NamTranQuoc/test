import axios from "axios";
import {getToken} from "../components/common/Utils";
import {host} from "../components/common/Host";

const INSTRUCTOR_API_URL = `${host}/course`;

export function getCourses(page, size, field, is_asc, category_courses, keyword, from_date, to_date) {
  return axios({
    method: "POST",
    url: `${INSTRUCTOR_API_URL}/get_list?page=` + page + `&size=` + size,
    data: {
      sort: {
        is_asc: is_asc,
        field: field
      },
      category_courses: category_courses,
      keyword: keyword,
      from_date: from_date,
      to_date: to_date
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function addCourse(name, category_course_id, tuition, number_of_shift, description) {
  return axios({
    method: "POST",
    url: `${INSTRUCTOR_API_URL}/add`,
    data: {
      name: name,
      category_course_id: category_course_id,
      tuition: tuition,
      number_of_shift: number_of_shift,
      description: description,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updateCourse(id, name, category_course_id, tuition, number_of_shift, description) {
  return axios({
    method: "PUT",
    url: `${INSTRUCTOR_API_URL}/update/`,
    data: {
      id: id,
      name: name,
      category_course_id: category_course_id,
      tuition: tuition,
      number_of_shift: number_of_shift,
      description: description,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
