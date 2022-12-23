import { React, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import updateCandidateStatusAction from '../actions/update_candidate_status_action';

const UpdateCandidateStatusComponent = (props) => {

    const { statusId } = useParams();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const nav = useNavigate();
    let dispatcher = useDispatch();

    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
        if (!!errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    }

    const validateForm = () => {
        const { candidateStatus } = form;
        console.log(form);
        const newErrors = {};
        if (!candidateStatus || candidateStatus === '')
            newErrors.candidateStatus = 'Please enter the status name';
        return newErrors;
    }

    const updateCandidateStatus = (event) => {
        event.preventDefault();
        const formErrors = validateForm();
        console.log('formErrors: ', formErrors);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            let updatedCandidateStatus = {
                "status": form.candidateStatus
            };
            dispatcher(updateCandidateStatusAction({ updatedCandidateStatus, statusId }));
        }
    }

    const backToPreviousPage = () => {
        nav('/candidate-status/');
    };

    return (
        <div className="container-wrap">
            <h2 className="mb-4">Edit Candidate Status Master</h2>
            <form data-testid='update-candidate-form'>

                <div className="row">
                    <div className="col-md-2">
                        <div className="form-group">
                            <label className="fw-bolder" htmlFor="first">Status ID</label>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <InputGroup>
                                <Form.Control
                                    type='text'
                                    value={statusId}
                                    disabled
                                />
                            </InputGroup>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <div className="form-group">
                            <label className="fw-bolder" htmlFor="first">Status</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="for example: 'Screening'"
                                    onChange={(event) => setField('candidateStatus', event.target.value)}
                                    isInvalid={!!errors.candidateStatus}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {errors.candidateStatus}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary" onClick={updateCandidateStatus}>Update</button>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary" onClick={backToPreviousPage}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateCandidateStatusComponent;