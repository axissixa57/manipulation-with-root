import React, { useState } from "react";

import TreeList from "./TreeList";

const baseTree = require("./data.json");

const App = () => {
  const [tree, setTree] = useState(baseTree);

  const toggleOpen = item => {
    const newTree = [...tree];

    item.isOpen = !item.isOpen;

    setTree(newTree);
  };

  const makeParent = item => {
    const newTree = [...tree];

    item.children = [];

    setTree(newTree);
  };

  const addChild = parent => {
    const newTree = [...tree];

    if (!parent) {
      newTree.push({ name: "New Item" });
    } else {
      parent.children.push({ name: "New Item" });
    }

    setTree(newTree);
  };

  const funcs = {
    toggleOpen,
    addChild,
    makeParent,
    setTree,
  };

  return (
    <div className="App">
      <h1>Manipulations with a tree</h1>
      <TreeList tree={tree} funcs={funcs} />
    </div>
  );
};

export default App;
