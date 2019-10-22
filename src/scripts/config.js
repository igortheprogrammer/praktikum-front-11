'use strict';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

const apiOptions = {
    baseUrl: serverUrl,
    headers: {
        authorization: '841e51fe-4357-4537-ba6f-c967ba1de3db',
        'Content-Type': 'application/json'
    }
};

const userId = 'b4cfeda71ad0ddb3e434b0e2';

export {
    apiOptions,
    userId
}
