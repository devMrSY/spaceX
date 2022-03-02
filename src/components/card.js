import {
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';
import moment from 'moment';

const FashionCard = ({ cardData, loading }) => {
  return (
    <Row className="d-flex mx-3 " style={{ marginTop: 80 }}>
      {cardData?.map((item, key) => (
        <Col key={key} md={6} sm={12} className="mb-4">
          <Card className="bg-transparent text-white border border-white" style={{display:'flex',flexDirection:'row' }}>
            <Row className="d-flex flex-row p-2" style={{width:'40%'}}>
              <Col>
                <Card.Img
                  className="h-100 w-100"
                  variant="top"
                  src={item.links.mission_patch}
                  alt={item.rocket.rocket_name}
                />
              </Col>
            </Row>
            <div style={{width:'60%'}}>
              <ListGroup className="list-group-flush">
              <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Name</Col>
                    <Col>{item.rocket.rocket_name}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Date</Col>
                    <Col>{moment(item.launch_date_unix * 1000).format(
                        'MM-DD-YYYY'
                      )}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Upcoming</Col>
                    <Col>{item.upcoming ? 'Yes' : 'No'}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Launch Status</Col>
                    <Col>
                      {item.launch_success ? 'Success' : 'Fail'}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Launch Site</Col>
                    <Col>{item.launch_site.site_name}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Card>
        </Col>
      ))}
      <div
        className="d-flex justify-content-center text-danger h2"
        style={{ marginTop: '15%' }}
      >
        {loading ? (
          <div>
            <Spinner animation="grow"></Spinner>
            <span className="ms-3">Loading...</span>
          </div>
        ) : !cardData?.length ? (
          'No Data available'
        ) : (
          ''
        )}
      </div>
    </Row>
  );
};

export default FashionCard;
