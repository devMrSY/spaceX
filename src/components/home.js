import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setspacexList } from '../redux/Action/space';

import Header from './header';
import Card from './card';

const initialPaginationState = {
  disPlayData: [],
};

const Home = () => {
  const [data, setData] = useState(initialPaginationState);
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();
  const [Loading, spaceXlist] = useSelector((Gstate) => [
    Gstate.space?.loading,
    Gstate.space?.spaceXlist,
  ]);

  const { disPlayData } = data;
  console.log('spaceXlist', spaceXlist);

  useEffect(() => {
    dispatch(setspacexList());
  }, [dispatch]);

  useEffect(() => {
    setData({
      disPlayData: spaceXlist,
    });
  }, [spaceXlist, spaceXlist.length]);

  const handleSearch = (e) => {
    let searchvalue = e.target.value;
    setSearchKey(searchvalue);
    let arr = spaceXlist.filter((item) =>
      searchvalue
        ? item?.rocket?.rocket_name
            ?.toLowerCase()
            .includes(searchvalue.toLowerCase())
        : true
    );
    setData({
      disPlayData: arr,
    });
  };

  const handleFilter = (event) => {
    let inputValue = event.target.value;
    setSearchKey('');
    if (inputValue === 'true' || inputValue === 'false') {
      let arr = spaceXlist.filter(
        (item) => String(item.launch_success) === inputValue
      );
      console.log(arr);
      setData({
        disPlayData: arr,
      });
    } else if (inputValue === 'coming_false' || inputValue === 'coming_true') {
      console.log('dataasldlkfjakl');
      let arr = spaceXlist.filter(
        (item) => 'coming_' + String(item.upcoming) === inputValue
      );
      setData({
        disPlayData: arr,
      });
    } else if (
      inputValue === 'week' ||
      inputValue === 'month' ||
      inputValue === 'year'
    ) {
      let today = new Date(2020, 5, 18); // to check the time filter
      // let today = new Date(2020, 5, 18);
      if (inputValue === 'week') {
        today = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
      } else if (inputValue === 'month') {
        today = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
      } else {
        today = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
      }
      console.log('today', today);
      let arr = spaceXlist.filter(
        (item) => new Date(item.launch_date_unix * 1000) >= today
      );
      setData({
        disPlayData: arr,
      });
    }
  };

  return (
    <Container className="d-flex" fluid>
      <Header
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        searchKey={searchKey}
      />
      <Card cardData={disPlayData} loading={Loading} />
    </Container>
  );
};

export default Home;
