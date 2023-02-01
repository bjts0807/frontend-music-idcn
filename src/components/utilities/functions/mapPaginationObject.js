import makeParams from "./makeParams";

const mapPaginationObject = (paginationObject) => {
    return {
        ...(paginationObject.search !== '' ? {s: paginationObject.search} : {}),
        ...(!!paginationObject['per_page'] ? {per_page: paginationObject['per_page']} : {}),
        ...(!!paginationObject['page'] ? {page: paginationObject['page']} : {}),
        ...(!!paginationObject['params'] ? makeParams(paginationObject.params) : {}),
    };
}

export default mapPaginationObject
