function hashStringToInt(s, tableSize){
    let hash = 17;
    for(let i=0; i<s.length; i++){
        hash = (13 * hash * s.charCodeAt(i)) % tableSize;
    }
    return hash;
}

class HashTable {
  constructor() {
    this.table = new Array(17);
    this.size = 0;
    this.threshold = 0.75;
  }
  loadFactor() {
    return this.size / this.table.length;
  }
  reSize() {
    let newTableSize = this.table.length * 2;
    let newTable = new Array(newTableSize);
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        for (const [key, value] of this.table[i]) {
          let idx = hashStringToInt(key, newTableSize);
          if (newTable) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        }
      }
    }
    this.table = newTable;
  }
  setItem = (key, value) => {
    let idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
    this.size++;
    if (this.loadFactor() > this.threshold) {
      reSize();
    }
  };
  getItem = (key, value) => {
    let idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      for (let i = 0; i < this.table[idx].length; i++) {
        if (this.table[idx][i][0] === key) {
          return this.table[idx][i][1];
        }
      }
    }
    return undefined;
  };
  hasItem = (key, value) => {
    let idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      for (let i = 0; i < this.table[idx].length; i++) {
        if (this.table[idx][i][0] === key) {
          return true;
        }
      }
    }
    return false;
  };
}
let hashTable = new HashTable();
hashTable.setItem("apple", 10);
hashTable.setItem("banana", 20);
hashTable.setItem("orange", 30);
hashTable.setItem("grape", 40);
console.log(hashTable.getItem("apple")); // Output: 10
console.log(hashTable.getItem("banana")); // Output: 20
console.log(hashTable.getItem("orange")); // Output: 30
console.log(hashTable.getItem("grape")); // Output: 40
console.log(hashTable.getItem("mango")); // Output: undefined
console.log(hashTable.hasItem("apple"));