import React from "react";

import TreeItem from './TreeItem';
import AddItem from './AddItem';

const TreeList = ({ tree, funcs, item }) => {
  const newTree = tree.hasOwnProperty('root') ? [tree] : tree

  return (
    <ul>
      {newTree.map(child => (
        <TreeItem item={child} funcs={funcs} />
      ))}
      <AddItem parent={item} funcs={funcs} />
    </ul>
  );
};

export default TreeList;
