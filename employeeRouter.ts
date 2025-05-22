import express from "express";
import Employee from "./entities/employee.entity";
import datasource from "./db/data-source";
import { Entity } from "typeorm";

let count = 2

const employeeRouter = express.Router();
const employeeRepository = datasource.getRepository(Employee)

employeeRouter.get("/", async (req, res) => {
  const employees = await employeeRepository.find() //find is the orm for select *
  res.status(200).send(employees)
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]); 
  const employee = await employeeRepository.findOneBy({id : empId})
  console.log(empId)
  res.status(200).send({employee});
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);

  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  // newEmployee.createdAt = new Date();
  // newEmployee.updatedAt = new Date(); --> not necessary now because in the definition of this entity, how the values are to be added is written 

  const employee = await employeeRepository.insert(newEmployee)
  res.status(201).send(employee);
});

employeeRouter.put("/:id", async (req, res) => {
  const employee = await employeeRepository.update(req.params.id, {
                        name : req.body.name, 
                        email : req.body.email
                      })
  res.status(200).send(employee);
});

employeeRouter.patch("/:id", async (req, res) => {
  const employee = await employeeRepository.update(req.params.id, {name : req.body.name })
  res.status(200).send(employee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const employeeIdxToDelete = req.params.id
  await employeeRepository.delete(employeeIdxToDelete)
  count--;
  res.status(204).send();
});

 

export default employeeRouter;
