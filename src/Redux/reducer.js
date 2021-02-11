import * as actionType from './action/action';

const initialState = [];

const util = (oldProps,newProps) =>{
  return {
    ...oldProps,
    ...newProps
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_TODO:
        return [...state,action.payload];
    case actionType.EDIT_TODO:
      const meState = [...state]; 
      const ePosition = meState.findIndex((row) => row.id == action.payload.id);
      const mResult =  util(meState,{
        [ePosition] : util(meState[ePosition],action.payload)
      })
      const fRes = [];
      for (const key in mResult) {
        fRes.push(mResult[key]);
      }
      return fRes;
    case actionType.DELETE_TODO:
        const mState = [...state]; 
        const position = mState.findIndex((row) => row.id == action.payload);
        if(position >= 0){
          mState.splice(position,1)
        }
      return mState;
    default:
      return state;
  }
};

export default reducer;
