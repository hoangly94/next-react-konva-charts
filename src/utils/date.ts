import moment from "moment";

export const getWorkingDaysFrom = (amount: number, format: string = 'DD/MM/YYYY'): String[] => {
    const workingDays: String[] = [];
    const date = moment();
    while (workingDays.length <= amount) {
        date.subtract(1, 'd');
        if ([0, 6].includes(date.days()))
            continue;
        workingDays.push(date.format());
    }
    return workingDays;
}