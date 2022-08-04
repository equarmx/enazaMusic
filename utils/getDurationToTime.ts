export default function getDurationToTime(
  duration: number | string,
  preview: boolean
): string {
  let refactored = typeof duration === 'string' ? parseInt(duration) : duration

  let h = Math.floor(refactored / 3600)
  let m = Math.floor((refactored % 3600) / 60)
  let s = Math.floor((refactored % 3600) % 60)

  let refactorSeconds: string
  let refacorMinutes: string
  if (s < 10) {
    refactorSeconds = '0' + s
  } else refactorSeconds = s.toString()
  if (h && m < 10) {
    refacorMinutes = '0' + m
  } else refacorMinutes = m.toString()

  if (preview) {
    return `${h > 0 ? h + 'ч., ' : ''}${refacorMinutes + 'м.'}, ${
      refactorSeconds + 'с.'
    }`
  } else {
    return `${h > 0 ? h + ':' : ''}${refacorMinutes}:${refactorSeconds}`
  }
}
