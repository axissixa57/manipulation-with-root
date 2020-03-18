import React from "react";

import TreeList from "./TreeList";
import { TreeLine } from "./styles";

const TreeItem = ({ item, funcs }) => {
  const { toggleOpen, makeParent } = funcs;

  const parent = Object.keys(item)[0]

  return (
    <li>
      <TreeLine
        // onClick={() => toggleOpen(item)}
        // onDoubleClick={() => makeParent(item)}
      >
        {item[parent].label}
        {/* {item[parent].children && <span>{"[+]"}</span>} */}
      </TreeLine>
      {item[parent].children && (
        <TreeList item={item[parent]} tree={item[parent].children} funcs={funcs} />
      )}
    </li>
  );
};

export default TreeItem;
