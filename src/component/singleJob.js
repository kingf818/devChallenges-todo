import React from "react";
import styled from "styled-components";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const Checkbox = styled.input.attrs((props) => ({
  type: "checkbox",
}))`
  width: 20px;
  height: 20px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
`;

function SingleJob({ job, onChange, onDelete, showDelete }) {
  return (
    <div className="singleJob">
      <Checkbox id={job.id} checked={job.finish ? "checked" : false} onChange={() => onChange(job.id)} />
      <label htmlFor={job.id} className={job.finish ? "finished" : null}>
        {job.title}
      </label>
      {showDelete ? (
        <button onClick={() => onDelete(job.id)}>
          <DeleteOutlinedIcon />
        </button>
      ) : null}
    </div>
  );
}

export default SingleJob;
