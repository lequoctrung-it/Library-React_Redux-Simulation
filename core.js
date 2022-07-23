export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    //filter falsy value consist of false, null, undefined,... except 0
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer) {
    let state = reducer()

    // Store view via Object with root is a key and component depend on that root is a value
    const roots = new Map()

    function render() {
        // variable root is an root element 
        // variable component is a function which return a html string
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }

    // return function that will be called while use this library
    return {
        // Similar to ReactDOM.render(): will render a new view 
        attach(component, root) {
            roots.set(root, component)
            render()
        },
        // Connect store vs view
        connect(selector = state => state) {
            return component => (props, ...args) => 
                // Return a component with all props and state(will be props of component)
                component(Object.assign({}, props, selector(state), ...args))
        },
        // 
        dispatch(action, ...args) {
            // Call reducer to excute the action, return a new state and assign to current state (update state) (Similar to reduce funtion)
            state = reducer(state, action, args) 
            render()
        }
    }
}