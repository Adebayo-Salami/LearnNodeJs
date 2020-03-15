import { Component, OnInit } from "@angular/core";
import { ContactService } from "../contact.service";
import { Contact } from "../models/contact";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  // tslint:disable-next-line: variable-name
  first_name: string;
  // tslint:disable-next-line: variable-name
  last_name: string;
  phone: string;

  constructor(private contactService: ContactService) {
    console.log("It got here");
  }

  addContact(): void {
    console.log("Entered Add Contact Method");
    // tslint:disable-next-line: prefer-const
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      ID: ""
    };

    console.log(newContact);

    this.contactService.addContact(newContact).subscribe(data => {
      console.log("Added new contact observer: " + data);
    });
    this.contacts.push(newContact);
  }

  deleteContact(contactID: string): void {
    console.log("Deleting contact with ID: " + contactID);
    // tslint:disable-next-line: prefer-const
    let contacts = this.contacts;
    this.contactService.deleteContact(contactID).subscribe((data: string) => {
      console.log("Data: [" + data + "]");
    });
  }

  ngOnInit(): void {
    this.contactService
      .getContacts()
      .subscribe(contacts => (this.contacts = contacts));
  }
}
