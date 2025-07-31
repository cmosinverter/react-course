import dayjs from "dayjs";

export function getDeliveryDate(milliseconds) {
    const deliverydate = dayjs(milliseconds);
    return `${deliverydate.format('dddd')}, ${deliverydate.format('MMMM')} ${deliverydate.format('D')}`
}