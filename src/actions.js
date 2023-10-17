const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllItems =()=> async(dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response = await fetch(`${apiUrl}/items`);
        const data = await response.json();

        dispatch({type:"FETCH_ITEMS",payload:data.items});

        dispatch({type:"FETCH_LOADING",payload:false});
    }
    catch(error)
    {
        console.log("Error fetcing all items",error);
        dispatch({type:"FETCH_ERROR",payload:"Error fetcing all items"});
    }
}

export const addNewItem=(newItem)=> async(dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response=await fetch(`${apiUrl}/items`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newItem)
        })
        dispatch(getAllItems());
    }
    catch(error)
    {
        console.log("Error adding new item",error)
        dispatch({type:"FETCH_ERROR",payload:"Error adding new item"});
    }
}

export const updateItem=(itemId,updatedItem)=> async(dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response = await fetch(`${apiUrl}/items/${itemId}`,{
            method:"POST",
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(updatedItem)
        });
        dispatch(getAllItems());
    }
    catch(error)
    {
        console.log("Error updating item",error);
        dispatch({type:"FETCH_ERROR",payload:"Error updating item"});
    }
}

export const deleteItem=(itemId)=> async(dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response = await fetch(`${apiUrl}/items/${itemId}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
            },
        })
        dispatch(getAllItems());
    }
    catch(error)
    {
        console.log("Failed to delete item",error);
        dispatch({type:"FETCH_ERROR",payload:"Failed to delete item"});
    }
}

// sales actions

export const getAllSales=()=>async(dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response = await fetch(`${apiUrl}/sales`);
        const data = response.json();

        dispatch({type:"FETCH_SALES",payload:data.sales});
        dispatch({type:"FETCH_LOADING", payload:false});
    }
    catch(error)
    {
        console.log("Error fetching all sales");
        dispatch({type:"FETCH_ERROR",payload:"Error fetching all sales"});
    }
}

export const addNewSale=(newSale)=> async (dispatch)=>
{
    try{
        dispatch({type:"FETCH_LOADING",payload:true});
        const response = await fetch(`${apiUrl}/sales`, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(newSale)
        });
        dispatch(getAllSales());
    }
    catch(error)
    {
        console.log("Error adding new sales transaction",error);
        dispatch({type:"FETCH_ERROR",payload:"Error adding new sales transaction"});
    }
}