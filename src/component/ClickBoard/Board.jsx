import React, { useEffect, useState, useRef } from 'react';
import './Board.less';

// 创建一个MutationObserver来监听页面DOM变化，以便能捕获到后续新添加的input元素
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            const addedNodes = mutation.addedNodes;
            addedNodes.forEach((node) => {
                if (node.nodeName === 'INPUT') {
                    attachInputClickHandler(node);
                }
            });
        }
    });
});

// 配置MutationObserver要监听的目标和选项
const config = {
    childList: true,
    subtree: true
};

// 开始监听整个文档的DOM变化
observer.observe(document, config);

const Board = (props) => {
    const { isShow, data } = props;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [currentValue, setCurrentValue] = useState('');
    const currentInputRef = useRef(null);

    // 用于标记是否已经添加过点击事件监听器
    const hasClickListenerBeenAdded = useRef(false);

    // 在目标输入框中插入
    const attachInputClickHandler = (inputElement) => {
        currentInputRef.current = inputElement;
    }

    // 遍历页面初始已存在的input元素并添加点击事件处理函数
    const attachInitialInputClickHandlers = () => {
        document.querySelectorAll('input').forEach((input) => {
            attachInputClickHandler(input);
        });
    }

    useEffect(() => {
        // 组件挂载时添加初始input元素的点击事件监听器
        attachInitialInputClickHandlers();
    }, []);

    // 监听整个页面的点击事件，以便处理后续新添加的input元素被点击的情况
    const handlePageClick = (event) => {
        if (event.target.nodeName === 'INPUT') {
            console.log(event.target);
            attachInputClickHandler(event.target);
        }
    }

    useEffect(() => {
        if (!hasClickListenerBeenAdded.current) {
            document.addEventListener('click', handlePageClick);
            hasClickListenerBeenAdded.current = true;
        }

        return () => {
            if (hasClickListenerBeenAdded.current) {
                document.removeEventListener('click', handlePageClick);
                hasClickListenerBeenAdded.current = false;
            }
        };
    }, []);

    window.addEventListener('mousemove', function (event) {
        const x = event.clientX;
        const y = event.clientY;
        setMousePosition({ x, y });
    });

    const clickItem = (inputValue) => {
        console.log(inputValue);
        if (inputValue && currentInputRef.current) {
            currentInputRef.current.value = inputValue;
            setCurrentValue(inputValue);
        }
    };

    useEffect(() => {
        setCurrentPosition(mousePosition);
        // if (isShow && currentInputRef.current) {
        //     currentInputRef.current.value = currentValue;
        // }
    }, [isShow]);

    return (
        <div>
            <div
                style={{
                    display: isShow? 'block' : 'none',
                    position: 'absolute',
                    left: `${currentPosition.x}px`,
                    top: `${currentPosition.y}px`,
                }}
            >
                <div className="listBox">
                    {data.map((item, idx) => (
                        <p key={idx} className="listItem" onClick={() => clickItem(item)}>
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;