import Link from "next/link"
import React, { useState, useEffect } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useRouter } from "next/router"
const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [color, setColor] = useState("transparent")
  const [textColor, setTextColor] = useState("white")
  const [token, setToken] = useState("white")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    const getTokenFromLocalStorage = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
    setToken(getTokenFromLocalStorage)
  }, [handleLogout])

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff")
        setTextColor("#000000")
      } else {
        setColor("transparent")
        setTextColor("#ffffff")
      }
    }
    window.addEventListener("scroll", changeColor)
  }, [])

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1
            style={{ color: `${textColor}` }}
            className="font-bold text-4xl"
          ></h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link href="/">Home</Link>
          </li>
          <li className="p-4">
            <Link href="/#gallery">Gallery</Link>
          </li>
          <li className="p-4">
            <Link href="/contact">Contact</Link>
          </li>
          {token ? (
            <>
              <li className="p-4">
                <Link href="/upload">Upload</Link>
              </li>
              <li className="p-4">
                <Link href="/display">Display and remove</Link>
              </li>
            </>
          ) : null}
          {!token ? (
            <li className="p-4">
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <button onClick={handleLogout}>Log out</button>
          )}
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/contact">Contact</Link>
            </li>
            {token ? (
              <>
                <li
                  onClick={handleNav}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/upload">Upload</Link>
                </li>
                <li
                  onClick={handleNav}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href="/display">Display and remove</Link>
                </li>
              </>
            ) : null}
            {!token ? (
              <li
                onClick={handleNav}
                className="p-4 text-4xl hover:text-gray-500"
              >
                <Link href="/login">Login</Link>
              </li>
            ) : (
              <button
                className="p-4 text-4xl hover:text-gray-500"
                onClick={() => {
                  handleLogout()
                  handleNav()
                }}
              >
                Log out
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
