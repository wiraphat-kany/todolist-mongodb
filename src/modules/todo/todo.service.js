import { TodoModel } from "../../models/todo.model.js";

export function createTodo(todoData) {
    if (!todoData.title) {
        throw new Error('title field is required')
    }
    const newTodo = new TodoModel(todoData);
    return newTodo.save();
}

export function updateTodoById(id, todoData) {
    return TodoModel.findByIdAndUpdate(id, todoData);
}


export function deleteTodoByID(id) {
    return TodoModel.findByIdAndDelete(id);
}

export function findTodoById(id) {
    return TodoModel.findById(id);
}

export function findManyTodoList(query) {

    let baseQuery = {};
    if (query.search) {
        baseQuery = {
            ...baseQuery, ... {
                title: {
                    $regex: new RegExp(query.search, 'i'),
                },
            }
        };
    }
    if (query.status) {
        baseQuery = {
            ...baseQuery,
            status: query.status,
        }
    };

    if (query.assignee) {
        baseQuery = {
            ...baseQuery,
            assignee: query.assignee
        };
    }

    if (query.subscriberCounter && query.condition === 'or') {
        baseQuery = {
            $or: Object.entries(baseQuery).map(([key, value]) => ({
                [key]: value,
            }))
        };
    }

    if (query.subscriberCounter && query.condition && query.condition !== 'or') {
        baseQuery = {
            ...baseQuery,
            subscriberCounter: query.subscriberCounter,
        };
    }


    const skip = Number(query.skip) || 0;
    const limit = Number(query.limit) || 10;

    return TodoModel.find(baseQuery)
        .skip(skip)
        .limit(limit);
}

