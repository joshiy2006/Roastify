import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/** Last-resort fallback so a render crash shows a message instead of a blank white page. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Roastify crashed:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
          <span className="text-6xl">💀</span>
          <h1 className="font-display text-holo text-2xl sm:text-4xl">WELL, THIS IS AWKWARD</h1>
          <p className="font-body max-w-md text-white/70">
            Something broke on our end. Refresh to try again — if it keeps happening, the roast was
            apparently too powerful.
          </p>
          <button
            onClick={() => {
              this.setState({ error: null })
              window.location.href = '/'
            }}
            className="font-pixel rounded-xl border-2 border-inkblack bg-acid px-4 py-2 text-xs text-inkblack"
          >
            ← back to safety
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
