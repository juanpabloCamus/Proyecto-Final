import React   from 'react'

import { IoMdArrowDropdown } from 'react-icons/io'
import { IoIosRocket } from 'react-icons/io'
import './Acordeon.css'

export default function Acordion () {
  return (
    
<div className="body">
 <h2>Some <span>questions</span> about us.</h2>
  <div className="box">
        <div className="box-item">
            <div className="box-item_title">
            <div className='box-item_title_container'>
                    <IoIosRocket className='box-item_icon'/>
                    <p>What you should use Rocket?</p>
                </div>
                <IoMdArrowDropdown/>
            </div>
            <ul className="box-item-content">
                <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos officia nisi, nam veniam quae voluptatum! Minus aliquid sint fugiat recusandae?</li>
            </ul>
        </div>
        <div className="box-item">
            <div className="box-item_title">
                <div className='box-item_title_container'>
                    <IoIosRocket className='box-item_icon'/>
                    <p>How to ship in?</p>
                </div>
                <IoMdArrowDropdown />
            </div>
            <ul className="box-item-content">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, reiciendis fuga quia labore sunt animi!</li>
            </ul>
        </div>
        <div  className="box-item ">
            <div className="box-item_title">
                <div className='box-item_title_container'>
                        <IoIosRocket className='box-item_icon'/>
                        <p>What benefits I am getting with Rocket?</p>
                    </div>
                <IoMdArrowDropdown />
            </div>
            <ul className="box-item-content">
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt fugit dolore dolores sit neque! Excepturi in quos quia optio deleniti porro culpa perferendis consectetur ea?</li>
        
            </ul>
        </div>
        <div className="box-item">
            <div className="box-item_title">
                    <div className='box-item_title_container'>
                        <IoIosRocket className='box-item_icon'/>
                        <p>How much the interview process take long?</p>
                    </div>
                <IoMdArrowDropdown />
            </div>
            <ul className="box-item-content">
                <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis cum, facere esse illum inventore quod veritatis mollitia quisquam maiores laudantium ducimus nihil excepturi, consectetur eaque eius deserunt saepe animi? Dolore, magnam! Optio molestias quibusdam recusandae maiores voluptatibus animi, error molestiae!</li>
            </ul>
        </div>
    </div>
</div>
    );
};