const initialData={
    items:[]
}
export const itemReducer =(state=initialData,action)=>{
    switch (action.type) {
case "LOAD_PRODUCTS":
    return { items:action.payload};
        default:
        return state;
}}