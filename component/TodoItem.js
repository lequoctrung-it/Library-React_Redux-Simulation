import html from '../core.js'
import { connect } from '../store.js';

function TodoItem({ todo, index, editIndex }) {
    return html`
        <li 
            class="${todo.completed && 'completed'} 
            ${editIndex === index && 'editing'}"
        >
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    ${todo.completed && 'checked'}
                    onchange="dispatch('TOGGLE', ${index})"
                >
                <label ondblclick="dispatch('STARTEDIT', ${index})">${todo.title}</label>
                <button class="destroy" onclick="dispatch('DESTROY', ${index})"></button>
            </div>
            <input 
                class="edit" 
                value="${todo.title}"
                onkeyup="event.keyCode === 13 && dispatch('ENDEDIT', this.value.trim()) || event.keyCode === 27 && dispatch('CANCELEDIT')"
                onblur="dispatch('ENDEDIT', this.value.trim())"
            >
        </li>
    `
}

export default connect()(TodoItem)