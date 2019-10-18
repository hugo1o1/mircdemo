const initialState = {
   todos:[
       {title:'迁站',
    state:'todos',
    description:'mi-portable-mouse 从台湾签到香港'
    },
    {title:'迁站',
    state:'doing',
    description:'mi-portable-mouse 从台湾签到香港'
    },
    {title:'迁站',
    state:'done',
    description:'mi-portable-mouse 从台湾签到香港'
    }
   ]
  }



// reducers 中都是一些纯函数


export default function Todos(state = initialState, action={}) {

    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{ text: action.text, completed: false }])
        case 'EDIT_TODO':
            return state.map((todo, index) =>
                action.index === index ? { text: todo.text, completed: !todo.completed } :
                todo
            )
        default:
            return state
    }
}