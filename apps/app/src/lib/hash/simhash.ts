export function simhash64(text: string): string {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) || []
  const v = new Array<number>(64).fill(0)
  for (const t of tokens) {
    const h = fnv1a64(t)
    for (let i = 0; i < 64; i++) {
      const bit = (h >> BigInt(i)) & 1n
      v[i] += bit === 1n ? 1 : -1
    }
  }
  let out = 0n
  for (let i = 0; i < 64; i++) if (v[i] >= 0) out |= 1n << BigInt(i)
  return out.toString(16).padStart(16, '0')
}

function fnv1a64(str: string): bigint {
  let hash = 0xcbf29ce484222325n
  const prime = 0x100000001b3n
  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i) & 0xff)
    hash = (hash * prime) & 0xffffffffffffffffn
  }
  return hash
}

