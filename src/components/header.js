import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Navbar,
} from 'react-bootstrap';

const Header = ({ searchKey, handleSearch, handleFilter, filterValue }) => {
  const { time, status, upcoming } = filterValue;

  return (
    <Navbar
      className="rounded border border-light mx-4 mt-1 zindex-sticky fixed-top"
      variant="dark"
      bg="dark"
    >
      <Row className="d-flex flex-row mx-2 justify-content-between w-100">
        <Col md={4} sm={12} className="me-2 mb-2">
          <InputGroup className="">
            <span className="text-white m-auto me-2">Search</span>
            <FormControl
              placeholder="Rocket Name"
              value={searchKey}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col
          md={7}
          sm={12}
          className="d-flex flex-row mb-2"
          onChange={handleFilter}
        >
          <span className="text-white m-auto mx-2">Filter</span>
          <Form.Select
            aria-label="Default select example"
            className="me-2"
            onChange={handleFilter}
            value={time}
            name="time"
          >
            <option hidden>Date</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </Form.Select>

          <Form.Select
            aria-label="Default select example                   "
            className="me-2"
            onChange={handleFilter}
            value={status}
            name="status"
          >
            <option hidden>Status</option>
            <option value="true">Success</option>
            <option value="false">Fail</option>
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            onChange={handleFilter}
            value={upcoming}
            name="upcoming"
          >
            <option hidden>Upcoming</option>
            <option value="coming_true">Yes</option>
            <option value="coming_false"> No</option>
          </Form.Select>
        </Col>
      </Row>
    </Navbar>
  );
};

export default Header;
