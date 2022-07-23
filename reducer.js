import storage from "./utils/storage.js"

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    ADD({ todos }, title) {
        if (title) {
            todos.push({
                title,
                completed: false
            })
            storage.set(todos)
        }
    },
    TOGGLE({ todos }, index) {
        const todo = todos[index] 
        todo.completed = !todo.completed
        storage.set(todos)
    },
    TOGGLEALL({ todos }, completed) {
        todos.forEach(todo => {
            todo.completed = completed
        });
        storage.set(todos)
    },
    DESTROY({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    SWITCHFILTER(state, filter) {
        state.filter = filter
    },
    CLEARCOMPLETED(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    STARTEDIT(state, index) {
        state.editIndex = index
    },
    ENDEDIT(state, title) {
        if(state.editIndex !== null) {
            if(title) {
                state.todos[state.editIndex].title = title
                storage.set(state.todos)
            } else {
                this.DESTROY(state, state.editIndex)
            }
            
            state.editIndex = null
        }
    },
    CANCELEDIT(state) {
        state.editIndex = null
    }
}

export default function reducer(state = init, action, args) {
    // If action existed in object actions then call that function in object actions and excute it
    actions[action] && actions[action](state, ...args)
    return state 
}