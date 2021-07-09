import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { FileUpload } from '../shared/shared';

@Injectable()
export class MIApiService {
    private baseUrl = 'https://localhost:44396';
    //private baseUrl = '';
    constructor(private http: HttpClient) {}

    createPerson(person) {
        return this.http.post(`${this.baseUrl}/api/persons`, person);
    }

    updatePerson(person) {
        return this.http.put(`${this.baseUrl}/api/persons/${person.id}`, person);
    }

    getPersonsByGroup(personGroupId) {
        return this.http.get(`${this.baseUrl}/api/persons?personGroupId=${personGroupId}`);
    }

    getPerson(id) {
        return this.http.get(`${this.baseUrl}/api/persons/${id}`);
    }

    getPersonBySpeakerProfileId(speakerIdentificationProfileId) {
        return this.http.get(`${this.baseUrl}/api/persons?speakerIdentificationProfileId=${speakerIdentificationProfileId}`);
    }

    getPersonGroups() {
        return this.http.get(`${this.baseUrl}/api/face/person-groups`);
    }

    createPersonGroup(personGroup) {
        return this.http.post(`${this.baseUrl}/api/face/person-groups`, personGroup);
    }

    createGroupPerson(personGroupId, person) {
        return this.http.post(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons`, person);
    }

    getPersonGroupPersonList(personGroupId) {
        return this.http.get(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons`);
    }

    getPersonFaces(personGroupId, personId) {
        return this.http.get(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons/${personId}/faces`);
    }

    addPersonFace(personGroupId, personId, imgFile) {
        let formData = new FormData();
        formData.append('uploadFile', imgFile);
        let headers = new HttpHeaders();
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Content-Type', undefined);
        headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers});
        return this.http.post(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons/${personId}/faces`, formData)//, options)
            ;
    }

    addAudioEnrollment(personId, fileToUpload: FileUpload) {
        return this.addCatalogFile(`${this.baseUrl}/api/audio/${personId}/enroll`, fileToUpload);
    }

    deletePersonFace(personGroupId, personId, faceId) {
        return this.http.delete(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons/${personId}/faces/${faceId}`);
    }

    deletePersonGroup(personGroupId) {
        return this.http.delete(`${this.baseUrl}/api/face/person-groups/${personGroupId}`);
    }

    deletePerson(personGroupId, personId) {
        return this.http.delete(`${this.baseUrl}/api/face/person-groups/${personGroupId}/persons/${personId}`);
    }

    trainPersonGroup(personGroupId) {
        return this.http.post(`${this.baseUrl}/api/face/person-groups/${personGroupId}/train`, null);//;
    }

    getGroupTrainingStatus(personGroupId) {
        return this.http.get(`${this.baseUrl}/api/face/person-groups/${personGroupId}/train`);
    }


    getAudioCatalogFiles(): Observable<Array<FileUpload>> {
        return this.http.get<Array<FileUpload>>(`${this.baseUrl}/api/audio/catalog-files`);
    }

    getAudioCatalogFile(audioId) {
        return this.http.get(`${this.baseUrl}/api/audio/catalog-files/${audioId}`);
    }

    executeAudioRecognition(audioId) {
        return this.http.post(`${this.baseUrl}/api/audio/${audioId}/recognize`, null);
    }

    getImageCatalogFiles() {
        return this.http.get(`${this.baseUrl}/api/image/catalog-files`);
    }

    getImageCatalogFile(id) {
        return this.http.get(`${this.baseUrl}/api/image/catalog-files/${id}`);
    }

    getVideoCatalogFiles() {
        return this.http.get(`${this.baseUrl}/api/video/catalog-files`);
    }

    getVideoCatalogFile(id) {
        return this.http.get(`${this.baseUrl}/api/video/catalog-files/${id}`);
    }

    deleteImageCatalogFile(id) {
        return this.http.delete(`${this.baseUrl}/api/image/catalog-files/${id}`);
    }

    deleteVideoCatalogFile(id) {
        return this.http.delete(`${this.baseUrl}/api/video/catalog-files/${id}`);
    }

    addAudioCatalogFile(fileToUpload: FileUpload) {
        return this.addCatalogFile(`${this.baseUrl}/api/audio/catalog-files`, fileToUpload);
    }

    addImageCatalogFile(fileToUpload: FileUpload) {
        return this.addCatalogFile(`${this.baseUrl}/api/image/catalog-files`, fileToUpload);
    }

    addVideoCatalogFile(fileToUpload: FileUpload) {
        return this.addCatalogFile(`${this.baseUrl}/api/video/catalog-files`, fileToUpload);
    }

    getLatestNews() {
        return this.http.get(`${this.baseUrl}/api/text/latest-news`);
    }

    analyzeText(id) {
        return this.http.post(`${this.baseUrl}/api/text/latest-news/${id}/analyze`, null);
    }

    translateText(id) {
        return this.http.get(`${this.baseUrl}/api/translate?id=${id}`);
    }

    // Image Analysis
    detectFaces(imageId) {
        return this.http.post(`${this.baseUrl}/api/face/analysis/${imageId}/detect`, null);
    }

    identifyFaces(imageId) {
        return this.http.post(`${this.baseUrl}/api/image/analysis/${imageId}/identify`, null);
    }

    identifyObjects(imageId) {
        return this.http.post(`${this.baseUrl}/api/image/object-analysis/${imageId}/identify`, null);
    }

    // Video Analysis
    analyzeVideo(videoId) {
        return this.http.post(`${this.baseUrl}/api/video/analysis/${videoId}`, null);
    }

    // Analysis Results
    saveAnalysisResults(results) {
        if (!results.id) {
            throw 'You cannot save an Analysis Result unless it has an "id" property.';
        }
        return this.http.post(`${this.baseUrl}/api/analysis-results`, results);
    }

    getAnalysisResults(id) {
        return this.http.get(`${this.baseUrl}/api/analysis-results/${id}`);
    }

    analyzeMorphicWeb(graph, eventTarget) {
        const headers = { "X-Requested-With": "XMLHttpRequest" };
        return this.http.post(`http://localhost:57052/createWeb?eventTarget=${eventTarget}`, graph, { headers });
    }


    // ***** Private Members ***** //

    private addCatalogFile(url: string, uploadFile: FileUpload) {
        let formData = new FormData();
        formData.append('uploadFile', uploadFile.file);
        formData.append('name', uploadFile.name);
        formData.append('description', uploadFile.description);
        let headers = new Headers();
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Content-Type', undefined);
        headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData)//, options)
            ;
    }

}
