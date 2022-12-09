import { useState } from "react";

export const useLogin = (initialValue = false) => {
  const [modalOpen, setModalOpen] = useState (initialValue);
  const [modalClose, setModalClose] = useState (initialValue);

  const openLogin = () => setModalOpen(true)
  const closeLogin = () => setModalClose(false)

  return [modalOpen, openLogin, closeLogin]


} 