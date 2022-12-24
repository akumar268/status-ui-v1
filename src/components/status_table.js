import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import getStatusesByPagination from "../actions/get_statuses_by_page";
import { useNavigate, useParams } from "react-router-dom";
import addNewCandidateStatus from "../actions/add_new_candidate_status";
import updateCandidateStatusAction from "../actions/update_candidate_status_action";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
//import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import searchStatusesByPagination from "../actions/search_statuses_by_page";

const StatusTableFunc = (props) => {
  let dispatcher = useDispatch();
  let navigate = useNavigate();
  let statuses = useSelector((state) => state.adminReducer.statuses);
  let totalNoOfStatuses = useSelector(
    (state) => state.adminReducer.totalNoOfStatuses
  );
  console.log("totalNoOfStatuses = ", totalNoOfStatuses);
  //let activePage = useSelector((state)=>state.activePage);
  let activePage = localStorage.getItem("activePage");
  if (!activePage || activePage === "") activePage = 1;
  useEffect(() => {
    let pageDetails = { pageNo: 0, pageSize: 3 };
    return () => dispatcher(getStatusesByPagination(pageDetails));
  }, []);

  const statusRef = useRef(null);
  //const id=statusId;
  const editStatus = async (statusId) => {
    //const response = await dispatcher(updateCandidateStatusAction(statusId));
    navigate("/candidate-status/edit/" + statusId);
  };

  const addStatus = async (statusId) => {
    //const response = await dispatcher(addNewCandidateStatus());
    navigate("/candidate-status/add");
  };

  const isActive = async (statusId) => {
    //dispatcher(softDeleteAction());
  };

  const returnHome = async () => {
    navigate("/candidate-status");
  };

  const deleteStatus = async (statusId) => {};

  const getNewPage = (number) => {
    console.log(number);
    let pageDetails = { pageNo: number, pageSize: 3 };
    console.log(pageDetails);
    dispatcher(getStatusesByPagination(pageDetails));
  };

  const getSearchPage = (number) => {
    let pageDetails = {
      pageNo: number,
      pageSize: 3,
      status: statusRef.current.value,
    };
    console.log(pageDetails);
    dispatcher(searchStatusesByPagination(pageDetails));
  };

  if (statuses === undefined) statuses = [];
  console.log("Table statuses: ", statuses);
  let statusData = statuses.map(function (status, index) {
    return (
      <tr key={status.statusId}>
        
        <td>{status.statusId}</td>
        <td>{status.status}</td>
        <td>
          <ButtonGroup aria-label="Edit and Delete">
            <Button
              as="input"
              type="button"
              onClick={editStatus.bind(this, status.statusId)}
              value="Edit"
            />
            <Button
              as="input"
              type="button"
              onClick={deleteStatus.bind(this, status.statusId)}
              value="Delete"
            />
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  console.log("activePage = ", activePage);
  let noOfPages = totalNoOfStatuses / 3;
  if (totalNoOfStatuses % 3 != 0) {
    noOfPages = noOfPages;
  }

  if (activePage > noOfPages) {
    //noOfPages = noOfPages - 1;
    activePage = activePage - 2;
    console.log("New noOfPages ", noOfPages);
    console.log("New activePage ", activePage);
    console.log("New totalNoOfStatuses ", totalNoOfStatuses);
  }

  let items = [];
  for (let number = 0; number <= noOfPages; number++) {
    console.log("items.push() called");
    items.push(
      <Pagination.Item
        key={number}
        active={number == activePage}
        onClick={() => getNewPage(number)}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  console.log("items - ", items);
  return (
    <form>
      <div>
        <h2 align="left">Candidate Status Master</h2>
        <p align="right">
          <button
            type="submit"
            class="btn btn-primary float-end"
            onClick={() => addStatus()}
            value="+ Add Candidate Status"
          >
            + Add Status
          </button>
        </p>
        <h6 align="left">
          <div class="row">
            <div class="col-md-1">
              <div class="form-group">
                <label class="fw-bolder" for="first">
                  Status Id
                </label>
              </div>
            </div>

            <div class="col-md-5">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Status Id"
                  id="statusId"
                />
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-1">
              <div class="form-group">
                <label class="fw-bolder" for="first">
                  Status
                </label>
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Role Name"
                  id="roleName"
                  ref={statusRef}
                />
              </div>
            </div>
          </div>
          <br />
          <Button
            as="input"
            type="button"
            onClick={getSearchPage}
            value="      Search      "
          />
          <br></br>
          <br></br>
          <Button
            as="input"
            type="submit"
            onClick={returnHome}
            value="      Reset      "
          />
          <br />
          <br />
        </h6>

        <div class="row mt-5">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status Id - Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{statusData}</tbody>
          </table>

          <div>
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StatusTableFunc;
