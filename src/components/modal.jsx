import * as React from "react";
import Axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormInput,
  FormGroup,
  FormRadio,
  FormSelect,
  Container,
} from "shards-react";
import { Button } from "shards-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ModalComp = ({ open, toggle }) => {
  const [venue, setVenue] = React.useState("Vaal");
  const [date, setDate] = React.useState();
  const [capacity, setCapacity] = React.useState("10 - 25");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      venue,
      date,
      capacity,
      name: "The Room at the cones",
    };

    try {
      await Axios.post("https://weblinnk-api.herokuapp.com/api/bookings", {
        data,
      });

      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Modal start */}
      <Modal open={open} toggle={toggle}>
        <ModalHeader>Book A Room</ModalHeader>
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
                  validate
                  selected={date}
                  onChange={(d) => setDate(d)}
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
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <p className="mb-2">Select your venue:</p>
                <FormRadio
                  name="fruit"
                  checked={venue === "vaal"}
                  onChange={() => {
                    setVenue("vaal");
                  }}
                >
                  Vaal
                </FormRadio>
                <FormRadio
                  name="fruit"
                  checked={venue === "limpopo"}
                  onChange={() => {
                    setVenue("limpopo");
                  }}
                >
                  Limpopo
                </FormRadio>
                <FormRadio
                  name="fruit"
                  checked={venue === "jhb"}
                  onChange={() => {
                    setVenue("jhb");
                  }}
                >
                  JHB
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
        </ModalBody>
      </Modal>
      {/* Modal end  */}
    </>
  );
};

export default ModalComp;
