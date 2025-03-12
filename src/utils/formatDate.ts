export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
  const formattedDate = new Date(date).toLocaleDateString("en-US", options)

  // Split the formatted date into parts and rearrange them
  const [month, day, year] = formattedDate.split(" ")

  return `${parseInt(day)} ${month} ${year}`
}

export function formatDateTimeline(date: string) {
  // Parse the input date string
  let dateParts = date.split("/")
  let day = parseInt(dateParts[0])
  let month = parseInt(dateParts[1]) - 1 // Month is zero-based in JavaScript
  let year = parseInt(dateParts[2])

  // Create a Date object
  let datetmp = new Date(year, month, day)

  // Get the month name
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  let monthName = monthNames[datetmp.getMonth()]

  // Format the date
  let formattedDate = monthName + " " + day + ", " + year

  return formattedDate
}
