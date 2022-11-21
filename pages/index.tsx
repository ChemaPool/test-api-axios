import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const username: any = useRef(null)
  const password: any = useRef(null)

  const onSubmit = () => {
    const user = {
      username: username?.current?.value,
      password: password?.current?.value,

    }
    axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      ...user
    }).then(response => {
      const { data } = response;
      document.cookie = `jwt=${data?.data}`;
      router.push("/cities")
    }).catch(error => alert(error))
  }

  return (
    <div className={styles.container}>
      <input type="text" ref={username} />
      <input type="text" ref={password} />
      <button type='submit' onClick={onSubmit}>entrar</button>
    </div>
  )
}
