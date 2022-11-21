import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const getCookie = () => {
  const jwt = document.cookie.split(";");
  const token = jwt[0].split("=");
  return token[1]
}

const Cities = () => {
  const router = useRouter()
  const [citiesData, setCitiesData] = useState([]);

  const cities = () => {
    const jwt = getCookie()
    console.log(jwt)

    axios.get(`${process.env.NEXT_PUBLIC_API}/cities/all`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }).then(response => {
      const { data } = response;
      setCitiesData(data?.data)
    }).catch(error => console.log(error))
  }

  return (
    <div>
      <div>
        cities
        <button onClick={cities}>Obtener plazas</button>
        {citiesData?.map((item: Record<string, any>, index: number) => <div key={index}>
          <span>{item?.id}</span>{" - "}
          <span>{item?.name}</span>{" - "}
          <input type="checkbox" name="" id="" checked={item?.active} onChange={() => void 0} />
        </div>)}
      </div>
    </div>
  )
}

export default Cities