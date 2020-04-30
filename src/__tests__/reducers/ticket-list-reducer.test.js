import ticketListReducer from '../../reducers/ticket-list-reducer';

describe('ticketListReducer', () => {

  let action;

  const currentState = {
    1: {names: 'names 1',
    location: 'location 1',
    issue: 'issue 1',
    id: 1 },
    2: {names: 'names 2',
    location: 'location 2',
    issue: 'issue 2',
    id: 2 }
  }

  const ticketData = {
    names: 'names solo',
    location: 'location solo',
    issue: 'issue solo',
    timeOpen: 0,
    id: 1
  };

  test('Should return default state if no action type is recognized', ()=> {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });


  test('Should successfully add new ticket data to masterTicketList', ()=> {
    const { names, location, issue, id } = ticketData;
    action = {
      type: c.ADD_TICKET, 
      names: names,
      location: location,
      issue: issue,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: c.DELETE_TICKET,
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'names 2',
      location: 'location 2',
      issue: 'issue 2',
      id: 2 }
    });
  });

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: c.UPDATE_TIME,
      formattedWaitTime: '4 minutes',
      id: id
    };
    expect(ticketListReducer({ [id]: ticketData }, action)).toEqual({
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes'
      }
    });
  });

});