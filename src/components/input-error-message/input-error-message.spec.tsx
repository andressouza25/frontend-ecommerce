import { render } from '@testing-library/react'
import InputErrorMessage from './input-error-message.component'
import Colors from '../../theme/theme.color'

describe('Input Error Message', () => {
  it('should show mesasge with error color', () => {
    const { getByText } = render(
      <InputErrorMessage>Lorem Ipsun</InputErrorMessage>
    )

    const message = getByText('Lorem Ipsun')

    expect(message).toHaveStyle({ color: Colors.error })
  })
})
