import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { addTodoByToolkit, deleteTodoByToolkit } from "../store";

function Home({ reduxState, addAction, deleteAction }: any) {
  const [texting, setText] = useState("");

  function change(e: { target: { value: React.SetStateAction<string> } }) {
    setText(e.target.value);
  }

  function submitEvent(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (texting) {
      addAction(texting);
    } else {
      alert("plaese input a little bit");
    }
    setText("");
  }

  return (
    <>
      <h1>To do list</h1>
      <form onSubmit={submitEvent}>
        <input type="text" value={texting} onChange={change}></input>
        <button>submit</button>
      </form>
      <ul>
        {reduxState.map((every: any) => (
          <li key={every.id}>
            {every.text}
            <button onClick={() => deleteAction(every.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
///just getting state information from redux createStore
const mapStateToProps = (state: { text: string; id: number }[]) => {
  return { reduxState: state };
};

///interaction between Home and store
///dispatch = spit {type:~~~, ~~~~~} to action
// it means in redux app and reducer, action : {type:~~~, ~~~~~}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    addAction: (texting: string) => dispatch(addTodoByToolkit(texting)),
    deleteAction: (id: number) => dispatch(deleteTodoByToolkit(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
