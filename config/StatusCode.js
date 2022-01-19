//2xx successful – the request was successfully received, understood, and accepted
const OK = 200
const CREATED = 201
//4xx client error – the request contains bad syntax or cannot be fulfilled
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404
const METHOD_NOT_ALLOWED = 405
//5xx server error – the server failed to fulfil an apparently valid request
const INTERNAL_SERVER_ERROR = 500

export default {
    OK,
    CREATED,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    INTERNAL_SERVER_ERROR
}