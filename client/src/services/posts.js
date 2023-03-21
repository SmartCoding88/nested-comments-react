import { makeRequest } from "./makeRequest";

export function getPosts(){
    return makeRequest("/posts")
}