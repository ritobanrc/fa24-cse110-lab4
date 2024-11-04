import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

   try {
       // Type casting the request body to the expected format.
       const { id, cost, name } = req.body as { id: string, cost: number, name: string };

       if (!name || !id || !cost) {
           return res.status(400).send({ error: "Missing required fields" });
       }

       await db.run('INSERT INTO expenses (id, name, cost) VALUES (?, ?, ?);', [id, name, cost]);
       res.status(201).send({ id, name, cost });

   } catch (error) {
       return res.status(400).send({ error: `Expense could not be created, + ${error}` });
   };

}


export async function deleteExpense(req: Request, res: Response, db: Database) {
    return res.status(400).send({ error: "NOT IMPLEMENTED" });
    //const id = req.params.id;

    //if (!id) {
        //return res.status(400).send({ error: "Missing id" });
    //}

    //expenses.splice(expenses.findIndex(e => e.id === id), 1);
    //res.status(200).send();
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    res.status(200).send(await db.all("SELECT * FROM expenses"));
}
