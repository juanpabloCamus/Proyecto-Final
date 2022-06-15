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
                <li>Rocket helps you to boost your career as a developer connecting you in a fast way with hundred of good companies and startups. Just search for your dream job, apply and be hired!</li>
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
                <li>It's really easy, create an account in Rocket, login in our app, then look for your job of interest, go for application window and load your CV. Then just wait for a company reponse. Now your so close to have an interview for land yor drema job!</li>
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
                <li>First of all, a quick connection between you and the company, no third recruiters. You avoid tedious and long process of hiring. You can have a direct interview through our platform and get hired so much fast!</li>
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
                <li>It depends on the company response. Once you got the first meeting, you probably are now in the hiring process. So you can wait for the next steps to land your dream job!</li>
            </ul>
        </div>
    </div>
</div>
    );
};
