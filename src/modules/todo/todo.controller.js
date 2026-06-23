import { request, response, Router } from "express";
import { createTodo, deleteTodoByID, findTodoById, findManyTodoList, updateTodoById } from "./todo.service.js";

export const router = Router();

router.post('/todos', async (request, response) => {
    try {
        const newTodo = await createTodo(request.body);
        response.send(newTodo);
    } catch (error) {
        response.status(500).send(error)
    }

});

router.patch('/todos/:id', async (request, response) => {
    try {
        const updated = await updateTodoById(request.params.id, request.body);
        console.log('updated', updated);
        response.send(updated);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/todos/:id', async (request, response) => {
    try {
        const deleted = await deleteTodoByID(request.params.id);
        response.send({
            id: request.params.id,
            isDeleted: true
        });
    } catch (error) {
        response.status(500).send(error);
    }
});



router.get('/todos/:id', async (request, response) => {
    try {
        const result = await findTodoById(request.params.id);

        if (result === null) {
            response
                .status(404)
                .send({ message: `Todo not found => ${request.params.id}` });
            return;
        }

        response.send(result);
    } catch (error) {
        // response.status(500).send(error);
    }
});



router.get("/todos", async (request, response) => {
    try {
        const list = await findManyTodoList(request.query);
        response.send(list)
    } catch (error) {
        response.status(500).send(error);
    }

});



