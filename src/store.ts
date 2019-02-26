export let store={
    state:{
        no:1
    },
    action:{
        add:(state,data)=>{
            state.no=data
        },
        remove:(state)=>{
            console.log(state)
        }
    }
}

export function dispatch(name,data){
    Object.keys(store.action).forEach(e=>{
        if(e===name){
            store.action[e]()
        }else{
            throw new Error('no action')
        }
        
    });
}