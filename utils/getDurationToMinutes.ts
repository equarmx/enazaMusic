export default function getDurationToMinutes(
  duration: number | string
): string {
  let minutes = Math.floor(parseInt(duration) / 60)
  let seconds = parseInt(duration) - minutes * 60
  return `${minutes}:${seconds}`
}
