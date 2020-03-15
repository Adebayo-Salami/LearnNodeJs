import { Component, OnInit } from "@angular/core";
import { ContactService } from "../contact.service";
import { Contact, ResponseClass } from "../models/contact";

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

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      if (this.contacts == null) {
        alert("No records found in database");
      }
    });
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

    this.contactService
      .addContact(newContact)
      .subscribe((response: ResponseClass) => {
        if (response.code === "00") {
          alert("Contact " + newContact.last_name + " added successfully");
          this.contacts.push(newContact);
          this.RefreshMethod();
        }
      });
  }

  deleteContact(contactID: string): void {
    console.log("Deleting contact with ID: " + contactID);
    // tslint:disable-next-line: prefer-const
    let contacts = this.contacts;
    this.contactService
      .deleteContact(contactID)
      .subscribe((response: ResponseClass) => {
        console.log("Data: [" + response.code + "|" + response.message + "]");
        if (response.code === "00") {
          alert("Contact Deleted Successfully");
          this.RefreshMethod();
        } else {
          alert("Failed To Delete Contact | Reason: " + response.message);
          this.RefreshMethod();
        }
      });
  }

  RefreshMethod() {
    this.contactService
      .getContacts()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(contacts => (this.contacts = contacts));
  }
}
