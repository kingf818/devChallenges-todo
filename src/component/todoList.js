import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SingleJob from "./singleJob";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

//styled component
const Button = styled.button`
  background: #6da6f2;
  color: #fff;
  font-size: 1em;
  padding: 15px;
  border: none;
  border-radius: 10px;
  min-width: 100px;
  cursor: pointer;
`;

const DelButton = styled(Button)`
  background: #f18989;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #ccc;
  display: block;
  padding: 15px;
  flex-grow: 1;
  height: 20px;
`;

function TodoList({ filter }) {
  const [jobList, setJobList] = useState([]);
  const [jobDetail, setJobDetail] = useState("");
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    //load localstorage
    const list = JSON.parse(localStorage.getItem("jobList"));

    if (jobList.length === 0 && list !== null) {
      //load job list
      setJobList(list);
    } else {
      let fList = [];
      if (filter === "active") {
        fList = jobList.filter((job) => job.finish === false);
      } else if (filter === "completed") {
        fList = jobList.filter((job) => job.finish === true);
      } else {
        fList = [...jobList];
      }

      setFilterList(fList);
    }
  }, [jobList, filter]);

  const handleSubmit = (e) => {
    //add job to list
    e.preventDefault();

    if (jobDetail !== "") {
      const newJobList = [...jobList];
      const newid = jobList.length > 0 ? jobList[0].id + 1 : 1;
      newJobList.unshift({ id: newid, title: jobDetail, finish: false });

      setJobList(newJobList);
      setJobDetail("");

      localStorage.setItem("jobList", JSON.stringify(newJobList));
    } else {
      alert("Please input job detail.");
    }
  };

  const handleInput = (e) => {
    setJobDetail(e.currentTarget.value);
  };

  const handleCheck = (id) => {
    const newJobList = [...jobList];
    const jobIndex = jobList.findIndex((job) => job.id === id);
    newJobList[jobIndex].finish = !newJobList[jobIndex].finish;

    setJobList(newJobList);
    localStorage.setItem("jobList", JSON.stringify(newJobList));
  };

  const handleDelete = (id) => {
    const newJobList = jobList.filter((job) => job.id !== id);

    setJobList(newJobList);
    localStorage.setItem("jobList", JSON.stringify(newJobList));
  };

  const handleDeleteAll = () => {
    const newJobList = jobList.filter((job) => job.finish === false);

    setJobList(newJobList);
    localStorage.setItem("jobList", JSON.stringify(newJobList));
  };

  return (
    <section className="todolist">
      <h1>#todo</h1>

      <nav>
        <ul>
          <li className={filter === "all" ? "active" : null}>
            <NavLink to="/">All</NavLink>
          </li>
          <li className={filter === "active" ? "active" : null}>
            <NavLink to="/active">Active</NavLink>
          </li>
          <li className={filter === "completed" ? "active" : null}>
            <NavLink to="/completed">Completed</NavLink>
          </li>
        </ul>
      </nav>

      {filter !== "completed" ? (
        <form onSubmit={handleSubmit}>
          <Input type="text" placeholder="add detail" value={jobDetail} onChange={handleInput}></Input>
          <Button>Add</Button>
        </form>
      ) : null}
      <div className="result">
        {filterList.map((job) => (
          <SingleJob key={job.id} job={job} onChange={handleCheck} onDelete={handleDelete} showDelete={filter === "completed" ? true : false} />
        ))}
      </div>
      {filter === "completed" && filterList.length > 0 ? (
        <div className="deleteRow">
          <DelButton onClick={handleDeleteAll}>
            <DeleteOutlinedIcon />
            delete all
          </DelButton>
        </div>
      ) : null}
    </section>
  );
}

export default TodoList;
