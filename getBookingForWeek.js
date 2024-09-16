const bookings = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2024-09-16 13:00:00",
    endTime: "2024-09-16 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2024-09-17 14:00:00",
    endTime: "2024-09-17 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2024-09-17 16:00:00",
    endTime: "2024-09-17 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2024-09-18 13:00:00",
    endTime: "2024-09-18 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2024-09-18 16:00:00",
    endTime: "2024-09-18 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2024-09-19 09:00:00",
    endTime: "2024-09-25 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2024-09-23 09:00:00",
    endTime: "2024-09-23 19:00:00",
    title: "Thai Tech Innovation 2024",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2024-09-24 10:00:00",
    endTime: "2024-09-24 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2024-09-25 18:00:00",
    endTime: "2024-09-25 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2024-09-26 14:00:00",
    endTime: "2024-09-30 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

/**
 *
 * @param {*} roomId
 * @returns
 */
const getBookingsForRoom = (roomId) => {
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const currentWeekStart = new Date(todayStart);
  currentWeekStart.setDate(todayStart.getDate() - todayStart.getDay() + 1);
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

  const nextWeekStart = new Date(currentWeekEnd);
  nextWeekStart.setDate(currentWeekEnd.getDate() + 1);
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  currentMonthEnd.setHours(23, 59, 59, 999);

  const isBookingWithinRange = (booking, rangeStart, rangeEnd) => {
    const bookingStart = new Date(booking.startTime).getTime();
    const bookingEnd = new Date(booking.endTime).getTime();
    return (
      (bookingStart >= rangeStart.getTime() &&
        bookingStart <= rangeEnd.getTime()) ||
      (bookingEnd >= rangeStart.getTime() &&
        bookingEnd <= rangeEnd.getTime()) ||
      (bookingStart < rangeStart.getTime() && bookingEnd > rangeEnd.getTime())
    );
  };

  return {
    today: bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        isBookingWithinRange(booking, todayStart, todayEnd)
    ),
    thisWeek: bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        isBookingWithinRange(booking, currentWeekStart, currentWeekEnd)
    ),
    nextWeek: bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        isBookingWithinRange(booking, nextWeekStart, nextWeekEnd)
    ),
    wholeMonth: bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        isBookingWithinRange(booking, currentMonthStart, currentMonthEnd)
    ),
  };
};

const roomBookings = getBookingsForRoom("A101");
console.log("Today Bookings: ", roomBookings.today);
console.log("This Week Bookings: ", roomBookings.thisWeek);
console.log("Next Week Bookings: ", roomBookings.nextWeek);
console.log("Whole months Bookings: ", roomBookings.wholeMonth);
