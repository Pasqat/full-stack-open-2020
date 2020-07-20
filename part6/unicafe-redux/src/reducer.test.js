import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });
  
  test('all set to zero after some incremented', () => {
    const action = {
      type: 'ZERO'
    }
    const good = {
      type: 'GOOD'
    }
    const ok = {
      type: 'OK'
    }
    const bad = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    counterReducer(state, good)
    counterReducer(state, good)
    counterReducer(state, good)
    counterReducer(state, ok)
    counterReducer(state, bad)
    counterReducer(state, bad)
    
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
});

