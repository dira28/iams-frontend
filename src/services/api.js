export const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

// Mensimulasikan response API (nanti diganti axios/fetch)
export async function simulate(data, ms) {
  await delay(ms)
  return JSON.parse(JSON.stringify(data))
}
