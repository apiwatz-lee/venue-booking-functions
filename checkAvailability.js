const bookings = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2019-09-28 13:00:00",
    endTime: "2019-09-28 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2019-09-28 14:00:00",
    endTime: "2019-09-28 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2019-09-28 16:00:00",
    endTime: "2019-09-28 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2019-09-29 13:00:00",
    endTime: "2019-09-29 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2019-09-29 16:00:00",
    endTime: "2019-09-29 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2019-09-30 09:00:00",
    endTime: "2019-10-04 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2019-09-19 09:00:00",
    endTime: "2019-09-23 19:00:00",
    title: "Thai Tech Innovation 2019",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2019-09-28 10:00:00",
    endTime: "2019-09-28 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2019-09-30 18:00:00",
    endTime: "2019-09-30 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2019-10-04 14:00:00",
    endTime: "2019-10-06 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

/**
 * Check if the date string is in the correct format
 * @param {*} dateString String - format: YYYY-MM-DD HH:mm:ss
 * @returns Boolean
 */
const isValidDateFormat = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(dateString);
};

/**
 * Check if the room id is valid
 * @param {*} roomId - String - format: A101, A102, Auditorium
 * @returns Boolean
 */
const validateRoom = (roomId) => {
  const rooms = ["A101", "A102", "Auditorium"];
  return rooms.includes(roomId);
};

/**
 * Check if the requested time range is overlapped with the existing bookings
 * @param {*} roomId String - format: A101, A102, Auditorium
 * @param {*} requestStartTime Number - time in milliseconds
 * @param {*} requestEndTime Number - time in milliseconds
 * @returns Boolean
 */
const checkIsOverLap = (roomId, requestStartTime, requestEndTime) => {
  for (const booking of bookings) {
    if (booking.roomId !== roomId) {
      continue;
    }

    const bookingStartTime = new Date(booking.startTime).getTime();
    const bookingEndTime = new Date(booking.endTime).getTime();

    // overlap condition
    if (
      requestStartTime < bookingEndTime &&
      requestEndTime > bookingStartTime
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Check room availability
 * @param {*} roomId String - format: A101, A102, Auditorium
 * @param {*} startTime String - format: YYYY-MM-DD HH:mm:ss
 * @param {*} endTime String - format: YYYY-MM-DD HH:mm:ss
 * @returns Boolean
 */
const checkAvailability = (roomId, startTime, endTime) => {
  if (!isValidDateFormat(startTime) || !isValidDateFormat(endTime)) {
    return `Invalid date format`;
  }

  const requestStartTime = new Date(startTime).getTime();
  const requestEndTime = new Date(endTime).getTime();

  if (requestStartTime >= requestEndTime) {
    return `Invalid time range`;
  }

  if (!validateRoom(roomId)) {
    return `Invalid room id`;
  }

  const isOverlap = checkIsOverLap(roomId, requestStartTime, requestEndTime);

  return isOverlap ? false : true;
};

console.log(
  checkAvailability("A101", "2019-09-28 13:00:00", "2019-09-28 16:00:00")
); // false

console.log(
  checkAvailability("A101", "2019-09-28 06:00:00", "2019-09-28 08:00:00")
); //true
