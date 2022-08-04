export default function getDurationToMinutes(
  duration: number | string
): string {
  let refactored = typeof duration === 'string' ? parseInt(duration) : duration
  let minutes = Math.floor(refactored / 60)
  let seconds = refactored - minutes * 60
  let refactorSeconds: string
  if (seconds < 10) {
    refactorSeconds = '0' + seconds
  } else refactorSeconds = seconds.toString()
  return `${minutes}:${refactorSeconds}`
}
