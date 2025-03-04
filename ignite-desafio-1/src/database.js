import fs from "node:fs/promises";

const databasePath = new URL("../database.json", import.meta.url);

export class database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  }

  edit(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const oldData = this.#database[table][rowIndex];

      if (oldData.completed_at !== undefined) {
        const newData = {
          ...oldData,
          updated_at: new Date().toString(),
          completed_at: null,
        };
        this.#database[table][rowIndex] = newData;
      } else {
        const newData = {
          ...oldData,
          updated_at: new Date().toString(),
          completed_at: new Date().toString(),
        };
        this.#database[table][rowIndex] = newData;
      }

      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      const oldData = this.#database[table][rowIndex];

      this.#database[table][rowIndex] = { ...oldData, ...data };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}
