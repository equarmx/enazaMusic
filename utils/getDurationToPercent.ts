export default function getDurationToPercent(
  duration: number | string,
  currentDuration: number
): number {
  let refactored = typeof duration === 'string' ? parseInt(duration) : duration
  return (currentDuration * 100) / refactored
}
