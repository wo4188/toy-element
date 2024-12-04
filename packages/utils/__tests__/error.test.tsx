import { describe, expect, it, vi } from 'vitest'
import { echoWarn, throwError } from '../error'

describe('error', () => {
  it('throwError should work', () => {
    expect(() => {
      throwError('scope', 'message')
    }).toThrowError('[scope] message')
  })
  it('echoWarn should work', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => vi.fn)
    echoWarn('scope', 'message')
    echoWarn(new SyntaxError('custom error'))
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [ToyViewError: [scope] message],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `)
  })
})

