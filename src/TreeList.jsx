import React, { useRef } from "react";

import TreeItem from "./TreeItem";
import AddItem from "./AddItem";

const TreeList = ({ tree, funcs, item }) => {
  const dragItem = useRef();
  const dragItemNode = useRef();

  const newTree = tree.hasOwnProperty("root") ? [tree] : tree;
  // const key = Object.keys(tree)
  // console.log(newTree);

  return (
    <ul className="drag-n-drop">
      {newTree.map(child => {
        const key = Object.keys(child)[0];
        // console.log(key)
        // console.log(child)
        return <TreeItem key={key} item={child} funcs={funcs} dragItem={dragItem} dragItemNode={dragItemNode} />;
      })}
      {/* <AddItem parent={item} funcs={funcs} /> */}
    </ul>
  );
};

export default TreeList;
