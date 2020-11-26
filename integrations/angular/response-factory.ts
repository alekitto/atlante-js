import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import AbstractResponseFactory from '../../lib/Requester/Response/AbstractResponseFactory';
import Headers from '../../lib/Requester/Headers';
import { Injectable } from '@angular/core';
import { ResponseInterface } from '../../lib/Requester/Response/ResponseInterface';

const isError = (event: HttpEvent<string> | HttpErrorResponse): event is HttpErrorResponse => {
    return 'undefined' !== typeof (<HttpErrorResponse>event).error;
};

@Injectable()
export default
class ResponseFactory extends AbstractResponseFactory {
    fromResponse(response: HttpResponse<string> | HttpErrorResponse): ResponseInterface {
        const body = isError(response) ? response.error : response.body;
        const headers: Headers = response.headers.keys().reduce(
            (res, key) => (res.set(key, response.headers.get(key)), res), new Headers()
        );

        return this.makeResponse(body, headers, response.status);
    }
}
