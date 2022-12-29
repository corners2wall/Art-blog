import { useEffect, useMemo } from 'react';

export type AnyFn = (...args: any) => void;

export default class EventBus {
  private static storage = new Map<Symbol, AnyFn[]>();

  private static getCallbacksByType(type: Symbol) {
    return EventBus.storage.get(type) || [];
  }

  public static subscribe(type: Symbol, callback: AnyFn) {
    const callbacks = EventBus.getCallbacksByType(type);

    EventBus.storage.set(type, [...callbacks, callback]);
  }

  public static unsubscribe(type: Symbol, callback: AnyFn) {
    const callbacks = EventBus.getCallbacksByType(type).filter((cb) => cb !== callback);

    EventBus.storage.set(type, callbacks);
  }

  public static notify(type: Symbol, ...args: any[]) {
    const callbacks = EventBus.getCallbacksByType(type);

    callbacks.forEach((callback) => callback.call(null, args));
  }
}

export function useSubscribe(type: Symbol, callback: AnyFn, deps: any[] = []) {
  useEffect(() => {
    EventBus.subscribe(type, callback);

    return () => EventBus.unsubscribe(type, callback);
  }, deps);
}

export function useEmitEvent(type: Symbol, deps: any[] = [], ...args: any) {
  useMemo(() => EventBus.notify(type, ...args), deps);
}
