import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../redux/actions/actions';
import Form from 'react-bootstrap/Form';

function VisibilityFilterInput(props) {
  const dispatch = useDispatch()
  const visibilityFilter = useSelector(state => state.visibilityFilter)
  return <Form.Control
    onChange={e => dispatch(setFilter(e.target.value))}
    value={visibilityFilter}
    placeholder="Search"
  />;
}

export default VisibilityFilterInput;