import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class NQNComData {
    constructor (public http: Http){}
    public getSongList(keyword) {
		// let headers = new Headers({
		// 	'Content-Type': 'application/json',
		// 	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// });
		// let options = new RequestOptions({
		// 	headers: headers
		// });
		// let body ={"url":"http://search.chiasenhac.vn/search.php?s=tuy+am"};
		// console.log(body);
		// console.log(options);
		// keyword = keyword.replace(/\s/g, "+");
		console.log(keyword);
		if(!keyword){
			keyword = "undefined"
		}
		return this.http.get("http://gtqc2api.mcmhq.com/nqncomapi/api/music/search/"+keyword)
			.toPromise()
			.then((response:any) => {
				 console.log(JSON.stringify(response));
				 if(response.ok && response.status == 200) {
					 return JSON.parse(response._body);
				 }
				 else{
					 return [];
				 }
				 }, this.handleError);
	}
	public handleError(error) {
		console.log(error);
		return error.json().message || 'Server error, please try again later';
	}
	public download(url, type = "320") {
		// let  headers = new Headers({ 'Content-Type': 'application/json', 
		// 'Accept': 'q=0.8;application/json;q=0.9' });
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		});
		var options = new RequestOptions({ headers: headers });
		
		let body =JSON.stringify({"Url":url,"Type":type});
		console.log(body);
		console.log(options);
		console.log(headers);
		
		// keyword = keyword.replace(/\s/g, "+");
		
		return this.http.post("http://gtqc2api.mcmhq.com/nqncomapi/api/music/download/",body, options)
			.toPromise()
			.then((response:any) => { console.log(response); return JSON.parse(response._body); }, this.handleError);
	}
}
