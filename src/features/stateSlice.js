import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  theStateValue: null
};

export const stateSlice = createSlice({
  name: "theState",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setState: (state, action) => {
      state.theStateValue = action.payload;
    }
  }
});

export const { setState } = stateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: rootState) => state.theState.theStateValue)`
export const selectState = (state) => state.theState.theStateValue;

export const stateReducer = stateSlice.reducer