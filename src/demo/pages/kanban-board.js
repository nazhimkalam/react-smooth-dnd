import React, { useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import "./table.css";

const KanbanBoard = () => {
  const [tableData, setTableData] = useState([]);

  const [itemIdDropped, setItemIdDropped] = useState(null);
  const [droppedItemIndex, setDroppedItemIndex] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const [columnIdDropped, setColumnIdDropped] = useState(null);
  const [columnIdDragged, setColumnIdDragged] = useState(null);

  const [columns, setColumns] = useState([
    {
      id: "column-1",
      name: "To Do",
      tasks: [
        { id: "task-1", content: "Task 1" },
        { id: "task-2", content: "Task 2" },
        { id: "task-3", content: "Task 3" },
        { id: "task-4", content: "Task 4" },
      ],
    },
    {
      id: "column-2",
      name: "In Progress",
      tasks: [
        { id: "task-5", content: "Task 5" },
        { id: "task-6", content: "Task 6" },
        { id: "task-7", content: "Task 7" },
      ],
    },
    {
      id: "column-3",
      name: "Review",
      tasks: [
        { id: "task-8", content: "Task 8" },
        { id: "task-9", content: "Task 9" },
      ],
    },
    {
      id: "column-4",
      name: "Testing",
      tasks: [{ id: "task-10", content: "Task 10" }],
    },
    {
      id: "column-5",
      name: "Done",
      tasks: [{ id: "task-11", content: "Task 11" }],
    },
  ]);

  const handleColumnDrop = (newColumns) => {
    setColumns(newColumns);
  };

  const onDrop = (columnId, dropResult) => {
    const { addedIndex, removedIndex, payload } = dropResult;
    const taskId = payload;

    if (removedIndex !== undefined && removedIndex !== null) {
        setColumnIdDragged(columnId);
        setDraggedItemIndex(removedIndex)
    };
    if (addedIndex !== undefined && addedIndex !== null) {
        setColumnIdDropped(columnId)
        setDroppedItemIndex(addedIndex)
    };
    if (taskId !== undefined && taskId !== null) setItemIdDropped(taskId);
  };

  useEffect(() => {
    setTableData(columns);
  }, []);

  useEffect(() => {
      if (draggedItemIndex !== null && droppedItemIndex !== null && itemIdDropped !== null) {
        const tableDataCopy = JSON.parse(JSON.stringify(tableData));
        const itemDraggedColumn = tableDataCopy.find((column) => column.id === columnIdDragged);
        const itemDroppedColumn = tableDataCopy.find((column) => column.id === columnIdDropped);

        const itemDragged = itemDraggedColumn.tasks.splice(draggedItemIndex, 1)[0];
        itemDroppedColumn.tasks.splice(droppedItemIndex, 0, itemDragged);

        setTableData(tableDataCopy);
        setDraggedItemIndex(null);
        setDroppedItemIndex(null);
        setItemIdDropped(null);
        setColumnIdDropped(null);
        setColumnIdDragged(null);
    }
  }, [draggedItemIndex, droppedItemIndex, itemIdDropped, columnIdDropped, columnIdDragged])
  

  const getChildPayload = (columnId, index) => {
    const column = columns.find((column) => column.id === columnId);
    if (column && Array.isArray(column.tasks) && index < column.tasks.length) {
      return column.tasks[index].id;
    }
    return null;
  };

  return (
    <div className="kanban-board">
      {tableData.map((column) => (
        <div className="column" key={column.id}>
          <h3 className="column-title">{column.name}</h3>
          <Container
            orientation="vertical"
            groupName="kanban-board"
            getChildPayload={(index) => getChildPayload(column.id, index)}
            onDrop={(dropResult) => onDrop(column.id, dropResult)}
          >
            {Array.isArray(column.tasks) &&
              column.tasks.map((task) => (
                <Draggable key={task.id} payload={task.id}>
                  <div className="task">{task.content}</div>
                </Draggable>
              ))}
          </Container>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
