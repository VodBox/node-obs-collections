interface ProxyCallbacks<T extends object> {
	set?: (
		target: T,
		prop: string | symbol,
		value: any,
		receiver: any
	) => boolean | undefined | void;
	get?: (target: T, prop: string | symbol, receiver: any) => any;

	postSet?: () => void;
}

export function createProxy<T extends object>(
	target: T,
	callbacks?: ProxyCallbacks<T>
) {
	return new Proxy(target, createProxyHandler(callbacks));
}

export function createProxyHandler<T extends object>(
	callbacks?: ProxyCallbacks<T>
): ProxyHandler<T> {
	return {
		get: (target, prop, receiver) => {
			const cbRes = callbacks?.get?.(target, prop, receiver);

			return cbRes ?? target[prop as keyof typeof target];
		},

		set: (target, prop, value, receiver) => {
			if (callbacks?.set?.(target, prop, value, receiver)) return true;

			target[prop as keyof typeof target] = value;

			callbacks?.postSet?.();

			return true;
		},
	};
}
