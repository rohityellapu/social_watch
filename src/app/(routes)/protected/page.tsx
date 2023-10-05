'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import * as React from 'react';

export default function ProtectedRoute({ children }: any) {
var authenticated = false
if (typeof window !== 'undefined') {
  // Perform localStorage action
  authenticated= localStorage.getItem('isAuthenticated')==null?false:true 
}
const [loading, setLoading] = useState(true)
const router = useRouter();
useEffect(() => {
  // if user is not authenticated, redirect to login page
  if (!authenticated) router.push('/login')
  setLoading(false)
})
if (loading) return <p>Loading</p>
return (
  children
)}
