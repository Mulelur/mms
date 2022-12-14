import * as React from "react";
import Axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormRadio,
  FormSelect,
  Container,
} from "shards-react";
import { Button } from "shards-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Notify from "./notifiy";

const ModalComp = ({ open, toggle }) => {
  const [venue, setVenue] = React.useState("TURNING POINT TUTORS");
  const [date, setDate] = React.useState();
  const [isValid, setIsValid] = React.useState(false);
  const [capacity, setCapacity] = React.useState("10 - 25");

  const checkRoom = (v) => {
    switch (v) {
      case "CASA TOSCANA FUNCTION VENUE":
        if (capacity === "10 - 30") {
          return true;
        }
        return false;
      case "SILVER LAKES CLUBHOUSE":
        if (capacity === "10 - 30") {
          return false;
        }
        return true;
      default:
        if (capacity === "50 - 100") {
          return false;
        }
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      venue,
      date,
      capacity,
      name: "The Room at the cones",
    };

    if (isValid) {
      try {
        await Axios.post("https://weblinnk-api.herokuapp.com/api/bookings", {
          data,
        });

        toggle();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not avaliable");
    }
  };

  const selectVenue = (ven) => {
    switch (ven) {
      case "TURNING POINT TUTORS":
        setIsValid(checkRoom(ven));
        setVenue("TURNING POINT TUTORS");
        break;
      case "SILVER LAKES CLUBHOUSE":
        setIsValid(checkRoom(ven));
        setVenue("SILVER LAKES CLUBHOUSE");
        break;
      case "CASA TOSCANA FUNCTION VENUE":
        setIsValid(checkRoom(ven));
        setVenue("CASA TOSCANA FUNCTION VENUE");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Modal start */}
      <Modal open={open} toggle={toggle}>
        <ModalHeader>
          <p>
            Book A Room{" "}
            <span>
              {isValid ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Available
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Room Not Available
                </span>
              )}
            </span>
          </p>
        </ModalHeader>
        <ModalBody>
          <Container
            style={{
              textAlign: "start",
            }}
          >
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="#username">Date/Time</label>
                <DatePicker
                  className="form-control"
                  validate
                  selected={date}
                  onChange={(d) => setDate(d)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#venue">Capacity</label>
                <FormSelect
                  validate
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  <option value="0 - 10">0 - 10</option>
                  <option value="10 - 30">10 - 30</option>
                  <option value="30 - 50" disabled>
                    30 - 50
                  </option>
                  <option value="50 - 100">50 - 100</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <p className="mb-2">Select your venue:</p>
                <FormRadio
                  name="fruit"
                  checked={venue === "CASA TOSCANA FUNCTION VENUE"}
                  onChange={() => {
                    selectVenue("CASA TOSCANA FUNCTION VENUE");
                  }}
                >
                  CASA TOSCANA FUNCTION VENUE
                </FormRadio>
                <FormRadio
                  name="fruit"
                  checked={venue === "SILVER LAKES CLUBHOUSE"}
                  onChange={() => {
                    selectVenue("SILVER LAKES CLUBHOUSE");
                  }}
                >
                  SILVER LAKES CLUBHOUSE
                </FormRadio>
                <FormRadio
                  name="fruit"
                  checked={venue === "TURNING POINT TUTORS"}
                  onChange={() => {
                    selectVenue("TURNING POINT TUTORS");
                  }}
                >
                  TURNING POINT TUTORS
                </FormRadio>
                <span>
                  <strong>Selected venue:</strong>{" "}
                  <span>{venue || "none"}</span>
                </span>
              </FormGroup>
              <FormGroup>
                <div className="example">
                  <Button style={{ marginRight: ".5rem" }}>Book Room</Button>
                  <Button type="button" onClick={toggle} outline theme="danger">
                    Cancel
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </Container>
          {/* <Notify /> */}
        </ModalBody>
      </Modal>
      {/* Modal end  */}
    </>
  );
};

export default ModalComp;
