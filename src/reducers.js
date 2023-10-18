const initialState = {
    items:[],
    sales:[],
    loading:false,
    error:""
}

const inventoryReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case "FETCH_LOADING":
            return {...state,loading:action.payload}

        case "FETCH_ITEMS":
            return {...state,items:action.payload}

        case "FETCH_SALES":
            return {...state,sales:action.payload}
           
        case "FETCH_ERROR":
            return {...state,error:action.payload}
         
        default:
            return state;    
    }
}

export default inventoryReducer;