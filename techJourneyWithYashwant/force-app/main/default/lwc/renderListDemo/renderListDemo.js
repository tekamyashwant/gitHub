import { LightningElement } from "lwc";

export default class RenderListDemo extends LightningElement {
  superstars = [
    "Spiderman",
    "Batman",
    "Ironman",
    "Hulk",
    "Thor",
    "Captain America",
    "Wonder Woman"
  ];

  contactList = [
    {
      id: 1,
      firstname: "Marc",
      lastname: "Benioff"
    },
    {
      id: 2,
      firstname: "Steve",
      lastname: "Jobs"
    },
    {
      id: 3,
      firstname: "Tony",
      lastname: "Stark"
    },
    {
      id: 4,
      firstname: "Steve",
      lastname: "Rogers"
    }
  ];
}
