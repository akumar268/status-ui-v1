import { React, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import addNewCandidateStatus from "../actions/add_new_candidate_status.js";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const CandidateForm = (props) => {
  const statusRef = useRef(null);

  let statusMessage = useSelector((state) => state.adminReducer.statusMessage);
  let dispatcher = useDispatch();

  let navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const { status } = form;
    console.log(form);
    const newErrors = {};
    if (!status || status === "") newErrors.status = "Please enter the status";
    return newErrors;
  };

  const addCandidateStatus = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    console.log("formErrors", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log(form);
      setErrors({});
      let newCandidateStatus = { status: form.status };
      statusMessage = dispatcher(addNewCandidateStatus(newCandidateStatus));
    }
  };

  const cancelEdit = () => {
    navigate("/candidate-status");
  };

  return (
    <div className="container-wrap">
      <h2>Add Candidate Status Master</h2>
      <form data-testid="candidate-form">
        <div className="row">
          <div className="col-md-1">
            <div className="form-group">
              <label className="fw-bolder" htmlFor="first">
                Status
              </label>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter status"
                  onChange={(event) => setField("status", event.target.value)}
                  isInvalid={!!errors.status}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {" "}
                  {errors.candidateStatus}
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            <p className="font-weight-bold text-danger">{statusMessage}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Button
              type="submit"
              className="btn btn-primary"
              onClick={addCandidateStatus}
            >
              Submit
            </Button>
          </div>
          <div className="col-md-3">
            <Button
              type="submit"
              className="btn btn-primary"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
