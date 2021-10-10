import { render } from "@testing-library/react"
import Message from "../Message"

describe('message test', () => {
    test('render message', () => {
        const { asFragment } = render(<Message />)
        expect(asFragment()).toMatchSnapshot()
    })
    test('render message with props', () => {
        const props = {txt: 'hello world!',time: '20:00', firstEl: true,  isOutl: true}
        const { asFragment } = render(<Message {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
})