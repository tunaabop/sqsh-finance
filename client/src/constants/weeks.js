import { DAYS_IN_WEEK, MAX_WEEKS_IN_MONTH } from "./time"; 

export const WEEK_RANGES = Array.from(
    { length: MAX_WEEKS_IN_MONTH }, 
    (_, i) => {
        const start = i * DAYS_IN_WEEK + 1;
        const end = start + DAYS_IN_WEEK - 1;
        return { start, end};
    }
);

// This creates output like the following:
// [
//   { start: 1, end: 7 },
//   { start: 8, end: 14 },
//   { start: 15, end: 21 },
//   { start: 22, end: 28 },
//   { start: 29, end: 35 }
// ]    
