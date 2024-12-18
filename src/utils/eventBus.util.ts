import { ref } from 'vue'

const eventBus = ref(new Map<string, Set<Function>>())

export function on(event: string, callback: Function) {
    if (!eventBus.value.has(event)) {
        eventBus.value.set(event, new Set())
    }
    eventBus.value.get(event)?.add(callback)
}

export function emit(event: string, ...args: any[]) {
    const callbacks = eventBus.value.get(event)
    if (callbacks) {
        callbacks.forEach(callback => callback(...args))
    }
}