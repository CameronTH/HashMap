import { LinkedList } from "./linkedlist";

class HashMap {
  constructor() {
    this.arraySize = 16;
    this.array = new Array(this.arraySize).fill(null);
    this.loadFactor = 0.8;
    this.growthNumber = Math.round(this.arraySize * this.loadFactor);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.arraySize;
  }

  set(key, value) {
    if (this.length() > this.growthNumber) {
      this.resize();
    }

    let index = this.hash(key);

    if (this.array[index] === null) {
      this.array[index] = new LinkedList();
    }
    this.array[index].append(key, value);
  }

  resize() {
    this.arraySize *= 2;
    this.growthNumber = Math.round(this.arraySize * this.loadFactor);
    let currentArray = this.array;
    let newArray = new Array(this.arraySize).fill(null);
    let currentEntries = this.entries(currentArray);
    this.array = newArray;

    let test = new Array(30).fill(null);

    for (let i = 0; i < currentEntries.length; i++) {
      this.set(currentEntries[i][0], currentEntries[i][1]);
    }
  }

  get(key) {
    let index = this.hash(key);

    if (this.array[index] === null) return false;

    return this.array[index].at(this.array[index].find(key));
  }

  has(key) {
    let index = this.hash(key);

    if (this.array[index] === null) return false;

    return this.array[index].contains(key);
  }

  remove(key) {
    let index = this.hash(key);
    if (this.array[index] === null) return false;

    let indexInList = this.array[index].find(key);

    if (indexInList) {
      this.array[index].removeAt(indexInList - 1);
    }
  }

  length() {
    let counter = 0;

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let currentNode = this.array[i].head;
        while (currentNode !== null) {
          currentNode = currentNode.nextNode;
          counter++;
        }
      }
    }

    return counter;
  }

  clear() {
    this.array = new Array(16).fill(null);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let currentNode = this.array[i].head;
        while (currentNode !== null) {
          keys.push(currentNode.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let currentNode = this.array[i].head;

        while (currentNode !== null) {
          values.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] !== null) {
        let currentNode = this.array[i].head;

        while (currentNode !== null) {
          entries.push([currentNode.key, currentNode.value]);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return entries;
  }

  checkBucketsInRage(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }
}
