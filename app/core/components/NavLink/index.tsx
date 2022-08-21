import Link from "next/link"
import NextLink from "next/link"
import { useRouter } from "next/router"

export function NavLink({ href, children, to, ...props }) {
  const { pathname } = useRouter()
  const isActive = pathname === to || pathname.startsWith(to)

  if (isActive) {
    props.className += " active"
  }

  return (
    <NextLink href={to} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
