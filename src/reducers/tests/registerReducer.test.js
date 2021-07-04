import { registration } from '../registerReducer'
import { userConstants } from '../../utils/userConst'

describe('Register  Reducer', () => {
  test('returns the initial state when an action type is not passed', () => {
    const reducer = registration(undefined, {})
    expect(reducer).toEqual({})
  })

  test('handles LOGIN_SUCCESS as expected', () => {
    const reducer = registration(undefined, {
      type: userConstants.REGISTER_SUCCESS,
      user: {
        name: 'Joe',
        last_name: 'Doe',
        country: 'argentina',
        province: 'buenos_aires',
        mail: 'joe.doe@gmail.com',
        phone: '47468900',
        password: 'abc12345678'
      }
    })

    expect(reducer).toEqual({
      registering: true
    })
  })
})
