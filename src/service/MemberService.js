import axios from "axios";
import {getToken} from "../components/common/Utils";
import {host} from "../components/common/Host";

const INSTRUCTOR_API_URL = `${host}/member`;

export function getMembers(page, size, field, is_asc, types, keyword, from_date, to_date) {
  return axios({
    method: "POST",
    url: `${INSTRUCTOR_API_URL}/get_list?page=` + page + `&size=` + size,
    data: {
      sort: {
        is_asc: is_asc,
        field: field
      },
      types: types,
      keyword: keyword,
      from_date: from_date,
      to_date: to_date
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function addMember(name, email, address, gender, dob, phone_number, type, salary, certificate) {
  return axios.post(`${INSTRUCTOR_API_URL}/add`, {
    name: name,
    email: email,
    address: address,
    gender: gender,
    dob: dob,
    phone_number: phone_number,
    type: type,
    salary: salary,
    certificate: certificate,
  });
}

export function updateMember(id, name, gender, phone_number, address, dob, salary, certificate) {
  return axios({
    method: "PUT",
    url: `${INSTRUCTOR_API_URL}/update/`,
    data: {
      id: id,
      name: name,
      gender: gender,
      phone_number: phone_number,
      address: address,
      dob: dob,
      salary: salary,
      certificate: {
        type: certificate.type,
        score: Number(certificate.score),
        code: certificate.code,
      },
    },
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
