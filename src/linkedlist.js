class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
  }

  append(key, value) {
    if (this.head === null) {
      this.prepend(key, value);
    } else {
      let previousTail = this.tail;
      this.tail = new Node(key, value);
      previousTail.nextNode = this.tail;
    }
  }

  prepend(key, value) {
    let previousHead = this.head;
    this.head = new Node(key, value, previousHead);
    if (this.tail === null) this.tail = this.head;
  }

  size() {
    let counter = 0;
    let headNode = this.head;
    while (headNode !== null) {
      counter++;
      headNode = headNode.nextNode;
    }

    return counter;
  }

  currentHead() {
    return this.head;
  }

  currentTail() {
    return this.tail;
  }

  at(index) {
    let counter = 0;
    let headNode = this.head;
    while (headNode !== null) {
      counter++;
      if (counter === index) return headNode.value;
      headNode = headNode.nextNode;
    }
  }

  pop() {
    let previousHead;
    let headNode = this.head;
    while (headNode.nextNode !== null) {
      previousHead = headNode;
      headNode = headNode.nextNode;
    }

    previousHead.nextNode = null;
  }

  contains(value) {
    if (this.find(value)) return true;
    return false;
  }

  find(key) {
    let counter = 0;
    let headNode = this.head;
    let searchValue = key;
    while (headNode !== null) {
      counter++;
      if (headNode.key === searchValue) return counter;
      headNode = headNode.nextNode;
    }
    return null;
  }

  toString() {
    let string = "";
    let headNode = this.head;
    while (headNode !== null) {
      string += ` (${headNode.value}) ->`;
      headNode = headNode.nextNode;
    }
    string += " null";

    return string;
  }

  insertAt(value, index) {
    let counter = 0;
    let previousNode = this.head;
    let headNode = this.head;
    let nextNode = this.head;
    while (counter < index) {
      counter++;
      previousNode = headNode;
      headNode = nextNode;
      nextNode = headNode.nextNode;
    }

    let insertedNode = new Node(value, nextNode);
    console.log(insertedNode);

    if (index !== 0) {
      previousNode.nextNode = insertedNode;
    } else {
      this.head = insertedNode;
    }
  }

  removeAt(index) {
    let counter = 0;
    let previousNode = this.head;
    let headNode = this.head;
    let nextNode = this.head;

    while (counter < index + 1) {
      counter++;
      previousNode = headNode;
      headNode = nextNode;
      nextNode = headNode.nextNode;
    }

    if (index !== 0) {
      if (nextNode === null) this.tail = previousNode;
      previousNode.nextNode = nextNode;
    } else if (index === 0) {
      this.head = headNode.nextNode;
    }
  }
}
