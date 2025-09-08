import Image from 'next/image'
import accessaurusLogo from '@/images/logo.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={accessaurusLogo}
      alt="Accessaurus logo"
      className={className}
      priority
    />
  )
}
