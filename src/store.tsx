import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

function addPre(text: string) {
  return { payload: { text } };
}

function deletePre(id: number) {
  return { payload: { id } };
}

//automatically, returns {type:"add", payload:} {type:"delete", payload: preAction}
export const addTodoByToolkit = createAction("add", addPre);
export const deleteTodoByToolkit = createAction("delete", deletePre);

//createReducer(initial state, {type : (state,action)=>{do something}, type : (state,action)=>{do something} })
//{type} = case, {do something} = return
//Note!! If I use createReducer, it allows me to use push(), which means that I can utitlize mutation.(add something to the preexisting array)
//take a look at the distinction between (state, action) => {state.push()}  and  (state, action) => [{text:action.payload.text, id: Math.random()} ...state]          <----- the difference whether there is a curly bracket or not.
const reducer = createReducer([], {
  [addTodoByToolkit.type]: (
    state: { text: string; id: number }[],
    action: { type: "add"; payload: { text: string } }
  ) => {
    state.push({ text: action.payload.text, id: Math.random() });
  },
  [deleteTodoByToolkit.type]: (
    state,
    action: { type: "delete"; payload: { id: number } }
  ) => state.filter((every: any) => every.id !== action.payload.id),
});

const store = createStore(reducer);

export default store;
