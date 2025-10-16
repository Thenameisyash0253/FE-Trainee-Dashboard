
import React from "react";
import Widget from "./Widget";

export default function Category({ name, widgets }) {
  return (
    <div className="category">
      <h5 className="dashboard-title">{name}</h5>
      <div className="row">
        {widgets.map(widget => (
          <Widget key={widget.id} {...widget} />
        ))}
        <div className="card center last-card">
          <button className="add-widget-btn">+ Add Widget</button>
        </div>
      </div>
    </div>
  );
}
