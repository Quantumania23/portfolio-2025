"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  message: string
  duration?: number
}

let toastId = 0

export const showToast = (type: Toast["type"], message: string, duration = 3000) => {
  if (typeof window === 'undefined') {
    // Don't run on server
    console.warn("showToast called on server. Toast not shown: ", message);
    return;
  }
  const event = new CustomEvent("show-toast", {
    detail: { id: (++toastId).toString(), type, message, duration },
  })
  window.dispatchEvent(event)
}

export default function ToastNotifications() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handleShowToast = (event: CustomEvent<Toast>) => {
      const toast = event.detail
      setToasts((prev) => [...prev, toast])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, toast.duration || 3000)
    }

    window.addEventListener("show-toast", handleShowToast as EventListener)
    return () => window.removeEventListener("show-toast", handleShowToast as EventListener)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-[#00ff88]" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-[#ff6b6b]" />
      case "info":
        return <Info className="w-5 h-5 text-[#00d4ff]" />
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="glass-card p-4 rounded-lg flex items-center space-x-3 animate-slideIn max-w-sm">
          {getIcon(toast.type)}
          <span className="flex-1 text-sm">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-[#b4bcd0] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
