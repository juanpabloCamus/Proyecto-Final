import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './PremiumForm.module.css';
import Swal from 'sweetalert2';
import { MdInfo } from "react-icons/md";
import axios from 'axios'
import { modalActions } from "../../../redux/modal_slice/modalSlice";
import { useDispatch } from "react-redux";
const stripePromise = loadStripe('pk_test_51L81c0EOWKFCUuQuvpKTAS4gqQdXUpYpEbF1vTvnVLj5RsaUaQnwLpaIS9T6NmWtwqLKpDQE9mCnrURZs0Uombrf003R5Ch5fU')

function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const id_user = userLocalStorage.id

    function handleInfo(){
        Swal.fire({
            icon:'info',
            title: 'Rocket premium',
            text: 'With Rocket Premium, your job offers were positioned in the first places, on the main page of the developers. With this you will be able to find the best talent for your company much faster, this means that your company will also grow faster. Get talent, get Rocket premium.',
            closeOnEsc: false,
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        setLoading(true)

        if(!error){
            const pay_id = paymentMethod.id;
            try{
                await axios.post('/stripe', {pay_id, id_user})
                .then(res =>  Swal.fire({icon:'success',title:'Congratulations!' ,text: res.data}))
                elements.getElement(CardElement).clear()
                dispatch(modalActions.setModalValue());
                dispatch(modalActions.activatePremium(false));
            }catch(e){
                Swal.fire({icon:'error', text: e.response.data})
            }
        }
        else{
            Swal.fire({icon:'error', text: 'Complete the fields'})
            setLoading(false)
        }
        
        setLoading(false)
        
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.infoContainer}>
                <MdInfo className={styles.infoButton} onClick={handleInfo}/>
                <label onClick={handleInfo}>Why premium?</label>
            </div>
            <div>
                <label id={styles.subsNow}>Subscribe now for $19.99 per month</label>
            </div>
        <div className={styles.divFormContainer}>
            <form className={styles.formContainer}>
                <div>
                <label id={styles.label}>Credit or debit card</label>
                <CardElement className={styles.cardElement}/>
                </div>
                <button id={styles.button} onClick={handleSubmit} disabled={!stripe}>
                    {loading ? (
                        <div id={styles.loading}></div>
                    ) : 
                    'Subscribe'
                    }
                </button>
            </form>
        </div>
        </div>
        
    );
}

function PremiumForm() {
    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
    )
}

export default PremiumForm;