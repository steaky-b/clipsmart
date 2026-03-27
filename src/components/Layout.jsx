import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const animate = () => {
      document.querySelectorAll('.fade-up, .stagger').forEach((el) => {
        observer.observe(el)
      })
    }

    animate()
    const timer = setTimeout(animate, 100)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])

  const hideFooter = pathname === '/how-it-works'
  const deckMode = pathname === '/precall'

  return (
    <>
      {!deckMode && <Nav />}
      <main>
        <Outlet />
      </main>
      {!hideFooter && !deckMode && <Footer />}
    </>
  )
}
