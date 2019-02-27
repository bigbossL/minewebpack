export const storeConfig={
    state:{
        count:10,
        no:20
    },
    action:{
        add:(state,data)=>{
            console.log('hello add')
             return {...state,count:data}
        },
        hellosage:(state,data)=>{
            console.log('hello')
            return{...state,no:data}
        }
    },
    async:{
        hellosage:function*(){

        }
    }
}