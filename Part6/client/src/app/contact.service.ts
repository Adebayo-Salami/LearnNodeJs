import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  // tslint:disable-next-line: deprecation
  constructor(private http: Http) {}

  // Retrive all contacts method
  getContacts() {
    console.log("it got to getContacts");
    return this.http
      .get("http://localhost:3000/api/contacts")
      .pipe(map(res => res.json()));
  }

  getContact(contactID) {
    // tslint:disable-next-line: prefer-const
    let request = {
      ID: String
    };
    request.ID = contactID;
    // tslint:disable-next-line: deprecation
    const Header = new Headers();
    Header.append("Content-Type", "application/json");
    return this.http.get(
      "http://localhost:3000/api/contact",
      // tslint:disable-next-line: deprecation
      RequestOptions.arguments({
        // tslint:disable-next-line: deprecation
        headers: Headers,
        body: request
      })
    );
  }

  // Add Contact method
  addContact(newContact) {
    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/contact", newContact, {
        // tslint:disable-next-line: object-literal-shorthand
        headers: headers
      })
      .pipe(map(response => response.json()));
  }

  // Delete Contact method
  deleteContact(contactID) {
    return this.http
      .delete("http://localhost:3000/api/contact/" + contactID)
      .pipe(map(response => response.json()));
  }
}
