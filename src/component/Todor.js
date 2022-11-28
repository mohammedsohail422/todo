import { useEffect, useState } from "react";
import "./Todo.css";

//to get data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todor = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("enter the item name");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  //delete item
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  //delete all
  const removeAll = () => {
    setItems([]);
  };

  //edit item
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  //add data to localstorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h1>Todo app</h1>
          <div className="addItems">
            <input
              type="text"
              placeholder="add item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              style={{ marginBottom: "15px" }}
            />
            {toggleSubmit ? (
              <i
                className=" fa-solid fa-file-circle-plus add-btn"
                title="add item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className=" far fa-edit add-btn"
                title="add update"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItem">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h2>{elem.name}</h2>
                  <div className="todo-btn">
                    <i
                      className=" far fa-edit add-btn"
                      title="edit item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className=" far fa-trash-alt add-btn"
                      title="delete item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button className="btn " onClick={removeAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todor;
