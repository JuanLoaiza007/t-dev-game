'use strict'

import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase/firebase.config'

const usersRef = collection(db, 'users')

const createUser = async (userData) => {
  try {
    await addDoc(usersRef, userData)
  } catch (error) {
    console.log(error)
  }
}

const readUSer = async (userEmail) => {
  try {
    const userSnapshot = await getDocs(
      query(usersRef, where('email', '==', userEmail)))

    if (userSnapshot.empty) {
      return { success: false, message: 'User not found' }
    }
    const userData = userSnapshot.docs.map((doc) => doc.data())
    return { success: true, message: 'User found', data: userData }
  } catch (error) {
    return { success: false, message: 'Error to get the user', error }
  }
}

const editUser = async (userEmail, userData) => {
  try {
    const userSnapshot = await getDocs(
      query(usersRef, where('email', '==', userEmail)))

    if (userSnapshot.empty) {
      return { success: false, message: 'User not found' }
    }

    const userDoc = userSnapshot.docs[0]
    await userDoc.ref.update(userData)
    return { success: true, message: 'User updated successfully' }
  } catch (error) {
    return { success: false, message: 'Error to update the user', error }
  }
}

export { createUser, readUSer, editUser }
