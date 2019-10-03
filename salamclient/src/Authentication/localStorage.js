export const loadState = ()=>{
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined;
    }
}

export const saveState = (state)=>{
    console.log('saveStatesaveStatesaveStatesaveStatesaveState',state);
    try{
        const serializedState = JSON.stringify(state);
        console.log('serializedStateserializedStateserializedState',serializedState);
        localStorage.setItem('state',serializedState);
    }catch(error){
        return false;
    }
}