function makeParams(params){

    let additionalParams = {};

    for(const param in params){
        if(
            params[param] !== ''
            && params[param] !== undefined
            && params[param] !== null
        ){
            additionalParams[param] = params[param]
        }
    }

    return additionalParams
}

export default makeParams
