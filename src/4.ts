type IsDoorOpen = boolean;

interface IHouse {
  door: IsDoorOpen;
}

abstract class House implements IHouse {
  public door: IsDoorOpen = false;
  protected tenants: Person[] = [];

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Людина ввійшла в будинок.");
    } else {
      console.log("Двері закриті. Людина не може ввійти.");
    }
  }

  public abstract openDoor(key: Key): void;

  public isDoorOpen(): boolean {
    return this.door;
  }

  public closeDoor(): void {
    this.door = false;
  }
}

class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature() {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey() {
    return this.key;
  }
}

class MyHouse extends House {
  public key;

  constructor(key: Key) {
    super();
    this.key = key;
  }

  openDoor(key: Key): void {
    if (this.isDoorOpen()) {
      console.log("Двері вже відчинені.");
    } else if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Двері відчинені.");
    } else {
      console.log("Ключ не підходить. Двері залишаються закритими.");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

console.log("Двері відчинені: " + house.isDoorOpen());
