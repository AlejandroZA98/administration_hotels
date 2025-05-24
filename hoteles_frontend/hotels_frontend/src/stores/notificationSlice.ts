import type { StateCreator } from "zustand";

type Notification={
    show: boolean;
    text: string;
    error: boolean;
}
export type NotificationSliceType = {
    notification: Notification;
    showNotification: (payload:Pick<Notification,'text'|'error'>) => void;
    hideNotification: () => void;
}

export const createNotificationSlice: StateCreator<NotificationSliceType> = (set) => ({
    notification: {
        show: false,
        text: '',
        error: false
    },
    showNotification: (payload) => {
        // console.log("Notification", payload)
        set({
            notification: {
                show: true,
                text: payload.text,
                error: payload.error
            }
        })
    },
    hideNotification: () => {
        set({
            notification: {
                show: false,
                text: '',
                error: false
            }
        })
    }
})