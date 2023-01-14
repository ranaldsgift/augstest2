import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

export class ToastHelper {
    public static create(message: string, preset: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' | 'error' = 'success', timeout = 1000, autohide = true) {
        var t: ToastSettings = {
            message: message,
            preset: preset,
            timeout: timeout,
            autohide: autohide
        };
        toastStore.trigger(t);
    }
}