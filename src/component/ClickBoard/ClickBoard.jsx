import React, { useState, useEffect, useRef } from 'react'
import Board from './Board'
const ClickBoard = () => {
  const [clipboardContent, setClipboardContent] = useState('')
  const clipboardListenerRef = useRef(null)
  const buttonRef = useRef(null)
  const [isShow, setIsShow] = useState(false)
  // 粘贴板数据数组
  const [boardData, setBoardData] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    console.log(e, '=======change')
    // setInputValue(e.target.value)
  }
  useEffect(() => {
    // 检查浏览器是否支持navigator.clipboard API
    if ('clipboard' in navigator) {
      // 开始监听粘贴板内容的变化
      const startListening = async () => {
        const clipboardChangeListener = async (event) => {
          try {
            const content = await navigator.clipboard.readText()
            setClipboardContent(content)
          } catch (error) {
            console.error('监听粘贴板内容变化失败:', error)
          }
        }
        navigator.clipboard.addEventListener('change', clipboardChangeListener)
        clipboardListenerRef.current = clipboardChangeListener
      }
      startListening()

      // 在组件卸载时移除监听器，防止内存泄漏
      return () => {
        if (clipboardListenerRef.current) {
          navigator.clipboard.removeEventListener(
            'change',
            clipboardListenerRef.current
          )
        }
      }
    } else {
      console.error('当前浏览器不支持navigator.clipboard API')
    }
  }, [])

  const readClipboardOnClick = async () => {
    try {
      buttonRef.current.focus()

      if ('clipboard' in navigator) {
        const content = await navigator.clipboard.readText()
        setClipboardContent(content)
        const tempData = boardData
        tempData.push(content)
        setBoardData(tempData)
        // console.log(boardData, '=====数组数据')
      } else {
        console.error('当前浏览器不支持navigator.clipboard API')
      }
    } catch (error) {
      console.error('读取粘贴板失败:', error)
    }
  }
  // 用于更新isShow状态的函数
  const toggleIsShow = () => {
    setIsShow((prevIsShow) => !prevIsShow)
  }

  // 启动粘贴板
  useEffect(() => {
    const handleKeyDown = (event) => {
      // console.log(event)
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        // console.log('Ctrl + V组合键被按下')
        readClipboardOnClick()
        // 在这里可以添加读取粘贴板等相关操作
        toggleIsShow()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div>
      <Board isShow={isShow} data={boardData} />
      <p>粘贴板内容: {clipboardContent}</p>
      <p>
        数组内容：
        {boardData.map((element, index) => (
          <li key={index}>
            <b>{element}</b>
          </li>
        ))}
      </p>
      <input type="text" placeholder="请输入内容" />
      <input type="text" placeholder="请输入内容" />
      <input type="text" placeholder="请输入内容" />
      <input type="text" placeholder="请输入内容" />
      <button ref={buttonRef} onClick={readClipboardOnClick}>
        读取粘贴板内容
      </button>
    </div>
  )
}

export default ClickBoard
