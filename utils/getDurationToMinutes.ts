export default function getDurationToMinutes(
  duration: number | string
): string {
  let refactored = typeof duration === 'string' ? parseInt(duration) : duration
  let minutes = Math.floor(refactored / 60)
  let seconds = refactored - minutes * 60
  return `${minutes}:${seconds}`
}
