const express = require("express");
const router = express.Router();

const Contact = require("../Models/contact");

router.get("/", (req, res) => {
  res.send("Api Router is ready");
});

//method to generate unique ID
var generateID = async function() {
  var index = 1;

  await Contact.find((error, docs) => {
    if (!error) {
      if (docs != null) {
        docs.forEach(item => {
          index = item.ID + 1;
        });
      }
    } else {
      console.log(error);
    }
  });

  return index;
};

//retrive contacts from the database
router.get("/contacts", (req, res) => {
  Contact.find((error, docs) => {
    if (error) {
      res.send(
        "Error Occurred while retrieving contacts from database: " + error
      );
    } else {
      if (docs.length > 0) {
        res.json(docs);
      } else {
        res.send("No Records found");
      }
    }
  });
});

//add contact to the database
router.post("/contact", async (req, res) => {
  var contact = Object.create(Contact);
  contact.ID = await generateID();
  contact.first_name = req.body.first_name;
  contact.last_name = req.body.last_name;
  contact.phone = req.body.phone;
  //contact.save();

  let newContact = Contact({
    ID: await generateID(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });
  newContact.save((err, contact) => {
    if (err) {
      res.json({ code: "01", message: "Failed to save contact" });
    } else {
      res.json({ code: "00", message: "successful" });
    }
  });

  console.log(JSON.parse(contact));
});

//delete contact from the database
router.delete("/contact/:ID", (req, res, next) => {
  console.log(req.params.ID);

  Contact.findOne({ ID: req.params.ID }, (error, result) => {
    if (!error) {
      console.log(result);
      result.remove();
      res.json({ code: "00", message: "Successful" });
    } else {
      res.json({ code: "02", message: error.message });
    }
  });
});

module.exports = router;
