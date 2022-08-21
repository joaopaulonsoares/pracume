import Link from "next/link"
import NextLink from "next/link"
import { useRouter } from "next/router"

export function NavLink({ href, exact, children, ...props }) {
  const { pathname } = useRouter()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += " active"
  }

  return (
    <NextLink href="#" passHref>
      <a {...props}>{children}</a>
    </NextLink>
  )
}
