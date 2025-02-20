class Database {
  create(data) {
    console.log(`Creating the data ${JSON.stringify(data)}`);
    return "Data created successfully";
  }
  delete(id) {
    console.log(`Deleting the data ${id}`);
    return "Data deleted successfully";
  }
  get(id) {
    console.log(`Getting the data ${id}`);
    return { id, name: "This is database" };
  }
}
class ProxyDatabase {
  constructor(database, userRole) {
    this.database = database;
    this.userRole = userRole;
  }
  create(data) {
    if (this.userRole === "Admin") {
      return this.database.create(data);
    } else {
      console.log("Unauthorized");
      return null;
    }
  }
  delete(id) {
    if (this.userRole === "Admin") {
      return this.database.delete(id);
    } else {
      console.log("Unauthorized");
    }
  }
  get(id) {
    return this.database.get(id);
  }
}

const database = new Database();
const proxydatabase = new ProxyDatabase(database, "Admin");
console.log(proxydatabase.create({ data: "This is data" }));
console.log(proxydatabase.delete(1));
console.log(proxydatabase.get(1));
