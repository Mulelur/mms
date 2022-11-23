import * as React from "react";
import {
  Container,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
} from "shards-react";
import moment from "moment";
import Axios from "axios";
import { Button } from "shards-react";
import styled from "styled-components";
import ModalComp from "../components/modal";

const DashBoard = () => {
  const [open, setOpen] = React.useState(false);
  const [booking, setBooking] = React.useState([]);

  const handelClick = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  const toggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    try {
      Axios.get("https://weblinnk-api.herokuapp.com/api/bookings").then(
        (res) => {
          const { data } = res.data;

          setBooking(data);

          console.log(data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [open]);
  return (
    <>
      <Navbar type="dark" theme="secondary" expand="md">
        <Button onClick={handelClick} outline>
          Log out
        </Button>
      </Navbar>
      <ContainerMain>
        <div className="App">
          <Container>
            <h3>Admin site</h3>
            <p>Bookings</p>
          </Container>
          <Container>
            <Grid>
              {booking.length > 0 ? (
                booking.map((room) => {
                  return (
                    <>
                      <Col>
                        <Card>
                          <CardImg
                            top
                            src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                          />
                          <CardTitle>{room.attributes.name}</CardTitle>
                          <CardSubtitle>
                            {room.attributes.capacity} people
                          </CardSubtitle>
                          <CardBody>
                            <p>
                              Venue: {room.attributes.venue} Date:{" "}
                              {moment(room.attributes.date).calendar()}
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </>
                  );
                })
              ) : (
                <>
                  <p>No Bookings</p>
                </>
              )}
            </Grid>
          </Container>
          <Container
            // {/* Booking Buttons Start  */}
            style={{
              padding: "4.5rem",
            }}
          >
            <Button onClick={toggle} theme="secondary">
              Book a Room
            </Button>
          </Container>
          {/* Booking Buttons end  */}
          <Container>Automatic room management system</Container>
        </div>
        {/* Modal start */}
        <ModalComp toggle={toggle} open={open} />
        {/* Modal end  */}
      </ContainerMain>
    </>
  );
};

const Navbar = styled.div`
  padding: 0.9rem 3rem;
  display: flex;
  justify-content: end;
`;

const ContainerMain = styled.div`
  margin: 0;
  padding: 5rem;

  @media only screen and (max-width: 768px) {
    padding: 0.9rem;
  }
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));

  gap: 1.5rem;
`;
export default DashBoard;
