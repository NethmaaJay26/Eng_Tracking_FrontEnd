import React from 'react'
import Item from './item'
import {FEATURES, TEARMS, US, USERS} from "./footerInfo" 

const ItemContainer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16'>
        <Item Links ={FEATURES} title="Features"/>
        <Item Links ={TEARMS} title="Terms and Privacy"/>
        <Item Links ={USERS} title="About User"/>
        <Item Links ={US} title="Contact Us"/>

    </div>
  )
}

export default ItemContainer