interface TimeToMS {
    seconds?: number;
    minutes?: number;
    hours?: number;
    days?: number;
    weeks?: number;
}

class TimeHandler {
    constructor() {}

    public toMS(value: TimeToMS): number {
        const key: string[] = Object.keys(value);
        const time: number[] = Object.values(value);

        const commands = [ 'seconds', 'minutes', 'hours', 'days', 'weeks'];
        const executor = [
            (value: number) => value * 1000,
            (value: number) => value * 1000 * 60,
            (value: number) => value * 1000 * 60 * 60,
            (value: number) => value * 1000 * 60 * 60 * 24,
            (value: number) => value * 1000 * 60 * 60 * 24 * 7,
        ];

        return key.reduce((total: number, handle: string) => {
            try {
                const result = executor[commands.indexOf(handle)](time[key.indexOf(handle)]);
                return total + result;
            } catch (error) {
                return total;
            }
        }, 0);
    }
}

export default TimeHandler;