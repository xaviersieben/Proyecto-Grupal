import { useState } from "react";

export const useLogin = (initialValue = false) => {
  const [modalOpen, setModalOpen] = useState (initialValue);
  // const [modalClose, setModalClose] = useState (initialValue);

  const openLogin = () => setModalOpen(true)
  const closeLogin = () => setModalOpen(false)

  return [modalOpen, openLogin, closeLogin]


} 

export const validateLogin = (data) => {
  
  let errors = {};
  
  if (data.email === '') {
    errors.email = 'Must specify an email'
  }
  if (data.password === '') {
    errors.password = 'Must specify a password'
  }
  
  console.log('errors',errors)
  return errors
}