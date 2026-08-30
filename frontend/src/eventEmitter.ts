type Listener = (...args: unknown[]) => void

export class EventEmitter {
  private readonly listeners = new Map<string | symbol, Listener[]>()

  on(event: string | symbol, listener: Listener) {
    const current = this.listeners.get(event) ?? []
    current.push(listener)
    this.listeners.set(event, current)
    return this
  }

  addListener(event: string | symbol, listener: Listener) {
    return this.on(event, listener)
  }

  once(event: string | symbol, listener: Listener) {
    const wrapper: Listener = (...args) => {
      this.off(event, wrapper)
      listener(...args)
    }
    return this.on(event, wrapper)
  }

  off(event: string | symbol, listener: Listener) {
    const current = this.listeners.get(event)
    if (!current) return this
    const next = current.filter((candidate) => candidate !== listener)
    if (next.length) this.listeners.set(event, next)
    else this.listeners.delete(event)
    return this
  }

  removeListener(event: string | symbol, listener: Listener) {
    return this.off(event, listener)
  }

  removeAllListeners(event?: string | symbol) {
    if (event === undefined) this.listeners.clear()
    else this.listeners.delete(event)
    return this
  }

  emit(event: string | symbol, ...args: unknown[]) {
    const current = this.listeners.get(event)
    if (!current) return false
    for (const listener of [...current]) listener(...args)
    return true
  }
}

export default EventEmitter
