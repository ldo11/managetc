import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';
import { ResponseDto } from '../models/response-dto';
import { RtStorageService } from './rt-storage.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private logger: LogService,
    private util: UtilService,
    private rtStorage: RtStorageService) {
  }

  unAuthenAccessEvent: EventEmitter<any> = new EventEmitter();
   baseUrl = 'http://localhost:3000';

  sendGetRequest(url, reqParams) {

    const reqUrl = `${this.baseUrl}/${url}`;
    const httpClient = this.http;
    const logger = this.logger;

    return new Promise((resolve, reject) => {

      httpClient.request('GET', reqUrl, {
        headers: this.buildRequestHeader(),
        params: reqParams,
        observe: 'response'
      })
        .toPromise()
        .then((resp: any) => {
          if (resp && resp.status === 200) {
            logger.log('[http-service] http request -> ok');

            const respBody = resp.body;
            const respData = respBody.data || respBody;
            return resolve(respData);
          } else {
            logger.error(resp);
            return reject(new Error('An error occurs while sending http request.'));
          }
        })
        .catch((err) => {
          logger.error('[http-service] An error occurs while sending request to ' + url);
          logger.error(err);

          if (err && err.status === 401) {
            this.unAuthenAccessEvent.emit(false);
            return reject(new Error('Un-authentication accessing.'));
          } else {
            return reject(new Error('En unknown error occurs while sending http request.'));
          }
        });
    });

  }
  sendDeleteRequestwithParam(url, deleteParams) {
    const reqUrl = `${this.baseUrl}/${url}`;
    const httpClient = this.http;
    const logger = this.logger;

    return new Promise((resolve, reject) => {

      httpClient.request('Delete', reqUrl, {
        headers: this.buildRequestHeader(),
        params: deleteParams,
        observe: 'response'
      })
          .toPromise()
          .then((resp: any) => {
            if (resp && resp.status === 200) {
              logger.log('[http-service] http request -> ok');
              resolve(true);
            }
          })
          .catch((err) => {
            logger.error('[http-service] An error occurs while sending request to ' + url);
            logger.error(err);
            reject(new Error('En unknown error occurs while sending http request.'));
          });
    });
  }
  /**
   * {
   *     data: { },
   *     status: true,
   *     message: ''
   * }
   */
  sendPostRequest(url, postParams) {
    const reqUrl = `${this.baseUrl}/${url}`;
    const httpClient = this.http;
    const logger = this.logger;

    return new Promise((resolve, reject) => {

      httpClient.post(reqUrl, postParams, { headers: this.buildRequestHeader() })
        .toPromise()
        .then((resp: ResponseDto) => {
          if (!resp || resp.status === false) {
            this.logger.error('[http-service][send-post] Invalid response: Expect a header in response.');
            return reject(new Error('Invalid response: Expect a header in response.'));
          }

          resolve(resp.data);
        })
        .catch((err) => {

          logger.error(err);
          logger.error('[http-service][send-post] An error occurs while sending request to ' + url);
          if (!err || !err.error) {
            return reject(new Error('En unknown error occurs while sending http request.'));
          }

          const respError = err.error;
          reject(new Error(respError.message));
        });
    });

  }

  sendPutRequest(url, putParams) {
    const reqUrl = `${this.baseUrl}/${url}`;
    const httpClient = this.http;

    return new Promise((resolve, reject) => {

      httpClient.put(reqUrl, putParams, { headers: this.buildRequestHeader() })
        .toPromise()
        .then((resp: ResponseDto) => {
          if (!resp || resp.status === false) {
            this.logger.error('[http-service][send-post] Invalid response: Expect a header in response.');
            return reject(new Error('Invalid response: Expect a header in response.'));
          }

          resolve(resp.data);
        })
        .catch((err) => {
          this.logger.error(err);
          this.logger.error('[http-service][send-post] An error occurs while sending request to ' + url);

          if (!err || !err.error) {
            return reject(new Error('En unknown error occurs while sending http request.'));
          }

          const respError = err.error;
          reject(new Error(respError.message));
        });
    });

  }
  sendDeleteRequest(url) {
    const reqUrl = `${this.baseUrl}/${url}`;

    const httpClient = this.http;
    const logger = this.logger;

    return new Promise((resolve, reject) => {

      httpClient.delete(reqUrl, { headers: this.buildRequestHeader() })
        .toPromise()
        .then((resp: ResponseDto) => {
          if (!resp || resp.status === false) {
            this.logger.error('[http-service][send-post] Invalid response: Expect a header in response.');
            return reject(new Error('Invalid response: Expect a header in response.'));
          }

          resolve(resp.data);
        })
        .catch((err) => {
          logger.error(err);
          logger.error('[http-service][send-post] An error occurs while sending request to ' + url);
          if (!err || !err.error) {
            return reject(new Error('En unknown error occurs while sending http request.'));
          }
          const respError = err.error;
          reject(new Error(respError.message));
        });
    });

  }

  sendPostFormData(url, formData) {
    const reqUrl = `${this.baseUrl}/${url}`;

    const httpClient = this.http;
    const logger = this.logger;

    return new Promise((resolve, reject) => {

      httpClient.post(reqUrl, formData, { headers: this.buildRequestHeader() })
        .toPromise()
        .then((resp: ResponseDto) => {
          if (!resp || resp.status === false) {
            this.logger.error('[http-service][send-post] Invalid response: Expect a header in response.');
            return reject(new Error('Invalid response: Expect a header in response.'));
          }

          resolve(resp.data);
        })
        .catch((err) => {

          logger.error(err);
          logger.error('[http-service][send-post] An error occurs while sending request to ' + url);

          if (!err || !err.error) {
            return reject(new Error('En unknown error occurs while sending http request.'));
          }

          const respError = err.error;
          reject(new Error(respError.message));
        });
    });
  }

  buildRequestHeader() {
    return new HttpHeaders()
    .append('Accept', 'application/json')
    .append('Accept-Language', 'en')
    .append('Authorization', this.getToken());
  }

  getToken() {
    let auth = '';
    const token = this.util.getCookie(this.rtStorage.TOKEN_KEY);
    if (token) {
      auth = token.toString();
    } else {
      this.logger.warn('[http-service][post] no token.');
    }
    return auth;
  }

}
