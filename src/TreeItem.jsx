import React from "react";
import omitDeep from "omit-deep-lodash";

import { TreeLine } from "./styles";
import TreeList from "./TreeList";
import { findNested } from "./helpers";

const TreeItem = ({ item, funcs, dragItem, dragItemNode }) => {
  const { toggleOpen, makeParent, setTree } = funcs;

  const parent = Object.keys(item)[0];

  const handletDragStart = (e, item) => {
    console.log("Starting to drag", item);

    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;
  };

  const handleDragEnter = (e, targetItem) => {
    console.log("Entering a drag target", targetItem);

    if (dragItemNode.current !== e.target && dragItemNode.current) {
      console.log("Target is NOT the same as dragged item");

      const textElementWillBeReplaced = e.target.innerText; 
      const textElementCurrent = dragItemNode.current.innerText; 

      console.log(textElementWillBeReplaced); // кот. надо заменить
      console.log(textElementCurrent); // кот. удерживается для перемещения

      // setTree(oldTree => {
      //   const { res, obj } = findNested(oldTree, textElement);

      //   // const deleted = omitDeep(oldTree, property);

      //   console.log(res);
      //   console.log(JSON.stringify(obj, null, 4));

      //   return Object.assign({}, obj);
      // });

      // setList(oldList => {
      //   let newList = JSON.parse(JSON.stringify(oldList));

      //   newList[targetItem.grpI].items.splice(
      //     targetItem.itemI,
      //     0,
      //     newList[dragItem.current.grpI].items.splice(
      //       dragItem.current.itemI,
      //       1
      //     )[0]
      //   );

      //   dragItem.current = targetItem;

      //   return newList;
      // });
    }
  };

  const handleDragEnd = e => {
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  return (
    <li className="dnd-item">
      <TreeLine
        draggable
        onDragStart={e => handletDragStart(e, parent)}
        onDragEnter={e => handleDragEnter(e, parent)}
        // onDragEnter={e => console.log(e.target)}
        // onClick={() => toggleOpen(item)}
        // onDoubleClick={() => makeParent(item)}
      >
        {item[parent].label}
        {/* {item[parent].children && <span>{"[+]"}</span>} */}
      </TreeLine>
      {item[parent].children && (
        <TreeList
          item={item[parent]}
          tree={item[parent].children}
          funcs={funcs}
        />
      )}
    </li>
  );
};

export default TreeItem;
