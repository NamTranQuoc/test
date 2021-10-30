import axios from "axios";
import {getToken} from "../components/common/Utils";
import {host} from "../components/common/Host";

const INSTRUCTOR_API_URL = `${host}/category_course`;

export function getCategoryCourses(page, size, field, is_asc, keyword, from_date, to_date) {
  return axios({
    method: "POST",
    url: `${INSTRUCTOR_API_URL}/get_list?page=` + page + `&size=` + size,
    data: {
      sort: {
        is_asc: is_asc,
        field: field
      },
      keyword: keyword,
      from_date: from_date,
      to_date: to_date
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function addCategoryCourse(name, status, description) {
  return axios({
    method: "POST",
    url: `${INSTRUCTOR_API_URL}/add`,
    data: {
      name: name,
      status: status,
      description: description,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function updateCategoryCourse(id, name, status, description) {
  return axios({
    method: "PUT",
    url: `${INSTRUCTOR_API_URL}/update`,
    data: {
      id: id,
      name: name,
      status: status,
      description: description,
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function getAll() {
  axios({
    method: "GET",
    url: `${INSTRUCTOR_API_URL}/get_all`,
  }).then((Response) => {
    let result = [];
    for (let i = 0; i < Response.data.payload.length; i++) {
      result.push({
        value: Response.data.payload[i]._id,
        label: Response.data.payload[i].name,
      })
    }
    localStorage.setItem('category_course', JSON.stringify(result));
  });
}
