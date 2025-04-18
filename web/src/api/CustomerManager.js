import avatar1 from "/public/static/avatars/1.jpg";
import avatar2 from "/public/static/avatars/2.jpg";
import avatar3 from "/public/static/avatars/3.jpg";
import avatar4 from "/public/static/avatars/4.jpg";
import avatar5 from "/public/static/avatars/5.jpg";
import avatar6 from "/public/static/avatars/6.jpg";
import avatar7 from "/public/static/avatars/7.jpg";
import avatar8 from "/public/static/avatars/8.jpg";
import avatar9 from "/public/static/avatars/9.jpg";
import avatar10 from "/public/static/avatars/10.jpg";
import avatar11 from "/public/static/avatars/11.jpg";
import avatar12 from "/public/static/avatars/12.jpg";
import avatar13 from "/public/static/avatars/13.jpg";
import avatar14 from "/public/static/avatars/14.jpg";
import avatar15 from "/public/static/avatars/15.jpg";
import avatar16 from "/public/static/avatars/16.jpg";
import avatar17 from "/public/static/avatars/17.jpg";
import avatar18 from "/public/static/avatars/18.jpg";
import avatar19 from "/public/static/avatars/19.jpg";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
];

class CustomerManager {
  constructor() {
    this.customers = [];
    this.avatarSize = 40;
    this.nextId = 0;
  }

  generateCustomer() {
    const avatarIndex = this.nextId % avatars.length;
    const customer = {
      id: `cust${this.nextId}`,
      name: this.nextId === 0 ? `Вы` : `Клиент ${this.nextId + 1}`,
      avatar: avatars[avatarIndex],
    };
    this.nextId++;
    return customer;
  }

  addCustomers(count) {
    if (typeof count !== "number" || count < 1) {
      throw new Error("Недопустимое значение count");
    }

    for (let i = 0; i < count; i++) {
      this.customers.push(this.generateCustomer());
    }
  }

  removeCustomers(count) {
    if (typeof count !== "number" || count < 1) {
      throw new Error("Недопустимое значение count");
    }

    this.customers = this.customers.slice(0, -count);
  }

  getCustomers() {
    return this.customers;
  }
}

export default CustomerManager;
