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
  console.log(cardData);
  return (
    <Row className="d-flex mx-3 " style={{ marginTop: 80 }}>
      {cardData?.map((item, key) => (
        <Col key={key} md={4} sm={6} className="mb-4">
          <Card className="bg-transparent text-white border border-white">
            <Row className="d-flex flex-row p-2">
              <Col>
                <Card.Img
                  className="h-100 w-100"
                  variant="top"
                  src={item.links.mission_patch}
                  alt={item.rocket.rocket_name}
                />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title className="mt-3">
                    <h2 className="text-primary">{item.rocket.rocket_name}</h2>
                    <h5 className="text-secondary">{item.mission_name}</h5>
                    <span>
                      {moment(item.launch_date_unix * 1000).format(
                        'MM-DD-YYYY'
                      )}
                    </span>
                  </Card.Title>
                </Card.Body>
              </Col>
            </Row>
            <div>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Upcoming</Col>
                    <Col>{item.upcoming ? 'Yes' : 'No'}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row">
                    <Col>Launch Status</Col>
                    <Col
                      className={`text-${
                        item.launch_success ? 'success' : 'danger'
                      }`}
                    >
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
                <ListGroupItem className="bg-transparent text-white">
                  <Row className="d-flex flex-row p-1 bg-dark rounded">
                    <Col>
                      <Card.Link
                        className="text-decoration-none"
                        href={item.links.video_link}
                        target={'_blank'}
                      >
                        <div className="text-info">Youtube Link</div>
                      </Card.Link>
                    </Col>
                    <Col>
                      <Card.Link
                        className="text-decoration-none"
                        href={item.links.wikipedia}
                        target={'_blank'}
                      >
                        <div className="text-info ">Wikipedia Link</div>
                      </Card.Link>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Card>
        </Col>
      ))}
      <div
        className="d-flex justify-content-center text-warning h1"
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
