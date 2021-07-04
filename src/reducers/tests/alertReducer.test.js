import { alert } from '../alertReducer'
import { alertConstants } from '../../utils/alertConst'

describe('Alert Reducer', () => {
  test('returns the initial state when an action type is not passed', () => {
    const reducer = alert(undefined, {})
    expect(reducer).toEqual({})
  })

  test('handles SUCCESS as expected', () => {
    const reducer = alert(undefined, {
      type: alertConstants.SUCCESS,
      message: 'Successful'
    })

    expect(reducer).toEqual({
      type: 'alert-success',
      message: 'Successful'
    })
  })
})
